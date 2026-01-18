'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Calculator, HelpCircle, Loader2 } from 'lucide-react'
import { BoostSelector } from './BoostSelector'
import { ResultsCards } from './ResultsCards'
import type {
    StatType,
    BoostSelection,
    OptimizerConfig,
    OptimizerResult,
    TrainingAreaParams
} from '@/lib/types'
import { STAT_TYPES, STAT_TYPE_LABELS } from '@/lib/types'
import { runOptimizer } from '@/lib/optimizer'
import Link from 'next/link'

interface OptimizerFormProps {
    initialConfig?: OptimizerConfig
}

export function OptimizerForm({ initialConfig }: OptimizerFormProps) {
    // 状态
    const [currentStat, setCurrentStat] = useState<string>('')
    const [targetStat, setTargetStat] = useState<string>('')
    const [statType, setStatType] = useState<StatType>('strength')
    const [multiValue, setMultiValue] = useState<string>('')
    const [boosts, setBoosts] = useState<BoostSelection>({})

    const [config, setConfig] = useState<OptimizerConfig | null>(initialConfig || null)
    const [result, setResult] = useState<OptimizerResult | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingConfig, setIsLoadingConfig] = useState(!initialConfig)
    const [error, setError] = useState<string | null>(null)

    // 加载配置
    useEffect(() => {
        if (initialConfig) {
            setConfig(initialConfig)
            setIsLoadingConfig(false)
            return
        }

        async function loadConfig() {
            try {
                const response = await fetch('/api/v1/optimizer/config?game=afse&version=active')
                if (!response.ok) throw new Error('Failed to load config')
                const data = await response.json()
                setConfig(data)
            } catch (err) {
                setError('Failed to load optimizer configuration')
                console.error(err)
            } finally {
                setIsLoadingConfig(false)
            }
        }

        loadConfig()
    }, [initialConfig])

    // 计算
    const handleCalculate = useCallback(() => {
        if (!config) return
        if (!currentStat || isNaN(Number(currentStat))) {
            setError('Please enter a valid current stat value')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // 构建参数 Map
            const paramsMap = new Map<number, TrainingAreaParams>()
            for (const param of config.training_area_params) {
                paramsMap.set(param.area_id, param)
            }

            // 运行优化器
            const optimizerResult = runOptimizer(
                {
                    current_stat: Number(currentStat),
                    stat_type: statType,
                    boosts,
                    multi_value: multiValue ? Number(multiValue) : undefined,
                    target_stat: targetStat ? Number(targetStat) : undefined
                },
                config.training_areas,
                paramsMap,
                config.boost_sources,
                config.version_key
            )

            setResult(optimizerResult)
        } catch (err) {
            setError('Calculation failed. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }, [config, currentStat, targetStat, statType, boosts, multiValue])

    if (isLoadingConfig) {
        return (
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-zinc-400" />
                    <p className="mt-4 text-zinc-400">Loading optimizer data...</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Calculator className="h-5 w-5 text-purple-400" />
                        Training Optimizer
                    </CardTitle>
                    <CardDescription>
                        Find the best training area for your current stats and boosts
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Stat Type & Current Value */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="stat_type">Stat Type</Label>
                            <Select
                                value={statType}
                                onValueChange={(v) => setStatType(v as StatType)}
                            >
                                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STAT_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {STAT_TYPE_LABELS[type]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="current_stat">Current {STAT_TYPE_LABELS[statType]}</Label>
                            <Input
                                id="current_stat"
                                type="number"
                                placeholder="e.g. 1000000"
                                value={currentStat}
                                onChange={(e) => setCurrentStat(e.target.value)}
                                className="bg-zinc-800 border-zinc-700"
                            />
                        </div>
                    </div>

                    {/* Target Stat & Multi Value - PC端并排 */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="target_stat">
                                Target {STAT_TYPE_LABELS[statType]} (Optional)
                            </Label>
                            <Input
                                id="target_stat"
                                type="number"
                                placeholder="e.g. 10000000"
                                value={targetStat}
                                onChange={(e) => setTargetStat(e.target.value)}
                                className="bg-zinc-800 border-zinc-700"
                            />
                            <p className="text-xs text-zinc-500">
                                Set a target to see estimated time
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="multi_value" className="flex items-center gap-2">
                                Multi Value (Optional)
                                <HelpCircle className="h-3.5 w-3.5 text-zinc-500" />
                            </Label>
                            <Input
                                id="multi_value"
                                type="number"
                                placeholder="e.g. 50000"
                                value={multiValue}
                                onChange={(e) => setMultiValue(e.target.value)}
                                className="bg-zinc-800 border-zinc-700"
                            />
                            <p className="text-xs text-zinc-500">
                                Max 131K without No Limit gamepass
                            </p>
                        </div>
                    </div>

                    {/* Boost Selector */}
                    <BoostSelector value={boosts} onChange={setBoosts} />

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Action Buttons - PC端居中固定宽度 */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                        <Button
                            onClick={handleCalculate}
                            disabled={isLoading || !currentStat}
                            className="sm:w-48 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                <>
                                    <Calculator className="mr-2 h-4 w-4" />
                                    Calculate
                                </>
                            )}
                        </Button>
                        <Link href="/calibrate">
                            <Button variant="outline" className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Calibrate
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            {result && (
                <ResultsCards
                    recommendations={result.top_areas}
                    multTotal={result.mult_total}
                    minutesToTarget={result.minutes_to_target}
                    targetStat={targetStat ? Number(targetStat) : undefined}
                    currentStat={Number(currentStat)}
                />
            )}
        </div>
    )
}
