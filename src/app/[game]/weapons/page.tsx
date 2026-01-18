'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Sword,
    Zap,
    Target,
    Coins,
    Search,
    TrendingUp,
    Sparkles,
    Info,
    ChevronRight,
    Crown,
    Flame
} from 'lucide-react'
import {
    WEAPONS_DATA,
    WeaponData,
    RARITY_COLORS,
    RARITY_ORDER,
    calculateWeaponDPS,
    getWeaponsByDPS,
    getWeaponsByValue
} from '@/lib/rvb-tycoon-data'
import { HowItWorks } from '@/components/HowItWorks'

// Rarity badge styling
const getRarityStyle = (rarity: WeaponData['rarity']) => {
    const styles: Record<WeaponData['rarity'], string> = {
        Common: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
        Uncommon: 'bg-green-500/20 text-green-300 border-green-500/30',
        Rare: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        Epic: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        Legendary: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        Mythic: 'bg-red-500/20 text-red-300 border-red-500/30'
    }
    return styles[rarity]
}

// Rarity glow styling
const getRarityGlow = (rarity: WeaponData['rarity']) => {
    const styles: Record<WeaponData['rarity'], string> = {
        Common: '',
        Uncommon: '',
        Rare: 'shadow-blue-500/20',
        Epic: 'shadow-purple-500/30 shadow-lg',
        Legendary: 'shadow-yellow-500/40 shadow-lg',
        Mythic: 'shadow-red-500/50 shadow-xl ring-1 ring-red-500/30'
    }
    return styles[rarity]
}

export default function WeaponDPSPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRarity, setSelectedRarity] = useState<WeaponData['rarity'] | 'all'>('all')
    const [sortBy, setSortBy] = useState<'dps' | 'value' | 'damage'>('dps')

    // Get weapons with calculated stats
    const weaponsWithStats = useMemo(() => {
        return WEAPONS_DATA.map(weapon => ({
            ...weapon,
            dps: calculateWeaponDPS(weapon)
        }))
    }, [])

    // Filter and sort weapons
    const filteredWeapons = useMemo(() => {
        let weapons = [...weaponsWithStats]

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            weapons = weapons.filter(w =>
                w.name.toLowerCase().includes(query) ||
                w.description.toLowerCase().includes(query) ||
                w.dropSource.toLowerCase().includes(query)
            )
        }

        // Filter by rarity
        if (selectedRarity !== 'all') {
            weapons = weapons.filter(w => w.rarity === selectedRarity)
        }

        // Sort
        if (sortBy === 'dps') {
            weapons.sort((a, b) => b.dps - a.dps)
        } else if (sortBy === 'damage') {
            weapons.sort((a, b) => b.baseDamage - a.baseDamage)
        } else {
            // Sort by value (DPS / price or rarity)
            weapons.sort((a, b) => {
                const aValue = a.price ? a.dps / a.price : a.dps / 100000
                const bValue = b.price ? b.dps / b.price : b.dps / 100000
                return bValue - aValue
            })
        }

        return weapons
    }, [weaponsWithStats, searchQuery, selectedRarity, sortBy])

    // Top 3 weapons by DPS for showcase
    const topWeapons = useMemo(() => {
        return getWeaponsByDPS().slice(0, 3)
    }, [])

    // Format numbers
    const formatNumber = (num: number): string => {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toFixed(0)
    }

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/25 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2" />

            {/* Content */}
            <div className="relative py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                            <Sword className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-red-300">Weapon Database</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Weapon DPS Calculator
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Compare all weapons by DPS, find the best value picks, and plan your loadout.
                            {weaponsWithStats.length} weapons analyzed.
                        </p>
                    </div>

                    {/* How It Works */}
                    <HowItWorks toolType="rvb-weapons" proTip="Consider special effects, not just raw DPS!" />

                    {/* Top 3 Showcase */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Crown className="h-5 w-5 text-yellow-400" />
                            <h2 className="text-lg font-semibold text-white">Highest DPS Weapons</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {topWeapons.map((weapon, index) => (
                                <Card
                                    key={weapon.id}
                                    className={`bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800 ${getRarityGlow(weapon.rarity)}`}
                                >
                                    <CardContent className="pt-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${index === 0 ? 'bg-yellow-500/20' :
                                                    index === 1 ? 'bg-zinc-400/20' :
                                                        'bg-amber-700/20'
                                                    }`}>
                                                    <span className="font-bold text-white">#{index + 1}</span>
                                                </div>
                                                <Badge className={getRarityStyle(weapon.rarity)}>
                                                    {weapon.rarity}
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-zinc-500">DPS</div>
                                                <div className="text-xl font-bold text-red-400">
                                                    {formatNumber(weapon.dps)}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-white text-lg mb-1">
                                            {weapon.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 mb-3">
                                            {weapon.description}
                                        </p>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                <div className="text-zinc-500">Damage</div>
                                                <div className="text-white font-medium">{weapon.baseDamage}</div>
                                            </div>
                                            <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                <div className="text-zinc-500">Speed</div>
                                                <div className="text-white font-medium">{weapon.attackSpeed}/s</div>
                                            </div>
                                            <div className="bg-zinc-800/50 rounded p-2 text-center">
                                                <div className="text-zinc-500">Range</div>
                                                <div className="text-white font-medium">{weapon.range}m</div>
                                            </div>
                                        </div>
                                        {weapon.specialEffect && (
                                            <div className="mt-3 text-xs text-purple-400 flex items-center gap-1">
                                                <Sparkles className="h-3 w-3" />
                                                {weapon.specialEffect}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                        <CardContent className="pt-5">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1">
                                    <Label className="text-zinc-400 mb-2 block">Search Weapons</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search by name, description, or source..."
                                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>

                                {/* Sort */}
                                <div>
                                    <Label className="text-zinc-400 mb-2 block">Sort By</Label>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={sortBy === 'dps' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSortBy('dps')}
                                            className={sortBy === 'dps' ? 'bg-red-600' : 'border-zinc-700'}
                                        >
                                            <Zap className="h-4 w-4 mr-1" />
                                            DPS
                                        </Button>
                                        <Button
                                            variant={sortBy === 'damage' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSortBy('damage')}
                                            className={sortBy === 'damage' ? 'bg-orange-600' : 'border-zinc-700'}
                                        >
                                            <Flame className="h-4 w-4 mr-1" />
                                            Damage
                                        </Button>
                                        <Button
                                            variant={sortBy === 'value' ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSortBy('value')}
                                            className={sortBy === 'value' ? 'bg-green-600' : 'border-zinc-700'}
                                        >
                                            <TrendingUp className="h-4 w-4 mr-1" />
                                            Value
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Rarity Filter */}
                            <div className="mt-4">
                                <Label className="text-zinc-400 mb-2 block">Filter by Rarity</Label>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant={selectedRarity === 'all' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setSelectedRarity('all')}
                                        className={selectedRarity === 'all' ? 'bg-purple-600' : 'border-zinc-700'}
                                    >
                                        All
                                    </Button>
                                    {RARITY_ORDER.map(rarity => (
                                        <Button
                                            key={rarity}
                                            variant={selectedRarity === rarity ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSelectedRarity(rarity)}
                                            className={`border-zinc-700 ${selectedRarity === rarity ? '' : ''}`}
                                        >
                                            <Badge className={`${getRarityStyle(rarity)} text-xs mr-1`}>
                                                {rarity}
                                            </Badge>
                                            ({weaponsWithStats.filter(w => w.rarity === rarity).length})
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weapons Grid */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">
                                All Weapons ({filteredWeapons.length})
                            </h2>
                        </div>

                        {filteredWeapons.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredWeapons.map((weapon, index) => (
                                    <Card
                                        key={weapon.id}
                                        className={`bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all ${getRarityGlow(weapon.rarity)}`}
                                    >
                                        <CardContent className="pt-5">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-zinc-600 text-sm">#{index + 1}</span>
                                                    <Badge className={getRarityStyle(weapon.rarity)}>
                                                        {weapon.rarity}
                                                    </Badge>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-red-400">
                                                        {formatNumber(weapon.dps)} DPS
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="font-semibold text-white mb-1">
                                                {weapon.name}
                                            </h3>
                                            <p className="text-xs text-zinc-500 mb-3 line-clamp-2">
                                                {weapon.description}
                                            </p>

                                            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                                                <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                    <div className="text-zinc-500">DMG</div>
                                                    <div className="text-white">{weapon.baseDamage}</div>
                                                </div>
                                                <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                    <div className="text-zinc-500">SPD</div>
                                                    <div className="text-white">{weapon.attackSpeed}/s</div>
                                                </div>
                                                <div className="bg-zinc-800/50 rounded p-1.5 text-center">
                                                    <div className="text-zinc-500">RNG</div>
                                                    <div className="text-white">{weapon.range}m</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-zinc-500">
                                                    {weapon.dropSource}
                                                </span>
                                                {weapon.price && (
                                                    <span className="text-yellow-400 flex items-center gap-1">
                                                        <Coins className="h-3 w-3" />
                                                        {formatNumber(weapon.price)}
                                                    </span>
                                                )}
                                                {weapon.dropRate && (
                                                    <span className="text-blue-400">
                                                        {(weapon.dropRate * 100).toFixed(1)}% drop
                                                    </span>
                                                )}
                                            </div>

                                            {weapon.specialEffect && (
                                                <div className="mt-2 text-xs text-purple-400 flex items-center gap-1">
                                                    <Sparkles className="h-3 w-3 flex-shrink-0" />
                                                    <span className="line-clamp-1">{weapon.specialEffect}</span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="bg-zinc-900/30 border-zinc-800 text-center py-8">
                                <CardContent>
                                    <Info className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                                    <p className="text-zinc-400">No weapons found matching your filters.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* DPS Formula Info */}
                    <Card className="bg-zinc-900/30 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-400" />
                                How DPS is Calculated
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-white mb-2">Formula</h4>
                                    <div className="bg-zinc-800 rounded-lg p-4 font-mono text-sm text-green-400">
                                        DPS = Base Damage × Attack Speed
                                    </div>
                                    <p className="text-xs text-zinc-500 mt-2">
                                        Example: Assault Rifle (25 dmg × 3.5/s) = 87.5 DPS
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-2">Pro Tips</h4>
                                    <ul className="space-y-1 text-sm text-zinc-400">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                                            High DPS ≠ always best. Consider range and playstyle.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                                            Special effects can make lower DPS weapons better.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 text-green-400 mt-0.5" />
                                            Value = DPS/Price. Great for early game decisions.
                                        </li>
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
