import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Zap, ArrowLeft, Clock, Target, TrendingUp } from 'lucide-react'

const TIER_COLORS: Record<string, string> = {
    'S': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'A': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'B': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'C': 'bg-green-500/20 text-green-400 border-green-500/30',
    'D': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

async function getSkill(id: string) {
    const supabase = createPublicServerClient()
    const { data } = await supabase.from('skills').select('*').eq('id', id).single()
    return data
}

async function getSimilarSkills(tier: string, currentId: number) {
    const supabase = createPublicServerClient()
    const { data } = await supabase
        .from('skills')
        .select('id, skill_name, tier, base_damage, cooldown_sec')
        .eq('game_key', 'afse')
        .eq('tier', tier)
        .neq('id', currentId)
        .limit(3)
    return data || []
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const skill = await getSkill(id)
    if (!skill) return { title: 'Skill Not Found' }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'
    const canonicalUrl = `${baseUrl}/afse/skills/${id}`

    return {
        title: `${skill.skill_name} | AFSE Skill Stats`,
        description: `${skill.skill_name} - Damage: ${skill.base_damage}, Cooldown: ${skill.cooldown_sec}s, Tier: ${skill.tier}`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${skill.skill_name} | AFSE Skill Stats`,
            description: `${skill.skill_name} - Damage: ${skill.base_damage}, Cooldown: ${skill.cooldown_sec}s, Tier: ${skill.tier}`,
            url: canonicalUrl,
        }
    }
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const skill = await getSkill(id)
    if (!skill) notFound()

    const similarSkills = await getSimilarSkills(skill.tier, skill.id)
    const dps = skill.base_damage / skill.cooldown_sec

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href="/skills" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />Back to Skills
                    </Link>
                </div>

                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-cyan-500/10">
                            <Zap className="h-8 w-8 text-cyan-400" />
                        </div>
                        <div>
                            <Badge className={`${TIER_COLORS[skill.tier]} text-sm mb-1`}>{skill.tier}-Tier</Badge>
                            <h1 className="text-3xl font-bold text-white">{skill.skill_name}</h1>
                        </div>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Target className="h-5 w-5 text-red-400" />Combat Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Base Damage</span>
                                <span className="text-xl font-bold text-red-400">{skill.base_damage.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Cooldown</span>
                                <span className="text-xl font-bold text-blue-400">{skill.cooldown_sec}s</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">DPS Potential</span>
                                <span className="text-xl font-bold text-cyan-400">{dps.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-400" />Usage Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-zinc-400 text-sm">
                                <li>• {skill.tier === 'S' ? 'Top-tier skill. Use in every build!' : skill.tier === 'A' ? 'Excellent choice for most situations.' : 'Good filler skill for rotations.'}</li>
                                <li>• Scales with {skill.scaling_stat || 'Chakra'} stat.</li>
                                <li>• Best paired with low-CD skills for sustained damage.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {similarSkills.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Other {skill.tier}-Tier Skills</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {similarSkills.map((s) => (
                                <Link key={s.id} href={`/skills/${s.id}`}>
                                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <Zap className="h-4 w-4 text-cyan-400" />
                                                <Badge className={`${TIER_COLORS[s.tier]} text-xs`}>{s.tier}</Badge>
                                            </div>
                                            <h3 className="font-medium text-white">{s.skill_name}</h3>
                                            <p className="text-sm text-zinc-500">{s.base_damage.toLocaleString()} DMG • {s.cooldown_sec}s</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">Calculate Your Damage</h3>
                        <Link href="/dps" className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                            Open DPS Calculator
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
