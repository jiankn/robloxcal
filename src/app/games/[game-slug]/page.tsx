import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Calculator, Zap, Target, Gauge } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getGameBySlug } from '@/lib/game-config'
import { Disclaimer } from '@/components/calculators'

// Tool definitions for each game
const gameTools: Record<string, Array<{
    slug: string
    name: string
    description: string
    icon: 'rebirth' | 'roi' | 'speed' | 'income' | 'probability' | 'value'
    primaryKeyword: string
}>> = {
    'escape-tsunami-for-brainrots': [
        { slug: 'etfb-rebirth-calculator', name: 'Rebirth Advisor', description: 'Find the optimal time to rebirth for maximum multiplier gains', icon: 'rebirth', primaryKeyword: 'rebirth calculator' },
        { slug: 'etfb-upgrade-roi', name: 'Upgrade ROI Calculator', description: 'Calculate which upgrades give the best return on investment', icon: 'roi', primaryKeyword: 'upgrade calculator' },
        { slug: 'etfb-speed-planner', name: 'Speed Planner', description: 'Plan your speed upgrades to reach your goals faster', icon: 'speed', primaryKeyword: 'speed calculator' }
    ],
    'steal-a-brainrot': [
        { slug: 'sab-income-calculator', name: 'Income Calculator', description: 'Calculate your hourly and daily income with all multipliers', icon: 'income', primaryKeyword: 'income calculator' },
        { slug: 'sab-roi-calculator', name: 'ROI Calculator', description: 'Find the best brainrots to buy for maximum return', icon: 'roi', primaryKeyword: 'ROI calculator' },
        { slug: 'sab-drop-rate-calculator', name: 'Drop Rate Calculator', description: 'Calculate expected time to get rare drops', icon: 'probability', primaryKeyword: 'drop rate calculator' }
    ],
    'fish-it': [
        { slug: 'fishit-luck-drop-rate', name: 'Luck & Drop Rate', description: 'Calculate drop rates with your luck stats', icon: 'probability', primaryKeyword: 'luck calculator' },
        { slug: 'fishit-rare-fish-eta', name: 'Rare Fish ETA', description: 'Estimate time to catch specific rare fish', icon: 'probability', primaryKeyword: 'rare fish calculator' },
        { slug: 'fishit-profit-per-hour', name: 'Profit per Hour', description: 'Optimize your fishing strategy for maximum gold', icon: 'income', primaryKeyword: 'profit calculator' }
    ],
    'fisch': [
        { slug: 'fisch-fish-value-calculator', name: 'Fish Value Calculator', description: 'Calculate the value of your fish with mutations', icon: 'value', primaryKeyword: 'fish value calculator' },
        { slug: 'fisch-target-fish-solver', name: 'Target Fish Solver', description: 'Find where and how to catch specific fish', icon: 'rebirth', primaryKeyword: 'target fish calculator' },
        { slug: 'fisch-profit-optimizer', name: 'Profit Optimizer', description: 'Maximize your gold per hour with optimal setup', icon: 'income', primaryKeyword: 'profit calculator' }
    ],
    'bee-swarm-simulator': [
        { slug: 'bss-honey-calculator', name: 'Honey Calculator', description: 'Calculate honey production with all bonuses', icon: 'income', primaryKeyword: 'honey calculator' },
        { slug: 'bss-pollen-to-honey', name: 'Pollen to Honey', description: 'Convert pollen amounts to honey values', icon: 'value', primaryKeyword: 'pollen to honey converter' },
        { slug: 'bss-honey-per-pollen', name: 'Honey per Pollen', description: 'Calculate your honey per pollen rate', icon: 'roi', primaryKeyword: 'honey per pollen calculator' }
    ],
    'grow-a-garden': [
        { slug: 'gag-crop-value-calculator', name: 'Crop Value Calculator', description: 'Calculate crop values with mutations and boosts', icon: 'value', primaryKeyword: 'crop value calculator' },
        { slug: 'gag-pet-weight-calculator', name: 'Pet Weight Calculator', description: 'Estimate pet weight based on age and type', icon: 'rebirth', primaryKeyword: 'pet weight calculator' },
        { slug: 'gag-pet-xp-calculator', name: 'Pet XP Calculator', description: 'Plan pet leveling and hatch times', icon: 'speed', primaryKeyword: 'pet xp calculator' }
    ]
}

const iconMap = {
    rebirth: Zap,
    roi: Calculator,
    speed: Gauge,
    income: Calculator,
    probability: Target,
    value: Calculator
}

interface Props {
    params: Promise<{ 'game-slug': string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { 'game-slug': gameSlug } = await params
    const game = getGameBySlug(gameSlug)

    if (!game) return { title: 'Game Not Found' }

    return {
        title: `${game.full_name} Calculator — Free Tools & Guides | RobloxCal`,
        description: game.seo.description,
        keywords: game.seo.keywords,
        openGraph: {
            title: `${game.full_name} Calculator`,
            description: game.seo.description
        }
    }
}

export default async function GameHubPage({ params }: Props) {
    const { 'game-slug': gameSlug } = await params
    const game = getGameBySlug(gameSlug)

    if (!game) {
        notFound()
    }

    const tools = gameTools[gameSlug] || []

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/games" className="hover:text-white transition-colors">Games</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-white">{game.display_name}</span>
                </nav>

                {/* Hero Section */}
                <div className="mb-12">
                    <Badge
                        className="mb-4"
                        style={{ backgroundColor: `${game.theme.accent}20`, color: game.theme.accent, borderColor: `${game.theme.accent}50` }}
                    >
                        {game.platform.toUpperCase()} GAME
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {game.full_name} Calculator
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-3xl">
                        Free online calculators and tools for {game.full_name}.
                        Optimize your gameplay with our accurate, community-tested calculators.
                    </p>
                </div>

                {/* Tools Grid */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Available Calculators</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((tool) => {
                            const Icon = iconMap[tool.icon]
                            return (
                                <Card
                                    key={tool.slug}
                                    className="bg-zinc-900/50 border-zinc-800 hover:border-purple-500/50 transition-all group"
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: `${game.theme.accent}20` }}
                                            >
                                                <Icon className="h-5 w-5" style={{ color: game.theme.accent }} />
                                            </div>
                                            <CardTitle className="text-lg text-white">{tool.name}</CardTitle>
                                        </div>
                                        <CardDescription className="text-zinc-400">
                                            {tool.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full group-hover:bg-purple-600">
                                            <Link href={`/games/${gameSlug}/${tool.slug}`}>
                                                Open Calculator
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                {/* About Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">About {game.full_name}</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-zinc-400 leading-relaxed">
                            {game.full_name} is a popular Roblox game. Our calculators help you make
                            optimal decisions in-game by providing accurate calculations based on
                            community-tested formulas. Whether you're planning your next rebirth,
                            calculating ROI on upgrades, or optimizing your farming strategy,
                            RobloxCal has the tools you need.
                        </p>
                    </div>
                </section>

                {/* Related Games */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Related Games</h2>
                    <div className="flex flex-wrap gap-3">
                        {Object.keys(gameTools)
                            .filter(slug => slug !== gameSlug)
                            .slice(0, 4)
                            .map(slug => {
                                const relatedGame = getGameBySlug(slug)
                                if (!relatedGame) return null
                                return (
                                    <Button key={slug} variant="outline" asChild className="border-zinc-700">
                                        <Link href={`/games/${slug}`}>
                                            {relatedGame.display_name}
                                        </Link>
                                    </Button>
                                )
                            })}
                    </div>
                </section>

                {/* Disclaimer */}
                <Disclaimer gameName={game.full_name} />
            </div>
        </div>
    )
}
