'use client'

import { useMemo, useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, BarChart3, RefreshCw, Shield, Sword, Target, WandSparkles } from 'lucide-react'

const PRESETS = {
  balanced: { melee: 25, defense: 25, sword: 25, gun: 5, fruit: 20 },
  sword: { melee: 15, defense: 20, sword: 45, gun: 0, fruit: 20 },
  fruit: { melee: 10, defense: 20, sword: 10, gun: 0, fruit: 60 },
  tanky: { melee: 20, defense: 40, sword: 20, gun: 0, fruit: 20 },
} as const

type BuildKey = keyof typeof PRESETS

type Allocation = {
  melee: number
  defense: number
  sword: number
  gun: number
  fruit: number
}

const DEFAULT_POINTS = 1200

export default function StatPlanner() {
  const [totalPoints, setTotalPoints] = useState<number>(DEFAULT_POINTS)
  const [allocation, setAllocation] = useState<Allocation>({
    melee: 300,
    defense: 300,
    sword: 400,
    gun: 0,
    fruit: 200,
  })

  const spent = useMemo(
    () => allocation.melee + allocation.defense + allocation.sword + allocation.gun + allocation.fruit,
    [allocation]
  )
  const remaining = totalPoints - spent
  const dominantStat = useMemo(() => {
    const entries = Object.entries(allocation) as Array<[keyof Allocation, number]>
    return entries.sort((a, b) => b[1] - a[1])[0][0]
  }, [allocation])

  function setField(field: keyof Allocation, value: number) {
    setAllocation((prev) => ({ ...prev, [field]: Math.max(0, Number.isFinite(value) ? value : 0) }))
  }

  function applyPreset(key: BuildKey) {
    const preset = PRESETS[key]
    const next: Allocation = {
      melee: Math.floor((totalPoints * preset.melee) / 100),
      defense: Math.floor((totalPoints * preset.defense) / 100),
      sword: Math.floor((totalPoints * preset.sword) / 100),
      gun: Math.floor((totalPoints * preset.gun) / 100),
      fruit: Math.floor((totalPoints * preset.fruit) / 100),
    }

    const diff = totalPoints - (next.melee + next.defense + next.sword + next.gun + next.fruit)
    next.melee += diff
    setAllocation(next)
  }

  function resetPlanner() {
    setTotalPoints(DEFAULT_POINTS)
    setAllocation({ melee: 300, defense: 300, sword: 400, gun: 0, fruit: 200 })
  }

  const recommendation =
    dominantStat === 'sword'
      ? 'Sword-focused build: keep enough melee and defense to farm safely, then funnel extra points into sword damage.'
      : dominantStat === 'fruit'
        ? 'Fruit-focused build: prioritize survivability first, then stack fruit for burst and farming speed.'
        : dominantStat === 'defense'
          ? 'Tank build: useful for progression walls, bosses, and safer grinding sessions.'
          : dominantStat === 'melee'
            ? 'Melee-first build: good if your current weapon scaling is weak and you need more consistent basic damage.'
            : 'Gun-focused build: niche setup, but useful if your current Sailor Piece loadout scales around ranged pressure.'

  return (
    <CalculatorLayout
      title="Sailor Piece Stat Planner"
      description="Allocate stat points across melee, defense, sword, gun, and fruit to plan your next Sailor Piece build before you respec or level up."
      gameSlug="sailor-piece"
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                Build Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label className="text-sm text-zinc-400 block mb-2">Total Points Available</label>
                <Input
                  type="number"
                  value={totalPoints}
                  onChange={(e) => setTotalPoints(Math.max(0, Number(e.target.value) || 0))}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ['melee', 'Melee'],
                  ['defense', 'Defense'],
                  ['sword', 'Sword'],
                  ['gun', 'Gun'],
                  ['fruit', 'Fruit'],
                ].map(([field, label]) => (
                  <div key={field}>
                    <label className="text-sm text-zinc-400 block mb-2">{label}</label>
                    <Input
                      type="number"
                      value={allocation[field as keyof Allocation]}
                      onChange={(e) => setField(field as keyof Allocation, Number(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 text-white"
                    />
                  </div>
                ))}
              </div>

              <Separator className="bg-zinc-800" />

              <div>
                <div className="text-sm text-zinc-400 mb-3">Quick Presets</div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" className="border-zinc-700" onClick={() => applyPreset('balanced')}>Balanced</Button>
                  <Button type="button" variant="outline" className="border-zinc-700" onClick={() => applyPreset('sword')}>Sword</Button>
                  <Button type="button" variant="outline" className="border-zinc-700" onClick={() => applyPreset('fruit')}>Fruit</Button>
                  <Button type="button" variant="outline" className="border-zinc-700" onClick={() => applyPreset('tanky')}>Tanky</Button>
                  <Button type="button" variant="ghost" className="text-zinc-300" onClick={resetPlanner}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-400" />
                Planner Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300 leading-6">
              <p>This planner is meant to help you compare builds quickly before you spend points in Sailor Piece.</p>
              <p>Use it to decide whether your next levels should go into damage, survivability, or a more balanced setup for farming.</p>
              <div className="flex items-start gap-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4 text-zinc-300">
                <AlertCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <p>RobloxCal is fan-made. This tool helps with planning and comparison, not official in-game stat formulas.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Build Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Spent</span>
                <span className="text-white font-semibold">{spent}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Remaining</span>
                <span className={remaining >= 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>{remaining}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Main Focus</span>
                <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/25 uppercase">{dominantStat}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Allocation Mix</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                ['melee', 'Melee', Sword],
                ['defense', 'Defense', Shield],
                ['sword', 'Sword', Sword],
                ['gun', 'Gun', Target],
                ['fruit', 'Fruit', WandSparkles],
              ].map(([field, label, Icon]) => {
                const value = allocation[field as keyof Allocation]
                const pct = totalPoints > 0 ? Math.round((value / totalPoints) * 100) : 0
                const SafeIcon = Icon as typeof Sword
                return (
                  <div key={field} className="space-y-1">
                    <div className="flex items-center justify-between text-zinc-300">
                      <div className="flex items-center gap-2">
                        <SafeIcon className="h-4 w-4 text-cyan-400" />
                        <span>{label}</span>
                      </div>
                      <span>{value} pts • {pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-300 leading-6">{recommendation}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CalculatorLayout>
  )
}
