import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
    {
        question: "What is the best training area in Anime Fighting Simulator Endless?",
        answer: "The best training area depends on your current stats. Our AFSE Calculator analyzes your strength, chakra, speed, and durability levels to recommend the optimal spot that gives you the highest gain per minute."
    },
    {
        question: "How do I get stats fast in AFSE?",
        answer: "To get stats fast, use the highest requirement training area you can unlock, equip your best Class, and use boosters (VIP, 2x Stats, Weekend Boost). Use our Optimizer to calculate exactly how long it takes to reach your next milestone."
    },
    {
        question: "What are the latest AFSE codes?",
        answer: "We update our codes daily. Visit our Codes page to find the latest redeem codes for free Yen, Chikara Shards, and Stat Boosts."
    },
    {
        question: "Is the No Limit Gamepass worth it?",
        answer: "No Limit removes the 131K stat cap for multi-training, allowing exponential growth. If you are a serious grinder aiming for leaderboards, it is the most essential gamepass."
    }
]

export function FaqSection() {
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
                    <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="text-zinc-400">Everything you need to know about AFSE training</p>
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
