import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Activity,
  Cpu,
  Zap,
  CheckCircle2,
  RefreshCw,
  Clock,
  AlertCircle,
  Plug,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Server,
  WifiOff,
  FileText,
  Copy,
  Check,
  Download,
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────

const c = {
  primary:      "#32a9ff",
  primaryLight: "#f0f9ff",
  primaryBorder:"#8edcff",
  text:         "#1f2937",
  textSec:      "#6b7280",
  placeholder:  "#9ca3af",
  border:       "#e5e7eb",
  bgPage:       "#f9fafb",
  bgCard:       "#ffffff",
  success:      "#059669",
  successBg:    "#ecfdf5",
  warning:      "#d97706",
  warningBg:    "#fffbeb",
  danger:       "#e11d48",
  dangerBg:     "#fff1f2",
};

const fontBody   = "'DB HeaventRounded', 'Noto Sans Thai', sans-serif";
const fontButton = "Inter, 'Noto Sans Thai', sans-serif";

const f = {
  h3:    { fontFamily: fontBody,   fontSize: 24, fontWeight: 700 } as React.CSSProperties,
  h4:    { fontFamily: fontBody,   fontSize: 18, fontWeight: 600 } as React.CSSProperties,
  label: { fontFamily: fontBody,   fontSize: 16, fontWeight: 400 } as React.CSSProperties,
  num:   { fontFamily: fontButton, fontSize: 14, fontWeight: 600 } as React.CSSProperties,
  numSm: { fontFamily: fontButton, fontSize: 12, fontWeight: 500 } as React.CSSProperties,
  numLg: { fontFamily: fontButton, fontSize: 28, fontWeight: 700 } as React.CSSProperties,
  btn:   { fontFamily: fontButton, fontSize: 13, fontWeight: 600 } as React.CSSProperties,
};

// ─── Tool metadata (colours / icons) for display only ────────────────────────

const TOOL_META: Record<string, { icon: string; color: string; bg: string; category: string }> = {
  get_component:        { icon: "⚙️", color: c.primary,  bg: c.primaryLight, category: "Components"  },
  list_components:      { icon: "📋", color: c.primary,  bg: c.primaryLight, category: "Components"  },
  generate_page_layout: { icon: "🏗️", color: "#f97316",  bg: "#fff7ed",      category: "Generation"  },
  get_design_tokens:    { icon: "🎨", color: "#8b5cf6",  bg: "#f5f3ff",      category: "Tokens"      },
  get_color_palette:    { icon: "🌈", color: "#8b5cf6",  bg: "#f5f3ff",      category: "Tokens"      },
  get_brand_rules:      { icon: "📖", color: c.success,  bg: c.successBg,    category: "Foundation"  },
  get_quick_start:      { icon: "🚀", color: c.success,  bg: c.successBg,    category: "Foundation"  },
};

const KNOWN_TOOLS = Object.keys(TOOL_META);

// ─── Types ────────────────────────────────────────────────────────────────────

type RequestLog = {
  id:       string;
  tool:     string;
  params:   string;
  duration: number;
  status:   "success" | "error";
  ts:       string;  // ISO 8601
};

type LogFile = {
  requests: RequestLog[];
  updated:  string;
};

// ─── Fetch helpers ────────────────────────────────────────────────────────────

const LOG_URL = "/mcp-log.json";
const POLL_MS = 5000;  // refresh every 5 s

async function fetchLog(): Promise<LogFile | null> {
  try {
    const res = await fetch(`${LOG_URL}?t=${Date.now()}`);
    if (!res.ok) return null;
    return (await res.json()) as LogFile;
  } catch {
    return null;
  }
}

// ─── Derived stats ────────────────────────────────────────────────────────────

function deriveStats(requests: RequestLog[]) {
  if (requests.length === 0) {
    return { totalToday: 0, avgMs: 0, successPct: 100, errCount: 0, toolCounts: {} };
  }

  const totalToday  = requests.length;
  const avgMs       = Math.round(requests.reduce((s, r) => s + r.duration, 0) / requests.length);
  const successes   = requests.filter((r) => r.status === "success").length;
  const errCount    = totalToday - successes;
  const successPct  = Math.round((successes / totalToday) * 1000) / 10;

  const toolCounts: Record<string, number> = {};
  for (const r of requests) {
    toolCounts[r.tool] = (toolCounts[r.tool] ?? 0) + 1;
  }

  return { totalToday, avgMs, successPct, errCount, toolCounts };
}

function calcRpm(requests: RequestLog[]): number {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = requests.filter((r) => now - new Date(r.ts).getTime() < windowMs);
  return recent.length;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MCPTrackerPage() {
  const [log,          setLog]         = useState<RequestLog[]>([]);
  const [lastRefresh,  setLastRefresh] = useState<Date | null>(null);
  const [isLive,       setIsLive]      = useState(true);
  const [dataSource,   setDataSource]  = useState<"real" | "empty" | "loading">("loading");
  const [reportCopied,  setReportCopied]  = useState(false);
  const [showReport,    setShowReport]    = useState(false);
  const [reportText,    setReportText]    = useState("");

  // Export date range — default: today
  const todayStr = new Date().toISOString().slice(0, 10);
  const [exportFrom, setExportFrom] = useState(todayStr);
  const [exportTo,   setExportTo]   = useState(todayStr);

  const load = useCallback(async () => {
    const data = await fetchLog();
    if (data) {
      setLog(data.requests);
      setLastRefresh(new Date(data.updated));
      setDataSource(data.requests.length > 0 ? "real" : "empty");
    } else {
      setDataSource("empty");
    }
  }, []);

  // Initial load
  useEffect(() => { load(); }, [load]);

  // Polling
  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [isLive, load]);

  const handleFeatureReport = useCallback(() => {
    const { totalToday, avgMs, successPct, toolCounts } = deriveStats(log);
    const topTools = Object.entries(toolCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const text = [
      "# Sellsuki DS — MCP Feature Report",
      `Generated: ${new Date().toLocaleString("en-GB")}`,
      "",
      `Total Requests : ${totalToday}`,
      `Avg Response   : ${avgMs}ms`,
      `Success Rate   : ${successPct}%`,
      `Req / min      : ${calcRpm(log)}`,
      "",
      "Top Tools:",
      ...topTools.map(([tool, count]) => `  ${tool}: ${count} calls`),
    ].join("\n");
    setReportText(text);
    setShowReport(true);
  }, [log]);

  const handleCopyReport = useCallback(() => {
    navigator.clipboard?.writeText(reportText).then(() => {
      setReportCopied(true);
      setTimeout(() => setReportCopied(false), 2000);
    });
  }, [reportText]);

  // Filter log by selected date range
  const filteredLog = log.filter((r) => {
    const d = r.ts.slice(0, 10); // "YYYY-MM-DD"
    return d >= exportFrom && d <= exportTo;
  });

  const handleExportExcel = useCallback(() => {
    const rows = log.filter((r) => {
      const d = r.ts.slice(0, 10);
      return d >= exportFrom && d <= exportTo;
    });

    const headers = ["Date / Time", "ID", "Tool", "Params", "Duration (ms)", "Status"];
    const csvRows = rows.map((r) => {
      const ts = new Date(r.ts);
      const dateStr = ts.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const timeStr = ts.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      return [
        `${dateStr} ${timeStr}`,
        r.id,
        r.tool,
        r.params ?? "",
        r.duration,
        r.status,
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
    });

    // UTF-8 BOM so Excel opens Thai/special chars correctly
    const bom = "\uFEFF";
    const csv = bom + [headers.join(","), ...csvRows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `mcp-report_${exportFrom}_to_${exportTo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [log, exportFrom, exportTo]);

  const { totalToday, avgMs, successPct, errCount, toolCounts } = deriveStats(log);
  const rpm     = calcRpm(log);
  const maxCount = Math.max(1, ...Object.values(toolCounts));

  // Build tool rows — include known tools even if count is 0
  const toolRows = KNOWN_TOOLS.map((name) => ({
    name,
    count: toolCounts[name] ?? 0,
    meta:  TOOL_META[name],
  })).sort((a, b) => b.count - a.count);

  const statCards = [
    {
      label: "Total Requests Logged",
      value: totalToday.toLocaleString(),
      icon:  <Activity size={20} />,
      sub:   dataSource === "real" ? `Last ${log.length} recorded calls` : "—",
      color: c.primary,
      bg:    c.primaryLight,
      pulse: false,
    },
    {
      label: "Requests / min",
      value: rpm.toString(),
      icon:  <Zap size={20} />,
      sub:   isLive ? "Polling every 5 s" : "Paused",
      color: "#f97316",
      bg:    "#fff7ed",
      pulse: isLive,
    },
    {
      label: "Avg Response Time",
      value: log.length ? `${avgMs}ms` : "—",
      icon:  <Cpu size={20} />,
      sub:   avgMs > 0 ? (avgMs < 150 ? "Within SLA" : "Above SLA") : "No data",
      color: avgMs < 150 ? c.success : c.warning,
      bg:    avgMs < 150 ? c.successBg : c.warningBg,
      pulse: false,
    },
    {
      label: "Success Rate",
      value: log.length ? `${successPct}%` : "—",
      icon:  <CheckCircle2 size={20} />,
      sub:   errCount > 0 ? `${errCount} error${errCount > 1 ? "s" : ""}` : "No errors",
      color: errCount === 0 ? c.success : c.warning,
      bg:    errCount === 0 ? c.successBg : c.warningBg,
      pulse: false,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Plug size={18} color={c.primary} />
            <h1 style={{ ...f.h3, color: "var(--foreground)" }}>MCP Request Tracker</h1>
            {dataSource === "real" && (
              <span
                className="px-2 py-0.5 rounded-full flex items-center gap-1 ml-1"
                style={{ ...f.numSm, background: c.successBg, color: c.success }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: c.success }} />
                LIVE · Real Data
              </span>
            )}
            {dataSource === "empty" && (
              <span
                className="px-2 py-0.5 rounded-full flex items-center gap-1 ml-1"
                style={{ ...f.numSm, background: c.warningBg, color: c.warning }}
              >
                <WifiOff size={11} /> Waiting for data
              </span>
            )}
            {dataSource === "loading" && (
              <span style={{ ...f.numSm, color: c.placeholder }}>Loading…</span>
            )}
          </div>
          <p style={{ ...f.label, color: "var(--muted-foreground)" }}>
            ข้อมูลจริงจาก Sellsuki Design System MCP Server · อัปเดตทุก {POLL_MS / 1000} วินาที
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLive((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border transition-all"
            style={{
              borderColor: isLive ? c.success : c.border,
              background:  isLive ? c.successBg : "var(--card)",
              ...f.btn,
              color: isLive ? c.success : c.textSec,
            }}
          >
            <Activity size={14} />
            {isLive ? "Live" : "Paused"}
          </button>

          <button
            onClick={handleFeatureReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border hover:bg-gray-50 transition-all"
            style={{ borderColor: c.border, background: "var(--card)", ...f.btn, color: c.textSec }}
          >
            <FileText size={13} />
            Feature Report
          </button>

          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border hover:bg-gray-50 transition-all"
            style={{ borderColor: c.border, ...f.btn, color: c.textSec, background: "var(--card)" }}
          >
            <RefreshCw size={13} />
            Refresh
          </button>

          {lastRefresh && (
            <span style={{ ...f.numSm, color: c.placeholder }}>
              Updated {lastRefresh.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          )}
        </div>
      </div>

      {/* ── No data yet ──────────────────────────────────────────────────────── */}
      {dataSource === "empty" && (
        <div
          className="rounded-[8px] border p-8 flex flex-col items-center gap-3 text-center"
          style={{ borderColor: c.border, borderStyle: "dashed", background: c.bgPage }}
        >
          <WifiOff size={32} color={c.placeholder} />
          <div>
            <p style={{ ...f.h4, color: c.text }}>ยังไม่มีข้อมูล MCP Requests</p>
            <p style={{ ...f.label, color: c.textSec, marginTop: 4 }}>
              ใช้ MCP tools (get_component, list_components, …) ผ่าน Claude Code
              แล้วข้อมูลจะปรากฏที่นี่อัตโนมัติ
            </p>
          </div>
          <div
            className="mt-2 px-4 py-2 rounded-[8px] border"
            style={{ borderColor: c.primaryBorder, background: c.primaryLight }}
          >
            <code style={{ ...f.numSm, color: c.primary }}>
              public/mcp-log.json is written by the MCP server on every tool call
            </code>
          </div>
        </div>
      )}

      {/* ── Stat Cards ───────────────────────────────────────────────────────── */}
      {dataSource !== "loading" && (
        <div className="grid grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <div
              key={i}
              className="rounded-[8px] border p-5"
              style={{ borderColor: c.border, background: "var(--card)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span style={{ ...f.label, color: c.textSec, fontSize: 14 }}>{s.label}</span>
                <div
                  className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.icon}
                </div>
              </div>
              <div style={{ ...f.numLg, color: "var(--foreground)" }}>{s.value}</div>
              <div className="flex items-center gap-1.5 mt-2">
                {s.pulse ? (
                  <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: s.color }} />
                ) : errCount === 0 || i !== 3 ? (
                  <TrendingUp size={13} color={c.success} />
                ) : (
                  <TrendingDown size={13} color={c.warning} />
                )}
                <span style={{ ...f.numSm, color: s.color }}>{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tool Breakdown + Activity Log ────────────────────────────────────── */}
      {dataSource !== "loading" && (
        <div className="grid grid-cols-5 gap-4">

          {/* Tool Usage Bars */}
          <div
            className="col-span-2 rounded-[8px] border p-5"
            style={{ borderColor: c.border, background: "var(--card)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} color={c.primary} />
              <h2 style={{ ...f.h4, color: "var(--foreground)" }}>Tool Usage</h2>
              <span className="ml-auto" style={{ ...f.numSm, color: c.placeholder }}>
                {totalToday.toLocaleString()} total
              </span>
            </div>

            <div className="space-y-4">
              {toolRows.map(({ name, count, meta }) => {
                const pct = totalToday > 0 ? Math.round((count / maxCount) * 100) : 0;
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 14 }}>{meta.icon}</span>
                        <div>
                          <span className="font-mono block" style={{ ...f.numSm, color: "var(--foreground)", fontSize: 12 }}>
                            {name}
                          </span>
                          <span style={{ ...f.numSm, color: c.placeholder, fontSize: 11 }}>{meta.category}</span>
                        </div>
                      </div>
                      <span style={{ ...f.num, color: count > 0 ? c.textSec : c.placeholder }}>
                        {count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: c.border }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: count > 0 ? meta.color : c.border }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div
            className="col-span-3 rounded-[8px] border overflow-hidden"
            style={{ borderColor: c.border, background: "var(--card)" }}
          >
            <div
              className="flex flex-col border-b"
              style={{ borderColor: c.border }}
            >
              {/* Row 1: title + count */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} color={c.primary} />
                  <h2 style={{ ...f.h4, color: "var(--foreground)" }}>Recent Requests</h2>
                  <span
                    className="px-1.5 py-0.5 rounded-full"
                    style={{ ...f.numSm, background: c.primaryLight, color: c.primary, fontSize: 10 }}
                  >
                    Real
                  </span>
                </div>
                <span style={{ ...f.numSm, color: c.placeholder }}>
                  {filteredLog.length} / {log.length} calls
                </span>
              </div>

              {/* Row 2: date range filter + export */}
              <div
                className="flex items-center gap-2 px-4 pb-3"
                style={{ borderTop: `1px solid ${c.border}`, paddingTop: 10 }}
              >
                <span style={{ ...f.numSm, color: c.textSec }}>Filter:</span>
                <input
                  type="date"
                  value={exportFrom}
                  onChange={(e) => setExportFrom(e.target.value)}
                  className="h-7 px-2 rounded-[6px] border text-[12px]"
                  style={{ borderColor: c.border, fontFamily: "'DB HeaventRounded', sans-serif", color: c.text, background: "var(--card)" }}
                />
                <span style={{ ...f.numSm, color: c.textSec }}>–</span>
                <input
                  type="date"
                  value={exportTo}
                  onChange={(e) => setExportTo(e.target.value)}
                  className="h-7 px-2 rounded-[6px] border text-[12px]"
                  style={{ borderColor: c.border, fontFamily: "'DB HeaventRounded', sans-serif", color: c.text, background: "var(--card)" }}
                />
                <button
                  onClick={handleExportExcel}
                  disabled={filteredLog.length === 0}
                  className="flex items-center gap-1.5 h-7 px-3 rounded-[6px] border transition-all disabled:opacity-40"
                  style={{
                    borderColor: c.primary,
                    background:  c.primaryLight,
                    color:       c.primary,
                    ...f.btn,
                  }}
                >
                  <Download size={12} />
                  Export Excel ({filteredLog.length})
                </button>
              </div>
            </div>

            {log.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-2">
                <Clock size={28} color={c.placeholder} />
                <p style={{ ...f.label, color: c.placeholder }}>Waiting for MCP tool calls…</p>
              </div>
            ) : (
              <div className="overflow-auto" style={{ maxHeight: 380 }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                      {["Date / Time", "ID", "Tool", "Params", "Duration", "Status"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-3 py-2 sticky top-0"
                          style={{ ...f.numSm, color: c.textSec, background: c.bgPage, fontSize: 11, whiteSpace: "nowrap", zIndex: 1 }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLog.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10" style={{ ...f.numSm, color: c.placeholder }}>
                          No requests in selected date range
                        </td>
                      </tr>
                    ) : filteredLog.map((req, i) => {
                      const ts = new Date(req.ts);
                      const dateStr = ts.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                      const timeStr = `${dateStr} · ${ts.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
                      return (
                        <tr
                          key={req.id + i}
                          className="hover:bg-[#f9fafb] transition-colors"
                          style={{ borderBottom: i < filteredLog.length - 1 ? `1px solid ${c.border}` : "none" }}
                        >
                          <td className="px-3 py-2 font-mono whitespace-nowrap" style={{ ...f.numSm, color: c.placeholder, fontSize: 11 }}>
                            {timeStr}
                          </td>
                          <td className="px-3 py-2 font-mono" style={{ ...f.numSm, color: c.placeholder, fontSize: 11 }}>
                            {req.id}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span
                              className="font-mono"
                              style={{ ...f.numSm, color: TOOL_META[req.tool]?.color ?? c.primary, fontSize: 11 }}
                            >
                              {req.tool}
                            </span>
                          </td>
                          <td className="px-3 py-2 max-w-[130px] truncate">
                            <span style={{ ...f.numSm, color: c.textSec, fontSize: 11 }}>{req.params || "—"}</span>
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <span style={{ ...f.num, fontSize: 12, color: req.duration < 150 ? c.success : req.duration < 250 ? c.warning : c.danger }}>
                              {req.duration}ms
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {req.status === "success" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ ...f.numSm, background: c.successBg, color: c.success, fontSize: 11 }}>
                                <CheckCircle2 size={11} /> OK
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ ...f.numSm, background: c.dangerBg, color: c.danger, fontSize: 11 }}>
                                <AlertCircle size={11} /> ERR
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MCP Server Status Bar ─────────────────────────────────────────────── */}
      <div
        className="rounded-[8px] border p-4 flex flex-wrap items-center gap-x-6 gap-y-2"
        style={{ borderColor: c.primaryBorder, background: c.primaryLight }}
      >
        <div className="flex items-center gap-2">
          <Server size={15} color={c.primary} />
          <span style={{ ...f.label, fontWeight: 600, color: c.text, fontSize: 14 }}>MCP Server</span>
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ ...f.numSm, background: c.successBg, color: c.success }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: c.success }} />
            Online
          </span>
        </div>
        <Sep />
        <span style={{ ...f.numSm, color: c.textSec }}>
          Log: <code style={{ color: c.text, fontFamily: "monospace" }}>public/mcp-log.json</code>
        </span>
        <Sep />
        <span style={{ ...f.numSm, color: c.textSec }}>
          Tools: <strong style={{ color: c.primary }}>7 active</strong>
        </span>
        <Sep />
        <span style={{ ...f.numSm, color: c.textSec }}>
          Package: <code style={{ color: c.text, fontFamily: "monospace" }}>@uxuissk/design-system@0.7.1</code>
        </span>
        <Sep />
        <span style={{ ...f.numSm, color: c.textSec }}>
          Storybook:{" "}
          <a href="https://sellsukidesignsystemv12.vercel.app" target="_blank" rel="noreferrer" style={{ color: c.primary, textDecoration: "underline" }}>
            sellsukidesignsystemv12.vercel.app
          </a>
        </span>
      </div>

      {/* ── Feature Report Modal (portal → document.body to escape AppShell transform) */}
      {showReport && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowReport(false)}
        >
          <div
            className="relative rounded-[8px] border shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] w-full max-w-lg mx-4"
            style={{ background: "var(--card)", borderColor: c.border }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: c.border }}
            >
              <div className="flex items-center gap-2">
                <FileText size={16} color={c.primary} />
                <span style={{ ...f.h4, color: "var(--foreground)" }}>Feature Report</span>
              </div>
              <button
                onClick={() => setShowReport(false)}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-gray-100 transition-colors"
                style={{ color: c.textSec }}
              >
                ✕
              </button>
            </div>

            {/* Report body */}
            <div className="px-5 py-4">
              <pre
                className="rounded-[6px] p-4 text-[12px] leading-relaxed overflow-auto"
                style={{
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  background: c.bgPage,
                  color: c.text,
                  border: `1px solid ${c.border}`,
                  maxHeight: 320,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {reportText}
              </pre>
            </div>

            {/* Modal footer */}
            <div
              className="flex items-center justify-end gap-2 px-5 py-3 border-t"
              style={{ borderColor: c.border }}
            >
              <button
                onClick={() => setShowReport(false)}
                className="px-4 py-1.5 rounded-[6px] border hover:bg-gray-50 transition-colors"
                style={{ borderColor: c.border, ...f.btn, color: c.textSec, background: "var(--card)" }}
              >
                Close
              </button>
              <button
                onClick={handleCopyReport}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] border transition-all"
                style={{
                  borderColor: reportCopied ? c.success : c.primary,
                  background:  reportCopied ? c.successBg : c.primaryLight,
                  color:       reportCopied ? c.success : c.primary,
                  ...f.btn,
                }}
              >
                {reportCopied ? <Check size={13} /> : <Copy size={13} />}
                {reportCopied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </div>
  );
}

function Sep() {
  return <div className="h-4 w-px" style={{ background: "#bae6fd" }} />;
}
