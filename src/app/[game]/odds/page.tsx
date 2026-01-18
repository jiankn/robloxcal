'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import {
    TrendingUp,
    Calculator,
    Bomb,
    Target,
    Info
} from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'
import { HowItWorks } from '@/components/HowItWorks'

export const dynamic = 'force-dynamic'

// 计算命中概率
function calculateOdds(n: number, m: number, bombs: number): {
    exactHits: number[]
    atLeastOne: number
    expectedHits: number
} {
    // 超几何分布计算
    // P(X = k) = C(m, k) * C(n-m, bombs-k) / C(n, bombs)

    const factorial = (num: number): number => {
        if (num <= 1) return 1
        let result = 1
        for (let i = 2; i <= num; i++) result *= i
        return result
    }

    const combination = (n: number, r: number): number => {
        if (r > n || r < 0) return 0
        if (r === 0 || r === n) return 1
        return factorial(n) / (factorial(r) * factorial(n - r))
    }

    const totalWays = combination(n, bombs)
    const exactHits: number[] = []
    let expectedHits = 0

    for (let k = 0; k <= Math.min(m, bombs); k++) {
        const waysToHitK = combination(m, k) * combination(n - m, bombs - k)
        const prob = waysToHitK / totalWays
        exactHits.push(prob)
        expectedHits += k * prob
    }

    // P(至少命中一个) = 1 - P(命中0个)
    const atLeastOne = 1 - exactHits[0]

    return { exactHits, atLeastOne, expectedHits }
}

export default function OddsPage() {
    const game = useGame()

    const [n, setN] = useState(10)  // 总位置数
    const [m, setM] = useState(3)   // 对手放置的炸弹数
    const [bombs, setBombs] = useState(3)  // 你放置的炸弹数

    const odds = useMemo(() => calculateOdds(n, m, bombs), [n, m, bombs])

    // 预设配置
    const presets = [
        { n: 8, m: 2, bombs: 2, label: '8 chips' },
        { n: 10, m: 3, bombs: 3, label: '10 chips' },
        { n: 12, m: 4, bombs: 4, label: '12 chips' },
        { n: 15, m: 3, bombs: 3, label: '15 chips' },
    ]

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[120px] -translate-y-1/2" />

                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full mb-4">
                        <TrendingUp className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-orange-300">Odds Calculator</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {game.display_name} <span className="text-orange-400">Odds</span>
                    </h1>

                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Calculate hit probabilities for different game configurations
                    </p>

                    <div className="mt-4">
                        <Link href={`/${game.slug}`}>
                            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 cursor-pointer hover:bg-red-500/30">
                                <Calculator className="h-3 w-3 mr-1" /> Use Calculator
                            </Badge>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="bombchip-odds" proTip="Use these odds to inform your strategic decisions!" />

                {/* Presets */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {presets.map(preset => (
                        <Button
                            key={preset.label}
                            variant={n === preset.n && m === preset.m ? "default" : "outline"}
                            size="sm"
                            onClick={() => { setN(preset.n); setM(preset.m); setBombs(preset.bombs) }}
                            className={n === preset.n && m === preset.m ? "bg-orange-600 hover:bg-orange-700" : ""}
                        >
                            {preset.label}
                        </Button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-orange-400" />
                                Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="text-sm text-zinc-400 mb-2 block">
                                    Total Positions (N): <span className="text-white font-bold">{n}</span>
                                </label>
                                <Slider
                                    value={[n]}
                                    onValueChange={([v]) => setN(v)}
                                    min={4}
                                    max={25}
                                    step={1}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-zinc-400 mb-2 block">
                                    Opponent's Bombs (M): <span className="text-white font-bold">{m}</span>
                                </label>
                                <Slider
                                    value={[m]}
                                    onValueChange={([v]) => setM(v)}
                                    min={1}
                                    max={Math.min(10, n - 1)}
                                    step={1}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-zinc-400 mb-2 block">
                                    Your Placements: <span className="text-white font-bold">{bombs}</span>
                                </label>
                                <Slider
                                    value={[bombs]}
                                    onValueChange={([v]) => setBombs(v)}
                                    min={1}
                                    max={Math.min(10, n - m)}
                                    step={1}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <Card className="bg-gradient-to-br from-orange-900/20 to-zinc-900/50 border-orange-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-orange-400" />
                                Hit Probabilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Main Result */}
                            <div className="p-4 bg-orange-600/20 rounded-lg border border-orange-500/30 text-center">
                                <div className="text-4xl font-bold text-orange-400">
                                    {(odds.atLeastOne * 100).toFixed(1)}%
                                </div>
                                <div className="text-sm text-zinc-400 mt-1">
                                    Chance to hit at least 1 bomb
                                </div>
                            </div>

                            {/* Expected Value */}
                            <div className="p-3 bg-zinc-800/50 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-400">Expected Hits</span>
                                    <span className="text-xl font-bold text-white">
                                        {odds.expectedHits.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-2">
                                <div className="text-sm text-zinc-400 mb-2">Probability breakdown:</div>
                                {odds.exactHits.map((prob, k) => (
                                    <div key={k} className="flex items-center gap-2">
                                        <div className="w-16 text-xs text-zinc-400">{k} hits</div>
                                        <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                                                style={{ width: `${prob * 100}%` }}
                                            />
                                        </div>
                                        <div className="w-16 text-right text-sm text-white">
                                            {(prob * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Info */}
                <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                    <CardContent className="py-4">
                        <div className="flex gap-3">
                            <Info className="h-5 w-5 text-blue-400 shrink-0" />
                            <div className="text-sm text-zinc-400">
                                <p>
                                    This calculator uses the <strong className="text-white">hypergeometric distribution</strong> to
                                    calculate the exact probability of hitting opponent's bombs. Assumes random placement
                                    without any strategic information.
                                </p>
                                <p className="mt-2">
                                    For strategic recommendations based on opponent patterns, use the{' '}
                                    <Link href={`/${game.slug}`} className="text-orange-400 hover:underline">
                                        Bomb Placement Optimizer
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
