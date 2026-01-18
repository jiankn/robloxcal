'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Calculator, RotateCcw, HelpCircle, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { calculateRebirth } from '@/lib/calculators/engines'
import { FAQAccordion, WorkedExamples, Disclaimer, LastUpdated } from '@/components/calculators'

// Hard-coded config for ETFB Rebirth Calculator
const config = {
    gameName: 'Escape Tsunami For Brainrots',
    gameSlug: 'escape-tsunami-for-brainrots',
    toolName: 'Rebirth Advisor Calculator',
    primaryKeyword: 'escape tsunami for brainrots rebirth calculator',
    faqs: [
        {
            question: 'When should I rebirth in Escape Tsunami For Brainrots?',
            answer: 'Rebirth when the break-even time is less than 30 minutes. This calculator helps you determine the optimal rebirth timing based on your current income and the new multiplier you\'ll receive.'
        },
        {
            question: 'How does the money multiplier work in Escape Tsunami?',
            answer: 'The money multiplier increases all your earnings by that factor. A 2x multiplier means you earn double the base amount. Each rebirth level increases this multiplier.'
        },
        {
            question: 'What is break-even time?',
            answer: 'Break-even time is how long it takes for the increased earnings from rebirthing to make up for the time lost resetting your progress. Shorter break-even times mean rebirthing is more worthwhile.'
        },
        {
            question: 'Should I always rebirth when available?',
            answer: 'Not necessarily. Only rebirth when the multiplier gain is significant enough. Use this calculator to determine if the break-even time is acceptable for your play session.'
        },
        {
            question: 'How do I check my current multiplier in game?',
            answer: 'Open your stats menu in Escape Tsunami For Brainrots. Your current money multiplier should be displayed there, along with your rebirth level.'
        },
        {
            question: 'Does rebirth reset my speed upgrades?',
            answer: 'This depends on the game\'s specific rebirth mechanics. Generally, some upgrades are permanent while others reset. Check the in-game rebirth info for details.'
        },
        {
            question: 'What\'s the best rebirth strategy for beginners?',
            answer: 'For beginners, rebirth early and often when the multiplier gain is 0.5x or more. As you progress, be more selective since recovery times increase.'
        }
    ],
    examples: [
        {
            title: 'Early Game Rebirth',
            scenario: 'You\'re making $1,000/min with a 1x multiplier. Rebirthing will give you 1.5x multiplier, and it takes about 5 minutes to get back to your current position.',
            inputs: { currentIncomePerMinute: 1000, currentMultiplier: 1, newMultiplier: 1.5, rebirthCost: 5 },
            explanation: 'With a 50% income boost, you\'ll earn an extra $500/min. You\'ll break even in about 10 minutes, making this a great time to rebirth!'
        },
        {
            title: 'Late Game Decision',
            scenario: 'You\'re earning $50,000/min with a 3x multiplier. The next rebirth gives 3.2x multiplier but takes 30 minutes to recover.',
            inputs: { currentIncomePerMinute: 50000, currentMultiplier: 3, newMultiplier: 3.2, rebirthCost: 30 },
            explanation: 'The 6.7% multiplier increase gives you ~$3,333 extra per minute. However, with a 30-minute recovery time, break-even takes much longer. Consider waiting.'
        }
    ]
}

export default function ETFBRebirthCalculatorPage() {
    const [inputs, setInputs] = useState({
        currentIncomePerMinute: 1000,
        currentMultiplier: 1,
        newMultiplier: 1.5,
        rebirthCost: 5,
        rebirthCostType: 'time' as 'time' | 'currency'
    })

    const results = useMemo(() => {
        return calculateRebirth({
            currentIncomePerMinute: inputs.currentIncomePerMinute,
            currentMultiplier: inputs.currentMultiplier,
            newMultiplier: inputs.newMultiplier,
            rebirthCost: inputs.rebirthCost,
            rebirthCostType: inputs.rebirthCostType
        })
    }, [inputs])

    const handleReset = () => {
        setInputs({
            currentIncomePerMinute: 1000,
            currentMultiplier: 1,
            newMultiplier: 1.5,
            rebirthCost: 5,
            rebirthCostType: 'time'
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6 flex-wrap">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/games" className="hover:text-white transition-colors">Games</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href={`/games/${config.gameSlug}`} className="hover:text-white transition-colors">
                        Escape Tsunami
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-white">Rebirth Calculator</span>
                </nav>

                {/* Hero */}
                <div className="mb-8">
                    <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        <Zap className="h-3 w-3 mr-1" />
                        REBIRTH TOOL
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Escape Tsunami For Brainrots Rebirth Calculator
                    </h1>
                    <p className="text-lg text-zinc-400">
                        Use this free <strong className="text-white">Escape Tsunami For Brainrots rebirth calculator</strong> to
                        find the optimal time to rebirth. Enter your current stats and see if rebirthing is worth it right now.
                    </p>
                </div>

                {/* Calculator */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-8">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/10">
                                    <Calculator className="h-5 w-5 text-cyan-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl text-white">Rebirth Calculator</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Enter your current stats below
                                    </CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleReset} className="text-zinc-400 hover:text-white">
                                <RotateCcw className="h-4 w-4 mr-1" />
                                Reset
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-zinc-300 flex items-center gap-2">
                                    Current Income (per minute)
                                    <Badge variant="outline" className="text-xs border-zinc-700">$/min</Badge>
                                </Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={inputs.currentIncomePerMinute}
                                    onChange={(e) => setInputs(prev => ({ ...prev, currentIncomePerMinute: parseFloat(e.target.value) || 0 }))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-300">Current Multiplier</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    step={0.1}
                                    value={inputs.currentMultiplier}
                                    onChange={(e) => setInputs(prev => ({ ...prev, currentMultiplier: parseFloat(e.target.value) || 1 }))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-300">New Multiplier (After Rebirth)</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    step={0.1}
                                    value={inputs.newMultiplier}
                                    onChange={(e) => setInputs(prev => ({ ...prev, newMultiplier: parseFloat(e.target.value) || 1 }))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-300 flex items-center gap-2">
                                    Recovery Time
                                    <Badge variant="outline" className="text-xs border-zinc-700">minutes</Badge>
                                </Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={inputs.rebirthCost}
                                    onChange={(e) => setInputs(prev => ({ ...prev, rebirthCost: parseFloat(e.target.value) || 0 }))}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/10 border-purple-500/30 mb-8">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                            <ChevronRight className="h-5 w-5 text-purple-400" />
                            Results
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/30 md:col-span-2">
                                <div className="text-sm text-zinc-400 mb-1">Recommendation</div>
                                <div className="text-xl font-bold text-purple-300">{results.recommendation}</div>
                            </div>

                            <div className="p-4 rounded-lg bg-zinc-800/50">
                                <div className="text-sm text-zinc-400 mb-1">Break-even Time</div>
                                <div className="text-xl font-bold text-white">{results.breakEvenFormatted}</div>
                            </div>

                            <div className="p-4 rounded-lg bg-zinc-800/50">
                                <div className="text-sm text-zinc-400 mb-1">Multiplier Gain</div>
                                <div className="text-xl font-bold text-white">+{results.multiplierGain.toFixed(2)}x</div>
                            </div>

                            <div className="p-4 rounded-lg bg-zinc-800/50">
                                <div className="text-sm text-zinc-400 mb-1">Income Increase</div>
                                <div className="text-xl font-bold text-green-400">+{results.incomeIncreasePercent.toFixed(1)}%</div>
                            </div>

                            <div className="p-4 rounded-lg bg-zinc-800/50">
                                <div className="text-sm text-zinc-400 mb-1">Bonus Income/min</div>
                                <div className="text-xl font-bold text-white">${results.bonusIncomePerMinute.toLocaleString()}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* How It Works */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">How the Rebirth Calculator Works</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-zinc-400 leading-relaxed">
                            This <strong className="text-white">Escape Tsunami For Brainrots rebirth calculator</strong> helps you
                            determine the optimal time to rebirth by calculating the break-even point. The formula compares your
                            current income with the projected income after rebirth, accounting for the time needed to recover
                            your progress.
                        </p>
                        <p className="text-zinc-400 leading-relaxed mt-4">
                            <strong className="text-white">Break-even time</strong> is calculated as: Recovery Time ÷ (1 - Current/New Multiplier Ratio).
                            If the break-even time is short (under 30 minutes), rebirthing is highly recommended. For longer
                            break-even times, consider waiting for a better opportunity.
                        </p>
                    </div>
                </section>

                {/* Worked Examples */}
                <WorkedExamples examples={config.examples} className="mb-8" />

                {/* FAQ */}
                <FAQAccordion faqs={config.faqs} className="mb-8" />

                {/* Related Tools */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Related Calculators</h2>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="outline" asChild className="border-zinc-700">
                            <Link href={`/games/${config.gameSlug}/etfb-upgrade-roi`}>Upgrade ROI Calculator</Link>
                        </Button>
                        <Button variant="outline" asChild className="border-zinc-700">
                            <Link href={`/games/${config.gameSlug}/etfb-speed-planner`}>Speed Planner</Link>
                        </Button>
                        <Button variant="outline" asChild className="border-zinc-700">
                            <Link href={`/games/${config.gameSlug}`}>All {config.gameName} Tools</Link>
                        </Button>
                    </div>
                </section>

                {/* Last Updated & Disclaimer */}
                <LastUpdated date="January 2026" className="mb-4" />
                <Disclaimer gameName={config.gameName} />
            </div>
        </div>
    )
}
