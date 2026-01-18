import { Metadata } from 'next'
import { Mail, MessageSquare, Clock, ShieldCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Contact Us | RobloxCal',
    description: 'Get in touch with the RobloxCal team. We are here to help with questions about our Roblox game tools and guides.',
}

export default function ContactPage() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Have questions, suggestions, or feedback? We&apos;d love to hear from you!
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                                <Mail className="w-8 h-8 text-purple-400" />
                            </div>
                            <CardTitle className="text-2xl text-white">Send Us an Email</CardTitle>
                            <CardDescription className="text-zinc-400">
                                Reach out to our team via email
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <a
                                    href="mailto:support@robloxcal.com"
                                    className="text-2xl font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    support@robloxcal.com
                                </a>
                            </div>

                            <div className="text-center">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-purple-600 hover:bg-purple-500 text-white"
                                >
                                    <a href="mailto:support@robloxcal.com">
                                        <Mail className="w-5 h-5 mr-2" />
                                        Send Email
                                    </a>
                                </Button>
                            </div>

                            <div className="border-t border-zinc-800 pt-6 space-y-4">
                                <div className="flex items-start gap-3 text-sm text-zinc-400">
                                    <MessageSquare className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-zinc-300">We can help you with:</p>
                                        <ul className="mt-1 space-y-1">
                                            <li>• Bug reports and website issues</li>
                                            <li>• Game data update requests</li>
                                            <li>• Business and partnership inquiries</li>
                                            <li>• General feedback and suggestions</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <Clock className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                                    <p>We typically respond within 24-48 hours</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-8 bg-zinc-900/30 border-zinc-800">
                        <CardContent className="py-5">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-zinc-800/50">
                                        <ShieldCheck className="h-5 w-5 text-zinc-300" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">Support & Policies</div>
                                        <div className="text-sm text-zinc-400">
                                            Quick links for privacy and terms.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                                        <Link href="/privacy">Privacy</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                                        <Link href="/terms">Terms</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
