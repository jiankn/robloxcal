-- AFSE Skills - 4篇
-- 技能系统

-- ============================================
-- Rapid Punch
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('afse', 'skills', 'rapid-punch',
'AFSE Rapid Punch Guide - Fast Attack Skill 2026',
'Rapid Punch',
'Complete AFSE Rapid Punch guide 2026. Learn about this fast multi-hit attack skill in Anime Fighting Simulator Endless.',
'# AFSE Rapid Punch - Fast Attack Guide 2026

Rapid Punch is a versatile multi-hit skill that deals fast consecutive damage.

## Rapid Punch Overview

| Property | Value |
|----------|-------|
| **Type** | Strength |
| **Hits** | 10 |
| **Damage** | 30 per hit |
| **Cooldown** | 8 seconds |

---

## Skill Stats

| Level | Total Damage | Cooldown |
|-------|--------------|----------|
| 1 | 300 | 8s |
| 5 | 500 | 7s |
| 10 | 800 | 6s |

---

## Best Uses

- Combo starter
- Consistent damage
- Breaking guards

---

*Last updated: January 2026*',
ARRAY['afse rapid punch', 'afse rapid punch guide', 'afse fast punch skill', 'rapid punch skill afse', 'afse strength skill'],
'{"type": "strength", "tier": "A"}'::jsonb),

-- ============================================
-- Serious Punch
-- ============================================
('afse', 'skills', 'serious-punch',
'AFSE Serious Punch Guide - One Punch Ultimate 2026',
'Serious Punch',
'Complete AFSE Serious Punch guide 2026. Learn about the highest damage single-hit skill in Anime Fighting Simulator Endless.',
'# AFSE Serious Punch - One Punch Ultimate Guide 2026

Serious Punch is the highest damage single-hit skill in AFSE, based on Saitama One Punch Man.

## Serious Punch Overview

| Property | Value |
|----------|-------|
| **Type** | Strength |
| **Damage** | 999 |
| **Cooldown** | 30 seconds |
| **Unlock** | Special |

---

## Why Serious Punch is Best

1. **Highest Damage** - 999 in one hit
2. **One-Shot Potential** - Can kill instantly
3. **Boss Melter** - Massive chunk damage
4. **Iconic** - One Punch Man reference

---

## Best Uses

- Boss finishing
- PvP burst
- One-shot attempts

---

*Last updated: January 2026*',
ARRAY['afse serious punch', 'afse serious punch guide', 'afse one punch skill', 'serious punch skill afse', 'afse highest damage skill'],
'{"type": "strength", "tier": "S+"}'::jsonb),

-- ============================================
-- Tornado Smash
-- ============================================
('afse', 'skills', 'tornado-smash',
'AFSE Tornado Smash Guide - AoE Skill 2026',
'Tornado Smash',
'Complete AFSE Tornado Smash guide 2026. Learn about this powerful AoE attack skill in Anime Fighting Simulator Endless.',
'# AFSE Tornado Smash - AoE Attack Guide 2026

Tornado Smash creates a powerful vortex that damages all enemies in range.

## Tornado Smash Overview

| Property | Value |
|----------|-------|
| **Type** | Strength |
| **Damage** | 200 |
| **Range** | 15 meters |
| **Cooldown** | 12 seconds |

---

## Skill Mechanics

- Creates a tornado around you
- Pulls enemies in
- Deals damage over duration
- Good for mob farming

---

## Best Uses

- Farming groups
- Crowd gathering
- AoE damage

---

*Last updated: January 2026*',
ARRAY['afse tornado smash', 'afse tornado smash guide', 'afse aoe skill', 'tornado smash skill afse', 'afse vortex attack'],
'{"type": "strength", "tier": "A"}'::jsonb),

-- ============================================
-- All Skills List
-- ============================================
('afse', 'skills', 'all-list',
'AFSE All Skills List 2026 - Complete Skill Guide',
'All Skills List',
'Complete AFSE skills list 2026. All strength, chakra, sword, and special skills in Anime Fighting Simulator Endless.',
'# AFSE All Skills List 2026

Complete guide to all skills in Anime Fighting Simulator Endless.

## Strength Skills

| Skill | Damage | Tier |
|-------|--------|------|
| Serious Punch | 999 | S+ |
| Tornado Smash | 200 | A |
| Rapid Punch | 300 | A |
| Power Strike | 150 | B |

---

## Chakra Skills

| Skill | Damage | Tier |
|-------|--------|------|
| Rasengan | 250 | S |
| Energy Beam | 180 | A |
| Chakra Burst | 150 | B |

---

## Sword Skills

| Skill | Damage | Tier |
|-------|--------|------|
| Dragon Wrath | 280 | S |
| Rabbit Slashing | 200 | A |
| Wind Cut | 120 | B |

---

## How to Unlock Skills

1. Level up your character
2. Complete skill quests
3. Purchase from NPCs
4. Trade with players

---

## Best Skills by Category

| Category | Best Skill |
|----------|------------|
| Strength | Serious Punch |
| Chakra | Rasengan |
| Sword | Dragon Wrath |

---

*Last updated: January 2026*',
ARRAY['afse all skills', 'afse skills list', 'afse skill guide 2026', 'afse best skills', 'afse strength skills', 'afse chakra skills', 'afse sword skills'],
'{"type": "list"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
