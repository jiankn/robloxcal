-- Wiki 条目表
-- 用于存储所有游戏的 Wiki 内容，支持 SEO 关键词抢占

CREATE TABLE IF NOT EXISTS wiki_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_key TEXT NOT NULL CHECK (game_key IN ('afse', 'bomb_chip', 'brainrot')),
    category TEXT NOT NULL,           -- champions, fruits, recipes, strategy 等
    slug TEXT NOT NULL,               -- URL friendly 标识
    title TEXT NOT NULL,              -- 页面标题（用于 SEO）
    display_name TEXT NOT NULL,       -- 显示名称
    content TEXT,                     -- Markdown 内容
    excerpt TEXT,                     -- 摘要（用于 meta description）
    seo_keywords TEXT[] DEFAULT '{}', -- 关键词数组
    metadata JSONB DEFAULT '{}',      -- 额外数据（如稀有度、收益等）
    is_published BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(game_key, category, slug)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_wiki_game_category ON wiki_entries(game_key, category);
CREATE INDEX IF NOT EXISTS idx_wiki_slug ON wiki_entries(slug);
CREATE INDEX IF NOT EXISTS idx_wiki_published ON wiki_entries(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_wiki_keywords ON wiki_entries USING GIN(seo_keywords);

-- 启用 RLS
ALTER TABLE wiki_entries ENABLE ROW LEVEL SECURITY;

-- 公开读取策略
CREATE POLICY "Wiki entries are publicly viewable" 
    ON wiki_entries FOR SELECT 
    USING (is_published = true);

-- 更新时间触发器
CREATE OR REPLACE FUNCTION update_wiki_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wiki_updated_at
    BEFORE UPDATE ON wiki_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_wiki_updated_at();

-- ============================================
-- 首批 P0 数据：Brainrot 热门配方
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES

-- Tralalero Tralala
('brainrot', 'recipes', 'tralalero-tralala', 
'Tralalero Tralala Recipe - Craft a Brainrot Guide',
'Tralalero Tralala',
'Learn how to craft Tralalero Tralala in Craft a Brainrot. Get the exact recipe, ingredients needed, and profit stats.',
'# Tralalero Tralala

The iconic shark with Nike sneakers! One of the most popular Italian Brainrot characters.

## Recipe
| Ingredient 1 | Ingredient 2 |
|-------------|-------------|
| 🦈 Shark | 👟 Shoe |

## Stats
- **Rarity**: Common
- **Income**: Base profit tier

## Tips
This is one of the easiest brainrots to craft - perfect for beginners!',
ARRAY['tralalero tralala recipe', 'tralalero tralala craft', 'shark shoe brainrot', 'italian brainrot'],
'{"ingredients": ["shark", "shoe"], "rarity": "common"}'::jsonb),

-- Balerinna Cappucinna
('brainrot', 'recipes', 'balerinna-cappucinna',
'Balerinna Cappucinna Recipe - How to Craft',
'Balerinna Cappucinna',
'Complete guide to crafting Balerinna Cappucinna. Ingredients: Tree + Rodent + Shark + Shoe.',
'# Balerinna Cappucinna

The ballerina with a cappuccino cup for a head - a fan favorite!

## Recipe
| Ingredients |
|------------|
| 🌳 Tree |
| 🐀 Rodent |
| 🦈 Shark |
| 👟 Shoe |

## Stats
- **Rarity**: Rare
- **Ingredients needed**: 4

## Unlock Requirements
You need to unlock Tree and Rodent ingredients first.',
ARRAY['balerinna cappucinna recipe', 'balerinna cappucinna craft', 'ballerina cappuccino brainrot', 'craft a brainrot 4 ingredients'],
'{"ingredients": ["tree", "rodent", "shark", "shoe"], "rarity": "rare"}'::jsonb),

-- Bombardiro Crocodilo
('brainrot', 'recipes', 'bombardiro-crocodilo',
'Bombardiro Crocodilo Recipe & Guide',
'Bombardiro Crocodilo',
'How to craft Bombardiro Crocodilo in Craft a Brainrot. Full recipe and stats.',
'# Bombardiro Crocodilo

The explosive crocodile - one of the most iconic Italian Brainrot characters!

## Recipe
Requires the rare **Crocodilo** ingredient.

## Stats
- **Rarity**: Epic
- **Income**: High profit tier

## Notes
This brainrot was featured in many viral TikTok videos.',
ARRAY['bombardiro crocodilo recipe', 'bombardiro crocodilo craft', 'crocodile brainrot', 'epic brainrot'],
'{"rarity": "epic"}'::jsonb),

-- Tung Tung Tung Sahur
('brainrot', 'recipes', 'tung-tung-tung-sahur',
'Tung Tung Tung Sahur Recipe',
'Tung Tung Tung Sahur',
'Craft Tung Tung Tung Sahur - complete recipe guide with ingredients and stats.',
'# Tung Tung Tung Sahur

A rhythmic brainrot known for its catchy name!

## Recipe
Check the crafting table for current combinations.

## Stats
- **Rarity**: Rare
- Popular in meme compilations',
ARRAY['tung tung tung sahur recipe', 'tung tung tung sahur craft', 'sahur brainrot'],
'{"rarity": "rare"}'::jsonb),

-- Los Tralaleritos
('brainrot', 'recipes', 'los-tralaleritos',
'Los Tralaleritos Recipe - 4 Ingredient Combo',
'Los Tralaleritos',
'How to craft Los Tralaleritos using Shoe, Shark, Cactus, and Rodent.',
'# Los Tralaleritos

The group version of Tralalero!

## Recipe
| Ingredients |
|------------|
| 👟 Shoe |
| 🦈 Shark |
| 🌵 Cactus |
| 🐀 Rodent |

## Stats
- **Rarity**: Rare
- **Ingredients**: 4',
ARRAY['los tralaleritos recipe', 'los tralaleritos craft', 'shoe shark cactus rodent'],
'{"ingredients": ["shoe", "shark", "cactus", "rodent"], "rarity": "rare"}'::jsonb),

-- ============================================
-- 首批 P0 数据：AFSE Fruits
-- ============================================

-- Fruits Tier List
('afse', 'fruits', 'tier-list',
'AFSE Fruits Tier List 2026 - Best Fruits Ranked',
'Fruits Tier List',
'Complete AFSE fruits tier list for 2026. Find the best fruits for farming, PvP, and boss fights.',
'# AFSE Fruits Tier List 2026

Updated tier list for all fruits in Anime Fighting Simulator Endless.

## S Tier (Best)
- 🔴 **Rubber Fruit** - Best overall, insane damage
- 💥 **Explosion Fruit** - Great AoE
- ⚡ **Light Fruit** - Fast attacks

## A Tier (Great)
- ⛈️ **Thunder Fruit** - Excellent for farming
- 🧘 **Buddha Fruit** - Best for grinding
- 🔥 **Magma Fruit** - High damage

## B Tier (Good)
- ❄️ **Ice Fruit**
- 🌑 **Dark Fruit**
- 🌋 **Quake Fruit**

## How to Get Fruits
Roll at Doflamingo NPC using Gems.',
ARRAY['afse fruits tier list', 'afse best fruit 2026', 'afse fruit ranking', 'anime fighting simulator endless fruits'],
'{"type": "tier-list", "updated": "2026-01"}'::jsonb),

-- Thunder Fruit
('afse', 'fruits', 'thunder',
'AFSE Thunder Fruit Guide - Skills & How to Get',
'Thunder Fruit',
'Complete guide to Thunder Fruit in AFSE. Learn all skills, damage stats, and how to obtain it.',
'# Thunder Fruit

⚡ One of the best fruits for farming!

## Skills
| Skill | Damage | Range |
|-------|--------|-------|
| Lightning Bolt | 130 | 10m |
| Thunder Shockwave | 120 | 15m |
| Thunder Dragon | 35/tick | AoE |
| Thor | 60 | Single |

## Why Its Good
- Excellent AoE and crowd control
- 2 second stun on shockwave
- Perfect for mob farming

## How to Get
Roll at fruit NPC with Gems.',
ARRAY['afse thunder fruit', 'afse thunder fruit skills', 'afse thunder fruit guide', 'thunder fruit anime fighting simulator'],
'{"tier": "A", "type": "fruit"}'::jsonb),

-- Buddha Fruit
('afse', 'fruits', 'buddha',
'AFSE Buddha Fruit - Best Grinding Fruit Guide',
'Buddha Fruit',
'Buddha Fruit is the best for grinding in AFSE. Learn skills, stats and transformation details.',
'# Buddha Fruit

🧘 The BEST fruit for grinding and farming!

## Transformation
Become a giant Buddha with:
- 40% damage reduction
- 5x melee attack range
- Enhanced defense

## Skills
- **Buddha Smash** - AoE ground pound
- **Buddha Explosion** - Radial damage
- **Buddha Divine Punishment** - Ultimate

## Why Choose Buddha
Perfect for AFK farming and boss fights due to increased range.',
ARRAY['afse buddha fruit', 'afse buddha fruit guide', 'afse best grinding fruit', 'buddha fruit transformation'],
'{"tier": "A", "type": "fruit"}'::jsonb),

-- Rubber Fruit
('afse', 'fruits', 'rubber',
'AFSE Rubber Fruit - #1 S-Tier Fruit Guide',
'Rubber Fruit',
'Rubber Fruit is the best fruit in AFSE. Complete guide with all skills and why its S-tier.',
'# Rubber Fruit

🔴 Currently the #1 BEST fruit in AFSE!

## Why Its S-Tier
- Insane damage output
- Versatile for ANY playstyle
- Great for both PvP and PvE

## Skills
High damage rubber-based attacks inspired by Luffy.

## How to Get
- Roll at fruit NPC
- Fighting Pass rewards
- Trading',
ARRAY['afse rubber fruit', 'afse best fruit', 'afse rubber fruit guide', 'afse s tier fruit'],
'{"tier": "S", "type": "fruit"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
