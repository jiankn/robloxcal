// 游戏配置类型（服务端可用）
export interface GameConfig {
    game_key: string
    slug: string
    display_name: string      // 缩写显示名，如 "AFSE"
    full_name: string         // 完整名称，如 "Anime Fighting Simulator: Endless"
    short_name: string | null
    platform: string
    is_active: boolean
    is_featured?: boolean     // 是否在首页/Footer精选展示
    theme: {
        accent: string
        icon: string
    }
    seo: {
        title_template: string
        description: string
        keywords: string[]
    }
}

// 静态游戏配置（用于在数据库不可用时的回退）
export const STATIC_GAMES: Record<string, GameConfig> = {
    afse: {
        game_key: 'afse',
        slug: 'afse',
        display_name: 'AFSE',
        full_name: 'Anime Fighting Simulator: Endless',
        short_name: 'AFSE',
        platform: 'roblox',
        is_active: true,
        is_featured: true,
        theme: { accent: '#a855f7', icon: 'sword' },
        seo: {
            title_template: '{page} | AFSE Calculator 2026',
            description: 'Free updated AFSE calculator for Anime Fighting Simulator Endless 2026. Find the best training areas, stat optimizer, Chikara calculator and tier list.',
            keywords: [
                'afse calculator',
                'anime fighting simulator endless',
                'afse training',
                'afse codes 2026',
                'afse chikara calculator',
                'afse stat calculator',
                'afse tier list',
                'afse damage calculator',
                'afse farming calculator'
            ]
        }
    },
    'bomb-chip': {
        game_key: 'bomb_chip',
        slug: 'bomb-chip',
        display_name: 'Bomb Chip',
        full_name: 'Bomb Chip',
        short_name: 'Bomb Chip',
        platform: 'roblox',
        is_active: true,
        is_featured: true,
        theme: { accent: '#ef4444', icon: 'bomb' },
        seo: {
            title_template: '{page} | Bomb Chip Calculator & Strategy',
            description: 'Bomb Chip calculator and strategy guide. Get winning patterns, probability calculator and placement optimizer for Roblox Bomb Chip.',
            keywords: [
                'bomb chip calculator',
                'bomb chip roblox',
                'bomb chip odds',
                'bomb chip strategy',
                'bomb chip winning patterns',
                'bomb chip probability calculator',
                'bomb chip guide',
                'how to win bomb chip'
            ]
        }
    },
    'craft-a-brainrot': {
        game_key: 'brainrot',
        slug: 'craft-a-brainrot',
        display_name: 'Brainrot',
        full_name: 'Craft a Brainrot',
        short_name: 'Brainrot',
        platform: 'roblox',
        is_active: true,
        is_featured: true,
        theme: { accent: '#22c55e', icon: 'coins' },
        seo: {
            title_template: '{page} | Brainrot Calculator 2026',
            description: 'Craft a Brainrot profit calculator 2026. Find the best recipes, calculate rebirth timing, and maximize your earnings with our updated optimizer.',
            keywords: [
                'craft a brainrot calculator',
                'brainrot profit',
                'brainrot rebirth',
                'brainrot codes 2026',
                'brainrot recipe calculator',
                'brainrot money calculator',
                'brainrot earnings optimizer',
                'brainrot rebirth timing'
            ]
        }
    },
    'rvb-tycoon': {
        game_key: 'rvb_tycoon',
        slug: 'rvb-tycoon',
        display_name: 'RVB Tycoon',
        full_name: 'Red VS Blue Tycoon',
        short_name: 'RVB',
        platform: 'roblox',
        is_active: true,
        is_featured: true,
        theme: { accent: '#8b5cf6', icon: 'castle' },  // Purple as blend of red+blue
        seo: {
            title_template: '{page} | Red VS Blue Tycoon Calculator 2026',
            description: 'Red VS Blue Tycoon optimizer and calculator 2026. Find the best tycoon upgrades, rebirth timing, weapon DPS stats and team strategies.',
            keywords: [
                'red vs blue tycoon calculator',
                'rvb tycoon optimizer',
                'red vs blue tycoon rebirth',
                'rvb tycoon codes 2026',
                'red vs blue tycoon best upgrades',
                'rvb tycoon weapon dps',
                'red vs blue tycoon guide',
                'rvb tycoon tier list'
            ]
        }
    }
}

// 获取游戏配置（通过 slug）- 服务端可用
export function getGameBySlug(slug: string): GameConfig | null {
    return STATIC_GAMES[slug] || null
}

// 获取所有活跃游戏 - 服务端可用
export function getAllActiveGames(): GameConfig[] {
    return Object.values(STATIC_GAMES).filter(g => g.is_active)
}
