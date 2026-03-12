import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: ProgressBarSize;
  color?: string;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

// ─── ProgressBar ─────────────────────────────────────────────────────────────

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color,
  label,
  showValue,
  indeterminate,
  className = "",
}: ProgressBarProps) {
  const sizes = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-foreground" style={fontLabel}>
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className="text-muted-foreground" style={smallLabel}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${sizes[size]} rounded-full bg-muted overflow-hidden`}>
        {indeterminate ? (
          <div
            className="h-full w-1/3 rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]"
            style={{ backgroundColor: color ?? "var(--primary)" }}
          />
        ) : (
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              backgroundColor: color ?? "var(--primary)",
            }}
          />
        )}
      </div>
      <style>{`@keyframes indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
    </div>
  );
}

ProgressBar.displayName = "ProgressBar";
