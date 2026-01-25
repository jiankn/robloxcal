'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Info, Target, Sword, Shield, Zap, Cherry, Gun } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Build presets
const BUILD_PRESETS = [
    { id: 'fruit', name: 'Fruit Build', melee: 0, defense: 25, sword: 0, gun: 0, fruit: 75 },
    { id: 'sword', name: 'Sword Build', melee: 25, defense: 25, sword: 50, gun: 0, fruit: 0 },
    { id: 'hybrid', name: 'Hybrid Build', melee: 15, defense: 25, sword: 30, gun: 0, fruit: 30 },
    { id: 'gun', name: 'Gun Build', melee: 0, defense: 25, sword: 0, gun: 75, fruit: 0 },
    { id: 'custom', name: 'Custom', melee: 0, defense: 0, sword: 0, gun: 0, fruit: 0 },
]

// Stat info
const STATS = [
    { id: 'melee', name: 'Melee', icon: Zap, color: 'text-red-400', description: 'Increases melee damage' },
    { id: 'defense', name: 'Defense', icon: Shield, color: 'text-blue-400', description: 'Reduces damage taken' },
    { id: 'sword', name: 'Sword', icon: Sword, color: 'text-orange-400', description: 'Increases sword damage' },
    { id: 'gun', name: 'Gun', icon: Gun, color: 'text-yellow-400', description: 'Increases gun damage' },
    { id: 'fruit', name: 'Fruit', icon: Cherry, color: 'text-purple-400', description: 'Increases fruit damage' },
]

export default function BloxFruitsStatCalculator() {
    const [level, setLevel] = useState(2550)
    const [selectedPreset, setSelectedPreset] = useState('fruit')
    const [stats, setStats] = useState({
        melee: 0,
        defense: 625,
        sword: 0,
        gun: 0,
        fruit: 1925,
    })

    // Total stat points = level * 3 (at max level 2550, you get 7650 points)
    const totalPoints = level * 3
    const usedPoints = stats.melee + stats.defense + stats.sword + stats.gun + stats.fruit
    const remainingPoints = totalPoints - usedPoints

    const handlePresetChange = (presetId: string) => {
        setSelectedPreset(presetId)
        if (presetId !== 'custom') {
            const preset = BUILD_PRESETS.find(p => p.id === presetId)
            if (preset) {
                const pointsPerPercent = totalPoints / 100
                setStats({
                    melee: Math.floor(preset.melee * pointsPerPercent),
                    defense: Math.floor(preset.defense * pointsPerPercent),
                    sword: Math.floor(preset.sword * pointsPerPercent),
                    gun: Math.floor(preset.gun * pointsPerPercent),
                    fruit: Math.floor(preset.fruit * pointsPerPercent),
                })
            }
        }
    }

    const handleStatChange = (statId: string, value: number) => {
        setSelectedPreset('custom')
        setStats(prev => ({ ...prev, [statId]: Math.min(value, totalPoints) }))
    }

    const handleLevelChange = (newLevel: number) => {
        setLevel(newLevel)
        // Recalculate stats based on current percentages
        if (selectedPreset !== 'custom') {
            handlePresetChange(selectedPreset)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Blox Fruits Stat Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Optimize your stat point distribution for the best build
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="You get 3 stat points per level. At max level 2550, you have 7650 total points!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Target className="h-5 w-5 text-indigo-400" />
                                Configure Build
                            </CardTitle>
                            <CardDescription>Set your level and choose a build</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Level Input */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Level (1-2550)</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        min={1}
                                        max={2550}
                                        value={level}
                                        onChange={(e) => handleLevelChange(Math.min(2550, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="bg-zinc-800 border-zinc-700"
                                    />
                                </div>
                                <Slider
                                    value={[level]}
                                    onValueChange={([v]) => handleLevelChange(v)}
                                    min={1}
                                    max={2550}
                                    step={1}
                                    className="mt-2"
                                />
                            </div>

                            {/* Build Preset */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Build Preset</Label>
                                <Select value={selectedPreset} onValueChange={handlePresetChange}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BUILD_PRESETS.map(preset => (
                                            <SelectItem key={preset.id} value={preset.id}>
                                                {preset.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Stat Sliders */}
                            <div className="space-y-4">
                                {STATS.map(stat => {
                                    const StatIcon = stat.icon
                                    const value = stats[stat.id as keyof typeof stats]
                                    const percentage = totalPoints > 0 ? ((value / totalPoints) * 100).toFixed(1) : '0'

                                    return (
                                        <div key={stat.id} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <Label className={`flex items-center gap-2 ${stat.color}`}>
                                                    <StatIcon className="h-4 w-4" />
                                                    {stat.name}
                                                </Label>
                                                <span className="text-sm text-zinc-400">
                                                    {value.toLocaleString()} ({percentage}%)
                                                </span>
                                            </div>
                                            <Slider
                                                value={[value]}
                                                onValueChange={([v]) => handleStatChange(stat.id, v)}
                                                min={0}
                                                max={totalPoints}
                                                step={1}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Results */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Info className="h-5 w-5 text-green-400" />
                                Build Summary
                            </CardTitle>
                            <CardDescription>Your current stat distribution</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Points Overview */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-indigo-400">{totalPoints.toLocaleString()}</div>
                                    <div className="text-sm text-zinc-500">Total Points</div>
                                </div>
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className={`text-2xl font-bold ${remainingPoints >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {remainingPoints.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-zinc-500">Remaining</div>
                                </div>
                            </div>

                            {/* Stat Breakdown */}
                            <div className="space-y-2">
                                {STATS.map(stat => {
                                    const StatIcon = stat.icon
                                    const value = stats[stat.id as keyof typeof stats]
                                    const percentage = totalPoints > 0 ? (value / totalPoints) * 100 : 0

                                    return (
                                        <div key={stat.id} className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                                            <StatIcon className={`h-5 w-5 ${stat.color}`} />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-white font-medium">{stat.name}</span>
                                                    <span className="text-sm text-zinc-400">{value.toLocaleString()}</span>
                                                </div>
                                                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-500 rounded-full transition-all"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Warning if over limit */}
                            {remainingPoints < 0 && (
                                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                    ⚠️ You've allocated {Math.abs(remainingPoints).toLocaleString()} more points than available!
                                </div>
                            )}

                            {/* Tip */}
                            <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 text-sm">
                                💡 <strong>Tip:</strong> Most builds put 25% into Defense for survivability, then focus remaining points on your main damage stat.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
