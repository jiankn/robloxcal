import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'The Forge Calculator - Forge Weapon & Armor Predictor 2026'
    const description = 'Free The Forge calculator 2026. Predict weapon and armor stats before crafting. Calculate equipment class, damage, defense, and trait probabilities based on ore type and quantity. Optimize your forging strategy.'
    const url = `${BASE_URL}/the-forge/forge-calculator`

    return {
        title,
        description,
        keywords: [
            'the forge calculator',
            'the forge roblox calculator',
            'forge weapon calculator',
            'the forge equipment predictor',
            'the forge crafting guide',
            'the forge ore calculator',
            'the forge mythril stats',
            'the forge trait calculator',
        ],
        openGraph: {
            title: 'Forge Calculator | The Forge Roblox',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'The Forge Calculator | RobloxCal',
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
