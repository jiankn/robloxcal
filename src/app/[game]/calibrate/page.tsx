import { CalibrateClient } from './CalibrateClient'
import BombChipCalibratePage from './page-bombchip'
import BrainrotCalibratePage from './page-brainrot'

// slug 到 game_key 的映射
const GAME_KEY_MAP: Record<string, string> = {
    'afse': 'afse',
    'bomb-chip': 'bomb_chip',
    'craft-a-brainrot': 'brainrot'
}

interface PageProps {
    params: Promise<{ game: string }>
}

export default async function CalibratePage({ params }: PageProps) {
    const { game } = await params
    const gameKey = GAME_KEY_MAP[game] || 'afse'

    if (gameKey === 'bomb_chip') {
        return <BombChipCalibratePage />
    }

    if (gameKey === 'brainrot') {
        return <BrainrotCalibratePage />
    }

    return <CalibrateClient gameSlug={game} gameKey={gameKey} />
}

// 使用动态渲染
export const dynamic = 'force-dynamic'

