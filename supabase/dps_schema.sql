-- ============================================
-- DPS 计算器相关数据表
-- ============================================

-- 武器表
create table if not exists weapons (
  id bigserial primary key,
  game_key text not null default 'afse',
  weapon_name text not null,
  weapon_type text not null,           -- sword/fist/staff/special
  base_damage double precision not null,
  attack_speed double precision not null default 1.0,
  damage_multiplier double precision not null default 1.0,
  range text not null default 'melee', -- melee/mid/long
  tier text not null default 'C',      -- S/A/B/C/D
  unlock_requirement text,
  created_at timestamptz not null default now()
);
create unique index if not exists uq_weapons on weapons(game_key, weapon_name);

-- 技能表
create table if not exists skills (
  id bigserial primary key,
  game_key text not null default 'afse',
  skill_name text not null,
  skill_type text not null,            -- melee/ranged/special/ultimate
  base_damage double precision not null,
  damage_multiplier double precision not null default 1.0,
  cooldown_sec double precision not null default 5.0,
  stamina_cost double precision,
  chakra_cost double precision,
  description text,
  unlock_requirement text,
  tier text not null default 'C',
  created_at timestamptz not null default now()
);
create unique index if not exists uq_skills on skills(game_key, skill_name);

-- 变身表
create table if not exists transformations (
  id bigserial primary key,
  game_key text not null default 'afse',
  form_name text not null,
  stat_multiplier double precision not null default 1.0,
  damage_multiplier double precision not null default 1.0,
  speed_boost double precision not null default 0,
  duration_sec double precision,        -- null = 无限
  cooldown_sec double precision,
  unlock_requirement text,
  tier text not null default 'C',
  created_at timestamptz not null default now()
);
create unique index if not exists uq_transformations on transformations(game_key, form_name);

-- ============================================
-- 武器种子数据
-- ============================================
insert into weapons (game_key, weapon_name, weapon_type, base_damage, attack_speed, damage_multiplier, range, tier, unlock_requirement)
values
  ('afse', 'Basic Sword', 'sword', 10, 1.0, 1.0, 'melee', 'D', null),
  ('afse', 'Iron Blade', 'sword', 50, 1.2, 1.2, 'melee', 'C', '1K Strength'),
  ('afse', 'Steel Katana', 'sword', 200, 1.5, 1.5, 'melee', 'B', '10K Sword'),
  ('afse', 'Dragon Slayer', 'sword', 1000, 1.8, 2.0, 'melee', 'A', '100K Sword'),
  ('afse', 'Divine Blade', 'sword', 5000, 2.0, 3.0, 'melee', 'S', '1M Sword'),
  ('afse', 'Starter Fist', 'fist', 5, 2.0, 0.8, 'melee', 'D', null),
  ('afse', 'Iron Gauntlet', 'fist', 30, 2.5, 1.0, 'melee', 'C', '1K Strength'),
  ('afse', 'Power Fist', 'fist', 150, 3.0, 1.5, 'melee', 'B', '50K Strength'),
  ('afse', 'Titan Crusher', 'fist', 800, 3.5, 2.5, 'melee', 'A', '500K Strength'),
  ('afse', 'Chakra Staff', 'staff', 100, 0.8, 2.0, 'mid', 'B', '10K Chakra'),
  ('afse', 'Sage Staff', 'staff', 500, 1.0, 3.0, 'long', 'A', '100K Chakra'),
  ('afse', 'Divine Staff', 'staff', 2000, 1.2, 4.0, 'long', 'S', '1M Chakra');

-- ============================================
-- 技能种子数据
-- ============================================
insert into skills (game_key, skill_name, skill_type, base_damage, damage_multiplier, cooldown_sec, chakra_cost, tier, description)
values
  ('afse', 'Basic Strike', 'melee', 100, 1.0, 1, null, 'D', 'A basic melee attack'),
  ('afse', 'Power Punch', 'melee', 500, 1.5, 3, null, 'C', 'Strong punch attack'),
  ('afse', 'Blade Storm', 'melee', 2000, 2.0, 5, null, 'B', 'Multiple sword slashes'),
  ('afse', 'Dragon Fist', 'melee', 10000, 3.0, 8, null, 'A', 'Devastating punch'),
  ('afse', 'Chakra Blast', 'ranged', 300, 1.2, 2, 100, 'C', 'Basic energy blast'),
  ('afse', 'Spirit Bomb', 'ranged', 1500, 2.0, 6, 500, 'B', 'Large energy attack'),
  ('afse', 'Divine Ray', 'ranged', 8000, 3.0, 10, 2000, 'A', 'Powerful beam attack'),
  ('afse', 'Fireball', 'special', 800, 1.5, 4, 200, 'C', 'Fire element attack'),
  ('afse', 'Lightning Strike', 'special', 3000, 2.5, 7, 800, 'B', 'Electric damage'),
  ('afse', 'Meteor Crash', 'special', 15000, 4.0, 15, 3000, 'A', 'Massive AOE damage'),
  ('afse', 'Final Flash', 'ultimate', 50000, 5.0, 30, 10000, 'S', 'Ultimate energy beam'),
  ('afse', 'Spirit Explosion', 'ultimate', 100000, 8.0, 60, 25000, 'S', 'Ultimate destruction');

-- ============================================
-- 变身种子数据
-- ============================================
insert into transformations (game_key, form_name, stat_multiplier, damage_multiplier, speed_boost, duration_sec, cooldown_sec, tier, unlock_requirement)
values
  ('afse', 'Base Form', 1.0, 1.0, 0, null, null, 'D', null),
  ('afse', 'Power Boost', 1.5, 1.5, 10, 60, 120, 'C', '10K All Stats'),
  ('afse', 'Super Form', 2.0, 2.0, 25, 90, 180, 'B', '100K All Stats'),
  ('afse', 'Ultra Form', 3.0, 3.0, 50, 120, 300, 'A', '1M All Stats'),
  ('afse', 'God Form', 5.0, 5.0, 100, 180, 600, 'S', '10M All Stats'),
  ('afse', 'Divine Form', 10.0, 10.0, 200, null, null, 'S', 'Divine Gamepass');
