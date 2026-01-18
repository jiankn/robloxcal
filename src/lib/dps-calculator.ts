/**
 * DPS 计算器核心逻辑
 */

import type {
    Skill,
    Weapon,
    Transformation,
    DPSInput,
    DPSResult
} from './dps-types'

/**
 * 计算基础伤害
 * 基于角色属性
 */
function calculateBaseDamage(strength: number, sword: number): number {
    // 简化公式：伤害 = (力量 × 0.5 + 剑术 × 1.2) 的某个系数
    const statDamage = (strength * 0.5 + sword * 1.2)

    // 对数缩放避免数值爆炸
    if (statDamage <= 0) return 1
    return Math.pow(statDamage, 0.7)
}

/**
 * 计算加成倍率
 */
function calculateBoostMultiplier(boosts: DPSInput['boosts']): number {
    let mult = 1.0

    if (boosts.vip_damage) mult *= 1.5
    if (boosts.damage_gamepass) mult *= 2.0
    if (boosts.event_damage) mult *= 1.25

    return mult
}

/**
 * 计算武器 DPS
 */
function calculateWeaponDPS(
    weapon: Weapon | undefined,
    baseDamage: number,
    boostMult: number
): number {
    if (!weapon) return baseDamage * boostMult

    const weaponDamage = weapon.base_damage * weapon.damage_multiplier
    const attacksPerSec = weapon.attack_speed

    return (baseDamage + weaponDamage) * attacksPerSec * boostMult
}

/**
 * 计算技能 DPS
 */
function calculateSkillDPS(
    skills: Skill[],
    chakra: number,
    boostMult: number
): number {
    if (skills.length === 0) return 0

    let totalDPS = 0

    for (const skill of skills) {
        const skillDamage = skill.base_damage * skill.damage_multiplier
        // 假设技能循环使用
        const skillDPS = skillDamage / Math.max(1, skill.cooldown_sec)

        // Chakra 影响技能伤害
        const chakraBonus = 1 + Math.log10(Math.max(1, chakra)) * 0.1

        totalDPS += skillDPS * chakraBonus * boostMult
    }

    return totalDPS
}

/**
 * 计算变身加成
 */
function getTransformationMultiplier(
    transformation: Transformation | undefined
): number {
    if (!transformation) return 1.0
    return transformation.damage_multiplier
}

/**
 * 主 DPS 计算函数
 */
export function calculateDPS(
    input: DPSInput,
    weapons: Weapon[],
    skills: Skill[],
    transformations: Transformation[]
): DPSResult {
    // 获取选中的装备
    const selectedWeapon = weapons.find(w => w.id === input.weapon_id)
    const selectedSkills = skills.filter(s => input.skill_ids?.includes(s.id))
    const selectedTransform = transformations.find(t => t.id === input.transformation_id)

    // 计算基础伤害
    const baseDamage = calculateBaseDamage(input.strength, input.sword)

    // 计算加成倍率
    const boostMult = calculateBoostMultiplier(input.boosts)

    // 计算变身倍率
    const transformMult = getTransformationMultiplier(selectedTransform)

    // 计算武器 DPS
    const weaponDPS = calculateWeaponDPS(selectedWeapon, baseDamage, boostMult * transformMult)

    // 计算技能 DPS
    const skillDPS = calculateSkillDPS(selectedSkills, input.chakra, boostMult * transformMult)

    // 总 DPS
    const totalDPS = weaponDPS + skillDPS

    // 爆发伤害（所有技能同时释放）
    const burstDamage = selectedSkills.reduce((sum, skill) => {
        return sum + skill.base_damage * skill.damage_multiplier * boostMult * transformMult
    }, 0) + baseDamage * boostMult * transformMult

    return {
        dps: totalDPS,
        burst_damage: burstDamage,
        weapon_dps: weaponDPS,
        skill_dps: skillDPS,
        damage_multiplier: boostMult * transformMult,
        breakdown: {
            base_damage: baseDamage,
            stat_bonus: Math.pow(input.strength * 0.5 + input.sword * 1.2, 0.7) - 1,
            weapon_bonus: selectedWeapon ? selectedWeapon.base_damage * selectedWeapon.damage_multiplier : 0,
            skill_bonus: skillDPS / (boostMult * transformMult || 1),
            transformation_bonus: transformMult - 1,
            boost_bonus: boostMult - 1
        }
    }
}

/**
 * 格式化 DPS 数值
 */
export function formatDPS(dps: number): string {
    if (dps >= 1e12) return `${(dps / 1e12).toFixed(2)}T`
    if (dps >= 1e9) return `${(dps / 1e9).toFixed(2)}B`
    if (dps >= 1e6) return `${(dps / 1e6).toFixed(2)}M`
    if (dps >= 1e3) return `${(dps / 1e3).toFixed(2)}K`
    return dps.toFixed(0)
}
