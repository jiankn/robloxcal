'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Trophy, Leaf, Zap, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const GAME_SLUG = 'plants-vs-brainrots'

// Plants organized by tier
const PLANTS = {
    'S': [
        { id: 'wintermelon', name: 'Winter Melon', rarity: 'Legendary', dps: 100, special: 'AoE + Heavy Slow' },
        { id: 'gatlingpea', name: 'Gatling Pea', rarity: 'Epic', dps: 120, special: '4x peas per shot' },
    ],
    'A': [
        { id: 'repeater', name: 'Repeater', rarity: 'Rare', dps: 60, special: '2x peas per shot' },
        { id: 'torchwood', name: 'Torchwood', rarity: 'Rare', dps: 0, special: '2x pea damage through' },
        { id: 'chomper', name: 'Chomper', rarity: 'Uncommon', dps: 75, special: 'Instant kill single' },
    ],
    'B': [
        { id: 'snowpea', name: 'Snow Pea', rarity: 'Uncommon', dps: 30, special: '50% slow' },
        { id: 'peashooter', name: 'Peashooter', rarity: 'Common', dps: 30, special: 'Basic attack' },
    ],
    'C': [
        { id: 'sunflower', name: 'Sunflower', rarity: 'Common', dps: 10, special: 'Sun production' },
        { id: 'wallnut', name: 'Wall-nut', rarity: 'Common', dps: 0, special: 'Tank (500 HP)' },
    ],
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    'S': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    'A': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
    'B': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    'C': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
}

const RARITY_COLORS: Record<string, string> = {
    'Legendary': 'text-yellow-400',
    'Epic': 'text-purple-400',
    'Rare': 'text-blue-400',
    'Uncommon': 'text-green-400',
    'Common': 'text-zinc-400',
}

export default function PvbTierList() {
    const [filterRarity, setFilterRarity] = useState<string>('All')

    const filterPlants = (plants: typeof PLANTS['S']) => {
        if (filterRarity === 'All') return plants
        return plants.filter(p => p.rarity === filterRarity)
    }

    return (
        <CalculatorLayout
            title="Plant Tier List"
            description="Best plants ranked by DPS, utility, and overall effectiveness. Updated January 2026."
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
                        <Select value={filterRarity} onValueChange={setFilterRarity}>
                            <SelectTrigger className="w-[150px] bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                <SelectItem value="All" className="text-white hover:bg-zinc-800">All Rarities</SelectItem>
                                <SelectItem value="Legendary" className="text-yellow-400 hover:bg-zinc-800">Legendary</SelectItem>
                                <SelectItem value="Epic" className="text-purple-400 hover:bg-zinc-800">Epic</SelectItem>
                                <SelectItem value="Rare" className="text-blue-400 hover:bg-zinc-800">Rare</SelectItem>
                                <SelectItem value="Uncommon" className="text-green-400 hover:bg-zinc-800">Uncommon</SelectItem>
                                <SelectItem value="Common" className="text-zinc-400 hover:bg-zinc-800">Common</SelectItem>
                            </SelectContent>
                        </Select>
                        {filterRarity !== 'All' && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setFilterRarity('All')}
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
                {Object.entries(PLANTS).map(([tier, plants]) => {
                    const filteredPlants = filterPlants(plants)
                    if (filteredPlants.length === 0) return null

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
                                            {tier === 'S' && 'Best - Must Have'}
                                            {tier === 'A' && 'Excellent - Top Picks'}
                                            {tier === 'B' && 'Good - Solid Choices'}
                                            {tier === 'C' && 'Utility - Situational'}
                                        </p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {filteredPlants.map(plant => (
                                        <div
                                            key={plant.id}
                                            className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
                                        >
                                            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                                <Leaf className={`h-5 w-5 ${colors.text}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white font-medium">{plant.name}</div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span className={RARITY_COLORS[plant.rarity]}>{plant.rarity}</span>
                                                    {plant.dps > 0 && (
                                                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] px-1.5">
                                                            {plant.dps} DPS
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="text-[10px] text-zinc-500 mt-0.5">{plant.special}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Notes */}
            <Card className="bg-zinc-900/30 border-zinc-800 mt-6">
                <CardContent className="p-4">
                    <div className="text-xs text-zinc-500">
                        <p className="mb-2"><strong className="text-zinc-300">Notes:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>DPS calculated at base level without mutations</li>
                            <li>Torchwood rated high due to synergy with pea plants</li>
                            <li>Mutations can significantly boost lower tier plants</li>
                            <li>Updated for January 2026</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </CalculatorLayout>
    )
}
