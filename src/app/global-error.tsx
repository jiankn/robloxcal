'use client'

import { useEffect } from 'react'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    return (
        <html>
            <body className="bg-zinc-950">
                <div className="min-h-screen flex items-center justify-center p-4">
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
            </body>
        </html>
    )
}
