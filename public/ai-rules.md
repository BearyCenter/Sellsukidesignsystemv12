# Sellsuki Design System — AI Rules (Hosted Version)

> This file is the single source of truth for all AI tools generating Sellsuki UI.
> URL: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
> Last updated: 2026-03-20

## Important: Sandbox vs Full Mode

**Sandbox mode** (Claude.ai Artifacts, v0, Google AI Studio):
- Use ONLY React + Tailwind CSS + lucide-react + recharts
- DO NOT import from @uxuissk/design-system or any external npm package
- Recreate components inline using Tailwind classes matching tokens below
- For font: use `font-['DB_HeaventRounded',sans-serif]` for ALL text (body, button, label, badge)

**Full mode** (Claude Code, Cursor, Bolt.new, Lovable, Firebase Studio):
- Install: `npm install @uxuissk/design-system`
- CSS: `import "@uxuissk/design-system/styles.css"` (always first)
- Import: `import { DSButton, DSInput, Card, ... } from "@uxuissk/design-system"`

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

**Font: DB HeaventRounded, Noto Sans Thai, sans-serif — ALL text. NEVER use Inter.**

| Token | CSS Var | Size | Weight | Usage |
|-------|---------|------|--------|-------|
| H1 | `--text-h1` | 48px | 400 | Page titles, hero |
| H2 | `--text-h2` | 40px | 400 | Section headers |
| H3 | `--text-h3` | 28px | 400 | Card titles |
| H4 | `--text-h4` | 24px | 500 | Small headings |
| Body / P | `--text-p` | 20px | 400 | Body text, sidebar menu |
| Label | `--text-label` | 18px | 400 | Form labels, sidebar group headers |
| Button / Badge | `--text-button` | 18px | 600 | Buttons, badges, tabs |
| Caption | `--text-caption` | 14px | 400 | Helper text, timestamps |

## Spacing

- Page padding: `24px` desktop / `16px` mobile
- Card gap: `16px`
- Form field gap: `16px`
- Section gap: `32px`
- Border radius: `8px` (default)
- Shadow: `0px 1px 2px 0px rgba(0,0,0,0.05)` — prefer borders

## Layout

- Navbar: `72px` height, white background, bottom border
- Sidebar: `280px` width, white background, right border
- Content: `flex-1`, `24px` padding

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

## Component Patterns (Tailwind)

### Button
```html
<button class="h-9 px-4 bg-[#32a9ff] hover:bg-[#1b8bf5] text-white text-lg font-semibold rounded-lg font-['DB_HeaventRounded',sans-serif]">
```

### Card
```html
<div class="bg-white rounded-lg border border-[#e5e7eb] p-4">
```

### Input
```html
<input class="w-full h-9 px-3 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] placeholder:text-[#9ca3af] focus:border-[#32a9ff] focus:ring-1 focus:ring-[#32a9ff] outline-none" />
```

### Badge
```html
<span class="px-2 py-0.5 text-xs font-medium rounded-full bg-[#d1fae5] text-[#065f46]">Active</span>
```

### Table Header
```html
<th class="px-4 py-3 bg-[#f9fafb] text-[#6b7280] text-xs font-semibold uppercase text-left">
```

### Table Row
```html
<tr class="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
  <td class="px-4 py-3 text-sm text-[#1f2937]">
```

### Sidebar Menu Item
```html
<div class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[#6b7280] hover:bg-[#f0f9ff] hover:text-[#32a9ff] cursor-pointer">
```

### Active Menu Item
```html
<div class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm bg-[#f0f9ff] text-[#32a9ff] font-medium">
```

## Components (41 total)

**Data Entry**: DSButton, IconButton, ButtonGroup, DSInput, DSTextarea, DSCheckbox, CheckboxGroup, DSRadio, RadioGroup, Switch, Dropdown, DatePicker, SearchField, ColorPicker, FileUpload, TagInput, Rating, TransferList

**Data Display**: DSTable, Card, CardHeader, CardBody, CardFooter, StatCard, Statistic, Badge, Tag, Avatar, AvatarGroup, Timeline, Tree, EmptyState, Skeleton

**Navigation**: TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

**Feedback**: Alert, Modal, Drawer, ConfirmDialog, Notification, toast, ToastContainer, Tooltip, Popover, ProgressBar, Spinner

**Layout**: Divider, Menu, ImagePreview

## Rules

1. Always use flat, clean design — no heavy shadows or gradients
2. Max 1 primary button per view
3. Handle loading (skeleton), empty, and error states
4. Use DB HeaventRounded for ALL text — body, buttons, labels, badges, nav — NEVER Inter
5. Only colors from the palette above — no random colors
6. Spacing must follow the defined system
7. Support responsive: desktop-first

## npm Package (for production code)

```bash
npm install @uxuissk/design-system
```

```tsx
import "@uxuissk/design-system/styles.css";
import { DSButton, DSInput, Card } from "@uxuissk/design-system";
```

## Resources

- Storybook: https://sellsukidesignsystemv12.vercel.app
- npm: @uxuissk/design-system
- GitHub: https://github.com/BearyCenter/Sellsukidesignsystemv12
