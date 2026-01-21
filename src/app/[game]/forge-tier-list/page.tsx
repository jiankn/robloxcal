import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'The Forge Ore Tier List - Best Ores Ranked 2026'
    const description = 'Complete The Forge ore tier list 2026. All ores ranked from Mythril to Copper. Find the best mining locations, ore multipliers, and equipment value guide. Optimize your mining and forging strategy.'
    const url = `${BASE_URL}/the-forge/forge-tier-list`

    return {
        title,
        description,
        keywords: [
            'the forge tier list',
            'the forge best ore',
            'the forge ore rankings',
            'the forge mythril location',
            'the forge mining guide',
            'the forge obsidian tier',
            'best ore the forge roblox',
            'the forge ore multiplier',
        ],
        openGraph: {
            title: 'Ore Tier List | The Forge Roblox',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'The Forge Tier List | RobloxCal',
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
