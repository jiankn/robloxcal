import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getGameBySlug } from '@/lib/game-config'
import { GameProvider } from '@/lib/game-context'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// 禁用静态生成
export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

interface GameLayoutProps {
    children: React.ReactNode
    params: Promise<{ game: string }>
}

// 动态生成游戏页面 metadata
export async function generateMetadata({ params }: GameLayoutProps): Promise<Metadata> {
    const { game: slug } = await params
    const game = getGameBySlug(slug)

    if (!game) {
        return {
            title: 'Game Not Found | RobloxCal',
        }
    }

    const title = `${game.full_name} Calculator — ${game.display_name} Tools | RobloxCal`
    const description = game.seo.description
    const url = `${BASE_URL}/${game.slug}`

    return {
        title,
        description,
        keywords: game.seo.keywords,
        openGraph: {
            title: `${game.display_name} Calculator | RobloxCal`,
            description,
            url,
            siteName: 'RobloxCal',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${game.display_name} Calculator | RobloxCal`,
            description,
        },
        alternates: {
            canonical: url,
        },
    }
}

export default async function GameLayout({ children, params }: GameLayoutProps) {
    const { game: slug } = await params

    // 获取游戏配置
    const game = getGameBySlug(slug)

    // 如果游戏不存在，返回 404
    if (!game) {
        notFound()
    }

    // 游戏主题色渐变配置 - 更强的颜色
    const themeGradients: Record<string, string> = {
        'afse': 'from-purple-900/60 via-purple-950/30',
        'bomb-chip': 'from-red-900/60 via-red-950/30',
        'craft-a-brainrot': 'from-green-900/60 via-green-950/30'
    }
    const gradient = themeGradients[slug] || themeGradients['afse']

    return (
        <GameProvider game={game}>
            <div className="min-h-screen flex flex-col bg-zinc-950 relative">
                {/* 游戏主题色渐变背景 */}
                <div
                    className={`fixed inset-0 bg-gradient-to-b ${gradient} to-transparent pointer-events-none`}
                    aria-hidden="true"
                />
                {/* 网格装饰背景 */}
                <div
                    className="fixed inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                    aria-hidden="true"
                />
                <Navbar />
                <main className="flex-1 relative z-10">
                    {children}
                </main>
                <Footer />
            </div>
        </GameProvider>
    )
}
