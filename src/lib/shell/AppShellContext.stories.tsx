import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect } from "react";
import {
  AppShellProvider,
  useAppShell,
  useAppShellFull,
  useBreadcrumbs,
  useNavResolver,
  AppShellErrorBoundary,
} from "./AppShellContext";
import {
  sellsukiBrandConfig,
  patonaBrandConfig,
} from "../types/shell";
import type { ShellUser, NavResolver } from "../types/shell";
import {
  ShoppingCart, Package, Users, Settings, BarChart2,
  Tag, Truck, CreditCard, Bell, AlertTriangle,
} from "lucide-react";
import { Badge } from "../components/ds-badge";
import { Card, CardHeader, CardBody } from "../components/ds-card";
import { Spinner } from "../components/ds-spinner";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const ADMIN_USER: ShellUser = {
  name: "Arisa Kongthong",
  email: "arisa@sellsuki.com",
  role: "Admin",
  avatar: "https://i.pravatar.cc/40?u=arisa",
  permissions: ["orders:read", "orders:write", "settings:read", "settings:write", "analytics:read"],
};

const STAFF_USER: ShellUser = {
  name: "Nattapong Sriwan",
  email: "natt@sellsuki.com",
  role: "Staff",
  permissions: ["orders:read"],
};

const MOCK_NAV_RESOLVER: NavResolver = async (user) => {
  // Simulate API latency
  await new Promise((r) => setTimeout(r, 600));

  const allGroups = [
    {
      title: "Sales",
      items: [
        { id: "orders", label: "Orders", icon: <ShoppingCart size={16} />, href: "/orders", badge: 12, permission: "orders:read" },
        { id: "products", label: "Products", icon: <Package size={16} />, href: "/products", permission: "orders:read" },
        { id: "promotions", label: "Promotions", icon: <Tag size={16} />, href: "/promotions", permission: "orders:write" },
      ],
    },
    {
      title: "Operations",
      items: [
        { id: "shipping", label: "Shipping", icon: <Truck size={16} />, href: "/shipping", permission: "orders:read" },
        { id: "payments", label: "Payments", icon: <CreditCard size={16} />, href: "/payments", permission: "orders:read" },
        { id: "customers", label: "Customers", icon: <Users size={16} />, href: "/customers", permission: "orders:read" },
      ],
    },
    {
      title: "Insights",
      items: [
        { id: "analytics", label: "Analytics", icon: <BarChart2 size={16} />, href: "/analytics", permission: "analytics:read" },
        { id: "notifications", label: "Notifications", icon: <Bell size={16} />, href: "/notifications", badge: 3 },
      ],
    },
    {
      title: "System",
      items: [
        { id: "settings", label: "Settings", icon: <Settings size={16} />, href: "/settings", permission: "settings:read" },
      ],
    },
  ];

  // Filter by permissions
  return allGroups.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => !item.permission || user.permissions.includes(item.permission)
    ),
  })).filter((group) => group.items.length > 0);
};

// ─── Debug Panel ──────────────────────────────────────────────────────────────

function ShellDebugPanel() {
  const { sidebarOpen, setSidebarOpen, user, product, breadcrumbs, navGroups, navLoading, navError } =
    useAppShellFull();

  return (
    <Card className="mt-4">
      <CardHeader>
        <span className="font-semibold text-sm">AppShell Context Debug</span>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground font-medium">State</p>
            <p>sidebarOpen: <Badge variant={sidebarOpen ? "success" : "secondary"}>{String(sidebarOpen)}</Badge></p>
            <p>user: <span className="text-foreground">{user?.name ?? "null"}</span></p>
            <p>role: <span className="text-foreground">{user?.role ?? "—"}</span></p>
            <p>product: <span className="text-foreground">{product?.product ?? "null"}</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground font-medium">Navigation</p>
            <p>navLoading: <Badge variant={navLoading ? "warning" : "secondary"}>{String(navLoading)}</Badge></p>
            <p>navError: <span className="text-destructive">{navError ?? "—"}</span></p>
            <p>navGroups: <span className="text-foreground">{navGroups.length} groups</span></p>
            <p>
              navItems:{" "}
              <span className="text-foreground">
                {navGroups.reduce((sum, g) => sum + g.items.length, 0)} items
              </span>
            </p>
          </div>
          <div className="col-span-2 space-y-1">
            <p className="text-muted-foreground font-medium">Breadcrumbs</p>
            <p className="text-foreground">
              {breadcrumbs.length > 0
                ? breadcrumbs.map((b) => b.label).join(" › ")
                : "— (none set)"}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            className="px-3 py-1 text-xs rounded border border-border hover:bg-muted/20 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Toggle sidebar
          </button>
        </div>
      </CardBody>
    </Card>
  );
}

// ─── Feature Page Simulation ──────────────────────────────────────────────────

function MockFeaturePage({ title }: { title: string }) {
  useBreadcrumbs([
    { label: "Home", href: "/" },
    { label: title },
  ]);
  return (
    <div className="p-4 rounded-[var(--radius-md)] border border-dashed border-border text-muted-foreground text-sm text-center">
      Feature page: <strong>{title}</strong><br/>
      <span className="text-xs">(breadcrumbs set via useBreadcrumbs)</span>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Shell/AppShellProvider",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const BasicProvider: StoryObj = {
  name: "Basic — no nav resolver",
  render: () => (
    <AppShellProvider user={ADMIN_USER} product={sellsukiBrandConfig}>
      <ShellDebugPanel />
    </AppShellProvider>
  ),
};

export const WithAsyncNav: StoryObj = {
  name: "Async nav — Admin (all permissions)",
  render: () => (
    <AppShellProvider user={ADMIN_USER} product={sellsukiBrandConfig} navResolver={MOCK_NAV_RESOLVER}>
      <MockFeaturePage title="Orders" />
      <ShellDebugPanel />
    </AppShellProvider>
  ),
};

export const WithStaffUser: StoryObj = {
  name: "Async nav — Staff (limited permissions)",
  render: () => (
    <AppShellProvider user={STAFF_USER} product={sellsukiBrandConfig} navResolver={MOCK_NAV_RESOLVER}>
      <MockFeaturePage title="Orders (Staff view)" />
      <ShellDebugPanel />
    </AppShellProvider>
  ),
};

export const PaproductTheme: StoryObj = {
  name: "Patona product theme",
  render: () => (
    <AppShellProvider user={ADMIN_USER} product={patonaBrandConfig} navResolver={MOCK_NAV_RESOLVER}>
      <div className="p-4 rounded-[var(--radius-md)] bg-primary/10 border border-primary text-primary text-sm font-medium mb-4">
        Product: Patona — primary colour should be Orange (check data-product attribute on html)
      </div>
      <ShellDebugPanel />
    </AppShellProvider>
  ),
};

export const BreadcrumbSetter: StoryObj = {
  name: "useBreadcrumbs hook",
  render: () => (
    <AppShellProvider user={ADMIN_USER} product={sellsukiBrandConfig}>
      <MockFeaturePage title="Product Detail — Samsung Galaxy S24" />
      <ShellDebugPanel />
    </AppShellProvider>
  ),
};

export const NavError: StoryObj = {
  name: "Nav resolver — error state",
  render: () => {
    const failingResolver: NavResolver = async () => {
      await new Promise((r) => setTimeout(r, 400));
      throw new Error("Network error: 503 Service Unavailable");
    };
    return (
      <AppShellProvider user={ADMIN_USER} product={sellsukiBrandConfig} navResolver={failingResolver}>
        <ShellDebugPanel />
      </AppShellProvider>
    );
  },
};

export const ErrorBoundaryDemo: StoryObj = {
  name: "AppShellErrorBoundary",
  render: () => {
    const CrashingComponent = () => {
      throw new Error("Simulated feature page crash");
    };
    return (
      <AppShellProvider user={ADMIN_USER} product={sellsukiBrandConfig}>
        <AppShellErrorBoundary>
          <CrashingComponent />
        </AppShellErrorBoundary>
        <p className="mt-4 text-sm text-muted-foreground">Shell continues to render despite feature page crash ↑</p>
        <ShellDebugPanel />
      </AppShellProvider>
    );
  },
};

export const StandaloneNavResolver: StoryObj = {
  name: "useNavResolver — standalone (no AppShellProvider)",
  render: () => {
    function NavDebug() {
      const { groups, loading, error, refresh } = useNavResolver(MOCK_NAV_RESOLVER, ADMIN_USER);
      if (loading) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Spinner size="sm" />Loading nav…</div>;
      if (error) return <div className="text-destructive text-sm flex items-center gap-1"><AlertTriangle size={14} />{error}</div>;
      return (
        <div className="space-y-2">
          {groups.map((g, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{g.title}</p>
              {g.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground">
                  {item.icon}
                  {item.label}
                  {item.badge !== undefined && (
                    <Badge variant="secondary" size="sm">{String(item.badge)}</Badge>
                  )}
                </div>
              ))}
            </div>
          ))}
          <button className="mt-2 text-xs text-primary cursor-pointer" onClick={refresh}>Refresh nav</button>
        </div>
      );
    }
    return (
      <div className="max-w-xs p-4 border border-border rounded-[var(--radius-md)] bg-card">
        <p className="text-sm font-semibold mb-3">Standalone Nav (no Provider)</p>
        <NavDebug />
      </div>
    );
  },
};
