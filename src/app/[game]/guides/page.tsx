import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllGuides, getFeaturedGuides } from '@/lib/guides-data'
import { GUIDE_CATEGORIES, DIFFICULTY_LABELS } from '@/lib/guides-types'
import { BookOpen, Clock, TrendingUp, Sword, Coins, Lightbulb, Star } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

export const metadata: Metadata = {
    title: 'AFSE Guides 2026 | Anime Fighting Simulator Endless Tips & Strategies',
    description: 'Complete guides and strategies for Anime Fighting Simulator Endless (2026). Learn how to level up fast, when to rebirth, best builds, and more expert tips.',
    keywords: [
        'afse guides',
        'anime fighting simulator endless guide',
        'afse leveling guide',
        'afse rebirth guide',
        'afse tips',
        'how to get strong fast in afse',
        'afse beginner guide'
    ]
}

// 使用动态渲染
export const dynamic = 'force-dynamic'

const CATEGORY_ICONS = {
    leveling: TrendingUp,
    combat: Sword,
    economy: Coins,
    tips: Lightbulb
}

function GuideCard({ guide, gameSlug }: { guide: ReturnType<typeof getAllGuides>[0]; gameSlug: string }) {
    const categoryInfo = GUIDE_CATEGORIES[guide.category]
    const difficultyInfo = DIFFICULTY_LABELS[guide.difficulty]
    const Icon = CATEGORY_ICONS[guide.category]

    return (
        <Link href={`/${gameSlug}/guides/${guide.slug}`}>
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all h-full">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg bg-${categoryInfo.color}-500/20`}>
                                <Icon className={`h-4 w-4 text-${categoryInfo.color}-400`} />
                            </div>
                            {guide.featured && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                </Badge>
                            )}
                        </div>
                        <Badge className={`bg-${difficultyInfo.color}-500/20 text-${difficultyInfo.color}-400 border-${difficultyInfo.color}-500/30`}>
                            {difficultyInfo.label}
                        </Badge>
                    </div>
                    <CardTitle className="text-lg text-white mt-3">{guide.title}</CardTitle>
                    <CardDescription className="text-zinc-400 line-clamp-2">
                        {guide.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {guide.readTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {categoryInfo.label}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                        {guide.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-zinc-800 rounded text-zinc-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

interface PageProps {
    params: Promise<{ game: string }>
}

export default async function GuidesPage({ params }: PageProps) {
    const { game } = await params
    const allGuides = getAllGuides()
    const featuredGuides = getFeaturedGuides()
    const regularGuides = allGuides.filter(g => !g.featured)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Game Guides
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        AFSE Guides & Strategies
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Master Anime Fighting Simulator Endless with our comprehensive guides.
                        From beginner tips to advanced strategies.
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="guides" proTip="Start with beginner guides before tackling advanced strategies!" />

                {/* Featured Guides */}
                {featuredGuides.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-400" />
                            Featured Guides
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredGuides.map((guide) => (
                                <GuideCard key={guide.slug} guide={guide} gameSlug={game} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Guides */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-4">All Guides</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularGuides.map((guide) => (
                            <GuideCard key={guide.slug} guide={guide} gameSlug={game} />
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30 mt-12">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Ready to Put These Tips Into Practice?
                        </h3>
                        <p className="text-zinc-400 mb-4">
                            Use our calculators to optimize your gameplay!
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link
                                href={`/${game}`}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                            >
                                Training Optimizer
                            </Link>
                            <Link
                                href={`/${game}/dps`}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                DPS Calculator
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        href={`/${game}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Training Optimizer</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

