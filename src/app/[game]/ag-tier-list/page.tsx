import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Anime Guardians Tier List - Best Units Ranked 2026'
    const description = 'Complete Anime Guardians tier list 2026. All units ranked from SS to C tier including Gojo, Sukuna, Madara, Tanjiro and more. Find the best units for tower defense with anime/role filters. Updated for Update 22.5.'
    const url = `${BASE_URL}/anime-guardians/ag-tier-list`

    return {
        title,
        description,
        keywords: [
            'anime guardians tier list',
            'anime guardians best units',
            'anime guardians gojo tier',
            'anime guardians sukuna ranking',
            'ag tier list 2026',
            'anime guardians meta units',
            'anime guardians unit rankings',
            'best characters anime guardians',
        ],
        openGraph: {
            title: 'Unit Tier List | Anime Guardians',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Anime Guardians Tier List | RobloxCal',
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
