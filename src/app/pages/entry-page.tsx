import { useState } from "react";
import SellsukiFull from "../../imports/SellsukiFull";
import {
  ArrowRight,
  Zap,
  Server,
  Layers,
  CheckCircle2,
  Package,
  Moon,
  Sun,
  Boxes,
  Puzzle,
  Globe,
  Cpu,
} from "lucide-react";

export type DsMode = "2.0" | "3.0";

interface EntryPageProps {
  onSelectMode: (mode: DsMode) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const pill = (color: string, text: string) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      padding: "2px 10px",
      borderRadius: "99px",
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-label)",
      fontWeight: 600,
      background: `${color}14`,
      color,
      border: `1px solid ${color}30`,
    }}
  >
    {text}
  </span>
);

interface FeatureRow {
  icon: React.ReactNode;
  text: string;
}

function FeatureList({ features, color }: { features: FeatureRow[]; color: string }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
      {features.map((f, i) => (
        <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color, flexShrink: 0 }}>{f.icon}</span>
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-label)",
              fontWeight: 400,
              color: "var(--foreground)",
              lineHeight: 1.5,
            }}
          >
            {f.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function EntryPage({ onSelectMode, darkMode, toggleDarkMode }: EntryPageProps) {
  const [hovering, setHovering] = useState<DsMode | null>(null);

  const accent20 = "#32a9ff";
  const accent21 = "#EC5E2A";

  const features20: FeatureRow[] = [
    { icon: <Package size={18} />, text: "React · Vite 6 · TypeScript" },
    { icon: <Layers size={18} />, text: "60+ Components พร้อมใช้งาน" },
    { icon: <Server size={18} />, text: "MCP Server + AI Tools" },
    { icon: <Zap size={18} />, text: "7 Brand configs + AppShell" },
    { icon: <CheckCircle2 size={18} />, text: "Dark mode · i18n · Responsive" },
    { icon: <CheckCircle2 size={18} />, text: "Charts, AdvancedTable, Scaffold" },
  ];

  const features21: FeatureRow[] = [
    { icon: <Globe size={18} />, text: "Web Components · Lit · Framework-agnostic" },
    { icon: <Boxes size={18} />, text: "DS 1.0 Architecture → DS 3.0 Quality" },
    { icon: <Puzzle size={18} />, text: "React, Vue, Angular, Vanilla JS ใช้ได้" },
    { icon: <Cpu size={18} />, text: "Storybook 8 · Vite 6 · Token Bridge" },
    { icon: <Zap size={18} />, text: "UX/UI-driven — Token push โดยไม่รอ Dev" },
    { icon: <CheckCircle2 size={18} />, text: "Product เดิมไม่แตก — upgrade ได้ทันที" },
  ];

  const cardBase: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    background: "var(--card)",
    borderRadius: "16px",
    border: "1px solid var(--border)",
    padding: "36px 32px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    cursor: "pointer",
    transition: "box-shadow 0.2s, transform 0.15s, border-color 0.2s",
    position: "relative",
    overflow: "hidden",
  };

  const card20Style: React.CSSProperties = {
    ...cardBase,
    borderColor: hovering === "2.0" ? accent20 : "var(--border)",
    boxShadow: hovering === "2.0" ? `0 0 0 3px ${accent20}22, 0 8px 32px ${accent20}18` : "0 1px 3px #0000000d",
    transform: hovering === "2.0" ? "translateY(-2px)" : "none",
  };

  const card21Style: React.CSSProperties = {
    ...cardBase,
    borderColor: hovering === "3.0" ? accent21 : "var(--border)",
    boxShadow: hovering === "3.0" ? `0 0 0 3px ${accent21}22, 0 8px 32px ${accent21}18` : "0 1px 3px #0000000d",
    transform: hovering === "3.0" ? "translateY(-2px)" : "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
      }}
    >
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "36px",
          height: "36px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--muted-foreground)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.15s, background 0.15s",
        }}
        title={darkMode ? "Light mode" : "Dark mode"}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <SellsukiFull height={36} />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--text-h2)",
            fontWeight: 700,
            color: "var(--foreground)",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Design System
        </h1>
        <p
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--text-p)",
            fontWeight: 400,
            color: "var(--muted-foreground)",
            margin: 0,
            maxWidth: "480px",
          }}
        >
          เลือก version ที่ต้องการเข้าใช้งาน
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          width: "100%",
          maxWidth: "900px",
          alignItems: "stretch",
        }}
      >
        {/* ── DS 2.0 ── */}
        <div
          style={card20Style}
          onClick={() => onSelectMode("2.0")}
          onMouseEnter={() => setHovering("2.0")}
          onMouseLeave={() => setHovering(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelectMode("2.0")}
          aria-label="Enter Design System 2.0"
        >
          {/* Glow accent top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${accent20}88, ${accent20})`,
              borderRadius: "16px 16px 0 0",
              opacity: hovering === "2.0" ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}
          />

          {/* Version badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {pill(accent20, "Design System")}
            <span
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-h3)",
                fontWeight: 800,
                color: accent20,
                lineHeight: 1,
              }}
            >
              2.0
            </span>
          </div>

          {/* Title */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-h3)",
                fontWeight: 700,
                color: "var(--foreground)",
                margin: "0 0 6px",
              }}
            >
              Stable Release
            </h2>
            <p
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-p)",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              React components พร้อมใช้งาน · MCP Server · Storybook 8
            </p>
          </div>

          {/* Features */}
          <FeatureList features={features20} color={accent20} />

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* CTA */}
          <button
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: hovering === "2.0" ? accent20 : `${accent20}14`,
              color: hovering === "2.0" ? "#fff" : accent20,
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-p)",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.15s, color 0.15s",
            }}
            onClick={() => onSelectMode("2.0")}
          >
            เข้าสู่ DS 2.0
            <ArrowRight size={18} />
          </button>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <div style={{ width: "1px", flex: 1, background: "var(--border)" }} />
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-label)",
              fontWeight: 600,
              color: "var(--muted-foreground)",
              padding: "4px",
            }}
          >
            หรือ
          </span>
          <div style={{ width: "1px", flex: 1, background: "var(--border)" }} />
        </div>

        {/* ── DS 3.0 ── */}
        <div
          style={card21Style}
          onClick={() => onSelectMode("3.0")}
          onMouseEnter={() => setHovering("3.0")}
          onMouseLeave={() => setHovering(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onSelectMode("3.0")}
          aria-label="Enter Design System 3.0"
        >
          {/* Glow accent top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${accent21}88, ${accent21})`,
              borderRadius: "16px 16px 0 0",
              opacity: hovering === "3.0" ? 1 : 0.5,
              transition: "opacity 0.2s",
            }}
          />

          {/* Version badge row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {pill(accent21, "Design System")}
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: "99px",
                  background: `${accent21}18`,
                  border: `1px solid ${accent21}40`,
                  fontFamily: "var(--font-label)",
                  fontSize: "var(--text-label)",
                  fontWeight: 700,
                  color: accent21,
                }}
              >
                Upgrade
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-h3)",
                fontWeight: 800,
                color: accent21,
                lineHeight: 1,
              }}
            >
              3.0
            </span>
          </div>

          {/* Title */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-h3)",
                fontWeight: 700,
                color: "var(--foreground)",
                margin: "0 0 6px",
              }}
            >
              Upgrade Architecture
            </h2>
            <p
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-p)",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Web Components · Lit · Framework-agnostic · DS 1.0 base
            </p>
          </div>

          {/* Features */}
          <FeatureList features={features21} color={accent21} />

          {/* Divider */}
          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* CTA */}
          <button
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: "var(--radius-md)",
              border: "none",
              background: hovering === "3.0" ? accent21 : `${accent21}14`,
              color: hovering === "3.0" ? "#fff" : accent21,
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-p)",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.15s, color 0.15s",
            }}
            onClick={() => onSelectMode("3.0")}
          >
            เข้าสู่ DS 3.0
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "40px",
          fontFamily: "var(--font-label)",
          fontSize: "var(--text-label)",
          color: "var(--muted-foreground)",
          textAlign: "center",
        }}
      >
        Sellsuki Design System · UX/UI Team · 2026
      </p>
    </div>
  );
}
