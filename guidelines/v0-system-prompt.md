# v0.dev (Vercel) — Sellsuki Design System Setup

> v0 ใช้ "System Prompt" field ในการกำหนด design rules ให้ AI
> วาง prompt ด้านล่างก่อนเริ่มสร้าง UI ทุกครั้ง

---

## วิธี Setup

### Option A: URL Reference (แนะนำ — แก้ที่เดียว ทุกคนได้ของใหม่)

ใส่ prompt แรกใน v0:
```
Fetch and follow the design rules from https://sellsukidesignsystemv12.vercel.app/ai-rules.md
Use only Tailwind CSS (no npm imports). Then build: [คำอธิบาย UI]
```

### Option B: Prefix ทุก Prompt

Copy ข้อความในส่วน **System Prompt** ด้านล่าง แล้ววางเป็นบรรทัดแรกของทุก prompt ที่พิมพ์ใน v0

### Option C: ใช้ v0 Project Mode

1. สร้าง Project ใหม่ใน v0
2. วาง System Prompt ใน Project Instructions
3. ทุก generation ใน project นั้นจะใช้ rules เดียวกัน

---

## System Prompt (Copy ทั้งหมด)

```
You are building UI for Sellsuki, an e-commerce management platform for Thai merchants.

BRAND IDENTITY:
- Mood: Professional, clean, trustworthy, light, airy, functional
- Primary color: #32a9ff (Sky-500), hover: #1b8bf5 (Sky-600)
- Text primary: #1f2937 (Gray-800), secondary: #6b7280 (Gray-500)
- Border: #e5e7eb (Gray-200)
- Success: #059669, Warning: #d97706, Danger: #e11d48
- Font body/heading: "DB HeaventRounded", "Noto Sans Thai", sans-serif
- Font buttons only: "Inter", sans-serif
- Border radius: 8px default
- Shadows: minimal flat design, only 0px 1px 2px 0px rgba(0,0,0,0.05)
- Prefer borders over shadows

SPACING:
- Page padding: 24px desktop / 16px mobile
- Card gap: 16px
- Form field gap: 16px
- Section gap: 32px

BUTTON SYSTEM:
- 6 variants: primary (solid #32a9ff) | secondary (gray) | outline (#32a9ff border) | ghost | destructive (#e11d48) | link
- 4 sizes: sm (32px) | md (36px default) | lg (40px) | xl (44px)
- Max 1 primary button per view

COLOR PALETTE (only use these):
- Brand: Sky ramp (#f0f9ff to #194f8f)
- Neutral: Gray ramp (#f9fafb to #111827)
- Success: Emerald ramp
- Warning: Amber ramp
- Danger: Rose ramp

LAYOUT:
- Full page = TopNavbar (72px) + Sidebar (280px left) + Main content
- Always include loading state (skeleton), empty state, error state

RULES:
1. Use flat, clean design — no heavy shadows or gradients
2. Max 1 primary button per view
3. Use DB HeaventRounded for all text, Inter for buttons only
4. Always handle loading/empty/error states
5. Use semantic color names, not random colors
6. Support responsive: desktop-first, then mobile
```

---

## ตัวอย่าง Prompt สำหรับ v0

```
[วาง System Prompt ด้านบน]

สร้างหน้า Order Management Dashboard มีฟีเจอร์:
- Header: Sellsuki logo + search bar + notifications + avatar
- Sidebar: เมนู Dashboard, Orders, Products, Customers, Marketing
- Content: 4 stat cards (total orders, revenue, pending, shipped)
- Table: order list with status badges (pending=amber, shipped=sky, delivered=emerald, cancelled=rose)
- Pagination at bottom
```

---

## ข้อจำกัดของ v0

- ❌ ไม่รองรับ MCP connector
- ❌ ไม่สามารถ install npm package ใน preview
- ✅ แต่สามารถ generate code ที่ import จาก @uxuissk/design-system ได้
- ✅ copy code ไป project จริงแล้ว install package ทีหลัง
- 💡 **Tip**: ถ้าต้องการให้ v0 ใช้ component จริง ให้ upload starter-template.tsx เป็น reference file
