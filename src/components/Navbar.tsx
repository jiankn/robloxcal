'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
    Sparkles,
    Menu,
    ChevronLeft,
    ChevronDown,
    ChevronRight,
    Gamepad2,
    Gift,
    HelpCircle,
    Mail,
    LayoutGrid,
    Flame,
    Clock,
    Zap,
    Calculator,
    Percent,
    Wrench,
    Search
} from 'lucide-react'
import { GameSearch, recordGameVisit, getRecentGames } from '@/components/GameSearch'
import { GameLogo } from '@/components/GameLogo'
import { getNavItems } from '@/lib/game-nav-config'
import { getAllActiveGames, getGameBySlug, type GameConfig } from '@/lib/game-config'

// 热门游戏数量限制
const MAX_POPULAR_GAMES = 4

// Games下拉菜单组件
function GamesDropdown() {
    const allGames = getAllActiveGames()
    const popularGames = allGames.slice(0, MAX_POPULAR_GAMES)
    const hasMoreGames = allGames.length > MAX_POPULAR_GAMES

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 px-4">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Games
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-zinc-900 border-zinc-700">
                {/* 热门游戏标签 */}
                <DropdownMenuLabel className="flex items-center gap-2 text-orange-400">
                    <Flame className="h-4 w-4" />
                    Popular Games
                </DropdownMenuLabel>

                {/* 热门游戏列表 */}
                {popularGames.map(game => (
                    <DropdownMenuItem key={game.slug} asChild>
                        <Link
                            href={`/${game.slug}`}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <GameLogo slug={game.slug} size={28} />
                            <div className="flex-1">
                                <div className="font-medium text-white">{game.display_name}</div>
                                <div className="text-xs text-zinc-500">{game.full_name}</div>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                ))}

                {/* 分隔线和更多游戏链接 */}
                <DropdownMenuSeparator className="bg-zinc-700" />
                <DropdownMenuItem asChild>
                    <Link
                        href="/games"
                        className="flex items-center justify-between cursor-pointer text-purple-400 hover:text-purple-300"
                    >
                        <span className="flex items-center gap-2">
                            <LayoutGrid className="h-4 w-4" />
                            {hasMoreGames ? `More Games (${allGames.length})` : 'All Games'}
                        </span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// Codes更新数据
const codesUpdates = [
    { game: 'RVB Tycoon', slug: 'rvb-tycoon', newCodes: 7, activeCodes: 7, updatedAt: 'Just now' },
    { game: 'AFSE', slug: 'afse', newCodes: 2, activeCodes: 12, updatedAt: '2 hours ago' },
    { game: 'Brainrot', slug: 'craft-a-brainrot', newCodes: 1, activeCodes: 8, updatedAt: '3 hours ago' },
    { game: 'Bomb Chip', slug: 'bomb-chip', newCodes: 0, activeCodes: 5, updatedAt: '1 day ago' },
]

// Codes下拉菜单组件
function CodesDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 px-4">
                    <Gift className="h-4 w-4 mr-2" />
                    Latest Codes
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 bg-zinc-900 border-zinc-700">
                {/* 标题 */}
                <DropdownMenuLabel className="flex items-center gap-2 text-green-400">
                    <Gift className="h-4 w-4" />
                    Hot Codes Updates
                </DropdownMenuLabel>

                {/* Codes列表 */}
                {codesUpdates.map(update => (
                    <DropdownMenuItem key={update.slug} asChild>
                        <Link
                            href={`/${update.slug}/codes`}
                            className="flex items-center gap-3 cursor-pointer py-2.5"
                        >
                            <GameLogo slug={update.slug} size={20} />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{update.game} Codes</span>
                                    {update.newCodes > 0 && (
                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-[10px] px-1.5 py-0">
                                            +{update.newCodes} new
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    {update.activeCodes} active • Updated {update.updatedAt}
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-zinc-600" />
                        </Link>
                    </DropdownMenuItem>
                ))}

                {/* 分隔线和查看全部 */}
                <DropdownMenuSeparator className="bg-zinc-700" />
                <DropdownMenuItem asChild>
                    <Link
                        href="/all-codes"
                        className="flex items-center justify-between cursor-pointer text-green-400 hover:text-green-300"
                    >
                        <span className="flex items-center gap-2">
                            <Gift className="h-4 w-4" />
                            Browse All Codes
                        </span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// Tools下拉菜单组件
function ToolsDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 px-4">
                    <Wrench className="h-4 w-4 mr-2" />
                    Tools
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 bg-zinc-900 border-zinc-700">
                {/* 标题 */}
                <DropdownMenuLabel className="flex items-center gap-2 text-emerald-400">
                    <Calculator className="h-4 w-4" />
                    Utility Calculators
                </DropdownMenuLabel>

                {/* Robux Tax Calculator */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/roblox-tax-calculator"
                        className="flex items-center gap-3 cursor-pointer py-2.5"
                    >
                        <Percent className="h-4 w-4 text-green-400" />
                        <div className="flex-1">
                            <div className="font-medium text-white">Robux Tax Calculator</div>
                            <div className="text-xs text-zinc-500">
                                Gamepass & PLS DONATE fees
                            </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-600" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// 首页全局导航
function GlobalNavbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const allGames = getAllActiveGames()

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex h-14 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-white">
                            Roblox<span className="text-purple-400">Cal</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation - 更宽间距，按钮样式 */}
                    <div className="hidden md:flex items-center gap-2">
                        {/* Games下拉菜单 */}
                        <GamesDropdown />
                        {/* Codes下拉菜单 */}
                        <CodesDropdown />
                        {/* Tools下拉菜单 */}
                        <ToolsDropdown />
                        <Link href="/#faq">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 px-4">
                                <HelpCircle className="h-4 w-4 mr-2" />
                                FAQ
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-zinc-400 hover:text-white hover:bg-zinc-800/50 px-4 ${pathname === '/contact' ? 'text-white bg-zinc-800/60' : ''}`}
                            >
                                <Mail className="h-4 w-4 mr-2" />
                                Contact
                            </Button>
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="hidden md:block">
                        <GameSearch placeholder={`Search ${getAllActiveGames().length} games...`} compact />
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="text-zinc-400" aria-label="Open main menu">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[280px] bg-zinc-950 border-zinc-800 p-0"
                            onCloseAutoFocus={(e) => e.preventDefault()}
                        >
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetDescription className="sr-only">Site navigation</SheetDescription>
                            <div className="flex flex-col h-full">
                                {/* 头部标题 */}
                                <div className="p-5 border-b border-zinc-800">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600">
                                            <Sparkles className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-bold text-white">
                                            Roblox<span className="text-purple-400">Cal</span>
                                        </span>
                                    </div>
                                </div>

                                {/* 核心导航 - Games、Codes、FAQ */}
                                <div className="flex-1 py-4">
                                    <Link
                                        href="/games"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 px-5 py-4 text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all group"
                                    >
                                        <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                                            <LayoutGrid className="h-5 w-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Games</div>
                                            <div className="text-xs text-zinc-500">Browse all {allGames.length} games</div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 ml-auto text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setIsOpen(false)
                                            setTimeout(() => {
                                                const el = document.getElementById('latest-codes')
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            }, 100)
                                        }}
                                        className="flex items-center gap-4 px-5 py-4 text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all group w-full text-left"
                                    >
                                        <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                                            <Gift className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">Latest Codes</div>
                                            <div className="text-xs text-zinc-500">Free rewards & items</div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 ml-auto text-zinc-600 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all" />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsOpen(false)
                                            setTimeout(() => {
                                                const el = document.getElementById('faq')
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                            }, 100)
                                        }}
                                        className="flex items-center gap-4 px-5 py-4 text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all group w-full text-left"
                                    >
                                        <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                                            <HelpCircle className="h-5 w-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">FAQ</div>
                                            <div className="text-xs text-zinc-500">Common questions</div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 ml-auto text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                                    </button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}


// 游戏页上下文导航
function GameNavbar({ game }: { game: GameConfig }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const allGames = getAllActiveGames()
    const navItems = getNavItems(game.game_key)
    // no dynamic indicator refs to avoid SSR/webpack runtime issues

    // 记录访问
    useEffect(() => {
        recordGameVisit(game.slug)
    }, [game.slug])

    // removed dynamic indicator effect due to SSR runtime compatibility

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto px-4">
                {/* 第一行：返回 + 游戏名 (居中) + 搜索 + 切换器 (右侧) */}
                <div className="flex h-12 items-center border-b border-zinc-800/30">
                    {/* 左侧：Logo */}
                    <Link href="/" className="hidden md:flex items-center gap-2 group w-44 shrink-0">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                            <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-white">
                            Roblox<span className="text-purple-400">Cal</span>
                        </span>
                    </Link>

                    {/* 中间：返回 + 游戏名 - 居中 */}
                    <div className="flex-1 flex items-center justify-center gap-3">
                        <Link
                            href="/games"
                            className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            All Games
                        </Link>
                        <span className="text-zinc-700">|</span>
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-gradient-to-br from-purple-600 to-pink-600">
                                <Gamepad2 className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-semibold text-white">
                                {game.full_name}
                            </span>
                            <span className="text-zinc-500 text-sm hidden sm:inline">
                                ({game.display_name})
                            </span>
                        </div>
                    </div>

                    {/* 右侧：搜索 + 游戏切换器 */}
                    <div className="hidden md:flex items-center gap-3 w-64 justify-end shrink-0">
                        <GameSearch placeholder="Search games..." compact />

                        {/* 游戏切换器 - Mega Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800/50">
                                    <Gamepad2 className="h-4 w-4 mr-2" />
                                    Switch
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[320px] bg-zinc-900/95 backdrop-blur-xl border-zinc-700 p-0"
                            >
                                {/* Mega Menu Header */}
                                <div className="px-3 py-2 border-b border-zinc-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                                            <LayoutGrid className="h-3.5 w-3.5 text-purple-400" />
                                            Switch Game
                                        </div>
                                        <span className="text-[10px] text-zinc-500">{allGames.length} games</span>
                                    </div>
                                </div>

                                {/* Games Grid - 紧凑横向布局 */}
                                <div className="p-2 max-h-[280px] overflow-y-auto">
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {allGames.map((g, index) => {
                                            const isCurrent = g.slug === game.slug
                                            const isPopular = index < 2
                                            const codeInfo = codesUpdates.find(c => c.slug === g.slug)

                                            return (
                                                <DropdownMenuItem key={g.slug} asChild className="p-0">
                                                    <Link
                                                        href={`/${g.slug}`}
                                                        className={`flex items-center gap-2 px-2 py-2 rounded-md transition-all group ${isCurrent
                                                            ? 'bg-purple-500/15 border border-purple-500/30'
                                                            : 'hover:bg-zinc-800/80 border border-transparent'
                                                            }`}
                                                    >
                                                        <GameLogo slug={g.slug} size={24} className="shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1">
                                                                <span className={`text-xs font-medium truncate ${isCurrent ? 'text-purple-300' : 'text-white'}`}>
                                                                    {g.display_name}
                                                                </span>
                                                                {isPopular && !isCurrent && (
                                                                    <span className="text-[9px]">🔥</span>
                                                                )}
                                                                {isCurrent && (
                                                                    <span className="text-[9px] text-purple-400">✓</span>
                                                                )}
                                                            </div>
                                                            {codeInfo && codeInfo.newCodes > 0 && (
                                                                <span className="text-[9px] text-green-400">
                                                                    +{codeInfo.newCodes} codes
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-3 py-2 border-t border-zinc-800 bg-zinc-900/50">
                                    <Link
                                        href="/games"
                                        className="flex items-center justify-between text-[10px] text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <span className="flex items-center gap-1">
                                            <LayoutGrid className="h-3 w-3" />
                                            View All Games
                                        </span>
                                        <ChevronRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* 第二行：工具导航 - 居中分布，美化按钮 */}
                <div className="hidden md:flex relative h-12 pb-2 items-center justify-center gap-1 border-t border-zinc-800/30 overflow-visible">
                    {navItems.map((item, index) => {
                        // All games use flattened structure /derived from root
                        const prefix = `/${game.slug}`
                        const fullPath = `${prefix}${item.href}`
                        const isActive = pathname === fullPath || pathname?.startsWith(fullPath + '/')
                        const Icon = item.icon
                        return (
                            <Link key={item.href} href={fullPath} aria-current={isActive ? 'page' : undefined}>
                                <div className="relative inline-block">
                                    <Button
                                        variant={isActive ? "secondary" : "ghost"}
                                        size="sm"
                                        className={`px-4 h-9 text-sm transition-all rounded-full flex items-center gap-2 transform ${isActive
                                            ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/10 text-white shadow-sm scale-[1.02] font-semibold'
                                            : 'text-zinc-500 hover:text-white hover:bg-zinc-800/30 hover:-translate-y-0.5 hover:scale-105 font-medium'
                                            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:ring-offset-2`}
                                    >
                                        <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                                        <span>{item.label}</span>
                                        {item.isNew && (
                                            <Badge className="ml-2 px-1.5 py-0 text-[10px] bg-green-500/20 text-green-400 border-green-500/30">
                                                NEW
                                            </Badge>
                                        )}
                                    </Button>

                                    {/* active underline indicator */}
                                    {isActive ? (
                                        <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded" />
                                    ) : null}
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Mobile Menu - 分离搜索和菜单 */}
                <div className="md:hidden flex h-11 items-center justify-between">
                    {/* 左侧：菜单按钮 */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-zinc-400" aria-label="Open game menu">
                                <Menu className="h-5 w-5 mr-2" />
                                Menu
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] bg-zinc-950 border-zinc-800 p-0">
                            <SheetTitle className="sr-only">Game Menu</SheetTitle>
                            <SheetDescription className="sr-only">Game navigation and tools</SheetDescription>
                            <div className="flex flex-col h-full">
                                {/* 游戏切换器 - 移到顶部 */}
                                <div className="p-4 border-b border-zinc-800">
                                    <div className="text-xs text-zinc-500 uppercase mb-2">Current Game</div>
                                    <div className="font-medium text-white">{game.full_name}</div>
                                    <div className="text-sm text-zinc-500">({game.display_name})</div>
                                </div>

                                {/* 工具导航 */}
                                <div className="flex-1 overflow-auto py-4">
                                    {navItems.map((item) => {
                                        // All games use flattened structure available from root
                                        const prefix = `/${game.slug}`
                                        const fullPath = `${prefix}${item.href}`
                                        const isActive = pathname === fullPath || pathname?.startsWith(fullPath + '/')
                                        const Icon = item.icon

                                        return (
                                            <Link
                                                key={item.href}
                                                href={fullPath}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 ${isActive
                                                    ? 'bg-zinc-800/80 text-white'
                                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                                    }`}
                                            >
                                                <Icon className={`h-5 w-5 ${isActive ? 'text-purple-400' : ''}`} />
                                                {item.label}
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* 返回首页 */}
                                <div className="p-4 border-t border-zinc-800">
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Back to All Games
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* 右侧：独立的搜索按钮 */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-zinc-400"
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search games"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* 全屏搜索覆盖层 - 仅手机端 */}
            {
                isSearchOpen && (
                    <div
                        className="md:hidden fixed inset-0 z-[100] bg-zinc-950/98 backdrop-blur-xl"
                        onClick={(e) => {
                            // 点击覆盖层空白区域时关闭
                            if (e.target === e.currentTarget) {
                                setIsSearchOpen(false)
                            }
                        }}
                    >
                        {/* 搜索头部 */}
                        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
                            <div className="flex-1">
                                <GameSearch
                                    placeholder="Search games..."
                                    fullWidth
                                    autoFocus
                                    onClose={() => setIsSearchOpen(false)}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-zinc-400 shrink-0"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>

                        {/* 点击此区域关闭覆盖层 */}
                        <div
                            className="flex-1 p-4 text-center text-zinc-500 text-sm"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            <p>Search for games, calculators, codes...</p>
                            <p className="mt-2 text-xs text-zinc-600">Tap here to close</p>
                        </div>
                    </div>
                )
            }
        </nav >
    )
}

// 主导航组件：根据路径自动切换模式
export function Navbar() {
    const [pathname, setPathname] = useState<string | null>(null)
    const [game, setGame] = useState<GameConfig | null>(null)
    const routerPathname = usePathname()

    useEffect(() => {
        setPathname(routerPathname)
    }, [routerPathname])

    useEffect(() => {
        if (!pathname) return

        // 解析路径获取游戏 slug
        const segments = pathname.split('/').filter(Boolean)
        if (segments.length > 0) {
            let gameSlug: string | null = null

            // 支持两种 URL 格式兼容 check for now, but prioritize root
            // 2. /games/[game-slug]/... (Legacy check)
            if (segments[0] === 'games' && segments.length > 1) {
                gameSlug = segments[1]
            } else {
                gameSlug = segments[0]
            }

            const gameConfig = getGameBySlug(gameSlug)
            setGame(gameConfig)
        } else {
            setGame(null)
        }
    }, [pathname])


    // Don't render until pathname is available to prevent router mounting issues
    if (!pathname) {
        return null
    }

    // 首页显示全局导航
    if (pathname === '/' || !game) {
        return <GlobalNavbar />
    }

    // 游戏页显示游戏导航
    return <GameNavbar game={game} />
}
