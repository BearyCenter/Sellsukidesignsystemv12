import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DividerSpacing = "sm" | "md" | "lg";
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  label?: string;
  orientation?: DividerOrientation;
  dashed?: boolean;
  spacing?: DividerSpacing;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Divider({
  label,
  orientation = "horizontal",
  dashed,
  spacing = "md",
  className = "",
}: DividerProps) {
  const spacings = { sm: "my-2", md: "my-4", lg: "my-8" };
  const style = dashed ? "border-dashed" : "border-solid";

  if (orientation === "vertical") {
    return (
      <div
        className={`inline-block h-full min-h-[24px] border-l border-border ${style} mx-3 ${className}`}
      />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center gap-3 ${spacings[spacing]} ${className}`}>
        <div className={`flex-1 border-t border-border ${style}`} />
        <span className="text-muted-foreground flex-shrink-0" style={smallLabel}>
          {label}
        </span>
        <div className={`flex-1 border-t border-border ${style}`} />
      </div>
    );
  }

  return (
    <hr className={`border-t border-border ${style} ${spacings[spacing]} ${className}`} />
  );
}

Divider.displayName = "Divider";
