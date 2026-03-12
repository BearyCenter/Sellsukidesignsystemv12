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
  /** Mobile menu click handler */
  onMobileMenuClick?: () => void;
  /** User click handler */
  onUserClick?: () => void;
  /** Breadcrumb click handler */
  onBreadcrumbClick?: (item: BreadcrumbItem, index: number) => void;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

// ─── TopNavbar ───────────────────────────────────────────────────────────────

export function TopNavbar({
  brand,
  breadcrumbs,
  actions,
  user,
  height = "72px",
  showSearch = false,
  searchPlaceholder = "Search... (Ctrl+K)",
  onSearchClick,
  notificationCount,
  onNotificationClick,
  onMobileMenuClick,
  onUserClick,
  onBreadcrumbClick,
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
      {/* Mobile menu button */}
      {onMobileMenuClick && (
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
