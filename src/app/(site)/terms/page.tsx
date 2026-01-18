import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Terms of Service | AFSE Calculator',
    description: 'Terms of Service for AFSE Calculator.',
    robots: {
        index: false,
        follow: true
    }
}

export default function TermsPage() {
    return (
        <div className="px-4 py-12">
            <div className="max-w-3xl mx-auto prose prose-invert prose-zinc">
                <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>

                <p className="text-zinc-400 text-sm mb-8">Last updated: January 14, 2026</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="text-zinc-400">
                        By accessing and using AFSE Calculator, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">2. Disclaimer</h2>
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 text-sm">
                        <p className="mb-2"><strong>Not Affiliated with Roblox:</strong></p>
                        <p>
                            AFSE Calculator is a fan-made tool and is <strong>not</strong> affiliated with, endorsed by, sponsored by, or sanctioned by Roblox Corporation or the developers of Anime Fighting Simulator Endless.
                        </p>
                    </div>
                    <p className="text-zinc-400 mt-4">
                        The materials on AFSE Calculator&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">3. Accuracy of Materials</h2>
                    <p className="text-zinc-400">
                        The materials appearing on AFSE Calculator&apos;s website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. Game mechanics in Anime Fighting Simulator Endless may change at any time, rendering our calculations obsolete.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">4. Limitations</h2>
                    <p className="text-zinc-400">
                        In no event shall AFSE Calculator or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AFSE Calculator&apos;s website.
                    </p>
                </section>

                <section className="mb-8">
                    <Link href="/" className="text-indigo-400 hover:text-indigo-300">
                        &larr; Back to Calculator
                    </Link>
                </section>
            </div>
        </div>
    )
}
