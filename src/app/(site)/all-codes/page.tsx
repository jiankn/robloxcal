import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAllActiveGames } from '@/lib/game-config'
import { GameLogo } from '@/components/GameLogo'
import { ChevronRight, Gift, Clock, Gamepad2, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
    title: 'All Game Codes - RobloxCal',
    description: 'Browse all Roblox game codes. Get free rewards, items, and in-game currency for your favorite games.',
    keywords: ['roblox codes', 'free codes', 'game codes', 'roblox rewards'],
}

// Codes更新数据 - 与Navbar保持同步
const codesData = [
    { game: 'RVB Tycoon', slug: 'rvb-tycoon', newCodes: 7, activeCodes: 7, updatedAt: 'Just now', color: 'red' },
    { game: 'AFSE', slug: 'afse', newCodes: 2, activeCodes: 12, updatedAt: '2 hours ago', color: 'purple' },
    { game: 'Brainrot', slug: 'craft-a-brainrot', newCodes: 1, activeCodes: 8, updatedAt: '3 hours ago', color: 'blue' },
    { game: 'Bomb Chip', slug: 'bomb-chip', newCodes: 0, activeCodes: 5, updatedAt: '1 day ago', color: 'green' },
]

// 颜色样式
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

export default function CodesPage() {
    const allGames = getAllActiveGames()
    const totalActiveCodes = codesData.reduce((sum, c) => sum + c.activeCodes, 0)

    return (
        <div className="rc-container py-12">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-zinc-300">All Codes</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Gift className="h-8 w-8 text-green-400" />
                            All Game Codes
                        </h1>
                        <p className="text-zinc-400 mt-2">
                            {totalActiveCodes} active codes across {allGames.length} games • Updated daily
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Clock className="h-4 w-4" />
                        Last updated: Just now
                    </div>
                </div>
            </div>

            {/* Hot Codes Section */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-orange-400" />
                    <h2 className="text-xl font-bold text-white">Hot Codes Updates</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {codesData.map((code) => {
                        const styles = COLOR_STYLES[code.color] || COLOR_STYLES.green
                        const hasNewCodes = code.newCodes > 0

                        return (
                            <Link key={code.slug} href={`/${code.slug}/codes`} className="group">
                                <Card className={`glass-card border-zinc-800/50 transition-all overflow-hidden ${styles.border} ${hasNewCodes ? 'ring-1 ring-green-500/30' : ''}`}>
                                    <CardContent className="p-5">
                                        <div className="flex items-center gap-4">
                                            <GameLogo slug={code.slug} size={48} />

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-white group-hover:text-green-300 transition-colors">
                                                        {code.game} Codes
                                                    </h3>
                                                    {hasNewCodes && (
                                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs animate-pulse">
                                                            +{code.newCodes} new
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-zinc-500">
                                                    <span className="flex items-center gap-1">
                                                        <Gift className="h-3.5 w-3.5" />
                                                        {code.activeCodes} active
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {code.updatedAt}
                                                    </span>
                                                </div>
                                            </div>

                                            <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-green-400 transition-all group-hover:translate-x-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </section>

            {/* All Games Codes Section */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Gift className="h-5 w-5 text-zinc-400" />
                    <h2 className="text-xl font-bold text-white">Browse by Game</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {allGames.map((game) => {
                        const codeInfo = codesData.find(c => c.slug === game.slug)
                        const styles = COLOR_STYLES[game.theme_color] || COLOR_STYLES.purple

                        return (
                            <Link key={game.slug} href={`/${game.slug}/codes`} className="group">
                                <Card className={`glass-card border-zinc-800/50 transition-all h-full ${styles.border}`}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3 mb-3">
                                            <GameLogo slug={game.slug} size={36} />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-white truncate group-hover:text-green-300 transition-colors">
                                                    {game.display_name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-1 text-zinc-500">
                                                <Gift className="h-3.5 w-3.5 text-green-400" />
                                                <span>{codeInfo?.activeCodes || '—'} codes</span>
                                            </div>
                                            {codeInfo && codeInfo.newCodes > 0 && (
                                                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-[10px]">
                                                    +{codeInfo.newCodes}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </section>

            {/* Info Section */}
            <section className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-xl">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Gift className="h-5 w-5 text-green-400" />
                    How to Redeem Codes
                </h3>
                <ol className="text-sm text-zinc-400 space-y-2 list-decimal list-inside">
                    <li>Open the game in Roblox</li>
                    <li>Look for a <strong className="text-white">Codes</strong> or <strong className="text-white">Twitter</strong> button (usually in the menu)</li>
                    <li>Enter the code exactly as shown</li>
                    <li>Click Redeem to claim your reward!</li>
                </ol>
                <p className="text-xs text-zinc-500 mt-4">
                    💡 Tip: Codes are case-sensitive and may expire. Check back often for new codes!
                </p>
            </section>

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
