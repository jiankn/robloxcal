import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StatPlanner from './StatPlanner'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface PageProps {
  params: Promise<{ game: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game } = await params

  if (game !== 'sailor-piece') {
    return { title: 'Tool Not Found | RobloxCal' }
  }

  return {
    title: 'Sailor Piece Stat Planner (2026) | RobloxCal',
    description:
      'Plan melee, defense, sword, gun, and fruit point allocation with this free Sailor Piece stat planner on RobloxCal.',
    alternates: {
      canonical: 'https://robloxcal.com/sailor-piece/sp-stat-planner',
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { game } = await params

  if (game !== 'sailor-piece') {
    notFound()
  }

  return <StatPlanner />
}
