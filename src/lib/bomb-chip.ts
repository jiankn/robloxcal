/**
 * Bomb Chip 位置推荐算法
 * 基于对手历史选择的时间衰减加权频率分析
 */

// 配置参数类型
export interface BombChipConfig {
    recency_alpha: number  // 时间衰减系数 (0-1)
    k: number              // 考虑的历史回合数
    risk_weight: number    // 风险偏好权重 (0=保守, 1=激进)
}

// 默认配置
export const DEFAULT_CONFIG: BombChipConfig = {
    recency_alpha: 0.85,
    k: 8,
    risk_weight: 0.5
}

// 位置推荐结果
export interface PlacementRecommendation {
    position: number
    score: number
    probability: number
    reason: string
}

// 对局结果类型
export interface GameRound {
    opponentChoices: number[]  // 对手该回合选择的位置
    timestamp?: number         // 时间戳（用于更精确的衰减）
}

/**
 * 计算时间衰减权重
 * 越近的回合权重越高
 */
function calculateRecencyWeight(roundIndex: number, totalRounds: number, alpha: number): number {
    // roundIndex: 0 = 最旧, totalRounds-1 = 最新
    const recency = roundIndex / Math.max(totalRounds - 1, 1)
    return Math.pow(alpha, (1 - recency) * totalRounds)
}

/**
 * 计算各位置的加权频率
 */
export function calculateWeightedFrequency(
    history: GameRound[],
    n: number,
    config: BombChipConfig = DEFAULT_CONFIG
): Map<number, number> {
    const { recency_alpha, k } = config
    const frequencyMap = new Map<number, number>()

    // 初始化所有位置
    for (let i = 1; i <= n; i++) {
        frequencyMap.set(i, 0)
    }

    // 只取最近 k 回合
    const recentHistory = history.slice(-k)
    const totalRounds = recentHistory.length

    if (totalRounds === 0) {
        // 没有历史数据，返回均匀分布
        const uniformWeight = 1 / n
        for (let i = 1; i <= n; i++) {
            frequencyMap.set(i, uniformWeight)
        }
        return frequencyMap
    }

    let totalWeight = 0

    // 遍历历史回合
    recentHistory.forEach((round, index) => {
        const weight = calculateRecencyWeight(index, totalRounds, recency_alpha)

        round.opponentChoices.forEach(position => {
            if (position >= 1 && position <= n) {
                const current = frequencyMap.get(position) || 0
                frequencyMap.set(position, current + weight)
                totalWeight += weight
            }
        })
    })

    // 归一化
    if (totalWeight > 0) {
        for (const [position, weight] of frequencyMap) {
            frequencyMap.set(position, weight / totalWeight)
        }
    }

    return frequencyMap
}

/**
 * 获取推荐的炸弹投放位置
 */
export function getTopPlacements(
    history: GameRound[],
    n: number,
    m: number,
    config: BombChipConfig = DEFAULT_CONFIG
): PlacementRecommendation[] {
    const frequencyMap = calculateWeightedFrequency(history, n, config)
    const { risk_weight } = config

    // 转换为数组并排序
    const positions: PlacementRecommendation[] = []

    for (const [position, probability] of frequencyMap) {
        // 计算最终分数：基于概率 + 风险调整
        // 激进模式：更偏向高频位置
        // 保守模式：更均衡分布
        const riskAdjustedScore = probability * (1 + risk_weight * (probability - 1 / n))

        let reason = ''
        if (probability > 1.5 / n) {
            reason = `对手最近偏好此位置 (${(probability * 100).toFixed(1)}%)`
        } else if (probability > 1 / n) {
            reason = `略高于平均 (${(probability * 100).toFixed(1)}%)`
        } else if (probability < 0.5 / n) {
            reason = `对手很少选择 (${(probability * 100).toFixed(1)}%)`
        } else {
            reason = `接近平均分布 (${(probability * 100).toFixed(1)}%)`
        }

        positions.push({
            position,
            score: riskAdjustedScore,
            probability,
            reason
        })
    }

    // 按分数降序排序
    positions.sort((a, b) => b.score - a.score)

    // 返回 Top M
    return positions.slice(0, m).map((p, index) => ({
        ...p,
        reason: index === 0 ? '🎯 最佳推荐: ' + p.reason : p.reason
    }))
}

/**
 * 计算命中概率（胜率估计）
 * 假设：如果选择了 Top M 位置，至少命中一个的概率
 */
export function calculateHitProbability(
    recommendations: PlacementRecommendation[],
    m: number
): number {
    // 简化模型：假设对手选择是独立的
    // P(至少命中一个) = 1 - P(全部未命中)
    let missProb = 1

    for (const rec of recommendations.slice(0, m)) {
        missProb *= (1 - rec.probability)
    }

    return 1 - missProb
}

/**
 * 生成位置热力图数据
 */
export function generateHeatmapData(
    history: GameRound[],
    n: number,
    config: BombChipConfig = DEFAULT_CONFIG
): { position: number; intensity: number }[] {
    const frequencyMap = calculateWeightedFrequency(history, n, config)
    const maxFreq = Math.max(...frequencyMap.values())

    const heatmap: { position: number; intensity: number }[] = []

    for (const [position, frequency] of frequencyMap) {
        heatmap.push({
            position,
            intensity: maxFreq > 0 ? frequency / maxFreq : 0
        })
    }

    return heatmap.sort((a, b) => a.position - b.position)
}

/**
 * 模拟游戏结果（用于测试）
 */
export function generateMockHistory(rounds: number, n: number, m: number): GameRound[] {
    const history: GameRound[] = []

    // 模拟有偏好的对手（某些位置选择更频繁）
    const bias = Math.floor(Math.random() * n) + 1

    for (let i = 0; i < rounds; i++) {
        const choices: number[] = []
        for (let j = 0; j < m; j++) {
            if (Math.random() < 0.4) {
                // 40% 概率选择偏好位置附近
                const offset = Math.floor(Math.random() * 3) - 1
                const choice = Math.max(1, Math.min(n, bias + offset))
                if (!choices.includes(choice)) choices.push(choice)
            } else {
                // 60% 概率随机选择
                let choice: number
                do {
                    choice = Math.floor(Math.random() * n) + 1
                } while (choices.includes(choice))
                choices.push(choice)
            }
        }

        while (choices.length < m) {
            let choice: number
            do {
                choice = Math.floor(Math.random() * n) + 1
            } while (choices.includes(choice))
            choices.push(choice)
        }

        history.push({ opponentChoices: choices })
    }

    return history
}
