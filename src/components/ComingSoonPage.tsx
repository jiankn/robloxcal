'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Construction, ArrowLeft, Bell } from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'

interface ComingSoonPageProps {
    title: string
    description?: string
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
    const game = useGame()

    return (
        <div className="rc-container py-16">
            <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 mb-8">
                    <Construction className="h-10 w-10 text-yellow-400" />
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {title}
                </h1>

                <p className="text-lg text-zinc-400 mb-8">
                    {description || 'This tool is currently under development. Check back soon for updates!'}
                </p>

                <Card className="glass-card border-zinc-800/50 mb-8">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 text-left">
                            <Bell className="h-5 w-5 text-purple-400 shrink-0" />
                            <div>
                                <h3 className="font-medium text-white mb-1">Want to be notified?</h3>
                                <p className="text-sm text-zinc-400">
                                    Follow us on social media or check the homepage for announcements when this tool launches.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={`/${game.slug}`}>
                        <Button variant="outline" className="border-zinc-700">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to {game.display_name}
                        </Button>
                    </Link>
                    <Link href={`/${game.slug}/codes`}>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Browse Active Codes
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
