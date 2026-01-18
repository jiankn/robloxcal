import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Sword, ArrowLeft, Zap, Shield, TrendingUp, Target } from 'lucide-react'

const TIER_COLORS: Record<string, string> = {
    'S': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'A': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'B': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'C': 'bg-green-500/20 text-green-400 border-green-500/30',
    'D': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

async function getWeapon(id: string) {
    const supabase = createPublicServerClient()

    const { data: weapon } = await supabase
        .from('weapons')
        .select('*')
        .eq('id', id)
        .single()

    return weapon
}

async function getSimilarWeapons(tier: string, currentId: number) {
    const supabase = createPublicServerClient()

    const { data: weapons } = await supabase
        .from('weapons')
        .select('id, weapon_name, tier, base_damage')
        .eq('game_key', 'afse')
        .eq('tier', tier)
        .neq('id', currentId)
        .limit(3)

    return weapons || []
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const weapon = await getWeapon(id)

    if (!weapon) {
        return { title: 'Weapon Not Found' }
    }

    return {
        title: `${weapon.weapon_name} | AFSE Weapon Stats`,
        description: `${weapon.weapon_name} stats and info for Anime Fighting Simulator Endless. Base damage: ${weapon.base_damage}, Attack speed: ${weapon.attack_speed}x, Tier: ${weapon.tier}`,
        keywords: [
            `${weapon.weapon_name.toLowerCase()} afse`,
            'afse weapon',
            `${weapon.tier} tier weapon afse`
        ]
    }
}

export default async function WeaponDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const weapon = await getWeapon(id)

    if (!weapon) {
        notFound()
    }

    const similarWeapons = await getSimilarWeapons(weapon.tier, weapon.id)

    // Calculate DPS estimate
    const estimatedDPS = weapon.base_damage * weapon.attack_speed

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/weapons"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Weapons
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-orange-500/10">
                            <Sword className="h-8 w-8 text-orange-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge className={`${TIER_COLORS[weapon.tier]} text-sm`}>
                                    {weapon.tier}-Tier
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-bold text-white">
                                {weapon.weapon_name}
                            </h1>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Main Stats */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Zap className="h-5 w-5 text-red-400" />
                                Combat Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Base Damage</span>
                                <span className="text-xl font-bold text-red-400">
                                    {weapon.base_damage.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Attack Speed</span>
                                <span className="text-xl font-bold text-blue-400">
                                    {weapon.attack_speed}x
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Estimated DPS</span>
                                <span className="text-xl font-bold text-purple-400">
                                    {estimatedDPS.toLocaleString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Info */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Target className="h-5 w-5 text-green-400" />
                                Weapon Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Scaling Stat</span>
                                <span className="text-white font-medium">
                                    {weapon.scaling_stat || 'Sword'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Tier Ranking</span>
                                <Badge className={TIER_COLORS[weapon.tier]}>
                                    {weapon.tier}-Tier
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Game</span>
                                <span className="text-white font-medium">AFSE</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tips */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-yellow-400" />
                            Usage Tips
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-zinc-400">
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                <span>
                                    {weapon.tier === 'S'
                                        ? 'This is one of the best weapons in the game. Prioritize obtaining it!'
                                        : weapon.tier === 'A'
                                            ? 'Excellent weapon for most content. Great for both PvE and PvP.'
                                            : weapon.tier === 'B'
                                                ? 'Solid mid-tier weapon. Good for progressing through the game.'
                                                : 'Suitable for early game. Consider upgrading when possible.'}
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                <span>
                                    Best paired with high {weapon.scaling_stat || 'Sword'} stat builds.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-yellow-400">•</span>
                                <span>
                                    Use our DPS Calculator to find the optimal skill combination.
                                </span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Similar Weapons */}
                {similarWeapons.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Other {weapon.tier}-Tier Weapons
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {similarWeapons.map((similar) => (
                                <Link key={similar.id} href={`/weapons/${similar.id}`}>
                                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all h-full">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <Sword className="h-4 w-4 text-orange-400" />
                                                <Badge className={`${TIER_COLORS[similar.tier]} text-xs`}>
                                                    {similar.tier}
                                                </Badge>
                                            </div>
                                            <h3 className="font-medium text-white">{similar.weapon_name}</h3>
                                            <p className="text-sm text-zinc-500">{similar.base_damage.toLocaleString()} DMG</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Calculate Your Damage
                        </h3>
                        <p className="text-zinc-400 mb-4">
                            See how {weapon.weapon_name} performs with your stats
                        </p>
                        <Link
                            href="/dps"
                            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Open DPS Calculator
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
