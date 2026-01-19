'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { TrendingUp, DollarSign, BarChart3, Skull } from 'lucide-react'

const GAME_SLUG = 'steal-a-brainrot'

// 投资选项
const INVESTMENTS = [
    { name: 'Speed Upgrade', cost: 500, incomeBoost: 10, type: 'permanent' },
    { name: 'Luck Potion', cost: 200, incomeBoost: 25, type: 'temporary', duration: 10 },
    { name: 'Double Coins', cost: 300, incomeBoost: 100, type: 'temporary', duration: 5 },
    { name: 'Magnet Upgrade', cost: 750, incomeBoost: 15, type: 'permanent' },
    { name: 'Storage Expansion', cost: 1000, incomeBoost: 20, type: 'permanent' },
]

function formatNumber(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return `${Math.round(value)}`
}

export default function SabRoiCalculator() {
    const [currentIncome, setCurrentIncome] = useState<number>(100)
    const [playTimeMinutes, setPlayTimeMinutes] = useState<number>(30)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 计算每个投资的 ROI
    const investmentAnalysis = INVESTMENTS.map(inv => {
        const incomeIncrease = currentIncome * (inv.incomeBoost / 100)

        let totalProfit: number
        let paybackTime: number

        if (inv.type === 'permanent') {
            // 永久升级：计算整个游戏时间的收益
            totalProfit = incomeIncrease * playTimeMinutes
            paybackTime = inv.cost / incomeIncrease
        } else {
            // 临时 buff：只在持续时间内有效
            const effectiveMins = Math.min(inv.duration || 0, playTimeMinutes)
            totalProfit = incomeIncrease * effectiveMins
            paybackTime = inv.cost / incomeIncrease
        }

        const netProfit = totalProfit - inv.cost
        const roiPercent = (netProfit / inv.cost) * 100

        return {
            ...inv,
            incomeIncrease,
            totalProfit,
            netProfit,
            paybackTime,
            roiPercent,
            isWorth: netProfit > 0
        }
    }).sort((a, b) => b.roiPercent - a.roiPercent)

    return (
        <CalculatorLayout
            title="ROI Calculator"
            description="Find the best investments for your coins in Steal a Brainrot."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-orange-400" />
                            Your Stats
                        </CardTitle>
                        <CardDescription>Enter your current stats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Current Income/min</label>
                            <Input
                                type="number"
                                min="1"
                                value={currentIncome}
                                onChange={(e) => {
                                    setCurrentIncome(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 100"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Play Time (minutes)</label>
                            <Input
                                type="number"
                                min="1"
                                value={playTimeMinutes}
                                onChange={(e) => {
                                    setPlayTimeMinutes(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 30"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2"
                        >
                            Calculate ROI
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-xl text-white flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-orange-400" />
                                    Investment Rankings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {investmentAnalysis.map((inv, index) => (
                                    <div
                                        key={inv.name}
                                        className={`p-4 rounded-lg border ${inv.isWorth
                                                ? index === 0
                                                    ? 'bg-green-500/10 border-green-500/30'
                                                    : 'bg-zinc-950/50 border-zinc-800'
                                                : 'bg-red-500/5 border-red-500/20'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-bold ${index === 0 ? 'text-yellow-400' : 'text-zinc-500'}`}>
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-medium text-white">{inv.name}</span>
                                                    <span className={`text-xs px-1.5 py-0.5 rounded ${inv.type === 'permanent' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
                                                        {inv.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`font-bold ${inv.isWorth ? 'text-green-400' : 'text-red-400'}`}>
                                                    {inv.roiPercent > 0 ? '+' : ''}{inv.roiPercent.toFixed(0)}%
                                                </div>
                                                <div className="text-xs text-zinc-500">ROI</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="text-center p-1 bg-zinc-950/50 rounded">
                                                <div className="text-zinc-500">Cost</div>
                                                <div className="text-white">{formatNumber(inv.cost)}</div>
                                            </div>
                                            <div className="text-center p-1 bg-zinc-950/50 rounded">
                                                <div className="text-zinc-500">+Income</div>
                                                <div className="text-white">+{inv.incomeBoost}%</div>
                                            </div>
                                            <div className="text-center p-1 bg-zinc-950/50 rounded">
                                                <div className="text-zinc-500">Net</div>
                                                <div className={inv.netProfit > 0 ? 'text-green-400' : 'text-red-400'}>
                                                    {inv.netProfit > 0 ? '+' : ''}{formatNumber(inv.netProfit)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your stats to see ROI analysis</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
