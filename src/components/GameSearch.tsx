'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Clock, TrendingUp, ChevronRight, Gamepad2, X } from 'lucide-react'
import Link from 'next/link'
import { getAllActiveGames, type GameConfig } from '@/lib/game-config'

interface GameSearchProps {
    placeholder?: string
    compact?: boolean
    fullWidth?: boolean
}

const RECENT_GAMES_KEY = 'robloxcal_recent_games'

export function GameSearch({ placeholder = 'Search games...', compact = false, fullWidth = false }: GameSearchProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [recentGames, setRecentGames] = useState<string[]>([])
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const allGames = getAllActiveGames()

    // 加载最近访问
    useEffect(() => {
        const stored = localStorage.getItem(RECENT_GAMES_KEY)
        if (stored) {
            try {
                setRecentGames(JSON.parse(stored))
            } catch { }
        }
    }, [])

    // 过滤游戏
    const filteredGames = searchTerm
        ? allGames.filter(g =>
            g.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            g.slug.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : allGames

    // 获取最近访问的游戏配置
    const recentGameConfigs = recentGames
        .map(slug => allGames.find(g => g.slug === slug))
        .filter(Boolean) as GameConfig[]

    // 获取热门游戏
    const featuredGames = allGames.filter(g => g.is_featured)

    // 点击外部关闭
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // ESC 键关闭
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
                inputRef.current?.blur()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const recordVisit = (slug: string) => {
        const updated = [slug, ...recentGames.filter(s => s !== slug)].slice(0, 3)
        setRecentGames(updated)
        localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated))
    }

    const handleClear = () => {
        setSearchTerm('')
        inputRef.current?.focus()
    }

    // shrink width by ~20% for compact and default sizes for a tighter layout
    const inputSizeClass = compact ? 'h-9 w-48' : fullWidth ? 'h-11 w-full' : 'h-11 w-64'
    const dropdownClassName = compact
        ? 'absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-2rem)] bg-zinc-900/98 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl shadow-black/60 z-[100] overflow-hidden'
        : `absolute left-0 right-0 top-full mt-2 max-w-[calc(100vw-2rem)] bg-zinc-900/98 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl shadow-black/60 z-[100] overflow-hidden ${fullWidth ? '' : 'min-w-[320px]'}`

    // 游戏卡片组件
    const GameItem = ({ game, showBadge = true }: { game: GameConfig; showBadge?: boolean }) => (
        <Link
            href={`/${game.slug}`}
            onClick={() => {
                recordVisit(game.slug)
                setIsOpen(false)
                setSearchTerm('')
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/80 transition-all group"
        >
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-colors">
                <Gamepad2 className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                    {game.full_name}
                </div>
                <div className="text-xs text-zinc-500">
                    {game.display_name} • Calculator & Codes
                </div>
            </div>
            {showBadge && game.is_featured && (
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px]">
                    Popular
                </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
        </Link>
    )

    return (
        <div ref={containerRef} className="relative">
            {/* 搜索输入框 */}
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className={`pl-10 pr-10 bg-zinc-900/80 border-zinc-700/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 placeholder:text-zinc-500 rounded-xl transition-all ${inputSizeClass}`}
                />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-zinc-700 transition-colors"
                    >
                        <X className="h-3.5 w-3.5 text-zinc-400" />
                    </button>
                )}
            </div>

            {/* 下拉面板 - 固定定位，避免被截断 */}
            {isOpen && (
                <div className={dropdownClassName}>
                    {/* 头部提示 */}
                    <div className="px-4 py-2.5 border-b border-zinc-800/50 bg-zinc-900/50">
                        <div className="text-xs text-zinc-500">
                            {searchTerm ? (
                                <span>Showing {filteredGames.length} result{filteredGames.length !== 1 ? 's' : ''}</span>
                            ) : (
                                <span>Quick access to your games</span>
                            )}
                        </div>
                    </div>

                    {/* 内容区域 */}
                    <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                        {searchTerm ? (
                            // 搜索结果
                            filteredGames.length > 0 ? (
                                <div className="p-2">
                                    {filteredGames.map(game => (
                                        <GameItem key={game.slug} game={game} />
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="p-3 rounded-full bg-zinc-800/50 inline-block mb-3">
                                        <Search className="h-5 w-5 text-zinc-500" />
                                    </div>
                                    <div className="text-zinc-400 font-medium">No games found</div>
                                    <div className="text-xs text-zinc-600 mt-1">Try a different search term</div>
                                </div>
                            )
                        ) : (
                            // 默认展示
                            <>
                                {/* 最近访问 */}
                                {recentGameConfigs.length > 0 && (
                                    <div className="p-2 border-b border-zinc-800/50">
                                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            <Clock className="h-3.5 w-3.5" />
                                            Recently Played
                                        </div>
                                        {recentGameConfigs.map(game => (
                                            <GameItem key={game.slug} game={game} showBadge={false} />
                                        ))}
                                    </div>
                                )}

                                {/* 热门游戏 */}
                                <div className="p-2">
                                    <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        All Games
                                    </div>
                                    {featuredGames.map(game => (
                                        <GameItem key={game.slug} game={game} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* 底部 */}
                    <div className="border-t border-zinc-800/50 p-2 bg-zinc-900/50">
                        <Link
                            href="/#games"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all"
                        >
                            Browse All Games
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export function recordGameVisit(slug: string) {
    const stored = localStorage.getItem(RECENT_GAMES_KEY)
    const recent = stored ? JSON.parse(stored) : []
    const updated = [slug, ...recent.filter((s: string) => s !== slug)].slice(0, 3)
    localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated))
}

// 获取最近访问的游戏slug列表
export function getRecentGames(): string[] {
    if (typeof window === 'undefined') return []
    try {
        const stored = localStorage.getItem(RECENT_GAMES_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}
