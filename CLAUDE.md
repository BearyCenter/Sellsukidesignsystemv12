# Sellsuki Design System — AI Instructions

> This file is automatically read by Claude Code. It ensures all generated UI follows Sellsuki's visual identity.

## You are building for Sellsuki

Sellsuki is an **e-commerce management platform for Thai merchants**.
Visual identity: **Professional yet approachable, clean, trustworthy, efficient**.
Mood: **Light, airy, functional** — prioritizes clarity over decoration.

## Mandatory Setup

```tsx
// ALWAYS import CSS first at the app root
import "@uxuissk/design-system/styles.css";

// Import components from the package
import { DSButton, DSInput, Card, ... } from "@uxuissk/design-system";
```

Install: `npm install @uxuissk/design-system@0.8.4`
Tokens: `npm install @uxuissk/design-tokens@0.1.1` (optional — shared CSS+JS tokens)

## Visual Identity Cheat Sheet

| Token | Value | Usage |
|-------|-------|-------|
| Primary | Sky-500 `#32a9ff` | Buttons, links, brand |
| Primary hover | Sky-600 `#1b8bf5` | Hover states |
| Text primary | Gray-800 `#1f2937` | Body text |
| Text secondary | Gray-500 `#6b7280` | Muted text |
| Border | Gray-200 `#e5e7eb` | Dividers, borders |
| Success | Emerald-600 `#059669` | Success states |
| Warning | Amber-600 `#d97706` | Warning states |
| Danger | Rose-600 `#e11d48` | Error, destructive |
| Font | `DB HeaventRounded` | **ทุกอย่างทั้งหมด** — body, label, button, heading, nav, table, badge — ห้ามใช้ Inter |
| H1 | `48px` `var(--text-h1)` | Page hero titles |
| H2 | `40px` `var(--text-h2)` | Page section titles |
| H3 | `28px` `var(--text-h3)` | Card/modal headers |
| H4 | `24px` `var(--text-h4)` | Sub-section headers |
| Body (P) / Section title | `20px` `var(--text-p)` | Body text **and** card/panel section titles (e.g. "Shipments ล่าสุด") |
| Label | `20px` `var(--text-label)` | Form labels, UI labels, descriptions, table subtitles, badge lg |
| Button | `18px` `var(--text-button)` | Buttons, tabs — weight 600 |
| Badge (sm/md) | `18px` `var(--text-caption)` | Badges — weight 400, never semibold |
| Badge (lg) | `20px` `var(--text-label)` | Large badges — weight 400, never semibold |
| Caption | `18px` `var(--text-caption)` | Helper text, hint, fine print (minimum size) |
| Radius | `6px` | `--radius-md` for inputs/cells, `--radius-lg` for cards/panels/dropdowns — both = 6px |
| Shadow | `0px 1px 2px 0px #0000000d` | Minimal, prefer borders |

## Spacing

- Page padding: `24px` desktop / `16px` mobile
- Card gap: `16px`
- Form field gap: `16px`
- Section gap: `32px`

## Components (60+ total — always use these, never create custom)

**Data Entry**: DSButton, IconButton, ButtonGroup, DSInput, DSTextarea, DSCheckbox, CheckboxGroup, DSRadio, RadioGroup, Switch, Dropdown, DatePicker, **DateRangePicker**, **TimePicker**, **DateTimePicker**, SearchField, ColorPicker, FileUpload, TagInput, Rating, TransferList, NumberInput, OTPInput, **RepeatableFieldList**, **RichTextEditor**

**Data Display**: DSTable, **AdvancedDataTable** (server-side pagination, bulk actions, frozen columns), Card/CardHeader/CardBody/CardFooter, StatCard, Statistic, Badge, Tag, Avatar/AvatarGroup, Timeline, Tree, EmptyState, Skeleton, **ImageGallery**, **ThumbnailCell**

**Charts** (zero-dep SVG): **LineChart**, **AreaChart**, **BarChart**, **DonutChart**, **MiniSparkline**

**Choice / Selection**: **ChoiceCard**, **ChoiceCardGroup**, **RadioCard**

**Navigation**: TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

**Feedback**: Alert, Modal, Drawer, ConfirmDialog, Notification, toast/ToastContainer, Tooltip, Popover, ProgressBar, Spinner

**Layout & Scaffold**: Divider, Menu, ImagePreview, **PageHeader**, **FilterBar**, **FeaturePageScaffold**, **ScaffoldSection**, **ScaffoldKPIRow**

**Form**: FormField, FormLabel, FormError, FormHelperText

**Shell**: **AppShell**, **AppShellSkeleton**, AppShellProvider, useAppShell, useBreadcrumbs

## Button Rules

- 6 variants: `primary` | `secondary` | `outline` | `ghost` | `destructive` | `link`
- 4 sizes: `sm` (32px) | `md` (36px) | `lg` (40px) | `xl` (44px)
- Default: `variant="primary" size="md"`
- **Max 1 primary button per view** — rest use secondary/outline/ghost

## Background Token Standard

| Surface | Token | Value | Usage |
|---------|-------|-------|-------|
| Page / content body | `var(--background)` | `#F9FAFB` Gray-50 | AppShell content area, page root |
| Card / panel / sidebar | `var(--card)` / `bg-card` | `#FFFFFF` | White elevated surface |
| Muted section | `var(--muted)` | `#F3F4F6` Gray-100 | Table header bg, subtle dividers |

**Rules:**
- `var(--background)` is the **only** token for page/content body — applies to ALL brands via `[data-product]` inheritance
- No brand overrides `--background` — brand theming only changes `--primary`, `--sidebar-accent`, and button tokens
- Never hardcode `#f3f4f6`, `#f9fafb`, or any tinted brand color as page background
- Never set `background` on content wrappers, `<main>`, or page roots inside AppShell — let it inherit from AppShell's `bg-[var(--background)]`

## DO

1. Always import CSS first: `import "@uxuissk/design-system/styles.css"`
2. Use DS components — never create custom buttons, inputs, modals
3. Use semantic color tokens, not raw hex
4. Use DB HeaventRounded (`var(--font-label)`) for **ALL text** — buttons, labels, nav, table, badge, search, checkbox, tabs, avatar, sidebar — **never use Inter/font-button**
5. Default size `md` for all components
6. Handle loading (Skeleton/Spinner), empty (EmptyState), error (Alert) states
7. Support dark mode — use CSS variables
8. Always include primary action button (e.g. "สร้างออเดอร์") in page header — max 1 per view

## DON'T

1. Don't use colors outside Sky/Gray/Rose/Emerald/Amber/Orange palette
2. Don't use heavy shadows — only elevation-sm
3. Don't hardcode hex values
4. Don't create custom form components
5. Don't use more than 1 primary button per view
6. Don't skip loading/empty/error states
7. Don't use `<h1>` for page titles in docs/showcase — use `<h2>` (40px) instead
8. Don't hardcode font sizes — always use `var(--text-h1)` through `var(--text-button)` tokens
9. Don't wrap AppShell children in `max-w-*` containers — `<main>` fills `flex-1`, content width is managed by the shell
10. Don't use `var(--text-caption)` or `var(--text-label)` for data/content text — **minimum for data is `var(--text-p)` (20px)**
11. Don't use font sizes below `var(--text-caption)` (18px) — **absolute minimum for any UI element is 18px**
12. **Don't mix Tailwind text-* utilities with DS token classes** — Tailwind `text-sm/xs/base/lg` renders at different sizes than DS tokens even with the same label; mixing causes inconsistent display
13. **Don't set background on content wrappers inside AppShell** — never use `bg-white`, `bg-gray-*`, `var(--bg-page)`, or any hardcoded color on `<main>` or page root; let `var(--background)` inherit from AppShell
14. **Don't use `var(--bg-page)` or `var(--bg-surface)`** — deprecated aliases; use `var(--background)` and `var(--card)` respectively

## ⚠️ Vibe Code Typography Override (MANDATORY)

This rule applies whenever you receive vibe-coded UI that already has design CSS attached.

**The problem:** Tailwind `text-sm` (14px) ≠ `var(--text-caption)` (18px). When Tailwind utility classes coexist with DS token classes, font sizes render inconsistently across components.

**The rule:**

| Situation | Action |
|-----------|--------|
| New vibe code (no existing CSS) | Use DS tokens from the start — `var(--text-p)`, `var(--text-label)`, etc. |
| Vibe code with existing Tailwind/CSS | **Force-replace ALL font classes** — remove every `text-sm`, `text-xs`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, hardcoded `font-size: Xpx`, and replace with correct DS token |

**Replacement map (Tailwind → DS token) — minimum 18px, data minimum 20px:**

| Remove | Replace with | Size |
|--------|-------------|------|
| `text-xs`, `text-[10px]`–`text-[12px]` | `var(--text-caption)` | **18px** |
| `text-sm`, `text-[13px]`–`text-[15px]` | `var(--text-caption)` | **18px** |
| `text-base`, `text-[16px]`, `text-[17px]` | `var(--text-caption)` | **18px** |
| `text-lg`, `text-[18px]`, `text-[19px]` | `var(--text-caption)` | 18px |
| `text-xl`, `text-[20px]`–`text-[22px]` | `var(--text-p)` | 20px |
| `text-2xl`, `text-[24px]` | `var(--text-h4)` | 24px |
| `text-3xl`, `text-[28px]` | `var(--text-h3)` | 28px |

**Element-level defaults (when no specific size is set):**

| Element | Token | Size |
|---------|-------|------|
| Card/panel section title (e.g. "Shipments ล่าสุด") | `var(--text-p)` | 20px |
| Card/panel description/subtitle | `var(--text-p)` | **20px** |
| Table header | `var(--text-p)` | **20px** |
| Table cell data | `var(--text-p)` | **20px** |
| Sidebar nav item | `var(--text-p)` | **20px** |
| Stat card label | `var(--text-p)` | **20px** |
| Stat card value | `var(--text-h3)` or `var(--text-h4)` | 28–24px |
| Badge / tag | `var(--text-caption)` | **18px** |
| Tooltip / helper text | `var(--text-caption)` | **18px** |

## Layout Pattern — AppShell (preferred)

```tsx
import {
  AppShell, sellsukiBrandConfig,
  FeaturePageScaffold, ScaffoldKPIRow,
  PageHeader, StatCard, FilterBar, DSTable,
} from "@uxuissk/design-system";

// Full product shell: navbar + responsive sidebar + content + toast
<AppShell
  product={sellsukiBrandConfig}  // or patonaBrandConfig / sukispaceBrandConfig / shipmunkBrandConfig
  user={currentUser}
  navResolver={async (user) => buildNavForUser(user)}  // permission-filtered async nav
  activeItemId="orders"
  onNavigate={(item) => router.push(item.href!)}
  notificationCount={5}
  showSearch
>
  <FeaturePageScaffold
    layout="list"   // list | detail | settings | wizard | dashboard | form | report
    header={
      <PageHeader
        title="Orders"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Orders" }]}
        primaryAction={{ label: "Create order", icon: <Plus size={16} /> }}
      />
    }
    stats={
      <ScaffoldKPIRow>
        <StatCard title="Total" value="1,284" trend={{ value: 12, direction: "up" }} />
      </ScaffoldKPIRow>
    }
    filters={<FilterBar filters={[...]} value={{}} onChange={() => {}} />}
    content={<DSTable columns={columns} dataSource={orders} loading={isLoading} />}
  />
</AppShell>

// While session is loading:
<AppShellSkeleton />
```

Multi-product theme is driven by `data-product` CSS attribute — swap `product` prop, no code change needed.

## MCP Server

This project has an MCP server at `mcp-server/` with tools:
- `list_components` — List all 60+ components
- `get_component` — Get props, example code for any component
- `get_design_tokens` — Get typography, spacing, colors, etc.
- `get_color_palette` — Get full color ramps
- `get_brand_rules` — Get DO/DON'T rules
- `get_quick_start` — Get starter template
- `generate_page_layout` — Generate page scaffold from description
- `suggest_components` — Feature description → ranked component recommendations
- `get_page_pattern` — Layout type → full code template with states
- `get_feature_template` — Feature name → complete page code with mock API hook

## Monorepo Packages

| Package | Version | Description |
|---------|---------|-------------|
| `@uxuissk/design-system` | 0.8.4 | React components (60+) |
| `@uxuissk/design-tokens` | 0.1.1 | Shared CSS + JS tokens |
| `@uxuissk/design-system-svelte` | scaffold | Svelte components (from CCS) |

## Resources

- Storybook: https://sellsukidesignsystemv12.vercel.app
- Preview: https://sellsukidesignsystemv12-2bee.vercel.app
- AI Rules: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
- npm (React): https://www.npmjs.com/package/@uxuissk/design-system
- npm (Tokens): https://www.npmjs.com/package/@uxuissk/design-tokens
