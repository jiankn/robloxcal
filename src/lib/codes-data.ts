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
    },
    'escape-tsunami-for-brainrots': {
        gameName: 'Escape Tsunami Codes',
        gameSlug: 'escape-tsunami-for-brainrots',
        description: 'All working codes for Escape Tsunami For Brainrots. Free coins, trails, and speed boosts! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Escape Tsunami</strong> on Roblox',
            'Click the <strong>Shop</strong> button on the left',
            'Scroll down to the bottom to find the <strong>Codes</strong> input',
            'Enter code and click <strong>Redeem</strong>!'
        ],
        activeCodes: [
            { code: 'TSUNAMI2026', reward: '500 Coins + Speed Boost', status: 'new', addedDate: 'Jan 2026' },
            { code: 'BRAINROT', reward: 'Exclusive Trail', status: 'active', addedDate: 'Jan 2026' },
            { code: 'ESCAPE', reward: '250 Coins', status: 'active', addedDate: 'Dec 2025' },
            { code: 'FLOOD', reward: '100 Coins', status: 'active', addedDate: 'Dec 2025' },
        ],
        expiredCodes: [
            { code: 'RELEASE', reward: '50 Coins', status: 'expired', addedDate: 'Nov 2025' },
        ],
        socialLinks: {
            robloxGame: 'https://www.roblox.com/games/1234567890/Escape-Tsunami'
        },
        relatedTools: [
            { href: '/escape-tsunami-for-brainrots/etfb-rebirth-calculator', label: 'Rebirth Calculator' },
            { href: '/escape-tsunami-for-brainrots/etfb-upgrade-roi', label: 'Upgrade ROI' }
        ]
    },
    'plants-vs-brainrots': {
        gameName: 'Plants Vs Brainrots Codes',
        gameSlug: 'plants-vs-brainrots',
        description: 'All working codes for Plants Vs Brainrots. Free cash, lucky potions, and exclusive items! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Plants Vs Brainrots</strong> on Roblox',
            'Click the <strong>Shop</strong> icon on the left side',
            'Scroll down to the <strong>Codes</strong> section under Rewards',
            'Enter code and click <strong>Claim</strong>!'
        ],
        activeCodes: [
            { code: 'STACKS', reward: '1 Lucky Potion', status: 'new', addedDate: 'Jan 2026' },
            { code: 'frozen', reward: '1 Frost Grenade', status: 'new', addedDate: 'Jan 2026' },
            { code: 'based', reward: '$5,000 Cash', status: 'active', addedDate: 'Jan 2026' },
            { code: 'disguise', reward: '1 Disguise Glasses', status: 'active', addedDate: 'Jan 2026' },
            { code: 'stone', reward: '1 Medusa\'s Head', status: 'active', addedDate: 'Jan 2026' },
        ],
        expiredCodes: [],
        socialLinks: {
            discord: 'https://discord.gg/pvb',
            robloxGame: 'https://www.roblox.com/games/plants-vs-brainrots'
        },
        relatedTools: [
            { href: '/plants-vs-brainrots/pvb-dps-calculator', label: 'DPS Calculator' },
            { href: '/plants-vs-brainrots/tier-list', label: 'Plant Tier List' }
        ]
    },
    'the-forge': {
        gameName: 'The Forge Codes',
        gameSlug: 'the-forge',
        description: 'All working codes for The Forge. Free rerolls, totems, and crafting materials! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>The Forge</strong> on Roblox',
            'Click the <strong>Settings</strong> button',
            'Scroll to the <strong>Codes</strong> section',
            'Type in the code and press Enter!'
        ],
        activeCodes: [
            { code: 'QOL!', reward: '10 Rerolls', status: 'new', addedDate: 'Jan 2026' },
            { code: 'PIRATE', reward: '5 Rerolls + 1 Totem', status: 'active', addedDate: 'Jan 2026' },
            { code: 'FORGE', reward: '3 Rerolls', status: 'active', addedDate: 'Dec 2025' },
        ],
        expiredCodes: [
            { code: 'RELEASE', reward: '5 Rerolls', status: 'expired', addedDate: 'Nov 2025' },
        ],
        socialLinks: {
            discord: 'https://discord.gg/theforge',
            robloxGame: 'https://www.roblox.com/games/the-forge'
        },
        relatedTools: [
            { href: '/the-forge/forge-calculator', label: 'Forge Calculator' },
            { href: '/the-forge/tier-list', label: 'Ore Tier List' }
        ]
    },
    'anime-guardians': {
        gameName: 'Anime Guardians Codes',
        gameSlug: 'anime-guardians',
        description: 'All working codes for Anime Guardians. Free currency packs, trait rerolls, and limit breakers! Updated January 2026.',
        howToRedeem: [
            'Launch <strong>Anime Guardians</strong> on Roblox',
            'Reach Level 5 to unlock codes',
            'Click the <strong>Codes</strong> button on the right side',
            'Enter code and press <strong>Redeem</strong>!'
        ],
        activeCodes: [
            { code: 'FREE_CURRENCYPACK', reward: 'Free Currency Pack', status: 'new', addedDate: 'Jan 2026' },
            { code: 'UPDATE_22.5', reward: 'Freebies', status: 'new', addedDate: 'Jan 2026' },
            { code: 'THREE_GODS', reward: 'Freebies', status: 'active', addedDate: 'Jan 2026' },
            { code: 'UPD22', reward: 'Freebies', status: 'active', addedDate: 'Jan 2026' },
            { code: 'FATE_UPDATE', reward: 'Freebies', status: 'active', addedDate: 'Jan 2026' },
            { code: 'UPD21', reward: '1 Limit Breaker', status: 'active', addedDate: 'Dec 2025' },
            { code: 'CHRISTMAS', reward: '1,000 Trait Rerolls + 5 Capsules', status: 'active', addedDate: 'Dec 2025' },
        ],
        expiredCodes: [
            { code: 'EASTER2025', reward: 'Easter Rewards', status: 'expired', addedDate: 'Apr 2025' },
            { code: '1BILLION', reward: 'Celebration Pack', status: 'expired', addedDate: 'Mar 2025' },
        ],
        socialLinks: {
            twitter: 'https://twitter.com/AnimeGuardiansRBX',
            discord: 'https://discord.gg/animeguardians',
            robloxGame: 'https://www.roblox.com/games/anime-guardians'
        },
        relatedTools: [
            { href: '/anime-guardians/ag-tier-list', label: 'Unit Tier List' },
            { href: '/anime-guardians/ag-artifact-calculator', label: 'Artifact Calculator' }
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
