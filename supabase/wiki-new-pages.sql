-- 新增Wiki页面
-- 更多SEO关键词覆盖

-- ============================================
-- AFSE - Explosion Fruit
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('afse', 'fruits', 'explosion',
'AFSE Explosion Fruit Guide - S-Tier AoE Fruit 2026',
'Explosion Fruit',
'Complete AFSE Explosion Fruit guide 2026. Learn all skills, why it is S-tier for farming, best AoE attacks, and how to get the Explosion Fruit in Anime Fighting Simulator Endless.',
'# AFSE Explosion Fruit - S-Tier AoE Guide 2026

The Explosion Fruit is one of the top S-tier fruits in Anime Fighting Simulator Endless (AFSE), specializing in massive area-of-effect (AoE) damage. Perfect for players who want to clear groups of enemies quickly.

## Explosion Fruit Overview

| Property | Value |
|----------|-------|
| **Tier** | S (Best) |
| **Element** | Explosive |
| **Best For** | Farming, Mob Clearing, AoE |
| **Difficulty** | Beginner-Friendly |
| **Rarity** | Legendary |

---

## Why Explosion Fruit is S-Tier

### Key Strengths

1. **Massive AoE Damage** - Every skill hits multiple enemies
2. **Great for Farming** - Clear entire mob groups instantly
3. **Strong Knockback** - Crowd control through pushback
4. **Flashy Effects** - Satisfying visual explosions
5. **Beginner Friendly** - Simple point-and-explode gameplay

---

## All Explosion Fruit Skills

### Skill 1: Bomb Toss (Z)
Throw an explosive that detonates on impact.

| Stat | Value |
|------|-------|
| Damage | 160 |
| Range | 12 meters AoE |
| Cooldown | 4 seconds |
| Type | Projectile AoE |

---

### Skill 2: Explosion Wave (X)
Create an outward blast wave.

| Stat | Value |
|------|-------|
| Damage | 200 |
| Range | 18 meters |
| Cooldown | 10 seconds |
| Type | 360 degree AoE |

---

### Skill 3: Mega Explosion (C)
Charge up a devastating blast.

| Stat | Value |
|------|-------|
| Damage | 350 |
| Range | 25 meters |
| Cooldown | 18 seconds |
| Type | Ultimate AoE |

---

## Best Farming Strategy

1. Gather enemies together
2. Use Explosion Wave to hit everything
3. Follow up with Mega Explosion
4. Clean up survivors with Bomb Toss
5. Repeat

---

## Explosion vs Other S-Tier Fruits

| Aspect | Explosion | Rubber | Light |
|--------|-----------|--------|-------|
| AoE | 5 stars | 3 stars | 3 stars |
| Single Target | 3 stars | 5 stars | 4 stars |
| Farming | 5 stars | 4 stars | 4 stars |
| PvP | 3 stars | 5 stars | 4 stars |

---

## How to Get Explosion Fruit

### Method 1: Fruit Rolling
- Legendary rarity (approximately 4% chance)
- Costs Gems per roll

### Method 2: Trading
- High trade value
- Worth other Legendary fruits

### Method 3: Fighting Pass
- Check current season rewards

---

## Frequently Asked Questions

### Is Explosion Fruit good for PvP?
It is decent but not the best. The AoE can be dodged by skilled players.

### Explosion vs Buddha for farming?
Explosion is faster for active farming. Buddha is better for AFK farming.

### Is Explosion Fruit worth getting?
Absolutely, if you focus on farming and clearing mobs quickly.

---

*Last updated: January 2026*',
ARRAY['afse explosion fruit', 'afse explosion fruit guide', 'afse best aoe fruit', 'explosion fruit skills afse', 'how to get explosion fruit afse', 'afse s tier fruit', 'anime fighting simulator explosion'],
'{"tier": "S", "type": "fruit"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();


-- ============================================
-- AFSE - Light Fruit
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('afse', 'fruits', 'light',
'AFSE Light Fruit Guide - Fastest S-Tier Fruit 2026',
'Light Fruit',
'Complete AFSE Light Fruit guide 2026. Learn all skills, why it has the fastest attack speed, best PvP strategies, and how to get the Light Fruit in Anime Fighting Simulator Endless.',
'# AFSE Light Fruit - The Fastest S-Tier Fruit 2026

The Light Fruit is one of the elite S-tier fruits in Anime Fighting Simulator Endless (AFSE), known for having the fastest attack speed in the entire game. Perfect for PvP players and those who want rapid-fire combat.

## Light Fruit Overview

| Property | Value |
|----------|-------|
| **Tier** | S (Best) |
| **Element** | Light |
| **Best For** | PvP, Speed, Chase |
| **Difficulty** | Intermediate |
| **Rarity** | Legendary |

---

## Why Light Fruit is S-Tier

### Key Strengths

1. **Fastest Attack Speed** - Unmatched attack frequency
2. **High Mobility** - Light-speed movement abilities
3. **Excellent for PvP** - Hard to hit and hard to escape
4. **Chase Potential** - Can catch any opponent
5. **Burst Damage** - Quick consecutive hits add up

---

## All Light Fruit Skills

### Skill 1: Light Beam (Z)
Fire a concentrated beam of light.

| Stat | Value |
|------|-------|
| Damage | 140 |
| Range | 20 meters |
| Cooldown | 2 seconds |
| Type | Ranged |

---

### Skill 2: Light Rush (X)
Dash forward at light speed.

| Stat | Value |
|------|-------|
| Damage | 100 |
| Range | 15 meters dash |
| Cooldown | 6 seconds |
| Type | Movement + Damage |

---

### Skill 3: Solar Barrage (C)
Rain down multiple light projectiles.

| Stat | Value |
|------|-------|
| Damage | 30 per hit x8 |
| Range | AoE |
| Cooldown | 15 seconds |
| Type | Multi-hit |

---

### Skill 4: Light Speed (V)
Become temporarily invincible while moving.

| Stat | Value |
|------|-------|
| Duration | 3 seconds |
| Cooldown | 25 seconds |
| Type | Utility |

---

## PvP Strategy with Light Fruit

### Offensive Combo
1. Light Rush to close distance
2. Light Beam for quick poke
3. Solar Barrage for burst
4. Light Speed to escape if needed

### Defensive Play
- Use Light Speed to dodge ultimates
- Light Rush can go through enemies
- Kite with Light Beam from range

---

## Light vs Other S-Tier Fruits

| Aspect | Light | Rubber | Explosion |
|--------|-------|--------|-----------|
| Speed | 5 stars | 3 stars | 3 stars |
| Damage | 4 stars | 5 stars | 4 stars |
| PvP | 4 stars | 5 stars | 3 stars |
| Farming | 4 stars | 4 stars | 5 stars |

---

## How to Get Light Fruit

### Method 1: Fruit Rolling
- Legendary rarity (approximately 4% chance)
- Requires Gems

### Method 2: Trading
- High demand for PvP players
- Good trade value

---

## Frequently Asked Questions

### Is Light Fruit the best for PvP?
It is one of the best, competing with Rubber for top PvP spot.

### Light vs Rubber - which is better?
Rubber has more damage, Light has more speed. Personal preference.

### Is Light Fruit good for farming?
Decent, but Explosion or Buddha are better choices.

---

*Last updated: January 2026*',
ARRAY['afse light fruit', 'afse light fruit guide', 'afse fastest fruit', 'light fruit skills afse', 'afse light fruit pvp', 'how to get light fruit afse', 'afse s tier fruit speed'],
'{"tier": "S", "type": "fruit"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();


-- ============================================
-- Bomb Chip - Winning Strategy Guide
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('bomb_chip', 'strategy', 'winning-guide',
'Bomb Chip Winning Strategy Guide 2026 - How to Win',
'Winning Strategy',
'Complete Bomb Chip winning strategy guide 2026. Learn the best placement patterns, probability calculations, and tips to maximize your win rate in Bomb Chip Roblox.',
'# Bomb Chip Winning Strategy Guide 2026

Want to improve your win rate in Bomb Chip? This comprehensive guide covers proven strategies, placement patterns, and probability tips to help you become a better player.

## Understanding Bomb Chip

Bomb Chip is a strategic placement game where you need to place chips while avoiding bombs. The goal is to maximize your points while minimizing bomb hits.

---

## Core Strategy Principles

### 1. Pattern Recognition
Learn common bomb placement patterns to predict safe zones.

### 2. Probability Calculation
Use the odds calculator to determine safe placement areas.

### 3. Risk Management
Know when to play safe and when to take risks.

### 4. Chip Value Understanding
Different chips have different values - prioritize high-value placements.

---

## Winning Patterns

### Safe Zone Strategy
Focus on areas with historically lower bomb rates:
- Corner positions often have different odds
- Edge positions can be safer in certain patterns
- Center positions vary by game mode

### Progressive Betting
1. Start with lower-value chips
2. Observe the pattern
3. Increase bet as you recognize the pattern
4. Cash out before high-risk phases

---

## Probability Tips

### Understanding the Odds
- Each position has calculated bomb probability
- Use our Bomb Chip Calculator to see real-time odds
- Historical data shows pattern trends

### When to Play Safe
- After consecutive wins
- When chip reserves are low
- During unfamiliar patterns

### When to Take Risks
- After multiple losses (potential pattern shift)
- When you can afford to lose
- When you spot a recognized pattern

---

## Common Mistakes to Avoid

1. **Chasing Losses** - Do not increase bets after losing
2. **Ignoring Patterns** - Pay attention to bomb placement history
3. **Overconfidence** - Even good patterns can break
4. **No Exit Strategy** - Always know when to stop

---

## Advanced Techniques

### Multi-Position Strategy
Spread chips across multiple positions to reduce variance.

### Pattern Tracking
Keep mental notes of recent bomb positions to predict future ones.

### Timing Your Plays
Some players report better results at certain times - test this yourself.

---

## Using the Calculator

Our Bomb Chip Odds Calculator helps you:
- See real-time probability for each position
- Track historical bomb placement
- Calculate expected value of placements
- Make data-driven decisions

---

## Frequently Asked Questions

### Is there a guaranteed winning strategy?
No strategy guarantees wins. These tips improve your odds over time.

### How do I use the odds calculator?
Enter your game data and the calculator shows probability for each position.

### What is the best position to place?
It depends on the current pattern - use the calculator for real-time suggestions.

---

*Last updated: January 2026*',
ARRAY['bomb chip winning strategy', 'bomb chip how to win', 'bomb chip guide', 'bomb chip tips', 'bomb chip patterns', 'bomb chip probability', 'bomb chip strategy guide 2026'],
'{"type": "strategy"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();


-- ============================================
-- Brainrot - All Recipes List
-- ============================================
INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES
('brainrot', 'recipes', 'all-recipes-list',
'Craft a Brainrot All Recipes List 2026 - Complete Guide',
'All Recipes List',
'Complete list of all Craft a Brainrot recipes 2026. Find every brainrot recipe sorted by rarity - Common, Rare, Epic, and Legendary crafts with ingredients.',
'# Craft a Brainrot All Recipes List 2026

This is the complete list of all craftable brainrots in Craft a Brainrot, organized by rarity. Use this guide to find exact ingredients for any brainrot you want to craft.

## Recipe Tiers Explained

| Rarity | Ingredients | Income |
|--------|-------------|--------|
| Common | 2 | Base |
| Rare | 3-4 | Medium |
| Epic | 4-5 | High |
| Legendary | 5+ | Highest |

---

## Common Recipes (2 Ingredients)

| Brainrot | Ingredients |
|----------|-------------|
| **Tralalero Tralala** | Shark + Shoe |
| **Trillalero Tramalima** | Cactus + Shark |
| **Basic Brainrot** | Shoe + Shoe |

---

## Rare Recipes (3-4 Ingredients)

| Brainrot | Ingredients |
|----------|-------------|
| **Balerinna Cappucinna** | Tree + Rodent + Shark + Shoe |
| **Los Tralaleritos** | Shoe + Shark + Cactus + Rodent |
| **Tung Tung Tung Sahur** | Drum + Special Ingredient |
| **Bambino Trulimero** | Tree + Rodent + Shark |

---

## Epic Recipes (4-5 Ingredients)

| Brainrot | Ingredients |
|----------|-------------|
| **Bombardiro Crocodilo** | Crocodilo + Special Ingredients |
| **Dragon Cannelloni** | Dragon + Pasta + Special |
| **Spaghetti Tualetti** | Multiple Pasta Ingredients |

---

## Legendary Recipes (5+ Ingredients)

Legendary brainrots require the most resources but offer the highest income.

| Brainrot | Difficulty |
|----------|------------|
| **Ultimate Brainrot** | Very Hard |
| **Golden Variants** | Event Only |

---

## Ingredient Unlock Levels

| Ingredient | Level Required |
|------------|----------------|
| Shark | Start |
| Shoe | Start |
| Cactus | Level 6 |
| Tree | Level 5 |
| Rodent | Level 8 |
| Crocodilo | Event/Special |

---

## Tips for Recipe Hunting

1. **Check Daily** - New recipes may be added with updates
2. **Experiment** - Try new combinations in the crafting table
3. **Use Codes** - Get free ingredients from promotional codes
4. **Trade Wisely** - Trade duplicates for ingredients you need

---

## Frequently Asked Questions

### How many recipes are there total?
There are 50+ recipes across all rarities, with new ones added in updates.

### How do I unlock new ingredients?
Level up your account and check for special event ingredients.

### What is the best recipe for beginners?
Start with Tralalero Tralala (Shark + Shoe) - easy and iconic.

---

*Last updated: January 2026*',
ARRAY['craft a brainrot all recipes', 'brainrot recipe list', 'craft a brainrot guide', 'all brainrot recipes 2026', 'brainrot crafting guide', 'craft a brainrot ingredients', 'brainrot recipe list complete'],
'{"type": "list"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
