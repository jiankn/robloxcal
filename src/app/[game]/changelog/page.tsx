import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { History, Sparkles, Bug, Zap, Plus } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Changelog | AFSE Calculator Updates',
    description: 'Latest updates and changes to the AFSE Calculator tool.',
}

const changelog = [
    {
        version: '2.0.0',
        date: '2026-01-13',
        type: 'major',
        title: 'Phase 2 Update',
        changes: [
            { type: 'feature', text: 'Added Skills Database with detailed stats' },
            { type: 'feature', text: 'Added Transformations Database' },
            { type: 'feature', text: 'Added Changelog page' },
            { type: 'improvement', text: 'Enhanced navigation with global navbar' },
        ]
    },
    {
        version: '1.5.0',
        date: '2026-01-13',
        type: 'minor',
        title: 'Weapons Database',
        changes: [
            { type: 'feature', text: 'Added Weapons Database with 12 weapons' },
            { type: 'feature', text: 'Added global navigation bar' },
            { type: 'improvement', text: 'Mobile-friendly responsive menu' },
        ]
    },
    {
        version: '1.4.0',
        date: '2026-01-13',
        type: 'minor',
        title: 'Landing Page Redesign',
        changes: [
            { type: 'improvement', text: 'New grid background with gradient orbs' },
            { type: 'feature', text: 'Added statistics counter in hero section' },
            { type: 'feature', text: 'Added feature highlights section' },
            { type: 'improvement', text: 'Complete footer redesign' },
        ]
    },
    {
        version: '1.3.0',
        date: '2026-01-13',
        type: 'minor',
        title: 'Admin & Guides',
        changes: [
            { type: 'feature', text: 'Added Guides section with 5 SEO articles' },
            { type: 'feature', text: 'Added Admin dashboard for site management' },
            { type: 'feature', text: 'Added sample review and code management' },
        ]
    },
    {
        version: '1.2.0',
        date: '2026-01-13',
        type: 'minor',
        title: 'DPS & Tier List',
        changes: [
            { type: 'feature', text: 'Added DPS Calculator with weapon/skill selection' },
            { type: 'feature', text: 'Added Tier List page' },
            { type: 'improvement', text: 'Enhanced homepage quick links' },
        ]
    },
    {
        version: '1.0.0',
        date: '2026-01-12',
        type: 'major',
        title: 'Initial Release',
        changes: [
            { type: 'feature', text: 'Training Optimizer with all stat types' },
            { type: 'feature', text: 'Calibration system for community data' },
            { type: 'feature', text: 'Active codes page' },
            { type: 'feature', text: 'Training areas database' },
            { type: 'feature', text: 'FAQ page' },
        ]
    }
]

const typeIcons = {
    feature: { icon: Plus, color: 'text-green-400' },
    improvement: { icon: Sparkles, color: 'text-blue-400' },
    fix: { icon: Bug, color: 'text-red-400' },
}

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <History className="h-3 w-3 mr-1" />
                        Updates
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Changelog
                    </h1>
                    <p className="text-zinc-400">
                        Track all updates and improvements to AFSE Calculator.
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-8">
                    {changelog.map((release, index) => (
                        <Card key={release.version} className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Badge className={
                                            release.type === 'major'
                                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                        }>
                                            v{release.version}
                                        </Badge>
                                        <CardTitle className="text-white">{release.title}</CardTitle>
                                    </div>
                                    <span className="text-sm text-zinc-500">{release.date}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {release.changes.map((change, i) => {
                                        const { icon: Icon, color } = typeIcons[change.type as keyof typeof typeIcons] || typeIcons.feature
                                        return (
                                            <li key={i} className="flex items-start gap-2">
                                                <Icon className={`h-4 w-4 mt-0.5 ${color}`} />
                                                <span className="text-zinc-300 text-sm">{change.text}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="text-center mt-12 text-sm text-zinc-500">
                    <p>Want to suggest a feature? Join our Discord community!</p>
                </div>
            </div>
        </div>
    )
}
