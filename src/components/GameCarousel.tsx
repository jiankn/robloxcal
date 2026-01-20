'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GameLogo } from '@/components/GameLogo'
import {
  Sword,
  Bomb,
  Coins,
  Castle,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Gift,
  Zap,
  Play,
  Pause
} from 'lucide-react'

interface GameItem {
  slug: string
  name: string
  shortName: string
  tagline: string
  icon: string
  color: string
  badge: string
  codesCount: number
  lastUpdated: string
  features?: string[]
}

interface GameCarouselProps {
  games: GameItem[]
  autoPlayInterval?: number
}

const ICON_MAP = {
  sword: Sword,
  bomb: Bomb,
  coins: Coins,
  castle: Castle
}

const COLOR_STYLES: Record<string, { iconWrap: string; icon: string; glow: string }> = {
  purple: {
    iconWrap: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    icon: 'text-purple-400',
    glow: 'hover:shadow-purple-500/10'
  },
  blue: {
    iconWrap: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    icon: 'text-blue-400',
    glow: 'hover:shadow-blue-500/10'
  },
  red: {
    iconWrap: 'bg-red-500/10 group-hover:bg-red-500/20',
    icon: 'text-red-400',
    glow: 'hover:shadow-red-500/10'
  },
  green: {
    iconWrap: 'bg-green-500/10 group-hover:bg-green-500/20',
    icon: 'text-green-400',
    glow: 'hover:shadow-green-500/10'
  }
}

export function GameCarousel({ games, autoPlayInterval = 4000 }: GameCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // 自动轮播
  useEffect(() => {
    if (!isPlaying || isHovered || games.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, games.length, autoPlayInterval])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (games.length === 0) return null

  const currentGame = games[currentIndex]
  const Icon = ICON_MAP[currentGame.icon as keyof typeof ICON_MAP] || Sword
  const styles = COLOR_STYLES[currentGame.color] || COLOR_STYLES.purple

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 主卡片 */}
      <div className="relative">
        <Link href={`/${currentGame.slug}`} className="group block">
          <div className={`relative px-4 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-${currentGame.color}-900/40 via-${currentGame.color}-800/30 to-${currentGame.color === 'purple' ? 'pink' : currentGame.color}-900/40 border border-${currentGame.color}-500/30 rounded-2xl sm:rounded-3xl hover:border-${currentGame.color}-400/50 transition-all hover:scale-[1.01] sm:hover:scale-[1.02] ${styles.glow} hover:shadow-xl duration-300`}>
            {/* 火焰标签 */}
            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs sm:text-sm font-semibold text-white shadow-lg animate-pulse">
                🔥 Most Popular
              </span>
            </div>

            {/* 移动端：纵向布局，桌面端：横向布局 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mt-3 sm:mt-4">
              {/* 游戏信息 */}
              <div className="flex items-center gap-3 sm:gap-6 flex-1">
                <GameLogo slug={currentGame.slug} size={56} className="shrink-0 sm:w-16 sm:h-16" />
                <div className="text-left flex-1 min-w-0">
                  <div className="font-bold text-white text-base sm:text-xl group-hover:text-current transition-colors mb-0.5 sm:mb-1 truncate">
                    {currentGame.name}
                  </div>
                  <div className="text-xs sm:text-sm text-zinc-400 mb-1.5 sm:mb-2 truncate">
                    {currentGame.tagline}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {currentGame.codesCount} codes
                    </div>
                    <div className="hidden xs:flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Updated {currentGame.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>

              {/* 快速操作按钮 - 移动端只显示一个按钮 */}
              <div className="flex items-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" className={`bg-${currentGame.color}-600 hover:bg-${currentGame.color}-700 text-white px-3 sm:px-4 flex-1 sm:flex-none`}>
                  <Calculator className="h-4 w-4 mr-1.5 sm:mr-2" />
                  <span className="sm:inline">Calculator</span>
                </Button>
                {/* 桌面端显示 Codes 按钮 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-zinc-600 hover:border-green-500/50 px-4"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.location.href = `/${currentGame.slug}/codes`
                  }}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Codes
                </Button>
              </div>
            </div>
          </div>
        </Link>

        {/* 导航控制 */}
        {games.length > 1 && (
          <>
            {/* 左右箭头 */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous game"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next game"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* 播放/暂停按钮 */}
            <button
              onClick={togglePlayPause}
              className="absolute top-4 right-16 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
              aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </>
        )}
      </div>

      {/* 缩略图指示器 */}
      {games.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          {games.map((game, index) => {
            const GameIcon = ICON_MAP[game.icon as keyof typeof ICON_MAP] || Sword
            const gameStyles = COLOR_STYLES[game.color] || COLOR_STYLES.purple

            return (
              <button
                key={game.slug}
                onClick={() => goToSlide(index)}
                className={`relative p-1.5 rounded-xl transition-all ${index === currentIndex
                  ? `ring-2 ring-purple-500/50 scale-110`
                  : 'opacity-60 hover:opacity-100 scale-100'
                  }`}
                aria-label={`Go to ${game.name}`}
              >
                <GameLogo slug={game.slug} size={28} />
              </button>
            )
          })}
        </div>
      )}

      {/* 进度条 - 使用透明度过渡避免闪烁 */}
      {games.length > 1 && isPlaying && (
        <div className={`mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100 ease-linear"
            style={{
              width: `${((currentIndex + 1) / games.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  )
}
