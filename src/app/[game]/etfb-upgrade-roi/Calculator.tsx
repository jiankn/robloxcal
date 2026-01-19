'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { TrendingUp, DollarSign, Zap, BarChart3 } from 'lucide-react'

const GAME_SLUG = 'escape-tsunami-for-brainrots'

// 升级数据
const UPGRADES = [
    { name: 'Speed Boost', baseCost: 100, costMulti: 1.5, effect: 'speed', effectValue: 5 },
    { name: 'Jump Height', baseCost: 150, costMulti: 1.6, effect: 'jump', effectValue: 3 },
    { name: 'Stamina', baseCost: 200, costMulti: 1.4, effect: 'stamina', effectValue: 10 },
    { name: 'Water Resistance', baseCost: 500, costMulti: 1.8, effect: 'resist', effectValue: 2 },
    { name: 'Coin Magnet', baseCost: 300, costMulti: 1.5, effect: 'coins', effectValue: 8 },
]

function formatNumber(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return `${Math.round(value)}`
}

export default function UpgradeRoiCalculator() {
    const [currentCoins, setCurrentCoins] = useState<number>(1000)
    const [incomePerMin, setIncomePerMin] = useState<number>(50)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 计算每个升级的 ROI
    const upgradeAnalysis = UPGRADES.map(upgrade => {
        // 假设每级提供固定效果值
        const cost = upgrade.baseCost
        const effectDesc = upgrade.effect === 'coins'
            ? `+${upgrade.effectValue}% income`
            : `+${upgrade.effectValue} ${upgrade.effect}`

        // 对于增加收入的升级，计算回本时间
        let paybackTime = Infinity
        if (upgrade.effect === 'coins') {
            const incomeIncrease = incomePerMin * (upgrade.effectValue / 100)
            paybackTime = cost / incomeIncrease
        }

        // ROI 评分 (效果值 / 成本 * 1000)
        const roiScore = (upgrade.effectValue / cost) * 1000

        return {
            ...upgrade,
            effectDesc,
            paybackTime,
            roiScore,
            affordable: currentCoins >= cost
        }
    }).sort((a, b) => b.roiScore - a.roiScore)

    return (
        <CalculatorLayout
            title="Upgrade ROI Calculator"
            description="Find the best upgrades for your coins in Escape Tsunami For Brainrots."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-cyan-400" />
                            Your Stats
                        </CardTitle>
                        <CardDescription>Enter your current progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Current Coins</label>
                            <Input
                                type="number"
                                min="0"
                                value={currentCoins}
                                onChange={(e) => {
                                    setCurrentCoins(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 1000"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Income per Minute</label>
                            <Input
                                type="number"
                                min="1"
                                value={incomePerMin}
                                onChange={(e) => {
                                    setIncomePerMin(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 50"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-2"
                        >
                            Analyze Upgrades
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-xl text-white flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                                    ROI Rankings
                                </CardTitle>
                                <CardDescription>Best value upgrades (sorted by ROI)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {upgradeAnalysis.map((upgrade, index) => (
                                    <div
                                        key={upgrade.name}
                                        className={`p-4 rounded-lg border ${upgrade.affordable
                                                ? index === 0
                                                    ? 'bg-cyan-500/10 border-cyan-500/30'
                                                    : 'bg-zinc-950/50 border-zinc-800'
                                                : 'bg-zinc-950/30 border-zinc-800/50 opacity-60'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-bold ${index === 0 ? 'text-yellow-400' : 'text-zinc-500'}`}>
                                                        #{index + 1}
                                                    </span>
                                                    <span className="font-medium text-white">{upgrade.name}</span>
                                                </div>
                                                <span className="text-xs text-zinc-400">{upgrade.effectDesc}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold">{formatNumber(upgrade.baseCost)}</div>
                                                <div className="text-xs text-zinc-500">coins</div>
                                            </div>
                                        </div>

                                        {upgrade.effect === 'coins' && upgrade.paybackTime !== Infinity && (
                                            <div className="text-xs text-green-400">
                                                Payback: {formatNumber(upgrade.paybackTime)} min
                                            </div>
                                        )}

                                        {!upgrade.affordable && (
                                            <div className="text-xs text-red-400 mt-1">
                                                Need {formatNumber(upgrade.baseCost - currentCoins)} more coins
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your stats to see upgrade rankings</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
