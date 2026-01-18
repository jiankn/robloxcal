/**
 * AFSE 校准系统 - 样本处理与聚合逻辑
 */

import type {
    TrainingSample,
    TrainingAreaParams,
    BoostSource,
    BoostSelection,
    CalibrationSubmission
} from './types'
import { computeMultTotal } from './optimizer'

/**
 * 计算样本质量评分
 * 评分因素：
 * - 是否登录：+0.1
 * - 时长足够：+0.05
 * - 是否异常：-0.3
 * - IP 频率过高：-0.2
 */
export function calculateQualityScore(
    sample: {
        user_id?: string
        duration_sec: number
        observed_gain_per_min: number
        ip_hash?: string
    },
    areaDistribution: { median: number; stddev: number } | null,
    ipSubmitCount24h: number
): { score: number; flagged: boolean; flagReason?: string } {
    let score = 0.5
    let flagged = false
    let flagReason: string | undefined

    // 登录用户加分
    if (sample.user_id) {
        score += 0.1
    }

    // 时长足够加分
    if (sample.duration_sec >= 120) {
        score += 0.05
    }

    // 时长太短扣分
    if (sample.duration_sec < 60) {
        score -= 0.1
    }

    // 检查异常值
    if (areaDistribution && areaDistribution.stddev > 0) {
        const zScore = Math.abs(
            (sample.observed_gain_per_min - areaDistribution.median) / areaDistribution.stddev
        )

        // 超过 3 个标准差视为异常
        if (zScore > 3) {
            score -= 0.3
            flagged = true
            flagReason = `Outlier: z-score=${zScore.toFixed(2)}`
        }
    }

    // IP 频率过高
    if (ipSubmitCount24h > 10) {
        score -= 0.2
        if (ipSubmitCount24h > 20) {
            flagged = true
            flagReason = flagReason
                ? `${flagReason}; High frequency IP: ${ipSubmitCount24h}/24h`
                : `High frequency IP: ${ipSubmitCount24h}/24h`
        }
    }

    // 限制范围
    score = Math.max(0, Math.min(1, score))

    return { score, flagged, flagReason }
}

/**
 * 反推基础增益
 * estimated_base_gain = observed_gain_per_min / mult_total
 */
export function estimateBaseGain(
    observedGainPerMin: number,
    boosts: BoostSelection,
    boostSources: BoostSource[],
    multiValue?: number
): number {
    const { multTotal } = computeMultTotal(boosts, boostSources, multiValue)

    if (multTotal <= 0) return observedGainPerMin

    return observedGainPerMin / multTotal
}

/**
 * 加权截尾均值聚合
 * 1. 按数值排序
 * 2. 去掉头尾各 trimPercent
 * 3. 按 quality_score 加权平均
 */
export function aggregateSamples(
    samples: { estimated_base_gain: number; quality_score: number }[],
    trimPercent: number = 0.1
): { base_gain: number; sample_count: number } | null {
    if (samples.length === 0) return null

    // 排序
    const sorted = [...samples].sort((a, b) => a.estimated_base_gain - b.estimated_base_gain)

    // 计算要去掉的数量
    const trimCount = Math.floor(sorted.length * trimPercent)

    // 截尾
    const trimmed = sorted.slice(trimCount, sorted.length - trimCount)

    if (trimmed.length === 0) {
        // 如果截尾后没有样本，使用全部样本
        return calculateWeightedMean(sorted)
    }

    return calculateWeightedMean(trimmed)
}

/**
 * 加权平均计算
 */
function calculateWeightedMean(
    samples: { estimated_base_gain: number; quality_score: number }[]
): { base_gain: number; sample_count: number } {
    let weightedSum = 0
    let totalWeight = 0

    for (const sample of samples) {
        const weight = sample.quality_score
        weightedSum += sample.estimated_base_gain * weight
        totalWeight += weight
    }

    if (totalWeight <= 0) {
        // 如果没有权重，使用简单平均
        const sum = samples.reduce((acc, s) => acc + s.estimated_base_gain, 0)
        return { base_gain: sum / samples.length, sample_count: samples.length }
    }

    return { base_gain: weightedSum / totalWeight, sample_count: samples.length }
}

/**
 * 计算置信度
 * conf_n = 1 - exp(-sample_count / 20)
 * conf_var = 1 / (1 + (stddev/median)^2)
 * confidence = clamp(0.15 + 0.55*conf_n + 0.30*conf_var, 0, 1)
 */
export function calculateConfidence(
    sampleCount: number,
    values: number[]
): number {
    if (sampleCount === 0 || values.length === 0) return 0

    // 样本数置信度
    const confN = 1 - Math.exp(-sampleCount / 20)

    // 方差置信度
    const sorted = [...values].sort((a, b) => a - b)
    const median = sorted[Math.floor(sorted.length / 2)]

    const variance = values.reduce((acc, v) => acc + Math.pow(v - median, 2), 0) / values.length
    const stddev = Math.sqrt(variance)

    let confVar = 1
    if (median > 0) {
        const cv = stddev / median // 变异系数
        confVar = 1 / (1 + cv * cv)
    }

    // 综合置信度
    const confidence = 0.15 + 0.55 * confN + 0.30 * confVar

    return Math.max(0, Math.min(1, confidence))
}

/**
 * 将用户提交的 BoostSelection 转换为数据库格式
 */
export function boostSelectionToJson(boosts: BoostSelection): Record<string, boolean | number> {
    const result: Record<string, boolean | number> = {}

    if (boosts.vip_gamepass) result.vip_gamepass = true
    if (boosts.x2_stats) result.x2_stats = true
    if (boosts.x3_stats) result.x3_stats = true
    if (boosts.weekend_boost) result.weekend_boost = true
    if (boosts.server_boost) result.server_boost = true
    if (boosts.no_limit) result.no_limit = true

    if (boosts.code_boost) {
        result[`code_boost_${boosts.code_boost}`] = true
    }

    return result
}

/**
 * 处理校准提交
 */
export function processCalibrationSubmission(
    submission: CalibrationSubmission
): {
    observed_gain_per_min: number
    boosts_json: Record<string, boolean | number>
    validation: { valid: boolean; error?: string }
} {
    // 验证
    if (submission.end_stat <= submission.start_stat) {
        return {
            observed_gain_per_min: 0,
            boosts_json: {},
            validation: { valid: false, error: 'End stat must be greater than start stat' }
        }
    }

    if (submission.duration_sec < 30 || submission.duration_sec > 1800) {
        return {
            observed_gain_per_min: 0,
            boosts_json: {},
            validation: { valid: false, error: 'Duration must be between 30 and 1800 seconds' }
        }
    }

    // 计算观测增益
    const durationMin = submission.duration_sec / 60
    const observedGainPerMin = (submission.end_stat - submission.start_stat) / durationMin

    // 转换 boosts
    const boostsJson = boostSelectionToJson(submission.boosts)

    return {
        observed_gain_per_min: observedGainPerMin,
        boosts_json: boostsJson,
        validation: { valid: true }
    }
}
