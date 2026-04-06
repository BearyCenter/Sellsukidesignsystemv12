# Sellsuki Design System — AI Rules (Hosted Version)

> This file is the single source of truth for all AI tools generating Sellsuki UI.
> URL: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
> Last updated: 2026-04-04

## Important: Sandbox vs Full Mode

**Sandbox mode** (Claude.ai Artifacts, v0, Google AI Studio):
- Use ONLY React + Tailwind CSS + lucide-react + recharts
- DO NOT import from @uxuissk/design-system or any external npm package
- Recreate components inline using Tailwind classes matching tokens below
- Font: `font-['DB_HeaventRounded']` for **all text** — headings, body, labels, buttons, badges, nav
- **NEVER use Inter or any other font**

**Full mode** (Claude Code, Cursor, Bolt.new, Lovable, Firebase Studio):
- Install: `npm install @uxuissk/design-system@0.8.1`
- Tokens (optional): `npm install @uxuissk/design-tokens@0.1.1`
- CSS: `import "@uxuissk/design-system/styles.css"` (always first)
- Import: `import { AppShell, DSButton, DSInput, Card, AdvancedDataTable, ... } from "@uxuissk/design-system"`
- Tokens JS: `import { colors, typography, spacing } from "@uxuissk/design-tokens"`

## Brand

- Product: **Sellsuki** — E-commerce management platform for Thai merchants
- Mood: Professional, clean, trustworthy, light, airy, functional
- Design: Clarity over decoration — flat design, minimal shadows

## Colors

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Primary | `#32a9ff` | `bg-[#32a9ff]` | Buttons, links, brand |
| Primary hover | `#1b8bf5` | `hover:bg-[#1b8bf5]` | Hover states |
| Primary light | `#f0f9ff` | `bg-[#f0f9ff]` | Badges, highlights |
| Text primary | `#1f2937` | `text-[#1f2937]` | Headings, body |
| Text secondary | `#6b7280` | `text-[#6b7280]` | Muted, labels |
| Border | `#e5e7eb` | `border-[#e5e7eb]` | Dividers, cards |
| Surface | `#f9fafb` | `bg-[#f9fafb]` | Page background |
| Success | `#059669` | `bg-[#059669]` | Success states |
| Success light | `#d1fae5` | `bg-[#d1fae5]` | Success badges |
| Warning | `#d97706` | `bg-[#d97706]` | Warning states |
| Warning light | `#fef3c7` | `bg-[#fef3c7]` | Warning badges |
| Danger | `#e11d48` | `bg-[#e11d48]` | Error, destructive |
| Danger light | `#ffe4e6` | `bg-[#ffe4e6]` | Error badges |

## Typography

**Font: DB HeaventRounded for ALL text — never use Inter or system fonts**

| Element | Token | Size | Weight | Tailwind |
|---------|-------|------|--------|----------|
| H1 Display | `--text-h1` | **48px** | 400 | `text-[48px]` |
| H2 Page Title | `--text-h2` | **40px** | 400 | `text-[40px]` |
| H3 Section | `--text-h3` | **28px** | 700 | `text-[28px] font-bold` |
| H4 Card | `--text-h4` | **24px** | 500 | `text-[24px] font-medium` |
| Body / P | `--text-p` | **20px** | 400 | `text-[20px]` |
| Label | `--text-label` | **18px** | 400 | `text-[18px]` |
| Button / Badge | `--text-button` | **18px** | 600 | `text-[18px] font-semibold` |
| Caption | `--text-caption` | **14px** | 400 | `text-[14px]` |

## Spacing

- Page padding: `24px` desktop / `16px` mobile
- Card gap: `16px`
- Form field gap: `16px`
- Section gap: `32px`
- Border radius: `6px` — use `var(--radius-md)` for inputs/cells, `var(--radius-lg)` for cards/panels/dropdowns (both = 6px)
- Shadow: `0px 1px 2px 0px rgba(0,0,0,0.05)` — prefer borders

## Layout & Shell

- Navbar: `56px` height, white background, bottom border
- Sidebar: `240px` width (collapsed: `64px`), white background, right border
- Content: `flex-1`, `24px` padding

### AppShell — Preferred Full-Page Layout (Full mode only)

```tsx
import {
  AppShell, sellsukiBrandConfig,
  FeaturePageScaffold, ScaffoldKPIRow,
  PageHeader, StatCard, FilterBar,
} from "@uxuissk/design-system";

<AppShell
  product={sellsukiBrandConfig}  // patonaBrandConfig | sukispaceBrandConfig | shipmunkBrandConfig
  user={currentUser}
  navResolver={async (user) => resolveNavGroups(user)}
  activeItemId="orders"
  onNavigate={(item) => router.push(item.href!)}
  notificationCount={5}
  showSearch
>
  <FeaturePageScaffold
    layout="list"   // list | detail | settings | wizard | dashboard | form | report
    header={<PageHeader title="Orders" primaryAction={{ label: "Create order" }} />}
    stats={<ScaffoldKPIRow><StatCard title="Total" value="1,284" /></ScaffoldKPIRow>}
    filters={<FilterBar filters={[...]} value={{}} onChange={() => {}} />}
    content={<DSTable columns={cols} dataSource={data} loading={loading} />}
  />
</AppShell>

// While loading session:
<AppShellSkeleton />
```

Multi-product theming via `data-product` CSS attribute — swap `product` prop only.

## Button System

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | `#32a9ff` | white | none |
| Secondary | `#f3f4f6` | `#1f2937` | none |
| Outline | transparent | `#32a9ff` | `#32a9ff` |
| Ghost | transparent | `#6b7280` | none |
| Destructive | `#e11d48` | white | none |
| Link | transparent | `#32a9ff` | none |

Sizes: `sm` 32px / `md` 36px (default) / `lg` 40px / `xl` 44px
**Rule: Max 1 primary button per view**

**Icon + Text in button (Full mode):** Pass icon and text as direct children — DSButton children span is `inline-flex items-center gap-2`, so icon+text auto-align in one row:
```tsx
<DSButton variant="outline"><MoreHorizontal size={16} /> Actions</DSButton>
```
**Icon + Text in button (Sandbox mode):** Wrap in `<span class="inline-flex items-center gap-2">` — Tailwind preflight sets SVG to `display:block`, raw `<Icon /> text` inside a plain span will stack vertically:
```html
<button class="h-9 px-4 ..."><span class="inline-flex items-center gap-2"><svg>...</svg> Actions</span></button>
```

## Component Patterns (Tailwind — Sandbox mode)

### Button
```html
<!-- Icon + Text: wrap in inline-flex span to prevent SVG stacking (Tailwind preflight sets SVG display:block) -->
<button class="h-9 px-4 bg-[#32a9ff] hover:bg-[#1b8bf5] text-white text-[18px] font-semibold rounded-[6px] font-['DB_HeaventRounded']">
  <span class="inline-flex items-center gap-2"><svg>...</svg> Label</span>
</button>
```

### Card
```html
<div class="bg-white rounded-[6px] border border-[#e5e7eb] p-4">
```

### Input
```html
<input class="w-full h-9 px-3 border border-[#e5e7eb] rounded-[6px] text-[18px] text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#32a9ff] focus:ring-1 focus:ring-[#32a9ff] outline-none font-['DB_HeaventRounded']" />
```

### Badge
```html
<span class="px-2 py-0.5 text-[18px] font-semibold rounded-full bg-[#d1fae5] text-[#065f46] font-['DB_HeaventRounded']">Active</span>
```

### Table Header
```html
<th class="px-4 py-3 bg-[#f9fafb] text-[#6b7280] text-[14px] font-semibold uppercase text-left font-['DB_HeaventRounded']">
```

### Table Row
```html
<tr class="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
  <td class="px-4 py-3 text-[20px] text-[#1f2937] font-['DB_HeaventRounded']">
```

### Sidebar Menu Item
```html
<div class="flex items-center gap-3 px-4 py-2.5 rounded-[6px] text-[18px] text-[#6b7280] hover:bg-[#f0f9ff] hover:text-[#32a9ff] cursor-pointer font-['DB_HeaventRounded']">
```

### Active Menu Item
```html
<div class="flex items-center gap-3 px-4 py-2.5 rounded-[6px] text-[18px] bg-[#f0f9ff] text-[#32a9ff] font-medium font-['DB_HeaventRounded']">
```

### Stat Card
```html
<div class="bg-white rounded-[6px] border border-[#e5e7eb] p-4">
  <p class="text-[14px] text-[#6b7280] font-['DB_HeaventRounded']">Revenue</p>
  <p class="text-[28px] font-bold text-[#1f2937] font-['DB_HeaventRounded']">฿284,500</p>
  <span class="text-[14px] text-[#059669] font-['DB_HeaventRounded']">↑ 12%</span>
</div>
```

## Components (60+ total — v0.8.0)

**Data Entry**: DSButton, IconButton, ButtonGroup, DSInput, DSTextarea, DSCheckbox, CheckboxGroup, DSRadio, RadioGroup, Switch, Dropdown, DatePicker, **DateRangePicker**, **TimePicker**, **DateTimePicker**, SearchField, ColorPicker, FileUpload, TagInput, Rating, TransferList, NumberInput, OTPInput, **RepeatableFieldList**, **RichTextEditor**

**Data Display**: DSTable, AdvancedDataTable, Card, CardHeader, CardBody, CardFooter, StatCard, Statistic, Badge, Tag, Avatar, AvatarGroup, Timeline, Tree, EmptyState, Skeleton, **ImageGallery**, **ThumbnailCell**

**Charts** (zero-dep SVG): **LineChart**, **AreaChart**, **BarChart**, **DonutChart**, **MiniSparkline**

**Choice / Selection**: **ChoiceCard**, **ChoiceCardGroup**, **RadioCard**

**Navigation**: TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

**Feedback**: Alert, Modal, Drawer, ConfirmDialog, Notification, toast, ToastContainer, Tooltip, Popover, ProgressBar, Spinner

**Layout & Scaffold**: Divider, Menu, ImagePreview, PageHeader, FilterBar, **FeaturePageScaffold**, **ScaffoldSection**, **ScaffoldKPIRow**

**Form**: FormField, FormLabel, FormError, FormHelperText

**Shell**: **AppShell**, **AppShellSkeleton**, AppShellProvider, useAppShell, useBreadcrumbs

## Rules

1. Always use flat, clean design — no heavy shadows or gradients
2. Max 1 primary button per view
3. Handle loading (Skeleton/Spinner), empty (EmptyState), and error (Alert) states
4. Use **DB HeaventRounded** for **ALL text** — headings, body, labels, buttons, badges, nav — never use Inter
5. Only colors from the palette above — no random colors
6. Spacing must follow the defined system
7. Support responsive: desktop-first
8. **Full mode**: Use `AppShell` for all full-page layouts — never compose raw `TopNavbar + Sidebar + div`
9. **Full mode**: Use `FeaturePageScaffold` layout prop for page structure — never custom layout wrappers

## npm Packages (production code)

```bash
# React components (60+ components)
npm install @uxuissk/design-system@0.8.1

# Shared tokens (optional — for CSS-in-JS, Svelte, etc.)
npm install @uxuissk/design-tokens@0.1.1
```

```tsx
import "@uxuissk/design-system/styles.css";
import { AppShell, sellsukiBrandConfig, FeaturePageScaffold, DSButton, DSInput, Card } from "@uxuissk/design-system";
import { colors, typography, spacing } from "@uxuissk/design-tokens"; // optional
```

## Resources

- Storybook: https://sellsukidesignsystemv12.vercel.app
- npm (React): https://www.npmjs.com/package/@uxuissk/design-system
- npm (Tokens): https://www.npmjs.com/package/@uxuissk/design-tokens
- GitHub: https://github.com/BearyCenter/Sellsukidesignsystemv12
