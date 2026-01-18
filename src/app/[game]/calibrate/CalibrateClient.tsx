'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BoostSelector } from '@/components/BoostSelector'
import {
    Target,
    CheckCircle2,
    Play,
    Square,
    ArrowLeft,
    ArrowRight,
    Loader2,
    AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { HowItWorks } from '@/components/HowItWorks'
import type { StatType, BoostSelection, TrainingArea } from '@/lib/types'
import { STAT_TYPES, STAT_TYPE_LABELS } from '@/lib/types'

interface CalibrateClientProps {
    gameSlug: string
    gameKey: string
}

const STEPS = [
    { id: 1, title: 'Select Training Area' },
    { id: 2, title: 'Active Boosts' },
    { id: 3, title: 'Record Training' },
    { id: 4, title: 'Submit Sample' }
]

export function CalibrateClient({ gameSlug, gameKey }: CalibrateClientProps) {
    // 步骤状态
    const [currentStep, setCurrentStep] = useState(1)

    // 表单数据
    const [statType, setStatType] = useState<StatType>('strength')
    const [areaId, setAreaId] = useState<string>('')
    const [boosts, setBoosts] = useState<BoostSelection>({})
    const [multiValue, setMultiValue] = useState<string>('')
    const [startStat, setStartStat] = useState<string>('')
    const [endStat, setEndStat] = useState<string>('')

    // 计时器状态
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // 训练区数据
    const [areas, setAreas] = useState<TrainingArea[]>([])
    const [isLoadingAreas, setIsLoadingAreas] = useState(true)

    // 提交状态
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState<{
        success: boolean
        message: string
        confidence?: number
        sampleCount?: number
    } | null>(null)
    const [submitError, setSubmitError] = useState<string | null>(null)

    // 加载训练区
    useEffect(() => {
        async function loadAreas() {
            try {
                const response = await fetch(`/api/v1/optimizer/config?game=${gameKey}&version=active`)
                if (!response.ok) throw new Error('Failed to load areas')
                const data = await response.json()
                setAreas(data.training_areas || [])
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoadingAreas(false)
            }
        }
        loadAreas()
    }, [gameKey])

    // 计时器逻辑
    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setElapsedSeconds(prev => prev + 1)
            }, 1000)
        } else if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isTimerRunning])

    const startTimer = useCallback(() => {
        setElapsedSeconds(0)
        setIsTimerRunning(true)
    }, [])

    const stopTimer = useCallback(() => {
        setIsTimerRunning(false)
    }, [])

    // 格式化时间
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // 筛选当前 stat type 的训练区
    const filteredAreas = areas.filter(a => a.stat_type === statType)

    // 提交校准
    const handleSubmit = async () => {
        if (!areaId || !startStat || !endStat) {
            setSubmitError('Please fill in all required fields')
            return
        }

        const duration = elapsedSeconds > 0 ? elapsedSeconds : 60 // 默认 60 秒

        if (duration < 30) {
            setSubmitError('Training duration must be at least 30 seconds')
            return
        }

        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const response = await fetch('/api/v1/calibrate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    game_key: gameKey,
                    stat_type: statType,
                    area_id: Number(areaId),
                    duration_sec: duration,
                    start_stat: Number(startStat),
                    end_stat: Number(endStat),
                    boosts,
                    multi_value: multiValue ? Number(multiValue) : undefined
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Submission failed')
            }

            setSubmitResult({
                success: true,
                message: data.message,
                confidence: data.current_confidence,
                sampleCount: data.current_sample_count
            })
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Submission failed')
        } finally {
            setIsSubmitting(false)
        }
    }

    // 步骤内容渲染
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Stat Type</Label>
                            <Select value={statType} onValueChange={(v) => {
                                setStatType(v as StatType)
                                setAreaId('')
                            }}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STAT_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {STAT_TYPE_LABELS[type]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Training Area</Label>
                            {isLoadingAreas ? (
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Loading areas...
                                </div>
                            ) : (
                                <Select value={areaId} onValueChange={setAreaId}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue placeholder="Select training area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredAreas.map((area) => (
                                            <SelectItem key={area.id} value={String(area.id)}>
                                                {area.area_name} (Req: {area.required_stat_value.toLocaleString()})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="space-y-6">
                        <BoostSelector value={boosts} onChange={setBoosts} />

                        <div className="space-y-2">
                            <Label>Multi Value (Optional)</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 50000"
                                value={multiValue}
                                onChange={(e) => setMultiValue(e.target.value)}
                                className="bg-zinc-800 border-zinc-700"
                            />
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-zinc-800/50 rounded-xl p-6 text-center">
                            <div className="text-5xl font-mono font-bold text-white mb-4">
                                {formatTime(elapsedSeconds)}
                            </div>
                            <div className="flex justify-center gap-3">
                                {!isTimerRunning ? (
                                    <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700">
                                        <Play className="mr-2 h-4 w-4" />
                                        Start Timer
                                    </Button>
                                ) : (
                                    <Button onClick={stopTimer} variant="destructive">
                                        <Square className="mr-2 h-4 w-4" />
                                        Stop Timer
                                    </Button>
                                )}
                            </div>
                            <p className="mt-4 text-sm text-zinc-400">
                                Train for at least 30 seconds for accurate data. 2+ minutes recommended.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Start {STAT_TYPE_LABELS[statType]}</Label>
                                <Input
                                    type="number"
                                    placeholder="Value before training"
                                    value={startStat}
                                    onChange={(e) => setStartStat(e.target.value)}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>End {STAT_TYPE_LABELS[statType]}</Label>
                                <Input
                                    type="number"
                                    placeholder="Value after training"
                                    value={endStat}
                                    onChange={(e) => setEndStat(e.target.value)}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                if (submitResult) {
                    return (
                        <div className="text-center py-8">
                            <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                Thank You!
                            </h3>
                            <p className="text-zinc-400 mb-6">{submitResult.message}</p>

                            {submitResult.confidence !== undefined && (
                                <div className="bg-zinc-800/50 rounded-xl p-4 max-w-sm mx-auto">
                                    <p className="text-sm text-zinc-400 mb-2">
                                        Area Confidence: {(submitResult.confidence * 100).toFixed(0)}%
                                    </p>
                                    <Progress value={submitResult.confidence * 100} className="h-2" />
                                    <p className="text-xs text-zinc-500 mt-2">
                                        {submitResult.sampleCount} samples collected
                                    </p>
                                </div>
                            )}

                            <div className="mt-8">
                                <Link href={`/${gameSlug}`}>
                                    <Button>
                                        Back to Calculator
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )
                }

                return (
                    <div className="space-y-6">
                        <div className="bg-zinc-800/50 rounded-xl p-4">
                            <h3 className="font-medium text-white mb-3">Review Your Sample</h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                                <dt className="text-zinc-400">Stat Type:</dt>
                                <dd className="text-white">{STAT_TYPE_LABELS[statType]}</dd>

                                <dt className="text-zinc-400">Training Area:</dt>
                                <dd className="text-white">
                                    {filteredAreas.find(a => a.id === Number(areaId))?.area_name || '-'}
                                </dd>

                                <dt className="text-zinc-400">Duration:</dt>
                                <dd className="text-white">{formatTime(elapsedSeconds)}</dd>

                                <dt className="text-zinc-400">Start → End:</dt>
                                <dd className="text-white">
                                    {Number(startStat).toLocaleString()} → {Number(endStat).toLocaleString()}
                                </dd>

                                <dt className="text-zinc-400">Gain:</dt>
                                <dd className="text-green-400">
                                    +{(Number(endStat) - Number(startStat)).toLocaleString()}
                                </dd>
                            </dl>
                        </div>

                        {submitError && (
                            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                {submitError}
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Submit Sample
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/25 rounded-full blur-[100px] translate-y-1/3" />

            {/* Content */}
            <div className="relative max-w-2xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                        <Target className="h-3 w-3 mr-1" />
                        Help Improve Accuracy
                    </Badge>
                    <h1 className="text-3xl font-bold text-white mb-2">Calibrate the Calculator</h1>
                    <p className="text-zinc-400">
                        Submit your training data to help make the calculator more accurate for everyone.
                    </p>
                </div>

                {/* How It Works */}
                <HowItWorks toolType="calibrate" proTip="Train for 2+ minutes for the most accurate data!" />

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step.id
                                    ? 'bg-purple-600 text-white'
                                    : currentStep > step.id
                                        ? 'bg-green-600 text-white'
                                        : 'bg-zinc-700 text-zinc-400'
                                    }`}
                            >
                                {currentStep > step.id ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                            </div>
                            {index < STEPS.length - 1 && (
                                <div className={`w-12 h-0.5 mx-2 ${currentStep > step.id ? 'bg-green-600' : 'bg-zinc-700'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Title */}
                <div className="text-center mb-6">
                    <h2 className="text-lg font-medium text-zinc-300">
                        Step {currentStep}: {STEPS[currentStep - 1].title}
                    </h2>
                </div>

                {/* Step Content */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                    <CardContent className="py-6">
                        {renderStepContent()}
                    </CardContent>
                </Card>

                {/* Navigation */}
                {!submitResult && (
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={currentStep === 1}
                            className="border-zinc-700"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>

                        {currentStep < 4 && (
                            <Button
                                onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                                disabled={
                                    (currentStep === 1 && !areaId) ||
                                    (currentStep === 3 && (!startStat || !endStat))
                                }
                            >
                                Next
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}

                {/* Back to Home Link */}
                <div className="text-center mt-8">
                    <Link
                        href={`/${gameSlug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Calculator</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
