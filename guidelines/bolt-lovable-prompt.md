# Bolt.new / Lovable — Sellsuki Design System Setup

> Bolt.new และ Lovable ใช้ System Prompt + Knowledge files กำหนด design rules
> เหมาะสำหรับ quick prototype ที่ต้องการ preview ใน browser ทันที

---

## Bolt.new Setup

### วิธีที่ 1: Prefix Prompt (เร็วสุด)

วาง block ด้านล่างเป็นบรรทัดแรกของทุก prompt:

```
[DESIGN SYSTEM] Use Sellsuki Design System:
- Primary: #32a9ff (Sky-500), hover: #1b8bf5
- Text: #1f2937 primary, #6b7280 secondary, Border: #e5e7eb
- Success: #059669, Warning: #d97706, Danger: #e11d48
- Font: "DB HeaventRounded" for text, "Inter" for buttons only
- Radius: 8px, Shadow: minimal flat design
- Mood: Professional, clean, light, airy — clarity over decoration
- Max 1 primary button per view
- Spacing: page=24px, card-gap=16px, section=32px
- Always handle loading/empty/error states
- Layout: TopNavbar (72px) + Sidebar (280px) + Main content
[END DESIGN SYSTEM]
```

### วิธีที่ 2: Project Prompt

1. สร้าง Project ใหม่ใน Bolt
2. พิมพ์ initial prompt:

```
Create a React + TypeScript project with Vite.
Install @uxuissk/design-system package.
Add import "@uxuissk/design-system/styles.css" at the top of main.tsx.

This project uses the Sellsuki Design System:
- Brand: Sky-500 (#32a9ff) primary, professional clean flat design
- Font: DB HeaventRounded for body, Inter for buttons
- Components: DSButton, DSInput, DSTable, Card, Modal, Sidebar, TopNavbar, etc.
- Always use DS components, never create custom alternatives
- Storybook reference: https://sellsukidesignsystemv12.vercel.app
```

---

## Lovable Setup

### วิธีที่ 1: Knowledge Files

1. สร้าง Project ใน Lovable
2. ไปที่ **Settings** > **Knowledge**
3. Upload ไฟล์:
   - `starter-template.tsx` (จากโฟลเดอร์ guidelines/)
   - หรือ copy System Prompt ด้านล่างวางใน Knowledge text field

### วิธีที่ 2: Initial System Prompt

เมื่อสร้าง Project ใหม่ ใส่ prompt แรก:

```
I'm building a Sellsuki e-commerce management feature.

Design System rules:
- Package: @uxuissk/design-system (npm install)
- CSS: import "@uxuissk/design-system/styles.css" first
- Primary: #32a9ff (Sky-500), flat clean design
- Font: "DB HeaventRounded" for text, "Inter" for buttons
- Radius: 8px, minimal shadows
- Colors: Sky (brand), Gray (neutral), Emerald (success), Amber (warning), Rose (danger)
- Components: DSButton, DSInput, DSTable, Card, Modal, Sidebar, TopNavbar, Tabs, Badge, Tag, Dropdown, DatePicker, Pagination, Alert, Drawer, Stepper, EmptyState, Skeleton, Spinner
- Max 1 primary button per view
- Always include loading, empty, error states
- Layout: TopNavbar + Sidebar + Main content

Build with React + TypeScript + Tailwind.
```

---

## ข้อจำกัด

| Feature | Bolt.new | Lovable |
|---------|----------|---------|
| npm install | ✅ (ใน WebContainer) | ✅ |
| MCP connector | ❌ | ❌ |
| Knowledge files | ❌ | ✅ |
| System prompt | ✅ (prefix) | ✅ (initial) |
| Live preview | ✅ | ✅ |
| Export code | ✅ | ✅ (GitHub) |

---

## Tips

- **Bolt.new**: ใส่ `npm install @uxuissk/design-system` ใน prompt แรกเสมอ จะ install package จริงใน WebContainer
- **Lovable**: Upload starter-template.tsx เป็น Knowledge เพื่อให้ AI เห็นตัวอย่าง code จริง
- ทั้งคู่ **ไม่รองรับ custom font** ใน preview → ใช้ fallback "Noto Sans Thai", sans-serif ก่อน แล้วเพิ่ม font จริงเมื่อ deploy
