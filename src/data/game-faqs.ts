// Centralized FAQ data for all games
// Used by FaqSection component to display game-specific FAQs

export interface FaqItem {
    question: string
    answer: string
}

export const GAME_FAQS: Record<string, FaqItem[]> = {
    // ========== ORIGINAL GAMES ==========

    // AFSE
    afse: [
        {
            question: "What is the best training area in Anime Fighting Simulator Endless?",
            answer: "The best training area depends on your current stats. Our AFSE Calculator analyzes your strength, chakra, speed, and durability levels to recommend the optimal spot that gives you the highest gain per minute."
        },
        {
            question: "How do I get stats fast in AFSE?",
            answer: "To get stats fast, use the highest requirement training area you can unlock, equip your best Class, and use boosters (VIP, 2x Stats, Weekend Boost). Use our Optimizer to calculate exactly how long it takes to reach your next milestone."
        },
        {
            question: "What are the latest AFSE codes?",
            answer: "We update our codes daily. Visit our Codes page to find the latest redeem codes for free Yen, Chikara Shards, and Stat Boosts."
        },
        {
            question: "Is the No Limit Gamepass worth it?",
            answer: "No Limit removes the 131K stat cap for multi-training, allowing exponential growth. If you are a serious grinder aiming for leaderboards, it is the most essential gamepass."
        }
    ],

    // Bomb Chip
    'bomb-chip': [
        {
            question: "How do I win consistently at Bomb Chip?",
            answer: "Use our odds calculator to understand probability patterns. Focus on edge positions and learn common opponent behaviors. Check our Strategy guide for advanced psychological tactics."
        },
        {
            question: "What are the odds of the bomb?",
            answer: "Bomb placement follows specific probability distributions. Our calculator shows you the exact odds for each position based on game mode and history."
        }
    ],

    // Craft a Brainrot
    brainrot: [
        {
            question: "What is the most profitable recipe?",
            answer: "Profitability depends on current market prices. Use our Recipe calculator to compare profit margins across all recipes with real-time ingredient costs."
        }
    ],

    // RVB Tycoon
    'rvb-tycoon': [
        {
            question: "When should I rebirth in RVB Tycoon?",
            answer: "Use our Rebirth Calculator to find the optimal timing. Generally, rebirth when your next multiplier increase is greater than your current income loss recovery time."
        }
    ],

    // ========== TOP 6 EXPANSION (Jan 2026) ==========

    // Escape Tsunami For Brainrots
    'escape-tsunami-for-brainrots': [
        {
            question: "When is the best time to rebirth in Escape Tsunami?",
            answer: "The optimal rebirth timing depends on your current speed and money multiplier. Our Rebirth Advisor analyzes your stats and recommends the exact moment to rebirth for maximum long-term gains."
        },
        {
            question: "Which upgrades should I buy first?",
            answer: "Use our Upgrade ROI Calculator to compare all upgrade options. Generally, speed upgrades have the best early-game ROI, while money multipliers become more valuable after your first few rebirths."
        },
        {
            question: "How does the money multiplier work?",
            answer: "Each rebirth increases your permanent money multiplier. The gain depends on how much money you earned before rebirthing. Our calculator shows exactly how much multiplier you'll get."
        },
        {
            question: "What are the best strategies for escaping the tsunami?",
            answer: "Focus on speed upgrades early, use the optimal path shown in our Speed Planner, and don't rebirth too early. Check our calculator for personalized optimization."
        }
    ],

    // Steal a Brainrot
    'steal-a-brainrot': [
        {
            question: "Which brainrot should I steal first?",
            answer: "Use our ROI Calculator to find the best brainrot for your budget. Consider both base income and steal time when making decisions."
        },
        {
            question: "How is income calculated in Steal a Brainrot?",
            answer: "Income = Base Rate × Brainrot Multiplier × Game Pass Bonuses × Event Bonuses. Our Income Calculator breaks down each component."
        },
        {
            question: "What affects drop rates?",
            answer: "Drop rates are determined by brainrot rarity and luck boosts. Our Drop Rate Calculator shows exact probabilities for each item."
        },
        {
            question: "Are game passes worth buying?",
            answer: "Most game passes pay for themselves within 2-4 hours of gameplay. Use our ROI calculator to see exactly how long each pass takes to break even."
        }
    ],

    // Fish It!
    'fish-it': [
        {
            question: "How does luck affect fish drops?",
            answer: "Luck increases your chance of catching rare fish. Each luck point adds approximately 1% to rare fish probability. Use our Luck Calculator for exact rates."
        },
        {
            question: "What is the fastest way to get rare fish?",
            answer: "Stack luck boosts, use the best rod you can afford, and fish in legendary spots. Our Rare Fish ETA calculator shows expected time to catch specific fish."
        },
        {
            question: "How do I maximize profit per hour?",
            answer: "Focus on catching fish with the best value-to-time ratio. Our Profit Calculator analyzes your setup and recommends the optimal fishing strategy."
        },
        {
            question: "Which fishing rod should I use?",
            answer: "The best rod depends on your goals. Higher-tier rods catch faster but cost more. Check our calculator to see if the upgrade is worth it for your playstyle."
        }
    ],

    // Fisch
    'fisch': [
        {
            question: "How are fish values calculated in Fisch?",
            answer: "Fish value = Base Value × Size Multiplier × Mutation Bonuses. Mutations like Golden (2x), Huge (1.5x), and Sparkling (1.25x) stack multiplicatively."
        },
        {
            question: "What are the rarest mutations?",
            answer: "In order of rarity: Albino (0.1%), Golden (0.5%), Huge (1%), Sparkling (2%), and Glowing (3%). Our calculator shows the value impact of each."
        },
        {
            question: "Where can I find specific fish?",
            answer: "Each fish has specific spawn locations and conditions. Use our Target Fish Solver to find the exact spot and optimal equipment for any fish."
        },
        {
            question: "How do I maximize coins per hour?",
            answer: "It's not always about the rarest fish. Our Profit Optimizer considers catch time, sell value, and drop rates to find your optimal strategy."
        }
    ],

    // Bee Swarm Simulator
    'bee-swarm-simulator': [
        {
            question: "How is honey production calculated?",
            answer: "Honey = Pollen Collected × Honey From Pollen Bonus × Instant Conversion Rate × Honey At Hive Bonus. Our calculator handles all the complex stacking."
        },
        {
            question: "What is the pollen to honey conversion rate?",
            answer: "Base rate is 1:1, but bonuses can increase this significantly. With optimal buffs, you can reach 5-10x conversion rates. Use our converter to see your actual rate."
        },
        {
            question: "Which bees are best for honey production?",
            answer: "It depends on your playstyle. Gifted bees, event bees, and mythic bees all excel in different areas. Check our calculator for production comparisons."
        },
        {
            question: "How do I calculate my honey per pollen?",
            answer: "Our Honey Per Pollen calculator divides your honey gain by pollen collected, accounting for all your active buffs and hive bonuses."
        }
    ],

    // Grow a Garden
    'grow-a-garden': [
        {
            question: "Which crops are most valuable?",
            answer: "Value depends on mutations and growth time. Rainbow and Golden mutations dramatically increase value. Use our Crop Calculator for exact comparisons."
        },
        {
            question: "How do mutations affect crop value?",
            answer: "Mutations multiply base value: Rainbow (5x), Golden (3x), Giant (2x), Sparkling (1.5x). Multiple mutations stack multiplicatively."
        },
        {
            question: "How is pet weight calculated?",
            answer: "Pet weight depends on species, age, and feed quality. Our Pet Weight Calculator estimates your pet's current and maximum potential weight."
        },
        {
            question: "How long does it take to level up pets?",
            answer: "XP requirements increase each level. Our Pet XP Calculator shows exactly how much XP you need and estimates time based on your feeding rate."
        }
    ]
}

// Get FAQs for a specific game, with fallback to AFSE
export function getGameFaqs(gameSlug: string): FaqItem[] {
    return GAME_FAQS[gameSlug] || GAME_FAQS['afse'] || []
}
