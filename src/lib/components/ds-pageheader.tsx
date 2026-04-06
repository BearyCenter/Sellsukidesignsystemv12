import React from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface PageHeaderProps {
  /** Main page title (required) */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Breadcrumb content — pass a <Breadcrumb /> component */
  breadcrumb?: React.ReactNode;
  /** Action buttons — right-aligned (pass DSButton components) */
  actions?: React.ReactNode;
  /** Tab navigation below the header — pass a <Tabs /> component */
  tabs?: React.ReactNode;
  /** Stick to top of viewport while scrolling */
  sticky?: boolean;
  /** Additional className */
  className?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-h3, 'DB HeaventRounded', sans-serif)",
  fontSize: "var(--text-h3, 28px)",
  fontWeight: "var(--weight-h3, 700)",
  color: "var(--foreground)",
  lineHeight: 1.3,
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-p, 'DB HeaventRounded', sans-serif)",
  fontSize: "var(--text-p, 20px)",
  fontWeight: "var(--weight-p, 400)",
  color: "var(--muted-foreground)",
  lineHeight: 1.4,
};

const breadcrumbWrapStyle: React.CSSProperties = {
  fontFamily: "var(--font-label, 'DB HeaventRounded', sans-serif)",
  fontSize: "var(--text-label)",
};

/* ─── PageHeader ─────────────────────────────────────────────────────────────── */

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  tabs,
  sticky = false,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`bg-card border-b border-border ${sticky ? "sticky top-0 z-10" : ""} ${className}`}
    >
      {/* Main row: breadcrumb + title/subtitle + actions */}
      <div className="px-6 pt-5 pb-4">
        {/* Breadcrumb row */}
        {breadcrumb && (
          <div className="mb-2" style={breadcrumbWrapStyle}>
            {breadcrumb}
          </div>
        )}

        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 style={titleStyle} className="truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5" style={subtitleStyle}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Actions slot — right-aligned */}
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Tabs slot — flush to bottom border */}
      {tabs && (
        <div className="px-6">
          {tabs}
        </div>
      )}
    </div>
  );
}
