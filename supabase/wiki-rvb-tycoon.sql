-- ============================================
-- Red VS Blue Tycoon Wiki Content
-- 10 comprehensive wiki entries for SEO
-- ============================================

-- Entry 1: Beginner Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'beginner-guide',
    'RVB Tycoon Beginner Guide 2026 - Complete Starter Tutorial',
    'Beginner Guide',
    '# Red VS Blue Tycoon Beginner Guide 2026

Welcome to **Red VS Blue Tycoon**, the ultimate team-based tycoon shooter on Roblox! This comprehensive guide will help you go from noob to pro in no time.

## What is Red VS Blue Tycoon?

Red VS Blue Tycoon combines two gameplay styles:
- **Tycoon Building**: Build your base, upgrade droppers, and generate income
- **Team Combat**: Fight against the opposing team to capture zones and earn rewards

## Getting Started (First 10 Minutes)

### Step 1: Choose Your Team
When you spawn, you''ll be placed on either the **Red** or **Blue** team. Teams are balanced automatically.

### Step 2: Build Your Basic Tycoon
1. Walk to your tycoon plot
2. Step on the first button to buy the **Basic Dropper** ($100)
3. Resources will start dropping onto the conveyor
4. They travel to the **Sell Point** and generate income

### Step 3: Upgrade Efficiently
| Priority | Upgrade | Cost | Why |
|----------|---------|------|-----|
| 1 | Basic Dropper (Lvl 10) | ~5K | Foundation of income |
| 2 | Conveyor Speed | ~2K | Faster = more money |
| 3 | Auto Collector | ~3K | Never miss drops |
| 4 | Base Turret | ~2K | Defend while AFK |

## Combat Basics

### Zone Capture
Zones appear on the map periodically. Stand in them to capture for your team.
- **Small Zone**: 500 bonus + chance for Uncommon weapon
- **Medium Zone**: 2000 bonus + chance for Rare weapon
- **Large Zone**: 5000 bonus + chance for Epic weapon

### Weapons
You start with the **Starter Pistol** (10 DMG, 2.0 speed = 20 DPS).
Check our [Weapon DPS Calculator](/rvb-tycoon/weapons) to find upgrades!

## Tips for Fast Progress

1. **Never stop upgrading** - Always spend your money on the next upgrade
2. **Use our Optimizer** - Our [Tycoon Optimizer](/rvb-tycoon/optimizer) tells you the best upgrade
3. **Rebirth ASAP** - Once you hit 100K, rebirth for 1.5x permanent multiplier
4. **Join zone fights** - Free money and weapon drops

## Common Mistakes to Avoid

❌ Saving money instead of upgrading
❌ Ignoring combat zones
❌ Waiting too long to rebirth
❌ Not using turrets for AFK income

## FAQ

**Q: How do I get better weapons?**
A: Zone captures, boss drops, shop purchases, and rebirth rewards.

**Q: What''s the fastest way to earn money?**
A: Max out droppers first, then add upgraders for multipliers.

**Q: When should I rebirth?**
A: As soon as you hit the requirement. Check our [Rebirth Calculator](/rvb-tycoon/rebirth).

---

*Last updated: January 2026*',
    'Complete beginner guide for Red VS Blue Tycoon. Learn how to build your tycoon, fight in combat, and progress quickly.',
    ARRAY['rvb tycoon guide', 'red vs blue tycoon beginner', 'rvb tycoon tutorial', 'how to play rvb tycoon', 'rvb tycoon tips'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 2: Best Weapons Tier List
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'tier-list',
    'best-weapons',
    'RVB Tycoon Best Weapons Tier List 2026 - All Weapons Ranked',
    'Weapon Tier List',
    '# Red VS Blue Tycoon Weapon Tier List 2026

Complete ranking of all weapons in Red VS Blue Tycoon by DPS, utility, and overall effectiveness.

## Tier List Summary

| Tier | Weapons |
|------|---------|
| **S** | Orbital Strike, Void Blade, Golden Minigun |
| **A** | Plasma Cannon, Thunder Bow, Railgun |
| **B** | Rocket Launcher, LMG, Sniper Rifle |
| **C** | Grenade Launcher, Flamethrower, Dual Pistols |
| **D** | Shotgun, SMG, Crossbow |
| **F** | Starter Pistol, Combat Knife |

## S-Tier Weapons (Meta Defining)

### Orbital Strike Beacon (Mythic)
- **DPS**: 100 (2000 damage × 0.05/s)
- **Special**: Calls satellite strike. 20s cooldown.
- **How to get**: Rebirth V
- **Verdict**: The ultimate flex weapon. Clears entire zones.

### Void Blade (Mythic)
- **DPS**: 1,200 (600 damage × 2.0/s)
- **Special**: True damage, ignores all defense
- **How to get**: Rebirth V
- **Verdict**: Best melee in the game. Melts everything.

### Golden Minigun (Mythic)
- **DPS**: 540 (45 damage × 12.0/s)
- **Special**: Spin-up time, then maximum carnage
- **How to get**: Ultra Rare Drop (0.1%)
- **Verdict**: Insane DPS for sustained fights.

## A-Tier Weapons (Excellent)

### Plasma Cannon (Legendary)
- **DPS**: 400 (500 damage × 0.8/s)
- **Special**: Ignores 50% armor, burn DoT
- **Verdict**: Best ranged option before Mythic tier.

### Thunder Bow (Legendary)
- **DPS**: 240 (200 damage × 1.2/s)
- **Special**: Chain lightning hits 3 nearby enemies
- **Verdict**: Perfect for group fights and zone defense.

## Best Weapons by Category

### Best Early Game
1. **Assault Rifle** (87.5 DPS) - Shop for 5K
2. **Shotgun** (96 DPS) - Shop for 4.5K
3. **SMG** (90 DPS) - Shop for 4K

### Best Mid Game
1. **Sniper Rifle** (75 DPS + one-shot potential)
2. **LMG** (150 DPS + no reload)
3. **Grenade Launcher** (80 DPS + AoE)

### Best for Bosses
1. **Railgun** - Pierces all enemies
2. **Plasma Cannon** - Burns through armor
3. **Golden Minigun** - Sustained DPS king

---

Use our [Weapon DPS Calculator](/rvb-tycoon/weapons) for detailed stats!',
    'Complete weapon tier list for RVB Tycoon 2026. All weapons ranked from S to F tier with DPS stats and recommendations.',
    ARRAY['rvb tycoon weapons', 'rvb tycoon tier list', 'best weapons rvb tycoon', 'rvb tycoon weapon guide', 'golden minigun rvb'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 3: Rebirth Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'rebirth-guide',
    'RVB Tycoon Rebirth Guide 2026 - All Tiers & Best Strategy',
    'Rebirth Guide',
    '# Red VS Blue Tycoon Rebirth Guide 2026

Everything you need to know about the rebirth system in Red VS Blue Tycoon.

## What is Rebirth?

Rebirth resets your tycoon progress in exchange for **permanent income multipliers**. The higher your rebirth tier, the faster you progress next time.

## All Rebirth Tiers

| Tier | Requirement | Multiplier | Key Unlocks |
|------|-------------|------------|-------------|
| **I** | 100K | 1.5x | Advanced Dropper, Heavy Tank, Combat Medic |
| **II** | 1M | 2.0x | Super Dropper, Sniper Elite, +5% Attack Speed |
| **III** | 10M | 3.0x | Ultra Dropper, Commando, Railgun |
| **IV** | 100M | 5.0x | Mechatron, Plasma Cannon, Gravity Hammer |
| **V** | 1B | 10.0x | Void Blade, Orbital Strike, Golden Aura |

## When to Rebirth

**Golden Rule**: Rebirth as soon as you hit the requirement!

### Why Immediate Rebirth is Best

Waiting to "earn more" before rebirthing is a trap. Here''s why:

| Scenario | Time to 1M | Total Time |
|----------|------------|------------|
| No rebirth | 3 hours | 3 hours |
| Rebirth at 100K | 2 hours (at 1.5x) | 2.5 hours |

You save 30 minutes by rebirthing immediately!

## Optimal Rebirth Strategy

### Phase 1: Rush to Rebirth I (0-100K)
1. Buy Basic Dropper immediately
2. Upgrade to level 10-15
3. Add Conveyor Speed for efficiency
4. Ignore combat, focus on income
5. **Time target**: 30-45 minutes

### Phase 2: Snowball to Rebirth II (100K-1M)
1. With 1.5x multiplier, upgrades are now 50% more effective
2. Add Advanced Dropper + Upgrader combo
3. Start doing zone captures for bonus income
4. **Time target**: 1.5-2 hours

### Phase 3: Endgame Push (1M+)
1. Each rebirth tier accelerates exponentially
2. Rebirth III (3x) makes V reachable
3. Focus on combat for weapon unlocks

## Rebirth Calculator

Use our [Rebirth Calculator](/rvb-tycoon/rebirth) to:
- See your current progress to next tier
- Calculate time remaining
- Compare rebirth strategies

## FAQ

**Q: Do I lose weapons when I rebirth?**
A: No! Weapons are permanent.

**Q: What resets on rebirth?**
A: Tycoon upgrades and resources only.

**Q: Is there a max rebirth?**
A: Rebirth V is currently the highest.

---

*Updated January 2026*',
    'Complete rebirth guide for RVB Tycoon. All tiers explained with optimal rebirth strategy and timing tips.',
    ARRAY['rvb tycoon rebirth', 'rebirth guide rvb', 'when to rebirth rvb tycoon', 'rvb rebirth rewards', 'rebirth strategy'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 4: Upgrade Priority Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'upgrade-priority',
    'RVB Tycoon Upgrade Priority Guide - Best Upgrades to Buy First',
    'Upgrade Priority',
    '# RVB Tycoon Upgrade Priority Guide 2026

Which upgrades should you buy first? This guide ranks every upgrade by efficiency.

## Upgrade Priority Tier List

### S-Tier (Buy First)
| Upgrade | Category | Why |
|---------|----------|-----|
| Basic Dropper | Resource | Foundation of all income |
| Conveyor Speed | Utility | +5% multiplier per level |
| Sell Value Boost | Utility | +12% multiplier per level |

### A-Tier (Core Upgrades)
| Upgrade | Category | Why |
|---------|----------|-----|
| Advanced Dropper | Resource | High flat income + 10% mult |
| Upgrader Basic | Resource | 15% multiplier stacks |
| Auto Collector | Resource | Never miss drops |

### B-Tier (Mid Game)
| Upgrade | Category | Why |
|---------|----------|-----|
| Super Dropper | Resource | Best after Rebirth I |
| Machine Gun Turret | Combat | Good passive defense |
| Storage Capacity | Utility | Slight efficiency gain |

### C-Tier (Late Game / Optional)
| Upgrade | Category | Why |
|---------|----------|-----|
| Defense upgrades | Defense | Only if you go AFK |
| Laser Cannon | Combat | Cool but expensive |
| AFK Income | Utility | Only for casual play |

## Optimal Upgrade Path

### Pre-Rebirth I (0-100K)
```
Basic Dropper (10) → Conveyor Speed (5) → Auto Collector (5) → Basic Dropper (20)
```
Total cost: ~25K | Time: 30 min

### Post-Rebirth I (100K-1M)
```
Advanced Dropper (15) → Upgrader Basic (10) → Sell Value Boost (10)
```
Total cost: ~200K | Time: 1.5 hours

### Post-Rebirth II (1M+)
```
Super Dropper (10) → Advanced Upgrader (10) → Ultra Dropper (5)
```
Total cost: ~2M | Time: 2 hours

## Use Our Optimizer

Our [Tycoon Optimizer](/rvb-tycoon/optimizer) automatically calculates the best next upgrade based on your current state.

Enter your resources and it tells you exactly what to buy!

---

*Updated January 2026*',
    'Complete upgrade priority guide for RVB Tycoon. Learn which upgrades to buy first for maximum efficiency.',
    ARRAY['rvb tycoon upgrades', 'best upgrades rvb', 'upgrade priority rvb tycoon', 'rvb tycoon dropper', 'what to upgrade'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 5: All Codes
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'codes',
    'all-codes',
    'RVB Tycoon Codes January 2026 - All Working & Expired Codes',
    'Codes List',
    '# Red VS Blue Tycoon Codes January 2026

All working and expired codes for Red VS Blue Tycoon. Updated daily!

## How to Redeem Codes

1. Launch Red VS Blue Tycoon
2. Click the **Twitter/X icon** on the side panel
3. Enter code in the text box
4. Click **Redeem**
5. Enjoy your rewards!

## Working Codes (January 2026)

| Code | Reward | Status |
|------|--------|--------|
| **NEWYEAR2026** | 50K Cash + 2x Boost | ✅ Active |
| **RVBUPDATE** | 25K Cash | ✅ Active |
| **THANKS100M** | 100K Cash | ✅ Active |
| **FREESPIN** | 3 Weapon Spins | ✅ Active |
| **COMEBACK** | 10K Cash | ✅ Active |

## Recently Expired Codes

| Code | Reward | Expired |
|------|--------|---------|
| HOLIDAY2025 | 30K Cash | Dec 2025 |
| SUMMER25 | 20K Cash | Sep 2025 |
| LAUNCH | 5K Cash | Jun 2025 |

## Code Tips

- **Follow the developers** on Twitter/X for new codes
- **Join the Discord** for exclusive codes
- Codes expire quickly - redeem immediately!
- Some codes are **case sensitive**

## Bookmark This Page

We update this page whenever new codes drop. Bookmark it and check back often!

Check out our [Beginner Guide](/rvb-tycoon/wiki/guides/beginner-guide) for tips on spending your code rewards wisely.

---

*Last checked: January 17, 2026*',
    'All working RVB Tycoon codes for January 2026. Free cash, boosts, and weapon spins. Updated daily.',
    ARRAY['rvb tycoon codes', 'red vs blue tycoon codes 2026', 'rvb codes january', 'rvb tycoon free cash', 'rvb tycoon rewards'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 6: Unit Tier List
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'tier-list',
    'unit-tier-list',
    'RVB Tycoon Unit Tier List 2026 - Best Units & Heroes Ranked',
    'Unit Tier List',
    '# Red VS Blue Tycoon Unit Tier List 2026

Complete ranking of all units and heroes in Red VS Blue Tycoon.

## Tier List Overview

| Tier | Units |
|------|-------|
| **S** | Commando, Mechatron |
| **A** | Sniper Elite, Heavy Tank, Combat Medic |
| **B** | Rifleman, Scout |
| **C** | Grunt, Turret Drone |

## S-Tier Units

### Commando
- **HP**: 500 | **DPS**: 160
- **Ability**: Airstrike every 30s
- **Unlock**: Rebirth III
- **Why S-Tier**: Airstrikes deal massive AoE damage. Game-changing.

### Mechatron
- **HP**: 1500 | **DPS**: 120 (180 in Siege Mode)
- **Ability**: Siege Mode (+50% damage, immobile)
- **Unlock**: Rebirth IV
- **Why S-Tier**: Unkillable tank with boss-level damage.

## Best Team Compositions

### Early Game (Pre-Rebirth)
- 5x Grunt (front line cannon fodder)
- 2x Turret Drone (DPS support)

### Mid Game (Rebirth I-II)
- 2x Heavy Tank (absorb damage)
- 2x Combat Medic (keep tanks alive)
- 3x Rifleman (DPS)

### Late Game (Rebirth III+)
- 1x Mechatron (anchor)
- 2x Commando (airstrike spam)
- 1x Sniper Elite (priority kills)
- 2x Combat Medic (sustain)

## Unit Comparison Table

| Unit | HP | DPS | Range | Best For |
|------|-----|-----|-------|----------|
| Mechatron | 1500 | 120 | 100 | Base defense |
| Heavy Tank | 2000 | 48 | 60 | Frontline |
| Commando | 500 | 160 | 80 | Offense |
| Sniper Elite | 200 | 100 | 200 | Sniping |
| Combat Medic | 300 | 40 | 40 | Support |
| Rifleman | 250 | 60 | 70 | All-around |
| Scout | 150 | 62.5 | 50 | Harassment |
| Grunt | 100 | 15 | 40 | Numbers |
| Turret Drone | 80 | 60 | 60 | Cheap DPS |

---

*Updated January 2026*',
    'Complete unit tier list for RVB Tycoon. All heroes and units ranked with team composition guides.',
    ARRAY['rvb tycoon units', 'rvb tycoon heroes', 'best units rvb', 'rvb unit tier list', 'rvb tycoon team comp'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 7: Zone Capture Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'zone-capture',
    'RVB Tycoon Zone Capture Guide - Tips for Winning Territory',
    'Zone Capture Guide',
    '# RVB Tycoon Zone Capture Guide 2026

Master the zone capture system to earn bonus cash and rare weapons!

## Zone Types

| Zone | Cash Reward | Weapon Drop | Spawn Rate |
|------|-------------|-------------|------------|
| Small (Green) | 500 | Uncommon (15%) | Every 2 min |
| Medium (Yellow) | 2,000 | Rare (10%) | Every 5 min |
| Large (Red) | 5,000 | Epic (5%) | Every 10 min |
| Boss Zone | 10,000 | Legendary (3%) | Every 30 min |

## Capture Mechanics

1. Stand inside the zone circle
2. Progress bar fills while you''re inside
3. Enemies inside slow your progress
4. More allies = faster capture
5. Zone is captured when bar is full

### Capture Speed Formula
```
Base Speed: 1% per second
Per Ally: +0.5% per second
Per Enemy: -0.5% per second
```

## Zone Capture Strategy

### Early Game (Weak Weapons)
- Only contest **Small zones**
- Bring 2-3 teammates
- Run if outnumbered

### Mid Game (Rare Weapons)
- Contest all zones
- Use **Sniper Rifle** to keep enemies out
- Call out zone spawns in chat

### Late Game (Legendary+)
- Camp **Boss Zones** for best rewards
- Use **LMG** or **Golden Minigun** to suppress
- Bring **Combat Medic** units

## Pro Tips

1. **Pre-position** - Zones spawn at set locations. Learn them.
2. **Numbers win** - Bring teammates for faster capture.
3. **Defensive weapons** - LMGs and Sniper Rifles dominate zones.
4. **Don''t overcommit** - If you''re losing, retreat and contest next zone.
5. **Use airstrikes** - Commando''s airstrike clears zones instantly.

## Zone Spawn Locations

Zones always spawn at one of these locations:
- Center map (most common)
- Red base entrance
- Blue base entrance
- Bridge crossing
- Mountain top (rare)

---

*Updated January 2026*',
    'Complete zone capture guide for RVB Tycoon. Learn strategies, spawn locations, and tips for winning zones.',
    ARRAY['rvb tycoon zones', 'zone capture guide rvb', 'rvb territory', 'how to capture zones rvb', 'rvb combat guide'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 8: AFK Farming Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'afk-farming',
    'RVB Tycoon AFK Farming Guide - Earn While You Sleep',
    'AFK Farming Guide',
    '# RVB Tycoon AFK Farming Guide 2026

How to maximize your idle income in Red VS Blue Tycoon.

## Setting Up for AFK

### Essential Upgrades

| Priority | Upgrade | Why |
|----------|---------|-----|
| 1 | Auto Collector | Picks up all drops automatically |
| 2 | Base Turret (Max) | Defends against enemy raids |
| 3 | Wall Reinforcement | Survive longer |
| 4 | AFK Income | Generates resources while offline |

### Defense Setup

Your tycoon needs to survive while you''re AFK:

1. **Max out Base Turret** first
2. Add **Machine Gun Turret** for DPS
3. Upgrade **Wall Reinforcement** to at least level 15
4. Consider **Shield Generator** for Rebirth III+

## AFK Income Calculator

| Rebirth | Base Income | With AFK Upgrade | Per Hour |
|---------|-------------|------------------|----------|
| None | 100/min | 200/min | 12,000 |
| I | 150/min | 300/min | 18,000 |
| II | 200/min | 400/min | 24,000 |
| III | 300/min | 600/min | 36,000 |

## Overnight AFK Strategy

1. Before sleeping, max out all droppers
2. Ensure walls are upgraded for survival
3. Place turrets strategically
4. Check back in 6-8 hours
5. Collect ~100K+ depending on rebirth tier

## Anti-AFK System

⚠️ The game has an **anti-AFK kick** after 20 minutes of no input.

### Workarounds:
- Use an **auto-clicker** to click periodically (at your own risk)
- Check in every 15-20 minutes
- Focus on **short AFK sessions** (1-2 hours)

## Is AFK Worth It?

**Yes, but with caveats:**

✅ Good for passive income overnight
✅ Essential for casual players
❌ Active play is 5-10x faster
❌ You might get raided and lose resources

**Recommendation**: AFK while you sleep or work, but play actively when you can.

---

*Updated January 2026*',
    'Complete AFK farming guide for RVB Tycoon. Learn how to set up your tycoon for maximum idle income.',
    ARRAY['rvb tycoon afk', 'afk farming rvb', 'idle income rvb tycoon', 'rvb tycoon passive', 'rvb overnight farming'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 9: Boss Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'boss-guide',
    'RVB Tycoon Boss Guide 2026 - All Bosses & How to Beat Them',
    'Boss Guide',
    '# Red VS Blue Tycoon Boss Guide 2026

All bosses in RVB Tycoon and strategies to defeat them.

## Boss Overview

| Boss | HP | Reward | Spawn Timer |
|------|-----|--------|-------------|
| War Machine | 10,000 | 5K + Rare weapon | Every 10 min |
| Siege Tank | 50,000 | 15K + Epic weapon | Every 30 min |
| Omega Mech | 200,000 | 50K + Legendary weapon | Every 60 min |
| Final Boss | 1,000,000 | 200K + Mythic chance | Server event |

## Boss 1: War Machine

**HP**: 10,000 | **Difficulty**: Easy

### How to Beat
- Any mid-game weapon works
- Takes 1-2 players
- Just shoot and dodge attacks

### Recommended Weapons
- Assault Rifle, LMG, Sniper Rifle

---

## Boss 2: Siege Tank

**HP**: 50,000 | **Difficulty**: Medium

### How to Beat
- Bring 2-3 players
- Focus fire on weak points
- Watch out for cannon shots (AoE damage)

### Recommended Weapons
- Railgun (pierce), Rocket Launcher, LMG

---

## Boss 3: Omega Mech

**HP**: 200,000 | **Difficulty**: Hard

### How to Beat
- Need 4-5 players
- Coordinate attacks
- Bring Combat Medics for sustain
- Use Commando airstrikes

### Recommended Weapons
- Plasma Cannon, Golden Minigun, Railgun

---

## Server Event: Final Boss

**HP**: 1,000,000 | **Difficulty**: Extreme

### How to Beat
- Everyone on the server attacks
- Spawns every few hours
- Use everything you have
- Mythic weapon chance on kill

### Recommended Setup
- Full squad with Mechatrons
- Multiple Commandos for airstrike spam
- All Legendary+ weapons

## Boss Loot Table

| Boss | Common | Uncommon | Rare | Epic | Legendary |
|------|--------|----------|------|------|-----------|
| War Machine | 50% | 35% | 15% | — | — |
| Siege Tank | 30% | 30% | 30% | 10% | — |
| Omega Mech | — | 20% | 40% | 35% | 5% |
| Final Boss | — | — | 20% | 50% | 25% + 5% Mythic |

---

*Updated January 2026*',
    'Complete boss guide for RVB Tycoon. All bosses explained with strategies, weapons, and loot tables.',
    ARRAY['rvb tycoon boss', 'boss guide rvb', 'omega mech rvb', 'rvb tycoon final boss', 'how to beat boss rvb'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 10: FAQ
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'faq',
    'faq',
    'RVB Tycoon FAQ 2026 - Frequently Asked Questions',
    'FAQ',
    '# Red VS Blue Tycoon FAQ 2026

Answers to the most common questions about RVB Tycoon.

## General Questions

### What is Red VS Blue Tycoon?
A Roblox game combining tycoon building with team-based shooter combat. Build your base, upgrade droppers, and fight the other team!

### Is it free to play?
Yes! The game is 100% free. There are optional Robux purchases for cosmetics and boosts.

### How many players can play?
Servers support up to 30 players (15 per team).

---

## Gameplay Questions

### How do I earn money fast?
1. Max out droppers first
2. Add upgraders for multipliers
3. Rebirth as soon as possible
4. Capture zones for bonus cash

### What''s the best weapon?
**Golden Minigun** has the highest sustained DPS, but **Void Blade** deals true damage. Check our [Weapon Tier List](/rvb-tycoon/wiki/tier-list/best-weapons).

### When should I rebirth?
As soon as you hit the requirement. Use our [Rebirth Calculator](/rvb-tycoon/rebirth) for optimal timing.

### What resets on rebirth?
- ✅ Tycoon upgrades (reset)
- ✅ Cash (reset)
- ❌ Weapons (kept)
- ❌ Units (kept)
- ❌ Rebirth multiplier (permanent)

### How do I get Legendary weapons?
- Boss drops (5% from Omega Mech)
- Rebirth IV rewards
- Final Boss event (25% chance)

---

## Technical Questions

### Why am I lagging?
Try these fixes:
1. Lower graphics quality in settings
2. Close other programs
3. Play on a server closer to you

### My progress didn''t save!
Progress auto-saves every 2 minutes. If you lost progress:
- Don''t leave servers too quickly
- Check if you''re on the correct account

### Is there a mobile version?
Yes! RVB Tycoon works on mobile, though controls are easier on PC.

---

## Community

### Where can I find codes?
Check our [Codes page](/rvb-tycoon/wiki/codes/all-codes) - updated daily!

### How do I join a clan?
Currently no official clan system. Use Discord groups to find teammates.

### How to report bugs?
Join the official Discord and use the #bug-reports channel.

---

*Last updated: January 2026*',
    'Frequently asked questions about RVB Tycoon. Answers to gameplay, progression, and technical questions.',
    ARRAY['rvb tycoon faq', 'rvb tycoon questions', 'rvb tycoon help', 'rvb tycoon guide', 'rvb tycoon answers'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Verify inserts
SELECT game_key, category, slug, title, is_published FROM wiki_entries WHERE game_key = 'rvb_tycoon';
