import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SidebarItem {
  /** Unique item identifier */
  id: string;
  /** Display label */
  label: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Badge text (e.g., count) */
  badge?: string;
}

export interface SidebarGroup {
  /** Group label (displayed as uppercase header) */
  label: string;
  /** Items in this group */
  items: SidebarItem[];
}

export interface SidebarBrand {
  /** Brand name */
  name: string;
  /** Brand logo URL */
  logo?: string;
}

export interface SidebarProps {
  /** Brand card in header */
  brand?: SidebarBrand;
  /** Navigation groups */
  groups: SidebarGroup[];
  /** Active item ID */
  activeItem?: string;
  /** Navigation callback */
  onNavigate?: (item: SidebarItem) => void;
  /** Collapse to icon-only mode */
  collapsed?: boolean;
  /** Toggle collapse callback */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Sidebar width (default: 256px) */
  width?: string;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function Sidebar({
  brand,
  groups,
  activeItem,
  onNavigate,
  collapsed = false,
  onCollapsedChange,
  className = "",
}: SidebarProps) {
  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border flex flex-col flex-shrink-0 transition-all ${
        collapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      {/* Brand */}
      {brand && (
        <div className="px-4 py-4 border-b border-sidebar-border flex items-center gap-2">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-8 h-8 rounded-[var(--radius-sm)] flex-shrink-0 object-cover"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
              style={btnStyle}
            >
              {brand.name.charAt(0).toUpperCase()}
            </div>
          )}
          {!collapsed && (
            <span className="text-sidebar-foreground truncate" style={fontLabelBold}>
              {brand.name}
            </span>
          )}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {groups.map((g) => (
          <div key={g.label} className="mb-4">
            {!collapsed && (
              <span
                className="px-2 mb-1.5 block text-muted-foreground uppercase tracking-wider"
                style={btnStyle}
              >
                {g.label}
              </span>
            )}
            <div className="space-y-0.5">
              {g.items.map((item) => {
                const active = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate?.(item)}
                    className={`w-full flex items-center gap-2 px-2 py-2 rounded-[var(--radius-md)] transition-colors cursor-pointer ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                    style={fontLabel}
                  >
                    <span className={active ? "text-sidebar-primary" : "text-muted-foreground"}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground"
                        style={{ ...btnStyle, lineHeight: "1" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {onCollapsedChange && (
        <div className="px-3 py-3 border-t border-sidebar-border">
          <button
            onClick={() => onCollapsedChange(!collapsed)}
            className="w-full px-2 py-1.5 rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 cursor-pointer text-left"
            style={smallLabel}
          >
            {collapsed ? ">" : "Collapse"}
          </button>
        </div>
      )}
    </div>
  );
}

Sidebar.displayName = "Sidebar";
