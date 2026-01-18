'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import {
    Bomb,
    Target,
    Trash2,
    Plus,
    TrendingUp,
    Shield,
    Sparkles,
    RotateCcw,
    Gift,
    Crosshair
} from 'lucide-react'
import Link from 'next/link'
import { HowItWorks } from '@/components/HowItWorks'
import {
    getTopPlacements,
    calculateHitProbability,
    generateHeatmapData,
    type GameRound,
    type PlacementRecommendation,
    type BombChipConfig,
    DEFAULT_CONFIG
} from '@/lib/bomb-chip'

interface BombChipCalculatorProps {
    gameSlug: string
    displayName: string
}

// 预设配置
const PRESET_CONFIGS = [
    { n: 8, m: 2, label: '8 / 2' },
    { n: 10, m: 3, label: '10 / 3' },
    { n: 12, m: 4, label: '12 / 4' },
    { n: 15, m: 3, label: '15 / 3' },
]

export function BombChipCalculator({ gameSlug, displayName }: BombChipCalculatorProps) {
    // 游戏参数
    const [n, setN] = useState(10)
    const [m, setM] = useState(3)

    // 对手历史
    const [history, setHistory] = useState<GameRound[]>([])
    const [currentRound, setCurrentRound] = useState<number[]>([])

    // 策略配置
    const [config, setConfig] = useState<BombChipConfig>(DEFAULT_CONFIG)

    // 结果
    const [recommendations, setRecommendations] = useState<PlacementRecommendation[]>([])
    const [hitProbability, setHitProbability] = useState<number>(0)

    // 添加对手选择
    const togglePosition = useCallback((pos: number) => {
        setCurrentRound(prev => {
            if (prev.includes(pos)) {
                return prev.filter(p => p !== pos)
            }
            if (prev.length < m) {
                return [...prev, pos]
            }
            return prev
        })
    }, [m])

    // 提交当前回合
    const submitRound = useCallback(() => {
        if (currentRound.length === 0) return

        const newHistory = [...history, { opponentChoices: currentRound }]
        setHistory(newHistory)
        setCurrentRound([])

        // 重新计算推荐
        const recs = getTopPlacements(newHistory, n, m, config)
        setRecommendations(recs)
        setHitProbability(calculateHitProbability(recs, m))
    }, [currentRound, history, n, m, config])

    // 计算推荐
    const calculateRecommendations = useCallback(() => {
        const recs = getTopPlacements(history, n, m, config)
        setRecommendations(recs)
        setHitProbability(calculateHitProbability(recs, m))
    }, [history, n, m, config])

    // 重置
    const reset = useCallback(() => {
        setHistory([])
        setCurrentRound([])
        setRecommendations([])
        setHitProbability(0)
    }, [])

    // 获取热力图数据
    const heatmapData = generateHeatmapData(history, n, config)

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Hero */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px] -translate-y-1/3" />

                <div className="relative max-w-5xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                        <Bomb className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-red-300">Bomb Placement Optimizer</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {displayName} <span className="text-red-400">Calculator</span>
                    </h1>

                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Input opponent's choices, get AI-powered placement recommendations
                    </p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="bombchip" proTip="Track opponent patterns for higher hit rates!" />

                {/* Quick Links */}
                <div className="flex justify-center gap-3 mb-8 flex-wrap">
                    <Link href={`/${gameSlug}/odds`}>
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 cursor-pointer hover:bg-orange-500/30">
                            <TrendingUp className="h-3 w-3 mr-1" /> Odds
                        </Badge>
                    </Link>
                    <Link href={`/${gameSlug}/codes`}>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 cursor-pointer hover:bg-green-500/30">
                            <Gift className="h-3 w-3 mr-1" /> Codes
                        </Badge>
                    </Link>
                    <Link href={`/${gameSlug}/calibrate`}>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-pointer hover:bg-purple-500/30">
                            <Crosshair className="h-3 w-3 mr-1" /> Calibrate
                        </Badge>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Input */}
                    <div className="space-y-6">
                        {/* Game Setup */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Target className="h-5 w-5 text-red-400" />
                                    Game Setup
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {PRESET_CONFIGS.map(preset => (
                                        <Button
                                            key={preset.label}
                                            variant={n === preset.n && m === preset.m ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => { setN(preset.n); setM(preset.m); reset() }}
                                            className={n === preset.n && m === preset.m ? "bg-red-600 hover:bg-red-700" : ""}
                                        >
                                            {preset.label}
                                        </Button>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">Chips (N)</label>
                                        <input
                                            type="number"
                                            value={n}
                                            onChange={e => { setN(Number(e.target.value)); reset() }}
                                            min={4}
                                            max={25}
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400 mb-1 block">Bombs (M)</label>
                                        <input
                                            type="number"
                                            value={m}
                                            onChange={e => { setM(Number(e.target.value)); reset() }}
                                            min={1}
                                            max={Math.min(10, n - 1)}
                                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Opponent History Input */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Bomb className="h-5 w-5 text-orange-400" />
                                    Opponent Choices
                                </CardTitle>
                                <CardDescription>
                                    Click positions opponent chose, then add round
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-5 gap-2">
                                    {Array.from({ length: n }, (_, i) => i + 1).map(pos => {
                                        const isSelected = currentRound.includes(pos)
                                        const historyCount = history.reduce((acc, round) =>
                                            acc + (round.opponentChoices.includes(pos) ? 1 : 0), 0)

                                        return (
                                            <button
                                                key={pos}
                                                onClick={() => togglePosition(pos)}
                                                className={`
                                                    relative aspect-square rounded-lg border-2 
                                                    flex items-center justify-center font-bold text-lg
                                                    transition-all duration-200
                                                    ${isSelected
                                                        ? 'bg-red-600 border-red-500 text-white scale-105'
                                                        : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-red-500/50'}
                                                `}
                                            >
                                                {pos}
                                                {historyCount > 0 && !isSelected && (
                                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
                                                        {historyCount}
                                                    </span>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="text-sm text-zinc-500">
                                    Selected: {currentRound.length} / {m}
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={submitRound}
                                        disabled={currentRound.length === 0}
                                        className="flex-1 bg-red-600 hover:bg-red-700"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Round
                                    </Button>
                                    <Button variant="outline" onClick={() => setCurrentRound([])}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                {history.length > 0 && (
                                    <div className="pt-4 border-t border-zinc-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-zinc-400">History ({history.length} rounds)</span>
                                            <Button variant="ghost" size="sm" onClick={reset}>
                                                <RotateCcw className="h-3 w-3 mr-1" /> Reset
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {history.slice(-5).map((round, i) => (
                                                <div key={i} className="text-xs bg-zinc-800 px-2 py-1 rounded">
                                                    [{round.opponentChoices.join(',')}]
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Strategy */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-400" />
                                    Strategy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-zinc-400">Conservative</span>
                                        <span className="text-zinc-400">Aggressive</span>
                                    </div>
                                    <Slider
                                        value={[config.risk_weight * 100]}
                                        onValueChange={([v]) => setConfig({ ...config, risk_weight: v / 100 })}
                                        max={100}
                                        step={10}
                                    />
                                </div>

                                <Button
                                    onClick={calculateRecommendations}
                                    disabled={history.length === 0}
                                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                                >
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Get Recommendations
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Results */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-red-900/20 to-zinc-900/50 border-red-500/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-red-400" />
                                    Recommended Placements
                                </CardTitle>
                                {recommendations.length > 0 && (
                                    <CardDescription>
                                        Hit probability: <span className="text-green-400 font-bold">{(hitProbability * 100).toFixed(1)}%</span>
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                {recommendations.length === 0 ? (
                                    <div className="text-center py-8 text-zinc-500">
                                        <Bomb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>Add history to get recommendations</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {recommendations.map((rec, i) => (
                                            <div
                                                key={rec.position}
                                                className={`flex items-center justify-between p-3 rounded-lg
                                                    ${i === 0 ? 'bg-red-600/20 border border-red-500/30' : 'bg-zinc-800/50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                                                        ${i === 0 ? 'bg-red-600 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                                                        {rec.position}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">Position {rec.position}</div>
                                                        <div className="text-xs text-zinc-400">{rec.reason}</div>
                                                    </div>
                                                </div>
                                                <Badge className={i === 0 ? 'bg-red-500' : 'bg-zinc-600'}>
                                                    {(rec.probability * 100).toFixed(1)}%
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Heatmap</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-5 gap-2">
                                    {heatmapData.map(({ position, intensity }) => {
                                        const isRecommended = recommendations.some(r => r.position === position)
                                        return (
                                            <div
                                                key={position}
                                                className={`aspect-square rounded-lg flex items-center justify-center font-bold
                                                    ${isRecommended ? 'ring-2 ring-red-500' : ''}`}
                                                style={{
                                                    backgroundColor: `rgba(239, 68, 68, ${intensity * 0.8 + 0.1})`,
                                                    color: intensity > 0.3 ? 'white' : 'rgb(161, 161, 170)'
                                                }}
                                            >
                                                {position}
                                            </div>
                                        )
                                    })}
                                </div>
                                <p className="text-xs text-zinc-500 mt-3 text-center">
                                    Darker = more frequently chosen
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
