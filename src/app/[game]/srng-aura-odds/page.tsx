import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = "Sol's RNG Aura Odds Calculator - Expected Rolls 2026"
    const description = "Free Sol's RNG aura odds calculator 2026. Calculate expected rolls and time to get any aura. Factor in luck multipliers for accurate predictions."
    const url = `${BASE_URL}/sols-rng/srng-aura-odds`

    return {
        title,
        description,
        keywords: [
            'sols rng aura odds',
            'sols rng calculator',
            'sols rng expected rolls',
            'sols rng aura chances',
            'sols rng legendary odds',
            'sols rng divine odds',
            'sols rng luck calculator',
        ],
        openGraph: {
            title: "Sol's RNG Aura Odds Calculator | RobloxCal",
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: "Sol's RNG Aura Odds Calculator | RobloxCal",
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
