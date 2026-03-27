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

Install: `npm install @uxuissk/design-system@0.7.0`
Tokens: `npm install @uxuissk/design-tokens@0.1.0` (optional — shared CSS+JS tokens)

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
| Body (P) | `20px` `var(--text-p)` | Default body/paragraph text |
| Label | `18px` `var(--text-label)` | Form labels, UI labels, helper text |
| Button/Badge | `18px` `var(--text-button)` | Buttons, badges, tabs, small labels |
| Radius | `8px` (radius-md) | Default corner radius |
| Shadow | `0px 1px 2px 0px #0000000d` | Minimal, prefer borders |

## Spacing

- Page padding: `24px` desktop / `16px` mobile
- Card gap: `16px`
- Form field gap: `16px`
- Section gap: `32px`

## Components (48 total — always use these, never create custom)

**Data Entry**: DSButton, IconButton, ButtonGroup, DSInput, DSTextarea, DSCheckbox, CheckboxGroup, DSRadio, RadioGroup, Switch, Dropdown, DatePicker, SearchField, ColorPicker, FileUpload, TagInput, Rating, TransferList, NumberInput, OTPInput

**Data Display**: DSTable, **AdvancedDataTable** (server-side pagination, bulk actions, frozen columns), Card/CardHeader/CardBody/CardFooter, StatCard, Statistic, Badge, Tag, Avatar/AvatarGroup, Timeline, Tree, EmptyState, Skeleton

**Navigation**: TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

**Feedback**: Alert, Modal, Drawer, ConfirmDialog, Notification, toast/ToastContainer, Tooltip, Popover, ProgressBar, Spinner

**Layout**: Divider, Menu, ImagePreview, **PageHeader**, **FilterBar**

**Form**: FormField, FormLabel, FormError, FormHelperText

## Button Rules

- 6 variants: `primary` | `secondary` | `outline` | `ghost` | `destructive` | `link`
- 4 sizes: `sm` (32px) | `md` (36px) | `lg` (40px) | `xl` (44px)
- Default: `variant="primary" size="md"`
- **Max 1 primary button per view** — rest use secondary/outline/ghost

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

## Layout Pattern

```tsx
<div className="min-h-screen bg-[var(--background)]">
  <TopNavbar brand={{ name: "Sellsuki" }} breadcrumbs={[...]} user={{...}} />
  <div className="flex">
    <Sidebar brand={{ name: "Sellsuki" }} groups={[...]} />
    <main className="flex-1 p-6">
      {/* Page content */}
    </main>
  </div>
  <ToastContainer />
</div>
```

## MCP Server

This project has an MCP server at `mcp-server/` with tools:
- `list_components` — List all 41 components
- `get_component` — Get props, example code for any component
- `get_design_tokens` — Get typography, spacing, colors, etc.
- `get_color_palette` — Get full color ramps
- `get_brand_rules` — Get DO/DON'T rules
- `get_quick_start` — Get starter template
- `generate_page_layout` — Generate page scaffold from description

## Monorepo Packages

| Package | Version | Description |
|---------|---------|-------------|
| `@uxuissk/design-system` | 0.7.0 | React components (48+) |
| `@uxuissk/design-tokens` | 0.1.0 | Shared CSS + JS tokens |
| `@uxuissk/design-system-svelte` | scaffold | Svelte components (from CCS) |

## Resources

- Storybook: https://sellsukidesignsystemv12.vercel.app
- Preview: https://sellsukidesignsystemv12-2bee.vercel.app
- AI Rules: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
- npm (React): https://www.npmjs.com/package/@uxuissk/design-system
- npm (Tokens): https://www.npmjs.com/package/@uxuissk/design-tokens
