import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getAllActiveGames } from '@/lib/game-config'
import {
    Sparkles,
    Users,
    Calculator,
    Gift,
    Shield,
    Heart,
    ChevronRight,
    Gamepad2,
    Target,
    Zap
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'About RobloxCal — Free Roblox Game Calculator Network',
    description: 'Learn about RobloxCal, a community-driven platform providing free calculators, tools, and codes for popular Roblox games. Built by Roblox enthusiasts for the community.',
    keywords: [
        'about robloxcal',
        'roblox calculator',
        'roblox game tools',
        'roblox community'
    ],
    alternates: {
        canonical: 'https://robloxcal.com/about',
    }
}

export default function AboutPage() {
    const allGames = getAllActiveGames()

    return (
        <div className="min-h-screen flex flex-col bg-zinc-950">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <header className="relative py-16 sm:py-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
                    <div className="relative rc-container text-center">
                        <div className="rc-kicker bg-purple-500/30 border-purple-400/40 text-purple-100 mb-6 backdrop-blur-sm">
                            <Heart className="h-4 w-4 text-purple-200" />
                            <span>Made for the Community</span>
                        </div>

                        <h1 className="rc-title text-4xl sm:text-5xl md:text-6xl">
                            <span className="text-white">About </span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                RobloxCal
                            </span>
                        </h1>

                        <p className="mt-6 text-lg sm:text-xl rc-lead max-w-2xl mx-auto">
                            Your free, community-driven hub for Roblox game calculators, tools, and codes.
                        </p>
                    </div>
                </header>

                {/* Mission Section */}
                <section className="rc-container pb-16">
                    <div className="max-w-4xl mx-auto">
                        <Card className="glass-card border-zinc-800/50">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-purple-500/10 shrink-0">
                                        <Target className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Our Mission</h2>
                                        <p className="text-zinc-400 leading-relaxed">
                                            RobloxCal was created to help Roblox players optimize their gameplay experience.
                                            We provide <strong className="text-white">free, accurate calculators</strong> and
                                            <strong className="text-white"> up-to-date codes</strong> for the most popular Roblox games.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-3 gap-6 mt-8">
                                    <div className="text-center p-4">
                                        <div className="inline-flex p-3 rounded-xl bg-green-500/10 mb-3">
                                            <Calculator className="h-6 w-6 text-green-400" />
                                        </div>
                                        <h3 className="font-semibold text-white mb-1">Free Tools</h3>
                                        <p className="text-sm text-zinc-500">All calculators are 100% free to use</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-3">
                                            <Users className="h-6 w-6 text-blue-400" />
                                        </div>
                                        <h3 className="font-semibold text-white mb-1">Community Driven</h3>
                                        <p className="text-sm text-zinc-500">Data calibrated by real players</p>
                                    </div>
                                    <div className="text-center p-4">
                                        <div className="inline-flex p-3 rounded-xl bg-orange-500/10 mb-3">
                                            <Zap className="h-6 w-6 text-orange-400" />
                                        </div>
                                        <h3 className="font-semibold text-white mb-1">Always Updated</h3>
                                        <p className="text-sm text-zinc-500">Codes checked and updated daily</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* What We Offer Section */}
                <section className="rc-container pb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Offer</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="glass-card border-zinc-800/50 hover-lift">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                                            <Calculator className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">Game Calculators</h3>
                                            <p className="text-sm text-zinc-400">
                                                Specialized calculators for games like AFSE, Bomb Chip, Craft a Brainrot,
                                                and RVB Tycoon. Optimize your training, calculate odds, and maximize profits.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-zinc-800/50 hover-lift">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                                            <Gift className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">Updated Codes</h3>
                                            <p className="text-sm text-zinc-400">
                                                Working codes for {allGames.length}+ games, checked and updated regularly.
                                                Expired codes are removed to save your time.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-zinc-800/50 hover-lift">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
                                            <Gamepad2 className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">Game Guides</h3>
                                            <p className="text-sm text-zinc-400">
                                                Tier lists, strategy guides, and tips to help you progress faster
                                                and make smarter decisions in your favorite games.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-zinc-800/50 hover-lift">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-emerald-500/10 shrink-0">
                                            <Sparkles className="h-5 w-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">Robux Tools</h3>
                                            <p className="text-sm text-zinc-400">
                                                Robux tax calculator for Gamepass and PLS DONATE transactions.
                                                Know exactly how much you'll receive after the 30% fee.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Disclaimer Section */}
                <section className="rc-container pb-16">
                    <div className="max-w-4xl mx-auto">
                        <Card className="glass-card border-zinc-800/50 bg-zinc-900/50">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-yellow-500/10 shrink-0">
                                        <Shield className="h-6 w-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-3">Disclaimer</h2>
                                        <div className="text-sm text-zinc-400 space-y-3">
                                            <p>
                                                <strong className="text-white">RobloxCal is an unofficial, fan-made website.</strong> We are not affiliated with, endorsed by, or connected to Roblox Corporation or any game developers.
                                            </p>
                                            <p>
                                                All game names, logos, and trademarks mentioned on this site are the property of their respective owners. We use them for informational purposes only.
                                            </p>
                                            <p>
                                                Our calculators provide estimates based on community-submitted data. Results may vary due to game updates or changes in mechanics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="rc-container pb-20">
                    <Card className="glass-card border-zinc-800/50 bg-gradient-to-br from-purple-900/20 to-pink-900/10">
                        <CardContent className="p-8 text-center">
                            <Sparkles className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Start Using Our Tools
                            </h2>
                            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                                Browse our collection of free calculators and find the tools you need for your favorite games.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/">
                                    <Button className="bg-purple-600 hover:bg-purple-500 text-white">
                                        Browse All Games
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outline" className="border-zinc-700 hover:border-purple-500/50">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div>
    )
}
