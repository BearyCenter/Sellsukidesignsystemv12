import React from "react";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Eye, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── Statistic Component ──────────────────────────────────────────────────── */

function Statistic({
  title, value, prefix, suffix, trend, trendLabel, icon, size = "md", loading,
}: {
  title: string; value: string | number; prefix?: React.ReactNode; suffix?: string;
  trend?: { value: number; direction: "up" | "down" | "neutral" };
  trendLabel?: string; icon?: React.ReactNode; size?: "sm" | "md" | "lg"; loading?: boolean;
}) {
  const valueStyle: React.CSSProperties = size === "sm"
    ? { fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }
    : size === "lg"
    ? { fontFamily: "var(--font-h1)", fontSize: "var(--text-h1)", fontWeight: "var(--weight-h1)" }
    : { fontFamily: "var(--font-h2)", fontSize: "var(--text-h2)", fontWeight: "var(--weight-h2)" };

  const trendColor = trend?.direction === "up" ? "text-chart-2" : trend?.direction === "down" ? "text-destructive" : "text-muted-foreground";
  const TrendIcon = trend?.direction === "up" ? ArrowUpRight : trend?.direction === "down" ? ArrowDownRight : Minus;

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        <div className="h-3 w-20 bg-muted rounded-[var(--radius-sm)]" />
        <div className="h-8 w-32 bg-muted rounded-[var(--radius-sm)]" />
        <div className="h-3 w-24 bg-muted rounded-[var(--radius-sm)]" />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-muted-foreground" style={fontLabel}>{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-muted-foreground" style={fontLabelBold}>{prefix}</span>}
        <span className="text-foreground" style={valueStyle}>{typeof value === "number" ? value.toLocaleString() : value}</span>
        {suffix && <span className="text-muted-foreground" style={fontLabel}>{suffix}</span>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={14} />
          <span style={btnStyle}>{trend.value}%</span>
          {trendLabel && <span className="text-muted-foreground" style={smallLabel}>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

function StatCard({
  title, value, prefix, trend, trendLabel, icon, iconBg,
}: {
  title: string; value: string | number; prefix?: React.ReactNode;
  trend?: { value: number; direction: "up" | "down" | "neutral" };
  trendLabel?: string; icon?: React.ReactNode; iconBg?: string;
}) {
  const trendColor = trend?.direction === "up" ? "text-chart-2" : trend?.direction === "down" ? "text-destructive" : "text-muted-foreground";
  const TrendIcon = trend?.direction === "up" ? ArrowUpRight : trend?.direction === "down" ? ArrowDownRight : Minus;

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-muted-foreground" style={fontLabel}>{title}</span>
          <div className="flex items-baseline gap-1">
            {prefix && <span className="text-muted-foreground" style={fontLabelBold}>{prefix}</span>}
            <span className="text-foreground" style={{ fontFamily: "var(--font-h3)", fontSize: "var(--text-h3)", fontWeight: "var(--weight-h3)" }}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon size={12} />
              <span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>{trend.value}%</span>
              {trendLabel && <span className="text-muted-foreground" style={smallLabel}>{trendLabel}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 ${iconBg || "bg-primary/10 text-primary"}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function StatisticShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.statistic.title" descKey="page.statistic.desc" />

      <Section title="Basic" description="Simple numeric statistics with labels." code={`<SskStatistic title="Revenue" value={42500} prefix="$" />`}>
        <DemoBox>
          <div className="flex flex-wrap gap-12">
            <Statistic title="Total Revenue" value={42500} prefix="$" />
            <Statistic title="Active Users" value={1284} />
            <Statistic title="Conversion" value="3.24" suffix="%" />
          </div>
        </DemoBox>
      </Section>

      <Section title="With Trends" description="Trend indicators showing change direction.">
        <DemoBox>
          <div className="flex flex-wrap gap-12">
            <Statistic title="Revenue" value={84200} prefix="$" trend={{ value: 12.5, direction: "up" }} trendLabel="vs last month" icon={<DollarSign size={14} />} />
            <Statistic title="Bounce Rate" value="42.1" suffix="%" trend={{ value: 3.2, direction: "down" }} trendLabel="vs last week" icon={<Eye size={14} />} />
            <Statistic title="Sessions" value={9420} trend={{ value: 0, direction: "neutral" }} trendLabel="no change" icon={<Users size={14} />} />
          </div>
        </DemoBox>
      </Section>

      <Section title="Stat Cards" description="Card-enclosed statistics for dashboards.">
        <DemoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Revenue" value={84200} prefix="$" trend={{ value: 12.5, direction: "up" }} trendLabel="vs last month" icon={<DollarSign size={18} />} iconBg="bg-chart-2/10 text-chart-2" />
            <StatCard title="Users" value={2420} trend={{ value: 8.1, direction: "up" }} trendLabel="vs last month" icon={<Users size={18} />} iconBg="bg-primary/10 text-primary" />
            <StatCard title="Orders" value={430} trend={{ value: 2.3, direction: "down" }} trendLabel="vs last month" icon={<ShoppingCart size={18} />} iconBg="bg-chart-5/10 text-chart-5" />
            <StatCard title="Page Views" value="12.4K" trend={{ value: 5.7, direction: "up" }} trendLabel="vs last month" icon={<Eye size={18} />} iconBg="bg-destructive/10 text-destructive" />
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different UI densities.">
        <DemoBox>
          <div className="flex flex-wrap gap-12 items-end">
            <DemoCard label="Small"><Statistic title="Users" value={128} size="sm" trend={{ value: 5, direction: "up" }} /></DemoCard>
            <DemoCard label="Medium"><Statistic title="Users" value={128} size="md" trend={{ value: 5, direction: "up" }} /></DemoCard>
            <DemoCard label="Large"><Statistic title="Users" value={128} size="lg" trend={{ value: 5, direction: "up" }} /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Loading" description="Skeleton placeholder during data fetch.">
        <DemoBox><div className="flex gap-12"><Statistic title="" value="" loading /><Statistic title="" value="" loading /><Statistic title="" value="" loading /></div></DemoBox>
      </Section>

      <APITable rows={[
        { prop: "title", type: "string", def: "—", desc: "Statistic label" },
        { prop: "value", type: "string | number", def: "—", desc: "Display value" },
        { prop: "prefix", type: "ReactNode", def: "—", desc: "Prefix (e.g. currency symbol)" },
        { prop: "suffix", type: "string", def: "—", desc: "Suffix (e.g. % or unit)" },
        { prop: "trend", type: "{ value, direction }", def: "—", desc: "Trend indicator" },
        { prop: "trendLabel", type: "string", def: "—", desc: "Trend context label" },
        { prop: "icon", type: "ReactNode", def: "—", desc: "Icon next to title" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Value text size" },
        { prop: "loading", type: "boolean", def: "false", desc: "Show skeleton loader" },
      ]} />
    </div>
  );
}
