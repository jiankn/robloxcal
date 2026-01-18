'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Loader2, CheckCircle, KeyRound } from 'lucide-react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isValidSession, setIsValidSession] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    // Check if user has a valid recovery session
    useEffect(() => {
        async function checkSession() {
            // Handle hash fragment (Supabase sends token in URL hash)
            const hashParams = new URLSearchParams(window.location.hash.substring(1))
            const accessToken = hashParams.get('access_token')
            const refreshToken = hashParams.get('refresh_token')
            const type = hashParams.get('type')

            if (accessToken && type === 'recovery') {
                // Set the session from the recovery token
                const { error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken || '',
                })

                if (!error) {
                    setIsValidSession(true)
                    // Clean up URL
                    window.history.replaceState({}, '', '/auth/reset-password')
                } else {
                    toast.error('Recovery link expired or invalid')
                    router.push('/login')
                }
            } else {
                // Check if already has a session
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    setIsValidSession(true)
                } else {
                    toast.error('No valid session. Please request a new recovery link.')
                    router.push('/login')
                }
            }
            setIsLoading(false)
        }

        checkSession()
    }, [supabase, router])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setIsPending(true)

        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            toast.error(error.message)
            setIsPending(false)
            return
        }

        setIsSuccess(true)
        toast.success('Password updated successfully!')

        // Redirect to admin after 2 seconds
        setTimeout(() => {
            router.push('/admin')
        }, 2000)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen grid place-items-center bg-zinc-950">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen grid place-items-center bg-zinc-950 px-4">
                <Card className="w-full max-w-sm bg-zinc-900/50 border-zinc-800">
                    <CardContent className="pt-6 text-center">
                        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Password Updated!</h2>
                        <p className="text-zinc-400">Redirecting to admin...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen grid place-items-center bg-zinc-950 px-4">
            <Card className="w-full max-w-sm bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <KeyRound className="h-5 w-5 text-purple-400" />
                        <CardTitle className="text-2xl text-white">Reset Password</CardTitle>
                    </div>
                    <CardDescription>Enter your new password below</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-zinc-950/50 border-zinc-800"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                required
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="bg-zinc-950/50 border-zinc-800"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={isPending || !isValidSession}
                        >
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
