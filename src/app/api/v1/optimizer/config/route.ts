/**
 * GET /api/v1/optimizer/config
 * 获取优化器配置（训练区列表 + 发布参数 + Boost 来源）
 */

import { NextResponse } from 'next/server'
import { createPublicServerClient } from '@/lib/supabase/server'
import type { OptimizerConfig } from '@/lib/types'

export const runtime = 'edge'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') || 'afse'
    const version = searchParams.get('version') || 'active'

    try {
        const supabase = createPublicServerClient()

        // 1. 获取当前活跃版本
        let versionKey = version
        if (version === 'active') {
            const { data: versionData, error: vError } = await supabase
                .from('game_versions')
                .select('version_key')
                .eq('game_key', game)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            if (vError || !versionData) {
                // 如果没有找到版本，使用默认
                versionKey = new Date().toISOString().split('T')[0]
            } else {
                versionKey = versionData.version_key
            }
        }

        // 2. 获取训练区
        const { data: areas, error: areasError } = await supabase
            .from('training_areas')
            .select('*')
            .eq('game_key', game)
            .order('stat_type', { ascending: true })
            .order('required_stat_value', { ascending: true })

        if (areasError) {
            console.error('Error fetching training areas:', areasError)
            return NextResponse.json(
                { error: 'Failed to fetch training areas' },
                { status: 500 }
            )
        }

        // 3. 获取发布参数
        const { data: params, error: paramsError } = await supabase
            .from('training_area_params')
            .select('*')
            .eq('game_key', game)
            .eq('version_key', versionKey)

        if (paramsError) {
            console.error('Error fetching training area params:', paramsError)
            // 不返回错误，只是 params 为空
        }

        // 4. 获取 Boost 来源
        const { data: boosts, error: boostsError } = await supabase
            .from('boost_sources')
            .select('*')
            .eq('game_key', game)

        if (boostsError) {
            console.error('Error fetching boost sources:', boostsError)
            return NextResponse.json(
                { error: 'Failed to fetch boost sources' },
                { status: 500 }
            )
        }

        const config: OptimizerConfig = {
            training_areas: areas || [],
            training_area_params: params || [],
            boost_sources: boosts || [],
            version_key: versionKey,
            last_updated: new Date().toISOString()
        }

        return NextResponse.json(config, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        })
    } catch (error) {
        console.error('Optimizer config error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
