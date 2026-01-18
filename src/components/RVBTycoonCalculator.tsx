'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Castle,
    Target,
    RefreshCw,
    Sword,
    Trophy,
    Gift,
    Zap,
    TrendingUp,
    Users,
    Clock,
    Shield,
    Sparkles,
    ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { HowItWorks } from '@/components/HowItWorks'

interface RVBTycoonCalculatorProps {
    gameSlug: string
    displayName: string
}

// Tool cards for RVB Tycoon
const primaryTools = [
    {
        href: 'optimizer',
        icon: Target,
        title: 'Tycoon Optimizer',
        description: 'Get personalized upgrade recommendations based on your current resources and budget',
        color: 'purple',
        badge: 'Killer Tool',
        isNew: true
    },
    {
        href: 'rebirth',
        icon: RefreshCw,
        title: 'Rebirth Calculator',
        description: 'Calculate optimal rebirth timing and compare long-term income strategies',
        color: 'blue',
        badge: 'Popular'
    }
]

const secondaryTools = [
    {
        href: 'weapons',
        icon: Sword,
        title: 'Weapon DPS',
        description: 'Compare weapon damage and value',
        color: 'red'
    },
    {
        href: 'tier-list',
        icon: Trophy,
        title: 'Unit Tier List',
        description: 'Best heroes & team comps',
        color: 'yellow'
    },
    {
        href: 'codes',
        icon: Gift,
        title: 'Active Codes',
        description: 'Free rewards & boosts',
        color: 'green'
    },
    {
        href: 'wiki',
        icon: Castle,
        title: 'Wiki',
        description: 'Guides, tips & strategies',
        color: 'indigo'
    }
]

// Core advantages
const features = [
    {
        icon: Target,
        title: 'Dynamic Recommendations',
        description: 'Unlike static wikis, our optimizer gives personalized upgrade paths for YOUR current state',
        color: 'purple'
    },
    {
        icon: Clock,
        title: 'Daily Updated',
        description: 'Automatically synced with latest game patches and balance changes',
        color: 'blue'
    },
    {
        icon: Shield,
        title: '100% Free',
        description: 'No ads, no signup, no premium. Just helpful tools for RVB players',
        color: 'green'
    }
]

export function RVBTycoonCalculator({ gameSlug, displayName }: RVBTycoonCalculatorProps) {
    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Hero Section with Red-Blue Gradient */}
            <header className="relative overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Red-Blue Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/3" />
                <div className="absolute top-20 left-1/2 w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[80px] -translate-x-1/2" />

                <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                        <Sparkles className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Free Tool • Updated Daily</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Red VS Blue Tycoon
                        </span>
                        <br />
                        <span className="text-white">Calculator & Optimizer</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Find the <strong className="text-white">best tycoon upgrades</strong> for your budget.
                        Calculate rebirth timing, weapon DPS, and maximize your income efficiency.
                    </p>

                    {/* Stats Counter */}
                    <div className="mt-8 flex justify-center gap-8 sm:gap-12">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">9.9M+</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Total Visits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">93%</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Like Ratio</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">472K</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Favorites</div>
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
                            <span className="text-xs text-zinc-300">Personalized</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                            <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
                            <span className="text-xs text-zinc-300">Rebirth Optimizer</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                            <Users className="h-3.5 w-3.5 text-purple-400" />
                            <span className="text-xs text-zinc-300">Team Strategy</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 pb-24">
                {/* How It Works */}
                <HowItWorks toolType="rvb" proTip="Rebirth at optimal timing for maximum long-term gains!" />

                {/* Hero CTA */}
                <section className="mb-16">
                    <Card className="bg-gradient-to-br from-purple-900/30 to-zinc-900/50 border-purple-500/30">
                        <CardHeader className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                                <Castle className="h-8 w-8 text-purple-400" />
                            </div>
                            <CardTitle className="text-2xl text-white">Optimize Your Tycoon</CardTitle>
                            <CardDescription className="text-zinc-400 text-base max-w-lg mx-auto">
                                Use our powerful tools to maximize your income efficiency and
                                find the best upgrade paths for your current resources.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center flex flex-wrap justify-center gap-3">
                            <Link href={`/${gameSlug}/optimizer`}>
                                <Button className="bg-purple-600 hover:bg-purple-500">
                                    <Target className="h-4 w-4 mr-2" />
                                    Tycoon Optimizer
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                            <Link href={`/${gameSlug}/rebirth`}>
                                <Button variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Rebirth Calculator
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>

                {/* Features Section */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <Card key={feature.title} className="bg-zinc-900/30 border-zinc-800/50 backdrop-blur-sm">
                                    <CardContent className="pt-6">
                                        <div className={`inline-flex p-2.5 rounded-lg bg-${feature.color}-500/10 mb-4`}>
                                            <Icon className={`h-5 w-5 text-${feature.color}-400`} />
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
                            return (
                                <Link key={tool.href} href={`/${gameSlug}/${tool.href}`}>
                                    <Card
                                        className={`bg-gradient-to-br from-${tool.color}-900/20 to-zinc-900/50 border-${tool.color}-500/20 hover:border-${tool.color}-500/40 transition-all group h-full`}
                                    >
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div className={`p-3 rounded-xl bg-${tool.color}-500/10 group-hover:bg-${tool.color}-500/20 transition-colors`}>
                                                    <Icon className={`h-6 w-6 text-${tool.color}-400`} />
                                                </div>
                                                <div className="flex gap-2">
                                                    {tool.isNew && (
                                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                                                            NEW
                                                        </Badge>
                                                    )}
                                                    <Badge className={`bg-${tool.color}-500/20 text-${tool.color}-300 border-${tool.color}-500/30 text-xs`}>
                                                        {tool.badge}
                                                    </Badge>
                                                </div>
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
                            return (
                                <Link key={tool.href} href={`/${gameSlug}/${tool.href}`}>
                                    <Card className={`bg-zinc-900/50 border-zinc-800 hover:border-${tool.color}-500/30 transition-all group h-full`}>
                                        <CardContent className="p-4 text-center">
                                            <div className={`inline-flex p-2.5 rounded-lg bg-${tool.color}-500/10 group-hover:bg-${tool.color}-500/20 transition-colors mb-3`}>
                                                <Icon className={`h-5 w-5 text-${tool.color}-400`} />
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
            </main>
        </div>
    )
}
