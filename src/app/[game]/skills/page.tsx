import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Zap, ArrowRight, Clock, Target } from 'lucide-react'

export const metadata: Metadata = {
    title: 'AFSE Skills Database 2026 | All Skills & Damage Guide',
    description: 'Complete skills database for Anime Fighting Simulator Endless. View damage values, cooldowns, tier rankings, and best skill combinations for maximum DPS.',
    keywords: [
        'afse skills',
        'anime fighting simulator endless skills',
        'best skills afse',
        'afse skill tier list',
        'afse skill damage',
        'afse best skill combo'
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

async function getSkills() {
    const supabase = createPublicServerClient()
    const { data } = await supabase
        .from('skills')
        .select('*')
        .eq('game_key', 'afse')
        .order('tier')
    return data || []
}

export default async function SkillsPage() {
    const skills = await getSkills()

    type SkillType = (typeof skills)[number]

    const groupedSkills = skills.reduce<Record<string, SkillType[]>>((acc, skill) => {
        const tier = skill.tier || 'D'
        if (!acc[tier]) acc[tier] = []
        acc[tier].push(skill)
        return acc
    }, {})

    const tiers = ['S', 'A', 'B', 'C', 'D']

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        <Zap className="h-3 w-3 mr-1" />
                        Database
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        AFSE Skills Database
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Complete list of all skills. Click any skill to view details.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-cyan-400">{skills.length}</div>
                            <div className="text-sm text-zinc-400">Total Skills</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-yellow-400">{groupedSkills['S']?.length || 0}</div>
                            <div className="text-sm text-zinc-400">S-Tier Skills</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-purple-400">{groupedSkills['A']?.length || 0}</div>
                            <div className="text-sm text-zinc-400">A-Tier Skills</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Skills by Tier */}
                {tiers.map(tier => {
                    const tierSkills = groupedSkills[tier]
                    if (!tierSkills?.length) return null

                    return (
                        <section key={tier} className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className={`${TIER_COLORS[tier]} text-lg font-bold px-3 py-1`}>
                                    {tier}-Tier
                                </Badge>
                                <span className="text-zinc-500 text-sm">{tierSkills.length} skills</span>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {tierSkills.map((skill) => (
                                    <Link key={skill.id} href={`/skills/${skill.id}`}>
                                        <Card className={`bg-gradient-to-br ${TIER_BG[tier]} transition-all group h-full`}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="p-2 rounded-lg bg-zinc-800/50">
                                                        <Zap className="h-5 w-5 text-cyan-400" />
                                                    </div>
                                                    <Badge className={`${TIER_COLORS[tier]} text-xs`}>{tier}</Badge>
                                                </div>

                                                <h3 className="font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                                    {skill.skill_name}
                                                </h3>

                                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <Target className="h-3.5 w-3.5 text-red-400" />
                                                        <span className="text-zinc-400">{skill.base_damage.toLocaleString()} DMG</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="h-3.5 w-3.5 text-blue-400" />
                                                        <span className="text-zinc-400">{skill.cooldown_sec}s CD</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                                                    <span className="text-xs text-zinc-500">{skill.scaling_stat || 'Chakra'} scaling</span>
                                                    <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
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
                <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30 mt-8">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">Find Your Optimal Skill Rotation</h3>
                        <p className="text-zinc-400 mb-4">Use our DPS Calculator to compare skill combinations</p>
                        <Link href="/dps" className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                            Try DPS Calculator
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
