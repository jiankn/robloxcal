import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Blox Fruits Stat Calculator - Best Stat Point Distribution 2026'
    const description = 'Free Blox Fruits stat point calculator 2026. Find the optimal stat distribution for Fruit, Sword, Gun, and Hybrid builds. Calculate your build at any level from 1 to 2550.'
    const url = `${BASE_URL}/blox-fruits/bf-stat-calculator`

    return {
        title,
        description,
        keywords: [
            'blox fruits stat calculator',
            'blox fruits build calculator',
            'blox fruits stat point distribution',
            'blox fruits best build',
            'blox fruits fruit build',
            'blox fruits sword build',
            'blox fruits hybrid build',
            'blox fruits level 2550 build',
        ],
        openGraph: {
            title: 'Blox Fruits Stat Calculator | RobloxCal',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blox Fruits Stat Calculator | RobloxCal',
            description,
        },
        alternates: {
            canonical: url,
        },
    }
}

export default function Page() {
    return <Calculator />
}
