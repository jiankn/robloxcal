-- ============================================
-- 更新 wiki_entries CHECK 约束以支持新游戏
-- 执行此 SQL 后再执行 wiki-rvb-tycoon.sql
-- ============================================

-- 删除旧的 CHECK 约束
ALTER TABLE wiki_entries DROP CONSTRAINT IF EXISTS wiki_entries_game_key_check;

-- 添加新的 CHECK 约束，包含 rvb_tycoon
ALTER TABLE wiki_entries ADD CONSTRAINT wiki_entries_game_key_check 
    CHECK (game_key IN ('afse', 'bomb_chip', 'brainrot', 'rvb_tycoon'));

-- 确认更新成功
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'wiki_entries_game_key_check';
