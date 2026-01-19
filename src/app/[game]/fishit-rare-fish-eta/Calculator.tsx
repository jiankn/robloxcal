'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Clock, Trophy, Fish, Sparkles, Target } from 'lucide-react'

const GAME_SLUG = 'fish-it'

// 稀有鱼类数据
const RARE_FISH = [
    { name: 'Golden Carp', baseOneIn: 500, value: 1000, emoji: '🐠' },
    { name: 'Crystal Salmon', baseOneIn: 750, value: 2500, emoji: '💎' },
    { name: 'Void Shark', baseOneIn: 1000, value: 5000, emoji: '🦈' },
    { name: 'Ancient Leviathan', baseOneIn: 2500, value: 15000, emoji: '🐋' },
    { name: 'Prismatic Dragon Fish', baseOneIn: 5000, value: 50000, emoji: '🐉' },
]

// 时间格式化函数
function formatTime(minutes: number): string {
    if (minutes < 60) return `${Math.round(minutes)} min`
    if (minutes < 1440) {
        const hours = Math.floor(minutes / 60)
        const mins = Math.round(minutes % 60)
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    const days = Math.floor(minutes / 1440)
    const hours = Math.round((minutes % 1440) / 60)
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`
}

export default function RareFishEtaCalculator() {
    const [luck, setLuck] = useState<number>(0)
    const [catchesPerMinute, setCatchesPerMinute] = useState<number>(2)
    const [targetFish, setTargetFish] = useState<string>('Golden Carp')
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 获取目标鱼类信息
    const fish = RARE_FISH.find(f => f.name === targetFish)

    // 计算概率和 ETA
    const improvedOneIn = fish ? Math.max(1, fish.baseOneIn / (1 + luck / 100)) : 1
    const catchesNeeded = improvedOneIn
    const minutesNeeded = catchesNeeded / catchesPerMinute

    return (
        <CalculatorLayout
            title="Rare Fish ETA Calculator"
            description="Estimate how long it will take to catch specific rare fish based on your luck and fishing speed."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Target className="h-5 w-5 text-teal-400" />
                            Fishing Setup
                        </CardTitle>
                        <CardDescription>Configure your stats and target</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Target Fish Select */}
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
                                    {RARE_FISH.map(f => (
                                        <SelectItem key={f.name} value={f.name} className="text-white">
                                            {f.emoji} {f.name} (1 in {f.baseOneIn.toLocaleString()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

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
                            <p className="text-xs text-zinc-500">Your total luck from rod + bait + bonuses</p>
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
                            <p className="text-xs text-zinc-500">Average fish caught per minute (typically 1-3)</p>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-2"
                        >
                            Calculate ETA
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated && fish ? (
                        <>
                            {/* Main Result */}
                            <Card className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border-teal-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="text-5xl mb-3">{fish.emoji}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{fish.name}</h3>

                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <Clock className="h-5 w-5 text-teal-400" />
                                            <span className="text-3xl font-bold text-teal-400">
                                                {formatTime(minutesNeeded)}
                                            </span>
                                        </div>

                                        <p className="text-zinc-400">
                                            Expected time to catch (average)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats Breakdown */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-400" />
                                        Stats Breakdown
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Base Odds</span>
                                        <span className="text-white font-medium">1 in {fish.baseOneIn.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Your Odds</span>
                                        <span className="text-teal-400 font-medium">1 in {Math.round(improvedOneIn).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Luck Bonus</span>
                                        <span className="text-green-400 font-medium">+{luck}%</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Catches Needed</span>
                                        <span className="text-white font-medium">~{Math.round(catchesNeeded).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                                        <span className="text-yellow-300">Sell Value</span>
                                        <span className="text-yellow-400 font-bold">${fish.value.toLocaleString()}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Fish className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Select a target fish and calculate to see ETA</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* All Rare Fish Table */}
            {calculated && (
                <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-400" />
                            All Rare Fish ETAs
                        </CardTitle>
                        <CardDescription>Estimated time to catch each rare fish with your current setup</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {RARE_FISH.map(f => {
                                const fImprovedOneIn = Math.max(1, f.baseOneIn / (1 + luck / 100))
                                const fMinutes = fImprovedOneIn / catchesPerMinute

                                return (
                                    <div
                                        key={f.name}
                                        className={`p-4 rounded-lg border ${f.name === targetFish ? 'bg-teal-500/10 border-teal-500/30' : 'bg-zinc-950/50 border-zinc-800'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{f.emoji}</span>
                                            <div className="flex-1">
                                                <div className="font-medium text-white">{f.name}</div>
                                                <div className="text-sm text-teal-400">{formatTime(fMinutes)}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-zinc-500">Value</div>
                                                <div className="text-yellow-400 font-medium">${f.value.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </CalculatorLayout>
    )
}
