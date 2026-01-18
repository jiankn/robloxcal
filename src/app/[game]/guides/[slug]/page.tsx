import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getGuide, getAllGuides } from '@/lib/guides-data'
import { GUIDE_CATEGORIES, DIFFICULTY_LABELS } from '@/lib/guides-types'
import { BookOpen, Clock, ArrowLeft, Share2, TrendingUp, Sword, Coins, Lightbulb } from 'lucide-react'

// 动态生成 metadata
export async function generateMetadata({ params }: { params: Promise<{ game: string; slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const guide = getGuide(slug)

    if (!guide) {
        return { title: 'Guide Not Found' }
    }

    return {
        title: `${guide.title} | AFSE Guide`,
        description: guide.description,
        keywords: guide.tags,
        openGraph: {
            title: guide.title,
            description: guide.description,
            type: 'article',
            publishedTime: guide.publishedAt,
        }
    }
}

// 使用动态渲染
export const dynamic = 'force-dynamic'

const CATEGORY_ICONS = {
    leveling: TrendingUp,
    combat: Sword,
    economy: Coins,
    tips: Lightbulb
}

// 简单的 Markdown 渲染（不用第三方库）
function renderMarkdown(content: string) {
    const lines = content.trim().split('\n')
    const elements: React.ReactNode[] = []
    let inCodeBlock = false
    let codeContent: string[] = []
    let inTable = false
    let tableRows: string[][] = []
    let listItems: string[] = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]

        // 代码块
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                elements.push(
                    <pre key={i} className="bg-zinc-800 p-4 rounded-lg overflow-x-auto my-4">
                        <code className="text-sm text-zinc-300">{codeContent.join('\n')}</code>
                    </pre>
                )
                codeContent = []
                inCodeBlock = false
            } else {
                inCodeBlock = true
            }
            continue
        }

        if (inCodeBlock) {
            codeContent.push(line)
            continue
        }

        // 表格
        if (line.startsWith('|')) {
            if (!inTable) {
                inTable = true
                tableRows = []
            }
            const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
            if (!cells.every(c => c.match(/^[-:]+$/))) {
                tableRows.push(cells)
            }
            continue
        } else if (inTable) {
            elements.push(
                <div key={`table-${i}`} className="overflow-x-auto my-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-zinc-800">
                                {tableRows[0]?.map((cell, ci) => (
                                    <th key={ci} className="border border-zinc-700 px-4 py-2 text-left text-zinc-300">
                                        {cell}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.slice(1).map((row, ri) => (
                                <tr key={ri} className="bg-zinc-900/50">
                                    {row.map((cell, ci) => (
                                        <td key={ci} className="border border-zinc-700 px-4 py-2 text-zinc-400">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
            inTable = false
            tableRows = []
        }

        // 空行
        if (!line.trim()) {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`list-${i}`} className="list-disc list-inside space-y-1 my-4 text-zinc-400">
                        {listItems.map((item, li) => <li key={li}>{item}</li>)}
                    </ul>
                )
                listItems = []
            }
            continue
        }

        // 标题
        if (line.startsWith('## ')) {
            elements.push(<h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>)
            continue
        }
        if (line.startsWith('### ')) {
            elements.push(<h3 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{line.slice(4)}</h3>)
            continue
        }

        // 引用
        if (line.startsWith('> ')) {
            elements.push(
                <blockquote key={i} className="border-l-4 border-purple-500 pl-4 my-4 text-zinc-300 italic">
                    {line.slice(2)}
                </blockquote>
            )
            continue
        }

        // 列表
        if (line.match(/^[-*] /)) {
            listItems.push(line.slice(2))
            continue
        }
        if (line.match(/^\d+\. /)) {
            listItems.push(line.replace(/^\d+\. /, ''))
            continue
        }

        // 普通段落
        elements.push(<p key={i} className="text-zinc-400 my-4 leading-relaxed">{line}</p>)
    }

    return elements
}

export default async function GuidePage({ params }: { params: Promise<{ game: string; slug: string }> }) {
    const { game, slug } = await params
    const guide = getGuide(slug)

    if (!guide) {
        notFound()
    }

    const categoryInfo = GUIDE_CATEGORIES[guide.category]
    const difficultyInfo = DIFFICULTY_LABELS[guide.difficulty]
    const Icon = CATEGORY_ICONS[guide.category]
    const allGuides = getAllGuides()
    const relatedGuides = allGuides
        .filter(g => g.slug !== guide.slug && (g.category === guide.category || g.tags.some(t => guide.tags.includes(t))))
        .slice(0, 3)

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href={`/${game}/guides`}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Guides
                    </Link>
                </div>

                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge className={`bg-${categoryInfo.color}-500/20 text-${categoryInfo.color}-400`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {categoryInfo.label}
                        </Badge>
                        <Badge className={`bg-${difficultyInfo.color}-500/20 text-${difficultyInfo.color}-400`}>
                            {difficultyInfo.label}
                        </Badge>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        {guide.title}
                    </h1>

                    <p className="text-lg text-zinc-400 mb-4">
                        {guide.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {guide.readTime} min read
                        </span>
                        <span>Published: {guide.publishedAt}</span>
                    </div>
                </header>

                <Separator className="bg-zinc-800 my-8" />

                {/* Content */}
                <article className="prose prose-invert max-w-none">
                    {renderMarkdown(guide.content)}
                </article>

                <Separator className="bg-zinc-800 my-8" />

                {/* Tags */}
                <div className="mb-8">
                    <h3 className="text-sm font-medium text-zinc-400 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {guide.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Related Guides */}
                {relatedGuides.length > 0 && (
                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Related Guides</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            {relatedGuides.map((related) => (
                                <Link key={related.slug} href={`/${game}/guides/${related.slug}`}>
                                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 transition-all h-full">
                                        <CardContent className="p-4">
                                            <h4 className="font-medium text-white mb-2 line-clamp-2">{related.title}</h4>
                                            <span className="text-xs text-zinc-500">{related.readTime} min read</span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
                    <CardContent className="py-6 text-center">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Ready to Apply These Tips?
                        </h3>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link
                                href={`/${game}`}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                            >
                                Training Optimizer
                            </Link>
                            <Link
                                href={`/${game}/dps`}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                DPS Calculator
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
