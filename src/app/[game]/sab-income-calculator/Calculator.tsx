'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { CalculatorResult } from '@/components/CalculatorLayout'
import { Wallet, TrendingUp, Plus, Trash2 } from 'lucide-react'

const GAME_SLUG = 'steal-a-brainrot'

// Mock data for Brainrots
const BRAINROTS = [
    { id: 'skibidi', name: 'Skibidi', baseIncome: 10 },
    { id: 'rizzler', name: 'Rizzler', baseIncome: 25 },
    { id: 'sigma', name: 'Sigma', baseIncome: 60 },
    { id: 'gigachad', name: 'Gigachad', baseIncome: 150 },
]

export default function SabIncomeCalculator() {
    const [multiplier, setMultiplier] = useState<number>(1)
    const [inventory, setInventory] = useState<Record<string, number>>({})
    const [result, setResult] = useState<any>(null)

    const updateInventory = (id: string, count: number) => {
        setInventory(prev => ({ ...prev, [id]: Math.max(0, count) }))
    }

    const handleCalculate = () => {
        let totalBaseIncome = 0
        Object.entries(inventory).forEach(([id, count]) => {
            const item = BRAINROTS.find(b => b.id === id)
            if (item) {
                totalBaseIncome += item.baseIncome * count
            }
        })

        const incomePerSecond = totalBaseIncome * multiplier
        const incomePerMinute = incomePerSecond * 60
        const incomePerHour = incomePerMinute * 60

        setResult({
            perSecond: incomePerSecond,
            perMinute: incomePerMinute,
            perHour: incomePerHour
        })
    }

    return (
        <CalculatorLayout
            title="Income Calculator"
            description="Calculate your total income based on your Brainrot collection and multipliers."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-orange-500" />
                            Inventory & Stats
                        </CardTitle>
                        <CardDescription>Add your brainrots and multipliers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Total Multiplier</label>
                            <Input
                                type="number"
                                min="1"
                                step="0.1"
                                value={multiplier}
                                onChange={(e) => setMultiplier(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-300">Your Brainrots</label>
                            {BRAINROTS.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium">{item.name}</span>
                                        <span className="text-xs text-zinc-500">${item.baseIncome}/s</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline" size="icon" className="h-8 w-8 border-zinc-700"
                                            onClick={() => updateInventory(item.id, (inventory[item.id] || 0) - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="w-8 text-center text-white">{inventory[item.id] || 0}</span>
                                        <Button
                                            variant="outline" size="icon" className="h-8 w-8 border-zinc-700 hover:bg-orange-500/20 hover:text-orange-400 hover:border-orange-500/50"
                                            onClick={() => updateInventory(item.id, (inventory[item.id] || 0) + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2"
                        >
                            Calculate Income
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result ? (
                        <div className="grid gap-4">
                            <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-green-500">
                                <CardContent className="p-6">
                                    <div className="text-zinc-400 text-sm mb-1">Income Per Second</div>
                                    <div className="text-3xl font-bold text-green-400">
                                        ${result.perSecond.toLocaleString()}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-green-500">
                                <CardContent className="p-6">
                                    <div className="text-zinc-400 text-sm mb-1">Income Per Minute</div>
                                    <div className="text-3xl font-bold text-green-400">
                                        ${result.perMinute.toLocaleString()}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-green-500">
                                <CardContent className="p-6">
                                    <div className="text-zinc-400 text-sm mb-1">Income Per Hour</div>
                                    <div className="text-3xl font-bold text-green-400">
                                        ${result.perHour.toLocaleString()}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Add brainrots to calculate income</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
