'use client'

import { useEffect, useRef } from 'react'

interface AdSlotProps {
    /** AdSense 广告单元 ID */
    slotId: string
    /** 广告格式: horizontal (横幅), rectangle (方形), vertical (垂直) */
    format?: 'horizontal' | 'rectangle' | 'vertical' | 'auto'
    /** 是否响应式 */
    responsive?: boolean
    /** 自定义类名 */
    className?: string
}

/**
 * Google AdSense 广告位组件
 * 
 * 使用方式:
 * 1. 在 .env.local 中设置 NEXT_PUBLIC_ADSENSE_CLIENT_ID
 * 2. 在 layout.tsx 中添加 AdSense 脚本
 * 3. 在需要的位置使用 <AdSlot slotId="xxx" />
 */
export function AdSlot({
    slotId,
    format = 'auto',
    responsive = true,
    className = ''
}: AdSlotProps) {
    const adRef = useRef<HTMLModElement>(null)
    const isAdSenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true'
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

    useEffect(() => {
        // 仅在启用 AdSense 且 DOM 就绪后加载广告
        if (isAdSenseEnabled && adRef.current && typeof window !== 'undefined') {
            try {
                // @ts-ignore - AdSense 全局对象
                (window.adsbygoogle = window.adsbygoogle || []).push({})
            } catch (err) {
                console.error('AdSense error:', err)
            }
        }
    }, [isAdSenseEnabled])

    // AdSense 未启用时显示占位符
    if (!isAdSenseEnabled || !clientId) {
        return (
            <div className={`ad-slot-placeholder ${className}`}>
                <div className="flex items-center justify-center h-full min-h-[90px] bg-zinc-900/30 border border-dashed border-zinc-700 rounded-lg">
                    <span className="text-xs text-zinc-600">Advertisement</span>
                </div>
            </div>
        )
    }

    // 根据格式设置样式
    const formatStyles: Record<string, string> = {
        horizontal: 'min-h-[90px]',
        rectangle: 'min-h-[250px]',
        vertical: 'min-h-[600px]',
        auto: 'min-h-[90px]'
    }

    return (
        <div className={`ad-slot ${className}`}>
            {/* AdSense 政策要求: 明确标注广告 */}
            <div className="text-[10px] text-zinc-600 mb-1 text-center">
                Advertisement
            </div>
            <ins
                ref={adRef}
                className={`adsbygoogle block ${formatStyles[format]}`}
                style={{ display: 'block' }}
                data-ad-client={clientId}
                data-ad-slot={slotId}
                data-ad-format={responsive ? 'auto' : format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
            />
        </div>
    )
}

/**
 * 智能广告/内推切换组件
 * 
 * AdSense 启用时显示广告,否则显示内部推荐内容
 */
interface SmartAdSlotProps {
    slotId: string
    format?: 'horizontal' | 'rectangle' | 'vertical' | 'auto'
    fallback?: React.ReactNode
    className?: string
}

export function SmartAdSlot({
    slotId,
    format = 'auto',
    fallback,
    className = ''
}: SmartAdSlotProps) {
    const isAdSenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true'

    if (isAdSenseEnabled) {
        return <AdSlot slotId={slotId} format={format} className={className} />
    }

    // 显示自定义 fallback 或默认占位
    if (fallback) {
        return <>{fallback}</>
    }

    return (
        <div className={`smart-ad-fallback ${className}`}>
            <div className="flex items-center justify-center h-full min-h-[90px] bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 border border-zinc-800 rounded-lg">
                <span className="text-xs text-zinc-500">Sponsored Content</span>
            </div>
        </div>
    )
}
