import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
    title: 'AFSE Transformations 2026 | All Forms & Multipliers',
    description: 'Complete transformations database for Anime Fighting Simulator Endless. View damage multipliers, unlock requirements, and best transformation tier rankings.',
    keywords: [
        'afse transformations',
        'anime fighting simulator endless transformations',
        'afse forms',
        'best transformation afse',
        'afse form tier list',
        'afse damage multipliers'
    ]
}

const TIER_COLORS: Record<string, string> = {
    'S': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'A': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'B': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'C': 'bg-green-500/20 text-green-400 border-green-500/30',
    'D': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

const TIER_BG: Record<string, string> = {
    'S': 'from-yellow-900/10 to-zinc-900/50 border-yellow-500/20 hover:border-yellow-500/40',
    'A': 'from-purple-900/10 to-zinc-900/50 border-purple-500/20 hover:border-purple-500/40',
    'B': 'from-blue-900/10 to-zinc-900/50 border-blue-500/20 hover:border-blue-500/40',
    'C': 'from-green-900/10 to-zinc-900/50 border-green-500/20 hover:border-green-500/40',
    'D': 'from-zinc-800/50 to-zinc-900/50 border-zinc-700/50 hover:border-zinc-600/50'
}

async function getTransformations() {
    const supabase = createPublicServerClient()
    const { data } = await supabase
        .from('transformations')
        .select('*')
        .eq('game_key', 'afse')
        .order('tier')
    return data || []
}

export default async function TransformationsPage() {
    const transformations = await getTransformations()

    type TransformationType = (typeof transformations)[number]

    const grouped = transformations.reduce<Record<string, TransformationType[]>>((acc, t) => {
        const tier = t.tier || 'D'
        if (!acc[tier]) acc[tier] = []
        acc[tier].push(t)
        return acc
    }, {})

    const tiers = ['S', 'A', 'B', 'C', 'D']

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-pink-500/20 text-pink-300 border-pink-500/30">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Database
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        AFSE Transformations
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        All transformation forms with damage multipliers and unlock requirements.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-pink-400">{transformations.length}</div>
                            <div className="text-sm text-zinc-400">Total Forms</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-yellow-400">{grouped['S']?.length || 0}</div>
                            <div className="text-sm text-zinc-400">S-Tier Forms</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-purple-400">
                                {transformations.length > 0 ? Math.max(...transformations.map(t => t.damage_multiplier)).toFixed(1) + 'x' : '-'}
                            </div>
                            <div className="text-sm text-zinc-400">Max Multiplier</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transformations by Tier */}
                {tiers.map(tier => {
                    const tierItems = grouped[tier]
                    if (!tierItems?.length) return null

                    return (
                        <section key={tier} className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className={`${TIER_COLORS[tier]} text-lg font-bold px-3 py-1`}>{tier}-Tier</Badge>
                                <span className="text-zinc-500 text-sm">{tierItems.length} forms</span>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {tierItems.map((t) => (
                                    <Link key={t.id} href={`/transformations/${t.id}`}>
                                        <Card className={`bg-gradient-to-br ${TIER_BG[tier]} transition-all group h-full`}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="p-2 rounded-lg bg-zinc-800/50">
                                                        <Sparkles className="h-5 w-5 text-pink-400" />
                                                    </div>
                                                    <Badge className={`${TIER_COLORS[tier]} text-xs`}>{tier}</Badge>
                                                </div>

                                                <h3 className="font-semibold text-white mb-2 group-hover:text-pink-300 transition-colors">
                                                    {t.transformation_name}
                                                </h3>

                                                <div className="flex items-center gap-4 text-sm mb-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                                                        <span className="text-zinc-400">{t.damage_multiplier}x DMG</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                                                    <span className="text-xs text-zinc-500">View details</span>
                                                    <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-pink-400 transition-colors" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )
                })}

                {/* CTA */}
                <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500/30 mt-8">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">Test Your Transformation DPS</h3>
                        <Link href="/dps" className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                            Open DPS Calculator
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
