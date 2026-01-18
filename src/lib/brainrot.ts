import { Ingredient, Recipe, RECIPES, INGREDIENTS } from "./brainrot-data"

export interface ProfitAnalysis {
    recipeId: string
    recipeName: string
    cost: number
    revenue: number
    profit: number
    profitPerSecond: number
    roi: number // %
}

export interface RebirthAnalysis {
    currentMultiplier: number
    targetMultiplier: number
    cost: number // Rebirth cost
    currentIncomeRate: number // Cash per second
    timeToRecover: number // seconds
    isRecommended: boolean
}

// 获取物品的基础购买价格
function getBuyPrice(itemId: string): number | null {
    const item = INGREDIENTS.find(i => i.id === itemId)
    return item ? item.buyPrice : null
}

// 计算配方成本 (递归)
export function calculateCraftCost(recipe: Recipe): number {
    let totalCost = 0

    for (const ing of recipe.ingredients) {
        // 1. 尝试查找原料是否是另一个配方（中间产物）
        const subRecipe = RECIPES.find(r => r.id === ing.id)

        // 2. 尝试查找原料是否可直接购买
        const buyPrice = getBuyPrice(ing.id) // 可能是 null

        let unitCost = 999999999 // fallback high cost

        if (buyPrice !== null) {
            unitCost = buyPrice
        } else if (subRecipe) {
            unitCost = calculateCraftCost(subRecipe)
        }

        totalCost += unitCost * ing.count
    }

    return totalCost
}

// 批量计算所有配方利润
export function analyzeRecipes(multiplier: number = 1): ProfitAnalysis[] {
    return RECIPES.map(recipe => {
        const cost = calculateCraftCost(recipe)
        const revenue = recipe.sellPrice * multiplier
        const profit = revenue - cost

        return {
            recipeId: recipe.id,
            recipeName: recipe.name,
            cost,
            revenue,
            profit,
            profitPerSecond: profit / recipe.craftTime,
            roi: cost > 0 ? (profit / cost) : 0
        }
    }).sort((a, b) => b.profitPerSecond - a.profitPerSecond)
}

// 计算转生回本分析
export function analyzeRebirth(
    currentMult: number,
    newMult: number,
    rebirthCost: number,
    baseIncomeRate: number // 不含乘数的基础产出
): RebirthAnalysis {
    const currentRate = baseIncomeRate * currentMult
    const newRate = baseIncomeRate * newMult
    const diff = newRate - currentRate

    // 如果新速率没有增加，或者增幅极小，避免除以零
    if (diff <= 0) {
        return {
            currentMultiplier: currentMult,
            targetMultiplier: newMult,
            cost: rebirthCost,
            currentIncomeRate: currentRate,
            timeToRecover: Infinity,
            isRecommended: false
        }
    }

    // 回本时间 = 成本 / 速率增量
    const timeToRecover = rebirthCost / diff

    // 简单推荐逻辑：比如 30分钟内回本值得，或者取决于用户偏好（这里只给数据）
    // 假设 1小时内回本都算推荐
    const isRecommended = timeToRecover < 3600

    return {
        currentMultiplier: currentMult,
        targetMultiplier: newMult,
        cost: rebirthCost,
        currentIncomeRate: currentRate,
        timeToRecover,
        isRecommended
    }
}
