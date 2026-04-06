# Sellsuki Design System — OpenAI Codex / Agents Rules
# Full spec: https://sellsukidesignsystemv12.vercel.app/ai-rules.md

## Project
Sellsuki is an **e-commerce management platform for Thai merchants**.
Visual identity: Professional, clean, trustworthy, light, airy, functional.

## Required Setup (do this FIRST before any component code)
```bash
npm install @uxuissk/design-system@0.8.2
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

## Resources
- Storybook & docs: https://sellsukidesignsystemv12.vercel.app
- Full AI rules: https://sellsukidesignsystemv12.vercel.app/ai-rules.md
- AI rules JSON: https://sellsukidesignsystemv12.vercel.app/ai-rules.json
- npm (React): https://www.npmjs.com/package/@uxuissk/design-system
- npm (Tokens): https://www.npmjs.com/package/@uxuissk/design-tokens
