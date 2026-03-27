import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  /** Image URL */
  src?: string;
  /** Full name (used for initials fallback) */
  name?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Status indicator */
  status?: AvatarStatus;
  /** Additional class name */
  className?: string;
}

export interface AvatarGroupProps {
  /** Avatar elements */
  children: React.ReactNode;
  /** Maximum number of avatars to display before showing +N */
  max?: number;
  /** Additional class name */
  className?: string;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const colors = ["bg-primary", "bg-chart-2", "bg-chart-5", "bg-destructive", "bg-secondary"];

const sizeMap: Record<AvatarSize, { box: string; font: React.CSSProperties }> = {
  xs: { box: "w-6 h-6", font: { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" } },
  sm: { box: "w-8 h-8", font: { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" } },
  md: { box: "w-10 h-10", font: { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" } },
  lg: { box: "w-14 h-14", font: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" } },
  xl: { box: "w-20 h-20", font: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" } },
};

const statusSizes: Record<AvatarSize, string> = {
  xs: "w-2 h-2",
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-chart-2",
  offline: "bg-secondary",
  busy: "bg-destructive",
  away: "bg-chart-5",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

// ─── Avatar ──────────────────────────────────────────────────────────────────

export function Avatar({ src, name, size = "md", status, className = "" }: AvatarProps) {
  const s = sizeMap[size];
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  const bgColor = name ? colors[name.length % colors.length] : "bg-muted";

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || "avatar"}
          className={`${s.box} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${s.box} rounded-full ${bgColor} text-primary-foreground flex items-center justify-center`}
          style={s.font}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-card`}
        />
      )}
    </div>
  );
}

// ─── AvatarGroup ─────────────────────────────────────────────────────────────

export function AvatarGroup({ children, max, className = "" }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const extra = max && items.length > max ? items.length - max : 0;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visible.map((child, i) => (
        <div key={i} className="relative" style={{ zIndex: visible.length - i }}>
          {child}
        </div>
      ))}
      {extra > 0 && (
        <div
          className="relative w-10 h-10 rounded-full bg-muted text-foreground flex items-center justify-center border-2 border-card"
          style={{ ...btnStyle, zIndex: 0 }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}

Avatar.displayName = "Avatar";
AvatarGroup.displayName = "AvatarGroup";
