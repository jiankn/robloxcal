/**
 * POST /api/v1/cron/aggregate-training-params
 * 聚合样本数据，更新发布参数
 * 
 * 此 API 应由 Cron 任务定期调用（建议每 6 小时一次）
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import {
    aggregateSamples,
    calculateConfidence,
    estimateBaseGain
} from '@/lib/calibration'
import type { BoostSource, BoostSelection } from '@/lib/types'

export const runtime = 'edge'

export async function POST(request: Request) {
    // 验证 Cron 密钥
    // Vercel Cron 会通过 Authorization header 发送: Bearer <CRON_SECRET>
    // 也支持自定义的 x-cron-secret header
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    const cronSecret = headersList.get('x-cron-secret')

    const expectedSecret = process.env.CRON_SECRET

    // 检查 Authorization: Bearer <secret> 或 x-cron-secret header
    const isAuthorized =
        (authHeader && authHeader === `Bearer ${expectedSecret}`) ||
        (cronSecret && cronSecret === expectedSecret)

    if (!isAuthorized) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    try {
        const supabase = createServerClient()

        // 从 URL 参数获取 game_key，未传则遍历所有活跃游戏
        const { searchParams } = new URL(request.url)
        const gameKeyParam = searchParams.get('game_key')

        // 获取要聚合的游戏列表
        let gamesToAggregate: string[] = []
        if (gameKeyParam) {
            gamesToAggregate = [gameKeyParam]
        } else {
            // 如果未指定游戏，默认只聚合 afse（后续可改为从 games 表查询）
            gamesToAggregate = ['afse']
        }

        const allResults: Array<{
            game_key: string
            version_key: string
            updated_count: number
            total_areas: number
            errors?: string[]
        }> = []

        for (const game of gamesToAggregate) {
            // 1. 获取当前活跃版本
            const { data: versionData } = await supabase
                .from('game_versions')
                .select('version_key')
                .eq('game_key', game)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            const versionKey = versionData?.version_key || new Date().toISOString().split('T')[0]

            // 2. 获取所有训练区
            const { data: areas } = await supabase
                .from('training_areas')
                .select('id')
                .eq('game_key', game)

            if (!areas || areas.length === 0) {
                allResults.push({
                    game_key: game,
                    version_key: versionKey,
                    updated_count: 0,
                    total_areas: 0
                })
                continue
            }

            // 3. 获取 Boost 来源
            const { data: boostSources } = await supabase
                .from('boost_sources')
                .select('*')
                .eq('game_key', game)

            // 4. 对每个训练区进行聚合
            const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            let updatedCount = 0
            const errors: string[] = []

            for (const area of areas) {
                try {
                    // 获取该区域最近 14 天的有效样本
                    const { data: samples } = await supabase
                        .from('training_samples')
                        .select('*')
                        .eq('area_id', area.id)
                        .eq('version_key', versionKey)
                        .eq('is_flagged', false)
                        .gte('quality_score', 0.2)
                        .gte('created_at', fourteenDaysAgo)

                    if (!samples || samples.length === 0) {
                        continue // 跳过没有样本的区域
                    }

                    // 计算每个样本的估计基础增益
                    const estimatedGains = samples.map(sample => {
                        // 将数据库中的 boosts 转换为 BoostSelection
                        const boosts = jsonToBoostSelection(sample.boosts as Record<string, unknown>)
                        const baseGain = estimateBaseGain(
                            Number(sample.observed_gain_per_min),
                            boosts,
                            boostSources as BoostSource[],
                            sample.multi_value ? Number(sample.multi_value) : undefined
                        )
                        return {
                            estimated_base_gain: baseGain,
                            quality_score: sample.quality_score
                        }
                    })

                    // 聚合
                    const aggregationResult = aggregateSamples(estimatedGains)

                    if (!aggregationResult) {
                        continue
                    }

                    // 计算置信度
                    const values = estimatedGains.map(g => g.estimated_base_gain)
                    const confidence = calculateConfidence(aggregationResult.sample_count, values)

                    // 更新或插入发布参数
                    const { error: upsertError } = await supabase
                        .from('training_area_params')
                        .upsert({
                            game_key: game,
                            version_key: versionKey,
                            area_id: area.id,
                            base_gain_per_min: aggregationResult.base_gain,
                            sample_count: aggregationResult.sample_count,
                            confidence: confidence,
                            last_aggregated_at: new Date().toISOString()
                        }, {
                            onConflict: 'game_key,version_key,area_id'
                        })

                    if (upsertError) {
                        errors.push(`Area ${area.id}: ${upsertError.message}`)
                    } else {
                        updatedCount++
                    }

                } catch (areaError) {
                    errors.push(`Area ${area.id}: ${String(areaError)}`)
                }
            }

            // 将该游戏的聚合结果推入数组
            allResults.push({
                game_key: game,
                version_key: versionKey,
                updated_count: updatedCount,
                total_areas: areas.length,
                errors: errors.length > 0 ? errors : undefined
            })
        }

        // 返回所有游戏的聚合结果
        return NextResponse.json({
            success: true,
            message: `Aggregation completed for ${allResults.length} game(s)`,
            results: allResults
        })

    } catch (error) {
        console.error('Aggregation error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

/**
 * 将数据库中的 JSON 格式转换为 BoostSelection
 */
function jsonToBoostSelection(json: Record<string, unknown>): BoostSelection {
    const boosts: BoostSelection = {}

    if (json.vip_gamepass) boosts.vip_gamepass = true
    if (json.x2_stats) boosts.x2_stats = true
    if (json.x3_stats) boosts.x3_stats = true
    if (json.weekend_boost) boosts.weekend_boost = true
    if (json.server_boost) boosts.server_boost = true
    if (json.no_limit) boosts.no_limit = true

    // 检测 code boost
    if (json['code_boost_1.25']) boosts.code_boost = '1.25'
    else if (json['code_boost_1.5']) boosts.code_boost = '1.5'
    else if (json.code_boost_2) boosts.code_boost = '2'
    else if (json.code_boost_3) boosts.code_boost = '3'

    return boosts
}
