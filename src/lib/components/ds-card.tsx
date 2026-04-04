import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  elevation?: "none" | "sm" | "md" | "lg";
}

const elevationMap: Record<string, string> = {
  none: "",
  sm: "shadow-elevation-sm",
  md: "shadow-elevation-sm",
  lg: "shadow-elevation-sm",
};

// ─── Card ────────────────────────────────────────────────────────────────────

export function Card({ children, className, hover, elevation = "none" }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-md)] border border-border bg-card overflow-hidden ${elevationMap[elevation] ?? ""} ${hover ? "hover:border-primary/40 hover:shadow-elevation-sm transition-all cursor-pointer" : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

Card.displayName = "Card";

// ─── CardHeader ──────────────────────────────────────────────────────────────

export interface CardHeaderProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ children, action }: CardHeaderProps) {
  return (
    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
      <div>{children}</div>
      {action}
    </div>
  );
}

CardHeader.displayName = "CardHeader";

// ─── CardBody ────────────────────────────────────────────────────────────────

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-5 py-4">{children}</div>;
}

CardBody.displayName = "CardBody";

// ─── CardFooter ──────────────────────────────────────────────────────────────

export function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-3 border-t border-border bg-muted/10 flex items-center gap-2">
      {children}
    </div>
  );
}

CardFooter.displayName = "CardFooter";
