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
    'rvb-tycoon': 'rvb_tycoon'
}

const GAME_NAMES: Record<string, string> = {
    'afse': 'AFSE',
    'bomb-chip': 'Bomb Chip',
    'craft-a-brainrot': 'Craft a Brainrot',
    'rvb-tycoon': 'Red VS Blue Tycoon'
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

    return {
        title: entry.title,
        description: entry.excerpt,
        keywords: entry.seo_keywords?.join(', '),
        openGraph: {
            title: entry.title,
            description: entry.excerpt,
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

