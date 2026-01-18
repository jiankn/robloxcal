'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Trophy,
    Shield,
    Sword,
    Heart,
    Target,
    Zap,
    Crown,
    Star,
    Users,
    Sparkles
} from 'lucide-react'
import { UNITS_DATA, UnitData, calculateUnitDPS } from '@/lib/rvb-tycoon-data'
import { HowItWorks } from '@/components/HowItWorks'

// Tier colors and styling
const TIER_CONFIG = {
    S: { color: 'red', bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    A: { color: 'orange', bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400' },
    B: { color: 'yellow', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    C: { color: 'green', bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
    D: { color: 'blue', bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' }
}

export default function UnitTierListPage() {
    const [selectedTier, setSelectedTier] = useState<UnitData['tier'] | 'all'>('all')

    // Calculate DPS for all units
    const unitsWithDPS = useMemo(() => {
        return UNITS_DATA.map(unit => ({
            ...unit,
            dps: calculateUnitDPS(unit)
        }))
    }, [])

    // Filter by tier
    const filteredUnits = useMemo(() => {
        if (selectedTier === 'all') return unitsWithDPS
        return unitsWithDPS.filter(u => u.tier === selectedTier)
    }, [unitsWithDPS, selectedTier])

    // Group by tier for display
    const unitsByTier = useMemo(() => {
        const grouped: Record<string, typeof unitsWithDPS> = {}
        for (const tier of ['S', 'A', 'B', 'C', 'D'] as const) {
            grouped[tier] = unitsWithDPS.filter(u => u.tier === tier)
        }
        return grouped
    }, [unitsWithDPS])

    // Format numbers
    const formatNumber = (num: number): string => {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toString()
    }

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/25 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-500/20 rounded-full blur-[100px] translate-y-1/2" />

            {/* Content */}
            <div className="relative py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-4">
                            <Trophy className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-yellow-300">Unit Rankings</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Unit & Hero Tier List
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Complete ranking of all units in Red VS Blue Tycoon.
                            {unitsWithDPS.length} units analyzed with stats and abilities.
                        </p>
                    </div>

                    {/* How It Works */}
                    <HowItWorks toolType="tier-list" proTip="Focus on S-tier units for competitive advantage!" />

                    {/* Tier Overview */}
                    <div className="grid grid-cols-5 gap-3 mb-10">
                        {(['S', 'A', 'B', 'C', 'D'] as const).map(tier => {
                            const config = TIER_CONFIG[tier]
                            const count = unitsByTier[tier].length
                            return (
                                <button
                                    key={tier}
                                    onClick={() => setSelectedTier(selectedTier === tier ? 'all' : tier)}
                                    className={`p-4 rounded-xl border transition-all ${selectedTier === tier
                                        ? `${config.bg} ${config.border} ring-2 ring-${config.color}-500/30`
                                        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                                        }`}
                                >
                                    <div className={`text-2xl font-bold ${config.text}`}>{tier}</div>
                                    <div className="text-xs text-zinc-500 mt-1">{count} units</div>
                                </button>
                            )
                        })}
                    </div>

                    {/* S-Tier Showcase */}
                    {(selectedTier === 'all' || selectedTier === 'S') && unitsByTier.S.length > 0 && (
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Crown className="h-5 w-5 text-red-400" />
                                <h2 className="text-lg font-semibold text-white">S-Tier (Meta Defining)</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {unitsByTier.S.map(unit => (
                                    <Card key={unit.id} className="bg-gradient-to-br from-red-900/20 to-zinc-900/50 border-red-500/30 shadow-red-500/10 shadow-lg">
                                        <CardContent className="pt-5">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-2">
                                                        S-Tier
                                                    </Badge>
                                                    <h3 className="text-xl font-bold text-white">{unit.name}</h3>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-zinc-500">DPS</div>
                                                    <div className="text-xl font-bold text-red-400">
                                                        {formatNumber(unit.dps)}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-zinc-400 mb-4">{unit.description}</p>

                                            <div className="grid grid-cols-4 gap-2 text-xs mb-4">
                                                <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                    <Heart className="h-3 w-3 mx-auto mb-1 text-red-400" />
                                                    <div className="text-white">{formatNumber(unit.health)}</div>
                                                </div>
                                                <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                    <Sword className="h-3 w-3 mx-auto mb-1 text-orange-400" />
                                                    <div className="text-white">{unit.damage}</div>
                                                </div>
                                                <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                    <Zap className="h-3 w-3 mx-auto mb-1 text-yellow-400" />
                                                    <div className="text-white">{unit.attackSpeed}/s</div>
                                                </div>
                                                <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                    <Target className="h-3 w-3 mx-auto mb-1 text-blue-400" />
                                                    <div className="text-white">{unit.range}m</div>
                                                </div>
                                            </div>

                                            {unit.ability && (
                                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 text-purple-400 text-sm">
                                                        <Sparkles className="h-4 w-4" />
                                                        <span className="font-medium">Ability:</span>
                                                        <span className="text-zinc-300">{unit.ability}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-3 text-xs text-zinc-500">
                                                Unlock: {unit.unlockMethod}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Other Tiers */}
                    {(['A', 'B', 'C', 'D'] as const).map(tier => {
                        if (selectedTier !== 'all' && selectedTier !== tier) return null
                        if (unitsByTier[tier].length === 0) return null

                        const config = TIER_CONFIG[tier]
                        const tierLabels = {
                            A: 'Excellent',
                            B: 'Good',
                            C: 'Average',
                            D: 'Below Average'
                        }

                        return (
                            <div key={tier} className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Star className={`h-5 w-5 ${config.text}`} />
                                    <h2 className="text-lg font-semibold text-white">
                                        {tier}-Tier ({tierLabels[tier]})
                                    </h2>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {unitsByTier[tier].map(unit => (
                                        <Card key={unit.id} className={`bg-zinc-900/50 ${config.border} border`}>
                                            <CardContent className="pt-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <Badge className={`${config.bg} ${config.text} border-current/30 text-xs`}>
                                                            {tier}-Tier
                                                        </Badge>
                                                        <h3 className="font-semibold text-white mt-1">{unit.name}</h3>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`font-bold ${config.text}`}>
                                                            {formatNumber(unit.dps)} DPS
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{unit.description}</p>

                                                <div className="grid grid-cols-4 gap-1 text-xs">
                                                    <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                        <div className="text-zinc-500">HP</div>
                                                        <div className="text-white">{formatNumber(unit.health)}</div>
                                                    </div>
                                                    <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                        <div className="text-zinc-500">DMG</div>
                                                        <div className="text-white">{unit.damage}</div>
                                                    </div>
                                                    <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                        <div className="text-zinc-500">SPD</div>
                                                        <div className="text-white">{unit.attackSpeed}</div>
                                                    </div>
                                                    <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                        <div className="text-zinc-500">RNG</div>
                                                        <div className="text-white">{unit.range}</div>
                                                    </div>
                                                </div>

                                                {unit.ability && (
                                                    <div className="mt-2 text-xs text-purple-400 flex items-center gap-1">
                                                        <Sparkles className="h-3 w-3" />
                                                        <span className="line-clamp-1">{unit.ability}</span>
                                                    </div>
                                                )}

                                                <div className="mt-2 text-xs text-zinc-600">
                                                    {unit.unlockMethod}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                    {/* Team Compositions */}
                    <Card className="bg-zinc-900/30 border-zinc-800 mt-8">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-400" />
                                Recommended Team Compositions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium text-green-400 mb-2">Early Game</h4>
                                    <ul className="space-y-1 text-sm text-zinc-400">
                                        <li>• 5x Grunt (front line)</li>
                                        <li>• 2x Turret Drone (DPS)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium text-yellow-400 mb-2">Mid Game</h4>
                                    <ul className="space-y-1 text-sm text-zinc-400">
                                        <li>• 2x Heavy Tank (absorb)</li>
                                        <li>• 2x Combat Medic (heal)</li>
                                        <li>• 3x Rifleman (DPS)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium text-red-400 mb-2">Late Game</h4>
                                    <ul className="space-y-1 text-sm text-zinc-400">
                                        <li>• 1x Mechatron (anchor)</li>
                                        <li>• 2x Commando (airstrike)</li>
                                        <li>• 1x Sniper Elite (assassin)</li>
                                        <li>• 2x Combat Medic (sustain)</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
