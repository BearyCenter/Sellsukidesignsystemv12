import React, { useState } from "react";
import {
  Layers, ShoppingCart, Package, BarChart3, Settings, Users, Plus,
  Briefcase, Building2, HelpCircle, FileText, Boxes,
  Truck, MapPin, Clock, Calendar, Globe, RefreshCw, CreditCard, QrCode, Wallet, UserCheck,
} from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { AppShellSkeleton } from "../../lib/shell/AppShell";
import { FeaturePageScaffold, ScaffoldKPIRow, ScaffoldSection } from "../../lib/shell/FeaturePageScaffold";
import {
  sellsukiBrandConfig, patonaBrandConfig, shipmunkBrandConfig,
  akitaBrandConfig, oc2plusBrandConfig, sellsukiPayBrandConfig,
} from "../../lib/types/shell";
import { DSButton } from "../../lib/components/ds-button";
import { Badge } from "../../lib/components/ds-badge";
import { TopNavbar } from "../../lib/components/ds-topnavbar";
import { Sidebar } from "../../lib/components/ds-sidebar";
import SellsukiIcon from "../../imports/SellsukiIcon";
import PatonaIcon from "../../imports/PatonaIcon";
import ShipmunkIcon from "../../imports/ShipmunkIcon";
import AkitaIcon from "../../imports/AkitaIcon";
import Oc2plusIcon from "../../imports/Oc2plusIcon";
import SellsukiPayIcon from "../../imports/SellsukiPayIcon";

// ─── Nav groups per brand ─────────────────────────────────────────────────────

const SSK_GROUPS = [
  {
    label: "ร้านค้า",
    items: [
      { id: "orders",    label: "ออเดอร์",   icon: <ShoppingCart size={18} />, badge: "12" as string | number },
      { id: "products",  label: "สินค้า",    icon: <Package size={18} /> },
      { id: "customers", label: "ลูกค้า",    icon: <Users size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "analytics", label: "ภาพรวม",   icon: <BarChart3 size={18} /> },
      { id: "inventory", label: "สต็อก",    icon: <Boxes size={18} /> },
    ],
  },
];

const PATONA_GROUPS = [
  {
    label: "งาน",
    items: [
      { id: "jobs",     label: "งานทั้งหมด", icon: <Briefcase size={18} />, badge: "3" as string | number },
      { id: "partners", label: "พาร์ทเนอร์", icon: <Building2 size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "reports",   label: "รายงาน",   icon: <BarChart3 size={18} /> },
      { id: "documents", label: "เอกสาร",   icon: <FileText size={18} /> },
    ],
  },
];

const SHIPMUNK_GROUPS = [
  {
    label: "จัดส่ง",
    items: [
      { id: "shipments", label: "พัสดุทั้งหมด", icon: <Truck size={18} />, badge: "8" as string | number },
      { id: "tracking",  label: "ติดตามพัสดุ",  icon: <MapPin size={18} /> },
      { id: "couriers",  label: "ขนส่ง",        icon: <Package size={18} /> },
    ],
  },
  {
    label: "รายงาน",
    items: [
      { id: "ship-stat", label: "สถิติการส่ง",  icon: <BarChart3 size={18} /> },
      { id: "ship-cost", label: "ค่าใช้จ่าย",   icon: <FileText size={18} /> },
    ],
  },
];

const AKITA_GROUPS = [
  {
    label: "HR",
    items: [
      { id: "employees",  label: "พนักงาน",   icon: <Users size={18} />, badge: "48" as string | number },
      { id: "attendance", label: "เข้างาน",   icon: <Clock size={18} /> },
      { id: "leaves",     label: "ลาหยุด",    icon: <Calendar size={18} /> },
    ],
  },
  {
    label: "การเงิน",
    items: [
      { id: "payroll",  label: "เงินเดือน",   icon: <Wallet size={18} /> },
      { id: "hr-report",label: "รายงาน HR",   icon: <BarChart3 size={18} /> },
    ],
  },
];

const OC2PLUS_GROUPS = [
  {
    label: "ช่องทางขาย",
    items: [
      { id: "channels",  label: "ทุกช่องทาง",   icon: <Globe size={18} />, badge: "3" as string | number },
      { id: "listings",  label: "สินค้า listing", icon: <Package size={18} /> },
      { id: "oc2-sync",  label: "ซิงค์",         icon: <RefreshCw size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "oc2-orders", label: "ออเดอร์รวม",  icon: <ShoppingCart size={18} /> },
      { id: "oc2-report", label: "รายงาน",       icon: <BarChart3 size={18} /> },
    ],
  },
];

const SELLSUKIPAY_GROUPS = [
  {
    label: "ชำระเงิน",
    items: [
      { id: "pay-overview", label: "ภาพรวม",       icon: <CreditCard size={18} />, badge: "5" as string | number },
      { id: "pay-txn",      label: "รายการชำระ",    icon: <FileText size={18} /> },
      { id: "pay-qr",       label: "QR Payment",    icon: <QrCode size={18} /> },
    ],
  },
  {
    label: "การเงิน",
    items: [
      { id: "pay-payout",  label: "ยอดโอน",        icon: <Wallet size={18} /> },
      { id: "pay-history", label: "ประวัติ",         icon: <BarChart3 size={18} /> },
    ],
  },
];

const UTILITY_ITEMS = [
  { id: "help",      label: "ช่วยเหลือ",  icon: <HelpCircle size={18} /> },
  { id: "settings2", label: "ตั้งค่าระบบ", icon: <Settings size={18} /> },
];

// ─── Content pages per brand ──────────────────────────────────────────────────

const H4 = { fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: 700 } as React.CSSProperties;
const H3VAL = { fontFamily: "var(--font-label)", fontSize: "var(--text-h3)", fontWeight: 700 } as React.CSSProperties;

function KPIGrid({ cols = 3, items }: { cols?: number; items: { label: string; value: string; color: string }[] }) {
  return (
    <div className={`grid grid-cols-${cols} gap-3`}>
      {items.map((s) => (
        <div key={s.label} className="p-3 rounded-[var(--radius-md)] bg-card border border-border">
          <div style={smallLabel} className="text-muted-foreground">{s.label}</div>
          <div style={{ ...H3VAL, color: s.color }}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}

function TableMock({ headers, rows, primaryCol = 0 }: { headers: string[]; rows: string[][]; primaryCol?: number }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-card border border-border overflow-hidden">
      <div className="px-4 py-2.5 bg-muted/30 border-b border-border flex gap-4">
        {headers.map((h) => <div key={h} style={smallLabel} className="text-muted-foreground flex-1">{h}</div>)}
      </div>
      {rows.map((row, i) => (
        <div key={i} className="px-4 py-2.5 border-b border-border last:border-0 flex gap-4 items-center hover:bg-muted/20 transition-colors">
          {row.map((cell, j) => (
            <div key={j} style={fontLabel} className={`flex-1 ${j === primaryCol ? "text-primary font-medium" : "text-foreground"}`}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PageTop({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div style={H4} className="text-foreground">{title}</div>
        <div style={smallLabel} className="text-muted-foreground">{subtitle}</div>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle}>
        <Plus size={14} /><span>สร้างใหม่</span>
      </div>
    </div>
  );
}

// Sellsuki — e-commerce order management
function OrdersPage() {
  return (
    <div className="p-5 space-y-4">
      <PageTop title="ออเดอร์" subtitle="จัดการออเดอร์ทั้งหมด" />
      <KPIGrid cols={3} items={[
        { label: "ออเดอร์วันนี้", value: "284",   color: "var(--chart-1)" },
        { label: "รอดำเนินการ",   value: "47",    color: "var(--chart-5)" },
        { label: "รายได้รวม",     value: "฿284K", color: "var(--chart-2)" },
      ]} />
      <TableMock
        headers={["#", "ลูกค้า", "สินค้า", "สถานะ"]}
        rows={[
          ["#1001", "กัญญา ม.",    "สินค้า A x2", "ชำระแล้ว"],
          ["#1002", "สมชาย ว.",    "สินค้า B x1", "รอจัดส่ง"],
          ["#1003", "พรทิพย์ ส.", "สินค้า C x5", "กำลังส่ง"],
        ]}
      />
    </div>
  );
}

// Patona — freelance job & partner management
function JobsPage() {
  return (
    <div className="p-5 space-y-4">
      <PageTop title="งานทั้งหมด" subtitle="จัดการงานและ timeline" />
      <KPIGrid cols={2} items={[
        { label: "งานทั้งหมด",    value: "142", color: "var(--primary)" },
        { label: "กำลังดำเนินการ", value: "23",  color: "var(--primary)" },
      ]} />
      <TableMock
        headers={["งาน", "พาร์ทเนอร์", "สถานะ"]}
        rows={[
          ["งาน A-001", "พาร์ทเนอร์ Alpha", "กำลังดำเนินการ"],
          ["งาน A-002", "พาร์ทเนอร์ Beta",  "รอดำเนินการ"],
          ["งาน A-003", "พาร์ทเนอร์ Gamma", "เสร็จแล้ว"],
        ]}
      />
    </div>
  );
}

// Shipmunk — logistics & parcel tracking
function ShipmentsPage() {
  return (
    <div className="p-5 space-y-4">
      <PageTop title="พัสดุทั้งหมด" subtitle="ติดตามสถานะและจัดการการจัดส่ง" />
      <KPIGrid cols={2} items={[
        { label: "พัสดุวันนี้",  value: "847", color: "var(--primary)" },
        { label: "กำลังส่ง",    value: "312", color: "var(--chart-1)" },
        { label: "จัดส่งแล้ว", value: "535", color: "var(--chart-2)" },
        { label: "รอรับสินค้า", value: "28",  color: "var(--chart-5)" },
      ]} />
      <TableMock
        headers={["เลขพัสดุ", "ลูกค้า", "ขนส่ง", "สถานะ"]}
        rows={[
          ["SHIP-8801", "กัญญา ม.",   "KERRY",  "กำลังส่ง"],
          ["SHIP-8802", "สมชาย ว.",   "FLASH",  "รับแล้ว"],
          ["SHIP-8803", "พรทิพย์ ส.", "J&T",    "รอรับ"],
        ]}
      />
    </div>
  );
}

// Akita — HR & employee management
function EmployeesPage() {
  return (
    <div className="p-5 space-y-4">
      <PageTop title="พนักงาน" subtitle="จัดการทีมและตรวจสอบการเข้างาน" />
      <KPIGrid cols={2} items={[
        { label: "พนักงานทั้งหมด", value: "48", color: "var(--primary)" },
        { label: "เข้างานวันนี้",  value: "42", color: "var(--chart-2)" },
        { label: "ลาวันนี้",       value: "3",  color: "var(--chart-5)" },
        { label: "ทำ OT",          value: "8",  color: "var(--chart-1)" },
      ]} />
      <TableMock
        headers={["ชื่อ", "ตำแหน่ง", "สถานะวันนี้"]}
        rows={[
          ["สมชาย ก.",   "Developer",    "เข้างานแล้ว"],
          ["กัญญา ม.",   "Designer",     "Work from home"],
          ["พรทิพย์ ส.", "Product Lead", "ลาป่วย"],
        ]}
      />
    </div>
  );
}

// OC2 Plus — omnichannel & marketplace management
function ChannelsPage() {
  return (
    <div className="p-5 space-y-4">
      <PageTop title="ช่องทางขาย" subtitle="บริหาร listing และซิงค์ออเดอร์ทุกแพลตฟอร์ม" />
      <KPIGrid cols={2} items={[
        { label: "ช่องทาง active", value: "5",     color: "var(--primary)" },
        { label: "ออเดอร์รวม",    value: "1,240", color: "var(--chart-1)" },
        { label: "สินค้า active",  value: "890",   color: "var(--chart-2)" },
        { label: "ซิงค์ล้มเหลว", value: "3",     color: "var(--chart-5)" },
      ]} />
      <TableMock
        headers={["แพลตฟอร์ม", "ออเดอร์", "สถานะ"]}
        rows={[
          ["Shopee",       "480", "ซิงค์แล้ว"],
          ["Lazada",       "310", "ซิงค์แล้ว"],
          ["TikTok Shop",  "290", "ซิงค์แล้ว"],
          ["Line Shopping","160", "รอซิงค์"],
        ]}
      />
    </div>
  );
}

// SellsukiPay — payment & settlement dashboard
function PaymentsPage() {
  return (
    <div className="p-5 space-y-4">
      <PageTop title="ภาพรวมการชำระเงิน" subtitle="ติดตามยอดรับและสถานะการโอน" />
      <KPIGrid cols={2} items={[
        { label: "ยอดรับวันนี้", value: "฿128K", color: "var(--primary)" },
        { label: "รอโอน",        value: "฿45K",  color: "var(--chart-5)" },
        { label: "โอนแล้ว",      value: "฿83K",  color: "var(--chart-2)" },
        { label: "รายการสำเร็จ", value: "234",   color: "var(--chart-1)" },
      ]} />
      <TableMock
        headers={["Ref", "ลูกค้า", "จำนวน", "สถานะ"]}
        rows={[
          ["PAY-5501", "กัญญา ม.",   "฿4,500", "สำเร็จ"],
          ["PAY-5502", "สมชาย ว.",   "฿1,200", "รอโอน"],
          ["PAY-5503", "พรทิพย์ ส.", "฿8,900", "สำเร็จ"],
        ]}
      />
    </div>
  );
}

// ─── Brand meta map ───────────────────────────────────────────────────────────

type ProductId = "sellsuki" | "patona" | "shipmunk" | "akita" | "oc2plus" | "sellsukipay";

const BRAND_META: Record<ProductId, {
  color: string;
  groups: typeof SSK_GROUPS;
  defaultActive: string;
  notificationCount: number;
  userName: string;
  ContentPage: React.ComponentType;
  labelMap: Record<string, string>;
}> = {
  sellsuki: {
    color: "#32A9FF",
    groups: SSK_GROUPS,
    defaultActive: "orders",
    notificationCount: 5,
    userName: "ณัฐกร สิริ",
    ContentPage: OrdersPage,
    labelMap: { orders: "ออเดอร์", products: "สินค้า", customers: "ลูกค้า", analytics: "ภาพรวม", inventory: "สต็อก" },
  },
  patona: {
    color: "#EC5E2A",
    groups: PATONA_GROUPS,
    defaultActive: "jobs",
    notificationCount: 3,
    userName: "ทีม Patona",
    ContentPage: JobsPage,
    labelMap: { jobs: "งาน", partners: "พาร์ทเนอร์", reports: "รายงาน", documents: "เอกสาร" },
  },
  shipmunk: {
    color: "#06C5F9",
    groups: SHIPMUNK_GROUPS,
    defaultActive: "shipments",
    notificationCount: 8,
    userName: "ทีม Shipmunk",
    ContentPage: ShipmentsPage,
    labelMap: { shipments: "พัสดุทั้งหมด", tracking: "ติดตาม", couriers: "ขนส่ง", "ship-stat": "สถิติ", "ship-cost": "ค่าใช้จ่าย" },
  },
  akita: {
    color: "#1769E2",
    groups: AKITA_GROUPS,
    defaultActive: "employees",
    notificationCount: 2,
    userName: "HR Team",
    ContentPage: EmployeesPage,
    labelMap: { employees: "พนักงาน", attendance: "เข้างาน", leaves: "ลาหยุด", payroll: "เงินเดือน", "hr-report": "รายงาน" },
  },
  oc2plus: {
    color: "#32A9FF",
    groups: OC2PLUS_GROUPS,
    defaultActive: "channels",
    notificationCount: 3,
    userName: "OC2 Admin",
    ContentPage: ChannelsPage,
    labelMap: { channels: "ช่องทาง", listings: "สินค้า", "oc2-sync": "ซิงค์", "oc2-orders": "ออเดอร์", "oc2-report": "รายงาน" },
  },
  sellsukipay: {
    color: "#32A9FF",
    groups: SELLSUKIPAY_GROUPS,
    defaultActive: "pay-overview",
    notificationCount: 5,
    userName: "Finance Team",
    ContentPage: PaymentsPage,
    labelMap: { "pay-overview": "ภาพรวม", "pay-txn": "รายการ", "pay-qr": "QR", "pay-payout": "โอน", "pay-history": "ประวัติ" },
  },
};

// ─── MiniShell — live AppShell preview ───────────────────────────────────────

interface MiniShellProps { product: ProductId; }

function MiniShell({ product }: MiniShellProps) {
  const meta = BRAND_META[product];
  const config = { sellsuki: sellsukiBrandConfig, patona: patonaBrandConfig, shipmunk: shipmunkBrandConfig, akita: akitaBrandConfig, oc2plus: oc2plusBrandConfig, sellsukipay: sellsukiPayBrandConfig }[product];

  const [activeItem, setActiveItem] = useState(meta.defaultActive);
  const [collapsed, setCollapsed] = useState(false);

  const navbarBrand = { name: config.brand.name, logoFull: config.brand.logoFull, logo: config.brand.logo };
  const breadcrumbLabel = meta.labelMap[activeItem] ?? activeItem;
  const { ContentPage } = meta;

  return (
    <div data-product={product} className="flex flex-col h-full bg-background" style={{ fontFamily: "var(--font-label)" }}>
      <div className="flex-shrink-0">
        <TopNavbar
          brand={navbarBrand}
          breadcrumbs={[{ label: "หน้าหลัก" }, { label: breadcrumbLabel }]}
          searchMode="bar"
          notificationCount={meta.notificationCount}
          user={{ name: meta.userName }}
          onSidebarToggle={() => setCollapsed((v) => !v)}
          onNotificationClick={() => {}}
          onUserClick={() => {}}
        />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          groups={meta.groups}
          activeItem={activeItem}
          onNavigate={(item) => setActiveItem(item.id)}
          collapsed={collapsed}
          showCollapseToggle={false}
          utilityItems={UTILITY_ITEMS}
          version="v0.8.4"
        />
        {/* background inherits from [data-product] bg-background — no override needed */}
        <main className="flex-1 overflow-auto">
          <ContentPage />
        </main>
      </div>
    </div>
  );
}

// ─── Code examples ────────────────────────────────────────────────────────────

const APPSHELL_CODE = `import "@uxuissk/design-system/styles.css";
import {
  AppShell, sellsukiBrandConfig,
  FeaturePageScaffold, ScaffoldKPIRow,
  PageHeader, StatCard, FilterBar,
} from "@uxuissk/design-system";

async function buildNav(user) {
  return [
    {
      id: "store",
      label: "ร้านค้า",
      items: [
        { id: "orders", label: "ออเดอร์", href: "/orders", icon: "ShoppingCart" },
        { id: "products", label: "สินค้า", href: "/products", icon: "Package" },
      ],
    },
  ];
}

<AppShell
  product={sellsukiBrandConfig}
  user={currentUser}
  navResolver={buildNav}
  activeItemId="orders"
  onNavigate={(item) => router.push(item.href!)}
  notificationCount={5}
  searchMode="bar"
>
  <FeaturePageScaffold
    layout="list"
    header={
      <PageHeader
        title="ออเดอร์"
        breadcrumbs={[{ label: "หน้าหลัก", href: "/" }, { label: "ออเดอร์" }]}
        primaryAction={{ label: "สร้างออเดอร์", icon: <Plus size={16} /> }}
      />
    }
    stats={
      <ScaffoldKPIRow>
        <StatCard title="ออเดอร์วันนี้" value="284" trend={{ value: 12, direction: "up" }} />
        <StatCard title="รายได้วันนี้" value="฿48,200" trend={{ value: 8, direction: "up" }} />
      </ScaffoldKPIRow>
    }
    content={<AdvancedDataTable columns={cols} data={orders} loading={isLoading} />}
  />
</AppShell>

// While session loading:
<AppShellSkeleton />`;

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function AppShellShowcase() {
  const [activeProduct, setActiveProduct] = useState<ProductId>("sellsuki");
  const [skeletonKey, setSkeletonKey] = useState(0);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.appshell.title" descKey="page.appshell.desc" />

      {/* ── LIVE PREVIEW ──────────────────────────────────────────────────── */}
      <Section
        title="Live Shell Preview — ทุก Product"
        description="AppShell จริงของแต่ละ brand — TopNavbar + Sidebar + content ที่แตกต่างตาม service | คลิก hamburger เพื่อ collapse | คลิก nav item เพื่อเปลี่ยนหน้า"
      >
        {/* Product switcher */}
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            { id: "sellsuki"    as ProductId, label: "Sellsuki",    color: "#32A9FF", icon: <SellsukiIcon size={16} /> },
            { id: "patona"      as ProductId, label: "Patona",      color: "#EC5E2A", icon: <PatonaIcon size={16} /> },
            { id: "shipmunk"    as ProductId, label: "Shipmunk",    color: "#06C5F9", icon: <ShipmunkIcon height={16} /> },
            { id: "akita"       as ProductId, label: "Akita",       color: "#1769E2", icon: <AkitaIcon height={16} /> },
            { id: "oc2plus"     as ProductId, label: "OC2 Plus",    color: "#32A9FF", icon: <Oc2plusIcon height={16} /> },
            { id: "sellsukipay" as ProductId, label: "SellsukiPay", color: "#32A9FF", icon: <SellsukiPayIcon height={16} /> },
          ]).map(({ id, label, color, icon }) => (
            <button
              key={id}
              onClick={() => setActiveProduct(id)}
              className="px-3 py-1.5 rounded-[var(--radius-md)] border transition-colors cursor-pointer flex items-center gap-2"
              style={{
                ...btnStyle,
                borderColor: activeProduct === id ? color : "var(--border)",
                background:  activeProduct === id ? `${color}0e` : "var(--background)",
                color:       activeProduct === id ? color : "var(--muted-foreground)",
                fontWeight:  activeProduct === id ? 700 : 400,
              }}
            >
              <span style={{ display: "inline-flex", width: 16, height: 16, alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                {icon}
              </span>
              {label}
            </button>
          ))}
        </div>

        {/* Live preview — native size, fixed height with overflow hidden */}
        <div
          className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border"
          style={{ height: 580, background: "var(--background)" }}
        >
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <MiniShell key={activeProduct} product={activeProduct} />
          </div>
        </div>

        {/* Hint */}
        <div className="mt-3 text-muted-foreground text-center" style={smallLabel}>
          คลิก hamburger (☰) เพื่อ collapse sidebar · คลิก nav item เพื่อเปลี่ยน content
        </div>
      </Section>

      {/* ── PRODUCT BRAND CONFIGS ─────────────────────────────────────────── */}
      <Section
        title="Product Brand Configs"
        description="เปลี่ยน product prop เดียว → ทุกอย่าง (logo, สี, theme token) เปลี่ยนตามทันที"
        code={`// Sellsuki (sky-blue primary)
import { sellsukiBrandConfig } from "@uxuissk/design-system";
<AppShell product={sellsukiBrandConfig} ...>

// Patona (aerospace orange #EC5E2A)
import { patonaBrandConfig } from "@uxuissk/design-system";
<AppShell product={patonaBrandConfig} ...>

// Custom brand
const myBrand: ProductBrandConfig = {
  product: "sellsuki",
  brand: {
    name: "My Store",
    logoFull: <MyLogoFull />,   // icon+name SVG (variable × 40px)
    logo: <MyIcon />,           // icon-only (40×40)
  },
  shell: { sidebarDefaultOpen: true },
};`}
      >
        <DemoBox className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Sellsuki */}
          <div className="p-4 rounded-[var(--radius-md)] border border-primary/40 bg-primary/5 flex items-center gap-4">
            <div className="w-10 h-10 flex-shrink-0">
              <SellsukiIcon size={40} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground" style={fontLabelBold}>sellsukiBrandConfig</div>
              <div className="text-muted-foreground truncate" style={smallLabel}>Primary: sky-blue #32A9FF</div>
            </div>
            <Badge variant="default">Active</Badge>
          </div>
          {/* Patona */}
          <div className="p-4 rounded-[var(--radius-md)] border border-border bg-card flex items-center gap-4">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <PatonaIcon size={40} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground" style={fontLabelBold}>patonaBrandConfig</div>
              <div className="text-muted-foreground truncate" style={smallLabel}>Primary: aerospace orange #EC5E2A</div>
            </div>
          </div>
          {/* sukispace */}
          <div className="p-4 rounded-[var(--radius-md)] border border-dashed border-border bg-muted/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-muted flex items-center justify-center">
              <Layers size={18} className="text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold text-muted-foreground" style={fontLabelBold}>sukispaceBrandConfig</div>
              <div className="text-muted-foreground" style={smallLabel}>Space management platform</div>
            </div>
          </div>
          {/* shipmunk */}
          <div className="p-4 rounded-[var(--radius-md)] border border-dashed border-border bg-muted/20 flex items-center gap-4">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-muted flex items-center justify-center">
              <Package size={18} className="text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold text-muted-foreground" style={fontLabelBold}>shipmunkBrandConfig</div>
              <div className="text-muted-foreground" style={smallLabel}>Shipping management platform</div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* ── APPSHELL SKELETON ─────────────────────────────────────────────── */}
      <Section
        title="AppShellSkeleton — Loading State"
        description="แสดง skeleton ของ AppShell ระหว่างที่ session กำลังโหลด"
        code={`if (sessionLoading) return <AppShellSkeleton />;`}
      >
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden" style={{ height: 160 }}>
          <div style={{ transform: "scale(0.6)", transformOrigin: "top left", width: "167%", height: "267px", pointerEvents: "none" }}>
            <AppShellSkeleton key={skeletonKey} />
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <DSButton variant="outline" size="sm" onClick={() => setSkeletonKey((k) => k + 1)}>
            Replay Skeleton
          </DSButton>
        </div>
      </Section>

      {/* ── FEATUREPAGESCAFFOLD list ───────────────────────────────────────── */}
      <Section
        title='FeaturePageScaffold — layout="list"'
        description="Layout หลักสำหรับหน้า list/table เช่น ออเดอร์ สินค้า ลูกค้า"
        code={`<FeaturePageScaffold
  layout="list"
  header={<PageHeader title="ออเดอร์" primaryAction={{ label: "สร้างออเดอร์" }} />}
  stats={<ScaffoldKPIRow>...</ScaffoldKPIRow>}
  filters={<FilterBar filters={[...]} />}
  content={<AdvancedDataTable ... />}
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <FeaturePageScaffold
            layout="list"
            header={
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <div className="text-foreground font-bold" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700" }}>ออเดอร์</div>
                  <div className="text-muted-foreground" style={fontLabel}>จัดการออเดอร์ทั้งหมด</div>
                </div>
                <DSButton size="sm"><Plus size={14} className="mr-1" />สร้างออเดอร์</DSButton>
              </div>
            }
            stats={
              <ScaffoldKPIRow>
                {[
                  { label: "ออเดอร์วันนี้", value: "284", color: "var(--chart-1)" },
                  { label: "รอดำเนินการ", value: "47", color: "var(--chart-5)" },
                  { label: "จัดส่งแล้ว", value: "1,823", color: "var(--chart-2)" },
                  { label: "รายได้รวม", value: "฿284K", color: "var(--chart-4)" },
                ].map((stat) => (
                  <div key={stat.label} className="flex-1 px-5 py-3 border border-border rounded-[var(--radius-md)] bg-card">
                    <div className="text-muted-foreground" style={smallLabel}>{stat.label}</div>
                    <div className="font-bold mt-0.5" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700", color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </ScaffoldKPIRow>
            }
            content={
              <div className="px-6 py-8 flex items-center justify-center text-muted-foreground" style={fontLabel}>
                [AdvancedDataTable แสดงที่นี่]
              </div>
            }
          />
        </DemoBox>
      </Section>

      {/* ── FEATUREPAGESCAFFOLD dashboard ─────────────────────────────────── */}
      <Section
        title='FeaturePageScaffold — layout="dashboard"'
        description="Layout สำหรับหน้า dashboard มี chart area หลักและ widget area"
        code={`<FeaturePageScaffold
  layout="dashboard"
  header={<PageHeader title="Dashboard" />}
  stats={<ScaffoldKPIRow>...</ScaffoldKPIRow>}
  chart={<AreaChart ... />}
  widgets={[<DonutChart ... />, <BarChart ... />]}
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <FeaturePageScaffold
            layout="dashboard"
            header={
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="font-bold text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700" }}>Dashboard</div>
                <Badge variant="secondary">เดือนนี้</Badge>
              </div>
            }
            charts={
              <div className="h-40 flex items-center justify-center bg-muted/20 rounded-[var(--radius-md)] border border-dashed border-border text-muted-foreground" style={fontLabel}>
                [LineChart / AreaChart]
              </div>
            }
            widgets={[
              <div key="w1" className="h-32 flex flex-col items-center justify-center bg-muted/20 rounded-[var(--radius-md)] border border-dashed border-border text-muted-foreground" style={fontLabel}>
                <BarChart3 size={20} className="mb-1" /> [BarChart]
              </div>,
              <div key="w2" className="h-32 flex flex-col items-center justify-center bg-muted/20 rounded-[var(--radius-md)] border border-dashed border-border text-muted-foreground" style={fontLabel}>
                <Users size={20} className="mb-1" /> [DonutChart]
              </div>,
            ]}
          />
        </DemoBox>
      </Section>

      {/* ── FEATUREPAGESCAFFOLD settings ──────────────────────────────────── */}
      <Section
        title='FeaturePageScaffold — layout="settings"'
        description="Layout สำหรับหน้า settings แสดงเนื้อหาเป็น section ซ้อนกัน"
        code={`<FeaturePageScaffold
  layout="settings"
  header={<PageHeader title="ตั้งค่าร้านค้า" />}
  sections={
    <>
      <ScaffoldSection title="ข้อมูลร้าน">...</ScaffoldSection>
      <ScaffoldSection title="การแจ้งเตือน">...</ScaffoldSection>
    </>
  }
/>`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <FeaturePageScaffold
            layout="settings"
            header={
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <Settings size={18} className="text-muted-foreground" />
                <div className="font-bold text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700" }}>ตั้งค่าร้านค้า</div>
              </div>
            }
            sections={
              <>
                <ScaffoldSection title="ข้อมูลร้านค้า">
                  <div className="text-muted-foreground py-3" style={fontLabel}>ชื่อร้าน, โลโก้, ที่อยู่ ...</div>
                </ScaffoldSection>
                <ScaffoldSection title="การแจ้งเตือน">
                  <div className="text-muted-foreground py-3" style={fontLabel}>อีเมล, LINE, Webhook ...</div>
                </ScaffoldSection>
                <ScaffoldSection title="การชำระเงิน">
                  <div className="text-muted-foreground py-3" style={fontLabel}>บัญชีธนาคาร, QR PromptPay ...</div>
                </ScaffoldSection>
              </>
            }
          />
        </DemoBox>
      </Section>

      {/* ── FULL CODE EXAMPLE ─────────────────────────────────────────────── */}
      <Section
        title="Full AppShell Code Example"
        description="ตัวอย่าง code การใช้งาน AppShell ครบวงจรในโปรเจกต์จริง"
        code={APPSHELL_CODE}
      >
        <DemoBox>
          <div className="text-muted-foreground text-center py-4" style={fontLabel}>
            ดู code example ด้านบน — AppShell ต้องใช้ใน root ของ app จึงไม่แสดงใน inline demo
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "product", type: "ProductBrandConfig", def: "—", desc: "Brand config — sellsukiBrandConfig | patonaBrandConfig | ..." },
        { prop: "user", type: "ShellUser", def: "—", desc: "{ name, email, avatar?, role? }" },
        { prop: "navResolver", type: "NavResolver", def: "—", desc: "async function → ShellSidebarGroup[] (permission-filtered)" },
        { prop: "activeItemId", type: "string", def: "—", desc: "ID ของ nav item ที่ active" },
        { prop: "onNavigate", type: "(item: NavItem) => void", def: "—", desc: "callback เมื่อคลิก nav item" },
        { prop: "notificationCount", type: "number", def: "0", desc: "Bell badge count — 0 = ซ่อน" },
        { prop: "searchMode", type: '"bar" | "icon" | "none"', def: '"none"', desc: "search bar mode ใน TopNavbar" },
        { prop: "onAppSwitcherClick", type: "() => void", def: "—", desc: "เมื่อมี → LayoutGrid icon ปรากฏใน TopNavbar" },
        { prop: "title", type: "string", def: "—", desc: "System name หลัง logo ใน TopNavbar" },
        { prop: "layout (Scaffold)", type: "FeaturePageLayout", def: "list", desc: "list | detail | settings | wizard | dashboard | form | report" },
        { prop: "header", type: "ReactNode", def: "—", desc: "PageHeader component" },
        { prop: "stats", type: "ReactNode", def: "—", desc: "ScaffoldKPIRow — stat card row" },
        { prop: "content", type: "ReactNode", def: "—", desc: "เนื้อหาหลัก (table, grid, cards)" },
      ]} />
    </div>
  );
}
