import React from "react";
import { ChevronRight, Slash, Dot, MoreHorizontal } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export type BreadcrumbSeparator = "chevron" | "slash" | "dot";
export type BreadcrumbSize = "sm" | "md" | "lg";

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  size?: BreadcrumbSize;
  maxItems?: number;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const textStyles: Record<BreadcrumbSize, React.CSSProperties> = {
  sm: {
    fontFamily: "var(--font-button)",
    fontSize: "var(--text-button)",
    fontWeight: "var(--weight-label)",
  },
  md: fontLabel,
  lg: {
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-label)",
    fontWeight: "var(--weight-label)",
  },
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Breadcrumb({
  items,
  separator = "chevron",
  size = "md",
  maxItems,
}: BreadcrumbProps) {
  const sep =
    separator === "slash" ? (
      <Slash size={12} className="text-muted-foreground" />
    ) : separator === "dot" ? (
      <Dot size={16} className="text-muted-foreground" />
    ) : (
      <ChevronRight size={12} className="text-muted-foreground" />
    );

  const pad =
    size === "sm" ? "gap-1" : size === "lg" ? "gap-2.5" : "gap-1.5";
  const textStyle = textStyles[size];

  let displayItems = items;
  if (maxItems && items.length > maxItems) {
    const first = items.slice(0, 1);
    const last = items.slice(-(maxItems - 1));
    displayItems = [...first, { label: "\u2026" }, ...last];
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex items-center flex-wrap ${pad}`}>
        {displayItems.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="mx-0.5">{sep}</span>}
            {item.label === "\u2026" ? (
              <span className="w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-accent cursor-pointer">
                <MoreHorizontal size={14} />
              </span>
            ) : i === displayItems.length - 1 ? (
              <span
                className="inline-flex items-center gap-1.5 text-foreground"
                style={{
                  ...textStyle,
                  fontWeight: "var(--weight-button)",
                }}
              >
                {item.icon}
                {item.label}
              </span>
            ) : (
              <a
                href={item.href || "#"}
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                style={textStyle}
              >
                {item.icon}
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
