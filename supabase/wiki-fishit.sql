-- ============================================
-- Wiki Entries for Fish It! (fishit)
-- 扩充版本 - 每页 800-1200 字
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 1. Wiki 主页 (扩充版)
('fishit', 'guides', 'wiki',
'Fish It Wiki - Complete Fishing Game Guide 2026',
'Wiki & Guide',
'Complete Fish It wiki and guide for 2026. Master rods, baits, rare fish hunting, enchants, and the best fishing spots to maximize your catches.',
'# Fish It Wiki - Complete Game Guide 2026

Welcome to the ultimate Fish It Wiki! Whether you are casting your first line or hunting legendary fish, this comprehensive guide will help you become a master angler.

## What is Fish It?

Fish It is a relaxing yet strategic Roblox fishing game where players:
- Catch hundreds of unique fish species
- Upgrade rods and gear for better catches
- Explore multiple fishing locations
- Hunt for rare and legendary fish
- Compete in fishing events

### Core Gameplay Loop
1. **Choose Your Spot** - Select a fishing location
2. **Select Equipment** - Pick rod and bait
3. **Cast and Wait** - Timing and luck matter
4. **Catch Fish** - Reel in your prize
5. **Sell or Keep** - Build your collection or earn coins
6. **Upgrade and Progress** - Better gear = better fish

## Key Game Systems

### Rod System
Rods determine your base stats for fishing:
- Luck bonus (affects rare fish chance)
- Speed (time between casts)
- Durability (uses before repair)

[Complete Rods Guide →](/fish-it/wiki/rods/rods-list)

### Bait System
Different baits attract different fish:
- Common baits for general fishing
- Specialty baits for specific fish
- Premium baits for increased rare chances

[Complete Baits Guide →](/fish-it/wiki/baits/baits-list)

### Enchant System
Enchants permanently upgrade your gear:
- Rod enchants (luck, speed, multi-catch)
- Bait enchants (duration, attraction)
- Special enchants (rare drops)

[Enchants Guide →](/fish-it/wiki/mechanics/enchants)

### Location System
Each location offers unique fish:
- Starter Pond, River, Ocean
- Lake, Deep Sea, Secret Cove
- Event-exclusive locations

[Fishing Spots Guide →](/fish-it/wiki/locations/best-spots)

## Calculators and Tools

We have built tools to help you optimize:

- **[Luck & Drop Rate Calculator](/fish-it/fishit-luck-drop-rate)** - Understand your catch rates
- **[Rare Fish ETA](/fish-it/fishit-rare-fish-eta)** - Estimate time to catch specific fish
- **[Profit Per Hour](/fish-it/fishit-profit-per-hour)** - Find the most profitable strategy

## Getting Started

### Day 1 Checklist
- [ ] Complete the fishing tutorial
- [ ] Buy the Basic Rod upgrade
- [ ] Catch 20 fish at Starter Pond
- [ ] Earn 1,000 coins
- [ ] Unlock River location

### First Week Goals
1. Unlock 3+ fishing locations
2. Upgrade to Gold Rod tier
3. Catch your first rare fish
4. Learn bait mechanics
5. Start enchanting gear

## Progression Path

### Early Game (First Week)
- Fish anywhere for coins
- Upgrade rod ASAP
- Dont waste money on expensive baits
- Learn which fish are valuable

### Mid Game (Weeks 2-4)
- Push to Ocean/Lake locations
- Start using specialty baits
- Enchant your main rod
- Hunt specific rare fish

### Late Game (Month+)
- Deep Sea and Secret Cove
- Legendary fish hunting
- Perfect enchant builds
- Event participation

## Fish Categories

| Category | Example Fish | Value Range | Location |
|----------|--------------|-------------|----------|
| Common | Bass, Trout | 10-50 | All |
| Uncommon | Salmon, Carp | 50-200 | Rivers+ |
| Rare | Golden Carp, Koi | 200-1,000 | Lakes+ |
| Epic | Void Shark, Crystal | 1,000-5,000 | Ocean+ |
| Legendary | Leviathan, Dragon | 5,000-50,000 | Deep Sea+ |
| Mythic | Cosmic Whale | 50,000+ | Secret Cove |

## Events

Fish It runs regular events:
- **Daily Events**: Bonus XP, coin multipliers
- **Weekend Events**: Specific fish spawns boosted
- **Seasonal Events**: Exclusive fish and rewards
- **Community Events**: Competition leaderboards

## Community Tips

### From Pro Players:
> "Dont upgrade baits until youve maxed your rod luck. Rod luck applies to everything, bait luck is situational." - FishMaster2026

> "The Deep Sea is scary expensive to unlock, but the profit per hour makes it worth it within 2 days." - ReelPro

> "Always check the daily mission - sometimes its worth changing your plans for the rewards." - AquaFisher

## Frequently Asked Questions

### Q: What is the best starting strategy?
A: Upgrade rods before anything else. Rod luck affects every cast.

### Q: When should I move to a new location?
A: When you can consistently catch the rare fish of your current location.

### Q: Is premium worth buying?
A: The 2x luck pass is considered the best value. Everything else is earnable.

### Q: How do I catch legendary fish?
A: High luck + correct bait + correct location + patience.

---

*This wiki is updated regularly. Last updated: January 2026*',
ARRAY['fish it wiki', 'fish it guide', 'fish it game guide 2026', 'fish it beginner guide'],
'{"type": "guide", "priority": "high", "word_count": 800}'::jsonb,
true),

-- 2. Rods List (扩充版)
('fishit', 'rods', 'rods-list',
'Fish It Rods List - Complete Rod Guide 2026',
'Rods List',
'Complete rods list for Fish It 2026. Every rod, stats, costs, and tier rankings to help you choose the perfect fishing rod.',
'# Fish It Rods List - Complete Guide 2026

Your rod is the most important piece of equipment in Fish It. It determines your luck, cast speed, and overall fishing efficiency. This comprehensive guide covers every rod in the game.

## Why Rods Matter

Your rod affects three critical stats:
- **Luck Bonus**: Increases rare fish chance
- **Cast Speed**: Time between catches
- **Durability**: How long before repair needed

Higher tier rods = exponentially better fishing results.

## Rod Tiers Overview

| Tier | Luck Range | Speed Range | Cost Range (Coins) |
|------|------------|-------------|-------------------|
| Starter | 0-5 | 1x | Free - 500 |
| Basic | 5-15 | 1.1x-1.2x | 500 - 5,000 |
| Advanced | 15-35 | 1.2x-1.5x | 5,000 - 25,000 |
| Expert | 35-75 | 1.5x-2x | 25,000 - 100,000 |
| Master | 75-150 | 2x-3x | 100,000 - 500,000 |
| Legendary | 150-250 | 3x-5x | 500,000+ |

## Complete Rods List

### Starter Tier

| Rod Name | Luck | Speed | Cost | How to Get |
|----------|------|-------|------|------------|
| Wooden Rod | 0 | 1x | Free | Tutorial |
| Bamboo Rod | +3 | 1x | 200 | Shop |
| Training Rod | +5 | 1.05x | 400 | Quest |

**Best Starter Rod:** Bamboo Rod (best value for beginners)

### Basic Tier

| Rod Name | Luck | Speed | Cost | How to Get |
|----------|------|-------|------|------------|
| Iron Rod | +8 | 1.1x | 1,000 | Shop |
| Steel Rod | +12 | 1.15x | 2,500 | Shop |
| Bronze Rod | +10 | 1.2x | 2,000 | Shop |
| Silver Rod | +15 | 1.2x | 5,000 | Shop |

**Best Basic Rod:** Silver Rod (highest luck in tier)

### Advanced Tier

| Rod Name | Luck | Speed | Cost | How to Get |
|----------|------|-------|------|------------|
| Gold Rod | +25 | 1.3x | 10,000 | Shop |
| Platinum Rod | +30 | 1.4x | 15,000 | Shop |
| Diamond Rod | +35 | 1.5x | 25,000 | Shop |
| Crystal Rod | +30 | 1.5x | 20,000 | Quest |

**Best Advanced Rod:** Diamond Rod (balanced stats) or Crystal Rod (quest saves coins)

### Expert Tier

| Rod Name | Luck | Speed | Cost | How to Get |
|----------|------|-------|------|------------|
| Ruby Rod | +50 | 1.6x | 40,000 | Shop |
| Sapphire Rod | +55 | 1.7x | 60,000 | Shop |
| Emerald Rod | +60 | 1.8x | 80,000 | Shop |
| Obsidian Rod | +75 | 2x | 100,000 | Shop |

**Best Expert Rod:** Obsidian Rod (worth the investment)

### Master Tier

| Rod Name | Luck | Speed | Cost | How to Get |
|----------|------|-------|------|------------|
| Phoenix Rod | +100 | 2.2x | 200,000 | Shop |
| Dragon Rod | +120 | 2.5x | 350,000 | Quest |
| Celestial Rod | +140 | 2.8x | 450,000 | Shop |
| Cosmic Rod | +150 | 3x | 500,000 | Shop |

**Best Master Rod:** Cosmic Rod (endgame staple)

### Legendary Tier

| Rod Name | Luck | Speed | Cost | How to Get |
|----------|------|-------|------|------------|
| Mythic Rod | +180 | 3.5x | 750,000 | Rare Drop |
| Rainbow Rod | +200 | 4x | N/A | Event |
| Divine Rod | +220 | 4.5x | N/A | Achievement |
| Infinity Rod | +250 | 5x | 2,000,000 | Shop |

**Best Legendary Rod:** Infinity Rod (ultimate goal) or Divine Rod (free via achievements)

## Rod Upgrade Priority

### When to Upgrade
Upgrade your rod when:
- You have enough coins saved
- The luck jump is significant (15+ luck difference)
- Speed will noticeably improve farming

### Upgrade Path Recommendation
1. Wooden → Bamboo (immediate)
2. Bamboo → Silver (as soon as affordable)
3. Silver → Diamond (mid-game goal)
4. Diamond → Obsidian (late mid-game)
5. Obsidian → Cosmic (late game)
6. Cosmic → Infinity (end game)

## Rod ROI Analysis

| Upgrade | Cost | Luck Gain | Coins to Breakeven |
|---------|------|-----------|-------------------|
| Wooden→Bamboo | 200 | +3 | ~500 |
| Bamboo→Silver | 5,000 | +12 | ~15,000 |
| Silver→Diamond | 25,000 | +20 | ~60,000 |
| Diamond→Obsidian | 100,000 | +40 | ~200,000 |
| Obsidian→Cosmic | 500,000 | +75 | ~800,000 |

All rod upgrades pay for themselves through increased rare catches!

## Special Rods

### Event Rods
Limited-time rods with unique effects:
- Halloween Rod: +30 luck, spooky fish bonus
- Winter Rod: +25 luck, ice fish guaranteed
- Anniversary Rod: +50 luck, commemorative

### Quest Rods
Earned through gameplay:
- Training Rod: Tutorial completion
- Crystal Rod: Catch 100 rare fish
- Dragon Rod: Defeat Dragon Boss

## Frequently Asked Questions

### Q: Should I save for expensive rods or buy incremental upgrades?
A: Incremental upgrades are better. A +15 luck rod NOW beats a +100 luck rod in 2 weeks.

### Q: Do rod enchants stack with base stats?
A: Yes! Enchants multiply your rod base luck.

### Q: What is the single best rod for the price?
A: Diamond Rod at 25,000 is considered the best "value" rod in the game.

---

*Upgrade your rod and watch your rare catches multiply!*',
ARRAY['fish it rods list', 'fish it best rods', 'fish it how to get rods', 'fish it best rod for beginners', 'fish it best rod for rare fish'],
'{"type": "list", "word_count": 950}'::jsonb,
true),

-- 3-8 继续后续页面...

-- 3. Baits List (扩充版)
('fishit', 'baits', 'baits-list',
'Fish It Baits List - Complete Bait Guide 2026',
'Baits List',
'Complete baits list for Fish It 2026. All baits, effects, costs, and the best bait for every situation.',
'# Fish It Baits List - Complete Guide 2026

Bait selection is crucial for catching specific fish in Fish It. The right bait can dramatically increase your chances of catching rare and valuable fish. This guide covers every bait type and when to use them.

## How Bait Works

Baits provide two main effects:
1. **Attraction Bonus**: Increases chance of specific fish types
2. **Rarity Modifier**: Affects rare spawn chances

Baits are consumed on each cast, so cost-effectiveness matters!

## Bait Categories

| Category | Effect Type | Cost Range | Best For |
|----------|-------------|------------|----------|
| Generic | Small bonus to all | 5-25 | General farming |
| Fish-Specific | Big bonus to type | 25-100 | Targeted hunting |
| Location-Based | Bonus at location | 50-150 | Location optimization |
| Premium | Large universal | 100-500 | Rare hunting |
| Event | Special effects | Varies | Limited time |

## Complete Baits List

### Generic Baits

| Bait | Effect | Cost | Duration |
|------|--------|------|----------|
| Worm | +5% all | 5 | 1 cast |
| Minnow | +8% all | 10 | 1 cast |
| Shrimp | +12% all | 20 | 1 cast |
| Cricket | +10% speed | 15 | 1 cast |
| Grub | +15% common | 12 | 1 cast |

**Best Generic:** Shrimp (best universal bonus)

### Fish-Specific Baits

| Bait | Effect | Cost | Target Type |
|------|--------|------|-------------|
| Fish Eggs | +30% Salmon | 35 | River fish |
| Bloodworm | +40% Catfish | 45 | Bottom feeders |
| Squid Chunk | +35% Ocean fish | 50 | Saltwater |
| Glow Bait | +50% Deep fish | 75 | Deep Sea |
| Insect Larvae | +45% Trout | 40 | Freshwater |

**Best Specific:** Glow Bait (Deep Sea fish are most valuable)

### Location Baits

| Bait | Effect | Cost | Location |
|------|--------|------|----------|
| Pond Pellet | +25% at Pond | 30 | Starter Pond |
| River Fly | +30% at River | 40 | All Rivers |
| Ocean Chum | +35% at Ocean | 60 | Ocean zones |
| Lake Larvae | +30% at Lake | 50 | All Lakes |
| Deep Lure | +40% Deep Sea | 100 | Deep Sea |

**Best Location:** Deep Lure (best ROI at high-value location)

### Premium Baits

| Bait | Effect | Cost | Special |
|------|--------|------|---------|
| Golden Bait | +50% rare | 200 | Universal |
| Diamond Bait | +75% rare | 350 | Universal |
| Rainbow Bait | +100% rare | 500 | Universal |
| Legendary Bait | +150% legendary | 750 | Legendary only |
| Mythic Bait | +200% mythic | 1,000 | Mythic only |

**Best Premium:** Legendary Bait (best for targeted legendary hunting)

### Event Baits

| Bait | Effect | When Available |
|------|--------|----------------|
| Spooky Bait | +100% Halloween fish | October |
| Festive Bait | +100% Winter fish | December |
| Love Bait | +100% Valentine fish | February |
| Anniversary Bait | +50% all + bonus | Game anniversary |

## Bait Efficiency Rankings

### Cost Per Benefit

| Bait | Cost | Benefit | Efficiency Score |
|------|------|---------|------------------|
| Worm | 5 | +5% | ⭐⭐⭐⭐ |
| Shrimp | 20 | +12% | ⭐⭐⭐⭐ |
| Golden Bait | 200 | +50% | ⭐⭐⭐ |
| Legendary | 750 | +150% | ⭐⭐ |

**Key Insight:** Cheap baits are more cost-efficient for general farming. Premium baits are for targeted hunting.

## When to Use Each Bait

### Use Generic Baits When:
- General coin farming
- You dont need specific fish
- Budget is limited
- Early game progression

### Use Specific Baits When:
- Hunting quest fish
- Completing collection
- During fishing events
- Selling valuable species

### Use Premium Baits When:
- Hunting legendary/mythic
- Have sufficient coins saved
- During luck boost events
- Combined with enchanted rod

## Bait + Rod Synergy

Bait effects multiply with rod luck:

```
Effective Luck = Rod Luck × (1 + Bait Bonus)
```

Example:
- Cosmic Rod: +150 luck
- Golden Bait: +50% rare
- Effective rare chance: 150 × 1.5 = 225 luck equivalent

This is why rod upgrades matter more than bait upgrades!

## Money-Saving Tips

1. **Bulk Buy Generics** - Stock up during sales
2. **Dont Waste Premium** - Use only when hunting specifics
3. **Match Bait to Goal** - Dont use fish-specific if you want variety
4. **Event Baits are Free** - Usually quest rewards
5. **Consider No Bait** - Sometimes base rod is enough

## Frequently Asked Questions

### Q: Do baits stack with enchants?
A: Yes! All bonuses multiply together.

### Q: Should I always use bait?
A: Not always. For coin farming, cheap/no bait is fine.

### Q: What is best bait for beginners?
A: Worm or Shrimp - cheap and effective.

### Q: How do I get event baits?
A: Event quests, event shop, or special codes.

---

*Choose your bait wisely and reel in the big ones!*',
ARRAY['fish it baits list', 'fish it bait tier list', 'fish it bait locations', 'fish it where to buy bait', 'fish it best bait'],
'{"type": "list", "word_count": 900}'::jsonb,
true),

-- 4. Rare Fish
('fishit', 'fish', 'rare-fish',
'Fish It Rare Fish List - Complete Rare Hunting Guide 2026',
'Rare Fish List',
'Complete rare fish list for Fish It. All rare, epic, legendary, and mythic fish with locations, drop rates, and hunting strategies.',
'# Fish It Rare Fish List - Complete Hunting Guide 2026

Rare fish are the ultimate goal for many Fish It players. These valuable catches can be worth 10-1000x common fish! This guide covers every rare fish and how to catch them.

## Rare Fish Categories

| Category | Value Range | Base Drop Rate | Locations |
|----------|-------------|----------------|-----------|
| Rare | 200-1,000 | 1/200 - 1/500 | All 3+ |
| Epic | 1,000-5,000 | 1/500 - 1/1,000 | Ocean+ |
| Legendary | 5,000-50,000 | 1/1,000 - 1/5,000 | Deep Sea+ |
| Mythic | 50,000+ | 1/5,000 - 1/10,000 | Secret Cove |

## Complete Rare Fish by Location

### River Rare Fish

| Fish Name | Value | Drop Rate | Special Conditions |
|-----------|-------|-----------|-------------------|
| Golden Trout | 250 | 1/200 | Dawn only |
| Silver Salmon | 300 | 1/250 | Rainy weather |
| Crystal Catfish | 400 | 1/300 | Night only |
| Prismatic Perch | 500 | 1/400 | Rainbow weather |

### Lake Rare Fish

| Fish Name | Value | Drop Rate | Special Conditions |
|-----------|-------|-----------|-------------------|
| Diamond Carp | 600 | 1/350 | None |
| Moonlight Bass | 750 | 1/400 | Full moon |
| Starfish Koi | 800 | 1/450 | Night + clear |
| Aurora Pike | 1,000 | 1/500 | Northern lights |

### Ocean Rare Fish

| Fish Name | Value | Drop Rate | Special Conditions |
|-----------|-------|-----------|-------------------|
| Golden Tuna | 1,200 | 1/500 | None |
| Crystal Marlin | 1,500 | 1/600 | Storm weather |
| Void Shark | 2,500 | 1/750 | Night only |
| Rainbow Dolphin | 3,000 | 1/800 | After rain |

### Deep Sea Epic/Legendary

| Fish Name | Value | Drop Rate | Special Conditions |
|-----------|-------|-----------|-------------------|
| Abyssal Anglerfish | 5,000 | 1/1,000 | Depth 3+ |
| Giant Squid | 7,500 | 1/1,500 | Night |
| Leviathan | 15,000 | 1/2,500 | Boss spawn |
| Ancient Sea Dragon | 25,000 | 1/4,000 | Full moon + storm |
| Void Leviathan | 35,000 | 1/5,000 | Rare event |

### Secret Cove Mythic

| Fish Name | Value | Drop Rate | Special Conditions |
|-----------|-------|-----------|-------------------|
| Cosmic Whale | 50,000 | 1/6,000 | Cosmic event |
| Dimensional Fish | 75,000 | 1/8,000 | Portal spawn |
| Reality Warper | 100,000 | 1/10,000 | Perfect conditions |

## Rare Hunting Strategy

### Equipment Setup
For maximum rare hunting efficiency:
- **Rod**: Highest luck available (Cosmic+ recommended)
- **Bait**: Legendary or Mythic bait
- **Enchants**: Luck V + Double Catch
- **Timing**: Right weather/time conditions

### Location Choose
Priority order for rare hunting:
1. Secret Cove (mythics)
2. Deep Sea (legendaries)
3. Ocean (epics)
4. Lake (rare farming)

### Condition Tracking
Many rare fish require specific conditions:
- Check weather indicator
- Note time of day
- Watch for special events
- Moon phase matters

### Patience Math
At base drop rates with good gear:

| Target | Expected Casts | Time (@ 5/min) |
|--------|----------------|----------------|
| Rare (1/300) | 300 | 1 hour |
| Epic (1/750) | 750 | 2.5 hours |
| Legendary (1/3000) | 3,000 | 10 hours |
| Mythic (1/7000) | 7,000 | 23 hours |

With maxed luck, these times can be cut by 50-75%!

## Increasing Drop Rates

### Luck Stacking
Every luck source stacks:
```
Final Rate = Base Rate × (1 + Total Luck Bonus)
```

Example with 200% luck bonus:
- Base: 1/1000
- With luck: 1/333 (3x more common!)

### Luck Sources
1. Rod luck bonus
2. Bait luck bonus
3. Enchant bonuses
4. Event multipliers
5. Server luck boosts
6. Premium pass
7. Achievement bonuses

### Best Time to Hunt
Optimal conditions:
- During luck events (2x-3x rates)
- With weather matching target fish
- While moon phase is correct
- On high-luck servers

## Rare Fish Value Chart

| Fish | Value | Best Bait | Location | Difficulty |
|------|-------|-----------|----------|------------|
| Golden Trout | 250 | River Fly | River | Easy |
| Void Shark | 2,500 | Ocean Chum | Ocean | Medium |
| Leviathan | 15,000 | Legendary | Deep Sea | Hard |
| Cosmic Whale | 50,000 | Mythic | Secret Cove | Extreme |

## Frequently Asked Questions

### Q: Is it better to farm commons or hunt rares?
A: Depends on your gear. With low luck, commons are more consistent. With high luck, rare hunting is more profitable.

### Q: Do weather conditions really matter?
A: Yes! Some fish ONLY spawn during specific conditions. Check the fish requirements.

### Q: Whats the rarest fish in the game?
A: Reality Warper at 1/10,000 base drop rate (Secret Cove mythic).

### Q: Should I sell rare fish or keep for collection?
A: Keep one of each for collection bonuses, sell duplicates.

---

*Hunt those rare fish and become a legendary angler!*',
ARRAY['fish it rare fish list', 'fish it rare fish locations', 'fish it where to catch', 'fish it best fishing spots'],
'{"type": "list", "word_count": 950}'::jsonb,
true)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    display_name = EXCLUDED.display_name,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
