'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Target, Sparkles, Scale, TrendingUp } from 'lucide-react'

const GAME_SLUG = 'grow-a-garden'

// 宠物数据
const PETS = [
    { name: 'Bunny', baseWeight: 5, maxWeight: 50, growthRate: 2 },
    { name: 'Cat', baseWeight: 8, maxWeight: 80, growthRate: 1.8 },
    { name: 'Dog', baseWeight: 10, maxWeight: 100, growthRate: 1.5 },
    { name: 'Pig', baseWeight: 15, maxWeight: 150, growthRate: 2.5 },
    { name: 'Cow', baseWeight: 50, maxWeight: 500, growthRate: 1.2 },
    { name: 'Dragon', baseWeight: 100, maxWeight: 1000, growthRate: 3 },
]

export default function PetWeightCalculator() {
    const [petType, setPetType] = useState<string>('Bunny')
    const [currentWeight, setCurrentWeight] = useState<number>(10)
    const [targetWeight, setTargetWeight] = useState<number>(40)
    const [feedsPerDay, setFeedsPerDay] = useState<number>(10)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    const pet = PETS.find(p => p.name === petType)

    // 计算
    const weightNeeded = targetWeight - currentWeight
    const feedsNeeded = weightNeeded / (pet?.growthRate || 1)
    const daysNeeded = feedsNeeded / feedsPerDay

    // 当前进度百分比
    const progressPercent = pet ? (currentWeight / pet.maxWeight) * 100 : 0
    const targetPercent = pet ? (targetWeight / pet.maxWeight) * 100 : 0

    return (
        <CalculatorLayout
            title="Pet Weight Calculator"
            description="Calculate how to grow your pets and reach your weight goals."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Scale className="h-5 w-5 text-emerald-400" />
                            Pet Stats
                        </CardTitle>
                        <CardDescription>Enter your pet information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Pet Type</label>
                            <Select
                                value={petType}
                                onValueChange={(v) => { setPetType(v); setCalculated(false) }}
                            >
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {PETS.map(p => (
                                        <SelectItem key={p.name} value={p.name} className="text-white">
                                            {p.name} (Max: {p.maxWeight} lbs)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Current Weight</label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={currentWeight}
                                    onChange={(e) => {
                                        setCurrentWeight(Number(e.target.value))
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Target Weight</label>
                                <Input
                                    type="number"
                                    min="0"
                                    value={targetWeight}
                                    onChange={(e) => {
                                        setTargetWeight(Number(e.target.value))
                                        setCalculated(false)
                                    }}
                                    className="bg-zinc-950 border-zinc-800 text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Feeds per Day</label>
                            <Input
                                type="number"
                                min="1"
                                value={feedsPerDay}
                                onChange={(e) => {
                                    setFeedsPerDay(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-2"
                        >
                            Calculate
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated && pet ? (
                        <>
                            <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <div className="text-4xl mb-2">🐾</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{pet.name}</h3>

                                        <div className="text-3xl font-bold text-emerald-400 mb-1">
                                            {daysNeeded.toFixed(1)} days
                                        </div>
                                        <p className="text-zinc-400">to reach {targetWeight} lbs</p>

                                        {/* Progress bar */}
                                        <div className="mt-4 bg-zinc-800 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-zinc-500 mt-1">
                                            <span>{currentWeight} lbs ({progressPercent.toFixed(0)}%)</span>
                                            <span>{pet.maxWeight} lbs max</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white">Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Weight to Gain</span>
                                        <span className="text-white font-medium">+{weightNeeded} lbs</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Growth Rate</span>
                                        <span className="text-green-400 font-medium">{pet.growthRate} lbs/feed</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Total Feeds</span>
                                        <span className="text-white font-medium">{Math.ceil(feedsNeeded)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your pet info to see growth plan</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
