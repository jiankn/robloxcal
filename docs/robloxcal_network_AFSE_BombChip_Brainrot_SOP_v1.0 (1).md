# robloxcal.com 多游戏工具站网络：AFSE + Bomb Chip + Craft a Brainrot（落地实施手册 v1.0）
域名：**robloxcal.com**  
模式：**Calculator Network + Codes 双管齐下**（只做 Roblox）  
新增游戏与 slug：
- Anime Fighting Simulator: Endless → `/afse`（已完成，需迁移到子目录网络）
- Bomb Chip → `/bomb-chip`（MVP：位置推荐 + odds + codes + 校准）
- Craft a Brainrot → `/craft-a-brainrot`（MVP：profit + rebirth + codes + 校准）

> 目标：你把这份文档交给 AI 开发（Antigravity/Cursor/Codex），按步骤改造现有 `afse.zip` 代码库，一次性上线可运营版本，并可继续扩站。

---

## 0. 总体原则（你要赚钱：SEO + 体验）
1) **每个游戏一个主工具首页**：`/{game}` 首屏即可算出结论（别做“导航站”）。  
2) **Codes 是最大引流门**：`/{game}/codes` 必须可收录、可更新、可回访，并把权重回流到 `/{game}`。  
3) **结果页矩阵是规模化**：用固定档位 programmatic SEO，拒绝无限生成薄页。  
4) **可校准是护城河**：低置信度先 noindex，样本足够再放开，保护整站质量。  
5) **UI 统一模板**：三站同一套组件与布局，只换游戏主题色/文案/数据模块。

---

## 1. 站点信息架构（单域名 + 子目录）
### 1.1 全站入口
- `/`：Roblox Game Directory（游戏列表 + 搜索 + 热门工具入口）
- `/sitemap.xml`：动态生成，包含所有 active games 的核心页 + 结果页矩阵（固定档位）
- `/robots.txt`：允许抓取核心页，禁止 `/admin`、`/api`

### 1.2 每个游戏的固定骨架（必须一致）
- `/{game}`：主工具（Calculator）
- `/{game}/codes`：兑换码（Active/Expired + 年/月归档）
- `/{game}/calibrate`：校准（让工具越用越准）
- `/{game}/data`：数据页（可选，但建议至少 1 个承接搜索）
  - AFSE：`/{game}/training-areas`
  - Bomb Chip：`/{game}/patterns`（对手模式统计）或 `/{game}/odds`
  - Brainrot：`/{game}/recipes`（配方表）

> 内链规则（硬性）：`/{game}/codes` 与所有长尾页顶部必须放 CTA：**Use {Game} Calculator** → `/{game}`。

---

## 2. slug 命名与规范
采用短横线、全小写，利于 SEO 与可读性：
- `afse`
- `bomb-chip`
- `craft-a-brainrot`

在数据库的 `games` 表中保存 `slug`，路由使用 `[game]` 动态匹配并校验是否存在。

---

## 3. 数据库与配置（Supabase）
你现有的 AFSE 表可以继续使用，但为“网络模式 + 两个新游戏”必须补齐以下通用表。

### 3.1 新增 `games` 表（必做）
```sql
create table if not exists games (
  game_key text primary key,          -- 内部 key，例如 "afse"
  slug text not null unique,          -- URL slug，例如 "bomb-chip"
  display_name text not null,         -- 展示名
  short_name text,                    -- 简称（用于 title）
  platform text not null default 'roblox',
  roblox_place_id bigint,
  is_active boolean not null default true,
  theme jsonb not null default '{}'::jsonb,   -- { "accent":"#...", "icon":"..." }
  seo jsonb not null default '{}'::jsonb,     -- { "title_template":"", "description":"", "keywords":[...] }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

插入三款游戏：
```sql
insert into games(game_key, slug, display_name, short_name, is_active)
values
 ('afse','afse','Anime Fighting Simulator: Endless','AFSE', true),
 ('bomb_chip','bomb-chip','Bomb Chip','Bomb Chip', true),
 ('brainrot','craft-a-brainrot','Craft a Brainrot','Brainrot', true)
on conflict (game_key) do nothing;
```

### 3.2 站点设置（你已有则复用）
- `site_settings.ads_enabled`（变色龙占位符/AdSense 切换）
- `site_settings.ads_client`、`slot_ids`…

---

## 4. 代码改造：从 AFSE 单站 → 网络站（一次性完成）
> 你的 `afse.zip` 已经包含主要页面与 API，但目前还是根路由单站，且存在 `afse` 硬编码。

### Step 4.1 路由搬迁（App Router）
把现有页面从根路由迁移到 `src/app/[game]/...`。

**目标目录结构：**
```
src/app/
  page.tsx                      # / 目录页（Game Directory）
  [game]/layout.tsx             # 游戏统一 layout（SEO/导航/面包屑）
  [game]/page.tsx               # /{game} 主工具
  [game]/codes/page.tsx         # /{game}/codes
  [game]/calibrate/page.tsx     # /{game}/calibrate
  [game]/dps/page.tsx           # (AFSE 现有；其他游戏可先占坑 noindex)
  [game]/training-areas/page.tsx# (AFSE)
  [game]/recipes/page.tsx       # (Brainrot)
  [game]/odds/page.tsx          # (Bomb Chip)
```

### Step 4.2 新增 `GameResolver`（校验 slug 与读取配置）
在 `[game]/layout.tsx`：
- 读取 params.game（slug）
- 查询 Supabase `games` 表，找不到就 404
- 注入 `GameContext`（game_key、slug、display_name、theme、seo）

### Step 4.3 消灭硬编码 `afse`
全仓搜索替换：
- 前端 fetch：`game=afse` → 用 `GameContext.game_key` 或 URL slug 映射
- API：`calibrate`、`cron` 中写死 `afse` 的地方必须改为动态 `game_key`

### Step 4.4 兼容旧链接（避免已收录流量丢失）
用 Next.js redirects（或 middleware）：
- `/codes` → `/afse/codes`
- `/dps` → `/afse/dps`
- `/training-areas` → `/afse/training-areas`
- `/calibrate` → `/afse/calibrate`

---

## 5. API 设计（统一、多游戏、可扩展）
### 5.1 通用 API（所有游戏共享）
- `GET /api/v1/games`：返回 active games（用于 `/` 目录页）
- `GET /api/v1/site-settings`：返回白名单设置（ads_enabled 等）
- `GET /api/v1/codes?game_key=...`：codes 列表（active/expired）
- `POST /api/v1/codes/admin-upsert`：后台更新 codes（admin 权限）

### 5.2 每个游戏的 Calculator Config
- `GET /api/v1/calculator/config?game_key=...&version=active`
  - 返回：该游戏的 calculator 配置 + published params + seed data（按模块）

> 说明：你原先 AFSE 的 `optimizer/config` 可以演进为 `calculator/config`，或保留 `optimizer/config` 但仅用于 AFSE。为了后续扩站，建议统一成 `calculator/config`。

### 5.3 校准入口（可校准系统）
- `POST /api/v1/calibrate`
  - body：`game_key` + `module` + `payload`（不同游戏不同 payload） + `metrics`
  - server：写入 samples，计算 `quality_score`，用于聚合

### 5.4 Cron（聚合发布参数）
- `POST /api/v1/cron/aggregate?game_key=optional`
  - 若未传 game_key：遍历 `games.is_active=true` 全部聚合
  - 聚合输出写到 `published_params`（按模块）

---

## 6. 新增“模块化”可校准数据层（适配不同游戏）
AFSE 是“训练参数”，Bomb Chip 是“对局策略参数”，Brainrot 是“价格/配方/转生倍率”。  
为了不重构 AFSE 的表结构、又能快速扩两站，建议加一套通用模块表：

### 6.1 通用样本表 `calc_samples`
```sql
create table if not exists calc_samples (
  id bigserial primary key,
  game_key text not null,
  module text not null,              -- "afse_training" | "bombchip_strategy" | "brainrot_economy"
  version_key text not null default 'active',
  user_id uuid,
  ip_hash text,
  payload jsonb not null,            -- 原始输入（不同模块不同结构）
  metrics jsonb not null,            -- 观测结果（gain、win/loss、prices...）
  quality_score double precision not null default 0.5,
  is_flagged boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_calc_samples on calc_samples(game_key, module, created_at);
```

### 6.2 通用发布参数表 `published_params`
```sql
create table if not exists published_params (
  id bigserial primary key,
  game_key text not null,
  module text not null,
  version_key text not null default 'active',
  params jsonb not null,              -- 聚合后的可用参数
  sample_count int not null default 0,
  confidence double precision not null default 0,
  last_aggregated_at timestamptz,
  unique (game_key, module, version_key)
);
```

> AFSE 现有的 `training_area_params` 可以保留继续用；但建议长期也迁移到 `published_params` 模块化结构，降低未来新增游戏的成本。

---

## 7. 新游戏 1：Bomb Chip（/bomb-chip）落地规格
### 7.1 目标（首屏给答案）
用户 10 秒内得到：
- **推荐投放位置 Top M**（位置推荐）
- **命中概率/胜率估计**（odds）
- 可解释：为什么推荐（对手最近偏好）

### 7.2 页面与路由
- `/bomb-chip`：Bomb Placement Optimizer（主工具）
- `/bomb-chip/odds`：Odds Calculator（可直接作为结果页落地）
- `/bomb-chip/codes`：codes
- `/bomb-chip/calibrate`：校准（提交对局结果，优化策略参数）

### 7.3 MVP 输入/输出（UI 设计为“点选”）
**输入：**
- N（chips 数量）
- M（bomb 数量）
- 对手最近 K 回合选择（列表/点击选择：位置 1..N 或网格格子）
- “保守/激进”滑杆（影响推荐策略）

**输出：**
- 推荐位置列表：Top M
- 每个位置的 odds（命中概率/期望收益）
- 热力图（网格模式时）或条形排序（线性模式）

> UI 建议：默认用 “线性编号 1..N”，提供“切换网格显示”按钮（美观+易用）。

### 7.4 算法（先上线，后迭代）
**v1（上线可用）**：
- recency-weighted frequency：越近权重越高
- 输出 Top M
- odds（简化）：按对手选择分布近似概率

**v1.1（校准后自动变准）**：
- 将“recency 衰减系数、K 值、保守/激进权重”作为可学习参数
- 用用户提交的对局结果（win/loss）做聚合，找到更优参数组合

### 7.5 校准（模块：bombchip_strategy）
**校准页提交：**
- N、M
- 本局对手选择序列（或 top positions + counts）
- 你实际投放位置（可选）
- 结果：win / loss
- （可选）你是否按推荐执行

**聚合目标（published_params.params）：**
- `{ "recency_alpha": 0.85, "k": 8, "risk_weight": 0.6 }`
- 按 N/M 分桶（可选）：不同局规模参数不同

**反作弊：**
- 同 IP 频率限制
- 低质量样本（极端值/明显乱填）降权

---

## 8. 新游戏 2：Craft a Brainrot（/craft-a-brainrot）落地规格
### 8.1 目标（首屏给答案）
用户输入少量数据即可得到：
- **最赚钱配方 Top 10（profit/min）**
- **下一步路线建议（从低到高）**
- **什么时候 rebirth 最划算（break-even）**

### 8.2 页面与路由
- `/craft-a-brainrot`：Profit Optimizer（主工具）
- `/craft-a-brainrot/rebirth`：Rebirth Calculator（也可合并在主工具 Tab）
- `/craft-a-brainrot/recipes`：配方表（数据页承接搜索）
- `/craft-a-brainrot/codes`：codes
- `/craft-a-brainrot/calibrate`：提交你服务器的价格/倍率（让工具更准）

### 8.3 数据模型（Brainrot economy）
你需要三类数据：
- ingredients（材料）
- recipes（配方：输入材料 → 产出）
- economy params（卖价、制作时间、rebirth multiplier、premium bonus…）

建议先用 seed 表（手工/社区）起步，再靠校准飞轮更新。

### 8.4 MVP 计算公式（可解释、可维护）
- `cost = Σ ingredient_qty * ingredient_price`
- `revenue = sell_price(output_item)`
- `profit = revenue - cost`
- `profit_per_min = profit / craft_time_min`（如果 craft_time 未知则先用相对排序）

Rebirth：
- 输入：当前 cash_rate（由 profit_per_min 推出）、rebirth_cost/requirement、rebirth_multiplier
- 输出：break-even minutes（回本时间）
- 建议：比较 “现在 rebirth vs 再刷 X 分钟 rebirth” 两条曲线

### 8.5 校准（模块：brainrot_economy）
**校准页提交（30 秒版本）：**
- 选择服务器/地区（可选）
- 输入 5~10 个常见材料价格
- 输入 3~5 个常见成品卖价
- 输入当前 rebirth multiplier（若可见）

**聚合输出（published_params.params）：**
- `ingredient_prices`（中位数/截尾均值）
- `sell_prices`
- `rebirth_multiplier`（按版本/时间窗口）

**noindex 保护：**
- 当样本不足（confidence < 0.25）时，`/recipes` 可 index，但 `/best-profit/...` 等结果页先 noindex。

---

## 9. Codes 系统（所有游戏通用、强 SEO）
### 9.1 页面规范（必须）
- `/{game}/codes`：Active / Expired 分组
- 显示：last updated（真实）
- Code 卡片：一键复制 + “如何兑换”（短步骤）
- 页面顶部 CTA：Use {Game} Calculator → `/{game}`

### 9.2 归档页（模板化 programmatic SEO）
- `/{game}/codes/2026`
- `/{game}/codes/2026/january`
- `/{game}/codes/expired`

> 每个归档页不需要长文，但必须有独特标题、清晰结构与 FAQ。

---

## 10. Programmatic SEO：结果页矩阵（固定档位）
> 只做有限集合，避免 crawl budget 与薄页风险。

### 10.1 AFSE（你已做）
- `/{game}/time-to-reach/{stat}/{target}`
- `/{game}/best-training-area/{stat}/{current}`
档位：1k/10k/100k/1m/10m/100m/1b

### 10.2 Bomb Chip
- `/{game}/best-bomb-placements?n=..&m=..` 不建议（query 造成重复）
建议做固定档位：
- `/{game}/odds/{n}/{m}`（n chips, m bombs）
- `/{game}/best-placements/{n}/{m}`

档位：n=8/10/12/15/20；m=1/2/3/4（按游戏常见局规模选 15~30 个组合即可）

### 10.3 Brainrot
- `/{game}/best-profit/early`
- `/{game}/best-profit/mid`
- `/{game}/best-profit/late`
- `/{game}/rebirth/when-to-rebirth`
（阶段固定，不要无限生成）

### 10.4 noindex 策略（非常重要）
以下页面默认 noindex，直到 confidence 达标：
- Bomb Chip：`/best-placements/*`（如果样本太少）
- Brainrot：`/best-profit/*`、`/rebirth/*`（如果价格样本不足）

---

## 11. UI/UX 规范（美观 + 复制效率）
### 11.1 统一三段式布局（所有游戏同样式）
- 顶部：Game Header（图标 + 名称 + 3 个胶囊 Tab：Calculator / Codes / Calibrate）
- 中部：Calculator Panel（输入卡片 + 主按钮）
- 下部：Result Cards（Top 推荐 + 解释 + confidence + CTA）

### 11.2 设计风格建议（你要“好看且不费时间”）
- 统一使用 shadcn/ui Card/Button/Tabs
- 深色模式默认支持（游戏用户偏好）
- 微动效：结果出现时淡入（Framer Motion）
- 广告位：统一高度，未过审显示 ChameleonSlot（合规标识“Sponsor slot”）

### 11.3 Bomb Chip UI（推荐）
- 位置选择：chips grid（可切换线性/网格）
- 推荐结果：热力图 + Top 列表（更“工具感”更利于分享）

### 11.4 Brainrot UI（推荐）
- 左侧：价格输入（材料/卖价）+ boost（premium/gamepass）
- 右侧：Top10 利润表 + Rebirth 回本卡片（非常直观）

---

## 12. 上线与验证（你要的是赚钱站）
### 12.1 第 1 周（上线 3 游戏网络）
- 完成路由网络化（`/{game}`）
- AFSE 迁移并做 redirects
- Bomb Chip：主工具 + odds + codes + calibrate
- Brainrot：profit + rebirth + recipes + codes + calibrate
- 动态 sitemap（至少包含核心页）

### 12.2 第 2 周（SEO 放大）
- Codes 归档页模板（按月/年/expired）
- AFSE 结果页矩阵扩大（如未完成）
- Bomb Chip 增加 odds 固定档位页（15~30 个）
- Brainrot 增加阶段页（early/mid/late + rebirth）

### 12.3 KPI（你可以在 Analytics 看）
- `/codes` 的自然流量占比与回访率
- `/{game}` 的停留时长与 CTA 点击率
- `calibrate` 提交量（决定工具能否变准）
- 结果页收录数与自然点击

---

## 13. 交付清单（AI 开发输出应包含）
- Next.js 路由迁移完成（`/{game}`）
- `games` 表 + 3 游戏配置写入
- 新增 `calc_samples` / `published_params`（用于两新游戏模块化校准）
- Bomb Chip 模块：页面 + 算法 v1 + 校准表单 + 聚合 cron
- Brainrot 模块：profit + rebirth + recipes + 校准 + 聚合 cron
- Codes 系统：多游戏化 + 归档页 + CTA 回流
- 动态 sitemap + canonical + schema + noindex 策略
- ChameleonSlot（ads_enabled=false）与 AdSense 切换（ads_enabled=true）

---
