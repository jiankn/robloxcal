import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = "Sol's RNG Luck Calculator - Multiplier Stacking 2026"
    const description = "Free Sol's RNG luck calculator 2026. Calculate total luck when stacking potions, gamepasses, and event boosts. See your effective odds for rare auras."
    const url = `${BASE_URL}/sols-rng/srng-luck-calculator`

    return {
        title,
        description,
        keywords: [
            'sols rng luck calculator',
            'sols rng luck multiplier',
            'sols rng potion stacking',
            'sols rng luck guide',
            'sols rng gamepass luck',
            'sols rng best luck setup',
        ],
        openGraph: {
            title: "Sol's RNG Luck Calculator | RobloxCal",
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: "Sol's RNG Luck Calculator | RobloxCal",
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
