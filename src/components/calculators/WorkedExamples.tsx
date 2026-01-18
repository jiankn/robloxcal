import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb } from 'lucide-react'
import type { WorkedExample } from '@/lib/calculators/engines'

interface WorkedExamplesProps {
    examples: WorkedExample[]
    className?: string
}

export function WorkedExamples({ examples, className = '' }: WorkedExamplesProps) {
    if (!examples || examples.length === 0) return null

    return (
        <Card className={`bg-zinc-900/50 border-zinc-800 ${className}`}>
            <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    Worked Examples
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {examples.map((example, index) => (
                    <div key={index} className="border-l-2 border-purple-500/50 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                Example {index + 1}
                            </Badge>
                            <h4 className="font-semibold text-white">{example.title}</h4>
                        </div>

                        <p className="text-zinc-400 mb-3">{example.scenario}</p>

                        {/* Show inputs used */}
                        <div className="bg-zinc-800/50 rounded-lg p-3 mb-3">
                            <div className="text-xs text-zinc-500 mb-2">Inputs Used:</div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(example.inputs).map(([key, value]) => (
                                    <Badge key={key} variant="outline" className="text-xs border-zinc-700">
                                        {key}: {String(value)}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <p className="text-zinc-300 leading-relaxed">{example.explanation}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
