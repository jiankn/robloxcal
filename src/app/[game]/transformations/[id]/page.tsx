import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Sparkles, ArrowLeft, TrendingUp, Zap } from 'lucide-react'

const TIER_COLORS: Record<string, string> = {
    'S': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'A': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'B': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'C': 'bg-green-500/20 text-green-400 border-green-500/30',
    'D': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

async function getTransformation(id: string) {
    const supabase = createPublicServerClient()
    const { data } = await supabase.from('transformations').select('*').eq('id', id).single()
    return data
}

async function getSimilar(tier: string, currentId: number) {
    const supabase = createPublicServerClient()
    const { data } = await supabase
        .from('transformations')
        .select('id, transformation_name, tier, damage_multiplier')
        .eq('game_key', 'afse')
        .eq('tier', tier)
        .neq('id', currentId)
        .limit(3)
    return data || []
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const t = await getTransformation(id)
    if (!t) return { title: 'Form Not Found' }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'
    const canonicalUrl = `${baseUrl}/afse/transformations/${id}`

    return {
        title: `${t.transformation_name} | AFSE Transformation`,
        description: `${t.transformation_name} - ${t.damage_multiplier}x damage multiplier. Tier: ${t.tier}`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${t.transformation_name} | AFSE Transformation`,
            description: `${t.transformation_name} - ${t.damage_multiplier}x damage multiplier. Tier: ${t.tier}`,
            url: canonicalUrl,
        }
    }
}

export default async function TransformationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const t = await getTransformation(id)
    if (!t) notFound()

    const similar = await getSimilar(t.tier, t.id)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <Link href="/transformations" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" />Back to Transformations
                    </Link>
                </div>

                <header className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-pink-500/10">
                            <Sparkles className="h-8 w-8 text-pink-400" />
                        </div>
                        <div>
                            <Badge className={`${TIER_COLORS[t.tier]} text-sm mb-1`}>{t.tier}-Tier</Badge>
                            <h1 className="text-3xl font-bold text-white">{t.transformation_name}</h1>
                        </div>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-400" />Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Damage Multiplier</span>
                                <span className="text-xl font-bold text-green-400">{t.damage_multiplier}x</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-zinc-800/50 rounded-lg">
                                <span className="text-zinc-400">Tier Ranking</span>
                                <Badge className={TIER_COLORS[t.tier]}>{t.tier}-Tier</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" />Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-zinc-400 text-sm">
                                <li>• {t.tier === 'S' ? 'Best transformation in the game!' : t.tier === 'A' ? 'Excellent form for most content.' : 'Good budget option.'}</li>
                                <li>• Stack with weapon damage for maximum output.</li>
                                <li>• Use before boss fights for burst damage.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {similar.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">Other {t.tier}-Tier Forms</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {similar.map((s) => (
                                <Link key={s.id} href={`/transformations/${s.id}`}>
                                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <Sparkles className="h-4 w-4 text-pink-400" />
                                                <Badge className={`${TIER_COLORS[s.tier]} text-xs`}>{s.tier}</Badge>
                                            </div>
                                            <h3 className="font-medium text-white">{s.transformation_name}</h3>
                                            <p className="text-sm text-zinc-500">{s.damage_multiplier}x DMG</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <Card className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500/30">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">Calculate With This Form</h3>
                        <Link href="/dps" className="inline-flex items-center px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                            Open DPS Calculator
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
