-- AFSE Bloodlines - 4篇
-- 血统系统是AFSE的核心玩法

-- ============================================
-- Ripple Eyes (最稀有)
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('afse', 'bloodlines', 'ripple-eyes',
'AFSE Ripple Eyes Guide - Rarest Bloodline 0.8% 2026',
'Ripple Eyes',
'Complete AFSE Ripple Eyes guide 2026. Learn about the rarest bloodline with only 0.8% drop rate in Anime Fighting Simulator Endless.',
'# AFSE Ripple Eyes - Rarest Bloodline Guide 2026

Ripple Eyes is the rarest bloodline in Anime Fighting Simulator Endless (AFSE) with only a 0.8% chance to obtain. This legendary bloodline offers unique abilities that make it highly sought after.

## Ripple Eyes Overview

| Property | Value |
|----------|-------|
| **Rarity** | 0.8% (Rarest) |
| **Type** | Special Eyes |
| **Tier** | S+ |
| **Obtain** | Bloodline Spin |

---

## Ripple Eyes Abilities

### Passive: Ripple Vision
See through obstacles and detect hidden enemies.

### Active 1: Ripple Strike
Attack that bypasses defense.
- Damage: 250
- Ignores 50% defense

### Active 2: Ripple Dimension
Create a dimensional pocket.
- Utility: Escape tool
- Cooldown: 30 seconds

---

## Why Ripple Eyes is Best

1. **Rarest** - Only 0.8% drop rate
2. **Defense Bypass** - Ignores enemy armor
3. **Utility** - Dimension escape
4. **Trade Value** - Extremely high
5. **Prestige** - Shows dedication

---

## How to Get Ripple Eyes

- Bloodline spin (0.8% chance)
- Trading (very expensive)
- Extremely rare

---

*Last updated: January 2026*',
ARRAY['afse ripple eyes', 'afse ripple eyes guide', 'afse rarest bloodline', 'afse 0.8 bloodline', 'ripple eyes afse', 'afse best bloodline'],
'{"rarity": "0.8%", "tier": "S+", "type": "bloodline"}'::jsonb),

-- ============================================
-- Copy Eyes (Sharingan-like)
-- ============================================
('afse', 'bloodlines', 'copy-eyes',
'AFSE Copy Eyes Guide - 54% Sharingan Bloodline 2026',
'Copy Eyes',
'Complete AFSE Copy Eyes guide 2026. Learn about the Sharingan-like bloodline with copy abilities in Anime Fighting Simulator Endless.',
'# AFSE Copy Eyes - Sharingan Bloodline Guide 2026

Copy Eyes is a common but useful bloodline in AFSE based on the iconic Sharingan from Naruto. With 54% drop rate, it is accessible to most players.

## Copy Eyes Overview

| Property | Value |
|----------|-------|
| **Rarity** | 54% (Common) |
| **Type** | Sharingan |
| **Tier** | B |
| **Obtain** | Bloodline Spin |

---

## Copy Eyes Abilities

### Passive: Copy Vision
See enemy movements and predict attacks.

### Active: Mimicry
Copy the last attack used against you.
- Damage: Varies
- Cooldown: 20 seconds

---

## Why Use Copy Eyes?

1. **Accessible** - 54% is easy to get
2. **Useful Passive** - Prediction helps in PvP
3. **Fun Mechanic** - Copy enemy moves
4. **Beginner Friendly** - Good starting bloodline

---

*Last updated: January 2026*',
ARRAY['afse copy eyes', 'afse copy eyes guide', 'afse sharingan', 'afse 54% bloodline', 'copy eyes bloodline afse'],
'{"rarity": "54%", "tier": "B", "type": "bloodline"}'::jsonb),

-- ============================================
-- White Eyes (Byakugan-like)
-- ============================================
('afse', 'bloodlines', 'white-eyes',
'AFSE White Eyes Guide - 31% Byakugan Bloodline 2026',
'White Eyes',
'Complete AFSE White Eyes guide 2026. Learn about the Byakugan-like bloodline with 360 vision in Anime Fighting Simulator Endless.',
'# AFSE White Eyes - Byakugan Bloodline Guide 2026

White Eyes is a mid-tier bloodline in AFSE based on the Byakugan from Naruto. Offers 360-degree vision and chakra-based attacks.

## White Eyes Overview

| Property | Value |
|----------|-------|
| **Rarity** | 31% |
| **Type** | Byakugan |
| **Tier** | A |
| **Obtain** | Bloodline Spin |

---

## White Eyes Abilities

### Passive: 360 Vision
See in all directions, cannot be sneak attacked.

### Active: Gentle Fist
Close-range chakra strikes.
- Damage: 180
- Blocks enemy chakra

---

## Why Use White Eyes?

1. **No Sneak Attacks** - 360 vision protects you
2. **Good Damage** - Gentle Fist hits hard
3. **Mid-Rarity** - 31% is achievable
4. **PvP Useful** - Counter flanking enemies

---

*Last updated: January 2026*',
ARRAY['afse white eyes', 'afse white eyes guide', 'afse byakugan', 'afse 31% bloodline', 'white eyes bloodline afse'],
'{"rarity": "31%", "tier": "A", "type": "bloodline"}'::jsonb),

-- ============================================
-- Bloodlines Tier List
-- ============================================
('afse', 'bloodlines', 'tier-list',
'AFSE Bloodlines Tier List 2026 - Best Bloodline Ranking',
'Bloodlines Tier List',
'Complete AFSE Bloodlines tier list 2026. Ranking all bloodlines from S+ to C tier in Anime Fighting Simulator Endless.',
'# AFSE Bloodlines Tier List 2026

Complete ranking of all bloodlines in Anime Fighting Simulator Endless, organized by power and utility.

## Tier List Overview

| Tier | Bloodlines |
|------|------------|
| **S+** | Ripple Eyes |
| **S** | Itachi Copy Eyes |
| **A** | White Eyes |
| **B** | Copy Eyes |
| **C** | Basic Eyes |

---

## S+ Tier - Best Bloodlines

### Ripple Eyes (0.8%)
- Rarest bloodline
- Defense bypass
- Best overall

---

## S Tier - Excellent

### Itachi Copy Eyes (14%)
- Enhanced Sharingan
- Genjutsu abilities
- Very powerful

---

## A Tier - Good

### White Eyes (31%)
- 360 vision
- Gentle Fist attacks
- Solid choice

---

## B Tier - Average

### Copy Eyes (54%)
- Basic Sharingan
- Copy ability
- Beginner friendly

---

## How to Get Better Bloodlines

1. Keep spinning until you get rare ones
2. Trade up from common bloodlines
3. Save resources for special events
4. Use codes for free spins

---

*Last updated: January 2026*',
ARRAY['afse bloodlines tier list', 'afse best bloodline 2026', 'afse bloodline ranking', 'afse all bloodlines', 'which bloodline is best afse'],
'{"type": "tier-list"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
