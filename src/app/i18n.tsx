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
  "sidebar.select": { en: "Select", th: "เลือก" },
  "sidebar.fileupload": { en: "File Upload", th: "อัปโหลดไฟล์" },
  "sidebar.skeleton": { en: "Skeleton", th: "โครงร่างโหลด" },
  "sidebar.emptystate": { en: "Empty State", th: "สถานะว่าง" },
  "sidebar.breadcrumb": { en: "Breadcrumb", th: "เบรดครัมบ์" },
  "sidebar.switch": { en: "Switch", th: "สวิตช์" },
  "sidebar.popover": { en: "Popover", th: "ป็อปโอเวอร์" },
  "sidebar.timeline": { en: "Timeline", th: "ไทม์ไลน์" },
  "sidebar.notification": { en: "Notification", th: "การแจ้งเตือน" },
  "sidebar.statistic": { en: "Statistic", th: "สถิติ" },
  "sidebar.tree": { en: "Tree", th: "ทรี" },
  "sidebar.transferlist": { en: "Transfer List", th: "รายการโอนย้าย" },
  "sidebar.rating": { en: "Rating", th: "ให้คะแนน" },
  "sidebar.colorpicker": { en: "Color Picker", th: "ตัวเลือกสี" },
  "sidebar.imagepreview": { en: "Image Preview", th: "ดูตัวอย่างรูป" },
  "sidebar.sidebar-account": { en: "Account Switcher", th: "สลับบัญชี" },
  "sidebar.numberinput": { en: "Number Input", th: "ช่องกรอกตัวเลข" },
  "sidebar.otpinput": { en: "OTP Input", th: "ช่องกรอก OTP" },
  "sidebar.pageheader": { en: "Page Header", th: "หัวหน้าหน้า" },
  "sidebar.filterbar": { en: "Filter Bar", th: "แถบกรอง" },
  "sidebar.form": { en: "Form", th: "ฟอร์ม" },
  "sidebar.advancedtable": { en: "Advanced Table", th: "ตารางขั้นสูง" },
  "sidebar.mcpserver": { en: "MCP Server", th: "เซิร์ฟเวอร์ MCP" },

  "sidebar.preview": { en: "Component Preview", th: "ตัวอย่างคอมโพเนนต์" },

  // ── Sidebar Groups (new) ──
  "sidebar.group.form": { en: "Form", th: "ฟอร์ม" },
  "sidebar.group.data": { en: "Data Display", th: "แสดงข้อมูล" },
  "sidebar.group.feedback": { en: "Feedback", th: "แจ้งผลลัพธ์" },
  "sidebar.group.navigation": { en: "Navigation", th: "นำทาง" },
  "sidebar.group.layout": { en: "Layout", th: "เลย์เอาต์" },
  "sidebar.group.advanced": { en: "Advanced", th: "ขั้นสูง" },

  // ─── App chrome ──
  "app.designSystem": { en: "Design System", th: "ระบบออกแบบ" },
  "app.mobileTitle": { en: "Sellsuki Design System", th: "ระบบออกแบบ Sellsuki" },
  "app.lightMode": { en: "Switch to light mode", th: "เปลี่ยนเป็นโหมดสว่าง" },
  "app.darkMode": { en: "Switch to dark mode", th: "เปลี่ยนเป็นโหมดมืด" },
  "app.switchLang": { en: "ไทย", th: "EN" },

  // ── Header Search ──
  "header.search.placeholder": { en: "Search components…", th: "ค้นหาคอมโพเนนต์…" },
  "header.search.shortcut": { en: "⌘K", th: "⌘K" },
  "header.search.noResults": { en: "No results found", th: "ไม่พบผลลัพธ์" },

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

  // ── New Components (Batch 15) ──
  "page.select.title": { en: "Select", th: "เลือก" },
  "page.select.desc": { en: "Customizable select dropdown with single/multi-select, search, grouped options, clearable, and validation states.", th: "ดรอปดาวน์เลือกที่กำหนดเองได้ รองรับเลือกเดี่ยว/หลายรายการ, ค้นหา, ตัวเลือกจัดกลุ่ม, ล้างค่า และสถานะตรวจสอบ" },
  "page.fileupload.title": { en: "File Upload", th: "อัปโหลดไฟล์" },
  "page.fileupload.desc": { en: "Drag & drop file upload with dropzone, button, and avatar variants. Progress indicator, file list, and format validation.", th: "อัปโหลดไฟล์แบบลากและวาง พร้อมรูปแบบ dropzone, ปุ่ม และอวาตาร์ ตัวบ่งชี้ความคืบหน้า, รายการไฟล์ และตรวจสอบรูปแบบ" },
  "page.skeleton.title": { en: "Skeleton", th: "โครงร่างโหลด" },
  "page.skeleton.desc": { en: "Content placeholder with pulse animation for loading states. Supports text, rectangular, rounded, and circular variants.", th: "ตัวยึดเนื้อหาพร้อมแอนิเมชันพัลส์สำหรับสถานะโหลด รองรับรูปแบบข้อความ, สี่เหลี่ยม, มุมมน และวงกลม" },
  "page.emptystate.title": { en: "Empty State", th: "สถานะว่าง" },
  "page.emptystate.desc": { en: "Placeholder for empty views with icon, title, description, and CTA buttons. Common patterns for search, errors, and first-use.", th: "ตัวยึดสำหรับมุมมองว่างพร้อมไอคอน, หัวข้อ, คำอธิบาย และปุ่ม CTA รูปแบบทั่วไปสำหรับค้นหา, ข้อผิดพลาด และใช้ครั้งแรก" },
  "page.breadcrumb.title": { en: "Breadcrumb", th: "เบรดครัมบ์" },
  "page.breadcrumb.desc": { en: "Navigation trail with separator options, icons, collapsible long paths, and size variants.", th: "เส้นทางนำทางพร้อมตัวเลือกตัวคั่น, ไอคอน, เส้นทางยาวยุบได้ และตัวเลือกขนาด" },
  "page.switch.title": { en: "Switch", th: "สวิตช์" },
  "page.switch.desc": { en: "Unified on/off control (replaces Toggle). Semantic colors, three sizes, label/description, disabled state, and settings card pattern.", th: "คอมโพเนนต์เปิด/ปิดรวม (แทนที่ Toggle) สีเชิงความหมาย, สามขนาด, ป้ายชื่อ/คำอธิบาย, สถานะปิดใช้งาน และรูปแบบการ์ดการตั้งค่า" },
  "page.popover.title": { en: "Popover", th: "ป็อปโอเวอร์" },
  "page.popover.desc": { en: "Click-triggered floating panel with placement options, header, close button, and rich content support.", th: "แผงลอยเมื่อคลิกพร้อมตัวเลือกตำแหน่ง, ส่วนหัว, ปุ่มปิด และรองรับเนื้อหาแบบ Rich" },
  "page.timeline.title": { en: "Timeline", th: "ไทม์ไลน์" },
  "page.timeline.desc": { en: "Vertical timeline with status indicators, icons, alternate layout, compact variant, and rich content slots.", th: "ไทม์ไลน์แนวตั้งพร้อมตัวบ่งชี้สถานะ, ไอคอน, เลย์เอาต์สลับ, รูปแบบกะทัดรัด และช่องเนื้อหา Rich" },
  "page.notification.title": { en: "Notification", th: "การแจ้งเตือน" },
  "page.notification.desc": { en: "Inline notifications with severity types, closable, actions, avatars, timestamps, and notification center pattern.", th: "การแจ้งเตือนแบบอินไลน์พร้อมระดับความรุนแรง, ปิดได้, การกระทำ, อวาตาร์, เวลา และรูปแบบศูนย์การแจ้งเตือน" },
  "page.statistic.title": { en: "Statistic", th: "สถิติ" },
  "page.statistic.desc": { en: "Numeric display with trends, prefixes/suffixes, icon, stat cards for dashboards, and loading skeleton.", th: "แสดงตัวเลขพร้อมแนวโน้ม, คำนำหน้า/คำต่อท้าย, ไอคอน, การ์ดสถิติสำหรับแดชบอร์ด และโครงร่างโหลด" },
  "page.tree.title": { en: "Tree", th: "ทรี" },
  "page.tree.desc": { en: "Hierarchical tree view with expand/collapse, file/folder icons, connecting lines, and checkbox selection.", th: "มุมมองทรีแบบลำดับชั้นพร้อมขยาย/ยุบ, ไอคอนไฟล์/โฟลเดอร์, เส้นเชื่อม และเลือกด้วยเช็คบ็อกซ์" },
  "page.transferlist.title": { en: "Transfer List", th: "รายการโอนย้าย" },
  "page.transferlist.desc": { en: "Dual-list transfer with move controls, checkbox selection, search filter, and disabled items.", th: "โอนย้ายรายการคู่พร้อมปุ่มย้าย, เลือกด้วยเช็คบ็อกซ์, ค้นหาตัวกรอง และรายการปิดใช้งาน" },
  "page.rating.title": { en: "Rating", th: "ให้คะแนน" },
  "page.rating.desc": { en: "Interactive rating with star/heart/thumb icons, sizes, custom max, read-only, and inline label.", th: "ให้คะแนนแบบโต้ตอบพร้อมไอคอนดาว/หัวใจ/ไลค์, ขนาด, ค่าสูงสุดกำหนดเอง, อ่านอย่างเดียว และป้ายอินไลน์" },
  "page.colorpicker.title": { en: "Color Picker", th: "ตัวเลือกสี" },
  "page.colorpicker.desc": { en: "Color selection with native picker, preset swatches, hex input, HEX/RGB/HSL format display, and copy to clipboard.", th: "เลือกสีด้วยตัวเลือกเนทีฟ, สวอชพรีเซ็ต, อินพุตเลขฐาน 16, แสดงรูปแบบ HEX/RGB/HSL และคัดลอก" },
  "page.imagepreview.title": { en: "Image Preview", th: "ดูตัวอย่างรูป" },
  "page.imagepreview.desc": { en: "Thumbnail gallery with lightbox viewer, zoom in/out, rotate, navigation arrows, and bottom thumbnail strip.", th: "แกลเลอรีรูปย่อพร้อมตัวแสดงภาพขนาดเต็ม, ซูมเข้า/ออก, หมุน, ลูกศรนำทาง และแถบรูปย่อด้านล่าง" },
  "page.sidebar-account.title": { en: "Account Switcher", th: "ตัวสลับบัญชี" },
  "page.sidebar-account.desc": { en: "Sidebar account switcher for switching between companies and branches. Supports collapsed mode, avatar fallback, and multi-level context (company → branch → provider).", th: "ตัวสลับบัญชีใน Sidebar สำหรับสลับระหว่างบริษัทและสาขา รองรับโหมดย่อ, อวาตาร์สำรอง และบริบทหลายระดับ (บริษัท → สาขา → ผู้ให้บริการ)" },

  "page.numberinput.title": { en: "Number Input", th: "ช่องกรอกตัวเลข" },
  "page.numberinput.desc": { en: "Numeric input with increment/decrement stepper buttons, min/max, step, and validation states.", th: "อินพุตตัวเลขพร้อมปุ่มเพิ่ม/ลด, ค่าต่ำสุด/สูงสุด, step และสถานะการตรวจสอบ" },
  "page.otpinput.title": { en: "OTP Input", th: "ช่องกรอก OTP" },
  "page.otpinput.desc": { en: "One-time password input with auto-focus, auto-advance, masked mode, and completion callback.", th: "ช่องกรอก OTP พร้อมโฟกัสอัตโนมัติ, เลื่อนอัตโนมัติ, โหมดซ่อน และ callback เมื่อกรอกครบ" },
  "page.pageheader.title": { en: "Page Header", th: "หัวหน้าหน้า" },
  "page.pageheader.desc": { en: "Consistent page header layout with title, subtitle, breadcrumb, action buttons, and optional tab navigation.", th: "เลย์เอาต์หัวหน้าหน้าสม่ำเสมอพร้อมชื่อ, คำบรรยาย, เบรดครัมบ์, ปุ่มการกระทำ และแท็บ" },
  "page.filterbar.title": { en: "Filter Bar", th: "แถบกรอง" },
  "page.filterbar.desc": { en: "Combined search and filter bar with single/multi-select dropdown filters and clear-all functionality.", th: "แถบค้นหาและกรองรวม พร้อม dropdown กรองแบบเดี่ยว/หลายตัวเลือก และล้างทั้งหมด" },
  "page.form.title": { en: "Form", th: "ฟอร์ม" },
  "page.form.desc": { en: "Form layout primitives: FormField wraps inputs with label, helper text, error and success messages in vertical or horizontal layouts.", th: "พื้นฐานเลย์เอาต์ฟอร์ม: FormField ครอบอินพุตพร้อมป้าย, ข้อความช่วยเหลือ, ข้อความแสดงข้อผิดพลาด และเลย์เอาต์แนวตั้ง/แนวนอน" },
  "page.advancedtable.title": { en: "Advanced Table", th: "ตารางขั้นสูง" },
  "page.advancedtable.desc": { en: "Server-side data table with pagination, multi-column sort, bulk actions, row selection, frozen columns, column toggle, and loading/error states.", th: "ตารางข้อมูลฝั่งเซิร์ฟเวอร์พร้อมการแบ่งหน้า, เรียงหลายคอลัมน์, การกระทำกลุ่ม, เลือกแถว, คอลัมน์ตรึง และสถานะโหลด/ข้อผิดพลาด" },

  // ── Stage 2.5 + 6 New Components ──
  "page.chart.title": { en: "Charts", th: "กราฟ" },
  "page.chart.desc": { en: "Zero-dependency SVG charts — LineChart, AreaChart, BarChart, DonutChart, and MiniSparkline. All use CSS tokens for colors and support tooltips.", th: "กราฟ SVG ไม่ต้องพึ่ง library — LineChart, AreaChart, BarChart, DonutChart และ MiniSparkline ใช้ CSS tokens สำหรับสี และรองรับ tooltip" },
  "page.daterangepicker.title": { en: "Date Range Picker", th: "ตัวเลือกช่วงวันที่" },
  "page.daterangepicker.desc": { en: "Dual-calendar popup date range picker with preset shortcuts (Today, Last 7 days, This month, etc.) and custom range selection.", th: "ตัวเลือกช่วงวันที่แบบปฏิทินคู่พร้อมทางลัดพรีเซ็ต (วันนี้, 7 วันล่าสุด, เดือนนี้ ฯลฯ) และเลือกช่วงเองได้" },
  "page.timepicker.title": { en: "Time Picker", th: "ตัวเลือกเวลา" },
  "page.timepicker.desc": { en: "Scroll-column time picker supporting 12h/24h formats, optional seconds, and a combined DateTimePicker variant.", th: "ตัวเลือกเวลาแบบคอลัมน์เลื่อน รองรับรูปแบบ 12ชม./24ชม., วินาทีเสริม และ DateTimePicker รวมกัน" },
  "page.choicecard.title": { en: "Choice Card", th: "การ์ดเลือก" },
  "page.choicecard.desc": { en: "Rich selection cards — ChoiceCard for icon+title+description choices, ChoiceCardGroup for controlled single/multi selection, RadioCard for plan/tier selection.", th: "การ์ดเลือกที่สมบูรณ์ — ChoiceCard สำหรับไอคอน+ชื่อ+คำอธิบาย, ChoiceCardGroup สำหรับเลือกเดี่ยว/หลายตัวควบคุมได้, RadioCard สำหรับเลือกแผน" },
  "page.repeatablefield.title": { en: "Repeatable Field", th: "ฟิลด์ซ้ำ" },
  "page.repeatablefield.desc": { en: "Dynamic list of rows with custom column renders, add/remove/reorder support, and configurable min/max row limits.", th: "รายการแถวแบบไดนามิก พร้อม column render กำหนดเอง, เพิ่ม/ลบ/เรียงลำดับ และจำกัดแถวขั้นต่ำ/สูงสุดได้" },
  "page.richtexteditor.title": { en: "Rich Text Editor", th: "ตัวแก้ไขข้อความ" },
  "page.richtexteditor.desc": { en: "contentEditable rich text editor with formatting toolbar (bold, italic, lists, alignment, links, headings), fullscreen mode, and HTML output.", th: "Rich text editor แบบ contentEditable พร้อม toolbar (ตัวหนา, เอียง, รายการ, จัดย่อหน้า, ลิงก์, หัวข้อ), โหมดเต็มจอ และ HTML output" },
  "page.imagegallery.title": { en: "Image Gallery", th: "แกลเลอรีรูปภาพ" },
  "page.imagegallery.desc": { en: "Grid/list image gallery with lightbox, keyboard navigation, selectable images, upload trigger, and ThumbnailCell for compact table use.", th: "แกลเลอรีรูปภาพแบบตาราง/รายการ พร้อม lightbox, ปุ่มแป้นพิมพ์, เลือกรูปได้, ปุ่มอัปโหลด และ ThumbnailCell สำหรับตาราง" },
  "page.appshell.title": { en: "AppShell", th: "เชลล์แอป" },
  "page.appshell.desc": { en: "Full-page product shell composing TopNavbar + responsive Sidebar + content frame. Supports async nav resolver, multi-product theming, and FeaturePageScaffold layouts.", th: "เชลล์หน้าแบบเต็ม ประกอบ TopNavbar + Sidebar แบบ responsive + กรอบเนื้อหา รองรับ async nav resolver, ธีมหลายผลิตภัณฑ์ และ FeaturePageScaffold" },

  // ── Component Preview Page ──
  "page.preview.title": { en: "Component Preview", th: "ตัวอย่างคอมโพเนนต์" },
  "page.preview.desc": {
    en: "Interactive playground — pick a component, tweak its props with auto-generated controls, see a live preview with viewport switching, and grab the generated JSX code.",
    th: "พื้นที่ทดลองแบบโต้ตอบ — เลือกคอมโพเนนต์, ปรับ props ด้วยตัวควบคุมอัตโนมัติ, ดูตัวอย่างสดพร้อมสลับ viewport และคัดลอกโค้ด JSX ที่สร้างขึ้น",
  },
  "preview.component": { en: "Component:", th: "คอมโพเนนต์:" },
  "preview.livePreview": { en: "Live Preview", th: "ตัวอย่างสด" },
  "preview.props": { en: "Props", th: "คุณสมบัติ" },
  "preview.reset": { en: "Reset", th: "รีเซ็ต" },
  "preview.generatedCode": { en: "Generated Code", th: "โค้ดที่สร้าง" },

  // ── Changelog Page ──
  "page.changelog.title": { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },
  "page.changelog.desc": {
    en: "Release history and version updates for the Sellsuki Design System.",
    th: "ประวัติการออกเวอร์ชันและอัปเดตสำหรับระบบออกแบบ Sellsuki",
  },
  "changelog.expandAll": { en: "Expand All", th: "ขยายทั้งหมด" },
  "changelog.collapseAll": { en: "Collapse All", th: "ย่อทั้งหมด" },
  "changelog.features": { en: "features", th: "ฟีเจอร์" },
  "changelog.latestRelease": { en: "Latest Release", th: "เวอร์ชันล่าสุด" },
  "changelog.initialRelease": { en: "Initial Release", th: "เวอร์ชันเริ่มต้น" },
  "changelog.version": { en: "Version", th: "เวอร์ชัน" },
  "changelog.latest": { en: "Latest", th: "ล่าสุด" },
  "changelog.change": { en: "change", th: "การเปลี่ยนแปลง" },
  "changelog.changes": { en: "changes", th: "การเปลี่ยนแปลง" },
  "changelog.releases": { en: "releases", th: "เวอร์ชัน" },
  "changelog.startedAt": { en: "Started at", th: "เริ่มต้นที่" },
  "changelog.on": { en: "on", th: "เมื่อ" },
  "changelog.tagNew": { en: "New", th: "ใหม่" },
  "changelog.tagImproved": { en: "Improved", th: "ปรับปรุง" },
  "changelog.tagFixed": { en: "Fixed", th: "แก้ไข" },
  "changelog.tagBreaking": { en: "Breaking", th: "เปลี่ยนแปลงสำคัญ" },

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
    en: "Installation and usage guide for the Sellsuki Design System (@uxuissk/design-system) — Web Components (Lit) with React wrappers, the foundation for every Sellsuki product.",
    th: "คู่มือการติดตั้งและใช้งาน Sellsuki Design System (@uxuissk/design-system) — Web Components (Lit) พร้อม React wrappers ที่ใช้เป็น foundation สำหรับทุก product ของ Sellsuki",
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

  // ── MCP Server Page ──
  "page.mcpServer.title": { en: "MCP Server", th: "MCP Server" },
  "page.mcpServer.desc": {
    en: "Build Model Context Protocol (MCP) servers to connect AI assistants with your data, tools, and APIs. Interactive builder with real-time code generation.",
    th: "สร้าง MCP Server เพื่อเชื่อมต่อ AI assistants กับข้อมูล, เครื่องมือ และ API ของคุณ พร้อม interactive builder ที่สร้างโค้ดแบบ real-time",
  },
  "mcp.overview.title": { en: "What is MCP?", th: "MCP คืออะไร?" },
  "mcp.overview.desc": {
    en: "Model Context Protocol — the open standard for connecting AI models to external tools and data sources.",
    th: "Model Context Protocol — มาตรฐานเปิดสำหรับเชื่อมต่อ AI models กับเครื่องมือและแหล่งข้อมูลภายนอก",
  },
  "mcp.whatIs.title": { en: "The \"USB-C\" for AI", th: "\"USB-C\" สำหรับ AI" },
  "mcp.whatIs.body": {
    en: "MCP provides a universal, open protocol for connecting AI assistants to data sources, business tools, and development environments. Instead of building custom integrations for each AI platform, build one MCP server and connect it to any compatible client.",
    th: "MCP เป็นโปรโตคอลเปิดสำหรับเชื่อมต่อ AI assistants กับแหล่งข้อมูล, เครื่องมือทางธุรกิจ และสภาพแวดล้อมการพัฒนา แทนที่จะสร้าง integration เฉพาะสำหรับแต่ละแพลตฟอร์ม AI ให้สร้าง MCP server เดียวแล้วเชื่อมต่อกับ client ที่รองรับได้ทุกตัว",
  },
  "mcp.arch.title": { en: "Architecture", th: "สถาปัตยกรรม" },
  "mcp.arch.host": { en: "Host", th: "Host" },
  "mcp.arch.hostSub": { en: "Claude, Cursor, VS Code", th: "Claude, Cursor, VS Code" },
  "mcp.arch.client": { en: "MCP Client", th: "MCP Client" },
  "mcp.arch.clientSub": { en: "Protocol layer", th: "ชั้นโปรโตคอล" },
  "mcp.arch.server": { en: "MCP Server", th: "MCP Server" },
  "mcp.arch.serverSub": { en: "Your tools & data", th: "เครื่องมือและข้อมูลของคุณ" },

  "mcp.capabilities.title": { en: "Server Capabilities", th: "ความสามารถของ Server" },
  "mcp.capabilities.desc": {
    en: "MCP servers expose three core primitives to AI clients.",
    th: "MCP servers เปิดให้ AI clients เข้าถึง 3 primitives หลัก",
  },
  "mcp.cap.tools": { en: "Tools", th: "Tools" },
  "mcp.cap.toolsDesc": { en: "Executable functions the AI model can invoke with validated inputs.", th: "ฟังก์ชันที่ AI model เรียกใช้ได้พร้อม input ที่ผ่านการตรวจสอบ" },
  "mcp.cap.resources": { en: "Resources", th: "Resources" },
  "mcp.cap.resourcesDesc": { en: "Data sources exposed via URI templates for the AI to read.", th: "แหล่งข้อมูลที่เปิดให้ AI อ่านผ่าน URI templates" },
  "mcp.cap.prompts": { en: "Prompts", th: "Prompts" },
  "mcp.cap.promptsDesc": { en: "Reusable prompt templates with arguments for common workflows.", th: "เทมเพลต prompt ที่ใช้ซ้ำได้พร้อม arguments สำหรับ workflow ทั่วไป" },

  "mcp.builder.title": { en: "Interactive Server Builder", th: "ตัวสร้าง Server แบบ Interactive" },
  "mcp.builder.desc": {
    en: "Define your server, add tools and resources, then grab the generated TypeScript code.",
    th: "กำหนดค่า server, เพิ่ม tools และ resources จากนั้นคัดลอกโค้ด TypeScript ที่สร้างขึ้น",
  },
  "mcp.builder.config": { en: "Server Configuration", th: "ตั้งค่า Server" },
  "mcp.builder.name": { en: "Server Name", th: "ชื่อ Server" },
  "mcp.builder.description": { en: "Description", th: "คำอธิบาย" },
  "mcp.builder.transport": { en: "Transport", th: "Transport" },
  "mcp.builder.addTool": { en: "Add Tool", th: "เพิ่ม Tool" },
  "mcp.builder.addResource": { en: "Add Resource", th: "เพิ่ม Resource" },
  "mcp.builder.validate": { en: "Validate Server", th: "ตรวจสอบ Server" },
  "mcp.builder.validMsg": { en: "Server configuration is valid!", th: "การตั้งค่า Server ถูกต้อง!" },
  "mcp.builder.errorMsg": { en: "At least one tool must have a name.", th: "ต้องมี tool อย่างน้อยหนึ่งตัวที่มีชื่อ" },

  "mcp.quickstart.title": { en: "Quick Start", th: "เริ่มต้นอย่างรวดเร็ว" },
  "mcp.quickstart.desc": { en: "Get your MCP server running in 4 steps.", th: "เริ่มใช้งาน MCP server ใน 4 ขั้นตอน" },
  "mcp.step1.title": { en: "Install dependencies", th: "ติดตั้ง dependencies" },
  "mcp.step1.desc": { en: "Install @modelcontextprotocol/sdk and zod for schema validation.", th: "ติดตั้ง @modelcontextprotocol/sdk และ zod สำหรับ schema validation" },
  "mcp.step2.title": { en: "Define your server", th: "กำหนด server ของคุณ" },
  "mcp.step2.desc": { en: "Create a new McpServer instance with name and version.", th: "สร้าง McpServer instance ใหม่พร้อมชื่อและเวอร์ชัน" },
  "mcp.step3.title": { en: "Register tools & resources", th: "ลงทะเบียน tools และ resources" },
  "mcp.step3.desc": { en: "Add tools with Zod schemas and async handlers for the AI to call.", th: "เพิ่ม tools พร้อม Zod schemas และ async handlers ให้ AI เรียกใช้" },
  "mcp.step4.title": { en: "Connect transport & run", th: "เชื่อมต่อ transport และรัน" },
  "mcp.step4.desc": { en: "Choose stdio (local) or SSE (HTTP) transport, then start the server.", th: "เลือก transport แบบ stdio (local) หรือ SSE (HTTP) จากนั้นเริ่ม server" },

  "mcp.clientConfig.title": { en: "Client Configuration", th: "การตั้งค่า Client" },
  "mcp.clientConfig.desc": { en: "Connect your MCP server to popular AI clients.", th: "เชื่อมต่อ MCP server ของคุณกับ AI clients ยอดนิยม" },
  "mcp.clientConfig.claude": { en: "Claude Desktop", th: "Claude Desktop" },
  "mcp.clientConfig.cursor": { en: "Cursor / VS Code", th: "Cursor / VS Code" },
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