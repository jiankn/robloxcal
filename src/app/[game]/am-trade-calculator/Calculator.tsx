'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, ArrowRight, Info, AlertTriangle, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Pet data with values
const PETS = [
    // Legendary
    { id: 'frost-dragon', name: 'Frost Dragon', rarity: 'Legendary', value: 1000, tier: 'High' },
    { id: 'shadow-dragon', name: 'Shadow Dragon', rarity: 'Legendary', value: 1200, tier: 'High' },
    { id: 'bat-dragon', name: 'Bat Dragon', rarity: 'Legendary', value: 950, tier: 'High' },
    { id: 'giraffe', name: 'Giraffe', rarity: 'Legendary', value: 900, tier: 'High' },
    { id: 'owl', name: 'Owl', rarity: 'Legendary', value: 700, tier: 'High' },
    { id: 'parrot', name: 'Parrot', rarity: 'Legendary', value: 550, tier: 'Mid' },
    { id: 'crow', name: 'Crow', rarity: 'Legendary', value: 450, tier: 'Mid' },
    { id: 'evil-unicorn', name: 'Evil Unicorn', rarity: 'Legendary', value: 400, tier: 'Mid' },
    { id: 'arctic-reindeer', name: 'Arctic Reindeer', rarity: 'Legendary', value: 300, tier: 'Mid' },
    { id: 'kangaroo', name: 'Kangaroo', rarity: 'Legendary', value: 150, tier: 'Low' },
    { id: 'turtle', name: 'Turtle', rarity: 'Legendary', value: 180, tier: 'Low' },
    { id: 'unicorn', name: 'Unicorn', rarity: 'Legendary', value: 50, tier: 'Low' },
    { id: 'dragon', name: 'Dragon', rarity: 'Legendary', value: 45, tier: 'Low' },
    // Ultra Rare
    { id: 'hedgehog', name: 'Hedgehog', rarity: 'Ultra Rare', value: 200, tier: 'Mid' },
    { id: 'flamingo', name: 'Flamingo', rarity: 'Ultra Rare', value: 180, tier: 'Mid' },
    { id: 'lion', name: 'Lion', rarity: 'Ultra Rare', value: 100, tier: 'Low' },
    { id: 'crocodile', name: 'Crocodile', rarity: 'Ultra Rare', value: 80, tier: 'Low' },
]

const RARITY_COLORS: Record<string, string> = {
    'Common': 'bg-gray-500/20 text-gray-400',
    'Uncommon': 'bg-green-500/20 text-green-400',
    'Rare': 'bg-blue-500/20 text-blue-400',
    'Ultra Rare': 'bg-purple-500/20 text-purple-400',
    'Legendary': 'bg-yellow-500/20 text-yellow-400',
}

const TIER_MULTIPLIERS: Record<string, number> = {
    'Normal': 1,
    'Neon': 3,
    'Mega Neon': 12,
}

export default function AdoptMeTradeCalculator() {
    const [yourPet, setYourPet] = useState('')
    const [yourTier, setYourTier] = useState('Normal')
    const [theirPet, setTheirPet] = useState('')
    const [theirTier, setTheirTier] = useState('Normal')

    const pet1 = PETS.find(p => p.id === yourPet)
    const pet2 = PETS.find(p => p.id === theirPet)

    const calcValue = (pet: typeof PETS[0] | undefined, tier: string) => {
        if (!pet) return 0
        return pet.value * TIER_MULTIPLIERS[tier]
    }

    const yourValue = calcValue(pet1, yourTier)
    const theirValue = calcValue(pet2, theirTier)

    const getVerdict = () => {
        if (!pet1 || !pet2) return null
        const diff = theirValue - yourValue
        const ratio = theirValue / yourValue

        if (ratio > 1.2) return {
            verdict: 'WIN',
            icon: ThumbsUp,
            color: 'text-green-400',
            bgColor: 'bg-green-500/10 border-green-500/30',
            message: `You're getting ${((ratio - 1) * 100).toFixed(0)}% more value!`
        }
        if (ratio < 0.8) return {
            verdict: 'LOSE',
            icon: ThumbsDown,
            color: 'text-red-400',
            bgColor: 'bg-red-500/10 border-red-500/30',
            message: `You're losing ${((1 - ratio) * 100).toFixed(0)}% value!`
        }
        return {
            verdict: 'FAIR',
            icon: Minus,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10 border-yellow-500/30',
            message: 'Values are roughly equal'
        }
    }

    const verdict = getVerdict()

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-pink-950/20 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Adopt Me Trade Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Check if a trade is Win, Fair, or Lose (WFL)
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="Neon pets are worth ~3x and Mega Neons are worth ~12x normal pets!" />

                {/* Trade Comparison */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-pink-400" />
                            Compare Trade
                        </CardTitle>
                        <CardDescription>Select pets to compare their values</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6 items-start">
                            {/* Your Pet */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white text-center">Your Pet</h3>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Pet</Label>
                                    <Select value={yourPet} onValueChange={setYourPet}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue placeholder="Select pet..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PETS.map(p => (
                                                <SelectItem key={p.id} value={p.id}>
                                                    {p.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Type</Label>
                                    <Select value={yourTier} onValueChange={setYourTier}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Normal">Normal</SelectItem>
                                            <SelectItem value="Neon">Neon (3x)</SelectItem>
                                            <SelectItem value="Mega Neon">Mega Neon (12x)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {pet1 && (
                                    <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                        <Badge className={RARITY_COLORS[pet1.rarity]}>{pet1.rarity}</Badge>
                                        <div className="text-lg font-bold text-white mt-2">{pet1.name}</div>
                                        <div className="text-sm text-zinc-400">{yourTier}</div>
                                        <div className="text-2xl font-bold text-pink-400 mt-2">{yourValue}</div>
                                        <div className="text-xs text-zinc-500">value points</div>
                                    </div>
                                )}
                            </div>

                            {/* Arrow / Verdict */}
                            <div className="flex flex-col items-center justify-center py-8">
                                <ArrowRight className="h-8 w-8 text-zinc-500 rotate-0 md:rotate-0" />
                                {verdict && (
                                    <div className={`mt-4 p-4 rounded-lg border text-center ${verdict.bgColor}`}>
                                        <verdict.icon className={`h-8 w-8 mx-auto ${verdict.color}`} />
                                        <div className={`text-xl font-bold mt-2 ${verdict.color}`}>
                                            {verdict.verdict}
                                        </div>
                                        <div className="text-sm text-zinc-400 mt-1">{verdict.message}</div>
                                    </div>
                                )}
                            </div>

                            {/* Their Pet */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white text-center">Their Pet</h3>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Pet</Label>
                                    <Select value={theirPet} onValueChange={setTheirPet}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue placeholder="Select pet..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PETS.map(p => (
                                                <SelectItem key={p.id} value={p.id}>
                                                    {p.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Type</Label>
                                    <Select value={theirTier} onValueChange={setTheirTier}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Normal">Normal</SelectItem>
                                            <SelectItem value="Neon">Neon (3x)</SelectItem>
                                            <SelectItem value="Mega Neon">Mega Neon (12x)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {pet2 && (
                                    <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                        <Badge className={RARITY_COLORS[pet2.rarity]}>{pet2.rarity}</Badge>
                                        <div className="text-lg font-bold text-white mt-2">{pet2.name}</div>
                                        <div className="text-sm text-zinc-400">{theirTier}</div>
                                        <div className="text-2xl font-bold text-pink-400 mt-2">{theirValue}</div>
                                        <div className="text-xs text-zinc-500">value points</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Values are estimates based on community trading. Actual trade values vary based on demand and personal preference. Always double-check before trading!</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
