'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Target, Sparkles, Skull, BarChart3 } from 'lucide-react'

const GAME_SLUG = 'steal-a-brainrot'

// Brainrot 稀有度数据
const BRAINROTS = [
    { name: 'Common Brainrot', rarity: 'Common', baseChance: 50, value: 10, color: 'text-zinc-400' },
    { name: 'Unusual Brainrot', rarity: 'Unusual', baseChance: 25, value: 50, color: 'text-green-400' },
    { name: 'Rare Brainrot', rarity: 'Rare', baseChance: 15, value: 150, color: 'text-blue-400' },
    { name: 'Epic Brainrot', rarity: 'Epic', baseChance: 7, value: 500, color: 'text-purple-400' },
    { name: 'Legendary Brainrot', rarity: 'Legendary', baseChance: 2.5, value: 2000, color: 'text-orange-400' },
    { name: 'Mythical Brainrot', rarity: 'Mythical', baseChance: 0.5, value: 10000, color: 'text-red-500' },
]

export default function SabDropRateCalculator() {
    const [luck, setLuck] = useState<number>(0)
    const [stealsPerMin, setStealsPerMin] = useState<number>(5)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 计算调整后的掉落率
    const adjustedDrops = BRAINROTS.map(br => {
        // 幸运值增加稀有掉落概率
        const luckMulti = 1 + (luck / 100)
        let adjustedChance = br.baseChance

        // 稀有的提升更多
        if (br.rarity !== 'Common') {
            adjustedChance = br.baseChance * luckMulti
        }

        const catchesPerHour = stealsPerMin * 60
        const expectedPerHour = (adjustedChance / 100) * catchesPerHour
        const valuePerHour = expectedPerHour * br.value

        return {
            ...br,
            adjustedChance,
            expectedPerHour,
            valuePerHour
        }
    })

    const totalValuePerHour = adjustedDrops.reduce((sum, d) => sum + d.valuePerHour, 0)

    return (
        <CalculatorLayout
            title="Drop Rate Calculator"
            description="See how luck affects your chances of stealing rare brainrots."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-400" />
                            Your Stats
                        </CardTitle>
                        <CardDescription>Enter your stealing stats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Steals per Minute</label>
                            <Input
                                type="number"
                                min="1"
                                step="0.5"
                                value={stealsPerMin}
                                onChange={(e) => {
                                    setStealsPerMin(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 5"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2"
                        >
                            Calculate Drops
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <>
                            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <Skull className="h-10 w-10 mx-auto text-purple-400 mb-2" />
                                        <div className="text-3xl font-bold text-purple-400 mb-1">
                                            ${Math.round(totalValuePerHour).toLocaleString()}/hr
                                        </div>
                                        <p className="text-zinc-400">Expected value from drops</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-yellow-400" />
                                        Drop Rate Breakdown
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {adjustedDrops.map(drop => (
                                        <div key={drop.name} className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg">
                                            <div>
                                                <span className={`font-medium ${drop.color}`}>{drop.rarity}</span>
                                                <div className="text-xs text-zinc-500">
                                                    ~{drop.expectedPerHour.toFixed(1)}/hr
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-medium">{drop.adjustedChance.toFixed(2)}%</div>
                                                <div className="text-xs text-yellow-400">${Math.round(drop.valuePerHour).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Sparkles className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your stats to see drop rates</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
