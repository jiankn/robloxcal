'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    BarChart3,
    Target,
    Zap,
    Lightbulb,
    ChevronRight,
    Sparkles
} from 'lucide-react'

interface Step {
    number: number
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

interface HowItWorksProps {
    steps?: Step[]
    proTip?: string
    toolType?: string  // 工具类型：afse, rvb, bombchip, brainrot, codes, wiki, calibrate, tier-list, guides, afse-dps, rvb-optimizer, rvb-rebirth, rvb-weapons, bombchip-odds, brainrot-recipes
}

// 默认步骤（适用于AFSE等训练计算器）
const defaultSteps: Step[] = [
    {
        number: 1,
        icon: BarChart3,
        title: 'Enter Your Stats',
        description: 'Input your current strength, speed, or other stats from the game',
        color: 'purple'
    },
    {
        number: 2,
        icon: Target,
        title: 'Select Your Goal',
        description: 'Choose which stat to optimize and set your target level',
        color: 'blue'
    },
    {
        number: 3,
        icon: Zap,
        title: 'Get Results',
        description: 'See the best training area and estimated time to reach your goal',
        color: 'green'
    }
]

// 不同游戏和工具的步骤配置
const toolSteps: Record<string, Step[]> = {
    // ========== 通用工具 ==========
    // Codes 页面
    codes: [
        { number: 1, icon: BarChart3, title: 'Find Active Codes', description: 'Browse our updated list of working redemption codes', color: 'green' },
        { number: 2, icon: Target, title: 'Copy Code', description: 'Click the copy button next to any code you want to use', color: 'blue' },
        { number: 3, icon: Zap, title: 'Redeem In-Game', description: 'Paste the code in game and claim your free rewards!', color: 'purple' }
    ],
    // Wiki 页面
    wiki: [
        { number: 1, icon: BarChart3, title: 'Browse Categories', description: 'Explore items, characters, or game mechanics by category', color: 'indigo' },
        { number: 2, icon: Target, title: 'Search Content', description: 'Use the search bar to quickly find specific information', color: 'blue' },
        { number: 3, icon: Zap, title: 'Read Details', description: 'View stats, descriptions, and community tips for each entry', color: 'purple' }
    ],
    // Calibrate 页面
    calibrate: [
        { number: 1, icon: BarChart3, title: 'Play Normally', description: 'Use the calculator tools with your actual in-game data', color: 'purple' },
        { number: 2, icon: Target, title: 'Report Results', description: 'Compare calculator predictions with actual game outcomes', color: 'blue' },
        { number: 3, icon: Zap, title: 'Submit Feedback', description: 'Help improve accuracy by submitting calibration data', color: 'green' }
    ],
    // Tier List 页面
    'tier-list': [
        { number: 1, icon: BarChart3, title: 'View Rankings', description: 'Browse items ranked from S-tier (best) to D-tier (worst)', color: 'yellow' },
        { number: 2, icon: Target, title: 'Compare Options', description: 'Click items to see detailed stats and comparisons', color: 'blue' },
        { number: 3, icon: Zap, title: 'Plan Strategy', description: 'Use rankings to prioritize upgrades and investments', color: 'purple' }
    ],
    // Guides 页面
    guides: [
        { number: 1, icon: BarChart3, title: 'Choose Topic', description: 'Browse guides by category: beginner, advanced, or strategy', color: 'indigo' },
        { number: 2, icon: Target, title: 'Read Guide', description: 'Follow step-by-step instructions and expert tips', color: 'blue' },
        { number: 3, icon: Zap, title: 'Apply Knowledge', description: 'Use what you learned to improve your gameplay', color: 'green' }
    ],

    // ========== AFSE 特有工具 ==========
    afse: defaultSteps,
    'afse-dps': [
        { number: 1, icon: BarChart3, title: 'Select Equipment', description: 'Choose your weapon, skills, and transformations', color: 'red' },
        { number: 2, icon: Target, title: 'Set Stat Levels', description: 'Enter your current strength, speed, and other stats', color: 'blue' },
        { number: 3, icon: Zap, title: 'View DPS Output', description: 'See your total damage per second and optimization tips', color: 'green' }
    ],
    'afse-training': [
        { number: 1, icon: BarChart3, title: 'Enter Your Stats', description: 'Input your current strength, speed, or other stats from the game', color: 'purple' },
        { number: 2, icon: Target, title: 'Select Your Goal', description: 'Choose which stat to optimize and set your target level', color: 'blue' },
        { number: 3, icon: Zap, title: 'Get Results', description: 'See the best training area and estimated time to reach your goal', color: 'green' }
    ],
    'afse-fruits': [
        { number: 1, icon: BarChart3, title: 'Learn Locations', description: 'Discover all fruit spawn points across the map', color: 'green' },
        { number: 2, icon: Target, title: 'Choose Method', description: 'Decide between map farming, gacha, or trading', color: 'yellow' },
        { number: 3, icon: Zap, title: 'Start Farming', description: 'Use our tips to maximize your fruit collection rate', color: 'purple' }
    ],
    'afse-gacha': [
        { number: 1, icon: BarChart3, title: 'Browse Locations', description: 'View all gacha machine locations across the map', color: 'purple' },
        { number: 2, icon: Target, title: 'Check Rewards', description: 'See what drops you can get from each gacha', color: 'blue' },
        { number: 3, icon: Zap, title: 'Roll Smart', description: 'Use our recommendations to maximize your pulls', color: 'yellow' }
    ],

    // ========== RVB Tycoon 特有工具 ==========
    rvb: [
        { number: 1, icon: BarChart3, title: 'Enter Income', description: 'Input your current cash income per second from your tycoon', color: 'red' },
        { number: 2, icon: Target, title: 'Set Target', description: 'Choose your rebirth goal or cash milestone target', color: 'yellow' },
        { number: 3, icon: Zap, title: 'View Strategy', description: 'Get optimal timing for rebirths and upgrade recommendations', color: 'green' }
    ],
    'rvb-optimizer': [
        { number: 1, icon: BarChart3, title: 'Enter Resources', description: 'Input your current cash, gems, and upgrade levels', color: 'purple' },
        { number: 2, icon: Target, title: 'Set Budget', description: 'Define how much you want to spend on upgrades', color: 'blue' },
        { number: 3, icon: Zap, title: 'Get Recommendations', description: 'See personalized upgrade path for maximum efficiency', color: 'green' }
    ],
    'rvb-rebirth': [
        { number: 1, icon: BarChart3, title: 'Enter Current Stats', description: 'Input your income rate and current multiplier', color: 'red' },
        { number: 2, icon: Target, title: 'Set Rebirth Goal', description: 'Choose target multiplier or minimum income threshold', color: 'yellow' },
        { number: 3, icon: Zap, title: 'Calculate Timing', description: 'See optimal rebirth timing and long-term projections', color: 'blue' }
    ],
    'rvb-weapons': [
        { number: 1, icon: BarChart3, title: 'Browse Weapons', description: 'View all available weapons with their base stats', color: 'red' },
        { number: 2, icon: Target, title: 'Compare DPS', description: 'See damage calculations and efficiency ratings', color: 'blue' },
        { number: 3, icon: Zap, title: 'Choose Best', description: 'Pick the weapon that fits your playstyle and budget', color: 'green' }
    ],

    // ========== Bomb Chip 特有工具 ==========
    bombchip: [
        { number: 1, icon: BarChart3, title: 'Select Chips', description: 'Choose the bomb chips you want to calculate rewards for', color: 'orange' },
        { number: 2, icon: Target, title: 'Set Quantity', description: 'Enter how many chips you have or want to use', color: 'blue' },
        { number: 3, icon: Zap, title: 'See Rewards', description: 'View expected rewards, probabilities, and best combinations', color: 'green' }
    ],
    'bombchip-odds': [
        { number: 1, icon: BarChart3, title: 'Select Game Mode', description: 'Choose the chip game variant you are playing', color: 'orange' },
        { number: 2, icon: Target, title: 'Enter Position', description: 'Input your chip placement or opponent history', color: 'red' },
        { number: 3, icon: Zap, title: 'View Probabilities', description: 'See win rates and optimal placement strategies', color: 'green' }
    ],
    'bombchip-strategy': [
        { number: 1, icon: BarChart3, title: 'Choose Pattern', description: 'Browse proven bomb placement patterns and strategies', color: 'green' },
        { number: 2, icon: Target, title: 'Learn Safe Picks', description: 'Understand which chips are statistically safer to eat', color: 'blue' },
        { number: 3, icon: Zap, title: 'Apply Tactics', description: 'Use psychological tactics to outsmart your opponents', color: 'purple' }
    ],

    // ========== Brainrot 特有工具 ==========
    brainrot: [
        { number: 1, icon: BarChart3, title: 'Enter Resources', description: 'Input your current crafting materials and resources', color: 'pink' },
        { number: 2, icon: Target, title: 'Choose Recipe', description: 'Select what you want to craft from available recipes', color: 'purple' },
        { number: 3, icon: Zap, title: 'Calculate Profit', description: 'See profit margins and recommended crafting strategies', color: 'green' }
    ],
    'brainrot-recipes': [
        { number: 1, icon: BarChart3, title: 'Browse Recipes', description: 'View all available crafting recipes and their materials', color: 'yellow' },
        { number: 2, icon: Target, title: 'Check Requirements', description: 'See ingredient costs and crafting time for each recipe', color: 'purple' },
        { number: 3, icon: Zap, title: 'Compare Profits', description: 'Find the most profitable recipes for your resources', color: 'green' }
    ],
}

const colorStyles: Record<string, { bg: string; icon: string; border: string; number: string }> = {
    purple: {
        bg: 'bg-purple-500/10',
        icon: 'text-purple-400',
        border: 'border-purple-500/20',
        number: 'bg-purple-500/20 text-purple-300'
    },
    blue: {
        bg: 'bg-blue-500/10',
        icon: 'text-blue-400',
        border: 'border-blue-500/20',
        number: 'bg-blue-500/20 text-blue-300'
    },
    green: {
        bg: 'bg-green-500/10',
        icon: 'text-green-400',
        border: 'border-green-500/20',
        number: 'bg-green-500/20 text-green-300'
    },
    red: {
        bg: 'bg-red-500/10',
        icon: 'text-red-400',
        border: 'border-red-500/20',
        number: 'bg-red-500/20 text-red-300'
    },
    yellow: {
        bg: 'bg-yellow-500/10',
        icon: 'text-yellow-400',
        border: 'border-yellow-500/20',
        number: 'bg-yellow-500/20 text-yellow-300'
    },
    orange: {
        bg: 'bg-orange-500/10',
        icon: 'text-orange-400',
        border: 'border-orange-500/20',
        number: 'bg-orange-500/20 text-orange-300'
    },
    pink: {
        bg: 'bg-pink-500/10',
        icon: 'text-pink-400',
        border: 'border-pink-500/20',
        number: 'bg-pink-500/20 text-pink-300'
    },
    indigo: {
        bg: 'bg-indigo-500/10',
        icon: 'text-indigo-400',
        border: 'border-indigo-500/20',
        number: 'bg-indigo-500/20 text-indigo-300'
    }
}

export function HowItWorks({ steps, proTip, toolType = 'afse' }: HowItWorksProps) {
    const activeSteps = steps || toolSteps[toolType] || defaultSteps
    const defaultProTip = 'Enable Boost multipliers for faster results!'

    return (
        <section className="mb-12">
            {/* Section Header */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">How It Works</h2>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {activeSteps.map((step, index) => {
                    const Icon = step.icon
                    const styles = colorStyles[step.color] || colorStyles.purple
                    const isLast = index === activeSteps.length - 1

                    return (
                        <div key={step.number} className="relative">
                            {/* Connector Arrow (hidden on mobile and last item) */}
                            {!isLast && (
                                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                                    <ChevronRight className="h-5 w-5 text-zinc-600" />
                                </div>
                            )}

                            <Card className={`bg-zinc-900/50 border-zinc-800 ${styles.border} h-full transition-all hover:border-opacity-60`}>
                                <CardContent className="pt-5 pb-5 px-5">
                                    {/* Step Number & Icon */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <Badge className={`${styles.number} text-xs font-bold px-2 py-0.5`}>
                                            Step {step.number}
                                        </Badge>
                                        <div className={`p-2 rounded-lg ${styles.bg}`}>
                                            <Icon className={`h-5 w-5 ${styles.icon}`} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-semibold text-white mb-1.5">{step.title}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}
            </div>

            {/* Pro Tip */}
            <div className="mt-6 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-yellow-300/90">
                        <strong className="text-yellow-300">Pro Tip:</strong> {proTip || defaultProTip}
                    </span>
                </div>
            </div>
        </section>
    )
}
