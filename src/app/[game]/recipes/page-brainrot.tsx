'use client'

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Scroll, Beaker, Coins, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useGame } from '@/lib/game-context'
import { RECIPES, INGREDIENTS } from '@/lib/brainrot-data'
import { calculateCraftCost } from '@/lib/brainrot'
import { HowItWorks } from '@/components/HowItWorks'

export default function BrainrotRecipesPage() {
    const game = useGame()

    // 计算所有配方数据
    const allRecipes = useMemo(() => {
        return RECIPES.map(recipe => {
            const cost = calculateCraftCost(recipe)
            const profitPerSec = (recipe.sellPrice - cost) / recipe.craftTime
            return { ...recipe, cost, profitPerSec }
        }).sort((a, b) => b.sellPrice - a.sellPrice) // 按售价排序
    }, [])

    // Helper names
    const getIngredientName = (id: string) => {
        const ing = INGREDIENTS.find(i => i.id === id)
        if (ing) return ing.name
        const rec = RECIPES.find(r => r.id === id)
        return rec ? rec.name : id
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2" />

                <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                        <Scroll className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-blue-300">Recipe Book</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Complete <span className="text-blue-400">Recipes List</span>
                    </h1>
                    <p className="text-zinc-400">Master every crafting recipe in {game.display_name}.</p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 pb-16">
                {/* How It Works */}
                <HowItWorks toolType="brainrot-recipes" proTip="Check rebirth requirements before investing time in recipes!" />

                <div className="grid gap-6">
                    {allRecipes.map(recipe => (
                        <Card key={recipe.id} className="bg-zinc-900/50 border-zinc-800">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left: Info */}
                                    <div className="p-6 flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-white">{recipe.name}</h3>
                                            {recipe.reqRebirth && recipe.reqRebirth > 0 && (
                                                <Badge variant="outline" className="border-purple-500/50 text-purple-400 text-xs">
                                                    Rebirth {recipe.reqRebirth}+
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {recipe.craftTime}s
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Coins className="h-4 w-4 text-yellow-500" />
                                                Sell: <span className="text-white">${recipe.sellPrice}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-red-400">Cost: ${recipe.cost}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-xs font-medium text-zinc-500 uppercase">Ingredients</div>
                                            <div className="flex flex-wrap gap-2">
                                                {recipe.ingredients.map((ing, i) => (
                                                    <Badge key={i} variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                                                        {ing.count}x {getIngredientName(ing.id)}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Stats */}
                                    <div className="bg-zinc-900/80 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-800 md:w-48 text-center">
                                        <div className="text-xs text-zinc-500 mb-1">Base Profit/Sec</div>
                                        <div className="text-2xl font-bold text-green-400">
                                            ${recipe.profitPerSec.toFixed(1)}
                                        </div>
                                        <Link href={`/${game.slug}`} className="mt-4">
                                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                                Analyze
                                                <ArrowRight className="ml-1 h-3 w-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
