import { CheckCircle2, Clock, Circle, Zap, Globe, Cpu, Package, Layers, AlertTriangle, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PhaseStatus = "completed" | "in-progress" | "pending";

interface Task {
  id: string;
  text: string;
  owner: "uxui" | "dev" | "both";
  effort: "XS" | "S" | "M" | "L";
  status: PhaseStatus;
  note?: string;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  status: PhaseStatus;
  duration: string;
  tasks: Task[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    id: "phase-0",
    title: "Phase 0",
    subtitle: "Visual Parity + Infra Upgrade",
    status: "pending",
    duration: "~3 สัปดาห์",
    tasks: [
      { id: "p0-1", text: "Audit token values ทั้งหมดใน DS 1.0 (--ssk-*)", owner: "uxui", effort: "S", status: "pending" },
      { id: "p0-2", text: "Map DS 1.0 tokens → DS 2.0 tokens (--text-*, --background, --card, --primary)", owner: "uxui", effort: "S", status: "pending" },
      { id: "p0-3", text: "อัปเดต token values ให้ตรงกับ DS 2.0 visual identity", owner: "uxui", effort: "M", status: "pending" },
      { id: "p0-4", text: "สร้าง Token Bridge CSS (DS 1.0 alias → DS 2.0 names, backward compat)", owner: "dev", effort: "S", status: "pending" },
      { id: "p0-5", text: "Fix font size overrides (DS 1.0 bug) — ปรับ min 18px / 20px", owner: "uxui", effort: "S", status: "pending" },
      { id: "p0-6", text: "เพิ่ม brand configs ใหม่ (Shipmunk, Akita, SellsukiPay, Sukispace)", owner: "both", effort: "M", status: "pending" },
      { id: "p0-7", text: "Upgrade Storybook 7 → 8 (@storybook/web-components-vite)", owner: "dev", effort: "S", status: "pending" },
      { id: "p0-8", text: "Upgrade Vite 4 → 6 + update build pipeline", owner: "dev", effort: "S", status: "pending" },
      { id: "p0-9", text: "Migrate story format CSF2 → CSF3 (89 story files)", owner: "dev", effort: "M", status: "pending" },
      { id: "p0-10", text: "Smoke test ทุก component ใน Storybook 8", owner: "both", effort: "M", status: "pending" },
    ],
  },
  {
    id: "phase-1",
    title: "Phase 1",
    subtitle: "Port Missing Components → Lit",
    status: "pending",
    duration: "~4 สัปดาห์",
    tasks: [
      { id: "p1-1", text: "ImageCropper → React wrapper (react-easy-crop) แทน Croppie.js", owner: "dev", effort: "M", status: "pending", note: "สำคัญ — product image, avatar crop" },
      { id: "p1-2", text: "PhoneCountryInput → ssk-addon-phone-country ปรับปรุง", owner: "dev", effort: "S", status: "pending", note: "Thailand + international shipping" },
      { id: "p1-3", text: "AdvancedDataTable port → Lit (server-side pagination, bulk actions)", owner: "dev", effort: "L", status: "pending" },
      { id: "p1-4", text: "FilterBar port → Lit (multi-filter, search, date range)", owner: "dev", effort: "M", status: "pending" },
      { id: "p1-5", text: "PageHeader port → Lit", owner: "dev", effort: "S", status: "pending" },
      { id: "p1-6", text: "เขียน Storybook stories สำหรับ component ใหม่ทุกตัว", owner: "both", effort: "M", status: "pending" },
      { id: "p1-7", text: "อัปเดต DS 3.0 Preview site ใน DS 2.0 showcase", owner: "dev", effort: "S", status: "pending" },
    ],
  },
  {
    id: "phase-2",
    title: "Phase 2",
    subtitle: "Component Quality Upgrade",
    status: "pending",
    duration: "~3 สัปดาห์",
    tasks: [
      { id: "p2-1", text: "Dropdown upgrade → multi-select, search, custom render (จาก DS 2.0)", owner: "dev", effort: "M", status: "pending" },
      { id: "p2-2", text: "DatePicker upgrade → range mode, keyboard nav ดีกว่า", owner: "dev", effort: "M", status: "pending" },
      { id: "p2-3", text: "DynamicTable upgrade → sort, selection, bulk action pattern DS 2.0", owner: "dev", effort: "M", status: "pending" },
      { id: "p2-4", text: "Sidebar upgrade → SidebarAccountSwitcher, collapse animation", owner: "dev", effort: "S", status: "pending" },
      { id: "p2-5", text: "Charts port → Lit Web Component (Line/Bar/Donut, zero-dep SVG)", owner: "dev", effort: "L", status: "pending" },
      { id: "p2-6", text: "CodeBlock upgrade → ใช้ Shiki แทน PrismJS", owner: "dev", effort: "S", status: "pending" },
      { id: "p2-7", text: "CountryIcon upgrade → ISO 3166 + SVG flags", owner: "dev", effort: "XS", status: "pending" },
      { id: "p2-8", text: "UXUI visual review ทุก component ที่ upgrade แล้ว", owner: "uxui", effort: "M", status: "pending" },
    ],
  },
  {
    id: "phase-3",
    title: "Phase 3",
    subtitle: "AppShell Equivalent + WidgetGrid",
    status: "pending",
    duration: "~3 สัปดาห์",
    tasks: [
      { id: "p3-1", text: "AppShell equivalent → CSS slot-based shell (Navbar + Sidebar + Content)", owner: "dev", effort: "L", status: "pending" },
      { id: "p3-2", text: "FeaturePageScaffold → Lit layout component", owner: "dev", effort: "M", status: "pending" },
      { id: "p3-3", text: "WidgetGrid → GridStack React wrapper evaluate + port (optional)", owner: "dev", effort: "L", status: "pending", note: "Evaluate ว่า use case จริงมีไหมก่อน implement" },
      { id: "p3-4", text: "ScaffoldKPIRow, StatCard upgrades", owner: "dev", effort: "S", status: "pending" },
      { id: "p3-5", text: "Full page layout test ทุก brand (7 brands)", owner: "uxui", effort: "M", status: "pending" },
    ],
  },
  {
    id: "phase-4",
    title: "Phase 4",
    subtitle: "Publish DS 3.0 + Deprecate DS 1.0",
    status: "pending",
    duration: "~1 สัปดาห์",
    tasks: [
      { id: "p4-1", text: "เปลี่ยน package name @sellsuki-org/sellsuki-components → @uxuissk/design-system-core@3.0.0", owner: "dev", effort: "S", status: "pending" },
      { id: "p4-2", text: "เพิ่ม deprecated warning ให้ ssk-* element names", owner: "dev", effort: "XS", status: "pending" },
      { id: "p4-3", text: "สร้าง Migration Guide 1.0 → 2.1 (token mapping, API diff)", owner: "both", effort: "M", status: "pending" },
      { id: "p4-4", text: "Deploy DS 3.0 Storybook ไปยัง Vercel", owner: "dev", effort: "S", status: "pending" },
      { id: "p4-5", text: "ประกาศ deprecation @sellsuki-org/sellsuki-components", owner: "both", effort: "XS", status: "pending" },
      { id: "p4-6", text: "Update CLAUDE.md + AGENTS.md ให้ตรงกับ DS 3.0 rules", owner: "uxui", effort: "S", status: "pending" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ACCENT_21 = "#EC5E2A";
const ACCENT_20 = "#32a9ff";

const statusConfig: Record<PhaseStatus, { icon: React.ReactNode; label: string; color: string }> = {
  completed: { icon: <CheckCircle2 size={16} />, label: "เสร็จแล้ว", color: "#059669" },
  "in-progress": { icon: <Clock size={16} />, label: "กำลังทำ", color: ACCENT_20 },
  pending: { icon: <Circle size={16} />, label: "รอดำเนินการ", color: "#9ca3af" },
};

const ownerConfig: Record<Task["owner"], { label: string; color: string }> = {
  uxui: { label: "UX/UI", color: ACCENT_21 },
  dev: { label: "Dev", color: ACCENT_20 },
  both: { label: "Both", color: "#d97706" },
};

const effortConfig: Record<Task["effort"], { label: string; color: string }> = {
  XS: { label: "XS", color: "#059669" },
  S: { label: "S", color: "#0284c7" },
  M: { label: "M", color: "#d97706" },
  L: { label: "L", color: "#e11d48" },
};

const H4: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px" };
const P: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 400, color: "var(--muted-foreground)", margin: 0 };
const Label: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: 400, color: "var(--foreground)" };

function StatusBadge({ status }: { status: PhaseStatus }) {
  const cfg = statusConfig[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "99px",
      background: `${cfg.color}14`, color: cfg.color,
      fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: 600,
      border: `1px solid ${cfg.color}30`,
    }}>
      {cfg.icon}{cfg.label}
    </span>
  );
}

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      padding: "1px 8px", borderRadius: "99px",
      background: `${color}14`, color,
      fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: 600,
      border: `1px solid ${color}28`,
    }}>
      {text}
    </span>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const completedCount = phase.tasks.filter((t) => t.status === "completed").length;
  const progress = Math.round((completedCount / phase.tasks.length) * 100);

  return (
    <div style={{
      background: "var(--card)", borderRadius: "12px",
      border: "1px solid var(--border)", overflow: "hidden",
      boxShadow: "0 1px 3px #0000000d",
    }}>
      {/* Phase header */}
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--border)", background: `${ACCENT_21}04` }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 800, color: ACCENT_21 }}>
                {phase.id.replace("phase-", "Phase ")}
              </span>
              <StatusBadge status={phase.status} />
            </div>
            <h3 style={H4}>{phase.subtitle}</h3>
            <p style={{ ...P, marginTop: "2px" }}>{phase.duration}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: 700, color: ACCENT_21 }}>
              {completedCount}/{phase.tasks.length}
            </span>
            <p style={{ ...P, fontSize: "var(--text-label)" }}>tasks</p>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ height: "6px", borderRadius: "99px", background: "var(--muted)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: ACCENT_21, borderRadius: "99px", transition: "width 0.4s" }} />
        </div>
      </div>

      {/* Tasks */}
      <div style={{ padding: "0" }}>
        {phase.tasks.map((task, i) => (
          <div
            key={task.id}
            style={{
              display: "flex", alignItems: "flex-start", gap: "12px",
              padding: "14px 24px",
              borderBottom: i < phase.tasks.length - 1 ? "1px solid var(--border)" : "none",
              background: task.status === "completed" ? `${ACCENT_21}06` : "transparent",
            }}
          >
            <span style={{ color: statusConfig[task.status].color, flexShrink: 0, marginTop: "2px" }}>
              {statusConfig[task.status].icon}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ ...Label, opacity: task.status === "completed" ? 0.6 : 1 }}>
                {task.text}
              </span>
              {task.note && (
                <p style={{ ...P, fontSize: "var(--text-label)", marginTop: "2px", color: "#d97706" }}>
                  ⚠ {task.note}
                </p>
              )}
            </div>
            <div style={{ display: "flex", gap: "6px", flexShrink: 0, alignItems: "center" }}>
              <Pill text={ownerConfig[task.owner].label} color={ownerConfig[task.owner].color} />
              <Pill text={effortConfig[task.effort].label} color={effortConfig[task.effort].color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function Ds21RoadmapPage() {
  const totalTasks = PHASES.flatMap((p) => p.tasks).length;
  const completedTasks = PHASES.flatMap((p) => p.tasks).filter((t) => t.status === "completed").length;
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <span style={{
            padding: "3px 12px", borderRadius: "99px",
            background: `${ACCENT_21}14`, color: ACCENT_21,
            fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: 700,
            border: `1px solid ${ACCENT_21}30`,
          }}>
            DS 3.0 Upgrade
          </span>
          <span style={{
            padding: "3px 12px", borderRadius: "99px",
            background: "rgba(217,119,6,0.1)", color: "#d97706",
            fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: 600,
            border: "1px solid rgba(217,119,6,0.25)",
          }}>
            In Planning
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--foreground)", margin: "0 0 8px" }}>
          Upgrade Roadmap
        </h2>
        <p style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", color: "var(--muted-foreground)", margin: 0, maxWidth: "600px" }}>
          จาก DS 1.0 Architecture (Web Components · Lit) → DS 3.0 คุณภาพ DS 2.0 — Framework-agnostic, UX/UI-driven, ทุก product ใช้ได้โดยไม่ต้องเขียนใหม่
        </p>
      </div>

      {/* Strategy overview cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
        {[
          { icon: <Globe size={20} />, title: "Framework-agnostic", desc: "Web Components ทำงานได้ใน React, Vue, Angular, Vanilla JS" },
          { icon: <Zap size={20} />, title: "UX/UI-driven", desc: "Token push โดยไม่รอ Dev — visual ทุก product อัปเดตพร้อมกัน" },
          { icon: <Package size={20} />, title: "Zero migration debt", desc: "Product เดิมไม่แตก — แค่ update package version" },
        ].map((c, i) => (
          <div key={i} style={{
            background: "var(--card)", borderRadius: "10px",
            border: "1px solid var(--border)", padding: "18px 20px",
          }}>
            <span style={{ color: ACCENT_21, display: "block", marginBottom: "8px" }}>{c.icon}</span>
            <p style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px" }}>{c.title}</p>
            <p style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", color: "var(--muted-foreground)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div style={{
        background: "var(--card)", borderRadius: "10px",
        border: "1px solid var(--border)", padding: "20px 24px",
        marginBottom: "32px", display: "flex", alignItems: "center", gap: "24px",
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 700, color: "var(--foreground)" }}>Overall Progress</span>
            <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 700, color: ACCENT_21 }}>{overallProgress}%</span>
          </div>
          <div style={{ height: "8px", borderRadius: "99px", background: "var(--muted)" }}>
            <div style={{ height: "100%", width: `${overallProgress}%`, background: ACCENT_21, borderRadius: "99px", transition: "width 0.4s" }} />
          </div>
          <p style={{ ...P, marginTop: "6px", fontSize: "var(--text-label)" }}>{completedTasks} / {totalTasks} tasks เสร็จแล้ว</p>
        </div>
        <div style={{ display: "flex", gap: "16px", flexShrink: 0 }}>
          {Object.entries(ownerConfig).map(([key, val]) => (
            <div key={key} style={{ textAlign: "center" }}>
              <div style={{ ...P, fontSize: "var(--text-label)", marginBottom: "2px" }}>{val.label}</div>
              <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 700, color: val.color }}>
                {PHASES.flatMap((p) => p.tasks).filter((t) => t.owner === key || t.owner === "both").length}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        <span style={{ ...P, fontSize: "var(--text-label)" }}>Owner:</span>
        {Object.entries(ownerConfig).map(([k, v]) => <Pill key={k} text={v.label} color={v.color} />)}
        <span style={{ ...P, fontSize: "var(--text-label)", marginLeft: "8px" }}>Effort:</span>
        {Object.entries(effortConfig).map(([k, v]) => <Pill key={k} text={v.label} color={v.color} />)}
      </div>

      {/* Risk Banner */}
      <div style={{
        background: "rgba(217,119,6,0.07)", border: "1px solid rgba(217,119,6,0.25)",
        borderRadius: "10px", padding: "14px 20px", marginBottom: "32px",
        display: "flex", gap: "12px", alignItems: "flex-start",
      }}>
        <AlertTriangle size={20} style={{ color: "#d97706", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: 700, color: "#d97706", margin: "0 0 4px" }}>
            Key Risks ที่ต้องติดตาม
          </p>
          <ul style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              "Product ที่ใช้ framework ไม่ใช่ React → ต้องประเมิน migration timeline แยก",
              "I18n system ใน DS 1.0 ไม่มีใน DS 3.0 → product ที่ใช้ต้องหา solution เอง (react-i18next หรือ i18next)",
              "Lit knowledge ในทีม — ต้องการ Dev ที่รู้ Lit อย่างน้อย 1 คน",
              "React 18 (ก่อน 19) มี Web Component event friction — ใช้ wrapper utility",
            ].map((r, i) => (
              <li key={i} style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", color: "var(--foreground)" }}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Phase cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {PHASES.map((phase) => <PhaseCard key={phase.id} phase={phase} />)}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: "32px", padding: "16px 20px",
        background: `${ACCENT_21}08`, borderRadius: "10px",
        border: `1px solid ${ACCENT_21}20`,
      }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <Layers size={18} style={{ color: ACCENT_21, flexShrink: 0, marginTop: "2px" }} />
          <p style={{ ...P, fontSize: "var(--text-label)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--foreground)" }}>DS 2.0 (React)</strong> ยังคงใช้งานได้ต่อในฐานะ Visual Reference + Prototype playground
            — DS 3.0 Preview site ใช้ DS 2.0 showcase เป็น host โดย Web Components ทำงานได้ใน React
            ผ่านการ embed ปกติ ไม่ต้องสร้าง preview site ใหม่
          </p>
        </div>
      </div>
    </div>
  );
}
