-- ============================================
-- Wiki Entries for Fish It! (fishit) - Part 2
-- 扩充版本 - 剩余4个页面
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 5. Enchants (扩充版)
('fishit', 'mechanics', 'enchants',
'Fish It Enchants - Complete Enchant Guide 2026',
'Enchants Guide',
'Complete enchants guide for Fish It. All enchants, max levels, costs, and the best enchant builds for every playstyle.',
'# Fish It Enchants - Complete Guide 2026

Enchants are permanent upgrades that supercharge your fishing gear. The right enchant build can double or triple your effectiveness. This guide covers all enchants and optimal builds.

## How Enchants Work

Enchants are applied to rods and provide permanent stat boosts:
- Each enchant has 5 levels (I through V)
- Higher levels provide stronger effects
- Multiple enchants can be stacked on one rod
- Enchants are permanent once applied

## All Rod Enchants

### Luck Enchants
| Enchant | Effect Per Level | Max Effect | Best For |
|---------|------------------|------------|----------|
| Lucky | +10% luck | +50% | Rare hunting |
| Fortune | +15% rare chance | +75% | Epic+ hunting |
| Blessed | +20% legendary | +100% | Late game |

### Speed Enchants
| Enchant | Effect Per Level | Max Effect | Best For |
|---------|------------------|------------|----------|
| Swift | +10% cast speed | +50% | Farming |
| Rapid | +5% + auto reel | +25% + auto | AFK farming |
| Lightning | +15% speed | +75% | Speed builds |

### Utility Enchants
| Enchant | Effect Per Level | Max Effect | Best For |
|---------|------------------|------------|----------|
| Double Catch | +5% dual catch | +25% | Value boost |
| Treasure | +3% bonus loot | +15% | Extra rewards |
| Durability | +20% rod life | +100% | Cost saving |
| Auto Cast | Automatic casting | 1 level | AFK |

### Special Enchants
| Enchant | Effect | Availability | Notes |
|---------|--------|--------------|-------|
| Cosmic | +100% at night | Event | Limited |
| Rainbow | +10% all stats | Achievement | Rare |
| Perfect | No failed casts | Boss drop | Very rare |

## Enchant Costs

| Level | Base Cost | Scaling | Total to Max |
|-------|-----------|---------|--------------|
| I | 1,000 | - | 1,000 |
| II | 2,500 | 2.5x | 3,500 |
| III | 5,000 | 2x | 8,500 |
| IV | 12,500 | 2.5x | 21,000 |
| V | 25,000 | 2x | 46,000 |

Total cost to max one enchant: ~46,000 coins

## Best Enchant Builds

### Rare Hunter Build
Priority for hunting valuable fish:
1. Lucky V (+50% luck)
2. Fortune V (+75% rare)
3. Double Catch III (+15% dual)

**Total Investment:** ~120,000 coins
**Expected Improvement:** 2-3x rare catches

### Speed Farmer Build
Priority for maximum fish/hour:
1. Lightning V (+75% speed)
2. Rapid V (+25% + auto)
3. Auto Cast I

**Total Investment:** ~95,000 coins
**Expected Improvement:** 2x fish per hour

### Balanced Build (Recommended)
Good all-around performance:
1. Lucky III (+30% luck)
2. Swift III (+30% speed)
3. Double Catch II (+10% dual)
4. Durability II (+40% life)

**Total Investment:** ~50,000 coins
**Expected Improvement:** 1.5x everything

### End Game Build
Maximum possible power:
1. Blessed V (+100% legendary)
2. Fortune V (+75% rare)
3. Double Catch V (+25% dual)
4. Lightning V (+75% speed)

**Total Investment:** ~200,000 coins
**Expected Improvement:** 4-5x value

## Enchanting Strategy

### Early Game (0-10K coins)
- Skip enchants entirely
- Focus on rod upgrades first
- Rods give better value early

### Mid Game (10K-100K coins)
- Start with Balanced Build
- Level enchants to III max
- Dont max anything yet

### Late Game (100K+ coins)
- Choose your specialty build
- Max priority enchants to V
- Experiment with combos

## Enchant Synergies

Certain enchants work together:
- **Lucky + Fortune**: Maximum rare rates
- **Swift + Rapid**: Fastest possible farming
- **Double Catch + Treasure**: Maximum value per cast

## Enchant vs Rod Priority

| Situation | Priority |
|-----------|----------|
| No enchants, basic rod | Upgrade rod |
| Good rod, no enchants | Start enchanting |
| Max rod, low enchants | Max enchants |
| Everything maxed | Min-max builds |

Rule of thumb: Rod to Diamond tier before serious enchanting.

## Frequently Asked Questions

### Q: Can I remove enchants?
A: No, enchants are permanent. Choose wisely!

### Q: Do enchants transfer when upgrading rods?
A: No, enchants are lost. Enchant your "final" rod.

### Q: Whats the single best enchant?
A: Lucky V for rare hunters, Lightning V for farmers.

### Q: Are event enchants worth chasing?
A: If available, yes - they are often best in slot.

---

*Enchant your gear and become an unstoppable angler!*',
ARRAY['fish it enchants', 'fish it enchant list', 'fish it best enchants', 'fish it enchant guide'],
'{"type": "mechanic", "word_count": 800}'::jsonb,
true),

-- 6. Best Fishing Spots (扩充版)
('fishit', 'locations', 'best-spots',
'Fish It Best Fishing Spots - Complete Location Guide 2026',
'Best Fishing Spots',
'Find the best fishing spots in Fish It for every stage. Complete location guide with fish lists, unlock requirements, and profit rankings.',
'# Fish It Best Fishing Spots - Complete Guide 2026

Location choice dramatically impacts your fishing experience and profits. This guide ranks every fishing spot and tells you exactly when to move to each one.

## Location Overview

Fish It features 6 main fishing locations plus event spots:

| Location | Unlock Cost | Fish Tiers | Profit Potential |
|----------|-------------|------------|------------------|
| Starter Pond | Free | Common | ⭐ |
| River | 1,000 | Common-Rare | ⭐⭐ |
| Lake | 5,000 | Common-Epic | ⭐⭐⭐ |
| Ocean | 15,000 | Rare-Epic | ⭐⭐⭐⭐ |
| Deep Sea | 50,000 | Epic-Legendary | ⭐⭐⭐⭐⭐ |
| Secret Cove | 200,000 | Legendary-Mythic | ⭐⭐⭐⭐⭐⭐ |

## Detailed Location Breakdowns

### Starter Pond
**Best For:** Tutorial, first 30 minutes

**Fish Available:**
- Common: Goldfish, Guppy, Minnow
- Max Value: 50 coins

**Why Leave:** Everything here is low value. Move ASAP.

**Coins/Hour:** ~500

---

### River
**Best For:** Early game farming

**Fish Available:**
- Common: Bass, Perch, Catfish
- Uncommon: Trout, Salmon
- Rare: Golden Trout (250 value)

**Why Stay:** Consistent income, rare spawns possible
**Why Leave:** When you can afford Lake

**Coins/Hour:** ~2,000

---

### Lake
**Best For:** Mid-game base

**Fish Available:**
- Common-Uncommon: Carp, Pike, Walleye
- Rare: Diamond Carp (600), Starfish Koi (800)
- Epic: Aurora Pike (1,000)

**Why Stay:** Good rare/epic mix, comfortable farming
**Why Leave:** When rare hunting seriously

**Coins/Hour:** ~5,000

---

### Ocean
**Best For:** Serious rare hunting

**Fish Available:**
- Uncommon: Tuna, Mackerel
- Rare: Golden Tuna (1,200), Crystal Marlin (1,500)
- Epic: Void Shark (2,500), Rainbow Dolphin (3,000)

**Why Stay:** Best consistent epic source
**Why Leave:** When you can handle Deep Sea

**Coins/Hour:** ~12,000

---

### Deep Sea
**Best For:** Late game, legendary hunting

**Fish Available:**
- Rare-Epic: Various (1,000-5,000)
- Legendary: Leviathan (15,000), Ancient Sea Dragon (25,000)
- Rare Legendary: Void Leviathan (35,000)

**Why Stay:** This is the endgame grind spot
**Why Leave:** Only for Secret Cove mythic hunting

**Coins/Hour:** ~30,000+

---

### Secret Cove
**Best For:** Mythic hunting, completionists

**Fish Available:**
- Legendary: Multiple (10,000-50,000)
- Mythic: Cosmic Whale (50,000), Reality Warper (100,000)

**Why Stay:** Mythic hunting is the ultimate goal
**Requirements:** 200,000 coins + special quest

**Coins/Hour:** ~50,000+ (highly variable)

---

## Location Progression Path

Optimal unlock order:

1. **Starter Pond → River** (immediately)
   - Cost: 1,000 coins
   - Time needed: 30 minutes at Pond

2. **River → Lake** (after 2-3 hours)
   - Cost: 5,000 coins
   - Time needed: 2-3 hours at River

3. **Lake → Ocean** (after 5-8 hours)
   - Cost: 15,000 coins
   - Time needed: 3-5 hours at Lake

4. **Ocean → Deep Sea** (after 15-20 hours)
   - Cost: 50,000 coins
   - Time needed: 8-12 hours at Ocean

5. **Deep Sea → Secret Cove** (after 50+ hours)
   - Cost: 200,000 coins + quest
   - Time needed: 20+ hours at Deep Sea

## Location-Specific Tips

### River Tips
- Dawn and dusk have better spawns
- Rainy weather = Silver Salmon bonus
- Stay near waterfall for rare spot

### Lake Tips
- Night fishing has better rares
- Full moon = Moonlight Bass guaranteed
- Center of lake has best spawns

### Ocean Tips
- Storm weather is actually GOOD
- Deeper water = better fish
- Watch for dolphin schools (bonus loot)

### Deep Sea Tips
- Night is significantly better
- Track Leviathan spawn patterns
- Boss spawn every 30 minutes (worth camping)

## Profit Comparison Table

| Location | Coins/Hour | Variance | Best With |
|----------|------------|----------|-----------|
| Pond | 500 | Low | Nothing |
| River | 2,000 | Low | Basic Rod |
| Lake | 5,000 | Medium | Gold Rod |
| Ocean | 12,000 | High | Diamond Rod |
| Deep Sea | 30,000 | Very High | Master Rod |
| Secret Cove | 50,000+ | Extreme | Legendary Rod |

## Frequently Asked Questions

### Q: Should I skip locations to save coins?
A: No! Each location teaches you mechanics and the fish are needed for collections.

### Q: Is Secret Cove actually worth 200,000?
A: Yes, but only when you have Cosmic Rod or better.

### Q: Do weather conditions work the same everywhere?
A: No, each location has unique weather effects.

---

*Find your perfect fishing spot and maximize those catches!*',
ARRAY['fish it best fishing spots', 'fish it best fishing spot early game', 'fish it best fishing spot mid game', 'fish it fastest money method'],
'{"type": "guide", "word_count": 950}'::jsonb,
true),

-- 7. Events (扩充版)
('fishit', 'events', 'events-guide',
'Fish It Events - Complete Event Guide 2026',
'Events Guide',
'Learn about all Fish It events in 2026. Event schedules, exclusive rewards, and strategies to maximize event participation.',
'# Fish It Events - Complete Guide 2026

Events are the best time to play Fish It! They offer bonus rewards, exclusive fish, and limited-time content. This guide covers all events and how to maximize them.

## Event Types

Fish It runs several types of events:

| Event Type | Frequency | Duration | Benefits |
|------------|-----------|----------|----------|
| Daily | Every day | 24 hours | Minor bonuses |
| Weekend | Fri-Sun | 3 days | Moderate bonuses |
| Monthly | Every month | 1 week | Major content |
| Seasonal | Quarterly | 2-3 weeks | Exclusive fish |
| Special | Varied | Varies | Unique rewards |

## Daily Events

Every day features rotating bonuses:

| Day | Event | Bonus |
|-----|-------|-------|
| Monday | Money Monday | +50% sell prices |
| Tuesday | Trait Tuesday | +25% trait chance |
| Wednesday | Wild Wednesday | Random bonus |
| Thursday | Thunder Thursday | Weather fish +100% |
| Friday | Fortune Friday | +25% rare chance |
| Saturday | Super Saturday | +100% XP |
| Sunday | Social Sunday | Party bonuses |

## Weekend Events

Special weekend-long events:

### Double XP Weekend
- When: 1st weekend of month
- Effect: 2x experience on all catches
- Strategy: Fish constantly for level gains

### Lucky Weekend
- When: 2nd weekend of month
- Effect: 1.5x rare spawn rates
- Strategy: Use this for rare hunting

### Treasure Weekend
- When: 3rd weekend of month
- Effect: Treasure chests spawn in water
- Strategy: Hunt chests for bonus loot

### Community Weekend
- When: 4th weekend of month
- Effect: Server-wide goals with rewards
- Strategy: Contribute to community goals

## Major Monthly Events

### Blood Moon Event
- **When:** Random nights (check announcements)
- **Special Fish:** Blood Bass, Crimson Shark, Vampire Eel
- **Exclusive Reward:** Blood Rod (+30% night luck)
- **Tips:** Only happens at night, lasts 1 in-game night

### Royal Event
- **When:** Mid-month weekend
- **Special Fish:** King Salmon, Queen Crab, Royal Tuna
- **Exclusive Reward:** Crown Rod (cosmetic + +25% luck)
- **Tips:** Royal fish sell for 3x normal price

### Migration Event
- **When:** End of month
- **Special Fish:** Migrating species worth 2x
- **Exclusive Reward:** Migration Badge
- **Tips:** Specific fish routes - follow the schools

## Seasonal Events

### Summer Splash (June-August)
- Beach-themed decorations
- Summer exclusive fish (Beach Whale, Sunfish)
- Summer Rod available
- Water balloon mini-game

### Fall Harvest (September-November)
- Autumn colors in all locations
- Harvest fish (Pumpkin Fish, Candy Carp)
- Harvest Rod available
- Fishing festival competition

### Winter Freeze (December-February)
- Frozen lake additions
- Ice fish (Frost Fish, Snow Whale)
- Ice Rod available
- Ice fishing mini-game

### Spring Bloom (March-May)
- Cherry blossom decorations
- Spring fish (Blossom Bass, Rainbow Trout)
- Bloom Rod available
- Egg hunt bonuses (Easter)

## Special Events

### Anniversary Event
- **When:** Game birthday (check date)
- **Rewards:** Anniversary Rod (+50% all stats)
- **Special:** Free premium items
- **Must Do:** Dont miss this one!

### Creator Events
- **When:** Content creator partnerships
- **Rewards:** Unique codes, special items
- **Special:** Limited time only

### Update Events
- **When:** Major game updates
- **Rewards:** Celebrate new content
- **Special:** Often includes free items

## Event Strategy Guide

### Preparation
1. Save coins before big events
2. Stock up on premium baits
3. Max luck enchants ready
4. Clear schedule for event days

### During Events
1. Focus on event-exclusive content first
2. Complete event quests before time runs out
3. Dont forget daily content too
4. Join full servers for community goals

### Maximizing Rewards
1. Event fish often worth more long-term
2. Event rods may become unavailable
3. Achievement points stack
4. Some rewards are tradeable

## Event Calendar (Example Month)

| Week | Events |
|------|--------|
| Week 1 | Double XP Weekend, Monday-Sunday dailies |
| Week 2 | Lucky Weekend, Blood Moon (random) |
| Week 3 | Royal Event, Treasure Weekend |
| Week 4 | Community Weekend, Migration Event |

## Frequently Asked Questions

### Q: Do event fish stay after events end?
A: Fish you caught stay, but you cant catch more until next event.

### Q: Are event items tradeable?
A: Some are, some arent. Check item description.

### Q: What if I miss an event?
A: Most events repeat annually. Some are one-time only.

---

*Never miss an event - they are the best time to progress!*',
ARRAY['fish it events', 'fish it event schedule', 'fish it blood moon event', 'fish it royal event'],
'{"type": "guide", "word_count": 900}'::jsonb,
true),

-- 8. Beginner Tips (扩充版)
('fishit', 'strategy', 'beginner-tips',
'Fish It Beginner Tips - Complete New Player Guide 2026',
'Beginner Tips',
'Essential beginner tips for Fish It in 2026. Complete new player guide with progression path, common mistakes, and pro strategies.',
'# Fish It Beginner Tips - New Player Guide 2026

Welcome to Fish It! This comprehensive beginner guide will help you start your fishing journey the right way and avoid common mistakes.

## Understanding the Game

Fish It is about:
- Catching fish to earn coins
- Upgrading equipment for better catches
- Exploring new fishing locations
- Hunting rare and legendary fish
- Building your ultimate fishing setup

## Day 1 Goals

Your first session should focus on basics:

- [ ] Complete the tutorial
- [ ] Buy the Basic Rod upgrade (first priority!)
- [ ] Catch 20 fish at Starter Pond
- [ ] Earn 1,000 coins
- [ ] Unlock River location
- [ ] Learn the casting rhythm

## First Week Progression

### Days 1-2: Foundation
- Upgrade to Silver Rod (5,000 coins)
- Learn different fish values
- Understand bait basics
- Move to River location

### Days 3-4: Growth
- Push toward Lake unlock (5,000)
- Start recognizing rare fish
- Save for better equipment
- Try different fishing spots

### Days 5-7: Optimization
- Unlock Lake
- Work toward Gold/Diamond Rod
- Begin enchanting strategy
- Understand weather effects

## Priority Order (What to Buy First)

### Tier 1: Essential
1. **Rod Upgrades** - Always #1 priority
2. **Location Unlocks** - Better fish = more coins
3. **Basic Enchants** - After Diamond Rod

### Tier 2: Important
4. **Premium Baits** - For rare hunting
5. **Advanced Enchants** - Optimize your build
6. **Storage Upgrades** - Quality of life

### Tier 3: Nice to Have
7. **Cosmetics** - Zero gameplay impact
8. **Extra Rod Slots** - Convenience
9. **Decorations** - Pure aesthetics

## Common Beginner Mistakes

### Mistake 1: Buying Baits Too Early
**Wrong:** Spending on premium baits with starter rod
**Right:** Basic/no bait until Diamond Rod

Why: Bait bonuses are multiplicative with rod luck. Low rod luck = wasted bait.

### Mistake 2: Staying at Starter Pond
**Wrong:** "Ill master this spot first"
**Right:** Move to River once you have 1,000 coins

Why: River fish are worth 2-5x more than pond fish.

### Mistake 3: Random Enchanting
**Wrong:** Putting random enchants on cheap rods
**Right:** Wait for Diamond+ Rod, then enchant strategically

Why: Enchants dont transfer when you upgrade rods.

### Mistake 4: Ignoring Events
**Wrong:** Playing normally during events
**Right:** Adjust strategy for event bonuses

Why: Events can double or triple your progress.

### Mistake 5: Selling Everything
**Wrong:** Selling every fish immediately
**Right:** Keep one of each for collection

Why: Collection bonuses are significant late game.

## Fishing Tips

### Casting Tips
- Cast to different spots (fish location varies)
- Watch for visual cues (ripples, shadows)
- Timing affects catch rate slightly

### Reeling Tips
- Perfect timing varies by fish type
- Larger fish take longer
- Failed reels waste bait

### Location Tips
- Move around within locations
- Weather affects spawns
- Time of day matters for some fish

## Money-Making Strategy

### Early Game ($0-10K)
1. Fish constantly at River
2. Sell all commons immediately
3. Keep uncommon+ for collection
4. Upgrade rod with every 1K

### Mid Game ($10K-50K)
1. Lake is your home base
2. Start occasional rare hunting
3. Balance upgrading and saving
4. Participate in every event

### Late Game ($50K+)
1. Ocean/Deep Sea farming
2. Legendary hunting sessions
3. Min-max your build
4. Complete collections

## Equipment Progression Path

| Stage | Rod | Location | Focus |
|-------|-----|----------|-------|
| Start | Wooden | Pond | Tutorial |
| 1 hour | Bamboo | River | Farming |
| 5 hours | Silver | Lake | Rares |
| 15 hours | Diamond | Ocean | Epics |
| 30 hours | Cosmic | Deep Sea | Legendaries |
| 50+ hours | Infinity | Secret Cove | Mythics |

## What NOT to Worry About

### Dont Stress Over:
- Perfect casts every time
- Missing some rare fish
- Not having premium pass
- Slower progress than others

### Do Focus On:
- Steady upgrades
- Learning mechanics
- Having fun!
- Event participation

## Useful Tips From Veterans

> "Your first 10K should go 100% into rod upgrades. Nothing else matters until you have a decent rod." - FishMaster

> "Weather conditions affect spawns more than most people realize. Check before settling into a spot." - ProAngler

> "Keep exactly one of every fish. The collection bonuses at 50%, 75%, and 100% are massive." - Collector

## Next Steps After Beginner

Once youre comfortable:
1. [Complete Rods Guide](/fish-it/wiki/rods/rods-list)
2. [Bait Strategy](/fish-it/wiki/baits/baits-list)
3. [Enchant Builds](/fish-it/wiki/mechanics/enchants)
4. [Rare Hunting](/fish-it/wiki/fish/rare-fish)

## Frequently Asked Questions

### Q: Is premium/robux necessary?
A: No! Everything is earnable through gameplay. Premium speeds things up but isnt required.

### Q: How long to reach end game?
A: Casual play: 2-3 months. Dedicated play: 3-4 weeks.

### Q: Best time to play?
A: During events and when you can focus. AFK fishing works but is less efficient.

---

*Everyone starts with a wooden rod. Follow this guide and youll be a master angler before you know it!*',
ARRAY['fish it beginner tips', 'fish it roadmap', 'fish it new player guide', 'fish it update notes'],
'{"type": "strategy", "word_count": 1000}'::jsonb,
true)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    display_name = EXCLUDED.display_name,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
