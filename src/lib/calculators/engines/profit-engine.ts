/**
 * Profit per Hour Calculator Engine
 * 
 * Calculates expected profit based on actions, success rate, and value
 * Formula: profit = actions_per_hour * success_rate * avg_value * multiplier
 */

export interface ProfitInputs {
    actionsPerHour: number
    successRate: number // 0-1 (e.g., 0.75 for 75%)
    avgValue: number
    multiplier?: number
    costPerAction?: number // optional operating cost
}

export interface ProfitOutputs {
    profitPerHour: number
    profitPerMinute: number
    grossIncomePerHour: number
    costPerHour: number
    profitPerDay: number
    successfulActionsPerHour: number
}

export function calculateProfit(inputs: ProfitInputs): ProfitOutputs {
    const {
        actionsPerHour,
        successRate,
        avgValue,
        multiplier = 1,
        costPerAction = 0
    } = inputs

    // Validate inputs
    if (actionsPerHour < 0 || successRate < 0 || successRate > 1 || avgValue < 0) {
        return {
            profitPerHour: 0,
            profitPerMinute: 0,
            grossIncomePerHour: 0,
            costPerHour: 0,
            profitPerDay: 0,
            successfulActionsPerHour: 0
        }
    }

    const successfulActionsPerHour = actionsPerHour * successRate
    const grossIncomePerHour = successfulActionsPerHour * avgValue * multiplier
    const costPerHour = actionsPerHour * costPerAction
    const profitPerHour = grossIncomePerHour - costPerHour
    const profitPerMinute = profitPerHour / 60
    const profitPerDay = profitPerHour * 24

    return {
        profitPerHour: Math.max(0, profitPerHour),
        profitPerMinute: Math.max(0, profitPerMinute),
        grossIncomePerHour,
        costPerHour,
        profitPerDay: Math.max(0, profitPerDay),
        successfulActionsPerHour
    }
}

/**
 * Format currency value
 */
export function formatCurrency(value: number, decimals = 0): string {
    if (!isFinite(value)) return 'N/A'

    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(decimals > 0 ? decimals : 1)}K`
    }
    return value.toFixed(decimals)
}
