/**
 * Sellsuki Design System — Shell & Navigation Types
 *
 * These types form the contract between:
 * - AppShell (layout layer)
 * - FeaturePageScaffold (page region layer)
 * - ProductShellConfig (product identity layer)
 * - Feature pages (consumer layer)
 *
 * Stage 2 of GOAL-DS-90-PERCENT.md
 */

import type React from "react";

/* ─── Navigation Types ───────────────────────────────────────────────────────── */

/**
 * A single navigation item in the sidebar.
 * Supports static badge, async badge, and permission gating.
 */
export interface NavItem {
  /** Unique identifier — used for active state matching */
  id: string;
  /** Display label */
  label: string;
  /** Leading icon (ReactNode — use lucide-react icons) */
  icon?: React.ReactNode;
  /** Navigation target — href or route path */
  href?: string;
  /** Badge count or label — static string/number or async resolver */
  badge?: string | number | (() => Promise<number>);
  /** Child items for nested navigation (one level only) */
  children?: NavItem[];
  /** Permission key required to show this item — matched against ShellUser.permissions */
  permission?: string;
  /** Disable click and dim the item */
  disabled?: boolean;
}

/**
 * A group of navigation items used by AppShell — richer than the standalone Sidebar's SidebarGroup.
 * Use this type when configuring AppShell navigation via NavResolver.
 * @alias ShellSidebarGroup
 */
export interface ShellSidebarGroup {
  /** Group label shown as section header — omit for ungrouped items */
  title?: string;
  /** Navigation items in this group */
  items: NavItem[];
  /** Whether the group can be collapsed — default false */
  collapsible?: boolean;
  /** Default collapsed state — only applies if collapsible=true */
  defaultCollapsed?: boolean;
}

/**
 * A resolver function that returns navigation groups for a given user.
 * Used by AppShell to support permission-filtered, async navigation.
 *
 * @example
 * const navResolver: NavResolver = async (user) => {
 *   const counts = await fetchBadgeCounts(user.id);
 *   return buildNavGroups(user.permissions, counts);
 * };
 */
export type NavResolver = (user: ShellUser) => ShellSidebarGroup[] | Promise<ShellSidebarGroup[]>;

/* ─── User Types ─────────────────────────────────────────────────────────────── */

/**
 * The authenticated user shown in the shell (top nav user menu, sidebar account).
 */
export interface ShellUser {
  /** Display name */
  name: string;
  /** Avatar image URL — falls back to initials if not provided */
  avatar?: string;
  /** Email address */
  email?: string;
  /** User role label (e.g. "Admin", "Staff", "Owner") */
  role?: string;
  /** Permission keys for nav item filtering — e.g. ["orders:read", "settings:write"] */
  permissions: string[];
}

/* ─── Product Brand Config ───────────────────────────────────────────────────── */

/**
 * Product identifier — all current and planned Sellsuki products.
 */
export type ProductId =
  | "sellsuki"
  | "patona"
  | "sukispace"
  | "shipmunk"
  | "akita"
  | "oc2plus"
  | (string & {}); // allow custom product IDs without breaking type-checking

/**
 * Shell layout preferences that can be overridden per product.
 */
export interface ShellPrefs {
  /** Whether the sidebar can be collapsed — default true */
  sidebarCollapsible?: boolean;
  /** Sidebar open by default on desktop — default true */
  sidebarDefaultOpen?: boolean;
  /** Max width of the content area — default undefined (full width) */
  contentMaxWidth?: string;
}

/**
 * Static brand identity config for a product.
 *
 * This is the config that ships in the npm package (or product repo).
 * It does NOT include navigation — nav lives in the product repo (dynamic).
 *
 * @example
 * const sellsukiBrandConfig: ProductBrandConfig = {
 *   product: "sellsuki",
 *   brand: {
 *     name: "Sellsuki",
 *     logo: <SellsukiLogo />,
 *     theme: "sellsuki",
 *   },
 * };
 */
export interface ProductBrandConfig {
  /** Product identifier — sets data-product attribute on shell root */
  product: ProductId;
  /** Brand identity */
  brand: {
    /** Brand/product name shown in sidebar header and nav title */
    name: string;
    /** Logo component or image URL */
    logo?: React.ReactNode;
    /** CSS theme class or data-product value — used for token overrides */
    theme?: string;
    /** Optional workspace/shop switcher rendered after brand logo in TopNavbar */
    workspaceSwitcher?: React.ReactNode;
  };
  /** Optional shell layout preferences */
  shell?: ShellPrefs;
}

/* ─── AppShell Context ───────────────────────────────────────────────────────── */

/**
 * The context value provided by AppShellProvider and consumed by useAppShell().
 * Feature pages use this to read shell state and push breadcrumbs.
 */
export interface AppShellContextValue {
  /** Whether the sidebar is currently open */
  sidebarOpen: boolean;
  /** Toggle sidebar open/closed */
  setSidebarOpen: (open: boolean) => void;
  /** The current authenticated user */
  user: ShellUser | null;
  /** The current product config */
  product: ProductBrandConfig | null;
  /** Current breadcrumb items */
  breadcrumbs: BreadcrumbEntry[];
  /**
   * Set breadcrumbs from a feature page.
   * Call this in a useEffect when the page mounts.
   *
   * @example
   * const { setBreadcrumbs } = useAppShell();
   * useEffect(() => {
   *   setBreadcrumbs([
   *     { label: "Orders", href: "/orders" },
   *     { label: "Order #12345" },
   *   ]);
   * }, []);
   */
  setBreadcrumbs: (items: BreadcrumbEntry[]) => void;
}

/**
 * A breadcrumb entry set by feature pages via setBreadcrumbs().
 */
export interface BreadcrumbEntry {
  /** Display label */
  label: string;
  /** Navigation href — omit for current page (last item) */
  href?: string;
}

/* ─── Preset Brand Configs ───────────────────────────────────────────────────── */

/**
 * Sellsuki brand config — Sky-500 primary, DB HeaventRounded font.
 * Use this as the default for Sellsuki Admin product.
 */
export const sellsukiBrandConfig: ProductBrandConfig = {
  product: "sellsuki",
  brand: {
    name: "Sellsuki",
    theme: "sellsuki",
  },
  shell: {
    sidebarCollapsible: true,
    sidebarDefaultOpen: true,
  },
};

/**
 * Patona brand config — Orange-500 primary.
 * Logo and workspaceSwitcher should be provided by the Patona product repo.
 */
export const patonaBrandConfig: ProductBrandConfig = {
  product: "patona",
  brand: {
    name: "Patona",
    theme: "patona",
  },
  shell: {
    sidebarCollapsible: true,
    sidebarDefaultOpen: true,
  },
};

/**
 * Sukispace brand config — Sky-500 primary (same as Sellsuki, identity TBD).
 */
export const sukispaceBrandConfig: ProductBrandConfig = {
  product: "sukispace",
  brand: {
    name: "Sukispace",
    theme: "sukispace",
  },
  shell: {
    sidebarCollapsible: true,
    sidebarDefaultOpen: true,
  },
};

/**
 * Shipmunk brand config — placeholder, theme TBD.
 */
export const shipmunkBrandConfig: ProductBrandConfig = {
  product: "shipmunk",
  brand: {
    name: "Shipmunk",
    theme: "shipmunk",
  },
};

/**
 * Akita brand config — placeholder, theme TBD.
 */
export const akitaBrandConfig: ProductBrandConfig = {
  product: "akita",
  brand: {
    name: "Akita",
    theme: "akita",
  },
};
