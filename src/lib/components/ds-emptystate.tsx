import React from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: { label: string; onClick: () => void };
  size?: EmptyStateSize;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = "md",
}: EmptyStateProps) {
  const iconSize =
    size === "sm" ? "w-10 h-10" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const pad =
    size === "sm"
      ? "py-6 px-4"
      : size === "lg"
      ? "py-14 px-8"
      : "py-10 px-6";

  return (
    <div className={`flex flex-col items-center text-center ${pad}`}>
      {icon && (
        <div
          className={`${iconSize} rounded-full bg-muted flex items-center justify-center mb-4`}
        >
          <span className="text-muted-foreground">{icon}</span>
        </div>
      )}
      <h4 className="text-foreground">{title}</h4>
      {description && (
        <p
          className="text-muted-foreground mt-1.5 max-w-sm"
          style={fontLabel}
        >
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-5">
          {action && (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
              style={btnStyle}
            >
              {action.icon}
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-accent transition-colors cursor-pointer"
              style={btnStyle}
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
