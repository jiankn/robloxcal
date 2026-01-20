import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GameSearch } from '@/components/GameSearch'
import { GameLogo } from '@/components/GameLogo'
import { getAllActiveGames } from '@/lib/game-config'
import { ChevronRight, Gamepad2, Gift, Clock, Calculator, LayoutGrid } from 'lucide-react'

export const metadata: Metadata = {
    title: 'All Roblox Game Calculators — Browse Free Tools',
    description: 'Browse all Roblox game calculators in one place. Free calculators, codes, tier lists and tools for AFSE, Bomb Chip, Craft a Brainrot, RVB Tycoon and more games.',
    keywords: [
        'roblox game calculator',
        'roblox games calculator',
        'roblox calculator list',
        'all roblox calculators',
        'roblox game tools',
        'roblox codes'
    ],
    alternates: {
        canonical: 'https://robloxcal.com/games',
    }
}

// 游戏颜色样式
const COLOR_STYLES: Record<string, { iconWrap: string; icon: string; border: string }> = {
    purple: {
        iconWrap: 'bg-purple-500/10 group-hover:bg-purple-500/20',
        icon: 'text-purple-400',
        border: 'hover:border-purple-500/50'
    },
    blue: {
        iconWrap: 'bg-blue-500/10 group-hover:bg-blue-500/20',
        icon: 'text-blue-400',
        border: 'hover:border-blue-500/50'
    },
    red: {
        iconWrap: 'bg-red-500/10 group-hover:bg-red-500/20',
        icon: 'text-red-400',
        border: 'hover:border-red-500/50'
    },
    green: {
        iconWrap: 'bg-green-500/10 group-hover:bg-green-500/20',
        icon: 'text-green-400',
        border: 'hover:border-green-500/50'
    },
}

export default function GamesPage() {
    const allGames = getAllActiveGames()

    return (
        <div className="rc-container py-12">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-zinc-300">All Games</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <LayoutGrid className="h-8 w-8 text-purple-400" />
                            All Roblox Game Calculators
                        </h1>
                        <p className="text-zinc-400 mt-2">
                            Browse {allGames.length} free Roblox game calculators with codes and tools
                        </p>
                    </div>

                    <div className="w-full md:w-80">
                        <GameSearch placeholder="Search games..." fullWidth />
                    </div>
                </div>
            </div>

            {/* Games Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {allGames.map((game, index) => {
                    const styles = COLOR_STYLES[game.theme_color] || COLOR_STYLES.purple
                    const isPopular = index < 2

                    return (
                        <Card
                            key={game.slug}
                            className={`glass-card border-zinc-800/50 transition-all group overflow-hidden ${styles.border}`}
                        >
                            <CardContent className="p-0">
                                <Link href={`/${game.slug}`} className="block p-6 hover:bg-zinc-800/30 transition-colors">
                                    <div className="flex items-start gap-4">
                                        {/* Game Logo */}
                                        <GameLogo slug={game.slug} size={48} className="shrink-0" />

                                        {/* Game Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h2 className="text-lg font-bold text-white truncate">{game.full_name}</h2>
                                                {isPopular && (
                                                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                                                        🔥 Popular
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-zinc-400 text-sm mb-3">{game.display_name}</p>

                                            {/* Stats */}
                                            <div className="flex items-center gap-4 text-xs text-zinc-500">
                                                <div className="flex items-center gap-1">
                                                    <Calculator className="h-3.5 w-3.5" />
                                                    Calculator
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Gift className="h-3.5 w-3.5" />
                                                    Codes
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-purple-400 transition-all group-hover:translate-x-1 shrink-0 mt-1" />
                                    </div>
                                </Link>

                                {/* Quick Actions */}
                                <div className="border-t border-zinc-800/50 p-4 bg-zinc-900/30">
                                    <div className="flex gap-2">
                                        <Link href={`/${game.slug}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-zinc-700 hover:border-purple-500/50 hover:bg-purple-500/10">
                                                <Calculator className="h-4 w-4 mr-2 text-purple-400" />
                                                Calculator
                                            </Button>
                                        </Link>
                                        <Link href={`/${game.slug}/codes`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-zinc-700 hover:border-green-500/50 hover:bg-green-500/10">
                                                <Gift className="h-4 w-4 mr-2 text-green-400" />
                                                Codes
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Back to Home */}
            <div className="mt-10 text-center">
                <Link href="/">
                    <Button variant="outline" className="border-zinc-700">
                        ← Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
