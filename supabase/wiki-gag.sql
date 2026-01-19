-- ============================================
-- Wiki Entries for Grow a Garden (GAG)
-- 扩充版本 - 8个页面
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 1. Wiki 主页
('gag', 'guides', 'wiki',
'Grow a Garden Wiki - Complete Game Guide 2026',
'Wiki & Guide',
'Complete Grow a Garden wiki and guide for 2026. Master crop values, mutations, pets, and trading strategies to become the ultimate gardener.',
'# Grow a Garden Wiki - Complete Guide 2026

Welcome to the ultimate Grow a Garden Wiki! This comprehensive guide covers everything from basic planting to advanced mutation farming.

## What is Grow a Garden?

Grow a Garden is a farming simulation game on Roblox where players:
- Plant and harvest crops for profit
- Hunt for valuable mutations
- Raise pets that help farming
- Trade with other players
- Build the perfect garden

### Core Gameplay
1. **Plant Seeds** - Choose what to grow
2. **Water & Wait** - Crops need time
3. **Harvest** - Collect your produce
4. **Sell** - Base value + mutations
5. **Reinvest** - Better seeds, pets, gear

## Key Game Systems

### Crop Value System
Crop value is calculated by:
```
Value = BaseValue × Weight × Mutation × FriendBoost
```
[Crop Values Guide →](/grow-a-garden/wiki/crops/crop-values)

### Mutations
Rare modifiers that multiply crop value:
- Common mutations: 1.25x - 1.5x
- Rare mutations: 2x - 3x
- Legendary: 5x - 10x
[Mutations Guide →](/grow-a-garden/wiki/mechanics/mutations-explained)

### Friend Boost
Playing with friends provides bonuses:
- More friends = higher multiplier
- Up to 100% bonus with 5+ friends
[Friend Boost Guide →](/grow-a-garden/wiki/mechanics/friend-boost)

### Pet System
Pets assist your farming:
- Speed abilities
- Luck bonuses
- Special effects
[Pets Guide →](/grow-a-garden/wiki/pets/pets-guide)

## Calculators and Tools

- **[Crop Value Calculator](/grow-a-garden/gag-crop-value-calculator)** - Calculate exact values
- **[Pet Weight Calculator](/grow-a-garden/gag-pet-weight-calculator)** - Pet stat planning
- **[Pet XP Calculator](/grow-a-garden/gag-pet-xp-calculator)** - Level progression

## Getting Started

### Day 1 Checklist
- [ ] Complete the tutorial
- [ ] Plant starter seeds
- [ ] First harvest
- [ ] Sell crops
- [ ] Buy better seeds

### First Week Goals
1. Unlock Carrots
2. Get first mutation
3. Hatch first pet
4. Find trading partner
5. Make 10,000 coins

## Crop Tiers

| Tier | Examples | Value Range |
|------|----------|-------------|
| Basic | Wheat, Carrot | 10-50 |
| Advanced | Tomato, Corn | 50-200 |
| Rare | Moonflower, Starfruit | 200-1,000 |
| Epic | Crystal Rose | 1,000-5,000 |
| Legendary | Rainbow Melon | 5,000-50,000 |

## Tips from Veterans

> "Mutations are everything. A mutated basic crop beats a normal rare crop."

> "Friend boost is free multiplier. Always try to play with friends."

> "Pets level slowly but the bonuses are huge. Start leveling early."

---

*This wiki is updated regularly. Last updated: January 2026*',
ARRAY['grow a garden wiki', 'grow a garden guide', 'gag wiki 2026'],
'{"type": "guide", "priority": "high", "word_count": 500}'::jsonb,
true),

-- 2. Crop Values
('gag', 'crops', 'crop-values',
'Grow a Garden Crop Values - Complete Price Guide 2026',
'Crop Values',
'Complete crop values guide for Grow a Garden. All crops ranked by value and profit.',
'# Grow a Garden Crop Values Guide 2026

Understanding crop values is essential for maximizing profits.

## Value Formula

```
Final Value = Base Value × Weight × Mutation × FriendBoost
```

## All Crops

### Basic Crops (Starter)

| Crop | Base Value | Grow Time | Profit/Hour |
|------|------------|-----------|-------------|
| Wheat | 10 | 1 min | 600 |
| Carrot | 25 | 2 min | 750 |
| Potato | 40 | 3 min | 800 |
| Lettuce | 30 | 2.5 min | 720 |

### Advanced Crops

| Crop | Base Value | Grow Time | Profit/Hour |
|------|------------|-----------|-------------|
| Tomato | 60 | 5 min | 720 |
| Corn | 80 | 6 min | 800 |
| Pepper | 100 | 8 min | 750 |
| Pumpkin | 150 | 10 min | 900 |

### Rare Crops

| Crop | Base Value | Grow Time | Profit/Hour |
|------|------------|-----------|-------------|
| Moonflower | 250 | 10 min | 1,500 |
| Starfruit | 500 | 15 min | 2,000 |
| Crystalbell | 750 | 20 min | 2,250 |
| Dragon Melon | 1,000 | 30 min | 2,000 |

### Legendary Crops

| Crop | Base Value | Grow Time | Profit/Hour |
|------|------------|-----------|-------------|
| Rainbow Melon | 5,000 | 1 hr | 5,000 |
| Golden Pumpkin | 10,000 | 2 hr | 5,000 |
| Cosmic Flower | 25,000 | 4 hr | 6,250 |
| Void Blossom | 50,000 | 6 hr | 8,333 |

## Best Crops by Strategy

### Speed Farming
Best for quick coins:
1. Carrot (fast cycles)
2. Potato (good value/time)
3. Tomato (balanced)

### AFK Farming  
Best for long sessions:
1. Rainbow Melon
2. Golden Pumpkin
3. Cosmic Flower

### Mutation Hunting
Best for rare mutations:
1. Moonflower (high rate)
2. Starfruit (good value)
3. Dragon Melon (best balance)

## Weight Matters

Heavier crops = more value:

| Weight | Multiplier |
|--------|------------|
| 0-1 kg | 0.5x |
| 1-3 kg | 1x |
| 3-5 kg | 1.5x |
| 5-10 kg | 2x |
| 10+ kg | 3x |

---

*Choose your crops wisely for maximum profit!*',
ARRAY['grow a garden crop values', 'grow a garden plant value formula', 'grow a garden plant value calculator'],
'{"type": "guide", "word_count": 450}'::jsonb,
true),

-- 3. Mutations Explained
('gag', 'mechanics', 'mutations-explained',
'Grow a Garden Mutations Explained - Complete Guide 2026',
'Mutations Explained',
'Complete mutations guide for Grow a Garden. How to get mutations and maximize their value.',
'# Grow a Garden Mutations Explained 2026

Mutations dramatically increase crop value. Understanding them is key to big profits.

## What Are Mutations?

Mutations are rare modifiers that appear on crops, multiplying their sell value.

## Mutation Tiers

| Tier | Multiplier | Chance |
|------|------------|--------|
| Shiny | 1.5x | 10% |
| Giant | 2x | 5% |
| Golden | 3x | 1% |
| Rainbow | 5x | 0.5% |
| Cosmic | 10x | 0.1% |

## How to Get Mutations

### Natural Occurrence
- Random chance on harvest
- Some crops have higher rates
- Event periods boost rates

### Pet Abilities
- Lucky pets increase mutation chance
- Certain pets guarantee mutations

### Friend Boost
- More friends = higher mutation chance
- 5+ friends adds +25% mutation rate

### Seeds
- Mutation seeds exist
- Event exclusive generally
- Trade for them

## Mutation Stacking

Crops can have up to 2 mutations:
- Giant (2x) + Golden (3x) = 6x value!
- Mutations multiply together

## Best for Mutation Hunting

| Crop | Base Rate | Notes |
|------|-----------|-------|
| Moonflower | 15% | Highest base |
| Starfruit | 12% | Good balance |
| Dragon Melon | 10% | Best value |

## Frequently Asked Questions

### Q: Are mutations permanent?
A: Once harvested, yes. The crop keeps its mutation.

### Q: Can I trade mutated crops?
A: Yes! Mutated crops are valuable trades.

### Q: Best pet for mutations?
A: Unicorn (Magic ability) = +50% mutation chance.

---

*Hunt those mutations for massive profits!*',
ARRAY['grow a garden mutations explained', 'grow a garden mutation multipliers', 'grow a garden mutations list', 'how to get mutations grow a garden', 'best mutations for profit grow a garden'],
'{"type": "mechanic", "word_count": 350}'::jsonb,
true),

-- 4. Friend Boost
('gag', 'mechanics', 'friend-boost',
'Grow a Garden Friend Boost - How It Works 2026',
'Friend Boost',
'Complete friend boost guide for Grow a Garden. Maximize your value by playing with friends.',
'# Grow a Garden Friend Boost Guide 2026

Friend boost is free extra value just for playing together!

## How Friend Boost Works

When friends are in your garden, everyone gets bonuses!

## Boost Levels

| Friends | Value Boost | Mutation Boost |
|---------|-------------|----------------|
| 1 | +10% | +5% |
| 2 | +25% | +10% |
| 3 | +40% | +15% |
| 4 | +60% | +20% |
| 5+ | +100% | +25% |

## Value Calculation

```
Boosted Value = BaseValue × (1 + FriendBoost%)
```

### Example with 5 Friends:
- Base crop: 100
- With 100% boost: 200!

Double the coins just for having friends online!

## How to Maximize

### Tips
1. Invite friends to your server
2. Farm in the same garden plot
3. Time harvests together
4. Join community Discord for groups

### AFK Friends Count
- Friends just need to be in-game
- They dont have to actively farm
- AFK friends still provide boost

### Stacks with Everything
- Mutations
- Weight bonuses
- Pet abilities
- Event multipliers

## Finding Friends

### Community Options
1. Official Discord LFG
2. Reddit communities
3. In-game player hubs
4. YouTube community servers

### Keeps Boost
- Boost persists while friends online
- Resets when friends leave
- Rejoin to regain boost

---

*Friends = free multiplier!*',
ARRAY['grow a garden friend boost', 'friend boost explained grow a garden', 'how friend boost affects value grow a garden'],
'{"type": "mechanic", "word_count": 300}'::jsonb,
true),

-- 5. Pets Guide
('gag', 'pets', 'pets-guide',
'Grow a Garden Pets Guide - Complete Pet System 2026',
'Pets Guide',
'Complete pets guide for Grow a Garden. All pets, abilities, and how to level them.',
'# Grow a Garden Pets Guide 2026

Pets provide permanent farming bonuses!

## Pet Overview

Pets in GAG help you farm more efficiently through abilities.

## All Pets

### Common Pets

| Pet | Ability | Effect |
|-----|---------|--------|
| Bunny | Speed | +10% harvest speed |
| Cat | Luck | +5% mutation chance |
| Dog | Guard | Protects crops |
| Chicken | Eggs | Bonus seed drops |

### Rare Pets

| Pet | Ability | Effect |
|-----|---------|--------|
| Fox | Thief | Steals seeds |
| Owl | Wisdom | +15% XP |
| Panda | Heavy | +20% crop weight |
| Parrot | Social | +10% friend boost |

### Legendary Pets

| Pet | Ability | Effect |
|-----|---------|--------|
| Dragon | Fire | Instant grow |
| Unicorn | Magic | +50% mutations |
| Phoenix | Rebirth | Auto replant |

## Pet Weight System

Pet weight affects ability power:

| Weight | Ability Power |
|--------|---------------|
| Base | 1x |
| 2x Base | 2x |
| 5x Base | 5x |

Feed pets to increase weight!

## Pet XP and Leveling

Pets level up by being active:
- Farm together for XP
- Higher level = stronger ability
- Max level: 10

## Getting Pets

1. Eggs (random hatch)
2. Event rewards
3. Trading
4. Shop (premium)

---

*Level those pets for permanent bonuses!*',
ARRAY['grow a garden pets guide', 'grow a garden pet weight', 'grow a garden pet xp', 'grow a garden pet weight explained'],
'{"type": "guide", "word_count": 300}'::jsonb,
true),

-- 6. Pet Weight
('gag', 'pets', 'pet-weight',
'Grow a Garden Pet Weight - Weight System 2026',
'Pet Weight',
'Complete pet weight guide for Grow a Garden. How weight affects pet abilities.',
'# Grow a Garden Pet Weight Guide 2026

Weight determines pet power!

## How Weight Works

Each pet has a weight stat that scales their ability strength.

## Weight by Pet Type

| Pet | Base Weight | Max Weight |
|-----|-------------|------------|
| Bunny | 5 | 50 |
| Cat | 8 | 80 |
| Dog | 10 | 100 |
| Panda | 20 | 200 |
| Dragon | 50 | 500 |

## Increasing Weight

| Method | Weight Gained |
|--------|---------------|
| Regular Feed | +1-5 |
| Premium Food | +10-20 |
| Golden Treat | +50 |
| Event Food | +25 |

## Weight to Power Scaling

```
Power = BaseAbility × (Weight / BaseWeight)
```

### Example:
- Bunny base: 5 weight, +10% speed
- At 25 weight (5x base): +50% speed!

## Weight Goals

| Stage | Target Weight |
|-------|---------------|
| Early | Base × 2 |
| Mid | Base × 5 |
| Late | Base × 10 (Max) |

---

*Feed those pets for maximum power!*',
ARRAY['grow a garden pet weight', 'grow a garden weight to value', 'grow a garden value to weight'],
'{"type": "mechanic", "word_count": 250}'::jsonb,
true),

-- 7. Trading Guide
('gag', 'strategy', 'trading-guide',
'Grow a Garden Trading Guide - WFL & Tips 2026',
'Trading Guide',
'Complete trading guide for Grow a Garden. Learn WFL system and avoid scams.',
'# Grow a Garden Trading Guide 2026

Trading is essential for fast progression!

## WFL System

WFL = Win / Fair / Lose

Community rating system for trades.

## Trade Values

### High Demand (Win for buyer)
- Cosmic mutations
- Legendary pets
- Event exclusives
- Limited seeds

### Fair Trades
- Same rarity for same rarity
- Matching mutation tiers
- Equal pet weights

### Low Demand (Lose for buyer)
- Common crops
- Basic pets
- Overpriced seeds

## Trading Tips

1. **Check Value First** - Know market rates
2. **Ask for WFL** - Community will help
3. **Never Rush** - Scammers pressure you
4. **Screenshot Everything** - Proof matters

## Avoiding Scams

### Red Flags
- "Trade fast!" pressure
- Items swapped at last second
- Too-good-to-be-true offers
- Requests for "trust trades"

### Protection
- Use official trade system only
- Verify items before accepting
- Trade in public servers
- Report scammers

## Where to Trade

1. Official Discord trading channel
2. In-game trading hub
3. Reddit r/GrowAGardenTrades
4. Community Facebook groups

---

*Trade smart, avoid scams!*',
ARRAY['grow a garden trading guide', 'grow a garden WFL', 'WFL meaning grow a garden', 'avoid scams grow a garden trading', 'trading tips grow a garden'],
'{"type": "strategy", "word_count": 300}'::jsonb,
true),

-- 8. Beginner Tips
('gag', 'strategy', 'beginner-tips',
'Grow a Garden Beginner Tips - New Player Guide 2026',
'Beginner Tips',
'Essential beginner tips for Grow a Garden. Start your garden journey right.',
'# Grow a Garden Beginner Tips 2026

New to Grow a Garden? Follow this guide!

## Day 1 Goals

- [ ] Complete tutorial
- [ ] Plant starter seeds
- [ ] First harvest
- [ ] Sell crops
- [ ] Buy carrot seeds

## First Week Progression

### Days 1-2
- Farm carrots constantly
- Learn harvesting rhythm
- Save for better seeds

### Days 3-4
- Get first mutation (hopefully!)
- Start looking at pets
- Consider friend boost

### Days 5-7
- Unlock rare seeds
- Hatch first pet
- Join trading community

## Common Mistakes

1. **Selling mutations cheap** - Check value first!
2. **Ignoring pet leveling** - Start early
3. **Skipping friend boost** - Free multiplier
4. **Trading without checking** - WFL always

## Priority Order

1. Better seeds (more value)
2. Pet collection (permanent bonus)
3. Plot expansion (more crops)
4. Cosmetics (last!)

## Quick Tips

- Farm during events
- Stack friend boost
- Focus on mutations
- Sell at peak prices
- Level pets passively

## What NOT to Worry About

- Perfect mutations early
- Expensive pets immediately
- 100% completion
- Comparing to veterans

---

*Every master gardener started with wheat!*',
ARRAY['beginner tips grow a garden', 'midgame roadmap grow a garden', 'grow a garden new player guide', 'grow a garden leveling guide'],
'{"type": "strategy", "word_count": 280}'::jsonb,
true)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    display_name = EXCLUDED.display_name,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();

-- 验证
SELECT game_key, COUNT(*) as page_count FROM wiki_entries WHERE game_key IN ('etfb', 'sab', 'fishit', 'fisch', 'bss', 'gag') GROUP BY game_key;
