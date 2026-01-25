'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Hammer, Sparkles, Package, ArrowRight, Info, Check } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Craftable items and their requirements
const CRAFTABLES = [
    {
        id: 'lucky-charm',
        name: 'Lucky Charm',
        tier: 'Common',
        requirements: [
            { aura: 'Common', count: 5 },
            { aura: 'Uncommon', count: 2 },
        ]
    },
    {
        id: 'fortune-stone',
        name: 'Fortune Stone',
        tier: 'Rare',
        requirements: [
            { aura: 'Uncommon', count: 10 },
            { aura: 'Rare', count: 5 },
        ]
    },
    {
        id: 'mystic-orb',
        name: 'Mystic Orb',
        tier: 'Epic',
        requirements: [
            { aura: 'Rare', count: 15 },
            { aura: 'Epic', count: 5 },
            { aura: 'Legendary', count: 1 },
        ]
    },
    {
        id: 'celestial-crystal',
        name: 'Celestial Crystal',
        tier: 'Legendary',
        requirements: [
            { aura: 'Epic', count: 20 },
            { aura: 'Legendary', count: 10 },
            { aura: 'Mythic', count: 2 },
        ]
    },
    {
        id: 'divine-essence',
        name: 'Divine Essence',
        tier: 'Mythic',
        requirements: [
            { aura: 'Legendary', count: 25 },
            { aura: 'Mythic', count: 10 },
            { aura: 'Divine', count: 1 },
        ]
    },
]

// Aura expected rolls (base odds from the other calculator)
const AURA_EXPECTED_ROLLS: Record<string, number> = {
    'Common': 2,
    'Uncommon': 4,
    'Rare': 7,
    'Epic': 14,
    'Legendary': 40,
    'Mythic': 250,
    'Divine': 1000,
    'Celestial': 10000,
}

const TIER_COLORS: Record<string, string> = {
    'Common': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'Rare': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Epic': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Legendary': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Mythic': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return Math.round(num).toLocaleString()
}

export default function SolsRngCraftingCalculator() {
    const [selectedItem, setSelectedItem] = useState('lucky-charm')
    const [quantity, setQuantity] = useState(1)

    const item = CRAFTABLES.find(c => c.id === selectedItem)!

    // Calculate total auras needed
    const totalAurasNeeded = item.requirements.map(req => ({
        ...req,
        total: req.count * quantity,
        expectedRolls: AURA_EXPECTED_ROLLS[req.aura] * req.count * quantity,
    }))

    const totalRolls = totalAurasNeeded.reduce((sum, req) => sum + req.expectedRolls, 0)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-amber-950/20 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Sol&apos;s RNG Crafting Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Calculate materials needed to craft items
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="Farm lower-tier auras efficiently before crafting!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Hammer className="h-5 w-5 text-amber-400" />
                                Target Item
                            </CardTitle>
                            <CardDescription>What do you want to craft?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Item Selection */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Item to Craft</Label>
                                <Select value={selectedItem} onValueChange={setSelectedItem}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CRAFTABLES.map(c => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name} ({c.tier})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Quantity</Label>
                                <Select value={quantity.toString()} onValueChange={(v) => setQuantity(parseInt(v))}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 5, 10].map(n => (
                                            <SelectItem key={n} value={n.toString()}>
                                                {n}x
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Selected Item Card */}
                            <div className={`p-4 rounded-lg border ${TIER_COLORS[item.tier]}`}>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                                        <Package className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">{item.name}</div>
                                        <Badge className={TIER_COLORS[item.tier]}>{item.tier}</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Results */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                Requirements
                            </CardTitle>
                            <CardDescription>
                                Auras needed for {quantity}x {item.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Requirements List */}
                            <div className="space-y-3">
                                {totalAurasNeeded.map((req, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Sparkles className={`h-5 w-5 ${req.aura === 'Common' ? 'text-gray-400' :
                                                    req.aura === 'Uncommon' ? 'text-green-400' :
                                                        req.aura === 'Rare' ? 'text-blue-400' :
                                                            req.aura === 'Epic' ? 'text-purple-400' :
                                                                req.aura === 'Legendary' ? 'text-yellow-400' :
                                                                    req.aura === 'Mythic' ? 'text-pink-400' :
                                                                        'text-cyan-400'
                                                }`} />
                                            <div>
                                                <div className="text-white font-medium">{req.aura} Aura</div>
                                                <div className="text-xs text-zinc-500">
                                                    ~{formatNumber(req.expectedRolls)} rolls expected
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-amber-400">
                                                {req.total}
                                            </div>
                                            <div className="text-xs text-zinc-500">needed</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Summary */}
                            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg">
                                <div className="text-sm text-zinc-400 mb-1">Total Expected Rolls</div>
                                <div className="text-3xl font-bold text-amber-400">
                                    ~{formatNumber(totalRolls)}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    At 10 rolls/min: ~{(totalRolls / 10 / 60).toFixed(1)} hours
                                </div>
                            </div>

                            {/* Crafting Flow */}
                            <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
                                <span>Farm Auras</span>
                                <ArrowRight className="h-4 w-4" />
                                <span>Collect Materials</span>
                                <ArrowRight className="h-4 w-4" />
                                <span className="text-amber-400">Craft!</span>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm">
                                <Info className="h-4 w-4 inline mr-1" />
                                <strong>Tip:</strong> Use luck multipliers to reduce the grind significantly!
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
