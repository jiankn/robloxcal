'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sprout, Coins, Leaf } from 'lucide-react'

const GAME_SLUG = 'grow-a-garden'

const CROPS = [
    { name: 'Carrot', baseValue: 5 },
    { name: 'Potato', baseValue: 8 },
    { name: 'Tomato', baseValue: 12 },
    { name: 'Pumpkin', baseValue: 50 },
    { name: 'Golden Apple', baseValue: 200 },
]

export default function GagCropCalculator() {
    const [selectedCrop, setSelectedCrop] = useState<string>(CROPS[0].name)
    const [quantity, setQuantity] = useState<number>(1)
    const [isGiant, setIsGiant] = useState<string>('normal')
    const [result, setResult] = useState<number | null>(null)

    const handleCalculate = () => {
        const crop = CROPS.find(c => c.name === selectedCrop) || CROPS[0]
        let multiplier = 1

        if (isGiant === 'giant') multiplier *= 5
        if (isGiant === 'shiny') multiplier *= 2

        const totalValue = Math.floor(crop.baseValue * multiplier * quantity)
        setResult(totalValue)
    }

    return (
        <CalculatorLayout
            title="Crop Value Calculator"
            description="Calculate the selling price of your harvested crops."
            gameSlug={GAME_SLUG}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            <Leaf className="h-5 w-5 text-green-400" />
                            Harvest Details
                        </CardTitle>
                        <CardDescription>Select crop and quantity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Crop Type</label>
                            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    {CROPS.map(c => (
                                        <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Quantity</label>
                            <Input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="bg-zinc-950 border-zinc-800 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Variant</label>
                            <Select value={isGiant} onValueChange={setIsGiant}>
                                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="shiny">Shiny (x2)</SelectItem>
                                    <SelectItem value="giant">Giant (x5)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={handleCalculate}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-2 mt-2"
                        >
                            Calculate Value
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {result !== null ? (
                        <Card className="bg-zinc-900/50 border-zinc-800 h-full border-t-4 border-t-green-500">
                            <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                                <div className="p-4 bg-green-500/10 rounded-full mb-4">
                                    <Coins className="h-8 w-8 text-green-400" />
                                </div>
                                <div className="text-zinc-400 text-sm mb-2">Total Selling Price</div>
                                <div className="text-5xl font-bold text-white tracking-tight">
                                    {result.toLocaleString()}
                                </div>
                                <div className="text-green-500 text-sm mt-2 font-medium">Coins</div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                            <div className="text-center text-zinc-500">
                                <Sprout className="h-10 w-10 mx-auto mb-3 opacity-50" />
                                <p>Select crop to see value</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </CalculatorLayout>
    )
}
