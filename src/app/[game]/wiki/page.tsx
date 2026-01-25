'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { HowItWorks } from '@/components/HowItWorks'

interface WikiEntry {
    id: string
    category: string
    slug: string
    title: string
    display_name: string
    excerpt: string
    metadata: {
        rarity?: string
        tier?: string
        ingredients?: string[]
    }
}

interface CategoryGroup {
    category: string
    entries: WikiEntry[]
}

const CATEGORY_LABELS: Record<string, string> = {
    recipes: '📜 Recipes',
    fruits: '🍎 Fruits',
    champions: '⚔️ Champions',
    bloodlines: '👁️ Bloodlines',
    curses: '😈 Curses',
    transformations: '✨ Transformations',
    skills: '💪 Skills',
    strategy: '🎯 Strategy',
    skins: '🎨 Skins',
    // RVB Tycoon categories
    guides: '📖 Guides',
    'tier-list': '🏆 Tier Lists',
    codes: '🎁 Codes',
    faq: '❓ FAQ',
    // Fish It & Fisch categories
    fish: '🐟 Fish',
    rods: '🎣 Rods',
    locations: '🗺️ Locations',
    baits: '🪱 Baits',
    // Bee Swarm Simulator categories
    bees: '🐝 Bees',
    fields: '🌻 Fields',
    items: '🎁 Items',
    quests: '📝 Quests',
    // Grow a Garden categories
    crops: '🌱 Crops',
    pets: '🐾 Pets',
    tools: '🛠️ Tools',
    // Escape Tsunami & Steal a Brainrot categories
    upgrades: '⬆️ Upgrades',
    brainrots: '🧠 Brainrots',
    mechanics: '⚙️ Mechanics',
    // New Games: Sols RNG
    auras: '✨ Auras',
}

const RARITY_COLORS: Record<string, string> = {
    common: 'bg-gray-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500',
    mythic: 'bg-red-500',
}

export default function WikiListPage() {
    const params = useParams()
    const gameSlug = params.game as string

    const [entries, setEntries] = useState<WikiEntry[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchWikiEntries() {
            const supabase = createClient()

            // 获取游戏的 game_key
            const gameKeyMap: Record<string, string> = {
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
            const gameKey = gameKeyMap[gameSlug] || gameSlug

            const { data, error } = await supabase
                .from('wiki_entries')
                .select('id, category, slug, title, display_name, excerpt, metadata')
                .eq('game_key', gameKey)
                .eq('is_published', true)
                .order('category')
                .order('display_name')

            if (!error && data) {
                setEntries(data)
            }
            setLoading(false)
        }

        fetchWikiEntries()
    }, [gameSlug])

    // 按分类分组
    const groupedEntries: CategoryGroup[] = entries
        .filter(e =>
            e.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .reduce((acc, entry) => {
            const existing = acc.find(g => g.category === entry.category)
            if (existing) {
                existing.entries.push(entry)
            } else {
                acc.push({ category: entry.category, entries: [entry] })
            }
            return acc
        }, [] as CategoryGroup[])

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Link href={`/${gameSlug}`} className="hover:text-foreground">
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>Wiki</span>
                </div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <BookOpen className="h-8 w-8" />
                    Wiki
                </h1>
                <p className="text-muted-foreground mt-2">
                    Browse guides, recipes, and information
                </p>
            </div>

            {/* How It Works */}
            <HowItWorks toolType="wiki" proTip="Use the search bar to quickly find specific information!" />

            {/* Search */}
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search wiki..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-12 text-muted-foreground">
                    Loading wiki entries...
                </div>
            )}

            {/* Empty State */}
            {!loading && entries.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No wiki entries yet. Check back soon!</p>
                    </CardContent>
                </Card>
            )}

            {/* Wiki Entries by Category */}
            <div className="space-y-8">
                {groupedEntries.map(group => (
                    <section key={group.category}>
                        <h2 className="text-xl font-semibold mb-4">
                            {CATEGORY_LABELS[group.category] || group.category}
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {group.entries.map(entry => (
                                <Link
                                    key={entry.id}
                                    href={`/${gameSlug}/wiki/${entry.category}/${entry.slug}`}
                                >
                                    <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <CardTitle className="text-base">
                                                    {entry.display_name}
                                                </CardTitle>
                                                {entry.metadata?.rarity && (
                                                    <Badge
                                                        variant="secondary"
                                                        className={`${RARITY_COLORS[entry.metadata.rarity] || ''} text-white text-xs`}
                                                    >
                                                        {entry.metadata.rarity}
                                                    </Badge>
                                                )}
                                                {entry.metadata?.tier && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {entry.metadata.tier}-Tier
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="line-clamp-2">
                                                {entry.excerpt}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
