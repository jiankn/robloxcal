'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Zap, Timer, TrendingUp, AlertCircle } from 'lucide-react'
import { calculateRebirth, RebirthOutputs } from '@/lib/calculators/engines/rebirth-engine'

const GAME_SLUG = 'escape-tsunami-for-brainrots'

export default function EtfbRebirthCalculator() {
    const [rebirthLevel, setRebirthLevel] = useState<number>(0)
    const [currentMoney, setCurrentMoney] = useState<number>(0)
    const [multiplier, setMultiplier] = useState<number>(1)

    // Result state
    const [result, setResult] = useState<RebirthOutputs | null>(null)

    const handleCalculate = () => {
        // 使用正确的参数接口
        const calculation = calculateRebirth({
            currentIncomePerMinute: multiplier * 10, // 基础收入 * 乘数
            currentMultiplier: 1 + rebirthLevel * 0.5, // 当前乘数（根据重生等级）
            newMultiplier: 1 + (rebirthLevel + 1) * 0.5, // 下一级乘数
            rebirthCost: Math.max(1000, currentMoney * 0.1), // 重生成本
            rebirthCostType: 'currency'
        })
        setResult(calculation)
    }


    return (
        <CalculatorLayout
            title="Rebirth Timing Calculator"
            description="Calculate the optimal time to rebirth and maximize your multiplier gains."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            Current Stats
                        </CardTitle>
                        <CardDescription>Enter your current game progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Rebirth Level</label>
                            <Input
                                type="number"
                                min="0"
                                value={rebirthLevel}
                                onChange={(e) => setRebirthLevel(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 5"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Current Money</label>
                            <Input
                                type="number"
                                min="0"
                                value={currentMoney}
                                onChange={(e) => setCurrentMoney(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 50000"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Money Multiplier</label>
                            <Input
                                type="number"
                                min="1"
                                step="0.1"
                                value={multiplier}
                                onChange={(e) => setMultiplier(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                                placeholder="e.g. 1.5"
                            />
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-2"
                        >
                            Calculate Timing
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result ? (
                        <Card className="bg-zinc-900/50 border-zinc-800 h-full border-l-4 border-l-green-500">
                            <CardHeader>
                                <CardTitle className="text-xl text-white flex items-center gap-2">
                                    <Timer className="h-5 w-5 text-green-500" />
                                    Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-zinc-950/50 rounded-lg border border-zinc-800/50 text-center">
                                        <div className="text-zinc-400 text-sm mb-1">Break-even Time</div>
                                        <div className="text-2xl font-bold text-white max-w-full overflow-hidden text-ellipsis">
                                            {result.breakEvenFormatted}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-zinc-950/50 rounded-lg border border-zinc-800/50 text-center">
                                        <div className="text-zinc-400 text-sm mb-1">Multiplier Gain</div>
                                        <div className="text-2xl font-bold text-yellow-400">
                                            +{result.multiplierGain.toFixed(2)}x
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-zinc-950/50 rounded-lg border border-zinc-800/50 text-center">
                                        <div className="text-zinc-400 text-sm mb-1">New Income</div>
                                        <div className="text-xl font-bold text-green-400">
                                            {result.newIncomePerMinute.toFixed(1)}/min
                                        </div>
                                    </div>
                                    <div className="p-4 bg-zinc-950/50 rounded-lg border border-zinc-800/50 text-center">
                                        <div className="text-zinc-400 text-sm mb-1">Income Increase</div>
                                        <div className="text-xl font-bold text-cyan-400">
                                            +{result.incomeIncreasePercent.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-4 rounded-lg ${result.shouldRebirth ? 'bg-green-500/10 border border-green-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className={`h-5 w-5 mt-0.5 ${result.shouldRebirth ? 'text-green-400' : 'text-orange-400'}`} />
                                        <div>
                                            <h4 className={`font-semibold mb-1 ${result.shouldRebirth ? 'text-green-300' : 'text-orange-300'}`}>Recommendation</h4>
                                            <p className={`text-sm leading-relaxed ${result.shouldRebirth ? 'text-green-200/80' : 'text-orange-200/80'}`}>
                                                {result.recommendation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Enter your stats to calculate rebirth timing</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
