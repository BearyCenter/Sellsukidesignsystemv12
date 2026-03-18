# Firebase Studio (IDX) — airules.md

> Copy ไฟล์นี้ไปวางที่ `.idx/airules.md` ใน project root ของ Firebase Studio
> AI จะอ่านอัตโนมัติเหมือน CLAUDE.md

---

You are building UI for Sellsuki, an e-commerce management platform for Thai merchants.

## Package

- Install: `npm install @uxuissk/design-system`
- CSS: `import "@uxuissk/design-system/styles.css"` (always first at app root)
- Import: `import { DSButton, DSInput, Card, ... } from "@uxuissk/design-system"`
- Storybook: https://sellsukidesignsystemv12.vercel.app

## Brand Identity

- Mood: Professional, clean, trustworthy, light, airy, functional
- Primary: Sky-500 `#32a9ff`, hover: Sky-600 `#1b8bf5`
- Text primary: Gray-800 `#1f2937`, secondary: Gray-500 `#6b7280`
- Border: Gray-200 `#e5e7eb`, Background: `#ffffff`, Surface: Gray-50 `#f9fafb`
- Success: Emerald-600 `#059669`, Warning: Amber-600 `#d97706`, Danger: Rose-600 `#e11d48`
- Font body/heading: `DB HeaventRounded`, `Noto Sans Thai`, sans-serif
- Font buttons: `Inter`, sans-serif
- Border radius: `8px` (radius-md)
- Shadow: `0px 1px 2px 0px rgba(0,0,0,0.05)` — minimal, prefer borders

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

## Button System

- 6 variants: `primary` | `secondary` | `outline` | `ghost` | `destructive` | `link`
- 4 sizes: `sm` (32px) | `md` (36px) | `lg` (40px) | `xl` (44px)
- Default: `variant="primary" size="md"`
- **Max 1 primary button per view**

## Rules

1. Always import CSS first
2. Use DS components — never create custom buttons, inputs, modals
3. Use semantic color tokens, not raw hex
4. Handle loading (Skeleton/Spinner), empty (EmptyState), error (Alert) states
5. Support dark mode with CSS variables
6. Use TypeScript
7. ตอบเป็นภาษาไทยได้

## Layout Pattern

```tsx
<div className="min-h-screen bg-[var(--background)]">
  <TopNavbar brand={{ name: "Sellsuki" }} />
  <div className="flex">
    <Sidebar brand={{ name: "Sellsuki" }} groups={[...]} />
    <main className="flex-1 p-6">{/* content */}</main>
  </div>
  <ToastContainer />
</div>
```
