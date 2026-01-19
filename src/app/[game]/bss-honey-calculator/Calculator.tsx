'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Checkbox } from '@/components/ui/checkbox'
import { Hexagon, Droplets, ArrowRight } from 'lucide-react'

const GAME_SLUG = 'bee-swarm-simulator'

export default function BssHoneyCalculator() {
    const [pollenRate, setPollenRate] = useState<number>(1000)
    const [convertRate, setConvertRate] = useState<number>(100)
    const [honeyAtHive, setHoneyAtHive] = useState<boolean>(true)
    const [result, setResult] = useState<any>(null)

    const handleCalculate = () => {
        // Simple logic: Pollen/sec * Convert% + Hive Bonus if enabled
        let totalHoneyPerSec = pollenRate * (convertRate / 100)

        if (honeyAtHive) {
            totalHoneyPerSec *= 1.2 // 20% bonus example
        }

        setResult({
            perSecond: totalHoneyPerSec,
            perMinute: totalHoneyPerSec * 60,
            perHour: totalHoneyPerSec * 3600
        })
    }

    return (
        <CalculatorLayout
            title="Honey Calculator"
            description="Estimate your honey production based on pollen collection rates."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Hexagon className="h-5 w-5 text-yellow-500" />
                            Hive Stats
                        </CardTitle>
                        <CardDescription>Enter your pollen and conversion stats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Pollen Per Second</label>
                            <Input
                                type="number"
                                min="0"
                                value={pollenRate}
                                onChange={(e) => setPollenRate(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Instant Conversion %</label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                value={convertRate}
                                onChange={(e) => setConvertRate(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="flex items-center space-x-2 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
                            <Checkbox
                                id="honey-hive"
                                checked={honeyAtHive}
                                onCheckedChange={(c) => setHoneyAtHive(!!c)}
                            />
                            <label
                                htmlFor="honey-hive"
                                className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Honey At Hive Bonus (1.2x)
                            </label>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2"
                        >
                            Calculate Honey
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result ? (
                        <div className="grid gap-4">
                            <Card className="bg-zinc-900/50 border-zinc-800 h-full border-l-4 border-l-yellow-500">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white flex items-center gap-2">
                                        <Droplets className="h-5 w-5 text-yellow-500" />
                                        Production Rates
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Honey / Sec</span>
                                        <span className="text-xl font-bold text-yellow-400">{Math.floor(result.perSecond).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg">
                                        <span className="text-zinc-400">Honey / Min</span>
                                        <span className="text-xl font-bold text-yellow-400">{Math.floor(result.perMinute).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-zinc-950/50 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                                        <span className="text-zinc-300 font-medium">Honey / Hour</span>
                                        <span className="text-2xl font-bold text-yellow-400">{Math.floor(result.perHour).toLocaleString()}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Hexagon className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Calculate honey production</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
