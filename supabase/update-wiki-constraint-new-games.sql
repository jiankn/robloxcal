-- ============================================
-- 更新 wiki_entries 表的 game_key 约束
-- 包含 2026年1月新增的3个游戏
-- ============================================

-- 步骤 1: 删除现有的 game_key 约束
ALTER TABLE wiki_entries DROP CONSTRAINT IF EXISTS wiki_entries_game_key_check;

-- 步骤 2: 添加新的 game_key 约束（包含所有游戏）
ALTER TABLE wiki_entries ADD CONSTRAINT wiki_entries_game_key_check 
  CHECK (game_key IN (
    -- 原有游戏
    'afse',           -- Anime Fighting Simulator Endless
    'bomb_chip',      -- Bomb Chip
    'brainrot',       -- Craft a Brainrot
    'rvb_tycoon',     -- RVB Tycoon
    'etfb',           -- Escape Tsunami For Brainrots
    'sab',            -- Steal a Brainrot
    'fishit',         -- Fish It!
    'fisch',          -- Fisch
    'bss',            -- Bee Swarm Simulator
    'gag',            -- Grow a Garden
    -- 新增游戏 (2026 Jan)
    'pvb',            -- Plants Vs Brainrots
    'forge',          -- The Forge
    'ag'              -- Anime Guardians
  ));

-- 验证约束更新
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'wiki_entries_game_key_check';
