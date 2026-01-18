'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, RotateCcw, HelpCircle, ChevronRight } from 'lucide-react'
import {
    CalculatorConfig,
    CalculatorInput,
    calculateROI,
    calculateProfit,
    calculateProbability,
    calculateRebirth
} from '@/lib/calculators/engines'

interface ConfigCalculatorProps {
    config: CalculatorConfig
    className?: string
}

export function ConfigCalculator({ config, className = '' }: ConfigCalculatorProps) {
    // Initialize input values from defaults
    const [inputValues, setInputValues] = useState<Record<string, number | string | boolean>>(() => {
        const initial: Record<string, number | string | boolean> = {}
        config.inputs.forEach(input => {
            initial[input.key] = input.default ?? (input.type === 'number' ? 0 : '')
        })
        return initial
    })

    // Calculate results based on engine type
    const results = useMemo(() => {
        switch (config.engine) {
            case 'roi':
                return calculateROI({
                    cost: Number(inputValues.cost) || 0,
                    gainPerUnit: Number(inputValues.gainPerUnit) || 0,
                    unitType: (inputValues.unitType as 'minute' | 'second' | 'hour') || 'minute',
                    multiplier: Number(inputValues.multiplier) || 1
                })
            case 'profit':
                return calculateProfit({
                    actionsPerHour: Number(inputValues.actionsPerHour) || 0,
                    successRate: Number(inputValues.successRate) || 0,
                    avgValue: Number(inputValues.avgValue) || 0,
                    multiplier: Number(inputValues.multiplier) || 1,
                    costPerAction: Number(inputValues.costPerAction) || 0
                })
            case 'probability':
                return calculateProbability({
                    probability: Number(inputValues.probability) || 0,
                    attemptsPerMinute: Number(inputValues.attemptsPerMinute) || 0,
                    luckMultiplier: Number(inputValues.luckMultiplier) || 1
                })
            case 'rebirth':
                return calculateRebirth({
                    currentIncomePerMinute: Number(inputValues.currentIncomePerMinute) || 0,
                    currentMultiplier: Number(inputValues.currentMultiplier) || 1,
                    newMultiplier: Number(inputValues.newMultiplier) || 1,
                    rebirthCost: Number(inputValues.rebirthCost) || 0,
                    rebirthCostType: (inputValues.rebirthCostType as 'time' | 'currency') || 'currency'
                })
            default:
                return {}
        }
    }, [inputValues, config.engine])

    const handleInputChange = useCallback((key: string, value: number | string | boolean) => {
        setInputValues(prev => ({ ...prev, [key]: value }))
    }, [])

    const handleReset = useCallback(() => {
        const initial: Record<string, number | string | boolean> = {}
        config.inputs.forEach(input => {
            initial[input.key] = input.default ?? (input.type === 'number' ? 0 : '')
        })
        setInputValues(initial)
    }, [config.inputs])

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Calculator Card */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Calculator className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <CardTitle className="text-xl text-white">Calculator</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Enter your values to calculate results
                                </CardDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="text-zinc-400 hover:text-white"
                        >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Reset
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Inputs Grid */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {config.inputs.map((input) => (
                            <InputField
                                key={input.key}
                                input={input}
                                value={inputValues[input.key]}
                                onChange={(value) => handleInputChange(input.key, value)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-purple-500/30">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                        <ChevronRight className="h-5 w-5 text-purple-400" />
                        Results
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {config.outputs.map((output) => (
                            <ResultField
                                key={output.key}
                                output={output}
                                value={(results as Record<string, unknown>)[output.key]}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Input Field Component
function InputField({
    input,
    value,
    onChange
}: {
    input: CalculatorInput
    value: number | string | boolean
    onChange: (value: number | string | boolean) => void
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={input.key} className="text-zinc-300 flex items-center gap-2">
                {input.label}
                {input.unit && <Badge variant="outline" className="text-xs border-zinc-700">{input.unit}</Badge>}
                {input.helpText && (
                    <span className="text-zinc-500 text-xs" title={input.helpText}>
                        <HelpCircle className="h-3.5 w-3.5" />
                    </span>
                )}
            </Label>

            {input.type === 'number' && (
                <Input
                    id={input.key}
                    type="number"
                    min={input.min}
                    max={input.max}
                    step={input.step || 1}
                    value={value as number}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="bg-zinc-800 border-zinc-700"
                />
            )}

            {input.type === 'select' && input.options && (
                <select
                    id={input.key}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-10 px-3 rounded-md bg-zinc-800 border border-zinc-700 text-white"
                >
                    {input.options.map(opt => (
                        <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            )}

            {input.type === 'range' && (
                <div className="flex items-center gap-3">
                    <input
                        id={input.key}
                        type="range"
                        min={input.min || 0}
                        max={input.max || 100}
                        step={input.step || 1}
                        value={value as number}
                        onChange={(e) => onChange(parseFloat(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-sm text-zinc-400 w-16 text-right">{value}</span>
                </div>
            )}
        </div>
    )
}

// Result Field Component
function ResultField({
    output,
    value
}: {
    output: { key: string; label: string; format: string; precision?: number; highlight?: boolean }
    value: unknown
}) {
    const formattedValue = useMemo(() => {
        if (value === undefined || value === null) return 'N/A'

        switch (output.format) {
            case 'time':
                return typeof value === 'string' ? value : 'N/A'
            case 'currency':
                return typeof value === 'number' ? formatNumber(value, output.precision) : value
            case 'percentage':
                return typeof value === 'number' ? `${value.toFixed(output.precision ?? 1)}%` : value
            case 'number':
                return typeof value === 'number' ? formatNumber(value, output.precision) : value
            default:
                return String(value)
        }
    }, [value, output.format, output.precision])

    return (
        <div className={`p-4 rounded-lg ${output.highlight ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-zinc-800/50'}`}>
            <div className="text-sm text-zinc-400 mb-1">{output.label}</div>
            <div className={`text-xl font-bold ${output.highlight ? 'text-purple-300' : 'text-white'}`}>
                {formattedValue}
            </div>
        </div>
    )
}

function formatNumber(value: number, precision = 0): string {
    if (!isFinite(value)) return 'N/A'
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
    return value.toFixed(precision)
}
