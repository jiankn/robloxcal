'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Zap, Clock, TrendingUp, Target } from 'lucide-react'

const GAME_SLUG = 'escape-tsunami-for-brainrots'

function formatTime(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`
    if (seconds < 3600) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.round(seconds % 60)
        return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
    }
    const hours = Math.floor(seconds / 3600)
    const mins = Math.round((seconds % 3600) / 60)
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export default function SpeedPlannerCalculator() {
    const [currentSpeed, setCurrentSpeed] = useState<number>(10)
    const [targetSpeed, setTargetSpeed] = useState<number>(50)
    const [speedPerUpgrade, setSpeedPerUpgrade] = useState<number>(5)
    const [upgradeCost, setUpgradeCost] = useState<number>(100)
    const [incomePerMin, setIncomePerMin] = useState<number>(50)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    // 计算所需升级次数
    const upgradesNeeded = Math.ceil((targetSpeed - currentSpeed) / speedPerUpgrade)
    const totalCost = upgradesNeeded * upgradeCost
    const farmingTime = (totalCost / incomePerMin) * 60 // 秒

    return (
        <CalculatorLayout
            title="Speed Planner"
            description="Plan your speed upgrades and estimate time to reach your goal."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-400" />
                            Speed Goals
                        </CardTitle>
                        <CardDescription>Set your speed targets</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Current Speed</label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={currentSpeed}
                                    onChange={(e) => {
                                        setCurrentSpeed(Number(e.target.value))
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Target Speed</label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={targetSpeed}
                                    onChange={(e) => {
                                        setTargetSpeed(Number(e.target.value))
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Speed/Upgrade</label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={speedPerUpgrade}
                                    onChange={(e) => {
                                        setSpeedPerUpgrade(Number(e.target.value) || 1)
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Cost/Upgrade</label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={upgradeCost}
                                    onChange={(e) => {
                                        setUpgradeCost(Number(e.target.value) || 1)
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
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
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2"
                        >
                            Plan Route
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <>
                            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <Target className="h-10 w-10 mx-auto text-purple-400 mb-2" />

                                        <div className="text-lg text-zinc-400 mb-2">
                                            {currentSpeed} → {targetSpeed} Speed
                                        </div>

                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <Clock className="h-5 w-5 text-purple-400" />
                                            <span className="text-3xl font-bold text-purple-400">
                                                {formatTime(farmingTime)}
                                            </span>
                                        </div>

                                        <p className="text-zinc-400">estimated farming time</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white">Plan Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Speed Gain Needed</span>
                                        <span className="text-white font-medium">+{targetSpeed - currentSpeed}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Upgrades Needed</span>
                                        <span className="text-purple-400 font-medium">{upgradesNeeded}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Total Cost</span>
                                        <span className="text-yellow-400 font-bold">{totalCost.toLocaleString()} coins</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Set your speed goals to see the plan</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
