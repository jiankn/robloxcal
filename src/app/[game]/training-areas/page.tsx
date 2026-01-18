import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Map, TrendingUp, Lock, Search } from 'lucide-react'
import Link from 'next/link'
import { STAT_TYPE_LABELS } from '@/lib/types'
import type { StatType } from '@/lib/types'

export const metadata: Metadata = {
    title: 'AFSE Training Areas | All Training Locations Guide',
    description: 'Complete list of all training areas in Anime Fighting Simulator Endless (2026). Find requirements, multipliers, and best training spots for Strength, Chakra, Sword, Speed, Agility, and Durability.',
    keywords: [
        'afse training areas',
        'anime fighting simulator endless training areas',
        'strength training areas afse',
        'chakra training areas afse',
        'durability training areas afse',
        'speed agility training areas afse',
        'best training area afse',
        'afse training spots'
    ]
}

async function getTrainingAreas() {
    try {
        const supabase = createPublicServerClient()
        const { data: areas } = await supabase
            .from('training_areas')
            .select('*')
            .eq('game_key', 'afse')
            .order('stat_type', { ascending: true })
            .order('required_stat_value', { ascending: true })

        return areas || []
    } catch {
        return []
    }
}

function formatNumber(num: number): string {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toString()
}

const STAT_TYPE_COLORS: Record<StatType, string> = {
    strength: 'bg-red-500/20 text-red-400 border-red-500/30',
    chakra: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    sword: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    speed: 'bg-green-500/20 text-green-400 border-green-500/30',
    agility: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    durability: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
}

export default async function TrainingAreasPage() {
    const areas = await getTrainingAreas()

    // 按 stat_type 分组
    const groupedAreas = areas.reduce((acc, area) => {
        const key = area.stat_type as StatType
        if (!acc[key]) acc[key] = []
        acc[key].push(area)
        return acc
    }, {} as Record<StatType, typeof areas>)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <Map className="h-3 w-3 mr-1" />
                        Complete Database
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        AFSE Training Areas
                    </h1>
                    <p className="text-zinc-400">
                        All training locations in Anime Fighting Simulator Endless with requirements and multipliers.
                    </p>
                </div>

                {/* Stat Type Navigation */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {Object.keys(STAT_TYPE_LABELS).map((type) => (
                        <a
                            key={type}
                            href={`#${type}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${STAT_TYPE_COLORS[type as StatType]
                                } hover:opacity-80`}
                        >
                            {STAT_TYPE_LABELS[type as StatType]}
                        </a>
                    ))}
                </div>

                {/* Training Areas by Type */}
                <div className="space-y-12">
                    {(Object.entries(groupedAreas) as [StatType, typeof areas][]).map(([statType, typeAreas]) => (
                        <section key={statType} id={statType}>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Badge className={STAT_TYPE_COLORS[statType as StatType]}>
                                    {STAT_TYPE_LABELS[statType as StatType]}
                                </Badge>
                                <span className="text-zinc-500 text-base font-normal">
                                    ({typeAreas.length} areas)
                                </span>
                            </h2>

                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {typeAreas.map((area, index) => (
                                    <Card
                                        key={area.id}
                                        className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors"
                                    >
                                        <CardContent className="py-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-zinc-500 text-sm">#{index + 1}</span>
                                                        <h3 className="font-semibold text-white">{area.area_name}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span className="flex items-center gap-1 text-zinc-400">
                                                            <Lock className="h-3 w-3" />
                                                            {formatNumber(area.required_stat_value)}
                                                        </span>
                                                        {area.seed_area_multiplier && (
                                                            <span className="flex items-center gap-1 text-green-400">
                                                                <TrendingUp className="h-3 w-3" />
                                                                {area.seed_area_multiplier}x
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 mt-12">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Not Sure Which Area to Use?
                        </h3>
                        <p className="text-zinc-400 mb-4">
                            Let our Training Optimizer calculate the best area for your current stats and boosts.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                            Try AFSE Calculator
                        </Link>
                    </CardContent>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Calculator</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
