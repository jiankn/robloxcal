'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { DollarSign, Clock, TrendingUp, Fish, Sparkles } from 'lucide-react'

const GAME_SLUG = 'fish-it'

// 鱼类数据 - 按稀有度
const FISH_DATA = [
    { rarity: 'Common', avgValue: 5, color: 'text-zinc-400' },
    { rarity: 'Rare', avgValue: 25, color: 'text-blue-400' },
    { rarity: 'Epic', avgValue: 100, color: 'text-purple-400' },
    { rarity: 'Legendary', avgValue: 500, color: 'text-orange-400' },
    { rarity: 'Mythic', avgValue: 2500, color: 'text-red-500' },
]

// 时间格式化
function formatMoney(value: number): string {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${Math.round(value)}`
}

export default function FishitProfitCalculator() {
    const [luck, setLuck] = useState<number>(0)
    const [catchesPerMinute, setCatchesPerMinute] = useState<number>(2)
    const [hoursPlayed, setHoursPlayed] = useState<number>(1)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 计算每个稀有度的概率（考虑幸运值）
    const getDropRate = (baseOneIn: number) => {
        const improvedOneIn = Math.max(1, baseOneIn / (1 + luck / 100))
        return 1 / improvedOneIn
    }

    // 稀有度基础概率
    const dropRates = {
        Common: getDropRate(1),
        Rare: getDropRate(10),
        Epic: getDropRate(50),
        Legendary: getDropRate(200),
        Mythic: getDropRate(1000),
    }

    // 计算每分钟收益
    const totalCatches = catchesPerMinute * 60 * hoursPlayed

    // 按稀有度计算收益
    const earningsByRarity = FISH_DATA.map(fish => {
        const rate = dropRates[fish.rarity as keyof typeof dropRates]
        const catches = totalCatches * rate
        const earnings = catches * fish.avgValue
        return { ...fish, catches, earnings }
    })

    const totalEarnings = earningsByRarity.reduce((sum, f) => sum + f.earnings, 0)
    const perHour = totalEarnings / hoursPlayed
    const perMinute = perHour / 60

    return (
        <CalculatorLayout
            title="Profit per Hour Calculator"
            description="Calculate your expected earnings per hour based on your fishing speed and luck."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Fish className="h-5 w-5 text-teal-400" />
                            Fishing Setup
                        </CardTitle>
                        <CardDescription>Enter your fishing stats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Luck Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Total Luck</label>
                            <Input
                                type="number"
                                min="0"
                                value={luck}
                                onChange={(e) => {
                                    setLuck(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 50"
                            />
                        </div>

                        {/* Catches Per Minute */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Catches per Minute</label>
                            <Input
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={catchesPerMinute}
                                onChange={(e) => {
                                    setCatchesPerMinute(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 2"
                            />
                        </div>

                        {/* Hours Played */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Session Length (hours)</label>
                            <Input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={hoursPlayed}
                                onChange={(e) => {
                                    setHoursPlayed(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 1"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2"
                        >
                            Calculate Profit
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <>
                            {/* Main Result */}
                            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <DollarSign className="h-10 w-10 mx-auto text-green-400 mb-2" />

                                        <div className="text-4xl font-bold text-green-400 mb-2">
                                            {formatMoney(perHour)}/hr
                                        </div>

                                        <p className="text-zinc-400 mb-4">
                                            Expected hourly earnings
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-zinc-950/50 rounded-lg p-3">
                                                <div className="text-xs text-zinc-500">Per Minute</div>
                                                <div className="text-lg font-bold text-white">{formatMoney(perMinute)}</div>
                                            </div>
                                            <div className="bg-zinc-950/50 rounded-lg p-3">
                                                <div className="text-xs text-zinc-500">Session Total</div>
                                                <div className="text-lg font-bold text-yellow-400">{formatMoney(totalEarnings)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Breakdown by Rarity */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-400" />
                                        Earnings Breakdown
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {earningsByRarity.map(fish => (
                                        <div key={fish.rarity} className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg">
                                            <div>
                                                <span className={`font-medium ${fish.color}`}>{fish.rarity}</span>
                                                <span className="text-xs text-zinc-500 ml-2">~{Math.round(fish.catches)} caught</span>
                                            </div>
                                            <span className="text-white font-medium">{formatMoney(fish.earnings)}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your stats to see profit estimates</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tips Section */}
            <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                <CardHeader>
                    <CardTitle className="text-lg text-white">💡 Profit Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-zinc-400">
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">•</span>
                            Higher luck dramatically increases profit by improving rare fish drop rates
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">•</span>
                            Faster rods increase catches per minute, boosting overall earnings
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">•</span>
                            Mythic fish provide massive value - even a few per session can double your profit
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-400">•</span>
                            Use luck-boosting baits during fishing events for maximum earnings
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </CalculatorLayout>
    )
}
