'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Clock, Heart, Info, ArrowRight } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

// Pet growth stages
const GROWTH_STAGES = [
    { id: 'newborn', name: 'Newborn', tasks: 0 },
    { id: 'junior', name: 'Junior', tasks: 3 },
    { id: 'pre-teen', name: 'Pre-Teen', tasks: 6 },
    { id: 'teen', name: 'Teen', tasks: 10 },
    { id: 'post-teen', name: 'Post-Teen', tasks: 15 },
    { id: 'full-grown', name: 'Full Grown', tasks: 21 },
]

// Task types and time estimates
const TASK_METHODS = [
    { id: 'normal', name: 'Normal Play', minPerTask: 5, description: 'Regular gameplay' },
    { id: 'afk-pool', name: 'AFK Pool Method', minPerTask: 2, description: 'Use AFK pool for faster aging' },
    { id: 'family', name: 'Family Boost', minPerTask: 3, description: 'Get help from family members' },
]

function formatTime(minutes: number): string {
    if (minutes < 60) return `${Math.ceil(minutes)} min`
    const hours = Math.floor(minutes / 60)
    const mins = Math.ceil(minutes % 60)
    if (hours < 24) return `${hours}h ${mins}m`
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}d ${remainingHours}h`
}

export default function AdoptMeNeonCalculator() {
    const [numPets, setNumPets] = useState(4)
    const [currentStage, setCurrentStage] = useState('newborn')
    const [method, setMethod] = useState('normal')

    // Calculate tasks needed
    const fullGrownTasks = 21
    const currentStageTasks = GROWTH_STAGES.find(s => s.id === currentStage)?.tasks || 0
    const tasksPerPet = fullGrownTasks - currentStageTasks
    const totalTasks = tasksPerPet * numPets

    const selectedMethod = TASK_METHODS.find(m => m.id === method)!
    const totalMinutes = totalTasks * selectedMethod.minPerTask

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-pink-950/20 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Adopt Me Neon Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Calculate time to make a Neon pet from 4 Full Grown pets
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="You need 4 Full Grown pets of the same type to make 1 Neon!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Heart className="h-5 w-5 text-pink-400" />
                                Pet Details
                            </CardTitle>
                            <CardDescription>Configure your pets</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Number of Pets */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Number of Pets to Age</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={4}
                                    value={numPets}
                                    onChange={(e) => setNumPets(Math.min(4, Math.max(1, parseInt(e.target.value) || 1)))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">You need 4 pets for a Neon</p>
                            </div>

                            {/* Current Stage */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Current Growth Stage</Label>
                                <Select value={currentStage} onValueChange={setCurrentStage}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {GROWTH_STAGES.slice(0, -1).map(stage => (
                                            <SelectItem key={stage.id} value={stage.id}>
                                                {stage.name} ({stage.tasks} tasks done)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Aging Method */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Aging Method</Label>
                                <Select value={method} onValueChange={setMethod}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TASK_METHODS.map(m => (
                                            <SelectItem key={m.id} value={m.id}>
                                                {m.name} (~{m.minPerTask} min/task)
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
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                Results
                            </CardTitle>
                            <CardDescription>Time to Neon</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Visual Progress */}
                            <div className="flex items-center justify-center gap-2 p-4 bg-zinc-800/50 rounded-lg">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i < numPets ? 'bg-pink-500/30 border-2 border-pink-500' : 'bg-zinc-700'
                                            }`}>
                                            <Heart className={`h-6 w-6 ${i < numPets ? 'text-pink-400' : 'text-zinc-500'}`} />
                                        </div>
                                        <span className="text-xs text-zinc-400 mt-1">Pet {i + 1}</span>
                                    </div>
                                ))}
                                <ArrowRight className="h-6 w-6 text-zinc-500 mx-2" />
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center animate-pulse">
                                        <Sparkles className="h-7 w-7 text-white" />
                                    </div>
                                    <span className="text-xs text-pink-400 mt-1 font-medium">Neon!</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-pink-400">{totalTasks}</div>
                                    <div className="text-sm text-zinc-500">Total Tasks</div>
                                </div>
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-400">
                                        <Clock className="h-5 w-5 inline mr-1" />
                                        {formatTime(totalMinutes)}
                                    </div>
                                    <div className="text-sm text-zinc-500">Est. Time</div>
                                </div>
                            </div>

                            {/* Per Pet Breakdown */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-zinc-400">Per Pet Breakdown</h4>
                                <div className="p-3 bg-zinc-800/30 rounded-lg">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Tasks per pet:</span>
                                        <span className="text-white">{tasksPerPet} tasks</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-zinc-400">Time per pet:</span>
                                        <span className="text-white">{formatTime(tasksPerPet * selectedMethod.minPerTask)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-lg text-pink-300 text-sm">
                                <Info className="h-4 w-4 inline mr-1" />
                                <strong>Tip:</strong> Use a family with multiple people to age pets faster with the family aging boost!
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
