import React from "react";
import { ChevronRight, Search, Bell, Menu, LayoutGrid } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Optional href for navigation */
  href?: string;
}

export interface TopNavbarBrand {
  /** Brand name (fallback text when no logo) */
  name: string;
  /** Icon-only logo (40×40) — used as fallback when logoFull not provided */
  logo?: string | React.ReactNode;
  /** Icon+Name logo (variable width × 40px) — shown in navbar when provided */
  logoFull?: React.ReactNode;
}

export interface TopNavbarUser {
  /** User display name */
  name: string;
  /** Avatar image URL */
  avatar?: string;
}

export interface TopNavbarProps {
  /** Brand logo and name */
  brand?: TopNavbarBrand;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Page title / system name — shown after brand. Default: hidden */
  title?: string;
  /** Right-side action area */
  actions?: React.ReactNode;
  /** User avatar */
  user?: TopNavbarUser;
  /** Navbar height */
  height?: string;
  /**
   * Search display mode.
   * - "bar"  — full search bar (default when showSearch=true for backward compat)
   * - "icon" — icon button only
   * - "none" — hidden (default)
   */
  searchMode?: "bar" | "icon" | "none";
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Search click handler */
  onSearchClick?: () => void;
  /** Notification count (0 = hidden) */
  notificationCount?: number;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** Mobile menu click handler (shows only on mobile) */
  onMobileMenuClick?: () => void;
  /** Sidebar toggle handler — shows burger icon (always visible) to collapse/expand sidebar */
  onSidebarToggle?: () => void;
  /** App/product switcher handler — shows 3×3 grid icon on right side */
  onAppSwitcherClick?: () => void;
  /** User click handler */
  onUserClick?: () => void;
  /** Breadcrumb click handler */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  /** Workspace/shop switcher rendered after brand logo — for multi-workspace products */
  workspaceSwitcher?: React.ReactNode;
  /**
   * @deprecated Use searchMode="bar" instead
   */
  showSearch?: boolean;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

/** Product / page title — always H4 (24px / weight-h4) per DS spec */
const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-h4)",
  fontSize: "var(--text-h4)",
  fontWeight: "var(--weight-h4)",
};

// ─── TopNavbar ───────────────────────────────────────────────────────────────

export function TopNavbar({
  brand,
  breadcrumbs,
  title,
  actions,
  user,
  height = "56px",
  searchMode: searchModeProp,
  searchPlaceholder = "Search... (Ctrl+K)",
  onSearchClick,
  notificationCount,
  onNotificationClick,
  onMobileMenuClick,
  onSidebarToggle,
  onAppSwitcherClick,
  onUserClick,
  onBreadcrumbClick,
  workspaceSwitcher,
  showSearch,
  className = "",
}: TopNavbarProps) {
  // Backward compat: showSearch=true → "bar"
  const searchMode = searchModeProp ?? (showSearch ? "bar" : "none");

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  // Resolve which brand logo to show:
  // logoFull (icon+name SVG) takes priority, falls back to icon-only logo
  const brandLogo = brand?.logoFull ?? brand?.logo;

  return (
    <div
      className={`bg-card border-b border-border flex items-center px-4 gap-3 ${className}`}
      style={{ height }}
    >
      {/* Sidebar toggle button — always visible */}
      {onSidebarToggle && (
        <button
          className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-muted/30 transition-colors cursor-pointer flex-shrink-0"
          onClick={onSidebarToggle}
          title="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Mobile menu button (mobile only, legacy — only when no onSidebarToggle) */}
      {!onSidebarToggle && onMobileMenuClick && (
        <button
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-muted/30 transition-colors cursor-pointer flex-shrink-0"
          onClick={onMobileMenuClick}
        >
          <Menu size={16} />
        </button>
      )}

      {/* Brand — logoFull (icon+name SVG 40px height) or icon-only (40×40) */}
      {brand && brandLogo && (
        <div className="flex items-center flex-shrink-0 text-foreground">
          {typeof brandLogo === "string" ? (
            <img
              src={brandLogo}
              alt={brand.name}
              style={{ height: "40px", width: "auto" }}
              className="rounded-[var(--radius-sm)] object-contain"
            />
          ) : (
            <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
              {brandLogo}
            </div>
          )}
        </div>
      )}

      {/* Brand fallback — initials when no logo provided */}
      {brand && !brandLogo && (
        <div
          className="w-10 h-10 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
          style={btnStyle}
        >
          {brand.name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Workspace switcher */}
      {workspaceSwitcher && (
        <div className="flex items-center">
          {workspaceSwitcher}
        </div>
      )}

      {/* Page title / System name — H4, shown only when provided */}
      {title && (
        <span className="text-foreground hidden sm:block truncate" style={titleStyle}>
          {title}
        </span>
      )}

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="hidden sm:flex items-center gap-1.5 text-muted-foreground" style={btnStyle}>
          {breadcrumbs.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight size={12} />}
              {item.href || onBreadcrumbClick ? (
                <span
                  className={`cursor-pointer ${
                    i === breadcrumbs.length - 1
                      ? "text-foreground"
                      : "hover:text-foreground"
                  }`}
                  onClick={() => onBreadcrumbClick?.(item, i)}
                >
                  {item.label}
                </span>
              ) : (
                <span
                  className={
                    i === breadcrumbs.length - 1 ? "text-foreground" : ""
                  }
                >
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search bar */}
      {searchMode === "bar" && (
        <div
          className="hidden md:flex items-center gap-2 px-3 h-8 rounded-[var(--radius)] border border-border bg-muted/20 text-muted-foreground w-56 cursor-pointer hover:border-primary/40 transition-colors"
          onClick={onSearchClick}
        >
          <Search size={14} />
          <span style={btnStyle}>{searchPlaceholder}</span>
        </div>
      )}

      {/* Search icon button */}
      {searchMode === "icon" && (
        <button
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
          onClick={onSearchClick}
          title="Search"
        >
          <Search size={16} />
        </button>
      )}

      {/* Custom actions */}
      {actions}

      {/* Notifications */}
      {onNotificationClick && (
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
          onClick={onNotificationClick}
        >
          <Bell size={16} />
          {notificationCount !== undefined && notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
          )}
        </button>
      )}

      {/* App / Product switcher */}
      {onAppSwitcherClick && (
        <button
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
          onClick={onAppSwitcherClick}
          title="Switch app"
        >
          <LayoutGrid size={16} />
        </button>
      )}

      {/* User avatar */}
      {user && (
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={onUserClick}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
              style={btnStyle}
            >
              {initials}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

TopNavbar.displayName = "TopNavbar";
