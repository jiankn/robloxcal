-- ============================================
-- Wiki Entries for Plants Vs Brainrots (PVB)
-- 基础版本 - 4个核心页面
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 1. Wiki 主页
('pvb', 'guides', 'wiki',
'Plants Vs Brainrots Wiki - Complete Game Guide 2026',
'Wiki & Guide',
'Complete Plants Vs Brainrots wiki and guide for 2026. Master plant strategies, mutations, and brainrot farming for maximum profits.',
'# Plants Vs Brainrots Wiki - Complete Guide 2026

Welcome to the ultimate Plants Vs Brainrots Wiki! This guide covers everything from basic gameplay to advanced damage optimization.

## What is Plants Vs Brainrots?

Plants Vs Brainrots is a tower defense-style game on Roblox where players:
- Grow plants to defend against brainrots
- Earn money from defeated brainrots
- Collect rare plant mutations
- Upgrade your garden defenses
- Trade valuable plants with others

### Core Gameplay Loop
1. **Plant Seeds** - Choose defensive plants
2. **Defend** - Plants attack incoming brainrots
3. **Earn** - Defeated brainrots drop cash
4. **Upgrade** - Buy better seeds and mutations
5. **Repeat** - Scale your defenses

## Key Game Systems

### Plant Damage (DPS)
Plant damage is calculated by:
```
DPS = BaseDamage × AttackSpeed × Mutation × Bonuses
```
[DPS Calculator →](/plants-vs-brainrots/pvb-dps-calculator)

### Mutations
Mutations boost plant effectiveness:
- **Gold** - 1.5x damage
- **Diamond** - 2x damage  
- **Neon** - 2.5x damage
- **Frozen** - 3x damage + slow effect

### Plant Tiers
Plants are ranked by rarity and power:
| Tier | Examples |
|------|----------|
| Legendary | Winter Melon |
| Epic | Gatling Pea |
| Rare | Repeater, Torchwood |
| Uncommon | Snow Pea, Chomper |
| Common | Peashooter, Sunflower |

## Getting Started

### Day 1 Checklist
- [ ] Complete the tutorial
- [ ] Place first Peashooter
- [ ] Survive first wave
- [ ] Buy Sunflower for income
- [ ] Save for Snow Pea

### First Week Goals
1. Unlock Repeater
2. Get first Gold mutation
3. Complete 10 waves
4. Earn 50,000 cash

## Helpful Tools

- **[DPS Calculator](/plants-vs-brainrots/pvb-dps-calculator)** - Calculate plant damage
- **[Codes](/plants-vs-brainrots/codes)** - Free rewards
',
ARRAY['plants vs brainrots wiki', 'pvb guide', 'plants vs brainrots guide 2026', 'pvb mutations', 'plants vs brainrots dps'],
'{"word_count": 350, "reading_time_minutes": 2, "priority": "high"}',
true),

-- 2. 植物指南
('pvb', 'mechanics', 'plants-guide',
'Plants Vs Brainrots Plant Guide - All Plants Explained',
'Plant Guide',
'Complete guide to all plants in Plants Vs Brainrots. Learn stats, abilities, and best strategies for each plant type.',
'# Plants Vs Brainrots - Complete Plant Guide

This guide covers all plants in Plants Vs Brainrots, their stats, abilities, and optimal strategies.

## Common Plants

### Peashooter
| Stat | Value |
|------|-------|
| Base Damage | 20 |
| Attack Speed | 1.5/s |
| DPS | 30 |
| Cost | 100 |

**Strategy**: Great starter plant. Place in front rows for consistent damage.

### Sunflower
| Stat | Value |
|------|-------|
| Base Damage | 5 |
| Attack Speed | 2.0/s |
| Sun Production | 50/15s |

**Strategy**: Essential for economy. Place in back rows for protection.

### Wall-nut
| Stat | Value |
|------|-------|
| Health | 500 |
| Special | Blocks enemies |

**Strategy**: Use as frontline defense to protect damage dealers.

## Uncommon Plants

### Snow Pea
| Stat | Value |
|------|-------|
| Base Damage | 20 |
| Attack Speed | 1.5/s |
| Special | Slows enemies 50% |

**Strategy**: Excellent crowd control. Combine with high DPS plants.

### Chomper
| Stat | Value |
|------|-------|
| Base Damage | 150 |
| Attack Speed | 0.5/s (eating) |
| Special | Instant kill |

**Strategy**: Best against single tough enemies. Slow but powerful.

## Rare Plants

### Repeater
| Stat | Value |
|------|-------|
| Base Damage | 40 |
| Attack Speed | 1.5/s |
| DPS | 60 |

**Strategy**: Upgraded Peashooter. 2x the firepower.

### Torchwood
| Stat | Value |
|------|-------|
| Special | 2x damage to peas passing through |

**Strategy**: Place behind pea plants to double their damage.

## Epic & Legendary Plants

### Gatling Pea (Epic)
| Stat | Value |
|------|-------|
| Base Damage | 80 |
| Attack Speed | 1.5/s |
| DPS | 120 |

**Strategy**: Top DPS option. Combine with Torchwood for maximum damage.

### Winter Melon (Legendary)
| Stat | Value |
|------|-------|
| Base Damage | 100 |
| Attack Speed | 1.0/s |
| Special | AoE + Heavy Slow |

**Strategy**: Best overall plant. Hits multiple enemies with strong slow.

## Mutation Multipliers

| Mutation | Damage Boost |
|----------|-------------|
| Gold | 1.5x |
| Diamond | 2x |
| Neon | 2.5x |
| Frozen | 3x |

**Tip**: Prioritize mutations on high-DPS plants like Gatling Pea and Winter Melon.
',
ARRAY['plants vs brainrots plants', 'pvb plant guide', 'pvb peashooter', 'pvb winter melon', 'pvb gatling pea'],
'{"word_count": 400, "reading_time_minutes": 3, "priority": "high"}',
true),

-- 3. 变异系统
('pvb', 'mechanics', 'mutations',
'Plants Vs Brainrots Mutations Guide - How Mutations Work',
'Mutations Guide',
'Complete guide to mutations in Plants Vs Brainrots. Learn how to get mutations, mutation effects, and best mutation strategies.',
'# Plants Vs Brainrots - Mutations Guide

Mutations are special modifiers that significantly boost your plants'' effectiveness. This guide explains everything about the mutation system.

## What Are Mutations?

Mutations are rare plant variants that provide damage multipliers and special effects:

| Mutation | Multiplier | Visual Effect |
|----------|-----------|---------------|
| Normal | 1.0x | Standard |
| Gold | 1.5x | Golden glow |
| Diamond | 2.0x | Blue sparkles |
| Neon | 2.5x | Glowing outline |
| Frozen | 3.0x | Ice crystals + slow |

## How to Get Mutations

### Random Chance
Every seed has a chance to spawn mutated:
- Gold: 10% chance
- Diamond: 3% chance
- Neon: 1% chance
- Frozen: 0.5% chance

### Lucky Potions
Use Lucky Potions (from codes) to boost mutation chances temporarily.

### Rerolling
Some gamepasses allow rerolling plant mutations.

## Mutation Strategy

### Best Plants for Mutations
Prioritize mutations on:
1. **Gatling Pea** - Highest base DPS
2. **Winter Melon** - Best AoE
3. **Repeater** - Good balance

### Worst Plants for Mutations
Avoid mutations on:
- Wall-nut (no damage)
- Sunflower (economy, not DPS)
- Torchwood (support, not damage)

## Calculating Mutation Value

A Frozen Gatling Pea deals:
```
80 (base) × 1.5 (attack speed) × 3.0 (frozen) = 360 DPS
```

Compare to normal:
```
80 × 1.5 × 1.0 = 120 DPS
```

**3x improvement from one mutation!**

## Tips

1. Save Lucky Potions for expensive plants
2. Frozen mutation adds crowd control bonus
3. Trade mutated plants for profit
4. Check market prices before selling
',
ARRAY['plants vs brainrots mutations', 'pvb mutation guide', 'pvb frozen mutation', 'pvb gold mutation', 'how to get mutations pvb'],
'{"word_count": 320, "reading_time_minutes": 2, "priority": "high"}',
true),

-- 4. 新手攻略
('pvb', 'guides', 'beginners-guide',
'Plants Vs Brainrots Beginners Guide - How to Start',
'Beginners Guide',
'Complete beginners guide for Plants Vs Brainrots. Learn the basics, starter strategies, and how to progress efficiently.',
'# Plants Vs Brainrots - Beginners Guide 2026

New to Plants Vs Brainrots? This guide will help you start strong and progress efficiently.

## First 30 Minutes

### Tutorial
1. Follow the in-game tutorial
2. Place your first Peashooter
3. Defeat the tutorial wave
4. Collect your first cash

### First Purchases
| Priority | Item | Cost | Why |
|----------|------|------|-----|
| 1 | Sunflower | 50 | Income generation |
| 2 | Second Peashooter | 100 | More damage |
| 3 | Wall-nut | 75 | Frontline defense |

## Basic Strategy

### Formation
```
[BACK]     Sunflower  Sunflower
[MIDDLE]   Peashooter Peashooter
[FRONT]    Wall-nut   Wall-nut
```

### Wave Progression
- **Waves 1-5**: Basic brainrots, Peashooters enough
- **Waves 6-10**: Tougher enemies, need Wall-nuts
- **Waves 11-20**: Upgrade to Repeaters
- **Waves 21+**: Need Epic/Legendary plants

## Free Rewards

### Active Codes
Visit [Codes Page](/plants-vs-brainrots/codes) for:
- Cash bonuses
- Lucky Potions
- Exclusive items

### Daily Rewards
- Log in daily for streak bonuses
- Complete daily quests
- Claim wheel spins

## Progression Milestones

| Milestone | Goal |
|-----------|------|
| Day 1 | Complete 5 waves |
| Day 3 | Get first mutation |
| Week 1 | Unlock Repeater |
| Week 2 | Get Epic plant |
| Month 1 | Legendary plant |

## Common Mistakes

1. **Skipping Sunflowers** - Economy is essential
2. **No Wall-nuts** - Your plants need protection
3. **Spreading too thin** - Focus lanes
4. **Ignoring mutations** - They are huge multipliers

## Tips from Veterans

- "Save cash for mutation plants"
- "Torchwood + Gatling Pea = OP"
- "Join Discord for trading tips"
- "Use DPS calculator before buying"

## Next Steps

After mastering basics:
1. [Learn all plants →](/plants-vs-brainrots/wiki/mechanics/plants-guide)
2. [Understand mutations →](/plants-vs-brainrots/wiki/mechanics/mutations)
3. [Calculate your DPS →](/plants-vs-brainrots/pvb-dps-calculator)
',
ARRAY['plants vs brainrots beginners guide', 'pvb how to start', 'pvb tutorial', 'plants vs brainrots tips', 'pvb new player guide'],
'{"word_count": 380, "reading_time_minutes": 3, "priority": "high"}',
true)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    display_name = EXCLUDED.display_name,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    is_published = EXCLUDED.is_published,
    updated_at = NOW();
