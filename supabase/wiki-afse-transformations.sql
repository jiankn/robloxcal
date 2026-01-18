-- AFSE Transformations - 4篇
-- 变身系统

-- ============================================
-- Stage Four Transformation
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('afse', 'transformations', 'stage-four',
'AFSE Stage Four Transformation Guide 2026',
'Stage Four',
'Complete AFSE Stage Four transformation guide 2026. Learn how to unlock and use the powerful Stage Four form in Anime Fighting Simulator Endless.',
'# AFSE Stage Four Transformation Guide 2026

Stage Four is one of the most powerful transformations in AFSE, offering massive stat boosts and new abilities.

## Stage Four Overview

| Property | Value |
|----------|-------|
| **Type** | Power Form |
| **Tier** | S |
| **Unlock** | Quest + Level |
| **Duration** | 60 seconds |

---

## Stage Four Stat Boosts

| Stat | Boost |
|------|-------|
| Damage | +100% |
| Speed | +50% |
| Defense | +30% |

---

## How to Unlock Stage Four

1. Reach Level 100
2. Complete the Transformation Quest
3. Defeat the Stage Four Boss
4. Claim from rewards

---

## Best Uses

- Boss fights
- PvP combat
- Speed farming

---

*Last updated: January 2026*',
ARRAY['afse stage four', 'afse stage four transformation', 'afse stage 4 guide', 'how to get stage four afse', 'afse best transformation'],
'{"tier": "S", "type": "transformation"}'::jsonb),

-- ============================================
-- Armored Colossus
-- ============================================
('afse', 'transformations', 'armored-colossus',
'AFSE Armored Colossus Guide - Tank Transformation 2026',
'Armored Colossus',
'Complete AFSE Armored Colossus guide 2026. Learn about this tank transformation with maximum defense in Anime Fighting Simulator Endless.',
'# AFSE Armored Colossus - Tank Transformation Guide 2026

Armored Colossus is the ultimate defensive transformation, making you nearly unkillable.

## Armored Colossus Overview

| Property | Value |
|----------|-------|
| **Type** | Defense Form |
| **Tier** | A |
| **Unlock** | Special Quest |
| **Duration** | 45 seconds |

---

## Stat Boosts

| Stat | Boost |
|------|-------|
| Defense | +200% |
| Damage | +20% |
| Speed | -30% |

---

## Best Uses

- Tanking bosses
- Surviving burst damage
- Protecting teammates

---

*Last updated: January 2026*',
ARRAY['afse armored colossus', 'afse armored colossus guide', 'afse tank transformation', 'afse defense form', 'armored colossus afse'],
'{"tier": "A", "type": "transformation"}'::jsonb),

-- ============================================
-- Kings Aura
-- ============================================
('afse', 'transformations', 'kings-aura',
'AFSE Kings Aura Guide - Conqueror Haki 2026',
'Kings Aura',
'Complete AFSE Kings Aura guide 2026. Learn about Conqueror Haki transformation in Anime Fighting Simulator Endless.',
'# AFSE Kings Aura - Conqueror Haki Guide 2026

Kings Aura is based on Conqueror Haki from One Piece, allowing you to intimidate and stun enemies.

## Kings Aura Overview

| Property | Value |
|----------|-------|
| **Type** | Intimidation |
| **Tier** | S |
| **Unlock** | Rare Drop |
| **Duration** | 30 seconds |

---

## Kings Aura Abilities

### Passive: Intimidation
Weak enemies faint automatically.

### Active: Conqueror Burst
Stun all enemies in range.
- Range: 20 meters
- Stun: 3 seconds

---

## Best Uses

- Crowd control
- PvP dominance
- Mob clearing

---

*Last updated: January 2026*',
ARRAY['afse kings aura', 'afse kings aura guide', 'afse conqueror haki', 'afse intimidation', 'kings aura transformation afse'],
'{"tier": "S", "type": "transformation"}'::jsonb),

-- ============================================
-- Transformations Guide
-- ============================================
('afse', 'transformations', 'guide',
'AFSE Transformations Guide 2026 - All Forms Explained',
'Transformations Guide',
'Complete AFSE Transformations guide 2026. Learn about all transformation forms and how to unlock them in Anime Fighting Simulator Endless.',
'# AFSE Transformations Guide 2026

Complete guide to all transformations in Anime Fighting Simulator Endless.

## All Transformations

| Name | Type | Tier |
|------|------|------|
| Stage Four | Power | S |
| Kings Aura | Intimidation | S |
| Armored Colossus | Defense | A |
| Superhum | Speed | A |
| Chakra Skeleton | Special | A |
| Basic Form | Starter | C |

---

## How Transformations Work

1. Activate with hotkey
2. Gain stat boosts
3. Access new abilities
4. Duration limited
5. Cooldown after use

---

## Best Transformation by Use

| Use Case | Best Transformation |
|----------|---------------------|
| Damage | Stage Four |
| Defense | Armored Colossus |
| CC | Kings Aura |
| Speed | Superhum |

---

## Unlocking Transformations

Most transformations require:
- Level requirements
- Quest completion
- Boss defeats
- Special items

---

*Last updated: January 2026*',
ARRAY['afse transformations guide', 'afse all transformations', 'afse best transformation 2026', 'how to transform afse', 'afse forms guide'],
'{"type": "guide"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
