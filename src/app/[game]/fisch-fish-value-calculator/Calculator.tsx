'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Fish, Coins, Scale } from 'lucide-react'

const GAME_SLUG = 'fisch'

const FISH_TYPES = [
    { name: 'Trout', baseValue: 15 },
    { name: 'Salmon', baseValue: 40 },
    { name: 'Bass', baseValue: 25 },
    { name: 'Shark', baseValue: 500 },
    { name: 'Whale', baseValue: 2000 },
]

export default function FischValueCalculator() {
    const [selectedFish, setSelectedFish] = useState<string>(FISH_TYPES[0].name)
    const [weight, setWeight] = useState<number>(10)
    const [mutation, setMutation] = useState<string>('none')
    const [result, setResult] = useState<number | null>(null)

    const handleCalculate = () => {
        const fish = FISH_TYPES.find(f => f.name === selectedFish) || FISH_TYPES[0]
        let multiplier = 1

        // Weight multiplier (simplified)
        multiplier += (weight / 100)

        // Mutation multipliers
        if (mutation === 'golden') multiplier *= 2.5
        if (mutation === 'shiny') multiplier *= 1.5
        if (mutation === 'huge') multiplier *= 1.8
        if (mutation === 'mythical') multiplier *= 5

        const value = Math.floor(fish.baseValue * multiplier)
        setResult(value)
    }

    return (
        <CalculatorLayout
            title="Fish Value Calculator"
            description="Estimate the selling price of your catch based on weight and mutations."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Fish className="h-5 w-5 text-blue-400" />
                            Catch Details
                        </CardTitle>
                        <CardDescription>Enter fish stats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Fish Species</label>
                            <Select value={selectedFish} onValueChange={setSelectedFish}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    {FISH_TYPES.map(f => (
                                        <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Weight (kg)</label>
                            <Input
                                type="number"
                                min="0.1"
                                step="0.1"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Mutation</label>
                            <Select value={mutation} onValueChange={setMutation}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="shiny">Shiny (x1.5)</SelectItem>
                                    <SelectItem value="huge">Huge (x1.8)</SelectItem>
                                    <SelectItem value="golden">Golden (x2.5)</SelectItem>
                                    <SelectItem value="mythical">Mythical (x5.0)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2 mt-2"
                        >
                            Calculate Value
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result !== null ? (
                        <Card className="bg-zinc-900/50 border-zinc-800 h-full border-t-4 border-t-yellow-500">
                            <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                                <div className="p-4 bg-yellow-500/10 rounded-full mb-4">
                                    <Coins className="h-8 w-8 text-yellow-400" />
                                </div>
                                <div className="text-zinc-400 text-sm mb-2">Estimated Value</div>
                                <div className="text-5xl font-bold text-white tracking-tight">
                                    {result.toLocaleString()}
                                </div>
                                <div className="text-yellow-500 text-sm mt-2 font-medium">Coins</div>

                                <div className="mt-8 p-3 bg-zinc-950 rounded-lg border border-zinc-800 w-full">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Base Value:</span>
                                        <span className="text-zinc-300">{FISH_TYPES.find(f => f.name === selectedFish)?.baseValue}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-zinc-500">Mutation:</span>
                                        <span className="text-blue-300 capitalize">{mutation}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Scale className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter fish details to see value</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
