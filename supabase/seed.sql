-- AFSE 训练区种子数据
-- 来源: 公开信息/社区整理
-- 注意: 这些是初始种子数据，会通过校准系统逐步更新

-- ============================================
-- Strength 训练区
-- ============================================
insert into training_areas (game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
values
  ('afse', 'strength', 'Starter Weights', 0, 1.0, 'community'),
  ('afse', 'strength', 'Heavy Weights', 100, 1.5, 'community'),
  ('afse', 'strength', 'Super Weights', 1000, 2.5, 'community'),
  ('afse', 'strength', 'Mega Weights', 10000, 5.0, 'community'),
  ('afse', 'strength', 'Ultra Weights', 100000, 10.0, 'community'),
  ('afse', 'strength', 'Divine Weights', 1000000, 25.0, 'community'),
  ('afse', 'strength', 'Legendary Weights', 10000000, 50.0, 'community'),
  ('afse', 'strength', 'Mythical Weights', 100000000, 100.0, 'community'),
  ('afse', 'strength', 'Infinite Weights', 1000000000, 250.0, 'community');

-- ============================================
-- Chakra 训练区
-- ============================================
insert into training_areas (game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
values
  ('afse', 'chakra', 'Starter Meditation', 0, 1.0, 'community'),
  ('afse', 'chakra', 'Focused Meditation', 100, 1.5, 'community'),
  ('afse', 'chakra', 'Deep Meditation', 1000, 2.5, 'community'),
  ('afse', 'chakra', 'Intense Meditation', 10000, 5.0, 'community'),
  ('afse', 'chakra', 'Spiritual Meditation', 100000, 10.0, 'community'),
  ('afse', 'chakra', 'Divine Meditation', 1000000, 25.0, 'community'),
  ('afse', 'chakra', 'Legendary Meditation', 10000000, 50.0, 'community'),
  ('afse', 'chakra', 'Mythical Meditation', 100000000, 100.0, 'community'),
  ('afse', 'chakra', 'Infinite Meditation', 1000000000, 250.0, 'community');

-- ============================================
-- Sword 训练区
-- ============================================
insert into training_areas (game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
values
  ('afse', 'sword', 'Wooden Dummy', 0, 1.0, 'community'),
  ('afse', 'sword', 'Iron Dummy', 100, 1.5, 'community'),
  ('afse', 'sword', 'Steel Dummy', 1000, 2.5, 'community'),
  ('afse', 'sword', 'Diamond Dummy', 10000, 5.0, 'community'),
  ('afse', 'sword', 'Obsidian Dummy', 100000, 10.0, 'community'),
  ('afse', 'sword', 'Divine Dummy', 1000000, 25.0, 'community'),
  ('afse', 'sword', 'Legendary Dummy', 10000000, 50.0, 'community'),
  ('afse', 'sword', 'Mythical Dummy', 100000000, 100.0, 'community'),
  ('afse', 'sword', 'Infinite Dummy', 1000000000, 250.0, 'community');

-- ============================================
-- Speed 训练区
-- ============================================
insert into training_areas (game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
values
  ('afse', 'speed', 'Starter Track', 0, 1.0, 'community'),
  ('afse', 'speed', 'Fast Track', 100, 1.5, 'community'),
  ('afse', 'speed', 'Sprint Track', 1000, 2.5, 'community'),
  ('afse', 'speed', 'Dash Track', 10000, 5.0, 'community'),
  ('afse', 'speed', 'Lightning Track', 100000, 10.0, 'community'),
  ('afse', 'speed', 'Divine Track', 1000000, 25.0, 'community'),
  ('afse', 'speed', 'Legendary Track', 10000000, 50.0, 'community'),
  ('afse', 'speed', 'Mythical Track', 100000000, 100.0, 'community'),
  ('afse', 'speed', 'Infinite Track', 1000000000, 250.0, 'community');

-- ============================================
-- Agility 训练区
-- ============================================
insert into training_areas (game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
values
  ('afse', 'agility', 'Starter Agility Course', 0, 1.0, 'community'),
  ('afse', 'agility', 'Nimble Course', 100, 1.5, 'community'),
  ('afse', 'agility', 'Swift Course', 1000, 2.5, 'community'),
  ('afse', 'agility', 'Acrobat Course', 10000, 5.0, 'community'),
  ('afse', 'agility', 'Master Course', 100000, 10.0, 'community'),
  ('afse', 'agility', 'Divine Course', 1000000, 25.0, 'community'),
  ('afse', 'agility', 'Legendary Course', 10000000, 50.0, 'community'),
  ('afse', 'agility', 'Mythical Course', 100000000, 100.0, 'community'),
  ('afse', 'agility', 'Infinite Course', 1000000000, 250.0, 'community');

-- ============================================
-- Durability 训练区
-- ============================================
insert into training_areas (game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
values
  ('afse', 'durability', 'Starter Boulder', 0, 1.0, 'community'),
  ('afse', 'durability', 'Heavy Boulder', 100, 1.5, 'community'),
  ('afse', 'durability', 'Mega Boulder', 1000, 2.5, 'community'),
  ('afse', 'durability', 'Giant Boulder', 10000, 5.0, 'community'),
  ('afse', 'durability', 'Titan Boulder', 100000, 10.0, 'community'),
  ('afse', 'durability', 'Divine Boulder', 1000000, 25.0, 'community'),
  ('afse', 'durability', 'Legendary Boulder', 10000000, 50.0, 'community'),
  ('afse', 'durability', 'Mythical Boulder', 100000000, 100.0, 'community'),
  ('afse', 'durability', 'Infinite Boulder', 1000000000, 250.0, 'community');

-- ============================================
-- Boost 来源（倍率配置）
-- ============================================
insert into boost_sources (game_key, boost_key, boost_name, value_type, value, applies_to, stack_rule, seed_source)
values
  -- 游戏通行证
  ('afse', 'vip_gamepass', 'VIP Gamepass', 'multiplier', 2.0, 'global', 'multiplicative', 'official'),
  ('afse', 'x2_stats', '2x Stats Gamepass', 'multiplier', 2.0, 'training', 'multiplicative', 'official'),
  ('afse', 'x3_stats', '3x Stats Gamepass', 'multiplier', 3.0, 'training', 'multiplicative', 'official'),
  
  -- 活动/临时加成
  ('afse', 'weekend_boost', 'Weekend Boost', 'multiplier', 1.5, 'global', 'multiplicative', 'official'),
  ('afse', 'server_boost', 'Server Boost', 'multiplier', 1.25, 'global', 'multiplicative', 'community'),
  
  -- 兑换码加成
  ('afse', 'code_boost_1.25', 'Code Boost 1.25x', 'multiplier', 1.25, 'global', 'multiplicative', 'community'),
  ('afse', 'code_boost_1.5', 'Code Boost 1.5x', 'multiplier', 1.5, 'global', 'multiplicative', 'community'),
  ('afse', 'code_boost_2', 'Code Boost 2x', 'multiplier', 2.0, 'global', 'multiplicative', 'community'),
  ('afse', 'code_boost_3', 'Code Boost 3x', 'multiplier', 3.0, 'global', 'multiplicative', 'community'),
  
  -- Multi 上限
  ('afse', 'multi_cap_default', 'Default Multi Cap', 'cap', 131000, 'multi', 'cap', 'official'),
  
  -- No Limit 通行证
  ('afse', 'no_limit', 'No Limit Gamepass', 'multiplier', 1.0, 'cap_removal', 'cap', 'official');

-- ============================================
-- 示例兑换码
-- ============================================
insert into codes (game_key, code, description, rewards, is_active, source_url)
values
  ('afse', 'ENDLESS', 'Game Launch Celebration', '50,000 Yen + 30 Min 2x Boost', true, 'https://twitter.com/afse'),
  ('afse', 'WELCOME2026', 'Welcome 2026 Code', '25,000 Yen + 15 Min 1.5x Boost', true, 'https://twitter.com/afse');
