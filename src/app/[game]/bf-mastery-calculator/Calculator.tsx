'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TrendingUp, Clock, Target, Info } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Mastery levels and EXP requirements (simplified model)
const MASTERY_MILESTONES = [
    { level: 1, totalExp: 0 },
    { level: 50, totalExp: 5000 },
    { level: 100, totalExp: 25000 },
    { level: 150, totalExp: 75000 },
    { level: 200, totalExp: 175000 },
    { level: 250, totalExp: 350000 },
    { level: 300, totalExp: 600000 },
    { level: 350, totalExp: 1000000 },
    { level: 400, totalExp: 1600000 },
    { level: 450, totalExp: 2500000 },
    { level: 500, totalExp: 4000000 },
    { level: 600, totalExp: 8000000 },
]

// Training methods
const TRAINING_METHODS = [
    { id: 'grind-mobs', name: 'Grinding Mobs', expPerMin: 3000, description: 'Kill NPCs at your level' },
    { id: 'raids', name: 'Raids', expPerMin: 5000, description: 'Complete raids for high EXP' },
    { id: 'sea-beasts', name: 'Sea Beasts', expPerMin: 4000, description: 'Hunt sea beasts for consistent EXP' },
    { id: 'boss-farming', name: 'Boss Farming', expPerMin: 6000, description: 'Farm bosses for maximum EXP' },
]

function getMasteryExp(level: number): number {
    // Interpolate between milestones
    for (let i = 0; i < MASTERY_MILESTONES.length - 1; i++) {
        const current = MASTERY_MILESTONES[i]
        const next = MASTERY_MILESTONES[i + 1]
        if (level >= current.level && level < next.level) {
            const progress = (level - current.level) / (next.level - current.level)
            return Math.floor(current.totalExp + progress * (next.totalExp - current.totalExp))
        }
    }
    // Beyond max milestone
    const last = MASTERY_MILESTONES[MASTERY_MILESTONES.length - 1]
    return last.totalExp + (level - last.level) * 20000
}

function formatTime(minutes: number): string {
    if (minutes < 60) return `${Math.ceil(minutes)} min`
    const hours = Math.floor(minutes / 60)
    const mins = Math.ceil(minutes % 60)
    if (hours < 24) return `${hours}h ${mins}m`
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}d ${remainingHours}h`
}

export default function BloxFruitsMasteryCalculator() {
    const [currentMastery, setCurrentMastery] = useState(0)
    const [targetMastery, setTargetMastery] = useState(300)
    const [method, setMethod] = useState('grind-mobs')

    const currentExp = getMasteryExp(currentMastery)
    const targetExp = getMasteryExp(targetMastery)
    const expNeeded = Math.max(0, targetExp - currentExp)

    const selectedMethod = TRAINING_METHODS.find(m => m.id === method)!
    const minutesNeeded = expNeeded / selectedMethod.expPerMin

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Blox Fruits Mastery Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Calculate time to reach your target mastery level
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="Higher mastery unlocks more moves and increases their damage!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Target className="h-5 w-5 text-indigo-400" />
                                Mastery Goals
                            </CardTitle>
                            <CardDescription>Set your current and target mastery</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Current Mastery */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Current Mastery Level</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={600}
                                    value={currentMastery}
                                    onChange={(e) => setCurrentMastery(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>

                            {/* Target Mastery */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Target Mastery Level</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={600}
                                    value={targetMastery}
                                    onChange={(e) => setTargetMastery(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>

                            {/* Training Method */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Training Method</Label>
                                <Select value={method} onValueChange={setMethod}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TRAINING_METHODS.map(m => (
                                            <SelectItem key={m.id} value={m.id}>
                                                {m.name} (~{m.expPerMin.toLocaleString()} EXP/min)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-zinc-500">{selectedMethod.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Results */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-400" />
                                Results
                            </CardTitle>
                            <CardDescription>Estimated time and EXP needed</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Main Results */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-400">{expNeeded.toLocaleString()}</div>
                                    <div className="text-sm text-zinc-500">EXP Needed</div>
                                </div>
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        <Clock className="h-5 w-5 inline mr-1" />
                                        {formatTime(minutesNeeded)}
                                    </div>
                                    <div className="text-sm text-zinc-500">Estimated Time</div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm text-zinc-400">
                                    <span>Lv.{currentMastery}</span>
                                    <span>Lv.{targetMastery}</span>
                                </div>
                                <div className="h-3 bg-zinc-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                        style={{ width: `${Math.min(100, (currentMastery / targetMastery) * 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Milestones */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-zinc-400">Key Milestones</h4>
                                <div className="space-y-1">
                                    {MASTERY_MILESTONES.filter(m => m.level > currentMastery && m.level <= targetMastery).slice(0, 4).map(milestone => (
                                        <div key={milestone.level} className="flex justify-between text-sm p-2 bg-zinc-800/30 rounded">
                                            <span className="text-white">Level {milestone.level}</span>
                                            <span className="text-zinc-400">{milestone.totalExp.toLocaleString()} total EXP</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 text-sm">
                                <Info className="h-4 w-4 inline mr-1" />
                                <strong>Tip:</strong> Enable 2x EXP codes or game passes to cut this time in half!
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
