import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Plants Vs Brainrots DPS Calculator - Damage Per Second Calculator 2026'
    const description = 'Free Plants Vs Brainrots DPS calculator 2026. Calculate damage per second for all plants with mutations (Gold, Diamond, Neon, Frozen). Find the best plant builds and maximize your brainrot farming profits.'
    const url = `${BASE_URL}/plants-vs-brainrots/pvb-dps-calculator`

    return {
        title,
        description,
        keywords: [
            'plants vs brainrots dps calculator',
            'pvb damage calculator',
            'plants vs brainrots best plants',
            'pvb mutation damage',
            'plants vs brainrots calculator 2026',
            'pvb gatling pea dps',
            'plants vs brainrots winter melon',
            'pvb frozen mutation',
        ],
        openGraph: {
            title: 'PvB DPS Calculator | Plants Vs Brainrots',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'PvB DPS Calculator | RobloxCal',
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
