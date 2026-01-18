'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCcw, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useGame } from '@/lib/game-context'
import { toast } from 'sonner'

export default function BrainrotCalibratePage() {
    const game = useGame()

    // Form State
    const [currentMult, setCurrentMult] = useState('')
    const [rebirthCost, setRebirthCost] = useState('')
    const [newMult, setNewMult] = useState('')

    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const payload = {
                game_key: game.game_key,
                module: 'brainrot_economy',
                payload: {
                    current_multiplier: Number(currentMult),
                    rebirth_cost: Number(rebirthCost),
                    new_multiplier: Number(newMult)
                },
                metrics: {
                    // Implicitly, submitting data means the calculation shown in-game matches this?
                    // Or we are just collecting data points to verify the formula
                    verified: true
                }
            }

            const res = await fetch('/api/v1/calibrate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error('Submission failed')

            setSuccess(true)
            toast.success('Data submitted successfully')

            // Reset
            setCurrentMult('')
            setRebirthCost('')
            setNewMult('')
            setTimeout(() => setSuccess(false), 3000)

        } catch (error) {
            console.error(error)
            toast.error('Submission failed')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2" />

                <div className="relative max-w-2xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                        <RotateCcw className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Rebirth Data</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Help Verify <span className="text-purple-400">Rebirth Costs</span>
                    </h1>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 pb-16">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Send className="h-5 w-5 text-purple-400" />
                            Submit Rebirth Milestone
                        </CardTitle>
                        <CardDescription>
                            Enter your current rebirth stats to help us map the cost scaling curve.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <div className="text-center py-12">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Thanks!</h3>
                                <p className="text-zinc-400">Your contribution helps the community.</p>
                                <Button className="mt-6" variant="outline" onClick={() => setSuccess(false)}>Submit Another</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-zinc-300">Current Multiplier</label>
                                    <Input required type="number" step="0.1" value={currentMult} onChange={e => setCurrentMult(e.target.value)} className="bg-zinc-800 border-zinc-700 mt-1" placeholder="e.g. 1.0" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-zinc-300">Rebirth Cost</label>
                                    <Input required type="number" value={rebirthCost} onChange={e => setRebirthCost(e.target.value)} className="bg-zinc-800 border-zinc-700 mt-1" placeholder="e.g. 1000" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-zinc-300">New Multiplier (After Rebirth)</label>
                                    <Input required type="number" step="0.1" value={newMult} onChange={e => setNewMult(e.target.value)} className="bg-zinc-800 border-zinc-700 mt-1" placeholder="e.g. 1.5" />
                                </div>

                                <Button type="submit" disabled={submitting} className="w-full bg-purple-600 hover:bg-purple-700 mt-2">
                                    {submitting ? 'Submitting...' : 'Submit Data'}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
