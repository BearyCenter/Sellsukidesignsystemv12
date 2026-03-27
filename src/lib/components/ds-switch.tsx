import React from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type SwitchSize = "sm" | "md" | "lg";
export type SwitchColor = "primary" | "success" | "warning" | "destructive";

export interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  size?: SwitchSize;
  disabled?: boolean;
  color?: SwitchColor;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

/* ─── Config ─────────────────────────────────────────────────────────────────── */

const sizes: Record<SwitchSize, { track: string; thumb: string; on: string }> = {
  sm: { track: "w-7 h-4", thumb: "w-3 h-3", on: "translate-x-3" },
  md: { track: "w-10 h-6", thumb: "w-4.5 h-4.5", on: "translate-x-4.5" },
  lg: { track: "w-14 h-8", thumb: "w-6.5 h-6.5", on: "translate-x-6" },
};

const colors: Record<SwitchColor, string> = {
  primary: "bg-primary",
  success: "bg-chart-2",
  warning: "bg-chart-5",
  destructive: "bg-destructive",
};

const thumbPx: Record<SwitchSize, { w: number; h: number; on: number }> = {
  sm: { w: 12, h: 12, on: 14 },
  md: { w: 18, h: 18, on: 18 },
  lg: { w: 26, h: 26, on: 24 },
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Switch({
  checked,
  onChange,
  label,
  description,
  size = "md",
  disabled,
  color = "primary",
}: SwitchProps) {
  const s = sizes[size];
  const tp = thumbPx[size];

  return (
    <label
      className={`inline-flex items-start gap-3 ${
        disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"
      }`}
    >
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`${s.track} rounded-full relative flex-shrink-0 transition-colors cursor-pointer ${
          checked ? colors[color] : "bg-muted"
        }`}
      >
        <span
          className="rounded-full bg-background shadow-elevation-sm absolute transition-transform"
          style={{
            width: tp.w,
            height: tp.h,
            top: "50%",
            transform: `translateY(-50%) translateX(${checked ? tp.on : 2}px)`,
            left: 0,
          }}
        />
      </button>
      {(label || description) && (
        <div>
          {label && (
            <span className="text-foreground block" style={fontLabel}>
              {label}
            </span>
          )}
          {description && (
            <span className="text-muted-foreground block" style={smallLabel}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
