'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { getAllActiveGames } from '@/lib/game-config'

export function Footer() {
    const featuredGames = getAllActiveGames().filter(g => g.is_featured).slice(0, 5)
    const totalGames = getAllActiveGames().length

    return (
        <footer className="border-t border-zinc-800/50 bg-zinc-950 pt-8 mt-auto">
            <div className="rc-container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-3">
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-white">
                                Roblox<span className="text-purple-400">Cal</span>
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Roblox Calculators & Codes
                        </p>
                        <p className="text-xs text-zinc-400 mt-2">
                            Free, accurate, community-driven tools for Roblox players.
                        </p>
                    </div>

                    {/* Column 2: Calculators (SEO 锚文本优化) */}
                    <div>
                        <h3 className="font-semibold text-white mb-3">Calculators</h3>
                        <ul className="space-y-2 text-sm">
                            {featuredGames.map(game => (
                                <li key={game.slug}>
                                    <Link
                                        href={`/${game.slug}`}
                                        className="text-zinc-400 hover:text-white transition-colors"
                                    >
                                        {game.display_name} Calculator
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/"
                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    → All {totalGames} Games
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Game Codes (SEO 锚文本优化) */}
                    <div>
                        <h3 className="font-semibold text-white mb-3">Game Codes</h3>
                        <ul className="space-y-2 text-sm">
                            {featuredGames.map(game => (
                                <li key={game.slug}>
                                    <Link
                                        href={`/${game.slug}/codes`}
                                        className="text-zinc-400 hover:text-white transition-colors"
                                    >
                                        {game.display_name} Codes
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/#latest-codes"
                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    → All Codes Updates
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Support & Legal */}
                    <div>
                        <h3 className="font-semibold text-white mb-3">Support</h3>
                        <ul className="space-y-2 text-sm mb-4">
                            <li>
                                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="mailto:support@robloxcal.com?subject=Bug%20report%20(website)"
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    Bug Report
                                </a>
                            </li>
                            <li>
                                <span className="text-zinc-400">Response time: 24–48h</span>
                            </li>
                        </ul>

                        <h3 className="font-semibold text-white mb-3 mt-6">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-zinc-800/50 py-6 text-center">
                    <p className="text-xs text-zinc-400 mb-2">
                        RobloxCal is a fan-made tool and is not affiliated with Roblox Corporation or game developers.
                    </p>
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} RobloxCal. Made with ❤️ for the community.
                    </p>
                </div>
            </div>
        </footer>
    )
}
