// 攻略文章类型定义

export interface Guide {
    slug: string
    title: string
    description: string
    category: 'leveling' | 'combat' | 'economy' | 'tips'
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    readTime: number // 分钟
    publishedAt: string
    updatedAt?: string
    author?: string
    tags: string[]
    featured?: boolean
}

export interface GuideContent extends Guide {
    content: string // MDX 内容
}

// 攻略分类
export const GUIDE_CATEGORIES = {
    leveling: { label: 'Leveling', icon: 'TrendingUp', color: 'green' },
    combat: { label: 'Combat', icon: 'Sword', color: 'red' },
    economy: { label: 'Economy', icon: 'Coins', color: 'yellow' },
    tips: { label: 'Tips & Tricks', icon: 'Lightbulb', color: 'blue' }
} as const

// 难度标签
export const DIFFICULTY_LABELS = {
    beginner: { label: 'Beginner', color: 'green' },
    intermediate: { label: 'Intermediate', color: 'yellow' },
    advanced: { label: 'Advanced', color: 'red' }
} as const
