# AFSE 工具站（可校准系统）PRD + 开发规格 v1.0（一步到位可上线）
面向：**模式六 SEO 免费流量套利**（Roblox 热门游戏工具站）  
产品目标：用一个**训练优化器（Training Optimizer）**做“杀手级工具”，通过**校准系统（Calibration System）**自动变准；配合 **Codes / Tier List / 数据页 / Guides** 做 SEO 批量覆盖；广告未过审期间用 **“变色龙占位符”**保证页面布局与收益预热。

> 你可以直接把这份文档丢给你的 AI 开发（Cursor/Antigravity/Claude/Codex 等），按步骤生成项目、数据库、API、页面、部署，一次性上线。

---

## 0. 产品本质（你要抓住的核心）
工具站赢的不是“内容多”，而是：
1) **把玩家决策点变成可计算结果**（去哪练、练多久、开哪些加成）  
2) **算得准**（哪怕起步不准，也要能“越用越准”）  
3) **可复制**（模板化：换个游戏就能复用）

本项目把“准”变成系统能力：**采样 → 验证 → 聚合 → 发布参数**，自动滚动迭代。

---

## 1. MVP 范围（第一版就能上线赚 SEO）
### 1.1 必做页面（上线就能跑）
- `/` 首页：**Training Optimizer**（主工具 + 输出推荐 + CTA）
- `/calibrate` 校准页：用户提交一次样本（30 秒），让模型变准
- `/codes` 兑换码页（高频引流）
- `/training-areas` 训练区数据页（可搜索/筛选）
- `/faq` 常见问题 + 免责声明
- `/sitemap.xml`、`/robots.txt`

### 1.2 第二优先（第2周补齐）
- `/dps` DPS/伤害计算器（先做 MVP 占坑 SEO；技能倍率表后续补齐）
- `/tier-list/*`（训练区/变身/技能等榜单）
- `/guides/*`（长尾问题攻略，强内链回首页）

---

## 2. 站点信息架构（SEO + 权重回流）
**核心原则：所有辅助页面（codes/tier/guides/数据页）都要把权重喂给首页主工具。**
- 首页：直接可算（输入框在首屏）
- 辅助页：解决搜索意图 → 给出答案 → 引导使用计算器（内链）

### 2.1 工具矩阵落地方式（方案B：首页主工具 + 独立工具页）
采用 **方案B**：把三类高价值工具（效率/收益、DPS、兑换码）放在同一个站里，但每个工具都用**独立 URL**承载 SEO。

- 首页 `/`：Training Optimizer（效率/收益，主杀手工具）
- `/dps`：DPS/伤害计算器（战斗决策）
- `/codes`：兑换码追踪器（高频引流）

互相内链规则（必须）：
- `/codes` 与 `/dps` 页面顶部与正文中都放 CTA：**Use AFSE Training Optimizer** → `/`
- 首页结果区下方放卡片入口：**DPS Calculator** → `/dps`、**Codes** → `/codes`
- 所有 guides/tier/data 页都内链回 `/`（锚文本固定：`AFSE Calculator` / `Training Optimizer`）

这样做的目的：
- SEO：每个工具独立吃关键词（calculator/dps/codes），互相传权重
- 体验：用户在同一站内完成全链路决策（去哪练→怎么打→领什么码）

推荐 URL 结构：
- `/`（主工具）
- `/codes`
- `/dps`
- `/training-areas`
- `/training-areas/[stat_type]`（strength/chakra/sword/speed/agility/durability）
- `/tier-list/training-areas`
- `/guides/leveling-fast`
- `/guides/how-to-fly`
- `/guides/rebirth-roi`

---

## 3. 技术栈（建议：最快上线 & 可复制）
- 前端：Next.js 15 + App Router + TypeScript
- UI：Tailwind + shadcn/ui
- 数据库：Supabase Postgres
- Auth：Supabase Auth（可选；匿名也能提交样本，但权重低）
- ORM：Prisma（可选；也可直接 SQL）
- 部署：Vercel
- 任务：Supabase Cron / Vercel Cron（做聚合、重算、发布）

---

## 4. 数据层升级：从“静态表”到“可校准系统”
你已经有两张 seed 表（training areas / boost sources）。现在升级为 **三层模型**：

### 4.1 三层数据模型（必须）
1) **Seed 层（种子）**：来自公开信息/社区（不一定准）
2) **Sample 层（样本）**：用户/你自己提交的“观测数据”
3) **Published 层（发布参数）**：系统聚合后的“当前版本最可信参数”，供实时计算器使用

> 实时计算器只读 **Published 层**，避免被垃圾样本影响；后台定时任务从 Sample 自动更新 Published。

---

## 5. 数据库表结构（Postgres / Supabase）
> 下面是生产可用的 schema。你可以用 Prisma 生成，也可以直接执行 SQL。

### 5.1 核心表：游戏版本桶（解决游戏更新导致漂移）
```sql
create table if not exists game_versions (
  id bigserial primary key,
  game_key text not null,                  -- e.g. "afse"
  version_key text not null,               -- e.g. "2026-01-13" or "v1.0"
  status text not null default 'active',   -- active | archived
  created_at timestamptz not null default now(),
  notes text
);
create unique index if not exists uq_game_versions on game_versions(game_key, version_key);
```

### 5.2 训练区定义（可从你的 seed 导入）
```sql
create table if not exists training_areas (
  id bigserial primary key,
  game_key text not null,
  stat_type text not null,                  -- strength/chakra/...
  area_name text not null,
  required_stat_value bigint not null default 0,
  -- 注意：这里不存“最终倍率”，而存可校准的参数
  seed_area_multiplier double precision,    -- 种子倍率（可空）
  seed_source text,
  created_at timestamptz not null default now()
);
create index if not exists idx_training_areas_lookup on training_areas(game_key, stat_type, required_stat_value);
```

### 5.3 Boost 来源（倍率开关/封顶规则）
```sql
create table if not exists boost_sources (
  id bigserial primary key,
  game_key text not null,
  boost_key text not null,                  -- vip_gamepass / weekend / server_boost / code_boost_2 / multi_cap_default ...
  boost_name text not null,
  value_type text not null,                 -- multiplier | percent_bonus | cap
  value double precision,
  applies_to text,                          -- global/training/...
  stack_rule text,                          -- multiplicative / add_then_multiply / cap
  seed_source text,
  created_at timestamptz not null default now()
);
create unique index if not exists uq_boost_sources on boost_sources(game_key, boost_key);
```

### 5.4 样本表：训练观测（校准入口写入）
```sql
create table if not exists training_samples (
  id bigserial primary key,
  game_key text not null,
  version_key text not null,                -- 外键逻辑关联 game_versions
  user_id uuid,                             -- supabase auth user id，可空（匿名）
  ip_hash text,                             -- 用于限流/防刷（不要存明文IP）
  user_agent text,
  stat_type text not null,
  area_id bigint not null references training_areas(id),
  duration_sec int not null check (duration_sec between 30 and 1800),
  start_stat numeric not null,
  end_stat numeric not null,
  observed_gain_per_min numeric not null,   -- (end-start)/(duration/60)
  -- 用户当时勾选的加成
  boosts jsonb not null default '{}'::jsonb, -- { "vip_gamepass": true, "weekend": true, "code_boost": 2, "server_boost": true, ... }
  multi_value numeric,                       -- 玩家当前 multi（如果采集得到）
  created_at timestamptz not null default now(),
  -- 系统风控
  quality_score double precision not null default 0.5,
  is_flagged boolean not null default false,
  flag_reason text
);
create index if not exists idx_samples_area_time on training_samples(game_key, version_key, area_id, created_at);
```

### 5.5 聚合表：训练区发布参数（实时计算只读这里）
```sql
create table if not exists training_area_params (
  id bigserial primary key,
  game_key text not null,
  version_key text not null,
  area_id bigint not null references training_areas(id),
  -- 你可以选择两种参数化方式之一：
  -- A) base_gain_per_min（基础增益）+ area_multiplier
  base_gain_per_min numeric,               -- 可校准（推荐）
  area_multiplier numeric,                 -- 可校准（可空）
  -- 发布可信度
  sample_count int not null default 0,
  confidence double precision not null default 0.0,  -- 0~1
  last_aggregated_at timestamptz,
  notes text,
  unique (game_key, version_key, area_id)
);
```

### 5.6 可选：用户可信度（越用越准的关键）
```sql
create table if not exists user_trust (
  id bigserial primary key,
  game_key text not null,
  user_id uuid,
  ip_hash text,
  trust_score double precision not null default 0.3, -- 0~1
  sample_count int not null default 0,
  flagged_count int not null default 0,
  updated_at timestamptz not null default now(),
  unique (game_key, user_id, ip_hash)
);
```

---

## 6. 实时计算器：Training Optimizer 计算逻辑（Published-only）
### 6.1 计算目标
回答：
- 我现在（某 stat 值）应该去哪个训练区练最划算？
- 开了哪些 boost 后，每分钟大概涨多少？
- 达到目标数值需要多久？

### 6.2 核心公式（版本1：可解释、好维护）
> 在没有完全掌握游戏隐藏公式前，先用稳健模型：**线性增益 × 倍率叠加**  
> 随着样本积累，base_gain 会收敛到真实水平。

#### 计算总倍率（mult_total）
规则：
- `value_type=multiplier`：直接相乘
- `value_type=percent_bonus`：先转 multiplier = (1 + value) 再相乘
- `value_type=cap`：最后对 mult_total 或 multi_value 做截断（见下）

伪代码：
```ts
function computeMultTotal(boostsSelected, boostSources, multiValue): {multTotal: number, capInfo?: any} {
  let mult = 1.0;
  let cap: number | null = null;
  let hasNoLimit = boostsSelected["no_limit"] === true;

  for (const src of boostSources) {
    if (!isSelected(src, boostsSelected)) continue;

    if (src.value_type === "multiplier") mult *= src.value;
    if (src.value_type === "percent_bonus") mult *= (1 + src.value);
    if (src.value_type === "cap" && src.boost_key === "multi_cap_default") cap = src.value;
  }

  // multi cap（如果你用 multiValue）
  if (!hasNoLimit && cap && multiValue) {
    const cappedMulti = Math.min(multiValue, cap);
    // 你可以选择：mult *= cappedMulti 或 mult *= (cappedMulti / baseMulti) 取决于你如何定义 multiValue
    // 建议：把 multiValue 作为单独乘子：mult *= cappedMulti
    mult *= cappedMulti;
  }

  return { multTotal: mult, capInfo: {cap, hasNoLimit} };
}
```

#### 训练区每分钟收益（gain_per_min）
从 `training_area_params` 取发布参数：
- 如果 `base_gain_per_min` 存在：  
  `gain_per_min = base_gain_per_min × mult_total`
- 如果你同时维护 `area_multiplier`：  
  `gain_per_min = base_gain_per_min × area_multiplier × mult_total`

### 6.3 推荐算法（Top 3）
步骤：
1) 取该 stat_type 的所有训练区（按 required_stat_value 升序）
2) 过滤：required_stat_value <= 当前 stat（可进）
3) 对每个 area 计算 gain_per_min（使用 Published 参数）
4) 按 gain_per_min 降序排序，返回 Top 3

输出字段建议：
- area_name
- required_stat_value
- estimated_gain_per_min
- confidence（来自训练区参数）
- “为什么推荐”：显示你勾选的 boost 与当前版本参数更新时间

### 6.4 达到目标所需时间
```text
minutes_needed = max(0, target_stat - current_stat) / estimated_gain_per_min
```
如果 gain_per_min 很小或 confidence 太低：提示“数据不足，建议去校准页提交一次”。

---

## 7. 校准系统：后台如何“自动更新参数”
核心：把每条样本反推为“训练区基础增益”，然后对同一训练区做稳健聚合。

### 7.1 样本写入（/calibrate）
当用户提交：
- 前后 stat、时长、训练区、勾选 boost
系统计算：
- observed_gain_per_min = (end-start) / (duration/60)

并进行基础校验：
- end > start
- duration 在 30~1800 秒
- observed_gain_per_min 不超过合理上限（可先用 p99 动态阈值）

### 7.2 样本质量评分（quality_score）
quality_score（0~1）用于加权聚合（抗作弊）：
- 是否登录：+0.1
- 同用户历史一致性：+0.1~0.3
- 极端离群：-0.3 并 flagged
- 同 IP 高频提交：-0.2
- duration 太短（<60s）：-0.1

伪代码（示例）：
```ts
score = 0.5
if (user_id) score += 0.1
if (duration_sec >= 120) score += 0.05
if (isOutlier(observed_gain_per_min, area_recent_distribution)) { score -= 0.3; flagged=true }
if (tooManyFromIp(ip_hash, 24h)) score -= 0.2
score = clamp(score, 0, 1)
```

### 7.3 反推基础增益（estimated_base_gain）
你要一个统一模型，把 boost 影响除掉：
```text
estimated_base_gain = observed_gain_per_min / mult_total(boosts, published boost values)
```

> 注意：如果 boost 值本身也不确定，你可以先固定部分“官方确定项”，其它作为“可疑项”不参与除法，避免模型震荡。

### 7.4 稳健聚合（每小时/每天跑一次）
对每个 (game_key, version_key, area_id)：
- 取最近 N 天样本（例如 14 天）
- 过滤：flagged 样本剔除；quality_score < 0.2 剔除
- 用加权中位数 / 截尾均值 聚合：

**推荐：加权截尾均值（trimmed mean）**
1) 取 estimated_base_gain 列表
2) 按数值排序
3) 去掉头尾各 10%（可配置）
4) 按 quality_score 做加权平均

生成：
- base_gain_per_min（发布值）
- sample_count
- confidence（见下）

### 7.5 confidence 计算（0~1）
简单可用的方式：
- 样本数越多越高
- 方差越小越高
- 最近 7 天与历史差异越大越低（可能更新）

示例：
```text
conf_n = 1 - exp(-sample_count / 20)
conf_var = 1 / (1 + (stddev/median)^2)
confidence = clamp(0.15 + 0.55*conf_n + 0.30*conf_var, 0, 1)
```

### 7.6 发布参数写入 training_area_params
- upsert 写入 base_gain_per_min, sample_count, confidence, last_aggregated_at

> **实时计算器只读这里**，不会直接用样本算，避免瞬时被污染。

---

## 8. Boost（倍率）也能校准吗？
可以，但建议分阶段：
- v1：只校准 training area 的 base_gain（收益最大、最稳）
- v2：校准 VIP/Weekend/Server Boost 的 multiplier（需要对照样本分组）

v2 方法（示例）：
- 对同训练区同版本，分成 “勾选 VIP” vs “未勾选 VIP”
- 比较两组估计 base_gain 的系统偏移，反推 VIP multiplier
- 仅当样本足够且分组显著时才更新 boost_sources（并保留历史版本）

---

## 9. 后台管理（Admin）——你需要的最小控制面
建议做一个 `/admin`（仅你账号可见）：
- 样本列表：flag/unflag、查看离群原因
- 训练区参数：查看 base_gain、confidence、样本数、趋势图（近7天）
- 版本桶管理：发现漂移 → 一键创建新 version_key（例如日期）
- 数据导入：CSV 导入训练区/boost seed
- SEO 工具：生成 sitemap、查看 top pages

---

## 10. API 设计（Next.js Route Handlers）
### 10.1 公共 API
- `GET /api/v1/optimizer/config?game=afse&version=active`
  - 返回：训练区列表 + published params + boost sources（用于前端计算/渲染）
- `GET /api/v1/dps/config?game=afse&version=active`（第2周上线）
  - 返回：技能/武器/变身的种子数据与发布参数（用于 DPS 计算器；可先返回空结构占坑）
- `POST /api/v1/calibrate`
  - body：area_id, stat_type, duration_sec, start_stat, end_stat, boosts, multi_value?
  - server：计算 observed_gain_per_min、quality_score、写入 samples
- `GET /api/v1/codes`
  - 返回 codes（可先手工 JSON；后续加爬虫/订阅）

### 10.2 后台任务 API（Cron）
- `POST /api/v1/cron/aggregate-training-params`
  - 权限：cron secret
  - 对 samples 聚合写入 training_area_params
- （可选）`POST /api/v1/cron/detect-drift`
  - 检测是否发生版本漂移：近 48h 与历史差异显著 → 通知你

---

## 11. 前端页面规格（可直接做组件）
### 11.1 首页（/）组件清单
- Hero：标题 + 一句话价值主张
- 输入表单：
  - 当前 stat 值（number）
  - stat_type（select）
  - boost 开关（checkbox）+ code boost（select 1.25/1.5/2/3）
  - （可选）multi_value（number）+ No Limit 开关
- CTA：
  - 主按钮：Calculate
  - 次按钮：Help calibrate (30s) → /calibrate
- 结果区域：
  - Top 3 推荐卡片（含 confidence、解锁门槛、预计增益/分钟）
  - 目标时间估算（输入 target_stat）
- FAQ（schema.org FAQPage）
- 内链：/codes、/training-areas、/guides/...

### 11.2 校准页（/calibrate）
- 简化为 4 步：
  1) 选 stat_type + area
  2) 勾 boost
  3) 输入 start/end stat + duration（建议提供计时器按钮）
  4) 提交
- 提交后反馈：
  - “已记录，你的样本将用于提升计算器准确度”
  - 展示该训练区当前 confidence & 需要多少样本提升

---

## 12. SEO：关键词矩阵（直接建页面用）
> 原则：**工具意图词优先**（calculator / optimizer / best training area / codes）  
> 下面是一套可落地的关键词分组，你可以直接对应页面生成标题与内容。

### 12.1 核心变现词（首页）
- anime fighting simulator endless calculator
- anime fighting simulator endless training optimizer
- best training area anime fighting simulator endless
- afse endless calculator
- afs endless training calculator

### 12.2 校准/收益类（可做 guide）
- how to increase stats fast in anime fighting simulator endless
- training multiplier cap 131k afse
- no limit gamepass afse worth it
- weekend boost afse

### 12.3 Codes（/codes）
- anime fighting simulator endless codes
- afse codes
- new afse codes
- afse codes 2026 (按月份生成段落：january/february...)

### 12.4 数据页（/training-areas）
- anime fighting simulator endless training areas
- strength training areas afse
- chakra training areas afse
- durability training areas afse
- speed agility training areas afse

### 12.5 Tier List（第2周上）
- afse training areas tier list
- best training areas afse
- best power afse (如果你后续做 DPS)
- best transformation afse (如果后续做变身对比)

> 每个页面都要内链回首页 anchor：`AFSE Calculator` / `Training Optimizer`。

---

## 13. 域名建议（不查可用性，给你可执行策略）
域名策略：**优先短 + 包含 calculator/optimizer 语义 + 可复制到其他游戏**
三种路线（任选其一）：

### A) 单游戏品牌（最快）
- `afsecalculator.com`
- `afseoptimizer.com`
- `afse-tools.com`

### B) Roblox 工具站品牌（可扩展多游戏）
- `robloxcalc.com`
- `roblox-optimizer.com`
- `simulatorcalc.com`
- `gamecalc.gg`（如果能注册）

### C) “工具站网络”（多站矩阵）
- 主域：`calcforge.com`（示例命名逻辑）
- 子站：`afse.calcforge.com`, `petsgo.calcforge.com`...

> 执行建议：先上 B（可扩展），AFSE 做首站；跑通后复制到下一个热门游戏。

---

## 14. AdSense 未通过：变色龙占位符（Chameleon Placeholder）设计
你要的是：**布局先占位、体验不崩、未来一键切换广告位**。

### 14.1 合规底线（非常重要）
- 占位符不能伪装成 AdSense 广告、不能误导点击（避免违规）
- 必须明确标注：“Sponsor slot”/“Ad slot (coming soon)” 或 “Tools you may like”
- 点击只能去你站内页面或外部正规链接（如果有 affiliate 必须声明）

### 14.2 变色龙占位符的产品行为
组件：`<ChameleonSlot />`
- 目标：在广告未开通期间，提高停留与 PV，而不是诱导点击
- 展示内容（轮播/变色仅做“视觉活性”）：
  1) 推荐工具卡片：DPS / Codes / Training Areas / Guides
  2) 推荐文章：Top guides
  3) 站内“快速入口”
- 样式：固定高度（与未来广告位一致），背景色缓慢变换（低饱和，不刺眼）
- 触发条件：
  - `ads_enabled=false` → 显示 ChameleonSlot
  - `ads_enabled=true` → 替换为 AdSense 组件

### 14.3 配置开关（不发版即可切换）
在 Supabase `site_settings` 表或 env 中：
- `ads_enabled` boolean
- `ads_provider` text = "adsense"
- `ads_client`, `ads_slot_home_1`, `ads_slot_sidebar_1`...

---

## 15. 部署上线 checklist（你照做就能上线）
### 15.1 Day 1：上线 MVP
- Next.js 项目初始化（App Router）
- Supabase 建库（执行 schema）
- 导入 seed（你现有 csv）
- 首页 + /calibrate + /codes + /training-areas
- sitemap/robots
- Vercel 部署

### 15.2 Day 2：跑通校准闭环
- /calibrate 提交写入 samples
- cron 聚合任务（每 6 小时）
- 首页读取 published params 并显示 confidence

### 15.3 Day 3：SEO 强化
- 每页 title/h1/description
- FAQ schema
- 内链策略
- Search Console 提交 sitemap

---

## 16. 直接可复制的项目结构（建议）
```
/app
  /(home)/page.tsx
  /calibrate/page.tsx
  /codes/page.tsx
  /dps/page.tsx
  /training-areas/page.tsx
  /api/v1/optimizer/config/route.ts
  /api/v1/calibrate/route.ts
  /api/v1/cron/aggregate-training-params/route.ts
/components
  OptimizerForm.tsx
  ResultsCards.tsx
  ChameleonSlot.tsx
  BoostSelector.tsx
/lib
  db.ts
  optimizer.ts
  calibration.ts
  antiAbuse.ts
/data
  seed_import_notes.md
```

---

## 17. 数据导入（把你现有 seed CSV 变成正式表）
如果你用 Supabase SQL Editor：
- 先把 `afse_training_areas_seed.csv` 导入到临时表 `tmp_seed_training`
- 再用 SQL 插入 `training_areas`（映射字段）

示例：
```sql
insert into training_areas(game_key, stat_type, area_name, required_stat_value, seed_area_multiplier, seed_source)
select 'afse', stat_type, area_name, required_stat_value, area_multiplier, source
from tmp_seed_training;
```

同理 boost：
```sql
insert into boost_sources(game_key, boost_key, boost_name, value_type, value, applies_to, stack_rule, seed_source)
select 'afse', boost_id, boost_name, value_type, value, applies_to, stack_rule, source
from tmp_seed_boosts;
```

---

## 18. 你会关心的“准确性问题”怎么处理（上线不翻车）
- 首页始终展示：`数据版本`、`更新时间`、`confidence`
- confidence 低时：提示 “结果为估算，建议提交一次校准样本”
- 校准页鼓励：**“提交一次样本=提升全站准确度”**（强化参与感）
- 管理后台：漂移检测（游戏更新后参数变了）→ 一键新版本桶

---

## 19. 下一步扩展（可复制到其他游戏）
一旦 AFSE 跑通：
- 把 `game_key` 抽象为多游戏
- 每个游戏一套 training_areas / boost_sources / params
- 站点结构不变：换数据即可开新站

---

# 附录A：你要的“训练优化器如何实时算 + 后台如何自动更新”的一句话总结
- **实时算**：前端请求 `Published Params + Boost Sources` → 计算 `gain_per_min` → 排序推荐 Top 3  
- **自动更新**：用户提交样本 → 反推 `base_gain` → 定时稳健聚合 → upsert 到 `training_area_params` → 立刻生效

---

# 附录B：强制你一次性上线的最小验收标准（Definition of Done）
- 首页输入 → 出 Top3 推荐（含 confidence）  
- 校准提交 → 数据库有 samples  
- cron 聚合跑通 → published params 更新  
- /codes /training-areas 可被 sitemap 收录  
- ads_enabled=false 时出现 ChameleonSlot，占位高度与广告位一致  
- ads_enabled=true 可一键切换为 AdSense 组件（仅换配置，不发版）

