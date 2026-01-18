import { AlertTriangle } from 'lucide-react'

interface DisclaimerProps {
    gameName?: string
    className?: string
}

export function Disclaimer({ gameName, className = '' }: DisclaimerProps) {
    return (
        <div className={`bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-sm text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-300">Disclaimer:</strong> RobloxCal is a fan-made, unofficial website
                    and is not affiliated with Roblox Corporation or the creators of {gameName || 'this game'}.
                    Game names and assets belong to their respective owners. Calculations are estimates based on
                    community testing and may change after game updates.
                </div>
            </div>
        </div>
    )
}

interface LastUpdatedProps {
    date: string
    changelog?: string[]
    className?: string
}

export function LastUpdated({ date, changelog, className = '' }: LastUpdatedProps) {
    return (
        <div className={`text-sm text-zinc-500 ${className}`}>
            <div className="flex items-center gap-2">
                <span>Last updated:</span>
                <time className="text-zinc-400">{date}</time>
            </div>
            {changelog && changelog.length > 0 && (
                <div className="mt-2 text-xs">
                    <span className="text-zinc-600">Recent changes: </span>
                    <span>{changelog.slice(0, 2).join(' • ')}</span>
                </div>
            )}
        </div>
    )
}
