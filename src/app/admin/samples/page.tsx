'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    Database,
    ArrowLeft,
    Check,
    X,
    Flag,
    Loader2,
    Search
} from 'lucide-react'
import Link from 'next/link'

interface Sample {
    id: number
    area_id: number
    observed_gain_per_min: number
    quality_score: number
    is_flagged: boolean
    created_at: string
    training_areas?: { area_name: string }
}

export default function AdminSamplesPage() {
    const [samples, setSamples] = useState<Sample[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'pending' | 'flagged'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadSamples()
    }, [])

    async function loadSamples() {
        setIsLoading(true)
        try {
            const response = await fetch('/api/v1/admin/samples')
            if (response.ok) {
                const data = await response.json()
                setSamples(data.samples || [])
            }
        } catch (err) {
            console.error('Failed to load samples:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleFlag(sampleId: number, flagged: boolean) {
        try {
            const response = await fetch('/api/v1/admin/samples', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: sampleId, is_flagged: flagged })
            })
            if (response.ok) {
                setSamples(prev => prev.map(s =>
                    s.id === sampleId ? { ...s, is_flagged: flagged } : s
                ))
            }
        } catch (err) {
            console.error('Failed to update sample:', err)
        }
    }

    const filteredSamples = samples.filter(s => {
        if (filter === 'pending') return s.quality_score < 0.5 && !s.is_flagged
        if (filter === 'flagged') return s.is_flagged
        return true
    }).filter(s => {
        if (!searchTerm) return true
        return s.training_areas?.area_name?.toLowerCase().includes(searchTerm.toLowerCase())
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin
                    </Link>
                    <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <Database className="h-3 w-3 mr-1" />
                        Sample Management
                    </Badge>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Calibration Samples
                    </h1>
                    <p className="text-zinc-400">
                        Review and manage user-submitted training data.
                    </p>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                    <CardContent className="py-4">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex gap-2">
                                <Button
                                    variant={filter === 'all' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter('all')}
                                >
                                    All ({samples.length})
                                </Button>
                                <Button
                                    variant={filter === 'pending' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter('pending')}
                                >
                                    Low Quality ({samples.filter(s => s.quality_score < 0.5 && !s.is_flagged).length})
                                </Button>
                                <Button
                                    variant={filter === 'flagged' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter('flagged')}
                                >
                                    Flagged ({samples.filter(s => s.is_flagged).length})
                                </Button>
                            </div>
                            <div className="flex-1 max-w-xs">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                    <Input
                                        placeholder="Search by area name..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-zinc-800 border-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-400">ID</TableHead>
                                    <TableHead className="text-zinc-400">Area</TableHead>
                                    <TableHead className="text-zinc-400">Gain/min</TableHead>
                                    <TableHead className="text-zinc-400">Quality</TableHead>
                                    <TableHead className="text-zinc-400">Status</TableHead>
                                    <TableHead className="text-zinc-400">Date</TableHead>
                                    <TableHead className="text-zinc-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredSamples.map((sample) => (
                                    <TableRow key={sample.id} className="border-zinc-800">
                                        <TableCell className="text-zinc-300">#{sample.id}</TableCell>
                                        <TableCell className="text-white">
                                            {sample.training_areas?.area_name || `Area ${sample.area_id}`}
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            {sample.observed_gain_per_min.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={
                                                sample.quality_score >= 0.8 ? 'bg-green-500/20 text-green-400' :
                                                    sample.quality_score >= 0.5 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                            }>
                                                {(sample.quality_score * 100).toFixed(0)}%
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {sample.is_flagged ? (
                                                <Badge className="bg-red-500/20 text-red-400">
                                                    <Flag className="h-3 w-3 mr-1" />
                                                    Flagged
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-green-500/20 text-green-400">
                                                    <Check className="h-3 w-3 mr-1" />
                                                    Valid
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-zinc-400">
                                            {new Date(sample.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {sample.is_flagged ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleFlag(sample.id, false)}
                                                    className="text-green-400 border-green-500/30 hover:bg-green-500/20"
                                                >
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Approve
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleFlag(sample.id, true)}
                                                    className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                                                >
                                                    <X className="h-4 w-4 mr-1" />
                                                    Flag
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredSamples.length === 0 && (
                            <div className="text-center py-12 text-zinc-400">
                                No samples found
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
