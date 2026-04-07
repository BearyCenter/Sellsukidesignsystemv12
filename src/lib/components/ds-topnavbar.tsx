import React from "react";
import { ChevronRight, Search, Bell, Menu } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Optional href for navigation */
  href?: string;
}

export interface TopNavbarBrand {
  /** Brand name */
  name: string;
  /** Logo URL or ReactNode */
  logo?: string | React.ReactNode;
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
  /** Page title displayed after brand (used for current page context) */
  title?: string;
  /** Right-side action area */
  actions?: React.ReactNode;
  /** User avatar */
  user?: TopNavbarUser;
  /** Navbar height */
  height?: string;
  /** Show search bar */
  showSearch?: boolean;
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
  /** User click handler */
  onUserClick?: () => void;
  /** Breadcrumb click handler */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  /** Workspace/shop switcher rendered after brand logo — for multi-workspace products */
  workspaceSwitcher?: React.ReactNode;
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
  height = "72px",
  showSearch = false,
  searchPlaceholder = "Search... (Ctrl+K)",
  onSearchClick,
  notificationCount,
  onNotificationClick,
  onMobileMenuClick,
  onSidebarToggle,
  onUserClick,
  onBreadcrumbClick,
  workspaceSwitcher,
  className = "",
}: TopNavbarProps) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <div
      className={`bg-card border-b border-border flex items-center px-5 gap-4 ${className}`}
      style={{ height }}
    >
      {/* Sidebar toggle button — always visible */}
      {onSidebarToggle && (
        <button
          className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
          onClick={onSidebarToggle}
          title="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      )}

      {/* Mobile menu button (mobile only, legacy) */}
      {!onSidebarToggle && onMobileMenuClick && (
        <button
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
          onClick={onMobileMenuClick}
        >
          <Menu size={16} />
        </button>
      )}

      {/* Brand */}
      {brand && (
        <>
          {typeof brand.logo === "string" ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-8 h-8 rounded-[var(--radius-sm)] flex-shrink-0 object-cover"
            />
          ) : brand.logo ? (
            <div className="w-8 h-8 rounded-[var(--radius-sm)] overflow-hidden flex-shrink-0">
              {brand.logo}
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
              style={btnStyle}
            >
              {brand.name.charAt(0).toUpperCase()}
            </div>
          )}
        </>
      )}

      {/* Workspace switcher */}
      {workspaceSwitcher && (
        <div className="flex items-center ml-1">
          {workspaceSwitcher}
        </div>
      )}

      {/* Page title — H4 24px */}
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

      {/* Search */}
      {showSearch && (
        <div
          className="hidden md:flex items-center gap-2 px-3 h-8 rounded-[var(--radius)] border border-border bg-muted/20 text-muted-foreground w-56 cursor-pointer hover:border-primary/40 transition-colors"
          onClick={onSearchClick}
        >
          <Search size={14} />
          <span style={btnStyle}>{searchPlaceholder}</span>
        </div>
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

      {/* User avatar */}
      {user && (
        <div
          className="cursor-pointer"
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
