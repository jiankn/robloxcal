'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { AdLayout } from '@/components/AdLayout'
import {
    Target,
    TrendingUp,
    Coins,
    Sparkles,
    Info,
    ArrowUp,
    Calculator
} from 'lucide-react'
import {
    TYCOON_UPGRADES,
    calculateUpgradeCost,
    calculateEfficiency,
    getOptimalUpgrades
} from '@/lib/rvb-tycoon-data'
import { HowItWorks } from '@/components/HowItWorks'

// Category colors and labels
const CATEGORY_CONFIG = {
    resource: { color: 'green', label: 'Resource' },
    combat: { color: 'red', label: 'Combat' },
    defense: { color: 'blue', label: 'Defense' },
    utility: { color: 'purple', label: 'Utility' }
}

const COLOR_STYLES: Record<string, { badge: string; iconBg: string; hoverBorder: string }> = {
    green: {
        badge: 'bg-green-500/20 text-green-300 border-green-500/30',
        iconBg: 'bg-green-500/20',
        hoverBorder: 'hover:border-green-500/30'
    },
    red: {
        badge: 'bg-red-500/20 text-red-300 border-red-500/30',
        iconBg: 'bg-red-500/20',
        hoverBorder: 'hover:border-red-500/30'
    },
    blue: {
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        iconBg: 'bg-blue-500/20',
        hoverBorder: 'hover:border-blue-500/30'
    },
    purple: {
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        iconBg: 'bg-purple-500/20',
        hoverBorder: 'hover:border-purple-500/30'
    }
}

export default function TycoonOptimizerPage() {
    // User state
    const [currentResources, setCurrentResources] = useState<number>(10000)
    const [budget, setBudget] = useState<number>(5000)
    const [upgradeLevels, setUpgradeLevels] = useState<Record<string, number>>({})

    // Calculate optimal upgrades
    const recommendations = useMemo(() => {
        return getOptimalUpgrades(upgradeLevels, budget, 6)
    }, [upgradeLevels, budget])

    // Handle level change
    const handleLevelChange = (upgradeId: string, level: number) => {
        setUpgradeLevels(prev => ({ ...prev, [upgradeId]: level }))
    }

    // Format large numbers
    const formatNumber = (num: number): string => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
        return num.toFixed(0)
    }

    return (
        <AdLayout
            maxWidth="wide"
            className="py-10"
        >
            <div className="text-center mb-10">
                <div className="rc-kicker bg-purple-500/10 border-purple-500/20 text-purple-300 mb-4">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span>Killer Tool</span>
                </div>
                <h1 className="rc-title text-3xl md:text-4xl mb-3">
                    Tycoon Optimizer
                </h1>
                <p className="rc-lead max-w-2xl mx-auto">
                    Get personalized upgrade recommendations based on your current progress and budget.
                    Maximize your income efficiency with data-driven decisions.
                </p>
            </div>

            {/* How It Works */}
            <HowItWorks toolType="rvb-optimizer" proTip="Update your levels as you upgrade for accurate recommendations!" />

            <Card className="rc-surface mb-8">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-purple-400" />
                        Your Current Status
                    </CardTitle>
                    <CardDescription>
                        Enter your current resources and budget to get optimized recommendations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="resources" className="text-zinc-300">
                                Current Resources
                            </Label>
                            <Input
                                id="resources"
                                type="number"
                                value={currentResources}
                                onChange={(e) => setCurrentResources(Number(e.target.value))}
                                className="bg-zinc-900/50 border-zinc-800 text-white"
                                placeholder="Enter your current resources"
                            />
                            <p className="text-xs text-zinc-500">
                                Your total available resources
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="budget" className="text-zinc-300">
                                Upgrade Budget
                            </Label>
                            <Input
                                id="budget"
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="bg-zinc-900/50 border-zinc-800 text-white"
                                placeholder="How much to spend on upgrades"
                            />
                            <p className="text-xs text-zinc-500">
                                Amount you want to invest in upgrades
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Target className="h-5 w-5 text-green-400" />
                            Optimal Upgrades
                        </h2>
                        <p className="text-sm text-zinc-500 mt-1">
                            Ranked by efficiency (income gain per cost)
                        </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        Budget: {formatNumber(budget)}
                    </Badge>
                </div>

                {recommendations.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommendations.map((rec, index) => {
                            const category = CATEGORY_CONFIG[rec.upgrade.category]
                            return (
                                <Card
                                    key={rec.upgrade.id}
                                    className={`rc-surface transition-all ${COLOR_STYLES[category.color]?.hoverBorder ?? 'hover:border-zinc-700/70'}`}
                                >
                                    <CardContent className="pt-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${COLOR_STYLES[category.color]?.iconBg ?? 'bg-zinc-800/70'}`}>
                                                    <span className="text-lg font-bold text-white">#{index + 1}</span>
                                                </div>
                                                <Badge className={`${COLOR_STYLES[category.color]?.badge ?? 'bg-zinc-800 text-zinc-300 border-zinc-700'} text-xs`}>
                                                    {category.label}
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-zinc-500">Efficiency</div>
                                                <div className="text-green-400 font-semibold">
                                                    {(rec.efficiency * 1000).toFixed(2)}x
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="font-semibold text-white mb-1">
                                            {rec.upgrade.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 mb-3">
                                            {rec.upgrade.description}
                                        </p>

                                        <div className="flex items-center justify-between text-sm">
                                            <div>
                                                <span className="text-zinc-500">Level: </span>
                                                <span className="text-white">
                                                    {rec.currentLevel} → {rec.currentLevel + 1}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Coins className="h-3.5 w-3.5" />
                                                <span>{formatNumber(rec.cost)}</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-3 border-zinc-700 hover:bg-zinc-800"
                                            onClick={() => handleLevelChange(rec.upgrade.id, rec.currentLevel + 1)}
                                        >
                                            <ArrowUp className="h-4 w-4 mr-1" />
                                            Mark as Upgraded
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <Card className="bg-zinc-900/30 border-zinc-800 text-center py-8">
                        <CardContent>
                            <Info className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                            <p className="text-zinc-400">
                                No upgrades available within your budget.
                            </p>
                            <p className="text-sm text-zinc-500 mt-1">
                                Try increasing your budget to see recommendations.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* All Upgrades Section */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    All Tycoon Upgrades
                </h2>

                <Tabs defaultValue="resource" className="w-full">
                    <TabsList className="bg-zinc-900 border border-zinc-800 mb-6">
                        <TabsTrigger value="resource" className="data-[state=active]:bg-green-500/20">
                            Resource
                        </TabsTrigger>
                        <TabsTrigger value="combat" className="data-[state=active]:bg-red-500/20">
                            Combat
                        </TabsTrigger>
                        <TabsTrigger value="defense" className="data-[state=active]:bg-blue-500/20">
                            Defense
                        </TabsTrigger>
                        <TabsTrigger value="utility" className="data-[state=active]:bg-purple-500/20">
                            Utility
                        </TabsTrigger>
                    </TabsList>

                    {(['resource', 'combat', 'defense', 'utility'] as const).map(category => (
                        <TabsContent key={category} value={category}>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {TYCOON_UPGRADES
                                    .filter(u => u.category === category)
                                    .map(upgrade => {
                                        const currentLevel = upgradeLevels[upgrade.id] || 0
                                        const nextCost = calculateUpgradeCost(upgrade, currentLevel, currentLevel + 1)
                                        const efficiency = calculateEfficiency(upgrade, currentLevel)

                                        return (
                                            <Card
                                                key={upgrade.id}
                                                className="bg-zinc-900/50 border-zinc-800"
                                            >
                                                <CardContent className="pt-5">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="font-semibold text-white">
                                                            {upgrade.name}
                                                        </h3>
                                                        <Badge className="text-xs bg-zinc-800 text-zinc-400">
                                                            Tier {upgrade.tier}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-zinc-500 mb-4">
                                                        {upgrade.description}
                                                    </p>

                                                    {/* Level Slider */}
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex justify-between text-sm">
                                                            <Label className="text-zinc-400">Your Level</Label>
                                                            <span className="text-white font-medium">
                                                                {currentLevel} / {upgrade.maxLevel}
                                                            </span>
                                                        </div>
                                                        <Slider
                                                            value={[currentLevel]}
                                                            max={upgrade.maxLevel}
                                                            step={1}
                                                            onValueChange={(v) => handleLevelChange(upgrade.id, v[0])}
                                                            className="py-2"
                                                        />
                                                    </div>

                                                    {/* Stats */}
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div className="bg-zinc-800/50 rounded-lg p-2">
                                                            <div className="text-zinc-500">Next Level Cost</div>
                                                            <div className="text-yellow-400 font-medium">
                                                                {currentLevel < upgrade.maxLevel
                                                                    ? formatNumber(nextCost)
                                                                    : 'MAX'
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="bg-zinc-800/50 rounded-lg p-2">
                                                            <div className="text-zinc-500">Efficiency</div>
                                                            <div className="text-green-400 font-medium">
                                                                {currentLevel < upgrade.maxLevel
                                                                    ? (efficiency * 1000).toFixed(3) + 'x'
                                                                    : 'N/A'
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {upgrade.unlockRequirement && (
                                                        <div className="mt-3 text-xs text-zinc-500 flex items-center gap-1">
                                                            <Info className="h-3 w-3" />
                                                            Requires: {upgrade.unlockRequirement}
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </AdLayout>
    )
}
