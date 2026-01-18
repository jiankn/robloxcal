'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { X, ChevronUp, BookOpen, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TocItem {
    id: string
    text: string
    level: number
}

interface WikiTableOfContentsProps {
    content: string
}

export function WikiTableOfContents({ content }: WikiTableOfContentsProps) {
    const [toc, setToc] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [mounted, setMounted] = useState(false)

    // 确保客户端渲染后再显示Portal
    useEffect(() => {
        setMounted(true)
    }, [])

    // 解析Markdown内容提取标题
    useEffect(() => {
        const headingRegex = /^(#{1,3})\s+(.+)$/gm
        const items: TocItem[] = []
        let match

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length
            const text = match[2].trim()
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')

            items.push({ id, text, level })
        }

        setToc(items)
    }, [content])

    // 监听滚动更新当前位置和进度
    useEffect(() => {
        const handleScroll = () => {
            // 计算滚动进度
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
            setScrollProgress(Math.min(100, Math.max(0, progress)))
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-80px 0px -80% 0px',
            }
        )

        toc.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) {
                observer.observe(element)
            }
        })

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [toc])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsOpen(false)
    }

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const navbarHeight = 100
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.scrollY - navbarHeight

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
            setIsOpen(false)
        }
    }

    if (toc.length < 2 || !mounted) {
        return null
    }

    // 使用Portal将浮动元素渲染到body根节点，绕过父元素的transform
    const floatingContent = (
        <>
            {/* 浮动按钮 - 固定在右下角 */}
            <div
                className="flex flex-col items-end gap-3"
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9999,
                }}
            >
                {/* 回到顶部按钮 */}
                {scrollProgress > 20 && (
                    <Button
                        onClick={scrollToTop}
                        size="icon"
                        className="h-10 w-10 rounded-full bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 shadow-lg backdrop-blur-sm"
                    >
                        <ChevronUp className="h-5 w-5" />
                    </Button>
                )}

                {/* 目录按钮 - 带进度环 */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25 transition-all hover:scale-105 flex items-center justify-center"
                >
                    {/* 进度环 */}
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
                    {isOpen ? (
                        <X className="h-6 w-6 text-white relative z-10" />
                    ) : (
                        <BookOpen className="h-6 w-6 text-white relative z-10" />
                    )}
                </button>
            </div>

            {/* 目录抽屉 */}
            {isOpen && (
                <>
                    {/* 背景遮罩 */}
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 9998,
                        }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* 目录面板 */}
                    <div
                        className="glass-card"
                        style={{
                            position: 'fixed',
                            bottom: '96px',
                            right: '24px',
                            width: '288px',
                            maxHeight: '60vh',
                            zIndex: 9999,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        {/* 标题 */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                            <div className="flex items-center gap-2 text-sm font-medium text-white">
                                <List className="h-4 w-4 text-purple-400" />
                                <span>目录</span>
                                <span className="text-xs text-zinc-500">({toc.length})</span>
                            </div>
                            <span className="text-xs text-zinc-500">{Math.round(scrollProgress)}%</span>
                        </div>

                        {/* 目录列表 */}
                        <nav className="p-2 max-h-[50vh] overflow-y-auto">
                            {toc.map((item, index) => (
                                <button
                                    key={`${item.id}-${index}`}
                                    onClick={() => scrollToHeading(item.id)}
                                    className={cn(
                                        'block w-full text-left text-sm py-2 px-3 rounded-lg transition-all',
                                        'hover:bg-zinc-800/80',
                                        item.level === 1 && 'font-semibold',
                                        item.level === 2 && 'pl-5 text-sm',
                                        item.level === 3 && 'pl-8 text-xs',
                                        activeId === item.id
                                            ? 'text-purple-400 bg-purple-500/20'
                                            : 'text-zinc-300 hover:text-white'
                                    )}
                                >
                                    <span className="line-clamp-1">{item.text}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </>
            )}
        </>
    )

    // 使用Portal渲染到body
    return createPortal(floatingContent, document.body)
}
