/**
 * GET /api/v1/games
 * 获取所有活跃游戏列表
 */

import { NextResponse } from 'next/server'
import { getAllActiveGames } from '@/lib/game-config'

export const runtime = 'edge'

export async function GET() {
    try {
        // 目前使用静态配置，后续可改为从数据库读取
        const games = getAllActiveGames()

        return NextResponse.json({
            games,
            total: games.length,
            last_updated: new Date().toISOString()
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
            }
        })
    } catch (error) {
        console.error('Games API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
