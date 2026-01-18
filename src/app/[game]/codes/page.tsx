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
    MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { HowItWorks } from '@/components/HowItWorks'
import { getGameCodes, type GameCode } from '@/lib/codes-data'
import { getGameBySlug } from '@/lib/game-config'

interface CodesPageProps {
    params: Promise<{ game: string }>
}

export default function CodesPage({ params }: CodesPageProps) {
    const { game } = use(params)
    const [copiedCode, setCopiedCode] = useState<string | null>(null)

    // 获取游戏配置和兑换码数据
    const gameConfig = getGameBySlug(game)
    const codesData = getGameCodes(game)

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
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Card className="bg-zinc-900/50 border-zinc-800 max-w-md">
                    <CardContent className="py-8 text-center">
                        <AlertCircle className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
                        <h1 className="text-xl font-semibold text-white mb-2">Codes Not Available</h1>
                        <p className="text-zinc-400 mb-4">
                            No codes data found for this game yet.
                        </p>
                        <Link href={`/${game}`}>
                            <Button variant="outline" className="border-zinc-700">
                                Back to Game
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
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-[100px] translate-y-1/2" />

            {/* Content */}
            <div className="relative py-8">
                <div className="max-w-4xl mx-auto px-4">
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
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            {codesData.gameName}
                        </h1>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            {codesData.description}
                        </p>
                    </div>

                    {/* How It Works */}
                    <HowItWorks toolType="codes" proTip="Check back daily for new codes and rewards!" />

                    {/* How to Redeem */}
                    <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-white text-lg flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-blue-400" />
                                How to Redeem Codes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
                                {codesData.howToRedeem.map((step, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
                                ))}
                            </ol>
                        </CardContent>
                    </Card>

                    {/* Active Codes */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="h-5 w-5 text-green-400" />
                            <h2 className="text-xl font-semibold text-white">
                                Active Codes ({codesData.activeCodes.length})
                            </h2>
                        </div>

                        {codesData.activeCodes.length === 0 ? (
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="py-8 text-center">
                                    <p className="text-zinc-400">No active codes at the moment. Check back soon!</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-3">
                                {codesData.activeCodes.map((item: GameCode) => (
                                    <Card
                                        key={item.code}
                                        className={`bg-zinc-900/50 border-zinc-800 hover:border-green-500/30 transition-all ${item.status === 'new' ? 'ring-1 ring-green-500/30' : ''
                                            }`}
                                    >
                                        <CardContent className="py-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="font-mono text-lg font-bold text-white bg-zinc-800 px-3 py-1.5 rounded-lg">
                                                        {item.code}
                                                    </div>
                                                    {item.status === 'new' && (
                                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                                            NEW
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-sm">
                                                        <span className="text-zinc-500">Reward: </span>
                                                        <span className="text-yellow-400">{item.reward}</span>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant={copiedCode === item.code ? 'default' : 'outline'}
                                                        onClick={() => copyToClipboard(item.code)}
                                                        className={copiedCode === item.code
                                                            ? 'bg-green-600 hover:bg-green-500'
                                                            : 'border-zinc-700 hover:border-green-500/50'
                                                        }
                                                    >
                                                        {copiedCode === item.code ? (
                                                            <>
                                                                <Check className="h-4 w-4 mr-1" />
                                                                Copied!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="h-4 w-4 mr-1" />
                                                                Copy
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-xs text-zinc-600">
                                                Added: {item.addedDate}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Expired Codes */}
                    {codesData.expiredCodes.length > 0 && (
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="h-5 w-5 text-zinc-500" />
                                <h2 className="text-xl font-semibold text-zinc-400">
                                    Expired Codes ({codesData.expiredCodes.length})
                                </h2>
                            </div>

                            <div className="space-y-2 opacity-60">
                                {codesData.expiredCodes.map((item: GameCode) => (
                                    <Card key={item.code} className="bg-zinc-900/30 border-zinc-800">
                                        <CardContent className="py-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-mono text-zinc-500 line-through">
                                                        {item.code}
                                                    </span>
                                                    <Badge variant="outline" className="text-zinc-600 border-zinc-700 text-xs">
                                                        Expired
                                                    </Badge>
                                                </div>
                                                <span className="text-xs text-zinc-600">{item.reward}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Links */}
                    <Card className="bg-gradient-to-br from-blue-900/20 to-zinc-900/50 border-blue-500/20">
                        <CardContent className="py-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Get New Codes First!
                                </h3>
                                <p className="text-sm text-zinc-400 mb-4">
                                    Follow the developers for exclusive codes and updates
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {codesData.socialLinks.twitter && (
                                        <Button variant="outline" className="border-zinc-700 hover:border-blue-500/50" asChild>
                                            <a href={codesData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                                <Twitter className="h-4 w-4 mr-2" />
                                                Twitter/X
                                            </a>
                                        </Button>
                                    )}
                                    {codesData.socialLinks.discord && (
                                        <Button variant="outline" className="border-zinc-700 hover:border-purple-500/50" asChild>
                                            <a href={codesData.socialLinks.discord} target="_blank" rel="noopener noreferrer">
                                                <MessageCircle className="h-4 w-4 mr-2" />
                                                Discord
                                            </a>
                                        </Button>
                                    )}
                                    {codesData.socialLinks.robloxGame && (
                                        <Button variant="outline" className="border-zinc-700 hover:border-red-500/50" asChild>
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

                    {/* Tips */}
                    <Card className="bg-zinc-900/30 border-zinc-800 mt-8">
                        <CardHeader>
                            <CardTitle className="text-white text-lg">💡 Code Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li>• Codes are <strong className="text-white">case sensitive</strong> - type exactly as shown</li>
                                <li>• New codes usually drop during <strong className="text-white">updates and holidays</strong></li>
                                <li>• Some codes are <strong className="text-white">time-limited</strong> - redeem quickly!</li>
                                <li>• Bookmark this page - we update codes daily</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Related Tools */}
                    {codesData.relatedTools.length > 0 && (
                        <div className="mt-8 text-center">
                            <p className="text-sm text-zinc-500 mb-3">Maximize your code rewards with our tools:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {codesData.relatedTools.map((tool) => (
                                    <Link key={tool.href} href={`/${game}${tool.href.replace(`/${game}`, '')}`}>
                                        <Button variant="outline" size="sm" className="border-zinc-700">
                                            {tool.label}
                                        </Button>
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
