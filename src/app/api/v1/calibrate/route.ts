/**
 * POST /api/v1/calibrate
 * 提交校准样本
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import crypto from 'crypto'
import type { CalibrationSubmission } from '@/lib/types'
import { processCalibrationSubmission, calculateQualityScore } from '@/lib/calibration'

export const runtime = 'edge'

export async function POST(request: Request) {
    try {
        const body: CalibrationSubmission & { game_key?: string } = await request.json()

        // 获取游戏 key（默认 afse）
        const gameKey = body.game_key || 'afse'

        // 验证必填字段
        if (!body.stat_type || !body.area_id || !body.duration_sec ||
            body.start_stat === undefined || body.end_stat === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // 处理提交数据
        const { observed_gain_per_min, boosts_json, validation } =
            processCalibrationSubmission(body)

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            )
        }

        const supabase = createServerClient()

        // 获取请求信息
        const headersList = await headers()
        const clientIp = headersList.get('x-forwarded-for')?.split(',')[0] ||
            headersList.get('x-real-ip') ||
            'unknown'
        const userAgent = headersList.get('user-agent') || 'unknown'

        // IP 哈希（不存明文）
        const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 16)

        // 获取当前活跃版本
        const { data: versionData } = await supabase
            .from('game_versions')
            .select('version_key')
            .eq('game_key', gameKey)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        const versionKey = versionData?.version_key || new Date().toISOString().split('T')[0]

        // 验证训练区存在
        const { data: areaData } = await supabase
            .from('training_areas')
            .select('id, stat_type')
            .eq('id', body.area_id)
            .single()

        if (!areaData) {
            return NextResponse.json(
                { error: 'Invalid training area' },
                { status: 400 }
            )
        }

        // 验证 stat_type 匹配
        if (areaData.stat_type !== body.stat_type) {
            return NextResponse.json(
                { error: 'Training area does not match stat type' },
                { status: 400 }
            )
        }

        // 查询该 IP 24小时内的提交次数
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        const { count: ipCount } = await supabase
            .from('training_samples')
            .select('*', { count: 'exact', head: true })
            .eq('ip_hash', ipHash)
            .gte('created_at', twentyFourHoursAgo)

        // 获取该区域的历史分布（用于异常检测）
        const { data: recentSamples } = await supabase
            .from('training_samples')
            .select('observed_gain_per_min')
            .eq('area_id', body.area_id)
            .eq('is_flagged', false)
            .order('created_at', { ascending: false })
            .limit(50)

        let areaDistribution: { median: number; stddev: number } | null = null
        if (recentSamples && recentSamples.length >= 5) {
            const values = recentSamples.map(s => Number(s.observed_gain_per_min))
            const sorted = [...values].sort((a, b) => a - b)
            const median = sorted[Math.floor(sorted.length / 2)]
            const variance = values.reduce((acc, v) => acc + Math.pow(v - median, 2), 0) / values.length
            areaDistribution = { median, stddev: Math.sqrt(variance) }
        }

        // 计算质量分数
        const { score, flagged, flagReason } = calculateQualityScore(
            {
                user_id: undefined, // TODO: 如果有认证，传入 user_id
                duration_sec: body.duration_sec,
                observed_gain_per_min,
                ip_hash: ipHash
            },
            areaDistribution,
            ipCount || 0
        )

        // 插入样本
        const { data: insertedSample, error: insertError } = await supabase
            .from('training_samples')
            .insert({
                game_key: gameKey,
                version_key: versionKey,
                ip_hash: ipHash,
                user_agent: userAgent,
                stat_type: body.stat_type,
                area_id: body.area_id,
                duration_sec: body.duration_sec,
                start_stat: body.start_stat,
                end_stat: body.end_stat,
                observed_gain_per_min: observed_gain_per_min,
                boosts: boosts_json,
                multi_value: body.multi_value,
                quality_score: score,
                is_flagged: flagged,
                flag_reason: flagReason
            })
            .select()
            .single()

        if (insertError) {
            console.error('Error inserting sample:', insertError)
            return NextResponse.json(
                { error: 'Failed to save calibration sample' },
                { status: 500 }
            )
        }

        // 获取该区域当前的校准状态
        const { data: currentParams } = await supabase
            .from('training_area_params')
            .select('confidence, sample_count')
            .eq('area_id', body.area_id)
            .eq('version_key', versionKey)
            .single()

        return NextResponse.json({
            success: true,
            message: 'Calibration sample recorded. Thank you for helping improve accuracy!',
            sample_id: insertedSample.id,
            current_confidence: currentParams?.confidence ?? 0.1,
            current_sample_count: currentParams?.sample_count ?? 0,
            quality_score: score
        })

    } catch (error) {
        console.error('Calibration error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
