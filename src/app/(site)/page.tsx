import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GameSearch } from '@/components/GameSearch'
import { GameCarousel } from '@/components/GameCarousel'
import { ScrollProgressIndicator } from '@/components/ScrollProgressIndicator'
import { getAllActiveGames } from '@/lib/game-config'
import {
  Sparkles,
  ChevronRight,
  Calculator,
  Gift,
  Clock,
  Zap,
  HelpCircle,
  AlertTriangle,
  Sword,
  Bomb,
  Coins,
  Castle,
  Percent,
  Wrench
} from 'lucide-react'

// 图标映射表
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  sword: Sword,
  bomb: Bomb,
  coins: Coins,
  castle: Castle
}

export const metadata: Metadata = {
  title: 'RobloxCal — Roblox Game Calculators & Codes',
  description: 'Free Roblox game calculators and updated codes for top games like AFSE, Bomb Chip, and Craft a Brainrot. Community-calibrated accuracy.',
  keywords: ['roblox calculator', 'roblox game calculator', 'roblox codes', 'afse calculator', 'bomb chip calculator', 'brainrot calculator'],
  openGraph: {
    title: 'RobloxCal — Roblox Game Calculators & Codes',
    description: 'Free game calculators and codes for popular Roblox games.',
    url: 'https://robloxcal.com/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://robloxcal.com/',
  }
}

// 游戏数据（SEO 权重分发）
const featuredGames = [
  {
    slug: 'afse',
    name: 'Anime Fighting Simulator: Endless',
    shortName: 'AFSE',
    tagline: 'Training + DPS + Tier List',
    icon: 'sword',
    color: 'purple',
    badge: 'Popular',
    codesCount: 12,
    lastUpdated: '2 hours ago'
  },
  {
    slug: 'rvb-tycoon',
    name: 'Red VS Blue Tycoon',
    shortName: 'RVB Tycoon',
    tagline: 'Optimizer + Rebirth + Weapons',
    icon: 'castle',
    color: 'blue',
    badge: 'New',
    codesCount: 7,
    lastUpdated: 'Just now'
  },
  {
    slug: 'bomb-chip',
    name: 'Bomb Chip',
    shortName: 'Bomb Chip',
    tagline: 'Placement + Odds Calculator',
    icon: 'bomb',
    color: 'red',
    badge: '',
    codesCount: 5,
    lastUpdated: '1 day ago'
  },
  {
    slug: 'craft-a-brainrot',
    name: 'Craft a Brainrot',
    shortName: 'Brainrot',
    tagline: 'Profit + Rebirth Optimizer',
    icon: 'coins',
    color: 'green',
    badge: '',
    codesCount: 8,
    lastUpdated: '3 hours ago'
  }
]

const FEATURED_GAME_STYLES: Record<string, { iconWrap: string; icon: string }> = {
  purple: { iconWrap: 'bg-purple-500/10 group-hover:bg-purple-500/20', icon: 'text-purple-400' },
  blue: { iconWrap: 'bg-blue-500/10 group-hover:bg-blue-500/20', icon: 'text-blue-400' },
  red: { iconWrap: 'bg-red-500/10 group-hover:bg-red-500/20', icon: 'text-red-400' },
  green: { iconWrap: 'bg-green-500/10 group-hover:bg-green-500/20', icon: 'text-green-400' },
}

// 最新 Codes 更新
const latestCodeUpdates = [
  { game: 'RVB Tycoon', slug: 'rvb-tycoon', newCodes: 7, activeCodes: 7, updatedAt: 'Just now' },
  { game: 'AFSE', slug: 'afse', newCodes: 2, activeCodes: 12, updatedAt: '2 hours ago' },
  { game: 'Brainrot', slug: 'craft-a-brainrot', newCodes: 1, activeCodes: 8, updatedAt: '3 hours ago' },
  { game: 'Bomb Chip', slug: 'bomb-chip', newCodes: 0, activeCodes: 5, updatedAt: '1 day ago' },
]

// FAQ 数据
const faqs = [
  {
    q: 'What is RobloxCal?',
    a: 'RobloxCal provides free calculators and tools for popular Roblox games. We help players optimize their gameplay with accurate, community-calibrated data.'
  },
  {
    q: 'How accurate are the calculators?',
    a: 'Our calculators use community-submitted data that gets aggregated and validated. The more players contribute calibration data, the more accurate the results become.'
  },
  {
    q: 'How often are codes updated?',
    a: 'We check for new codes daily and update our lists as soon as new codes are released or old ones expire. Check back regularly for the latest working codes.'
  },
  {
    q: 'Is RobloxCal official?',
    a: 'No. RobloxCal is an unofficial fan-made tools site. We are not affiliated with Roblox Corporation or any game developers.'
  },
  {
    q: 'How do I use the calculators?',
    a: 'Simply select your game, enter your current stats or settings, and the calculator will show you optimal strategies. Each tool has specific instructions on its page.'
  },
  {
    q: 'Why do results vary between sessions?',
    a: 'Game mechanics may change with updates. Our calibration system adapts to these changes over time as players submit new data.'
  }
]

export default function HomePage() {
  const allGames = getAllActiveGames()

  return (
    <>
      {/* 滚动进度指示器 */}
      <ScrollProgressIndicator />

      {/* ========== HERO SECTION ========== */}
      <header className="relative min-h-[500px] sm:min-h-[600px] flex items-center">
        {/* Hero-specific extra glow for emphasis */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />

        <div className="relative rc-container py-20 sm:py-28 text-center w-full">
          <div className="rc-kicker bg-purple-500/30 border-purple-400/40 text-purple-100 mb-6 backdrop-blur-sm shadow-lg shadow-purple-500/20">
            <Sparkles className="h-4 w-4 text-purple-200" />
            <span>Free Tools • Community Calibrated</span>
          </div>

          {/* H1 - SEO Target */}
          <h1 className="rc-title text-4xl sm:text-5xl md:text-6xl">
            <span className="text-white">Roblox Game </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-text">
              Calculators & Codes
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl rc-lead max-w-2xl mx-auto">
            Free, accurate calculators and updated codes for your favorite Roblox games.
          </p>

          {/* 热门游戏轮播 */}
          <div className="mt-10">
            <GameCarousel games={featuredGames} />
          </div>

          {/* Browse All Games */}
          <div className="mt-8">
            <Link href="#games">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                Browse All {allGames.length} Games
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ========== POPULAR TOOLS ========== */}
      <section className="rc-container pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <Wrench className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Popular Tools</h2>
            <p className="text-sm text-zinc-500">Utility calculators for Roblox</p>
          </div>
        </div>

        <Link href="/roblox-tax-calculator" className="group block">
          <Card className="glass-card border-zinc-800/50 hover-lift hover-glow transition-all hover:border-emerald-500/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* 左侧：工具信息 */}
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      <Percent className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">Robux Tax Calculator</h3>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-zinc-400 text-sm mb-3">Calculate Gamepass & PLS DONATE fees (30% Marketplace Fee)</p>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1">
                          <Calculator className="h-3.5 w-3.5" />
                          Instant calculation
                        </div>
                        <div className="flex items-center gap-1">
                          <Gift className="h-3.5 w-3.5" />
                          PLS DONATE support
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-emerald-400 transition-all group-hover:translate-x-1 shrink-0 mt-1" />
                  </div>
                </div>

                {/* 右侧：快速预览 */}
                <div className="border-t sm:border-t-0 sm:border-l border-zinc-800/50 p-6 sm:w-56 bg-zinc-900/30">
                  <div className="text-xs text-zinc-500 mb-2">Quick Example</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Listed:</span>
                      <span className="text-white font-medium">1,000 R$</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Tax (30%):</span>
                      <span className="text-red-400">-300 R$</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-zinc-800 pt-2">
                      <span className="text-zinc-400">You get:</span>
                      <span className="text-emerald-400 font-bold">700 R$</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* ========== FEATURED GAMES (id="games") ========== */}
      <section id="games" className="rc-container rc-section scroll-mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Games</h2>
            <p className="text-zinc-500 mt-1">Choose a game to get started</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="sm:hidden w-full">
              <GameSearch placeholder={`Search ${allGames.length} games...`} fullWidth />
            </div>
            <div className="hidden sm:block">
              <GameSearch placeholder={`Search ${allGames.length} games...`} compact />
            </div>
            <Calculator className="hidden sm:block h-6 w-6 text-zinc-600" />
          </div>
        </div>

        <div className="grid gap-6">
          {featuredGames.map((game) => {
            const Icon = ICON_MAP[game.icon] || Sword
            const styles = FEATURED_GAME_STYLES[game.color] ?? FEATURED_GAME_STYLES.purple
            return (
              <Card key={game.slug} className="glass-card hover-lift hover-glow border-zinc-800/50 hover:border-zinc-700/80 transition-all group overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Game Info - 可点击跳转游戏主页 */}
                    <Link href={`/${game.slug}`} className="flex-1 p-6 hover:bg-zinc-800/30 transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl transition-colors shrink-0 ${styles.iconWrap}`}>
                          <Icon className={`h-6 w-6 ${styles.icon}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white truncate">{game.name}</h3>
                            {game.badge && (
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                {game.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-zinc-400 text-sm mb-3">{game.tagline}</p>
                          <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <div className="flex items-center gap-1">
                              <Gift className="h-3.5 w-3.5" />
                              {game.codesCount} codes
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {game.lastUpdated}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-purple-400 transition-all group-hover:translate-x-1 shrink-0 mt-1" />
                      </div>
                    </Link>

                    {/* Quick Actions */}
                    <div className="border-t sm:border-t-0 sm:border-l border-zinc-800/50 p-6 sm:w-56 bg-zinc-900/30">
                      <div className="space-y-3">
                        <Link href={`/${game.slug}`} className="block" aria-label={`${game.name} Calculator`}>
                          <Button variant="outline" size="sm" className="w-full border-zinc-700 hover:border-purple-500/50 hover:bg-purple-500/10 justify-start">
                            <Calculator className="h-4 w-4 mr-2 text-purple-400" />
                            Calculator
                          </Button>
                        </Link>
                        <Link href={`/${game.slug}/codes`} className="block" aria-label={`${game.name} Codes`}>
                          <Button variant="outline" size="sm" className="w-full border-zinc-700 hover:border-green-500/50 hover:bg-green-500/10 justify-start">
                            <Gift className="h-4 w-4 mr-2 text-green-400" />
                            Codes
                          </Button>
                        </Link>
                        <Link href={`/${game.slug}/calibrate`} className="block" aria-label={`Calibrate ${game.name}`}>
                          <Button variant="outline" size="sm" className="w-full border-zinc-700 hover:border-blue-500/50 hover:bg-blue-500/10 justify-start">
                            <Zap className="h-4 w-4 mr-2 text-blue-400" />
                            Calibrate
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

      </section>

      {/* ========== LATEST CODES (id="latest-codes") ========== */}
      <section id="latest-codes" className="rc-container rc-section scroll-mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Latest Codes Updates</h2>
            <p className="text-zinc-500 mt-1">Fresh codes added daily</p>
          </div>
          <Gift className="h-6 w-6 text-zinc-600" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {latestCodeUpdates.map((update) => (
            <Link key={update.slug} href={`/${update.slug}/codes`} className="group">
              <Card className="glass-card border-zinc-800/50 hover-lift hover-glow transition-all hover:border-green-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-green-200 transition-colors">
                        {update.game} Codes
                      </h3>
                      <p className="text-sm text-zinc-500 mt-1">Updated {update.updatedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {update.newCodes > 0 && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          +{update.newCodes} new
                        </Badge>
                      )}
                      <span className="text-sm text-zinc-400">{update.activeCodes} active</span>
                      <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-green-400 transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== FAQ (id="faq") ========== */}
      <section id="faq" className="rc-container-narrow rc-section scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-zinc-500 mt-2">Everything you need to know about RobloxCal</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Card key={i} className="glass-card border-zinc-800/50 hover-lift">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-white mb-2">{faq.q}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
            <p className="text-sm text-zinc-400">
              <strong className="text-yellow-400">Disclaimer:</strong> RobloxCal is a fan-made site and is not affiliated with Roblox Corporation or any game developers. All game content belongs to their respective owners.
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "RobloxCal",
            "url": "https://robloxcal.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://robloxcal.com/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Featured Roblox Game Calculators",
            "itemListElement": featuredGames.map((game, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": `${game.shortName} Calculator`,
              "url": `https://robloxcal.com/${game.slug}`
            }))
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </>
  )
}
