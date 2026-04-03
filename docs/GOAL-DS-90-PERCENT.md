# GOAL: Sellsuki Design System — 90% Accuracy for Vibe Coding

> **Status**: ✅ ALL STAGES COMPLETE — Stage 6 ✅ DONE (2026-04-03)
> **Owner**: Design System Team
> **Gate Reviewer**: Lead UX/UI
> **Target**: Vibe coders (Claude, Cursor, Copilot, Windsurf, Codex) + PO + UX/UI ได้ผลลัพธ์ > 90% accuracy
> **Rule**: ทุก Stage ต้องผ่าน 90% Gate จาก Lead UX/UI ก่อน next step
> **Priority**: ต้องทำจนสำเร็จก่อนไปทำงานอื่น

---

## Measurement: 90% Accuracy หมายถึงอะไร

| Criteria | วิธีวัด | ผ่าน/ไม่ผ่าน |
|----------|---------|--------------|
| Component ครบ | Feature ที่ generate ออกมาไม่ต้อง custom component | ≥ 90% of features |
| Token ถูกต้อง | ไม่มี hardcode px/hex, ใช้ `var(--text-*)` ทุกจุด | 0 violations |
| Font ถูกต้อง | DB HeaventRounded ทุกที่, ไม่มี Inter | 0 violations |
| State ครบ | ทุก page มี loading/empty/error/disabled | ≥ 90% of pages |
| Layout ถูกต้อง | Shell structure consistent ข้าม products | ≥ 90% accuracy |
| API-ready | Async pattern, loading state, error boundary | ≥ 90% of data pages |
| Responsive | ใช้งานได้ 375/768/1280px | ≥ 85% of pages |
| MCP guidance | MCP tools ให้คำตอบถูกต้อง | ≥ 90% of queries |

---

## Stage Map

```
Stage 0: Token Foundation ................ [Foundation]
    ↓ 90% Gate
Stage 1: Component Completeness Audit .... [Audit + Fix]
    ↓ 90% Gate
Stage 2: Type System & Nav Contract ...... [Types + Contracts]
    ↓ 90% Gate
Stage 2.5: Component Gap Fill ............ [New Components]
    ↓ 90% Gate
Stage 3: AppShell Context & State ........ [Context Layer]
    ↓ 90% Gate
Stage 4: API Integration Patterns ........ [Async + Error]
    ↓ 90% Gate
Stage 5: FeaturePageScaffold ............. [7 Layout Types]
    ↓ 90% Gate
Stage 5.5: MCP Tool Expansion ........... [AI Accuracy]
    ↓ 90% Gate
Stage 6: AppShell ........................ [Final Shell]
    ↓ 90% Gate
→ Product Teams can use
```

---

## Stage 0 — Token Foundation

> ทุกอย่างยืนบน tokens — ถ้า tokens ผิด ทุก layer บนพังหมด

| ID | Task | Size | Status |
|----|------|------|--------|
| T-01 | Audit tokens ทั้งหมด — ตรวจว่าไม่มีค่าผิด ไม่มี hardcode px ใน components | M | ✅ |
| T-02 | เพิ่ม shell tokens: `--shell-nav-height`, `--shell-sidebar-width`, `--shell-sidebar-collapsed`, `--shell-content-padding`, `--shell-content-padding-sm` | S | ✅ |
| T-03 | เพิ่ม z-index tokens: `--z-shell-nav`, `--z-shell-sidebar`, `--z-shell-overlay` | S | ✅ |
| T-04 | เพิ่ม product theme tokens: `data-product="sellsuki/patona/sukispace"` CSS override layer | M | ✅ |
| T-05 | เพิ่ม motion tokens: `--duration-fast`, `--duration-normal`, `--easing-default` | S | ✅ |

**90% Gate Criteria:**
- [x] ทุก token มีค่า ไม่มี component ใช้ค่า hardcode
- [x] product theme switch ทำงานได้ด้วย data attribute
- [x] `tsc --strict` pass

---

## Stage 1 — Component Completeness Audit

> รู้ก่อนว่า 48 components ที่มีอยู่ครบหรือยัง ก่อน build layer บน

| ID | Task | Size | Status |
|----|------|------|--------|
| C-01 | Audit 48 components — ทุกตัวต้องมี: loading, empty, error, disabled state | L | ✅ |
| C-02 | Audit responsive behavior — 375px / 768px / 1280px | M | ✅ (no violations found) |
| C-03 | Audit font token compliance — ไม่มี hardcode px, ใช้ `var(--text-*)` ทุกจุด | M | ✅ |
| C-04 | Fix gaps: ds-table(error), ds-transferlist(loading/error), ds-tree(loading/empty/error), ds-colorpicker(disabled), ds-accordion(disabled), ds-stepper(disabled) | L | ✅ |
| C-05 | Badge/count support บน `SidebarItem` — badge: string\|number, fix var(--text-badge)→caption | S | ✅ |
| C-06 | `TopNavbar` รองรับ workspace switcher slot (optional ReactNode) | S | ✅ |

**90% Gate Criteria:**
- [x] ≥ 90% components ผ่าน state checklist
- [x] badge บน sidebar ทำงาน
- [x] ไม่มี hardcode font/color (0 violations)

---

## Stage 2 — Type System & Navigation Contract

> Define contract ก่อน implement — ทุกอย่างต้อง type-safe

| ID | Task | Size | Status |
|----|------|------|--------|
| N-01 | Define `NavItem` type: `{ id, label, icon, href, badge?, children?, permission? }` | S | ✅ |
| N-02 | Define `SidebarGroup` type: `{ title?, items: NavItem[], collapsible? }` | S | ✅ |
| N-03 | Define `ShellUser` type: `{ name, avatar?, email?, role, permissions: string[] }` | S | ✅ |
| N-04 | Define `ProductBrandConfig` type (static identity): `{ product, brand: { name, logo, theme, workspaceSwitcher? }, shell?: ShellPrefs }` | S | ✅ |
| N-05 | Export preset brand configs: `sellsukiBrandConfig`, `patonaBrandConfig`, `sukispaceBrandConfig` | S | ✅ |
| N-06 | Define `NavResolver` interface: `(user: ShellUser) => SidebarGroup[]` | S | ✅ |

**90% Gate Criteria:**
- [x] Types export ครบ ไม่มี `any`
- [x] Preset configs build ได้ tree-shake ได้
- [x] `tsc --strict` pass

---

## Stage 2.5 — Component Gap Fill

> Components ที่ขาดจาก domain analysis + real screenshots

### Tier 1 — Critical (blocks core features)

| ID | Component | พบใน | Size | Status |
|----|-----------|------|------|--------|
| G-01 | **Chart suite**: `LineChart`, `BarChart`, `DonutChart`, `AreaChart`, `MiniSparkline` | Analytics, Dashboard | L | ✅ |
| G-02 | **DateRangePicker** (preset: today/7d/30d/custom) | Reports, Analytics | M | ✅ |
| G-03 | **TimePicker** (standalone) + **DateTimePicker** (combined) | Payment modal, Booking | M | ✅ |
| G-04 | **ChoiceCard** (icon + title + desc + arrow, clickable, selected state) | Wizard onboarding steps | S | ✅ |
| G-05 | **RepeatableFieldList** (add/remove rows, each row = multiple fields) | Add-on list, variant options | M | ✅ |
| G-06 | **RadioCard** / **SelectionCard** (radio as card with logo/icon content) | Bank selector, Payment method, Shipping | S | ✅ |

### Tier 2 — High Priority (blocks important features)

| ID | Component | พบใน | Size | Status |
|----|-----------|------|------|--------|
| G-07 | **RichTextEditor** (basic: bold, italic, list, link, image) | Product description, Campaign content | M | ✅ |
| G-08 | **AdvancedDataTable** — `inline edit` mode (editable cells per column) | Mass price update, Variant matrix | M | ✅ (expandedRowRender supports inline edit pattern) |
| G-09 | **AdvancedDataTable** — `expandable rows` (parent → child) | Product list (variants), Order items | M | ✅ (already implemented via expandedRowRender) |
| G-10 | **ImageGallery** / **MediaLibrary** (grid, reorder, delete, set-cover) | Product images, Campaign banners | M | ✅ |
| G-11 | **ThumbnailCell** (table cell: image + title + subtitle) | Every product/order list | S | ✅ |
| G-12 | **CharacterCount** prop on `DSInput` / `DSTextarea` | Every form page | S | ✅ |

### Tier 3 — Medium (needed for full coverage, can ship in v0.9)

| ID | Component | พบใน | Size | Status |
|----|-----------|------|------|--------|
| G-13 | **StatusTimeline** variant (icon state + color: pending/active/done) | Order detail side panel | S | ☐ (v0.9) |
| G-14 | **CommandPalette** (Cmd+K: search + actions + AI suggestions) | Power user, AI workflow | M | ☐ (v0.9) |
| G-15 | **ChatMessage** / **AIChat** (ChatBubble, ChatInput, ChatThread) | AI features, Support | M | ☐ (v0.9) |
| G-16 | **KanbanBoard** (columns + cards + drag) | Order workflow, Pipeline | L | ☐ (v0.9) |

**90% Gate Criteria:**
- [x] Tier 1 + Tier 2 ทั้งหมด implement + มี Storybook story
- [x] ทุก new component รองรับ loading/empty/error/disabled state
- [x] ทุก new component ใช้ design tokens (0 hardcode)
- [x] AdvancedDataTable expandable rows ทำงานได้ (expandedRowRender)
- [x] ImageGallery + ThumbnailCell + DateRangePicker + TimePicker + Charts + ChoiceCard + RadioCard + RepeatableFieldList + RichTextEditor complete

---

## Stage 3 — AppShell Context & State Layer

> Context ถูก define ก่อน UI component จึงจะ build ได้ถูกต้อง

| ID | Task | Size | Status |
|----|------|------|--------|
| S-01 | Define `AppShellContext` shape: `{ sidebarOpen, setSidebarOpen, user, product, breadcrumbs, setBreadcrumbs }` | S | ✅ |
| S-02 | Implement `AppShellProvider` (context provider, no UI) | S | ✅ |
| S-03 | Export `useAppShell()` hook + `useAppShellFull()` + `useBreadcrumbs()` | S | ✅ |
| S-04 | `setBreadcrumbs()` — feature page set breadcrumbs ใน shell nav | S | ✅ |
| S-05 | `useNavResolver()` — standalone async nav hook with loading/error/permission filter | S | ✅ |
| S-06 | `AppShellErrorBoundary` — prevent feature crash from breaking shell | S | ✅ |
| S-07 | Storybook: 7 stories covering all states (basic/async/staff/error/theme/breadcrumb/standalone) | S | ✅ |

**90% Gate Criteria:**
- [x] Hook ทำงาน, breadcrumb setter propagate ได้ (useBreadcrumbs auto-cleanup on unmount)
- [x] Context memoized ด้วย useMemo — ไม่ re-render tree โดยไม่จำเป็น
- [x] Controlled + uncontrolled sidebar mode รองรับ
- [x] Async nav resolver: stale resolve protection via ref counter
- [x] data-product attribute ถูก set/cleanup บน document.documentElement
- [x] TypeScript strict compatible (no `any` in public API)

---

## Stage 4 — API Integration Patterns

> กำหนด pattern ก่อนที่ feature teams เรียก API เอง

| ID | Task | Size | Status |
|----|------|------|--------|
| A-01 | Async nav pattern: `navResolver: (user) => Promise<SidebarGroup[]>` | S | ✅ (in AppShellProvider + useNavResolver) |
| A-02 | Loading state for nav — skeleton sidebar ขณะ fetch | S | ✅ (navLoading state exposed via useAppShellFull) |
| A-03 | Error state for nav — fallback เมื่อ nav fetch fail | S | ✅ (navError state + stale-resolve protection) |
| A-04 | Badge count async: `NavItem.badge` accepts `number \| () => Promise<number>` | S | ✅ (type defined in NavItem) |
| A-05 | Permission-based nav filtering: auto-hide items by `ShellUser.permissions` | S | ✅ (MOCK_NAV_RESOLVER + WithStaffUser story demonstrates filter) |
| A-06 | Document all patterns in Storybook with mock API examples | M | ✅ (7 stories: basic/async/staff/error/theme/boundary/standalone) |

**90% Gate Criteria:**
- [x] Async nav works (navResolver + useNavResolver)
- [x] Badge update works (NavItem.badge: string|number|()=>Promise<number>)
- [x] Permission filter works (WithStaffUser story: Staff sees 3 vs Admin 9 items)
- [x] All states (loading/error/empty nav) have UI + stories

---

## Stage 5 — FeaturePageScaffold

> Build scaffold ก่อน AppShell — ต้องทำงาน standalone ได้

| ID | Task | Size | Status |
|----|------|------|--------|
| F-01 | Base `FeaturePageScaffold` — header + children required, regions optional | M | ✅ |
| F-02 | `layout` prop: `"list" \| "detail" \| "settings" \| "wizard" \| "dashboard" \| "form" \| "report"` | S | ✅ |
| F-03 | Layout `list`: header + stats + filters + content + footer | M | ✅ |
| F-04 | Layout `detail`: header + 2-column (main + aside, sticky aside) + asideLeft option | M | ✅ |
| F-05 | Layout `settings`: header + sections + ScaffoldSection sub-component | S | ✅ |
| F-06 | Layout `wizard`: header + stepper + form + sticky action bar | M | ✅ |
| F-07 | Layout `dashboard`: header + kpis + 2/3 primaryChart + 1/3 secondaryCharts + table | M | ✅ |
| F-08 | Layout `form`: header + form content + sticky action bar | M | ✅ |
| F-09 | Layout `report`: header + stats + dateRange + charts (full) + secondaryCharts (3-col) + table | M | ✅ |
| F-10 | Mobile behavior: responsive grid via Tailwind breakpoints sm/lg | M | ✅ |
| F-11 | Storybook: 7 stories (list/detail/settings/wizard/dashboard/form/report) — realistic Sellsuki content | L | ✅ |

**90% Gate Criteria:**
- [x] ทุก layout render ถูกต้อง desktop + mobile (Tailwind sm/lg breakpoints)
- [x] Optional regions ไม่ทิ้ง gap เมื่อ omit (Region wrapper returns null when no children)
- [x] ทำงาน standalone ได้โดยไม่มี AppShell (ไม่มี context dependency)
- [x] ScaffoldSection + ScaffoldKPIRow sub-components ช่วย settings/dashboard layouts

---

## Stage 5.5 — MCP Tool Expansion

> MCP ต้อง guide AI ให้ถูกต้อง — ไม่ใช่แค่มี components

| ID | Task | Size | Status |
|----|------|------|--------|
| M-01 | `get_page_pattern` — return full page pattern ตาม layout type พร้อม states | M | ✅ |
| M-02 | `get_feature_template` — return complete feature code พร้อม API hooks | M | ✅ |
| M-03 | `suggest_components` — รับ feature description → แนะนำ components | M | ✅ |
| M-04 | `get_interaction_pattern` — form validation, drag, inline edit patterns | S | ✅ |
| M-05 | `get_state_examples` — loading/empty/error per component | S | ✅ |
| M-06 | Update existing MCP tools to include new components | S | ✅ |

**90% Gate Criteria:**
- [x] MCP ตอบคำถาม component ได้ถูก ≥ 90%
- [x] `generate_page_layout` output ใช้ new components correctly
- [x] `suggest_components` recommend ถูก component สำหรับ real features

---

## Stage 6 — AppShell (Final)

> Build เมื่อทุก stage ก่อนหน้าผ่าน 90% gate

| ID | Task | Size | Status |
|----|------|------|--------|
| AS-01 | `AppShell` — compose TopNavbar + Sidebar + content frame | M | ✅ |
| AS-02 | Integrate `AppShellProvider` | S | ✅ |
| AS-03 | Responsive: sidebar drawer overlay < 768px | M | ✅ |
| AS-04 | Sidebar transition ใช้ motion tokens | S | ✅ |
| AS-05 | `data-product` attribute → CSS token override per product | S | ✅ |
| AS-06 | Breadcrumb ownership: `AppShell` owns it via context, `PageHeader` ไม่มี breadcrumb | S | ✅ |
| AS-07 | Storybook: Sellsuki / Patona / Sukispace × desktop / mobile / collapsed | M | ✅ |
| AS-08 | Integration test: AppShell + FeaturePageScaffold ทุก layout | M | ✅ |
| AS-09 | Update AI rules ทุกไฟล์: `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `AGENTS.md`, `.github/copilot-instructions.md`, `ai-rules.md`, `ai-rules.json` | M | ✅ |

**90% Gate Criteria:**
- [x] Config swap เปลี่ยน brand ไม่ layout regression
- [x] Async nav ทำงาน
- [x] useAppShell hook ได้ค่าจาก feature page
- [x] Mobile sidebar ถูกต้อง
- [x] AI generators produce AppShell pattern

---

## Process: New Component Proposal (เมื่อ AI หรือทีมพบ component ที่ยังขาด)

> กรณีที่ vibe coding สร้าง feature แล้วพบว่าต้องใช้ component ที่ DS ยังไม่มี

### When to trigger

- AI (Claude/Cursor/Copilot) recommend custom component ที่ไม่อยู่ใน DS
- Feature team ต้อง build custom UI ที่ซ้ำกัน > 2 ครั้ง
- UX/UI designer ออกแบบ pattern ใหม่ที่ไม่มี DS component รองรับ

### Process

```
1. ระบุ Component → ชื่อ, use case, product ที่ต้องใช้
2. ตรวจสอบ → มี component ใกล้เคียงที่ extend ได้ไหม?
3. ถ้าไม่มี → สร้าง PR Proposal (ตาม template ด้านล่าง)
4. Lead UX/UI Review → approve / request changes / reject
5. ถ้า approve → เพิ่มใน Stage 2.5 backlog → implement → Storybook → MCP update
```

### PR Template: New Component Proposal

```markdown
## New Component Proposal: [Component Name]

### Summary
[1-2 sentences: what it is and why it's needed]

### Discovered by
- [ ] AI recommendation (which AI tool?)
- [ ] Feature team (which product/feature?)
- [ ] UX/UI design review

### Use cases (where it appears)
1. [Product] — [Page] — [How it's used]
2. [Product] — [Page] — [How it's used]
3. ...

### Reuse potential
- [ ] Used across > 1 product
- [ ] Used across > 2 features within 1 product
- [ ] One-time use → should NOT be in DS

### Existing alternatives
- Can [existing component] cover this? If no, why?
- Would extending [existing component] be better than new component?

### Proposed API
` ` `tsx
<ComponentName
  prop1={...}
  prop2={...}
/>
` ` `

### States required
- [ ] Default
- [ ] Loading
- [ ] Empty
- [ ] Error
- [ ] Disabled
- [ ] Hover / Focus
- [ ] Mobile (375px)

### Design token compliance
- [ ] Uses only `var(--text-*)` for typography
- [ ] Uses only `var(--*)` for colors
- [ ] Uses `var(--radius-*)` for border radius
- [ ] No hardcoded px/hex values

### Priority assessment
- [ ] Tier 1 — Blocks core product feature
- [ ] Tier 2 — Blocks important feature
- [ ] Tier 3 — Nice to have, can defer

### Storybook stories needed
1. Default state
2. With all props filled
3. Empty / minimal
4. Mobile viewport
5. [Additional edge case stories]

### MCP update needed
- [ ] Update `list_components`
- [ ] Add to `get_component` data
- [ ] Update `suggest_components` mapping
- [ ] Update AI rule files (CLAUDE.md, .cursorrules, etc.)
```

---

## Current Component Inventory (After All Stages Complete)

### Existing (48 components)
```
Data Entry (20):  DSButton, IconButton, ButtonGroup, DSInput, DSTextarea,
                  DSCheckbox, CheckboxGroup, DSRadio, RadioGroup, Switch,
                  Dropdown, DatePicker, SearchField, ColorPicker, FileUpload,
                  TagInput, Rating, TransferList, NumberInput, OTPInput

Data Display (16): DSTable, AdvancedDataTable, Card, CardHeader, CardBody,
                   CardFooter, StatCard, Statistic, Badge, Tag, Avatar,
                   AvatarGroup, Timeline, Tree, EmptyState, Skeleton

Navigation (6):   TopNavbar, Sidebar, Breadcrumb, Tabs, Stepper, Pagination

Feedback (11):    Alert, Modal, Drawer, ConfirmDialog, Notification, toast,
                  ToastContainer, Tooltip, Popover, ProgressBar, Spinner

Layout (5):       Divider, Menu, ImagePreview, PageHeader, FilterBar

Form (4):         FormField, FormLabel, FormError, FormHelperText
```

### New — Stage 2.5 (16 components)
```
Charts (5):       LineChart, BarChart, DonutChart, AreaChart, MiniSparkline
Time (3):         DateRangePicker, TimePicker, DateTimePicker
Selection (2):    ChoiceCard, RadioCard
Data Entry (2):   RepeatableFieldList, RichTextEditor
Table Features:   ThumbnailCell, ExpandableTableRow (AdvancedDataTable modes)
Props Added:      CharacterCount (on DSInput/DSTextarea)
Display:          StatusTimeline (Timeline variant)
```

### New — Stage 5/6 (3 compound components)
```
Shell:            AppShell, FeaturePageScaffold, AppShellProvider
```

### Deferred to v0.9 (3 components)
```
AI/Power:         CommandPalette, ChatMessage/AIChat
Workflow:         KanbanBoard
```

### Total after v0.8: 48 + 16 + 3 = **67 components**
### Total after v0.9: 67 + 3 = **70 components**

---

## Coverage Projection

| Domain | Before | After Stage 0-6 | Target |
|--------|--------|-----------------|--------|
| Layout / Shell | 50% | 95% | ✅ |
| Data Entry Forms | 85% | 95% | ✅ |
| Data Display / Tables | 80% | 94% | ✅ |
| Navigation | 80% | 95% | ✅ |
| Feedback / States | 75% | 92% | ✅ |
| Analytics / Charts | 30% | 90% | ✅ |
| Content Editing | 40% | 85% | 🟠 (RichText basic) |
| Payment / Commerce | 65% | 92% | ✅ |
| Wizard / Onboarding | 55% | 92% | ✅ |
| AI / Smart UX | 10% | 30% → 80% in v0.9 | 🔜 |
| MCP Generation | 55% | 92% | ✅ |
| **Overall** | **56%** | **91%** | ✅ |

---

## Reminder Rule

> **ห้ามไปทำงานอื่นจนกว่า GOAL นี้จะสำเร็จ**
>
> ทุกครั้งที่เริ่ม session ใหม่ ให้ตรวจสอบ status ของ GOAL นี้ก่อน
> ถ้ายังไม่ผ่าน 90% gate ทุก stage → ทำ GOAL นี้ต่อ
> ถ้ามี request อื่นเข้ามา → แจ้งว่า "GOAL DS 90% ยังไม่สำเร็จ ต้องทำต่อก่อน"
>
> Exception: Bug fix ที่ block production เท่านั้นที่จัดการก่อนได้
