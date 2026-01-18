'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    RefreshCw,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react'
import Link from 'next/link'

export default function AdminAggregatePage() {
    const [isRunning, setIsRunning] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [secret, setSecret] = useState('')

    async function runAggregation() {
        if (!secret) {
            setError('Please enter the CRON_SECRET')
            return
        }

        setIsRunning(true)
        setError(null)
        setResult(null)

        try {
            const response = await fetch('/api/v1/cron/aggregate-training-params', {
                method: 'POST',
                headers: {
                    'x-cron-secret': secret,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Aggregation failed')
            } else {
                setResult(data)
            }
        } catch (err) {
            setError('Network error occurred')
        } finally {
            setIsRunning(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin
                    </Link>
                    <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/30">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Manual Aggregation
                    </Badge>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Run Aggregation
                    </h1>
                    <p className="text-zinc-400">
                        Manually trigger the sample aggregation process to update training parameters.
                    </p>
                </div>

                {/* Main Card */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                    <CardHeader>
                        <CardTitle className="text-white">Aggregation Settings</CardTitle>
                        <CardDescription className="text-zinc-400">
                            This will process all valid samples and update the training area parameters.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">CRON Secret</label>
                            <Input
                                type="password"
                                placeholder="Enter your CRON_SECRET"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                className="bg-zinc-800 border-zinc-700"
                            />
                            <p className="text-xs text-zinc-500">
                                This is the same secret from your .env.local file
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={runAggregation}
                                disabled={isRunning}
                                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
                            >
                                {isRunning ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Run Aggregation
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Result */}
                {result && (
                    <Card className="bg-green-900/20 border-green-500/30">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Aggregation Successful
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Status</span>
                                    <span className="text-white">{result.message}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Version</span>
                                    <span className="text-white">{result.version_key}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Areas Updated</span>
                                    <span className="text-green-400">{result.updated_count}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Total Areas</span>
                                    <span className="text-white">{result.total_areas}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Error */}
                {error && (
                    <Card className="bg-red-900/20 border-red-500/30">
                        <CardHeader>
                            <CardTitle className="text-red-400 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Aggregation Failed
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-400">{error}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Info */}
                <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                    <CardContent className="py-4">
                        <h3 className="font-medium text-white mb-2">What does aggregation do?</h3>
                        <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
                            <li>Fetches all valid training samples from the last 14 days</li>
                            <li>Calculates weighted average base gain for each training area</li>
                            <li>Updates confidence scores based on sample count and variance</li>
                            <li>Publishes new parameters to training_area_params table</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
