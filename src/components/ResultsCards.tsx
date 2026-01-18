'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, Unlock, Lock, Clock, Target } from 'lucide-react'
import type { AreaRecommendation } from '@/lib/types'
import { formatNumber, formatDuration } from '@/lib/optimizer'

interface ResultsCardsProps {
    recommendations: AreaRecommendation[]
    multTotal: number
    minutesToTarget?: number
    targetStat?: number
    currentStat: number
}

export function ResultsCards({
    recommendations,
    multTotal,
    minutesToTarget,
    targetStat,
    currentStat
}: ResultsCardsProps) {
    if (recommendations.length === 0) {
        return (
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="py-8 text-center text-zinc-400">
                    <p>No training areas available for your current stat level.</p>
                    <p className="text-sm mt-2">Try increasing your stats first!</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {/* Multiplier Summary */}
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
                <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-purple-400" />
                            <span className="text-zinc-300">Total Multiplier</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-300">
                            {multTotal.toFixed(2)}x
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Top Recommendations */}
            <div className="grid gap-4 md:grid-cols-3">
                {recommendations.map((rec, index) => (
                    <Card
                        key={rec.area.id}
                        className={`bg-zinc-900/50 border-zinc-800 ${index === 0 ? 'ring-2 ring-yellow-500/50' : ''
                            }`}
                    >
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {index === 0 && (
                                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                            Best
                                        </Badge>
                                    )}
                                    {index === 1 && (
                                        <Badge variant="secondary" className="bg-zinc-700">
                                            #2
                                        </Badge>
                                    )}
                                    {index === 2 && (
                                        <Badge variant="secondary" className="bg-zinc-700">
                                            #3
                                        </Badge>
                                    )}
                                </CardTitle>
                                {rec.is_unlocked ? (
                                    <Unlock className="h-4 w-4 text-green-400" />
                                ) : (
                                    <Lock className="h-4 w-4 text-red-400" />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <h3 className="font-semibold text-white">{rec.area.area_name}</h3>
                                <p className="text-sm text-zinc-400">
                                    Requires: {formatNumber(rec.required_stat_value)}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Est. Gain/min</span>
                                    <span className="text-green-400 font-medium">
                                        +{formatNumber(rec.estimated_gain_per_min)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Confidence</span>
                                    <span className={`font-medium ${rec.confidence >= 0.7 ? 'text-green-400' :
                                            rec.confidence >= 0.4 ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                        {(rec.confidence * 100).toFixed(0)}%
                                    </span>
                                </div>
                                <Progress
                                    value={rec.confidence * 100}
                                    className="h-1.5"
                                />
                            </div>

                            {rec.confidence < 0.4 && (
                                <p className="text-xs text-zinc-500">
                                    Low confidence. Help improve by calibrating!
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Time to Target */}
            {targetStat && minutesToTarget !== undefined && (
                <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
                    <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-400" />
                                <span className="text-zinc-300">
                                    Time to reach {formatNumber(targetStat)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-300" />
                                <span className="text-xl font-bold text-blue-300">
                                    {formatDuration(minutesToTarget)}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-400 mt-2">
                            From {formatNumber(currentStat)} → {formatNumber(targetStat)}
                            {' '}({formatNumber(targetStat - currentStat)} to go)
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
