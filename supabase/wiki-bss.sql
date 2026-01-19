-- ============================================
-- Wiki Entries for Bee Swarm Simulator (BSS)
-- 扩充版本 - 8个页面
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 1. Wiki 主页
('bss', 'guides', 'wiki',
'Bee Swarm Simulator Wiki - Complete Game Guide 2026',
'Wiki & Guide',
'Complete Bee Swarm Simulator wiki and guide for 2026. Master honey mechanics, pollen conversion, bee types, and field strategies.',
'# Bee Swarm Simulator Wiki - Complete Guide 2026

Welcome to the ultimate Bee Swarm Simulator Wiki! This comprehensive guide covers everything from basic honey production to end-game optimization.

## What is Bee Swarm Simulator?

Bee Swarm Simulator is a beloved Roblox game where players build and manage a hive of bees to produce honey. Its a deep progression game with complex systems.

### Core Gameplay
1. **Collect Bees** - Hatch and collect different bee types
2. **Farm Pollen** - Gather pollen from various fields
3. **Convert to Honey** - Your bees convert pollen at the hive
4. **Upgrade Everything** - Better bees, bags, and gear
5. **Complete Quests** - Progress through game content

## Key Game Systems

### Honey System
Honey is the primary currency, created by converting pollen:
```
Honey = Pollen × Convert Rate × Bonuses
```
[Honey Explained →](/bee-swarm-simulator/wiki/mechanics/honey-explained)

### Convert Rate
How fast your bees turn pollen into honey:
- Base rate from bee count
- Boosted by upgrades and items
[Convert Rate Guide →](/bee-swarm-simulator/wiki/mechanics/convert-rate)

### Honey Per Pollen
How much honey you get from each pollen:
- Affected by badges, passes, bonuses
- Can multiply total output significantly
[Honey Per Pollen Guide →](/bee-swarm-simulator/wiki/mechanics/honey-per-pollen)

## Calculators and Tools

- **[Honey Calculator](/bee-swarm-simulator/bss-honey-calculator)** - Estimate production
- **[Pollen to Honey Converter](/bee-swarm-simulator/bss-pollen-to-honey)** - Convert values
- **[Honey Per Pollen Rate](/bee-swarm-simulator/bss-honey-per-pollen)** - Analyze efficiency

## Getting Started

### Day 1 Checklist
- [ ] Complete the tutorial
- [ ] Get 5 starting bees
- [ ] Farm Sunflower Field
- [ ] Buy your first bag upgrade
- [ ] Learn conversion basics

### First Week Goals
1. Expand to 10+ bees
2. Unlock Spider Field
3. Complete Black Bear quests
4. Get first badges
5. Upgrade your bag

## Bee Types Overview

| Type | Color | Specialty |
|------|-------|-----------|
| Colorless | White | Balanced |
| Red | Red | Attack/Pollen |
| Blue | Blue | Speed/Pollen |
| Colorized | Mixed | Special abilities |
| Mythic | Gold | Extremely powerful |
| Event | Various | Limited time |

## Field System

Fields are where you farm pollen:

| Field Category | Examples | Best For |
|----------------|----------|----------|
| Starter | Sunflower, Dandelion | Beginners |
| Mid | Spider, Strawberry | Growing hives |
| Advanced | Pineapple, Cactus | Established players |
| End Game | Pepper, Coconut | Veterans |

[Complete Fields Guide →](/bee-swarm-simulator/wiki/mechanics/fields-guide)

## Quick Tips

- Bigger bag = longer farming sessions
- More bees = faster conversion
- Badges provide permanent bonuses
- Events are huge for progression
- Community is helpful and active

---

*This wiki is updated regularly. Last updated: January 2026*',
ARRAY['bee swarm simulator wiki', 'bee swarm simulator guide', 'bss wiki 2026'],
'{"type": "guide", "priority": "high", "word_count": 550}'::jsonb,
true),

-- 2. Honey Explained
('bss', 'mechanics', 'honey-explained',
'Bee Swarm Honey Explained - Complete Honey Guide 2026',
'Honey Explained',
'Complete guide to honey mechanics in Bee Swarm Simulator. Learn production, conversion, and optimization strategies.',
'# Bee Swarm Honey Explained - Complete Guide 2026

Honey is the lifeblood of Bee Swarm Simulator. Understanding honey production is essential for progression.

## What is Honey?

Honey is the main currency used to:
- Buy new bees
- Upgrade bags and tools
- Purchase items
- Complete certain quests
- Unlock areas

## How Honey is Created

The conversion process:
1. Bees collect pollen from fields
2. You return to hive with full bag
3. Bees convert pollen to honey
4. Honey appears in your balance

## Honey Formula

```
Honey Output = Pollen × Honey Per Pollen × Bonuses
```

### Component Breakdown

| Component | Effect | Sources |
|-----------|--------|---------|
| Base Pollen | Starting amount | Bag capacity |
| Honey/Pollen | Conversion rate | Badges, passes |
| Instant Convert | Skip timer | Bee abilities |
| Multipliers | Stack bonuses | Everything |

## Honey Sources

### Primary: Pollen Conversion
- Collect pollen → Convert at hive
- Main source of income
- Affected by all multipliers

### Secondary: Tokens
- Honey tokens in fields
- Quest rewards
- Event bonuses

### Tertiary: Instant Convert
- Certain bees convert instantly
- Science Enhancement
- Sprinklers

## Honey Per Hour Goals

| Stage | Bees | Target/Hour |
|-------|------|-------------|
| Early | 10 | 10K |
| Mid | 25 | 1M |
| Late | 40 | 100M |
| End | 50 | 10B+ |

## Maximizing Production

Priority order:
1. More bees (more converters)
2. Better bags (more capacity)
3. Higher badges (permanent bonus)
4. Hive bonuses (multipliers)
5. Boosts (temporary power)

---

*Master honey production for faster progression!*',
ARRAY['bee swarm honey explained', 'bee swarm honey production', 'bee swarm honey per hour'],
'{"type": "mechanic", "word_count": 350}'::jsonb,
true),

-- 3. Convert Rate
('bss', 'mechanics', 'convert-rate',
'Bee Swarm Convert Rate - Complete Guide 2026',
'Convert Rate',
'Complete convert rate guide for Bee Swarm Simulator. How conversion works and how to maximize it.',
'# Bee Swarm Convert Rate Guide 2026

Convert rate determines how fast your bees process pollen into honey.

## What is Convert Rate?

Convert rate = Pollen processed per second by all bees combined.

Higher rate means:
- Faster pollen → honey
- Less waiting at hive
- More farming time

## Base Convert Rates

Each bee has a base rate:

| Bee Rarity | Rate/Second |
|------------|-------------|
| Basic | 10 |
| Rare | 20 |
| Epic | 40 |
| Legendary | 80 |
| Mythic | 150 |

## Total Rate Calculation

```
Total Rate = Sum(All Bee Rates) × Hive Bonus × Amulets × Upgrades
```

### Example:
- 10 Basic bees (100/s base)
- 1.5x Hive Bonus
- 1.2x Amulet

**Total: 100 × 1.5 × 1.2 = 180 pollen/second**

## How Rates Stack

Multiple sources multiply:
- Bee rates: Additive
- Bonuses: Multiplicative

More bees = linear growth
Better bonuses = exponential growth

## Improving Convert Rate

### Get More Bees
Every bee adds to total rate. More bees = faster conversion.

### Upgrade Bee Quality
Higher rarity bees have better rates. Evolve when possible.

### Hive Bonuses
- Hive slot amulets
- Gifted bee bonuses
- Hive skin bonuses

### Instant Conversion
Some abilities skip the convert timer entirely:
- Honey Gift ability
- Science Bear upgrades
- Special items

## Convert Rate vs Bag Size

| Bag Size | Rate Needed | Reason |
|----------|-------------|--------|
| 500 | 100/s | 5 sec convert |
| 2,500 | 250/s | 10 sec convert |
| 10,000 | 500/s | 20 sec convert |
| 50,000+ | 1,000+/s | Big bags need rate |

---

*Fast conversion = more time farming!*',
ARRAY['bee swarm convert rate', 'bee swarm convert rate formula', 'how convert rate stacks bee swarm', 'bee swarm instant conversion'],
'{"type": "mechanic", "word_count": 350}'::jsonb,
true),

-- 4. Honey Per Pollen
('bss', 'mechanics', 'honey-per-pollen',
'Bee Swarm Honey Per Pollen - Conversion Guide 2026',
'Honey Per Pollen',
'Complete honey per pollen guide. Understand the pollen to honey conversion in Bee Swarm Simulator.',
'# Bee Swarm Honey Per Pollen Guide 2026

Honey per pollen (HPP) determines how much honey you get from each pollen collected.

## Default Rate

By default: 1 Pollen = 1 Honey

But bonuses can significantly increase this ratio!

## Bonus Sources

### Permanent Bonuses

| Source | Bonus | How to Get |
|--------|-------|------------|
| Badges | +1-100% | Complete quests |
| Science Bear | +50% | Science purchases |
| Coconut Crab | +25% | Boss defeat |
| Gummy Bear | +25% | Gummy quest |

### Temporary Boosts

| Source | Bonus | Duration |
|--------|-------|----------|
| Micro-Converters | +1.25x | Per use |
| Cloud Vials | +15% | 30 min |
| Stingers | +10%/stack | Variable |
| Super Smoothies | Varies | Varies |

### Multiplicative Sources

| Source | Effect |
|--------|--------|
| Market Boost | Field specific |
| Gifted Hive | Based on gifted count |
| Event Bonuses | Temporary but huge |

## Calculating Total HPP

```
Final HPP = 1 × (1 + Badges) × (1 + Science) × FieldBonus × Boosts
```

### Example:
- Badges: 50%
- Science: 50%
- Field Bonus: 1.2x
- Micro: 1.25x

**HPP: 1 × 1.5 × 1.5 × 1.2 × 1.25 = 3.375**

Every pollen becomes 3.375 honey!

## Late Game HPP

End-game players achieve:
- 5-10 base HPP
- During boosts: 20-50 HPP
- During events: 100+ HPP

## Maximizing HPP

1. Complete all badge quests
2. Buy Science Bear upgrades
3. Defeat bosses for perma-boosts
4. Stack temporary boosts smartly
5. Play during events

---

*Better ratios = exponentially more honey!*',
ARRAY['bee swarm honey per pollen', 'pollen to honey conversion rate bee swarm', 'bee swarm honey per pollen explained', 'bee swarm pollen to honey'],
'{"type": "mechanic", "word_count": 350}'::jsonb,
true),

-- 5. Fields Guide
('bss', 'mechanics', 'fields-guide',
'Bee Swarm Fields Guide - Best Fields for Honey 2026',
'Fields Guide',
'Complete fields guide for Bee Swarm Simulator. Best fields for each stage of progression.',
'# Bee Swarm Fields Guide 2026

Fields are where you collect pollen. Choosing the right field is crucial for efficient farming.

## Field Overview

| Field | Pollen Type | Best For |
|-------|-------------|----------|
| Sunflower | Mixed | Beginners |
| Dandelion | Mixed | Beginners |
| Mushroom | Mixed | Beginners |
| Blue Flower | Blue | Blue hives |
| Clover | Mixed | All-around |
| Spider | Mixed | Grinding |
| Strawberry | Red | Red hives |
| Bamboo | Blue | Blue hives |
| Pineapple | Mixed | Mid-game |
| Stump | Mixed | Advanced |
| Cactus | Mixed | Advanced |
| Pumpkin | Mixed | Mid-late |
| Pine Tree | Blue | Blue hives |
| Rose | Red | Red hives |
| Mountain Top | Mixed | End-game |
| Coconut | Mixed | End-game |
| Pepper | Red | End-game |

## Best Fields by Stage

### Early Game (10 bees)
1. Sunflower - Easy start
2. Clover - Good balance
3. Spider - First grind spot

### Mid Game (25 bees)
1. Pineapple - Solid pollen
2. Cactus - Good rates
3. Stump - If unlocked

### Late Game (40+ bees)
1. Pepper - Red specialists
2. Coconut - Everyone
3. Mountain Top - Mixed

## Field Bonuses

Each field has unique bonuses:
- Some fields favor red/blue bees
- Market boost increases field pollen
- Sprinklers activate field buffs
- Field planters provide constant bonuses

## Best Practices

1. Match field to hive color
2. Use boosts in end-game fields
3. Collect all tokens in field
4. Activate sprinklers when ready
5. Farm badges in appropriate fields

---

*Choose your fields wisely for maximum pollen!*',
ARRAY['bee swarm fields guide', 'best field for honey bee swarm', 'field bonus bee swarm'],
'{"type": "guide", "word_count": 350}'::jsonb,
true),

-- 6. Bags Comparison
('bss', 'mechanics', 'bags-comparison',
'Bee Swarm Bags Comparison - Best Bag Guide 2026',
'Bags Comparison',
'Compare all bags in Bee Swarm Simulator. Find the best bag for your progression stage.',
'# Bee Swarm Bags Comparison 2026

Bags determine your pollen capacity. Bigger bag = longer farming sessions.

## All Bags Ranked

| Bag | Capacity | Cost | Best For |
|-----|----------|------|----------|
| Free Bag | 100 | Free | Tutorial |
| Jar | 200 | 500 | Very early |
| Pouch | 750 | 15K | Early |
| Jar Lid | 1,500 | 75K | Early-Mid |
| Backpack | 3,000 | 400K | Mid |
| Canister | 10,000 | 3.5M | Mid-Late |
| Ace Backpack | 25,000 | 35M | Late |
| Mondo Belt | 50,000 | 250M | Late |
| Coconut Canister | 100,000 | 2.5B | End Game |

## Bag Upgrade Priority

### When to Upgrade
- When you wait more than 30s at hive
- When you can afford next tier
- Before big farming sessions

### Investment Worth It?
Every bag upgrade pays off quickly. Your capacity directly affects honey/hour.

## Bags vs Canisters

| Type | Pros | Cons |
|------|------|------|
| Bags | Affordable | Lower capacity |
| Canisters | Massive capacity | Very expensive |

## Breakeven Analysis

| Upgrade | Cost | Breakeven |
|---------|------|-----------|
| Pouch→Backpack | 400K | ~2 hours |
| Canister→Ace | 35M | ~10 hours |
| Mondo→Coconut | 2.5B | ~50 hours |

## Best Value Bags

1. **Backpack** - Sweet spot for cost/capacity
2. **Canister** - Significant jump
3. **Coconut Canister** - End game goal

---

*Bigger bags = more efficient farming!*',
ARRAY['bee swarm bags comparison', 'bee swarm canisters comparison', 'best bag for early game bee swarm', 'best bag for midgame bee swarm'],
'{"type": "guide", "word_count": 300}'::jsonb,
true),

-- 7. Boosts and Buffs
('bss', 'mechanics', 'boosts-buffs',
'Bee Swarm Boosts and Buffs - Complete Guide 2026',
'Boosts & Buffs',
'Complete boosts and buffs guide for Bee Swarm Simulator. All temporary power-ups explained.',
'# Bee Swarm Boosts and Buffs Guide 2026

Boosts are temporary power-ups that massively increase production.

## Boost Types

### Pollen Boosts
| Boost | Effect | Source |
|-------|--------|--------|
| Field Boost | +50-100% field pollen | Items |
| Oil | +100% smooth pollen | Crafting |
| Tropical Drink | +25% all pollen | Shop |

### Honey Boosts
| Boost | Effect | Source |
|-------|--------|--------|
| Honey Boost | +100% honey | Items |
| Enzymes | +10% conversion | Crafting |
| Gumdrops | +15% honey | Drops |

### Ability Boosts
| Boost | Effect | Source |
|-------|--------|--------|
| Stingers | +10%/stack | Combat |
| Super Smoothies | Various | Crafting |
| Glitter | Field effects | Items |

## Boost Stacking Rules

**Same type: DO NOT STACK**
- Two Field Boosts = wasted

**Different types: MULTIPLY**
- Field Boost × Honey Boost = combined effect

## Optimal Boost Usage

1. Save boosts for end-game fields
2. Stack different boost types
3. Use during events for max value
4. Coordinate with guild members

## Best Boost Combos

### Maximum Output
- Field Boost + Honey Boost + Oil + Enzymes + Smoothie

### Budget Combo
- Tropical Drink + Stingers

### Event Farming
- All boosts + event multiplier

---

*Boost smart for maximum gains!*',
ARRAY['bee swarm boosts and buffs', 'boosts that increase honey bee swarm', 'bee swarm boost guide'],
'{"type": "mechanic", "word_count": 300}'::jsonb,
true),

-- 8. Beginner Roadmap
('bss', 'strategy', 'beginner-roadmap',
'Bee Swarm Beginner Roadmap - New Player Guide 2026',
'Beginner Roadmap',
'Essential beginner roadmap for Bee Swarm Simulator. New player progression guide.',
'# Bee Swarm Beginner Roadmap 2026

New to Bee Swarm Simulator? Follow this roadmap for optimal progression!

## Week 1: Getting Started

### Day 1-2
- Complete tutorial
- Get 5 bees from Basic Eggs
- Farm Sunflower Field
- Buy Jar upgrade

### Day 3-4
- Expand to 10 bees
- Unlock Clover Field
- Start Black Bear quests
- Upgrade to Pouch

### Day 5-7
- Reach 15 bees
- Unlock Spider Field
- First badge completion
- Consider Backpack

## Week 2-4: Growth Phase

### Goals
- 20-25 bees
- Complete Mother Bear quests
- Unlock mid-game fields
- First gifted bee

### Priorities
1. More hive slots
2. Better bags
3. Quest completion
4. Badge grinding

## Common Mistakes

1. **Buying random eggs** - Save for good ones
2. **Ignoring quests** - Huge rewards
3. **Skipping boosts** - Free value
4. **Selling rare bees** - Never do this

## Priority Order

1. Bag upgrades
2. Hive slot upgrades
3. Better bee quality
4. Tools and gear

## Quick Tips

- Farm whatever you can at first
- Complete ALL quests
- Dont waste boosts early
- Join events immediately
- Use the calculator tools

---

*Everyone starts with 5 bees. Follow the roadmap!*',
ARRAY['beginner roadmap bee swarm', 'midgame roadmap bee swarm', 'bee swarm new player guide'],
'{"type": "strategy", "word_count": 300}'::jsonb,
true)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    display_name = EXCLUDED.display_name,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();

-- 验证插入
SELECT game_key, COUNT(*) as pages FROM wiki_entries WHERE game_key = 'bss' GROUP BY game_key;
