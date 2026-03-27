import { useState } from "react";
import {
  Plus,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Filter,
  Download,
  Eye,
  Home,
  LayoutGrid,
  FileText,
  Box,
  Settings,
  HelpCircle,
} from "lucide-react";
import SSKIcon from "../../imports/Icon";
import { fontLabel, btnStyle, smallLabel } from "./_showcase-factory";

// ─── DS Components ────────────────────────────────────────────────────────────
import { TopNavbar } from "../../lib/components/ds-topnavbar";
import { Sidebar, type SidebarGroup } from "../../lib/components/ds-sidebar";
import { type SidebarAccountItem } from "../../lib/components/ds-sidebar-account";
import { DSButton, IconButton } from "../../lib/components/ds-button";
import { Badge } from "../../lib/components/ds-badge";
import { Tabs } from "../../lib/components/ds-tabs";
import { DSTable, type TableColumn } from "../../lib/components/ds-table";
import { Pagination } from "../../lib/components/ds-pagination";
import { StatCard } from "../../lib/components/ds-statistic";
import { Avatar } from "../../lib/components/ds-avatar";

// ─── Typography tokens (DS-aligned) ──────────────────────────────────────────

const fontH3: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-h3)",
  fontWeight: "var(--weight-button)",
};

const fontH4: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-h4)",
  fontWeight: "var(--weight-label)",
};

// ─── Account Switcher data ────────────────────────────────────────────────────

const COMPANIES: SidebarAccountItem[] = [
  { id: "ssk", name: "Sellsuki company", handle: "@sellsuki", avatarFallback: "S" },
  { id: "baby", name: "Baby & Mom", handle: "@babymom", avatarFallback: "B" },
  { id: "multy", name: "Multy's Shop", handle: "@multy", avatarFallback: "M" },
];
const BRANCHES: SidebarAccountItem[] = [
  { id: "ratchada", name: "สาขา รัชดาภิเษก", handle: "BKK-01", avatarFallback: "ร" },
  { id: "siam", name: "สาขา สยาม", handle: "BKK-02", avatarFallback: "ส" },
  { id: "online", name: "Online", handle: "OL-01", avatarFallback: "O" },
];
const PROVIDERS: SidebarAccountItem[] = [
  { id: "line", name: "LINE Shopping", handle: "@line", avatarFallback: "L" },
  { id: "shopee", name: "Shopee", handle: "@shopee", avatarFallback: "S" },
  { id: "lazada", name: "Lazada", handle: "@lazada", avatarFallback: "L" },
];

// ─── Sidebar groups ───────────────────────────────────────────────────────────

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: "Main",
    items: [
      { id: "dashboard", label: "Dashboard",   icon: <Home size={16} /> },
      { id: "orders",    label: "Orders",      icon: <ShoppingCart size={16} />, badge: "23" },
      { id: "products",  label: "Products",    icon: <Box size={16} /> },
      { id: "customers", label: "Customers",   icon: <Users size={16} /> },
      { id: "reports",   label: "Reports",     icon: <FileText size={16} /> },
    ],
  },
  {
    label: "Marketing",
    items: [
      { id: "campaigns", label: "Campaigns", icon: <LayoutGrid size={16} /> },
    ],
  },
  {
    label: "",
    items: [
      { id: "help",     label: "Help & Support", icon: <HelpCircle size={16} /> },
      { id: "settings", label: "Settings",       icon: <Settings size={16} /> },
    ],
  },
];

// ─── Order data ───────────────────────────────────────────────────────────────

type Order = {
  id: string;
  customer: string;
  channel: string;
  amount: string;
  status: "pending" | "confirmed" | "shipping" | "completed";
  date: string;
};

const STATUS_BADGE: Record<
  Order["status"],
  { label: string; variant: "warning" | "default" | "secondary" | "success" }
> = {
  pending:   { label: "รอยืนยัน",      variant: "warning" },
  confirmed: { label: "ยืนยันแล้ว",    variant: "default" },
  shipping:  { label: "กำลังจัดส่ง",  variant: "secondary" },
  completed: { label: "สำเร็จ",        variant: "success" },
};

const ORDERS: Order[] = [
  { id: "ORD-2024001", customer: "สมชาย มั่งมี",   channel: "LINE",     amount: "฿3,450",  status: "pending",   date: "18 มี.ค. 2026" },
  { id: "ORD-2024002", customer: "สุดา รักดี",      channel: "Facebook", amount: "฿1,290",  status: "confirmed", date: "18 มี.ค. 2026" },
  { id: "ORD-2024003", customer: "วิชัย ศรีสุข",   channel: "Shopee",   amount: "฿5,670",  status: "shipping",  date: "17 มี.ค. 2026" },
  { id: "ORD-2024004", customer: "นภา จันทร์ทอง", channel: "LINE",     amount: "฿890",    status: "completed", date: "17 มี.ค. 2026" },
  { id: "ORD-2024005", customer: "อรุณ แสงทอง",   channel: "Website",  amount: "฿12,340", status: "pending",   date: "17 มี.ค. 2026" },
  { id: "ORD-2024006", customer: "พิมพ์ ใจงาม",   channel: "Facebook", amount: "฿2,150",  status: "confirmed", date: "16 มี.ค. 2026" },
];

const TAB_COUNTS: Record<string, number> = {
  all: 156, pending: 23, confirmed: 45, shipping: 67, completed: 21,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function VibeCodeDemo() {
  const [activeTab,        setActiveTab]        = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCompany, setActiveCompany] = useState(COMPANIES[0]);
  const [activeBranch, setActiveBranch] = useState(BRANCHES[0]);
  const [activeProvider, setActiveProvider] = useState(PROVIDERS[0]);
  const [page,             setPage]             = useState(1);

  const filteredOrders =
    activeTab === "all" ? ORDERS : ORDERS.filter((o) => o.status === activeTab);

  // ─── Table columns ──────────────────────────────────────────────────────────
  const columns: TableColumn<Order>[] = [
    {
      key: "id",
      header: "Order ID",
      render: (_, row) => (
        <span style={{ ...smallLabel, color: "var(--primary)" }}>{row.id}</span>
      ),
    },
    {
      key: "customer",
      header: "ลูกค้า",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Avatar name={row.customer} size="xs" />
          <span style={fontLabel}>{row.customer}</span>
        </div>
      ),
    },
    {
      key: "channel",
      header: "ช่องทาง",
      render: (_, row) => (
        <span style={{ ...fontLabel, color: "var(--muted-foreground)" }}>{row.channel}</span>
      ),
    },
    {
      key: "amount",
      header: "ยอดเงิน",
      align: "right",
      render: (_, row) => <span style={btnStyle}>{row.amount}</span>,
    },
    {
      key: "status",
      header: "สถานะ",
      render: (_, row) => {
        const s = STATUS_BADGE[row.status];
        return <Badge variant={s.variant} size="sm">{s.label}</Badge>;
      },
    },
    {
      key: "date",
      header: "วันที่",
      render: (_, row) => (
        <span style={{ ...smallLabel, color: "var(--muted-foreground)" }}>{row.date}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "center",
      width: "48px",
      render: () => (
        <IconButton
          icon={<Eye size={14} />}
          size="sm"
          variant="ghost"
          aria-label="ดูรายละเอียด"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Page title ─────────────────────────────────────────────────────── */}
      <div>
        <Badge variant="default" size="sm" className="mb-3">VIBE CODE DEMO</Badge>
        <h1 style={{ ...fontH3, color: "var(--foreground)" }}>ตัวอย่างผลลัพธ์ Vibe Code</h1>
        <p style={{ ...fontLabel, color: "var(--muted-foreground)", marginTop: 4 }}>
          จำลองว่า PO สั่ง: "สร้างหน้า Dashboard Order Management ของ Sellsuki" — AI ได้ผลลัพธ์ด้านล่าง
        </p>
      </div>

      {/* ── Prompt box ──────────────────────────────────────────────────────── */}
      <div
        className="rounded-[var(--radius-md)] border border-primary/30 bg-primary/5 p-4"
      >
        <p style={{ ...btnStyle, fontSize: 12, color: "var(--primary)", marginBottom: 8 }}>
          PROMPT ที่ใช้:
        </p>
        <p style={{ ...fontLabel, color: "var(--foreground)" }}>
          "สร้างหน้า Dashboard สำหรับ Order Management ของ Sellsuki มี stat cards 4 ตัว,
          tab filter สถานะ, ตารางออเดอร์, search, pagination"
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* DEMO OUTPUT                                                          */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-[12px] border overflow-hidden border-border bg-background">

        {/* TopNavbar */}
        <TopNavbar
          brand={{ name: "Sellsuki", logo: <SSKIcon /> }}
          title="Order Management"
          showSearch
          searchPlaceholder="ค้นหาออเดอร์, สินค้า, ลูกค้า..."
          notificationCount={1}
          user={{ name: "Watcharapong Chantong" }}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <div className="flex" style={{ minHeight: 620 }}>
          {/* Sidebar */}
          <Sidebar
            accountSwitcher={{
              company: activeCompany,
              branch: activeBranch,
              provider: activeProvider,
              companies: COMPANIES,
              branches: BRANCHES,
              providers: PROVIDERS,
              onCompanyChange: setActiveCompany,
              onBranchChange: setActiveBranch,
              onProviderChange: setActiveProvider,
            }}
            groups={SIDEBAR_GROUPS}
            activeItem="orders"
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            showCollapseToggle={false}
            version="v1.4.0"
            versionDate="March 10, 2026"
          />

          {/* Content */}
          <main className="flex-1 p-6 space-y-6 overflow-auto bg-background">

            {/* Page header row */}
            <div className="flex items-center justify-between">
              <div>
                <h2 style={{ ...fontH3, color: "var(--foreground)" }}>Order Management</h2>
                <p style={{ ...fontLabel, color: "var(--muted-foreground)", marginTop: 2 }}>
                  จัดการออเดอร์ทั้งหมดจากทุกช่องทาง
                </p>
              </div>
              {/* Max 1 primary button per view */}
              <DSButton variant="primary" leftIcon={<Plus size={16} />}>
                สร้างออเดอร์
              </DSButton>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard
                title="ยอดขายวันนี้"
                value="฿128,450"
                trend={{ value: 12.5, direction: "up" }}
                trendLabel="vs yesterday"
                icon={<DollarSign size={20} />}
                iconBg="bg-primary/10 text-primary"
              />
              <StatCard
                title="ออเดอร์ใหม่"
                value="47"
                trend={{ value: 8.2, direction: "up" }}
                trendLabel="vs yesterday"
                icon={<ShoppingCart size={20} />}
                iconBg="bg-primary/10 text-primary"
              />
              <StatCard
                title="ลูกค้าใหม่"
                value="23"
                trend={{ value: 3.1, direction: "up" }}
                trendLabel="vs yesterday"
                icon={<Users size={20} />}
                iconBg="bg-primary/10 text-primary"
              />
              <StatCard
                title="สินค้าคงเหลือ"
                value="1,847"
                trend={{ value: 2.4, direction: "down" }}
                trendLabel="vs yesterday"
                icon={<Package size={20} />}
                iconBg="bg-destructive/10 text-destructive"
              />
            </div>

            {/* Order table card */}
            <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">

              {/* Toolbar */}
              <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ ...fontH4, color: "var(--foreground)" }}>รายการออเดอร์</h3>
                  <div className="flex items-center gap-2">
                    <DSButton variant="outline" size="sm" leftIcon={<Filter size={14} />}>
                      Filter
                    </DSButton>
                    <DSButton variant="outline" size="sm" leftIcon={<Download size={14} />}>
                      Export
                    </DSButton>
                  </div>
                </div>

                {/* Status tabs */}
                <Tabs
                  variant="underline"
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  tabs={[
                    { id: "all",       label: "ทั้งหมด",      badge: TAB_COUNTS.all },
                    { id: "pending",   label: "รอยืนยัน",    badge: TAB_COUNTS.pending },
                    { id: "confirmed", label: "ยืนยันแล้ว",  badge: TAB_COUNTS.confirmed },
                    { id: "shipping",  label: "กำลังจัดส่ง", badge: TAB_COUNTS.shipping },
                    { id: "completed", label: "สำเร็จ",       badge: TAB_COUNTS.completed },
                  ]}
                />
              </div>

              {/* Data table */}
              <DSTable
                columns={columns}
                data={filteredOrders}
                flush
                hoverable
                selectable
                size="md"
              />

              {/* Pagination row */}
              <div
                className="flex items-center justify-between px-4 py-3 border-t border-border"
              >
                <span style={{ ...smallLabel, color: "var(--muted-foreground)" }}>
                  แสดง 1–6 จาก {TAB_COUNTS[activeTab] ?? 156} รายการ
                </span>
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil((TAB_COUNTS[activeTab] ?? 156) / 6)}
                  onPageChange={setPage}
                  size="sm"
                  siblingCount={1}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── Components used ─────────────────────────────────────────────────── */}
      <div className="rounded-[var(--radius-md)] border border-border bg-card p-4 space-y-3">
        <p style={{ ...btnStyle, fontSize: 12, color: "var(--chart-2)" }}>
          COMPONENTS ที่ใช้ในหน้านี้:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "TopNavbar", "Sidebar", "StatCard", "Tabs",
            "DSTable",   "Badge",   "Pagination", "DSButton",
            "IconButton", "Avatar",
          ].map((comp) => (
            <span
              key={comp}
              className="px-2.5 py-1 rounded-[var(--radius-sm)] border border-border"
              style={{ ...btnStyle, fontSize: 12, fontWeight: 500, color: "var(--foreground)" }}
            >
              {comp}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span style={{ ...smallLabel, color: "var(--muted-foreground)" }}>
              Primary: Sky-500 (var(--primary))
            </span>
          </div>
          <span style={{ ...smallLabel, color: "var(--muted-foreground)" }}>
            Font: DB HeaventRounded (var(--font-label)) — ใช้ทั้งหมด
          </span>
        </div>
      </div>
    </div>
  );
}
