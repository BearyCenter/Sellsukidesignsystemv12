import React, { useState } from "react";
import {
  Layers, ShoppingCart, Package, BarChart3, Settings, Users, Plus,
  Briefcase, Building2, HelpCircle, FileText, Boxes,
} from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { AppShellSkeleton } from "../../lib/shell/AppShell";
import { FeaturePageScaffold, ScaffoldKPIRow, ScaffoldSection } from "../../lib/shell/FeaturePageScaffold";
import { sellsukiBrandConfig, patonaBrandConfig } from "../../lib/types/shell";
import { DSButton } from "../../lib/components/ds-button";
import { Badge } from "../../lib/components/ds-badge";
import { TopNavbar } from "../../lib/components/ds-topnavbar";
import { Sidebar } from "../../lib/components/ds-sidebar";
import SellsukiFull from "../../imports/SellsukiFull";
import SellsukiIcon from "../../imports/SellsukiIcon";
import PatonaIcon from "../../imports/PatonaIcon";
import PatonaFull from "../../imports/PatonaFull";

// ─── Nav groups for demo ──────────────────────────────────────────────────────

const SSK_GROUPS = [
  {
    label: "ร้านค้า",
    items: [
      { id: "orders", label: "ออเดอร์", icon: <ShoppingCart size={18} />, badge: "12" as string | number },
      { id: "products", label: "สินค้า", icon: <Package size={18} /> },
      { id: "customers", label: "ลูกค้า", icon: <Users size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "analytics", label: "ภาพรวม", icon: <BarChart3 size={18} /> },
      { id: "inventory", label: "สต็อก", icon: <Boxes size={18} /> },
    ],
  },
];

const PATONA_GROUPS = [
  {
    label: "งาน",
    items: [
      { id: "jobs", label: "งานทั้งหมด", icon: <Briefcase size={18} />, badge: "3" as string | number },
      { id: "partners", label: "พาร์ทเนอร์", icon: <Building2 size={18} /> },
    ],
  },
  {
    label: "วิเคราะห์",
    items: [
      { id: "reports", label: "รายงาน", icon: <BarChart3 size={18} /> },
      { id: "documents", label: "เอกสาร", icon: <FileText size={18} /> },
    ],
  },
];

const UTILITY_ITEMS = [
  { id: "help", label: "ช่วยเหลือ", icon: <HelpCircle size={18} /> },
  { id: "settings2", label: "ตั้งค่าระบบ", icon: <Settings size={18} /> },
];

// ─── Content mocks ────────────────────────────────────────────────────────────

function OrdersPage() {
  return (
    <div className="p-5 space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: 700 }} className="text-foreground">ออเดอร์</div>
          <div style={smallLabel} className="text-muted-foreground">จัดการออเดอร์ทั้งหมด</div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle}>
          <Plus size={14} /><span>สร้างออเดอร์</span>
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "ออเดอร์วันนี้", value: "284", color: "var(--chart-1)" },
          { label: "รอดำเนินการ", value: "47", color: "var(--chart-5)" },
          { label: "รายได้รวม", value: "฿284K", color: "var(--chart-2)" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-[var(--radius-md)] bg-card border border-border">
            <div style={smallLabel} className="text-muted-foreground">{s.label}</div>
            <div style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h3)", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      {/* Table mock */}
      <div className="rounded-[var(--radius-md)] bg-card border border-border overflow-hidden">
        <div className="px-4 py-2.5 bg-muted/30 border-b border-border flex gap-4">
          {["#", "ลูกค้า", "สินค้า", "สถานะ"].map((h) => (
            <div key={h} style={smallLabel} className="text-muted-foreground flex-1">{h}</div>
          ))}
        </div>
        {[
          ["#1001", "กัญญา ม.", "สินค้า A x2", "ชำระแล้ว"],
          ["#1002", "สมชาย ว.", "สินค้า B x1", "รอจัดส่ง"],
          ["#1003", "พรทิพย์ ส.", "สินค้า C x5", "กำลังส่ง"],
        ].map((row, i) => (
          <div key={i} className="px-4 py-2.5 border-b border-border last:border-0 flex gap-4 items-center hover:bg-muted/20 transition-colors">
            {row.map((cell, j) => (
              <div key={j} style={fontLabel} className={`flex-1 ${j === 0 ? "text-primary font-medium" : "text-foreground"}`}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function JobsPage() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: 700 }} className="text-foreground">งานทั้งหมด</div>
          <div style={smallLabel} className="text-muted-foreground">จัดการงานและ timeline</div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] cursor-pointer" style={{ ...btnStyle, background: "#EC5E2A", color: "white" }}>
          <Plus size={14} /><span>สร้างงาน</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "งานทั้งหมด", value: "142", color: "#EC5E2A" },
          { label: "กำลังดำเนินการ", value: "23", color: "#F07A52" },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-[var(--radius-md)] bg-card border border-border">
            <div style={smallLabel} className="text-muted-foreground">{s.label}</div>
            <div style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h3)", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-[var(--radius-md)] bg-card border border-border overflow-hidden">
        {[
          ["งาน A-001", "พาร์ทเนอร์ Alpha", "กำลังดำเนินการ"],
          ["งาน A-002", "พาร์ทเนอร์ Beta", "รอดำเนินการ"],
          ["งาน A-003", "พาร์ทเนอร์ Gamma", "เสร็จแล้ว"],
        ].map((row, i) => (
          <div key={i} className="px-4 py-3 border-b border-border last:border-0 flex gap-4 items-center hover:bg-muted/20 transition-colors">
            <div style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: 600, color: "#EC5E2A" }} className="flex-1">{row[0]}</div>
            <div style={fontLabel} className="flex-1 text-foreground">{row[1]}</div>
            <div style={smallLabel} className="text-muted-foreground">{row[2]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MiniShell — scaled live AppShell preview ────────────────────────────────

type ProductId = "sellsuki" | "patona";

interface MiniShellProps {
  product: ProductId;
}

function MiniShell({ product }: MiniShellProps) {
  const isSsk = product === "sellsuki";
  const [activeItem, setActiveItem] = useState(isSsk ? "orders" : "jobs");
  const [collapsed, setCollapsed] = useState(false);

  // TopNavbar shows full logo (icon + name). Sidebar has no brand logo — nav groups only.
  const navbarBrand = isSsk
    ? { name: "Sellsuki", logoFull: <SellsukiFull height={40} /> }
    : { name: "Patona", logoFull: <PatonaFull height={40} /> };

  const groups = isSsk ? SSK_GROUPS : PATONA_GROUPS;
  const bgPage = isSsk ? "var(--bg-page, #f3f4f6)" : "#FFF7F0";
  const notificationCount = isSsk ? 5 : 3;
  const userName = isSsk ? "ณัฐกร สิริ" : "ทีม Patona";
  const activeLabelMap: Record<string, string> = {
    orders: "ออเดอร์", products: "สินค้า", customers: "ลูกค้า",
    analytics: "ภาพรวม", inventory: "สต็อก",
    jobs: "งาน", partners: "พาร์ทเนอร์", reports: "รายงาน", documents: "เอกสาร",
  };
  const breadcrumbLabel = activeLabelMap[activeItem] ?? activeItem;

  return (
    <div
      data-product={product}
      className="flex flex-col h-full bg-background"
      style={{ fontFamily: "var(--font-label)" }}
    >
      {/* TopNavbar — icon-only brand (full logo lives in sidebar header) */}
      <div className="flex-shrink-0">
        <TopNavbar
          brand={navbarBrand}
          breadcrumbs={[{ label: "หน้าหลัก" }, { label: breadcrumbLabel }]}
          searchMode="bar"
          notificationCount={notificationCount}
          user={{ name: userName }}
          onSidebarToggle={() => setCollapsed((v) => !v)}
          onNotificationClick={() => {}}
          onUserClick={() => {}}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — no brand logo, nav groups only */}
        <Sidebar
          groups={groups}
          activeItem={activeItem}
          onNavigate={(item) => setActiveItem(item.id)}
          collapsed={collapsed}
          showCollapseToggle={false}
          utilityItems={UTILITY_ITEMS}
          version="v0.8.4"
        />

        {/* Content area */}
        <main className="flex-1 overflow-auto" style={{ background: bgPage }}>
          {isSsk
            ? <OrdersPage />
            : <JobsPage />
          }
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
        title="Live Shell Preview — Sellsuki & Patona"
        description="AppShell จริง — TopNavbar + Sidebar + content | คลิก hamburger เพื่อ collapse sidebar | คลิก nav item เพื่อเปลี่ยนหน้า"
      >
        {/* Product switcher */}
        <div className="flex gap-2 mb-4">
          {([
            { id: "sellsuki" as ProductId, label: "Sellsuki", color: "var(--primary)" },
            { id: "patona" as ProductId, label: "Patona", color: "#EC5E2A" },
          ]).map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProduct(p.id)}
              className={`px-4 py-2 rounded-[var(--radius-md)] border transition-colors cursor-pointer flex items-center gap-2`}
              style={{
                ...btnStyle,
                borderColor: activeProduct === p.id ? p.color : "var(--border)",
                background: activeProduct === p.id ? `${p.color}18` : "transparent",
                color: activeProduct === p.id ? p.color : "var(--text-secondary)",
                fontWeight: activeProduct === p.id ? 700 : 400,
              }}
            >
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ background: p.color }}
              />
              {p.label}
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
            <Badge variant="primary">Active</Badge>
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
            chart={
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
