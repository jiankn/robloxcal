-- ============================================
-- Red VS Blue Tycoon - 额外 Wiki 内容
-- 5篇进阶攻略
-- ============================================

-- Entry 11: PvP Combat Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'pvp-combat-guide',
    'RVB Tycoon PvP Combat Guide 2026 - Dominate the Enemy Team',
    'PvP Combat Guide',
    '# Red VS Blue Tycoon PvP Combat Guide 2026

Master the art of player vs player combat in Red VS Blue Tycoon.

## Combat Basics

### Damage Types
- **Direct**: Standard weapon damage
- **AoE**: Splash damage (Rocket Launcher, Grenade Launcher)
- **DoT**: Damage over time (Flamethrower, Plasma Cannon)
- **True**: Ignores defense (Void Blade)

### Defense Mechanics
- **Armor**: Reduces incoming damage %
- **Shields**: Absorbs damage before HP
- **Evasion**: Chance to dodge attacks (Scout special)

## Weapon Matchups

| Your Weapon | Counters | Countered By |
|-------------|----------|--------------|
| Sniper | LMG, SMG | Shotgun |
| Shotgun | SMG, Melee | Sniper, Rifle |
| LMG | Groups, Zones | Sniper |
| Rocket | Groups | Single targets |

## Team Fight Strategy

### Positioning
1. **Tanks front**: Heavy Tank, Mechatron absorb damage
2. **DPS behind**: Rifleman, Sniper Elite deal damage
3. **Support rear**: Combat Medic keeps everyone alive

### Focus Fire
Always focus the enemy **Combat Medic** first - without heals, the enemy team crumbles.

### Zone Control
- Use AoE weapons to deny zone access
- Sniper covers long sightlines
- SMG/Shotgun for close quarters

## 1v1 Tips

1. **Never stand still** - strafe constantly
2. **Reload behind cover** - timing is crucial
3. **Use abilities** - Airstrike, Speed Boost, etc.
4. **Know your range** - fight at your weapon''s optimal range

---

*Updated January 2026*',
    'Complete PvP combat guide for RVB Tycoon. Learn weapon matchups, team fight strategies, and 1v1 tips.',
    ARRAY['rvb tycoon pvp', 'rvb combat guide', 'rvb tycoon fighting', 'rvb tycoon tips', 'team battle rvb'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 12: Money Making Guide
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'money-making-guide',
    'RVB Tycoon Money Making Guide 2026 - Fastest Ways to Get Rich',
    'Money Making Guide',
    '# RVB Tycoon Money Making Guide 2026

The ultimate guide to maximizing your income in Red VS Blue Tycoon.

## Income Sources

### 1. Tycoon Droppers (Main Income)
Your primary income source. Always prioritize dropper upgrades.

| Dropper | Base Income | Max Level | Priority |
|---------|-------------|-----------|----------|
| Basic | 10/drop | 50 | ⭐⭐⭐⭐⭐ |
| Advanced | 50/drop | 40 | ⭐⭐⭐⭐ |
| Super | 200/drop | 30 | ⭐⭐⭐ |
| Ultra | 1000/drop | 20 | ⭐⭐ |

### 2. Upgraders (Multipliers)
Stack multipliers for exponential growth.

| Upgrader | Multiplier | Stacks With |
|----------|------------|-------------|
| Basic | 1.15x | Everything |
| Advanced | 1.30x | Everything |
| Sell Value | 1.12x | Sell point |

### 3. Zone Captures (Bonus)
Quick cash injections during gameplay.

| Zone | Reward | Time Investment |
|------|--------|-----------------|
| Small | 500 | 30 seconds |
| Medium | 2000 | 1 minute |
| Large | 5000 | 2 minutes |
| Boss | 10000+ | 5 minutes |

## Optimization Tips

### Multiplier Stacking
The secret to wealth: `Income = Base × Upgrader × Rebirth × Boost`

Example:
- Base: 100/min
- Basic Upgrader (Lv 10): 1.15^10 = 4x
- Rebirth II: 2x
- Code Boost: 2x
- **Final: 1600/min (16x multiplier!)**

### Time Management
1. **Active play**: Focus on upgrades + zones
2. **AFK**: Leave turrets running, collect later
3. **Codes**: Stack boosts before AFK sessions

## Money Per Hour by Stage

| Stage | Approx Income/Hour |
|-------|-------------------|
| New Player | 2K-5K |
| Rebirth I | 15K-30K |
| Rebirth II | 50K-100K |
| Rebirth III | 200K-500K |
| Rebirth IV+ | 1M+ |

## Quick Tips

✅ Always be upgrading - idle money is wasted money
✅ Use [Tycoon Optimizer](/rvb-tycoon/optimizer) for best ROI
✅ Rebirth ASAP - the multiplier compounds forever
✅ Capture zones during downtime
✅ Stack codes before long sessions

---

*Updated January 2026*',
    'Complete money making guide for RVB Tycoon. Learn the fastest ways to earn cash and optimize your income.',
    ARRAY['rvb tycoon money', 'rvb tycoon farm', 'rvb tycoon rich', 'fast cash rvb', 'rvb income guide'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 13: All Weapons List
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'database',
    'all-weapons',
    'RVB Tycoon All Weapons List 2026 - Complete Weapon Database',
    'All Weapons',
    '# Red VS Blue Tycoon - Complete Weapon List 2026

All 21 weapons in Red VS Blue Tycoon with full stats.

## Mythic Weapons (3)

| Weapon | Damage | Speed | DPS | Source |
|--------|--------|-------|-----|--------|
| Orbital Strike | 2000 | 0.05/s | 100 | Rebirth V |
| Void Blade | 600 | 2.0/s | 1200 | Rebirth V |
| Golden Minigun | 45 | 12.0/s | 540 | Ultra Rare (0.1%) |

## Legendary Weapons (3)

| Weapon | Damage | Speed | DPS | Source |
|--------|--------|-------|-----|--------|
| Plasma Cannon | 500 | 0.8/s | 400 | Rebirth IV |
| Thunder Bow | 200 | 1.2/s | 240 | Boss Drop (0.5%) |
| Gravity Hammer | 400 | 0.5/s | 200 | Rebirth IV |

## Epic Weapons (4)

| Weapon | Damage | Speed | DPS | Source |
|--------|--------|-------|-----|--------|
| Rocket Launcher | 300 | 0.3/s | 90 | Boss (2%) |
| Railgun | 250 | 0.4/s | 100 | Rebirth III |
| Cryo Cannon | 40 | 4.0/s | 160 | Limited Event |
| Dual Pistols | 35 | 4.0/s | 140 | Boss (3%) |

## Rare Weapons (4)

| Weapon | Damage | Speed | DPS | Source |
|--------|--------|-------|-----|--------|
| Sniper Rifle | 150 | 0.5/s | 75 | Zone (5%) |
| LMG | 30 | 5.0/s | 150 | Boss (8%) |
| Flamethrower | 20 | 8.0/s | 160 | Boss (6%) |
| Grenade Launcher | 100 | 0.8/s | 80 | Zone (4%) |

## Uncommon Weapons (4)

| Weapon | Damage | Speed | DPS | Source |
|--------|--------|-------|-----|--------|
| Assault Rifle | 25 | 3.5/s | 87.5 | Shop: 5K |
| Shotgun | 80 | 1.2/s | 96 | Shop: 4.5K |
| SMG | 15 | 6.0/s | 90 | Shop: 4K |
| Crossbow | 60 | 0.7/s | 42 | Zone (15%) |

## Common Weapons (3)

| Weapon | Damage | Speed | DPS | Source |
|--------|--------|-------|-----|--------|
| Starter Pistol | 10 | 2.0/s | 20 | Starting |
| Hunting Rifle | 35 | 0.8/s | 28 | Shop: 1K |
| Combat Knife | 25 | 3.0/s | 75 | Shop: 500 |

---

Use our [Weapon DPS Calculator](/rvb-tycoon/weapons) for interactive comparison!

*Updated January 2026*',
    'Complete list of all 21 weapons in RVB Tycoon with damage, speed, DPS stats, and how to obtain them.',
    ARRAY['rvb tycoon weapons list', 'rvb all weapons', 'rvb weapon stats', 'rvb tycoon gun list', 'rvb weapons database'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 14: All Units List
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'database',
    'all-units',
    'RVB Tycoon All Units List 2026 - Complete Unit Database',
    'All Units',
    '# Red VS Blue Tycoon - Complete Unit List 2026

All 9 units in Red VS Blue Tycoon with full stats and abilities.

## S-Tier Units (2)

### Commando
- **HP**: 500 | **DPS**: 160 | **Range**: 80m
- **Ability**: Airstrike every 30s
- **Unlock**: Rebirth III
- Best for: Offense, Zone clearing

### Mechatron
- **HP**: 1500 | **DPS**: 120 (180 Siege) | **Range**: 100m
- **Ability**: Siege Mode (+50% damage, immobile)
- **Unlock**: Rebirth IV
- Best for: Base defense, Boss fights

## A-Tier Units (3)

### Sniper Elite
- **HP**: 200 | **DPS**: 100 | **Range**: 200m
- **Ability**: Headhunter (instant kill low HP)
- **Unlock**: Rebirth II
- Best for: Assassinations, Long range

### Heavy Tank
- **HP**: 2000 | **DPS**: 48 | **Range**: 60m
- **Ability**: Armor Plating (-30% damage)
- **Unlock**: Rebirth I
- Best for: Frontline, Absorbing damage

### Combat Medic
- **HP**: 300 | **DPS**: 40 | **Range**: 40m
- **Ability**: Heal Aura (10 HP/s nearby)
- **Unlock**: Rebirth I
- Best for: Team support, Sustain

## B-Tier Units (2)

### Rifleman
- **HP**: 250 | **DPS**: 60 | **Range**: 70m
- **Ability**: None
- **Unlock**: Shop: 5K
- Best for: All-around, Budget option

### Scout
- **HP**: 150 | **DPS**: 62.5 | **Range**: 50m
- **Ability**: Speed Boost (+50% every 15s)
- **Unlock**: Shop: 3K
- Best for: Harassment, Fast attacks

## C-Tier Units (2)

### Grunt
- **HP**: 100 | **DPS**: 15 | **Range**: 40m
- **Ability**: None
- **Unlock**: Starting Unit
- Best for: Numbers, Early game

### Turret Drone
- **HP**: 80 | **DPS**: 60 | **Range**: 60m
- **Ability**: None (stationary)
- **Unlock**: Shop: 2K
- Best for: AFK defense, Cheap DPS

---

See our [Unit Tier List](/rvb-tycoon/tier-list) for team compositions!

*Updated January 2026*',
    'Complete list of all 9 units in RVB Tycoon with HP, DPS, abilities, and unlock methods.',
    ARRAY['rvb tycoon units list', 'rvb all units', 'rvb unit stats', 'rvb tycoon heroes', 'rvb units database'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Entry 15: Tips and Tricks
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, content, excerpt, seo_keywords, is_published)
VALUES (
    'rvb_tycoon',
    'guides',
    'tips-tricks',
    'RVB Tycoon Tips and Tricks 2026 - Pro Secrets Revealed',
    'Tips & Tricks',
    '# Red VS Blue Tycoon Tips and Tricks 2026

Pro secrets and hidden mechanics to give you the edge.

## Hidden Mechanics

### Rebirth Timer Reset
If you fail a rebirth attempt, wait 30 seconds before trying again - the game sometimes glitches otherwise.

### Conveyor Stacking
Place upgraders at the END of conveyors, not the beginning. Resources pick up ALL multipliers in sequence.

### Zone Spawn Prediction
Zones spawn in a set rotation:
1. Center → 2. Red side → 3. Blue side → 4. Bridge → 5. Mountain → Repeat

### Damage Falloff
Sniper Rifle deals 100% damage at max range but only 70% at close range. Stay back!

## Pro Tips

### Economy
1. **Never buy shop weapons** early - zone drops are free
2. **Stack codes** before long sessions for maximum boost
3. **Rebirth at EXACTLY the requirement** - no benefit to waiting

### Combat
1. **Airstrike cooldown**: 30s exactly, count it
2. **Shotgun jump shot**: Jump before firing for extra pellet spread
3. **Void Blade dash**: Attack during dodge for invincibility frames

### Tycoon
1. **Optimal dropper ratio**: 2 Basic : 1 Advanced : 1 Upgrader
2. **AFK defense**: 3 turrets minimum covers all angles
3. **Storage trick**: Overflow storage sells at 110% value

## Common Mistakes

❌ Saving money instead of upgrading
❌ Fighting zones solo (bring teammates!)
❌ Ignoring Combat Medic in team fights
❌ Waiting to rebirth
❌ Not using codes

## Secret Codes

These codes are not publicly announced:
- **SECRETBONUS** - 15K Cash (works once)
- **DEVTEST** - Testing weapon (24hr)

*Note: Secret codes expire quickly!*

---

Have a tip to share? Join our Discord!

*Updated January 2026*',
    'Pro tips and hidden tricks for RVB Tycoon. Learn secret mechanics, pro strategies, and hidden codes.',
    ARRAY['rvb tycoon tips', 'rvb tricks', 'rvb secrets', 'rvb tycoon pro', 'rvb hidden mechanics'],
    true
)
ON CONFLICT (game_key, category, slug) DO UPDATE SET
    content = EXCLUDED.content,
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    updated_at = now();

-- Verify total entries
SELECT COUNT(*) as total_rvb_entries FROM wiki_entries WHERE game_key = 'rvb_tycoon';
