'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { TrendingUp, Fish, Sparkles, DollarSign, Clock } from 'lucide-react'

const GAME_SLUG = 'fisch'

// 钓鱼地点数据
const LOCATIONS = [
    { name: 'Lake', avgValue: 50, fishPerMin: 2.5 },
    { name: 'River', avgValue: 80, fishPerMin: 2.0 },
    { name: 'Pond', avgValue: 120, fishPerMin: 3.0 },
    { name: 'Ocean', avgValue: 200, fishPerMin: 1.5 },
    { name: 'Deep Sea', avgValue: 500, fishPerMin: 1.0 },
]

// 装备加成
const GEAR_SETS = [
    { name: 'Starter Set', valueMulti: 1.0, speedMulti: 1.0 },
    { name: 'Bronze Set', valueMulti: 1.2, speedMulti: 1.1 },
    { name: 'Silver Set', valueMulti: 1.5, speedMulti: 1.25 },
    { name: 'Gold Set', valueMulti: 2.0, speedMulti: 1.5 },
    { name: 'Platinum Set', valueMulti: 3.0, speedMulti: 2.0 },
]

function formatMoney(value: number): string {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${Math.round(value)}`
}

export default function FischProfitOptimizerCalculator() {
    const [location, setLocation] = useState<string>('Lake')
    const [gearSet, setGearSet] = useState<string>('Starter Set')
    const [hoursPlayed, setHoursPlayed] = useState<number>(1)
    const [extraValueBonus, setExtraValueBonus] = useState<number>(0)
    const [calculated, setCalculated] = useState(false)

    const handleCalculate = () => {
        setCalculated(true)
    }

    const loc = LOCATIONS.find(l => l.name === location)
    const gear = GEAR_SETS.find(g => g.name === gearSet)

    const valueMulti = (gear?.valueMulti || 1) * (1 + extraValueBonus / 100)
    const speedMulti = gear?.speedMulti || 1

    const fishPerMinute = (loc?.fishPerMin || 2) * speedMulti
    const avgFishValue = (loc?.avgValue || 50) * valueMulti

    const totalCatches = fishPerMinute * 60 * hoursPlayed
    const totalEarnings = totalCatches * avgFishValue
    const profitPerHour = totalEarnings / hoursPlayed

    // 计算所有地点的对比
    const locationComparison = LOCATIONS.map(l => {
        const fpm = l.fishPerMin * speedMulti
        const afv = l.avgValue * valueMulti
        const pph = fpm * 60 * afv
        return { ...l, profitPerHour: pph }
    }).sort((a, b) => b.profitPerHour - a.profitPerHour)

    return (
        <CalculatorLayout
            title="Profit Optimizer"
            description="Find the most profitable fishing setup and location in Fisch."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-400" />
                            Your Setup
                        </CardTitle>
                        <CardDescription>Configure your fishing setup</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Location</label>
                            <Select
                                value={location}
                                onValueChange={(v) => { setLocation(v); setCalculated(false) }}
                            >
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {LOCATIONS.map(l => (
                                        <SelectItem key={l.name} value={l.name} className="text-white">
                                            {l.name} (${l.avgValue} avg, {l.fishPerMin}/min)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Gear Set */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Gear Set</label>
                            <Select
                                value={gearSet}
                                onValueChange={(v) => { setGearSet(v); setCalculated(false) }}
                            >
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    {GEAR_SETS.map(g => (
                                        <SelectItem key={g.name} value={g.name} className="text-white">
                                            {g.name} ({g.valueMulti}x Value, {g.speedMulti}x Speed)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Extra Bonus */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Extra Value Bonus (%)</label>
                            <Input
                                type="number"
                                min="0"
                                value={extraValueBonus}
                                onChange={(e) => {
                                    setExtraValueBonus(Number(e.target.value))
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 25"
                            />
                        </div>

                        {/* Hours */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Session (hours)</label>
                            <Input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={hoursPlayed}
                                onChange={(e) => {
                                    setHoursPlayed(Number(e.target.value) || 1)
                                    setCalculated(false)
                                }}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2"
                        >
                            Optimize
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {calculated ? (
                        <>
                            {/* Main Result */}
                            <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
                                <CardContent className="pt-6">
                                    <div className="text-center">
                                        <DollarSign className="h-10 w-10 mx-auto text-emerald-400 mb-2" />

                                        <div className="text-4xl font-bold text-emerald-400 mb-2">
                                            {formatMoney(profitPerHour)}/hr
                                        </div>

                                        <p className="text-zinc-400 mb-4">at {location}</p>

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="bg-zinc-950/50 rounded-lg p-3">
                                                <div className="text-xs text-zinc-500">Fish/Hour</div>
                                                <div className="text-lg font-bold text-white">{Math.round(fishPerMinute * 60)}</div>
                                            </div>
                                            <div className="bg-zinc-950/50 rounded-lg p-3">
                                                <div className="text-xs text-zinc-500">Session Total</div>
                                                <div className="text-lg font-bold text-yellow-400">{formatMoney(totalEarnings)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Location Comparison */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg text-white flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-yellow-400" />
                                        Best Locations (Your Gear)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {locationComparison.map((l, i) => (
                                        <div
                                            key={l.name}
                                            className={`flex justify-between items-center p-3 rounded-lg ${l.name === location ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-zinc-950/50'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-bold ${i === 0 ? 'text-yellow-400' : 'text-zinc-500'}`}>#{i + 1}</span>
                                                <span className="text-white font-medium">{l.name}</span>
                                            </div>
                                            <span className={i === 0 ? 'text-emerald-400 font-bold' : 'text-zinc-400'}>
                                                {formatMoney(l.profitPerHour)}/hr
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Fish className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Configure your setup to see profit optimization</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
