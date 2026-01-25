import {
    Zap,
    Sword,
    Trophy,
    Gift,
    BookOpen,
    TrendingUp,
    Coins,
    Scroll,
    Crosshair,
    Library,
    Castle,
    RefreshCw,
    Target,
    Waves,
    Skull,
    Fish,
    Anchor,
    Hexagon,
    Flower,
    Calculator,
    Leaf,
    Shield,
    Hammer,
    Cherry,
    Heart,
    Sparkles,
    Crown,
    Dice6
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
    href: string        // 相对于游戏 slug 的路径，'' 表示主页
    label: string       // 显示文本
    icon: LucideIcon    // Lucide 图标
    isNew?: boolean     // 是否显示 NEW 标签
}

// 每个游戏的导航项配置
export const GAME_NAV_CONFIG: Record<string, NavItem[]> = {
    // AFSE 导航
    afse: [
        { href: '', label: 'Calculator', icon: Zap },
        { href: '/dps', label: 'DPS', icon: Sword },
        { href: '/fruits', label: 'Fruits', icon: TrendingUp, isNew: true },
        { href: '/gacha', label: 'Gacha', icon: Target },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/guides', label: 'Guides', icon: BookOpen },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Bomb Chip 导航
    bomb_chip: [
        { href: '', label: 'Calculator', icon: Zap },
        { href: '/odds', label: 'Odds', icon: TrendingUp },
        { href: '/strategy', label: 'Strategy', icon: Target, isNew: true },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Craft a Brainrot 导航
    brainrot: [
        { href: '', label: 'Calculator', icon: Coins },
        { href: '/recipes', label: 'Recipes', icon: Scroll },
        { href: '/wiki', label: 'Wiki', icon: Library, isNew: true },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Red VS Blue Tycoon 导航
    rvb_tycoon: [
        { href: '', label: 'Calculator', icon: Castle },
        { href: '/optimizer', label: 'Optimizer', icon: Target, isNew: true },
        { href: '/rebirth', label: 'Rebirth', icon: RefreshCw },
        { href: '/weapons', label: 'Weapons', icon: Sword },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // ===== TOP 6 EXPANSION (Jan 2026) =====

    // Escape Tsunami For Brainrots 导航
    etfb: [
        { href: '/etfb-rebirth-calculator', label: 'Rebirth', icon: RefreshCw, isNew: true },
        { href: '/etfb-upgrade-roi', label: 'Upgrade ROI', icon: TrendingUp },
        { href: '/etfb-speed-planner', label: 'Speed', icon: Zap },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Steal a Brainrot 导航
    sab: [
        { href: '/sab-income-calculator', label: 'Income', icon: Coins, isNew: true },
        { href: '/sab-roi-calculator', label: 'ROI', icon: TrendingUp },
        { href: '/sab-drop-rate-calculator', label: 'Drop Rate', icon: Target },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Fish It! 导航
    fishit: [
        { href: '/fishit-luck-drop-rate', label: 'Luck', icon: Target, isNew: true },
        { href: '/fishit-rare-fish-eta', label: 'Rare ETA', icon: Trophy },
        { href: '/fishit-profit-per-hour', label: 'Profit', icon: Coins },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Fisch 导航
    fisch: [
        { href: '/fisch-fish-value-calculator', label: 'Fish Value', icon: Calculator, isNew: true },
        { href: '/fisch-target-fish-solver', label: 'Target Fish', icon: Crosshair },
        { href: '/fisch-profit-optimizer', label: 'Profit', icon: TrendingUp },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Bee Swarm Simulator 导航
    bss: [
        { href: '/bss-honey-calculator', label: 'Honey', icon: Coins, isNew: true },
        { href: '/bss-pollen-to-honey', label: 'Pollen', icon: RefreshCw },
        { href: '/bss-honey-per-pollen', label: 'Rate', icon: TrendingUp },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // Grow a Garden 导航
    gag: [
        { href: '/gag-crop-value-calculator', label: 'Crop Value', icon: Coins, isNew: true },
        { href: '/gag-pet-weight-calculator', label: 'Pet Weight', icon: Target },
        { href: '/gag-pet-xp-calculator', label: 'Pet XP', icon: Zap },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/tier-list', label: 'Tier List', icon: Trophy },
        { href: '/codes', label: 'Codes', icon: Gift },
        { href: '/calibrate', label: 'Calibrate', icon: Crosshair },
    ],

    // ===== NEW GAMES (Jan 2026) =====

    // Plants Vs Brainrots 导航
    pvb: [
        { href: '/pvb-dps-calculator', label: 'DPS', icon: Sword, isNew: true },
        { href: '/pvb-tier-list', label: 'Tier List', icon: Trophy },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
    ],

    // The Forge 导航
    forge: [
        { href: '/forge-calculator', label: 'Forge', icon: Hammer, isNew: true },
        { href: '/forge-tier-list', label: 'Tier List', icon: Trophy },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
    ],

    // Anime Guardians 导航
    ag: [
        { href: '/ag-tier-list', label: 'Tier List', icon: Trophy, isNew: true },
        { href: '/ag-artifact-calculator', label: 'Artifact', icon: Shield },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
    ],

    // ===== NEW GAMES (Jan 25, 2026) =====

    // Blox Fruits 导航
    bf: [
        { href: '/bf-stat-calculator', label: 'Stats', icon: Target, isNew: true },
        { href: '/bf-mastery-calculator', label: 'Mastery', icon: TrendingUp },
        { href: '/bf-fruit-value', label: 'Fruit Value', icon: Cherry },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
    ],

    // Adopt Me 导航
    am: [
        { href: '/am-neon-calculator', label: 'Neon', icon: Sparkles, isNew: true },
        { href: '/am-mega-calculator', label: 'Mega', icon: Crown },
        { href: '/am-trade-calculator', label: 'Trade', icon: RefreshCw },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
    ],

    // Sol's RNG 导航
    srng: [
        { href: '/srng-aura-odds', label: 'Aura Odds', icon: Dice6, isNew: true },
        { href: '/srng-luck-calculator', label: 'Luck', icon: Sparkles },
        { href: '/srng-crafting', label: 'Crafting', icon: Hammer },
        { href: '/wiki', label: 'Wiki', icon: Library },
        { href: '/codes', label: 'Codes', icon: Gift },
    ],
}

// 获取游戏的导航配置
export function getNavItems(gameKey: string): NavItem[] {
    return GAME_NAV_CONFIG[gameKey] || []
}
