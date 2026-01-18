'use client'

import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { WikiTableOfContents } from './WikiSidebar'

interface WikiContentProps {
    content: string
    className?: string
}

export function WikiContent({ content, className }: WikiContentProps) {
    const contentRef = useRef<HTMLDivElement>(null)

    // 为所有标题添加ID以支持锚点跳转
    useEffect(() => {
        if (contentRef.current) {
            const headings = contentRef.current.querySelectorAll('h1, h2, h3')
            headings.forEach((heading) => {
                const text = heading.textContent || ''
                const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                heading.id = id
            })
        }
    }, [content])

    return (
        <>
            {/* 主要内容区 */}
            <div ref={contentRef} className={className}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>

            {/* 浮动目录按钮 */}
            <WikiTableOfContents content={content} />
        </>
    )
}
