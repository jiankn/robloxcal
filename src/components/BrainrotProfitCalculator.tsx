'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    TrendingUp,
    Zap,
    RotateCcw,
    Coins,
    Clock,
    ArrowRight,
    Search
} from 'lucide-react'
import { analyzeRecipes, analyzeRebirth, type ProfitAnalysis } from '@/lib/brainrot'
import { HowItWorks } from '@/components/HowItWorks'
import Link from 'next/link'

interface BrainrotProps {
    gameSlug: string
    displayName: string
}

export function BrainrotProfitCalculator({ gameSlug, displayName }: BrainrotProps) {
    // 全局乘数
    const [multiplier, setMultiplier] = useState(1)

    // Profit 数据
    const profitData = useMemo(() => analyzeRecipes(multiplier), [multiplier])

    // Rebirth 计算状态
    const [currentMult, setCurrentMult] = useState(1.0)
    const [newMult, setNewMult] = useState(1.5)
    const [rebirthCost, setRebirthCost] = useState(1000)
    const [baseIncome, setBaseIncome] = useState(10) // unit/sec

    const rebirthAnalysis = useMemo(() =>
        analyzeRebirth(currentMult, newMult, rebirthCost, baseIncome),
        [currentMult, newMult, rebirthCost, baseIncome]
    )

    // 格式化时间
    const formatTime = (seconds: number) => {
        if (!isFinite(seconds)) return 'Never'
        if (seconds < 60) return `${Math.ceil(seconds)}s`
        if (seconds < 3600) return `${Math.ceil(seconds / 60)}m`
        return `${(seconds / 3600).toFixed(1)}h`
    }

    // 格式化数字
    const formatNum = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
        return num.toFixed(0)
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] -translate-y-1/3" />

                <div className="relative max-w-5xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-4">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-yellow-300">Economy Optimizer</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {displayName} <span className="text-yellow-400">Calculator</span>
                    </h1>

                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Maximize your profits and calculate the perfect time to rebirth.
                    </p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="brainrot" proTip="Focus on high ROI recipes for maximum profit!" />

                {/* 视图切换 (Tabs 简单实现，如果 UI 库没有可以直接手写) */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Control Panel / Global Settings */}
                    <div className="space-y-6">
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-400" />
                                    Global Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <label className="text-sm text-zinc-400 mb-2 block">Current Cash Multiplier</label>
                                <Input
                                    type="number"
                                    value={multiplier}
                                    onChange={e => setMultiplier(Math.max(1, Number(e.target.value)))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500 mt-2">
                                    This applies to all recipe sell prices.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <div className="space-y-2">
                            <Link href={`/${gameSlug}/recipes`}>
                                <Button variant="outline" className="w-full justify-start border-zinc-700 hover:bg-zinc-800">
                                    <Search className="h-4 w-4 mr-2 text-blue-400" />
                                    Browse All Recipes
                                </Button>
                            </Link>
                            <Link href={`/${gameSlug}/codes`}>
                                <Button variant="outline" className="w-full justify-start border-zinc-700 hover:bg-zinc-800">
                                    <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                                    Active Codes
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Main Calculators */}
                    <div className="md:col-span-2 space-y-8">

                        {/* 1. Best Recipes */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Coins className="h-6 w-6 text-yellow-500" />
                                Best Recipes for Profit
                            </h2>
                            <div className="grid gap-4">
                                {profitData.map((recipe, i) => (
                                    <Card key={recipe.recipeId} className={`bg-zinc-900/50 border-zinc-800 ${i === 0 ? 'border-yellow-500/30 bg-yellow-900/10' : ''}`}>
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    {i === 0 && <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">#1 Best</Badge>}
                                                    {recipe.recipeName}
                                                </div>
                                                <div className="text-sm text-zinc-400 mt-1 space-x-3">
                                                    <span>Cost: <span className="text-red-400">${formatNum(recipe.cost)}</span></span>
                                                    <span>Sell: <span className="text-green-400">${formatNum(recipe.revenue)}</span></span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-yellow-400">
                                                    ${formatNum(recipe.profitPerSecond)}/s
                                                </div>
                                                <div className="text-xs text-zinc-500">
                                                    ROI: {(recipe.roi * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        {/* 2. Rebirth Calculator */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <RotateCcw className="h-6 w-6 text-purple-500" />
                                Rebirth Calculator
                            </h2>
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase font-bold">Current Mult</label>
                                            <Input type="number" value={currentMult} onChange={e => setCurrentMult(Number(e.target.value))} className="bg-zinc-800 border-zinc-700 mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase font-bold">New Mult</label>
                                            <Input type="number" value={newMult} onChange={e => setNewMult(Number(e.target.value))} className="bg-zinc-800 border-zinc-700 mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase font-bold">Rebirth Cost</label>
                                            <Input type="number" value={rebirthCost} onChange={e => setRebirthCost(Number(e.target.value))} className="bg-zinc-800 border-zinc-700 mt-1" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase font-bold">Current $/sec</label>
                                            <Input type="number" value={baseIncome} onChange={e => setBaseIncome(Number(e.target.value))} className="bg-zinc-800 border-zinc-700 mt-1" />
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-lg flex items-center justify-between border ${rebirthAnalysis.isRecommended ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                        <div>
                                            <div className="text-sm text-zinc-400">Break-even Time</div>
                                            <div className="text-2xl font-bold text-white">{formatTime(rebirthAnalysis.timeToRecover)}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-zinc-400">Recommendation</div>
                                            <div className={`font-bold ${rebirthAnalysis.isRecommended ? 'text-green-400' : 'text-red-400'}`}>
                                                {rebirthAnalysis.isRecommended ? 'REBIRTH NOW' : 'WAIT'}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    )
}
