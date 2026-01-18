'use client'

import { useState, useCallback } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import type { BoostSelection } from '@/lib/types'

interface BoostSelectorProps {
    value: BoostSelection
    onChange: (boosts: BoostSelection) => void
}

const CODE_BOOST_OPTIONS = [
    { value: 'none', label: 'No Code Boost' },
    { value: '1.25', label: '1.25x Code Boost' },
    { value: '1.5', label: '1.5x Code Boost' },
    { value: '2', label: '2x Code Boost' },
    { value: '3', label: '3x Code Boost' },
]

export function BoostSelector({ value, onChange }: BoostSelectorProps) {
    const handleCheckboxChange = useCallback((key: keyof BoostSelection, checked: boolean) => {
        onChange({ ...value, [key]: checked })
    }, [value, onChange])

    const handleCodeBoostChange = useCallback((selectedValue: string) => {
        onChange({
            ...value,
            code_boost: selectedValue === 'none' ? undefined : selectedValue
        })
    }, [value, onChange])

    return (
        <div className="space-y-4">
            <div className="text-sm font-medium text-zinc-300">Active Boosts</div>

            {/* Gamepasses */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="vip_gamepass"
                        checked={value.vip_gamepass || false}
                        onCheckedChange={(checked) => handleCheckboxChange('vip_gamepass', checked === true)}
                    />
                    <Label htmlFor="vip_gamepass" className="text-sm cursor-pointer">
                        VIP Gamepass (2x)
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="x2_stats"
                        checked={value.x2_stats || false}
                        onCheckedChange={(checked) => handleCheckboxChange('x2_stats', checked === true)}
                    />
                    <Label htmlFor="x2_stats" className="text-sm cursor-pointer">
                        2x Stats Gamepass
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="x3_stats"
                        checked={value.x3_stats || false}
                        onCheckedChange={(checked) => handleCheckboxChange('x3_stats', checked === true)}
                    />
                    <Label htmlFor="x3_stats" className="text-sm cursor-pointer">
                        3x Stats Gamepass
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="no_limit"
                        checked={value.no_limit || false}
                        onCheckedChange={(checked) => handleCheckboxChange('no_limit', checked === true)}
                    />
                    <Label htmlFor="no_limit" className="text-sm cursor-pointer">
                        No Limit Gamepass
                    </Label>
                </div>
            </div>

            {/* Event Boosts */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="weekend_boost"
                        checked={value.weekend_boost || false}
                        onCheckedChange={(checked) => handleCheckboxChange('weekend_boost', checked === true)}
                    />
                    <Label htmlFor="weekend_boost" className="text-sm cursor-pointer">
                        Weekend Boost (1.5x)
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="server_boost"
                        checked={value.server_boost || false}
                        onCheckedChange={(checked) => handleCheckboxChange('server_boost', checked === true)}
                    />
                    <Label htmlFor="server_boost" className="text-sm cursor-pointer">
                        Server Boost (1.25x)
                    </Label>
                </div>
            </div>

            {/* Code Boost Selector */}
            <div className="space-y-2">
                <Label className="text-sm">Code Boost</Label>
                <Select
                    value={value.code_boost || 'none'}
                    onValueChange={handleCodeBoostChange}
                >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select code boost" />
                    </SelectTrigger>
                    <SelectContent>
                        {CODE_BOOST_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
