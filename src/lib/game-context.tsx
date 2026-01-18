'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { GameConfig } from './game-config'

// 从服务端配置重新导出类型（方便客户端使用）
export type { GameConfig } from './game-config'

// Context
const GameContext = createContext<GameConfig | null>(null)

// Provider Props
interface GameProviderProps {
    game: GameConfig
    children: ReactNode
}

// Provider Component
export function GameProvider({ game, children }: GameProviderProps) {
    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    )
}

// Hook to use game context
export function useGame() {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}

// Optional hook that doesn't throw
export function useGameOptional() {
    return useContext(GameContext)
}

