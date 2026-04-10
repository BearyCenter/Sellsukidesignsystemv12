import React, { useState } from "react";
import {
  Home, Package, BarChart3, Settings, Users, HelpCircle,
  ShoppingCart, Briefcase, Building2,
} from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";
import { Sidebar } from "../../lib/components/ds-sidebar";
import SellsukiFull from "../../imports/SellsukiFull";
import PatonaIcon from "../../imports/PatonaIcon";
import PatonaFull from "../../imports/PatonaFull";

// ─── Shared nav groups ────────────────────────────────────────────────────────

const SELLSUKI_GROUPS = [
  {
    label: "ร้านค้า",
    items: [
      { id: "orders", label: "ออเดอร์", icon: <ShoppingCart size={18} />, badge: "12" },
      { id: "products", label: "สินค้า", icon: <Package size={18} /> },
      { id: "customers", label: "ลูกค้า", icon: <Users size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "analytics", label: "ภาพรวม", icon: <BarChart3 size={18} /> },
    ],
  },
];

const PATONA_GROUPS = [
  {
    label: "งาน",
    items: [
      { id: "jobs", label: "งานทั้งหมด", icon: <Briefcase size={18} />, badge: "3" },
      { id: "partners", label: "พาร์ทเนอร์", icon: <Building2 size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "reports", label: "รายงาน", icon: <BarChart3 size={18} /> },
    ],
  },
];

const UTILITY_ITEMS = [
  { id: "help", label: "ช่วยเหลือ", icon: <HelpCircle size={18} /> },
  { id: "settings", label: "ตั้งค่า", icon: <Settings size={18} /> },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function SidebarShowcase() {
  const [active1, setActive1] = useState("orders");
  const [collapsed1, setCollapsed1] = useState(false);

  const [active2, setActive2] = useState("orders");
  const [collapsed2, setCollapsed2] = useState(false);

  const [active3, setActive3] = useState("jobs");
  const [collapsed3, setCollapsed3] = useState(false);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.sidebarcomp.title" descKey="page.sidebarcomp.desc" />

      {/* 1 — Sellsuki: logoFull + utilityItems */}
      <Section
        title="Sellsuki — logoFull + utilityItems"
        description="brand.logoFull = SellsukiFull (icon+name SVG) — expanded แสดงเต็ม, collapsed คลิปแค่ icon 40px | utilityItems (Help/Settings) ใน footer"
        code={`<Sidebar
  brand={{
    name: "Sellsuki",
    logoFull: <SellsukiFull height={40} />,
  }}
  groups={[
    { label: "ร้านค้า", items: [
      { id: "orders", label: "ออเดอร์", icon: <ShoppingCart size={18} />, badge: "12" },
      { id: "products", label: "สินค้า", icon: <Package size={18} /> },
    ]},
  ]}
  activeItem="orders"
  onNavigate={(item) => setActive(item.id)}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  showCollapseToggle
  utilityItems={[
    { id: "help", label: "ช่วยเหลือ", icon: <HelpCircle size={18} /> },
    { id: "settings", label: "ตั้งค่า", icon: <Settings size={18} /> },
  ]}
  version="v0.8.4"
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <div className="flex rounded-[var(--radius-md)] overflow-hidden" style={{ height: 440 }}>
            <Sidebar
              brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
              groups={SELLSUKI_GROUPS}
              activeItem={active1}
              onNavigate={(item) => setActive1(item.id)}
              collapsed={collapsed1}
              onCollapsedChange={setCollapsed1}
              showCollapseToggle
              utilityItems={UTILITY_ITEMS}
              version="v0.8.4"
              versionDate="Apr 2026"
            />
            <div className="flex-1 bg-[var(--bg-page,#f3f4f6)] p-6 overflow-auto">
              <div className="text-foreground font-bold mb-1" style={fontLabelBold}>Content Area</div>
              <div className="text-muted-foreground" style={fontLabel}>Active: <strong>{active1}</strong></div>
              <div className="text-muted-foreground mt-1" style={smallLabel}>
                Sidebar: {collapsed1 ? "collapsed (40px)" : "expanded (200px)"}
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* 2 — Sellsuki: collapsed demo (hamburger from TopNavbar) */}
      <Section
        title="Sellsuki — Collapsed State"
        description="collapsed=true → Sidebar ย่อเหลือ 64px | brand.logoFull ถูกคลิปที่ 40px แสดงเฉพาะ icon ส่วน | nav item แสดง icon พร้อม Tooltip"
        code={`// collapsed mode — hamburger จาก TopNavbar controls this
<Sidebar
  brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
  groups={groups}
  activeItem={active}
  collapsed={true}
  showCollapseToggle={false}  // hamburger ใน TopNavbar เป็น single source of truth
  utilityItems={utilityItems}
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <div className="flex rounded-[var(--radius-md)] overflow-hidden" style={{ height: 440 }}>
            <Sidebar
              brand={{ name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }}
              groups={SELLSUKI_GROUPS}
              activeItem={active2}
              onNavigate={(item) => setActive2(item.id)}
              collapsed={collapsed2}
              onCollapsedChange={setCollapsed2}
              showCollapseToggle={false}
              utilityItems={UTILITY_ITEMS}
              version="v0.8.4"
            />
            <div className="flex-1 bg-[var(--bg-page,#f3f4f6)] p-6 overflow-auto">
              <div className="text-foreground font-bold mb-2" style={fontLabelBold}>
                Sidebar: {collapsed2 ? "collapsed ← icon-only" : "expanded ← logoFull visible"}
              </div>
              <button
                className="px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground cursor-pointer"
                style={fontLabelBold}
                onClick={() => setCollapsed2((v) => !v)}
              >
                Toggle sidebar
              </button>
              <div className="text-muted-foreground mt-3" style={smallLabel}>
                (ใน AppShell จริง — hamburger ใน TopNavbar จะเป็นตัว toggle แทน)
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* 3 — Patona orange theme */}
      <Section
        title="Patona — Orange Theme (data-product)"
        description="ครอบ Sidebar ใน data-product='patona' → --sidebar-primary: #EC5E2A | active item: orange text + orange accent bg"
        code={`// CSS: [data-product="patona"] { --primary: #EC5E2A; --sidebar-primary: #EC5E2A; ... }
<div data-product="patona">
  <Sidebar
    brand={{ name: "Patona", logoFull: <PatonaFull height={40} /> }}
    groups={patonaGroups}
    activeItem="jobs"
    onNavigate={(item) => setActive(item.id)}
    utilityItems={[
      { id: "help", label: "ช่วยเหลือ", icon: <HelpCircle size={18} /> },
    ]}
  />
</div>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <div className="flex rounded-[var(--radius-md)] overflow-hidden" style={{ height: 380 }}>
            <div data-product="patona" className="flex h-full">
              <Sidebar
                brand={{ name: "Patona", logoFull: <PatonaFull height={40} /> }}
                groups={PATONA_GROUPS}
                activeItem={active3}
                onNavigate={(item) => setActive3(item.id)}
                collapsed={collapsed3}
                onCollapsedChange={setCollapsed3}
                showCollapseToggle
                utilityItems={[{ id: "help", label: "ช่วยเหลือ", icon: <HelpCircle size={18} /> }]}
                version="v1.2.0"
              />
            </div>
            <div className="flex-1 p-6 overflow-auto" style={{ background: "#FFF7F0" }}>
              <div className="text-foreground font-bold mb-1" style={fontLabelBold}>Patona Content</div>
              <div className="text-muted-foreground" style={fontLabel}>Active: <strong>{active3}</strong></div>
              <div className="mt-3 px-3 py-2 rounded-[var(--radius-md)] border" style={{ borderColor: "#EC5E2A", color: "#EC5E2A", fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>
                Primary color: #EC5E2A via [data-product="patona"]
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "brand.logoFull", type: "ReactNode", def: "—", desc: "Icon+name SVG (variable × 40px) — expanded แสดงเต็ม, collapsed คลิปที่ 40px" },
        { prop: "brand.logo", type: "string", def: "—", desc: "URL ของ icon-only image — fallback เมื่อไม่มี logoFull" },
        { prop: "brand.name", type: "string", def: "—", desc: "ชื่อ brand — ใช้เป็น initial fallback เมื่อไม่มี logo" },
        { prop: "groups", type: "SidebarGroup[]", def: "—", desc: "Nav groups แต่ละ group มี label + items[]" },
        { prop: "activeItem", type: "string", def: "—", desc: "ID ของ item ที่ active — highlight ด้วย sidebar-primary color" },
        { prop: "collapsed", type: "boolean", def: "false", desc: "true = icon-only mode (64px width)" },
        { prop: "showCollapseToggle", type: "boolean", def: "false", desc: "แสดง toggle button ใน sidebar footer — default false (hamburger ใน TopNavbar แทน)" },
        { prop: "utilityItems", type: "SidebarItem[]", def: "—", desc: "Items ที่ footer (Help, Settings) — คั่นด้วย border-t" },
        { prop: "version", type: "string", def: "—", desc: "Version string แสดงที่ footer" },
        { prop: "width", type: "string", def: "200px", desc: "Sidebar width (200–320px range)" },
        { prop: "onCollapsedChange", type: "(v: boolean) => void", def: "—", desc: "Callback เมื่อ collapsed state เปลี่ยน" },
        { prop: "onNavigate", type: "(item: SidebarItem) => void", def: "—", desc: "Callback เมื่อคลิก nav item" },
      ]} />
    </div>
  );
}
