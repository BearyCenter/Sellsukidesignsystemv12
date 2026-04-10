# Sellsuki Design System — Upgrade Spec v3.0
> **AI-readable task spec** — อ่านไฟล์นี้ก่อนทำงานทุกครั้ง สถานะงาน, context, decisions ครบในที่เดียว

---

## Meta

| Field | Value |
|-------|-------|
| **Document version** | 2.0 |
| **Created** | 2025-04-10 |
| **Updated** | 2026-04-10 |
| **Owner** | UX/UI Lead + Tech Lead |
| **Status** | 🟡 Pre-kickoff — ปิด blockers แล้วเริ่ม Phase 0 ได้เลย |
| **Target** | DS 3.0 เป็น single source of truth ทุก product (Web Components) |
| **DS 1.0 Source (origin)** | `https://gitlab.sellsuki.com/sellsuki/share/sellsuki-components.git` |
| **DS 3.0 Repo (target)** | `https://github.com/BearyCenter/SellsukiDesignsystem3.0` |
| **DS 2.0 Repo (React ref)** | `https://github.com/BearyCenter/Sellsukidesignsystemv12` |
| **DS 2.0 Preview** | https://sellsukidesignsystemv12-2bee.vercel.app |
| **DS 2.0 Storybook** | https://sellsukidesignsystemv12.vercel.app |
| **DS 2.0 npm** | `@uxuissk/design-system@0.8.x` |
| **DS 3.0 npm (decided)** | `@uxuissk/design-system-core` |

---

## 1. Strategic Context

### ปัญหาที่ต้องแก้

| ปัญหา | Detail |
|-------|--------|
| DS 1.0 (Web Components) กับ DS 2.0 (React) ขนานกัน | 2 design languages = visual drift ข้าม product |
| DS 1.0 มี font size overrides ที่ผิด | ขนาดต่ำกว่า 18px minimum ในหลายจุด |
| Token naming ต่างกัน | `--ssk-colors-sky-500` vs `--primary` |
| Product teams ไม่สามารถ migrate ไป DS 2.0 ได้ | DS 2.0 = React-only, non-React products block |
| UX/UI ต้องรอ Dev เพื่อ push visual change | ไม่มี token-first workflow |

### ทำไมเลือก DS 3.0 (DS 1.0-base)

```
DS 1.0 (Web Components/Lit)     ← Architecture คง
     + DS 2.0 Design Language   ← Token values, visual rules
     + DS 2.0 Components        ← Port ตัวที่ขาดเป็น Lit
     ─────────────────────────────────────────────────
     = DS 3.0  (Web Components + DS 2.0 quality)
     = @uxuissk/design-system-core
```

| | Strategy A: DS 2.0 (React only) | Strategy B: DS 3.0 (1.0-base) ✅ |
|---|---|---|
| Product ที่ใช้อยู่ | ต้องเขียนใหม่ทั้งหมด | อัปเดต package เท่านั้น |
| Framework dependency | React เท่านั้น | Vue, Angular, React, Vanilla — ทุกอย่าง |
| UX/UI คุมโดยไม่รอ Dev | ❌ | ✅ CSS token = UX/UI territory |
| Migration risk | 🔴 สูง | 🟢 ต่ำ |
| Time to visual consistency | 3-6+ เดือน | 2-4 สัปดาห์ |

---

## 2. Architecture Decision Records (ADRs)

### ADR-001 — Package Naming Strategy ✅ Decided

```
DS 2.0 (React):          @uxuissk/design-system       (คง — ไม่แตะ)
DS 3.0 (Web Components): @uxuissk/design-system-core  (ใหม่)
```

**ทำไมไม่ใช่ `@sskds/design-system`:**
- ต้องการ npm org `sskds` ซึ่งยังไม่ได้สร้าง
- ถ้า publish ไปก่อนแล้ว rename ทีหลัง = consumers ทุกคนต้อง update `package.json` + imports ทั้ง codebase
- `@uxuissk` org มีอยู่แล้ว → ใช้ได้ทันที
- `@sskds` account — จอง npm org ได้เลยเพื่อ reserve ชื่อ แต่ publish จริงค่อยย้ายทีหลัง (เพิ่มงาน ~2-4 สัปดาห์)

**Rename ทีหลังได้ไหม:** ได้ แต่ต้อง:
1. publish `@sskds/design-system-core` เป็น version ใหม่
2. deprecated `@uxuissk/design-system-core` พร้อม message ชี้ไปที่ชื่อใหม่
3. ทุก product team update `package.json` + `import` statements
4. timeline ~2-4 สัปดาห์ ขึ้นกับจำนวน consumers

---

### ADR-002 — Repository Structure ✅ Decided

```
DS 3.0 lives at: https://github.com/BearyCenter/SellsukiDesignsystem3.0
Origin source:   https://gitlab.sellsuki.com/sellsuki/share/sellsuki-components.git
```

**วิธีตั้ง repo (ไม่ใช่ fork — เพราะ cross-platform GitLab→GitHub):**

```bash
# Dev team ทำครั้งเดียว
git clone https://gitlab.sellsuki.com/sellsuki/share/sellsuki-components.git sellsuki-ds3
cd sellsuki-ds3

# เก็บ GitLab เป็น read-only reference
git remote rename origin gitlab-origin

# เพิ่ม GitHub เป็น source of truth ใหม่
git remote add origin https://github.com/BearyCenter/SellsukiDesignsystem3.0.git

# Mirror ทุก branch + tag ไป GitHub
git push origin --mirror

# ตั้งแต่นี้ทำงานบน GitHub เท่านั้น
```

**ทำไมไม่ใช้ GitHub Fork:**
- GitHub fork ทำได้เฉพาะ GitHub→GitHub
- GitLab internal (`gitlab.sellsuki.com`) → GitHub ต้องใช้ mirror/clone approach
- GitLab เก็บไว้เป็น archive อ่านได้ แต่ไม่ push ต่อ

---

### ADR-003 — Custom Element Namespace ✅ Decided

```
DS 1.0: ssk-button, ssk-input, ...   (keep as alias — backward compat)
DS 3.0: ds-button, ds-input, ...     (new canonical name)
```

**Guard pattern (ทุก element ต้องมี):**
```typescript
// src/elements/ds-button.ts
@customElement('ds-button')
export class DsButton extends LitElement { ... }

// Backward compat alias — ไม่ crash ถ้า DS 1.0 โหลดอยู่แล้ว
if (!customElements.get('ssk-button')) {
  customElements.define('ssk-button', DsButton);
}
```

---

### ADR-004 — Font Loading Strategy

```
DS 1.0 ปัจจุบัน: base64 embedded ใน fonts.css (1.4MB) — blocking render
DS 3.0 target:   self-hosted woff2 + font-display: swap
```

```css
/* DS 3.0 fonts.css */
@font-face {
  font-family: "DB HeaventRounded";
  src: url('/fonts/db-heavent-rounded.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
/* ... weight variants */
```

**ผลที่ได้:** First Contentful Paint เร็วขึ้น ~1-3s บน slow network

---

## 3. DS 3.0 Technical Stack

```
Package:     @uxuissk/design-system-core@3.0.0
Repo:        https://github.com/BearyCenter/SellsukiDesignsystem3.0
Framework:   Web Components via Lit 3.x
Build:       Vite 6
Storybook:   8.x (@storybook/web-components-vite)
Token:       CSS Custom Properties + Token Bridge (backward compat)
Brands:      7 (sellsuki, patona, shipmunk, akita, oc2plus, sellsukiPay, sukispace)
CI/CD:       GitHub Actions → Vercel (Storybook) + npm publish
```

### Token Bridge (backward compat)

```css
/* DS 3.0 theme.css */
:root {
  /* DS 3.0 Standard Names (canonical) */
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

### Font Size Rules (MANDATORY)

| Minimum | Token | Usage |
|---------|-------|-------|
| 20px | `var(--text-p)` | Data, table cell, sidebar nav, stat card |
| 18px | `var(--text-label)` | UI labels, badges, tooltips, buttons |
| ❌ 16px | ~~`var(--text-caption)`~~ | ห้ามใช้เป็น minimum — deprecated |

### Shadow DOM CSS Rule

```typescript
// ✅ ถูกต้อง — CSS vars inherited ผ่าน shadow boundary
static styles = css`
  :host { color: var(--primary); font-family: var(--font-label); }
`;

// ❌ ห้าม — class selectors ไม่ข้าม shadow DOM
static styles = css`
  .btn-primary { background: var(--primary); }  /* ไม่ทำงานใน shadow DOM */
`;
```

---

## 4. Preview Site Strategy (Option C)

```
https://sellsukidesignsystemv12-2bee.vercel.app
│
├── Entry Page — เลือก version ก่อนเข้า
│   ├── DS 2.0  (sky blue)  → React showcase + MCP tools
│   └── DS 3.0  (orange)    → Web Components showcase + Roadmap
```

**Files ที่สร้างแล้ว (DS 2.0 repo):**
- `src/app/pages/entry-page.tsx` — Entry split-screen selector
- `src/app/pages/ds21-roadmap.tsx` — DS 3.0 upgrade roadmap page
- `src/app/App.tsx` — dsMode state, entry gate, version badge

---

## 5. Component Gap Analysis

### DS 1.0 มี → DS 3.0 ต้อง Port

| Component | DS 1.0 | Priority | Effort | Assigned |
|-----------|--------|----------|--------|----------|
| **ImageCropper** | `ssk-image-cropper` | 🔴 HIGH | M | Dev |
| **PhoneCountryInput** | `ssk-addon-phone-country` | 🔴 HIGH | S | Dev |
| **AdvancedDataTable** | `ssk-dynamic-table` → DS 2.0 level | 🔴 HIGH | L | Dev |
| **FilterBar** | DS 2.0 only | 🔴 HIGH | M | Dev |
| **Charts** | DS 2.0 only | 🟡 MEDIUM | L | Dev |
| **CodeBlock** | `ssk-code-block` → Shiki | 🟡 MEDIUM | S | Dev |
| **CountryIcon** | `ssk-country-icon` | 🟡 MEDIUM | XS | Dev |
| **WidgetGrid** | `ssk-widget-grid` (GridStack) | 🟡 MEDIUM | L | Dev |
| **AppShell** | DS 2.0 only | 🟡 MEDIUM | L | Dev |

---

## 6. Phased Roadmap

### 🔴 Pre-kickoff Blockers (ต้องทำก่อน Phase 0)

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| B1 | สร้าง repo DS 3.0 ที่ GitHub + mirror จาก GitLab | Dev | S | ⬜ pending |
| B2 | เพิ่ม customElements guard ทุก element (ds-* + ssk-* alias) | Dev | S | ⬜ pending |
| B3 | Audit Shadow DOM CSS — เปลี่ยน class-based → `:host`-based | Dev | M | ⬜ pending |
| B4 | ตั้ง GitHub Actions CI (lint → type-check → build → storybook) | Dev | S | ⬜ pending |
| B5 | สร้าง branching strategy + PR template + CONTRIBUTING.md | Tech Lead | XS | ⬜ pending |

---

### Phase 0 — Visual Parity + Infra Upgrade (~3 สัปดาห์)

**Goal:** ทุก product ที่ใช้ DS 1.0 → visual match DS 2.0 โดยไม่ต้อง migrate โค้ด

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 0.1 | Audit token values ทั้งหมดใน DS 1.0 (`--ssk-*`) | UX/UI | S | ⬜ pending |
| 0.2 | Map DS 1.0 tokens → DS 3.0 standard names | UX/UI | S | ⬜ pending |
| 0.3 | อัปเดต token values → DS 2.0 visual identity | UX/UI | M | ⬜ pending |
| 0.4 | สร้าง Token Bridge CSS (backward compat aliases) | Dev | S | ⬜ pending |
| 0.5 | Fix font size overrides (min 18px/20px rule) | UX/UI | S | ⬜ pending |
| 0.6 | แก้ font bundle 1.4MB → woff2 self-hosted + font-display:swap | Dev | S | ⬜ pending |
| 0.7 | เพิ่ม brand configs ใหม่ (Shipmunk, Akita, SellsukiPay, Sukispace) | Both | M | ⬜ pending |
| 0.8 | Upgrade Storybook 7 → 8 (`@storybook/web-components-vite`) | Dev | S | ⬜ pending |
| 0.9 | Upgrade Vite 4 → 6 + update build config | Dev | S | ⬜ pending |
| 0.10 | Migrate story format CSF2 → CSF3 (89 story files + codemod) | Dev | M | ⬜ pending |
| 0.11 | Smoke test ทุก component ใน Storybook 8 | Both | M | ⬜ pending |
| 0.12 | Deploy DS 3.0 Storybook → Vercel (new project) | Dev | S | ⬜ pending |

**UX/UI เริ่ม 0.1–0.5 ได้ทันที โดยไม่รอ Dev**

---

### Phase 1 — Port Missing Components → Lit (~4 สัปดาห์)

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 1.1 | ImageCropper → Lit wrapper | Dev | M | ⬜ pending |
| 1.2 | PhoneCountryInput → ds-addon-phone-country | Dev | S | ⬜ pending |
| 1.3 | AdvancedDataTable → Lit (server-side, bulk actions, frozen cols) | Dev | L | ⬜ pending |
| 1.4 | FilterBar → Lit | Dev | M | ⬜ pending |
| 1.5 | PageHeader → Lit | Dev | S | ⬜ pending |
| 1.6 | Stories ทุก component ใหม่ (Default + Variants + States) | Both | M | ⬜ pending |
| 1.7 | อัปเดต DS 3.0 section ใน Preview site | Dev | S | ⬜ pending |

---

### Phase 2 — Component Quality Upgrade (~3 สัปดาห์)

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 2.1 | Dropdown → multi-select, search, custom render | Dev | M | ⬜ pending |
| 2.2 | DatePicker → range mode, keyboard nav | Dev | M | ⬜ pending |
| 2.3 | DynamicTable → sort, selection, bulk action | Dev | M | ⬜ pending |
| 2.4 | Sidebar → account switcher, collapse animation | Dev | S | ⬜ pending |
| 2.5 | Charts → Lit SVG (Line/Bar/Donut, zero-dep) | Dev | L | ⬜ pending |
| 2.6 | CodeBlock → Shiki | Dev | S | ⬜ pending |
| 2.7 | CountryIcon → ISO 3166 + SVG flags | Dev | XS | ⬜ pending |
| 2.8 | UX/UI visual review ทุก component ที่ upgrade | UX/UI | M | ⬜ pending |

---

### Phase 3 — AppShell + WidgetGrid (~3 สัปดาห์)

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 3.1 | AppShell → CSS slot-based (Navbar + Sidebar + Content) | Dev | L | ⬜ pending |
| 3.2 | FeaturePageScaffold → Lit layout component | Dev | M | ⬜ pending |
| 3.3 | WidgetGrid → evaluate + GridStack Lit wrapper (optional) | Dev | L | ⬜ pending |
| 3.4 | ScaffoldKPIRow, StatCard upgrades | Dev | S | ⬜ pending |
| 3.5 | Full page layout test ทุก 7 brands | UX/UI | M | ⬜ pending |

---

### Phase 4 — Publish DS 3.0 + Deprecate DS 1.0 (~1 สัปดาห์)

| # | Task | Owner | Effort | Status |
|---|------|-------|--------|--------|
| 4.1 | npm publish `@uxuissk/design-system-core@3.0.0` | Dev | S | ⬜ pending |
| 4.2 | Deprecated warning สำหรับ `ssk-*` aliases | Dev | XS | ⬜ pending |
| 4.3 | Migration Guide: DS 1.0 → DS 3.0 (token map + API diff) | Both | M | ⬜ pending |
| 4.4 | Archive `@sellsuki-org/sellsuki-components` on npm | Dev | XS | ⬜ pending |
| 4.5 | ประกาศ internal announcement ให้ทุก product team | Both | XS | ⬜ pending |
| 4.6 | Update CLAUDE.md + AGENTS.md → DS 3.0 rules | UX/UI | S | ⬜ pending |
| 4.7 | Update entry-page.tsx ใน DS 2.0 → link DS 3.0 Storybook จริง | Dev | XS | ⬜ pending |

---

## 7. Risk Register (Updated)

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| R1 | Product ที่ไม่ใช่ React → อยู่บน DS 1.0 ระหว่าง transition | 🟡 MEDIUM | DS 1.0 maintenance mode ยังรับ bug fix |
| R2 | Product ที่ใช้ I18n ของ DS 1.0 | 🟡 MEDIUM | หา solution ใหม่ (i18next) — งานเพิ่ม ~2 สัปดาห์ |
| R3 | Lit knowledge ในทีมต่ำ | 🟡 MEDIUM | Dev ≥ 1 คนที่รู้ Lit + internal workshop |
| R4 | React 18 Web Component event friction | 🟡 MEDIUM | Event retransmit utility wrapper |
| R5 | Shadow DOM CSS isolation — class-based styles ไม่ทำงาน | 🟡 MEDIUM | B3 audit ก่อน Phase 0 |
| R6 | CSF2→CSF3 migration 89 files อาจใช้เวลามากกว่าคาด | 🟡 MEDIUM | ใช้ Storybook codemod + manual review |
| R7 | Font bundle 1.4MB blocking render | 🟡 MEDIUM | Phase 0 task 0.6 |
| R8 | Package rename ในอนาคต (@sskds) เพิ่ม migration effort | 🟢 LOW | Register npm org ไว้ก่อน แม้ไม่ publish ทันที |
| R9 | WidgetGrid GridStack bundle size (~80KB) | 🟢 LOW | Lazy load + evaluate use case ก่อน |

---

## 8. Definition of Done

### Component Level
- [ ] Visual match DS 2.0 reference (screenshot compare)
- [ ] ใช้ token จาก DS 3.0 theme — ไม่ hardcode hex/px
- [ ] Font size ≥ 18px (`var(--text-label)`) ทุก element
- [ ] Data/content ≥ 20px (`var(--text-p)`)
- [ ] CSS ใช้ `:host` + CSS vars เท่านั้น — ไม่มี class-based global styles
- [ ] customElements guard ครบ (ds-* + ssk-* alias)
- [ ] Storybook story ครบ (Default + Variants + States)
- [ ] Dark mode ทำงานได้
- [ ] Keyboard accessible (focus order, ARIA)
- [ ] TypeScript types export ครบ ไม่มี `any`

### Phase Level
- [ ] ทุก task ใน phase = ✅
- [ ] UX/UI Lead review ผ่าน
- [ ] Tech Lead review ผ่าน
- [ ] CI pass: lint + type-check + build + storybook
- [ ] Visual regression test ผ่าน

### DS 3.0 Release
- [ ] Phase 0–4 completed
- [ ] Migration Guide เสร็จ
- [ ] npm publish `@uxuissk/design-system-core@3.0.0` สำเร็จ
- [ ] DS 3.0 Storybook live บน Vercel
- [ ] CLAUDE.md + AGENTS.md updated

---

## 9. Quality Grade Criteria

| Grade | Criteria |
|-------|---------|
| **A** | story ครบ + visual match DS 2.0 + dark mode + a11y + token-only + shadow DOM correct |
| **B** | story ครบ, visual ≥ 90%, dark mode ทำงาน, token-only |
| **C** | story มี แต่ขาด variant, visual drift เล็กน้อย |
| **D** | story ขาด, hardcoded values, font size ต่ำกว่า minimum |
| **F** | ไม่ผ่าน CI, component พัง, ไม่มี guard |

**Target:** Grade A ทุก component Phase 1-2 / Grade B minimum Phase 0

---

## 10. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml (DS 3.0 repo)
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
      - run: npm run build-storybook
  publish:
    if: startsWith(github.ref, 'refs/tags/v')
    needs: ci
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm publish --access public
        env: { NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }} }
```

---

## 11. Branching Strategy

```
main          ← production-ready เสมอ, auto-deploy Storybook
feat/phase-0  ← Phase 0 work (token + infra)
feat/phase-1  ← Phase 1 port (ImageCropper, AdvancedTable ฯลฯ)
feat/phase-N  ← แต่ละ Phase แยก branch

PR rules:
- ≤ 400 lines per PR
- ต้อง CI pass ก่อน merge
- ต้องการ 1 reviewer (Tech Lead หรือ UX/UI Lead)
- squash merge เสมอ
```

---

## 12. Files Modified / Created

| File | Repo | Action | Description |
|------|------|--------|-------------|
| `src/app/pages/entry-page.tsx` | DS 2.0 | ✅ Created | Entry: DS 2.0 \| DS 3.0 selector |
| `src/app/pages/ds21-roadmap.tsx` | DS 2.0 | ✅ Created | DS 3.0 upgrade roadmap page |
| `src/app/App.tsx` | DS 2.0 | ✅ Modified | dsMode state, entry gate, version badge |
| `CLAUDE.md` | DS 2.0 | ✅ Modified | Background token standard, font +2px rules |
| `AGENTS.md` | DS 2.0 | ✅ Modified | Same + security rules |
| `DESIGN-SYSTEM-UPGRADE.md` | DS 2.0 | ✅ This file | Master spec |

---

## 13. AI Context for Next Session

> **ถ้า AI อ่านไฟล์นี้ใน session ถัดไป:**
> - DS 2.1 เปลี่ยนชื่อเป็น **DS 3.0** แล้ว
> - Package name ตัดสินใจแล้ว: **`@uxuissk/design-system-core`**
> - DS 3.0 repo: **`https://github.com/BearyCenter/SellsukiDesignsystem3.0`**
> - DS 1.0 origin: **`https://gitlab.sellsuki.com/sellsuki/share/sellsuki-components.git`**
> - Pre-kickoff blockers B1-B5 ยังไม่เสร็จ — ต้องทำก่อน Phase 0

**Files to read ก่อนทำงาน DS 3.0:**
- `DESIGN-SYSTEM-UPGRADE.md` (this file)
- DS 3.0 repo: `https://github.com/BearyCenter/SellsukiDesignsystem3.0`
- DS 1.0 source (reference): `https://gitlab.sellsuki.com/sellsuki/share/sellsuki-components.git`

---

## 14. Tech Lead Audit Checklist

### Pre-kickoff (บล็อก Phase 0)
- [ ] GitHub repo DS 3.0 สร้างแล้ว + mirror จาก GitLab สำเร็จ?
- [ ] customElements guard ทุก element (ds-* + ssk-* alias)?
- [ ] Shadow DOM CSS audit เสร็จ — `:host`-based เท่านั้น?
- [ ] GitHub Actions CI ทำงานแล้ว?
- [ ] PR template + branching strategy ตกลงกัน?

### Architecture
- [ ] Token Bridge ไม่ทำให้ CSS specificity ซ้อน?
- [ ] React 18 event handling plan มี?
- [ ] Bundle size DS 3.0 acceptable (เทียบ DS 1.0)?
- [ ] Font loading เปลี่ยนเป็น woff2 แล้ว?

### Release
- [ ] npm publish flow tested (prepublishOnly)?
- [ ] Vercel DS 3.0 Storybook deploy ผ่าน?
- [ ] Semver strategy ชัดเจน (3.0.0 → patch/minor)?

**Sign-off:** Tech Lead _____________ Date _________

---

## 15. UX/UI Lead Audit Checklist

### Visual Identity
- [ ] DB HeaventRounded ทุก component — ไม่มี Inter?
- [ ] Primary = `#32a9ff` consistent?
- [ ] Font min 18px UI / 20px data — ไม่มีต่ำกว่า?
- [ ] `var(--background)` `#F9FAFB` ทุก brand?
- [ ] border-radius `--radius-md` 6px?

### Token Compliance
- [ ] ไม่มี hardcoded hex ใน component?
- [ ] Token Bridge backward compat ไม่เปลี่ยน visual?
- [ ] Dark mode token ถูกต้อง?

### Brand Consistency
- [ ] 7 brands ผ่าน visual review?
- [ ] `[data-product]` scope เท่านั้น — ไม่ leak?
- [ ] Sidebar ไม่มี brand/logo context?

### UX Quality
- [ ] Loading / Empty / Error state ทุก component?
- [ ] Responsive (16px mobile / 24px desktop)?
- [ ] Max 1 primary button per view?

**Sign-off:** UX/UI Lead _____________ Date _________

---

*Document maintained by UX/UI Team · Updated each session · AI-readable*
