'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Share2, Sparkles, Fish } from 'lucide-react'

const GAME_SLUG = 'fish-it'

const RARITIES = [
    { name: 'Common', baseOneIn: 1, color: 'text-zinc-400' },
    { name: 'Rare', baseOneIn: 10, color: 'text-blue-400' },
    { name: 'Epic', baseOneIn: 50, color: 'text-purple-400' },
    { name: 'Legendary', baseOneIn: 200, color: 'text-orange-400' },
    { name: 'Mythic', baseOneIn: 1000, color: 'text-red-500' },
]

export default function FishitLuckCalculator() {
    const [luck, setLuck] = useState<number>(0)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    return (
        <CalculatorLayout
            title="Luck & Drop Rate Calculator"
            description="See how your luck stat affects your chances of catching rare fish."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-teal-400" />
                            Fishing Stats
                        </CardTitle>
                        <CardDescription>Enter your total luck from rod and bait</CardDescription>
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

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-2"
                        >
                            Calculate Odds
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <Card className="bg-zinc-900/50 border-zinc-800 h-full">
                            <CardHeader>
                                <CardTitle className="text-xl text-white flex items-center gap-2">
                                    <Fish className="h-5 w-5 text-teal-500" />
                                    Drop Rates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {RARITIES.map(rarity => {
                                    // Simple formula: Base Chance * (1 + Luck/100)
                                    // Chance = 1 / (BaseOneIn / (1 + Luck/100))
                                    const improvedOneIn = Math.max(1, rarity.baseOneIn / (1 + luck / 100))
                                    const percent = (100 / improvedOneIn).toFixed(2)

                                    return (
                                        <div key={rarity.name} className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                                            <span className={`font-medium ${rarity.color}`}>{rarity.name}</span>
                                            <div className="text-right">
                                                <div className="text-white font-bold">{percent}%</div>
                                                <div className="text-xs text-zinc-500">1 in {improvedOneIn.toFixed(1)}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Share2 className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Calculate to see drop rates</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
