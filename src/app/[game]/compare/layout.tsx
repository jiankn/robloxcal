import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AFSE Compare Tool | Compare Weapons, Skills & Transformations',
    description: 'Compare Anime Fighting Simulator Endless weapons, skills, and transformations side-by-side. Find out which item has better DPS and stats.',
    keywords: [
        'afse compare tool',
        'afse weapon comparison',
        'anime fighting simulator endless compare',
        'compare skills afse',
        'best weapon vs best skill afse'
    ]
}

export default function CompareLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
