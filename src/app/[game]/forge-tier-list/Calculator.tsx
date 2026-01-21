'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Trophy, Gem, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const GAME_SLUG = 'the-forge'

// Ores organized by tier
const ORES = {
    'S': [
        { id: 'mythril', name: 'Mythril', tier: 8, multiplier: '10.0x', location: 'Pirate Island', color: 'text-blue-400' },
        { id: 'obsidian', name: 'Obsidian', tier: 7, multiplier: '7.0x', location: 'Nether', color: 'text-purple-400' },
    ],
    'A': [
        { id: 'ruby', name: 'Ruby', tier: 6, multiplier: '5.0x', location: 'Volcano', color: 'text-red-400' },
        { id: 'emerald', name: 'Emerald', tier: 5, multiplier: '4.0x', location: 'Jungle Mines', color: 'text-green-400' },
    ],
    'B': [
        { id: 'diamond', name: 'Diamond', tier: 4, multiplier: '3.0x', location: 'Crystal Caverns', color: 'text-cyan-400' },
        { id: 'gold', name: 'Gold', tier: 3, multiplier: '2.0x', location: 'Forest Mine', color: 'text-yellow-400' },
    ],
    'C': [
        { id: 'iron', name: 'Iron', tier: 2, multiplier: '1.5x', location: 'Starter Cave', color: 'text-zinc-400' },
        { id: 'copper', name: 'Copper', tier: 1, multiplier: '1.0x', location: 'Starter Cave', color: 'text-orange-400' },
    ],
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    'S': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    'A': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
    'B': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    'C': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
}

export default function ForgeTierList() {
    const [filterTier, setFilterTier] = useState<string>('All')

    const filterOres = (ores: typeof ORES['S'], tier: string) => {
        if (filterTier === 'All') return ores
        return tier === filterTier ? ores : []
    }

    return (
        <CalculatorLayout
            title="Ore Tier List"
            description="Best ores ranked by value multiplier and accessibility. Updated January 2026."
            gameSlug={GAME_SLUG}
        >
            {/* Filters */}
            <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-zinc-400">Filter:</span>
                        </div>
                        <Select value={filterTier} onValueChange={setFilterTier}>
                            <SelectTrigger className="w-[120px] bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                <SelectItem value="All" className="text-white hover:bg-zinc-800">All Tiers</SelectItem>
                                <SelectItem value="S" className="text-red-400 hover:bg-zinc-800">S Tier</SelectItem>
                                <SelectItem value="A" className="text-orange-400 hover:bg-zinc-800">A Tier</SelectItem>
                                <SelectItem value="B" className="text-yellow-400 hover:bg-zinc-800">B Tier</SelectItem>
                                <SelectItem value="C" className="text-green-400 hover:bg-zinc-800">C Tier</SelectItem>
                            </SelectContent>
                        </Select>
                        {filterTier !== 'All' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setFilterTier('All')}
                                className="text-zinc-400 hover:text-white"
                            >
                                Clear
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Tier List */}
            <div className="space-y-4">
                {Object.entries(ORES).map(([tier, ores]) => {
                    const filteredOres = filterOres(ores, tier)
                    if (filteredOres.length === 0) return null

                    const colors = TIER_COLORS[tier]

                    return (
                        <Card key={tier} className={`bg-zinc-900/50 border-zinc-800 ${colors.border} border-l-4`}>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                        <span className={`text-2xl font-bold ${colors.text}`}>{tier}</span>
                                    </div>
                                    <div>
                                        <span className="text-white text-lg">Tier {tier}</span>
                                        <p className="text-xs text-zinc-500 font-normal">
                                            {tier === 'S' && 'Best - Endgame Ores'}
                                            {tier === 'A' && 'Excellent - Late Game'}
                                            {tier === 'B' && 'Good - Mid Game'}
                                            {tier === 'C' && 'Starter - Early Game'}
                                        </p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {filteredOres.map(ore => (
                                        <div
                                            key={ore.id}
                                            className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
                                        >
                                            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                                <Gem className={`h-5 w-5 ${ore.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`font-medium ${ore.color}`}>{ore.name}</div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] px-1.5">
                                                        Tier {ore.tier}
                                                    </Badge>
                                                    <Badge variant="outline" className="border-zinc-700 text-green-400 text-[10px] px-1.5">
                                                        {ore.multiplier}
                                                    </Badge>
                                                </div>
                                                <div className="text-[10px] text-zinc-500 mt-0.5">📍 {ore.location}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Forge Value Guide */}
            <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-zinc-400">Equipment Class Requirements</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="p-2 bg-zinc-950/50 rounded">
                            <span className="text-zinc-500">Common:</span> <span className="text-white">0+</span>
                        </div>
                        <div className="p-2 bg-zinc-950/50 rounded">
                            <span className="text-green-400">Uncommon:</span> <span className="text-white">50+</span>
                        </div>
                        <div className="p-2 bg-zinc-950/50 rounded">
                            <span className="text-blue-400">Rare:</span> <span className="text-white">150+</span>
                        </div>
                        <div className="p-2 bg-zinc-950/50 rounded">
                            <span className="text-purple-400">Epic:</span> <span className="text-white">400+</span>
                        </div>
                        <div className="p-2 bg-zinc-950/50 rounded">
                            <span className="text-yellow-400">Legendary:</span> <span className="text-white">800+</span>
                        </div>
                        <div className="p-2 bg-zinc-950/50 rounded">
                            <span className="text-red-400">Mythic:</span> <span className="text-white">1500+</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-zinc-900/30 border-zinc-800 mt-4">
                <CardContent className="p-4">
                    <div className="text-xs text-zinc-500">
                        <p className="mb-2"><strong className="text-zinc-300">Tips:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Higher tier ores unlock at higher player levels</li>
                            <li>Mythril gives best value but requires Level 50+</li>
                            <li>Save high tier ores for large batch forging</li>
                            <li>Use Forge Calculator to plan crafts</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </CalculatorLayout>
    )
}
