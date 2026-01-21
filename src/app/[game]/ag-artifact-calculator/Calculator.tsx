'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Shield, Sword, Zap, Heart, Target, TrendingUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const GAME_SLUG = 'anime-guardians'

// Artifact sets
const ARTIFACT_SETS = [
    { id: 'warrior', name: 'Warrior Set', bonus2: '+15% ATK', bonus4: '+30% ATK, +10% Crit' },
    { id: 'guardian', name: 'Guardian Set', bonus2: '+20% HP', bonus4: '+40% HP, +Regen' },
    { id: 'swift', name: 'Swift Set', bonus2: '+10% Speed', bonus4: '+25% Speed, +CD Reduce' },
    { id: 'destroyer', name: 'Destroyer Set', bonus2: '+20% ATK', bonus4: '+50% ATK' },
    { id: 'immortal', name: 'Immortal Set', bonus2: '+25% HP', bonus4: '+50% HP, +3% Regen/s' },
]

// Artifact rarities
const RARITIES = [
    { id: 'common', name: 'Common', multiplier: 0.1, color: 'text-zinc-400' },
    { id: 'uncommon', name: 'Uncommon', multiplier: 0.2, color: 'text-green-400' },
    { id: 'rare', name: 'Rare', multiplier: 0.35, color: 'text-blue-400' },
    { id: 'epic', name: 'Epic', multiplier: 0.5, color: 'text-purple-400' },
    { id: 'legendary', name: 'Legendary', multiplier: 0.75, color: 'text-yellow-400' },
    { id: 'mythic', name: 'Mythic', multiplier: 1.0, color: 'text-red-400' },
]

// Stat types
const STAT_TYPES = [
    { id: 'atk', name: 'ATK%', icon: Sword },
    { id: 'hp', name: 'HP%', icon: Heart },
    { id: 'def', name: 'DEF%', icon: Shield },
    { id: 'speed', name: 'Speed%', icon: Zap },
    { id: 'crit', name: 'Crit%', icon: Target },
]

export default function AgArtifactCalculator() {
    const [selectedSet, setSelectedSet] = useState<string>('')
    const [selectedRarity, setSelectedRarity] = useState<string>('epic')
    const [mainStat, setMainStat] = useState<string>('atk')
    const [artifactLevel, setArtifactLevel] = useState<number>(16)
    const [pieceCount, setPieceCount] = useState<number>(4)
    const [result, setResult] = useState<any>(null)

    const handleCalculate = () => {
        const set = ARTIFACT_SETS.find(s => s.id === selectedSet)
        const rarity = RARITIES.find(r => r.id === selectedRarity)
        const stat = STAT_TYPES.find(s => s.id === mainStat)

        if (!set || !rarity || !stat) {
            setResult({ error: 'Please select all options' })
            return
        }

        // Calculate main stat value
        const baseStatValue = rarity.multiplier * 100
        const levelBonus = artifactLevel * 2.5
        const totalMainStat = Math.round(baseStatValue + levelBonus)

        // Calculate total stats with all pieces at same level
        const totalSetStat = totalMainStat * pieceCount

        // Determine set bonuses
        const set2Active = pieceCount >= 2
        const set4Active = pieceCount >= 4

        setResult({
            setName: set.name,
            rarity: rarity.name,
            rarityColor: rarity.color,
            mainStatName: stat.name,
            mainStatValue: totalMainStat,
            totalSetStat,
            pieceCount,
            level: artifactLevel,
            set2Active,
            set4Active,
            set2Bonus: set.bonus2,
            set4Bonus: set.bonus4,
        })
    }

    return (
        <CalculatorLayout
            title="Artifact Calculator"
            description="Calculate artifact set bonuses and stat totals for your units."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Shield className="h-5 w-5 text-purple-500" />
                            Artifact Configuration
                        </CardTitle>
                        <CardDescription>Configure your artifact build</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Set Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Artifact Set</label>
                            <Select value={selectedSet} onValueChange={setSelectedSet}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue placeholder="Select set..." />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {ARTIFACT_SETS.map(set => (
                                        <SelectItem key={set.id} value={set.id} className="text-white hover:bg-zinc-800">
                                            {set.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Rarity Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Artifact Rarity</label>
                            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {RARITIES.map(rarity => (
                                        <SelectItem key={rarity.id} value={rarity.id} className="text-white hover:bg-zinc-800">
                                            <span className={rarity.color}>{rarity.name}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Main Stat */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Main Stat</label>
                            <Select value={mainStat} onValueChange={setMainStat}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {STAT_TYPES.map(stat => (
                                        <SelectItem key={stat.id} value={stat.id} className="text-white hover:bg-zinc-800">
                                            {stat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Piece Count */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Number of Pieces</label>
                            <div className="flex gap-2">
                                {[2, 3, 4].map(count => (
                                    <Button
                                        key={count}
                                        variant={pieceCount === count ? 'default' : 'outline'}
                                        onClick={() => setPieceCount(count)}
                                        className={pieceCount === count ? 'bg-purple-600' : 'border-zinc-700'}
                                    >
                                        {count}pc
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Artifact Level */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Artifact Level (each)</label>
                            <Input
                                type="number"
                                min="1"
                                max="20"
                                value={artifactLevel}
                                onChange={(e) => setArtifactLevel(Math.min(20, Math.max(1, Number(e.target.value))))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            disabled={!selectedSet}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-2"
                        >
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Calculate Stats
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result && !result.error ? (
                        <div className="grid gap-4">
                            {/* Main Stat Result */}
                            <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-purple-500">
                                <CardContent className="p-6">
                                    <div className="text-zinc-400 text-sm mb-1">Single Piece {result.mainStatName}</div>
                                    <div className="text-3xl font-bold text-purple-400">
                                        +{result.mainStatValue}%
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-1">
                                        Level {result.level} {result.rarity}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Total Stats */}
                            <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-pink-500">
                                <CardContent className="p-6">
                                    <div className="text-zinc-400 text-sm mb-1">Total {result.mainStatName} ({result.pieceCount} pieces)</div>
                                    <div className="text-3xl font-bold text-pink-400">
                                        +{result.totalSetStat}%
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Set Bonuses */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-zinc-400">{result.setName} Bonuses</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0 space-y-3">
                                    <div className={`flex items-center justify-between p-2 rounded ${result.set2Active ? 'bg-green-500/10' : 'bg-zinc-800/50'}`}>
                                        <span className="text-sm">2-Piece</span>
                                        <Badge variant={result.set2Active ? 'default' : 'outline'} className={result.set2Active ? 'bg-green-600' : 'border-zinc-700'}>
                                            {result.set2Bonus}
                                        </Badge>
                                    </div>
                                    <div className={`flex items-center justify-between p-2 rounded ${result.set4Active ? 'bg-green-500/10' : 'bg-zinc-800/50'}`}>
                                        <span className="text-sm">4-Piece</span>
                                        <Badge variant={result.set4Active ? 'default' : 'outline'} className={result.set4Active ? 'bg-green-600' : 'border-zinc-700'}>
                                            {result.set4Bonus}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : result?.error ? (
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardContent className="p-6 text-center text-zinc-400">
                                {result.error}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Target className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Configure artifacts to see calculations</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
