// DPS 计算器类型定义

// 技能类型
export interface Skill {
    id: number
    game_key: string
    skill_name: string
    skill_type: 'melee' | 'ranged' | 'special' | 'ultimate'
    base_damage: number
    damage_multiplier: number
    cooldown_sec: number
    stamina_cost?: number
    chakra_cost?: number
    description?: string
    unlock_requirement?: string
    tier: 'S' | 'A' | 'B' | 'C' | 'D'
}

// 武器类型
export interface Weapon {
    id: number
    game_key: string
    weapon_name: string
    weapon_type: 'sword' | 'fist' | 'staff' | 'special'
    base_damage: number
    attack_speed: number // 攻击每秒
    damage_multiplier: number
    range: 'melee' | 'mid' | 'long'
    tier: 'S' | 'A' | 'B' | 'C' | 'D'
    unlock_requirement?: string
}

// 变身/形态
export interface Transformation {
    id: number
    game_key: string
    form_name: string
    stat_multiplier: number
    damage_multiplier: number
    speed_boost: number
    duration_sec?: number // null = 无限
    cooldown_sec?: number
    unlock_requirement?: string
    tier: 'S' | 'A' | 'B' | 'C' | 'D'
}

// DPS 计算输入
export interface DPSInput {
    // 角色属性
    strength: number
    chakra: number
    sword: number

    // 选择的装备/技能
    weapon_id?: number
    skill_ids?: number[]
    transformation_id?: number

    // 加成
    boosts: {
        vip_damage?: boolean
        damage_gamepass?: boolean
        event_damage?: boolean
    }
}

// DPS 计算结果
export interface DPSResult {
    dps: number // 每秒伤害
    burst_damage: number // 瞬间爆发伤害

    weapon_dps: number
    skill_dps: number

    damage_multiplier: number

    breakdown: {
        base_damage: number
        stat_bonus: number
        weapon_bonus: number
        skill_bonus: number
        transformation_bonus: number
        boost_bonus: number
    }
}

// DPS 配置响应
export interface DPSConfig {
    skills: Skill[]
    weapons: Weapon[]
    transformations: Transformation[]
    version_key: string
    last_updated: string
}
