'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Crown, Star, Construction } from 'lucide-react'
import { useGame } from '@/lib/game-context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// 新游戏的 Tier List 占位数据
const GAME_TIER_DATA: Record<string, {
    title: string
    description: string
    categories: Array<{
        name: string
        items: Array<{
            tier: 'S' | 'A' | 'B' | 'C' | 'D'
            name: string
            note?: string
        }>
    }>
}> = {
    'etfb': {
        title: 'Upgrade Tier List',
        description: 'Rank of upgrades by value and efficiency in Escape Tsunami For Brainrots',
        categories: []
    },
    'sab': {
        title: 'Brainrot Tier List',
        description: 'Rank of brainrots by income and rarity in Steal a Brainrot',
        categories: []
    },
    'fishit': {
        title: 'Rod & Fish Tier List',
        description: 'Best rods and most valuable fish ranked in Fish It!',
        categories: []
    },
    'fisch': {
        title: 'Fish & Equipment Tier List',
        description: 'Top fish species and gear ranked by value in Fisch',
        categories: []
    },
    'bss': {
        title: 'Bee Tier List',
        description: 'Best bees ranked by honey production and abilities in Bee Swarm Simulator',
        categories: []
    },
    'gag': {
        title: 'Crop & Pet Tier List',
        description: 'Best crops and pets ranked by value and efficiency in Grow a Garden',
        categories: []
    }
}

// Tier 配置
const TIER_CONFIG = {
    S: { color: 'red', bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    A: { color: 'orange', bg: 'bg-orange-500/20', border: 'border-orange-500/50', text: 'text-orange-400' },
    B: { color: 'yellow', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    C: { color: 'green', bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
    D: { color: 'blue', bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' }
}

export function GenericTierListPage() {
    const game = useGame()
    const tierData = GAME_TIER_DATA[game.game_key]

    // 如果没有数据，显示 Coming Soon
    if (!tierData || tierData.categories.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

                <div className="relative py-16">
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 mb-8">
                            <Construction className="h-10 w-10 text-yellow-400" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {tierData?.title || 'Tier List'}
                        </h1>

                        <p className="text-lg text-zinc-400 mb-8">
                            {tierData?.description || 'We are gathering community data to build an accurate tier list. Check back soon!'}
                        </p>

                        <Card className="glass-card border-zinc-800/50 mb-8">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 text-left">
                                    <Trophy className="h-5 w-5 text-yellow-400 shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-white mb-1">Want to contribute?</h3>
                                        <p className="text-sm text-zinc-400">
                                            Help us build this tier list by sharing your game data on our Calibrate page.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={`/${game.slug}`}>
                                <Button variant="outline" className="border-zinc-700">
                                    Back to {game.display_name}
                                </Button>
                            </Link>
                            <Link href={`/${game.slug}/calibrate`}>
                                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                                    Contribute Data
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 有数据时显示完整 Tier List
    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear_gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

            <div className="relative py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-4">
                            <Trophy className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm text-yellow-300">Rankings</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            {tierData.title}
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            {tierData.description}
                        </p>
                    </div>

                    {/* Tier List Content - 待填充 */}
                    {tierData.categories.map(category => (
                        <div key={category.name} className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4">{category.name}</h2>
                            <div className="space-y-2">
                                {(['S', 'A', 'B', 'C', 'D'] as const).map(tier => {
                                    const items = category.items.filter(i => i.tier === tier)
                                    if (items.length === 0) return null

                                    const config = TIER_CONFIG[tier]
                                    return (
                                        <div key={tier} className={`flex items-center gap-4 p-3 rounded-lg ${config.bg} ${config.border} border`}>
                                            <div className={`w-12 h-12 flex items-center justify-center text-2xl font-bold ${config.text}`}>
                                                {tier}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {items.map(item => (
                                                    <Badge key={item.name} className="bg-zinc-800/50 text-white">
                                                        {item.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
