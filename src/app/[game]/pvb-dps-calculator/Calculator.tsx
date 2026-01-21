'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Sword, Zap, TrendingUp, Target, Sparkles } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const GAME_SLUG = 'plants-vs-brainrots'

// Plants data based on game mechanics
const PLANTS = [
    { id: 'peashooter', name: 'Peashooter', baseDamage: 20, attackSpeed: 1.5, rarity: 'Common' },
    { id: 'sunflower', name: 'Sunflower', baseDamage: 5, attackSpeed: 2.0, rarity: 'Common' },
    { id: 'wallnut', name: 'Wall-nut', baseDamage: 0, attackSpeed: 0, rarity: 'Common' },
    { id: 'snowpea', name: 'Snow Pea', baseDamage: 20, attackSpeed: 1.5, rarity: 'Uncommon' },
    { id: 'chomper', name: 'Chomper', baseDamage: 150, attackSpeed: 0.5, rarity: 'Uncommon' },
    { id: 'repeater', name: 'Repeater', baseDamage: 40, attackSpeed: 1.5, rarity: 'Rare' },
    { id: 'gatlingpea', name: 'Gatling Pea', baseDamage: 80, attackSpeed: 1.5, rarity: 'Epic' },
    { id: 'torchwood', name: 'Torchwood', baseDamage: 0, attackSpeed: 0, rarity: 'Rare' },
    { id: 'wintermelon', name: 'Winter Melon', baseDamage: 100, attackSpeed: 1.0, rarity: 'Legendary' },
]

// Mutations with damage multipliers
const MUTATIONS = [
    { id: 'none', name: 'No Mutation', multiplier: 1.0 },
    { id: 'gold', name: 'Gold', multiplier: 1.5 },
    { id: 'diamond', name: 'Diamond', multiplier: 2.0 },
    { id: 'neon', name: 'Neon', multiplier: 2.5 },
    { id: 'frozen', name: 'Frozen', multiplier: 3.0 },
]

// Rarity colors
const RARITY_COLORS: Record<string, string> = {
    'Common': 'text-zinc-400',
    'Uncommon': 'text-green-400',
    'Rare': 'text-blue-400',
    'Epic': 'text-purple-400',
    'Legendary': 'text-yellow-400',
}

export default function PvbDpsCalculator() {
    const [selectedPlant, setSelectedPlant] = useState<string>('')
    const [selectedMutation, setSelectedMutation] = useState<string>('none')
    const [plantCount, setPlantCount] = useState<number>(1)
    const [bonusMultiplier, setBonusMultiplier] = useState<number>(1)
    const [result, setResult] = useState<any>(null)

    const handleCalculate = () => {
        const plant = PLANTS.find(p => p.id === selectedPlant)
        const mutation = MUTATIONS.find(m => m.id === selectedMutation)

        if (!plant || plant.attackSpeed === 0) {
            setResult({
                dps: 0,
                dpm: 0,
                damagePerHit: 0,
                attackSpeed: 0,
                totalDps: 0,
                message: plant ? 'This plant does not deal direct damage.' : 'Select a plant to calculate.'
            })
            return
        }

        const damagePerHit = plant.baseDamage * (mutation?.multiplier || 1) * bonusMultiplier
        const dps = damagePerHit * plant.attackSpeed
        const totalDps = dps * plantCount
        const dpm = totalDps * 60

        setResult({
            dps,
            dpm,
            damagePerHit,
            attackSpeed: plant.attackSpeed,
            totalDps,
            plantName: plant.name,
            mutation: mutation?.name,
            plantCount
        })
    }

    const selectedPlantData = PLANTS.find(p => p.id === selectedPlant)

    return (
        <CalculatorLayout
            title="DPS Calculator"
            description="Calculate damage per second for your plants with mutations and bonuses."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Sword className="h-5 w-5 text-green-500" />
                            Plant Configuration
                        </CardTitle>
                        <CardDescription>Select your plant and modifiers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Plant Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Select Plant</label>
                            <Select value={selectedPlant} onValueChange={setSelectedPlant}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue placeholder="Choose a plant..." />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {PLANTS.map(plant => (
                                        <SelectItem key={plant.id} value={plant.id} className="text-white hover:bg-zinc-800">
                                            <span className="flex items-center gap-2">
                                                <span>{plant.name}</span>
                                                <span className={`text-xs ${RARITY_COLORS[plant.rarity]}`}>
                                                    ({plant.rarity})
                                                </span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {selectedPlantData && (
                                <div className="text-xs text-zinc-500 mt-1">
                                    Base: {selectedPlantData.baseDamage} DMG × {selectedPlantData.attackSpeed}/s
                                </div>
                            )}
                        </div>

                        {/* Mutation Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                                Mutation
                            </label>
                            <Select value={selectedMutation} onValueChange={setSelectedMutation}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {MUTATIONS.map(mutation => (
                                        <SelectItem key={mutation.id} value={mutation.id} className="text-white hover:bg-zinc-800">
                                            {mutation.name} ({mutation.multiplier}x)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Plant Count */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Number of Plants</label>
                            <Input
                                type="number"
                                min="1"
                                max="100"
                                value={plantCount}
                                onChange={(e) => setPlantCount(Math.max(1, Number(e.target.value)))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        {/* Bonus Multiplier */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Bonus Multiplier (Gamepasses, etc.)</label>
                            <Input
                                type="number"
                                min="1"
                                step="0.1"
                                value={bonusMultiplier}
                                onChange={(e) => setBonusMultiplier(Math.max(1, Number(e.target.value)))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            disabled={!selectedPlant}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2"
                        >
                            <Zap className="h-4 w-4 mr-2" />
                            Calculate DPS
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result ? (
                        result.message ? (
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-6 text-center">
                                    <div className="text-zinc-400">{result.message}</div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-green-500">
                                    <CardContent className="p-6">
                                        <div className="text-zinc-400 text-sm mb-1">Single Plant DPS</div>
                                        <div className="text-3xl font-bold text-green-400">
                                            {result.dps.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                                        </div>
                                        <div className="text-xs text-zinc-500 mt-1">
                                            {result.damagePerHit.toFixed(1)} DMG × {result.attackSpeed}/s
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-emerald-500">
                                    <CardContent className="p-6">
                                        <div className="text-zinc-400 text-sm mb-1">Total DPS ({result.plantCount}x {result.plantName})</div>
                                        <div className="text-3xl font-bold text-emerald-400">
                                            {result.totalDps.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-yellow-500">
                                    <CardContent className="p-6">
                                        <div className="text-zinc-400 text-sm mb-1">Damage Per Minute</div>
                                        <div className="text-3xl font-bold text-yellow-400">
                                            {result.dpm.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-zinc-900/30 border-zinc-800">
                                    <CardContent className="p-4">
                                        <div className="text-sm text-zinc-500">
                                            <div className="flex justify-between">
                                                <span>Plant:</span>
                                                <span className="text-white">{result.plantName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Mutation:</span>
                                                <span className="text-white">{result.mutation}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Target className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Select a plant to calculate DPS</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
