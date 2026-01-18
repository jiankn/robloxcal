'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Apple,
    MapPin,
    Clock,
    Zap,
    Lightbulb,
    ChevronRight,
    Calculator,
    Sparkles,
    RefreshCw,
    Trophy,
    Coins
} from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'
import { HowItWorks } from '@/components/HowItWorks'

export const dynamic = 'force-dynamic'

// 水果数据
const FRUITS_DATA = [
    {
        name: 'Thunder Fruit',
        rarity: 'Legendary',
        color: 'yellow',
        ability: 'Area-of-effect lightning attacks with damage boost',
        bestFor: 'Farming & PvE',
        obtainMethod: ['Map Spawn', 'Gacha', 'Tournament Shop'],
        tip: 'Best for farming due to AoE and speed boost'
    },
    {
        name: 'Buddha Fruit',
        rarity: 'Legendary',
        color: 'gold',
        ability: 'Transform into giant form with increased defense',
        bestFor: 'Boss Fights',
        obtainMethod: ['Map Spawn', 'Gacha'],
        tip: 'Excellent for tanking boss damage'
    },
    {
        name: 'Light Fruit',
        rarity: 'Mythic',
        color: 'white',
        ability: 'High-speed movement and light-based attacks',
        bestFor: 'PvP & Mobility',
        obtainMethod: ['Tournament Shop', 'Trading'],
        tip: 'Top tier for PvP due to speed advantage'
    },
    {
        name: 'Dark Fruit',
        rarity: 'Legendary',
        color: 'purple',
        ability: 'Gravity manipulation and crowd control',
        bestFor: 'Crowd Control',
        obtainMethod: ['Map Spawn', 'Gacha'],
        tip: 'Great for pulling enemies together'
    },
    {
        name: 'Flame Fruit',
        rarity: 'Rare',
        color: 'orange',
        ability: 'Fire-based damage over time attacks',
        bestFor: 'DPS',
        obtainMethod: ['Map Spawn', 'Gacha'],
        tip: 'Good starter fruit with solid damage'
    },
    {
        name: 'Ice Fruit',
        rarity: 'Rare',
        color: 'blue',
        ability: 'Freeze enemies and create ice barriers',
        bestFor: 'Crowd Control',
        obtainMethod: ['Map Spawn', 'Gacha'],
        tip: 'Useful for slowing down fast enemies'
    }
]

// 水果生成位置
const SPAWN_LOCATIONS = [
    { name: 'Starter Island - Near Crates', difficulty: 'Easy', frequency: 'Common', description: 'Check around the spawn area crates' },
    { name: 'Demon Island - Around Trees', difficulty: 'Medium', frequency: 'Common', description: 'Multiple spawn points near large trees' },
    { name: 'Volcano Island', difficulty: 'Hard', frequency: 'Rare', description: 'Higher chance for rare fruits' },
    { name: 'Chakra Waterfall Area', difficulty: 'Medium', frequency: 'Common', description: 'Check near the waterfall and 1B Chakra zone' },
    { name: 'Library & Gym Building', difficulty: 'Easy', frequency: 'Common', description: 'Indoor spawn locations' },
    { name: '100K Speed Training Area', difficulty: 'Medium', frequency: 'Uncommon', description: 'Check the training grounds' },
    { name: 'Beast Monke / Akaza Areas', difficulty: 'Hard', frequency: 'Rare', description: 'Boss areas have better drop rates' },
    { name: 'Wizard Tower Base', difficulty: 'Medium', frequency: 'Uncommon', description: 'Spawn points near tower entrance' }
]

// 获取水果的方法
const OBTAIN_METHODS = [
    {
        method: 'Map Spawns',
        icon: MapPin,
        color: 'green',
        description: 'Fruits spawn every 5 minutes and despawn after 10 minutes',
        tips: ['Server hop frequently', 'Check low-population servers', 'Fruits glow so they are easier to spot']
    },
    {
        method: 'Gacha Rolls',
        icon: Sparkles,
        color: 'purple',
        description: '5,000 Chikara per roll at gacha locations',
        tips: ['Use the Champions Gacha near Chakra Tree', 'Solo Leveling Gacha behind Treadmills', 'Gym Gacha next to Gym Building']
    },
    {
        method: 'Tournament Shop',
        icon: Trophy,
        color: 'yellow',
        description: 'Earn competitive points from PvP battles',
        tips: ['Best source for Light Fruit', 'Play Battle Royale for more points', 'King of the Hill gives bonus points']
    },
    {
        method: 'Fighting Pass',
        icon: Zap,
        color: 'blue',
        description: 'Progress through the pass for fruit rewards',
        tips: ['Free pass has fewer fruits', 'Premium pass has rare fruits at high tiers', 'Complete daily missions']
    },
    {
        method: 'Trading',
        icon: RefreshCw,
        color: 'pink',
        description: 'Trade with other players through Discord',
        tips: ['Use official Discord for safe trades', 'Check market prices before trading', 'Beware of scammers']
    }
]

const RARITY_COLORS: Record<string, string> = {
    'Common': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
    'Uncommon': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Rare': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Epic': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Legendary': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Mythic': 'bg-red-500/20 text-red-300 border-red-500/30'
}

export default function FruitsPage() {
    const game = useGame()

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Header */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-green-500/20 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-yellow-500/15 rounded-full blur-[100px] -translate-y-1/3" />

                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
                        <Apple className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-300">Endless Fruits Guide</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        AFSE <span className="text-green-400">Fruits Farming Guide</span>
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Complete guide to obtaining Endless Fruits in Anime Fighting Simulator Endless.
                        Learn spawn locations, farming strategies, and the best fruits for your playstyle.
                    </p>

                    <div className="mt-4">
                        <Link href={`/${game.slug}`}>
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-pointer hover:bg-purple-500/30">
                                <Calculator className="h-3 w-3 mr-1" /> Training Optimizer
                            </Badge>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="afse-fruits" proTip="Fruits spawn every 5 minutes - server hop for faster farming!" />

                {/* Tabs */}
                <Tabs defaultValue="fruits" className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border border-zinc-800">
                        <TabsTrigger value="fruits" className="data-[state=active]:bg-green-600">
                            <Apple className="h-4 w-4 mr-2" />
                            All Fruits
                        </TabsTrigger>
                        <TabsTrigger value="locations" className="data-[state=active]:bg-blue-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            Spawn Locations
                        </TabsTrigger>
                        <TabsTrigger value="methods" className="data-[state=active]:bg-purple-600">
                            <Sparkles className="h-4 w-4 mr-2" />
                            How to Get
                        </TabsTrigger>
                    </TabsList>

                    {/* Fruits Tab */}
                    <TabsContent value="fruits" className="mt-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            {FRUITS_DATA.map((fruit) => (
                                <Card key={fruit.name} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                                    <CardContent className="pt-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold text-white text-lg">{fruit.name}</h3>
                                                <Badge className={RARITY_COLORS[fruit.rarity]}>
                                                    {fruit.rarity}
                                                </Badge>
                                            </div>
                                            <Badge className="bg-zinc-700/50 text-zinc-300">
                                                {fruit.bestFor}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-zinc-400 mb-3">{fruit.ability}</p>

                                        <div className="text-xs text-zinc-500 mb-2">
                                            <span className="font-medium">How to get:</span> {fruit.obtainMethod.join(', ')}
                                        </div>

                                        <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                                            <div className="flex items-start gap-1.5">
                                                <Lightbulb className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                                                <span className="text-xs text-green-300">{fruit.tip}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Locations Tab */}
                    <TabsContent value="locations" className="mt-6">
                        <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-blue-400" />
                                    Fruit Spawn Locations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {SPAWN_LOCATIONS.map((location, idx) => (
                                        <div
                                            key={location.name}
                                            className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-white">{location.name}</span>
                                                <div className="flex gap-2">
                                                    <Badge className={
                                                        location.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                                            location.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-red-500/20 text-red-400'
                                                    }>
                                                        {location.difficulty}
                                                    </Badge>
                                                    <Badge className={
                                                        location.frequency === 'Common' ? 'bg-zinc-500/20 text-zinc-400' :
                                                            location.frequency === 'Uncommon' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-purple-500/20 text-purple-400'
                                                    }>
                                                        {location.frequency}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <p className="text-sm text-zinc-400">{location.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Spawn Info */}
                        <Card className="bg-blue-900/20 border-blue-500/20">
                            <CardContent className="py-4">
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-blue-300 font-medium">Spawn Timing</p>
                                        <p className="text-sm text-zinc-400">
                                            Fruits spawn every <strong className="text-white">5 minutes</strong> and
                                            despawn after <strong className="text-white">10 minutes</strong>.
                                            They glow to make them easier to spot.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Methods Tab */}
                    <TabsContent value="methods" className="mt-6">
                        <div className="space-y-4">
                            {OBTAIN_METHODS.map((method) => {
                                const Icon = method.icon
                                return (
                                    <Card key={method.method} className="bg-zinc-900/50 border-zinc-800">
                                        <CardContent className="pt-5">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl bg-${method.color}-500/20`}>
                                                    <Icon className={`h-6 w-6 text-${method.color}-400`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-white text-lg mb-1">{method.method}</h3>
                                                    <p className="text-sm text-zinc-400 mb-3">{method.description}</p>
                                                    <div className="space-y-1.5">
                                                        {method.tips.map((tip, idx) => (
                                                            <div key={idx} className="flex items-start gap-2 text-sm">
                                                                <ChevronRight className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                                                                <span className="text-zinc-300">{tip}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Pro Tips */}
                <Card className="bg-gradient-to-r from-yellow-900/20 to-zinc-900/50 border-yellow-500/20 mb-8">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-400" />
                            Pro Farming Tips
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Server Hop:</strong> Join low-population servers for higher chances of finding unclaimed fruits</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Fruit Notifier:</strong> 2,500 Robux game pass instantly tells you when and where fruits spawn</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Focus Thunder:</strong> Thunder Fruit is the best for farming due to AoE attacks and speed boost</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-zinc-300">
                                <ChevronRight className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <span><strong>Daily Quests:</strong> Complete all daily quests to earn resources for gacha rolls</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        href={`/${game.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700/50 hover:border-zinc-600 rounded-lg transition-all duration-200"
                    >
                        <span>←</span>
                        <span>Back to Training Optimizer</span>
                    </Link>
                </div>
            </main>
        </div>
    )
}
