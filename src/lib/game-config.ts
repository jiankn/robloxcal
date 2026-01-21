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
    },
    // ===== TOP 6 EXPANSION (Jan 2026) =====
    'escape-tsunami-for-brainrots': {
        game_key: 'etfb',
        slug: 'escape-tsunami-for-brainrots',
        display_name: 'Escape Tsunami',
        full_name: 'Escape Tsunami For Brainrots',
        short_name: 'ETFB',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#0ea5e9', icon: 'waves' },  // Ocean blue
        seo: {
            title_template: '{page} | Escape Tsunami Calculator 2026',
            description: 'Escape Tsunami For Brainrots calculator 2026. Rebirth advisor, upgrade ROI calculator, and speed planner for optimal progression.',
            keywords: [
                'escape tsunami for brainrots calculator',
                'escape tsunami rebirth calculator',
                'escape tsunami upgrade calculator',
                'escape tsunami speed calculator',
                'etfb calculator',
                'escape tsunami money multiplier',
                'escape tsunami guide 2026'
            ]
        }
    },
    'steal-a-brainrot': {
        game_key: 'sab',
        slug: 'steal-a-brainrot',
        display_name: 'Steal a Brainrot',
        full_name: 'Steal a Brainrot',
        short_name: 'SAB',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#f97316', icon: 'skull' },  // Orange
        seo: {
            title_template: '{page} | Steal a Brainrot Calculator 2026',
            description: 'Steal a Brainrot calculator 2026. Income calculator, ROI optimizer, and drop rate calculator for maximum earnings.',
            keywords: [
                'steal a brainrot calculator',
                'steal a brainrot income calculator',
                'steal a brainrot ROI calculator',
                'steal a brainrot drop rate',
                'sab calculator',
                'steal a brainrot guide 2026'
            ]
        }
    },
    'fish-it': {
        game_key: 'fishit',
        slug: 'fish-it',
        display_name: 'Fish It!',
        full_name: 'Fish It!',
        short_name: 'Fish It',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#14b8a6', icon: 'fish' },  // Teal
        seo: {
            title_template: '{page} | Fish It Calculator 2026',
            description: 'Fish It calculator 2026. Luck calculator, rare fish ETA, and profit per hour optimizer for fishing success.',
            keywords: [
                'fish it calculator',
                'fish it luck calculator',
                'fish it rare fish calculator',
                'fish it profit calculator',
                'fish it drop rate',
                'fish it guide 2026'
            ]
        }
    },
    'fisch': {
        game_key: 'fisch',
        slug: 'fisch',
        display_name: 'Fisch',
        full_name: 'Fisch',
        short_name: 'Fisch',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#3b82f6', icon: 'anchor' },  // Blue
        seo: {
            title_template: '{page} | Fisch Calculator 2026',
            description: 'Fisch calculator 2026. Fish value calculator, target fish solver, and profit optimizer for the best fishing strategy.',
            keywords: [
                'fisch calculator',
                'fisch fish value calculator',
                'fisch target fish calculator',
                'fisch profit calculator',
                'fisch mutation multiplier',
                'fisch guide 2026'
            ]
        }
    },
    'bee-swarm-simulator': {
        game_key: 'bss',
        slug: 'bee-swarm-simulator',
        display_name: 'Bee Swarm',
        full_name: 'Bee Swarm Simulator',
        short_name: 'BSS',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#eab308', icon: 'hexagon' },  // Yellow/Honey
        seo: {
            title_template: '{page} | Bee Swarm Simulator Calculator 2026',
            description: 'Bee Swarm Simulator honey calculator 2026. Pollen to honey converter, honey per pollen calculator, and hive bonus optimizer.',
            keywords: [
                'bee swarm simulator calculator',
                'bee swarm honey calculator',
                'bss pollen to honey',
                'bee swarm honey per pollen',
                'bss converter',
                'bee swarm simulator guide 2026'
            ]
        }
    },
    'grow-a-garden': {
        game_key: 'gag',
        slug: 'grow-a-garden',
        display_name: 'Grow a Garden',
        full_name: 'Grow a Garden',
        short_name: 'GAG',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#22c55e', icon: 'flower' },  // Green
        seo: {
            title_template: '{page} | Grow a Garden Calculator 2026',
            description: 'Grow a Garden calculator 2026. Crop value calculator, pet weight calculator, and pet XP optimizer for maximum garden profits.',
            keywords: [
                'grow a garden calculator',
                'grow a garden crop value',
                'grow a garden pet weight',
                'grow a garden pet xp',
                'gag calculator',
                'grow a garden guide 2026'
            ]
        }
    },
    'plants-vs-brainrots': {
        game_key: 'pvb',
        slug: 'plants-vs-brainrots',
        display_name: 'PvB',
        full_name: 'Plants Vs Brainrots',
        short_name: 'PvB',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#22c55e', icon: 'leaf' },  // Green (Plants)
        seo: {
            title_template: '{page} | Plants Vs Brainrots Calculator 2026',
            description: 'Plants Vs Brainrots calculator 2026. DPS calculator, plant tier list, mutation guide and active codes for maximum brainrot farming profits.',
            keywords: [
                'plants vs brainrots calculator',
                'plants vs brainrots codes',
                'plants vs brainrots tier list',
                'plants vs brainrots dps',
                'pvb calculator',
                'plants vs brainrots guide 2026'
            ]
        }
    },
    'the-forge': {
        game_key: 'forge',
        slug: 'the-forge',
        display_name: 'The Forge',
        full_name: 'The Forge',
        short_name: 'Forge',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#f97316', icon: 'anvil' },  // Orange (Forge fire)
        seo: {
            title_template: '{page} | The Forge Calculator 2026',
            description: 'The Forge calculator 2026. Forge weapon calculator, ore tier list, and crafting optimizer for the best equipment builds.',
            keywords: [
                'the forge roblox calculator',
                'the forge codes',
                'the forge ore tier list',
                'the forge weapon calculator',
                'the forge crafting guide',
                'the forge roblox guide 2026'
            ]
        }
    },
    'anime-guardians': {
        game_key: 'ag',
        slug: 'anime-guardians',
        display_name: 'Anime Guardians',
        full_name: 'Anime Guardians',
        short_name: 'AG',
        platform: 'roblox',
        is_active: true,
        is_featured: false,
        theme: { accent: '#8b5cf6', icon: 'shield' },  // Purple (Anime)
        seo: {
            title_template: '{page} | Anime Guardians Calculator 2026',
            description: 'Anime Guardians calculator 2026. Unit tier list, artifact calculator, and summoning guide for the best tower defense strategy.',
            keywords: [
                'anime guardians tier list',
                'anime guardians codes',
                'anime guardians calculator',
                'anime guardians artifact',
                'anime guardians best units',
                'anime guardians guide 2026'
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
