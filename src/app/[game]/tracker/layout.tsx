import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AFSE Stat Tracker | Track Progress & Estimate Time',
    description: 'Track your stats progress in Anime Fighting Simulator Endless. Calculate time to reach your goals for Strength, Chakra, Sword, and more.',
    keywords: [
        'afse stat tracker',
        'afse progress tracker',
        'anime fighting simulator endless tracker',
        'time to reach stat afse',
        'afse stat calculator time'
    ]
}

export default function TrackerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
