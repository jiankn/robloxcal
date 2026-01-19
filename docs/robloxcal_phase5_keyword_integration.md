# RobloxCal — Phase 5: SEO Keyword Integration (Top 6 Games) — Implementation Plan (EN)

**Site:** robloxcal.com  
**Scope:** Integrate the previously prepared **SEO keyword packs** (primary + full long-tail variants) into the already-built Phase 1–4 pages for the **Top 6 games**.  
**Date:** 2026-01-18  
**Owner:** Solo founder / AI dev agent  
**Language:** English content + technical instructions (this doc is written in English so you can paste directly to your dev AI)

---

## 0) What Phase 5 adds (High-level)

Phase 1–4 shipped the core **routes, calculators, and page skeletons**. Phase 5 makes the pages **rankable** by:

1) **Keyword-aware metadata** (title, description, canonical, OG/Twitter) per page  
2) **Keyword-aware content structure** (H1/H2/FAQ) per page  
3) **Internal linking & topic hubs** to spread authority and strengthen clusters  
4) **Sitemap & freshness signals** (last updated + changelog)  
5) **Quality safeguards** to avoid thin / duplicate / spam patterns

This phase is about turning the keyword list into a **single source of truth** that your site reads at build/runtime.

---

## 1) Source of truth: Keyword Pack Config (required)

### 1.1 Create config file
Create a single config file that contains ALL keywords from the “Top 6 keyword list”:

- `data/seo/top6-keywords.json`

**Structure (recommended):**
```json
{
  "games": [
    {
      "slug": "escape-tsunami-for-brainrots",
      "name": "Escape Tsunami For Brainrots",
      "hub": {
        "primary": "escape tsunami for brainrots calculator",
        "secondary": ["...", "..."]
      },
      "tools": [
        {
          "slug": "etfb-rebirth-calculator",
          "name": "Rebirth Calculator",
          "primary": "escape tsunami for brainrots rebirth calculator",
          "secondary": ["...", "..."]
        },
        {
          "slug": "etfb-upgrade-roi",
          "name": "Base Upgrade ROI Calculator",
          "primary": "escape tsunami for brainrots upgrade calculator",
          "secondary": ["...", "..."]
        },
        {
          "slug": "etfb-speed-planner",
          "name": "Speed Planner",
          "primary": "escape tsunami for brainrots speed calculator",
          "secondary": ["...", "..."]
        }
      ]
    }
  ]
}
```

> **Important:** Keep the keyword lists exactly as previously approved (primary + full long-tail/variants).
> This doc focuses on **integration**; you already have the keyword content.

### 1.2 Add validation
Add a simple validator (CI or build-time) to ensure:
- Each page has **exactly 1 primary keyword**
- Secondary keywords length is within a sane range (8–50)
- No empty strings
- Primary keyword is not duplicated across different pages (unless intentional)

---

## 2) Where to integrate keywords on pages (required)

You have two page types:
- **Game Hub**: `/games/{gameSlug}`
- **Tool Page**: `/games/{gameSlug}/{toolSlug}`

### 2.1 Metadata integration (MUST)
On every page, set:

- `title` includes **primary keyword** once (not repeated)
- `meta description` includes primary + 1–2 secondary naturally
- `canonical` matches the page URL
- OG/Twitter uses title/description

**Recommended templates**
- **Hub title:** `{Game Name} Calculator (2026) — RobloxCal`
- **Hub meta:** `Use our free {Game Name} calculator hub to access {3 tool names}. Updated Jan 2026.`
- **Tool title:** `{Game Name} {Tool Name} Calculator (2026) — RobloxCal`
- **Tool meta:** `Use our free {Tool Name} calculator for {Game Name}. Enter your stats and get instant results. Updated Jan 2026.`

**Keyword placement rule**
- Put the **primary keyword** in:
  - Title
  - H1 (see below)
  - First paragraph (first ~100 words)
- Do NOT cram primary into every heading.

### 2.2 H1/H2 structure integration (MUST)
- **H1:** Use the primary keyword (or the exact calculator name that includes it)
  - Tool page H1 example: `Escape Tsunami For Brainrots Rebirth Calculator`
- Use **secondary keywords** as:
  - H2/H3 section headings (2–6 of them)
  - Bullet lists in “Inputs explained / Results explained”
  - One worked example section

**Required sections (tool page)**
- How this calculator works
- Inputs explained (include 2–3 secondary keywords naturally)
- Results explained (include 2–3 secondary keywords naturally)
- Strategy tips (avoid exploits)
- FAQ (see next section)

### 2.3 FAQ integration (RECOMMENDED, quality-safe)
You already have long-tail keywords. Use them as **FAQ question prompts**, but:
- Do NOT add 30 questions of near-duplicates.
- Choose **10–12** “high-intent, distinct” questions per page as visible FAQ.
- The rest can be used as:
  - Body copy subheadings
  - “Related questions” section (collapsed)
  - Internal anchor links

**Schema guidance**
- Add `FAQPage` JSON-LD only for **8–12 best questions** (optional).
- Keep answers helpful and non-repetitive.

---

## 3) Internal linking integration (MUST)

### 3.1 Game hub rules
Each game hub must contain:
- Links to its 3 tool pages (above the fold)
- “Related games” (topic cluster)
  - brainrots: Escape Tsunami ↔ Steal a Brainrot
  - fishing: Fish It ↔ Fisch
  - farming/idle: Grow a Garden ↔ Bee Swarm Simulator

### 3.2 Tool page rules
Each tool page must contain:
- Link back to its game hub
- Links to the other 2 tools in the same game
- Links to 1–2 related games in the same topic
- 1 “Next recommended calculator” CTA (keeps session depth)

---

## 4) Sitemap, indexation, and freshness (MUST)

### 4.1 Sitemap
Ensure sitemap includes all:
- 6 game hubs
- 18 tool pages

If you have an auto-sitemap generator, ensure the new pages are discoverable.

### 4.2 Last updated + changelog
Each page should show:
- `Last updated: Jan 2026` (or dynamic)
- 2+ changelog entries (even small changes are fine)

This helps avoid “stale thin pages” perception and supports iterative updates.

---

## 5) Anti-spam / anti-thin safeguards (MUST)

Google can treat mass pages as low value if they look templated. To mitigate:

### 5.1 Uniqueness budget per page
Enforce per page:
- At least **600–900 words** of unique English copy on tool pages
- 1–2 unique worked examples (numbers differ per page)
- A “Where to find these inputs in-game” section
- A “Common mistakes” section

### 5.2 Keyword density sanity checks
- Primary keyword appears 2–6 times max on a tool page
- Secondary keywords appear 0–2 times each (most will appear once in FAQ/H2)

### 5.3 Duplicate FAQ prevention
- No copying the same FAQ set across pages.
- Keep questions page-specific (rebirth vs ROI vs drop rate etc.)

---

## 6) Implementation checklist (Step-by-step for dev AI)

### Step 0 — Add config
- Add `data/seo/top6-keywords.json`
- Add a loader util: `getSeoForHub(gameSlug)` and `getSeoForTool(gameSlug, toolSlug)`

### Step 1 — Wire metadata
- On Hub route: read `hub.primary` and `hub.secondary`
- Set title/meta/canonical/OG
- Render H1 and intro paragraph referencing primary keyword naturally

### Step 2 — Wire tool page headings & copy
- Read tool `primary` and `secondary`
- H1 uses tool primary
- Pick 4–8 secondary keywords to place:
  - 2–3 in H2 headings
  - 2–3 in FAQ questions
  - 1–2 in body bullets
- Render FAQ list from a per-page `faq_questions` array (unique per page)

### Step 3 — Internal links
- On hub: link to 3 tools + related games
- On tool: link to hub + sibling tools + related games + next CTA

### Step 4 — Sitemap + robots
- Confirm new pages appear in sitemap output
- Confirm canonical correctness and noindex is not set

### Step 5 — QA
- Validate no broken routes
- Validate meta tags present
- Validate structured data parses
- Validate Lighthouse mobile basics
- Validate keyword density is sane

---

## 7) QA Acceptance Criteria (Definition of Done)

For every new page:
- Has 1 primary keyword wired into title + H1 + first paragraph
- Has secondary keywords used naturally in headings/FAQ
- Has canonical URL
- Has internal links (hub ↔ tools ↔ related games)
- Shows last updated + changelog
- No duplicate FAQ blocks across pages
- Calculators function with input validation (no NaN/Infinity)

---

## 8) Appendix: Page list (Top 6)

### Games
- `/games/escape-tsunami-for-brainrots`
- `/games/steal-a-brainrot`
- `/games/fish-it`
- `/games/fisch`
- `/games/bee-swarm-simulator`
- `/games/grow-a-garden`

### Tools (3 per game)
**Escape Tsunami For Brainrots**
- `/games/escape-tsunami-for-brainrots/etfb-rebirth-calculator`
- `/games/escape-tsunami-for-brainrots/etfb-upgrade-roi`
- `/games/escape-tsunami-for-brainrots/etfb-speed-planner`

**Steal a Brainrot**
- `/games/steal-a-brainrot/sab-income-calculator`
- `/games/steal-a-brainrot/sab-roi-calculator`
- `/games/steal-a-brainrot/sab-drop-rate-calculator`

**Fish It!**
- `/games/fish-it/fishit-luck-drop-rate`
- `/games/fish-it/fishit-rare-fish-eta`
- `/games/fish-it/fishit-profit-per-hour`

**Fisch**
- `/games/fisch/fisch-fish-value-calculator`
- `/games/fisch/fisch-target-fish-solver`
- `/games/fisch/fisch-profit-optimizer`

**Bee Swarm Simulator**
- `/games/bee-swarm-simulator/bss-honey-calculator`
- `/games/bee-swarm-simulator/bss-pollen-to-honey`
- `/games/bee-swarm-simulator/bss-honey-per-pollen`

**Grow a Garden**
- `/games/grow-a-garden/gag-crop-value-calculator`
- `/games/grow-a-garden/gag-pet-weight-calculator`
- `/games/grow-a-garden/gag-pet-xp-calculator`

---

## 9) Notes for your AI dev agent

- Treat the keyword pack as **data**, not copy-paste spam.
- Ensure each page reads like a helpful calculator guide.
- Keep formulas transparent and explain assumptions.
- Avoid any exploit/cheat language.

