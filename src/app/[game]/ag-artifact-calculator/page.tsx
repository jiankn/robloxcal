import { Metadata } from 'next'
import Calculator from './Calculator'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Anime Guardians Artifact Calculator - Best Artifacts & Sets 2026'
    const description = 'Free Anime Guardians artifact calculator 2026. Calculate artifact set bonuses, stat totals, and optimize your builds. Find the best artifact sets including Warrior, Guardian, Swift, Destroyer and Immortal sets.'
    const url = `${BASE_URL}/anime-guardians/ag-artifact-calculator`

    return {
        title,
        description,
        keywords: [
            'anime guardians artifact calculator',
            'anime guardians best artifacts',
            'ag artifact guide',
            'anime guardians set bonus',
            'anime guardians equipment calculator',
            'anime guardians destroyer set',
            'ag artifact stats',
            'anime guardians build calculator',
        ],
        openGraph: {
            title: 'Artifact Calculator | Anime Guardians',
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'AG Artifact Calculator | RobloxCal',
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
