'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Zap, Sparkles, TrendingUp, Star, Clock } from 'lucide-react'

const GAME_SLUG = 'grow-a-garden'

// 宠物等级数据
const LEVELS = [
    { level: 1, xpRequired: 0, bonusPercent: 0 },
    { level: 2, xpRequired: 100, bonusPercent: 5 },
    { level: 3, xpRequired: 300, bonusPercent: 10 },
    { level: 4, xpRequired: 600, bonusPercent: 15 },
    { level: 5, xpRequired: 1000, bonusPercent: 20 },
    { level: 6, xpRequired: 1500, bonusPercent: 25 },
    { level: 7, xpRequired: 2100, bonusPercent: 30 },
    { level: 8, xpRequired: 2800, bonusPercent: 35 },
    { level: 9, xpRequired: 3600, bonusPercent: 40 },
    { level: 10, xpRequired: 4500, bonusPercent: 50 },
]

function formatNumber(value: number): string {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return `${Math.round(value)}`
}

export default function PetXpCalculator() {
    const [currentXp, setCurrentXp] = useState<number>(0)
    const [targetLevel, setTargetLevel] = useState<number>(5)
    const [xpPerHarvest, setXpPerHarvest] = useState<number>(5)
    const [harvestsPerHour, setHarvestsPerHour] = useState<number>(12)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 找到当前等级
    const currentLevel = [...LEVELS].reverse().find(l => currentXp >= l.xpRequired)?.level || 1
    const currentLevelData = LEVELS.find(l => l.level === currentLevel)

    // 目标等级数据
    const targetLevelData = LEVELS.find(l => l.level === targetLevel)
    const xpNeeded = (targetLevelData?.xpRequired || 0) - currentXp

    // 计算时间
    const xpPerHour = xpPerHarvest * harvestsPerHour
    const hoursNeeded = xpNeeded / xpPerHour

    return (
        <CalculatorLayout
            title="Pet XP Calculator"
            description="Plan your pet leveling strategy and estimate time to reach target levels."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Zap className="h-5 w-5 text-blue-400" />
                            XP Setup
                        </CardTitle>
                        <CardDescription>Enter your pet XP info</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Current XP</label>
                            <Input
                                type="number"
                                min="0"
                                value={currentXp}
                                onChange={(e) => {
                                    setCurrentXp(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                            <p className="text-xs text-zinc-500">You are Level {currentLevel}</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Target Level</label>
                            <Select
                                value={String(targetLevel)}
                                onValueChange={(v) => { setTargetLevel(Number(v)); setCalculated(false) }}
                            >
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {LEVELS.filter(l => l.level > currentLevel).map(l => (
                                        <SelectItem key={l.level} value={String(l.level)} className="text-white">
                                            Level {l.level} (+{l.bonusPercent}% bonus)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">XP/Harvest</label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={xpPerHarvest}
                                    onChange={(e) => {
                                        setXpPerHarvest(Number(e.target.value) || 1)
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Harvests/Hour</label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={harvestsPerHour}
                                    onChange={(e) => {
                                        setHarvestsPerHour(Number(e.target.value) || 1)
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2"
                        >
                            Calculate
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated && targetLevelData ? (
                        <>
                            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <Star className="h-10 w-10 mx-auto text-blue-400 mb-2" />

                                        <div className="text-lg text-zinc-400 mb-2">
                                            Level {currentLevel} → Level {targetLevel}
                                        </div>

                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Clock className="h-5 w-5 text-blue-400" />
                                            <span className="text-3xl font-bold text-blue-400">
                                                {hoursNeeded.toFixed(1)} hours
                                            </span>
                                        </div>

                                        <p className="text-zinc-400">of active farming</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-400" />
                                        Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">XP Needed</span>
                                        <span className="text-white font-medium">{formatNumber(xpNeeded)}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">XP/Hour</span>
                                        <span className="text-blue-400 font-medium">{formatNumber(xpPerHour)}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                                        <span className="text-green-300">Level {targetLevel} Bonus</span>
                                        <span className="text-green-400 font-bold">+{targetLevelData.bonusPercent}%</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your XP info to see leveling plan</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
