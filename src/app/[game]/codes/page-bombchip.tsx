'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gift, Copy, Check, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'

// 模拟 codes 数据（后续会从 API 获取）
const MOCK_CODES = [
    { code: 'BOMB2026', reward: '50 Free Chips', is_active: true, created_at: '2026-01-01' },
    { code: 'LUCKYBOMB', reward: 'Special Bomb Skin', is_active: true, created_at: '2025-12-25' },
    { code: 'START', reward: '1000 Cash', is_active: false, created_at: '2025-11-01' },
]

export default function CodesPage() {
    const game = useGame()
    
    // 复制状态
    const [copied, setCopied] = useState<string | null>(null)
    
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code)
        setCopied(code)
        setTimeout(() => setCopied(null), 2000)
    }
    
    // 分组
    const activeCodes = MOCK_CODES.filter(c => c.is_active)
    const expiredCodes = MOCK_CODES.filter(c => !c.is_active)
    
    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px] -translate-y-1/2" />
                
                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
                        <Gift className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-300">Active Codes</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {game.display_name} <span className="text-green-400">Codes</span>
                    </h1>
                    
                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Updated list of all working codes for {game.display_name}. 
                        Redeem them for free rewards!
                    </p>
                    
                    <div className="mt-6 flex justify-center gap-3">
                        <Link href={`/${game.slug}`}>
                            <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                                Use Calculator
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            
            <main className="max-w-4xl mx-auto px-4 pb-16">
                {/* Active Codes */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-green-500 rounded-full block"></span>
                        Working Codes ({activeCodes.length})
                    </h2>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                        {activeCodes.map(code => (
                            <Card key={code.code} className="bg-zinc-900/50 border-green-500/20 hover:border-green-500/40 transition-all">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-mono text-xl font-bold text-green-400 tracking-wide">
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
                </div>
                
                {/* Expired Codes */}
                <div className="opacity-60">
                    <h2 className="text-xl font-bold text-zinc-400 mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Expired Codes
                    </h2>
                    
                    <div className="space-y-2">
                        {expiredCodes.map(code => (
                            <div key={code.code} className="flex items-center justify-between p-3 bg-zinc-900/30 rounded border border-zinc-800">
                                <span className="font-mono text-zinc-500 line-through">{code.code}</span>
                                <span className="text-sm text-zinc-600">{code.reward}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* How to Redeem */}
                <Card className="mt-12 bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle>How to Redeem Codes in {game.display_name}?</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-invert text-zinc-400">
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Open <strong>{game.display_name}</strong> in Roblox.</li>
                            <li>Look for the <strong className="text-white">Settings/Codes</strong> icon (usually a gear or bird icon).</li>
                            <li>Copy a code from our list above.</li>
                            <li>Paste it into the text box and hit <strong className="text-white">Redeem</strong>.</li>
                            <li>Enjoy your free rewards!</li>
                        </ol>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
