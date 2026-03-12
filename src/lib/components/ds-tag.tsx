import React from "react";
import { X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TagColor = "default" | "primary" | "success" | "warning" | "destructive" | "info";
export type TagSize = "sm" | "md" | "lg";

export interface TagProps {
  /** Tag content */
  children: React.ReactNode;
  /** Color variant */
  color?: TagColor;
  /** Tag size */
  size?: TagSize;
  /** Leading icon element */
  icon?: React.ReactNode;
  /** Show close button */
  closable?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const colorClasses: Record<TagColor, string> = {
  default: "bg-muted/50 text-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  warning: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-accent text-accent-foreground border-primary/20",
};

const sizePadding: Record<TagSize, string> = {
  sm: "px-1.5 py-0.5",
  md: "px-2 py-0.5",
  lg: "px-3 py-1.5",
};

const sizeStyles: Record<TagSize, React.CSSProperties> = {
  sm: {
    fontFamily: "var(--font-button)",
    fontSize: "var(--text-button)",
    fontWeight: "var(--weight-button)",
  },
  md: {
    fontFamily: "var(--font-button)",
    fontSize: "var(--text-button)",
    fontWeight: "var(--weight-button)",
  },
  lg: {
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-label)",
    fontWeight: "var(--weight-button)",
  },
};

// ─── Tag ─────────────────────────────────────────────────────────────────────

export function Tag({
  children,
  color = "default",
  size = "md",
  icon,
  closable,
  onClose,
  className = "",
}: TagProps) {
  const cls = colorClasses[color];
  const sz = sizePadding[size];
  const style = sizeStyles[size];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${cls} ${sz} ${className}`}
      style={style}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {closable && (
        <button className="hover:opacity-70 cursor-pointer" onClick={onClose}>
          <X size={size === "sm" ? 10 : 12} />
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";
