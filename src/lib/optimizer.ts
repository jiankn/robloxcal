/**
 * AFSE Training Optimizer - 核心计算逻辑
 * 
 * 计算目标：
 * - 我现在（某 stat 值）应该去哪个训练区练最划算？
 * - 开了哪些 boost 后，每分钟大概涨多少？
 * - 达到目标数值需要多久？
 */

import type {
    TrainingArea,
    TrainingAreaParams,
    BoostSource,
    BoostSelection,
    OptimizerInput,
    OptimizerResult,
    AreaRecommendation,
    StatType
} from './types'

/**
 * 计算总倍率
 * 规则：
 * - value_type=multiplier：直接相乘
 * - value_type=percent_bonus：先转 multiplier = (1 + value) 再相乘
 * - value_type=cap：对 multi_value 做截断
 */
export function computeMultTotal(
    boostsSelected: BoostSelection,
    boostSources: BoostSource[],
    multiValue?: number
): { multTotal: number; capInfo: { cap: number | null; hasNoLimit: boolean } } {
    let mult = 1.0
    let cap: number | null = null
    const hasNoLimit = boostsSelected.no_limit === true

    for (const src of boostSources) {
        if (!isBoostSelected(src, boostsSelected)) continue

        if (src.value_type === 'multiplier') {
            mult *= src.value
        }
        if (src.value_type === 'percent_bonus') {
            mult *= (1 + src.value)
        }
        if (src.value_type === 'cap' && src.boost_key === 'multi_cap_default') {
            cap = src.value
        }
    }

    // Multi 加成（如果启用且有值）
    if (multiValue && multiValue > 1) {
        if (!hasNoLimit && cap) {
            const cappedMulti = Math.min(multiValue, cap)
            mult *= cappedMulti
        } else {
            // 如果有 No Limit 或没有 cap 配置
            mult *= multiValue
        }
    }

    return { multTotal: mult, capInfo: { cap, hasNoLimit } }
}

/**
 * 检查某个 boost 是否被选中
 */
function isBoostSelected(src: BoostSource, boosts: BoostSelection): boolean {
    switch (src.boost_key) {
        case 'vip_gamepass':
            return boosts.vip_gamepass === true
        case 'x2_stats':
            return boosts.x2_stats === true
        case 'x3_stats':
            return boosts.x3_stats === true
        case 'weekend_boost':
            return boosts.weekend_boost === true
        case 'server_boost':
            return boosts.server_boost === true
        case 'code_boost_1.25':
            return boosts.code_boost === '1.25'
        case 'code_boost_1.5':
            return boosts.code_boost === '1.5'
        case 'code_boost_2':
            return boosts.code_boost === '2'
        case 'code_boost_3':
            return boosts.code_boost === '3'
        case 'no_limit':
            return boosts.no_limit === true
        case 'multi_cap_default':
            // Cap 总是启用（除非有 no_limit）
            return true
        default:
            return false
    }
}

/**
 * 计算训练区每分钟收益
 * 使用 Published 参数（training_area_params）
 */
export function calculateGainPerMin(
    area: TrainingArea,
    params: TrainingAreaParams | undefined,
    multTotal: number
): number {
    // 如果有发布参数，使用 base_gain_per_min
    if (params?.base_gain_per_min) {
        const areaMultiplier = params.area_multiplier ?? area.seed_area_multiplier ?? 1.0
        return params.base_gain_per_min * areaMultiplier * multTotal
    }

    // 否则使用种子倍率估算（简化模型）
    // 假设基础增益为 1，实际增益 = 种子倍率 × 总倍率
    const seedMultiplier = area.seed_area_multiplier ?? 1.0
    // 基础增益估算（根据训练区等级）
    const baseGain = estimateBaseGain(area.required_stat_value)

    return baseGain * seedMultiplier * multTotal
}

/**
 * 根据训练区门槛估算基础增益
 * 这是一个简化模型，会被校准系统逐步替换
 */
function estimateBaseGain(requiredStat: number): number {
    if (requiredStat === 0) return 1
    if (requiredStat < 1000) return 2
    if (requiredStat < 10000) return 5
    if (requiredStat < 100000) return 15
    if (requiredStat < 1000000) return 50
    if (requiredStat < 10000000) return 150
    if (requiredStat < 100000000) return 500
    return 1500
}

/**
 * 获取推荐的训练区（Top N）
 */
export function getTopAreas(
    areas: TrainingArea[],
    paramsMap: Map<number, TrainingAreaParams>,
    statType: StatType,
    currentStat: number,
    multTotal: number,
    topN: number = 3
): AreaRecommendation[] {
    // 1. 过滤该 stat_type 的训练区
    const relevantAreas = areas.filter(a => a.stat_type === statType)

    // 2. 计算每个区域的推荐数据
    const recommendations: AreaRecommendation[] = relevantAreas.map(area => {
        const params = paramsMap.get(area.id)
        const gainPerMin = calculateGainPerMin(area, params, multTotal)
        const isUnlocked = currentStat >= area.required_stat_value

        return {
            area,
            params,
            estimated_gain_per_min: gainPerMin,
            confidence: params?.confidence ?? 0.1, // 无校准数据时默认低置信度
            required_stat_value: area.required_stat_value,
            is_unlocked: isUnlocked
        }
    })

    // 3. 过滤已解锁的区域
    const unlockedAreas = recommendations.filter(r => r.is_unlocked)

    // 4. 按每分钟收益降序排序
    unlockedAreas.sort((a, b) => b.estimated_gain_per_min - a.estimated_gain_per_min)

    // 5. 返回 Top N
    return unlockedAreas.slice(0, topN)
}

/**
 * 计算达到目标所需时间（分钟）
 */
export function calculateTimeToTarget(
    currentStat: number,
    targetStat: number,
    gainPerMin: number
): number | null {
    if (gainPerMin <= 0) return null
    if (targetStat <= currentStat) return 0

    return (targetStat - currentStat) / gainPerMin
}

/**
 * 完整的优化器计算
 */
export function runOptimizer(
    input: OptimizerInput,
    areas: TrainingArea[],
    paramsMap: Map<number, TrainingAreaParams>,
    boostSources: BoostSource[],
    versionKey?: string
): OptimizerResult {
    // 1. 计算总倍率
    const { multTotal, capInfo } = computeMultTotal(
        input.boosts,
        boostSources,
        input.multi_value
    )

    // 2. 获取 Top 3 推荐区域
    const topAreas = getTopAreas(
        areas,
        paramsMap,
        input.stat_type,
        input.current_stat,
        multTotal,
        3
    )

    // 3. 计算达到目标所需时间
    let minutesToTarget: number | undefined
    if (input.target_stat && topAreas.length > 0) {
        const bestGain = topAreas[0].estimated_gain_per_min
        const time = calculateTimeToTarget(input.current_stat, input.target_stat, bestGain)
        if (time !== null) {
            minutesToTarget = time
        }
    }

    return {
        top_areas: topAreas,
        mult_total: multTotal,
        cap_info: capInfo,
        minutes_to_target: minutesToTarget,
        data_version: versionKey,
        last_updated: new Date().toISOString()
    }
}

/**
 * 格式化时间显示
 */
export function formatDuration(minutes: number): string {
    if (minutes < 1) {
        return `${Math.round(minutes * 60)} 秒`
    }
    if (minutes < 60) {
        return `${Math.round(minutes)} 分钟`
    }
    if (minutes < 1440) { // 24 hours
        const hours = Math.floor(minutes / 60)
        const mins = Math.round(minutes % 60)
        return mins > 0 ? `${hours} 小时 ${mins} 分钟` : `${hours} 小时`
    }
    const days = Math.floor(minutes / 1440)
    const hours = Math.round((minutes % 1440) / 60)
    return hours > 0 ? `${days} 天 ${hours} 小时` : `${days} 天`
}

/**
 * 格式化大数字
 */
export function formatNumber(num: number): string {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toFixed(0)
}
