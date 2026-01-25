import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = "Sol's RNG Crafting Calculator - Material Requirements 2026"
    const description = "Free Sol's RNG crafting calculator 2026. Calculate auras and materials needed to craft any item. Plan your grinding efficiently with expected roll estimates."
    const url = `${BASE_URL}/sols-rng/srng-crafting`

    return {
        title,
        description,
        keywords: [
            'sols rng crafting calculator',
            'sols rng crafting guide',
            'sols rng materials needed',
            'sols rng how to craft',
            'sols rng aura requirements',
            'sols rng gear crafting',
        ],
        openGraph: {
            title: "Sol's RNG Crafting Calculator | RobloxCal",
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: "Sol's RNG Crafting Calculator | RobloxCal",
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
