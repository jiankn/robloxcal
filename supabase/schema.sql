-- AFSE 工具站数据库 Schema
-- 版本: 1.0
-- 描述: 可校准训练优化器系统完整数据库结构

-- ============================================
-- 1. 游戏版本桶（解决游戏更新导致漂移）
-- ============================================
create table if not exists game_versions (
  id bigserial primary key,
  game_key text not null,                  -- e.g. "afse"
  version_key text not null,               -- e.g. "2026-01-13" or "v1.0"
  status text not null default 'active',   -- active | archived
  created_at timestamptz not null default now(),
  notes text
);
create unique index if not exists uq_game_versions on game_versions(game_key, version_key);

-- 初始化 AFSE 当前版本
insert into game_versions (game_key, version_key, status, notes)
values ('afse', '2026-01-13', 'active', '初始版本');

-- ============================================
-- 2. 训练区定义
-- ============================================
create table if not exists training_areas (
  id bigserial primary key,
  game_key text not null,
  stat_type text not null,                  -- strength/chakra/sword/speed/agility/durability
  area_name text not null,
  required_stat_value bigint not null default 0,
  seed_area_multiplier double precision,    -- 种子倍率（可空）
  seed_source text,
  created_at timestamptz not null default now()
);
create index if not exists idx_training_areas_lookup on training_areas(game_key, stat_type, required_stat_value);

-- ============================================
-- 3. Boost 来源（倍率/加成配置）
-- ============================================
create table if not exists boost_sources (
  id bigserial primary key,
  game_key text not null,
  boost_key text not null,                  -- vip_gamepass / weekend / server_boost / code_boost_2 / multi_cap_default ...
  boost_name text not null,
  value_type text not null,                 -- multiplier | percent_bonus | cap
  value double precision,
  applies_to text,                          -- global/training/...
  stack_rule text,                          -- multiplicative / add_then_multiply / cap
  seed_source text,
  created_at timestamptz not null default now()
);
create unique index if not exists uq_boost_sources on boost_sources(game_key, boost_key);

-- ============================================
-- 4. 训练观测样本（校准入口写入）
-- ============================================
create table if not exists training_samples (
  id bigserial primary key,
  game_key text not null,
  version_key text not null,                -- 外键逻辑关联 game_versions
  user_id uuid,                             -- supabase auth user id，可空（匿名）
  ip_hash text,                             -- 用于限流/防刷（不要存明文IP）
  user_agent text,
  stat_type text not null,
  area_id bigint not null references training_areas(id),
  duration_sec int not null check (duration_sec between 30 and 1800),
  start_stat numeric not null,
  end_stat numeric not null,
  observed_gain_per_min numeric not null,   -- (end-start)/(duration/60)
  boosts jsonb not null default '{}'::jsonb, -- { "vip_gamepass": true, "weekend": true, "code_boost": 2, "server_boost": true, ... }
  multi_value numeric,                       -- 玩家当前 multi（如果采集得到）
  created_at timestamptz not null default now(),
  quality_score double precision not null default 0.5,
  is_flagged boolean not null default false,
  flag_reason text
);
create index if not exists idx_samples_area_time on training_samples(game_key, version_key, area_id, created_at);

-- ============================================
-- 5. 发布参数（实时计算器只读这里）
-- ============================================
create table if not exists training_area_params (
  id bigserial primary key,
  game_key text not null,
  version_key text not null,
  area_id bigint not null references training_areas(id),
  base_gain_per_min numeric,               -- 可校准
  area_multiplier numeric,                 -- 可校准（可空）
  sample_count int not null default 0,
  confidence double precision not null default 0.0,  -- 0~1
  last_aggregated_at timestamptz,
  notes text,
  unique (game_key, version_key, area_id)
);

-- ============================================
-- 6. 用户可信度（越用越准的关键）
-- ============================================
create table if not exists user_trust (
  id bigserial primary key,
  game_key text not null,
  user_id uuid,
  ip_hash text,
  trust_score double precision not null default 0.3, -- 0~1
  sample_count int not null default 0,
  flagged_count int not null default 0,
  updated_at timestamptz not null default now(),
  unique (game_key, user_id, ip_hash)
);

-- ============================================
-- 7. 兑换码表
-- ============================================
create table if not exists codes (
  id bigserial primary key,
  game_key text not null default 'afse',
  code text not null,
  description text,
  rewards text,                             -- 奖励描述
  is_active boolean not null default true,
  expires_at timestamptz,
  source_url text,                          -- 来源链接
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists uq_codes on codes(game_key, code);

-- ============================================
-- 8. 站点配置（广告开关等）
-- ============================================
create table if not exists site_settings (
  id bigserial primary key,
  key text not null unique,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 初始化广告配置
insert into site_settings (key, value)
values 
  ('ads_enabled', 'false'::jsonb),
  ('ads_provider', '"adsense"'::jsonb),
  ('ads_client', '""'::jsonb),
  ('ads_slot_home_1', '""'::jsonb),
  ('ads_slot_sidebar_1', '""'::jsonb);
