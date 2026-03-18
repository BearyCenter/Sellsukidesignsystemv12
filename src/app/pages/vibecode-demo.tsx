import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
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
  ChevronDown,
  ChevronUp,
  Check,
  Menu as MenuIcon,
  Bell,
  Grid3X3,
} from "lucide-react";
import SSKIcon from "../../imports/Icon";

/**
 * Vibe Code Demo — Sellsuki Main Brand (Sky-500 primary)
 * Font: DB HeaventRounded (body/Thai), Inter (buttons/numbers)
 * Layout: Header 72px + Sidebar 280px + Content
 */

const fontBody = "'DB HeaventRounded', 'Noto Sans Thai', sans-serif";
const fontButton = "Inter, sans-serif";

const f = {
  h3: { fontFamily: fontBody, fontSize: 28, fontWeight: 700 } as React.CSSProperties,
  h4: { fontFamily: fontBody, fontSize: 24, fontWeight: 500 } as React.CSSProperties,
  p: { fontFamily: fontBody, fontSize: 20, fontWeight: 400 } as React.CSSProperties,
  label: { fontFamily: fontBody, fontSize: 18, fontWeight: 400 } as React.CSSProperties,
  button: { fontFamily: fontButton, fontSize: 14, fontWeight: 600 } as React.CSSProperties,
  num: { fontFamily: fontButton, fontSize: 13, fontWeight: 600 } as React.CSSProperties,
  numSm: { fontFamily: fontButton, fontSize: 12, fontWeight: 600 } as React.CSSProperties,
  numLg: { fontFamily: fontButton, fontSize: 24, fontWeight: 700 } as React.CSSProperties,
  // Thai badge text — use body font for Thai readability
  badge: { fontFamily: fontBody, fontSize: 16, fontWeight: 500, whiteSpace: "nowrap" as const } as React.CSSProperties,
};

// ─── Colors: Main Sellsuki Brand ────────────────────────────────────────────

const c = {
  primary: "#32a9ff",       // Sky-500
  primaryHover: "#1b8bf5",  // Sky-600
  primaryLight: "#f0f9ff",  // Sky-50
  primaryBorder: "#8edcff", // Sky-300
  text: "#1f2937",          // Gray-800
  textSec: "#6b7280",       // Gray-500
  placeholder: "#9ca3af",   // Gray-400
  border: "#e5e7eb",        // Gray-200
  bgPage: "#f9fafb",        // Gray-50
  bgCard: "#ffffff",
  success: "#059669",
  successBg: "#ecfdf5",
  warning: "#d97706",
  warningBg: "#fffbeb",
  danger: "#e11d48",
  dangerBg: "#fff1f2",
  infoBg: "#f0f9ff",
};

// ─── Sidebar ────────────────────────────────────────────────────────────────

const sidebarMenus = [
  {
    label: "MAIN",
    items: [
      { icon: <Home size={20} />, label: "Dashboard" },
      { icon: <ShoppingCart size={20} />, label: "Orders", active: true, badge: 23 },
      { icon: <Box size={20} />, label: "Products" },
      { icon: <Users size={20} />, label: "Customers" },
      { icon: <FileText size={20} />, label: "Reports" },
    ],
  },
  {
    label: "MARKETING",
    items: [
      { icon: <LayoutGrid size={20} />, label: "Campaigns" },
    ],
  },
];

// ─── Companies (for dropdown switcher) ───────────────────────────────────────

const companies = [
  { id: "sellsuki", name: "Sellsuki Company", email: "watcharapong@sellsuki.com", initials: "WC" },
  { id: "brandx", name: "Brand X Store", email: "admin@brandx.com", initials: "BX" },
  { id: "shopdee", name: "ShopDee Online", email: "team@shopdee.co.th", initials: "SD" },
];

export function VibeCodeDemo() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ MAIN: true, MARKETING: true });
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const companyDropdownRef = useRef<HTMLDivElement>(null);

  // Close company dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(e.target as Node)) {
        setCompanyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const stats = [
    { label: "ยอดขายวันนี้", value: "฿128,450", change: "+12.5%", up: true, icon: <DollarSign size={20} /> },
    { label: "ออเดอร์ใหม่", value: "47", change: "+8.2%", up: true, icon: <ShoppingCart size={20} /> },
    { label: "ลูกค้าใหม่", value: "23", change: "+3.1%", up: true, icon: <Users size={20} /> },
    { label: "สินค้าคงเหลือ", value: "1,847", change: "-2.4%", up: false, icon: <Package size={20} /> },
  ];

  const tabs = [
    { id: "all", label: "ทั้งหมด", count: 156 },
    { id: "pending", label: "รอยืนยัน", count: 23 },
    { id: "confirmed", label: "ยืนยันแล้ว", count: 45 },
    { id: "shipping", label: "กำลังจัดส่ง", count: 67 },
    { id: "completed", label: "สำเร็จ", count: 21 },
  ];

  const orders = [
    { id: "ORD-2024001", customer: "สมชาย มั่งมี", channel: "LINE", amount: "฿3,450", status: "pending", date: "18 มี.ค. 2026" },
    { id: "ORD-2024002", customer: "สุดา รักดี", channel: "Facebook", amount: "฿1,290", status: "confirmed", date: "18 มี.ค. 2026" },
    { id: "ORD-2024003", customer: "วิชัย ศรีสุข", channel: "Shopee", amount: "฿5,670", status: "shipping", date: "17 มี.ค. 2026" },
    { id: "ORD-2024004", customer: "นภา จันทร์ทอง", channel: "LINE", amount: "฿890", status: "completed", date: "17 มี.ค. 2026" },
    { id: "ORD-2024005", customer: "อรุณ แสงทอง", channel: "Website", amount: "฿12,340", status: "pending", date: "17 มี.ค. 2026" },
    { id: "ORD-2024006", customer: "พิมพ์ ใจงาม", channel: "Facebook", amount: "฿2,150", status: "confirmed", date: "16 มี.ค. 2026" },
  ];

  const statusMap: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "รอยืนยัน", color: c.warning, bg: c.warningBg },
    confirmed: { label: "ยืนยันแล้ว", color: c.primary, bg: c.infoBg },
    shipping: { label: "กำลังจัดส่ง", color: "#f97316", bg: "#fff7ed" },
    completed: { label: "สำเร็จ", color: c.success, bg: c.successBg },
  };

  const filteredOrders = activeTab === "all" ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ background: c.primaryLight, color: c.primary, ...f.button, fontSize: 12 }}>
          VIBE CODE DEMO
        </div>
        <h1 style={{ ...f.h3, color: "var(--foreground)" }}>ตัวอย่างผลลัพธ์ Vibe Code</h1>
        <p style={{ ...f.p, color: "var(--muted-foreground)", marginTop: 4 }}>
          จำลองว่า PO สั่ง: "สร้างหน้า Dashboard Order Management ของ Sellsuki" — AI ได้ผลลัพธ์ด้านล่าง
        </p>
      </div>

      {/* Prompt Box */}
      <div className="rounded-[8px] border p-4" style={{ borderColor: c.primaryBorder, background: c.primaryLight }}>
        <p style={{ ...f.button, fontSize: 12, color: c.primary, marginBottom: 8 }}>PROMPT ที่ใช้:</p>
        <p style={{ ...f.label, color: c.text }}>
          "สร้างหน้า Dashboard สำหรับ Order Management ของ Sellsuki มี stat cards 4 ตัว, tab filter สถานะ, ตารางออเดอร์, search, pagination"
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* DEMO OUTPUT                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-[12px] border overflow-hidden" style={{ borderColor: c.border, background: c.bgPage }}>

        {/* ─── HEADER 72px ─── */}
        <div className="flex items-center justify-between px-4 border-b" style={{ height: 72, borderColor: c.border, background: c.bgCard }}>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-[8px] hover:bg-gray-50">
              <MenuIcon size={20} color="#111827" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex-shrink-0 rounded-[8px] overflow-hidden"><SSKIcon /></div>
              <span style={{ ...f.h4, fontSize: 20, color: "#0F225A" }}>Sellsuki</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-[8px] border" style={{ borderColor: c.border, background: c.bgPage, width: 320 }}>
            <Search size={16} color={c.placeholder} />
            <span style={{ ...f.label, color: c.placeholder }}>ค้นหาออเดอร์, สินค้า, ลูกค้า...</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-[8px] hover:bg-gray-50 relative">
              <Bell size={20} color={c.textSec} />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: c.danger }} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-[8px] hover:bg-gray-50">
              <Grid3X3 size={20} color={c.textSec} />
            </button>
            {/* Avatar — Main Sellsuki = Sky blue */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: c.primary }}>
              <span style={{ color: "white", ...f.button }}>WC</span>
            </div>
          </div>
        </div>

        <div className="flex" style={{ minHeight: 620 }}>
          {/* ─── SIDEBAR 280px ─── */}
          <aside className="flex-shrink-0 flex flex-col border-r" style={{ width: 280, borderColor: c.border, background: c.bgCard }}>
            {/* Profile / Company Switcher */}
            <div className="p-4 relative" ref={companyDropdownRef}>
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className="w-full flex items-center gap-3 p-3 rounded-[8px] transition-colors text-left"
                style={{ background: c.primaryLight, border: `1px solid ${c.primaryBorder}` }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.primary }}>
                  <span style={{ color: "white", ...f.button, fontSize: 16 }}>{selectedCompany.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ ...f.label, fontWeight: 600, color: c.text }}>{selectedCompany.name}</p>
                  <p className="truncate" style={{ fontFamily: fontButton, fontSize: 12, color: c.textSec }}>{selectedCompany.email}</p>
                </div>
                <ChevronDown
                  size={16}
                  color={c.primary}
                  style={{ transition: "transform 0.2s", transform: companyDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {/* Company Dropdown */}
              {companyDropdownOpen && (
                <div
                  className="absolute left-4 right-4 mt-2 rounded-[8px] border shadow-lg overflow-hidden z-50"
                  style={{ background: c.bgCard, borderColor: c.border }}
                >
                  <div className="px-3 py-2 border-b" style={{ borderColor: c.border }}>
                    <p style={{ ...f.button, fontSize: 11, color: c.placeholder, letterSpacing: "0.05em" }}>SWITCH COMPANY</p>
                  </div>
                  {companies.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => { setSelectedCompany(company); setCompanyDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      style={{ background: selectedCompany.id === company.id ? c.primaryLight : "transparent" }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: selectedCompany.id === company.id ? c.primary : c.border }}>
                        <span style={{ color: selectedCompany.id === company.id ? "white" : c.textSec, ...f.numSm }}>{company.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ ...f.label, fontSize: 16, fontWeight: 500, color: c.text }}>{company.name}</p>
                        <p className="truncate" style={{ fontFamily: fontButton, fontSize: 11, color: c.textSec }}>{company.email}</p>
                      </div>
                      {selectedCompany.id === company.id && (
                        <Check size={16} color={c.primary} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto px-4 space-y-4">
              {sidebarMenus.map((group) => {
                const isExpanded = expandedGroups[group.label] !== false;
                return (
                  <div key={group.label}>
                    <button
                      onClick={() => toggleGroup(group.label)}
                      className="w-full flex items-center justify-between px-3 mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <span className="uppercase" style={{ ...f.button, fontSize: 11, color: c.placeholder, letterSpacing: "0.05em" }}>
                        {group.label}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={14} color={c.placeholder} />
                      ) : (
                        <ChevronDown size={14} color={c.placeholder} />
                      )}
                    </button>
                    <div
                      className="space-y-1 overflow-hidden transition-all"
                      style={{
                        maxHeight: isExpanded ? 500 : 0,
                        opacity: isExpanded ? 1 : 0,
                        transition: "max-height 0.25s ease, opacity 0.2s ease",
                      }}
                    >
                      {group.items.map((item) => (
                        <button
                          key={item.label}
                          className="w-full flex items-center gap-3 px-3 rounded-[8px] transition-colors"
                          style={{
                            height: 48,
                            background: item.active ? c.primaryLight : "transparent",
                            color: item.active ? c.primary : c.textSec,
                          }}
                        >
                          <span style={{ color: item.active ? c.primary : c.textSec }}>{item.icon}</span>
                          <span style={{ ...f.label, fontWeight: item.active ? 600 : 400, color: c.text }}>{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-0.5 rounded-full" style={{ ...f.numSm, background: item.active ? c.primary : c.border, color: item.active ? "white" : c.textSec }}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="p-4 border-t space-y-1" style={{ borderColor: c.border }}>
              <button className="w-full flex items-center gap-3 px-3 h-12 rounded-[8px] hover:bg-gray-50">
                <HelpCircle size={20} color={c.textSec} />
                <span style={{ ...f.label, color: c.text }}>Help & Support</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 h-12 rounded-[8px] hover:bg-gray-50">
                <Settings size={20} color={c.textSec} />
                <span style={{ ...f.label, color: c.text }}>Settings</span>
              </button>
            </div>
          </aside>

          {/* ─── CONTENT ─── */}
          <main className="flex-1 p-6 space-y-6 overflow-auto" style={{ background: c.bgPage }}>
            {/* Title */}
            <div className="flex items-center justify-between">
              <div>
                <h2 style={{ ...f.h3, color: c.text }}>Order Management</h2>
                <p style={{ ...f.label, color: c.textSec, marginTop: 2 }}>จัดการออเดอร์ทั้งหมดจากทุกช่องทาง</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-white hover:opacity-90 transition" style={{ background: c.primary, ...f.button }}>
                <Plus size={16} /> สร้างออเดอร์
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-[8px] border p-4" style={{ borderColor: c.border, background: c.bgCard }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ ...f.label, color: c.textSec }}>{s.label}</span>
                    <div className="w-8 h-8 rounded-[6px] flex items-center justify-center" style={{ background: c.primaryLight, color: c.primary }}>{s.icon}</div>
                  </div>
                  <div style={{ ...f.numLg, color: c.text }}>{s.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {s.up ? <TrendingUp size={14} color={c.success} /> : <TrendingDown size={14} color={c.danger} />}
                    <span style={{ ...f.numSm, color: s.up ? c.success : c.danger }}>{s.change}</span>
                    <span style={{ ...f.label, fontSize: 14, color: c.placeholder }}>vs yesterday</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Card */}
            <div className="rounded-[8px] border overflow-hidden" style={{ borderColor: c.border, background: c.bgCard }}>
              <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ ...f.h4, color: c.text }}>รายการออเดอร์</h3>
                  <div className="flex items-center gap-2">
                    {[{ icon: <Filter size={14} />, label: "Filter" }, { icon: <Download size={14} />, label: "Export" }].map(btn => (
                      <button key={btn.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border hover:bg-gray-50" style={{ borderColor: c.border, ...f.button, fontSize: 13, fontWeight: 500, color: c.textSec }}>
                        {btn.icon} {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-0 border-b" style={{ borderColor: c.border }}>
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="px-4 py-2.5 transition-colors"
                      style={{
                        ...f.label,
                        fontWeight: activeTab === tab.id ? 600 : 400,
                        color: activeTab === tab.id ? c.primary : c.textSec,
                        borderBottom: activeTab === tab.id ? `2px solid ${c.primary}` : "2px solid transparent",
                        marginBottom: -1,
                      }}
                    >
                      {tab.label}
                      <span className="ml-1.5 px-1.5 py-0.5 rounded-full" style={{
                        ...f.numSm, fontSize: 11,
                        background: activeTab === tab.id ? c.primaryLight : "#f3f4f6",
                        color: activeTab === tab.id ? c.primary : c.placeholder,
                      }}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                    {["", "Order ID", "ลูกค้า", "ช่องทาง", "ยอดเงิน", "สถานะ", "วันที่", ""].map((h, i) => (
                      <th key={i} className="text-left px-4 py-3" style={{ ...f.label, fontWeight: 500, color: c.textSec, background: c.bgPage }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, i) => (
                    <tr key={order.id} className="hover:bg-[#f9fafb] transition-colors" style={{ borderBottom: i < filteredOrders.length - 1 ? `1px solid ${c.border}` : "none" }}>
                      <td className="px-4 py-3 w-10">
                        <input type="checkbox" className="rounded" style={{ width: 16, height: 16, accentColor: c.primary }} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span style={{ ...f.num, color: c.primary }}>{order.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.border }}>
                            <span style={{ ...f.numSm, fontSize: 11, color: c.textSec }}>{order.customer[0]}</span>
                          </div>
                          <span className="whitespace-nowrap" style={{ ...f.label, color: c.text }}>{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span style={{ ...f.label, color: c.textSec }}>{order.channel}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span style={{ ...f.num, color: c.text }}>{order.amount}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full" style={{ ...f.badge, color: statusMap[order.status].color, background: statusMap[order.status].bg }}>
                          {statusMap[order.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span style={{ ...f.label, color: c.textSec }}>{order.date}</span>
                      </td>
                      <td className="px-4 py-3 w-10">
                        <button className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[#f9fafb]">
                          <Eye size={14} color={c.textSec} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: c.border }}>
                <span style={{ ...f.label, color: c.textSec }}>แสดง 1-6 จาก {tabs.find(t => t.id === activeTab)?.count || 156} รายการ</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "...", 12].map((p, i) => (
                    <button key={i} className="w-8 h-8 flex items-center justify-center rounded-[6px]" style={{ ...f.num, background: p === 1 ? c.primary : "transparent", color: p === 1 ? "white" : c.textSec }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Components Info */}
      <div className="rounded-[8px] border p-4 space-y-3" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <p style={{ ...f.button, fontSize: 12, color: c.success }}>COMPONENTS ที่ใช้ในหน้านี้:</p>
        <div className="flex flex-wrap gap-2">
          {["TopNavbar", "Sidebar", "StatCard", "Tabs", "DSTable", "Badge", "Pagination", "SearchField", "DSButton", "Avatar", "Card"].map(comp => (
            <span key={comp} className="px-2.5 py-1 rounded-[6px] border" style={{ ...f.button, fontSize: 12, fontWeight: 500, borderColor: "var(--border)", color: "var(--foreground)" }}>
              {comp}
            </span>
          ))}
        </div>
        <div className="flex gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: c.primary }} />
            <span style={{ ...f.label, fontSize: 14, color: c.textSec }}>Primary: Sky-500 (#32a9ff)</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ ...f.label, fontSize: 14, color: c.textSec }}>Font body: DB HeaventRounded</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ ...f.label, fontSize: 14, color: c.textSec }}>Font button: Inter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
