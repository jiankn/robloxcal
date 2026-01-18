/**
 * Probability / Expected Time Calculator Engine
 * 
 * Calculates expected attempts and time for probability-based events (Bernoulli trials)
 * Formulas:
 *   - Expected attempts: 1/p
 *   - Time for X% chance: n = ln(1-X) / ln(1-p)
 */

export interface ProbabilityInputs {
    probability: number // Base chance per attempt (0-1, e.g., 0.01 for 1%)
    attemptsPerMinute: number
    luckMultiplier?: number // Optional luck boost
}

export interface ProbabilityOutputs {
    effectiveProbability: number
    expectedAttempts: number
    expectedTimeMinutes: number
    expectedTimeFormatted: string
    // Time to reach specific confidence levels
    attempts50Percent: number
    attempts80Percent: number
    attempts95Percent: number
    time50Percent: string
    time80Percent: string
    time95Percent: string
}

export function calculateProbability(inputs: ProbabilityInputs): ProbabilityOutputs {
    const { probability, attemptsPerMinute, luckMultiplier = 1 } = inputs

    // Validate inputs
    if (probability <= 0 || probability > 1 || attemptsPerMinute <= 0) {
        return createEmptyOutput()
    }

    // Apply luck multiplier (cap at 100%)
    const effectiveProbability = Math.min(1, probability * luckMultiplier)

    // Expected attempts (geometric distribution mean)
    const expectedAttempts = 1 / effectiveProbability

    // Expected time in minutes
    const expectedTimeMinutes = expectedAttempts / attemptsPerMinute

    // Calculate attempts needed for X% confidence
    // P(at least 1 success in n trials) = 1 - (1-p)^n >= X
    // n >= ln(1-X) / ln(1-p)
    const attempts50Percent = calculateAttemptsForConfidence(effectiveProbability, 0.5)
    const attempts80Percent = calculateAttemptsForConfidence(effectiveProbability, 0.8)
    const attempts95Percent = calculateAttemptsForConfidence(effectiveProbability, 0.95)

    return {
        effectiveProbability,
        expectedAttempts: Math.round(expectedAttempts),
        expectedTimeMinutes,
        expectedTimeFormatted: formatTime(expectedTimeMinutes),
        attempts50Percent: Math.ceil(attempts50Percent),
        attempts80Percent: Math.ceil(attempts80Percent),
        attempts95Percent: Math.ceil(attempts95Percent),
        time50Percent: formatTime(attempts50Percent / attemptsPerMinute),
        time80Percent: formatTime(attempts80Percent / attemptsPerMinute),
        time95Percent: formatTime(attempts95Percent / attemptsPerMinute)
    }
}

function calculateAttemptsForConfidence(p: number, confidence: number): number {
    if (p >= 1) return 1
    if (p <= 0) return Infinity
    return Math.log(1 - confidence) / Math.log(1 - p)
}

function formatTime(minutes: number): string {
    if (!isFinite(minutes) || minutes < 0) return 'N/A'

    if (minutes < 1) {
        return `${Math.round(minutes * 60)}s`
    } else if (minutes < 60) {
        return `${Math.round(minutes)}m`
    } else if (minutes < 1440) {
        const hours = Math.floor(minutes / 60)
        const mins = Math.round(minutes % 60)
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    } else {
        const days = Math.floor(minutes / 1440)
        const hours = Math.round((minutes % 1440) / 60)
        return hours > 0 ? `${days}d ${hours}h` : `${days}d`
    }
}

function createEmptyOutput(): ProbabilityOutputs {
    return {
        effectiveProbability: 0,
        expectedAttempts: 0,
        expectedTimeMinutes: 0,
        expectedTimeFormatted: 'N/A',
        attempts50Percent: 0,
        attempts80Percent: 0,
        attempts95Percent: 0,
        time50Percent: 'N/A',
        time80Percent: 'N/A',
        time95Percent: 'N/A'
    }
}

/**
 * Format probability as percentage
 */
export function formatProbability(value: number, decimals = 2): string {
    if (!isFinite(value)) return 'N/A'
    return `${(value * 100).toFixed(decimals)}%`
}
