'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Crosshair, Send, AlertCircle, CheckCircle } from 'lucide-react'
import { useGame } from '@/lib/game-context'
import { toast } from 'sonner'

export default function CalibratePage() {
    const game = useGame()

    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    // 表单状态
    const [n, setN] = useState('10')
    const [m, setM] = useState('3')
    const [result, setResult] = useState<'win' | 'loss'>('win')
    const [opponentChoices, setOpponentChoices] = useState('')

    // 提交处理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            // 对手选择转换为数组
            const choices = opponentChoices.split(/[, ]+/).map(Number).filter(n => !isNaN(n) && n > 0)

            const payload = {
                game_key: game.game_key,
                module: 'bombchip_strategy',
                payload: {
                    n: Number(n),
                    m: Number(m),
                    opponent_choices: choices
                },
                metrics: {
                    result: result
                }
            }

            const res = await fetch('/api/v1/calibrate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error('Calibration failed')

            setSuccess(true)
            toast.success('Calibration data submitted successfully!')

            // 重置表单
            setOpponentChoices('')
            setTimeout(() => setSuccess(false), 3000)

        } catch (error) {
            console.error(error)
            toast.error('Failed to submit calibration data')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] -translate-y-1/2" />

                <div className="relative max-w-2xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                        <Crosshair className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-300">Strategy Calibration</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Help Us <span className="text-purple-400">Improve</span>
                    </h1>

                    <p className="text-zinc-400 max-w-xl mx-auto">
                        Submit your game results to help our AI learn better placement strategies against real opponents.
                    </p>
                </div>
            </header>

            <main className="max-w-xl mx-auto px-4 pb-16">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Send className="h-5 w-5 text-purple-400" />
                            Submit Match Result
                        </CardTitle>
                        <CardDescription>
                            All data is anonymous and used only to improve the algorithm
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success ? (
                            <div className="text-center py-12">
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
                                <p className="text-zinc-400">Your data has been submitted.</p>
                                <Button
                                    className="mt-6 bg-purple-600 hover:bg-purple-700"
                                    onClick={() => setSuccess(false)}
                                >
                                    Submit Another
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Chips (N)</label>
                                        <Input
                                            type="number"
                                            value={n}
                                            onChange={e => setN(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Bombs (M)</label>
                                        <Input
                                            type="number"
                                            value={m}
                                            onChange={e => setM(e.target.value)}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">
                                        Opponent's Choices
                                        <span className="text-zinc-500 ml-2 font-normal">(comma separated, e.g. 1, 5, 8)</span>
                                    </label>
                                    <Input
                                        value={opponentChoices}
                                        onChange={e => setOpponentChoices(e.target.value)}
                                        placeholder="e.g. 1, 5, 8"
                                        className="bg-zinc-800 border-zinc-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Result</label>
                                    <div className="flex gap-4">
                                        <div
                                            className={`
                                                flex-1 p-3 rounded-lg border-2 cursor-pointer text-center font-bold transition-all
                                                ${result === 'win'
                                                    ? 'bg-green-500/20 border-green-500 text-green-400'
                                                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 hover:border-zinc-500'}
                                            `}
                                            onClick={() => setResult('win')}
                                        >
                                            Win
                                        </div>
                                        <div
                                            className={`
                                                flex-1 p-3 rounded-lg border-2 cursor-pointer text-center font-bold transition-all
                                                ${result === 'loss'
                                                    ? 'bg-red-500/20 border-red-500 text-red-400'
                                                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 hover:border-zinc-500'}
                                            `}
                                            onClick={() => setResult('loss')}
                                        >
                                            Loss
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                    disabled={submitting || !opponentChoices}
                                >
                                    {submitting ? 'Submitting...' : 'Submit Data'}
                                </Button>

                                <div className="flex items-start gap-2 text-xs text-zinc-500 bg-zinc-900 p-3 rounded">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    <p>
                                        We filter outliers and prevent spam. Validated data will be aggregated to improve the
                                        default strategy parameters for everyone.
                                    </p>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
