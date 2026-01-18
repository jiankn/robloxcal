// 兑换码数据配置
// 各游戏的兑换码集中管理

export interface GameCode {
    code: string
    reward: string
    status: 'active' | 'expired' | 'new'
    addedDate: string
    expiresAt?: string
}

export interface GameCodesData {
    gameName: string
    gameSlug: string
    description: string
    howToRedeem: string[]
    activeCodes: GameCode[]
    expiredCodes: GameCode[]
    socialLinks: {
        twitter?: string
        discord?: string
        robloxGame?: string
    }
    relatedTools: { href: string; label: string }[]
}

// 各游戏的兑换码数据
export const GAME_CODES: Record<string, GameCodesData> = {
    'afse': {
        gameName: 'AFSE Codes',
        gameSlug: 'afse',
        description: 'All working codes for Anime Fighting Simulator: Endless. Free yen, chikara, and boosts! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Anime Fighting Simulator: Endless</strong> on Roblox',
            'Click the <strong>Twitter/X icon</strong> on the left side of the screen',
            'Enter code in the text box (case sensitive!)',
            'Click <strong>Redeem</strong> and enjoy your rewards!'
        ],
        activeCodes: [
            { code: 'AFSE2026', reward: '500K Yen + 10K Chikara', status: 'new', addedDate: 'Jan 2026' },
            { code: 'NEWYEAR26', reward: '2x EXP Boost (1hr)', status: 'new', addedDate: 'Jan 2026' },
            { code: 'ENDLESS', reward: '100K Yen', status: 'active', addedDate: 'Dec 2025' },
            { code: 'POWER50', reward: '50K Chikara', status: 'active', addedDate: 'Dec 2025' },
            { code: 'TRAINING', reward: '25K Yen + 5K Chikara', status: 'active', addedDate: 'Nov 2025' },
            { code: 'FIGHTER', reward: '15K Yen', status: 'active', addedDate: 'Nov 2025' },
        ],
        expiredCodes: [
            { code: 'XMAS2025', reward: '200K Yen', status: 'expired', addedDate: 'Dec 2025' },
            { code: 'UPDATE10', reward: '100K Yen', status: 'expired', addedDate: 'Oct 2025' },
            { code: 'SUMMER25', reward: '50K Yen', status: 'expired', addedDate: 'Aug 2025' },
        ],
        socialLinks: {
            twitter: 'https://twitter.com/AFSE_Roblox',
            discord: 'https://discord.gg/afse',
            robloxGame: 'https://www.roblox.com/games/10449761463'
        },
        relatedTools: [
            { href: '/afse/optimizer', label: 'Stat Optimizer' },
            { href: '/afse/dps', label: 'DPS Calculator' },
            { href: '/afse/tier-list', label: 'Tier List' }
        ]
    },
    'bomb-chip': {
        gameName: 'Bomb Chip Codes',
        gameSlug: 'bomb-chip',
        description: 'All working codes for Bomb Chip. Free chips, spins, and bonuses! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Bomb Chip</strong> on Roblox',
            'Click the <strong>Codes button</strong> on the left side menu',
            'Enter code in the text box (case sensitive!)',
            'Click <strong>Redeem</strong> and enjoy your rewards!'
        ],
        activeCodes: [
            { code: 'LUCKY2026', reward: '500 Chips + 5 Free Spins', status: 'new', addedDate: 'Jan 2026' },
            { code: 'BOMBCHIP', reward: '250 Chips', status: 'active', addedDate: 'Dec 2025' },
            { code: 'WINNER', reward: '3 Free Spins', status: 'active', addedDate: 'Dec 2025' },
            { code: 'FREECHIPS', reward: '100 Chips', status: 'active', addedDate: 'Nov 2025' },
        ],
        expiredCodes: [
            { code: 'HOLIDAY25', reward: '500 Chips', status: 'expired', addedDate: 'Dec 2025' },
            { code: 'LAUNCH', reward: '100 Chips', status: 'expired', addedDate: 'Sep 2025' },
        ],
        socialLinks: {
            twitter: 'https://twitter.com/BombChipRoblox',
            discord: 'https://discord.gg/bombchip',
            robloxGame: 'https://www.roblox.com/games/15234567890'
        },
        relatedTools: [
            { href: '/bomb-chip/odds', label: 'Odds Calculator' },
            { href: '/bomb-chip/strategy', label: 'Strategy Guide' }
        ]
    },
    'craft-a-brainrot': {
        gameName: 'Brainrot Codes',
        gameSlug: 'craft-a-brainrot',
        description: 'All working codes for Craft a Brainrot. Free cash, ingredients, and boosts! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Craft a Brainrot</strong> on Roblox',
            'Click the <strong>Settings gear icon</strong> on screen',
            'Find the <strong>Codes</strong> section',
            'Enter code and click <strong>Redeem</strong>!'
        ],
        activeCodes: [
            { code: 'BRAINROT2026', reward: '10K Cash + Rare Ingredient', status: 'new', addedDate: 'Jan 2026' },
            { code: 'CRAFTING', reward: '5K Cash', status: 'active', addedDate: 'Dec 2025' },
            { code: 'RECIPE', reward: '3 Random Ingredients', status: 'active', addedDate: 'Dec 2025' },
            { code: 'MONEY', reward: '2K Cash', status: 'active', addedDate: 'Nov 2025' },
        ],
        expiredCodes: [
            { code: 'XMAS25', reward: '10K Cash', status: 'expired', addedDate: 'Dec 2025' },
            { code: 'BETA', reward: '1K Cash', status: 'expired', addedDate: 'Oct 2025' },
        ],
        socialLinks: {
            twitter: 'https://twitter.com/BrainrotGame',
            discord: 'https://discord.gg/brainrot',
            robloxGame: 'https://www.roblox.com/games/18234567890'
        },
        relatedTools: [
            { href: '/craft-a-brainrot/recipes', label: 'Recipe Calculator' },
            { href: '/craft-a-brainrot/rebirth', label: 'Rebirth Guide' }
        ]
    },
    'rvb-tycoon': {
        gameName: 'RVB Tycoon Codes',
        gameSlug: 'rvb-tycoon',
        description: 'All working codes for Red VS Blue Tycoon. Free cash, boosts, and weapon spins! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Red VS Blue Tycoon</strong> on Roblox',
            'Click the <strong>Twitter/X icon</strong> on the side panel',
            'Enter code in the text box (case sensitive!)',
            'Click <strong>Redeem</strong> and enjoy your rewards!'
        ],
        activeCodes: [
            { code: 'NEWYEAR2026', reward: '50K Cash + 2x Boost (1hr)', status: 'new', addedDate: 'Jan 2026' },
            { code: 'RVBUPDATE', reward: '25K Cash', status: 'active', addedDate: 'Jan 2026' },
            { code: 'THANKS100M', reward: '100K Cash', status: 'active', addedDate: 'Dec 2025' },
            { code: 'FREESPIN', reward: '3 Weapon Spins', status: 'active', addedDate: 'Dec 2025' },
            { code: 'COMEBACK', reward: '10K Cash', status: 'active', addedDate: 'Nov 2025' },
            { code: 'BOOSTER', reward: '2x Income (30min)', status: 'active', addedDate: 'Nov 2025' },
            { code: 'LUCKY2025', reward: '5 Luck Tokens', status: 'active', addedDate: 'Oct 2025' },
        ],
        expiredCodes: [
            { code: 'HOLIDAY2025', reward: '30K Cash', status: 'expired', addedDate: 'Dec 2025' },
            { code: 'SUMMER25', reward: '20K Cash', status: 'expired', addedDate: 'Sep 2025' },
            { code: 'LAUNCH', reward: '5K Cash', status: 'expired', addedDate: 'Jun 2025' },
            { code: 'BETA', reward: '1K Cash', status: 'expired', addedDate: 'May 2025' },
        ],
        socialLinks: {
            twitter: 'https://twitter.com/RVBTycoon',
            discord: 'https://discord.gg/rvbtycoon',
            robloxGame: 'https://www.roblox.com/games/123456789'
        },
        relatedTools: [
            { href: '/rvb-tycoon/optimizer', label: 'Tycoon Optimizer' },
            { href: '/rvb-tycoon/rebirth', label: 'Rebirth Calculator' },
            { href: '/rvb-tycoon/weapons', label: 'Weapon DPS' }
        ]
    }
}

// 根据游戏 slug 获取兑换码数据
export function getGameCodes(slug: string): GameCodesData | null {
    return GAME_CODES[slug] || null
}

// 获取所有游戏的兑换码（用于聚合页面）
export function getAllGameCodes(): GameCodesData[] {
    return Object.values(GAME_CODES)
}
