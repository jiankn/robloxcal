/**
 * ROI / Payback Time Calculator Engine
 * 
 * Calculates how long it takes to recover an investment
 * Formula: payback_time = cost / (gain_per_unit * multiplier)
 */

export interface ROIInputs {
    cost: number
    gainPerUnit: number // per minute, second, or hour
    unitType: 'second' | 'minute' | 'hour'
    multiplier?: number
}

export interface ROIOutputs {
    paybackTimeMinutes: number
    paybackTimeFormatted: string
    hourlyReturn: number
    roi: number // percentage return per hour
}

export function calculateROI(inputs: ROIInputs): ROIOutputs {
    const { cost, gainPerUnit, unitType, multiplier = 1 } = inputs

    // Validate inputs
    if (cost <= 0 || gainPerUnit <= 0 || multiplier <= 0) {
        return {
            paybackTimeMinutes: Infinity,
            paybackTimeFormatted: 'Invalid input',
            hourlyReturn: 0,
            roi: 0
        }
    }

    // Convert gain to per-minute
    let gainPerMinute: number
    switch (unitType) {
        case 'second':
            gainPerMinute = gainPerUnit * 60
            break
        case 'hour':
            gainPerMinute = gainPerUnit / 60
            break
        default:
            gainPerMinute = gainPerUnit
    }

    const effectiveGainPerMinute = gainPerMinute * multiplier
    const paybackTimeMinutes = cost / effectiveGainPerMinute
    const hourlyReturn = effectiveGainPerMinute * 60
    const roi = (hourlyReturn / cost) * 100

    return {
        paybackTimeMinutes,
        paybackTimeFormatted: formatTime(paybackTimeMinutes),
        hourlyReturn,
        roi
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
