'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
    Sword,
    Zap,
    Target,
    Loader2,
    TrendingUp,
    Sparkles,
    Shield
} from 'lucide-react'
import Link from 'next/link'
import type { Skill, Weapon, Transformation, DPSInput, DPSResult, DPSConfig } from '@/lib/dps-types'
import { calculateDPS, formatDPS } from '@/lib/dps-calculator'
import { HowItWorks } from '@/components/HowItWorks'

const TIER_COLORS: Record<string, string> = {
    'S': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'A': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'B': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'C': 'bg-green-500/20 text-green-400 border-green-500/30',
    'D': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

export default function DPSPage() {
    // 配置数据
    const [config, setConfig] = useState<DPSConfig | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // 输入状态
    const [strength, setStrength] = useState<string>('1000')
    const [chakra, setChakra] = useState<string>('1000')
    const [sword, setSword] = useState<string>('1000')
    const [weaponId, setWeaponId] = useState<string>('')
    const [skillIds, setSkillIds] = useState<number[]>([])
    const [transformId, setTransformId] = useState<string>('')
    const [boosts, setBoosts] = useState({
        vip_damage: false,
        damage_gamepass: false,
        event_damage: false
    })

    // 计算结果
    const [result, setResult] = useState<DPSResult | null>(null)

    // 加载配置
    useEffect(() => {
        async function loadConfig() {
            try {
                const response = await fetch('/api/v1/dps/config?game=afse')
                if (!response.ok) throw new Error('Failed to load config')
                const data = await response.json()
                setConfig(data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        loadConfig()
    }, [])

    // 计算 DPS
    const handleCalculate = useCallback(() => {
        if (!config) return

        const input: DPSInput = {
            strength: Number(strength) || 0,
            chakra: Number(chakra) || 0,
            sword: Number(sword) || 0,
            weapon_id: weaponId ? Number(weaponId) : undefined,
            skill_ids: skillIds,
            transformation_id: transformId ? Number(transformId) : undefined,
            boosts
        }

        const dpsResult = calculateDPS(
            input,
            config.weapons,
            config.skills,
            config.transformations
        )

        setResult(dpsResult)
    }, [config, strength, chakra, sword, weaponId, skillIds, transformId, boosts])

    // 技能多选
    const toggleSkill = (skillId: number) => {
        setSkillIds(prev =>
            prev.includes(skillId)
                ? prev.filter(id => id !== skillId)
                : [...prev, skillId]
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
                        <Sword className="h-3 w-3 mr-1" />
                        Damage Calculator
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        AFSE DPS Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Calculate your damage per second based on stats, weapons, skills, and transformations.
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="afse-dps" proTip="Stack damage boosts for maximum DPS output!" />

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-6">
                        {/* Stats Card */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-blue-400" />
                                    Your Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2">
                                        <Label>Strength</Label>
                                        <Input
                                            type="number"
                                            value={strength}
                                            onChange={(e) => setStrength(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Chakra</Label>
                                        <Input
                                            type="number"
                                            value={chakra}
                                            onChange={(e) => setChakra(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Sword</Label>
                                        <Input
                                            type="number"
                                            value={sword}
                                            onChange={(e) => setSword(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Weapon Card */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sword className="h-5 w-5 text-yellow-400" />
                                    Weapon
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Select value={weaponId || 'none'} onValueChange={(v) => setWeaponId(v === 'none' ? '' : v)}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Select weapon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Weapon</SelectItem>
                                        {config?.weapons.map((weapon) => (
                                            <SelectItem key={weapon.id} value={String(weapon.id)}>
                                                <span className="flex items-center gap-2">
                                                    <Badge className={`${TIER_COLORS[weapon.tier]} text-xs`}>
                                                        {weapon.tier}
                                                    </Badge>
                                                    {weapon.weapon_name}
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        {/* Transformation Card */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-purple-400" />
                                    Transformation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Select value={transformId || 'none'} onValueChange={(v) => setTransformId(v === 'none' ? '' : v)}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Select transformation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Transformation</SelectItem>
                                        {config?.transformations.map((form) => (
                                            <SelectItem key={form.id} value={String(form.id)}>
                                                <span className="flex items-center gap-2">
                                                    <Badge className={`${TIER_COLORS[form.tier]} text-xs`}>
                                                        {form.tier}
                                                    </Badge>
                                                    {form.form_name} ({form.damage_multiplier}x)
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>

                        {/* Boosts Card */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-400" />
                                    Damage Boosts
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="vip_damage"
                                        checked={boosts.vip_damage}
                                        onCheckedChange={(c) => setBoosts(prev => ({ ...prev, vip_damage: !!c }))}
                                    />
                                    <Label htmlFor="vip_damage">VIP Gamepass (+50%)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="damage_gamepass"
                                        checked={boosts.damage_gamepass}
                                        onCheckedChange={(c) => setBoosts(prev => ({ ...prev, damage_gamepass: !!c }))}
                                    />
                                    <Label htmlFor="damage_gamepass">2x Damage Gamepass (+100%)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="event_damage"
                                        checked={boosts.event_damage}
                                        onCheckedChange={(c) => setBoosts(prev => ({ ...prev, event_damage: !!c }))}
                                    />
                                    <Label htmlFor="event_damage">Event Damage Boost (+25%)</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Calculate Button */}
                        <div className="flex justify-center">
                            <Button
                                onClick={handleCalculate}
                                className="w-full sm:w-56 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                                size="lg"
                            >
                                <Zap className="mr-2 h-5 w-5" />
                                Calculate DPS
                            </Button>
                        </div>
                    </div>

                    {/* Results & Skills Section */}
                    <div className="space-y-6">
                        {/* Results Card */}
                        {result && (
                            <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
                                <CardHeader>
                                    <CardTitle className="text-white">Damage Output</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-zinc-900/50 rounded-xl">
                                            <div className="text-3xl font-bold text-red-400">
                                                {formatDPS(result.dps)}
                                            </div>
                                            <div className="text-sm text-zinc-400">DPS</div>
                                        </div>
                                        <div className="text-center p-4 bg-zinc-900/50 rounded-xl">
                                            <div className="text-3xl font-bold text-orange-400">
                                                {formatDPS(result.burst_damage)}
                                            </div>
                                            <div className="text-sm text-zinc-400">Burst Damage</div>
                                        </div>
                                    </div>

                                    <Separator className="bg-zinc-700" />

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Weapon DPS</span>
                                            <span className="text-white">{formatDPS(result.weapon_dps)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Skill DPS</span>
                                            <span className="text-white">{formatDPS(result.skill_dps)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Total Multiplier</span>
                                            <span className="text-green-400">{result.damage_multiplier.toFixed(2)}x</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Skills Card */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-cyan-400" />
                                    Skills (Select Multiple)
                                </CardTitle>
                                <CardDescription>
                                    Click to toggle skills in your rotation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    {config?.skills.map((skill) => (
                                        <button
                                            key={skill.id}
                                            onClick={() => toggleSkill(skill.id)}
                                            className={`p-3 rounded-lg border text-left transition-all ${skillIds.includes(skill.id)
                                                ? 'bg-cyan-500/20 border-cyan-500/50'
                                                : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-white">{skill.skill_name}</span>
                                                <Badge className={`${TIER_COLORS[skill.tier]} text-xs`}>
                                                    {skill.tier}
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-zinc-400">
                                                {formatDPS(skill.base_damage)} dmg • {skill.cooldown_sec}s CD
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Training Optimizer</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
