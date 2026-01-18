# robloxcal.com 首页（/）实现规格：组件拆分 + 数据接口 + metadata + schema 注入点 v1.0
适用：你当前 `afse.zip` 代码库升级后的 **Roblox 工具站网络模式**（`/{game}` 子目录），并已新增 `games` 表。

目标（首页 SEO 定位）：
- 抢泛词：`roblox calculator`、`roblox codes`
- 做权重枢纽：把权重分发给 `/{game}`（Calculator）与 `/{game}/codes`（Codes）
- 保持“新鲜度”：展示最新 codes 更新与热门游戏，提升抓取与回访

---

## 1) 页面信息架构（从上到下）
### 1.1 Hero（首屏）
- H1：`Roblox Calculators & Codes`
- Subtitle：一句话说明「工具 + 可校准更准」
- Game Search（站内搜索框）
- CTA（可选）：`Browse Games` → `/#games`

### 1.2 Featured Games（精选游戏卡片，8–12）
每个 game 卡片必须包含两条链接（SEO 权重分发的机关）：
- 主按钮：`Calculator` → `/{slug}`
- 次按钮：`Codes` → `/{slug}/codes`
并显示：
- game.display_name
- game.short_name
- last_updated（优先 codes 更新，其次 params 更新）
- tool tagline（如：`Profit + Rebirth`）

### 1.3 Latest Code Updates（最新兑换码更新流，5–10）
列表项：
- `{game.short_name} Codes updated` + `updated_at`
- `+X new / Y active`
链接 → `/{slug}/codes`

### 1.4 Popular Calculators（工具类型入口，3–6 个）
卡片链接到 `/{slug}`，展示一句“你能在该工具里得到什么”。

### 1.5 How It Works（简短 3 步）
- Seed → Calibrate → Published Params
CTA：`Improve accuracy` → `/{slug}/calibrate`（只放 1 个主推游戏，避免分散）

### 1.6 FAQ（6 个）
覆盖：
- what is roblox calculator
- accuracy
- how often codes updated
- unofficial disclaimer
- how to use
- why results vary

---

## 2) 组件拆分清单（建议文件路径）
> 路径以 Next.js App Router + 组件目录为参考，你可按自己项目结构微调。

### 2.1 Page / Layout
- `src/app/page.tsx`  
  - 负责：拉取首页数据（server），拼装组件
- `src/app/layout.tsx`  
  - 负责：全站通用 metadata 基础、全站 JSON-LD（可选）

### 2.2 UI Components（首页专用）
- `src/components/home/Hero.tsx`
  - props: `{ queryPlaceholder, totalGames, onSearch? }`
- `src/components/home/GameSearch.tsx`
  - props: `{ games: GameCardModel[] }`
  - 行为：前端过滤/跳转 `/{slug}`
- `src/components/home/FeaturedGamesGrid.tsx`
  - props: `{ games: FeaturedGameModel[] }`
- `src/components/home/FeaturedGameCard.tsx`
  - props: `{ game: FeaturedGameModel }`
  - 必须含：`/{slug}` 与 `/{slug}/codes`
- `src/components/home/LatestCodeUpdates.tsx`
  - props: `{ updates: CodeUpdateModel[] }`
- `src/components/home/PopularCalculators.tsx`
  - props: `{ items: PopularCalculatorModel[] }`
- `src/components/home/HowItWorks.tsx`
  - props: `{ steps: StepModel[], ctaHref }`
- `src/components/home/HomeFAQ.tsx`
  - props: `{ faqs: FAQItem[] }`
- `src/components/SeoJsonLd.tsx`
  - props: `{ json: object }`
  - 用于注入 JSON-LD（`<script type="application/ld+json">`）

### 2.3 共享组件（建议复用）
- `src/components/common/ChameleonSlot.tsx`
- `src/components/common/FooterDisclaimer.tsx`

---

## 3) 数据模型（TypeScript）
### 3.1 `games`（来自 Supabase 表）
```ts
export type GameRow = {
  game_key: string
  slug: string
  display_name: string
  short_name: string | null
  platform: 'roblox'
  is_active: boolean
  theme: any
  seo: any
  updated_at: string
}
```

### 3.2 首页展示模型
```ts
export type FeaturedGameModel = {
  game_key: string
  slug: string
  display_name: string
  short_name: string
  tagline: string
  last_updated_at: string
  codes_active_count?: number
  codes_new_count_7d?: number
}

export type CodeUpdateModel = {
  game_key: string
  slug: string
  short_name: string
  updated_at: string
  active_count: number
  new_count_7d: number
}
```

---

## 4) 首页数据接口（推荐：Server 直接查 Supabase，不必走 API）
> 首页是 SSR/SSG 的“枢纽页”，建议 server-side 直查 Supabase，减少额外 HTTP。

### 4.1 Query A：Active Games 列表
**用途**：搜索框与 Featured 列表候选  
Supabase 查询（伪代码）：
- from `games`
- select `game_key, slug, display_name, short_name, theme, seo, updated_at`
- where `is_active=true` and `platform='roblox'`
- order by `updated_at desc`

### 4.2 Query B：Latest Code Updates（5–10 条）
你需要一个 codes 表（你 AFSE 已有 codes 体系）。推荐做一个聚合 view 或物化统计表。

**方案1（推荐，快且稳定）：新增聚合表 `codes_stats_daily`**
- 每天/每次 codes 更新后写入统计
字段建议：
- `game_key`
- `date`
- `active_count`
- `new_count_7d`（可算）
- `last_updated_at`

首页查询：
- where `date = current_date`（或最新一条）
- order by `last_updated_at desc`
- limit 10

**方案2（无需新表，直接 query codes）**
- from `codes`
- group by `game_key`
- compute:
  - `active_count = count(where is_active=true)`
  - `new_count_7d = count(where created_at >= now()-7d)`
  - `last_updated_at = max(updated_at)`
> 若 codes 数据量很大，这会慢，后续再换方案1。

### 4.3 Query C：Featured Games（8–12 条）
策略：按“last_updated_at（codes优先）” + “置顶权重（手动）”混排。

推荐做一个轻量配置表 `home_featured_games`：
- `game_key`（PK）
- `rank`（越小越靠前）
- `tagline`（首页展示短句）
- `is_featured`

首页查询：
- join `games` + `home_featured_games`
- order by `rank asc`
- limit 12

> 这样你能把 AFSE/Brainrot/Bomb Chip 固定在前 3 位，不被更新时间打乱。

---

## 5) Next.js metadata（注入点与模板）
### 5.1 `src/app/page.tsx`（首页 metadata）
建议用 `export const metadata` 或 `generateMetadata()`。

**Title（50–60 字符）**：
- `RobloxCal — Roblox Calculators & Latest Codes`

**Description（140–160 字符）**：
- `RobloxCal provides Roblox calculators (training, profit, odds) and updated codes for top games like AFSE, Bomb Chip, and Craft a Brainrot.`

**Keywords（少量）**：
- `roblox calculator, roblox codes, roblox calculators`

**Open Graph / Twitter**
- og:title / og:description
- og:url = `https://robloxcal.com/`
- og:image（可选：你自建通用封面）

**Canonical**
- 在 `<head>` 中注入 `<link rel="canonical" href="https://robloxcal.com/" />`

### 5.2 首页内容层 SEO 要点
- H1 只出现一次：`Roblox Calculators & Codes`
- H2 分区：Featured / Latest Updates / Popular Calculators / How it works / FAQ
- 所有 Featured 卡片的主链接锚文本包含 `Calculator`，codes 链接锚文本包含 `Codes`

---

## 6) Schema（JSON-LD）注入点与内容
在 `src/app/page.tsx` 中，渲染一次或两次 `SeoJsonLd` 组件。

### 6.1 WebSite + SearchAction（建议首页必做）
注入点：Hero 区附近（但放 page 最上方也行）

示例（字段可按需调整）：
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RobloxCal",
  "url": "https://robloxcal.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://robloxcal.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

> 说明：即使你用前端过滤搜索，也可以把 `/?q=` 做成可解析参数（可选：生成一个搜索结果页或在首页读取 q 过滤）。

### 6.2 ItemList（Featured Games 列表，强烈建议）
注入点：FeaturedGamesGrid 下方

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Featured Roblox Game Calculators",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "AFSE Calculator", "url": "https://robloxcal.com/afse" },
    { "@type": "ListItem", "position": 2, "name": "Craft a Brainrot Calculator", "url": "https://robloxcal.com/craft-a-brainrot" }
  ]
}
```

### 6.3 FAQPage（首页 FAQ）
注入点：FAQ 组件渲染处

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type":"Question", "name":"Is RobloxCal official?", "acceptedAnswer": { "@type":"Answer", "text":"No. RobloxCal is an unofficial fan-made tools site..." } }
  ]
}
```

---

## 7) “数据更新”与缓存策略（SEO 新鲜度 + 性能）
### 7.1 首页渲染策略
推荐 **ISR**（Incremental Static Regeneration）：
- `revalidate: 900`（15 分钟）或 3600（1小时）
- Latest updates 会按频率刷新，利于抓取与用户回访

### 7.2 API/DB 缓存建议
- codes stats 可用 Supabase 视图/表减少计算
- Featured 配置用表，避免每次计算排序逻辑

---

## 8) 验收标准（DoD）
- 首页首屏 H1、搜索框、Featured 游戏卡片显示正确
- 每个 Featured 卡片都同时链接 `/{slug}` 与 `/{slug}/codes`
- Latest Code Updates 列表链接正确且数据真实
- metadata（title/description/og/canonical）在 View Source 可见
- JSON-LD（WebSite、ItemList、FAQPage）能在源代码中找到且为合法 JSON
- 首页在移动端布局无横向滚动、CLS 低（广告/占位高度固定）

---

## 9) 你可以直接复制给 AI 的任务拆分（建议顺序）
1) 新增 `home_featured_games` 表与 seed（AFSE/Brainrot/BombChip 排序与 tagline）
2) 实现首页 server data loader（三个 query：games、featured、latest updates）
3) 实现组件（Hero/Featured/Latest/Popular/HowItWorks/FAQ）
4) 注入 metadata + canonical
5) 注入 JSON-LD（WebSite/SearchAction + ItemList + FAQPage）
6) ISR revalidate + 性能优化（图片、缓存）
