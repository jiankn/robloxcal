'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Target, Save, Trash2, TrendingUp, Clock, Zap } from 'lucide-react'
import { toast } from 'sonner'

const STAT_TYPES = [
    { value: 'strength', label: 'Strength', color: 'red' },
    { value: 'chakra', label: 'Chakra', color: 'blue' },
    { value: 'sword', label: 'Sword', color: 'orange' },
    { value: 'speed', label: 'Speed', color: 'green' },
    { value: 'agility', label: 'Agility', color: 'purple' },
    { value: 'durability', label: 'Durability', color: 'yellow' },
]

interface TrackedStat {
    id: string
    statType: string
    currentValue: number
    targetValue: number
    createdAt: string
}

const STORAGE_KEY = 'afse-tracker-data'

export default function TrackerPage() {
    const [trackedStats, setTrackedStats] = useState<TrackedStat[]>([])
    const [newStat, setNewStat] = useState({
        statType: 'strength',
        currentValue: '',
        targetValue: ''
    })

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                setTrackedStats(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to load tracker data')
            }
        }
    }, [])

    // Save to localStorage
    useEffect(() => {
        if (trackedStats.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trackedStats))
        }
    }, [trackedStats])

    function addStat() {
        if (!newStat.currentValue || !newStat.targetValue) {
            toast.error('Please fill in both values')
            return
        }

        const current = parseFloat(newStat.currentValue)
        const target = parseFloat(newStat.targetValue)

        if (target <= current) {
            toast.error('Target must be greater than current value')
            return
        }

        const stat: TrackedStat = {
            id: Date.now().toString(),
            statType: newStat.statType,
            currentValue: current,
            targetValue: target,
            createdAt: new Date().toISOString()
        }

        setTrackedStats([...trackedStats, stat])
        setNewStat({ statType: 'strength', currentValue: '', targetValue: '' })
        toast.success('Goal added!')
    }

    function updateProgress(id: string, newCurrent: number) {
        setTrackedStats(prev => prev.map(s =>
            s.id === id ? { ...s, currentValue: newCurrent } : s
        ))
    }

    function deleteStat(id: string) {
        setTrackedStats(prev => prev.filter(s => s.id !== id))
        toast.success('Goal removed')
    }

    function getProgress(stat: TrackedStat): number {
        const range = stat.targetValue - stat.currentValue
        if (range <= 0) return 100
        const initial = stat.targetValue - stat.currentValue
        return Math.min(100, Math.max(0, ((stat.currentValue / stat.targetValue) * 100)))
    }

    function estimateTime(stat: TrackedStat): string {
        const remaining = stat.targetValue - stat.currentValue
        if (remaining <= 0) return 'Complete!'
        // Assume average 1M gains per hour (rough estimate)
        const hoursNeeded = remaining / 1000000
        if (hoursNeeded < 1) return '< 1 hour'
        if (hoursNeeded < 24) return `~${Math.ceil(hoursNeeded)} hours`
        return `~${Math.ceil(hoursNeeded / 24)} days`
    }

    const statInfo = (type: string) => STAT_TYPES.find(s => s.value === type) || STAT_TYPES[0]

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        <Target className="h-3 w-3 mr-1" />
                        Progress Tracker
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Stat Progress Tracker
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Set goals, track your progress, and estimate time to reach targets.
                        Data is saved locally in your browser.
                    </p>
                </div>

                {/* Add New Goal */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-400" />
                            Add New Goal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Stat Type</Label>
                                <Select value={newStat.statType} onValueChange={(v) => setNewStat(prev => ({ ...prev, statType: v }))}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STAT_TYPES.map(s => (
                                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Current Value</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 1000000"
                                    value={newStat.currentValue}
                                    onChange={(e) => setNewStat(prev => ({ ...prev, currentValue: e.target.value }))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Target Value</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 10000000"
                                    value={newStat.targetValue}
                                    onChange={(e) => setNewStat(prev => ({ ...prev, targetValue: e.target.value }))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                            <div className="flex items-end">
                                <Button onClick={addStat} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                                    <Save className="h-4 w-4 mr-2" />
                                    Add Goal
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tracked Stats */}
                {trackedStats.length === 0 ? (
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-12 text-center">
                            <Target className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">No Goals Yet</h3>
                            <p className="text-zinc-400">Add your first training goal above to start tracking!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {trackedStats.map((stat) => {
                            const info = statInfo(stat.statType)
                            const progress = getProgress(stat)
                            const isComplete = stat.currentValue >= stat.targetValue

                            return (
                                <Card key={stat.id} className={`bg-zinc-900/50 border-zinc-800 ${isComplete ? 'border-green-500/30' : ''}`}>
                                    <CardContent className="py-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <Badge className={`bg-${info.color}-500/20 text-${info.color}-400 border-${info.color}-500/30`}>
                                                    {info.label}
                                                </Badge>
                                                {isComplete && (
                                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                        Complete!
                                                    </Badge>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteStat(stat.id)}
                                                className="text-zinc-400 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-400">
                                                    Current: <span className="text-white font-medium">{stat.currentValue.toLocaleString()}</span>
                                                </span>
                                                <span className="text-zinc-400">
                                                    Target: <span className="text-white font-medium">{stat.targetValue.toLocaleString()}</span>
                                                </span>
                                            </div>

                                            <Progress value={progress} className="h-3" />

                                            <div className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-1 text-zinc-400">
                                                    <TrendingUp className="h-3.5 w-3.5" />
                                                    <span>{progress.toFixed(1)}% complete</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-zinc-400">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    <span>{estimateTime(stat)}</span>
                                                </div>
                                            </div>

                                            {/* Quick Update */}
                                            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                                                <span className="text-sm text-zinc-400">Update progress:</span>
                                                <Input
                                                    type="number"
                                                    placeholder="New value"
                                                    className="w-32 h-8 bg-zinc-800 border-zinc-700 text-sm"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            const value = parseFloat((e.target as HTMLInputElement).value)
                                                            if (!isNaN(value)) {
                                                                updateProgress(stat.id, value)
                                                                    ; (e.target as HTMLInputElement).value = ''
                                                                toast.success('Progress updated!')
                                                            }
                                                        }
                                                    }}
                                                />
                                                <span className="text-xs text-zinc-500">Press Enter to save</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}

                {/* Info */}
                <Card className="bg-zinc-900/50 border-zinc-800 mt-8">
                    <CardContent className="py-4">
                        <p className="text-sm text-zinc-400 text-center">
                            💡 Your data is stored locally in your browser. Clear browser data will reset your progress.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
