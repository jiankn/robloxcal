import { createSessionClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Required for Cloudflare Pages
export const runtime = 'edge'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)

    // Get the hash fragment from the URL (Supabase sends token in hash)
    // Note: Hash fragments are not sent to the server, so we need to handle this client-side
    // This route is for code-based auth (like email confirmation)
    const code = requestUrl.searchParams.get('code')
    const type = requestUrl.searchParams.get('type')

    if (code) {
        const supabase = await createSessionClient()
        await supabase.auth.exchangeCodeForSession(code)

        // Redirect based on type
        if (type === 'recovery') {
            return NextResponse.redirect(new URL('/auth/reset-password', requestUrl.origin))
        }

        return NextResponse.redirect(new URL('/admin', requestUrl.origin))
    }

    // If no code, redirect to login
    return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
