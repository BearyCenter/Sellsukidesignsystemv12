import React from "react";
import { Layers, ChevronRight } from "lucide-react";
import { CodeBlock } from "../components/code-block";
import { useI18n } from "../i18n";

// ─── Shared styles (CSS variables only) ───────────────────────────────────────

export const fontLabel: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" };
export const fontLabelBold: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" };
export const smallLabel: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.85)", fontWeight: "var(--weight-label)" };
export const btnStyle: React.CSSProperties = { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" };
export const mono: React.CSSProperties = { fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.92)", fontWeight: "var(--weight-label)" };

// ─── Section ──────────────────────────────────────────────────────────────────

export function Section({ title, description, children, code }: { title: string; description?: string; children: React.ReactNode; code?: string }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-foreground">{title}</h4>
        {description && <p className="text-muted-foreground mt-0.5" style={fontLabel}>{description}</p>}
      </div>
      {children}
      {code && <CodeBlock code={code} />}
    </div>
  );
}

// ─── DemoCard ─────────────────────────────────────────────────────────────────

export function DemoCard({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <span className="uppercase tracking-wider text-muted-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.75)", fontWeight: "var(--weight-label)" }}>{label}</span>
      {children}
    </div>
  );
}

// ─── API Table ────────────────────────────────────────────────────────────────

interface PropRow { prop: string; type: string; def: string; desc: string; }

export function APITable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden">
      <div className="px-5 py-3 bg-muted/30 border-b border-border">
        <span className="text-foreground" style={fontLabelBold}>API Reference</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/20 border-b border-border">
              <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Prop</th>
              <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Type</th>
              <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Default</th>
              <th className="text-left px-4 py-2 text-muted-foreground hidden md:table-cell" style={btnStyle}>Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.prop}>
                <td className="px-4 py-2"><code className="text-primary" style={mono}>{r.prop}</code></td>
                <td className="px-4 py-2"><code className="text-foreground" style={mono}>{r.type}</code></td>
                <td className="px-4 py-2"><code className="text-muted-foreground" style={mono}>{r.def}</code></td>
                <td className="px-4 py-2 text-muted-foreground hidden md:table-cell" style={smallLabel}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────

export function PageHeader({ titleKey, descKey }: { titleKey: string; descKey: string }) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex items-center gap-2 text-primary mb-2 caption">
        <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t(titleKey)}</span>
      </div>
      <h1 className="text-foreground">{t(titleKey)}</h1>
      <p className="text-muted-foreground mt-1 max-w-2xl" style={fontLabel}>{t(descKey)}</p>
    </div>
  );
}

// ─── Demo Box ─────────────────────────────────────────────────────────────────

export function DemoBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 rounded-[var(--radius-lg)] border border-border bg-card ${className ?? ""}`}>
      {children}
    </div>
  );
}