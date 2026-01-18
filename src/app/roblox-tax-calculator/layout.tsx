import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Roblox Tax Calculator - Gamepass & PLS DONATE Robux Counter',
    description: 'Free Roblox tax calculator for Gamepass and PLS DONATE. Calculate your Robux after the 30% Marketplace Fee. Accurate Robux counter for all transactions.',
    keywords: [
        'roblox tax calculator',
        'roblox pls donate calculator',
        'pls donate tax roblox',
        'roblox calculator robux counter',
        'roblox gamepass calculator',
        'how much is 400 robux with tax',
        'roblox marketplace fee',
        'robux tax',
        'roblox 30% fee'
    ],
    openGraph: {
        title: 'Roblox Tax Calculator - Gamepass & PLS DONATE',
        description: 'Calculate your Robux earnings after the 30% Marketplace Fee. Works for Gamepass, PLS DONATE, and all UGC transactions.',
        url: 'https://robloxcal.com/roblox-tax-calculator',
        type: 'website',
    },
    alternates: {
        canonical: 'https://robloxcal.com/roblox-tax-calculator',
    }
}

export default function RobuxTaxCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-950">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    )
}
