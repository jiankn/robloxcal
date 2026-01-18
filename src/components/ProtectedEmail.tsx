'use client'

import { useState, useEffect } from 'react'

interface ProtectedEmailProps {
    user: string
    domain: string
    className?: string
    showIcon?: boolean
}

/**
 * 防垃圾邮件的邮箱组件
 * 邮箱地址不会出现在 HTML 源码中，只在客户端 JavaScript 执行后才显示
 */
export function ProtectedEmail({ user, domain, className = '', showIcon = false }: ProtectedEmailProps) {
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        // 只在客户端执行，邮箱不会出现在服务端渲染的 HTML 中
        setEmail(`${user}@${domain}`)
    }, [user, domain])

    if (!email) {
        return <span className={className}>Loading...</span>
    }

    return (
        <a
            href={`mailto:${email}`}
            className={className}
        >
            {email}
        </a>
    )
}

/**
 * 防垃圾邮件的邮箱按钮组件
 */
export function ProtectedEmailButton({
    user,
    domain,
    children,
    className = ''
}: ProtectedEmailProps & { children: React.ReactNode }) {
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        setEmail(`${user}@${domain}`)
    }, [user, domain])

    const handleClick = () => {
        if (email) {
            window.location.href = `mailto:${email}`
        }
    }

    return (
        <button
            onClick={handleClick}
            className={className}
            disabled={!email}
        >
            {children}
        </button>
    )
}
