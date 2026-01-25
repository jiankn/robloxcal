'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Crown, Clock, Sparkles, Info, ArrowRight } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

function formatTime(minutes: number): string {
    if (minutes < 60) return `${Math.ceil(minutes)} min`
    const hours = Math.floor(minutes / 60)
    const mins = Math.ceil(minutes % 60)
    if (hours < 24) return `${hours}h ${mins}m`
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}d ${remainingHours}h`
}

// Time per task in minutes
const TIME_PER_TASK = 3
const TASKS_PER_PET = 21
const PETS_PER_NEON = 4
const NEONS_PER_MEGA = 4

export default function AdoptMeMegaCalculator() {
    const [currentNeons, setCurrentNeons] = useState(0)
    const [normalPets, setNormalPets] = useState(0)

    // Calculate what's needed
    const neonsNeeded = NEONS_PER_MEGA - currentNeons
    const normalPetsNeeded = Math.max(0, neonsNeeded * PETS_PER_NEON - normalPets)

    // Total tasks and time
    const tasksForNormalPets = normalPets * TASKS_PER_PET
    const tasksForMissingPets = normalPetsNeeded * TASKS_PER_PET
    const totalTasks = tasksForNormalPets + tasksForMissingPets
    const totalMinutes = totalTasks * TIME_PER_TASK

    // Progress percentage
    const totalPetsNeeded = NEONS_PER_MEGA * PETS_PER_NEON // 16 pets
    const petsComplete = (currentNeons * PETS_PER_NEON) + normalPets
    const progressPercent = Math.min(100, (petsComplete / totalPetsNeeded) * 100)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-purple-950/20 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Adopt Me Mega Neon Calculator
                    </h1>
                    <p className="text-zinc-400">
                        Calculate time to make a Mega Neon from 4 Neons (16 total pets)
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calculator" proTip="You need 4 Neon pets of the same type to make 1 Mega Neon!" />

                {/* Main Calculator */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left: Input Section */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Crown className="h-5 w-5 text-purple-400" />
                                Your Progress
                            </CardTitle>
                            <CardDescription>How many pets do you already have?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Current Neons */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Neon Pets You Have</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={4}
                                    value={currentNeons}
                                    onChange={(e) => setCurrentNeons(Math.min(4, Math.max(0, parseInt(e.target.value) || 0)))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">Already made Neons (0-4)</p>
                            </div>

                            {/* Normal Pets in Progress */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Normal Pets for Next Neon</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    max={neonsNeeded * 4}
                                    value={normalPets}
                                    onChange={(e) => setNormalPets(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                                <p className="text-xs text-zinc-500">Normal pets being aged</p>
                            </div>

                            {/* Progress Visual */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-zinc-400">
                                    <span>Overall Progress</span>
                                    <span>{progressPercent.toFixed(0)}%</span>
                                </div>
                                <div className="h-4 bg-zinc-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right: Results */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-400" />
                                Requirements
                            </CardTitle>
                            <CardDescription>What you still need</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Visual */}
                            <div className="flex items-center justify-center gap-2 p-4 bg-zinc-800/50 rounded-lg flex-wrap">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i < currentNeons
                                                ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                                                : 'bg-zinc-700 border-2 border-dashed border-zinc-500'
                                            }`}>
                                            <Sparkles className={`h-5 w-5 ${i < currentNeons ? 'text-white' : 'text-zinc-500'}`} />
                                        </div>
                                        <span className="text-xs text-zinc-400 mt-1">Neon {i + 1}</span>
                                    </div>
                                ))}
                                <ArrowRight className="h-5 w-5 text-zinc-500 mx-2" />
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center animate-pulse">
                                        <Crown className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="text-xs text-purple-400 mt-1 font-medium">Mega!</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-purple-400">{neonsNeeded}</div>
                                    <div className="text-sm text-zinc-500">Neons Needed</div>
                                </div>
                                <div className="p-4 bg-zinc-800/50 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-pink-400">{normalPetsNeeded}</div>
                                    <div className="text-sm text-zinc-500">Pets to Age</div>
                                </div>
                            </div>

                            {/* Time Estimate */}
                            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                                <div className="text-sm text-zinc-400 mb-1">Estimated Time Remaining</div>
                                <div className="text-3xl font-bold text-purple-400">
                                    <Clock className="h-6 w-6 inline mr-2" />
                                    {formatTime(totalMinutes)}
                                </div>
                                <div className="text-xs text-zinc-500 mt-1">{totalTasks} total tasks</div>
                            </div>

                            {/* Tip */}
                            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                                <Info className="h-4 w-4 inline mr-1" />
                                <strong>Tip:</strong> A Mega Neon takes significantly longer but cycles through all neon colors!
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
