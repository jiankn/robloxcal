'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * 检测 Supabase Auth 回调的 hash fragment 并重定向
 * Supabase 发送的密码重置/Magic Link 会把 token 放在 URL hash 中
 */
export function AuthRedirectHandler() {
    const router = useRouter()

    useEffect(() => {
        // 检查 URL hash 中是否有 access_token
        if (typeof window !== 'undefined' && window.location.hash) {
            const hashParams = new URLSearchParams(window.location.hash.substring(1))
            const accessToken = hashParams.get('access_token')
            const type = hashParams.get('type')

            // 如果是 recovery 类型（密码重置），重定向到密码重置页面
            if (accessToken && type === 'recovery') {
                router.push(`/auth/reset-password${window.location.hash}`)
            }
        }
    }, [router])

    return null
}
