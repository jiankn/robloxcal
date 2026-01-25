import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Adopt Me Mega Neon Calculator - Time to Mega Estimator 2026'
    const description = 'Free Adopt Me mega neon calculator 2026. Calculate total time and pets needed to make a Mega Neon. Track your progress from normal pets to the ultimate Mega Neon pet.'
    const url = `${BASE_URL}/adopt-me/am-mega-calculator`

    return {
        title,
        description,
        keywords: [
            'adopt me mega neon calculator',
            'adopt me mega calculator',
            'adopt me how long to make mega',
            'adopt me mega neon time',
            'adopt me 16 pets calculator',
            'adopt me mega pet guide',
        ],
        openGraph: {
            title: 'Adopt Me Mega Neon Calculator | RobloxCal',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Adopt Me Mega Neon Calculator | RobloxCal',
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
