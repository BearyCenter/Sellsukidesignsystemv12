# Sellsuki DSS (Design System Specification) — Claude Context

> **Purpose**: โครงสร้าง DSS นี้ใช้เป็น foundation สำหรับทุก product ของ Sellsuki  
> ทั้ง @uxuissk/design-system (Web Components / Lit), Static HTML prototypes, และ React wrappers

---

## 📐 Design Tokens

### Typography — DB HeaventRounded

**Font Family**: `'DB HeaventRounded', 'Sarabun', sans-serif`

| Token Name | CSS Variable | Size | Usage | Line Height |
|---|---|---|---|---|
| Oversize-10X-Large | `--fs-oversize1` | 197px | Oversize1 | 1.2 (120%) |
| Oversize-9X-Large | `--fs-oversize2` | 158px | Oversize2 | 1.2 |
| Page-8X-Large | `--fs-page1` | 126px | Page1 | 1.2 |
| Page-7X-Large | `--fs-page2` | 96px | Page2 | 1.2 |
| Title-6X-Large | `--fs-title` | 72px | Title | 1.2 |
| Header-5X-Large | `--fs-h1` | 60px | Header1 | 1.2 |
| Header-4X-Large | `--fs-h2` | 52px | Header2 | 1.0 (100%) |
| Header-3X-Large | `--fs-h3` | 44px | Header3 | 1.0 |
| **Header-2X-Large** | `--fs-h4` | **36px** | **Header4** — Page titles | 1.0 |
| **Header-X-Large** | `--fs-h5` | **28px** | **Header5** | 1.0 |
| **Body-Base-Medium** | `--fs-text1` | **24px** | **Text1 / Button** | 1.0 |
| Body-X-Small | `--fs-text2` | 20px | Text2 | 1.0 |
| Description-2X-Small | `--fs-desc1` | 18px | Description1 | 1.0 |
| **Description-3X-Small** | `--fs-desc2` | **16px** | **Description2** — base body | 1.0 |
| **Caption-4X-Small** | `--fs-cap1` | **14px** | **Caption1** — table cells, nav items | 1.0 |
| **Caption-5X-Small** | `--fs-cap2` | **12px** | **Caption2** — labels, meta | 1.0 |

**Font Weights:**
| Token | CSS Variable | Value |
|---|---|---|
| Bold | `--fw-bold` | 700 |
| Medium | `--fw-med` | 500 |
| Regular | `--fw-regular` | 400 |

**Token Naming Convention**: `DB HeaventRounded-<size>-<weight>-<style>`  
Example: `DB HeaventRounded-5x-large-bold-normal`

---

### Color Palette

#### Brand Colors
| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| Brand Primary | `--brand-primary` | `#32A9FF` | Primary actions, active states, brand elements |
| Brand Hover | `--brand-primary-hover` | `#0EA5E9` | Hover state for primary elements |
| Brand Background | `--brand-primary-bg` | `#F0F9FF` | Active nav bg, hover bg, light highlight |
| Brand Border | `--brand-primary-border` | `#D9F2FF` | Company card border, subtle brand borders |
| Brand Light | `--brand-primary-light` | `#BAE6FD` | Decorative / light accents |

#### Neutral / Gray Scale (Tailwind Gray)
| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| Gray 50 | `--gray-50` | `#F9FAFB` | Page background, table header bg |
| Gray 100 | `--gray-100` | `#F3F4F6` | Content area bg, hover states |
| Gray 200 | `--gray-200` | `#E5E7EB` | Borders, dividers |
| Gray 300 | `--gray-300` | `#D1D5DB` | Disabled borders, chevrons |
| Gray 400 | `--gray-400` | `#9CA3AF` | Tertiary text, placeholders |
| Gray 500 | `--gray-500` | `#6B7280` | Secondary text, descriptions |
| Gray 600 | `--gray-600` | `#4B5563` | Hover text |
| Gray 700 | `--gray-700` | `#374151` | Price text, strong secondary |
| Gray 800 | `--gray-800` | `#1F2937` | Primary text, headings |
| Gray 900 | `--gray-900` | `#111827` | Topbar icons, darkest text |

#### Semantic Colors
| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| White | `--white` | `#FFFFFF` | Surface backgrounds |
| Border | `--border` | `#E5E7EB` | Default border color |
| Page BG | `--bg-page` | `#F3F4F6` | Main content background |
| Surface BG | `--bg-surface` | `#FFFFFF` | Cards, panels, sidebar |
| Text Primary | `--text-primary` | `#1F2937` | Headings, primary text |
| Text Secondary | `--text-secondary` | `#6B7280` | Descriptions, SKU |
| Text Tertiary | `--text-tertiary` | `#9CA3AF` | Labels, group headers |
| Text Brand | `--text-brand` | `#32A9FF` | Active nav items, links |
| Error | `--red` | `#EF4444` | Delete actions |
| Error BG | `--red-bg` | `#FEF2F2` | Error state backgrounds |

#### Elevation (Shadows)
| Token | CSS Variable | Value |
|---|---|---|
| Shadow SM | `--shadow-sm` | `0 1px 2px rgba(0,0,0,.05)` |
| Shadow | `--shadow` | `0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)` |
| Shadow MD | `--shadow-md` | `0 4px 16px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.06)` |

---

### Layout Constants
| Token | CSS Variable | Value |
|---|---|---|
| Sidebar Width | `--sidebar-width` | 256px |
| Topbar Height | `--topbar-height` | 72px |
| Border Radius SM | `--border-radius-sm` | 8px |
| Border Radius MD | `--border-radius-md` | 12px |
| Border Radius LG | `--border-radius-lg` | 16px |

---

## ⚙️ Installation (@uxuissk/design-system)
```bash
npm i @uxuissk/design-system
```

---

## 📦 Core Pattern — ต้องใช้ทุก component

@uxuissk/design-system เป็น Web Components (Lit) พร้อม React wrappers ในตัว — import component ได้โดยตรงจาก package

```tsx
// components/SskButton.tsx
import { SskButton } from "@uxuissk/design-system";

// ใช้งานได้ทันที — ไม่ต้อง createComponent
export default SskButton;
```

### Pattern สำคัญ
- import component ได้โดยตรงจาก `@uxuissk/design-system`
- `events` ต้อง map event ที่ component ใช้จริง (ดูจาก EVENTS PROPS ในแต่ละ component)
- import style ถ้า component มี: `import "@uxuissk/design-system/dist/style.css"`
- ใช้ `<ssk-theme-provider>` หรือ `SskThemeProvider` ครอบทุก component เสมอ

---

## 🎨 Theme Provider (ต้องมีเสมอ)

```tsx
import { SskThemeProvider } from "@uxuissk/design-system";

const App = () => (
  <SskThemeProvider lang="th">
    {/* components ทั้งหมด */}
  </SskThemeProvider>
);
```

---

## 🧩 Components

### Button

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"solid" \| "outline" \| "ghost"` | `"solid"` | รูปแบบของปุ่ม |
| `label` | `string` | - | ข้อความในปุ่ม |
| `fbDisabled` | `boolean` | `false` | ปิดการใช้งาน |
| `size` | `string` | - | ขนาด component |
| `themeColor` | `string` | - | สีธีม |

**DSS Style Spec:**
- Font: Text1 (24px), Medium weight
- Border-radius: 10px
- Padding: 8px 20px
- NO box-shadow
- Solid: bg `#32A9FF`, text white
- Outline: bg white, border 1.5px `#32A9FF`
- Ghost: bg transparent, text `#32A9FF`

---

### Badge, Input, Modal, Table, Pagination

_(Component props same as original CLAUDE.md — see @uxuissk/design-system Storybook)_

---

## 🎯 Icons — Heroicons

**Package:** `@heroicons/react` (MIT License, by Tailwind Labs)

```bash
npm install @heroicons/react
```

### Icon Sizes
| Package path | Size | Style |
|---|---|---|
| `@heroicons/react/24/outline` | 24×24 | Outline (stroke) |
| `@heroicons/react/24/solid` | 24×24 | Solid (fill) |
| `@heroicons/react/20/solid` | 20×20 | Solid (fill) |
| `@heroicons/react/16/solid` | 16×16 | Solid (fill) |

### ขนาดแนะนำ
- **Nav icon**: 20px (sidebar navigation)
- **Page header**: 24px
- **Inside button**: 14–16px
- **Table action**: 16px
- **Topbar**: 18px

### Naming Convention
- UpperCamelCase + suffix `Icon`
- `magnifying-glass` → `MagnifyingGlassIcon`
- `chevron-down` → `ChevronDownIcon`

### Icons ที่ใช้บ่อย
```tsx
// Navigation & Layout
import { Bars3Icon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Products & Commerce
import { ShoppingBagIcon, CubeIcon, TagIcon, CreditCardIcon } from "@heroicons/react/24/outline";

// Users & Account
import { UserIcon, UsersIcon, UserGroupIcon } from "@heroicons/react/24/outline";

// Actions
import { PencilIcon, TrashIcon, PlusIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

// Status
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
```

---

## 📐 Page Layout Structure

```
┌──────────────────────────────────────────────────┐
│ Topbar (72px, white bg, border-bottom)           │
├────────┬─────────────────────────────────────────┤
│        │                                         │
│ Sidebar│  Content Area (#F3F4F6 bg)              │
│ (256px)│                                         │
│ white  │  ┌─────────────────────────────────┐    │
│ bg     │  │ Table Card (white bg, 8px rad)  │    │
│        │  │ ┌───────────────────────────────┐│    │
│        │  │ │ Header: Title + Add Button    ││    │
│        │  │ ├───────────────────────────────┤│    │
│        │  │ │ Column Headers (gray-50 bg)   ││    │
│        │  │ ├───────────────────────────────┤│    │
│        │  │ │ Table Rows                    ││    │
│        │  │ │  ├─ Parent Row (expandable)   ││    │
│        │  │ │  └─ Child Rows (indented)     ││    │
│        │  │ └───────────────────────────────┘│    │
│        │  └─────────────────────────────────┘    │
│        │  Pagination                             │
└────────┴─────────────────────────────────────────┘
```

### Sidebar Structure
```
ssk-sidebar (256px, white bg, border-right)
  └─ ssk-sidebar-header
      └─ co-card (#F0F9FF bg, #D9F2FF border, 8px radius)
          ├─ co-avatar (44×44, rounded)
          ├─ co-info (name + branch)
          └─ co-badge (chevron dropdown)
  └─ ssk-sidebar-list
      └─ ssk-sidebar-group (repeatable)
          ├─ ssk-group-label (12px, bold, gray-400, uppercase)
          └─ ssk-group-items
              └─ ssk-nav-item (14px, regular/med, icon+label)
                  ├─ default: gray-500 text
                  └─ active: #32A9FF text, #F0F9FF bg, right border
```

---

## 🚀 Quick Start Template

```tsx
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SskThemeProvider } from "@uxuissk/design-system";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SskThemeProvider lang="th">
    <App />
  </SskThemeProvider>
);
```

---

## 📋 Full Component List

```
Accordion, Alert, Avatar, Badge, Button, Calendar, Card,
CardExpandable, CardSelect, Checkbox, CodeBlock, Container,
DateDisplay, DatePicker, Divider, DownloadFile, Drawer,
Dropdown, DynamicTable, Heading, I18n, Icon, MiscIcon,
Image, ImageCropper, Input, InputTag, Logo, Menu, Modal,
Pagination, PinCode, ProgressBar, Radio, Scrollbar, Sidebar,
Skeleton, Spinner, Stepper, TabHeader, Table, Tabs, Tag,
Text, Textarea, Time, Timeline, Toast, Toggle, Tooltip,
TopNavbar, WidgetExample, WidgetGrid, WidgetMatric,
WidgetTable, WidgetTitle, WidgetUserDetail
```

---

## ⚠️ สิ่งที่ต้องระวัง

1. **Import ได้โดยตรงจาก @uxuissk/design-system** — ไม่ต้อง createComponent แล้ว
2. **events mapping** — event name ต้องตรงกับ DOM event ที่ component emit จริง
3. **ThemeProvider ต้องครอบ** — หากไม่มี อาจแสดงผลผิดพลาด
4. **slot สำหรับ content** — Modal ใช้ `slot="footer"` attribute
5. **Props เป็น camelCase** — เช่น `backgroundColor` ไม่ใช่ `background-color`
6. **Brand color คือ `#32A9FF`** — ไม่ใช่ `#0EA5E9` (ใช้ hover เท่านั้น)
7. **Typography ใช้ DB HeaventRounded** — fallback เป็น Sarabun, sans-serif
8. **Sidebar width: 256px**, **Topbar height: 72px** — ตาม design spec
9. **NO box-shadow on buttons** — ตาม DSS component spec
10. **Content area bg: `#F3F4F6`** (gray-100) — ไม่ใช่ gray-50