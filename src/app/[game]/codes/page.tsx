'use client'

import { useState, use } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Gift,
    Copy,
    Check,
    Clock,
    Zap,
    AlertCircle,
    ExternalLink,
    Twitter,
    MessageCircle,
    ChevronRight,
    Home
} from 'lucide-react'
import Link from 'next/link'
import { HowItWorks } from '@/components/HowItWorks'
import { getGameCodes, type GameCode } from '@/lib/codes-data'
import { getGameBySlug } from '@/lib/game-config'

// Ensure dynamic rendering to avoid build-time static generation errors
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface CodesPageProps {
    params: Promise<{ game: string }>
}

export default function GamesCodesPage({ params }: CodesPageProps) {
    // Correctly destructure game from params (renamed from game-slug to game)
    const { game: slug } = use(params)
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    // 获取游戏配置和兑换码数据
    const gameConfig = getGameBySlug(slug)
    const codesData = getGameCodes(slug)

    const copyToClipboard = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopiedCode(code)
            setTimeout(() => setCopiedCode(null), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    // 如果游戏不存在或没有兑换码数据
    if (!gameConfig || !codesData) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
                <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8 w-full max-w-md">
                    <Link href="/" className="hover:text-white transition-colors"><Home className="h-4 w-4" /></Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/games" className="hover:text-white transition-colors">Games</Link>
                    {gameConfig && (
                        <>
                            <ChevronRight className="h-4 w-4" />
                            <Link href={`/${slug}`} className="hover:text-white transition-colors">
                                {gameConfig.display_name}
                            </Link>
                        </>
                    )}
                </nav>
                <Card className="bg-zinc-900/50 border-zinc-800 w-full max-w-md">
                    <CardContent className="py-8 text-center">
                        <AlertCircle className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                        <h1 className="text-xl font-semibold text-white mb-2">Codes Not Available</h1>
                        <p className="text-zinc-400 mb-4">
                            No codes data found for this game yet.
                        </p>
                        <Link href={`/${slug}`}>
                            <Button variant="outline" className="border-zinc-700">
                                Back to {gameConfig?.display_name || 'Game'}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // 获取主题色
    const accentColor = gameConfig.theme.accent

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Background Effects - 使用游戏主题色 */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 opacity-30"
                style={{ backgroundColor: accentColor }}
            />
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 opacity-25"
                style={{ backgroundColor: accentColor }}
            />

            {/* Content */}
            <div className="relative py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/games" className="hover:text-white transition-colors">Games</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href={`/${slug}`} className="hover:text-white transition-colors">
                            {gameConfig.display_name}
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-white">Codes</span>
                    </nav>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border"
                            style={{
                                backgroundColor: `${accentColor}15`,
                                borderColor: `${accentColor}30`
                            }}
                        >
                            <Gift className="h-4 w-4" style={{ color: accentColor }} />
                            <span className="text-sm" style={{ color: accentColor }}>Free Rewards</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            {codesData.gameName}
                        </h1>
                        <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                            {codesData.description}
                        </p>
                    </div>

                    {/* How It Works - Reused component */}
                    <HowItWorks toolType="codes" proTip="Check back daily for new codes and rewards!" />

                    {/* Active Codes */}
                    <div className="mb-12 mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Zap className="h-6 w-6 text-green-400" />
                                <h2 className="text-2xl font-bold text-white">
                                    Active Codes
                                    <span className="ml-2 text-sm font-normal text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md">
                                        {codesData.activeCodes.length}
                                    </span>
                                </h2>
                            </div>
                        </div>

                        {codesData.activeCodes.length === 0 ? (
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="py-12 text-center">
                                    <p className="text-zinc-400 text-lg">No active codes currently available.</p>
                                    <p className="text-zinc-500 text-sm mt-2">Check back later for updates!</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {codesData.activeCodes.map((item: GameCode) => (
                                    <Card
                                        key={item.code}
                                        className={`bg-zinc-900/40 border-zinc-800 backdrop-blur-sm group hover:border-zinc-700 transition-all ${item.status === 'new' ? 'ring-1 ring-green-500/20 border-green-500/20 shadow-[0_0_20px_-10px_rgba(34,197,94,0.2)]' : ''
                                            }`}
                                    >
                                        <CardContent className="py-4 px-5">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="font-mono text-xl font-bold text-white bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-lg tracking-wider select-all">
                                                        {item.code}
                                                    </div>
                                                    {item.status === 'new' && (
                                                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 font-bold px-2.5">
                                                            NEW
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                                                    <div className="text-sm">
                                                        <span className="text-zinc-500 block text-xs mb-0.5 uppercase tracking-wider font-medium">Reward</span>
                                                        <span className="text-yellow-400 font-medium">{item.reward}</span>
                                                    </div>
                                                    <Button
                                                        size="default"
                                                        variant={copiedCode === item.code ? 'default' : 'outline'}
                                                        onClick={() => copyToClipboard(item.code)}
                                                        className={copiedCode === item.code
                                                            ? 'bg-green-600 hover:bg-green-500 min-w-[100px]'
                                                            : 'border-zinc-700 hover:border-zinc-600 hover:text-white bg-zinc-900/50 min-w-[100px]'
                                                        }
                                                    >
                                                        {copiedCode === item.code ? (
                                                            <>
                                                                <Check className="h-4 w-4 mr-2" />
                                                                Copied
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="h-4 w-4 mr-2" />
                                                                Copy
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600">
                                                <span>Verified {item.addedDate}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="md:col-span-2">
                            {/* How to Redeem */}
                            <Card className="bg-zinc-900/50 border-zinc-800 mb-8 h-full">
                                <CardHeader className="pb-3 border-b border-zinc-800/50">
                                    <CardTitle className="text-white text-lg flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-blue-400" />
                                        How to Redeem Codes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <ol className="list-decimal list-inside space-y-4 text-zinc-300">
                                        {codesData.howToRedeem.map((step, index) => (
                                            <li key={index} className="leading-relaxed pl-2 marker:text-zinc-500 [&>strong]:text-white [&>strong]:font-semibold" dangerouslySetInnerHTML={{ __html: step }} />
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-1 space-y-6">
                            {/* Social Links */}
                            <Card className="bg-gradient-to-br from-blue-950/30 to-zinc-900/50 border-blue-500/10">
                                <CardContent className="py-6">
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            Never Miss a Code
                                        </h3>
                                        <p className="text-xs text-zinc-400 mb-4 px-2">
                                            Follow official channels for instant alerts
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            {codesData.socialLinks.twitter && (
                                                <Button variant="outline" className="w-full justify-start border-zinc-800 bg-black/20 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all font-normal text-zinc-300" asChild>
                                                    <a href={codesData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                                        <Twitter className="h-4 w-4 mr-3" />
                                                        Twitter / X
                                                    </a>
                                                </Button>
                                            )}
                                            {codesData.socialLinks.discord && (
                                                <Button variant="outline" className="w-full justify-start border-zinc-800 bg-black/20 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30 transition-all font-normal text-zinc-300" asChild>
                                                    <a href={codesData.socialLinks.discord} target="_blank" rel="noopener noreferrer">
                                                        <MessageCircle className="h-4 w-4 mr-3" />
                                                        Discord Server
                                                    </a>
                                                </Button>
                                            )}
                                            {codesData.socialLinks.robloxGame && (
                                                <Button variant="default" className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 border-0" asChild>
                                                    <a href={codesData.socialLinks.robloxGame} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        Play Now
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Expired Codes - Collapsible style feeling */}
                            {codesData.expiredCodes.length > 0 && (
                                <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                                    <div className="bg-zinc-900/50 px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-zinc-500" />
                                        <h3 className="font-semibold text-zinc-400 text-sm">Expired Codes</h3>
                                    </div>
                                    <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                                        {codesData.expiredCodes.map((item: GameCode) => (
                                            <div key={item.code} className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
                                                <span className="font-mono text-xs text-zinc-500 line-through decoration-zinc-700">
                                                    {item.code}
                                                </span>
                                                <span className="text-[10px] text-zinc-600">{item.reward}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Tools */}
                    {codesData.relatedTools.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-white mb-6 text-center">More Tools for {gameConfig.display_name}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {codesData.relatedTools.map((tool) => (
                                    <Link key={tool.href} href={tool.href.replace('/games', '')}>
                                        <Card className="bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all cursor-pointer h-full group">
                                            <CardContent className="p-4 flex items-center justify-between">
                                                <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">{tool.label}</span>
                                                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white transition-colors" />
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
