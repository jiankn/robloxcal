-- ============================================
-- Wiki Entries for The Forge
-- 基础版本 - 4个核心页面
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 1. Wiki 主页
('forge', 'guides', 'wiki',
'The Forge Wiki - Complete Crafting Guide 2026',
'Wiki & Guide',
'Complete The Forge wiki and guide for 2026. Master ore mining, weapon forging, and equipment optimization.',
'# The Forge Wiki - Complete Guide 2026

Welcome to The Forge Wiki! This guide covers everything from basic mining to advanced forging strategies.

## What is The Forge?

The Forge is a crafting and combat game on Roblox where players:
- Mine various ores in different locations
- Forge weapons and armor
- Battle enemies with crafted equipment
- Collect rare traits and passives
- Trade valuable equipment

### Core Gameplay Loop
1. **Mine** - Gather ores from caves and islands
2. **Forge** - Combine ores into equipment
3. **Battle** - Use equipment against enemies
4. **Upgrade** - Better ores = better gear
5. **Explore** - Unlock new mining areas

## Key Game Systems

### Ore Tiers
| Tier | Ore | Base Multiplier |
|------|-----|-----------------|
| 1 | Copper | 1.0x |
| 2 | Iron | 1.5x |
| 3 | Gold | 2.0x |
| 4 | Diamond | 3.0x |
| 5 | Emerald | 4.0x |
| 6 | Ruby | 5.0x |
| 7 | Obsidian | 7.0x |
| 8 | Mythril | 10.0x |

### Equipment Classes
Equipment quality is determined by ore value:
- **Common** - 0+ value
- **Uncommon** - 50+ value
- **Rare** - 150+ value
- **Epic** - 400+ value
- **Legendary** - 800+ value
- **Mythic** - 1500+ value

[Forge Calculator →](/the-forge/forge-calculator)

### Traits System
Equipment can roll special traits:
- Sharp (+15% DMG)
- Sturdy (+20% DEF)
- Swift (+10% SPD)
- Vampiric (5% Lifesteal)
- Legendary (+50% All)

## Getting Started

### Day 1 Checklist
- [ ] Complete tutorial mine
- [ ] Forge first Copper Sword
- [ ] Defeat starting enemies
- [ ] Collect 10 Iron ore
- [ ] Forge Iron equipment

## Helpful Tools

- **[Forge Calculator](/the-forge/forge-calculator)** - Predict equipment stats
- **[Codes](/the-forge/codes)** - Free rerolls and totems
',
ARRAY['the forge wiki', 'the forge guide', 'the forge roblox', 'how to forge weapons', 'the forge ore guide'],
'{"word_count": 320, "reading_time_minutes": 2, "priority": "high"}',
true),

-- 2. 矿石指南
('forge', 'mechanics', 'ores-guide',
'The Forge Ore Guide - All Ores and Mining Locations',
'Ores Guide',
'Complete guide to all ores in The Forge. Learn ore stats, mining locations, and best farming strategies.',
'# The Forge - Complete Ore Guide

This guide covers all ores, their properties, and optimal farming locations.

## Ore Tier List

### Tier 1-3: Starter Ores

| Ore | Multiplier | Location | Notes |
|-----|-----------|----------|-------|
| Copper | 1.0x | Starter Cave | Tutorial ore |
| Iron | 1.5x | Starter Cave | Common |
| Gold | 2.0x | Forest Mine | First upgrade |

### Tier 4-5: Mid-Game Ores

| Ore | Multiplier | Location | Notes |
|-----|-----------|----------|-------|
| Diamond | 3.0x | Crystal Caverns | Unlock at Level 10 |
| Emerald | 4.0x | Jungle Mines | Unlock at Level 20 |

### Tier 6-8: End-Game Ores

| Ore | Multiplier | Location | Notes |
|-----|-----------|----------|-------|
| Ruby | 5.0x | Volcano | Unlock at Level 35 |
| Obsidian | 7.0x | Nether | Unlock at Level 50 |
| Mythril | 10.0x | Pirate Island | Endgame |

## Mining Tips

### Efficiency
1. Use pickaxe upgrades
2. Stack speed boosts
3. Focus one ore type
4. Sell excess lower ores

### Farming Routes
**Starter Route**: 
Copper → Iron → Gold (repeat)

**Mid Route**: 
Diamond → Emerald (Crystal Caverns + Jungle)

**End Route**: 
Ruby → Obsidian → Mythril (Volcano → Nether → Pirate)

## Ore Value Calculation

Total forge value:
```
Value = OreCount × BaseMultiplier × Tier × 2
```

Example (20 Mythril):
```
20 × 10.0 × 8 × 2 = 3200 value → Mythic gear!
```
',
ARRAY['the forge ores', 'the forge mining', 'the forge mythril', 'best ore the forge', 'the forge locations'],
'{"word_count": 280, "reading_time_minutes": 2, "priority": "high"}',
true),

-- 3. 锻造指南
('forge', 'mechanics', 'forging-guide',
'The Forge Forging Guide - How to Craft Best Equipment',
'Forging Guide',
'Complete forging guide for The Forge. Learn how to create the best weapons and armor with optimal stats.',
'# The Forge - Complete Forging Guide

Master the art of forging to create the most powerful equipment.

## Forging Basics

### Step 1: Collect Ores
The more ores and higher tier = better equipment.

### Step 2: Choose Type
- **Weapon** - Higher damage output
- **Armor** - Higher defense

### Step 3: Forge!
Results depend on:
- Total ore value
- Random trait rolls
- Luck bonuses

## Equipment Stats

### Weapons
| Stat | Calculation |
|------|-------------|
| Damage | Value × 0.8 |
| Durability | Value × 0.5 + (Tier × 10) |

### Armor
| Stat | Calculation |
|------|-------------|
| Defense | Value × 0.9 |
| Durability | Value × 0.5 + (Tier × 10) |

## Trait System

### Common Traits (20% each)
- **Sharp** - +15% Damage
- **Sturdy** - +20% Defense

### Rare Traits (10-15%)
- **Swift** - +10% Attack Speed
- **Vampiric** - 5% Lifesteal

### Legendary Trait (2%)
- **Legendary** - +50% All Stats

### Trait Count
Higher tier ores = more traits:
- Tier 1-2: 1 trait
- Tier 3-4: 1-2 traits
- Tier 5-6: 2-3 traits
- Tier 7-8: 3-4 traits

## Optimization Tips

1. **Save high ores** - Don''t waste Mythril on low value crafts
2. **Reroll traits** - Use reroll items from codes
3. **Batch forge** - More ores = higher class
4. **Check calculator** - Plan before forging

## Best Builds

### DPS Build
- Mythril Sword (Sharp + Swift)
- Any armor with Vampire for sustain

### Tank Build
- Diamond Armor (Sturdy + Legendary)
- Any weapon for damage

[Use Forge Calculator →](/the-forge/forge-calculator)
',
ARRAY['the forge forging guide', 'how to forge the forge', 'the forge best weapon', 'the forge traits', 'the forge crafting'],
'{"word_count": 320, "reading_time_minutes": 2, "priority": "high"}',
true),

-- 4. 新手攻略
('forge', 'guides', 'beginners-guide',
'The Forge Beginners Guide - How to Start',
'Beginners Guide',
'Complete beginners guide for The Forge. Learn the basics and progress efficiently from tutorial to endgame.',
'# The Forge - Beginners Guide 2026

New to The Forge? This guide helps you start strong.

## First Hour

### Tutorial
1. Mine 5 Copper ore
2. Talk to the Blacksmith
3. Forge your first sword
4. Defeat training dummy
5. Claim tutorial rewards

### Equipment Priority
| Order | Item | Why |
|-------|------|-----|
| 1 | Copper Sword | Need damage |
| 2 | Copper Armor | Need defense |
| 3 | Iron Pickaxe | Faster mining |

## Progression Path

### Level 1-10 (Starter)
- Focus: Copper → Iron → Gold
- Goal: Gold equipment set
- Location: Starter Cave, Forest Mine

### Level 10-25 (Mid)
- Focus: Diamond → Emerald
- Goal: Epic equipment
- Location: Crystal Caverns, Jungle

### Level 25-50 (Late)
- Focus: Ruby → Obsidian
- Goal: Legendary equipment
- Location: Volcano, Nether

### Level 50+ (Endgame)
- Focus: Mythril
- Goal: Mythic equipment with perfect traits
- Location: Pirate Island

## Resource Management

### Keep
- All ores Tier 4+
- Reroll tokens
- Speed boosts

### Sell
- Excess Copper/Iron
- Low-stat equipment
- Duplicate tools

## Common Mistakes

1. **Forging too early** - Save ores for big batches
2. **Wrong pickaxe** - Always upgrade mining
3. **Ignoring traits** - They matter a lot
4. **Skipping codes** - Free rerolls are valuable

## Daily Checklist

- [ ] Claim daily rewards
- [ ] Complete daily quest
- [ ] Farm highest unlocked ore
- [ ] Check market for deals
- [ ] Forge if you have enough ores

## Quick Tips

- Join Discord for update news
- Use Forge Calculator before crafting
- Mythril is worth saving for
- Legendary trait is game-changing

[Start Calculating →](/the-forge/forge-calculator)
',
ARRAY['the forge beginners guide', 'the forge how to start', 'the forge tutorial', 'the forge tips', 'the forge new player'],
'{"word_count": 340, "reading_time_minutes": 2, "priority": "high"}',
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
