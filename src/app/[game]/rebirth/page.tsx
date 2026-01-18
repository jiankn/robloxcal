'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    RefreshCw,
    TrendingUp,
    Coins,
    Clock,
    Sparkles,
    Star,
    ChevronRight,
    ArrowRight,
    Calculator,
    Zap
} from 'lucide-react'
import { REBIRTH_TIERS, RebirthTier } from '@/lib/rvb-tycoon-data'
import { HowItWorks } from '@/components/HowItWorks'

export default function RebirthCalculatorPage() {
    const [currentResources, setCurrentResources] = useState<number>(50000)
    const [incomePerMinute, setIncomePerMinute] = useState<number>(1000)
    const [currentRebirthLevel, setCurrentRebirthLevel] = useState<number>(0)

    // Calculate time to reach each rebirth tier
    const rebirthAnalysis = useMemo(() => {
        return REBIRTH_TIERS.map((tier, index) => {
            const resourcesNeeded = tier.requirement - currentResources
            const timeMinutes = resourcesNeeded > 0 ? resourcesNeeded / incomePerMinute : 0
            const timeHours = timeMinutes / 60
            const isCompleted = currentResources >= tier.requirement
            const isNext = !isCompleted && (index === 0 || currentResources >= REBIRTH_TIERS[index - 1].requirement)
            const progress = Math.min(100, (currentResources / tier.requirement) * 100)

            return {
                ...tier,
                resourcesNeeded: Math.max(0, resourcesNeeded),
                timeMinutes,
                timeHours,
                isCompleted,
                isNext,
                progress
            }
        })
    }, [currentResources, incomePerMinute])

    // Find next rebirth tier
    const nextRebirth = rebirthAnalysis.find(t => t.isNext)
    const currentRebirth = REBIRTH_TIERS[currentRebirthLevel]

    // Calculate if rebirthing now is worth it
    const shouldRebirthNow = useMemo(() => {
        if (!nextRebirth || !currentRebirth) return null

        const currentIncomeMultiplier = currentRebirth?.incomeMultiplier || 1
        const nextIncomeMultiplier = nextRebirth.incomeMultiplier

        // Time to reach next rebirth
        const timeToReach = nextRebirth.timeHours

        // Income lost by waiting vs gained by rebirthing now
        const gainMultiplier = nextIncomeMultiplier / currentIncomeMultiplier

        return {
            currentMultiplier: currentIncomeMultiplier,
            nextMultiplier: nextIncomeMultiplier,
            gainPercent: ((gainMultiplier - 1) * 100).toFixed(0),
            timeToReach: timeToReach.toFixed(1),
            recommendation: nextRebirth.isCompleted ? 'REBIRTH NOW!' : `Wait ${timeToReach.toFixed(1)}h`
        }
    }, [nextRebirth, currentRebirth])

    // Format numbers
    const formatNumber = (num: number): string => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
        return num.toFixed(0)
    }

    const formatTime = (hours: number): string => {
        if (hours < 1) return `${Math.ceil(hours * 60)}m`
        if (hours < 24) return `${hours.toFixed(1)}h`
        return `${(hours / 24).toFixed(1)}d`
    }

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/25 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2" />

            {/* Content */}
            <div className="relative py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                            <RefreshCw className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-blue-300">Rebirth Calculator</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            Rebirth Income Calculator
                        </h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Calculate optimal rebirth timing and compare long-term income strategies.
                            Maximize your multipliers with data-driven decisions.
                        </p>
                    </div>

                    {/* How It Works */}
                    <HowItWorks toolType="rvb-rebirth" proTip="Always rebirth as soon as you hit the requirement!" />

                    {/* Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calculator className="h-5 w-5 text-blue-400" />
                                Your Current Status
                            </CardTitle>
                            <CardDescription>
                                Enter your current progress to see rebirth recommendations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="resources" className="text-zinc-300">
                                        Total Resources
                                    </Label>
                                    <Input
                                        id="resources"
                                        type="number"
                                        value={currentResources}
                                        onChange={(e) => setCurrentResources(Number(e.target.value))}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                    <p className="text-xs text-zinc-500">
                                        Your lifetime accumulated resources
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="income" className="text-zinc-300">
                                        Income per Minute
                                    </Label>
                                    <Input
                                        id="income"
                                        type="number"
                                        value={incomePerMinute}
                                        onChange={(e) => setIncomePerMinute(Number(e.target.value))}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                    <p className="text-xs text-zinc-500">
                                        Current resource generation rate
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rebirth" className="text-zinc-300">
                                        Current Rebirth Level
                                    </Label>
                                    <Input
                                        id="rebirth"
                                        type="number"
                                        value={currentRebirthLevel}
                                        min={0}
                                        max={REBIRTH_TIERS.length - 1}
                                        onChange={(e) => setCurrentRebirthLevel(Number(e.target.value))}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                    <p className="text-xs text-zinc-500">
                                        How many times you&apos;ve rebirthed
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommendation Card */}
                    {shouldRebirthNow && nextRebirth && (
                        <Card className={`mb-8 ${nextRebirth.isCompleted
                            ? 'bg-gradient-to-br from-green-900/30 to-zinc-900/50 border-green-500/30'
                            : 'bg-gradient-to-br from-blue-900/30 to-zinc-900/50 border-blue-500/30'
                            }`}>
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${nextRebirth.isCompleted
                                            ? 'bg-green-500/20'
                                            : 'bg-blue-500/20'
                                            }`}>
                                            {nextRebirth.isCompleted ? (
                                                <Sparkles className="h-8 w-8 text-green-400" />
                                            ) : (
                                                <Clock className="h-8 w-8 text-blue-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                {shouldRebirthNow.recommendation}
                                            </h3>
                                            <p className="text-zinc-400">
                                                {nextRebirth.isCompleted
                                                    ? `You've reached ${nextRebirth.name} requirements!`
                                                    : `${formatNumber(nextRebirth.resourcesNeeded)} more resources needed`
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-center">
                                        <div>
                                            <div className="text-sm text-zinc-500">Current</div>
                                            <div className="text-2xl font-bold text-white">
                                                {shouldRebirthNow.currentMultiplier}x
                                            </div>
                                        </div>
                                        <ArrowRight className="h-6 w-6 text-zinc-600" />
                                        <div>
                                            <div className="text-sm text-zinc-500">Next</div>
                                            <div className="text-2xl font-bold text-green-400">
                                                {shouldRebirthNow.nextMultiplier}x
                                            </div>
                                        </div>
                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-4 py-2">
                                            +{shouldRebirthNow.gainPercent}%
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Rebirth Tiers */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-400" />
                            Rebirth Tiers
                        </h2>

                        <div className="space-y-4">
                            {rebirthAnalysis.map((tier, index) => (
                                <Card
                                    key={tier.id}
                                    className={`bg-zinc-900/50 border-zinc-800 ${tier.isNext ? 'ring-2 ring-blue-500/50' : ''
                                        } ${tier.isCompleted ? 'opacity-70' : ''}`}
                                >
                                    <CardContent className="pt-5">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tier.isCompleted
                                                    ? 'bg-green-500/20'
                                                    : tier.isNext
                                                        ? 'bg-blue-500/20'
                                                        : 'bg-zinc-800'
                                                    }`}>
                                                    <span className="text-lg font-bold text-white">
                                                        {index + 1}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-white">{tier.name}</h3>
                                                        {tier.isCompleted && (
                                                            <Badge className="bg-green-500/20 text-green-300 text-xs">
                                                                Unlocked
                                                            </Badge>
                                                        )}
                                                        {tier.isNext && (
                                                            <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                                                                Next
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {tier.bonuses.map((bonus, i) => (
                                                            <span key={i} className="text-xs text-zinc-500 bg-zinc-800 rounded px-2 py-0.5">
                                                                {bonus}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="text-xs text-zinc-500">Requirement</div>
                                                    <div className="font-semibold text-yellow-400">
                                                        {formatNumber(tier.requirement)}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-zinc-500">Multiplier</div>
                                                    <div className="font-semibold text-green-400">
                                                        {tier.incomeMultiplier}x
                                                    </div>
                                                </div>
                                                <div className="text-right min-w-[80px]">
                                                    <div className="text-xs text-zinc-500">Time to Reach</div>
                                                    <div className="font-semibold text-white">
                                                        {tier.isCompleted ? '—' : formatTime(tier.timeHours)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {!tier.isCompleted && (
                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                                                    <span>Progress</span>
                                                    <span>{tier.progress.toFixed(1)}%</span>
                                                </div>
                                                <Progress value={tier.progress} className="h-2" />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Strategy Tips */}
                    <Card className="mt-8 bg-zinc-900/30 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" />
                                Rebirth Strategy Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>
                                        <strong className="text-white">Early Game:</strong> Focus on reaching Rebirth I quickly for the 1.5x multiplier.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>
                                        <strong className="text-white">Mid Game:</strong> Balance between rebirthing and upgrading. Each rebirth resets progress but increases income.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>
                                        <strong className="text-white">Late Game:</strong> Aim for Rebirth IV+ for the massive 5x+ multipliers and exclusive weapon unlocks.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span>
                                        <strong className="text-white">Pro Tip:</strong> Always rebirth as soon as you hit the requirement - waiting costs you multiplied income!
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
