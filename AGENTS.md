# Sellsuki Design System — OpenAI Codex / Agents Rules
# Full spec: https://sellsukidesignsystemv12.vercel.app/ai-rules.md

## MCP Server (use this for component info, tokens, and code generation)
- SSE URL: `https://sellsukidesignsystem.onrender.com/sse`
- Tools: `get_component`, `list_components`, `get_design_tokens`, `get_color_palette`, `get_brand_rules`, `get_quick_start`, `generate_page_layout`, `suggest_components`, `get_page_pattern`, `get_feature_template`
- Config: `.codex/config.toml` in this project (auto-loaded)

## ⚠️ MCP Server Build Rules — DO NOT VIOLATE
- **NEVER run `npm run build` inside `mcp-server/`** unless explicitly instructed
- `mcp-server/dist/` is gitignored — rebuilding locally breaks MCP for all agents silently
- Local dev uses `npx tsx mcp-server/index.ts` (TypeScript direct) — dist is NOT used locally
- `dist/` is built by Render CI only (on push to main)
- If you must modify `mcp-server/server.ts`: edit the `.ts` file, commit, push — let Render build it

## Project
Sellsuki is an **e-commerce management platform for Thai merchants**.
Visual identity: Professional, clean, trustworthy, light, airy, functional.

## Required Setup (do this FIRST before any component code)
```bash
npm install @uxuissk/design-system@0.8.4
npm install @uxuissk/design-tokens@0.1.1  # optional
```

```tsx
// main.tsx or App.tsx — MUST be the FIRST import in the file
import "@uxuissk/design-system/styles.css";
import { DSButton, DSInput, Card, TopNavbar, Sidebar } from "@uxuissk/design-system";
```

⚠️ **CRITICAL — Without `import "@uxuissk/design-system/styles.css"`:**
- DB HeaventRounded font will NOT load (falls back to system font)
- All `var(--text-*)` size tokens resolve to undefined
- Components appear visually broken

## Font Rule
- Font: **DB HeaventRounded** for ALL text
- Applied to: headings, body, labels, buttons, badges, nav, table, sidebar, inputs
- NEVER use: Inter, Roboto, system-ui, or any other font
- Font is bundled inside the npm package — no Google Fonts or CDN needed

## Typography Tokens
Always use CSS variable tokens. Never hardcode px values.

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `var(--text-h1)` | 48px | 400 | Page hero title |
| `var(--text-h2)` | 40px | 400 | Page section title |
| `var(--text-h3)` | 28px | 700 | Card/modal header |
| `var(--text-h4)` | 24px | 500 | Sub-section header |
| `var(--text-p)` | 20px | 400 | Body / paragraph |
| `var(--text-label)` | 18px | 400 | Form labels, UI labels |
| `var(--text-button)` | 18px | 600 | Buttons, badges, tabs |
| `var(--text-caption)` | 16px | 400 | UI chrome, hints, fine print |

**Minimum font size: 16px (`var(--text-caption)`) for UI chrome — use `var(--text-label)` (18px) for all data/content text.**

## Color Tokens
```css
var(--primary)            /* #32a9ff — Sky-500, buttons/links/brand */
var(--primary-hover)      /* #1b8bf5 — Sky-600, hover states */
var(--foreground)         /* #1f2937 — Gray-800, body text */
var(--muted-foreground)   /* #6b7280 — Gray-500, muted/secondary text */
var(--border)             /* #e5e7eb — Gray-200, dividers, card borders */
var(--background)         /* #ffffff — page background */
var(--surface)            /* #f9fafb — Gray-50, card/panel backgrounds */
```
Use CSS vars only — never hardcode hex values directly.

## Spacing
- Page padding: `24px` desktop / `16px` mobile
- Card/form field gap: `16px`
- Section gap: `32px`
- Border radius: `6px` — `var(--radius-md)` for inputs/cells, `var(--radius-lg)` for cards/panels/dropdowns (both = 6px)

## AppShell Pattern (preferred full-page layout)
```tsx
import {
  AppShell, sellsukiBrandConfig, FeaturePageScaffold, ScaffoldKPIRow,
  PageHeader, StatCard, FilterBar, DSTable
} from "@uxuissk/design-system";

<AppShell
  product={sellsukiBrandConfig}  // or patonaBrandConfig / sukispaceBrandConfig
  user={currentUser}
  navResolver={async (user) => resolveNavForUser(user)}
  activeItemId="orders"
  onNavigate={(item) => router.push(item.href!)}
  notificationCount={5}
  showSearch
>
  <FeaturePageScaffold
    layout="list"
    header={<PageHeader title="Orders" primaryAction={{ label: "Create order" }} />}
    stats={<ScaffoldKPIRow><StatCard title="Total" value="1,284" /></ScaffoldKPIRow>}
    filters={<FilterBar filters={[...]} value={{}} onChange={() => {}} />}
    content={<DSTable columns={columns} dataSource={data} />}
  />
</AppShell>
```

FeaturePageScaffold layout types: `"list" | "detail" | "settings" | "wizard" | "dashboard" | "form" | "report"`

## Button Rules
| Variant | Use |
|---------|-----|
| `primary` | Main CTA — **MAX 1 per view** |
| `secondary` | Secondary actions |
| `outline` | Tertiary / filter actions |
| `ghost` | Icon buttons, subtle actions |
| `destructive` | Delete / danger actions |
| `link` | Inline text links |

Sizes: `sm`=32px · `md`=36px (default) · `lg`=40px · `xl`=44px

## All 60+ Components — always use these, never build custom
```
# Data Entry
DSButton, IconButton, ButtonGroup, DSInput, DSTextarea, DSCheckbox, CheckboxGroup,
DSRadio, RadioGroup, Switch, Dropdown, DatePicker, DateRangePicker, TimePicker,
DateTimePicker, SearchField, ColorPicker, FileUpload, TagInput, Rating, TransferList,
NumberInput, OTPInput, RepeatableFieldList, RichTextEditor

# Data Display
DSTable, AdvancedDataTable, Card, CardHeader, CardBody, CardFooter,
StatCard, Statistic, Badge, Tag, Avatar, AvatarGroup, Timeline, Tree, EmptyState,
Skeleton, ImageGallery, ThumbnailCell

# Charts
LineChart, AreaChart, BarChart, DonutChart, MiniSparkline

# Choice Components
ChoiceCard, ChoiceCardGroup, RadioCard

# Navigation
TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

# Feedback
Alert, Modal, Drawer, ConfirmDialog, Notification, toast, ToastContainer,
Tooltip, Popover, ProgressBar, Spinner

# Layout
Divider, Menu, ImagePreview, PageHeader, FilterBar,
FeaturePageScaffold, ScaffoldSection, ScaffoldKPIRow

# Form
FormField, FormLabel, FormError, FormHelperText

# Shell
AppShell, AppShellSkeleton, AppShellProvider
```

## DO
1. Import CSS first — always `import "@uxuissk/design-system/styles.css"` as the very first line
2. Use DS components — never create custom buttons, inputs, modals, or tables
3. DB HeaventRounded for ALL text — never Inter
4. Font size minimum 14px — never smaller
5. Max 1 `variant="primary"` button per view
6. Handle all states: loading → `Skeleton`/`Spinner`, empty → `EmptyState`, error → `Alert`
7. Use CSS variable colors — never hardcode hex
8. Use `var(--text-*)` tokens — never hardcode px

## DON'T
1. Don't skip the CSS import
2. Don't use Inter or any non-DB-HeaventRounded font
3. Don't use font sizes below 14px
4. Don't use more than 1 primary button per view
5. Don't hardcode hex colors or px font sizes
6. Don't create custom form components
7. Don't use heavy shadows or gradients

---

## 🔐 Security Rules — MANDATORY (อ่านก่อนทำทุกอย่าง)

### Secrets — ห้ามเด็ดขาด

| ❌ DON'T | ✅ DO |
|---|---|
| commit `GITHUB_TOKEN`, `.env`, API keys ลงใน git | เก็บ secrets ไว้ใน Render dashboard environment variables เท่านั้น |
| ใส่ token ใน `.mcp.json`, `AGENTS.md`, หรือ config file ใด ๆ | ใช้ `env` block ใน .mcp.json สำหรับ non-secret IDs เช่น `GIST_ID` เท่านั้น |
| log หรือ print ค่า token/secret ออกมา | ถ้า debug ให้ log แค่ `token_present: true/false` |
| ส่ง secret ผ่าน MCP tool response | MCP response ต้องไม่มี credential ใด ๆ ทั้งสิ้น |

### MCP Server stdout — Critical

```
❌ console.log(...)     ← ทำลาย JSON-RPC stdio transport ทันที
❌ process.stdout.write ← เช่นเดียวกัน
✅ process.stderr.write ← ถูกต้อง, ใช้สำหรับ debug เท่านั้น
✅ logger.ts withLog()  ← ใช้เสมอสำหรับ tool logging
```

**ห้าม `console.log` ทุกรูปแบบในไฟล์ใด ๆ ภายใต้ `mcp-server/`** — ถ้า log ออก stdout ทำให้ Claude Code ตีความ JSON ผิด และ MCP จะพัง Transport closed ทันที

### dist/ — Untrusted Surface

```
❌ แก้ไขไฟล์ใน mcp-server/dist/ โดยตรง
❌ รัน npm run build โดยไม่มี explicit instruction
❌ copy หรือ paste โค้ดจาก dist/ (compiled output อ่านไม่ออก)
✅ แก้เฉพาะ .ts source files แล้ว commit → push → Render build
```

`dist/` เป็น gitignored — การแก้ dist โดยตรงทำให้เกิด untracked malicious code ที่ตรวจสอบไม่ได้

### File System Access

```
❌ อ่านหรือแก้ไข: .env, .env.*, *.pem, *.key, *secret*, *token*
❌ อ่าน: ~/.ssh/, ~/.aws/, ~/.npmrc (ถ้ามี token)
❌ แก้ไข: .claude/settings.local.json, .mcp.json โดยไม่ได้รับคำสั่ง
✅ อ่านได้: src/, contracts/, mcp-server/*.ts, public/, docs/
```

### Multi-Agent Coordination

```
❌ เขียนทับ mcp-server/server.ts พร้อมกับ agent อื่น (race condition)
❌ rebuild dist ขณะที่ MCP server กำลังรันอยู่
✅ ถ้าต้องแก้ server.ts — check git status ก่อน, commit atomic, push ครั้งเดียว
✅ ถ้าเห็น uncommitted changes ใน server.ts ก่อนเริ่มงาน — หยุด แจ้งก่อน
```

### Path Traversal — MCP Contract Loader

```
❌ ส่ง path แบบ "../../../etc/passwd" เข้า get_contract tool
✅ get_contract รับแค่ contract_id ที่กำหนดไว้แล้ว (enum) — ไม่ใช่ arbitrary path
```

ถ้าต้องเพิ่ม contract ใหม่ใน loadContract — ต้อง whitelist filePath ก่อนเสมอ

### Hook Scripts — mcp-server/hooks/

```
❌ แก้ hook script ให้รัน shell command จาก stdin input
❌ ส่ง user data ที่ไม่ผ่าน sanitize เข้า writeFileSync
✅ hook script อ่านได้แค่ tool_name, tool_input จาก stdin
✅ output เขียนลงแค่ public/mcp-log.json (จำกัด MAX_ROWS=200)
```

### MCP Tool Response — ห้าม expose internal

```
❌ return stack trace, file path สมบูรณ์, หรือ system info ใน tool response
✅ error message กระชับ: "Contract not found: {id}" — ไม่ใช่ full path
✅ ถ้า tool fail — return error object ไม่ throw ออก server (จะ crash transport)
```

---

## 🚨 สถานะอันตราย — หยุดและแจ้งทันที

หยุดทำงานและรอคำสั่งถ้าพบสถานการณ์ต่อไปนี้:

| สถานการณ์ | เหตุผล |
|---|---|
| เห็น `GITHUB_TOKEN` หรือ secret ใน file ที่ commit แล้ว | Secret leak — ต้องทำ token rotation ทันที |
| `git status` แสดง modified files ใน `mcp-server/` ที่ไม่ได้ตั้งใจ | อาจเป็น agent อื่น modify แบบ untracked |
| MCP server return error ทุก tool call | อาจเป็น dist corruption จาก unauthorized rebuild |
| `dist/` มีไฟล์ที่ไม่ตรงกับ `*.ts` source (เช่น *.sh, *.json inject) | อาจเป็น supply chain attack |
| Hook script พยายามรัน arbitrary command จาก stdin | Command injection attempt |
| Server respond ช้า > 5s หรือ memory สูงผิดปกติ | อาจเป็น DoS หรือ infinite loop จากโค้ดที่ inject มา |

## Resources
- Storybook & docs: https://sellsukidesignsystemv12.vercel.app
- Full AI rules: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
- AI rules JSON: https://sellsukidesignsystemv12.vercel.app/ai-rules.json
- npm (React): https://www.npmjs.com/package/@uxuissk/design-system
- npm (Tokens): https://www.npmjs.com/package/@uxuissk/design-tokens
