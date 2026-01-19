'use client'

import { ReactNode } from 'react'
import { AdLayout } from '@/components/AdLayout'
import { getGameBySlug } from '@/lib/game-config'
import Link from 'next/link'
import { ChevronRight, Home, Gamepad2 } from 'lucide-react'

interface CalculatorLayoutProps {
    title: string
    description: string
    gameSlug: string
    children: ReactNode
}

export interface CalculatorResult {
    // Unused interface but exported for compatibility
    [key: string]: any
}

export function CalculatorLayout({ title, description, gameSlug, children }: CalculatorLayoutProps) {
    const game = getGameBySlug(gameSlug)

    return (
        <div className="rc-container py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8 flex-wrap">
                <Link href="/" className="hover:text-white transition-colors"><Home className="h-4 w-4" /></Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/games" className="hover:text-white transition-colors">Games</Link>
                {game && (
                    <>
                        <ChevronRight className="h-4 w-4" />
                        <Link href={`/${gameSlug}`} className="hover:text-white transition-colors">
                            {game.display_name}
                        </Link>
                    </>
                )}
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{title}</span>
            </nav>

            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-4">
                    <Gamepad2 className="h-3 w-3" />
                    {game?.full_name || 'Game Tool'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {title}
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl">
                    {description}
                </p>
            </div>

            <AdLayout>
                {children}
            </AdLayout>
        </div>
    )
}
