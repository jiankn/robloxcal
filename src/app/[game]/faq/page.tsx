import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HelpCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'FAQ | AFSE Calculator - Anime Fighting Simulator Endless',
    description: 'Frequently asked questions about the AFSE Calculator, training optimization, boost stacking, and more.',
}

const faqs = [
    {
        question: 'How does the Training Optimizer work?',
        answer: 'The Training Optimizer uses community-calibrated data to estimate your stat gains per minute at each training area. It considers your current stat level, active boosts, and multipliers to recommend the most efficient training spots.'
    },
    {
        question: 'What is the confidence score?',
        answer: 'The confidence score (0-100%) indicates how reliable our data is for each training area. Higher confidence means more valid samples have been submitted. You can help improve confidence by submitting your own calibration data.'
    },
    {
        question: 'How do boosts stack in AFSE?',
        answer: 'Most boosts in Anime Fighting Simulator Endless stack multiplicatively. For example: VIP (2x) × 2x Stats Gamepass (2x) × Weekend Boost (1.5x) = 6x total multiplier. The Multi stat is also multiplied but capped at 131K unless you have the No Limit gamepass.'
    },
    {
        question: 'What is the Multi cap?',
        answer: 'By default, your Multi stat is capped at 131,000. This means any Multi above 131K won\'t give additional benefits unless you have the No Limit gamepass, which removes this cap entirely.'
    },
    {
        question: 'How accurate is the calculator?',
        answer: 'Accuracy depends on the amount of calibration data we have. Areas with high confidence scores (70%+) are very reliable. If you notice inaccuracies, please submit a calibration sample to help us improve!'
    },
    {
        question: 'How do I submit calibration data?',
        answer: 'Go to the Calibrate page, select your training area, record your stats before and after training for at least 30 seconds (2+ minutes recommended), and submit. Your data helps improve accuracy for everyone.'
    },
    {
        question: 'Do all codes work?',
        answer: 'We try to keep our codes list updated, but codes can expire without notice. If a code doesn\'t work, it may have expired. We update our list regularly.'
    },
    {
        question: 'Is this calculator affiliated with the game?',
        answer: 'No, this is a fan-made tool created to help players optimize their training. We are not affiliated with Roblox or the developers of Anime Fighting Simulator Endless.'
    },
    {
        question: 'Why are some training areas showing low confidence?',
        answer: 'Low confidence means we don\'t have enough valid samples for that area yet. This is common for newly added areas or less popular training spots. Help us by submitting calibration data!'
    },
    {
        question: 'Can I use this calculator on mobile?',
        answer: 'Yes! The calculator is fully responsive and works on phones, tablets, and desktops. You can use it while playing AFSE on another device.'
    }
]

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <Badge className="mb-4 bg-zinc-500/20 text-zinc-300 border-zinc-500/30">
                        <HelpCircle className="h-3 w-3 mr-1" />
                        Support
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-zinc-400">
                        Everything you need to know about the AFSE Calculator
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-zinc-900/50 border border-zinc-800 rounded-xl"
                        >
                            <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                                <span className="font-medium text-white pr-4">{faq.question}</span>
                                <span className="text-zinc-400 group-open:rotate-180 transition-transform shrink-0">
                                    ▼
                                </span>
                            </summary>
                            <div className="px-4 pb-4 text-zinc-400">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>

                {/* Contact */}
                <Card className="bg-zinc-900/50 border-zinc-800 mt-8">
                    <CardContent className="py-6 text-center">
                        <h2 className="text-lg font-semibold text-white mb-2">
                            Still have questions?
                        </h2>
                        <p className="text-zinc-400 mb-4">
                            Join our community or report issues on GitHub.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                href="/"
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                            >
                                Back to Calculator
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Disclaimer */}
                <div className="mt-8 p-4 bg-zinc-900/30 rounded-xl border border-zinc-800">
                    <h3 className="text-sm font-medium text-zinc-300 mb-2">Disclaimer</h3>
                    <p className="text-xs text-zinc-500">
                        AFSE Calculator is a fan-made tool and is not affiliated with, endorsed by, or connected to Roblox Corporation or the developers of Anime Fighting Simulator Endless. All game content, trademarks, and intellectual property belong to their respective owners. This tool is provided "as is" without warranty. Game mechanics may change at any time, which could affect calculator accuracy.
                    </p>
                </div>
            </div>
        </div>
    )
}
