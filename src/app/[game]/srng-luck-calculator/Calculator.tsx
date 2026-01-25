'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Sparkles, Plus, Calculator, Info } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Luck sources
const LUCK_SOURCES = [
    { id: 'luck-potion', name: 'Luck Potion', multiplier: 2, category: 'Potion' },
    { id: 'luck-potion-ii', name: 'Luck Potion II', multiplier: 3, category: 'Potion' },
    { id: 'luck-potion-iii', name: 'Luck Potion III', multiplier: 5, category: 'Potion' },
    { id: 'lucky-gamepass', name: 'Lucky Gamepass', multiplier: 1.5, category: 'Gamepass' },
    { id: 'vip-gamepass', name: 'VIP Gamepass', multiplier: 1.25, category: 'Gamepass' },
    { id: 'event-boost', name: 'Event Boost', multiplier: 2, category: 'Event' },
    { id: 'lucky-aura', name: 'Lucky Aura Equipped', multiplier: 1.5, category: 'Aura' },
    { id: 'sol-blessing', name: "Sol's Blessing", multiplier: 3, category: 'Special' },
]

export default function SolsRngLuckCalculator() {
    const [baseLuck, setBaseLuck] = useState(1)
    const [selectedSources, setSelectedSources] = useState<string[]>([])
    const [customMultiplier, setCustomMultiplier] = useState(1)

    const toggleSource = (id: string) => {
        setSelectedSources(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        )
    }

    // Calculate total multiplier (sources are multiplicative)
    const sourcesMultiplier = selectedSources.reduce((total, sourceId) => {
        const source = LUCK_SOURCES.find(s => s.id === sourceId)
        return source ? total * source.multiplier : total
    }, 1)

    const totalMultiplier = baseLuck * sourcesMultiplier * customMultiplier

    // Group sources by category
    const groupedSources = LUCK_SOURCES.reduce((acc, source) => {
        if (!acc[source.category]) acc[source.category] = []
        acc[source.category].push(source)
        return acc
    }, {} as Record<string, typeof LUCK_SOURCES>)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-amber-950/20 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Sol&apos;s RNG Luck Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Stack luck multipliers to see your total luck boost
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="Luck multipliers stack multiplicatively - combine them for huge boosts!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Plus className="h-5 w-5 text-amber-400" />
                                Luck Sources
                            </CardTitle>
                            <CardDescription>Select active luck boosts</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Base Luck */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Base Luck Level</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={baseLuck}
                                    onChange={(e) => setBaseLuck(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">Your natural luck stat</p>
                            </div>

                            {/* Luck Sources by Category */}
                            {Object.entries(groupedSources).map(([category, sources]) => (
                                <div key={category} className="space-y-2">
                                    <Label className="text-zinc-400">{category}</Label>
                                    <div className="space-y-2">
                                        {sources.map(source => (
                                            <div
                                                key={source.id}
                                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedSources.includes(source.id)
                                                        ? 'bg-amber-500/20 border border-amber-500/30'
                                                        : 'bg-zinc-800/50 border border-transparent hover:bg-zinc-800'
                                                    }`}
                                                onClick={() => toggleSource(source.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        checked={selectedSources.includes(source.id)}
                                                        className="border-zinc-600"
                                                    />
                                                    <span className="text-white">{source.name}</span>
                                                </div>
                                                <Badge className="bg-green-500/20 text-green-400">
                                                    {source.multiplier}x
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Custom Multiplier */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Other Multiplier</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100}
                                    step={0.1}
                                    value={customMultiplier}
                                    onChange={(e) => setCustomMultiplier(Math.max(1, parseFloat(e.target.value) || 1))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">For unlisted bonuses</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Results */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-green-400" />
                                Total Luck
                            </CardTitle>
                            <CardDescription>Your combined luck multiplier</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Total Multiplier */}
                            <div className="p-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg text-center">
                                <Sparkles className="h-12 w-12 mx-auto text-amber-400 mb-2" />
                                <div className="text-5xl font-bold text-amber-400">
                                    {totalMultiplier.toFixed(1)}x
                                </div>
                                <div className="text-zinc-400 mt-2">Total Luck Multiplier</div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-zinc-400">Calculation Breakdown</h4>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                                        <span className="text-zinc-400">Base Luck</span>
                                        <span className="text-white">{baseLuck}x</span>
                                    </div>
                                    {selectedSources.map(sourceId => {
                                        const source = LUCK_SOURCES.find(s => s.id === sourceId)!
                                        return (
                                            <div key={sourceId} className="flex justify-between p-2 bg-zinc-800/30 rounded">
                                                <span className="text-zinc-400">{source.name}</span>
                                                <span className="text-green-400">× {source.multiplier}</span>
                                            </div>
                                        )
                                    })}
                                    {customMultiplier > 1 && (
                                        <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                                            <span className="text-zinc-400">Custom Bonus</span>
                                            <span className="text-green-400">× {customMultiplier}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Comparison */}
                            <div className="p-4 bg-zinc-800/50 rounded-lg">
                                <div className="text-sm text-zinc-400 mb-2">With this luck, your odds are:</div>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    <div className="p-2 bg-zinc-700/50 rounded">
                                        <div className="text-xs text-zinc-500">Legendary</div>
                                        <div className="text-green-400 font-medium">
                                            {(0.025 * totalMultiplier * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                    <div className="p-2 bg-zinc-700/50 rounded">
                                        <div className="text-xs text-zinc-500">Divine</div>
                                        <div className="text-cyan-400 font-medium">
                                            {(0.001 * totalMultiplier * 100).toFixed(3)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm">
                                <Info className="h-4 w-4 inline mr-1" />
                                <strong>Tip:</strong> Wait for events to maximize your luck stacking!
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
