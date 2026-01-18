'use client'

interface AdLayoutProps {
    children: React.ReactNode
    /** 内容区最大宽度 */
    maxWidth?: 'narrow' | 'default' | 'wide'
    className?: string
}

/**
 * 页面布局组件（广告已移除）
 * 
 * 用法:
 * <AdLayout>
 *   <YourPageContent />
 * </AdLayout>
 */
export function AdLayout({
    children,
    maxWidth = 'default',
    className = ''
}: AdLayoutProps) {
    const maxWidthClass = {
        narrow: 'max-w-4xl',
        default: 'max-w-6xl',
        wide: 'max-w-7xl'
    }[maxWidth]

    return (
        <div className={`${maxWidthClass} mx-auto px-4 ${className}`}>
            {children}
        </div>
    )
}
