'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy, Gift, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'

// 模拟 codes 数据
const MOCK_CODES = [
    { code: 'SKIBIDI', reward: '100% Cash Boost (10m)', is_active: true },
    { code: 'BRAINROT', reward: '500 Cash', is_active: true },
    { code: 'SIGMA', reward: 'Exclusive Aura', is_active: false },
]

export default function BrainrotCodesPage() {
    const game = useGame()
    const [copied, setCopied] = useState<string | null>(null)

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code)
        setCopied(code)
        setTimeout(() => setCopied(null), 2000)
    }

    const activeCodes = MOCK_CODES.filter(c => c.is_active)

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-yellow-500/20 rounded-full blur-[120px] -translate-y-1/2" />

                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-4">
                        <Gift className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-yellow-300">Active Codes</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {game.display_name} <span className="text-yellow-400">Codes</span>
                    </h1>
                    <p className="text-zinc-400">Get free cash and boosts to speed up your brainrot empire.</p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 pb-16">
                {activeCodes.length === 0 ? (
                    <Card className="bg-zinc-900/50 border-zinc-800 text-center py-12">
                        <CardContent>
                            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-bold text-white mb-2">No Active Codes</h3>
                            <p className="text-zinc-400">Please check back later!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {activeCodes.map(code => (
                            <Card key={code.code} className="bg-zinc-900/50 border-yellow-500/20 transition-all hover:border-yellow-500/40">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-mono text-xl font-bold text-yellow-400 tracking-wide">
                                            {code.code}
                                        </div>
                                        <div className="text-sm text-zinc-400 mt-1">
                                            {code.reward}
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className={copied === code.code ? "bg-green-500 text-white" : ""}
                                        onClick={() => handleCopy(code.code)}
                                    >
                                        {copied === code.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link href={`/${game.slug}`}>
                        <Button variant="link" className="text-zinc-500 hover:text-white">
                            &larr; Back to Calculator
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
