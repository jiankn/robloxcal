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
    Target
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
}

// 获取游戏的导航配置
export function getNavItems(gameKey: string): NavItem[] {
    return GAME_NAV_CONFIG[gameKey] || []
}
