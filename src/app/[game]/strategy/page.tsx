'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Target,
    Shield,
    Lightbulb,
    Zap,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Calculator,
    Brain,
    Eye
} from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'
import { HowItWorks } from '@/components/HowItWorks'

export const dynamic = 'force-dynamic'

// 3x4 网格的位置标签
const GRID_LABELS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['10', '11', '12']
]

// 放置策略数据
const PLACEMENT_STRATEGIES = [
    {
        name: 'Spread Pattern',
        description: '分散放置，覆盖不同区域',
        positions: [1, 6, 11],
        winRate: 72,
        difficulty: 'Easy',
        tip: '对新手玩家最有效'
    },
    {
        name: 'Corner Trap',
        description: '利用角落放置陷阱',
        positions: [1, 3, 10],
        winRate: 68,
        difficulty: 'Medium',
        tip: '针对喜欢从中间开始的玩家'
    },
    {
        name: 'Center Focus',
        description: '集中在中间区域',
        positions: [5, 6, 8],
        winRate: 65,
        difficulty: 'Medium',
        tip: '反向心理战术'
    },
    {
        name: 'Diagonal Line',
        description: '斜线放置模式',
        positions: [1, 5, 12],
        winRate: 70,
        difficulty: 'Easy',
        tip: '视觉上难以察觉的模式'
    },
    {
        name: 'L-Shape',
        description: 'L形放置策略',
        positions: [1, 4, 5],
        winRate: 67,
        difficulty: 'Hard',
        tip: '适合高级玩家使用'
    }
]

// 安全位置策略
const SAFE_EATING_TIPS = [
    { position: 'Edges', risk: 'Low', reason: '新手通常在中间放炸弹' },
    { position: 'Corners', risk: 'Medium', reason: '有经验玩家会利用角落' },
    { position: 'Center', risk: 'High', reason: '最常见的炸弹位置' },
    { position: 'Random', risk: 'Variable', reason: '避免形成可预测的模式' }
]

// 心理战术
const PSYCHOLOGICAL_TIPS = [
    {
        title: '不要重复模式',
        description: '每局游戏改变你的放置策略，防止对手学习你的习惯'
    },
    {
        title: '观察对手',
        description: '注意对手选择的筹码，推断他们的思维模式'
    },
    {
        title: '反向心理',
        description: '如果对手避开某区域，下一局考虑在那里放炸弹'
    },
    {
        title: '时间压力',
        description: '不要立即选择，让对手等待增加心理压力'
    },
    {
        title: '假装犹豫',
        description: '在安全筹码前假装犹豫，诱导对手下次在那里放炸弹'
    }
]

export default function StrategyPage() {
    const game = useGame()
    const [selectedStrategy, setSelectedStrategy] = useState(0)
    const [hoveredCell, setHoveredCell] = useState<number | null>(null)

    const currentStrategy = PLACEMENT_STRATEGIES[selectedStrategy]

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px] -translate-y-1/2" />

                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
                        <Target className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-300">Winning Strategy</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Bomb Chip <span className="text-green-400">Strategy Guide</span>
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Master bomb placement patterns, safe eating strategies, and psychological tactics to dominate in Bomb Chip.
                    </p>

                    <div className="mt-4 flex justify-center gap-2">
                        <Link href={`/${game.slug}`}>
                            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 cursor-pointer hover:bg-orange-500/30">
                                <Calculator className="h-3 w-3 mr-1" /> Use Calculator
                            </Badge>
                        </Link>
                        <Link href={`/${game.slug}/odds`}>
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 cursor-pointer hover:bg-blue-500/30">
                                <Zap className="h-3 w-3 mr-1" /> Odds Calculator
                            </Badge>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="bombchip-strategy" proTip="Vary your patterns every game to stay unpredictable!" />

                {/* Strategy Tabs */}
                <Tabs defaultValue="placement" className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border border-zinc-800">
                        <TabsTrigger value="placement" className="data-[state=active]:bg-green-600">
                            <Target className="h-4 w-4 mr-2" />
                            Placement
                        </TabsTrigger>
                        <TabsTrigger value="eating" className="data-[state=active]:bg-blue-600">
                            <Shield className="h-4 w-4 mr-2" />
                            Safe Eating
                        </TabsTrigger>
                        <TabsTrigger value="psychology" className="data-[state=active]:bg-purple-600">
                            <Brain className="h-4 w-4 mr-2" />
                            Mind Games
                        </TabsTrigger>
                    </TabsList>

                    {/* Placement Strategies Tab */}
                    <TabsContent value="placement" className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Strategy Selector */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Target className="h-5 w-5 text-green-400" />
                                        Bomb Placement Patterns
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {PLACEMENT_STRATEGIES.map((strategy, idx) => (
                                        <button
                                            key={strategy.name}
                                            onClick={() => setSelectedStrategy(idx)}
                                            className={`w-full p-3 rounded-lg text-left transition-all ${
                                                selectedStrategy === idx
                                                    ? 'bg-green-600/20 border border-green-500/50'
                                                    : 'bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-white">{strategy.name}</span>
                                                <Badge className={`text-xs ${
                                                    strategy.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                                    strategy.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {strategy.difficulty}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-zinc-400">{strategy.description}</p>
                                            <div className="mt-2 flex items-center gap-2 text-xs">
                                                <span className="text-green-400 font-medium">
                                                    ~{strategy.winRate}% Win Rate
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Grid Visualization */}
                            <Card className="bg-gradient-to-br from-green-900/20 to-zinc-900/50 border-green-500/20">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Eye className="h-5 w-5 text-green-400" />
                                        {currentStrategy.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* 3x4 Grid */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {GRID_LABELS.flat().map((label, idx) => {
                                            const position = idx + 1
                                            const isBomb = currentStrategy.positions.includes(position)
                                            const isHovered = hoveredCell === position

                                            return (
                                                <div
                                                    key={position}
                                                    onMouseEnter={() => setHoveredCell(position)}
                                                    onMouseLeave={() => setHoveredCell(null)}
                                                    className={`aspect-square rounded-lg flex items-center justify-center text-lg font-bold transition-all cursor-pointer ${
                                                        isBomb
                                                            ? 'bg-red-600/80 text-white shadow-lg shadow-red-500/30 scale-105'
                                                            : isHovered
                                                            ? 'bg-zinc-700 text-white'
                                                            : 'bg-zinc-800/80 text-zinc-400'
                                                    }`}
                                                >
                                                    {isBomb ? '💣' : label}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Strategy Tip */}
                                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                        <div className="flex items-start gap-2">
                                            <Lightbulb className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-green-300 font-medium">Pro Tip</p>
                                                <p className="text-sm text-zinc-400">{currentStrategy.tip}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bomb Positions */}
                                    <div className="mt-4 text-center">
                                        <p className="text-xs text-zinc-500 mb-2">Bomb Positions:</p>
                                        <div className="flex justify-center gap-2">
                                            {currentStrategy.positions.map(pos => (
                                                <Badge key={pos} className="bg-red-500/20 text-red-300 border-red-500/30">
                                                    Chip #{pos}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Safe Eating Tab */}
                    <TabsContent value="eating" className="mt-6">
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-400" />
                                    Safe Chip Selection Guide
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    {SAFE_EATING_TIPS.map((tip, idx) => (
                                        <div
                                            key={tip.position}
                                            className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium text-white">{tip.position}</span>
                                                <Badge className={`text-xs ${
                                                    tip.risk === 'Low' ? 'bg-green-500/20 text-green-400' :
                                                    tip.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    tip.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-purple-500/20 text-purple-400'
                                                }`}>
                                                    {tip.risk} Risk
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-zinc-400">{tip.reason}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Tips */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-white flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                                        Quick Tips
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            First 1-2 picks: Choose edges or corners
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            Watch which chips your opponent avoids
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                                            <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            Don't always pick the same patterns
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-zinc-400">
                                            <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                                            Avoid: Chips your opponent just ate (it's a trap!)
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Psychology Tab */}
                    <TabsContent value="psychology" className="mt-6">
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-purple-400" />
                                    Psychological Tactics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {PSYCHOLOGICAL_TIPS.map((tip, idx) => (
                                        <div
                                            key={tip.title}
                                            className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-purple-500/30 transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                                    <span className="text-lg font-bold text-purple-400">
                                                        {idx + 1}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white mb-1">{tip.title}</h4>
                                                    <p className="text-sm text-zinc-400">{tip.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Warning */}
                                <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-yellow-300 font-medium">Remember</p>
                                            <p className="text-sm text-zinc-400">
                                                No strategy guarantees 100% wins. The key is to stay unpredictable 
                                                and adapt to each opponent's playing style.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* CTA */}
                <Card className="bg-gradient-to-r from-orange-900/30 to-zinc-900/50 border-orange-500/30">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Ready to Put These Strategies to the Test?
                        </h3>
                        <p className="text-zinc-400 mb-4">
                            Use our Bomb Chip Calculator to analyze specific scenarios and optimize your placements.
                        </p>
                        <Link href={`/${game.slug}`}>
                            <Button className="bg-orange-600 hover:bg-orange-700">
                                <Calculator className="h-4 w-4 mr-2" />
                                Try Bomb Chip Calculator
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link 
                        href={`/${game.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Calculator</span>
                    </Link>
                </div>
            </main>
        </div>
    )
}
