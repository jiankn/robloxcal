'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    Gift,
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    Loader2,
    Save
} from 'lucide-react'
import Link from 'next/link'

interface Code {
    id: number
    code: string
    reward_desc: string
    expire_at: string | null
    is_active: boolean
}

export default function AdminCodesPage() {
    const [codes, setCodes] = useState<Code[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [formData, setFormData] = useState({
        code: '',
        reward_desc: '',
        expire_at: '',
        is_active: true
    })

    useEffect(() => {
        loadCodes()
    }, [])

    async function loadCodes() {
        setIsLoading(true)
        try {
            const response = await fetch('/api/v1/codes?all=true')
            if (response.ok) {
                const data = await response.json()
                setCodes(data.codes || [])
            }
        } catch (err) {
            console.error('Failed to load codes:', err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSave() {
        try {
            const response = await fetch('/api/v1/admin/codes', {
                method: editingId ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingId ? { id: editingId, ...formData } : formData)
            })
            if (response.ok) {
                await loadCodes()
                resetForm()
            }
        } catch (err) {
            console.error('Failed to save code:', err)
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this code?')) return

        try {
            const response = await fetch('/api/v1/admin/codes', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            if (response.ok) {
                await loadCodes()
            }
        } catch (err) {
            console.error('Failed to delete code:', err)
        }
    }

    function startEdit(code: Code) {
        setEditingId(code.id)
        setFormData({
            code: code.code,
            reward_desc: code.reward_desc,
            expire_at: code.expire_at || '',
            is_active: code.is_active
        })
        setShowAddForm(true)
    }

    function resetForm() {
        setEditingId(null)
        setShowAddForm(false)
        setFormData({
            code: '',
            reward_desc: '',
            expire_at: '',
            is_active: true
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-400" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Admin
                    </Link>
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                                <Gift className="h-3 w-3 mr-1" />
                                Code Management
                            </Badge>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Promo Codes
                            </h1>
                            <p className="text-zinc-400">
                                Add, edit, or deactivate promotional codes.
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Code
                        </Button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <Card className="bg-zinc-900/50 border-zinc-800 mb-6">
                        <CardHeader>
                            <CardTitle className="text-white">
                                {editingId ? 'Edit Code' : 'Add New Code'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Code</Label>
                                    <Input
                                        value={formData.code}
                                        onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                                        placeholder="FREECODE123"
                                        className="bg-zinc-800 border-zinc-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Expiry Date (optional)</Label>
                                    <Input
                                        type="date"
                                        value={formData.expire_at}
                                        onChange={(e) => setFormData(prev => ({ ...prev, expire_at: e.target.value }))}
                                        className="bg-zinc-800 border-zinc-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Reward Description</Label>
                                <Input
                                    value={formData.reward_desc}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reward_desc: e.target.value }))}
                                    placeholder="500K Yen + 2x Boost (30 min)"
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(c) => setFormData(prev => ({ ...prev, is_active: !!c }))}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                </Button>
                                <Button variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-400">Code</TableHead>
                                    <TableHead className="text-zinc-400">Reward</TableHead>
                                    <TableHead className="text-zinc-400">Expires</TableHead>
                                    <TableHead className="text-zinc-400">Status</TableHead>
                                    <TableHead className="text-zinc-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {codes.map((code) => (
                                    <TableRow key={code.id} className="border-zinc-800">
                                        <TableCell className="font-mono text-white">{code.code}</TableCell>
                                        <TableCell className="text-zinc-300">{code.reward_desc}</TableCell>
                                        <TableCell className="text-zinc-400">
                                            {code.expire_at ? new Date(code.expire_at).toLocaleDateString() : 'Never'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={code.is_active ? 'bg-green-500/20 text-green-400' : 'bg-zinc-500/20 text-zinc-400'}>
                                                {code.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => startEdit(code)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(code.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {codes.length === 0 && (
                            <div className="text-center py-12 text-zinc-400">
                                No codes found
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
