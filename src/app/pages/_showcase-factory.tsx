import React, { useState, useCallback, useRef, useEffect } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { useI18n } from "../i18n";

// ─── Shared styles (CSS variables only) ───────────────────────────────────────

export const fontBody: React.CSSProperties = { fontFamily: "var(--font-p)", fontSize: "var(--text-p)", fontWeight: "var(--weight-p)" };
// data/content minimum: var(--text-p) = 20px
export const fontLabel: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" };
// section heading UI label — 18px OK (UI chrome minimum)
export const fontLabelBold: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" };
export const smallLabel: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" };
export const btnStyle: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: "var(--weight-button)" };
export const mono: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-p)", fontWeight: "var(--weight-label)" };

// ─── Collapsible Code Block ───────────────────────────────────────────────────

/** Simple syntax highlighter — returns an array of JSX spans with token colors.
 *  Uses CSS variables from theme.css so colors can be restyled in one place. */
function highlightCode(code: string): React.ReactNode[] {
  const tokenRE =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:import|export|from|const|let|var|function|return|if|else|switch|case|default|for|while|do|break|continue|new|this|class|extends|type|interface|async|await|try|catch|throw|typeof|void|null|undefined|true|false)\b)|(\b[A-Z][A-Za-z0-9]*(?=\s*[<({]))|(<\/?[A-Za-z][A-Za-z0-9.-]*)|([{}()[\];,]|=>|\.\.\.)/g;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRE.exec(code)) !== null) {
    // Plain text before the match
    if (match.index > lastIndex) {
      result.push(
        <span key={`t${lastIndex}`} style={{ color: "var(--code-text)" }}>
          {code.slice(lastIndex, match.index)}
        </span>,
      );
    }
    const [full, comment, str, keyword, component, tag, punct] = match;
    let color = "var(--code-text)";
    if (comment) color = "var(--code-comment)";
    else if (str) color = "var(--code-string)";
    else if (keyword) color = "var(--code-keyword)";
    else if (component) color = "var(--code-func)";
    else if (tag) color = "var(--code-tag)";
    else if (punct) color = "var(--code-punct)";
    result.push(
      <span key={`m${match.index}`} style={{ color }}>
        {full}
      </span>,
    );
    lastIndex = tokenRE.lastIndex;
  }
  // Trailing plain text
  if (lastIndex < code.length) {
    result.push(
      <span key={`e${lastIndex}`} style={{ color: "var(--code-text)" }}>
        {code.slice(lastIndex)}
      </span>,
    );
  }
  return result;
}

/** Renders a numbered line of highlighted code */
function CodeLine({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <div className="flex" style={{ lineHeight: "1.7" }}>
      <span
        className="select-none flex-shrink-0 text-right pr-5"
        style={{
          width: "44px",
          color: "var(--code-line-number)",
          fontFamily: "var(--font-button)",
          fontSize: "var(--text-button)",
          fontWeight: "var(--weight-label)",
        }}
      >
        {num}
      </span>
      <span
        className="flex-1 min-w-0"
        style={{
          fontFamily: "var(--font-button)",
          fontSize: "var(--text-button)",
          fontWeight: "var(--weight-label)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

const PREVIEW_LINES = 3;

function CollapsibleCode({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);

  // Build per-line highlighted output
  const perLineHighlighted: React.ReactNode[][] = [];
  const rawLines = code.split("\n");
  for (let i = 0; i < rawLines.length; i++) {
    perLineHighlighted.push(highlightCode(rawLines[i]));
  }

  useEffect(() => {
    if (innerRef.current) {
      setFullHeight(innerRef.current.scrollHeight);
    }
  }, [code, open]);

  const handleCopy = useCallback(() => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      navigator.clipboard?.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [code]);

  // Collapsed preview height: PREVIEW_LINES * line height (approx 24px per line) + padding
  const previewHeight = PREVIEW_LINES * 24 + 32;

  return (
    <div
      className="mt-4 overflow-hidden relative"
      style={{
        backgroundColor: "var(--code-bg)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--code-border)",
      }}
    >
      {/* Code content */}
      <div
        style={{
          height: open ? fullHeight : previewHeight,
          transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div ref={innerRef} className="px-4 py-4 overflow-x-auto">
          {rawLines.map((line, i) => (
            <CodeLine key={i} num={i + 1}>
              {perLineHighlighted[i]}
            </CodeLine>
          ))}
        </div>

        {/* Gradient fade when collapsed */}
        {!open && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: `linear-gradient(to bottom, transparent, var(--code-bg))`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Floating "View Code" / "Hide Code" button */}
      <div
        className="flex items-center justify-center gap-3"
        style={{
          position: open ? "relative" : "absolute",
          bottom: open ? undefined : "12px",
          left: 0,
          right: 0,
          paddingBottom: open ? "12px" : undefined,
          zIndex: 2,
        }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 cursor-pointer transition-all"
          style={{
            backgroundColor: "var(--code-surface)",
            border: "1px solid var(--code-border)",
            borderRadius: "var(--radius-full)",
            color: "var(--code-text)",
            fontFamily: "var(--font-button)",
            fontSize: "var(--text-button)",
            fontWeight: "var(--weight-button)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>{open ? "Hide Code" : "View Code"}</span>
        </button>

        {/* Copy button — only when expanded */}
        {open && (
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 cursor-pointer transition-all"
            style={{
              backgroundColor: "var(--code-surface)",
              border: "1px solid var(--code-border)",
              borderRadius: "var(--radius-full)",
              color: copied ? "var(--code-string)" : "var(--code-line-number)",
              fontFamily: "var(--font-button)",
              fontSize: "var(--text-button)",
              fontWeight: "var(--weight-button)",
            }}
          >
            {copied ? (
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Copied!</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                <span>Copy</span>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Section({ title, description, children, code }: { title: string; description?: string; children: React.ReactNode; code?: string }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span style={{ width: 3, minWidth: 3, height: 20, borderRadius: 2, background: "var(--primary)", display: "inline-block", flexShrink: 0 }} />
          <h4 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700", lineHeight: "1.3" }}>{title}</h4>
        </div>
        {description && <p className="text-muted-foreground mt-0.5 pl-4" style={fontLabel}>{description}</p>}
      </div>
      {children}
      {code && <CollapsibleCode code={code} />}
    </div>
  );
}

// ─── DemoCard ─────────────────────────────────────────────────────────────────

export function DemoCard({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <span className="text-muted-foreground block" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>{label}</span>
      {children}
    </div>
  );
}

// ─── API Table ────────────────────────────────────────────────────────────────

interface PropRow { prop: string; type: string; def: string; desc: string; }

export function APITable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
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
      <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t(titleKey)}</h2>
      <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>{t(descKey)}</p>
    </div>
  );
}

// ─── Demo Box ─────────────────────────────────────────────────────────────────

export function DemoBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`p-6 rounded-[var(--radius-md)] border border-border bg-card ${className ?? ""}`}
      style={{ boxShadow: "0 1px 4px rgba(50,169,255,0.05)" }}
    >
      {children}
    </div>
  );
}