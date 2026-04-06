# Sellsuki Design System — GitHub Copilot Instructions
# Full spec: https://sellsukidesignsystemv12.vercel.app/ai-rules.md

This is the **Sellsuki Design System** — an e-commerce management platform for Thai merchants.
Visual identity: Professional, clean, trustworthy, light, airy, functional.

## Required Setup
```bash
npm install @uxuissk/design-system@0.8.4
```
```tsx
// FIRST LINE in main.tsx/App.tsx — required for fonts and tokens
import "@uxuissk/design-system/styles.css";
import { DSButton, DSInput, Card, TopNavbar, Sidebar } from "@uxuissk/design-system";
```

⚠️ The CSS import is CRITICAL. Without it: no DB HeaventRounded font, all `var(--text-*)` tokens are undefined, components render broken.

## Font Rule
- Font: **DB HeaventRounded** for ALL text — headings, body, labels, buttons, badges, nav
- NEVER use Inter or any other font
- Font is bundled inside the npm package (no Google Fonts CDN needed)

## Typography Scale
- H1: `var(--text-h1)` = 48px
- H2: `var(--text-h2)` = 40px  
- H3: `var(--text-h3)` = 28px, bold
- H4: `var(--text-h4)` = 24px, medium
- Body: `var(--text-p)` = 20px
- Label: `var(--text-label)` = 18px
- Button/Badge: `var(--text-button)` = 18px, semibold
- Caption: `var(--text-caption)` = 14px ← MINIMUM, never go smaller

## Color Tokens
- Primary: `#32a9ff` (Sky-500)
- Primary hover: `#1b8bf5` (Sky-600)
- Text: `#1f2937` (Gray-800)
- Muted: `#6b7280` (Gray-500)
- Border: `#e5e7eb` (Gray-200)
- Success: `#059669` | Warning: `#d97706` | Danger: `#e11d48`
- Use CSS vars: `var(--primary)`, `var(--foreground)`, `var(--border)` — no raw hex

## AppShell Pattern (full-page layout)
```tsx
import { AppShell, sellsukiBrandConfig, FeaturePageScaffold, ScaffoldKPIRow } from "@uxuissk/design-system";

<AppShell product={sellsukiBrandConfig} user={user} navResolver={fn} activeItemId="orders">
  <FeaturePageScaffold layout="list" header={<PageHeader ... />} content={<DSTable ... />} />
</AppShell>
```
- `layout` values: `"list" | "detail" | "settings" | "wizard" | "dashboard" | "form" | "report"`
- Multi-product theme: `sellsukiBrandConfig | patonaBrandConfig | sukispaceBrandConfig`
- While loading session: use `<AppShellSkeleton />`

## Component Usage (60+ components — never build custom)
Always use DS components:
- Buttons → `DSButton`, `IconButton`, `ButtonGroup`
- Inputs → `DSInput`, `DSTextarea`, `SearchField`, `NumberInput`, `OTPInput`
- Date/Time → `DatePicker`, `DateRangePicker`, `TimePicker`, `DateTimePicker`
- Rich input → `RichTextEditor`, `RepeatableFieldList`, `TagInput`, `Rating`
- Tables → `DSTable`, `AdvancedDataTable`
- Charts → `LineChart`, `AreaChart`, `BarChart`, `DonutChart`, `MiniSparkline`
- Choice → `ChoiceCard`, `ChoiceCardGroup`, `RadioCard`
- Media → `ImageGallery`, `ThumbnailCell`, `ImagePreview`
- Modals → `Modal`, `Drawer`, `ConfirmDialog`
- Notifications → `toast`, `Alert`, `Notification`
- Layout → `FeaturePageScaffold`, `PageHeader`, `FilterBar`, `ScaffoldKPIRow`

## Key Rules
1. Max 1 `variant="primary"` button per view
2. Handle all states: loading (Skeleton/Spinner), empty (EmptyState), error (Alert)
3. Flat design only — no heavy shadows, no gradients
4. Desktop-first responsive
5. Always use `var(--text-*)` tokens — never hardcode px values
6. Use `AppShell` for all full-page layouts — not raw `TopNavbar + Sidebar + div`

## Resources
- Storybook & docs: https://sellsukidesignsystemv12.vercel.app
- AI rules (full): https://sellsukidesignsystemv12.vercel.app/ai-rules.md
- npm package: https://www.npmjs.com/package/@uxuissk/design-system
