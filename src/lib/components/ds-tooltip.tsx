import React, { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Tooltip content */
  content: string;
  /** Tooltip position */
  placement?: TooltipPlacement;
  /** Additional class name for the wrapper */
  className?: string;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const placementClasses: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export function Tooltip({
  children,
  content,
  placement = "top",
  className = "",
}: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`absolute ${placementClasses[placement]} z-50 px-3 py-1.5 rounded-[var(--radius-sm)] bg-foreground text-background whitespace-nowrap shadow-md`}
          style={smallLabel}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}

Tooltip.displayName = "Tooltip";
