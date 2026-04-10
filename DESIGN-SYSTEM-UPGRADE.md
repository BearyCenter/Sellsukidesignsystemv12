# Sellsuki Design System — Upgrade Spec v2.1
> **AI-readable task spec** — อ่านไฟล์นี้ก่อนทำงานทุกครั้ง สถานะงาน, context ครบในที่เดียว

---

## Meta

| Field | Value |
|-------|-------|
| **Document version** | 1.0 |
| **Created** | 2025-04-10 |
| **Owner** | UX/UI Lead + Tech Lead |
| **Status** | 🟡 Planning — รอ kickoff |
| **Target** | DS 2.1 เป็น single source of truth ทุก product |
| **Preview** | https://sellsukidesignsystemv12-2bee.vercel.app (DS 2.0 + DS 2.1 entry) |
| **Storybook** | https://sellsukidesignsystemv12.vercel.app |
| **DS 1.0 Source** | `C:\Users\Aoftimuz\Documents\GitLab\sellsuki-components-main` |
| **DS 2.0/2.1 Source** | `C:\Users\Aoftimuz\Documents\GitHub\SellsukiComponent\Sellsukidesignsystemv12` |

---

## 1. Strategic Context

### ปัญหาที่ต้องแก้

| ปัญหา | Detail |
|-------|--------|
| DS 1.0 (Web Components) กับ DS 2.0 (React) ขนานกัน | 2 design languages = visual drift ข้าม product |
| DS 1.0 มี font size overrides ที่ผิด | ขนาดต่ำกว่า 18px minimum ในหลายจุด |
| Token naming ต่างกัน | `--ssk-colors-sky-500` vs `--primary` |
| Product teams ไม่สามารถ migrate ไป DS 2.0 ได้ง่าย | DS 2.0 = React-only, non-React products block |
| UX/UI ต้องรอ Dev เพื่อ push visual change | ไม่มี token-first workflow |

### ทำไมเลือก DS 2.1 (DS 1.0-base)

```
DS 1.0 (Web Components/Lit)     ← Architecture คง
     + DS 2.0 Design Language   ← Token values, visual rules
     + DS 2.0 Components        ← Port ตัวที่ขาดเป็น Lit
     ─────────────────────────────────────────
     = DS 2.1  (Web Components + 2.0 quality)
```

| | Strategy A: DS 2.0 (React only) | Strategy B: DS 2.1 (1.0-base) ✅ |
|---|---|---|
| Product ที่ใช้อยู่ | ต้องเขียนใหม่ทั้งหมด | อัปเดต package เท่านั้น |
| Framework dependency | React เท่านั้น | Vue, Angular, React, Vanilla — ทุกอย่าง |
| UX/UI คุมโดยไม่รอ Dev | ❌ น้อยมาก | ✅ CSS token = UX/UI territory |
| Migration risk | 🔴 สูง | 🟢 ต่ำ |
| Time to visual consistency | 3-6+ เดือน | 2-4 สัปดาห์ |

---

## 2. Architecture Decision

### DS 2.1 Technical Stack

```
Package:     @uxuissk/design-system@2.1.0
Framework:   Web Components via Lit 3.x
Build:       Vite 6
Storybook:   8.x (@storybook/web-components-vite)
Token:       CSS Custom Properties (backward compat bridge included)
Brands:      7 (sellsuki, patona, shipmunk, akita, oc2plus, sellsukiPay, sukispace)
```

### Token Bridge (backward compat)

```css
/* DS 2.1 theme.css — ทั้ง DS 2.0 names และ DS 1.0 aliases ใช้ได้พร้อมกัน */
:root {
  /* DS 2.0 Standard Names (new) */
  --primary:    #32a9ff;
  --background: #F9FAFB;
  --card:       #ffffff;
  --muted:      #F3F4F6;
  --text-p:     20px;
  --text-label: 18px;
  --text-h1:    48px;
  --font-label: "DB HeaventRounded", sans-serif;
  --radius-md:  6px;

  /* DS 1.0 Aliases (backward compat — product เดิมไม่แตก) */
  --ssk-colors-sky-500:  var(--primary);
  --ssk-colors-gray-50:  var(--background);
  --ssk-font-size-body:  var(--text-p);
  --ssk-space-md:        16px;
}
```

### Font Size Rules (MANDATORY ทุก component)

| Minimum | Token | Usage |
|---------|-------|-------|
| 20px | `var(--text-p)` | Data, table cell, sidebar nav, stat card |
| 18px | `var(--text-label)` | UI labels, badges, tooltips, buttons |
| ❌ 16px | ~~`var(--text-caption)`~~ | ห้ามใช้ใน DS 2.1 — deprecated as minimum |

### Background Token Rules

```css
/* ✅ ถูกต้อง */
var(--background)  → #F9FAFB  page/content body (ALL brands)
var(--card)        → #ffffff   card/panel/sidebar
var(--muted)       → #F3F4F6  table header, subtle divider

/* ❌ ห้าม */
background: "#FFF7F0"          /* hardcoded brand color */
background: "var(--bg-page)"   /* deprecated alias */
```

---

## 3. Preview Site Strategy

### Option C (เลือกแล้ว): DS 2.0 Preview เป็น Host ของ DS 2.1

```
https://sellsukidesignsystemv12-2bee.vercel.app
│
├── Entry Page (ใหม่) ── เลือก version ก่อนเข้า
│   ├── DS 2.0  →  React showcase (current)
│   └── DS 2.1  →  Web Components showcase (clone + ported)
```

**Files ที่สร้างแล้ว:**
- `src/app/pages/entry-page.tsx` — Entry split-screen selector
- `src/app/pages/ds21-roadmap.tsx` — DS 2.1 upgrade roadmap page
- `src/app/App.tsx` — modified รองรับ dsMode state + entry gate

**DS 2.1 mode ใน App:**
- Version badge เปลี่ยนเป็น `2.1` สีม่วง (`#7c3aed`)
- Sidebar มี "DS 2.1" group ด้านบน → "Upgrade Roadmap" page
- "เปลี่ยน version" button ใน sidebar footer
- Default page = ds21-roadmap (แทน getting-started)

---

## 4. Component Gap Analysis

### DS 1.0 มี → DS 2.1 ต้อง Port

| Component | DS 1.0 | Priority | Effort | Assigned |
|-----------|--------|----------|--------|----------|
| **ImageCropper** | `ssk-image-cropper` (Croppie.js) | 🔴 HIGH | M | Dev |
| **PhoneCountryInput** | `ssk-addon-phone-country` | 🔴 HIGH | S | Dev |
| **AdvancedDataTable** | `ssk-dynamic-table` → DS 2.0 version | 🔴 HIGH | L | Dev |
| **FilterBar** | — (DS 2.0 only) | 🔴 HIGH | M | Dev |
| **Charts** | — (DS 2.0 only) | 🟡 MEDIUM | L | Dev |
| **CodeBlock** | `ssk-code-block` (PrismJS → Shiki) | 🟡 MEDIUM | S | Dev |
| **CountryIcon** | `ssk-country-icon` (iso-3166-1) | 🟡 MEDIUM | XS | Dev |
| **WidgetGrid** | `ssk-widget-grid` (GridStack) | 🟡 MEDIUM | L | Dev |
| **AppShell equivalent** | — (DS 2.0 only) | 🟡 MEDIUM | L | Dev |

### DS 2.1 มีครบแล้ว (ไม่ต้อง port)

Web Component ทุกตัวที่มีใน DS 1.0: Button, Input, Modal, Table, Sidebar, Dropdown, DatePicker, Pagination, Timeline, Card, Badge, Tag, Avatar, Accordion, Drawer, Tooltip, Popover, Stepper, Tabs, Toast, ProgressBar, Skeleton, Rating, FileUpload, ColorPicker, OTPInput, TagInput, Toggle/Switch, Checkbox, Radio, Breadcrumb, Tree, TransferList, ImagePreview, Statistic, Menu, TopNavbar

---

## 5. Phased Roadmap

### Phase 0 — Visual Parity + Infra Upgrade (~3 สัปดาห์)

**Goal:** ทุก product ที่ใช้ DS 1.0 อยู่ → หน้าตา visual match DS 2.0 โดยไม่ต้อง migrate โค้ด

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 0.1 | Audit token values ทั้งหมดใน DS 1.0 (`--ssk-*`) | UX/UI | S | ⬜ pending |
| 0.2 | Map DS 1.0 tokens → DS 2.0 tokens | UX/UI | S | ⬜ pending |
| 0.3 | อัปเดต token values ให้ตรงกับ DS 2.0 visual identity | UX/UI | M | ⬜ pending |
| 0.4 | สร้าง Token Bridge CSS (backward compat aliases) | Dev | S | ⬜ pending |
| 0.5 | Fix font size overrides (min 18px/20px rule) | UX/UI | S | ⬜ pending |
| 0.6 | เพิ่ม brand configs ใหม่ (Shipmunk, Akita, SellsukiPay, Sukispace) | Both | M | ⬜ pending |
| 0.7 | Upgrade Storybook 7 → 8 (`@storybook/web-components-vite`) | Dev | S | ⬜ pending |
| 0.8 | Upgrade Vite 4 → 6 + update build pipeline | Dev | S | ⬜ pending |
| 0.9 | Migrate story format CSF2 → CSF3 (89 story files) | Dev | M | ⬜ pending |
| 0.10 | Smoke test ทุก component ใน Storybook 8 | Both | M | ⬜ pending |

**UX/UI สามารถทำ 0.1–0.5 ได้ทันที โดยไม่รอ Dev**

---

### Phase 1 — Port Missing Components → Lit (~4 สัปดาห์)

**Goal:** Component ที่ DS 1.0 ขาดหรือ DS 2.0 ดีกว่า → port เป็น Lit Web Component

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 1.1 | ImageCropper → Lit wrapper (react-easy-crop pattern แต่เป็น Lit) | Dev | M | ⬜ pending |
| 1.2 | PhoneCountryInput → ssk-addon-phone-country ปรับปรุง | Dev | S | ⬜ pending |
| 1.3 | AdvancedDataTable → Lit (server-side pagination, bulk actions, frozen cols) | Dev | L | ⬜ pending |
| 1.4 | FilterBar → Lit (multi-filter, search, date range) | Dev | M | ⬜ pending |
| 1.5 | PageHeader → Lit | Dev | S | ⬜ pending |
| 1.6 | เขียน Storybook stories ทุก component ใหม่ | Both | M | ⬜ pending |
| 1.7 | อัปเดต DS 2.1 section ใน Preview site | Dev | S | ⬜ pending |

---

### Phase 2 — Component Quality Upgrade (~3 สัปดาห์)

**Goal:** Component ที่มีอยู่แล้วใน DS 1.0 แต่ DS 2.0 version ดีกว่า

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 2.1 | Dropdown → multi-select, search, custom render (from DS 2.0) | Dev | M | ⬜ pending |
| 2.2 | DatePicker → range mode, keyboard nav | Dev | M | ⬜ pending |
| 2.3 | DynamicTable → sort, selection, bulk action | Dev | M | ⬜ pending |
| 2.4 | Sidebar → SidebarAccountSwitcher, collapse animation | Dev | S | ⬜ pending |
| 2.5 | Charts → Lit Web Component (Line/Bar/Donut, zero-dep SVG) | Dev | L | ⬜ pending |
| 2.6 | CodeBlock → Shiki (แทน PrismJS) | Dev | S | ⬜ pending |
| 2.7 | CountryIcon → ISO 3166 + SVG flags | Dev | XS | ⬜ pending |
| 2.8 | UX/UI visual review ทุก component ที่ upgrade | UX/UI | M | ⬜ pending |

---

### Phase 3 — AppShell Equivalent + WidgetGrid (~3 สัปดาห์)

**Goal:** Full product shell สำหรับ Web Components

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 3.1 | AppShell → CSS slot-based (Navbar + Sidebar + Content) | Dev | L | ⬜ pending |
| 3.2 | FeaturePageScaffold → Lit layout component | Dev | M | ⬜ pending |
| 3.3 | WidgetGrid → evaluate use case จริง → GridStack Lit wrapper (optional) | Dev | L | ⬜ pending |
| 3.4 | ScaffoldKPIRow, StatCard upgrades | Dev | S | ⬜ pending |
| 3.5 | Full page layout test ทุก 7 brands | UX/UI | M | ⬜ pending |

---

### Phase 4 — Publish DS 2.1 + Deprecate DS 1.0 (~1 สัปดาห์)

**Goal:** DS 2.1 เป็น official package, DS 1.0 เข้า archive

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 4.1 | Bump version → `@uxuissk/design-system@2.1.0` | Dev | S | ⬜ pending |
| 4.2 | Deprecated warning สำหรับ `ssk-*` element names | Dev | XS | ⬜ pending |
| 4.3 | Migration Guide: DS 1.0 → DS 2.1 (token mapping, API diff table) | Both | M | ⬜ pending |
| 4.4 | Deploy DS 2.1 Storybook → Vercel | Dev | S | ⬜ pending |
| 4.5 | Archive `@sellsuki-org/sellsuki-components` | Both | XS | ⬜ pending |
| 4.6 | Update CLAUDE.md + AGENTS.md → DS 2.1 rules | UX/UI | S | ⬜ pending |

---

## 6. Risk Register

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| R1 | Product ที่ไม่ใช่ React → ยังใช้งาน DS 1.0 ระหว่าง transition | 🟡 MEDIUM | DS 1.0 maintenance mode ยังรับ bug fix → transition เป็น DS 2.1 |
| R2 | Product ที่ใช้ I18n system ของ DS 1.0 | 🟡 MEDIUM | ต้องหา solution ใหม่ (i18next/react-i18next) — งานเพิ่ม 1-2 สัปดาห์ |
| R3 | Lit knowledge ในทีมต่ำ | 🟡 MEDIUM | ต้องการ Dev ที่รู้ Lit ≥ 1 คน (part-time ช่วงแรก) |
| R4 | React 18 (ก่อน 19) Web Component event friction | 🟡 MEDIUM | Wrapper utility / event retransmit layer |
| R5 | ImageCropper dependency (Croppie.js) ไม่ใช่ Lit-native | 🟢 LOW | ใช้ native canvas crop API แทน หรือ wrap เป็น Lit |
| R6 | WidgetGrid (GridStack) heavy bundle | 🟢 LOW | Evaluate use case จริงก่อน implement — อาจไม่จำเป็น |
| R7 | Font size DS 1.0 overrides ติดมาใน port | 🟢 LOW | Apply DS 2.1 token rules ตั้งแต่ต้น (Phase 0) |

---

## 7. Definition of Done (DoD)

### ระดับ Component
- [ ] Visual match DS 2.0 reference (screenshot compare)
- [ ] ใช้ token จาก DS 2.1 theme — ไม่ hardcode hex/px
- [ ] Font size ≥ 18px ทุก element (`var(--text-label)` minimum)
- [ ] Data/content ≥ 20px (`var(--text-p)` minimum)
- [ ] Storybook story ครบ (Default + Variants + States)
- [ ] Dark mode ทำงานได้
- [ ] Keyboard accessible (focus, ARIA)
- [ ] TypeScript types export ครบ

### ระดับ Phase
- [ ] ทุก task ใน phase = ✅ completed
- [ ] UX/UI Lead review ผ่าน
- [ ] Tech Lead review ผ่าน
- [ ] Smoke test Storybook — ไม่มี component พัง
- [ ] Visual regression test ผ่าน (screenshot diff)

### ระดับ DS 2.1 Release
- [ ] ทุก Phase 0-4 = completed
- [ ] Migration Guide เสร็จ
- [ ] npm package publish สำเร็จ
- [ ] Preview site + Storybook deploy ครบ
- [ ] CLAUDE.md + AGENTS.md updated

---

## 8. Quality Grade Criteria

| Grade | Criteria |
|-------|---------|
| **A** | ทุก component มี story + visual match DS 2.0 + dark mode + a11y + token-only |
| **B** | story ครบ, visual match ≥ 90%, dark mode ทำงาน, token-only |
| **C** | story มี แต่บางตัวขาด variant, visual drift เล็กน้อย |
| **D** | story ขาด, hardcoded values, font size ต่ำกว่า minimum |
| **F** | ไม่ผ่าน smoke test, component พัง |

**Target:** Grade A สำหรับทุก component ที่ port ใน Phase 1-2, Grade B minimum สำหรับ Phase 0 upgrade

---

## 9. Files Modified / Created (Session 2025-04-10)

| File | Action | Description |
|------|--------|-------------|
| `src/app/pages/entry-page.tsx` | ✅ Created | Entry split-screen: DS 2.0 \| DS 2.1 selector |
| `src/app/pages/ds21-roadmap.tsx` | ✅ Created | DS 2.1 upgrade roadmap page with phase cards |
| `src/app/App.tsx` | ✅ Modified | dsMode state, entry gate, version badge, sidebar 2.1 group |
| `CLAUDE.md` | ✅ Modified | Background token standard, font size +2px rules, vibe override |
| `AGENTS.md` | ✅ Modified | Same as CLAUDE.md + security rules |
| `src/app/pages/appshell-showcase.tsx` | ✅ Modified | 6 brand tabs, logo size fix, lighter button bg |
| `src/app/pages/_showcase-factory.tsx` | ✅ Modified | Shared style constants → 20px minimum |
| `DESIGN-SYSTEM-UPGRADE.md` | ✅ Created | This file — master spec |

---

## 10. AI Context for Next Session

> **ถ้า AI อ่านไฟล์นี้ใน session ถัดไป:** สถานะงานอยู่ที่ Planning — Preview site entry page สร้างแล้ว, DS 2.1 roadmap page สร้างแล้ว, รอ user confirm framework ของ product แต่ละตัวก่อน kickoff Phase 0

**Next action ที่รอ:**
1. User ยืนยัน framework ของ product (React? Vue? Vanilla?) ก่อนเริ่ม Phase 0
2. Assign Dev ที่รู้ Lit มาดูแล Phase 0.4 (Token Bridge) + Phase 1+
3. UX/UI เริ่ม Phase 0.1-0.5 ได้ทันที (token audit + value update) ไม่รอ Dev

**Files to read ก่อนทำงานต่อ:**
- `CLAUDE.md` — DS 2.0 rules (จะ update เป็น DS 2.1 rules ใน Phase 4.6)
- `src/app/pages/ds21-roadmap.tsx` — task list ล่าสุด
- `C:\Users\Aoftimuz\Documents\GitLab\sellsuki-components-main\src\contexts\theme\` — token values DS 1.0 ที่ต้องอัปเดต

---

## 11. Tech Lead Audit Checklist

> สำหรับ Tech Lead review ก่อน kickoff และหลังแต่ละ Phase

### Architecture Review
- [ ] Web Components (Lit) เหมาะกับ use case ทุก product ที่รองรับ?
- [ ] Token Bridge strategy ไม่ทำให้ CSS specificity ซ้อน?
- [ ] React 18 Web Component event handling — มี plan รองรับ?
- [ ] Bundle size ของ DS 2.1 vs DS 1.0 acceptable?
- [ ] Build pipeline (Vite 6 + Storybook 8) stable พอสำหรับ production?

### Code Quality
- [ ] Lit component pattern consistent — ไม่มี anti-pattern?
- [ ] TypeScript types export ครบ, ไม่มี `any`?
- [ ] No circular imports ใน barrel export?
- [ ] CSS isolation ถูกต้อง (shadow DOM vs global)?
- [ ] Event naming convention consistent กับ DS 1.0?

### Risk Mitigation
- [ ] I18n gap documented + plan ให้ product teams?
- [ ] Deprecated warning strategy approved?
- [ ] Migration Guide draft reviewed?
- [ ] Rollback plan มีถ้า DS 2.1 มีปัญหา?

### Release Readiness
- [ ] npm publish flow tested (prepublishOnly script)?
- [ ] Vercel build ทั้ง Preview + Storybook ผ่าน?
- [ ] package.json exports correct?
- [ ] Version bump strategy (semver) agreed?

**Sign-off:** Tech Lead _____________ Date _________

---

## 12. UX/UI Lead Audit Checklist

> สำหรับ UX/UI Lead review ก่อน kickoff และหลัง visual update ทุก Phase

### Visual Identity
- [ ] ทุก component ใช้ DB HeaventRounded (`var(--font-label)`) — ไม่มี Inter?
- [ ] Primary color = Sky-500 `#32a9ff` — consistent ทุก component?
- [ ] Font size minimum 18px UI / 20px data — ไม่มีตัวที่ต่ำกว่า?
- [ ] Background token = `var(--background)` `#F9FAFB` — ไม่มี hardcoded?
- [ ] Border radius = `--radius-md` 6px inputs / `--radius-lg` 6px cards?

### Token Compliance
- [ ] ไม่มี hardcoded hex ใน component CSS?
- [ ] ไม่มี hardcoded px font size (ใช้ `var(--text-*)` เท่านั้น)?
- [ ] Token Bridge backward compat ไม่ทำให้ visual เปลี่ยน?
- [ ] Dark mode ทุก component ใช้ CSS token ถูกต้อง?

### Brand Consistency
- [ ] ทุก 7 brand ผ่าน visual review (Sellsuki, Patona, Shipmunk, Akita, OC2+, SellsukiPay, Sukispace)?
- [ ] Brand color ใช้ผ่าน `[data-product]` scope เท่านั้น — ไม่ leak?
- [ ] Sidebar ไม่มี brand/logo context (per confirmed rule)?

### UX Quality
- [ ] Loading state ทุก component?
- [ ] Empty state ทุก data component?
- [ ] Error state ทุก form component?
- [ ] Responsive breakpoints (mobile 16px padding / desktop 24px)?
- [ ] Max 1 primary button per view — ไม่มี view ที่ผิด rule?

### Vibe Code Output Quality
- [ ] Test vibe coding ด้วย DS 2.1 components — ผล accurate ≥ 90%?
- [ ] Entry page visual ตรงกับ brand direction?
- [ ] DS 2.1 Roadmap page readable + informative?

**Sign-off:** UX/UI Lead _____________ Date _________

---

*Document maintained by UX/UI Team · Updated each session · AI-readable*
