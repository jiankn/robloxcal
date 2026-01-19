import top6Keywords from '@/data/seo/top6-keywords.json'

export interface SeoConfig {
    primary: string
    secondary: string[]
}

export interface GameSeoConfig {
    slug: string
    name: string
    hub: SeoConfig
    tools: {
        slug: string
        name: string
        primary: string
        secondary: string[]
    }[]
}

const gamesData = top6Keywords.games as GameSeoConfig[]

export function getSeoForHub(gameSlug: string): { name: string; seo: SeoConfig; tools: GameSeoConfig['tools'] } | null {
    const game = gamesData.find(g => g.slug === gameSlug)
    if (!game) return null
    return {
        name: game.name,
        seo: game.hub,
        tools: game.tools
    }
}

export function getSeoForTool(gameSlug: string, toolSlug: string): { gameName: string; name: string; seo: SeoConfig; siblings: GameSeoConfig['tools'] } | null {
    const game = gamesData.find(g => g.slug === gameSlug)
    if (!game) return null

    const tool = game.tools.find(t => t.slug === toolSlug)
    if (!tool) return null

    const siblings = game.tools.filter(t => t.slug !== toolSlug)

    return {
        gameName: game.name,
        name: tool.name,
        seo: {
            primary: tool.primary,
            secondary: tool.secondary
        },
        siblings
    }
}

export function getRelatedGames(currentGameSlug: string): { slug: string; name: string }[] {
    // Simple rotation logic for related games to ensure visibility
    // In a real app, this could be based on tags/categories
    const allGames = gamesData.map(g => ({ slug: g.slug, name: g.name }))
    return allGames.filter(g => g.slug !== currentGameSlug).slice(0, 3)
}
