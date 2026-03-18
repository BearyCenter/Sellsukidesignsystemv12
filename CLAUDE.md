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

Install: `npm install @uxuissk/design-system`

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
| Font body | `DB HeaventRounded` | All text except buttons |
| Font button | `Inter` | Button text only |
| Radius | `8px` (radius-md) | Default corner radius |
| Shadow | `0px 1px 2px 0px #0000000d` | Minimal, prefer borders |

## Spacing

- Page padding: `24px` desktop / `16px` mobile
- Card gap: `16px`
- Form field gap: `16px`
- Section gap: `32px`

## Components (41 total — always use these, never create custom)

**Data Entry**: DSButton, IconButton, ButtonGroup, DSInput, DSTextarea, DSCheckbox, CheckboxGroup, DSRadio, RadioGroup, Switch, Dropdown, DatePicker, SearchField, ColorPicker, FileUpload, TagInput, Rating, TransferList

**Data Display**: DSTable, Card/CardHeader/CardBody/CardFooter, StatCard, Statistic, Badge, Tag, Avatar/AvatarGroup, Timeline, Tree, EmptyState, Skeleton

**Navigation**: TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

**Feedback**: Alert, Modal, Drawer, ConfirmDialog, Notification, toast/ToastContainer, Tooltip, Popover, ProgressBar, Spinner

**Layout**: Divider, Menu, ImagePreview

## Button Rules

- 6 variants: `primary` | `secondary` | `outline` | `ghost` | `destructive` | `link`
- 4 sizes: `sm` (32px) | `md` (36px) | `lg` (40px) | `xl` (44px)
- Default: `variant="primary" size="md"`
- **Max 1 primary button per view** — rest use secondary/outline/ghost

## DO

1. Always import CSS first: `import "@uxuissk/design-system/styles.css"`
2. Use DS components — never create custom buttons, inputs, modals
3. Use semantic color tokens, not raw hex
4. Use DB HeaventRounded for text, Inter only for buttons
5. Default size `md` for all components
6. Handle loading (Skeleton/Spinner), empty (EmptyState), error (Alert) states
7. Support dark mode — use CSS variables

## DON'T

1. Don't use colors outside Sky/Gray/Rose/Emerald/Amber/Orange palette
2. Don't use heavy shadows — only elevation-sm
3. Don't hardcode hex values
4. Don't create custom form components
5. Don't use more than 1 primary button per view
6. Don't skip loading/empty/error states

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

## Resources

- Storybook: https://sellsukidesignsystemv12.vercel.app
- Preview: https://sellsukidesignsystemv12-2bee.vercel.app
- npm: `@uxuissk/design-system`
