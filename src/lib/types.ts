// AFSE 工具站类型定义

// 游戏版本
export interface GameVersion {
    id: number
    game_key: string
    version_key: string
    status: 'active' | 'archived'
    created_at: string
    notes?: string
}

// 训练区
export interface TrainingArea {
    id: number
    game_key: string
    stat_type: StatType
    area_name: string
    required_stat_value: number
    seed_area_multiplier?: number
    seed_source?: string
    created_at: string
}

// 训练区发布参数（计算器使用）
export interface TrainingAreaParams {
    id: number
    game_key: string
    version_key: string
    area_id: number
    base_gain_per_min?: number
    area_multiplier?: number
    sample_count: number
    confidence: number
    last_aggregated_at?: string
    notes?: string
}

// Boost 来源
export interface BoostSource {
    id: number
    game_key: string
    boost_key: string
    boost_name: string
    value_type: 'multiplier' | 'percent_bonus' | 'cap'
    value: number
    applies_to?: string
    stack_rule?: string
    seed_source?: string
    created_at: string
}

// 训练样本
export interface TrainingSample {
    id: number
    game_key: string
    version_key: string
    user_id?: string
    ip_hash?: string
    user_agent?: string
    stat_type: StatType
    area_id: number
    duration_sec: number
    start_stat: number
    end_stat: number
    observed_gain_per_min: number
    boosts: Record<string, boolean | number>
    multi_value?: number
    created_at: string
    quality_score: number
    is_flagged: boolean
    flag_reason?: string
}

// 用户可信度
export interface UserTrust {
    id: number
    game_key: string
    user_id?: string
    ip_hash?: string
    trust_score: number
    sample_count: number
    flagged_count: number
    updated_at: string
}

// 兑换码
export interface Code {
    id: number
    game_key: string
    code: string
    description?: string
    rewards?: string
    is_active: boolean
    expires_at?: string
    source_url?: string
    created_at: string
    updated_at: string
}

// 站点配置
export interface SiteSetting {
    id: number
    key: string
    value: unknown
    updated_at: string
}

// ==================== 计算相关类型 ====================

// Stat 类型
export type StatType = 'strength' | 'chakra' | 'sword' | 'speed' | 'agility' | 'durability'

export const STAT_TYPES: StatType[] = ['strength', 'chakra', 'sword', 'speed', 'agility', 'durability']

export const STAT_TYPE_LABELS: Record<StatType, string> = {
    strength: 'Strength',
    chakra: 'Chakra',
    sword: 'Sword',
    speed: 'Speed',
    agility: 'Agility',
    durability: 'Durability'
}

// 用户选择的 Boost
export interface BoostSelection {
    vip_gamepass?: boolean
    x2_stats?: boolean
    x3_stats?: boolean
    weekend_boost?: boolean
    server_boost?: boolean
    code_boost?: string // '1.25' | '1.5' | '2' | '3' | null
    no_limit?: boolean
}

// 计算器输入
export interface OptimizerInput {
    current_stat: number
    stat_type: StatType
    boosts: BoostSelection
    multi_value?: number
    target_stat?: number
}

// 训练区推荐结果
export interface AreaRecommendation {
    area: TrainingArea
    params?: TrainingAreaParams
    estimated_gain_per_min: number
    confidence: number
    required_stat_value: number
    is_unlocked: boolean
}

// 计算器输出
export interface OptimizerResult {
    top_areas: AreaRecommendation[]
    mult_total: number
    cap_info?: {
        cap: number | null
        hasNoLimit: boolean
    }
    minutes_to_target?: number
    data_version?: string
    last_updated?: string
}

// 校准提交
export interface CalibrationSubmission {
    stat_type: StatType
    area_id: number
    duration_sec: number
    start_stat: number
    end_stat: number
    boosts: BoostSelection
    multi_value?: number
}

// API 配置响应
export interface OptimizerConfig {
    training_areas: TrainingArea[]
    training_area_params: TrainingAreaParams[]
    boost_sources: BoostSource[]
    version_key: string
    last_updated: string
}
