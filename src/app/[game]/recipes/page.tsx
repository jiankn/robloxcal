import { notFound } from "next/navigation"
import { getGameBySlug } from "@/lib/game-config"
import BrainrotRecipesPage from "./page-brainrot"

// 使用动态渲染
export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{ game: string }>
}

export default async function RecipesPage({ params }: PageProps) {
    const { game: gameSlug } = await params

    // Resolve game config
    const gameConfig = getGameBySlug(gameSlug)
    if (!gameConfig) {
        notFound()
    }

    // Route to Brainrot Recipes
    if (gameConfig.game_key === 'brainrot') {
        return <BrainrotRecipesPage />
    }

    // AFSE and Bomb Chip do not have a Recipes page yet
    // In a real app we might show a "Coming Soon" page or redirect
    return notFound()
}
