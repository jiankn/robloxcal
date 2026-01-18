/**
 * GET /api/v1/codes
 * 获取兑换码列表
 */

import { NextResponse } from 'next/server'
import { createPublicServerClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') || 'afse'
    const activeOnly = searchParams.get('active') !== 'false'

    try {
        const supabase = createPublicServerClient()

        let query = supabase
            .from('codes')
            .select('*')
            .eq('game_key', game)
            .order('created_at', { ascending: false })

        if (activeOnly) {
            query = query.eq('is_active', true)
        }

        const { data: codes, error } = await query

        if (error) {
            console.error('Error fetching codes:', error)
            return NextResponse.json(
                { error: 'Failed to fetch codes' },
                { status: 500 }
            )
        }

        // 过滤已过期的码
        const now = new Date()
        const validCodes = codes?.filter(code => {
            if (!code.expires_at) return true
            return new Date(code.expires_at) > now
        }) || []

        return NextResponse.json({
            codes: validCodes,
            total: validCodes.length,
            last_updated: new Date().toISOString()
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        })
    } catch (error) {
        console.error('Codes API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
