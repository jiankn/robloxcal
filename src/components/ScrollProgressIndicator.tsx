'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

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
                bottom: 'calc(24px + var(--cookie-banner-offset, 0px))',
                right: '24px',
                zIndex: 9999,
                transition: 'bottom 0.3s ease-in-out',
            }}
        >
            {/* 主进度按钮 - 带环形进度条和百分比 */}
            <button
                onClick={scrollToTop}
                className="relative h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25 transition-all hover:scale-105 flex items-center justify-center group"
                aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%. Click to scroll to top.`}
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

                {/* 中心百分比数字 */}
                <span className="text-white font-bold text-sm relative z-10">
                    {Math.round(scrollProgress)}%
                </span>
            </button>
        </div>
    )

    return createPortal(floatingContent, document.body)
}
