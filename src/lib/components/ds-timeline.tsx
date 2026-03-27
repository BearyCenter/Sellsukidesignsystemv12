import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type TimelineVariant = "default" | "alternate" | "compact";
export type TimelineSize = "sm" | "md" | "lg";
export type TimelineItemStatus = "completed" | "current" | "pending" | "error";

export interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  status?: TimelineItemStatus;
  children?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: TimelineVariant;
  size?: TimelineSize;
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
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Timeline({
  items,
  variant = "default",
  size = "md",
}: TimelineProps) {
  const dotSize =
    size === "sm" ? "w-6 h-6" : size === "lg" ? "w-10 h-10" : "w-8 h-8";
  const iconSz = size === "sm" ? 12 : size === "lg" ? 18 : 14;

  const statusColor = (s?: string) =>
    s === "completed"
      ? "bg-chart-2 text-primary-foreground"
      : s === "current"
      ? "bg-primary text-primary-foreground"
      : s === "error"
      ? "bg-destructive text-primary-foreground"
      : "bg-muted text-muted-foreground";

  if (variant === "compact") {
    return (
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`${dotSize} rounded-full flex items-center justify-center flex-shrink-0 ${statusColor(
                  item.status
                )}`}
              >
                {item.icon ||
                  (item.status === "completed" ? (
                    <CheckCircle2 size={iconSz} />
                  ) : (
                    <Circle size={iconSz} />
                  ))}
              </div>
              {i < items.length - 1 && (
                <div className="w-0.5 flex-1 min-h-4 bg-border" />
              )}
            </div>
            <div className="pb-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-foreground" style={fontLabelBold}>
                  {item.title}
                </span>
                {item.time && (
                  <span className="text-muted-foreground" style={smallLabel}>
                    {item.time}
                  </span>
                )}
              </div>
              {item.description && (
                <p
                  className="text-muted-foreground mt-0.5"
                  style={smallLabel}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {items.map((item, i) => {
        const isAlt = variant === "alternate" && i % 2 === 1;
        return (
          <div
            key={i}
            className={`flex gap-4 pb-8 last:pb-0 ${
              isAlt ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`${dotSize} rounded-full flex items-center justify-center ${statusColor(
                  item.status
                )}`}
              >
                {item.icon ||
                  (item.status === "completed" ? (
                    <CheckCircle2 size={iconSz} />
                  ) : (
                    <Circle size={iconSz} />
                  ))}
              </div>
              {i < items.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-1" />
              )}
            </div>
            <div
              className={`flex-1 min-w-0 ${isAlt ? "text-right" : ""}`}
            >
              <div
                className={`flex items-center gap-2 ${
                  isAlt ? "justify-end" : ""
                }`}
              >
                <span className="text-foreground" style={fontLabelBold}>
                  {item.title}
                </span>
                {item.time && (
                  <span className="text-muted-foreground" style={smallLabel}>
                    {item.time}
                  </span>
                )}
              </div>
              {item.description && (
                <p
                  className="text-muted-foreground mt-0.5"
                  style={fontLabel}
                >
                  {item.description}
                </p>
              )}
              {item.children && (
                <div className="mt-2">{item.children}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
