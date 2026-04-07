import React, { useState } from "react";
import { PanelLeftClose, PanelLeftOpen, ChevronUp } from "lucide-react";
import { Tooltip } from "./ds-tooltip";
import { SidebarAccountSwitcher, type SidebarAccountSwitcherProps } from "./ds-sidebar-account";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SidebarItem {
  /** Unique item identifier */
  id: string;
  /** Display label */
  label: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Badge text or count — shown next to item label */
  badge?: string | number;
}

export interface SidebarGroup {
  /** Group label (displayed as uppercase header) */
  label: string;
  /** Items in this group */
  items: SidebarItem[];
}

export interface SidebarBrand {
  /** Brand name (fallback text when no logo) */
  name: string;
  /** Icon-only logo (40×40) — used in collapsed state */
  logo?: string;
  /** Icon+Name logo (variable width × 40px) — used in expanded state */
  logoFull?: React.ReactNode;
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
  /** Show the footer collapse toggle button (default: false). Set true to show inline toggle */
  showCollapseToggle?: boolean;
  /** Account/Company/Branch switcher shown in header area */
  accountSwitcher?: SidebarAccountSwitcherProps;
  /**
   * Utility items (e.g. Help, Setting) — rendered at bottom of sidebar
   * above collapse toggle, separated by a divider from main nav groups.
   */
  utilityItems?: SidebarItem[];
  /** App version string e.g. "v1.4.0" */
  version?: string;
  /** Version date string e.g. "March 10, 2026" */
  versionDate?: string;
  /** Sidebar width override (200–320px range; default: var(--shell-sidebar-width, 200px)) */
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

/** Brand name — always H4 (24px / weight-h4) per DS spec */
const brandNameStyle: React.CSSProperties = {
  fontFamily: "var(--font-h4)",
  fontSize: "var(--text-h4)",
  fontWeight: "var(--weight-h4)",
};

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-p)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const groupHeaderStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function Sidebar({
  brand,
  accountSwitcher,
  groups,
  activeItem,
  onNavigate,
  collapsed = false,
  onCollapsedChange,
  showCollapseToggle = false,
  utilityItems,
  version,
  versionDate,
  width,
  className = "",
}: SidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (label: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  // Width uses shell CSS tokens as canonical source of truth.
  // `width` prop overrides only when explicitly provided (200–320px range).
  const expandedW = width ?? "var(--shell-sidebar-width, 200px)";
  const collapsedW = "var(--shell-sidebar-collapsed, 64px)";
  const currentW = collapsed ? collapsedW : expandedW;

  // ─── Nav item renderer (shared for groups and utility items) ──────────────
  const renderItem = (item: SidebarItem) => {
    const active = activeItem === item.id;
    const btn = (
      <button
        key={item.id}
        onClick={() => onNavigate?.(item)}
        className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-2 px-2"} py-2 rounded-[var(--radius-md)] transition-colors cursor-pointer ${
          active
            ? "bg-sidebar-accent text-sidebar-primary"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        }`}
        style={fontLabel}
      >
        <span className={`flex-shrink-0 ${active ? "text-sidebar-primary" : "text-muted-foreground"}`}>
          {item.icon}
        </span>
        {!collapsed && (
          <span className={`truncate flex-1 text-left ${active ? "text-sidebar-primary" : ""}`}>
            {item.label}
          </span>
        )}
        {item.badge != null && !collapsed && (
          <span
            className="rounded-full bg-primary text-primary-foreground"
            style={{
              fontFamily: "var(--font-caption)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--weight-button)",
              lineHeight: "1",
              padding: "2px 6px",
              display: "inline-flex",
              alignItems: "center",
              minWidth: "18px",
              justifyContent: "center",
            }}
          >
            {String(item.badge)}
          </span>
        )}
      </button>
    );

    return collapsed ? (
      <div key={item.id} className="w-full flex">
        <Tooltip content={item.label} placement="right" className="flex-1">
          {btn}
        </Tooltip>
      </div>
    ) : btn;
  };

  // ─── Brand header content ─────────────────────────────────────────────────
  const renderBrandHeader = () => {
    if (!brand) return null;

    if (collapsed) {
      // Collapsed: show icon-only (40×40), clip logoFull if no icon-only provided
      const iconContent = brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-10 h-10 rounded-[var(--radius-sm)] object-cover flex-shrink-0"
        />
      ) : brand.logoFull ? (
        // Clip first 40px of the icon+name SVG to show only the icon portion
        <div
          className="w-10 h-10 flex-shrink-0 overflow-hidden flex items-center"
          title={brand.name}
        >
          <div style={{ flexShrink: 0 }}>{brand.logoFull}</div>
        </div>
      ) : (
        <div
          className="w-10 h-10 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
          style={btnStyle}
        >
          {brand.name.charAt(0).toUpperCase()}
        </div>
      );
      return <div className="flex justify-center">{iconContent}</div>;
    }

    // Expanded: logoFull (icon+name) preferred, fallback to icon + text name
    if (brand.logoFull) {
      return (
        <div className="flex items-center" style={{ height: "40px" }}>
          {brand.logoFull}
        </div>
      );
    }

    // Fallback: icon or initial + brand name text
    return (
      <div className="flex items-center gap-2">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="w-10 h-10 rounded-[var(--radius-sm)] flex-shrink-0 object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
            style={btnStyle}
          >
            {brand.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sidebar-foreground truncate" style={brandNameStyle}>
          {brand.name}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border flex flex-col flex-shrink-0 h-full ${className}`}
      style={{
        width: currentW,
        minWidth: currentW,
        transition: "width var(--shell-sidebar-transition, 250ms cubic-bezier(0.4,0,0.2,1)), min-width var(--shell-sidebar-transition, 250ms cubic-bezier(0.4,0,0.2,1))",
        overflow: "visible",
      }}
    >
      {/* ── Account Switcher (replaces plain brand when provided) ── */}
      {accountSwitcher ? (
        <div className={`${collapsed ? "px-2 py-2" : "px-3 py-3"} border-b border-sidebar-border flex items-center ${collapsed ? "justify-center" : ""}`}>
          <SidebarAccountSwitcher {...accountSwitcher} collapsed={collapsed} />
        </div>
      ) : brand && (
        <div className={`${collapsed ? "px-2 py-3" : "px-4 py-3"} border-b border-sidebar-border`}>
          {renderBrandHeader()}
        </div>
      )}

      {/* ── Nav ── */}
      <nav className={`flex-1 overflow-y-auto py-3 ${collapsed ? "px-1.5" : "px-2"}`}>
        {groups.map((g) => {
          const isGroupCollapsed = collapsedGroups.has(g.label);
          return (
            <div key={g.label} className="mb-4">
              {!collapsed && (
                <button
                  onClick={() => toggleGroup(g.label)}
                  className="w-full flex items-center justify-between px-2 mb-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  style={groupHeaderStyle}
                >
                  <span>{g.label}</span>
                  <ChevronUp
                    size={12}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isGroupCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
              )}
              {collapsed && (
                <div className="h-px bg-sidebar-border mx-1 mb-2 mt-1" />
              )}
              {!isGroupCollapsed && (
                <div className="space-y-0.5">
                  {g.items.map((item) => renderItem(item))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer: utility items + collapse toggle + version ── */}
      {(utilityItems?.length || showCollapseToggle && onCollapsedChange || version) && (
        <div className={`${collapsed ? "px-1.5" : "px-2"} pb-3 border-t border-sidebar-border flex flex-col`}>
          {/* Utility items (Help, Setting, etc.) */}
          {utilityItems && utilityItems.length > 0 && (
            <div className="pt-2 space-y-0.5">
              {utilityItems.map((item) => renderItem(item))}
            </div>
          )}

          {/* Collapse toggle */}
          {showCollapseToggle && onCollapsedChange && (
            <div className={`${utilityItems?.length ? "mt-1" : "pt-2"}`}>
              <button
                onClick={() => onCollapsedChange(!collapsed)}
                className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-2 px-2"} py-1.5 rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 cursor-pointer`}
                style={smallLabel}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                {!collapsed && <span>Collapse</span>}
              </button>
            </div>
          )}

          {/* Version */}
          {version && !collapsed && (
            <div className="px-2 pt-1 flex items-center gap-1.5 text-muted-foreground/60" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-label)" }}>
              <span>{version}</span>
              {versionDate && <><span>·</span><span>{versionDate}</span></>}
            </div>
          )}
          {version && collapsed && (
            <div className="flex justify-center pt-1 text-muted-foreground/60" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-label)" }} title={`${version}${versionDate ? ` · ${versionDate}` : ""}`}>
              {version}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Sidebar.displayName = "Sidebar";
