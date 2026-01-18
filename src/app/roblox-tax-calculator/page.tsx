'use client'

import { useState, useCallback } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollProgressIndicator } from '@/components/ScrollProgressIndicator'
import {
    Calculator,
    ArrowRight,
    ArrowLeft,
    Percent,
    Gift,
    ShoppingCart,
    HelpCircle,
    Sparkles,
    ChevronRight,
    TrendingUp,
    Zap
} from 'lucide-react'

// Roblox 税率固定为 30%，玩家到手 70%
const TAX_RATE = 0.30
const KEEP_RATE = 1 - TAX_RATE // 0.70

// 常见金额快速查询表
const QUICK_AMOUNTS = [
    { price: 50, afterTax: Math.floor(50 * KEEP_RATE) },
    { price: 100, afterTax: Math.floor(100 * KEEP_RATE) },
    { price: 200, afterTax: Math.floor(200 * KEEP_RATE) },
    { price: 400, afterTax: Math.floor(400 * KEEP_RATE) },
    { price: 500, afterTax: Math.floor(500 * KEEP_RATE) },
    { price: 1000, afterTax: Math.floor(1000 * KEEP_RATE) },
    { price: 2000, afterTax: Math.floor(2000 * KEEP_RATE) },
    { price: 5000, afterTax: Math.floor(5000 * KEEP_RATE) },
]

// FAQ 数据
const faqs = [
    {
        q: 'What is the Roblox Marketplace fee?',
        a: 'Roblox charges a 30% Marketplace Fee on all transactions, including Gamepass sales, Developer Products, and PLS DONATE donations. Sellers receive 70% of the listed price.'
    },
    {
        q: 'What is the PLS DONATE tax rate?',
        a: 'PLS DONATE uses the standard Roblox Marketplace Fee of 30%. When someone donates Robux to you, you receive 70% of the amount they paid.'
    },
    {
        q: 'How much is 400 Robux with tax?',
        a: 'If you list an item for 400 Robux, you will receive 280 Robux after the 30% tax (400 × 0.70 = 280). The buyer pays 400, Roblox takes 120, and you get 280.'
    },
    {
        q: 'How do I calculate Robux after tax?',
        a: 'Multiply your listed price by 0.70 (or 70%). For example: 1000 Robux × 0.70 = 700 Robux received.'
    },
    {
        q: 'Does the tax apply to all Roblox games?',
        a: 'Yes, the 30% Marketplace Fee applies to all UGC (User Generated Content) transactions across Roblox, including Gamepasses, Developer Products, clothing, and in-game donations.'
    },
]

export default function RobuxTaxCalculatorPage() {
    // 计算器状态
    const [listedPrice, setListedPrice] = useState<string>('')
    const [desiredAmount, setDesiredAmount] = useState<string>('')
    const [mode, setMode] = useState<'gamepass' | 'pls-donate'>('gamepass')

    // 计算到手金额（从标价）
    const calculateAfterTax = useCallback((price: string): number => {
        const num = parseFloat(price)
        if (isNaN(num) || num <= 0) return 0
        return Math.floor(num * KEEP_RATE)
    }, [])

    // 计算需要标价（从期望到手）
    const calculateRequiredPrice = useCallback((desired: string): number => {
        const num = parseFloat(desired)
        if (isNaN(num) || num <= 0) return 0
        return Math.ceil(num / KEEP_RATE)
    }, [])

    const afterTaxAmount = calculateAfterTax(listedPrice)
    const requiredPrice = calculateRequiredPrice(desiredAmount)
    const taxDeducted = listedPrice ? Math.floor(parseFloat(listedPrice) * TAX_RATE) : 0
    const taxFromRequired = requiredPrice ? Math.floor(requiredPrice * TAX_RATE) : 0

    return (
        <>
            <ScrollProgressIndicator />

            {/* Hero Section */}
            <header className="relative py-16 sm:py-20">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative rc-container text-center">
                    <div className="rc-kicker bg-green-500/30 border-green-400/40 text-green-100 mb-6 backdrop-blur-sm">
                        <Percent className="h-4 w-4 text-green-200" />
                        <span>30% Marketplace Fee • 70% Earnings</span>
                    </div>

                    <h1 className="rc-title text-4xl sm:text-5xl md:text-6xl">
                        <span className="text-white">Roblox </span>
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                            Tax Calculator
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl rc-lead max-w-2xl mx-auto">
                        Calculate your Robux earnings after the 30% Marketplace Fee.
                        Works for <strong>Gamepass</strong>, <strong>PLS DONATE</strong>, and all UGC transactions.
                    </p>
                </div>
            </header>

            {/* Calculator Section */}
            <section className="rc-container pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Mode Selector */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex bg-zinc-900 rounded-full p-1 border border-zinc-800">
                            <button
                                onClick={() => setMode('gamepass')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${mode === 'gamepass'
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Gamepass Mode
                            </button>
                            <button
                                onClick={() => setMode('pls-donate')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${mode === 'pls-donate'
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                <Gift className="h-4 w-4" />
                                PLS DONATE Mode
                            </button>
                        </div>
                    </div>

                    {/* Calculator Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Card 1: Listed Price → After Tax */}
                        <Card className="glass-card border-zinc-800/50 hover-lift">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className={`p-2 rounded-lg ${mode === 'gamepass' ? 'bg-purple-500/20' : 'bg-green-500/20'}`}>
                                        <TrendingUp className={`h-5 w-5 ${mode === 'gamepass' ? 'text-purple-400' : 'text-green-400'}`} />
                                    </div>
                                    <div>
                                        <div className="text-white">Price → Earnings</div>
                                        <div className="text-sm font-normal text-zinc-500">
                                            How much will I receive?
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="listed-price" className="text-zinc-400 text-sm">
                                        {mode === 'gamepass' ? 'Gamepass Price' : 'Donation Amount'} (Robux)
                                    </Label>
                                    <div className="relative mt-2">
                                        <Input
                                            id="listed-price"
                                            type="number"
                                            placeholder="Enter price..."
                                            value={listedPrice}
                                            onChange={(e) => setListedPrice(e.target.value)}
                                            className="bg-zinc-900 border-zinc-700 text-white text-lg h-12 pr-16"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                                            R$
                                        </span>
                                    </div>
                                </div>

                                {listedPrice && parseFloat(listedPrice) > 0 && (
                                    <div className="pt-4 border-t border-zinc-800">
                                        <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">
                                            <span>Marketplace Fee (30%)</span>
                                            <span className="text-red-400">-{taxDeducted.toLocaleString()} R$</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-400">You Receive</span>
                                            <span className={`text-2xl font-bold ${mode === 'gamepass' ? 'text-purple-400' : 'text-green-400'}`}>
                                                {afterTaxAmount.toLocaleString()} R$
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Card 2: Desired Amount → Required Price */}
                        <Card className="glass-card border-zinc-800/50 hover-lift">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className={`p-2 rounded-lg ${mode === 'gamepass' ? 'bg-purple-500/20' : 'bg-green-500/20'}`}>
                                        <Calculator className={`h-5 w-5 ${mode === 'gamepass' ? 'text-purple-400' : 'text-green-400'}`} />
                                    </div>
                                    <div>
                                        <div className="text-white">Earnings → Price</div>
                                        <div className="text-sm font-normal text-zinc-500">
                                            What should I charge?
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="desired-amount" className="text-zinc-400 text-sm">
                                        Desired Earnings (Robux)
                                    </Label>
                                    <div className="relative mt-2">
                                        <Input
                                            id="desired-amount"
                                            type="number"
                                            placeholder="Enter amount..."
                                            value={desiredAmount}
                                            onChange={(e) => setDesiredAmount(e.target.value)}
                                            className="bg-zinc-900 border-zinc-700 text-white text-lg h-12 pr-16"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                                            R$
                                        </span>
                                    </div>
                                </div>

                                {desiredAmount && parseFloat(desiredAmount) > 0 && (
                                    <div className="pt-4 border-t border-zinc-800">
                                        <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">
                                            <span>Marketplace Fee (30%)</span>
                                            <span className="text-red-400">-{taxFromRequired.toLocaleString()} R$</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-400">List Price At</span>
                                            <span className={`text-2xl font-bold ${mode === 'gamepass' ? 'text-purple-400' : 'text-green-400'}`}>
                                                {requiredPrice.toLocaleString()} R$
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Quick Reference Table */}
            <section className="rc-container pb-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Quick Reference Table
                    </h2>
                    <p className="text-zinc-500 text-center mb-8">
                        Common Robux amounts and their after-tax values
                    </p>

                    <Card className="glass-card border-zinc-800/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-zinc-400">
                                            Listed Price
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-red-400">
                                            Tax Deducted (30%)
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-green-400">
                                            You Receive (70%)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {QUICK_AMOUNTS.map((item, index) => (
                                        <tr
                                            key={item.price}
                                            className={`border-b border-zinc-800/50 ${index % 2 === 0 ? 'bg-zinc-900/20' : ''
                                                }`}
                                        >
                                            <td className="py-4 px-6 text-white font-medium">
                                                {item.price.toLocaleString()} R$
                                            </td>
                                            <td className="py-4 px-6 text-red-400">
                                                -{Math.floor(item.price * TAX_RATE).toLocaleString()} R$
                                            </td>
                                            <td className="py-4 px-6 text-green-400 font-semibold">
                                                {item.afterTax.toLocaleString()} R$
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="rc-container-narrow pb-20 scroll-mt-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="text-zinc-500 mt-2">Everything about Roblox tax and fees</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <Card key={i} className="glass-card border-zinc-800/50 hover-lift">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-white mb-2">{faq.q}</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="rc-container pb-20">
                <Card className="glass-card border-zinc-800/50 bg-gradient-to-br from-purple-900/20 to-pink-900/10">
                    <CardContent className="p-8 text-center">
                        <Sparkles className="h-10 w-10 text-purple-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Explore More Calculators
                        </h2>
                        <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                            Check out our game-specific calculators for AFSE, Bomb Chip, Craft a Brainrot, and more!
                        </p>
                        <Link href="/">
                            <Button className="bg-purple-600 hover:bg-purple-500 text-white">
                                Browse All Games
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Roblox Tax Calculator",
                        "url": "https://robloxcal.com/roblox-tax-calculator",
                        "description": "Free Roblox tax calculator for Gamepass and PLS DONATE. Calculate your Robux after the 30% Marketplace Fee.",
                        "applicationCategory": "UtilityApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.a
                            }
                        }))
                    })
                }}
            />
        </>
    )
}
