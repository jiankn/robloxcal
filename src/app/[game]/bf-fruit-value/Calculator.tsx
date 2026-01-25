'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Cherry, TrendingUp, Search, Info, ArrowRight, AlertTriangle } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Fruit data with values (simplified model)
const FRUITS = [
    { id: 'leopard', name: 'Leopard', rarity: 'Mythical', value: 5000000, demand: 'Very High' },
    { id: 'dough', name: 'Dough', rarity: 'Mythical', value: 2800000, demand: 'High' },
    { id: 'dragon', name: 'Dragon', rarity: 'Mythical', value: 3500000, demand: 'High' },
    { id: 't-rex', name: 'T-Rex', rarity: 'Mythical', value: 2500000, demand: 'Medium' },
    { id: 'spirit', name: 'Spirit', rarity: 'Mythical', value: 1800000, demand: 'Medium' },
    { id: 'buddha', name: 'Buddha', rarity: 'Legendary', value: 1200000, demand: 'Very High' },
    { id: 'venom', name: 'Venom', rarity: 'Mythical', value: 2000000, demand: 'High' },
    { id: 'shadow', name: 'Shadow', rarity: 'Mythical', value: 1600000, demand: 'Medium' },
    { id: 'control', name: 'Control', rarity: 'Mythical', value: 1400000, demand: 'Low' },
    { id: 'rumble', name: 'Rumble', rarity: 'Legendary', value: 800000, demand: 'Medium' },
    { id: 'magma', name: 'Magma', rarity: 'Legendary', value: 600000, demand: 'High' },
    { id: 'light', name: 'Light', rarity: 'Legendary', value: 500000, demand: 'Medium' },
    { id: 'flame', name: 'Flame', rarity: 'Uncommon', value: 100000, demand: 'High' },
    { id: 'ice', name: 'Ice', rarity: 'Rare', value: 200000, demand: 'Medium' },
]

const RARITY_COLORS: Record<string, string> = {
    'Common': 'bg-gray-500/20 text-gray-400',
    'Uncommon': 'bg-green-500/20 text-green-400',
    'Rare': 'bg-blue-500/20 text-blue-400',
    'Legendary': 'bg-yellow-500/20 text-yellow-400',
    'Mythical': 'bg-pink-500/20 text-pink-400',
}

const DEMAND_COLORS: Record<string, string> = {
    'Very High': 'text-green-400',
    'High': 'text-emerald-400',
    'Medium': 'text-yellow-400',
    'Low': 'text-red-400',
}

function formatValue(value: number): string {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toString()
}

export default function BloxFruitsFruitValueCalculator() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFruit1, setSelectedFruit1] = useState('')
    const [selectedFruit2, setSelectedFruit2] = useState('')

    const filteredFruits = FRUITS.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const fruit1 = FRUITS.find(f => f.id === selectedFruit1)
    const fruit2 = FRUITS.find(f => f.id === selectedFruit2)

    const getTradeVerdict = () => {
        if (!fruit1 || !fruit2) return null
        const ratio = fruit1.value / fruit2.value
        if (ratio > 1.2) return { verdict: 'WIN', color: 'text-green-400', message: 'You are overpaying!' }
        if (ratio < 0.8) return { verdict: 'LOSE', color: 'text-red-400', message: 'Great trade for you!' }
        return { verdict: 'FAIR', color: 'text-yellow-400', message: 'Fair trade' }
    }

    const tradeVerdict = getTradeVerdict()

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Blox Fruits Value Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Check fruit values and compare trades
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="Values fluctuate based on demand - check before trading!" />

                {/* Trade Comparison */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-400" />
                            Trade Comparison
                        </CardTitle>
                        <CardDescription>Compare two fruits to see if a trade is fair</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4 items-center">
                            {/* Your Fruit */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Your Fruit</Label>
                                <Select value={selectedFruit1} onValueChange={setSelectedFruit1}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Select fruit..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FRUITS.map(f => (
                                            <SelectItem key={f.id} value={f.id}>
                                                {f.name} ({formatValue(f.value)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fruit1 && (
                                    <div className="p-3 bg-zinc-800/50 rounded-lg">
                                        <div className="text-lg font-bold text-white">{fruit1.name}</div>
                                        <Badge className={RARITY_COLORS[fruit1.rarity]}>{fruit1.rarity}</Badge>
                                        <div className="text-xl font-bold text-indigo-400 mt-2">{formatValue(fruit1.value)}</div>
                                    </div>
                                )}
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center">
                                <ArrowRight className="h-8 w-8 text-zinc-500" />
                            </div>

                            {/* Their Fruit */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Their Fruit</Label>
                                <Select value={selectedFruit2} onValueChange={setSelectedFruit2}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Select fruit..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {FRUITS.map(f => (
                                            <SelectItem key={f.id} value={f.id}>
                                                {f.name} ({formatValue(f.value)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {fruit2 && (
                                    <div className="p-3 bg-zinc-800/50 rounded-lg">
                                        <div className="text-lg font-bold text-white">{fruit2.name}</div>
                                        <Badge className={RARITY_COLORS[fruit2.rarity]}>{fruit2.rarity}</Badge>
                                        <div className="text-xl font-bold text-indigo-400 mt-2">{formatValue(fruit2.value)}</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Verdict */}
                        {tradeVerdict && (
                            <div className={`mt-4 p-4 rounded-lg text-center ${tradeVerdict.verdict === 'WIN' ? 'bg-green-500/10 border border-green-500/30' :
                                    tradeVerdict.verdict === 'LOSE' ? 'bg-red-500/10 border border-red-500/30' :
                                        'bg-yellow-500/10 border border-yellow-500/30'
                                }`}>
                                <div className={`text-2xl font-bold ${tradeVerdict.color}`}>
                                    {tradeVerdict.verdict}
                                </div>
                                <div className="text-sm text-zinc-400">{tradeVerdict.message}</div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Fruit List */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Cherry className="h-5 w-5 text-pink-400" />
                            All Fruit Values
                        </CardTitle>
                        <CardDescription>
                            <div className="relative mt-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    placeholder="Search fruits..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 bg-zinc-800 border-zinc-700"
                                />
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            {filteredFruits.map(fruit => (
                                <div key={fruit.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Cherry className="h-5 w-5 text-pink-400" />
                                        <div>
                                            <div className="text-white font-medium">{fruit.name}</div>
                                            <Badge className={`${RARITY_COLORS[fruit.rarity]} text-xs`}>{fruit.rarity}</Badge>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-indigo-400">{formatValue(fruit.value)}</div>
                                        <div className={`text-xs ${DEMAND_COLORS[fruit.demand]}`}>
                                            {fruit.demand} Demand
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>Values are estimates based on community trading data. Actual trade values may vary based on current demand and market conditions.</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
