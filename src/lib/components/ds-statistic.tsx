import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type StatisticSize = "sm" | "md" | "lg";

export interface StatisticTrend {
  value: number;
  direction: "up" | "down" | "neutral";
}

export interface StatisticProps {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: StatisticTrend;
  trendLabel?: string;
  icon?: React.ReactNode;
  size?: StatisticSize;
  loading?: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  trend?: StatisticTrend;
  trendLabel?: string;
  icon?: React.ReactNode;
  iconBg?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const valueStyles: Record<StatisticSize, React.CSSProperties> = {
  sm: {
    fontFamily: "var(--font-h4)",
    fontSize: "var(--text-h4)",
    fontWeight: "var(--weight-h4)",
  },
  md: {
    fontFamily: "var(--font-h2)",
    fontSize: "var(--text-h2)",
    fontWeight: "var(--weight-h2)",
  },
  lg: {
    fontFamily: "var(--font-h1)",
    fontSize: "var(--text-h1)",
    fontWeight: "var(--weight-h1)",
  },
};

/* ─── Statistic Component ────────────────────────────────────────────────────── */

export function Statistic({
  title,
  value,
  prefix,
  suffix,
  trend,
  trendLabel,
  icon,
  size = "md",
  loading,
}: StatisticProps) {
  const valueStyle = valueStyles[size];
  const trendColor =
    trend?.direction === "up"
      ? "text-chart-2"
      : trend?.direction === "down"
      ? "text-destructive"
      : "text-muted-foreground";
  const TrendIcon =
    trend?.direction === "up"
      ? ArrowUpRight
      : trend?.direction === "down"
      ? ArrowDownRight
      : Minus;

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
        <span className="text-muted-foreground" style={fontLabel}>
          {title}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-muted-foreground" style={fontLabelBold}>
            {prefix}
          </span>
        )}
        <span className="text-foreground" style={valueStyle}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {suffix && (
          <span className="text-muted-foreground" style={fontLabel}>
            {suffix}
          </span>
        )}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={14} />
          <span style={btnStyle}>{trend.value}%</span>
          {trendLabel && (
            <span className="text-muted-foreground" style={smallLabel}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── StatCard Component ─────────────────────────────────────────────────────── */

export function StatCard({
  title,
  value,
  prefix,
  trend,
  trendLabel,
  icon,
  iconBg,
}: StatCardProps) {
  const trendColor =
    trend?.direction === "up"
      ? "text-chart-2"
      : trend?.direction === "down"
      ? "text-destructive"
      : "text-muted-foreground";
  const TrendIcon =
    trend?.direction === "up"
      ? ArrowUpRight
      : trend?.direction === "down"
      ? ArrowDownRight
      : Minus;

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-5 overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0 flex-1">
          <span className="text-muted-foreground" style={fontLabel}>
            {title}
          </span>
          <div className="flex items-baseline gap-1">
            {prefix && (
              <span className="text-muted-foreground" style={fontLabelBold}>
                {prefix}
              </span>
            )}
            <span
              className="text-foreground"
              style={{
                fontFamily: "var(--font-h3)",
                fontSize: "var(--text-h3)",
                fontWeight: "var(--weight-h3)",
              }}
            >
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon size={12} />
              <span style={btnStyle}>{trend.value}%</span>
              {trendLabel && (
                <span className="text-muted-foreground" style={smallLabel}>
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div
            className={`w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center flex-shrink-0 ${
              iconBg || "bg-primary/10 text-primary"
            }`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
