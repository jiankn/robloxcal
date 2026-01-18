'use client'

import { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'

const STORAGE_KEY = 'robloxcal_disclaimer_dismissed'
const EXPIRY_DAYS = 7

export function DisclaimerBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // 检查 localStorage
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const { timestamp } = JSON.parse(stored)
            const now = Date.now()
            const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000

            // 如果还没过期，不显示
            if (now - timestamp < expiryMs) {
                return
            }
        }
        // 显示横幅
        setIsVisible(true)
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            timestamp: Date.now()
        }))
    }

    if (!isVisible) return null

    return (
        <div className="bg-gradient-to-r from-yellow-900/30 via-yellow-800/20 to-yellow-900/30 border-b border-yellow-500/20">
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex items-center justify-center gap-3 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />
                    <p className="text-yellow-200/90">
                        <span className="font-medium">Unofficial Tool:</span>{' '}
                        <span className="text-yellow-200/70">
                            RobloxCal is fan-made and not affiliated with Roblox Corporation or game developers.
                        </span>
                    </p>
                    <button
                        onClick={handleDismiss}
                        className="p-1 rounded hover:bg-yellow-500/20 transition-colors shrink-0 ml-2"
                        aria-label="Dismiss"
                    >
                        <X className="h-4 w-4 text-yellow-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}
