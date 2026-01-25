import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Adopt Me Trade Calculator - WFL Value Checker 2026'
    const description = 'Free Adopt Me trade calculator 2026. Check if a trade is Win, Fair, or Lose (WFL). Compare pet values including Normal, Neon, and Mega Neon pets.'
    const url = `${BASE_URL}/adopt-me/am-trade-calculator`

    return {
        title,
        description,
        keywords: [
            'adopt me trade calculator',
            'adopt me WFL calculator',
            'adopt me value calculator',
            'adopt me pet values',
            'adopt me is this trade fair',
            'adopt me trade worth',
            'adopt me frost dragon value',
            'adopt me shadow dragon value',
        ],
        openGraph: {
            title: 'Adopt Me Trade Calculator | RobloxCal',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Adopt Me Trade Calculator | RobloxCal',
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
