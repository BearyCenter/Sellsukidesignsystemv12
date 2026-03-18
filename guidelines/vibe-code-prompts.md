# Sellsuki Vibe Code — Prompt Library

> ชุดคำสั่งสำเร็จรูปสำหรับ PO, UX, Dev — Copy-paste แล้วได้ prototype ที่เป็น Sellsuki ทันที

---

## สำหรับเริ่มต้นทุกครั้ง (Prefix Prompt)

ใส่ก่อนทุก prompt เพื่อให้ AI รู้จัก Sellsuki DS:

```
ใช้ Sellsuki Design System (@uxuissk/design-system) สร้าง UI
- import "@uxuissk/design-system/styles.css" ที่ root
- ใช้ component จาก @uxuissk/design-system เท่านั้น
- สี primary: Sky-500 (#32a9ff), font: DB HeaventRounded
- ดู Storybook ที่ https://sellsukidesignsystemv12.vercel.app
```

---

## PO Prompts — Demo Prototype

### สร้างหน้า Campaign CRM

```
สร้างหน้า Add Campaign สำหรับ CRM module ของ Sellsuki ใช้ Sellsuki DS
ต้องมี:
- TopNavbar + Sidebar layout
- Stepper 4 ขั้นตอน: ข้อมูลแคมเปญ > กลุ่มเป้าหมาย > เนื้อหา > ตรวจสอบ
- Step 1: DSInput ชื่อแคมเปญ, DatePicker วันเริ่ม-สิ้นสุด, Dropdown เลือกช่องทาง
- Step 2: TransferList เลือกกลุ่มลูกค้า, Badge แสดงจำนวนที่เลือก
- Step 3: DSTextarea เนื้อหา, FileUpload แนบรูป
- Step 4: Card สรุปข้อมูลทั้งหมด, DSButton primary "สร้างแคมเปญ"
- มี loading state และ success toast
```

### สร้างหน้า Dashboard

```
สร้าง Dashboard overview ของ Sellsuki ใช้ DS
ต้องมี:
- 4 StatCard แถวบน: ยอดขายวันนี้, ออเดอร์ใหม่, ลูกค้าใหม่, อัตราการปิดขาย
- DSTable แสดง Recent Orders (5 แถว) มี Badge สถานะ
- Card แสดง Top Products มี Avatar + ชื่อสินค้า + ยอดขาย
- SearchField ค้นหาออเดอร์
- ทุก Card มี Skeleton loading state
```

### สร้างหน้า Order Management

```
สร้างหน้า Order List ของ Sellsuki ใช้ DS
ต้องมี:
- TopNavbar มี Breadcrumb: Home > Orders
- SearchField + Dropdown filter สถานะ (pending/confirmed/shipped/delivered)
- Tabs: ทั้งหมด | รอยืนยัน | กำลังจัดส่ง | สำเร็จ
- DSTable: checkbox, order ID, ลูกค้า, ยอดเงิน, สถานะ (Badge), วันที่
- Pagination ด้านล่าง
- DSButton primary "สร้างออเดอร์" มุมขวาบน
- EmptyState เมื่อไม่มีข้อมูล
```

---

## UX Prompts — Prototype & Test Journey

### Product Information System (PIS) — สร้างสินค้า

```
สร้างหน้า Create Product สำหรับ PIS module ของ Sellsuki ใช้ DS
มี Stepper 3 step:

Step 1 - ข้อมูลสินค้า:
- DSInput: ชื่อสินค้า, SKU, barcode
- DSTextarea: รายละเอียด
- Dropdown: หมวดหมู่ (มี search + create new)
- TagInput: แท็กสินค้า
- Rating: ระดับความสำคัญ

Step 2 - รูปภาพและราคา:
- FileUpload variant="dropzone": อัพโหลดรูปสินค้า (max 10)
- ImagePreview: แสดง preview รูปที่อัพ
- DSInput: ราคาปกติ, ราคาขาย
- Switch: เปิดขาย / ปิดขาย

Step 3 - ตัวเลือกสินค้า:
- DSTable: ตารางตัวเลือก (สี, ไซส์, ราคา, สต๊อก)
- DSButton outline: "เพิ่มตัวเลือก" เปิด Modal
- Modal: ฟอร์มเพิ่มตัวเลือกใหม่

Footer: DSButton ghost "ยกเลิก" + DSButton primary "บันทึกสินค้า"
แสดง ConfirmDialog ก่อนบันทึก
```

### Test UX Journey — สร้างสินค้าทั้ง flow

```
สร้าง full interactive prototype สำหรับ test UX journey:
"ผู้ขายสร้างสินค้าใหม่บน Sellsuki"

ใช้ Sellsuki DS ทำ flow ดังนี้:
1. หน้า Product List → กดปุ่ม "เพิ่มสินค้า"
2. หน้า Create Product (Stepper 3 steps)
3. กรอกข้อมูล → กด Submit → ConfirmDialog
4. Success → toast "สร้างสินค้าสำเร็จ" → redirect กลับ Product List
5. Product List แสดงสินค้าใหม่ที่เพิ่ง

ต้องมี:
- Loading state ตอน submit (Spinner ใน button)
- Error state ตอน validation fail (Alert + DSInput state="error")
- Empty state ตอนยังไม่มีสินค้า (EmptyState)
- React state management จำลอง data flow
- Navigation ระหว่างหน้าด้วย state
```

### Mobile Responsive Test

```
สร้างหน้า Product Detail ของ Sellsuki ใช้ DS
ต้อง responsive:
- Desktop: Sidebar + Content 2 columns
- Mobile: ไม่มี Sidebar, single column, TopNavbar มี hamburger menu
- ImagePreview: desktop grid 2x2, mobile carousel
- ใช้ CSS variables สำหรับ spacing
- Page padding: 24px desktop, 16px mobile
```

---

## Dev Prompts — Component & Feature

### สร้าง Feature Module

```
สร้าง Customer module ของ Sellsuki ใช้ DS
โครงสร้าง:
- pages/customers/CustomerListPage.tsx
- pages/customers/CustomerDetailPage.tsx
- pages/customers/components/CustomerTable.tsx
- pages/customers/components/CustomerFilter.tsx

CustomerListPage: SearchField + Dropdown filter + DSTable + Pagination
CustomerDetailPage: Card profile + Tabs (orders | activity | notes) + Timeline
ทุกหน้ามี TopNavbar + Sidebar layout
ใช้ TypeScript + proper types
```

### สร้าง Form ที่ซับซ้อน

```
สร้าง Settings page ของ Sellsuki ใช้ DS
มี Tabs: ทั่วไป | การแจ้งเตือน | การเชื่อมต่อ | ทีม

Tab ทั่วไป:
- DSInput: ชื่อร้าน, อีเมล, เบอร์โทร
- FileUpload: โลโก้ร้าน
- Dropdown: ภาษา, สกุลเงิน, timezone
- Switch: เปิดร้าน / ปิดปรับปรุง

Tab การแจ้งเตือน:
- CheckboxGroup: เลือกช่องทางแจ้ง (email, LINE, SMS)
- RadioGroup: ความถี่ (ทันที, สรุปรายวัน, สรุปรายสัปดาห์)

Tab ทีม:
- DSTable: รายชื่อทีม (Avatar, ชื่อ, role Badge, actions)
- DSButton outline: "เชิญสมาชิก" เปิด Modal
- Modal: DSInput อีเมล + Dropdown เลือก role

Footer sticky: DSButton ghost "ยกเลิก" + DSButton primary "บันทึก"
```

---

## Tips สำหรับ Prompt ที่ดี

1. **ระบุ DS เสมอ**: "ใช้ Sellsuki Design System" หรือ "ใช้ @uxuissk/design-system"
2. **ระบุ layout**: "มี TopNavbar + Sidebar" ถ้าต้องการ full page
3. **ระบุ component ที่ต้องการ**: "ใช้ DSTable, Badge, Pagination"
4. **ระบุ states**: "มี loading, empty, error state"
5. **ระบุ interaction**: "กดปุ่ม → เปิด Modal → submit → toast"
6. **อ้าง Storybook**: "ดูตัวอย่างที่ Storybook" เมื่อไม่แน่ใจ props
