import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Blox Fruits Value Calculator - Fruit Trading Values 2026'
    const description = 'Free Blox Fruits value calculator 2026. Check current fruit values, compare trades, and determine if a trade is a Win, Fair, or Lose. Updated fruit tier list with demand ratings.'
    const url = `${BASE_URL}/blox-fruits/bf-fruit-value`

    return {
        title,
        description,
        keywords: [
            'blox fruits value calculator',
            'blox fruits fruit values',
            'blox fruits trading values',
            'blox fruits WFL calculator',
            'blox fruits leopard value',
            'blox fruits dragon value',
            'blox fruits trade calculator',
            'blox fruits tier list 2026',
        ],
        openGraph: {
            title: 'Blox Fruits Value Calculator | RobloxCal',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blox Fruits Value Calculator | RobloxCal',
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
