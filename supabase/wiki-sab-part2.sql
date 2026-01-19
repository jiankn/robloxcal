-- ============================================
-- Wiki Entries for Steal a Brainrot (SAB)
-- 扩充版本 - 第二部分 (剩余3个页面)
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 6. Fuse Machine (扩充版)
('sab', 'mechanics', 'fuse-machine',
'Steal a Brainrot Fuse Machine Guide - Complete Fusing Strategy 2026',
'Fuse Machine',
'Complete fuse machine guide for Steal a Brainrot. Learn all fuse costs, odds, recipes, and strategies to get the best results from every fuse.',
'# Steal a Brainrot Fuse Machine - Complete Guide 2026

The Fuse Machine is one of the most important progression tools in Steal a Brainrot. It allows you to combine brainrots for upgrades, trait transfers, and even mutation generation. This comprehensive guide covers everything about fusing.

## What is the Fuse Machine?

The Fuse Machine is a crafting station that combines two brainrots into one, with chances for:
- Rarity upgrades
- Trait inheritance
- Mutation generation
- Special combinations

## How Fusing Works

### Basic Process
1. Select two brainrots to fuse
2. Pay the fusion cost (coins)
3. Receive one result brainrot
4. Original two brainrots are consumed

### Result Mechanics
The result is determined by:
- Input rarities
- Input traits/mutations
- Random chance rolls
- Special recipe matching

## Fuse Costs

| Input Combination | Base Cost | Notes |
|-------------------|-----------|-------|
| Common + Common | 100 | Cheapest option |
| Common + Uncommon | 250 | Slight discount |
| Uncommon + Uncommon | 500 | Standard mid fuse |
| Common + Rare | 750 | Skip tier attempt |
| Rare + Rare | 1,500 | Quality fusing |
| Rare + Epic | 3,000 | High investment |
| Epic + Epic | 5,000 | Premium fusing |
| Epic + Legendary | 10,000 | Expensive gamble |
| Legendary + Legendary | 25,000 | End game fusing |

## Fuse Result Probabilities

### Rarity Outcomes (Same Rarity Input)

| Input | Same Rarity | +1 Tier | +2 Tiers | Downgrade |
|-------|-------------|---------|----------|-----------|
| Common × Common | 60% | 30% | 5% | 5% |
| Uncommon × Uncommon | 55% | 30% | 10% | 5% |
| Rare × Rare | 50% | 35% | 10% | 5% |
| Epic × Epic | 45% | 40% | 10% | 5% |

### Trait Transfer Odds

| Scenario | Transfer Chance |
|----------|-----------------|
| One input has trait | 40% |
| Both inputs have traits | 60% |
| Both have same trait | 80% + upgrade chance |
| Epic+ trait | +10% bonus |

### Mutation Odds

| Scenario | Mutation Chance |
|----------|-----------------|
| No mutations input | 0.5% |
| One mutation input | 3% (transfer) |
| Both mutations input | 10% (one transfers) |
| Mutation + trait combo | 5% new mutation |

## Special Fuse Recipes

Certain combinations have guaranteed or boosted outcomes:

### Rarity Recipes
| Recipe | Result | Notes |
|--------|--------|-------|
| 5 Commons → | Guaranteed Uncommon | Bulk convert |
| 3 Uncommons → | High Rare chance (60%) | Efficient upgrade |
| 2 Rares → | Good Epic chance (35%) | Standard upgrade |

### Trait Recipes
| Recipe | Result | Notes |
|--------|--------|-------|
| Same trait × 2 | Upgraded trait (50%) | Tier up your traits |
| Speed + Strong | Swift (25%) | Combo traits |
| Lucky + Lucky | Fortune (30%) | Luck upgrade |

### Mutation Recipes
| Recipe | Result | Notes |
|--------|--------|-------|
| Glowing + Glowing | Shiny (20%) | Mutation upgrade |
| Shiny + Burning | Radiant (10%) | Fusion mutation |
| Any + Any (luck) | Random mutation (0.5%) | Baseline chance |

## Fusing Strategies

### Early Game Fusing
Do:
- Fuse duplicate commons immediately
- Convert 5:1 for guaranteed uncommons
- Experiment to learn mechanics

Dont:
- Fuse anything with traits
- Save high rarity for later
- Spend too many coins on fusing

### Mid Game Fusing
Do:
- Aim for rare+ brainrots
- Target trait transfers
- Use recipes for efficiency

Dont:
- Fuse your best brainrots
- Ignore the cost/benefit ratio
- Rush expensive fuses

### Late Game Fusing
Do:
- Focus on mutation recipes
- Perfect your trait collection
- Go for legendary combinations

Dont:
- Waste mutations on bad fuses
- Ignore probability math
- Neglect trading as alternative

## Fuse Machine Tips

### Tip 1: Trait Preservation
When fusing a trait brainrot, pair it with a non-trait brainrot for best odds of keeping the trait.

### Tip 2: Bulk Common Fusing
Convert commons in batches of 5 for guaranteed upgrades instead of random 2:1 fuses.

### Tip 3: Same-Trait Stacking
Fusing two brainrots with the same trait has a chance to create a higher-tier version of that trait.

### Tip 4: Mutation Catalysts
Some players believe certain brainrot combinations act as "catalysts" for mutations. While not officially confirmed, community testing suggests patterns.

### Tip 5: Event Fusing
During fusion events (usually monthly), success rates for upgrades increase. Save valuable fuses for these periods.

## Frequently Asked Questions

### Q: Can I un-fuse brainrots?
A: No, fusion is permanent and irreversible.

### Q: Do legendary brainrots fuse better?
A: They have slightly better odds for retaining value, but costs are much higher.

### Q: Is it better to fuse or trade?
A: Trading is often more reliable for specific results. Fusing is for gambling and bulk processing.

### Q: Can fusing create mythic brainrots?
A: Extremely rarely. The odds are around 0.01% even with perfect inputs.

---

*Fuse wisely and build your perfect collection!*',
ARRAY['steal a brainrot fuse machine', 'steal a brainrot fuse machine guide', 'steal a brainrot fuse cost', 'steal a brainrot fuse odds', 'steal a brainrot fuse results'],
'{"type": "mechanic", "word_count": 900}'::jsonb,
true),

-- 7. Base Defense (扩充版)
('sab', 'strategy', 'base-defense',
'Steal a Brainrot Base Defense - Complete Protection Guide 2026',
'Base Defense',
'Complete base defense guide for Steal a Brainrot. Learn optimal layouts, trap placement, and strategies to protect your brainrots from thieves.',
'# Steal a Brainrot Base Defense - Complete Guide 2026

In Steal a Brainrot, other players can actually steal your brainrots! Base defense is crucial for protecting your collection. This guide covers everything from basic walls to advanced trap layouts.

## Why Base Defense Matters

Every brainrot you lose to theft:
- Reduces your income
- Wastes your progress
- Can include rare traits/mutations
- Is frustrating!

A well-defended base pays for itself by saving your collection.

## Defense Components

### Walls

| Wall Type | HP | Cost | When to Use |
|-----------|-----|------|-------------|
| Wood Wall | 100 | 50 | Very early game |
| Stone Wall | 250 | 200 | Early game |
| Iron Wall | 500 | 750 | Mid game |
| Steel Wall | 1000 | 2,500 | Late game |
| Reinforced | 2500 | 10,000 | End game |

### Traps

| Trap Type | Damage | Cost | Effect |
|-----------|--------|------|--------|
| Spike Trap | 50 | 100 | Direct damage |
| Slow Trap | 0 | 150 | -50% speed |
| Stun Trap | 25 | 200 | 2s stun |
| Poison Trap | 10/s | 300 | DOT effect |
| Alarm Trap | 0 | 250 | Alerts owner |

### Guards

| Guard Type | DPS | Cost | Range |
|------------|-----|------|-------|
| Basic Guard | 10 | 500 | 5m |
| Elite Guard | 25 | 2,000 | 7m |
| Beast Guard | 50 | 8,000 | 10m |
| Legendary Guard | 100 | 25,000 | 15m |

## Base Layout Strategies

### Onion Defense (Recommended)

Multiple layers of protection around your core:

```
[Wall][Wall][Wall][Wall][Wall]
[Wall][Trap][Trap][Trap][Wall]
[Wall][Trap][CORE][Trap][Wall]
[Wall][Trap][Trap][Trap][Wall]
[Wall][Wall][Wall][Wall][Wall]
```

Benefits:
- Thieves must break through multiple walls
- Traps activate while they break walls
- Guards have time to deal damage

### Maze Defense

Force thieves through a winding path:

```
[Wall][Wall][Wall][    ]
[Trap][Trap][Wall][Wall]
[Wall][    ][Wall][Trap]
[Wall][Wall][    ][CORE]
```

Benefits:
- Thieves cant rush directly
- Traps guaranteed to trigger
- Guards cover chokepoints

### Decoy Defense

Create fake valuable areas:

```
[DECOY].....[DECOY]
   \         /
    [MAZE PATH]
         |
      [CORE]
```

Benefits:
- Wastes thief time
- Real valuables hidden
- Works against greedy thieves

## Optimal Trap Placement

### Chokepoints
Place your strongest traps where thieves MUST pass through.

### Staggered Traps
Alternate trap types so effects stack:
SLOW → SPIKE → STUN → POISON → SPIKE

### Near Walls
Place traps just behind walls so they trigger on wall breakers.

### Guard Coverage
Ensure traps are within guard range for combo damage.

## Protecting Valuable Brainrots

### Priority System
Organize your base so the most valuable brainrots are:
1. Deepest in the base (furthest from entrance)
2. Behind the most walls
3. In guard range
4. Near multiple trap fields

### Hidden Storage
Some players create secret rooms that are non-obvious:
- Behind decorative elements
- In wall corners
- Below ground level

### Decoy Placement
Place lower-value brainrots in prominent locations to distract thieves from your real valuables.

## Anti-Theft Strategies

### Active Defense
- Check your base regularly
- Respond quickly to alarm notifications
- Counter-attack thieves

### Passive Defense
- Max out wall HP upgrades
- Maintain trap durability
- Keep guards healed/active

### Community Defense
- Join guilds with mutual protection
- Trade defense tips with friends
- Report serial thieves

## Defense Mistakes to Avoid

1. **Weak Outer Walls** - First line should be strong
2. **Trap Gaps** - Thieves will exploit any gaps
3. **Guard Blind Spots** - Ensure full coverage
4. **Neglecting Maintenance** - Walls and traps degrade
5. **Obvious Core Location** - Make thieves search

## Defense ROI Analysis

| Investment | Brainrots Saved | Worth It? |
|------------|-----------------|-----------|
| Basic walls | 5-10/month | Yes, essential |
| Iron walls | 20-30/month | Yes for mid game |
| Full trap setup | 50+/month | Yes if active player |
| Max guards | Priceless | Late game priority |

## Frequently Asked Questions

### Q: Can I steal back from thieves?
A: Yes! If they are still on your server, counter-raid is possible.

### Q: Do walls regenerate HP?
A: No, you must repair them manually with coins.

### Q: What activates alarm traps?
A: Any non-owner player entering the trap zone.

### Q: Are legendary guards worth the cost?
A: For late game with valuable collections, absolutely.

---

*Protect what you have earned - build defenses worthy of your collection!*',
ARRAY['steal a brainrot base defense', 'steal a brainrot base layout', 'sab base strategy', 'steal a brainrot stealing strategy'],
'{"type": "strategy", "word_count": 900}'::jsonb,
true),

-- 8. Beginner Tips (扩充版)
('sab', 'strategy', 'beginner-tips',
'Steal a Brainrot Beginner Tips - Complete New Player Guide 2026',
'Beginner Tips',
'Essential beginner tips for Steal a Brainrot. Complete guide for new players with progression path, common mistakes, and pro strategies.',
'# Steal a Brainrot Beginner Tips - New Player Guide 2026

Starting out in Steal a Brainrot can be overwhelming with all the mechanics to learn. This comprehensive beginner guide will set you on the path to building an amazing collection.

## Understanding the Game

Steal a Brainrot is a collection game where you:
1. Collect brainrots from conveyors
2. Upgrade them with traits and mutations
3. Protect them from other players
4. Build income through your collection
5. Trade and optimize for late game

## Day 1 Goals

Your first day should focus on learning basics:

- [ ] Complete the tutorial
- [ ] Collect your first 10 brainrots
- [ ] Learn how the conveyor works
- [ ] Fuse your first duplicate
- [ ] Set up basic wall defenses
- [ ] Earn 1,000 coins
- [ ] Buy your first upgrade

## First Week Progression

### Days 1-2: Foundation
- Focus on collecting any brainrots
- Learn to recognize rarities
- Understand the fuse machine basics
- Build simple walls around your base

### Days 3-4: Expansion  
- Push to 50+ brainrots
- Start noticing traits
- Upgrade walls to stone
- Learn about luck mechanics

### Days 5-7: Optimization
- Begin trait hunting
- Fuse strategically (not randomly)
- Complete first trading experiences
- Understand income mechanics

## What to Focus On (Priority Order)

### Priority 1: Collection Size
More brainrots = more income. Early game is about quantity.

### Priority 2: Base Defense
Losing brainrots to theft wastes all your grinding. Protect your base!

### Priority 3: Luck Upgrades
Luck affects everything: rarity spawns, trait chances, mutation rates. Invest early.

### Priority 4: Income Upgrades
Once you have 50+ brainrots, income upgrades start compounding.

### Priority 5: Trait Hunting
After basics are covered, actively hunt for good traits.

## Common Beginner Mistakes

### Mistake 1: No Defense
**Wrong:** "Ill build walls later"
**Right:** Build basic walls immediately

Why: Even wooden walls deter casual thieves.

### Mistake 2: Random Fusing
**Wrong:** Fusing anything hoping for luck
**Right:** Strategic fusing with odds knowledge

Why: Youll waste valuable brainrots on bad outcomes.

### Mistake 3: Ignoring Luck
**Wrong:** Not buying luck upgrades
**Right:** Luck I-II purchased early

Why: Luck compounds everything else you do.

### Mistake 4: Selling Traits
**Wrong:** Fusing away trait brainrots
**Right:** Always keep brainrots with traits

Why: Traits are rare and valuable, never waste them.

### Mistake 5: Solo Play
**Wrong:** Never trading or joining communities
**Right:** Engage with the trading community

Why: Trading accelerates progression massively.

## Understanding Rarities

| Rarity | Visual | Value | Strategy |
|--------|--------|-------|----------|
| Common | Gray | 1 | Fuse freely |
| Uncommon | Green | 5 | Keep good ones |
| Rare | Blue | 25 | Always keep |
| Epic | Purple | 100 | Treasure these |
| Legendary | Gold | 500 | Never lose these |
| Mythic | Rainbow | 2500 | End game goal |

## Conveyor Tips

### Spawn Timing
Brainrots spawn every 3-5 seconds. Position yourself well.

### Priority Order
When multiple spawn: Rarity > Trait visible > Closest

### Contested Spawns
If another player is there, focus on your side.

### AFK Spots
Some areas have less competition - learn the map.

## Trading Basics

### What to Trade
- Duplicate brainrots (you have 2+ of same)
- Brainrots without traits for ones with traits
- Commons for uncommons (bulk trades)

### What Not to Trade
- Anything with good traits
- Your only copy of a rare+
- Mutation brainrots (unless upgrading)

### Trading Safety
- Verify items before accepting
- Use official trading servers
- Dont trust "too good" offers
- Screenshot valuable trades

## Building Income

### Early Income Strategy
1. Quantity over quality
2. Collect constantly
3. Basic fusing for upgrades
4. Reinvest in luck

### Mid Income Strategy
1. Quality starts mattering
2. Hunt for traits
3. Upgrade income directly
4. Participate in events

### Passive vs Active
- Active: Collect from conveyor
- Passive: Income ticks from collection
- Balance both for best results

## Event Participation

Events are HUGE for progression:
- 2x spawns = faster collection
- Mutation events = best time to hunt
- Trading events = community prices drop
- Fusion events = better craft odds

Never skip events if possible!

## What to Buy First

### Essential Purchases (In Order)
1. Luck I (5,000 coins)
2. Stone Walls (2,000 coins)
3. Basic Traps (1,000 coins)
4. Income I (5,000 coins)
5. Luck II (25,000 coins)

### Skip These Early
- Cosmetics
- Premium guards
- Reinforced walls
- Expensive storage

## Next Steps After Beginner

Once you have completed your first week:
1. Read the [Traits Guide](/steal-a-brainrot/wiki/mechanics/traits-list)
2. Study [Fuse Machine Strategy](/steal-a-brainrot/wiki/mechanics/fuse-machine)
3. Master [Base Defense](/steal-a-brainrot/wiki/strategy/base-defense)

## Frequently Asked Questions

### Q: How do I get more brainrots faster?
A: Play during off-peak hours (less competition), upgrade luck, and position well near spawns.

### Q: Should I focus on stealing from others?
A: Not early. Defense and collection are better investments of your time initially.

### Q: When do traits start appearing?
A: Approximately 1 in 20 brainrots has a trait (5% base rate).

### Q: Is premium/robux worth it?
A: For speeding up progression, yes. But everything is earnable through gameplay.

---

*Every collector starts with nothing. Follow this guide and youll have an impressive collection in no time!*',
ARRAY['steal a brainrot beginner tips', 'steal a brainrot ROI tips', 'sab new player guide', 'steal a brainrot midgame roadmap'],
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

-- 验证
SELECT slug, title, metadata->>'word_count' as word_count FROM wiki_entries WHERE game_key = 'sab';
