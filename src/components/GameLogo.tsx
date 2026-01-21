'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Gamepad2 } from 'lucide-react'

interface GameLogoProps {
    slug: string
    size?: number
    className?: string
    fallbackClassName?: string
    /** 是否为首屏关键图片，设为 true 启用预加载 */
    priority?: boolean
}

/**
 * 游戏 Logo 组件
 * 显示游戏官方 Logo，如果加载失败则显示通用图标
 * 使用 Next.js Image 自动优化图片尺寸和格式
 */
export function GameLogo({
    slug,
    size = 32,
    className = '',
    fallbackClassName = '',
    priority = false
}: GameLogoProps) {
    const [hasError, setHasError] = useState(false)
    const logoPath = `/games/logos/${slug}.webp`

    if (hasError) {
        // Fallback 到通用图标
        return (
            <div
                className={`flex items-center justify-center bg-purple-500/20 rounded-lg ${fallbackClassName}`}
                style={{ width: size, height: size }}
            >
                <Gamepad2 className="text-purple-400" style={{ width: size * 0.6, height: size * 0.6 }} />
            </div>
        )
    }

    return (
        <Image
            src={logoPath}
            alt={`${slug} logo`}
            width={size}
            height={size}
            className={`rounded-lg object-cover ${className}`}
            onError={() => setHasError(true)}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            sizes={`${size}px`}
        />
    )
}
