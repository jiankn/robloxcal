/**
 * GET /api/v1/dps/config
 * 获取 DPS 计算器配置（武器、技能、变身数据）
 */

import { NextResponse } from 'next/server'
import { createPublicServerClient } from '@/lib/supabase/server'
import type { DPSConfig } from '@/lib/dps-types'

export const runtime = 'edge'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') || 'afse'

    try {
        const supabase = createPublicServerClient()

        // 获取武器
        const { data: weapons, error: weaponsError } = await supabase
            .from('weapons')
            .select('*')
            .eq('game_key', game)
            .order('tier', { ascending: true })
            .order('base_damage', { ascending: true })

        if (weaponsError) {
            console.error('Error fetching weapons:', weaponsError)
        }

        // 获取技能
        const { data: skills, error: skillsError } = await supabase
            .from('skills')
            .select('*')
            .eq('game_key', game)
            .order('tier', { ascending: true })
            .order('base_damage', { ascending: true })

        if (skillsError) {
            console.error('Error fetching skills:', skillsError)
        }

        // 获取变身
        const { data: transformations, error: transformError } = await supabase
            .from('transformations')
            .select('*')
            .eq('game_key', game)
            .order('damage_multiplier', { ascending: true })

        if (transformError) {
            console.error('Error fetching transformations:', transformError)
        }

        const config: DPSConfig = {
            weapons: weapons || [],
            skills: skills || [],
            transformations: transformations || [],
            version_key: new Date().toISOString().split('T')[0],
            last_updated: new Date().toISOString()
        }

        return NextResponse.json(config, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
            }
        })
    } catch (error) {
        console.error('DPS config error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
