/**
 * Sellsuki Design System — AppShell
 *
 * Stage 6 of GOAL-DS-90-PERCENT.md — FINAL stage
 *
 * Compound component that wires together:
 * - AppShellProvider (context)
 * - TopNavbar (top bar with sidebar toggle)
 * - Sidebar (with async nav from navResolver)
 * - Mobile overlay drawer
 * - Content frame (scrollable)
 *
 * Supports multi-product theme via data-product attribute.
 *
 * Usage:
 * ```tsx
 * import "@uxuissk/design-system/styles.css";
 * import { AppShell, sellsukiBrandConfig } from "@uxuissk/design-system";
 *
 * <AppShell
 *   product={sellsukiBrandConfig}
 *   user={currentUser}
 *   navResolver={myNavResolver}
 *   activeItemId="orders"
 *   onNavigate={(item) => router.push(item.href!)}
 * >
 *   <FeaturePageScaffold layout="list" ... />
 * </AppShell>
 * ```
 */

import React, { useState, useCallback, useEffect } from "react";
import { Bell, Search } from "lucide-react";

import { AppShellProvider, useAppShellFull, AppShellErrorBoundary } from "./AppShellContext";
import type { AppShellProviderProps } from "./AppShellContext";
import type { ProductBrandConfig, ShellUser, NavResolver, ShellSidebarGroup, NavItem } from "../types/shell";
import type { SidebarGroup, SidebarItem } from "../components/ds-sidebar";

import { TopNavbar } from "../components/ds-topnavbar";
import { Sidebar } from "../components/ds-sidebar";
import { Skeleton, SkeletonList } from "../components/ds-skeleton";
import { Alert } from "../components/ds-alert";
import { ToastContainer } from "../components/ds-alert";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AppShellProps {
  /** Product brand config — drives theme and brand identity */
  product: ProductBrandConfig;
  /** Authenticated user */
  user: ShellUser;
  /** Async nav resolver — permission-filtered nav groups */
  navResolver?: NavResolver;
  /** Currently active nav item ID */
  activeItemId?: string;
  /** Navigation handler — called when user clicks a nav item */
  onNavigate?: (item: NavItem) => void;
  /** Notification count (0 = hidden) */
  notificationCount?: number;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** User click handler (profile menu, logout) */
  onUserClick?: () => void;
  /** Search click handler */
  onSearchClick?: () => void;
  /** Show search in TopNavbar */
  showSearch?: boolean;
  /** App version string */
  version?: string;
  /** App version date */
  versionDate?: string;
  /** Whether content area has padding (default: true) */
  contentPadding?: boolean;
  /** Children — feature page content */
  children: React.ReactNode;
  /** Additional class name on root element */
  className?: string;
}

// ─── Nav adapter — maps ShellSidebarGroup[] → SidebarGroup[] ─────────────────

function adaptNavGroups(groups: ShellSidebarGroup[]): SidebarGroup[] {
  return groups.map((g) => ({
    label: g.title ?? "",
    items: g.items
      .filter((item) => !item.disabled)
      .map((item) => ({
        id: item.id,
        label: item.label,
        icon: item.icon,
        badge: typeof item.badge === "function" ? undefined : item.badge,
      })),
  }));
}

// ─── Inner shell (consumes AppShellProvider context) ─────────────────────────

interface InnerShellProps extends Omit<AppShellProps, "product" | "user" | "navResolver"> {}

function InnerAppShell({
  activeItemId,
  onNavigate,
  notificationCount,
  onNotificationClick,
  onUserClick,
  onSearchClick,
  showSearch = false,
  version,
  versionDate,
  contentPadding = true,
  children,
  className = "",
}: InnerShellProps) {
  const {
    sidebarOpen,
    setSidebarOpen,
    user,
    product,
    breadcrumbs,
    navGroups,
    navLoading,
    navError,
    refreshNav,
  } = useAppShellFull();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    !(product?.shell?.sidebarDefaultOpen ?? true)
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    function handler() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const adaptedGroups = adaptNavGroups(navGroups);

  const handleNavigate = useCallback(
    (item: SidebarItem) => {
      const navItem = navGroups
        .flatMap((g) => g.items)
        .find((i) => i.id === item.id);
      if (navItem && onNavigate) onNavigate(navItem);
      // Close mobile drawer after navigation
      setMobileOpen(false);
    },
    [navGroups, onNavigate]
  );

  const sidebarNode = (
    <Sidebar
      brand={
        product
          ? { name: product.brand.name }
          : { name: "Sellsuki" }
      }
      groups={
        navLoading
          ? [{ label: "Loading", items: [] }]
          : adaptedGroups
      }
      activeItem={activeItemId}
      onNavigate={handleNavigate}
      collapsed={sidebarCollapsed}
      onCollapsedChange={setSidebarCollapsed}
      showCollapseToggle={product?.shell?.sidebarCollapsible ?? true}
      version={version}
      versionDate={versionDate}
    />
  );

  return (
    <div
      className={`min-h-screen bg-[var(--background)] flex flex-col ${className}`}
      data-product={product?.product}
    >
      {/* ── TopNavbar ─────────────────────────────────────────────────────────── */}
      <TopNavbar
        brand={
          product
            ? { name: product.brand.name, logo: product.brand.logo as string | undefined }
            : { name: "Sellsuki" }
        }
        breadcrumbs={breadcrumbs.map((b) => ({ label: b.label, href: b.href }))}
        user={user ? { name: user.name, avatar: user.avatar } : undefined}
        showSearch={showSearch}
        onSearchClick={onSearchClick}
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
        onUserClick={onUserClick}
        workspaceSwitcher={product?.brand?.workspaceSwitcher}
        onSidebarToggle={() => {
          // On mobile: toggle mobile drawer
          // On desktop: toggle collapse
          if (window.innerWidth < 768) {
            setMobileOpen((v) => !v);
          } else {
            setSidebarCollapsed((v) => !v);
          }
        }}
        onMobileMenuClick={() => setMobileOpen((v) => !v)}
      />

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
        <div
          className="hidden md:flex flex-shrink-0 sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto"
          style={{
            width: sidebarCollapsed ? "var(--shell-sidebar-collapsed, 64px)" : "var(--shell-sidebar-width, 240px)",
            transition: "width var(--duration-sidebar, 250ms) var(--easing-default, cubic-bezier(0.4,0,0.2,1))",
          }}
        >
          {navLoading ? (
            <div className="p-4 w-full">
              <SkeletonList rows={6} />
            </div>
          ) : navError ? (
            <div className="p-3">
              <Alert variant="error">
                <span style={{ fontSize: "var(--text-caption)" }}>Nav load failed</span>
              </Alert>
              <button
                type="button"
                className="mt-2 text-xs text-primary cursor-pointer hover:underline"
                onClick={refreshNav}
              >
                Retry
              </button>
            </div>
          ) : (
            sidebarNode
          )}
        </div>

        {/* ── Mobile Overlay + Drawer ──────────────────────────────────────── */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[var(--z-shell-overlay,80)] bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div
              className="fixed left-0 top-[56px] bottom-0 z-[var(--z-shell-sidebar,90)] w-[240px] bg-card shadow-lg md:hidden overflow-y-auto"
              style={{ transition: "transform var(--duration-sidebar, 250ms) var(--easing-default)" }}
            >
              {navLoading ? (
                <div className="p-4"><SkeletonList rows={6} /></div>
              ) : (
                <Sidebar
                  brand={product ? { name: product.brand.name } : { name: "Sellsuki" }}
                  groups={adaptedGroups}
                  activeItem={activeItemId}
                  onNavigate={handleNavigate}
                  collapsed={false}
                  showCollapseToggle={false}
                  version={version}
                  versionDate={versionDate}
                />
              )}
            </div>
          </>
        )}

        {/* ── Content Frame ────────────────────────────────────────────────── */}
        <main
          className={`flex-1 min-w-0 overflow-y-auto ${contentPadding ? "" : "p-0"}`}
          style={{ maxWidth: product?.shell?.contentMaxWidth }}
        >
          <AppShellErrorBoundary>
            {children}
          </AppShellErrorBoundary>
        </main>
      </div>

      {/* ── ToastContainer (always present in shell) ────────────────────────── */}
      <ToastContainer />
    </div>
  );
}

// ─── AppShell (public API) ────────────────────────────────────────────────────

/**
 * AppShell — top-level layout shell for Sellsuki products.
 *
 * Combines AppShellProvider + TopNavbar + Sidebar + content frame.
 * Handles responsive sidebar (desktop collapse, mobile drawer overlay).
 * Sets data-product attribute for CSS theme token override.
 *
 * @example
 * <AppShell product={sellsukiBrandConfig} user={user} navResolver={nav}>
 *   <FeaturePageScaffold layout="list" ... />
 * </AppShell>
 */
export function AppShell({
  product,
  user,
  navResolver,
  ...rest
}: AppShellProps) {
  return (
    <AppShellProvider
      product={product}
      user={user}
      navResolver={navResolver}
      defaultSidebarOpen={product?.shell?.sidebarDefaultOpen ?? true}
    >
      <InnerAppShell {...rest} />
    </AppShellProvider>
  );
}

AppShell.displayName = "AppShell";

// ─── AppShellSkeleton ─────────────────────────────────────────────────────────

/**
 * Full-page loading skeleton for AppShell.
 * Use while the user session or product config is loading.
 */
export function AppShellSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Nav skeleton */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 gap-3">
        <div className="w-8 h-8 rounded-[var(--radius-md)] bg-muted/40 animate-pulse" />
        <div className="w-24 h-4 rounded bg-muted/40 animate-pulse" />
        <div className="ml-auto flex gap-2">
          <div className="w-8 h-8 rounded-full bg-muted/40 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-muted/40 animate-pulse" />
        </div>
      </div>
      <div className="flex flex-1">
        {/* Sidebar skeleton */}
        <div className="w-60 border-r border-border p-4 space-y-3 hidden md:block">
          <div className="w-full h-8 rounded-[var(--radius-md)] bg-muted/40 animate-pulse" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full h-7 rounded-[var(--radius-md)] bg-muted/30 animate-pulse" />
          ))}
        </div>
        {/* Content skeleton */}
        <div className="flex-1 p-6 space-y-4">
          <div className="h-8 w-48 rounded bg-muted/40 animate-pulse" />
          <div className="h-32 rounded-[var(--radius-lg)] bg-muted/30 animate-pulse" />
          <div className="h-64 rounded-[var(--radius-lg)] bg-muted/30 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

AppShellSkeleton.displayName = "AppShellSkeleton";
