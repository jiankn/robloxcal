'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { RefreshCw, Sparkles, ArrowRight, Percent } from 'lucide-react'

const GAME_SLUG = 'bee-swarm-simulator'

// 蜜蜂类型及其花粉到蜂蜜转换率
const BEES = [
    { name: 'Basic Bee', convertRate: 100, emoji: '🐝' },
    { name: 'Brave Bee', convertRate: 110, emoji: '⚔️' },
    { name: 'Bumble Bee', convertRate: 120, emoji: '🐝' },
    { name: 'Hasty Bee', convertRate: 105, emoji: '💨' },
    { name: 'Looker Bee', convertRate: 115, emoji: '👁️' },
    { name: 'Rad Bee', convertRate: 130, emoji: '☢️' },
    { name: 'Demon Bee', convertRate: 150, emoji: '😈' },
    { name: 'Photon Bee', convertRate: 200, emoji: '✨' },
    { name: 'Vicious Bee', convertRate: 175, emoji: '💀' },
]

function formatNumber(value: number): string {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return `${Math.round(value)}`
}

export default function PollenToHoneyCalculator() {
    const [pollen, setPollen] = useState<number>(10000)
    const [beeCount, setBeeCount] = useState<number>(25)
    const [hiveBonus, setHiveBonus] = useState<number>(0)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 基础转换率 (假设混合蜂群平均)
    const avgConvertRate = 120
    const totalConvertRate = avgConvertRate * (1 + hiveBonus / 100)

    // 蜂蜜产出
    const honeyOutput = pollen * (totalConvertRate / 100)

    // 每只蜜蜂贡献
    const honeyPerBee = honeyOutput / beeCount

    return (
        <CalculatorLayout
            title="Pollen to Honey Converter"
            description="Convert pollen to honey with accurate multiplier calculations."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-yellow-400" />
                            Conversion Setup
                        </CardTitle>
                        <CardDescription>Enter your hive stats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Pollen Amount</label>
                            <Input
                                type="number"
                                min="0"
                                value={pollen}
                                onChange={(e) => {
                                    setPollen(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 10000"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Bee Count</label>
                            <Input
                                type="number"
                                min="1"
                                max="50"
                                value={beeCount}
                                onChange={(e) => {
                                    setBeeCount(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Hive Bonus (%)</label>
                            <Input
                                type="number"
                                min="0"
                                value={hiveBonus}
                                onChange={(e) => {
                                    setHiveBonus(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 50"
                            />
                            <p className="text-xs text-zinc-500">From hive slots, amulets, and gear</p>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2"
                        >
                            Convert
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <>
                            <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-4 mb-4">
                                            <div className="text-center">
                                                <div className="text-sm text-zinc-400 mb-1">Pollen</div>
                                                <div className="text-2xl font-bold text-green-400">
                                                    {formatNumber(pollen)}
                                                </div>
                                            </div>
                                            <ArrowRight className="h-6 w-6 text-zinc-500" />
                                            <div className="text-center">
                                                <div className="text-sm text-zinc-400 mb-1">Honey</div>
                                                <div className="text-2xl font-bold text-yellow-400">
                                                    {formatNumber(honeyOutput)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-sm text-zinc-400">
                                            Conversion rate: {totalConvertRate.toFixed(1)}%
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-400" />
                                        Breakdown
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Base Rate</span>
                                        <span className="text-white font-medium">{avgConvertRate}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Hive Bonus</span>
                                        <span className="text-green-400 font-medium">+{hiveBonus}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Total Rate</span>
                                        <span className="text-yellow-400 font-bold">{totalConvertRate.toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                                        <span className="text-yellow-300">Honey/Bee</span>
                                        <span className="text-yellow-400 font-bold">{formatNumber(honeyPerBee)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Percent className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter pollen to see honey conversion</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
