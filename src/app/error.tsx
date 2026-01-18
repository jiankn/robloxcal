'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
                <p className="text-zinc-400 mb-6">{error.message}</p>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}
