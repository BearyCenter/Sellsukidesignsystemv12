# Relume — Sellsuki Design System Setup

> Relume เป็น wireframe/sitemap tool ที่ generate layout structure
> ใช้สำหรับ UX planning ก่อนเข้า code — ไม่ได้ generate React code โดยตรง

---

## วิธีใช้ Relume กับ Sellsuki DS

### Step 1: ตั้ง Style Guide ใน Relume

เมื่อสร้าง Project ใหม่ ไปที่ **Style Guide** แล้วกำหนด:

```
Brand Colors:
- Primary: #32a9ff (Sky-500)
- Primary Dark: #1b8bf5 (Sky-600)
- Text: #1f2937 (Gray-800)
- Text Light: #6b7280 (Gray-500)
- Background: #ffffff
- Surface: #f9fafb (Gray-50)
- Border: #e5e7eb (Gray-200)
- Success: #059669
- Warning: #d97706
- Error: #e11d48

Typography:
- Heading: DB HeaventRounded (or fallback: Noto Sans Thai)
- Body: DB HeaventRounded (or fallback: Noto Sans Thai)
- Button: Inter

Spacing:
- Section: 32px
- Component: 16px
- Element: 8px

Border Radius: 8px
Shadow: None (flat design)
```

### Step 2: ใช้ Prompt ใน Relume AI

```
Design a Sellsuki e-commerce management page. Sellsuki is a professional, clean, light and airy platform for Thai merchants.

Style guidelines:
- Flat design, no heavy shadows
- Sky blue (#32a9ff) as primary accent
- Clean white background with subtle gray borders
- 280px sidebar navigation on the left
- 72px top header
- Cards with 8px border radius and 1px gray border
- Spacing: 24px page padding, 16px between cards

The page should include: [describe your page]
```

### Step 3: Export to Code Tool

Relume output → Export เป็น Figma/wireframe → นำไป implement ใน:
- **Claude Code** (มี CLAUDE.md)
- **Cursor** (มี .cursorrules)
- **v0** (ใส่ system prompt)
- **Bolt.new** (ใส่ prefix prompt)

---

## Relume Workflow สำหรับ Sellsuki

```
Relume (wireframe/structure)
    ↓ export
Figma (visual design)
    ↓ dev mode
Code Tool (Claude/Cursor/v0)
    ↓ with DS rules
Final Code (@uxuissk/design-system)
```

---

## ข้อจำกัด

- ❌ ไม่ generate React/TSX code
- ❌ ไม่รองรับ MCP
- ❌ ไม่สามารถ import npm package
- ✅ เหมาะสำหรับ plan layout structure ก่อน code
- ✅ Export เป็น Figma ได้
- 💡 **ใช้ Relume สำหรับ planning → ใช้ tool อื่นสำหรับ coding**
