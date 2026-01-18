import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createPublicServerClient } from '@/lib/supabase/server'
import {
    Settings,
    Database,
    FileText,
    Gift,
    BarChart3,
    Users,
    RefreshCw
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Admin | AFSE Calculator',
    robots: 'noindex, nofollow'
}

async function getStats() {
    const supabase = createPublicServerClient()

    const [samples, codes, areas] = await Promise.all([
        supabase.from('training_samples').select('id', { count: 'exact', head: true }),
        supabase.from('codes').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('training_areas').select('id', { count: 'exact', head: true })
    ])

    return {
        samplesCount: samples.count || 0,
        codesCount: codes.count || 0,
        areasCount: areas.count || 0
    }
}

export default async function AdminPage() {
    const stats = await getStats()

    const adminCards = [
        {
            title: 'Calibration Samples',
            description: 'Review and manage user-submitted training samples',
            href: '/admin/samples',
            icon: Database,
            color: 'blue',
            stat: stats.samplesCount,
            statLabel: 'total samples'
        },
        {
            title: 'Promo Codes',
            description: 'Add, edit, or deactivate promotional codes',
            href: '/admin/codes',
            icon: Gift,
            color: 'green',
            stat: stats.codesCount,
            statLabel: 'active codes'
        },
        {
            title: 'Training Parameters',
            description: 'View and adjust training area parameters',
            href: '/admin/params',
            icon: BarChart3,
            color: 'purple',
            stat: stats.areasCount,
            statLabel: 'training areas'
        },
        {
            title: 'Run Aggregation',
            description: 'Manually trigger the sample aggregation process',
            href: '/admin/aggregate',
            icon: RefreshCw,
            color: 'orange',
            stat: null,
            statLabel: null
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
                        <Settings className="h-3 w-3 mr-1" />
                        Admin Panel
                    </Badge>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        AFSE Admin Dashboard
                    </h1>
                    <p className="text-zinc-400">
                        Manage calibration data, codes, and site settings.
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-blue-400">{stats.samplesCount}</div>
                            <div className="text-sm text-zinc-400">Total Samples</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-green-400">{stats.codesCount}</div>
                            <div className="text-sm text-zinc-400">Active Codes</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardContent className="py-4 text-center">
                            <div className="text-2xl font-bold text-purple-400">{stats.areasCount}</div>
                            <div className="text-sm text-zinc-400">Training Areas</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {adminCards.map((card) => {
                        const Icon = card.icon
                        return (
                            <Link key={card.href} href={card.href}>
                                <Card className={`bg-zinc-900/50 border-zinc-800 hover:border-${card.color}-500/50 transition-all h-full`}>
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-lg bg-${card.color}-500/20`}>
                                                <Icon className={`h-6 w-6 text-${card.color}-400`} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-white">{card.title}</CardTitle>
                                                {card.stat !== null && (
                                                    <div className="text-sm text-zinc-400">
                                                        {card.stat} {card.statLabel}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-zinc-400">
                                            {card.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                {/* Quick Actions */}
                <Card className="bg-zinc-900/50 border-zinc-800 mt-8">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-zinc-400 text-sm">
                            <strong>Note:</strong> This is a basic admin panel. For a production site, you should:
                        </p>
                        <ul className="text-zinc-400 text-sm list-disc list-inside space-y-1">
                            <li>Add authentication (Supabase Auth)</li>
                            <li>Implement role-based access control</li>
                            <li>Add audit logging for changes</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300">
                        ← Back to Site
                    </Link>
                </div>
            </div>
        </div>
    )
}
