'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, HelpCircle } from 'lucide-react'
import type { FAQ } from '@/lib/calculators/engines'

interface FAQAccordionProps {
    faqs: FAQ[]
    className?: string
}

export function FAQAccordion({ faqs, className = '' }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    if (!faqs || faqs.length === 0) return null

    return (
        <Card className={`bg-zinc-900/50 border-zinc-800 ${className}`}>
            <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-400" />
                    Frequently Asked Questions
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-zinc-800 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors"
                        >
                            <span className="font-medium text-white pr-4">{faq.question}</span>
                            <ChevronDown
                                className={`h-5 w-5 text-zinc-400 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <div className="px-4 pb-4 text-zinc-400 leading-relaxed">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
