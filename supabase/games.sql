-- ============================================
-- games 表：游戏注册表
-- 用于支持多游戏网络站点
-- ============================================

create table if not exists games (
  game_key text primary key,                -- 内部 key，例如 "afse"
  slug text not null unique,                -- URL slug，例如 "bomb-chip"
  display_name text not null,               -- 展示名
  short_name text,                          -- 简称（用于 title）
  platform text not null default 'roblox',
  roblox_place_id bigint,
  is_active boolean not null default true,
  theme jsonb not null default '{}'::jsonb,   -- { "accent":"#...", "icon":"..." }
  seo jsonb not null default '{}'::jsonb,     -- { "title_template":"", "description":"", "keywords":[...] }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 插入三款游戏
insert into games (game_key, slug, display_name, short_name, is_active, theme, seo)
values
  (
    'afse',
    'afse',
    'Anime Fighting Simulator: Endless',
    'AFSE',
    true,
    '{"accent": "#a855f7", "icon": "sword"}'::jsonb,
    '{"title_template": "{page} | AFSE Calculator", "description": "Free training calculator for Anime Fighting Simulator Endless. Find the best training areas and optimize your gameplay.", "keywords": ["afse calculator", "anime fighting simulator endless", "afse training"]}'::jsonb
  ),
  (
    'bomb_chip',
    'bomb-chip',
    'Bomb Chip',
    'Bomb Chip',
    true,
    '{"accent": "#ef4444", "icon": "bomb"}'::jsonb,
    '{"title_template": "{page} | Bomb Chip Calculator", "description": "Bomb Chip placement optimizer. Get the best bomb placements and odds calculator.", "keywords": ["bomb chip calculator", "bomb chip roblox", "bomb chip odds"]}'::jsonb
  ),
  (
    'brainrot',
    'craft-a-brainrot',
    'Craft a Brainrot',
    'Brainrot',
    true,
    '{"accent": "#22c55e", "icon": "coins"}'::jsonb,
    '{"title_template": "{page} | Brainrot Profit Calculator", "description": "Craft a Brainrot profit optimizer. Find the best recipes and calculate rebirth timing.", "keywords": ["craft a brainrot calculator", "brainrot profit", "brainrot rebirth"]}'::jsonb
  )
on conflict (game_key) do nothing;

-- ============================================
-- calc_samples 表：通用模块化校准样本表
-- 用于 Bomb Chip、Brainrot 等新游戏
-- ============================================

create table if not exists calc_samples (
  id bigserial primary key,
  game_key text not null references games(game_key),
  module text not null,                      -- "bombchip_strategy" | "brainrot_economy"
  version_key text not null default 'active',
  user_id uuid,
  ip_hash text,
  payload jsonb not null,                    -- 原始输入（不同模块不同结构）
  metrics jsonb not null,                    -- 观测结果（gain、win/loss、prices...）
  quality_score double precision not null default 0.5,
  is_flagged boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_calc_samples on calc_samples(game_key, module, created_at);

-- ============================================
-- published_params 表：通用发布参数表
-- 聚合后的可用参数，供计算器读取
-- ============================================

create table if not exists published_params (
  id bigserial primary key,
  game_key text not null references games(game_key),
  module text not null,
  version_key text not null default 'active',
  params jsonb not null,                      -- 聚合后的可用参数
  sample_count int not null default 0,
  confidence double precision not null default 0,
  last_aggregated_at timestamptz,
  unique (game_key, module, version_key)
);

create index if not exists idx_published_params on published_params(game_key, module);
