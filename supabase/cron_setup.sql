-- ============================================
-- AFSE 定时聚合任务 - Supabase pg_cron 配置
-- 
-- 使用方法：
-- 1. 登录 Supabase Dashboard
-- 2. 进入 SQL Editor
-- 3. 执行此脚本
-- ============================================

-- 启用 pg_cron 扩展（如果尚未启用）
create extension if not exists pg_cron;

-- 授予 postgres 用户使用 cron schema 的权限
grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

-- ============================================
-- 创建聚合函数
-- ============================================
create or replace function public.aggregate_training_params()
returns jsonb
language plpgsql
security definer
as $$
declare
    v_game_key text := 'afse';
    v_version_key text;
    v_area record;
    v_sample record;
    v_updated_count int := 0;
    v_total_areas int := 0;
    v_cutoff_date timestamptz;
    v_samples_data jsonb;
    v_estimated_gains numeric[];
    v_quality_scores numeric[];
    v_base_gain numeric;
    v_confidence numeric;
    v_sample_count int;
    v_trimmed_gains numeric[];
    v_mean numeric;
    v_stddev numeric;
    v_median numeric;
begin
    -- 获取当前活跃版本
    select version_key into v_version_key
    from game_versions
    where game_key = v_game_key and status = 'active'
    order by created_at desc
    limit 1;
    
    if v_version_key is null then
        v_version_key := to_char(now(), 'YYYY-MM-DD');
    end if;
    
    -- 设置截止日期（14天前）
    v_cutoff_date := now() - interval '14 days';
    
    -- 遍历所有训练区
    for v_area in 
        select id from training_areas where game_key = v_game_key
    loop
        v_total_areas := v_total_areas + 1;
        
        -- 获取该区域的有效样本
        select 
            array_agg(observed_gain_per_min order by observed_gain_per_min),
            array_agg(quality_score),
            count(*)
        into v_estimated_gains, v_quality_scores, v_sample_count
        from training_samples
        where area_id = v_area.id
          and version_key = v_version_key
          and is_flagged = false
          and quality_score >= 0.2
          and created_at >= v_cutoff_date;
        
        -- 如果没有样本，跳过
        if v_sample_count is null or v_sample_count = 0 then
            continue;
        end if;
        
        -- 计算截尾均值（去掉头尾 10%）
        declare
            v_trim_count int;
            v_start_idx int;
            v_end_idx int;
            v_sum numeric := 0;
            v_weight_sum numeric := 0;
            i int;
        begin
            v_trim_count := greatest(1, floor(v_sample_count * 0.1)::int);
            v_start_idx := v_trim_count + 1;
            v_end_idx := v_sample_count - v_trim_count;
            
            if v_end_idx < v_start_idx then
                v_start_idx := 1;
                v_end_idx := v_sample_count;
            end if;
            
            -- 加权平均
            for i in v_start_idx..v_end_idx loop
                v_sum := v_sum + v_estimated_gains[i] * v_quality_scores[i];
                v_weight_sum := v_weight_sum + v_quality_scores[i];
            end loop;
            
            if v_weight_sum > 0 then
                v_base_gain := v_sum / v_weight_sum;
            else
                v_base_gain := v_sum / (v_end_idx - v_start_idx + 1);
            end if;
        end;
        
        -- 计算置信度
        -- conf_n = 1 - exp(-sample_count / 20)
        -- conf_var = 1 / (1 + (stddev/median)^2)
        -- confidence = 0.15 + 0.55*conf_n + 0.30*conf_var
        declare
            v_conf_n numeric;
            v_conf_var numeric;
            v_cv numeric;
        begin
            v_conf_n := 1 - exp(-v_sample_count::numeric / 20);
            
            -- 计算中位数和标准差
            select 
                percentile_cont(0.5) within group (order by val),
                stddev(val)
            into v_median, v_stddev
            from unnest(v_estimated_gains) as val;
            
            if v_median > 0 and v_stddev is not null then
                v_cv := v_stddev / v_median;
                v_conf_var := 1 / (1 + v_cv * v_cv);
            else
                v_conf_var := 1;
            end if;
            
            v_confidence := least(1, greatest(0, 0.15 + 0.55 * v_conf_n + 0.30 * v_conf_var));
        end;
        
        -- 更新或插入发布参数
        insert into training_area_params (
            game_key, version_key, area_id, 
            base_gain_per_min, sample_count, confidence, last_aggregated_at
        )
        values (
            v_game_key, v_version_key, v_area.id,
            v_base_gain, v_sample_count, v_confidence, now()
        )
        on conflict (game_key, version_key, area_id) 
        do update set
            base_gain_per_min = excluded.base_gain_per_min,
            sample_count = excluded.sample_count,
            confidence = excluded.confidence,
            last_aggregated_at = excluded.last_aggregated_at;
        
        v_updated_count := v_updated_count + 1;
    end loop;
    
    -- 返回执行结果
    return jsonb_build_object(
        'success', true,
        'message', 'Aggregation completed',
        'version_key', v_version_key,
        'updated_count', v_updated_count,
        'total_areas', v_total_areas,
        'executed_at', now()
    );
end;
$$;

-- ============================================
-- 测试聚合函数（可选）
-- ============================================
-- select public.aggregate_training_params();

-- ============================================
-- 配置 pg_cron 定时任务
-- 每 6 小时执行一次（UTC 时间：0:00, 6:00, 12:00, 18:00）
-- ============================================

-- 先删除已存在的同名任务（如果有）
select cron.unschedule('aggregate-training-params-job') 
where exists (
    select 1 from cron.job where jobname = 'aggregate-training-params-job'
);

-- 创建定时任务
select cron.schedule(
    'aggregate-training-params-job',           -- 任务名称
    '0 */6 * * *',                              -- Cron 表达式：每 6 小时
    $$select public.aggregate_training_params()$$  -- 要执行的 SQL
);

-- ============================================
-- 查看已配置的定时任务
-- ============================================
select * from cron.job;

-- ============================================
-- 查看任务执行历史（执行后才有数据）
-- ============================================
-- select * from cron.job_run_details order by start_time desc limit 10;
