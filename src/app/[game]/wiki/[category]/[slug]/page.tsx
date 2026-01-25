import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowLeft, Clock, Eye } from 'lucide-react'
import { createPublicServerClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WikiContent } from '@/components/WikiContent'

interface PageProps {
    params: Promise<{
        game: string
        category: string
        slug: string
    }>
}

const GAME_KEY_MAP: Record<string, string> = {
    'afse': 'afse',
    'bomb-chip': 'bomb_chip',
    'craft-a-brainrot': 'brainrot',
    'rvb-tycoon': 'rvb_tycoon',
    // Top 6 Expansion Games
    'escape-tsunami-for-brainrots': 'etfb',
    'steal-a-brainrot': 'sab',
    'fish-it': 'fishit',
    'fisch': 'fisch',
    'bee-swarm-simulator': 'bss',
    'grow-a-garden': 'gag',
    // New Games (Jan 2026)
    'plants-vs-brainrots': 'pvb',
    'the-forge': 'forge',
    'anime-guardians': 'ag',
    // New Games (Jan 25, 2026)
    'blox-fruits': 'bf',
    'adopt-me': 'am',
    'sols-rng': 'srng',
}

const GAME_NAMES: Record<string, string> = {
    'afse': 'AFSE',
    'bomb-chip': 'Bomb Chip',
    'craft-a-brainrot': 'Craft a Brainrot',
    'rvb-tycoon': 'Red VS Blue Tycoon',
    // Top 6 Expansion Games
    'escape-tsunami-for-brainrots': 'Escape Tsunami For Brainrots',
    'steal-a-brainrot': 'Steal a Brainrot',
    'fish-it': 'Fish It!',
    'fisch': 'Fisch',
    'bee-swarm-simulator': 'Bee Swarm Simulator',
    'grow-a-garden': 'Grow a Garden',
    // New Games (Jan 2026)
    'plants-vs-brainrots': 'Plants Vs Brainrots',
    'the-forge': 'The Forge',
    'anime-guardians': 'Anime Guardians',
    // New Games (Jan 25, 2026)
    'blox-fruits': 'Blox Fruits',
    'adopt-me': 'Adopt Me',
    'sols-rng': "Sol's RNG",
}

// 游戏主题色 - 用于渐变背景
const GAME_THEMES: Record<string, { accent: string; gradient: string }> = {
    'afse': {
        accent: '#a855f7',
        gradient: 'from-purple-950/30 via-transparent to-transparent'
    },
    'bomb-chip': {
        accent: '#ef4444',
        gradient: 'from-red-950/30 via-transparent to-transparent'
    },
    'craft-a-brainrot': {
        accent: '#22c55e',
        gradient: 'from-green-950/30 via-transparent to-transparent'
    },
    'rvb-tycoon': {
        accent: '#ef4444',
        gradient: 'from-red-950/30 via-transparent to-transparent'
    },
    // Top 6 Expansion Games
    'escape-tsunami-for-brainrots': {
        accent: '#06b6d4',
        gradient: 'from-cyan-950/30 via-transparent to-transparent'
    },
    'steal-a-brainrot': {
        accent: '#f97316',
        gradient: 'from-orange-950/30 via-transparent to-transparent'
    },
    'fish-it': {
        accent: '#3b82f6',
        gradient: 'from-blue-950/30 via-transparent to-transparent'
    },
    'fisch': {
        accent: '#0ea5e9',
        gradient: 'from-sky-950/30 via-transparent to-transparent'
    },
    'bee-swarm-simulator': {
        accent: '#eab308',
        gradient: 'from-yellow-950/30 via-transparent to-transparent'
    },
    'grow-a-garden': {
        accent: '#22c55e',
        gradient: 'from-green-950/30 via-transparent to-transparent'
    },
    // New Games (Jan 2026)
    'plants-vs-brainrots': {
        accent: '#22c55e',
        gradient: 'from-green-950/30 via-transparent to-transparent'
    },
    'the-forge': {
        accent: '#f97316',
        gradient: 'from-orange-950/30 via-transparent to-transparent'
    },
    'anime-guardians': {
        accent: '#8b5cf6',
        gradient: 'from-violet-950/30 via-transparent to-transparent'
    },
    // New Games (Jan 25, 2026)
    'blox-fruits': {
        accent: '#3b82f6',
        gradient: 'from-blue-950/30 via-transparent to-transparent'
    },
    'adopt-me': {
        accent: '#ec4899',
        gradient: 'from-pink-950/30 via-transparent to-transparent'
    },
    'sols-rng': {
        accent: '#f59e0b',
        gradient: 'from-amber-950/30 via-transparent to-transparent'
    }
}


// 生成 SEO 元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { game, category, slug } = await params
    const supabase = createPublicServerClient()
    const gameKey = GAME_KEY_MAP[game] || game

    const { data: entry } = await supabase
        .from('wiki_entries')
        .select('title, excerpt, seo_keywords')
        .eq('game_key', gameKey)
        .eq('category', category)
        .eq('slug', slug)
        .single()

    if (!entry) {
        return { title: 'Not Found' }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'
    const canonicalUrl = `${baseUrl}/${game}/wiki/${category}/${slug}`

    return {
        title: entry.title,
        description: entry.excerpt,
        keywords: entry.seo_keywords?.join(', '),
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: entry.title,
            description: entry.excerpt,
            url: canonicalUrl,
        }
    }
}

export default async function WikiEntryPage({ params }: PageProps) {
    const { game, category, slug } = await params
    const supabase = createPublicServerClient()
    const gameKey = GAME_KEY_MAP[game] || game

    // 获取 Wiki 条目
    const { data: entry, error } = await supabase
        .from('wiki_entries')
        .select('*')
        .eq('game_key', gameKey)
        .eq('category', category)
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

    if (error || !entry) {
        notFound()
    }

    // 更新浏览次数（异步，不阻塞页面）
    supabase
        .from('wiki_entries')
        .update({ view_count: (entry.view_count || 0) + 1 })
        .eq('id', entry.id)
        .then(() => { })

    // 获取相关条目（同分类）
    const { data: relatedEntries } = await supabase
        .from('wiki_entries')
        .select('slug, display_name, category')
        .eq('game_key', gameKey)
        .eq('category', category)
        .neq('slug', slug)
        .eq('is_published', true)
        .limit(5)

    const gameName = GAME_NAMES[game] || game
    const theme = GAME_THEMES[game] || GAME_THEMES['afse']

    return (
        <div className="min-h-screen">
            {/* 渐变背景层 */}
            <div className={`fixed inset-0 bg-gradient-to-b ${theme.gradient} pointer-events-none -z-10`} />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href={`/${game}`} className="hover:text-foreground">
                        {gameName}
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/${game}/wiki`} className="hover:text-foreground">
                        Wiki
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="capitalize">{category}</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground">{entry.display_name}</span>
                </nav>

                {/* Back Button */}
                <Link href={`/${game}/wiki`}>
                    <Button variant="ghost" size="sm" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Wiki
                    </Button>
                </Link>

                {/* Main Content */}
                <article className="space-y-6">
                    {/* Header */}
                    <header>
                        <h1 className="text-3xl font-bold mb-2">{entry.display_name}</h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {entry.metadata?.rarity && (
                                <Badge variant="secondary" className="capitalize">
                                    {entry.metadata.rarity}
                                </Badge>
                            )}
                            {entry.metadata?.tier && (
                                <Badge variant="outline">
                                    {entry.metadata.tier}-Tier
                                </Badge>
                            )}
                            <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Updated {new Date(entry.updated_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {entry.view_count || 0} views
                            </span>
                        </div>
                    </header>

                    {/* Content */}
                    <Card
                        className="glass-card border-t-4 overflow-hidden"
                        style={{ borderTopColor: theme.accent }}
                    >
                        <CardContent className="wiki-content pt-6">
                            <WikiContent content={entry.content} />
                        </CardContent>
                    </Card>

                    {/* Keywords for SEO */}
                    {entry.seo_keywords?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {entry.seo_keywords.map((keyword: string) => (
                                <Badge key={keyword} variant="outline" className="text-xs">
                                    {keyword}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Related Entries */}
                    {relatedEntries && relatedEntries.length > 0 && (
                        <section className="mt-12">
                            <h2 className="text-xl font-semibold mb-4">Related</h2>
                            <div className="grid gap-2">
                                {relatedEntries.map(related => (
                                    <Link
                                        key={related.slug}
                                        href={`/${game}/wiki/${related.category}/${related.slug}`}
                                        className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                        {related.display_name}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </div>
        </div>
    )
}

