import React, { useState } from "react";
import {
  ChevronRight, Plus,
} from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, smallLabel, btnStyle } from "./_showcase-factory";
import { TopNavbar } from "../../lib/components/ds-topnavbar";
import SellsukiFull from "../../imports/SellsukiFull";
import SellsukiIcon from "../../imports/SellsukiIcon";
import PatonaFull from "../../imports/PatonaFull";

// ─── Workspace switcher mock ──────────────────────────────────────────────────

function WorkspaceMock({ name = "Sellsuki Store", color = "var(--primary)" }) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--radius-md)] border border-border hover:bg-muted/30 cursor-pointer transition-colors"
      style={{ maxWidth: 196 }}
    >
      <div
        className="w-6 h-6 rounded-[var(--radius-sm)] flex items-center justify-center text-white flex-shrink-0"
        style={{ background: color, fontFamily: "var(--font-label)", fontSize: "var(--text-caption)", fontWeight: 700 }}
      >
        {name.charAt(0)}
      </div>
      <span className="truncate text-foreground" style={smallLabel}>{name}</span>
      <ChevronRight size={12} className="text-muted-foreground flex-shrink-0 rotate-90" />
    </div>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function TopNavbarShowcase() {
  const [sidebarMsg, setSidebarMsg] = useState<string | null>(null);

  const flash = (msg: string) => {
    setSidebarMsg(msg);
    setTimeout(() => setSidebarMsg(null), 1800);
  };

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.topnavbar.title" descKey="page.topnavbar.desc" />

      {/* 1 — Sellsuki standard: logoFull + searchMode bar + notification + user */}
      <Section
        title="Sellsuki — Standard TopNavbar"
        description="logoFull (SellsukiFull icon+name SVG 40px), sidebar hamburger toggle, breadcrumbs, searchMode='bar', notification badge 5, user initials"
        code={`<TopNavbar
  brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
  breadcrumbs={[{ label: "หน้าหลัก", href: "/" }, { label: "ออเดอร์" }]}
  searchMode="bar"
  notificationCount={5}
  user={{ name: "ณัฐกร สิริ" }}
  onSidebarToggle={() => setCollapsed(v => !v)}
  onNotificationClick={() => openNotifications()}
  onUserClick={() => openProfile()}
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <TopNavbar
            brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
            breadcrumbs={[{ label: "หน้าหลัก", href: "/" }, { label: "ออเดอร์" }]}
            searchMode="bar"
            notificationCount={5}
            user={{ name: "ณัฐกร สิริ" }}
            onSidebarToggle={() => flash("sidebar toggled")}
            onNotificationClick={() => flash("notifications opened")}
            onUserClick={() => flash("profile menu opened")}
          />
          {sidebarMsg && (
            <div className="px-5 py-2 bg-primary/10 text-primary" style={smallLabel}>↗ {sidebarMsg}</div>
          )}
        </DemoBox>
      </Section>

      {/* 2 — Workspace Switcher + searchMode icon */}
      <Section
        title="Sellsuki — Workspace Switcher + searchMode='icon'"
        description="workspaceSwitcher แสดง shop selector หลัง logoFull | searchMode='icon' ย่อ search bar เป็น icon button เดียว"
        code={`<TopNavbar
  brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
  workspaceSwitcher={<WorkspaceSwitcher name="Sellsuki Store" />}
  searchMode="icon"
  notificationCount={2}
  user={{ name: "ณัฐกร สิริ" }}
  onSidebarToggle={() => ...}
  onSearchClick={() => openSearch()}
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <TopNavbar
            brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
            workspaceSwitcher={<WorkspaceMock name="Sellsuki Store" />}
            searchMode="icon"
            notificationCount={2}
            user={{ name: "ณัฐกร สิริ" }}
            onSidebarToggle={() => flash("sidebar toggled")}
            onSearchClick={() => flash("search clicked")}
          />
          {sidebarMsg && (
            <div className="px-5 py-2 bg-primary/10 text-primary" style={smallLabel}>↗ {sidebarMsg}</div>
          )}
        </DemoBox>
      </Section>

      {/* 3 — App Switcher + System Title */}
      <Section
        title="App Switcher + System Title"
        description="onAppSwitcherClick → LayoutGrid icon (3×3) ปรากฏก่อน avatar | title='Order Management' แสดงชื่อระบบหลัง logo (H4, default ซ่อน)"
        code={`<TopNavbar
  brand={{ name: "Sellsuki", logo: <SellsukiIcon size={40} /> }}
  title="Order Management"
  searchMode="none"
  onAppSwitcherClick={() => openProductSwitcher()}
  onSidebarToggle={() => ...}
  user={{ name: "ณัฐกร สิริ" }}
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <TopNavbar
            brand={{ name: "Sellsuki", logo: <SellsukiIcon size={40} /> }}
            title="Order Management"
            searchMode="none"
            onAppSwitcherClick={() => flash("product switcher opened")}
            onSidebarToggle={() => flash("sidebar toggled")}
            user={{ name: "ณัฐกร สิริ" }}
          />
          {sidebarMsg && (
            <div className="px-5 py-2 bg-primary/10 text-primary" style={smallLabel}>↗ {sidebarMsg}</div>
          )}
        </DemoBox>
      </Section>

      {/* 4 — Patona orange theme */}
      <Section
        title="Patona — Orange Theme (data-product)"
        description="ครอบ TopNavbar ใน data-product='patona' → CSS token override เปลี่ยน primary เป็น #EC5E2A | PatonaFull = orange 'P' icon + wordmark"
        code={`// theme.css: [data-product="patona"] { --primary: #EC5E2A; ... }
<div data-product="patona">
  <TopNavbar
    brand={{ name: "Patona", logoFull: <PatonaFull height={40} /> }}
    breadcrumbs={[{ label: "งาน" }, { label: "รายการงาน" }]}
    searchMode="bar"
    notificationCount={3}
    user={{ name: "ทีม Patona" }}
    onSidebarToggle={() => ...}
  />
</div>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <div data-product="patona">
            <TopNavbar
              brand={{ name: "Patona", logoFull: <PatonaFull height={40} /> }}
              breadcrumbs={[{ label: "งาน" }, { label: "รายการงาน" }]}
              searchMode="bar"
              notificationCount={3}
              user={{ name: "ทีม Patona" }}
              onSidebarToggle={() => flash("patona sidebar toggled")}
              onNotificationClick={() => flash("patona notifications")}
            />
          </div>
          {sidebarMsg && (
            <div className="px-5 py-2 bg-primary/10 text-primary" style={smallLabel}>↗ {sidebarMsg}</div>
          )}
        </DemoBox>
      </Section>

      {/* 5 — Minimal focused workflow */}
      <Section
        title="Minimal — Focused Workflow"
        description="ไม่มี logo, ไม่มี search, ไม่มี notifications — ใช้ใน wizard / form page ที่ต้องการ focus"
        code={`<TopNavbar
  title="สร้างสินค้าใหม่"
  searchMode="none"
  actions={
    <div className="flex gap-2">
      <DSButton variant="outline" size="sm">ยกเลิก</DSButton>
      <DSButton size="sm">บันทึก</DSButton>
    </div>
  }
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <TopNavbar
            title="สร้างสินค้าใหม่"
            searchMode="none"
            actions={
              <div className="flex gap-2">
                <div
                  className="px-4 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                  style={btnStyle}
                >
                  ยกเลิก
                </div>
                <div
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
                  style={btnStyle}
                >
                  <Plus size={14} />
                  บันทึก
                </div>
              </div>
            }
          />
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "brand.logoFull", type: "ReactNode", def: "—", desc: "Icon+name SVG (variable width × 40px) — ใช้แทน logo เมื่อมี" },
        { prop: "brand.logo", type: "string | ReactNode", def: "—", desc: "Icon-only (40×40) — fallback เมื่อไม่มี logoFull" },
        { prop: "brand.name", type: "string", def: "—", desc: "ชื่อ brand — ใช้เป็น initials fallback" },
        { prop: "searchMode", type: '"bar" | "icon" | "none"', def: '"none"', desc: "bar = full search bar, icon = button เดี่ยว, none = ซ่อน" },
        { prop: "breadcrumbs", type: "BreadcrumbItem[]", def: "—", desc: "{ label, href? }[] path navigation" },
        { prop: "title", type: "string", def: "—", desc: "System name หลัง logo — H4 (24px), default ซ่อน" },
        { prop: "notificationCount", type: "number", def: "0", desc: "Bell badge — 0 = ซ่อน badge" },
        { prop: "onSidebarToggle", type: "() => void", def: "—", desc: "Hamburger icon ปรากฏบน desktop+mobile" },
        { prop: "onAppSwitcherClick", type: "() => void", def: "—", desc: "LayoutGrid 3×3 icon ปรากฏก่อน avatar" },
        { prop: "workspaceSwitcher", type: "ReactNode", def: "—", desc: "Shop/workspace selector — แสดงหลัง logoFull" },
        { prop: "actions", type: "ReactNode", def: "—", desc: "Custom slot ฝั่งขวา ก่อน notifications" },
        { prop: "user", type: "{ name, avatar? }", def: "—", desc: "Initials avatar / photo — click → onUserClick" },
        { prop: "showSearch", type: "boolean", def: "false", desc: "@deprecated — ใช้ searchMode='bar' แทน" },
      ]} />
    </div>
  );
}
