# RobloxCal — Top 6 Roblox Game Calculator Expansion (Jan 2026) — PRD (EN)

**Product:** robloxcal.com (Roblox game calculator network)  
**Document owner:** You (Solo founder)  
**Version:** 1.0  
**Date:** 2026-01-18  
**Language:** English  

---

## 0. TL;DR

Ship **6 game hubs + 18 calculator pages** (3 per game) focused on **high-intent “calculator” SEO keywords**.  
Use **config-driven calculators** (shared math engines + per-page field configs) so pages can be generated quickly by AI and iterated without rewrites.

**Top 6 games (Jan 2026 focus):**
1) Escape Tsunami For Brainrots  
2) Steal a Brainrot  
3) Fish It! (NOT Fisch)  
4) Fisch  
5) Bee Swarm Simulator  
6) Grow a Garden  

---

## 1. Goals & Success Metrics

### 1.1 Goals
- Win organic search traffic for **“{game} calculator”** and high-intent tool queries (rebirth, ROI, drop rate, value, honey, etc.).
- Provide **fast, clear, mobile-friendly calculators** that help players make decisions in-game.
- Build a repeatable **network-site growth loop**: pick trending games → keyword pack → AI generates pages → ship → monitor → iterate.

### 1.2 Success metrics (first 30 days after launch)
- Indexation: **100% of new pages indexed** within 14 days (via GSC).
- Rankings: at least **10 pages** ranking top 20 for their primary keyword.
- Engagement: tool-page avg time on page > **60s**, and scroll depth > **50%** (analytics).
- Output integrity: 0 broken calculators; no NaN/Infinity outputs; no JS errors in console on common inputs.

---

## 2. Non-goals / Safety & Compliance

- Do NOT publish content that facilitates cheating/exploits (e.g., “dupe lists”, scripts, hacks, exploit executors).
- Do NOT claim “official” affiliation with Roblox or game devs.
- Always display a **fan-made / unofficial disclaimer** on every game hub + tool page.

---

## 3. Information Architecture (IA)

### 3.1 Required pages (MVP)
For each game:
- Game hub: `/games/{game-slug}`
- 3 calculators: `/games/{game-slug}/{tool-slug}`

Site-level (recommended):
- `/games` (directory)
- `/topics/brainrots` (Escape Tsunami + Steal a Brainrot)
- `/topics/fishing` (Fish It + Fisch)
- `/topics/farming` (Grow a Garden + Bee Swarm Simulator)

> Topic hubs are optional, but highly recommended for internal linking and “network” feel.

### 3.2 Page components (shared)
- `Breadcrumbs`
- `GameHero` (name, short description, CTA to calculators)
- `ToolCardGrid` (3 tools minimum)
- `CalculatorForm` (inputs)
- `ResultsPanel` (outputs + explanation)
- `FAQAccordion` (keyword-driven questions)
- `Disclaimer`
- `RelatedGames` (cross-link by topic)
- `LastUpdated` + `Changelog`

---

## 4. SEO Strategy

### 4.1 Keyword principle
Each page targets **one primary keyword**, plus 8–20 secondary/long-tail variants:
- Primary keyword lives in: **Title tag, H1, URL slug, first 100 words, meta description**
- Secondary keywords distributed across: H2/H3 sections, FAQ questions, body copy, image alt text.

### 4.2 On-page templates
**Title tag template (tool page)**  
`{Game} {Tool Name} Calculator (2026) — RobloxCal`

**Meta description template**  
`Use our free {Game} {Tool Name} calculator to {benefit}. Enter your stats and get instant results. Updated {Month YYYY}.`

**H1 template**  
`{Game} {Tool Name} Calculator`

**H2 sections (recommended)**
- How the calculator works
- Inputs explained
- Results explained
- Strategy tips (non-exploit)
- FAQ

### 4.3 Structured data (JSON-LD)
- Tool pages: `SoftwareApplication` (+ optional `FAQPage`)
- Game hubs: `CollectionPage` or `WebPage` + `BreadcrumbList`
- Always include `isAccessibleForFree: true` if true.

### 4.4 Internal linking rules
- Every tool page must link back to its game hub and to **2 sibling tools**.
- Every game hub links to its 3 tools and **2 related games** in the same topic.
- Topic hubs link to game hubs and “best tools”.

### 4.5 Content freshness signals
- Include `Last updated` timestamp on every page.
- Include `Changelog` entries after updates (even small ones: “Adjusted formula”, “Added FAQ”).

---

## 5. Keyword Pack (Primary + Secondary) & Page Mapping

> Use this as your **source of truth** for: URL slugs, titles, H1, FAQ prompts, and copywriting.  
> All keywords are English.

### 5.1 Escape Tsunami For Brainrots
**Game slug:** `escape-tsunami-for-brainrots`

**Game hub primary keyword:**  
- escape tsunami for brainrots calculator

**Secondary keyword clusters:**
- escape tsunami for brainrots rebirth
- rebirth levels / rebirth guide
- money multiplier / multiplier chart
- base upgrades / slots / floors
- speed upgrade / how to increase speed
- best brainrots / rare brainrots
- farming route / fastest money

**Tool pages (3)**
1) **Rebirth Advisor Calculator**  
   - Tool slug: `etfb-rebirth-calculator`  
   - Primary keyword: escape tsunami for brainrots rebirth calculator  
   - Secondary: rebirth levels, speed requirement, money multiplier, when to rebirth

2) **Base Upgrade ROI Calculator**  
   - Tool slug: `etfb-upgrade-roi`  
   - Primary keyword: escape tsunami for brainrots upgrade calculator  
   - Secondary: base upgrades, slots, floors, upgrade order, ROI time

3) **Speed-to-Goal Planner**  
   - Tool slug: `etfb-speed-planner`  
   - Primary keyword: escape tsunami for brainrots speed calculator  
   - Secondary: speed upgrades, fastest way to get speed, time to reach {speed}

---

### 5.2 Steal a Brainrot
**Game slug:** `steal-a-brainrot`

**Game hub primary keyword:**
- steal a brainrot calculator

**Secondary keyword clusters:**
- income calculator / earnings calculator
- mutation multipliers / traits
- server luck / luck multiplier
- rebirth calculator
- ROI / best brainrot to buy
- drop rates / spawn rate / chance calculator

**Tool pages (3)**
1) **Income Calculator**  
   - Tool slug: `sab-income-calculator`  
   - Primary keyword: steal a brainrot income calculator  
   - Secondary: hourly income, daily income, multiplier, server luck

2) **ROI / Best Buy Calculator**  
   - Tool slug: `sab-roi-calculator`  
   - Primary keyword: steal a brainrot ROI calculator  
   - Secondary: best brainrot, payback time, efficiency, income per cost

3) **Drop Rate / Probability Calculator**  
   - Tool slug: `sab-drop-rate-calculator`  
   - Primary keyword: steal a brainrot drop rate calculator  
   - Secondary: spawn rates, chance over time, attempts, expected time

---

### 5.3 Fish It! (Not Fisch)
**Game slug:** `fish-it`

**Game hub primary keyword:**
- fish it calculator

**Secondary keyword clusters:**
- fish it luck calculator
- fish it drop rate calculator
- fish it casts per hour
- rare fish chance / probability
- how to get {rare fish name}
- best bait / best rod (if game supports)

**Tool pages (3)**
1) **Drop Rate & Luck Calculator**  
   - Tool slug: `fishit-luck-drop-rate`  
   - Primary keyword: fish it luck calculator  
   - Secondary: drop rate, casts per hour, chance, expected time

2) **Rare Fish ETA Calculator**  
   - Tool slug: `fishit-rare-fish-eta`  
   - Primary keyword: fish it rare fish calculator  
   - Secondary: probability, expected time, 50% chance, 80% chance

3) **Profit per Hour Calculator**  
   - Tool slug: `fishit-profit-per-hour`  
   - Primary keyword: fish it profit calculator  
   - Secondary: gold per hour, money per hour, best strategy

---

### 5.4 Fisch
**Game slug:** `fisch`

**Game hub primary keyword:**
- fisch calculator

**Secondary keyword clusters:**
- fish value calculator
- mutation multiplier / mutation list
- bestiary / target fish solver
- best rod / best bait
- locations / weather / time / season
- profit optimizer / gold per hour

**Tool pages (3)**
1) **Fish Value Calculator**  
   - Tool slug: `fisch-fish-value-calculator`  
   - Primary keyword: fisch fish value calculator  
   - Secondary: price formula, weight, mutation multiplier, trading value

2) **Target Fish Solver**  
   - Tool slug: `fisch-target-fish-solver`  
   - Primary keyword: fisch target fish calculator  
   - Secondary: where to catch, bait, rod, weather, time

3) **Profit Optimizer (Gold/hr)**  
   - Tool slug: `fisch-profit-optimizer`  
   - Primary keyword: fisch profit calculator  
   - Secondary: gold per hour, best location, best rod, best bait

---

### 5.5 Bee Swarm Simulator
**Game slug:** `bee-swarm-simulator`

**Game hub primary keyword:**
- bee swarm simulator calculator

**Secondary keyword clusters:**
- honey calculator
- pollen to honey converter
- honey per pollen
- convert rate / convert rate at hive
- field bonus / hive bonus
- nectar (honey per pollen boost), instant conversion

**Tool pages (3)**
1) **Honey Production Calculator**  
   - Tool slug: `bss-honey-calculator`  
   - Primary keyword: bee swarm simulator honey calculator  
   - Secondary: honey per pollen, hive bonus, field bonus, instant conversion

2) **Pollen to Honey Converter**  
   - Tool slug: `bss-pollen-to-honey`  
   - Primary keyword: bee swarm pollen to honey converter  
   - Secondary: conversion rate, honey per pollen, instant conversion

3) **Honey Per Pollen Calculator**  
   - Tool slug: `bss-honey-per-pollen`  
   - Primary keyword: honey per pollen calculator  
   - Secondary: how honey per pollen works, convert rate, boosts

---

### 5.6 Grow a Garden
**Game slug:** `grow-a-garden`

**Game hub primary keyword:**
- grow a garden calculator

**Secondary keyword clusters:**
- crop value calculator / plant value calculator
- mutation calculator / mutation multipliers
- weight to value / value to weight
- friend boost
- pet weight calculator
- pet XP calculator / egg hatch calculator
- trading value / WFL calculator (optional, safe version)

**Tool pages (3)**
1) **Crop Value & Mutation Calculator**  
   - Tool slug: `gag-crop-value-calculator`  
   - Primary keyword: grow a garden crop value calculator  
   - Secondary: mutation calculator, weight, friend boost, plant value

2) **Pet Weight Calculator**  
   - Tool slug: `gag-pet-weight-calculator`  
   - Primary keyword: grow a garden pet weight calculator  
   - Secondary: pet size/weight, age, classification

3) **Pet XP / Hatch Time Calculator**  
   - Tool slug: `gag-pet-xp-calculator`  
   - Primary keyword: grow a garden pet xp calculator  
   - Secondary: egg hatch time, leveling, helper pets

---

## 6. Calculator Specifications (Shared Math Engines)

Implement calculators as **config + shared compute**:

### 6.1 Shared engine A: ROI / Payback Time
- Inputs: `cost`, `gain_per_min` (or per sec), optional `multiplier`
- Output: `payback_time = cost / (gain_per_min * multiplier)`
- Also output: payback in minutes/hours, and rank if comparing items.

### 6.2 Shared engine B: Profit per hour
- Inputs: `actions_per_hour`, `success_rate`, `avg_value`, optional `multiplier`
- Output: `profit_per_hour = actions_per_hour * success_rate * avg_value * multiplier`

### 6.3 Shared engine C: Probability / Expected time (Bernoulli)
- Inputs: `p` (chance per attempt), `attempts_per_min`
- Outputs:
  - expected attempts: `1/p`
  - expected minutes: `(1/p) / attempts_per_min`
  - attempts for X% chance: `n = ln(1-X) / ln(1-p)`; convert to minutes

### 6.4 Shared engine D: Rebirth break-even (generic)
- Inputs: `current_income_per_min`, `rebirth_cost_time_or_cost`, `new_multiplier`
- Output: `break_even_time = rebirth_cost / (current_income_per_min * (new_multiplier - 1))`
- Include a simplified “Decision” label: rebirth now vs wait.

> Note: the exact rebirth mechanics differ by game; keep formulas transparent and allow users to override assumptions.

---

## 7. Content Requirements (AI-generated copy)

Per tool page (minimum):
- 600–900 words English
- 5–10 FAQ questions (keyword-driven)
- 1–2 examples (worked examples with numbers)
- A short “How to get the inputs in-game” section
- “Updated {Month YYYY}” in copy
- Unofficial disclaimer (footer)

Per game hub:
- 400–700 words
- list the 3 tools + short explanation
- “Related games” links (topic-based)

---

## 8. Technical Requirements

### 8.1 Performance
- Tool calculation should run client-side instantly (<50ms compute).
- Page LCP < 2.5s on mobile for typical connections.

### 8.2 SEO plumbing
- sitemap includes all new pages
- robots.txt allows crawling
- canonical URLs
- OpenGraph + Twitter cards
- structured data JSON-LD

### 8.3 Analytics
- Track:
  - `calculator_used` event (tool_slug, inputs_count)
  - `copy_result` event
  - `faq_expand` event
  - `related_click` event

---

## 9. Acceptance Criteria (Definition of Done)

For each of 24 pages (6 hubs + 18 tools):
- No broken links; breadcrumbs correct.
- Title tag, meta description, canonical present.
- H1 contains primary keyword.
- Calculator input validation prevents NaN/Infinity.
- Has FAQ + disclaimer + last updated.
- Mobile layout passes basic usability (no horizontal scroll).

---

## 10. AI Task Breakdown (Copy-paste for your dev AI)

### Task A — Create page configs
Create JSON configs for each tool page:
- `game_slug`, `tool_slug`
- inputs (key, label, type, min/max, default)
- outputs (key, label)
- formula engine (ROI / Profit / Probability / Rebirth)

### Task B — Generate content
For each page config, generate:
- title/meta
- H1/H2 structure
- body sections + examples
- FAQ list (keyword-driven)
- JSON-LD

### Task C — Wire into site
- Add pages/routes
- Render config-driven calculators
- Render markdown/MDX content blocks
- Add internal links between game hub ↔ tools ↔ related games

### Task D — QA checklist
- Validate sample inputs for every calculator
- Lighthouse on mobile
- Check canonical + sitemap + indexability

---

## Appendix A — Machine-readable Keyword Map (JSON)

```json
{
  "site": "robloxcal.com",
  "date": "2026-01-18",
  "games": [
    {
      "slug": "escape-tsunami-for-brainrots",
      "primary": "escape tsunami for brainrots calculator",
      "tools": [
        {
          "slug": "etfb-rebirth-calculator",
          "primary": "escape tsunami for brainrots rebirth calculator",
          "secondary": ["rebirth levels", "money multiplier", "speed requirement", "when to rebirth"]
        },
        {
          "slug": "etfb-upgrade-roi",
          "primary": "escape tsunami for brainrots upgrade calculator",
          "secondary": ["base upgrades", "slots", "floors", "upgrade order", "ROI time"]
        },
        {
          "slug": "etfb-speed-planner",
          "primary": "escape tsunami for brainrots speed calculator",
          "secondary": ["speed upgrades", "time to reach speed", "fastest way to get speed"]
        }
      ]
    },
    {
      "slug": "steal-a-brainrot",
      "primary": "steal a brainrot calculator",
      "tools": [
        {
          "slug": "sab-income-calculator",
          "primary": "steal a brainrot income calculator",
          "secondary": ["hourly income", "server luck", "mutation multipliers", "traits"]
        },
        {
          "slug": "sab-roi-calculator",
          "primary": "steal a brainrot ROI calculator",
          "secondary": ["best brainrot", "payback time", "efficiency", "income per cost"]
        },
        {
          "slug": "sab-drop-rate-calculator",
          "primary": "steal a brainrot drop rate calculator",
          "secondary": ["spawn rates", "chance over time", "expected time", "attempts"]
        }
      ]
    },
    {
      "slug": "fish-it",
      "primary": "fish it calculator",
      "tools": [
        {
          "slug": "fishit-luck-drop-rate",
          "primary": "fish it luck calculator",
          "secondary": ["drop rate", "casts per hour", "chance", "expected time"]
        },
        {
          "slug": "fishit-rare-fish-eta",
          "primary": "fish it rare fish calculator",
          "secondary": ["probability", "expected time", "50% chance", "80% chance"]
        },
        {
          "slug": "fishit-profit-per-hour",
          "primary": "fish it profit calculator",
          "secondary": ["money per hour", "gold per hour", "best strategy"]
        }
      ]
    },
    {
      "slug": "fisch",
      "primary": "fisch calculator",
      "tools": [
        {
          "slug": "fisch-fish-value-calculator",
          "primary": "fisch fish value calculator",
          "secondary": ["weight", "mutation multiplier", "price formula", "trading value"]
        },
        {
          "slug": "fisch-target-fish-solver",
          "primary": "fisch target fish calculator",
          "secondary": ["where to catch", "bait", "rod", "weather", "time"]
        },
        {
          "slug": "fisch-profit-optimizer",
          "primary": "fisch profit calculator",
          "secondary": ["gold per hour", "best location", "best rod", "best bait"]
        }
      ]
    },
    {
      "slug": "bee-swarm-simulator",
      "primary": "bee swarm simulator calculator",
      "tools": [
        {
          "slug": "bss-honey-calculator",
          "primary": "bee swarm simulator honey calculator",
          "secondary": ["honey per pollen", "hive bonus", "field bonus", "instant conversion"]
        },
        {
          "slug": "bss-pollen-to-honey",
          "primary": "bee swarm pollen to honey converter",
          "secondary": ["conversion rate", "honey per pollen", "instant conversion"]
        },
        {
          "slug": "bss-honey-per-pollen",
          "primary": "honey per pollen calculator",
          "secondary": ["convert rate", "boosts", "how it works"]
        }
      ]
    },
    {
      "slug": "grow-a-garden",
      "primary": "grow a garden calculator",
      "tools": [
        {
          "slug": "gag-crop-value-calculator",
          "primary": "grow a garden crop value calculator",
          "secondary": ["mutation calculator", "weight", "friend boost", "plant value"]
        },
        {
          "slug": "gag-pet-weight-calculator",
          "primary": "grow a garden pet weight calculator",
          "secondary": ["pet size", "age", "weight", "classification"]
        },
        {
          "slug": "gag-pet-xp-calculator",
          "primary": "grow a garden pet xp calculator",
          "secondary": ["egg hatch time", "leveling", "helper pets"]
        }
      ]
    }
  ]
}
```

---

## Appendix B — Default Disclaimer (copy)
RobloxCal is a fan-made, unofficial website and is not affiliated with Roblox Corporation or the creators of this game. Game names and assets belong to their respective owners. Calculations are estimates based on community testing and may change after game updates.

