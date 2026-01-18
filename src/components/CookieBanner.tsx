'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import Link from 'next/link'

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [cookieSettings, setCookieSettings] = useState({
        necessary: true, // necessary cookies, usually cannot be disabled
        analytics: false,
        marketing: false
    })

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem('afse_cookie_consent')
        if (!hasAccepted) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('afse_cookie_consent', 'true')
        localStorage.setItem('afse_cookie_settings', JSON.stringify({
            necessary: true,
            analytics: true,
            marketing: true
        }))
        setIsVisible(false)
        setShowSettings(false)
    }

    const handleSaveSettings = () => {
        localStorage.setItem('afse_cookie_consent', 'true')
        localStorage.setItem('afse_cookie_settings', JSON.stringify(cookieSettings))
        setIsVisible(false)
        setShowSettings(false)
    }

    const handleRejectAll = () => {
        localStorage.setItem('afse_cookie_consent', 'true')
        localStorage.setItem('afse_cookie_settings', JSON.stringify({
            necessary: true,
            analytics: false,
            marketing: false
        }))
        setIsVisible(false)
        setShowSettings(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
            <Card className={`relative bg-zinc-900 border-zinc-800 shadow-xl ${showSettings ? 'py-3 px-4' : 'p-4'}`}>
                {/* absolute close button so it doesn't consume vertical space */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 h-6 w-6 text-zinc-500 hover:text-white"
                    onClick={() => setIsVisible(false)}
                >
                    <X className="h-4 w-4" />
                </Button>
                {!showSettings && (
                    <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-2">
                            <p className="text-sm text-zinc-300 font-medium">
                                We use cookies
                            </p>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                We use cookies to enhance your experience and analyze our traffic.
                                By clicking &quot;Accept&quot;, you consent to our use of cookies.
                                Read our <Link href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>
                )}

                {!showSettings ? (
                    // 默认状态 - 简单按钮
                    <div className="mt-3 flex justify-end gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-8"
                            onClick={() => setShowSettings(true)}
                        >
                            Manage
                        </Button>
                        <Button
                            size="sm"
                            className="text-xs h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={handleAccept}
                        >
                            Accept
                        </Button>
                    </div>
                ) : (
                    // 设置状态 - 详细选项
                    <div className="space-y-3">
                        <div className="text-center mt-2">
                            <h3 className="text-sm font-semibold text-white mb-1">Cookie Settings</h3>
                            <p className="text-xs text-zinc-400 mt-2">
                                Manage your cookie preferences. You can choose to allow or reject different types of cookies.
                            </p>
                        </div>

                    <div className="space-y-4">
                            {/* Necessary Cookies */}
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="necessary"
                                        checked={cookieSettings.necessary}
                                        disabled
                                    />
                                    <Label htmlFor="necessary" className="text-sm font-medium leading-tight">
                                        Necessary Cookies
                                    </Label>
                                </div>
                                <p className="text-xs text-zinc-500 ml-6">
                                    Essential for website functionality. Cannot be disabled.
                                </p>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="analytics"
                                        checked={cookieSettings.analytics}
                                        onCheckedChange={(checked) =>
                                            setCookieSettings(prev => ({ ...prev, analytics: checked as boolean }))
                                        }
                                    />
                                    <Label htmlFor="analytics" className="text-sm font-medium leading-tight">
                                        Analytics Cookies
                                    </Label>
                                </div>
                                <p className="text-xs text-zinc-500 ml-6">
                                    Help us improve user experience by analyzing usage.
                                </p>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="marketing"
                                        checked={cookieSettings.marketing}
                                        onCheckedChange={(checked) =>
                                            setCookieSettings(prev => ({ ...prev, marketing: checked as boolean }))
                                        }
                                    />
                                    <Label htmlFor="marketing" className="text-sm font-medium leading-tight">
                                        Marketing Cookies
                                    </Label>
                                </div>
                                <p className="text-xs text-zinc-500 ml-6">
                                    Used for personalized ads and ad tracking.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between gap-2 pt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-7 flex-1"
                                onClick={() => setShowSettings(false)}
                            >
                                Back
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 flex-1"
                                onClick={handleRejectAll}
                            >
                                Reject All
                            </Button>
                            <Button
                                size="sm"
                                className="text-xs h-7 bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
                                onClick={handleSaveSettings}
                            >
                                Save Settings
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}
