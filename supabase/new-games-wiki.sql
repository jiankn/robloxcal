-- ============================================
-- 三款新游戏 Wiki 内容 SQL
-- 执行此 SQL 前，需先修改 wiki_entries 表的 CHECK 约束
-- ============================================

-- 步骤 1：修改表的 CHECK 约束（支持新游戏）
ALTER TABLE wiki_entries DROP CONSTRAINT IF EXISTS wiki_entries_game_key_check;
ALTER TABLE wiki_entries ADD CONSTRAINT wiki_entries_game_key_check 
    CHECK (game_key IN ('afse', 'bomb_chip', 'brainrot', 'rvb_tycoon', 'etfb', 'sab', 'fishit', 'fisch', 'bss', 'gag', 'pvb', 'forge', 'ag', 'bf', 'am', 'srng'));

-- ============================================
-- Blox Fruits Wiki 内容 (game_key: bf)
-- ============================================

INSERT INTO wiki_entries (game_key, category, slug, title, display_name, excerpt, content, seo_keywords, metadata) VALUES

-- Blox Fruits 新手指南
('bf', 'guides', 'beginner-guide',
'Blox Fruits Beginner Guide 2026 - How to Start & Level Up Fast',
'Beginner Guide',
'Complete Blox Fruits beginner guide 2026. Learn how to start, level up fast, get your first fruit, and avoid common mistakes.',
'# Blox Fruits Beginner Guide 2026

Welcome to Blox Fruits! This comprehensive guide will help you start your adventure and level up efficiently in the First Sea and beyond.

## Getting Started

When you first spawn in Blox Fruits, you will appear at Marine Starter Island (or Pirate Starter Island depending on your choice). As a new player at level 1, your primary goal is to start questing and gaining experience.

### Choosing Your Side: Marine vs Pirate

Your first decision is choosing between Marine and Pirate. This affects:
- **Starting Location**: Different spawn islands
- **Quests**: Different quest givers initially
- **Bounty vs Honor**: Pirates gain bounty, Marines gain honor

**Recommendation**: Choose Pirate for easier early game, as the Pirate Starter area has more forgiving enemy placements.

## Early Game Strategy (Level 1-100)

### Step 1: Complete Starter Quests
Begin by talking to the quest giver on your starting island. Your first quests involve defeating Bandits and other low-level enemies. Focus on:
- Completing quests in order
- Not skipping to higher level areas too early
- Upgrading your stats strategically

### Step 2: Stat Point Distribution
You gain 3 stat points per level. For beginners, here is the recommended distribution:
- **Melee Build**: 60% Melee, 40% Defense
- **Sword Build**: 60% Sword, 40% Defense
- **Fruit Build**: Wait until you get a good fruit, then 60% Fruit, 40% Defense

### Step 3: Getting Your First Fruit
Fruits spawn under trees across all islands every 60-120 minutes. You can also:
- Buy fruits from the Blox Fruit Dealer for money or Robux
- Roll for random fruits using in-game currency
- Trade with other players

**Tip**: Dont eat a bad fruit just because you found it! Common fruits like Bomb and Spike are not worth eating.

## Mid Game Strategy (Level 100-700)

### Moving to New Islands
As you level up, unlock access to new islands:
- **Level 100**: Jungle Island
- **Level 300**: Skylands
- **Level 375**: Prison
- **Level 625**: Colosseum

### Fighting Styles
At Jungle Island, you can learn your first fighting style: **Electric**. Fighting styles are crucial for:
- Combos with fruits
- Extra damage output
- PvP effectiveness

### Boss Battles
Bosses spawn on specific islands and drop valuable items:
- **Gorilla King** (Jungle): Drops Gorilla King Crown
- **Bobby** (Prison): Drops Black Spikey Coat
- **The Saw** (Prison): Drops Shark Necklace

## Tips for Fast Leveling

1. **Always be questing** - Never grind without a quest active
2. **Kill only quest mobs** - Dont waste time on random enemies
3. **Use 2x EXP codes** - Check for active codes regularly
4. **Group up** - Party with friends for faster mob clearing
5. **Get Buddha Fruit** - The best grinding fruit in the game

## Common Beginner Mistakes

- Eating the first fruit you find (might be bad)
- Spreading stat points across all stats (pick a focus)
- Staying on starter island too long after outleveling it
- Ignoring fighting styles
- Not using codes for free rewards

## Useful Codes for Beginners

Check our [Blox Fruits Codes](/blox-fruits/codes) page for active codes that give:
- Free EXP boosts
- In-game money
- Stat resets
- Free fruit rolls

## Whats Next?

Once you reach level 700, you can take the boat to the Second Sea where the real adventure begins with new fruits, raids, and awakening mechanics!

---

*Last updated: January 2026*',
ARRAY['blox fruits beginner guide', 'blox fruits how to start', 'blox fruits tips 2026', 'blox fruits level up fast', 'blox fruits first sea guide'],
'{"type": "guide", "difficulty": "beginner", "updated": "2026-01"}'::jsonb),

-- Blox Fruits 水果等级列表
('bf', 'fruits', 'tier-list',
'Blox Fruits Tier List 2026 - All Fruits Ranked S to F',
'Fruit Tier List',
'Complete Blox Fruits tier list 2026. All fruits ranked from S to F tier based on damage, grinding, PvP, and overall value.',
'# Blox Fruits Tier List 2026

This comprehensive tier list ranks all fruits in Blox Fruits based on multiple factors including damage output, grinding efficiency, PvP viability, and overall value. Updated for January 2026.

## S Tier - The Best Fruits

These fruits dominate in all content and are highly sought after.

### Leopard Fruit
- **Type**: Beast
- **Why S-Tier**: Highest damage in the game, insane mobility, amazing for PvP and grinding
- **Value**: 5,000,000+ (Trading)
- **Best For**: Everything - PvP, grinding, boss fights

### Dough Fruit (Awakened)
- **Type**: Special Paramecia
- **Why S-Tier**: Insane combo potential, great stuns, excellent for PvP
- **Value**: 2,800,000+
- **Best For**: PvP, combos, bounty hunting

### Dragon Fruit
- **Type**: Beast
- **Why S-Tier**: Great damage, fire breath, flight capability
- **Value**: 3,500,000+
- **Best For**: PvP, mobility, style

## A Tier - Excellent Fruits

Top-tier choices that excel in specific areas.

### Buddha Fruit
- **Type**: Mythical Zoan
- **Why A-Tier**: THE grinding fruit - giant form increases melee range by 5x
- **Value**: 1,200,000+
- **Best For**: Grinding, mob farming, raids

### Venom Fruit
- **Type**: Paramecia
- **Why A-Tier**: Incredible damage, poison stacks, good AoE
- **Value**: 2,000,000+
- **Best For**: Boss fights, grinding

### Spirit Fruit
- **Type**: Paramecia
- **Why A-Tier**: Great mobility and damage
- **Value**: 1,800,000+
- **Best For**: PvP, combos

### T-Rex Fruit
- **Type**: Beast
- **Why A-Tier**: High damage beast form
- **Value**: 2,500,000+
- **Best For**: PvP, style

## B Tier - Good Fruits

Solid choices that perform well with proper skill.

### Rumble Fruit
- **Type**: Logia
- **Why B-Tier**: Fast attacks, flight, good for PvP
- **Value**: 800,000+
- **Best For**: PvP, mobility

### Shadow Fruit
- **Type**: Paramecia
- **Why B-Tier**: Good combos, crowd control
- **Value**: 1,600,000+
- **Best For**: PvP, combos

### Magma Fruit
- **Type**: Logia
- **Why B-Tier**: High damage, good AoE
- **Value**: 600,000+
- **Best For**: Grinding, damage

### Light Fruit
- **Type**: Logia
- **Why B-Tier**: Fastest flight in game, decent damage
- **Value**: 500,000+
- **Best For**: Mobility, travel, raids

## C Tier - Average Fruits

Useable but outclassed by higher tiers.

### Flame Fruit
- **Type**: Logia
- **Why C-Tier**: Decent damage, flight, but low ceiling
- **Value**: 100,000+
- **Best For**: Early game, beginners

### Ice Fruit
- **Type**: Logia
- **Why C-Tier**: Good CC, ice walk on water
- **Value**: 200,000+
- **Best For**: Mobility, CC

### Quake Fruit
- **Type**: Paramecia
- **Why C-Tier**: AoE damage, screen shake
- **Value**: 150,000+
- **Best For**: Style, AoE

## D Tier - Below Average

Only use if you have no other options.

### Smoke Fruit
### Chop Fruit
### Spring Fruit
### Kilo Fruit

## F Tier - Worst Fruits

Avoid these fruits - they are not worth your fruit slot.

### Bomb Fruit
### Spike Fruit
### Spin Fruit

---

## How to Choose Your Fruit

**For Grinding**: Buddha > Venom > Magma
**For PvP**: Leopard > Dough > Dragon
**For Mobility**: Light > Rumble > Flame
**For Trading**: Leopard > Dragon > Dough

## Getting Fruits

1. **Natural Spawns**: Every 60-120 minutes under trees
2. **Blox Fruit Dealer**: Buy with money or Robux
3. **Random Spins**: Use in-game currency
4. **Trading**: Trade with players
5. **Events**: Special events drop rare fruits

---

*Last updated: January 2026. Tier list based on current meta.*',
ARRAY['blox fruits tier list', 'blox fruits best fruit 2026', 'blox fruits fruit ranking', 'blox fruits leopard tier', 'blox fruits fruit values'],
'{"type": "tier-list", "updated": "2026-01"}'::jsonb),

-- Blox Fruits Stat 分配指南
('bf', 'guides', 'stat-build-guide',
'Blox Fruits Stat Build Guide 2026 - Best Point Distribution',
'Stat Build Guide',
'Learn the best stat builds in Blox Fruits 2026. Optimal point distribution for Fruit, Sword, Gun, and Hybrid builds at every level.',
'# Blox Fruits Stat Build Guide 2026

Your stat distribution in Blox Fruits determines your entire playstyle. This guide covers optimal builds for every situation.

## Understanding Stats

You earn 3 stat points per level. At max level 2550, you have 7,650 total stat points to distribute across five stats:

- **Melee**: Increases fist and fighting style damage
- **Defense**: Reduces damage taken
- **Sword**: Increases sword damage
- **Gun**: Increases gun damage  
- **Fruit**: Increases devil fruit ability damage

## Best Stat Builds

### Fruit Main Build (Most Popular)

This is the most versatile and popular build for both grinding and PvP.

**Distribution:**
- Melee: 0 points (0%)
- Defense: 1,912 points (25%)
- Sword: 0 points (0%)
- Gun: 0 points (0%)
- Fruit: 5,738 points (75%)

**Why This Works:**
- Fruit abilities deal massive damage when maxed
- 25% Defense provides enough survivability
- Works with any fruit in the game
- Great for grinding and PvP

### Sword Main Build

For players who prefer sword combat over fruit abilities.

**Distribution:**
- Melee: 1,912 points (25%)
- Defense: 1,912 points (25%)
- Sword: 3,826 points (50%)
- Gun: 0 points (0%)
- Fruit: 0 points (0%)

**Why This Works:**
- High sword damage for melee combat
- Melee points buff fighting styles
- Defense keeps you alive
- Great with fruits like Buddha that enhance melee range

### Hybrid Build

A balanced approach for players who want versatility.

**Distribution:**
- Melee: 1,147 points (15%)
- Defense: 1,912 points (25%)
- Sword: 2,296 points (30%)
- Gun: 0 points (0%)
- Fruit: 2,296 points (30%)

**Why This Works:**
- Can use both swords and fruits effectively
- More flexible in combat situations
- Good for players still deciding their playstyle

### Gun Main Build

Less common but viable for gun enthusiasts.

**Distribution:**
- Melee: 0 points (0%)
- Defense: 1,912 points (25%)
- Sword: 0 points (0%)
- Gun: 5,738 points (75%)
- Fruit: 0 points (0%)

**Why This Works:**
- Gun damage becomes very high
- Works best with specific guns like Kabucha
- Unique playstyle

## Stats by Level Range

### Level 1-100 (Early Game)
- Focus: 60% Main stat, 40% Defense
- Total Points: ~300

### Level 100-700 (First Sea)
- Focus: 70% Main stat, 30% Defense  
- Start thinking about your final build

### Level 700-1500 (Second Sea)
- Focus: 75% Main stat, 25% Defense
- Your build is taking shape

### Level 1500-2550 (Third Sea + Max)
- Focus: 75% Main stat, 25% Defense
- Final optimization

## Stat Reset

If you made mistakes, you can reset your stats:
- **Stat Refund**: 2,500 Fragments
- **Codes**: Some codes give free stat resets
- **Blox Fruit Dealer**: Check for reset options

## Common Mistakes

1. **Spreading points across all stats** - Focus on 1-2 main stats only
2. **Ignoring Defense entirely** - You need some survivability
3. **Matching stats to current fruit** - Build for your final fruit goal
4. **Not resetting wrong builds** - Its better to reset early

## Tips

- Use our [Blox Fruits Stat Calculator](/blox-fruits/bf-stat-calculator) to plan your build
- Buddha users can add more melee for enhanced melee damage
- For pure grinding, max Fruit + some Defense is optimal
- For PvP, consider your combo style when choosing

---

*Last updated: January 2026*',
ARRAY['blox fruits stat build', 'blox fruits stat calculator', 'blox fruits best build 2026', 'blox fruits stat distribution', 'blox fruits fruit build'],
'{"type": "guide", "updated": "2026-01"}'::jsonb),

-- ============================================
-- Adopt Me Wiki 内容 (game_key: am)
-- ============================================

-- Adopt Me 新手指南
('am', 'guides', 'beginner-guide',
'Adopt Me Beginner Guide 2026 - Getting Started & First Pet',
'Beginner Guide',
'Complete Adopt Me beginner guide 2026. Learn how to start, get your first pet, earn money fast, and grow your pet collection.',
'# Adopt Me Beginner Guide 2026

Welcome to Adopt Me! This guide will help you understand the game mechanics and start building your pet collection.

## Understanding Adopt Me

Adopt Me is a pet collecting and trading game where you raise, trade, and collect pets. The game features:
- Over 100 different pets
- Neon and Mega Neon variations
- Trading economy
- House building and customization
- Regular updates with new pets

## Getting Started

### Your First Steps

When you first join Adopt Me:
1. Choose your character appearance
2. Spawn at Adoption Island
3. Receive a starter egg from the Nursery

### Getting Your First Pet

Visit the **Nursery** to:
- Receive free starter eggs
- Purchase eggs with Bucks (in-game money)
- See available pet eggs

**Starter Egg Contents:**
- Dog (Common)
- Cat (Common)
- Buffalo (Common)
- Otter (Common)

## How to Earn Money (Bucks)

Money is essential for buying eggs and items. Here are the best ways to earn:

### Daily Login Rewards
Log in every day to receive:
- Day 1: 50 Bucks
- Day 2: 100 Bucks
- Day 3: 150 Bucks
- And more escalating rewards...

### Completing Tasks
Take care of your pets to earn Bucks:
- Feed hungry pets
- Keep them entertained
- Put them to sleep when tired
- Give them baths

### Jobs
Work around Adopt Me Island:
- Pizza delivery
- Lemonade stand
- Paper route
- Doctor clinic

### Pro Tip: AFK Pool Method
Stand in the pool at your house while pets are out. Their needs fill automatically over time, and you earn money passively.

## Understanding Pet Rarities

Pets come in five rarity tiers:

| Rarity | Color | Example Pets |
|--------|-------|--------------|
| Common | Gray | Dog, Cat, Otter |
| Uncommon | Green | Drake, Snowman, Chocolate Labrador |
| Rare | Blue | Beaver, Bunny, Elephant |
| Ultra-Rare | Purple | Flamingo, Lion, Hedgehog |
| Legendary | Yellow | Dragon, Unicorn, Frost Dragon |

## Making Neon Pets

This is a key game mechanic. To make a Neon pet:

1. Raise 4 of the SAME pet to FULL GROWN
2. Go to the Neon Cave (under the bridge near Nursery)
3. Place all 4 pets in the neon circles
4. Your Neon pet will glow in one color!

**Full Grown Requirements:**
- Complete ~21 tasks per pet
- Takes approximately 2-3 hours per pet

Use our [Adopt Me Neon Calculator](/adopt-me/am-neon-calculator) to plan your neon-making!

## Making Mega Neon Pets

The ultimate pet achievement:

1. Make 4 NEON pets of the same type
2. Bring all 4 to the Neon Cave
3. Receive a MEGA NEON that cycles through rainbow colors!

This requires raising 16 total pets to Full Grown - a significant time investment!

## Trading Basics

Trading is the heart of Adopt Me. Key tips:

### Do
- Check values before trading
- Use our [Trade Calculator](/adopt-me/am-trade-calculator) 
- Double-check the trade window
- Know pet demand, not just rarity

### Dont
- Rush into trades
- Fall for scams
- Trade pets youre attached to
- Trust "trust trades"

### Common Scams to Avoid
- Trust trading (never do this)
- Fake link websites
- Gift card promises
- Item switching

## Pet Aging Stages

Every pet goes through six growth stages:
1. Newborn (0 tasks)
2. Junior (3 tasks)
3. Pre-Teen (6 tasks)
4. Teen (10 tasks)
5. Post-Teen (15 tasks)
6. Full Grown (21 tasks)

## First Week Goals

1. **Day 1-2**: Get familiar with the map, earn starting money
2. **Day 3-4**: Hatch your first egg, focus on aging one pet
3. **Day 5-7**: Start trading, work toward your first rare pet

## Essential Locations

- **Nursery**: Buy eggs, adopt babies
- **Hospital**: Work as doctor
- **Pizza Shop**: Delivery job
- **Campsite**: Special items
- **Neon Cave**: Make neon pets

---

*Last updated: January 2026*',
ARRAY['adopt me beginner guide', 'adopt me how to start', 'adopt me tips 2026', 'adopt me first pet', 'adopt me guide for beginners'],
'{"type": "guide", "difficulty": "beginner", "updated": "2026-01"}'::jsonb),

-- Adopt Me 宠物价值指南
('am', 'pets', 'value-guide',
'Adopt Me Pet Values 2026 - Complete Trading Value List',
'Pet Value Guide',
'Complete Adopt Me pet values list 2026. Current trading values for all legendary, ultra-rare, and rare pets including neons and mega neons.',
'# Adopt Me Pet Values 2026

This comprehensive guide covers trading values for all pets in Adopt Me. Values are based on community trading data and player demand.

## How Pet Values Work

Pet values in Adopt Me are determined by:
- **Rarity**: Legendary > Ultra-Rare > Rare
- **Demand**: How much players want the pet
- **Age**: Full Grown > Teen > Newborn
- **Neon/Mega**: Neon ≈ 3x value, Mega ≈ 12x value
- **Limited**: Pets no longer in game have higher value

## Value Tier Explained

We use a point system for easy comparison:
- 1-100: Low tier
- 100-500: Mid tier  
- 500-1000: High tier
- 1000+: Top tier

## Legendary Pet Values (Top Tier)

### Shadow Dragon
- **Normal**: 1,200 points
- **Neon**: 3,600 points
- **Mega**: 14,400 points
- **Demand**: Very High
- **Notes**: Halloween 2019 exclusive, one of the most valuable pets

### Frost Dragon
- **Normal**: 1,000 points
- **Neon**: 3,000 points
- **Mega**: 12,000 points
- **Demand**: Very High
- **Notes**: Christmas 2019 exclusive

### Bat Dragon
- **Normal**: 950 points
- **Neon**: 2,850 points
- **Mega**: 11,400 points
- **Demand**: Very High
- **Notes**: Halloween 2019 exclusive

### Giraffe
- **Normal**: 900 points
- **Neon**: 2,700 points
- **Mega**: 10,800 points
- **Demand**: High
- **Notes**: Safari Egg (no longer available)

### Owl
- **Normal**: 700 points
- **Neon**: 2,100 points
- **Mega**: 8,400 points
- **Demand**: Very High (higher than value suggests)
- **Notes**: Farm Egg exclusive

## Legendary Pet Values (High Tier)

### Parrot
- **Normal**: 550 points
- **Neon**: 1,650 points
- **Mega**: 6,600 points

### Crow
- **Normal**: 450 points
- **Neon**: 1,350 points
- **Mega**: 5,400 points

### Evil Unicorn
- **Normal**: 400 points
- **Neon**: 1,200 points
- **Mega**: 4,800 points

### Arctic Reindeer
- **Normal**: 300 points
- **Neon**: 900 points
- **Mega**: 3,600 points

## Legendary Pet Values (Mid Tier)

### Turtle
- **Normal**: 180 points
- **Demand**: Medium-High

### Kangaroo
- **Normal**: 150 points
- **Demand**: Medium

### King Bee
- **Normal**: 100 points
- **Demand**: Medium

## Legendary Pet Values (Low Tier)

### Unicorn
- **Normal**: 50 points
- **Demand**: Medium (popular with beginners)

### Dragon
- **Normal**: 45 points
- **Demand**: Low-Medium

### Golden Pets (Griffin, Dragon, Unicorn)
- **Normal**: 40-60 points
- **Demand**: Low (too many exist)

## Ultra-Rare Pet Values

### Hedgehog
- **Normal**: 200 points
- **Notes**: Christmas 2019, very sought after

### Flamingo
- **Normal**: 180 points
- **Notes**: Safari Egg exclusive

### Lion
- **Normal**: 100 points
- **Notes**: Safari Egg exclusive

### Crocodile
- **Normal**: 80 points
- **Notes**: Jungle Egg exclusive

## Trading Tips

### Win Trades
- Get pets with higher value than what you give
- Consider demand, not just raw value
- Age matters - Full Grown adds value

### Lose Trades
- Giving more value than receiving
- Trading limited pets for common pets
- Ignoring demand differences

### Fair Trades
- Values within 10% of each other
- Both parties satisfied
- Consider personal preference

## Value Multipliers

| Type | Multiplier |
|------|------------|
| Full Grown | 1.1x |
| Neon | 3x |
| Mega Neon | 12x |
| No Potion (NP) | 1.05-1.2x |
| Fly-Ride (FR) | Standard |
| Ride Only | 0.95x |

## Tips for Trading Up

1. Start with what you have
2. Make small gains over time
3. Avoid "w/f/l" social media - learn values yourself
4. Be patient - good trades take time
5. Use our [Trade Calculator](/adopt-me/am-trade-calculator) before every trade

---

*Values last updated: January 2026. Values change frequently based on demand.*',
ARRAY['adopt me values', 'adopt me pet values 2026', 'adopt me trading values', 'adopt me frost dragon value', 'adopt me shadow dragon value'],
'{"type": "value-guide", "updated": "2026-01"}'::jsonb),

-- Adopt Me Neon 制作指南
('am', 'guides', 'neon-guide',
'Adopt Me Neon Guide 2026 - How to Make Neon & Mega Neon Pets',
'Neon Making Guide',
'Complete guide to making Neon and Mega Neon pets in Adopt Me 2026. Learn aging tips, Neon Cave location, and the fastest methods.',
'# Adopt Me Neon Pet Guide 2026

Making Neon pets is one of the most satisfying achievements in Adopt Me. This guide covers everything from basic neons to the ultimate Mega Neons.

## What Are Neon Pets?

Neon pets are special glowing versions of regular pets. They have:
- A glowing aura around specific body parts
- Single color glow (varies by pet)
- Approximately 3x the trading value

## How to Make a Neon Pet

### Requirements
1. **4 of the exact same pet** (same species)
2. **All 4 must be FULL GROWN** (completed all aging stages)

### Step-by-Step Process

**Step 1: Get 4 Identical Pets**
- Hatch eggs or trade for 4 of the same pet
- Example: 4 Dogs, 4 Unicorns, 4 Frost Dragons

**Step 2: Age All to Full Grown**
- Each pet needs 21 tasks completed
- Tasks include: Hungry, Thirsty, Bored, Tired, Dirty, Sick

**Step 3: Go to the Neon Cave**
- Located under the bridge near the Nursery
- Look for the cave entrance by the waterfall

**Step 4: Combine Your Pets**
- Stand on the 4 circles with your pets out
- Watch the magical transformation!

## Aging Tips for Fast Neons

### AFK Pool Method
The most popular aging method:
1. Go to your house (or a friends house)
2. Enter the pool
3. Have your pet out
4. Leave the game running
5. Needs fill automatically over time

**Time Required:**
- About 4-6 hours per pet with pool method
- Total: 16-24 hours for one Neon

### Active Aging
If actively playing:
- Complete tasks as they appear
- About 2-3 hours per pet
- Total: 8-12 hours for one Neon

### Family Method
Join a family and have others help:
- Family members can complete pet tasks
- Share the aging burden
- Fastest method with help

## Mega Neon Pets

The ultimate pet evolution!

### How to Make Mega Neon
1. Make 4 NEON pets of the same species
2. Age all 4 Neons to LUMINOUS (Full Grown for Neons)
3. Go to Neon Cave
4. Combine all 4 Neon pets

### Mega Neon Features
- Cycles through ALL rainbow colors
- Approximately 12x the value of normal
- Ultimate collector achievement

### Time Investment
- 4 Neons = 16 normal pets
- 16 pets × 21 tasks each
- Hundreds of hours of total aging

Use our [Mega Neon Calculator](/adopt-me/am-mega-calculator) to plan!

## Neon Cave Location

**Finding the Cave:**
1. Start at the Nursery
2. Walk toward the bridge (near Hospital)
3. Look for waterfall under the bridge
4. Cave entrance is behind the waterfall
5. Walk inside to find the Neon circles

## Tips and Tricks

### Planning Your Neon
- Choose pets you can easily obtain 4 of
- Consider trading value after making neon
- Some pets are harder to make neon (limited pets)

### Value Consideration
| Normal | Neon Multiplier | Worth Making? |
|--------|-----------------|---------------|
| Low Value | 3x | Yes - good gains |
| Mid Value | 3x | Yes - decent |
| High Value | 3x | Maybe - time intensive |
| Top Tier | 3x | Usually trade instead |

### What NOT to Do
- Dont mix different pets (wont work)
- Dont use potions thinking it helps (it doesnt)
- Dont age pets separately then trade (age together)
- Dont forget to use the pool method

## Common Questions

**Q: Do potions affect Neon color?**
A: No, potions (Fly/Ride) do not change the neon glow color.

**Q: Can I make a Neon from different trades?**
A: Yes! As long as all 4 pets are the same species.

**Q: What happens to potions when making Neon?**
A: The Neon inherits Fly/Ride if at least one pet had them.

**Q: Is there a faster way to age?**
A: The family + pool method is fastest.

---

*Guide updated: January 2026*',
ARRAY['adopt me neon guide', 'adopt me how to make neon', 'adopt me neon cave', 'adopt me mega neon guide', 'adopt me aging pets fast'],
'{"type": "guide", "updated": "2026-01"}'::jsonb),

-- ============================================
-- Sols RNG Wiki 内容 (game_key: srng)
-- ============================================

-- Sols RNG 新手指南
('srng', 'guides', 'beginner-guide',
'Sols RNG Beginner Guide 2026 - How to Roll & Get Rare Auras',
'Beginner Guide',
'Complete Sols RNG beginner guide 2026. Learn how to roll, understand aura rarities, stack luck multipliers, and get rare auras faster.',
'# Sols RNG Beginner Guide 2026

Welcome to Sols RNG! This guide will help you understand the rolling mechanics and maximize your chances of getting rare auras.

## What is Sols RNG?

Sols RNG (Random Number Generator) is a luck-based game where you roll for auras of varying rarities. The goal is to collect rare and legendary auras while using various methods to boost your luck.

## Core Mechanics

### Rolling for Auras
The main gameplay loop:
1. Press the ROLL button
2. A random aura is generated
3. Rarer auras have lower chances
4. Collect and display your best auras

### Aura Rarities

From most common to rarest:

| Rarity | Base Odds | Notes |
|--------|-----------|-------|
| Common | 50% | Every other roll |
| Uncommon | 25% | 1 in 4 |
| Rare | 15% | 1 in 7 |
| Epic | 7% | 1 in 14 |
| Legendary | 2.5% | 1 in 40 |
| Mythic | 0.4% | 1 in 250 |
| Divine | 0.1% | 1 in 1,000 |
| Celestial | 0.01% | 1 in 10,000 |

## Starting Your Journey

### First Steps
1. **Roll the dice** - Get familiar with the system
2. **Watch your odds** - Observe roll outcomes
3. **Save your luck items** - Dont waste them early
4. **Join a clan** - For bonuses and community

### Understanding the Interface
- **Roll Button**: Main action
- **Inventory**: View collected auras
- **Equipped Aura**: Currently displayed aura
- **Luck Meter**: Shows active multipliers
- **Crafting**: Combine auras for items

## Luck System

Luck is EVERYTHING in Sols RNG. Higher luck = better aura chances.

### Luck Sources

**Potions**
- Luck Potion I: 2x luck
- Luck Potion II: 3x luck
- Luck Potion III: 5x luck

**Gamepasses**
- Lucky Gamepass: 1.5x permanent
- VIP: 1.25x permanent

**Events**
- Special events can give 2x or more
- Stack with other sources!

**Auras**
- Some auras give luck when equipped

### Luck Stacking
Luck multipliers are MULTIPLICATIVE:
- Potion III (5x) + Lucky GP (1.5x) = 7.5x
- Add VIP (1.25x) = 9.375x total

Use our [Luck Calculator](/sols-rng/srng-luck-calculator) to plan your stack!

## Rolling Strategy

### Efficient Rolling

**Do:**
- Save potions for events
- Stack multiple luck sources
- Roll consistently
- Track your rolls

**Dont:**
- Waste potions without stacking
- Give up after dry streaks
- Ignore event bonuses

### Expected Rolls

With base luck, expected rolls for each rarity:
- Legendary: ~40 rolls
- Mythic: ~250 rolls
- Divine: ~1,000 rolls
- Celestial: ~10,000 rolls

Use our [Aura Odds Calculator](/sols-rng/srng-aura-odds) for exact numbers!

## Collecting Auras

### Which Auras to Keep
- **Rare and above**: Always keep
- **Epics**: Good milestone
- **Legendaries**: Celebrate these!
- **Mythic+**: Screenshot-worthy

### Displaying Auras
Equip your best auras to show off:
- Walk around with cool effects
- Join showcase servers
- Flex on friends

## Crafting System

Combine auras to create powerful items:

### Basic Crafting
- Multiple common auras → Materials
- Materials → Crafted items
- Crafted items → Luck bonuses

### Crafting Tips
- Dont craft randomly
- Plan what you want
- Check material requirements first
- Use our [Crafting Calculator](/sols-rng/srng-crafting) to plan

## Progression Path

### Week 1: Learning
- Understand roll mechanics
- Get a few Rare auras
- Maybe your first Epic

### Month 1: Grinding  
- Multiple Epics collected
- First Legendary (hopefully!)
- Start saving for potions

### Long Term
- Build up luck items
- Wait for good events
- Chase that Divine or Celestial

## Tips for Success

1. **Patience is key** - RNG is random, dry streaks happen
2. **Stack luck always** - Never waste good multipliers
3. **Events are crucial** - Best time for rare hunting
4. **Join communities** - Tips and moral support
5. **Have fun** - Its a game, enjoy the journey

## Common Beginner Mistakes

- Using potions without other stacks
- Getting discouraged by RNG
- Not participating in events
- Crafting without planning
- Expecting quick wins

---

*Last updated: January 2026*',
ARRAY['sols rng beginner guide', 'sols rng how to play', 'sols rng tips 2026', 'sols rng aura guide', 'sols rng luck guide'],
'{"type": "guide", "difficulty": "beginner", "updated": "2026-01"}'::jsonb),

-- Sols RNG Aura 等级列表
('srng', 'auras', 'tier-list',
'Sols RNG Aura Tier List 2026 - All Auras Ranked by Rarity',
'Aura Tier List',
'Complete Sols RNG aura tier list 2026. All auras ranked by rarity with odds, effects, and how rare each aura really is.',
'# Sols RNG Aura Tier List 2026

This comprehensive tier list covers every aura in Sols RNG, organized by rarity tier with odds and special effects.

## Rarity Tiers Overview

Sols RNG features eight rarity tiers, each exponentially rarer than the last:

| Tier | Rarity | Base Odds | Expected Rolls |
|------|--------|-----------|----------------|
| 1 | Common | 50% | 2 |
| 2 | Uncommon | 25% | 4 |
| 3 | Rare | 15% | 7 |
| 4 | Epic | 7% | 14 |
| 5 | Legendary | 2.5% | 40 |
| 6 | Mythic | 0.4% | 250 |
| 7 | Divine | 0.1% | 1,000 |
| 8 | Celestial | 0.01% | 10,000 |

## Celestial Tier Auras (0.01%)

The rarest auras in the game. Having one is a flex.

### Solar Flare
- **Effect**: Golden sun emanating from player
- **Odds**: 1 in 10,000
- **Notes**: One of the most sought-after auras

### Cosmic Dawn
- **Effect**: Universe particles surrounding player
- **Odds**: 1 in 10,000
- **Notes**: Beautiful space theme

### Eternal Light
- **Effect**: Pure white divine glow
- **Odds**: 1 in 10,000
- **Notes**: Clean and prestigious

## Divine Tier Auras (0.1%)

Extremely rare. Owning one puts you in elite company.

### Galaxy Core
- **Effect**: Swirling galaxy around player
- **Odds**: 1 in 1,000
- **Notes**: Popular choice

### Phoenix Rising
- **Effect**: Fire bird animation
- **Odds**: 1 in 1,000
- **Notes**: Dynamic visual

### Void Walker
- **Effect**: Dark matter particles
- **Odds**: 1 in 1,000
- **Notes**: Edgy but cool

### Crystal Heart
- **Effect**: Crystalline heart glow
- **Odds**: 1 in 1,000
- **Notes**: Aesthetic favorite

## Mythic Tier Auras (0.4%)

Very rare. A great achievement to obtain.

### Aurora Borealis
- **Effect**: Northern lights effect
- **Odds**: 1 in 250
- **Notes**: Beautiful color shifting

### Lightning Storm
- **Effect**: Electricity crackles
- **Odds**: 1 in 250
- **Notes**: Active effect

### Spirit Flame
- **Effect**: Blue ghost fire
- **Odds**: 1 in 250
- **Notes**: Spooky aesthetic

### Royal Crown
- **Effect**: Floating crown
- **Odds**: 1 in 250
- **Notes**: Prestigious look

## Legendary Tier Auras (2.5%)

The first "rare" tier. Getting one is exciting!

### Golden Halo
- **Effect**: Classic golden ring
- **Odds**: 1 in 40
- **Notes**: Traditional legendary

### Fire Aura
- **Effect**: Flames surrounding player
- **Odds**: 1 in 40
- **Notes**: Popular choice

### Shadow Cloak
- **Effect**: Dark shadow wisps
- **Odds**: 1 in 40
- **Notes**: Cool dark theme

### Diamond Dust
- **Effect**: Sparkling diamonds
- **Odds**: 1 in 40
- **Notes**: Bling aesthetic

### Ocean Depths
- **Effect**: Water bubbles
- **Odds**: 1 in 40
- **Notes**: Aquatic theme

## Epic Tier Auras (7%)

Common enough to collect, rare enough to appreciate.

### Emerald Glow
- **Effect**: Green gemstone aura
- **Odds**: 1 in 14
- **Notes**: Nature theme

### Ruby Flash
- **Effect**: Red gemstone aura
- **Odds**: 1 in 14
- **Notes**: Warm colors

### Sapphire Shimmer
- **Effect**: Blue crystal effect
- **Odds**: 1 in 14
- **Notes**: Cool tones

### Electric Pulse
- **Effect**: Yellow electricity
- **Odds**: 1 in 14
- **Notes**: Energetic

## Rare Tier Auras (15%)

Your first "real" achievement tier.

### Purple Mist
### Blue Flame
### Red Spark
### Green Energy

*(Odds: 1 in 7 for each)*

## Uncommon Tier Auras (25%)

Common but a step up from basic.

### Light Glow
### Dark Shade
### Color Burst
### Simple Aura

*(Odds: 1 in 4 for each)*

## Common Tier Auras (50%)

The default tier. Everyone has these.

### Basic White
### Basic Black
### Basic Blue
### Basic Red

*(Odds: 1 in 2 for each)*

## Collecting Strategy

### For New Players
1. Focus on getting any Epic+
2. Celebrate Legendaries
3. Dont expect Mythic quickly

### For Experienced Players
1. Save luck for Divine hunting
2. Wait for events
3. Stack every multiplier possible

### For Completionists
1. Track all collected auras
2. Join trading communities
3. Patience for Celestials

## Expected Time Investment

**To get your first:**
- Epic: ~30 minutes
- Legendary: ~2-3 hours
- Mythic: ~10-20 hours
- Divine: ~50-100 hours
- Celestial: ~500+ hours

*Times assume average luck with no multipliers*

---

*Tier list updated: January 2026*',
ARRAY['sols rng aura tier list', 'sols rng aura list', 'sols rng all auras', 'sols rng rarest auras', 'sols rng celestial auras'],
'{"type": "tier-list", "updated": "2026-01"}'::jsonb),

-- Sols RNG Luck 堆叠指南
('srng', 'guides', 'luck-stacking-guide',
'Sols RNG Luck Stacking Guide 2026 - Maximum Luck Setup',
'Luck Stacking Guide',
'Complete Sols RNG luck stacking guide 2026. Learn how to maximize your luck multiplier with potions, gamepasses, events, and gear.',
'# Sols RNG Luck Stacking Guide 2026

Luck is the most important stat in Sols RNG. This guide explains how luck works and how to maximize it for the best aura odds.

## Understanding Luck

### How Luck Works
Luck is a MULTIPLIER to your base aura odds. For example:
- Base Legendary odds: 2.5%
- With 2x luck: 5%
- With 10x luck: 25%

### The Formula
```
Adjusted Odds = Base Odds × Total Luck Multiplier
```

Your total luck multiplier is calculated by MULTIPLYING all active sources together.

## All Luck Sources

### Potions (Temporary)

The most common luck source:

| Potion | Multiplier | Duration | How to Get |
|--------|------------|----------|------------|
| Luck I | 2x | 30 min | Shop, rewards |
| Luck II | 3x | 30 min | Shop, events |
| Luck III | 5x | 30 min | Events, rare drops |

**Tip**: Potions do NOT stack with each other. Only the highest active potion counts.

### Gamepasses (Permanent)

One-time purchases for permanent luck:

| Gamepass | Multiplier | Price |
|----------|------------|-------|
| Lucky | 1.5x | Robux |
| VIP | 1.25x | Robux |

**Tip**: These stack with EVERYTHING and are always active.

### Event Boosts (Temporary)

During special events:

| Event Type | Typical Boost |
|------------|---------------|
| 2x Event | 2x |
| Lucky Day | 3x |
| Anniversary | 5x+ |

### Gear & Items (Equipped)

Certain items give luck when equipped:

| Item | Multiplier | How to Get |
|------|------------|------------|
| Lucky Charm | 1.2x | Crafting |
| Fortune Stone | 1.5x | Crafting |
| Lucky Ring | 1.3x | Events |

### Auras (Equipped)

Some auras have luck bonuses:

| Aura | Bonus |
|------|-------|
| Lucky Star | 1.1x |
| Fortune Glow | 1.2x |
| 777 Aura | 1.77x |

## Stacking Examples

### Budget Setup
- Luck Potion I: 2x
- **Total: 2x luck**

### Mid-Tier Setup
- Luck Potion II: 3x
- Lucky Gamepass: 1.5x
- **Total: 4.5x luck**

### Premium Setup
- Luck Potion III: 5x
- Lucky Gamepass: 1.5x
- VIP Gamepass: 1.25x
- **Total: 9.375x luck**

### Ultimate Event Setup
- Luck Potion III: 5x
- Lucky Gamepass: 1.5x
- VIP Gamepass: 1.25x
- 2x Event: 2x
- Lucky Charm: 1.2x
- **Total: 22.5x luck**

Use our [Luck Calculator](/sols-rng/srng-luck-calculator) to plan your exact setup!

## Effective Odds with Luck

### Legendary (Base 2.5%)
| Luck | Effective Odds |
|------|----------------|
| 1x | 2.5% |
| 5x | 12.5% |
| 10x | 25% |
| 20x | 50% |

### Divine (Base 0.1%)
| Luck | Effective Odds |
|------|----------------|
| 1x | 0.1% |
| 5x | 0.5% |
| 10x | 1% |
| 20x | 2% |

### Celestial (Base 0.01%)
| Luck | Effective Odds |
|------|----------------|
| 1x | 0.01% |
| 5x | 0.05% |
| 10x | 0.1% |
| 20x | 0.2% |

## When to Use Luck Boosts

### DO use luck when:
- An event is active (double dip!)
- You have significant play time available
- You have multiple sources ready
- Hunting specific rare auras

### DONT use luck when:
- You can only play for 5 minutes
- No other multipliers available
- Youre just checking in quickly

## Luck Optimization Tips

### Stack Smart
1. Wait for events before using potions
2. Buy gamepasses if you play regularly
3. Craft luck items over time
4. Never waste a potion alone

### Time Management
- Potion duration: 30 minutes typically
- Plan your session around potion timers
- Maximize rolls per minute while boosted

### Long-Term Strategy
1. **Week 1**: Learn the game, no big potions
2. **Month 1**: Buy gamepasses if committed
3. **Ongoing**: Save best potions for events

## Common Mistakes

1. **Using Luck III alone** - Wait for stacks!
2. **Missing events** - Set notifications
3. **Short sessions with potions** - Plan play time
4. **Not tracking luck** - Use our calculator
5. **Ignoring crafted items** - Free multipliers

## Priority Order for Luck Sources

1. **Gamepasses** - Always active, best value
2. **Event timing** - Free multiplier
3. **Luck Potion III** - Biggest temporary boost
4. **Crafted items** - Permanent small boost
5. **Lucky auras** - If you have them

---

*Guide updated: January 2026*',
ARRAY['sols rng luck stacking', 'sols rng luck guide', 'sols rng maximum luck', 'sols rng luck multiplier', 'sols rng how to get more luck'],
'{"type": "guide", "updated": "2026-01"}'::jsonb)

ON CONFLICT (game_key, category, slug) DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    excerpt = EXCLUDED.excerpt,
    seo_keywords = EXCLUDED.seo_keywords,
    metadata = EXCLUDED.metadata,
    updated_at = now();
