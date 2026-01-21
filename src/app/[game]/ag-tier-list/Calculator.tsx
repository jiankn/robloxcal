'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Trophy, Star, Shield, Sword, Zap, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const GAME_SLUG = 'anime-guardians'

// Unit data organized by tier
const UNITS = {
    'SS': [
        { id: 'gojo', name: 'Gojo Satoru', anime: 'Jujutsu Kaisen', role: 'DPS', element: 'Void' },
        { id: 'muzan', name: 'Muzan Kibutsuji', anime: 'Demon Slayer', role: 'DPS', element: 'Dark' },
        { id: 'madara', name: 'Madara Uchiha', anime: 'Naruto', role: 'DPS', element: 'Fire' },
    ],
    'S': [
        { id: 'sukuna', name: 'Ryomen Sukuna', anime: 'Jujutsu Kaisen', role: 'DPS', element: 'Curse' },
        { id: 'tanjiro', name: 'Tanjiro (Sun)', anime: 'Demon Slayer', role: 'DPS', element: 'Fire' },
        { id: 'naruto', name: 'Naruto (Six Paths)', anime: 'Naruto', role: 'DPS', element: 'Light' },
        { id: 'saitama', name: 'Saitama', anime: 'One Punch Man', role: 'DPS', element: 'Physical' },
    ],
    'A': [
        { id: 'zenitsu', name: 'Zenitsu', anime: 'Demon Slayer', role: 'DPS', element: 'Thunder' },
        { id: 'sasuke', name: 'Sasuke (Rinnegan)', anime: 'Naruto', role: 'DPS', element: 'Lightning' },
        { id: 'genos', name: 'Genos', anime: 'One Punch Man', role: 'DPS', element: 'Fire' },
        { id: 'todo', name: 'Todo Aoi', anime: 'Jujutsu Kaisen', role: 'Support', element: 'Physical' },
        { id: 'giyu', name: 'Giyu Tomioka', anime: 'Demon Slayer', role: 'DPS', element: 'Water' },
    ],
    'B': [
        { id: 'inosuke', name: 'Inosuke', anime: 'Demon Slayer', role: 'DPS', element: 'Physical' },
        { id: 'megumi', name: 'Megumi Fushiguro', anime: 'Jujutsu Kaisen', role: 'DPS', element: 'Shadow' },
        { id: 'kakashi', name: 'Kakashi', anime: 'Naruto', role: 'Support', element: 'Lightning' },
        { id: 'mitsuri', name: 'Mitsuri Kanroji', anime: 'Demon Slayer', role: 'DPS', element: 'Love' },
    ],
    'C': [
        { id: 'nobara', name: 'Nobara Kugisaki', anime: 'Jujutsu Kaisen', role: 'DPS', element: 'Curse' },
        { id: 'sakura', name: 'Sakura', anime: 'Naruto', role: 'Support', element: 'Physical' },
        { id: 'king', name: 'King', anime: 'One Punch Man', role: 'Tank', element: 'Physical' },
    ],
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    'SS': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
    'S': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
    'A': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    'B': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
    'C': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
}

const ROLE_ICONS: Record<string, typeof Sword> = {
    'DPS': Sword,
    'Support': Shield,
    'Tank': Shield,
}

const ANIME_LIST = ['All', 'Jujutsu Kaisen', 'Demon Slayer', 'Naruto', 'One Punch Man']

export default function AgTierList() {
    const [filterAnime, setFilterAnime] = useState<string>('All')
    const [filterRole, setFilterRole] = useState<string>('All')

    const filterUnits = (units: typeof UNITS['SS']) => {
        return units.filter(unit => {
            const animeMatch = filterAnime === 'All' || unit.anime === filterAnime
            const roleMatch = filterRole === 'All' || unit.role === filterRole
            return animeMatch && roleMatch
        })
    }

    return (
        <CalculatorLayout
            title="Unit Tier List"
            description="Best units ranked by effectiveness in tower defense gameplay. Updated January 2026."
            gameSlug={GAME_SLUG}
        >
            {/* Filters */}
            <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-zinc-400">Filters:</span>
                        </div>
                        <Select value={filterAnime} onValueChange={setFilterAnime}>
                            <SelectTrigger className="w-[180px] bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue placeholder="Anime" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                {ANIME_LIST.map(anime => (
                                    <SelectItem key={anime} value={anime} className="text-white hover:bg-zinc-800">
                                        {anime}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={filterRole} onValueChange={setFilterRole}>
                            <SelectTrigger className="w-[140px] bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                <SelectItem value="All" className="text-white hover:bg-zinc-800">All Roles</SelectItem>
                                <SelectItem value="DPS" className="text-white hover:bg-zinc-800">DPS</SelectItem>
                                <SelectItem value="Support" className="text-white hover:bg-zinc-800">Support</SelectItem>
                                <SelectItem value="Tank" className="text-white hover:bg-zinc-800">Tank</SelectItem>
                            </SelectContent>
                        </Select>
                        {(filterAnime !== 'All' || filterRole !== 'All') && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => { setFilterAnime('All'); setFilterRole('All') }}
                                className="text-zinc-400 hover:text-white"
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Tier List */}
            <div className="space-y-4">
                {Object.entries(UNITS).map(([tier, units]) => {
                    const filteredUnits = filterUnits(units)
                    if (filteredUnits.length === 0) return null

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
                                            {tier === 'SS' && 'God Tier - Best in Game'}
                                            {tier === 'S' && 'Excellent - Top Picks'}
                                            {tier === 'A' && 'Great - Solid Choices'}
                                            {tier === 'B' && 'Good - Situational'}
                                            {tier === 'C' && 'Average - Early Game'}
                                        </p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {filteredUnits.map(unit => {
                                        const RoleIcon = ROLE_ICONS[unit.role] || Sword
                                        return (
                                            <div
                                                key={unit.id}
                                                className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
                                            >
                                                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                                    <RoleIcon className={`h-5 w-5 ${colors.text}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-white font-medium truncate">{unit.name}</div>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="text-zinc-500">{unit.anime}</span>
                                                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-[10px] px-1.5">
                                                            {unit.element}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Legend */}
            <Card className="bg-zinc-900/30 border-zinc-800 mt-6">
                <CardContent className="p-4">
                    <div className="text-xs text-zinc-500">
                        <p className="mb-2"><strong className="text-zinc-300">Tier List Notes:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Rankings based on overall tower defense effectiveness</li>
                            <li>Units may perform differently in specific game modes</li>
                            <li>Awakening and evolution can significantly improve unit performance</li>
                            <li>Updated for Update 22.5 (January 2026)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </CalculatorLayout>
    )
}
