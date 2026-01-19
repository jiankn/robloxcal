import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { getGameFaqs, type FaqItem } from "@/data/game-faqs"

interface FaqSectionProps {
    gameSlug?: string  // Optional: if not provided, uses AFSE as default
    faqs?: FaqItem[]   // Optional: override with custom FAQs
    title?: string     // Optional: custom title
    subtitle?: string  // Optional: custom subtitle
}

export function FaqSection({
    gameSlug = 'afse',
    faqs: customFaqs,
    title = "Frequently Asked Questions",
    subtitle
}: FaqSectionProps) {
    // Use custom FAQs if provided, otherwise get from game config
    const faqs = customFaqs || getGameFaqs(gameSlug)

    // Don't render if no FAQs
    if (!faqs || faqs.length === 0) return null

    // Generate dynamic subtitle based on game
    const dynamicSubtitle = subtitle || `Everything you need to know`

    // Generate JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <section className="mb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-zinc-800/50">
                    <HelpCircle className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="text-zinc-400">{dynamicSubtitle}</p>
                </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-zinc-900/30 border-zinc-800 px-4 rounded-lg"
                    >
                        <AccordionTrigger className="text-white hover:text-indigo-400 hover:no-underline text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 leading-relaxed">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
