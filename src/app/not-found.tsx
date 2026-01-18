import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">404</h2>
                <p className="text-xl text-zinc-400 mb-6">Page Not Found</p>
                <Link
                    href="/"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
