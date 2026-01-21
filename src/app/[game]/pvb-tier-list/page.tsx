import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Plants Vs Brainrots Tier List - Best Plants Ranked 2026'
    const description = 'Complete Plants Vs Brainrots tier list 2026. All plants ranked from S to C tier. Find the best plants for maximum DPS including Winter Melon, Gatling Pea, Repeater and more. Updated with latest game balance.'
    const url = `${BASE_URL}/plants-vs-brainrots/pvb-tier-list`

    return {
        title,
        description,
        keywords: [
            'plants vs brainrots tier list',
            'pvb best plants',
            'plants vs brainrots plant rankings',
            'pvb winter melon tier',
            'plants vs brainrots meta 2026',
            'pvb gatling pea ranking',
            'best plants pvb',
            'plants vs brainrots guide',
        ],
        openGraph: {
            title: 'PvB Plant Tier List | Plants Vs Brainrots',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'PvB Tier List | RobloxCal',
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
