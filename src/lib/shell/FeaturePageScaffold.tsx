/**
 * Sellsuki Design System — FeaturePageScaffold
 *
 * Stage 5 of GOAL-DS-90-PERCENT.md
 *
 * A zero-opinion layout engine for feature pages.
 * Works standalone — does NOT require AppShellProvider.
 * Provides 7 layout variants covering ≥90% of real product page types.
 *
 * Usage:
 * ```tsx
 * <FeaturePageScaffold
 *   layout="list"
 *   header={<PageHeader title="Orders" primaryAction={...} />}
 *   filters={<FilterBar ... />}
 *   content={<AdvancedDataTable ... />}
 * />
 * ```
 */

import React from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type FeaturePageLayout =
  | "list"       // Table/grid of items — most common
  | "detail"     // Item detail with side panel
  | "settings"   // Stacked sections
  | "wizard"     // Multi-step form
  | "dashboard"  // Stat cards + charts
  | "form"       // Single-form with sticky actions
  | "report";    // Analytics: date range + charts + table

export interface FeaturePageScaffoldProps {
  /**
   * Layout variant — determines the region structure.
   * @default "list"
   */
  layout?: FeaturePageLayout;

  // ── Universal regions ─────────────────────────────────────────────────────
  /** Page header — use <PageHeader> component */
  header?: React.ReactNode;
  /** Page-level alert / announcement banner */
  banner?: React.ReactNode;

  // ── list layout regions ───────────────────────────────────────────────────
  /** Stat cards row — shown above filters in list/dashboard layouts */
  stats?: React.ReactNode;
  /** Filter bar — shown between stats and content in list layout */
  filters?: React.ReactNode;
  /** Main content area — table, grid, cards */
  content?: React.ReactNode;
  /** Footer — pagination, bulk action bar */
  footer?: React.ReactNode;

  // ── detail layout regions ─────────────────────────────────────────────────
  /** Main content column (left, wider) — detail layout */
  main?: React.ReactNode;
  /** Side panel (right, narrower) — detail layout */
  aside?: React.ReactNode;
  /** Aside width class — default: "w-80" */
  asideWidth?: string;
  /** Whether aside appears on the left instead of right */
  asideLeft?: boolean;

  // ── settings layout regions ───────────────────────────────────────────────
  /** Sections list — settings layout (array of ReactNode) */
  sections?: React.ReactNode;

  // ── wizard layout regions ──────────────────────────────────────────────────
  /** Stepper — wizard layout */
  stepper?: React.ReactNode;
  /** Form body — wizard/form layouts */
  form?: React.ReactNode;
  /** Sticky action bar — wizard/form layouts */
  actions?: React.ReactNode;

  // ── dashboard layout regions ───────────────────────────────────────────────
  /** Primary chart area — dashboard */
  primaryChart?: React.ReactNode;
  /** Secondary chart(s) — dashboard (2-column) */
  secondaryCharts?: React.ReactNode;
  /** Quick stats / KPI cards */
  kpis?: React.ReactNode;

  // ── report layout regions ──────────────────────────────────────────────────
  /** Date range picker + period selector */
  dateRange?: React.ReactNode;
  /** Chart section */
  charts?: React.ReactNode;
  /** Data table section */
  table?: React.ReactNode;

  // ── Layout options ────────────────────────────────────────────────────────
  /** Outer max width (e.g. "max-w-7xl") — defaults to full width */
  maxWidth?: string;
  /** Page padding — default "p-6" desktop, "p-4" mobile */
  padding?: string;
  /** Gap between regions — default "gap-6" */
  gap?: string;
  /** Additional className on root element */
  className?: string;
}

/* ─── Shared region wrappers ─────────────────────────────────────────────────── */

function Region({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!children) return null;
  return <div className={className}>{children}</div>;
}

function StickyActionBar({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="sticky bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-card border-t border-border px-6 py-3 flex items-center justify-end gap-3">
      {children}
    </div>
  );
}

/* ─── Layout renderers ───────────────────────────────────────────────────────── */

/** list: header > banner > stats > filters > content > footer */
function ListLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-5";
  return (
    <div className={`flex flex-col ${gap}`}>
      <Region>{p.header}</Region>
      <Region>{p.banner}</Region>
      <Region>{p.stats}</Region>
      <Region>{p.filters}</Region>
      <Region className="min-h-0">{p.content}</Region>
      <Region>{p.footer}</Region>
    </div>
  );
}

/** detail: header > banner > [main | aside] */
function DetailLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-6";
  const asideWidth = p.asideWidth ?? "w-80";
  return (
    <div className={`flex flex-col ${gap}`}>
      <Region>{p.header}</Region>
      <Region>{p.banner}</Region>
      <div className={`flex flex-col lg:flex-row ${gap} min-h-0`}>
        {p.asideLeft && (
          <div className={`flex-shrink-0 ${asideWidth} lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto`}>
            {p.aside}
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {p.main ?? p.content}
        </div>
        {!p.asideLeft && (
          <div className={`flex-shrink-0 ${asideWidth} lg:sticky lg:top-4 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto`}>
            {p.aside}
          </div>
        )}
      </div>
    </div>
  );
}

/** settings: header > banner > sections (stacked with dividers) */
function SettingsLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-8";
  return (
    <div className={`flex flex-col ${gap} max-w-3xl`}>
      <Region>{p.header}</Region>
      <Region>{p.banner}</Region>
      <Region className={`flex flex-col ${gap}`}>
        {p.sections ?? p.content}
      </Region>
    </div>
  );
}

/** wizard: header > stepper > form > sticky action bar */
function WizardLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-6";
  return (
    <div className="flex flex-col min-h-screen">
      <div className={`flex flex-col ${gap} flex-1 pb-24`}>
        <Region>{p.header}</Region>
        <Region>{p.banner}</Region>
        <Region>{p.stepper}</Region>
        <Region className="flex-1">{p.form ?? p.content}</Region>
      </div>
      <StickyActionBar>{p.actions}</StickyActionBar>
    </div>
  );
}

/** dashboard: header > banner > kpis > [primaryChart | secondaryCharts] > content */
function DashboardLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-6";
  const hasSplit = p.primaryChart && p.secondaryCharts;
  return (
    <div className={`flex flex-col ${gap}`}>
      <Region>{p.header}</Region>
      <Region>{p.banner}</Region>
      <Region>{p.kpis ?? p.stats}</Region>

      {hasSplit ? (
        <div className={`grid grid-cols-1 lg:grid-cols-3 ${gap}`}>
          <div className="lg:col-span-2">{p.primaryChart}</div>
          <div className="flex flex-col gap-4">{p.secondaryCharts}</div>
        </div>
      ) : (
        <>
          <Region>{p.primaryChart ?? p.charts}</Region>
          <Region>{p.secondaryCharts}</Region>
        </>
      )}

      <Region>{p.content ?? p.table}</Region>
      <Region>{p.footer}</Region>
    </div>
  );
}

/** form: header > banner > form body > sticky action bar */
function FormLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-6";
  return (
    <div className="flex flex-col min-h-screen">
      <div className={`flex flex-col ${gap} flex-1 pb-24`}>
        <Region>{p.header}</Region>
        <Region>{p.banner}</Region>
        <Region className="flex-1 max-w-2xl">
          {p.form ?? p.content}
        </Region>
      </div>
      <StickyActionBar>{p.actions}</StickyActionBar>
    </div>
  );
}

/** report: header > banner > dateRange > charts (full) > table */
function ReportLayout({ p }: { p: FeaturePageScaffoldProps }) {
  const gap = p.gap ?? "gap-6";
  return (
    <div className={`flex flex-col ${gap}`}>
      <Region>{p.header}</Region>
      <Region>{p.banner}</Region>
      <div className="flex items-center justify-between flex-wrap gap-3">
        {p.stats && <div className="flex-1">{p.stats}</div>}
        {p.dateRange && <div className="flex-shrink-0">{p.dateRange}</div>}
      </div>
      <Region>{p.filters}</Region>
      <Region>{p.charts ?? p.primaryChart}</Region>
      {p.secondaryCharts && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gap}`}>
          {p.secondaryCharts}
        </div>
      )}
      <Region>{p.table ?? p.content}</Region>
      <Region>{p.footer}</Region>
    </div>
  );
}

/* ─── FeaturePageScaffold ────────────────────────────────────────────────────── */

export function FeaturePageScaffold(props: FeaturePageScaffoldProps) {
  const { layout = "list", maxWidth, padding, className = "" } = props;

  const padClass = padding ?? "p-4 sm:p-6";
  const maxClass = maxWidth ? `${maxWidth} mx-auto w-full` : "w-full";

  const content = (() => {
    switch (layout) {
      case "list":      return <ListLayout p={props} />;
      case "detail":    return <DetailLayout p={props} />;
      case "settings":  return <SettingsLayout p={props} />;
      case "wizard":    return <WizardLayout p={props} />;
      case "dashboard": return <DashboardLayout p={props} />;
      case "form":      return <FormLayout p={props} />;
      case "report":    return <ReportLayout p={props} />;
      default:          return <ListLayout p={props} />;
    }
  })();

  return (
    <div className={`${padClass} ${maxClass} ${className}`}>
      {content}
    </div>
  );
}

FeaturePageScaffold.displayName = "FeaturePageScaffold";

/* ─── Convenience sub-components ────────────────────────────────────────────── */

/**
 * Scaffold section for settings layout.
 * Provides consistent heading + description + content region.
 */
export interface ScaffoldSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-h4)",
  fontWeight: "var(--weight-button)",
  color: "var(--foreground)",
};

const sectionDescStyle: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-p)",
  color: "var(--muted-foreground)",
};

export function ScaffoldSection({ title, description, action, children, className = "" }: ScaffoldSectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 style={sectionTitleStyle}>{title}</h2>
          {description && <p className="mt-1" style={sectionDescStyle}>{description}</p>}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className="border-t border-border pt-4">
        {children}
      </div>
    </section>
  );
}

ScaffoldSection.displayName = "ScaffoldSection";

/**
 * KPI stat card row for dashboard layout.
 * Wraps children in an equal-width responsive grid.
 */
export function ScaffoldKPIRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
}

ScaffoldKPIRow.displayName = "ScaffoldKPIRow";
