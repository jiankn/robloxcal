/**
 * Calculator Engine Index
 * Re-exports all calculator engines for easy importing
 */

export { calculateROI, type ROIInputs, type ROIOutputs } from './roi-engine'
export { calculateProfit, formatCurrency, type ProfitInputs, type ProfitOutputs } from './profit-engine'
export { calculateProbability, formatProbability, type ProbabilityInputs, type ProbabilityOutputs } from './probability-engine'
export { calculateRebirth, type RebirthInputs, type RebirthOutputs } from './rebirth-engine'

/**
 * Engine types for config-driven calculators
 */
export type EngineType = 'roi' | 'profit' | 'probability' | 'rebirth'

/**
 * Calculator configuration type
 */
export interface CalculatorConfig {
    id: string
    gameSlug: string
    toolSlug: string
    engine: EngineType
    seo: {
        title: string
        description: string
        primaryKeyword: string
        secondaryKeywords: string[]
    }
    inputs: CalculatorInput[]
    outputs: CalculatorOutput[]
    examples: WorkedExample[]
    faqs: FAQ[]
    lastUpdated: string
    disclaimer?: string
}

export interface CalculatorInput {
    key: string
    label: string
    type: 'number' | 'select' | 'checkbox' | 'range'
    min?: number
    max?: number
    step?: number
    default?: number | string | boolean
    options?: Array<{ value: string | number, label: string }>
    helpText?: string
    unit?: string
    required?: boolean
}

export interface CalculatorOutput {
    key: string
    label: string
    format: 'number' | 'time' | 'currency' | 'percentage' | 'text'
    precision?: number
    highlight?: boolean
    helpText?: string
}

export interface WorkedExample {
    title: string
    scenario: string
    inputs: Record<string, number | string | boolean>
    explanation: string
}

export interface FAQ {
    question: string
    answer: string
}
