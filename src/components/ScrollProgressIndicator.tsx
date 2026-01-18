'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * 滚动进度指示器 - 浮动按钮带环形进度条
 * 用于首页显示页面滚动进度，点击可回到顶部
 */
export function ScrollProgressIndicator() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [mounted, setMounted] = useState(false)

    // 确保客户端渲染后再显示Portal
    useEffect(() => {
        setMounted(true)
    }, [])

    // 监听滚动更新进度
    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
            setScrollProgress(Math.min(100, Math.max(0, progress)))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // 只在滚动超过一定距离后显示
    if (!mounted || scrollProgress < 5) {
        return null
    }

    const floatingContent = (
        <div
            className="flex flex-col items-end gap-3"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9999,
            }}
        >
            {/* 回到顶部按钮 - 只在滚动较多时显示 */}
            {scrollProgress > 25 && (
                <Button
                    onClick={scrollToTop}
                    size="icon"
                    className="h-10 w-10 rounded-full bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 shadow-lg backdrop-blur-sm transition-all hover:scale-105"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </Button>
            )}

            {/* 主进度按钮 - 带环形进度条 */}
            <button
                onClick={scrollToTop}
                className="relative h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25 transition-all hover:scale-105 flex items-center justify-center group"
                aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
            >
                {/* 进度环背景 */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                    <circle
                        cx="28"
                        cy="28"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-purple-800"
                    />
                    {/* 进度环前景 */}
                    <circle
                        cx="28"
                        cy="28"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 25}`}
                        strokeDashoffset={`${2 * Math.PI * 25 * (1 - scrollProgress / 100)}`}
                        className="text-white transition-all duration-150"
                        strokeLinecap="round"
                    />
                </svg>

                {/* 中心图标 */}
                <Sparkles className="h-5 w-5 text-white relative z-10 group-hover:scale-110 transition-transform" />

                {/* 进度百分比 - hover时显示 */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-zinc-900/80 px-2 py-1 rounded">
                    {Math.round(scrollProgress)}%
                </span>
            </button>
        </div>
    )

    return createPortal(floatingContent, document.body)
}
