// Red VS Blue Tycoon - Complete Game Data Configuration
// 基于游戏文档和社区数据

export interface TycoonUpgrade {
    id: string
    name: string
    category: 'resource' | 'combat' | 'defense' | 'utility'
    tier: number                    // 1-10 升级等级
    baseCost: number               // 基础价格
    costMultiplier: number         // 每级价格增长倍率
    incomeBoost: number            // 每级收入增加
    incomeMultiplier: number       // 每级收入倍率
    maxLevel: number               // 最大等级
    unlockRequirement?: string     // 解锁条件
    description: string
}

export interface WeaponData {
    id: string
    name: string
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'
    baseDamage: number
    attackSpeed: number            // 每秒攻击次数
    range: number
    dropSource: string
    dropRate?: number              // 掉落率 (0-1)
    price?: number                 // 商店价格
    specialEffect?: string         // 特殊效果
    description: string
}

export interface UnitData {
    id: string
    name: string
    team: 'red' | 'blue' | 'neutral'
    tier: 'S' | 'A' | 'B' | 'C' | 'D'
    health: number
    damage: number
    attackSpeed: number
    range: number
    ability?: string
    unlockMethod: string
    description: string
}

export interface RebirthTier {
    id: string
    name: string
    requirement: number            // 需要的资源量
    incomeMultiplier: number       // 重生后的收入倍率
    bonuses: string[]              // 额外奖励
}

// ============================================
// Tycoon Upgrades - 完整数据
// ============================================
export const TYCOON_UPGRADES: TycoonUpgrade[] = [
    // ========== RESOURCE GENERATION ==========
    {
        id: 'basic-dropper',
        name: 'Basic Dropper',
        category: 'resource',
        tier: 1,
        baseCost: 100,
        costMultiplier: 1.5,
        incomeBoost: 10,
        incomeMultiplier: 1.0,
        maxLevel: 50,
        description: 'Standard resource dropper. Foundation of your income.'
    },
    {
        id: 'advanced-dropper',
        name: 'Advanced Dropper',
        category: 'resource',
        tier: 2,
        baseCost: 1500,
        costMultiplier: 1.6,
        incomeBoost: 50,
        incomeMultiplier: 1.1,
        maxLevel: 40,
        unlockRequirement: 'basic-dropper:10',
        description: 'Enhanced dropper with 10% income multiplier per level.'
    },
    {
        id: 'super-dropper',
        name: 'Super Dropper',
        category: 'resource',
        tier: 3,
        baseCost: 15000,
        costMultiplier: 1.8,
        incomeBoost: 200,
        incomeMultiplier: 1.2,
        maxLevel: 30,
        unlockRequirement: 'advanced-dropper:15',
        description: 'High-tier dropper with massive income boost.'
    },
    {
        id: 'ultra-dropper',
        name: 'Ultra Dropper',
        category: 'resource',
        tier: 4,
        baseCost: 150000,
        costMultiplier: 2.0,
        incomeBoost: 1000,
        incomeMultiplier: 1.35,
        maxLevel: 20,
        unlockRequirement: 'super-dropper:10',
        description: 'Premium dropper. Best resource generation.'
    },
    {
        id: 'upgrader-basic',
        name: 'Basic Upgrader',
        category: 'resource',
        tier: 2,
        baseCost: 2500,
        costMultiplier: 1.7,
        incomeBoost: 0,
        incomeMultiplier: 1.15,
        maxLevel: 30,
        description: 'Multiplies resource value by 15% per level.'
    },
    {
        id: 'upgrader-advanced',
        name: 'Advanced Upgrader',
        category: 'resource',
        tier: 3,
        baseCost: 25000,
        costMultiplier: 2.0,
        incomeBoost: 0,
        incomeMultiplier: 1.3,
        maxLevel: 20,
        unlockRequirement: 'upgrader-basic:10',
        description: 'Premium upgrader with 30% multiplier.'
    },
    {
        id: 'ore-processor',
        name: 'Ore Processor',
        category: 'resource',
        tier: 2,
        baseCost: 3000,
        costMultiplier: 1.6,
        incomeBoost: 75,
        incomeMultiplier: 1.08,
        maxLevel: 35,
        description: 'Processes ores for extra value.'
    },
    {
        id: 'auto-collector',
        name: 'Auto Collector',
        category: 'resource',
        tier: 1,
        baseCost: 800,
        costMultiplier: 1.4,
        incomeBoost: 25,
        incomeMultiplier: 1.0,
        maxLevel: 40,
        description: 'Automatically collects dropped resources.'
    },

    // ========== COMBAT UPGRADES ==========
    {
        id: 'base-turret',
        name: 'Base Turret',
        category: 'combat',
        tier: 1,
        baseCost: 800,
        costMultiplier: 1.5,
        incomeBoost: 5,
        incomeMultiplier: 1.0,
        maxLevel: 40,
        description: 'Basic automated defense turret.'
    },
    {
        id: 'machine-gun-turret',
        name: 'Machine Gun Turret',
        category: 'combat',
        tier: 2,
        baseCost: 5000,
        costMultiplier: 1.7,
        incomeBoost: 15,
        incomeMultiplier: 1.0,
        maxLevel: 30,
        unlockRequirement: 'base-turret:10',
        description: 'Rapid-fire turret with high DPS.'
    },
    {
        id: 'sniper-tower',
        name: 'Sniper Tower',
        category: 'combat',
        tier: 2,
        baseCost: 8000,
        costMultiplier: 1.8,
        incomeBoost: 25,
        incomeMultiplier: 1.0,
        maxLevel: 25,
        unlockRequirement: 'base-turret:5',
        description: 'Long-range precision attacks. High damage.'
    },
    {
        id: 'missile-launcher',
        name: 'Missile Launcher',
        category: 'combat',
        tier: 3,
        baseCost: 50000,
        costMultiplier: 2.0,
        incomeBoost: 50,
        incomeMultiplier: 1.0,
        maxLevel: 15,
        unlockRequirement: 'sniper-tower:10',
        description: 'Explosive AoE damage to enemy waves.'
    },
    {
        id: 'laser-cannon',
        name: 'Laser Cannon',
        category: 'combat',
        tier: 4,
        baseCost: 200000,
        costMultiplier: 2.2,
        incomeBoost: 100,
        incomeMultiplier: 1.05,
        maxLevel: 10,
        unlockRequirement: 'missile-launcher:5',
        description: 'Ultimate weapon. Pierces through enemies.'
    },
    {
        id: 'unit-barracks',
        name: 'Unit Barracks',
        category: 'combat',
        tier: 2,
        baseCost: 6000,
        costMultiplier: 1.6,
        incomeBoost: 10,
        incomeMultiplier: 1.02,
        maxLevel: 25,
        description: 'Spawns friendly units to attack enemies.'
    },

    // ========== DEFENSE UPGRADES ==========
    {
        id: 'wall-reinforcement',
        name: 'Wall Reinforcement',
        category: 'defense',
        tier: 1,
        baseCost: 600,
        costMultiplier: 1.4,
        incomeBoost: 0,
        incomeMultiplier: 1.0,
        maxLevel: 30,
        description: 'Stronger walls protect your base longer.'
    },
    {
        id: 'steel-walls',
        name: 'Steel Walls',
        category: 'defense',
        tier: 2,
        baseCost: 4000,
        costMultiplier: 1.6,
        incomeBoost: 0,
        incomeMultiplier: 1.0,
        maxLevel: 25,
        unlockRequirement: 'wall-reinforcement:10',
        description: 'Steel-reinforced walls. 3x durability.'
    },
    {
        id: 'shield-generator',
        name: 'Shield Generator',
        category: 'defense',
        tier: 3,
        baseCost: 20000,
        costMultiplier: 1.9,
        incomeBoost: 0,
        incomeMultiplier: 1.0,
        maxLevel: 15,
        unlockRequirement: 'steel-walls:10',
        description: 'Energy shield absorbs damage.'
    },
    {
        id: 'repair-drone',
        name: 'Repair Drone',
        category: 'defense',
        tier: 2,
        baseCost: 7000,
        costMultiplier: 1.7,
        incomeBoost: 0,
        incomeMultiplier: 1.0,
        maxLevel: 20,
        description: 'Automatically repairs damaged structures.'
    },
    {
        id: 'force-field',
        name: 'Force Field',
        category: 'defense',
        tier: 4,
        baseCost: 100000,
        costMultiplier: 2.1,
        incomeBoost: 0,
        incomeMultiplier: 1.0,
        maxLevel: 10,
        unlockRequirement: 'shield-generator:10',
        description: 'Ultimate protection. Blocks all damage for 5s.'
    },

    // ========== UTILITY UPGRADES ==========
    {
        id: 'conveyor-speed',
        name: 'Conveyor Speed',
        category: 'utility',
        tier: 1,
        baseCost: 500,
        costMultiplier: 1.4,
        incomeBoost: 0,
        incomeMultiplier: 1.05,
        maxLevel: 25,
        description: 'Faster conveyor = more throughput = more money.'
    },
    {
        id: 'storage-capacity',
        name: 'Storage Capacity',
        category: 'utility',
        tier: 1,
        baseCost: 400,
        costMultiplier: 1.3,
        incomeBoost: 0,
        incomeMultiplier: 1.03,
        maxLevel: 30,
        description: 'Larger storage before selling.'
    },
    {
        id: 'sell-value-boost',
        name: 'Sell Value Boost',
        category: 'utility',
        tier: 2,
        baseCost: 3500,
        costMultiplier: 1.6,
        incomeBoost: 0,
        incomeMultiplier: 1.12,
        maxLevel: 20,
        description: 'Increases sell price of all resources.'
    },
    {
        id: 'luck-enhancer',
        name: 'Luck Enhancer',
        category: 'utility',
        tier: 2,
        baseCost: 5000,
        costMultiplier: 1.7,
        incomeBoost: 0,
        incomeMultiplier: 1.08,
        maxLevel: 15,
        description: 'Increases rare drop chance and bonus events.'
    },
    {
        id: 'afk-income',
        name: 'AFK Income',
        category: 'utility',
        tier: 3,
        baseCost: 30000,
        costMultiplier: 1.9,
        incomeBoost: 100,
        incomeMultiplier: 1.0,
        maxLevel: 10,
        description: 'Earn resources even when offline.'
    },
    {
        id: 'teleporter',
        name: 'Teleporter',
        category: 'utility',
        tier: 2,
        baseCost: 8000,
        costMultiplier: 1.5,
        incomeBoost: 0,
        incomeMultiplier: 1.1,
        maxLevel: 15,
        description: 'Instantly move resources to sell point.'
    }
]

// ============================================
// Weapons Data - 完整武器库
// ============================================
export const WEAPONS_DATA: WeaponData[] = [
    // ========== COMMON ==========
    {
        id: 'starter-pistol',
        name: 'Starter Pistol',
        rarity: 'Common',
        baseDamage: 10,
        attackSpeed: 2.0,
        range: 50,
        dropSource: 'Starting Weapon',
        description: 'Basic sidearm for new players.'
    },
    {
        id: 'hunting-rifle',
        name: 'Hunting Rifle',
        rarity: 'Common',
        baseDamage: 35,
        attackSpeed: 0.8,
        range: 100,
        dropSource: 'Shop',
        price: 1000,
        description: 'Solid starter rifle with decent range.'
    },
    {
        id: 'combat-knife',
        name: 'Combat Knife',
        rarity: 'Common',
        baseDamage: 25,
        attackSpeed: 3.0,
        range: 10,
        dropSource: 'Shop',
        price: 500,
        description: 'Fast melee weapon. High risk, high reward.'
    },

    // ========== UNCOMMON ==========
    {
        id: 'assault-rifle',
        name: 'Assault Rifle',
        rarity: 'Uncommon',
        baseDamage: 25,
        attackSpeed: 3.5,
        range: 80,
        dropSource: 'Shop',
        price: 5000,
        description: 'Reliable automatic weapon. Good all-rounder.'
    },
    {
        id: 'shotgun',
        name: 'Shotgun',
        rarity: 'Uncommon',
        baseDamage: 80,
        attackSpeed: 1.2,
        range: 30,
        dropSource: 'Shop',
        price: 4500,
        description: 'Devastating at close range. 8 pellets per shot.'
    },
    {
        id: 'smg',
        name: 'SMG',
        rarity: 'Uncommon',
        baseDamage: 15,
        attackSpeed: 6.0,
        range: 50,
        dropSource: 'Shop',
        price: 4000,
        description: 'Extremely fast fire rate. Spray and pray.'
    },
    {
        id: 'crossbow',
        name: 'Crossbow',
        rarity: 'Uncommon',
        baseDamage: 60,
        attackSpeed: 0.7,
        range: 120,
        dropSource: 'Zone Capture',
        dropRate: 0.15,
        description: 'Silent and deadly. Bonus headshot damage.'
    },

    // ========== RARE ==========
    {
        id: 'sniper-rifle',
        name: 'Sniper Rifle',
        rarity: 'Rare',
        baseDamage: 150,
        attackSpeed: 0.5,
        range: 200,
        dropSource: 'Zone Capture',
        dropRate: 0.05,
        specialEffect: '2x headshot multiplier',
        description: 'One-shot potential from long range.'
    },
    {
        id: 'lmg',
        name: 'LMG',
        rarity: 'Rare',
        baseDamage: 30,
        attackSpeed: 5.0,
        range: 70,
        dropSource: 'Boss Drop',
        dropRate: 0.08,
        specialEffect: 'No reload, overheat mechanic',
        description: 'Heavy machine gun with endless ammo.'
    },
    {
        id: 'flamethrower',
        name: 'Flamethrower',
        rarity: 'Rare',
        baseDamage: 20,
        attackSpeed: 8.0,
        range: 25,
        dropSource: 'Boss Drop',
        dropRate: 0.06,
        specialEffect: 'Burn DoT: 5 DPS for 3s',
        description: 'Sets enemies on fire. Great for crowds.'
    },
    {
        id: 'grenade-launcher',
        name: 'Grenade Launcher',
        rarity: 'Rare',
        baseDamage: 100,
        attackSpeed: 0.8,
        range: 80,
        dropSource: 'Zone Capture',
        dropRate: 0.04,
        specialEffect: 'AoE explosion radius: 15 units',
        description: 'Explosive projectiles with splash damage.'
    },

    // ========== EPIC ==========
    {
        id: 'rocket-launcher',
        name: 'Rocket Launcher',
        rarity: 'Epic',
        baseDamage: 300,
        attackSpeed: 0.3,
        range: 100,
        dropSource: 'Boss Drop',
        dropRate: 0.02,
        specialEffect: 'Massive AoE, self-damage possible',
        description: 'Explosive AoE damage. Handle with care.'
    },
    {
        id: 'railgun',
        name: 'Railgun',
        rarity: 'Epic',
        baseDamage: 250,
        attackSpeed: 0.4,
        range: 180,
        dropSource: 'Rebirth III',
        specialEffect: 'Pierces through all enemies',
        description: 'Electromagnetic projectile. Ignores armor.'
    },
    {
        id: 'cryo-cannon',
        name: 'Cryo Cannon',
        rarity: 'Epic',
        baseDamage: 40,
        attackSpeed: 4.0,
        range: 40,
        dropSource: 'Limited Event',
        dropRate: 0.01,
        specialEffect: 'Slows enemies by 50% for 2s',
        description: 'Freezing beam that slows enemies.'
    },
    {
        id: 'dual-pistols',
        name: 'Dual Pistols',
        rarity: 'Epic',
        baseDamage: 35,
        attackSpeed: 4.0,
        range: 60,
        dropSource: 'Boss Drop',
        dropRate: 0.03,
        specialEffect: '+25% movement speed while equipped',
        description: 'Akimbo pistols. Style points included.'
    },

    // ========== LEGENDARY ==========
    {
        id: 'plasma-cannon',
        name: 'Plasma Cannon',
        rarity: 'Legendary',
        baseDamage: 500,
        attackSpeed: 0.8,
        range: 120,
        dropSource: 'Rebirth IV',
        specialEffect: 'Ignores 50% armor, burn DoT',
        description: 'High-tech energy weapon. Melts everything.'
    },
    {
        id: 'thunder-bow',
        name: 'Thunder Bow',
        rarity: 'Legendary',
        baseDamage: 200,
        attackSpeed: 1.2,
        range: 150,
        dropSource: 'Boss Drop',
        dropRate: 0.005,
        specialEffect: 'Chain lightning: hits 3 nearby enemies',
        description: 'Arrows charged with electricity.'
    },
    {
        id: 'gravity-hammer',
        name: 'Gravity Hammer',
        rarity: 'Legendary',
        baseDamage: 400,
        attackSpeed: 0.5,
        range: 20,
        dropSource: 'Rebirth IV',
        specialEffect: 'Knockback + stun for 1.5s',
        description: 'Massive melee weapon. Sends enemies flying.'
    },

    // ========== MYTHIC ==========
    {
        id: 'golden-minigun',
        name: 'Golden Minigun',
        rarity: 'Mythic',
        baseDamage: 45,
        attackSpeed: 12.0,
        range: 60,
        dropSource: 'Ultra Rare Drop',
        dropRate: 0.001,
        specialEffect: 'Spin-up time: 1s, then maximum carnage',
        description: 'Absurd fire rate. The ultimate flex.'
    },
    {
        id: 'void-blade',
        name: 'Void Blade',
        rarity: 'Mythic',
        baseDamage: 600,
        attackSpeed: 2.0,
        range: 15,
        dropSource: 'Rebirth V',
        specialEffect: 'Deals true damage, ignores all defense',
        description: 'A blade from another dimension. Cuts through reality.'
    },
    {
        id: 'orbital-strike',
        name: 'Orbital Strike Beacon',
        rarity: 'Mythic',
        baseDamage: 2000,
        attackSpeed: 0.05,
        range: 300,
        dropSource: 'Rebirth V',
        specialEffect: 'Calls satellite strike. 20s cooldown.',
        description: 'Request air support from space. Devastating.'
    }
]

// ============================================
// Units/Heroes Data
// ============================================
export const UNITS_DATA: UnitData[] = [
    // S-Tier
    {
        id: 'commando',
        name: 'Commando',
        team: 'neutral',
        tier: 'S',
        health: 500,
        damage: 80,
        attackSpeed: 2.0,
        range: 80,
        ability: 'Airstrike: Calls in bombing run every 30s',
        unlockMethod: 'Rebirth III',
        description: 'Elite soldier with devastating airstrikes.'
    },
    {
        id: 'mechatron',
        name: 'Mechatron',
        team: 'neutral',
        tier: 'S',
        health: 1500,
        damage: 120,
        attackSpeed: 1.0,
        range: 100,
        ability: 'Siege Mode: +50% damage, immobile',
        unlockMethod: 'Rebirth IV',
        description: 'Giant mech with extreme firepower.'
    },
    // A-Tier
    {
        id: 'sniper-elite',
        name: 'Sniper Elite',
        team: 'neutral',
        tier: 'A',
        health: 200,
        damage: 200,
        attackSpeed: 0.5,
        range: 200,
        ability: 'Headhunter: Instant kill on low HP enemies',
        unlockMethod: 'Rebirth II',
        description: 'Long-range assassin. One shot, one kill.'
    },
    {
        id: 'tank',
        name: 'Heavy Tank',
        team: 'neutral',
        tier: 'A',
        health: 2000,
        damage: 60,
        attackSpeed: 0.8,
        range: 60,
        ability: 'Armor Plating: -30% incoming damage',
        unlockMethod: 'Rebirth I',
        description: 'Slow but extremely durable frontline.'
    },
    {
        id: 'medic',
        name: 'Combat Medic',
        team: 'neutral',
        tier: 'A',
        health: 300,
        damage: 20,
        attackSpeed: 2.0,
        range: 40,
        ability: 'Heal Aura: Heals nearby allies 10 HP/s',
        unlockMethod: 'Rebirth I',
        description: 'Keeps your army alive. Essential for long fights.'
    },
    // B-Tier
    {
        id: 'rifleman',
        name: 'Rifleman',
        team: 'neutral',
        tier: 'B',
        health: 250,
        damage: 40,
        attackSpeed: 1.5,
        range: 70,
        unlockMethod: 'Shop: 5000',
        description: 'Standard infantry unit. Reliable and cheap.'
    },
    {
        id: 'scout',
        name: 'Scout',
        team: 'neutral',
        tier: 'B',
        health: 150,
        damage: 25,
        attackSpeed: 2.5,
        range: 50,
        ability: 'Speed Boost: +50% movement every 15s',
        unlockMethod: 'Shop: 3000',
        description: 'Fast recon unit. Good for early pressure.'
    },
    // C-Tier
    {
        id: 'grunt',
        name: 'Grunt',
        team: 'neutral',
        tier: 'C',
        health: 100,
        damage: 15,
        attackSpeed: 1.0,
        range: 40,
        unlockMethod: 'Starting Unit',
        description: 'Basic infantry. Strength in numbers.'
    },
    {
        id: 'turret-drone',
        name: 'Turret Drone',
        team: 'neutral',
        tier: 'C',
        health: 80,
        damage: 20,
        attackSpeed: 3.0,
        range: 60,
        unlockMethod: 'Shop: 2000',
        description: 'Deployable turret. Stationary but deadly.'
    }
]

// ============================================
// Rebirth Tiers - 完整数据
// ============================================
export const REBIRTH_TIERS: RebirthTier[] = [
    {
        id: 'rebirth-1',
        name: 'Rebirth I',
        requirement: 100000,
        incomeMultiplier: 1.5,
        bonuses: [
            'Unlock Advanced Dropper',
            'Unlock Heavy Tank unit',
            'Unlock Combat Medic unit',
            '+10% base income'
        ]
    },
    {
        id: 'rebirth-2',
        name: 'Rebirth II',
        requirement: 1000000,
        incomeMultiplier: 2.0,
        bonuses: [
            'Unlock Super Dropper',
            'Unlock Sniper Elite unit',
            '+5% Attack Speed (global)',
            '+15% base income'
        ]
    },
    {
        id: 'rebirth-3',
        name: 'Rebirth III',
        requirement: 10000000,
        incomeMultiplier: 3.0,
        bonuses: [
            'Unlock Ultra Dropper',
            'Unlock Commando unit',
            'Unlock Railgun weapon',
            '+10% Damage (global)',
            '+20% base income'
        ]
    },
    {
        id: 'rebirth-4',
        name: 'Rebirth IV',
        requirement: 100000000,
        incomeMultiplier: 5.0,
        bonuses: [
            'Unlock Mechatron unit',
            'Unlock Plasma Cannon',
            'Unlock Gravity Hammer',
            '+20% All Stats',
            '+30% base income',
            'Exclusive Red/Blue Aura'
        ]
    },
    {
        id: 'rebirth-5',
        name: 'Rebirth V',
        requirement: 1000000000,
        incomeMultiplier: 10.0,
        bonuses: [
            'Unlock Void Blade',
            'Unlock Orbital Strike',
            '+50% All Stats',
            '+50% base income',
            'Special Golden Aura',
            'Exclusive Title: "Tycoon Master"'
        ]
    }
]

// ============================================
// Rarity Colors
// ============================================
export const RARITY_COLORS: Record<WeaponData['rarity'], string> = {
    Common: 'zinc',
    Uncommon: 'green',
    Rare: 'blue',
    Epic: 'purple',
    Legendary: 'yellow',
    Mythic: 'red'
}

export const RARITY_ORDER: WeaponData['rarity'][] = [
    'Mythic', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'
]

// ============================================
// Utility Functions
// ============================================

/**
 * 计算升级到指定等级的总成本
 */
export function calculateUpgradeCost(upgrade: TycoonUpgrade, currentLevel: number, targetLevel: number): number {
    let totalCost = 0
    for (let level = currentLevel; level < targetLevel; level++) {
        totalCost += upgrade.baseCost * Math.pow(upgrade.costMultiplier, level)
    }
    return Math.floor(totalCost)
}

/**
 * 计算升级带来的收入增加
 */
export function calculateIncomeGain(upgrade: TycoonUpgrade, currentLevel: number, targetLevel: number): number {
    const levelDiff = targetLevel - currentLevel
    const flatGain = upgrade.incomeBoost * levelDiff
    const multiplierGain = Math.pow(upgrade.incomeMultiplier, levelDiff) - 1
    return flatGain + (multiplierGain * 100)
}

/**
 * 计算升级效率 (收入增加 / 成本)
 */
export function calculateEfficiency(upgrade: TycoonUpgrade, currentLevel: number): number {
    const cost = calculateUpgradeCost(upgrade, currentLevel, currentLevel + 1)
    const gain = calculateIncomeGain(upgrade, currentLevel, currentLevel + 1)
    return gain / cost
}

/**
 * 获取最佳升级推荐
 */
export function getOptimalUpgrades(
    currentLevels: Record<string, number>,
    budget: number,
    count: number = 5
): Array<{ upgrade: TycoonUpgrade; currentLevel: number; efficiency: number; cost: number }> {
    const recommendations = TYCOON_UPGRADES
        .filter(upgrade => {
            const currentLevel = currentLevels[upgrade.id] || 0
            return currentLevel < upgrade.maxLevel
        })
        .map(upgrade => {
            const currentLevel = currentLevels[upgrade.id] || 0
            const cost = calculateUpgradeCost(upgrade, currentLevel, currentLevel + 1)
            const efficiency = calculateEfficiency(upgrade, currentLevel)
            return { upgrade, currentLevel, efficiency, cost }
        })
        .filter(rec => rec.cost <= budget)
        .sort((a, b) => b.efficiency - a.efficiency)
        .slice(0, count)

    return recommendations
}

/**
 * 计算武器DPS
 */
export function calculateWeaponDPS(weapon: WeaponData): number {
    return weapon.baseDamage * weapon.attackSpeed
}

/**
 * 获取按DPS排序的武器列表
 */
export function getWeaponsByDPS(): Array<WeaponData & { dps: number }> {
    return WEAPONS_DATA
        .map(weapon => ({ ...weapon, dps: calculateWeaponDPS(weapon) }))
        .sort((a, b) => b.dps - a.dps)
}

/**
 * 计算武器性价比 (DPS per cost)
 */
export function calculateWeaponValue(weapon: WeaponData): number {
    const dps = calculateWeaponDPS(weapon)
    if (weapon.price) {
        return dps / weapon.price
    }
    if (weapon.dropRate) {
        // 使用等效稀有度作为价值
        return dps * weapon.dropRate
    }
    return dps / 100000 // 默认高价值（稀有物品）
}

/**
 * 获取按性价比排序的武器列表
 */
export function getWeaponsByValue(): Array<WeaponData & { dps: number; value: number }> {
    return WEAPONS_DATA
        .map(weapon => ({
            ...weapon,
            dps: calculateWeaponDPS(weapon),
            value: calculateWeaponValue(weapon)
        }))
        .sort((a, b) => b.value - a.value)
}

/**
 * 计算单位DPS
 */
export function calculateUnitDPS(unit: UnitData): number {
    return unit.damage * unit.attackSpeed
}
