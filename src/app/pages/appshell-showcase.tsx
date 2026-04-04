import React, { useState } from "react";
import { Layers, ShoppingCart, Package, BarChart3, Settings, Users, Plus } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { AppShellSkeleton } from "../../lib/shell/AppShell";
import { FeaturePageScaffold, ScaffoldKPIRow, ScaffoldSection } from "../../lib/shell/FeaturePageScaffold";
import { sellsukiBrandConfig, patonaBrandConfig } from "../../lib/types/shell";
import { DSButton } from "../../lib/components/ds-button";
import { Badge } from "../../lib/components/ds-badge";

// ─── Code Examples ────────────────────────────────────────────────────────────

const APPSHELL_CODE = `import "@uxuissk/design-system/styles.css";
import {
  AppShell, sellsukiBrandConfig,
  FeaturePageScaffold, ScaffoldKPIRow,
  PageHeader, StatCard, FilterBar,
} from "@uxuissk/design-system";

// 1. Build your nav resolver (permission-filtered)
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

// 2. Wrap your page in AppShell
<AppShell
  product={sellsukiBrandConfig}
  user={currentUser}
  navResolver={buildNav}
  activeItemId="orders"
  onNavigate={(item) => router.push(item.href!)}
  notificationCount={5}
  showSearch
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

// ─── Brand Config Display ─────────────────────────────────────────────────────

function BrandCard({ config, active }: { config: typeof sellsukiBrandConfig; active?: boolean }) {
  const THEME_COLORS: Record<string, string> = {
    sellsuki: "var(--primary)",
    patona: "#f97316",
    sukispace: "var(--primary)",
    shipmunk: "#8b5cf6",
    akita: "#06b6d4",
  };
  const color = THEME_COLORS[config.brand.theme ?? "sellsuki"] ?? "var(--primary)";
  return (
    <div
      className="p-4 rounded-[var(--radius-lg)] border bg-card flex items-center gap-4"
      style={{ borderColor: active ? "var(--primary)" : "var(--border)" }}
    >
      <div
        className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold"
        style={{ background: color, fontFamily: "var(--font-label)" }}
      >
        {config.brand.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-foreground" style={fontLabel}>{config.brand.name}</div>
        <div className="text-muted-foreground truncate" style={{ ...fontLabel, fontSize: "var(--text-button)" }}>
          {config.product} product
        </div>
      </div>
      {active && <Badge variant="primary">Active</Badge>}
    </div>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function AppShellShowcase() {
  const [skeletonKey, setSkeletonKey] = useState(0);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.appshell.title" descKey="page.appshell.desc" />

      {/* Brand Configs */}
      <Section
        title="Product Brand Configs"
        description="AppShell รองรับหลาย product ผ่าน prop เดียว — เปลี่ยนได้โดยไม่ต้องแก้ code"
      >
        <DemoBox className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BrandCard config={sellsukiBrandConfig} active />
          <BrandCard config={patonaBrandConfig} />
          <div
            className="p-4 rounded-[var(--radius-lg)] border border-dashed border-border bg-muted/20 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-muted flex items-center justify-center">
              <Layers size={18} className="text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold text-muted-foreground" style={fontLabel}>sukispaceBrandConfig</div>
              <div className="text-muted-foreground" style={{ ...fontLabel, fontSize: "var(--text-button)" }}>Space management platform</div>
            </div>
          </div>
          <div
            className="p-4 rounded-[var(--radius-lg)] border border-dashed border-border bg-muted/20 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-muted flex items-center justify-center">
              <Package size={18} className="text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold text-muted-foreground" style={fontLabel}>shipmunkBrandConfig</div>
              <div className="text-muted-foreground" style={{ ...fontLabel, fontSize: "var(--text-button)" }}>Shipping management platform</div>
            </div>
          </div>
        </DemoBox>
      </Section>

      {/* AppShellSkeleton */}
      <Section
        title="AppShellSkeleton — Loading State"
        description="แสดง skeleton ของ AppShell ระหว่างที่ session กำลังโหลด"
        code={`// ใช้ขณะที่ session ยังไม่ ready
if (sessionLoading) return <AppShellSkeleton />;`}
      >
        <DemoBox className="!p-0 overflow-hidden rounded-[var(--radius-lg)]" style={{ height: 320 }}>
          <div style={{ transform: "scale(0.6)", transformOrigin: "top left", width: "167%", height: "167%", pointerEvents: "none" }}>
            <AppShellSkeleton key={skeletonKey} />
          </div>
        </DemoBox>
        <div className="flex justify-center mt-3">
          <DSButton variant="outline" size="sm" onClick={() => setSkeletonKey((k) => k + 1)}>
            Replay Skeleton
          </DSButton>
        </div>
      </Section>

      {/* FeaturePageScaffold layouts */}
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
                  <div
                    key={stat.label}
                    className="flex-1 px-5 py-3 border border-border rounded-[var(--radius-lg)] bg-card"
                  >
                    <div className="text-muted-foreground" style={{ ...fontLabel, fontSize: "var(--text-button)" }}>{stat.label}</div>
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
              <div className="h-40 flex items-center justify-center bg-muted/20 rounded-[var(--radius-lg)] border border-dashed border-border text-muted-foreground" style={fontLabel}>
                [LineChart / AreaChart]
              </div>
            }
            widgets={[
              <div key="w1" className="h-32 flex flex-col items-center justify-center bg-muted/20 rounded-[var(--radius-lg)] border border-dashed border-border text-muted-foreground" style={fontLabel}>
                <BarChart3 size={20} className="mb-1" /> [BarChart]
              </div>,
              <div key="w2" className="h-32 flex flex-col items-center justify-center bg-muted/20 rounded-[var(--radius-lg)] border border-dashed border-border text-muted-foreground" style={fontLabel}>
                <Users size={20} className="mb-1" /> [DonutChart]
              </div>,
            ]}
          />
        </DemoBox>
      </Section>

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

      {/* Full Code Example */}
      <Section
        title="Full AppShell Code Example"
        description="ตัวอย่าง code การใช้งาน AppShell ครบวงจรในโปรเจกต์จริง"
        code={APPSHELL_CODE}
      >
        <DemoBox>
          <div className="text-muted-foreground text-center py-4" style={fontLabel}>
            ดู code example ด้านบน — AppShell ต้องใช้ใน root ของ app จึงไม่แสดงใน demo นี้
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "product", type: "ProductBrandConfig", def: "—", desc: "Brand config (sellsuki / patona / sukispace / shipmunk)" },
        { prop: "user", type: "ShellUser", def: "—", desc: "{ name, email, avatar?, role? }" },
        { prop: "navResolver", type: "NavResolver", def: "—", desc: "async function → ShellSidebarGroup[]" },
        { prop: "activeItemId", type: "string", def: "—", desc: "ID ของ nav item ที่ active" },
        { prop: "onNavigate", type: "(item: NavItem) => void", def: "—", desc: "callback เมื่อคลิก nav item" },
        { prop: "notificationCount", type: "number", def: "0", desc: "badge จำนวนแจ้งเตือน" },
        { prop: "showSearch", type: "boolean", def: "false", desc: "แสดง search bar ใน topbar" },
        { prop: "layout (Scaffold)", type: "FeaturePageLayout", def: "list", desc: "list | detail | settings | wizard | dashboard | form | report" },
        { prop: "header", type: "ReactNode", def: "—", desc: "PageHeader component" },
        { prop: "stats", type: "ReactNode", def: "—", desc: "ScaffoldKPIRow — stat card row" },
        { prop: "filters", type: "ReactNode", def: "—", desc: "FilterBar — แสดงระหว่าง stats และ content" },
        { prop: "content", type: "ReactNode", def: "—", desc: "เนื้อหาหลัก (table, grid, cards)" },
      ]} />
    </div>
  );
}
