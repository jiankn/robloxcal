'use client'

import { OptimizerForm } from '@/components/OptimizerForm'
import { BombChipCalculator } from '@/components/BombChipCalculator'
import { BrainrotProfitCalculator } from '@/components/BrainrotProfitCalculator'
import { RVBTycoonCalculator } from '@/components/RVBTycoonCalculator'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    Zap,
    Target,
    TrendingUp,
    Users,
    Sword,
    Trophy,
    Gift,
    MapPin,
    Crosshair,
    BookOpen,
    BarChart3,
    Clock,
    Shield,
    Sparkles,
    ArrowLeftRight
} from 'lucide-react'
import Link from 'next/link'
import { AdLayout } from '@/components/AdLayout'
import { FaqSection } from '@/components/FaqSection'
import { HowItWorks } from '@/components/HowItWorks'
import { useGame } from '@/lib/game-context'
import { type GameConfig } from '@/lib/game-config'

// 6 个新游戏的工具配置（Hub 门户显示的卡片）
const NEW_GAME_TOOLS: Record<string, Array<{
    slug: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    badge?: string
}>> = {
    'escape-tsunami-for-brainrots': [
        { slug: 'etfb-rebirth-calculator', title: 'Rebirth Calculator', description: 'Calculate optimal rebirth timing for maximum multiplier gains', icon: Zap, color: 'cyan', badge: 'Main Tool' },
        { slug: 'etfb-upgrade-roi', title: 'Upgrade ROI Calculator', description: 'Find the best upgrades for your investment', icon: TrendingUp, color: 'blue' },
        { slug: 'etfb-speed-planner', title: 'Speed Planner', description: 'Plan your speed upgrades for maximum efficiency', icon: Clock, color: 'purple' },
        { slug: 'wiki', title: 'Wiki', description: 'Game mechanics, items, and strategies', icon: BookOpen, color: 'indigo' },
        { slug: 'tier-list', title: 'Tier List', description: 'Best upgrades and items ranked', icon: Trophy, color: 'yellow' },
        { slug: 'codes', title: 'Active Codes', description: 'Free rewards and in-game items', icon: Gift, color: 'green' }
    ],
    'steal-a-brainrot': [
        { slug: 'sab-income-calculator', title: 'Income Calculator', description: 'Calculate your total income based on brainrot collection', icon: TrendingUp, color: 'orange', badge: 'Main Tool' },
        { slug: 'sab-roi-calculator', title: 'ROI Calculator', description: 'Find the best return on your investments', icon: BarChart3, color: 'blue' },
        { slug: 'sab-drop-rate-calculator', title: 'Drop Rate Calculator', description: 'Calculate drop chances for rare items', icon: Target, color: 'purple' },
        { slug: 'wiki', title: 'Wiki', description: 'Game mechanics and brainrot guides', icon: BookOpen, color: 'indigo' },
        { slug: 'tier-list', title: 'Tier List', description: 'Best brainrots and items ranked', icon: Trophy, color: 'yellow' },
        { slug: 'codes', title: 'Active Codes', description: 'Free rewards and boosts', icon: Gift, color: 'green' }
    ],
    'fish-it': [
        { slug: 'fishit-luck-drop-rate', title: 'Luck & Drop Rate', description: 'See how luck affects your chances of catching rare fish', icon: Target, color: 'teal', badge: 'Main Tool' },
        { slug: 'fishit-rare-fish-eta', title: 'Rare Fish ETA', description: 'Estimate time to catch specific rare fish', icon: Trophy, color: 'yellow' },
        { slug: 'fishit-profit-per-hour', title: 'Profit Calculator', description: 'Calculate your earnings per hour', icon: TrendingUp, color: 'blue' },
        { slug: 'wiki', title: 'Wiki', description: 'Fish types, rods, and locations', icon: BookOpen, color: 'indigo' },
        { slug: 'tier-list', title: 'Tier List', description: 'Best rods and fish ranked', icon: Trophy, color: 'yellow' },
        { slug: 'codes', title: 'Active Codes', description: 'Free bait and rewards', icon: Gift, color: 'green' }
    ],
    'fisch': [
        { slug: 'fisch-fish-value-calculator', title: 'Fish Value Calculator', description: 'Estimate selling price based on weight and mutations', icon: TrendingUp, color: 'blue', badge: 'Main Tool' },
        { slug: 'fisch-target-fish-solver', title: 'Target Fish Solver', description: 'Find the best fish to catch for your goals', icon: Target, color: 'purple' },
        { slug: 'fisch-profit-optimizer', title: 'Profit Optimizer', description: 'Maximize your fishing profits', icon: BarChart3, color: 'emerald' },
        { slug: 'wiki', title: 'Wiki', description: 'Fish species, locations, and gear', icon: BookOpen, color: 'indigo' },
        { slug: 'tier-list', title: 'Tier List', description: 'Best fish and equipment ranked', icon: Trophy, color: 'yellow' },
        { slug: 'codes', title: 'Active Codes', description: 'Free coins and items', icon: Gift, color: 'green' }
    ],
    'bee-swarm-simulator': [
        { slug: 'bss-honey-calculator', title: 'Honey Calculator', description: 'Estimate honey production from pollen collection rates', icon: Sparkles, color: 'yellow', badge: 'Main Tool' },
        { slug: 'bss-pollen-to-honey', title: 'Pollen Converter', description: 'Convert pollen to honey with multipliers', icon: Clock, color: 'orange' },
        { slug: 'bss-honey-per-pollen', title: 'Honey per Pollen', description: 'Calculate your honey efficiency rate', icon: TrendingUp, color: 'blue' },
        { slug: 'wiki', title: 'Wiki', description: 'Bees, fields, and game mechanics', icon: BookOpen, color: 'indigo' },
        { slug: 'tier-list', title: 'Tier List', description: 'Best bees and items ranked', icon: Trophy, color: 'yellow' },
        { slug: 'codes', title: 'Active Codes', description: 'Free honey and boosts', icon: Gift, color: 'green' }
    ],
    'grow-a-garden': [
        { slug: 'gag-crop-value-calculator', title: 'Crop Value Calculator', description: 'Calculate selling price of your harvested crops', icon: TrendingUp, color: 'emerald', badge: 'Main Tool' },
        { slug: 'gag-pet-weight-calculator', title: 'Pet Weight Calculator', description: 'Calculate your pet weight and bonuses', icon: Target, color: 'purple' },
        { slug: 'gag-pet-xp-calculator', title: 'Pet XP Calculator', description: 'Plan your pet leveling strategy', icon: Zap, color: 'blue' },
        { slug: 'wiki', title: 'Wiki', description: 'Crops, pets, and gardening tips', icon: BookOpen, color: 'indigo' },
        { slug: 'tier-list', title: 'Tier List', description: 'Best crops and pets ranked', icon: Trophy, color: 'yellow' },
        { slug: 'codes', title: 'Active Codes', description: 'Free seeds and coins', icon: Gift, color: 'green' }
    ]
}


// 主要工具卡片数据
const primaryTools = [
    {
        href: 'dps',
        icon: Sword,
        title: 'DPS Calculator',
        description: 'Calculate your damage output with weapons, skills, and transformations',
        color: 'red',
        badge: 'Popular'
    },
    {
        href: 'tier-list',
        icon: Trophy,
        title: 'Tier List',
        description: 'Best weapons, skills & transformations ranked from S to D tier',
        color: 'yellow',
        badge: 'Updated'
    }
]

// 辅助工具卡片数据
const secondaryTools = [
    {
        href: 'codes',
        icon: Gift,
        title: 'Active Codes',
        description: 'Free Yen, boosts, and rewards',
        color: 'green'
    },
    {
        href: 'training-areas',
        icon: MapPin,
        title: 'Training Areas',
        description: 'All locations & requirements',
        color: 'blue'
    },
    {
        href: 'calibrate',
        icon: Crosshair,
        title: 'Calibrate',
        description: 'Help improve accuracy',
        color: 'purple'
    },
    {
        href: 'guides',
        icon: BookOpen,
        title: 'Guides',
        description: 'Tips, builds & strategies',
        color: 'indigo'
    },
    {
        href: 'tracker',
        icon: Target,
        title: 'Progress Tracker',
        description: 'Track your stat goals',
        color: 'emerald'
    },
    {
        href: 'compare',
        icon: ArrowLeftRight,
        title: 'Compare',
        description: 'Compare items side-by-side',
        color: 'violet'
    }
]

// 核心优势数据
const features = [
    {
        icon: BarChart3,
        title: 'Community Calibrated',
        description: 'Data from 1000+ real player samples for maximum accuracy',
        color: 'purple'
    },
    {
        icon: Clock,
        title: 'Daily Updated',
        description: 'Automatically synced with latest game patches and changes',
        color: 'blue'
    },
    {
        icon: Shield,
        title: '100% Free',
        description: 'Free to use, supported by ads. No signup required.',
        color: 'green'
    }
]

const COLOR_STYLES: Record<
    string,
    {
        iconBg: string
        iconText: string
        badge: string
        border: string
        hoverBorder: string
        gradientFrom: string
        gradientTo: string
    }
> = {
    red: {
        iconBg: 'bg-red-500/10 group-hover:bg-red-500/20',
        iconText: 'text-red-400',
        badge: 'bg-red-500/20 text-red-300 border-red-500/30',
        border: 'border-red-500/20',
        hoverBorder: 'hover:border-red-500/40',
        gradientFrom: 'from-red-900/20',
        gradientTo: 'to-zinc-900/50'
    },
    yellow: {
        iconBg: 'bg-yellow-500/10 group-hover:bg-yellow-500/20',
        iconText: 'text-yellow-400',
        badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        border: 'border-yellow-500/20',
        hoverBorder: 'hover:border-yellow-500/40',
        gradientFrom: 'from-yellow-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    green: {
        iconBg: 'bg-green-500/10 group-hover:bg-green-500/20',
        iconText: 'text-green-400',
        badge: 'bg-green-500/20 text-green-300 border-green-500/30',
        border: 'border-green-500/20',
        hoverBorder: 'hover:border-green-500/40',
        gradientFrom: 'from-green-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    blue: {
        iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
        iconText: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        border: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/40',
        gradientFrom: 'from-blue-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    purple: {
        iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
        iconText: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        border: 'border-purple-500/20',
        hoverBorder: 'hover:border-purple-500/40',
        gradientFrom: 'from-purple-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    indigo: {
        iconBg: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
        iconText: 'text-indigo-400',
        badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        border: 'border-indigo-500/20',
        hoverBorder: 'hover:border-indigo-500/40',
        gradientFrom: 'from-indigo-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    emerald: {
        iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
        iconText: 'text-emerald-400',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        border: 'border-emerald-500/20',
        hoverBorder: 'hover:border-emerald-500/40',
        gradientFrom: 'from-emerald-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    violet: {
        iconBg: 'bg-violet-500/10 group-hover:bg-violet-500/20',
        iconText: 'text-violet-400',
        badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
        border: 'border-violet-500/20',
        hoverBorder: 'hover:border-violet-500/40',
        gradientFrom: 'from-violet-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    cyan: {
        iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
        iconText: 'text-cyan-400',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        border: 'border-cyan-500/20',
        hoverBorder: 'hover:border-cyan-500/40',
        gradientFrom: 'from-cyan-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    orange: {
        iconBg: 'bg-orange-500/10 group-hover:bg-orange-500/20',
        iconText: 'text-orange-400',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        border: 'border-orange-500/20',
        hoverBorder: 'hover:border-orange-500/40',
        gradientFrom: 'from-orange-900/15',
        gradientTo: 'to-zinc-900/50'
    },
    teal: {
        iconBg: 'bg-teal-500/10 group-hover:bg-teal-500/20',
        iconText: 'text-teal-400',
        badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        border: 'border-teal-500/20',
        hoverBorder: 'hover:border-teal-500/40',
        gradientFrom: 'from-teal-900/15',
        gradientTo: 'to-zinc-900/50'
    }
}

// GameHubPortal 组件 - 游戏门户页面
function GameHubPortal({ game }: { game: GameConfig }) {
    const tools = NEW_GAME_TOOLS[game.slug] || []
    const accentColor = game.theme.accent

    return (
        <>
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] rc-grid-mask-top" />
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -translate-y-1/2 opacity-30"
                    style={{ backgroundColor: accentColor }}
                />

                <div className="relative rc-container py-12 md:py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
                            style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30` }}
                        >
                            <Sparkles className="h-4 w-4" style={{ color: accentColor }} />
                            <span className="text-sm font-medium" style={{ color: accentColor }}>Free Calculator</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {game.full_name}
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                            {game.seo.description}
                        </p>
                    </div>
                </div>
            </header>

            <AdLayout>
                <section className="rc-container py-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Zap className="h-5 w-5" style={{ color: accentColor }} />
                        Available Tools
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        {tools.map((tool) => {
                            const Icon = tool.icon
                            const styles = COLOR_STYLES[tool.color as keyof typeof COLOR_STYLES] || COLOR_STYLES.purple

                            return (
                                <Link key={tool.slug} href={`/${game.slug}/${tool.slug}`} className="group">
                                    <Card className={`glass-card border-zinc-800/50 hover-lift ${styles.hoverBorder} transition-all h-full`}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl ${styles.iconBg} transition-colors`}>
                                                    <Icon className={`h-6 w-6 ${styles.iconText}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="font-bold text-white group-hover:text-purple-200 transition-colors">
                                                            {tool.title}
                                                        </h3>
                                                        {tool.badge && (
                                                            <Badge className={styles.badge}>{tool.badge}</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-zinc-400">{tool.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                <HowItWorks toolType={game.game_key} />
                <FaqSection />
            </AdLayout>
        </>
    )
}

export default function GamePage() {
    const game = useGame()

    // 根据游戏类型渲染不同的计算器
    if (game.game_key === 'bomb_chip') {
        return <BombChipCalculator gameSlug={game.slug} displayName={game.display_name} />
    }

    if (game.game_key === 'brainrot') {
        return <BrainrotProfitCalculator gameSlug={game.slug} displayName={game.display_name} />
    }

    if (game.game_key === 'rvb_tycoon') {
        return <RVBTycoonCalculator gameSlug={game.slug} displayName={game.display_name} />
    }

    // Top 6 Expansion Games - 渲染 Hub 门户（工具卡片入口）
    const NEW_GAME_SLUGS = [
        'escape-tsunami-for-brainrots',
        'steal-a-brainrot',
        'fish-it',
        'fisch',
        'bee-swarm-simulator',
        'grow-a-garden'
    ]

    if (NEW_GAME_SLUGS.includes(game.slug)) {
        return <GameHubPortal game={game} />
    }


    // AFSE 默认页面
    return (
        <>
            <header className="relative overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] rc-grid-mask-top" />

                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-[100px] -translate-y-1/3" />
                <div className="absolute top-20 left-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -translate-x-1/2" />

                <div className="relative rc-container py-14 sm:py-16 text-center">
                    {/* Badge */}
                    <div className="rc-kicker bg-purple-500/10 border-purple-500/20 text-purple-300 mb-6">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span>Free Tool • Updated Daily</span>
                    </div>

                    {/* Main Title - 全名 + (缩写) */}
                    <h1 className="rc-title text-3xl sm:text-4xl md:text-5xl">
                        <span className="text-white">{game.full_name}</span>
                        <br />
                        <span className="text-zinc-500 text-xl sm:text-2xl font-medium">({game.display_name})</span>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            {' '}Calculator
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-lg sm:text-xl rc-lead max-w-2xl mx-auto">
                        Find the <strong className="text-white">best training area</strong> for your current stats.
                        Calculate gains, estimate time to reach goals, and maximize your efficiency.
                    </p>

                    {/* Stats Counter */}
                    <div className="mt-8 flex justify-center gap-8 sm:gap-12">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">54</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Training Areas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">6</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Stat Types</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">∞</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Calculations</div>
                        </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                            <Zap className="h-3.5 w-3.5 text-yellow-400" />
                            <span className="text-xs text-zinc-300">Instant Results</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                            <Target className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-xs text-zinc-300">All Stat Types</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                            <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
                            <span className="text-xs text-zinc-300">Boost Support</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                            <Users className="h-3.5 w-3.5 text-purple-400" />
                            <span className="text-xs text-zinc-300">Community Data</span>
                        </div>
                    </div>
                </div>
            </header>

            <AdLayout
                maxWidth="default"
                className="pb-24"
            >
                {/* How It Works Section */}
                <HowItWorks toolType="afse" />

                {/* Optimizer Form */}
                <section className="mb-16">
                    <OptimizerForm />
                </section>

                {/* Features Section */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            const styles = COLOR_STYLES[feature.color] ?? COLOR_STYLES.purple
                            return (
                                <Card key={feature.title} className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
                                    <CardContent className="pt-6">
                                        <div className={`inline-flex p-2.5 rounded-lg mb-4 ${styles.iconBg}`}>
                                            <Icon className={`h-5 w-5 ${styles.iconText}`} />
                                        </div>
                                        <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </section>

                <Separator className="bg-zinc-800/50 my-16" />

                {/* Primary Tools */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Power Tools</h2>
                        <span className="text-sm text-zinc-500">Level up your gameplay</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {primaryTools.map((tool) => {
                            const Icon = tool.icon
                            const styles = COLOR_STYLES[tool.color] ?? COLOR_STYLES.purple
                            return (
                                <Link key={tool.href} href={`/${game.slug}/${tool.href}`}>
                                    <Card className={`bg-gradient-to-br ${styles.gradientFrom} ${styles.gradientTo} ${styles.border} ${styles.hoverBorder} transition-all group h-full`}>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div className={`p-3 rounded-xl transition-colors ${styles.iconBg}`}>
                                                    <Icon className={`h-6 w-6 ${styles.iconText}`} />
                                                </div>
                                                {tool.badge && (
                                                    <Badge className={`${styles.badge} text-xs`}>
                                                        {tool.badge}
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-white/90">
                                                {tool.title}
                                            </h3>
                                            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                                                {tool.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                {/* Secondary Tools Grid */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Quick Access</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {secondaryTools.map((tool) => {
                            const Icon = tool.icon
                            const styles = COLOR_STYLES[tool.color] ?? COLOR_STYLES.purple
                            return (
                                <Link key={tool.href} href={`/${game.slug}/${tool.href}`}>
                                    <Card className={`bg-zinc-900/50 border-zinc-800 ${styles.hoverBorder} transition-all group h-full`}>
                                        <CardContent className="p-4 text-center">
                                            <div className={`inline-flex p-2.5 rounded-lg transition-colors mb-3 ${styles.iconBg}`}>
                                                <Icon className={`h-5 w-5 ${styles.iconText}`} />
                                            </div>
                                            <h3 className="font-medium text-white text-sm">{tool.title}</h3>
                                            <p className="text-xs text-zinc-500 mt-1">{tool.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                {/* FAQ Section */}
                <FaqSection />
            </AdLayout>
        </>
    )
}
