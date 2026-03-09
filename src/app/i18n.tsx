import React, { createContext, useContext, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Lang = "en" | "th";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const translations: Record<string, Record<Lang, string>> = {
  // ── Sidebar Groups ──
  "sidebar.group.getting-started": { en: "Getting Started", th: "เริ่มต้นใช้งาน" },
  "sidebar.group.foundation": { en: "Foundation", th: "พื้นฐาน" },
  "sidebar.group.components": { en: "Components", th: "คอมโพเนนต์" },

  // ── Sidebar Items ──
  "sidebar.getting-started": { en: "Getting Started", th: "เริ่มต้นใช้งาน" },
  "sidebar.tokens": { en: "Design Tokens", th: "โทเค็นการออกแบบ" },
  "sidebar.changelog": { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },
  "sidebar.button": { en: "Button", th: "ปุ่มกด" },
  "sidebar.input": { en: "Input", th: "ช่องกรอกข้อมูล" },
  "sidebar.search": { en: "Search Field", th: "ช่องค้นหา" },
  "sidebar.checkbox": { en: "Checkbox", th: "เช็คบ็อกซ์" },
  "sidebar.radio": { en: "Radio", th: "เรดิโอ" },
  "sidebar.dropdown": { en: "Dropdown", th: "ดรอปดาวน์" },
  "sidebar.action": { en: "Action Menu", th: "เมนูการกระทำ" },
  "sidebar.tabs": { en: "Tabs", th: "แท็บ" },
  "sidebar.table": { en: "Table", th: "ตาราง" },
  "sidebar.badge": { en: "Badge", th: "แบดจ์" },
  "sidebar.modal": { en: "Modal", th: "โมดัล" },
  "sidebar.alert": { en: "Alerts & Toast", th: "การแจ้งเตือน" },
  "sidebar.pagination": { en: "Pagination", th: "การแบ่งหน้า" },
  "sidebar.datepicker": { en: "Date Picker", th: "ตัวเลือกวันที่" },
  "sidebar.editor": { en: "Text Editor", th: "ตัวแก้ไขข้อความ" },
  "sidebar.inputtag": { en: "Input Tag", th: "แท็กอินพุต" },
  "sidebar.toggle": { en: "Toggle", th: "สวิตช์เปิด/ปิด" },
  "sidebar.tag": { en: "Tag", th: "แท็ก" },
  "sidebar.avatar": { en: "Avatar", th: "อวาตาร์" },
  "sidebar.tooltip": { en: "Tooltip", th: "คำแนะนำเครื่องมือ" },
  "sidebar.spinner": { en: "Spinner", th: "ตัวโหลด" },
  "sidebar.progressbar": { en: "Progress Bar", th: "แถบความคืบหน้า" },
  "sidebar.accordion": { en: "Accordion", th: "แอคคอร์เดียน" },
  "sidebar.card": { en: "Card", th: "การ์ด" },
  "sidebar.drawer": { en: "Drawer", th: "ดรอว์เวอร์" },
  "sidebar.divider": { en: "Divider", th: "เส้นแบ่ง" },
  "sidebar.stepper": { en: "Stepper", th: "ขั้นตอน" },
  "sidebar.menu": { en: "Menu", th: "เมนู" },
  "sidebar.sidebarcomp": { en: "Sidebar", th: "แถบข้าง" },
  "sidebar.topnavbar": { en: "Top Navbar", th: "แถบนำทางด้านบน" },

  // ── Sidebar Groups (new) ──
  "sidebar.group.form": { en: "Form", th: "ฟอร์ม" },
  "sidebar.group.data": { en: "Data Display", th: "แสดงข้อมูล" },
  "sidebar.group.feedback": { en: "Feedback", th: "แจ้งผลลัพธ์" },
  "sidebar.group.navigation": { en: "Navigation", th: "นำทาง" },
  "sidebar.group.layout": { en: "Layout", th: "เลย์เอาต์" },

  // ─── App chrome ──
  "app.designSystem": { en: "Design System", th: "ระบบออกแบบ" },
  "app.mobileTitle": { en: "Sellsuki Design System", th: "ระบบออกแบบ Sellsuki" },
  "app.lightMode": { en: "Switch to light mode", th: "เปลี่ยนเป็นโหมดสว่าง" },
  "app.darkMode": { en: "Switch to dark mode", th: "เปลี่ยนเป็นโหมดมืด" },
  "app.switchLang": { en: "ไทย", th: "EN" },

  // ── Breadcrumbs ──
  "breadcrumb.components": { en: "Components", th: "คอมโพเนนต์" },
  "breadcrumb.foundation": { en: "Foundation", th: "พื้นฐาน" },
  "breadcrumb.docs": { en: "Docs", th: "เอกสาร" },
  "breadcrumb.changelog": { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },

  // ── Page Titles ──
  "page.dropdown.title": { en: "Dropdown", th: "ดรอปดาวน์" },
  "page.dropdown.desc": {
    en: "A flexible select component with single/multi-select, search, groups, avatars, creatable options, and async support. Built for forms, filters, and data-driven UIs.",
    th: "คอมโพเนนต์เลือกข้อมูลที่ยืดหยุ่น รองรับเลือกรายการเดียว/หลายรายการ, ค้นหา, จัดกลุ่ม, อวาตาร์, สร้างตัวเลือกใหม่ และ async สร้างมาสำหรับฟอร์ม, ตัวกรอง และ UI ที่ขับเคลื่อนด้วยข้อมูล",
  },
  "page.action.title": { en: "Action Dropdown", th: "ดรอปดาวน์การกระทำ" },
  "page.action.desc": {
    en: "A context-menu-style dropdown for actions — icons, descriptions, dividers, nested sub-menus, keyboard shortcuts, and destructive actions.",
    th: "ดรอปดาวน์แบบเมนูบริบทสำหรับการกระทำ — ไอคอน, คำอธิบาย, เส้นแบ่ง, เมนูย่อย, ปุ่มลัด และการกระทำที่เป็นอันตราย",
  },
  "page.button.title": { en: "Button", th: "ปุ่มกด" },
  "page.button.desc": {
    en: "6 variants, 4 sizes, icon buttons, button groups, loading states, and full accessibility. The most used component in the SSK Design System.",
    th: "6 รูปแบบ, 4 ขนาด, ปุ่มไอคอน, กลุ่มปุ่ม, สถานะกำลังโหลด และการเข้าถึงได้ครบถ้วน คอมโพเนนต์ที่ใช้มากที่สุดในระบบออกแบบ SSK",
  },
  "page.input.title": { en: "Input", th: "ช่องกรอกข้อมูล" },
  "page.input.desc": {
    en: "Text inputs and textareas with validation states, prefixes/suffixes, clearable, password toggle, character count, and auto-resize.",
    th: "ช่องกรอกข้อความพร้อมสถานะตรวจสอบ, คำนำหน้า/คำต่อท้าย, ล้างค่าได้, สลับรหัสผ่าน, นับตัวอักษร และปรับขนาดอัตโนมัติ",
  },
  "page.pagination.title": { en: "Pagination", th: "การแบ่งหน้า" },
  "page.pagination.desc": {
    en: "4 variants, 3 sizes, smart ellipsis, page size selector, item range display, and keyboard navigation.",
    th: "4 รูปแบบ, 3 ขนาด, จุดไข่ปลาอัจฉริยะ, ตัวเลือกจำนวนต่อหน้า, แสดงช่วงรายการ และนำทางด้วยแป้นพิมพ์",
  },
  "page.datepicker.title": { en: "Date Picker", th: "ตัวเลือกวันที่" },
  "page.datepicker.desc": {
    en: "Single/range date selection with month/year navigation, time picker, min/max constraints, presets, localization, and validation.",
    th: "เลือกวันที่เดี่ยว/ช่วง พร้อมนำทางเดือน/ปี, ตัวเลือกเวลา, จำกัดค่าต่ำสุด/สูงสุด, ค่าที่ตั้งไว้ล่วงหน้า, การแปลภาษา และการตรวจสอบ",
  },
  "page.editor.title": { en: "Text Editor", th: "ตัวแก้ไขข้อความ" },
  "page.editor.desc": {
    en: "Rich text editor with formatting toolbar, character/word count, min/max length validation, and read-only mode.",
    th: "ตัวแก้ไขข้อความ Rich Text พร้อมแถบเครื่องมือจัดรูปแบบ, นับตัวอักษร/คำ, ตรวจสอบความยาวต่ำสุด/สูงสุด และโหมดอ่านอย่างเดียว",
  },

  // ── Tabs Page ──
  "page.tabs.title": { en: "Tabs", th: "แท็บ" },
  "page.tabs.desc": {
    en: "Organize content into switchable panels. Supports 4 variants, 3 sizes, icons, badges, disabled states, and full keyboard navigation.",
    th: "จัดระเบียบเนื้อหาเป็นแผงสลับได้ รองรับ 4 รูปแบบ, 3 ขนาด, ไอคอน, แบดจ์, สถานะปิดใช้งาน และนำทางด้วยแป้นพิมพ์",
  },
  // ── Table Page ──
  "page.table.title": { en: "Table", th: "ตาราง" },
  "page.table.desc": {
    en: "Data table with sorting, selection, expandable rows, striped/bordered variants, loading skeleton, and empty states.",
    th: "ตารางข้อมูลพร้อมการเรียงลำดับ, การเลือก, แถวขยายได้, รูปแบบลาย/ขอบ, โครงร่างโหลด และสถานะว่าง",
  },
  // ── Modal Page ──
  "page.modal.title": { en: "Modal", th: "โมดัล" },
  "page.modal.desc": {
    en: "Dialog overlays for confirmations, forms, and content. Supports sizes, custom footers, nested modals, and scroll behavior.",
    th: "กล่องโต้ตอบซ้อนทับสำหรับการยืนยัน, ฟอร์ม และเนื้อหา รองรับหลายขนาด, ส่วนท้ายกำหนดเอง, โมดัลซ้อน และพฤติกรรมเลื่อน",
  },
  // ── Badge Page ──
  "page.badge.title": { en: "Badge", th: "แบดจ์" },
  "page.badge.desc": {
    en: "Status indicators, tags, and labels with color variants, dot indicators, removable tags, and icon support.",
    th: "ตัวบ่งชี้สถานะ, แท็ก และป้ายชื่อพร้อมรูปแบบสี, จุดตัวบ่งชี้, แท็กลบได้ และรองรับไอคอน",
  },
  // ── Alert Page ──
  "page.alert.title": { en: "Alerts & Toast", th: "การแจ้งเตือน" },
  "page.alert.desc": {
    en: "Inline alerts and toast notifications for info, success, warning, and error states with dismiss and action support.",
    th: "การแจ้งเตือนแบบอินไลน์และแบบ Toast สำหรับสถานะข้อมูล, สำเร็จ, คำเตือน และข้อผิดพลาด พร้อมปิดและรองรับการกระทำ",
  },
  // ── Search Page ──
  "page.search.title": { en: "Search Field", th: "ช่องค้นหา" },
  "page.search.desc": {
    en: "Search input with debounce, suggestions, recent searches, loading states, and keyboard navigation.",
    th: "ช่องค้นหาพร้อม debounce, คำแนะนำ, การค้นหาล่าสุด, สถานะกำลังโหลด และนำทางด้วยแป้นพิมพ์",
  },
  // ── Checkbox Page ──
  "page.checkbox.title": { en: "Checkbox", th: "เช็คบ็อกซ์" },
  "page.checkbox.desc": {
    en: "Checkbox with checked, unchecked, and indeterminate states. Groups, select-all pattern, and card-style variants.",
    th: "เช็คบ็อกซ์พร้อมสถานะเลือก, ไม่เลือก และไม่แน่นอน กลุ่ม, รูปแบบเลือกทั้งหมด และรูปแบบการ์ด",
  },
  // ── Radio Page ──
  "page.radio.title": { en: "Radio", th: "เรดิโอ" },
  "page.radio.desc": {
    en: "Radio groups with vertical/horizontal layout, card-style variants, sizes, disabled states, and custom styling.",
    th: "กลุ่มเรดิโอพร้อมเลย์เอาต์แนวตั้ง/แนวนอน, รูปแบบการ์ด, ขนาด, สถานะปิดใช้งาน และการจัดรูปแบบกำหนดเอง",
  },

  // ── New Component Pages ──
  "page.inputtag.title": { en: "Input Tag", th: "แท็กอินพุต" },
  "page.inputtag.desc": { en: "Tag-based input for multi-value fields. Add tags by typing and pressing Enter, remove with backspace or close button.", th: "อินพุตแบบแท็กสำหรับฟิลด์หลายค่า เพิ่มแท็กโดยพิมพ์แล้วกด Enter ลบด้วย backspace หรือปุ่มปิด" },
  "page.toggle.title": { en: "Toggle", th: "สวิตช์เปิด/ปิด" },
  "page.toggle.desc": { en: "On/off switch component with label, description, sizes, disabled state, and controlled/uncontrolled modes.", th: "คอมโพเนนต์สวิตช์เปิด/ปิดพร้อมป้ายชื่อ, คำอธิบาย, ขนาด, สถานะปิดใช้งาน และโหมดควบคุม/ไม่ควบคุม" },
  "page.tag.title": { en: "Tag", th: "แท็ก" },
  "page.tag.desc": { en: "Categorization labels with color variants, closable action, icons, and size options for organizing content.", th: "ป้ายจัดหมวดหมู่พร้อมรูปแบบสี, ปุ่มปิด, ไอคอน และตัวเลือกขนาดสำหรับจัดระเบียบเนื้อหา" },
  "page.avatar.title": { en: "Avatar", th: "อวาตาร์" },
  "page.avatar.desc": { en: "User representation with image, initials fallback, status indicators, size variants, and group stacking.", th: "แสดงตัวแทนผู้ใช้ด้วยรูปภาพ, ตัวอักษรย่อ, ตัวบ่งชี้สถานะ, ขนาด และการซ้อนกลุ่ม" },
  "page.tooltip.title": { en: "Tooltip", th: "คำแนะนำเครื่องมือ" },
  "page.tooltip.desc": { en: "Contextual information on hover/focus with placement options, delay, arrow, and rich content support.", th: "ข้อมูลบริบทเมื่อชี้/โฟกัสพร้อมตัวเลือกตำแหน่ง, ดีเลย์, ลูกศร และรองรับเนื้อหาแบบ Rich" },
  "page.spinner.title": { en: "Spinner", th: "ตัวโหลด" },
  "page.spinner.desc": { en: "Loading indicators with size variants, color options, overlay mode, and inline/full-page display.", th: "ตัวบ่งชี้การโหลดพร้อมขนาด, สี, โหมดซ้อนทับ และแสดงแบบอินไลน์/เต็มหน้า" },
  "page.progressbar.title": { en: "Progress Bar", th: "แถบความคืบหน้า" },
  "page.progressbar.desc": { en: "Determinate and indeterminate progress indicators with size variants, labels, color options, and animation.", th: "ตัวบ่งชี้ความคืบหน้าแบบกำหนดค่าและไม่กำหนดค่าพร้อมขนาด, ป้าย, สี และแอนิเมชัน" },
  "page.accordion.title": { en: "Accordion", th: "แอคคอร์เดียน" },
  "page.accordion.desc": { en: "Collapsible sections with smooth expand/collapse animation, single/multi-expand modes, and nested support.", th: "ส่วนยุบได้พร้อมแอนิเมชันขยาย/ยุบลื่นไหล, โหมดขยายเดี่ยว/หลายรายการ และรองรับซ้อนกัน" },
  "page.card.title": { en: "Card", th: "การ์ด" },
  "page.card.desc": { en: "Content container with header, body, footer slots, elevation variants, and interactive hover states.", th: "คอนเทนเนอร์เนื้อหาพร้อมส่วนหัว, ส่วนเนื้อหา, ส่วนท้าย, ระดับเงา และสถานะโฮเวอร์แบบโต้ตอบ" },
  "page.drawer.title": { en: "Drawer", th: "ดรอว์เวอร์" },
  "page.drawer.desc": { en: "Slide-out panel from left/right/top/bottom with overlay, sizes, and focus trap for forms and detail views.", th: "แผงเลื่อนออกจากซ้าย/ขวา/บน/ล่างพร้อมโอเวอร์เลย์, ขนาด และกักโฟกัสสำหรับฟอร์มและมุมมองรายละเอียด" },
  "page.divider.title": { en: "Divider", th: "เส้นแบ่ง" },
  "page.divider.desc": { en: "Horizontal and vertical separator lines with optional label text, dashed variant, and spacing control.", th: "เส้นแบ่งแนวนอนและแนวตั้งพร้อมข้อความป้ายเสริม, รูปแบบเส้นประ และควบคุมระยะห่าง" },
  "page.stepper.title": { en: "Stepper", th: "ขั้นตอน" },
  "page.stepper.desc": { en: "Multi-step wizard with progress indicator, validation per step, horizontal/vertical layout, and clickable steps.", th: "ตัวช่วยหลายขั้นตอนพร้อมตัวบ่งชี้ความคืบหน้า, การตรวจสอบต่อขั้นตอน, เลย์เอาต์แนวนอน/แนวตั้ง และขั้นตอนที่คลิกได้" },
  "page.menu.title": { en: "Menu", th: "เมนู" },
  "page.menu.desc": { en: "Context menus with icons, dividers, nested groups, keyboard navigation, and destructive action support.", th: "เมนูบริบทพร้อมไอคอน, เส้นแบ่ง, กลุ่มซ้อน, นำทางด้วยแป้นพิมพ์ และรองรับการกระทำอันตราย" },
  "page.sidebarcomp.title": { en: "Sidebar", th: "แถบข้าง" },
  "page.sidebarcomp.desc": { en: "256px navigation sidebar with groups, active states, brand card, collapsible sections, and mobile responsive.", th: "แถบนำทาง 256px พร้อมกลุ่ม, สถานะแอคทีฟ, การ์ดแบรนด์, ส่วนยุบได้ และตอบสนองบนมือถือ" },
  "page.topnavbar.title": { en: "Top Navbar", th: "แถบนำทางด้านบน" },
  "page.topnavbar.desc": { en: "72px top navigation bar with breadcrumbs, actions, user menu, and responsive mobile hamburger.", th: "แถบนำทางด้านบน 72px พร้อมเบรดครัมบ์, การกระทำ, เมนูผู้ใช้ และแฮมเบอร์เกอร์ตอบสนองบนมือถือ" },

  // ── Changelog Page ──
  "page.changelog.title": { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },
  "page.changelog.desc": {
    en: "Release history and version updates for the Sellsuki Design System.",
    th: "ประวัติการออกเวอร์ชันและอัปเดตสำหรับระบบออกแบบ Sellsuki",
  },
  "changelog.expandAll": { en: "Expand All", th: "ขยายทั้งหมด" },
  "changelog.collapseAll": { en: "Collapse All", th: "ย่อทั้งหมด" },
  "changelog.features": { en: "features", th: "ฟีเจอร์" },

  // ── Design Tokens Page ──
  "page.tokens.title": { en: "Design Tokens", th: "โทเค็นการออกแบบ" },
  "page.tokens.desc": {
    en: "The complete token architecture of the SSK Design System. Tokens are organized in three tiers: Primitive (raw values), Semantic (purpose-driven aliases), and Component (per-component mappings). Click any token to copy its CSS variable.",
    th: "สถาปัตยกรรมโทเค็นแบบครบถ้วนของระบบออกแบบ SSK โทเค็นจัดเป็น 3 ระดับ: Primitive (ค่าพื้นฐาน), Semantic (นามแฝงตามวัตถุประสงค์) และ Component (การแมปต่อคอมโพเนนต์) คลิกโทเค็นใดก็ได้เพื่อคัดลอกตัวแปร CSS",
  },
  "tokens.architecture": { en: "Token Architecture", th: "สถาปัตยกรรมโทเค็น" },
  "tokens.typographyScale": { en: "Typography Scale", th: "ลำดับชั้นตัวอักษร" },
  "tokens.usageGuide": { en: "Usage Guide", th: "คู่มือการใช้งาน" },
  "tokens.usageGuideDesc": {
    en: "All components consume CSS custom properties. To restyle the entire system, update",
    th: "ทุกคอมโพเนนต์ใช้ CSS custom properties ในการปรับสไตล์ทั้งระบบ ให้อัปเดตที่",
  },
  "tokens.noCodeChanges": {
    en: "— no component code changes required.",
    th: "— ไม่ต้องแก้โค้ดคอมโพเนนต์",
  },
  "tokens.primitive": { en: "Primitive", th: "พื้นฐาน" },
  "tokens.semantic": { en: "Semantic", th: "ความหมาย" },
  "tokens.component": { en: "Component", th: "คอมโพเนนต์" },
  "tokens.primitiveDesc": {
    en: "The raw, foundational values of the design system. These define the absolute color palette, type scale, and spacing units. Primitive tokens are never used directly in components — they feed into semantic tokens.",
    th: "ค่าพื้นฐานดิบของระบบออกแบบ กำหนดพาเลตสี, ลำดับตัวอักษร และหน่วยระยะห่าง โทเค็นพื้นฐานไม่ใช้ในคอมโพเนนต์โดยตรง — แต่จะส่งต่อเข้าสู่โทเค็นเชิงความหมาย",
  },
  "tokens.semanticDesc": {
    en: "Purpose-driven aliases that map primitive values to UI roles (e.g., \"background\", \"primary\", \"destructive\"). Changing a semantic token updates every component that references it — enabling theme switching and brand customization.",
    th: "นามแฝงตามวัตถุประสงค์ที่แมปค่าพื้นฐานกับบทบาท UI (เช่น \"background\", \"primary\", \"destructive\") การเปลี่ยนโทเค็นเชิงความหมายจะอัปเดตทุกคอมโพเนนต์ที่อ้างอิง — ทำให้สลับธีมและปรับแบรนด์ได้",
  },
  "tokens.componentDesc": {
    en: "How semantic tokens map to specific UI components. Each component consumes semantic tokens for its visual properties — background, text, border, radius, typography, and elevation.",
    th: "วิธีที่โทเค็นเชิงความหมายแมปกับคอมโพเนนต์ UI เฉพาะ แต่ละคอมโพเนนต์ใช้โทเค็นเชิงความหมายสำหรับคุณสมบัติการแสดงผล — พื้นหลัง, ข้อความ, ขอบ, ความโค้ง, ตัวอักษร และเงา",
  },

  // ── Getting Started Page ──
  "page.gettingStarted.title": { en: "Getting Started", th: "เริ่มต้นใช้งาน" },
  "page.gettingStarted.desc": {
    en: "Installation and usage guide for the Sellsuki Design System (sellsuki-components) — Web Components (Lit) with React wrappers, the foundation for every Sellsuki product.",
    th: "คู่มือการติดตั้งและใช้งาน Sellsuki Design System (sellsuki-components) — Web Components (Lit) พร้อม React wrappers ที่ใช้เป็น foundation สำหรับทุก product ของ Sellsuki",
  },

  // ── Section Titles (common across showcase pages) ──
  "section.variants": { en: "Variants", th: "รูปแบบ" },
  "section.sizes": { en: "Sizes", th: "ขนาด" },
  "section.states": { en: "States", th: "สถานะ" },
  "section.examples": { en: "Examples", th: "ตัวอย่าง" },
  "section.playground": { en: "Playground", th: "ทดลองใช้งาน" },
  "section.apiReference": { en: "API Reference", th: "เอกสาร API" },
  "section.basic": { en: "Basic Usage", th: "การใช้งานเบื้องต้น" },
  "section.advanced": { en: "Advanced", th: "ขั้นสูง" },

  // ── Common UI ──
  "common.copyCode": { en: "Copy code", th: "คัดลอกโค้ด" },
  "common.copied": { en: "Copied!", th: "คัดลอกแล้ว!" },
  "common.showCode": { en: "Show code", th: "แสดงโค้ด" },
  "common.hideCode": { en: "Hide code", th: "ซ่อนโค้ด" },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ssk-lang");
      if (saved === "th" || saved === "en") return saved;
    }
    return "en";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("ssk-lang", newLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "th" : "en";
      localStorage.setItem("ssk-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] ?? entry.en ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}