import { MetadataRoute } from 'next'
import { getAllActiveGames } from '@/lib/game-config'
import { createPublicServerClient } from '@/lib/supabase/server'
import top6Keywords from '@/data/seo/top6-keywords.json'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://robloxcal.com'

interface WikiEntry {
    slug: string
    category: string
    game_key: string
    updated_at: string
}

// 数据库 game_key 到 URL slug 的映射
const GAME_KEY_TO_SLUG: Record<string, string> = {
    'afse': 'afse',
    'bomb_chip': 'bomb-chip',
    'brainrot': 'craft-a-brainrot',
    'rvb_tycoon': 'rvb-tycoon',
    // Top 6 Expansion Games
    'etfb': 'escape-tsunami-for-brainrots',
    'sab': 'steal-a-brainrot',
    'fishit': 'fish-it',
    'fisch': 'fisch',
    'bss': 'bee-swarm-simulator',
    'gag': 'grow-a-garden',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date().toISOString()
    const games = getAllActiveGames()
    const supabase = createPublicServerClient()

    // 获取所有已发布的 Wiki 条目
    const { data: wikiEntries, error } = await supabase
        .from('wiki_entries')
        .select('slug, category, game_key, updated_at')
        .eq('is_published', true)

    if (error) {
        console.error('Sitemap: 无法获取 Wiki 条目:', error.message)
    }

    const sitemapEntries: MetadataRoute.Sitemap = [
        // 首页 - 游戏目录
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        }
    ]

    // 为每个游戏生成页面
    for (const game of games) {
        const gamePrefix = `${BASE_URL}/${game.slug}`

        // 游戏主页
        sitemapEntries.push({
            url: gamePrefix,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.95,
        })

        // Codes 页面（每个游戏都有）
        sitemapEntries.push({
            url: `${gamePrefix}/codes`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        })

        // Calibrate 页面
        sitemapEntries.push({
            url: `${gamePrefix}/calibrate`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        })

        // Wiki 主页
        sitemapEntries.push({
            url: `${gamePrefix}/wiki`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        })

        // ============================================
        // 自动生成新游戏工具页面（基于 top6-keywords.json）
        // ============================================
        if (game.slug in top6Keywords) {
            const gameData = top6Keywords[game.slug as keyof typeof top6Keywords]
            // 添加所有工具页面
            for (const tool of gameData.tools) {
                sitemapEntries.push({
                    url: `${gamePrefix}/${tool.slug}`,
                    lastModified: currentDate,
                    changeFrequency: 'weekly',
                    priority: 0.9,
                })
            }
        }

        // AFSE 专属页面
        if (game.slug === 'afse') {
            // DPS Calculator
            sitemapEntries.push({
                url: `${gamePrefix}/dps`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9,
            })

            // Tier List
            sitemapEntries.push({
                url: `${gamePrefix}/tier-list`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9,
            })

            // Training Areas
            sitemapEntries.push({
                url: `${gamePrefix}/training-areas`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            // Guides
            sitemapEntries.push({
                url: `${gamePrefix}/guides`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9,
            })

            const guidesSlugs = ['leveling-fast', 'rebirth-guide', 'best-builds', 'boost-stacking', 'yen-farming']
            for (const slug of guidesSlugs) {
                sitemapEntries.push({
                    url: `${gamePrefix}/guides/${slug}`,
                    lastModified: currentDate,
                    changeFrequency: 'monthly',
                    priority: 0.7,
                })
            }

            // Tracker & Compare
            sitemapEntries.push({
                url: `${gamePrefix}/tracker`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            sitemapEntries.push({
                url: `${gamePrefix}/compare`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            // Weapons, Skills, Transformations
            sitemapEntries.push({
                url: `${gamePrefix}/weapons`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            sitemapEntries.push({
                url: `${gamePrefix}/skills`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            sitemapEntries.push({
                url: `${gamePrefix}/transformations`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            // FAQ
            sitemapEntries.push({
                url: `${gamePrefix}/faq`,
                lastModified: currentDate,
                changeFrequency: 'monthly',
                priority: 0.6,
            })

            // Training area sub-pages
            const statTypes = ['strength', 'chakra', 'sword', 'speed', 'agility', 'durability']
            for (const stat of statTypes) {
                sitemapEntries.push({
                    url: `${gamePrefix}/training-areas/${stat}`,
                    lastModified: currentDate,
                    changeFrequency: 'weekly',
                    priority: 0.7,
                })
            }
        }

        // Bomb Chip 专属页面
        if (game.slug === 'bomb-chip') {
            sitemapEntries.push({
                url: `${gamePrefix}/odds`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }

        // Brainrot 专属页面
        if (game.slug === 'craft-a-brainrot') {
            sitemapEntries.push({
                url: `${gamePrefix}/recipes`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }

        // RVB Tycoon 专属页面
        if (game.slug === 'rvb-tycoon') {
            sitemapEntries.push({
                url: `${gamePrefix}/optimizer`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9,
            })

            sitemapEntries.push({
                url: `${gamePrefix}/rebirth`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            sitemapEntries.push({
                url: `${gamePrefix}/weapons`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })

            sitemapEntries.push({
                url: `${gamePrefix}/tier-list`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }
    }

    // ============================================
    // Wiki 详情页 - 动态生成所有文章 URL
    // ============================================
    if (wikiEntries && wikiEntries.length > 0) {
        for (const entry of wikiEntries as WikiEntry[]) {
            const gameSlug = GAME_KEY_TO_SLUG[entry.game_key]
            if (gameSlug) {
                sitemapEntries.push({
                    url: `${BASE_URL}/${gameSlug}/wiki/${entry.category}/${entry.slug}`,
                    lastModified: entry.updated_at || currentDate,
                    changeFrequency: 'weekly',
                    priority: 0.8,
                })
            }
        }
    }

    // ============================================
    // 通用工具页面
    // ============================================
    sitemapEntries.push({
        url: `${BASE_URL}/roblox-tax-calculator`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.9, // 高价值工具页面
    })

    // ============================================
    // 信息页面
    // ============================================
    sitemapEntries.push({
        url: `${BASE_URL}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
    })

    sitemapEntries.push({
        url: `${BASE_URL}/contact`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.4,
    })

    // 通用页面（不属于特定游戏）
    sitemapEntries.push({
        url: `${BASE_URL}/privacy`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
    })

    sitemapEntries.push({
        url: `${BASE_URL}/terms`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
    })

    return sitemapEntries
}
