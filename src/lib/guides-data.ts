// 攻略数据（静态内容，SEO 友好）

import type { Guide, GuideContent } from './guides-types'

// 攻略元数据
export const guides: Guide[] = [
    {
        slug: 'leveling-fast',
        title: 'How to Level Up FAST in AFSE',
        description: 'The ultimate guide to leveling up quickly in Anime Fighting Simulator Endless. Learn the best training areas, optimal boost combinations, and time-saving strategies.',
        category: 'leveling',
        difficulty: 'beginner',
        readTime: 8,
        publishedAt: '2026-01-13',
        tags: ['leveling', 'training', 'beginner', 'tips'],
        featured: true
    },
    {
        slug: 'rebirth-guide',
        title: 'Complete Rebirth Guide - When & How to Rebirth',
        description: 'Everything you need to know about the rebirth system in AFSE. Learn when to rebirth, what rewards you get, and how to maximize your rebirth gains.',
        category: 'leveling',
        difficulty: 'intermediate',
        readTime: 10,
        publishedAt: '2026-01-13',
        tags: ['rebirth', 'progression', 'multipliers'],
        featured: true
    },
    {
        slug: 'best-builds',
        title: 'Best Builds for Every Stage of the Game',
        description: 'Recommended weapon, skill, and transformation combinations for beginners, mid-game, and end-game players.',
        category: 'combat',
        difficulty: 'intermediate',
        readTime: 12,
        publishedAt: '2026-01-13',
        tags: ['builds', 'weapons', 'skills', 'combat']
    },
    {
        slug: 'boost-stacking',
        title: 'How Boost Stacking Works in AFSE',
        description: 'Deep dive into how boosts stack multiplicatively, which combinations give the best results, and common mistakes to avoid.',
        category: 'tips',
        difficulty: 'advanced',
        readTime: 6,
        publishedAt: '2026-01-13',
        tags: ['boosts', 'multipliers', 'math', 'optimization']
    },
    {
        slug: 'yen-farming',
        title: 'Best Yen Farming Methods',
        description: 'Efficient ways to earn Yen in Anime Fighting Simulator Endless, from early game to late game strategies.',
        category: 'economy',
        difficulty: 'beginner',
        readTime: 5,
        publishedAt: '2026-01-13',
        tags: ['yen', 'farming', 'economy', 'money']
    }
]

// 攻略完整内容
export const guideContents: Record<string, string> = {
    'leveling-fast': `
## Introduction

Leveling up in Anime Fighting Simulator Endless can feel slow at first, but with the right strategy, you can speed up your progress significantly. This guide will show you exactly how to level up as fast as possible.

## Step 1: Understand the Training System

Each stat (Strength, Chakra, Sword, Speed, Agility, Durability) has its own training areas. The key principle is simple:

> **Always train at the highest-tier training area you can access.**

Higher-tier areas give significantly more gains per minute than lower-tier areas.

## Step 2: Optimize Your Boosts

Boosts stack **multiplicatively** in AFSE. Here's the priority order:

1. **VIP Gamepass** (2x) - Best investment if you plan to play seriously
2. **2x Stats Gamepass** (2x) 
3. **Weekend Boosts** (1.5x) - Play during weekends!
4. **Server Boosts** - Look for boosted servers
5. **Code Boosts** - Check our [codes page](/codes) for active codes

### Example Calculation

With VIP (2x) + 2x Stats (2x) + Weekend (1.5x) = **6x total multiplier!**

## Step 3: Use Our Training Optimizer

Don't guess which training area is best. Use our [Training Optimizer](/) to calculate the optimal spot for your current stats.

## Step 4: AFK Efficiently

AFSE rewards AFK training. Set up your character at the optimal training area and let it run while you do other things.

### Pro Tips for AFK:
- Use auto-clicker if allowed
- Train during school/work/sleep
- Check every few hours to upgrade to a better training area

## Step 5: Rebirth at the Right Time

Rebirth gives permanent multipliers but resets your stats. General rule:

- **First rebirth**: After reaching ~1M in main stats
- **Later rebirths**: When the multiplier gain is worth the reset time

See our [Rebirth Guide](/guides/rebirth-guide) for detailed rebirth timings.

## Quick Reference Table

| Game Stage | Focus | Training Area Tier |
|------------|-------|-------------------|
| New Player | Strength + Chakra | Tier 1-3 |
| Early Game | All stats evenly | Tier 4-6 |
| Mid Game | Main stat + support | Tier 7-8 |
| End Game | Push highest tier | Tier 9 |

## Conclusion

The fastest way to level up in AFSE is:

1. ✅ Always use the right training area (use our optimizer!)
2. ✅ Stack as many boosts as possible
3. ✅ AFK train efficiently
4. ✅ Rebirth at optimal times

Good luck, and see you at the top!
`,

    'rebirth-guide': `
## What is Rebirth?

Rebirth is a prestige system in AFSE that resets your stats to 0 but gives you permanent multipliers on all future stat gains.

## When Should You Rebirth?

The general rule is: **Rebirth when the time to regain your stats is worth the permanent bonus.**

### Recommended Rebirth Points

| Rebirth # | Recommended Stats | Multiplier Gain |
|-----------|------------------|-----------------|
| 1st | 1M all stats | 1.5x |
| 2nd | 5M all stats | 2x total |
| 3rd | 20M all stats | 2.5x total |
| 4th+ | 100M+ | 3x+ total |

## How to Rebirth

1. Open the menu
2. Go to "Rebirth" tab
3. Check your current requirements
4. Click "Rebirth" when ready

## Maximizing Rebirth Efficiency

### Before Rebirth
- Use all your boosts to get the most out of current multipliers
- Complete any quests that give permanent rewards
- Save codes for after rebirth

### After Rebirth
- Activate all boosts immediately
- Rush to unlock higher training areas
- Use our [Training Optimizer](/) to find the best spots

## Is Rebirth Worth It?

**Yes!** The permanent multipliers compound over time:

- 1st rebirth: 1.5x = 50% faster progress forever
- 2nd rebirth: 2x = 100% faster progress forever
- Combined: You're training 2x as fast as someone who never rebirthed

## Common Mistakes

1. ❌ Rebirthing too early (losing too much progress)
2. ❌ Waiting too long (diminishing returns on current stats)
3. ❌ Not using boosts after rebirth

## Conclusion

Rebirth is essential for long-term progress. Use this guide and our calculator to find the perfect rebirth timing for your playstyle!
`,

    'best-builds': `
## Introduction

Your build (weapon + skills + transformation) determines your damage output. This guide covers the best builds for each stage of the game.

## Early Game Builds (0 - 100K Stats)

### Recommended Setup
- **Weapon**: Iron Blade or Iron Gauntlet
- **Skills**: Basic Strike, Power Punch
- **Transformation**: Power Boost

Focus on leveling stats first. Combat isn't important yet.

## Mid Game Builds (100K - 10M Stats)

### Balanced Build
- **Weapon**: Steel Katana
- **Skills**: Blade Storm, Chakra Blast, Spirit Bomb
- **Transformation**: Super Form

### Pure DPS Build
- **Weapon**: Dragon Slayer
- **Skills**: Dragon Fist, Lightning Strike, Fireball
- **Transformation**: Super Form

## End Game Builds (10M+ Stats)

### Meta Build
- **Weapon**: Divine Blade
- **Skills**: Final Flash, Meteor Crash, Divine Ray
- **Transformation**: God Form or Divine Form

This build maximizes both DPS and burst damage.

### Boss Killer Build
- **Weapon**: Divine Blade
- **Skills**: All ultimate skills
- **Transformation**: Divine Form

Save ultimates for burst windows.

## Use Our DPS Calculator

Don't guess your damage! Use our [DPS Calculator](/dps) to compare different builds and find the optimal setup for your stats.

## Tips for All Stages

1. **Match weapons to your highest stat** - Swords scale with Sword stat, Fists with Strength
2. **Don't neglect Chakra** - Many powerful skills have Chakra costs
3. **Upgrade transformations** - The damage multiplier is massive

## Tier Ranking Reference

Check our [Tier List](/tier-list) for complete rankings of all weapons, skills, and transformations.
`,

    'boost-stacking': `
## How Boosts Work in AFSE

Unlike some games where boosts add together, AFSE uses **multiplicative stacking**. This means boosts multiply each other, not add.

## The Formula

\`\`\`
Total Multiplier = Boost1 × Boost2 × Boost3 × ...
\`\`\`

### Example

- VIP (2x) + 2x Stats (2x) = 2 × 2 = **4x total** (not 3x!)
- VIP (2x) + 2x Stats (2x) + Weekend (1.5x) = 2 × 2 × 1.5 = **6x total**

## All Available Boosts

| Boost | Multiplier | How to Get |
|-------|------------|------------|
| VIP Gamepass | 2x | Robux purchase |
| 2x Stats | 2x | Robux purchase |
| 3x Stats | 3x | Robux purchase |
| Weekend Boost | 1.5x | Play on weekends |
| Server Boost | 1.25x | Boosted servers |
| Code Boost | 1.25x-3x | Redeem codes |
| Multi Stat | Variable | Gameplay |

## The Multi Cap

The Multi stat provides a bonus but is capped at **131,000** unless you have the **No Limit** gamepass.

- Without No Limit: Multi caps at 131K
- With No Limit: Multi has no cap

## Optimal Boost Combinations

### Free Player (No Robux)
- Weekend Boost + Code Boosts + Server Boost = ~2.3x

### Light Spender
- VIP + Weekend = 3x average (4x on weekends)

### Heavy Spender
- VIP + 2x Stats + 3x Stats + No Limit = 12x+ potential

## Common Mistakes

1. **Thinking boosts add** - They multiply!
2. **Ignoring Multi stat** - It's a free multiplier
3. **Playing on weekdays** - Weekend bonus is huge
4. **Missing code boosts** - Check codes regularly

## Conclusion

Stack as many boosts as possible. Even small boosts (1.25x) become significant when multiplied with others.

Use our [Training Optimizer](/) to see exactly how your boosts affect your gains!
`,

    'yen-farming': `
## Introduction

Yen is the main currency in AFSE. Here are the best ways to farm it efficiently.

## Method 1: Quest Farming

Complete daily and weekly quests for guaranteed Yen rewards.

### Best Quests
- Daily training quests
- Boss defeat quests
- Collection quests

## Method 2: Boss Farming

Defeat bosses for Yen drops. Higher-level bosses = more Yen.

### Tips
- Use our [Best Builds](/guides/best-builds) guide for optimal damage
- Farm in groups for faster kills

## Method 3: AFK Selling

Some items can be sold for Yen. AFK farm mobs that drop valuable items.

## Method 4: Trading

Buy low, sell high. Watch for underpriced items in the trading hub.

## Method 5: Codes

Check our [Codes Page](/codes) regularly. Many codes give free Yen!

## Quick Comparison

| Method | Yen/Hour | Effort |
|--------|----------|--------|
| Quests | Medium | Low |
| Boss Farming | High | High |
| AFK Selling | Low | None |
| Trading | Variable | Medium |
| Codes | Free | None |

## Conclusion

For most players, a combination of quests + boss farming + codes is the best approach. Use our tools to maximize your efficiency!
`
}

// 获取单个攻略
export function getGuide(slug: string): GuideContent | null {
    const guide = guides.find(g => g.slug === slug)
    if (!guide) return null

    return {
        ...guide,
        content: guideContents[slug] || ''
    }
}

// 获取所有攻略
export function getAllGuides(): Guide[] {
    return guides
}

// 获取分类攻略
export function getGuidesByCategory(category: Guide['category']): Guide[] {
    return guides.filter(g => g.category === category)
}

// 获取精选攻略
export function getFeaturedGuides(): Guide[] {
    return guides.filter(g => g.featured)
}
