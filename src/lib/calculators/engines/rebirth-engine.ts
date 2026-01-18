/**
 * Rebirth Break-even Calculator Engine
 * 
 * Calculates when it's worth rebirthing based on income multiplier gains
 * Formula: break_even_time = rebirth_cost / (current_income * (new_multiplier - 1))
 */

export interface RebirthInputs {
    currentIncomePerMinute: number
    currentMultiplier: number
    newMultiplier: number
    rebirthCost: number // Time or currency cost to rebirth
    rebirthCostType: 'time' | 'currency' // Whether cost is time (minutes) or currency
}

export interface RebirthOutputs {
    multiplierGain: number
    bonusIncomePerMinute: number
    breakEvenMinutes: number
    breakEvenFormatted: string
    shouldRebirth: boolean
    recommendation: string
    newIncomePerMinute: number
    incomeIncreasePercent: number
}

export function calculateRebirth(inputs: RebirthInputs): RebirthOutputs {
    const {
        currentIncomePerMinute,
        currentMultiplier,
        newMultiplier,
        rebirthCost,
        rebirthCostType
    } = inputs

    // Validate inputs
    if (currentIncomePerMinute <= 0 || newMultiplier <= currentMultiplier) {
        return createEmptyOutput('Invalid inputs or no multiplier gain')
    }

    const multiplierGain = newMultiplier - currentMultiplier
    const multiplierRatio = newMultiplier / currentMultiplier

    // Calculate new income (assuming linear scaling with multiplier)
    const newIncomePerMinute = currentIncomePerMinute * multiplierRatio
    const bonusIncomePerMinute = newIncomePerMinute - currentIncomePerMinute
    const incomeIncreasePercent = ((multiplierRatio - 1) * 100)

    let breakEvenMinutes: number

    if (rebirthCostType === 'time') {
        // If rebirth costs time, break-even = time_cost + time to recover lost income
        // Simplified: just the time cost since you immediately get bonus income
        breakEvenMinutes = rebirthCost / (1 - (currentMultiplier / newMultiplier))
    } else {
        // If rebirth costs currency, break-even = cost / bonus income
        breakEvenMinutes = rebirthCost / bonusIncomePerMinute
    }

    // Decision logic
    const isQuickBreakEven = breakEvenMinutes < 30 // Less than 30 minutes
    const isMediumBreakEven = breakEvenMinutes < 120 // Less than 2 hours
    const isLongBreakEven = breakEvenMinutes < 480 // Less than 8 hours

    let recommendation: string
    let shouldRebirth: boolean

    if (breakEvenMinutes <= 0 || !isFinite(breakEvenMinutes)) {
        recommendation = 'Invalid calculation - check your inputs'
        shouldRebirth = false
    } else if (isQuickBreakEven) {
        recommendation = '✅ Rebirth now! Quick payback time.'
        shouldRebirth = true
    } else if (isMediumBreakEven) {
        recommendation = '✅ Rebirth recommended. Reasonable payback time.'
        shouldRebirth = true
    } else if (isLongBreakEven) {
        recommendation = '⚠️ Consider rebirthing if you plan to play for a few more hours.'
        shouldRebirth = multiplierGain >= 0.5 // Only if significant multiplier gain
    } else {
        recommendation = '❌ Wait for a better rebirth opportunity.'
        shouldRebirth = false
    }

    return {
        multiplierGain,
        bonusIncomePerMinute,
        breakEvenMinutes,
        breakEvenFormatted: formatTime(breakEvenMinutes),
        shouldRebirth,
        recommendation,
        newIncomePerMinute,
        incomeIncreasePercent
    }
}

function formatTime(minutes: number): string {
    if (!isFinite(minutes) || minutes < 0) return 'N/A'

    if (minutes < 1) {
        return `${Math.round(minutes * 60)} seconds`
    } else if (minutes < 60) {
        return `${Math.round(minutes)} minutes`
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60)
        const mins = Math.round(minutes % 60)
        return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`
    } else {
        const days = Math.floor(minutes / 1440)
        const hours = Math.round((minutes % 1440) / 60)
        return hours > 0 ? `${days}d ${hours}h` : `${days} days`
    }
}

function createEmptyOutput(message: string): RebirthOutputs {
    return {
        multiplierGain: 0,
        bonusIncomePerMinute: 0,
        breakEvenMinutes: Infinity,
        breakEvenFormatted: 'N/A',
        shouldRebirth: false,
        recommendation: message,
        newIncomePerMinute: 0,
        incomeIncreasePercent: 0
    }
}
