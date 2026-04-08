import React from "react";
import { X } from "lucide-react";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "warning";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary/15 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  outline:
    "bg-transparent border border-border text-foreground",
  destructive: "bg-destructive/15 text-destructive",
  success: "bg-chart-2/15 text-chart-2",
  warning: "bg-chart-5/15 text-chart-5",
};

const sizeStyles: Record<
  BadgeSize,
  {
    className: string;
    style: React.CSSProperties;
    iconSize: number;
  }
> = {
  sm: {
    className: "px-1.5 py-0.5 gap-1",
    style: {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-caption)",
      fontWeight: 400,
    },
    iconSize: 10,
  },
  md: {
    className: "px-2.5 py-0.5 gap-1.5",
    style: {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-caption)",
      fontWeight: 400,
    },
    iconSize: 12,
  },
  lg: {
    className: "px-3 py-1 gap-1.5",
    style: {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-label)",
      fontWeight: 400,
    },
    iconSize: 14,
  },
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-primary",
  secondary: "bg-secondary",
  outline: "bg-foreground",
  destructive: "bg-destructive",
  success: "bg-chart-2",
  warning: "bg-chart-5",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  dot,
  removable,
  onRemove,
  className = "",
}: BadgeProps) {
  const s = sizeStyles[size];
  return (
    <span
      className={`inline-flex items-center rounded-full whitespace-nowrap ${variantClasses[variant]} ${s.className} ${className}`}
      style={{ ...s.style, lineHeight: "1.2" }}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 hover:opacity-70 transition-opacity cursor-pointer rounded-full -mr-0.5"
          aria-label="Remove"
        >
          <X size={s.iconSize} />
        </button>
      )}
    </span>
  );
}