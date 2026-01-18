import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AFSE DPS Calculator | Anime Fighting Simulator Endless Damage Calculator',
    description: 'Calculate your damage per second in Anime Fighting Simulator Endless. Compare weapons, skills, and transformations. Free AFSE DPS calculator.',
    keywords: [
        'afse dps calculator',
        'anime fighting simulator endless damage calculator',
        'afse damage calculator',
        'best weapon afse',
        'afse skill damage',
        'afse transformation dps'
    ]
}

export default function DPSLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
