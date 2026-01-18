'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    MapPin,
    Sparkles,
    Coins,
    Users,
    Sword,
    Zap,
    ChevronRight,
    Calculator,
    Lightbulb,
    Star,
    Filter
} from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'
import { HowItWorks } from '@/components/HowItWorks'

export const dynamic = 'force-dynamic'

// 扭蛋机数据
const GACHA_LOCATIONS = [
    {
        id: 1,
        name: 'Beginner Gacha',
        location: 'Treadmill Zone - Starter Island',
        type: 'Basic',
        rewardType: 'Common Champions',
        cost: '1,000 Yen',
        currency: 'yen',
        description: 'Best for new players starting out',
        recommended: true,
        tier: 'starter'
    },
    {
        id: 2,
        name: 'Champions Gacha',
        location: 'Next to Chakra Tree',
        type: 'Standard',
        rewardType: 'Champions + Rare Fruits',
        cost: '5,000 Chikara',
        currency: 'chikara',
        description: 'Main gacha for champion drops',
        recommended: true,
        tier: 'mid'
    },
    {
        id: 3,
        name: 'Meteor Zone Gacha',
        location: 'At the Meteor landmark',
        type: 'Advanced',
        rewardType: 'Rare Champions + Items',
        cost: '10,000 Chikara',
        currency: 'chikara',
        description: 'Higher chance for rare drops',
        recommended: false,
        tier: 'mid'
    },
    {
        id: 4,
        name: 'Underground Nine Tails',
        location: 'Near the Waterfall',
        type: 'Special',
        rewardType: 'Kagune + Special Items',
        cost: '15,000 Chikara',
        currency: 'chikara',
        description: 'Best for Kagune farming',
        recommended: true,
        tier: 'advanced'
    },
    {
        id: 5,
        name: 'Gym Gacha',
        location: 'Next to Gym Building',
        type: 'Standard',
        rewardType: 'Hero Champions',
        cost: '8,000 Chikara',
        currency: 'chikara',
        description: 'Focused on hero-type champions',
        recommended: false,
        tier: 'mid'
    },
    {
        id: 6,
        name: 'Hero Leveling Gacha',
        location: 'Outside Gym Building',
        type: 'Leveling',
        rewardType: 'Hero Boosters + XP Items',
        cost: '5,000 Yen',
        currency: 'yen',
        description: 'For leveling up hero champions',
        recommended: false,
        tier: 'mid'
    },
    {
        id: 7,
        name: 'Seiyan Leveling Gacha',
        location: 'Lookout Island / Floating Islands',
        type: 'Leveling',
        rewardType: 'Seiyan Boosters + XP',
        cost: '10,000 Yen',
        currency: 'yen',
        description: 'Best for Seiyan champion upgrades',
        recommended: true,
        tier: 'advanced'
    },
    {
        id: 8,
        name: 'Nichiyin Leveling Gacha',
        location: 'Hill next to Arena',
        type: 'Leveling',
        rewardType: 'Nichiyin Boosters',
        cost: '8,000 Yen',
        currency: 'yen',
        description: 'Demon Slayer related items',
        recommended: false,
        tier: 'advanced'
    },
    {
        id: 9,
        name: 'Jujutsu Leveling Gacha',
        location: 'At the Ramen Shop',
        type: 'Leveling',
        rewardType: 'Jujutsu Boosters',
        cost: '8,000 Yen',
        currency: 'yen',
        description: 'Jujutsu Kaisen related items',
        recommended: false,
        tier: 'advanced'
    },
    {
        id: 10,
        name: 'Solo Leveling Gacha',
        location: 'Behind Treadmills Area',
        type: 'Premium',
        rewardType: 'Solo Leveling Champions + Rare Items',
        cost: '20,000 Chikara',
        currency: 'chikara',
        description: 'Highest tier drops available',
        recommended: true,
        tier: 'premium'
    },
    {
        id: 11,
        name: 'Kagune Gacha',
        location: 'Near Spawn Area',
        type: 'Special',
        rewardType: 'Kagune (Tokyo Ghoul)',
        cost: '12,000 Chikara',
        currency: 'chikara',
        description: 'Best source for Kagune abilities',
        recommended: true,
        tier: 'advanced'
    },
    {
        id: 12,
        name: 'Nitlein Gacha',
        location: 'By the Volcano',
        type: 'Advanced',
        rewardType: 'Rare Champions + Boosters',
        cost: '15,000 Chikara',
        currency: 'chikara',
        description: 'Volcano area special drops',
        recommended: false,
        tier: 'advanced'
    }
]

const TIER_COLORS: Record<string, string> = {
    starter: 'bg-green-500/20 text-green-400 border-green-500/30',
    mid: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    premium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
}

const TIER_LABELS: Record<string, string> = {
    starter: 'Beginner',
    mid: 'Mid-Game',
    advanced: 'Advanced',
    premium: 'Premium'
}

export default function GachaMapPage() {
    const game = useGame()
    const [filter, setFilter] = useState<string>('all')

    const filteredGachas = filter === 'all'
        ? GACHA_LOCATIONS
        : filter === 'recommended'
            ? GACHA_LOCATIONS.filter(g => g.recommended)
            : GACHA_LOCATIONS.filter(g => g.tier === filter)

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-blue-500/15 rounded-full blur-[100px] -translate-y-1/3" />

                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Gacha Locations</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        AFSE <span className="text-purple-400">Gacha Map</span>
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Complete guide to all gacha locations in Anime Fighting Simulator Endless.
                        Find the best gachas for champions, fruits, kagunes, and more.
                    </p>

                    <div className="mt-4 flex justify-center gap-2">
                        <Link href={`/${game.slug}`}>
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-pointer hover:bg-purple-500/30">
                                <Calculator className="h-3 w-3 mr-1" /> Training Optimizer
                            </Badge>
                        </Link>
                        <Link href={`/${game.slug}/fruits`}>
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 cursor-pointer hover:bg-green-500/30">
                                <Sparkles className="h-3 w-3 mr-1" /> Fruits Guide
                            </Badge>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="afse-gacha" proTip="Champions Gacha is the best all-around choice for most players!" />

                {/* Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Filter className="h-4 w-4 text-zinc-400" />
                            <span className="text-sm text-zinc-400 mr-2">Filter:</span>
                            <Button
                                variant={filter === 'all' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('all')}
                                className={filter === 'all' ? 'bg-purple-600' : 'border-zinc-700'}
                            >
                                All ({GACHA_LOCATIONS.length})
                            </Button>
                            <Button
                                variant={filter === 'recommended' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('recommended')}
                                className={filter === 'recommended' ? 'bg-yellow-600' : 'border-zinc-700'}
                            >
                                <Star className="h-3 w-3 mr-1" />
                                Recommended
                            </Button>
                            <Button
                                variant={filter === 'starter' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('starter')}
                                className={filter === 'starter' ? 'bg-green-600' : 'border-zinc-700'}
                            >
                                Beginner
                            </Button>
                            <Button
                                variant={filter === 'mid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('mid')}
                                className={filter === 'mid' ? 'bg-blue-600' : 'border-zinc-700'}
                            >
                                Mid-Game
                            </Button>
                            <Button
                                variant={filter === 'advanced' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter('advanced')}
                                className={filter === 'advanced' ? 'bg-purple-600' : 'border-zinc-700'}
                            >
                                Advanced
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Gacha List */}
                <div className="space-y-4 mb-8">
                    {filteredGachas.map((gacha) => (
                        <Card
                            key={gacha.id}
                            className={`bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors ${gacha.recommended ? 'ring-1 ring-yellow-500/30' : ''
                                }`}
                        >
                            <CardContent className="py-5">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {gacha.recommended && (
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                            )}
                                            <h3 className="font-semibold text-white text-lg">{gacha.name}</h3>
                                            <Badge className={TIER_COLORS[gacha.tier]}>
                                                {TIER_LABELS[gacha.tier]}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                                            <MapPin className="h-4 w-4 text-blue-400" />
                                            <span>{gacha.location}</span>
                                        </div>

                                        <p className="text-sm text-zinc-400 mb-3">{gacha.description}</p>

                                        <div className="flex flex-wrap gap-2">
                                            <Badge className="bg-zinc-700/50 text-zinc-300">
                                                <Sparkles className="h-3 w-3 mr-1" />
                                                {gacha.rewardType}
                                            </Badge>
                                            <Badge className={gacha.currency === 'yen' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}>
                                                <Coins className="h-3 w-3 mr-1" />
                                                {gacha.cost}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Cost Summary */}
                <Card className="bg-gradient-to-r from-blue-900/20 to-zinc-900/50 border-blue-500/20 mb-8">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Coins className="h-5 w-5 text-blue-400" />
                            Currency Tips
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                <h4 className="font-medium text-green-300 mb-2 flex items-center gap-2">
                                    <Coins className="h-4 w-4" /> Yen Gachas
                                </h4>
                                <p className="text-sm text-zinc-400">
                                    Use for leveling gachas and beginner content. Easier to farm through gameplay.
                                </p>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" /> Chikara Gachas
                                </h4>
                                <p className="text-sm text-zinc-400">
                                    Use for champion and fruit drops. Save for the premium gachas when possible.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pro Tips */}
                <Card className="bg-gradient-to-r from-yellow-900/20 to-zinc-900/50 border-yellow-500/20 mb-8">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-400" />
                            Pro Tips
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Best Value:</strong> Champions Gacha (5,000 Chikara) offers the best balance of cost and rewards</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>For Kagune:</strong> Underground Nine Tails gacha is specifically designed for Kagune drops</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Premium:</strong> Solo Leveling Gacha has the highest tier drops but costs 20K Chikara per roll</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Use Codes:</strong> Redeem active codes to get free Yen and Chikara for more rolls</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        href={`/${game.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Training Optimizer</span>
                    </Link>
                </div>
            </main>
        </div>
    )
}
