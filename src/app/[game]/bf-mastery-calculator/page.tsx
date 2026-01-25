import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Blox Fruits Mastery Calculator - EXP & Time Estimator 2026'
    const description = 'Free Blox Fruits mastery calculator 2026. Calculate EXP needed and estimated time to reach any mastery level. Compare grinding methods and optimize your training.'
    const url = `${BASE_URL}/blox-fruits/bf-mastery-calculator`

    return {
        title,
        description,
        keywords: [
            'blox fruits mastery calculator',
            'blox fruits exp calculator',
            'blox fruits mastery guide',
            'blox fruits how long to max mastery',
            'blox fruits grinding guide',
            'blox fruits level 300 mastery',
            'blox fruits fastest mastery',
        ],
        openGraph: {
            title: 'Blox Fruits Mastery Calculator | RobloxCal',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blox Fruits Mastery Calculator | RobloxCal',
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
