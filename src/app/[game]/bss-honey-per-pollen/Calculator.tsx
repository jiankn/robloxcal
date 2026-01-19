'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { TrendingUp, BarChart3, Sparkles, Hexagon } from 'lucide-react'

const GAME_SLUG = 'bee-swarm-simulator'

function formatNumber(value: number): string {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return `${Math.round(value)}`
}

export default function HoneyPerPollenCalculator() {
    const [totalHoney, setTotalHoney] = useState<number>(100000)
    const [totalPollen, setTotalPollen] = useState<number>(80000)
    const [timeMinutes, setTimeMinutes] = useState<number>(10)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 计算效率指标
    const honeyPerPollen = totalHoney / totalPollen
    const honeyPerMinute = totalHoney / timeMinutes
    const pollenPerMinute = totalPollen / timeMinutes
    const conversionEfficiency = (totalHoney / totalPollen) * 100

    // 效率评级
    let efficiencyRating = 'Low'
    let ratingColor = 'text-red-400'
    if (conversionEfficiency >= 150) {
        efficiencyRating = 'Excellent'
        ratingColor = 'text-green-400'
    } else if (conversionEfficiency >= 125) {
        efficiencyRating = 'Good'
        ratingColor = 'text-blue-400'
    } else if (conversionEfficiency >= 100) {
        efficiencyRating = 'Average'
        ratingColor = 'text-yellow-400'
    }

    return (
        <CalculatorLayout
            title="Honey per Pollen Rate Calculator"
            description="Calculate your honey efficiency rate and compare different setups."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-orange-400" />
                            Session Stats
                        </CardTitle>
                        <CardDescription>Enter your farming session data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Total Honey Earned</label>
                            <Input
                                type="number"
                                min="0"
                                value={totalHoney}
                                onChange={(e) => {
                                    setTotalHoney(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Total Pollen Collected</label>
                            <Input
                                type="number"
                                min="1"
                                value={totalPollen}
                                onChange={(e) => {
                                    setTotalPollen(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Session Time (minutes)</label>
                            <Input
                                type="number"
                                min="1"
                                value={timeMinutes}
                                onChange={(e) => {
                                    setTimeMinutes(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-2"
                        >
                            Analyze Efficiency
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <>
                            <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-orange-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <Hexagon className="h-10 w-10 mx-auto text-orange-400 mb-2" />

                                        <div className="text-4xl font-bold text-orange-400 mb-1">
                                            {honeyPerPollen.toFixed(2)}
                                        </div>
                                        <p className="text-zinc-400 mb-4">Honey per Pollen</p>

                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${ratingColor} bg-zinc-950/50`}>
                                            <Sparkles className="h-4 w-4" />
                                            <span className="font-medium">{efficiencyRating} Efficiency</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white">Rate Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Honey/min</span>
                                        <span className="text-yellow-400 font-medium">{formatNumber(honeyPerMinute)}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Pollen/min</span>
                                        <span className="text-green-400 font-medium">{formatNumber(pollenPerMinute)}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Conversion Rate</span>
                                        <span className="text-orange-400 font-bold">{conversionEfficiency.toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                                        <span className="text-yellow-300">Hourly Honey</span>
                                        <span className="text-yellow-400 font-bold">{formatNumber(honeyPerMinute * 60)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your session data to analyze efficiency</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
