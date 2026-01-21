'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Hammer, Sword, Shield, Zap, Target, TrendingUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const GAME_SLUG = 'the-forge'

// Ore types with their properties
const ORES = [
    { id: 'copper', name: 'Copper', tier: 1, baseMultiplier: 1.0, color: 'text-orange-400' },
    { id: 'iron', name: 'Iron', tier: 2, baseMultiplier: 1.5, color: 'text-zinc-400' },
    { id: 'gold', name: 'Gold', tier: 3, baseMultiplier: 2.0, color: 'text-yellow-400' },
    { id: 'diamond', name: 'Diamond', tier: 4, baseMultiplier: 3.0, color: 'text-cyan-400' },
    { id: 'emerald', name: 'Emerald', tier: 5, baseMultiplier: 4.0, color: 'text-green-400' },
    { id: 'ruby', name: 'Ruby', tier: 6, baseMultiplier: 5.0, color: 'text-red-400' },
    { id: 'obsidian', name: 'Obsidian', tier: 7, baseMultiplier: 7.0, color: 'text-purple-400' },
    { id: 'mythril', name: 'Mythril', tier: 8, baseMultiplier: 10.0, color: 'text-blue-400' },
]

// Equipment classes based on total value
const EQUIPMENT_CLASSES = [
    { name: 'Common', minValue: 0, color: 'bg-zinc-500' },
    { name: 'Uncommon', minValue: 50, color: 'bg-green-500' },
    { name: 'Rare', minValue: 150, color: 'bg-blue-500' },
    { name: 'Epic', minValue: 400, color: 'bg-purple-500' },
    { name: 'Legendary', minValue: 800, color: 'bg-yellow-500' },
    { name: 'Mythic', minValue: 1500, color: 'bg-red-500' },
]

// Possible traits
const TRAITS = [
    { id: 'sharp', name: 'Sharp', effect: '+15% Damage', chance: 20 },
    { id: 'sturdy', name: 'Sturdy', effect: '+20% Defense', chance: 20 },
    { id: 'swift', name: 'Swift', effect: '+10% Attack Speed', chance: 15 },
    { id: 'vampiric', name: 'Vampiric', effect: 'Lifesteal 5%', chance: 10 },
    { id: 'explosive', name: 'Explosive', effect: 'AoE Damage', chance: 8 },
    { id: 'legendary', name: 'Legendary', effect: '+50% All Stats', chance: 2 },
]

export default function ForgeCalculator() {
    const [selectedOre, setSelectedOre] = useState<string>('')
    const [oreCount, setOreCount] = useState<number>(10)
    const [craftType, setCraftType] = useState<'weapon' | 'armor'>('weapon')
    const [result, setResult] = useState<any>(null)

    const handleCalculate = () => {
        const ore = ORES.find(o => o.id === selectedOre)
        if (!ore) {
            setResult({ error: 'Please select an ore type.' })
            return
        }

        // Calculate base value
        const baseValue = oreCount * ore.baseMultiplier * (ore.tier * 2)
        const totalValue = baseValue * (craftType === 'weapon' ? 1.0 : 0.85)

        // Determine equipment class
        let equipmentClass = EQUIPMENT_CLASSES[0]
        for (const ec of EQUIPMENT_CLASSES) {
            if (totalValue >= ec.minValue) {
                equipmentClass = ec
            }
        }

        // Calculate trait probabilities
        const traitChances = TRAITS.map(trait => ({
            ...trait,
            probability: Math.min(100, trait.chance + (ore.tier * 2))
        }))

        // Calculate stats
        const baseStats = {
            damage: craftType === 'weapon' ? Math.round(baseValue * 0.8) : 0,
            defense: craftType === 'armor' ? Math.round(baseValue * 0.9) : 0,
            durability: Math.round(baseValue * 0.5 + ore.tier * 10),
        }

        setResult({
            oreName: ore.name,
            oreCount,
            craftType,
            totalValue: Math.round(totalValue),
            equipmentClass,
            baseStats,
            traitChances: traitChances.slice(0, 4),
            expectedTraits: Math.floor(ore.tier / 2) + 1,
        })
    }

    const selectedOreData = ORES.find(o => o.id === selectedOre)

    return (
        <CalculatorLayout
            title="Forge Calculator"
            description="Calculate weapon and armor stats based on ore type and quantity."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Hammer className="h-5 w-5 text-orange-500" />
                            Forge Configuration
                        </CardTitle>
                        <CardDescription>Select ore type and craft settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Ore Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Ore Type</label>
                            <Select value={selectedOre} onValueChange={setSelectedOre}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue placeholder="Select ore..." />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {ORES.map(ore => (
                                        <SelectItem key={ore.id} value={ore.id} className="text-white hover:bg-zinc-800">
                                            <span className={`flex items-center gap-2 ${ore.color}`}>
                                                {ore.name}
                                                <span className="text-zinc-500 text-xs">
                                                    (Tier {ore.tier} • {ore.baseMultiplier}x)
                                                </span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Ore Count */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Ore Amount</label>
                            <Input
                                type="number"
                                min="1"
                                max="1000"
                                value={oreCount}
                                onChange={(e) => setOreCount(Math.max(1, Number(e.target.value)))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        {/* Craft Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Craft Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={craftType === 'weapon' ? 'default' : 'outline'}
                                    onClick={() => setCraftType('weapon')}
                                    className={craftType === 'weapon'
                                        ? 'bg-orange-600 hover:bg-orange-500'
                                        : 'border-zinc-700'}
                                >
                                    <Sword className="h-4 w-4 mr-2" />
                                    Weapon
                                </Button>
                                <Button
                                    variant={craftType === 'armor' ? 'default' : 'outline'}
                                    onClick={() => setCraftType('armor')}
                                    className={craftType === 'armor'
                                        ? 'bg-blue-600 hover:bg-blue-500'
                                        : 'border-zinc-700'}
                                >
                                    <Shield className="h-4 w-4 mr-2" />
                                    Armor
                                </Button>
                            </div>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            disabled={!selectedOre}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2"
                        >
                            <Hammer className="h-4 w-4 mr-2" />
                            Forge Equipment
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result && !result.error ? (
                        <div className="grid gap-4">
                            {/* Equipment Class */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardContent className="p-6 text-center">
                                    <div className="text-zinc-400 text-sm mb-2">Predicted Equipment Class</div>
                                    <Badge className={`${result.equipmentClass.color} text-white text-lg px-4 py-1`}>
                                        {result.equipmentClass.name}
                                    </Badge>
                                    <div className="text-xs text-zinc-500 mt-2">
                                        Total Value: {result.totalValue}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats */}
                            <Card className="bg-zinc-900/50 border-zinc-800 border-l-4 border-l-orange-500">
                                <CardContent className="p-6">
                                    <div className="text-zinc-400 text-sm mb-3">Predicted Stats</div>
                                    <div className="space-y-2">
                                        {craftType === 'weapon' && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-400">Damage:</span>
                                                <span className="text-red-400 font-bold">{result.baseStats.damage}</span>
                                            </div>
                                        )}
                                        {craftType === 'armor' && (
                                            <div className="flex justify-between">
                                                <span className="text-zinc-400">Defense:</span>
                                                <span className="text-blue-400 font-bold">{result.baseStats.defense}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Durability:</span>
                                            <span className="text-green-400 font-bold">{result.baseStats.durability}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Trait Chances */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm text-zinc-400">
                                        Trait Probabilities (Expected: ~{result.expectedTraits} traits)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-2">
                                        {result.traitChances.map((trait: any) => (
                                            <div key={trait.id} className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-white text-sm">{trait.name}</span>
                                                    <span className="text-zinc-500 text-xs ml-2">{trait.effect}</span>
                                                </div>
                                                <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                                    {trait.probability}%
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : result?.error ? (
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardContent className="p-6 text-center">
                                <div className="text-zinc-400">{result.error}</div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Target className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Configure forge settings to see predictions</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
