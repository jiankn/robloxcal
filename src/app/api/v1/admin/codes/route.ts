/**
 * POST /api/v1/admin/codes - 新增兑换码
 * PATCH /api/v1/admin/codes - 更新兑换码
 * DELETE /api/v1/admin/codes - 删除兑换码
 */

import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export const runtime = 'edge'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { code, reward_desc, expire_at, is_active } = body

        if (!code || !reward_desc) {
            return NextResponse.json({ error: 'Code and reward_desc are required' }, { status: 400 })
        }

        const supabase = createServerClient()

        const { data, error } = await supabase
            .from('codes')
            .insert({
                game_key: 'afse',
                code,
                reward_desc,
                expire_at: expire_at || null,
                is_active: is_active !== false
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating code:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, code: data })
    } catch (error) {
        console.error('Admin codes post error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { id, code, reward_desc, expire_at, is_active } = body

        if (typeof id !== 'number') {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const supabase = createServerClient()

        const updateData: Record<string, unknown> = {}
        if (code !== undefined) updateData.code = code
        if (reward_desc !== undefined) updateData.reward_desc = reward_desc
        if (expire_at !== undefined) updateData.expire_at = expire_at || null
        if (is_active !== undefined) updateData.is_active = is_active

        const { error } = await supabase
            .from('codes')
            .update(updateData)
            .eq('id', id)

        if (error) {
            console.error('Error updating code:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin codes patch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json()
        const { id } = body

        if (typeof id !== 'number') {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const supabase = createServerClient()

        const { error } = await supabase
            .from('codes')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting code:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Admin codes delete error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
