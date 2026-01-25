'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Target, TrendingUp, Info } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Aura data with odds
const AURAS = [
    { id: 'common', name: 'Common', odds: 0.5, color: 'bg-gray-500/20 text-gray-400' },
    { id: 'uncommon', name: 'Uncommon', odds: 0.25, color: 'bg-green-500/20 text-green-400' },
    { id: 'rare', name: 'Rare', odds: 0.15, color: 'bg-blue-500/20 text-blue-400' },
    { id: 'epic', name: 'Epic', odds: 0.07, color: 'bg-purple-500/20 text-purple-400' },
    { id: 'legendary', name: 'Legendary', odds: 0.025, color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'mythic', name: 'Mythic', odds: 0.004, color: 'bg-pink-500/20 text-pink-400' },
    { id: 'divine', name: 'Divine', odds: 0.001, color: 'bg-cyan-500/20 text-cyan-400' },
    { id: 'celestial', name: 'Celestial', odds: 0.0001, color: 'bg-amber-500/20 text-amber-400' },
]

function formatOdds(odds: number): string {
    if (odds >= 0.01) return `${(odds * 100).toFixed(1)}%`
    return `1 in ${Math.round(1 / odds).toLocaleString()}`
}

function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return Math.round(num).toLocaleString()
}

export default function SolsRngAuraOddsCalculator() {
    const [targetAura, setTargetAura] = useState('legendary')
    const [luckMultiplier, setLuckMultiplier] = useState(1)
    const [rollsPerMinute, setRollsPerMinute] = useState(10)

    const selectedAura = AURAS.find(a => a.id === targetAura)!
    const adjustedOdds = Math.min(1, selectedAura.odds * luckMultiplier)
    const expectedRolls = 1 / adjustedOdds
    const expectedMinutes = expectedRolls / rollsPerMinute
    const expectedHours = expectedMinutes / 60

    // Probability of getting at least one in N rolls
    const calcProbability = (rolls: number) => {
        return 1 - Math.pow(1 - adjustedOdds, rolls)
    }

    const probabilityIn10 = calcProbability(10)
    const probabilityIn100 = calcProbability(100)
    const probabilityIn1000 = calcProbability(1000)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-amber-950/20 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Sol&apos;s RNG Aura Odds Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Calculate expected rolls and time to get any aura
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="Use Luck potions and items to multiply your chances!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Target className="h-5 w-5 text-amber-400" />
                                Configure
                            </CardTitle>
                            <CardDescription>Set your target and luck</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Target Aura */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Target Aura</Label>
                                <Select value={targetAura} onValueChange={setTargetAura}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AURAS.map(aura => (
                                            <SelectItem key={aura.id} value={aura.id}>
                                                {aura.name} ({formatOdds(aura.odds)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Badge className={selectedAura.color}>
                                    Base odds: {formatOdds(selectedAura.odds)}
                                </Badge>
                            </div>

                            {/* Luck Multiplier */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Luck Multiplier</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100}
                                    step={0.1}
                                    value={luckMultiplier}
                                    onChange={(e) => setLuckMultiplier(Math.max(1, parseFloat(e.target.value) || 1))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">From potions, items, and events</p>
                            </div>

                            {/* Rolls per Minute */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Rolls per Minute</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={60}
                                    value={rollsPerMinute}
                                    onChange={(e) => setRollsPerMinute(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">How fast you can roll</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Results */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                Results
                            </CardTitle>
                            <CardDescription>Expected rolls and time</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Adjusted Odds */}
                            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg text-center">
                                <div className="text-sm text-zinc-400">Your Adjusted Odds</div>
                                <div className="text-3xl font-bold text-amber-400">
                                    {formatOdds(adjustedOdds)}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    {luckMultiplier}x luck applied
                                </div>
                            </div>

                            {/* Expected Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-400">{formatNumber(expectedRolls)}</div>
                                    <div className="text-sm text-zinc-500">Expected Rolls</div>
                                </div>
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        {expectedHours < 1
                                            ? `${Math.round(expectedMinutes)}m`
                                            : expectedHours < 24
                                                ? `${expectedHours.toFixed(1)}h`
                                                : `${(expectedHours / 24).toFixed(1)}d`
                                        }
                                    </div>
                                    <div className="text-sm text-zinc-500">Expected Time</div>
                                </div>
                            </div>

                            {/* Probability Table */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    Chance to get at least 1 in...
                                </h4>
                                <div className="space-y-1">
                                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                                        <span className="text-zinc-400">10 rolls</span>
                                        <span className="text-white font-medium">{(probabilityIn10 * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                                        <span className="text-zinc-400">100 rolls</span>
                                        <span className="text-white font-medium">{(probabilityIn100 * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-zinc-800/30 rounded">
                                        <span className="text-zinc-400">1,000 rolls</span>
                                        <span className="text-white font-medium">{(probabilityIn1000 * 100).toFixed(2)}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm">
                                <Info className="h-4 w-4 inline mr-1" />
                                <strong>Tip:</strong> Stack luck multipliers from potions and events for the best odds!
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
