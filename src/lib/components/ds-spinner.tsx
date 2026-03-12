import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Spinner color (CSS value) */
  color?: string;
  /** Additional class name */
  className?: string;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-[3px]",
  lg: "w-12 h-12 border-4",
  xl: "w-16 h-16 border-4",
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

export function Spinner({ size = "md", color, className = "" }: SpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-muted animate-spin ${className}`}
      style={{ borderTopColor: color ?? "var(--primary)" }}
      role="status"
      aria-label="Loading"
    />
  );
}

Spinner.displayName = "Spinner";
