/**
 * GET /api/v1/admin/samples - 获取样本列表
 * PATCH /api/v1/admin/samples - 更新样本状态
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function GET() {
    try {
        const supabase = createServerClient()

        const { data: samples, error } = await supabase
            .from('training_samples')
            .select(`
        id,
        area_id,
        observed_gain_per_min,
        quality_score,
        is_flagged,
        created_at,
        training_areas (area_name)
      `)
            .order('created_at', { ascending: false })
            .limit(100)

        if (error) {
            console.error('Error fetching samples:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ samples })
    } catch (error) {
        console.error('Admin samples error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { id, is_flagged } = body

        if (typeof id !== 'number' || typeof is_flagged !== 'boolean') {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const supabase = createServerClient()

        const { error } = await supabase
            .from('training_samples')
            .update({ is_flagged })
            .eq('id', id)

        if (error) {
            console.error('Error updating sample:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin samples patch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
