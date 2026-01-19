'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Target, Fish, Sparkles, TrendingUp, Clock } from 'lucide-react'

const GAME_SLUG = 'fisch'

// 目标鱼类数据
const TARGET_FISH = [
    { name: 'Giant Bass', location: 'Lake', baseTime: 15, value: 500, difficulty: 'Easy' },
    { name: 'Golden Trout', location: 'River', baseTime: 30, value: 1500, difficulty: 'Medium' },
    { name: 'Prismatic Koi', location: 'Pond', baseTime: 45, value: 3000, difficulty: 'Hard' },
    { name: 'Abyssal Marlin', location: 'Ocean', baseTime: 60, value: 7500, difficulty: 'Very Hard' },
    { name: 'Legendary Leviathan', location: 'Deep Sea', baseTime: 120, value: 25000, difficulty: 'Extreme' },
]

// 装备加成
const ROD_BONUSES = [
    { name: 'Starter Rod', speedBonus: 0, luckBonus: 0 },
    { name: 'Iron Rod', speedBonus: 10, luckBonus: 5 },
    { name: 'Gold Rod', speedBonus: 25, luckBonus: 15 },
    { name: 'Diamond Rod', speedBonus: 50, luckBonus: 30 },
    { name: 'Legendary Rod', speedBonus: 100, luckBonus: 50 },
]

function formatTime(minutes: number): string {
    if (minutes < 60) return `${Math.round(minutes)} min`
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export default function TargetFishSolverCalculator() {
    const [targetFish, setTargetFish] = useState<string>('Giant Bass')
    const [rod, setRod] = useState<string>('Starter Rod')
    const [extraLuck, setExtraLuck] = useState<number>(0)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    const fish = TARGET_FISH.find(f => f.name === targetFish)
    const rodData = ROD_BONUSES.find(r => r.name === rod)

    const totalLuck = (rodData?.luckBonus || 0) + extraLuck
    const speedBonus = rodData?.speedBonus || 0

    // 调整后的时间
    const adjustedTime = fish ? fish.baseTime / (1 + speedBonus / 100) / (1 + totalLuck / 100) : 0

    // 每小时收益预估
    const catchesPerHour = 60 / adjustedTime
    const profitPerHour = fish ? catchesPerHour * fish.value : 0

    return (
        <CalculatorLayout
            title="Target Fish Solver"
            description="Find the optimal setup for catching specific fish in Fisch."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-400" />
                            Target Setup
                        </CardTitle>
                        <CardDescription>Select your target and equipment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Target Fish */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Target Fish</label>
                            <Select
                                value={targetFish}
                                onValueChange={(v) => { setTargetFish(v); setCalculated(false) }}
                            >
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {TARGET_FISH.map(f => (
                                        <SelectItem key={f.name} value={f.name} className="text-white">
                                            {f.name} - {f.location} ({f.difficulty})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Rod Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Fishing Rod</label>
                            <Select
                                value={rod}
                                onValueChange={(v) => { setRod(v); setCalculated(false) }}
                            >
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {ROD_BONUSES.map(r => (
                                        <SelectItem key={r.name} value={r.name} className="text-white">
                                            {r.name} (+{r.speedBonus}% Speed, +{r.luckBonus}% Luck)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Extra Luck */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Extra Luck (bait, buffs)</label>
                            <Input
                                type="number"
                                min="0"
                                value={extraLuck}
                                onChange={(e) => {
                                    setExtraLuck(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 20"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-2"
                        >
                            Solve
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated && fish ? (
                        <>
                            {/* Main Result */}
                            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <Fish className="h-10 w-10 mx-auto text-blue-400 mb-2" />
                                        <h3 className="text-xl font-bold text-white mb-2">{fish.name}</h3>

                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Clock className="h-5 w-5 text-blue-400" />
                                            <span className="text-3xl font-bold text-blue-400">
                                                {formatTime(adjustedTime)}
                                            </span>
                                        </div>

                                        <p className="text-zinc-400">per catch (average)</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-400" />
                                        Analysis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Location</span>
                                        <span className="text-white font-medium">{fish.location}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Difficulty</span>
                                        <span className="text-orange-400 font-medium">{fish.difficulty}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Total Luck</span>
                                        <span className="text-green-400 font-medium">+{totalLuck}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Catches/Hour</span>
                                        <span className="text-white font-medium">~{catchesPerHour.toFixed(1)}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                                        <span className="text-yellow-300">Profit/Hour</span>
                                        <span className="text-yellow-400 font-bold">${Math.round(profitPerHour).toLocaleString()}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Target className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Select a target fish to get recommendations</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
