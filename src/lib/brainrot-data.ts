export interface Ingredient {
    id: string
    name: string
    buyPrice: number
    image?: string
}

export interface Recipe {
    id: string
    name: string
    ingredients: { id: string, count: number }[]
    sellPrice: number
    craftTime: number // seconds
    reqRebirth?: number
}

// 模拟数据
export const INGREDIENTS: Ingredient[] = [
    { id: 'water', name: 'Water', buyPrice: 10 },
    { id: 'sugar', name: 'Sugar', buyPrice: 15 },
    { id: 'brain_juice', name: 'Brain Juice', buyPrice: 50 },
    { id: 'meme_extract', name: 'Meme Extract', buyPrice: 100 },
    { id: 'gold_dust', name: 'Gold Dust', buyPrice: 500 },
]

export const RECIPES: Recipe[] = [
    {
        id: 'skibidi_potion',
        name: 'Skibidi Potion',
        ingredients: [
            { id: 'water', count: 2 },
            { id: 'sugar', count: 1 }
        ],
        sellPrice: 50,
        craftTime: 5,
        reqRebirth: 0
    },
    {
        id: 'fanum_tax_elixir',
        name: 'Fanum Tax Elixir',
        ingredients: [
            { id: 'skibidi_potion', count: 1 }, // 嵌套配方暂不处理复杂依赖，简单 MVP 假设材料买入
            { id: 'brain_juice', count: 2 }
        ],
        sellPrice: 200,
        craftTime: 10,
        reqRebirth: 1
    },
    {
        id: 'sigma_grindset_shake',
        name: 'Sigma Grindset Shake',
        ingredients: [
            { id: 'meme_extract', count: 3 },
            { id: 'gold_dust', count: 1 }
        ],
        sellPrice: 1000,
        craftTime: 30,
        reqRebirth: 3
    }
]
