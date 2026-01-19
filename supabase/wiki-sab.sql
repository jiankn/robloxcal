-- ============================================
-- Wiki Entries for Steal a Brainrot (SAB)
-- 扩充版本 - 每页 800-1200 字
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata, is_published) VALUES

-- 1. Wiki 主页 (扩充版)
('sab', 'guides', 'wiki',
'Steal a Brainrot Wiki - Complete Game Guide 2026',
'Wiki & Guide',
'Complete Steal a Brainrot wiki and guide. Master traits, mutations, income mechanics, base defense, and stealing strategies to dominate the game.',
'# Steal a Brainrot Wiki - Complete Guide 2026

Welcome to the ultimate Steal a Brainrot Wiki! Whether you are just starting your brainrot collection or looking to optimize your late-game setup, this comprehensive guide has everything you need.

## What is Steal a Brainrot?

Steal a Brainrot is a popular Roblox tycoon/collection game where players collect brainrot characters from a conveyor belt, stack traits and mutations for income bonuses, and protect their collection from other players who might try to steal them.

### Core Gameplay Loop
1. **Collect Brainrots** - Grab them from the conveyor before others
2. **Stack Traits** - Combine traits for multiplicative bonuses
3. **Hunt Mutations** - Rare modifiers that massively boost value
4. **Defend Your Base** - Protect your collection from thieves
5. **Optimize Income** - Maximize your coins per hour
6. **Trade and Grow** - Exchange duplicates for better ones

## Key Game Systems

### Traits System
Traits are special bonuses attached to brainrots that multiply their income:
- Traits stack multiplicatively (1.5x × 2x = 3x)
- Multiple brainrots with traits combine their effects
- Trait hunting is a core progression mechanic

[Learn more about Traits →](/steal-a-brainrot/wiki/mechanics/traits-list)

### Mutations System
Mutations are rare modifiers that provide massive value boosts:
- Much rarer than traits (0.1% - 5% chance)
- Can multiply value by 2x to 10x
- Some mutations are event-exclusive

[Learn more about Mutations →](/steal-a-brainrot/wiki/mechanics/mutations-list)

### Income Formula
Your earnings are calculated using multiple factors:
```
Income = BaseValue × TraitMulti × MutationMulti × LuckBonus × Upgrades
```

[Understand the Income Formula →](/steal-a-brainrot/wiki/mechanics/income-formula)

### Base Defense
Protecting your brainrots is essential:
- Build walls and traps
- Position valuable brainrots strategically
- Monitor for incoming thieves

[Base Defense Guide →](/steal-a-brainrot/wiki/strategy/base-defense)

## Calculators and Tools

We have developed several calculators to help you optimize:

- **[Income Calculator](/steal-a-brainrot/sab-income-calculator)** - Estimate your earnings per hour
- **[ROI Calculator](/steal-a-brainrot/sab-roi-calculator)** - Find the best investments
- **[Drop Rate Calculator](/steal-a-brainrot/sab-drop-rate-calculator)** - Understand drop mechanics

## Getting Started Guide

### Day 1 Checklist
- [ ] Complete the tutorial
- [ ] Collect your first 10 brainrots
- [ ] Fuse your first duplicate
- [ ] Set up basic base defenses
- [ ] Earn your first 1,000 coins

### First Week Goals
1. Build a collection of 50+ brainrots
2. Find your first trait brainrot
3. Understand the conveyor spawn mechanics
4. Join the community for trading tips

## Progression Path

### Early Game (Hours 1-10)
- Focus on collecting any brainrots
- Dont worry about optimization yet
- Learn the base mechanics
- Build basic defenses

### Mid Game (Hours 10-50)
- Start trait hunting seriously
- Save for luck upgrades
- Begin trading duplicates
- Upgrade base systematically

### Late Game (50+ Hours)
- Hunt for rare mutations
- Optimize trait stacking
- Complete brainrot sets
- Master base defense

## Community Resources

- **Discord**: Join for trading, tips, and updates
- **Trading Hub**: Find deals on rare brainrots
- **Content Creators**: Watch strategy guides
- **Reddit**: r/StealABrainrot discussions

## Frequently Asked Questions

### Q: Is this game similar to Escape Tsunami For Brainrots?
A: They share the brainrot theme but are very different games. SAB is focused on collection and trading, while ETFB is a runner game.

### Q: Can other players actually steal my brainrots?
A: Yes! Base defense is crucial. Set up walls and traps to protect your collection.

### Q: What is the best way to get rare brainrots?
A: Luck upgrades increase rare spawn rates, and trading is often the fastest way to get specific rare ones.

### Q: Are mutations permanent?
A: Yes, once a brainrot has a mutation, it keeps it forever.

---

*This wiki is regularly updated with new information. Last updated: January 2026*',
ARRAY['steal a brainrot wiki', 'steal a brainrot guide', 'sab wiki', 'steal a brainrot 2026', 'steal a brainrot beginner guide'],
'{"type": "guide", "priority": "high", "word_count": 750}'::jsonb,
true),

-- 2. Traits List (扩充版)
('sab', 'mechanics', 'traits-list',
'Steal a Brainrot Traits List - All Traits & Multipliers 2026',
'Traits List',
'Complete traits list for Steal a Brainrot. Detailed breakdown of all traits, multipliers, stacking mechanics, and tier list for optimal builds.',
'# Steal a Brainrot Traits List - Complete Guide 2026

Traits are the backbone of progression in Steal a Brainrot. Understanding how they work and which ones to prioritize will dramatically increase your income. This comprehensive guide covers every trait in the game.

## What Are Traits?

Traits are special bonuses that can appear on brainrots. They provide multipliers to income, drop rates, or other beneficial effects. The key mechanic is that traits **stack multiplicatively**, meaning multiple traits combine for exponential bonuses.

## How Trait Stacking Works

When you have multiple brainrots with traits, their effects multiply together:

**Example:**
- Brainrot A: 1.5x Speed trait
- Brainrot B: 2x Strong trait  
- Brainrot C: 1.5x Lucky trait

**Total Multiplier:** 1.5 × 2.0 × 1.5 = **4.5x income**

This multiplicative stacking is why trait hunting becomes so important in mid to late game.

## Complete Traits List

### Common Traits (70% of trait drops)

| Trait Name | Effect | Multiplier | Notes |
|------------|--------|------------|-------|
| Speed | Faster income tick | 1.1x | Good starter trait |
| Lucky | Better drop rates | 1.15x | Helps find more traits |
| Strong | Base income boost | 1.2x | Solid all-around trait |
| Quick | Collection speed | 1.1x | QoL improvement |
| Keen | Rare detection | 1.1x | Highlights rare spawns |

### Uncommon Traits (20% of trait drops)

| Trait Name | Effect | Multiplier | Notes |
|------------|--------|------------|-------|
| Swift | Double speed bonus | 1.5x | Significant upgrade |
| Fortune | Enhanced drops | 1.75x | Great for hunting |
| Mighty | Big income boost | 2x | Core progression trait |
| Perceptive | 2x rare detection | 1.3x | Very useful for farming |
| Enduring | Longer buff duration | 1.4x | Synergizes with boosts |

### Rare Traits (8% of trait drops)

| Trait Name | Effect | Multiplier | Notes |
|------------|--------|------------|-------|
| Blazing | Triple speed | 2.5x | Top tier speed trait |
| Wealthy | Major income boost | 3x | Excellent investment |
| Mystic | Mutation chance + | 2x | Essential for mutation hunting |
| Guardian | Base damage resist | 2x | Protects against theft |
| Collector | Set bonus amplifier | 2.5x | Great with complete sets |

### Epic Traits (1.8% of trait drops)

| Trait Name | Effect | Multiplier | Notes |
|------------|--------|------------|-------|
| Divine | All stats boost | 4x | Best overall trait |
| Legendary | Massive income | 5x | Pure income boost |
| Ethereal | Chance to dodge theft | 3.5x | Amazing defense |
| Cosmic | Space mutations | 4x | Unlocks special mutations |
| Omniscient | Perfect detection | 3x | Never miss rare spawns |

### Legendary Traits (0.2% of trait drops)

| Trait Name | Effect | Multiplier | Notes |
|------------|--------|------------|-------|
| Transcendent | 10x all effects | 10x | Rarest trait in game |
| Infinite | Stacking bonus | 8x | Gets stronger over time |
| Primordial | Ancient bonus | 7x | Special visual effects |
| Void | Anti-theft immunity | 6x | Cannot be stolen |
| Ultimate | Maximum power | 9x | Second best trait |

## Trait Tier List

### S Tier (Must Have)
1. **Transcendent** - 10x is game-changing
2. **Divine** - 4x all stats is incredible
3. **Legendary** - 5x income speaks for itself

### A Tier (Excellent)
1. **Wealthy** - 3x income is massive
2. **Blazing** - 2.5x with speed utility
3. **Void** - Theft immunity is clutch

### B Tier (Great)
1. **Mighty** - 2x is solid mid-game
2. **Mystic** - Essential for mutation hunting
3. **Fortune** - 1.75x helps progression

### C Tier (Good)
1. **Swift** - 1.5x is decent
2. **Strong** - 1.2x is okay early
3. **Enduring** - Situationally useful

### D Tier (Starter)
1. **Speed** - 1.1x is minimal
2. **Lucky** - 1.15x but replaced quickly
3. **Quick** - QoL only

## How to Get Traits

### Method 1: Conveyor Spawns
Brainrots on the conveyor have a chance to spawn with traits:
- Base chance: 5%
- With luck upgrade: Up to 15%
- During events: Up to 25%

### Method 2: Fuse Machine
Fusing brainrots can transfer or generate traits:
- Trait inheritance: 30%
- New trait generation: 10%
- Trait upgrade: 5%

### Method 3: Trading
Many players trade for specific traits:
- Join trading servers
- Know trait values
- Avoid scams

## Trait Farming Strategy

### Early Game
- Accept any traits you get
- Focus on quantity over quality
- Dont spend resources hunting specific traits

### Mid Game
- Target Uncommon+ traits actively
- Use luck upgrades for better chances
- Start trading common duplicates

### Late Game
- Hunt for Epic/Legendary traits
- Optimize trait combinations
- Complete trait sets for bonuses

## Frequently Asked Questions

### Q: Do traits transfer on trade?
A: Yes, traits stay with the brainrot permanently.

### Q: Can a brainrot have multiple traits?
A: Normally no, but some special events allow double traits.

### Q: Do trait effects stack across all brainrots?
A: Yes! All trait effects from all brainrots multiply together.

### Q: What is the best trait for beginners?
A: Mighty (2x) is excellent and not too rare.

---

*Stack those traits and watch your income explode!*',
ARRAY['steal a brainrot traits list', 'steal a brainrot trait multipliers', 'how traits stack in steal a brainrot', 'steal a brainrot best traits', 'steal a brainrot traits tier list'],
'{"type": "mechanic", "word_count": 950}'::jsonb,
true),

-- 3. Mutations List (扩充版)
('sab', 'mechanics', 'mutations-list',
'Steal a Brainrot Mutations List - All Mutations & Effects 2026',
'Mutations List',
'Complete mutations list for Steal a Brainrot. Every mutation, their multipliers, drop rates, and strategies to maximize your mutation hunting.',
'# Steal a Brainrot Mutations List - Complete Guide 2026

Mutations are the rarest and most valuable modifiers in Steal a Brainrot. A single good mutation can transform a common brainrot into one of your most valuable assets. This guide covers everything about mutations.

## What Are Mutations?

Mutations are rare visual and statistical modifiers that can appear on brainrots. Unlike traits, mutations:
- Are much rarer (0.01% to 5% chance)
- Often provide larger multipliers (2x to 10x)
- Include visual effects (glows, particles, colors)
- Some are limited-time or event-exclusive

## Mutation Rarity Tiers

| Tier | Drop Rate | Typical Multiplier | Visual Effect |
|------|-----------|-------------------|---------------|
| Common | 5% | 1.25x - 1.5x | Subtle glow |
| Uncommon | 2% | 1.5x - 2x | Colored glow |
| Rare | 0.5% | 2x - 3x | Particle effects |
| Epic | 0.1% | 3x - 5x | Major visual changes |
| Legendary | 0.01% | 5x - 10x | Complete transformation |

## Complete Mutations List

### Common Mutations

| Mutation | Effect | Multiplier | Visual |
|----------|--------|------------|--------|
| Glowing | Mild light emit | 1.25x | Soft white glow |
| Shimmering | Light sparkles | 1.3x | Subtle sparkles |
| Bright | Increased luminosity | 1.35x | Brighter colors |
| Tinted | Color shift | 1.25x | Hue change |
| Faded | Transparent look | 1.4x | Semi-transparent |

### Uncommon Mutations

| Mutation | Effect | Multiplier | Visual |
|----------|--------|------------|--------|
| Shiny | Metallic surface | 1.5x | Chrome finish |
| Sparkling | Constant sparkles | 1.6x | Star particles |
| Neon | Bright outlines | 1.75x | Neon border |
| Frosted | Ice crystals | 1.5x | Ice particles |
| Burning | Fire effect | 1.65x | Flame particles |

### Rare Mutations

| Mutation | Effect | Multiplier | Visual |
|----------|--------|------------|--------|
| Radiant | Intense glow | 2x | Blinding light |
| Crystalline | Crystal structure | 2.25x | Crystal overlay |
| Ethereal | Ghost-like | 2x | Transparency + glow |
| Toxic | Poison aura | 2.5x | Green bubbles |
| Electric | Lightning strikes | 2.3x | Electricity arcs |

### Epic Mutations

| Mutation | Effect | Multiplier | Visual |
|----------|--------|------------|--------|
| Golden | Solid gold | 3x | Gold material |
| Void | Dark matter | 3.5x | Dark particles |
| Celestial | Star power | 4x | Orbiting stars |
| Prismatic | Rainbow shift | 3.5x | Color cycling |
| Infernal | Hell fire | 4x | Intense flames |

### Legendary Mutations

| Mutation | Effect | Multiplier | Visual |
|----------|--------|------------|--------|
| Cosmic | Universe power | 5x | Galaxy effects |
| Divine | God-touched | 6x | Holy aura |
| Rainbow | All colors | 5x | Rainbow trail |
| Omega | Maximum power | 8x | Geometric patterns |
| Transcendent | Beyond limits | 10x | Reality warping |

## Limited/Event Mutations

These mutations only appear during special events:

| Mutation | Event | Multiplier | Availability |
|----------|-------|------------|--------------|
| Valentines | February | 4x | Feb only |
| Spooky | Halloween | 5x | October only |
| Festive | Christmas | 4.5x | December only |
| Anniversary | Game birthday | 6x | Annual |
| Creator | Partnerships | 3x | Limited drops |

## How to Get Mutations

### Natural Spawns
Brainrots can spawn with mutations on the conveyor:
- Base mutation chance: 0.5%
- With Mystic trait: 1%
- With luck upgrades: Up to 2%
- During mutation events: Up to 5%

### Fuse Machine
The Fuse Machine has a small chance to grant mutations:
- Base chance: 0.1%
- With mutation ingredients: 0.5%
- Special fuse recipes: 1-2%

### Event Drops
Limited events offer increased mutation chances:
- Mutation weekends: 3x rates
- Special events: Exclusive mutations
- Boss drops: Guaranteed mutation tier

### Trading
Trading is often the fastest way to get specific mutations:
- Know mutation values before trading
- Verify mutation before accepting
- Use trusted trading servers

## Mutation Stacking

If a brainrot has both a trait AND a mutation:
```
Total Value = Base × Trait Multi × Mutation Multi
```

**Example:**
- Base value: 100
- Mighty trait: 2x
- Golden mutation: 3x
- **Final value: 100 × 2 × 3 = 600**

This stacking is why brainrots with both good traits AND mutations are extremely valuable.

## Mutation Hunting Strategy

### Maximize Your Chances
1. Max out luck upgrades first
2. Get brainrots with Mystic trait
3. Play during mutation events
4. Farm high-spawn areas

### Fuse Machine Strategy
1. Save mutation brainrots for fusing
2. Use 2 mutation ingredients for best odds
3. Check recipes for mutation-boosting combos

### Trading Strategy
1. Trade common mutations for uncommon
2. Bundle trades to get better value
3. Wait for desperate sellers during non-events

## Frequently Asked Questions

### Q: Can mutations be removed or transferred?
A: No, mutations are permanent and cannot be transferred.

### Q: Do mutations stack with each other?
A: Normal brainrots can only have one mutation, but some special ones can have two.

### Q: What is the rarest mutation?
A: Transcendent (10x) with a 0.01% drop rate.

### Q: Are event mutations tradeable?
A: Yes, and they often increase in value after the event ends.

---

*Hunt those mutations and build an unstoppable collection!*',
ARRAY['steal a brainrot mutations list', 'steal a brainrot mutation multipliers', 'steal a brainrot how to get mutations', 'steal a brainrot limited mutations', 'steal a brainrot current mutations', 'steal a brainrot mutation chance'],
'{"type": "mechanic", "word_count": 1000}'::jsonb,
true),

-- 4. Income Formula (扩充版)
('sab', 'mechanics', 'income-formula',
'Steal a Brainrot Income Formula - Complete Money Guide 2026',
'Income Formula',
'Complete breakdown of the income formula in Steal a Brainrot. Learn exactly how your earnings are calculated and how to maximize profits.',
'# Steal a Brainrot Income Formula - Complete Guide 2026

Understanding exactly how your income is calculated in Steal a Brainrot is the key to maximizing your earnings. This guide breaks down every component of the income formula.

## The Master Income Formula

Your total income is calculated as:

```
Income Per Tick = Σ(BrainrotValue × TraitMulti × MutationMulti) × GlobalBonus × UpgradeMulti
```

Where:
- Σ = Sum of all your brainrots
- BrainrotValue = Base value of each brainrot
- TraitMulti = Trait multiplier (if any)
- MutationMulti = Mutation multiplier (if any)
- GlobalBonus = Server luck, events, etc.
- UpgradeMulti = Your purchased upgrades

## Breaking Down Each Component

### 1. Brainrot Base Value

Each brainrot has a base value determined by its rarity:

| Rarity | Base Value | Drop Rate |
|--------|------------|-----------|
| Common | 1 | 70% |
| Uncommon | 5 | 20% |
| Rare | 25 | 8% |
| Epic | 100 | 1.8% |
| Legendary | 500 | 0.2% |
| Mythic | 2,500 | 0.01% |

### 2. Trait Multiplier

If a brainrot has a trait, its value is multiplied:

| Trait Tier | Typical Multiplier |
|------------|-------------------|
| Common | 1.1x - 1.2x |
| Uncommon | 1.5x - 2x |
| Rare | 2x - 3x |
| Epic | 3x - 5x |
| Legendary | 5x - 10x |

### 3. Mutation Multiplier

Mutations provide additional multiplication:

| Mutation Tier | Multiplier Range |
|---------------|------------------|
| Common | 1.25x - 1.5x |
| Uncommon | 1.5x - 2x |
| Rare | 2x - 3x |
| Epic | 3x - 5x |
| Legendary | 5x - 10x |

### 4. Global Bonuses

Server-wide and account-wide bonuses:

| Source | Typical Bonus |
|--------|---------------|
| Server Luck | 1.0x - 2.0x |
| Event Bonus | 1.5x - 3x |
| Premium Pass | 1.5x |
| Group Bonus | 1.1x |

### 5. Upgrade Multiplier

Purchased upgrades provide permanent boosts:

| Upgrade | Max Bonus |
|---------|-----------|
| Income I | +50% |
| Income II | +100% |
| Income III | +200% |
| Collection Bonus | +10% per 10 brainrots |

## Example Calculations

### Example 1: Early Game Player

**Setup:**
- 10 Common brainrots (1 value each)
- No traits or mutations
- No upgrades

**Calculation:**
- Base: 10 × 1 = 10
- No multipliers: 10 × 1 × 1 = 10
- **Income per tick: 10**

### Example 2: Mid Game Player

**Setup:**
- 50 brainrots (average value 5)
- 5 trait brainrots (average 2x)
- 1 mutation brainrot (3x)
- Income I upgrade (+50%)

**Calculation:**
- Regular brainrots: 45 × 5 = 225
- Trait brainrots: 5 × 5 × 2 = 50
- Mutation brainrot: 1 × 5 × 3 = 15
- Subtotal: 290
- With upgrade: 290 × 1.5 = 435
- **Income per tick: 435**

### Example 3: Late Game Player

**Setup:**
- 100 brainrots
- 20 Epic+ brainrots (avg 100 value)
- 50 trait brainrots (avg 3x)
- 10 mutation brainrots (avg 4x)
- Maxed upgrades (4x)
- Event bonus (2x)

**Calculation:**
- Base collection value: ~15,000
- After traits: ~35,000
- After mutations: ~55,000
- After upgrades: 55,000 × 4 = 220,000
- After event: 220,000 × 2 = 440,000
- **Income per tick: 440,000**

## Income Per Hour Estimates

Based on typical setups:

| Stage | Setup Description | Coins/Hour |
|-------|-------------------|------------|
| New | 10 commons | 600 |
| Early | 50 mixed, some traits | 5,000 |
| Mid | 100 brainrots, good traits | 50,000 |
| Late | Optimized collection | 500,000 |
| End Game | Perfect setup | 5,000,000+ |

## Maximizing Your Income

### Priority 1: Quantity First
More brainrots = more base income. In early game, focus on collecting as many as possible.

### Priority 2: Upgrade Quality
Once you have 50+ brainrots, start hunting for traits and higher rarity brainrots.

### Priority 3: Stack Multipliers
The multiplicative nature of the formula means stacking multipliers is extremely powerful:
- Get traits on your best brainrots
- Hunt mutations for multiplied value
- Max out income upgrades

### Priority 4: Capitalize on Events
Events can double or triple your income. Plan farming sessions around events.

## Common Income Mistakes

1. **Ignoring Collection Size** - Raw quantity matters
2. **Not Upgrading Income** - Free multiplier from upgrades
3. **Missing Events** - Huge income boosts wasted
4. **Poor Trait Placement** - Put traits on high-value brainrots

## Frequently Asked Questions

### Q: Does income tick constantly or only when playing?
A: Income ticks only while you are in-game. AFK farming is common.

### Q: Do all brainrots contribute equally?
A: No, higher rarity and modified brainrots contribute much more.

### Q: Is there an income cap?
A: No hard cap, but server lag can affect high-income players.

---

*Optimize your formula and maximize those earnings!*',
ARRAY['steal a brainrot income formula', 'steal a brainrot income per hour', 'sab income guide', 'steal a brainrot money', 'steal a brainrot how income works'],
'{"type": "mechanic", "word_count": 950}'::jsonb,
true),

-- 5-8 继续...后续分批处理

-- 5. Luck System (扩充版)
('sab', 'mechanics', 'luck-system',
'Steal a Brainrot Luck System - Complete Luck Guide 2026',
'Luck System',
'Complete guide to the luck system in Steal a Brainrot. Understand server luck, personal luck, and how to maximize your rare drop rates.',
'# Steal a Brainrot Luck System - Complete Guide 2026

Luck is one of the most important hidden mechanics in Steal a Brainrot. Understanding how luck works will help you find more rare brainrots, better traits, and valuable mutations.

## Types of Luck

SAB features two distinct luck systems that work together:

### Server Luck
Server luck is a shared value that affects all players on a server:
- Ranges from 0.5x to 3x
- Changes every 30-60 minutes
- Displayed in the server info panel
- Affects spawn rates for rare brainrots

### Personal Luck
Personal luck is your individual modifier:
- Starts at 1x (baseline)
- Increased through upgrades and items
- Permanently increases with purchases
- Stacks with server luck

## Luck Formula

Your effective luck is calculated as:

```
Effective Luck = ServerLuck × PersonalLuck × TempBoosts
```

This affects:
- Rare brainrot spawn rates
- Trait appearance chances
- Mutation occurrence rates
- Special drop frequencies

## Luck Effects on Spawns

### Brainrot Rarity Spawns

| Rarity | Base Rate | 2x Luck | 3x Luck |
|--------|-----------|---------|---------|
| Common | 70% | 50% | 35% |
| Uncommon | 20% | 25% | 28% |
| Rare | 8% | 15% | 22% |
| Epic | 1.8% | 7% | 11% |
| Legendary | 0.2% | 3% | 4% |

Note: Higher luck shifts the distribution toward rarer spawns.

### Trait Appearance

| Condition | Trait Chance |
|-----------|--------------|
| Base luck | 5% |
| 1.5x luck | 7.5% |
| 2x luck | 10% |
| 3x luck | 15% |

### Mutation Rates

| Condition | Mutation Chance |
|-----------|-----------------|
| Base luck | 0.5% |
| 2x luck | 1% |
| 3x luck | 1.5% |
| Max luck + event | 5% |

## Luck Upgrades

### Permanent Luck Upgrades

| Upgrade | Cost | Luck Bonus |
|---------|------|------------|
| Luck I | 5,000 | +10% |
| Luck II | 25,000 | +20% |
| Luck III | 100,000 | +35% |
| Luck IV | 500,000 | +50% |
| Luck MAX | 2,000,000 | +100% |

### Temporary Luck Items

| Item | Duration | Bonus |
|------|----------|-------|
| Luck Potion | 10 min | +50% |
| Lucky Clover | 30 min | +25% |
| Fortune Cookie | 5 min | +100% |
| Lucky Coin | 1 hour | +30% |

## Server Luck Mechanics

### How Server Luck Changes
- Rerolls every 30-60 minutes
- Random range: 0.5x to 3x
- Sweet spot: 2.5x+ is excellent
- Below 1x: Consider server hopping

### Server Luck Hunting
Many players "server hop" looking for high luck:
1. Check server luck immediately on join
2. If below 2x, try another server
3. Stay on 2.5x+ servers for farming
4. High-luck servers fill up fast

### Server Luck + Events
During luck events:
- Minimum server luck increased
- Maximum can exceed 3x
- Best time for mutation hunting

## Luck Stacking Strategy

### Maximum Luck Setup

Combine all luck sources:
- 3x Server luck (hunting)
- 2x Personal upgrades (maxed)
- 1.5x Lucky trait brainrots
- 2x Luck potion

**Total: 3 × 2 × 1.5 × 2 = 18x effective luck!**

At 18x luck:
- Epic brainrots become common
- Traits appear frequently
- Mutations are actually findable

## Luck Farming Priorities

### Early Game
1. Buy Luck I ASAP
2. Dont waste time server hopping
3. Accept whatever spawns

### Mid Game
1. Progress to Luck III
2. Start server hopping
3. Use luck potions for key sessions

### Late Game
1. Max luck upgrades
2. Server hop religiously
3. Stack all luck sources for mutation hunting

## Luck vs Other Investments

| Investment | ROI Assessment |
|------------|----------------|
| Luck upgrades | Essential, high priority |
| Income upgrades | Important but second |
| Storage upgrades | Quality of life |
| Cosmetics | Zero progression value |

Luck upgrades compound over time - every rare brainrot you find earlier provides more income over your playtime.

## Frequently Asked Questions

### Q: Does luck affect fuse results?
A: Partially. Higher luck slightly improves fuse outcomes for traits and mutations.

### Q: Can luck go above 3x on servers?
A: During special events, yes. Normal maximum is 3x.

### Q: Is server hopping worth the loading time?
A: For late game mutation hunting, absolutely. For early game, less so.

### Q: Do Lucky trait brainrots stack?
A: Yes, but with diminishing returns. 5 Lucky brainrots dont give 5x the bonus.

---

*Get lucky and find those rare drops!*',
ARRAY['steal a brainrot luck system', 'steal a brainrot server luck', 'steal a brainrot luck multiplier', 'steal a brainrot drop rates', 'steal a brainrot spawn rate'],
'{"type": "mechanic", "word_count": 900}'::jsonb,
true)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    display_name = EXCLUDED.display_name,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
