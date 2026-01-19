-- ============================================
-- Wiki Entries for Escape Tsunami For Brainrots (ETFB)
-- 扩充版本 - 第二部分 (剩余3个页面)
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 6. Money Multiplier (扩充版)
('etfb', 'mechanics', 'money-multiplier',
'Escape Tsunami For Brainrots Money Multiplier - Fastest Money Guide',
'Money Multiplier',
'Learn how to maximize your money multiplier in Escape Tsunami For Brainrots. Complete breakdown of all multiplier sources and stacking mechanics.',
'# Escape Tsunami For Brainrots Money Multiplier - Complete Guide

Understanding how money multipliers work in ETFB is essential for maximizing your income. This guide breaks down every multiplier source and teaches you how to stack them for maximum earnings.

## How Multipliers Work

In ETFB, your final coin earnings are calculated using multiple multipliers that stack **multiplicatively**:

```
Final Coins = Base Coins × Rebirth Multi × Zone Multi × Upgrade Multi × Bonus Multi
```

This means if you have 2x from rebirth, 5x from zone, and 1.5x from upgrades, you get:
2 × 5 × 1.5 = **15x total multiplier**

## Multiplier Sources Breakdown

### 1. Rebirth Multiplier (Most Important)

Your rebirth multiplier is the single most impactful factor in your earnings.

| Rebirths | Multiplier | Impact |
|----------|------------|--------|
| 0 | 1x | Baseline |
| 5 | 5x | 5x income |
| 10 | 10x | 10x income |
| 25 | 25x | 25x income |
| 50 | 50x | 50x income |
| 100 | 100x | 100x income |

**Key Point:** A player with 100 rebirths earns in 1 minute what a new player earns in 100 minutes.

### 2. Zone Multiplier (Second Most Important)

Each zone has a fixed multiplier that applies to all coins collected there.

| Zone | Multiplier | Vs Zone 1 |
|------|------------|-----------|
| Zone 1 | 1x | Baseline |
| Zone 2 | 2x | 2x faster |
| Zone 3 | 5x | 5x faster |
| Zone 4 | 10x | 10x faster |
| Zone 5 | 25x | 25x faster |
| Zone 6 | 100x | 100x faster |

**Key Point:** Moving from Zone 3 to Zone 6 is a 20x income increase (5x → 100x).

### 3. Upgrade Multipliers

Various upgrades provide multiplicative bonuses:

| Upgrade | Max Bonus | Type |
|---------|-----------|------|
| Coin Value | +50% | Multiplicative |
| Lucky Coins | +30% | Chance-based |
| Event Boosts | Varies | Temporary |

### 4. Brainrot Bonuses

Collected brainrots provide permanent bonuses:

| Brainrot Tier | Typical Bonus |
|---------------|---------------|
| Common | +5% |
| Rare | +15% |
| Epic | +30% |
| Legendary | +50% |

These bonuses stack additively with each other, then multiply with other sources.

## Stacking Multipliers: Example Calculation

Lets calculate the income for a well-progressed player:

**Setup:**
- 50 Rebirths (50x)
- Zone 6 (100x)
- Coin Value maxed (1.5x)
- Rare brainrot (1.15x)

**Calculation:**
50 × 100 × 1.5 × 1.15 = **8,625x multiplier**

If base coin pickup is 1 coin, this player gets 8,625 coins per pickup!

## Fastest Money Strategies

### Strategy 1: Rush Rebirths Early
In early game, quantity of rebirths matters more than waiting for big ones.
- Rebirth every 10-15 minutes
- Build up to 10+ rebirths quickly
- Compound effect accelerates progress

### Strategy 2: Prioritize Zone Progression
After establishing rebirth base, push zones:
- Zone 6 is 4x better than Zone 5
- Zone 5 is 2.5x better than Zone 4
- Investment in speed pays dividends

### Strategy 3: Stack During Events
Events often provide temporary multipliers (2x, 3x, or more):
- Plan long farming sessions during events
- Save rebirth resources for event starts
- Event multipliers stack with everything

### Strategy 4: Complete Brainrot Collection
Each brainrot adds permanent bonus:
- Hunt rare brainrots actively
- Check shop for limited offers
- Trade with other players

## Money Per Hour Estimates

Based on typical setups:

| Stage | Setup | Est. Coins/Hour |
|-------|-------|-----------------|
| Very Early | 1 rebirth, Zone 1 | 1,000 |
| Early | 5 rebirths, Zone 3 | 25,000 |
| Mid | 25 rebirths, Zone 4 | 250,000 |
| Late | 50 rebirths, Zone 5 | 1,250,000 |
| End Game | 100 rebirths, Zone 6 | 10,000,000+ |

## Multiplier Optimization Tips

### Tip 1: Dont Neglect Any Source
All multiplier sources contribute. A 10% bonus from upgrades on top of a 1000x base is still 100x baseline.

### Tip 2: Prioritize by ROI
1. Rebirth multiplier (free, just time)
2. Zone multiplier (requires speed investment)
3. Upgrade multipliers (costs coins)
4. Brainrot bonuses (luck/time based)

### Tip 3: Track Your Progress
Keep mental notes on your multiplier growth. If it feels slow, check which source is lagging.

### Tip 4: Compound Interest Mentality
Every improvement compounds with everything else. Small improvements add up to massive gains.

## Frequently Asked Questions

### Q: Do multipliers have a cap?
A: No hard cap, but diminishing returns occur naturally as upgrades max out.

### Q: Whats the theoretical maximum multiplier?
A: Endgame players can achieve 50,000x+ multipliers with maxed everything.

### Q: Is it better to have 2x rebirth or access to Zone 3?
A: Zone 3 (5x) beats 2x rebirth. Always prioritize higher zones.

---

*Stack those multipliers and watch your wealth explode!*',
ARRAY['escape tsunami for brainrots money multiplier', 'escape tsunami for brainrots fastest money', 'etfb money guide', 'escape tsunami for brainrots coins per hour'],
'{"type": "guide", "word_count": 900}'::jsonb,
true),

-- 7. Brainrots List (扩充版)
('etfb', 'guides', 'brainrots-list',
'Escape Tsunami For Brainrots - All Brainrots List',
'Brainrots List',
'Complete list of all brainrots in Escape Tsunami For Brainrots. Detailed breakdown of rarity, effects, drop rates, and how to obtain each one.',
'# Escape Tsunami For Brainrots - All Brainrots Guide

Brainrots are collectible characters in ETFB that provide permanent bonuses to your gameplay. This comprehensive guide covers every brainrot, their effects, rarity, and how to obtain them.

## What Are Brainrots?

Brainrots are special collectible companions inspired by the Italian Brainrot meme phenomenon. They:
- Provide permanent stat bonuses
- Dont reset on rebirth
- Can be collected through gameplay or purchased
- Have different rarity tiers

## Brainrot Rarity Tiers

ETFB features 5 rarity tiers for brainrots:

| Tier | Drop Rate | Bonus Range | Color |
|------|-----------|-------------|-------|
| Common | 70% | +5-10% | Gray |
| Uncommon | 20% | +10-20% | Green |
| Rare | 8% | +20-35% | Blue |
| Epic | 1.8% | +35-50% | Purple |
| Legendary | 0.2% | +50-100% | Gold |

## Complete Brainrots List

### Common Brainrots

| Name | Effect | Drop Location |
|------|--------|---------------|
| Tralalero Tralala | +5% Speed | All Zones |
| Skibidi | +5% Coins | All Zones |
| Sigma Boy | +5% Stamina | Zone 2+ |
| Gyatt | +5% Jump |  Zone 2+ |
| Rizz Master | +7% Speed | Zone 3+ |

### Uncommon Brainrots

| Name | Effect | Drop Location |
|------|--------|---------------|
| Bombardino | +12% Speed | Zone 3+ |
| Lirili Larila | +12% Coins | Zone 3+ |
| Tung Sahur | +15% Stamina | Zone 4+ |
| Sussy Baka | +10% All Stats | Zone 4+ |
| Ohio Man | +15% Coins | Zone 4+ |

### Rare Brainrots

| Name | Effect | Drop Location |
|------|--------|---------------|
| Bombardiro Crocodilo | +25% Speed | Zone 5+ |
| Italian Lore | +20% Coins | Zone 5+ |
| Capybara King | +30% Stamina | Zone 5+ |
| Brainrot Emperor | +25% All Stats | Zone 6 |
| Meme Lord | +35% Coins | Zone 6 |

### Epic Brainrots

| Name | Effect | Drop Location |
|------|--------|---------------|
| Cosmic Brainrot | +40% All Stats | Zone 6 Only |
| Legendary Tralalero | +45% Speed | Event Exclusive |
| Ultimate Skibidi | +45% Coins | Event Exclusive |
| Void Walker | +50% Speed | Boss Drop |
| Rainbow Brainrot | +40% All + Aura | Special Quest |

### Legendary Brainrots

| Name | Effect | How to Get |
|------|--------|------------|
| Divine Brainrot | +100% All Stats | 0.1% Zone 6 drop |
| Event Brainrot | +75% + Special | Limited Events |
| Creator Code | +80% All Stats | Content Creator |
| Anniversary | +90% All Stats | Annual Event |
| Ultimate Form | +100% Speed | Complete All Achievements |

## How to Get Brainrots

### Method 1: Random Drops
Brainrots drop randomly while running:
- Higher zones have better drop rates
- Luck upgrades increase chances
- Special events boost drops

### Method 2: Boss Defeats
Certain bosses drop guaranteed brainrots:
- Zone bosses drop rare+
- Event bosses drop epic+
- Final boss drops legendary chance

### Method 3: Shop Purchases
The in-game shop offers:
- Daily rotating brainrots
- Premium brainrots for Robux
- Event-exclusive brainrots

### Method 4: Codes
Occasionally, codes release free brainrots:
- Check our [Codes Page](/escape-tsunami-for-brainrots/codes)
- Follow official social media
- Join the community Discord

### Method 5: Trading
Some servers allow brainrot trading:
- Trade duplicates for ones you need
- Rare brainrots have high trade value
- Be careful of scams

## Brainrot Farming Strategy

### Early Game Focus
- Collect any brainrots you get
- Dont specifically farm - just play
- Common brainrots still help

### Mid Game Focus
- Farm Zone 4-5 for uncommon/rare
- Save coins for shop legendaries
- Participate in events

### Late Game Focus
- Farm Zone 6 exclusively
- Target epic/legendary drops
- Complete collection for bonuses

## Brainrot Bonus Stacking

All brainrots bonuses stack:
```
Total Bonus = Sum of all brainrot bonuses
```

Example:
- 3 Commons (+5% each) = +15%
- 2 Rares (+25% each) = +50%
- 1 Epic (+40%) = +40%
- **Total: +105% bonus**

This 105% becomes a 2.05x multiplier on your other multipliers!

## Frequently Asked Questions

### Q: Do brainrots persist through rebirth?
A: Yes! Brainrots are permanent once collected.

### Q: Can I get duplicate brainrots?
A: Yes, but duplicates dont stack. Consider trading them.

### Q: Is there a brainrot collection bonus?
A: Yes! Completing sets unlocks additional bonuses.

### Q: Whats the best brainrot?
A: Divine Brainrot (+100% All) is technically best, but any legendary is excellent.

---

*Collect them all and power up your runs!*',
ARRAY['escape tsunami for brainrots brainrots list', 'escape tsunami for brainrots best brainrots', 'escape tsunami for brainrots rare brainrots', 'etfb brainrots'],
'{"type": "guide", "word_count": 850}'::jsonb,
true),

-- 8. Beginner Tips (扩充版)
('etfb', 'strategy', 'beginner-tips',
'Escape Tsunami For Brainrots Beginner Tips - New Player Guide 2026',
'Beginner Tips',
'Essential beginner tips for Escape Tsunami For Brainrots in 2026. Complete new player guide with day-by-day progression, common mistakes, and pro strategies.',
'# Escape Tsunami For Brainrots Beginner Tips - Complete New Player Guide 2026

Welcome to Escape Tsunami For Brainrots! This comprehensive beginner guide will help you start strong and avoid the common mistakes that slow down new players. Follow this guide and youll be progressing like a veteran in no time.

## Understanding the Game

Before diving into tips, lets understand what ETFB is about:

**Core Loop:**
1. Run away from the tsunami
2. Collect coins along the way
3. Spend coins on upgrades
4. Reach further zones for better rewards
5. Rebirth for permanent multipliers
6. Repeat and progress!

The key insight: This is a **progression game** where smart decisions compound over time.

## Day 1: Your First Session

### Hour 1 Goals
- [ ] Complete the tutorial
- [ ] Learn basic controls (run, jump, sprint)
- [ ] Collect 100 coins
- [ ] Buy your first speed upgrade

### Hours 2-3 Goals
- [ ] Reach 25 speed
- [ ] Unlock Zone 2
- [ ] Collect 500 coins
- [ ] Buy more speed upgrades

### End of Day 1 Goals
- [ ] Reach 50 speed
- [ ] Unlock Zone 3
- [ ] Perform first rebirth
- [ ] Understand the rebirth system

## Week 1 Progression Guide

### Days 1-2: Foundation
- Focus exclusively on speed upgrades
- Rebirth as soon as you hit requirements
- Aim for 5-10 rebirths
- Learn zone layouts

### Days 3-4: Building Momentum
- Continue rebirth grinding
- Push towards Zone 4 access
- Start noticing income upgrades
- Collect your first brainrots

### Days 5-7: Establishing Your Base
- Reach 20+ rebirths
- Consistently farm Zone 4
- Balance speed and income upgrades
- Understand multiplier stacking

## What to Focus On (Priority Order)

### Priority 1: Speed (Until Zone 3)
Speed is everything in early game because:
- Zone 2 gives 2x coins (vs Zone 1)
- Zone 3 gives 5x coins
- Zone 4 gives 10x coins
- The multiplier difference is HUGE

### Priority 2: Rebirths (Always)
Never delay a rebirth too long:
- Early rebirths should happen every 10-15 min
- The multiplier compounds everything
- More rebirths = faster future progress

### Priority 3: Income Upgrades (After Zone 3)
Once youre stable in Zone 3:
- Coin Value is the best income upgrade
- Lucky Coins provides good value
- Coin Magnet helps quality of life

### Priority 4: Everything Else
Later priorities include:
- Utility upgrades
- Brainrot hunting
- Achievement completion

## Common Beginner Mistakes

### Mistake 1: Hoarding Coins
**Wrong:** "Ill save up 10,000 coins before spending"
**Right:** Spend coins immediately on upgrades

Why: Unspent coins dont earn more coins. Upgrades compound.

### Mistake 2: Buying Random Upgrades
**Wrong:** Buying jump height before speed
**Right:** Focus on speed until Zone 3

Why: Speed unlocks zones with exponentially better rewards.

### Mistake 3: Delaying First Rebirth
**Wrong:** "Ill wait until I have perfect stats"
**Right:** Rebirth as soon as available

Why: The multiplier from rebirth outweighs any progress you might lose.

### Mistake 4: Ignoring Zone Progression
**Wrong:** Comfortable farming Zone 2 forever
**Right:** Always pushing for next zone

Why: Each zone multiplier is massive (2x → 5x → 10x → 25x → 100x).

### Mistake 5: Buying Cosmetics Early
**Wrong:** Spending on skins and effects
**Right:** Focus on functional upgrades

Why: Cosmetics dont help progression. Save them for later.

## Pro Tips for Fast Progression

### Tip 1: Learn Zone Layouts
Take time to learn obstacle patterns:
- Deaths waste valuable time
- Consistent runs > risky fast runs
- Practice makes perfect

### Tip 2: Use Calculators
Our tools help optimize decisions:
- [Rebirth Calculator](/escape-tsunami-for-brainrots/etfb-rebirth-calculator)
- [Upgrade ROI Calculator](/escape-tsunami-for-brainrots/etfb-upgrade-roi)
- [Speed Planner](/escape-tsunami-for-brainrots/etfb-speed-planner)

### Tip 3: Join Events
Events provide massive boosts:
- 2x coins = twice as fast progression
- Limited brainrots = rare bonuses
- Event codes = free rewards

### Tip 4: Be Consistent
Consistent daily play beats occasional binges:
- 30 min daily > 4 hours weekly
- Compound effects work over time
- Small progress adds up

### Tip 5: Engage With Community
The ETFB community is helpful:
- Join Discord for tips
- Watch content creators
- Ask questions in forums

## Progression Milestones

Track your progress against these milestones:

| Milestone | Typical Timeline |
|-----------|------------------|
| First Rebirth | 30 minutes |
| 10 Rebirths | Day 1 |
| Zone 4 Access | Day 2-3 |
| 25 Rebirths | Day 4-5 |
| Zone 5 Access | Week 2 |
| 50 Rebirths | Week 2-3 |
| Zone 6 Access | Week 4+ |
| 100 Rebirths | Month 2+ |

## What NOT to Stress About

### Dont Worry About:
- Perfect play - learning takes time
- Missing some drops - there will be more
- Slow days - everyone has them
- Comparing to veterans - they had time to progress

### Do Focus On:
- Understanding mechanics
- Making steady progress
- Having fun!
- Learning from mistakes

## Next Steps After Beginner

Once youve completed Week 1:
1. Read the [Rebirth System Guide](/escape-tsunami-for-brainrots/wiki/mechanics/rebirth-system)
2. Learn about [Zone Optimization](/escape-tsunami-for-brainrots/wiki/guides/zones)
3. Explore [Brainrot Collection](/escape-tsunami-for-brainrots/wiki/guides/brainrots-list)

## Frequently Asked Questions

### Q: Is this game pay-to-win?
A: No. Everything important can be earned through gameplay. Purchases are cosmetic or convenience.

### Q: How long does it take to "beat" the game?
A: Reaching Zone 6 takes 3-4 weeks of casual play. "Completing" everything takes months.

### Q: Should I watch ads for bonuses?
A: If available and youre comfortable with it, ad bonuses can speed up early game.

### Q: Whats the best device to play on?
A: PC generally offers better controls, but mobile works fine.

---

*Everyone starts as a beginner. Follow this guide and youll be a pro before you know it!*',
ARRAY['escape tsunami for brainrots beginner tips', 'escape tsunami for brainrots strategy', 'etfb new player guide', 'escape tsunami for brainrots midgame roadmap'],
'{"type": "strategy", "word_count": 1150}'::jsonb,
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
SELECT slug, title, metadata->>'word_count' as word_count FROM wiki_entries WHERE game_key = 'etfb';
