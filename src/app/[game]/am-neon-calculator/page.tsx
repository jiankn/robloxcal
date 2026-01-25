import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Adopt Me Neon Calculator - Pet Aging Time Estimator 2026'
    const description = 'Free Adopt Me neon calculator 2026. Calculate how long it takes to age 4 pets to Full Grown for making a Neon pet. Includes AFK aging methods and time estimates.'
    const url = `${BASE_URL}/adopt-me/am-neon-calculator`

    return {
        title,
        description,
        keywords: [
            'adopt me neon calculator',
            'adopt me aging calculator',
            'adopt me how long to make neon',
            'adopt me full grown calculator',
            'adopt me pet aging guide',
            'adopt me neon pet time',
            'adopt me afk aging',
        ],
        openGraph: {
            title: 'Adopt Me Neon Calculator | RobloxCal',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Adopt Me Neon Calculator | RobloxCal',
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
