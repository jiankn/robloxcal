'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowLeftRight, Sword, Zap, Sparkles, Trophy, ArrowRight } from 'lucide-react'

interface Weapon {
    id: number
    weapon_name: string
    base_damage: number
    attack_speed: number
    tier: string
    scaling_stat: string
}

interface Skill {
    id: number
    skill_name: string
    base_damage: number
    cooldown_sec: number
    tier: string
}

interface Transformation {
    id: number
    transformation_name: string
    damage_multiplier: number
    tier: string
}

const TIER_COLORS: Record<string, string> = {
    'S': 'bg-yellow-500/20 text-yellow-400',
    'A': 'bg-purple-500/20 text-purple-400',
    'B': 'bg-blue-500/20 text-blue-400',
    'C': 'bg-green-500/20 text-green-400',
    'D': 'bg-zinc-500/20 text-zinc-400'
}

export default function ComparePage() {
    const [compareType, setCompareType] = useState<'weapons' | 'skills' | 'transformations'>('weapons')
    const [items, setItems] = useState<any[]>([])
    const [selectedA, setSelectedA] = useState<string>('')
    const [selectedB, setSelectedB] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadItems()
    }, [compareType])

    async function loadItems() {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/v1/dps/config?game=afse`)
            const data = await res.json()

            if (compareType === 'weapons') setItems(data.weapons || [])
            else if (compareType === 'skills') setItems(data.skills || [])
            else setItems(data.transformations || [])

            setSelectedA('')
            setSelectedB('')
        } catch (err) {
            console.error('Failed to load items:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const itemA = items.find(i => i.id.toString() === selectedA)
    const itemB = items.find(i => i.id.toString() === selectedB)

    function getItemName(item: any): string {
        if (compareType === 'weapons') return item.weapon_name
        if (compareType === 'skills') return item.skill_name
        return item.transformation_name
    }

    function getDPS(item: any): number {
        if (compareType === 'weapons') return item.base_damage * item.attack_speed
        if (compareType === 'skills') return item.base_damage / item.cooldown_sec
        return item.damage_multiplier * 1000 // Rough approximation
    }

    function renderComparison() {
        if (!itemA || !itemB) return null

        const dpsA = getDPS(itemA)
        const dpsB = getDPS(itemB)
        const winner = dpsA > dpsB ? 'A' : dpsA < dpsB ? 'B' : 'tie'

        return (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {/* Item A */}
                <Card className={`bg-zinc-900/50 border-zinc-800 ${winner === 'A' ? 'ring-2 ring-green-500/50' : ''}`}>
                    <CardHeader className="text-center">
                        {winner === 'A' && (
                            <Badge className="mx-auto mb-2 bg-green-500/20 text-green-400">
                                <Trophy className="h-3 w-3 mr-1" />Winner
                            </Badge>
                        )}
                        <Badge className={`mx-auto ${TIER_COLORS[itemA.tier]}`}>{itemA.tier}-Tier</Badge>
                        <CardTitle className="text-white mt-2">{getItemName(itemA)}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {compareType === 'weapons' && (
                            <>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Base Damage</span>
                                    <span className="text-white font-medium">{itemA.base_damage.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Attack Speed</span>
                                    <span className="text-white font-medium">{itemA.attack_speed}x</span>
                                </div>
                            </>
                        )}
                        {compareType === 'skills' && (
                            <>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Base Damage</span>
                                    <span className="text-white font-medium">{itemA.base_damage.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Cooldown</span>
                                    <span className="text-white font-medium">{itemA.cooldown_sec}s</span>
                                </div>
                            </>
                        )}
                        {compareType === 'transformations' && (
                            <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                <span className="text-zinc-400">Multiplier</span>
                                <span className="text-white font-medium">{itemA.damage_multiplier}x</span>
                            </div>
                        )}
                        <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/30">
                            <span className="text-green-400">Effective DPS</span>
                            <span className="text-green-400 font-bold">{dpsA.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* VS */}
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                            <ArrowLeftRight className="h-8 w-8 text-zinc-400" />
                        </div>
                        <div className="text-2xl font-bold text-zinc-500">VS</div>
                        {winner !== 'tie' && (
                            <div className="mt-4 text-sm text-zinc-400">
                                {winner === 'A' ? getItemName(itemA) : getItemName(itemB)} wins by
                                <div className="text-lg font-bold text-green-400">
                                    {Math.abs(((dpsA - dpsB) / Math.min(dpsA, dpsB)) * 100).toFixed(1)}%
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Item B */}
                <Card className={`bg-zinc-900/50 border-zinc-800 ${winner === 'B' ? 'ring-2 ring-green-500/50' : ''}`}>
                    <CardHeader className="text-center">
                        {winner === 'B' && (
                            <Badge className="mx-auto mb-2 bg-green-500/20 text-green-400">
                                <Trophy className="h-3 w-3 mr-1" />Winner
                            </Badge>
                        )}
                        <Badge className={`mx-auto ${TIER_COLORS[itemB.tier]}`}>{itemB.tier}-Tier</Badge>
                        <CardTitle className="text-white mt-2">{getItemName(itemB)}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {compareType === 'weapons' && (
                            <>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Base Damage</span>
                                    <span className="text-white font-medium">{itemB.base_damage.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Attack Speed</span>
                                    <span className="text-white font-medium">{itemB.attack_speed}x</span>
                                </div>
                            </>
                        )}
                        {compareType === 'skills' && (
                            <>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Base Damage</span>
                                    <span className="text-white font-medium">{itemB.base_damage.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                    <span className="text-zinc-400">Cooldown</span>
                                    <span className="text-white font-medium">{itemB.cooldown_sec}s</span>
                                </div>
                            </>
                        )}
                        {compareType === 'transformations' && (
                            <div className="flex justify-between p-2 bg-zinc-800/50 rounded">
                                <span className="text-zinc-400">Multiplier</span>
                                <span className="text-white font-medium">{itemB.damage_multiplier}x</span>
                            </div>
                        )}
                        <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/30">
                            <span className="text-green-400">Effective DPS</span>
                            <span className="text-green-400 font-bold">{dpsB.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-violet-500/20 text-violet-300 border-violet-500/30">
                        <ArrowLeftRight className="h-3 w-3 mr-1" />
                        Compare Tool
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Compare Items
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Compare weapons, skills, or transformations side-by-side to find the best option.
                    </p>
                </div>

                {/* Type Selector */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                    <CardContent className="py-4">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Button
                                variant={compareType === 'weapons' ? 'default' : 'outline'}
                                onClick={() => setCompareType('weapons')}
                                className="gap-2"
                            >
                                <Sword className="h-4 w-4" />Weapons
                            </Button>
                            <Button
                                variant={compareType === 'skills' ? 'default' : 'outline'}
                                onClick={() => setCompareType('skills')}
                                className="gap-2"
                            >
                                <Zap className="h-4 w-4" />Skills
                            </Button>
                            <Button
                                variant={compareType === 'transformations' ? 'default' : 'outline'}
                                onClick={() => setCompareType('transformations')}
                                className="gap-2"
                            >
                                <Sparkles className="h-4 w-4" />Transformations
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Selectors */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white">Item A</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select value={selectedA} onValueChange={setSelectedA} disabled={isLoading}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder={isLoading ? 'Loading...' : `Select ${compareType.slice(0, -1)}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {items.map(item => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            [{item.tier}] {getItemName(item)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white">Item B</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select value={selectedB} onValueChange={setSelectedB} disabled={isLoading}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder={isLoading ? 'Loading...' : `Select ${compareType.slice(0, -1)}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {items.filter(i => i.id.toString() !== selectedA).map(item => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            [{item.tier}] {getItemName(item)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                </div>

                {/* Comparison Result */}
                {renderComparison()}

                {/* Empty State */}
                {(!selectedA || !selectedB) && (
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-12 text-center">
                            <ArrowLeftRight className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">Select Two Items</h3>
                            <p className="text-zinc-400">Choose two {compareType} above to compare them side-by-side.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
