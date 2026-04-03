import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppShell, AppShellSkeleton } from "./AppShell";
import { FeaturePageScaffold, ScaffoldKPIRow } from "./FeaturePageScaffold";
import {
  sellsukiBrandConfig,
  patonaBrandConfig,
  sukispaceBrandConfig,
  shipmunkBrandConfig,
} from "../types/shell";
import type { ShellUser, NavResolver, NavItem } from "../types/shell";
import { PageHeader } from "../components/ds-pageheader";
import { StatCard } from "../components/ds-statistic";
import { FilterBar } from "../components/ds-filterbar";
import { DSButton } from "../components/ds-button";
import { Card, CardHeader, CardBody } from "../components/ds-card";
import { Badge } from "../components/ds-badge";
import { AreaChart, DonutChart } from "../components/ds-chart";
import { ThumbnailCell } from "../components/ds-imagegallery";
import {
  ShoppingCart, Package, Users, Settings, BarChart2,
  Tag, Truck, CreditCard, Bell, Home, Plus, Download,
} from "lucide-react";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const ADMIN_USER: ShellUser = {
  name: "Arisa Kongthong",
  email: "arisa@sellsuki.com",
  role: "Admin",
  avatar: "https://i.pravatar.cc/40?u=arisa",
  permissions: ["orders:read", "orders:write", "settings:read", "analytics:read"],
};

const STAFF_USER: ShellUser = {
  name: "Nattapong Sriwan",
  email: "natt@sellsuki.com",
  role: "Staff",
  permissions: ["orders:read"],
};

const makeNavResolver = (delay = 500): NavResolver => async (user) => {
  await new Promise((r) => setTimeout(r, delay));
  const allGroups = [
    {
      items: [
        { id: "dashboard", label: "Dashboard", icon: <Home size={16} />, href: "/dashboard" },
      ],
    },
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
      ],
    },
    {
      title: "System",
      items: [
        { id: "settings", label: "Settings", icon: <Settings size={16} />, href: "/settings", permission: "settings:read" },
      ],
    },
  ];
  return allGroups.map((g) => ({
    ...g,
    items: g.items.filter((i) => !i.permission || user.permissions.includes(i.permission)),
  })).filter((g) => g.items.length > 0);
};

const MONTHLY = [
  { label: "Jan", value: 42000 }, { label: "Feb", value: 38500 },
  { label: "Mar", value: 51200 }, { label: "Apr", value: 47800 },
  { label: "May", value: 63100 }, { label: "Jun", value: 58900 },
  { label: "Jul", value: 72400 },
];

// ─── Sample page content ──────────────────────────────────────────────────────

function OrdersPage() {
  return (
    <FeaturePageScaffold
      layout="list"
      header={
        <PageHeader
          title="Orders"
          breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Orders" }]}
          primaryAction={{ label: "Create order", icon: <Plus size={16} /> }}
          secondaryActions={[{ label: "Export", icon: <Download size={16} />, variant: "outline" }]}
        />
      }
      stats={
        <ScaffoldKPIRow>
          <StatCard title="Total Orders" value="1,284" trend={{ value: 12, direction: "up" }} />
          <StatCard title="Pending" value="48" trend={{ value: 3, direction: "up" }} />
          <StatCard title="Revenue" value="฿284,500" trend={{ value: 8, direction: "up" }} />
          <StatCard title="Avg. Value" value="฿2,218" trend={{ value: 5, direction: "up" }} />
        </ScaffoldKPIRow>
      }
      filters={
        <FilterBar
          filters={[
            { key: "status", label: "Status", type: "select", options: [
              { label: "All", value: "" },
              { label: "Pending", value: "pending" },
              { label: "Shipped", value: "shipped" },
            ]},
          ]}
          value={{}}
          onChange={() => {}}
          searchPlaceholder="Search orders..."
        />
      }
      content={
        <Card>
          <CardBody className="p-0">
            {["#1234","#1235","#1236","#1237","#1238"].map((id, i) => (
              <div key={id} className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0">
                <ThumbnailCell
                  src={`https://picsum.photos/seed/${i+20}/40/40`}
                  caption={`Order ${id}`}
                  subCaption={`฿${(1200 + i * 350).toLocaleString()}`}
                  size="sm"
                />
                <div className="ml-auto">
                  <Badge variant={["warning","primary","secondary","success","destructive"][i] as any}>
                    {["Pending","Processing","Shipped","Delivered","Cancelled"][i]}
                  </Badge>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      }
      footer={
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 1–20 of 1,284 orders</span>
          <div className="flex gap-2">
            <DSButton variant="outline" size="sm">← Prev</DSButton>
            <DSButton variant="outline" size="sm">Next →</DSButton>
          </div>
        </div>
      }
    />
  );
}

function DashboardPage() {
  return (
    <FeaturePageScaffold
      layout="dashboard"
      header={<PageHeader title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]} />}
      kpis={
        <ScaffoldKPIRow>
          <StatCard title="Revenue" value="฿284,500" trend={{ value: 12, direction: "up" }} />
          <StatCard title="Orders" value="1,284" trend={{ value: 8, direction: "up" }} />
          <StatCard title="Customers" value="892" trend={{ value: 3, direction: "down" }} />
          <StatCard title="Avg. Order" value="฿2,218" trend={{ value: 5, direction: "up" }} />
        </ScaffoldKPIRow>
      }
      primaryChart={
        <Card>
          <CardHeader>Revenue Trend</CardHeader>
          <CardBody>
            <AreaChart series={[{ name: "Revenue", data: MONTHLY }]} smooth height={200} />
          </CardBody>
        </Card>
      }
      secondaryCharts={
        <>
          <Card>
            <CardHeader>Order Status</CardHeader>
            <CardBody>
              <DonutChart
                size={160}
                data={[
                  { label: "Delivered", value: 820 },
                  { label: "Processing", value: 280 },
                  { label: "Pending", value: 48 },
                ]}
                centerLabel="Total"
              />
            </CardBody>
          </Card>
        </>
      }
    />
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof AppShell> = {
  title: "Shell/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
};
export default meta;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const SellsukiAdmin: StoryObj = {
  name: "Sellsuki — Admin user (Orders list)",
  render: () => (
    <AppShell
      product={sellsukiBrandConfig}
      user={ADMIN_USER}
      navResolver={makeNavResolver()}
      activeItemId="orders"
      onNavigate={(item) => console.log("Navigate:", item.href)}
      notificationCount={5}
      showSearch
    >
      <OrdersPage />
    </AppShell>
  ),
};

export const SellsukiDashboard: StoryObj = {
  name: "Sellsuki — Dashboard",
  render: () => (
    <AppShell
      product={sellsukiBrandConfig}
      user={ADMIN_USER}
      navResolver={makeNavResolver()}
      activeItemId="dashboard"
    >
      <DashboardPage />
    </AppShell>
  ),
};

export const PaproductTheme: StoryObj = {
  name: "Patona — Orange theme",
  render: () => (
    <AppShell
      product={patonaBrandConfig}
      user={ADMIN_USER}
      navResolver={makeNavResolver()}
      activeItemId="orders"
    >
      <FeaturePageScaffold
        layout="list"
        header={
          <PageHeader
            title="Patona — Orders"
            breadcrumbs={[{ label: "Home" }, { label: "Orders" }]}
            primaryAction={{ label: "Create order" }}
          />
        }
        content={
          <Card>
            <CardBody>
              <p className="text-muted-foreground text-sm">
                Notice: primary colour is Orange-500 (Patona brand) — controlled via{" "}
                <code className="text-xs bg-muted/30 px-1 rounded">[data-product="patona"]</code> CSS override.
              </p>
            </CardBody>
          </Card>
        }
      />
    </AppShell>
  ),
};

export const SukispaceTheme: StoryObj = {
  name: "Sukispace — Theme",
  render: () => (
    <AppShell
      product={sukispaceBrandConfig}
      user={ADMIN_USER}
      navResolver={makeNavResolver()}
      activeItemId="orders"
    >
      <FeaturePageScaffold
        layout="list"
        header={<PageHeader title="Sukispace — Orders" breadcrumbs={[{ label: "Home" }, { label: "Orders" }]} primaryAction={{ label: "Create" }} />}
        content={<Card><CardBody><p className="text-sm text-muted-foreground">Sukispace brand theme applied.</p></CardBody></Card>}
      />
    </AppShell>
  ),
};

export const StaffUser: StoryObj = {
  name: "Sellsuki — Staff user (limited nav)",
  render: () => (
    <AppShell
      product={sellsukiBrandConfig}
      user={STAFF_USER}
      navResolver={makeNavResolver()}
      activeItemId="orders"
    >
      <FeaturePageScaffold
        layout="list"
        header={<PageHeader title="Orders (Staff)" breadcrumbs={[{ label: "Orders" }]} primaryAction={{ label: "Create order" }} />}
        content={
          <Card>
            <CardBody>
              <p className="text-sm text-muted-foreground">Staff sees fewer nav items — Settings and Promotions are hidden due to permission filter.</p>
            </CardBody>
          </Card>
        }
      />
    </AppShell>
  ),
};

export const NoNavResolver: StoryObj = {
  name: "No nav resolver (empty nav)",
  render: () => (
    <AppShell
      product={sellsukiBrandConfig}
      user={ADMIN_USER}
      activeItemId="orders"
    >
      <FeaturePageScaffold
        layout="list"
        header={<PageHeader title="No Nav" breadcrumbs={[{ label: "Orders" }]} primaryAction={{ label: "Action" }} />}
        content={<Card><CardBody><p className="text-sm text-muted-foreground">No navResolver provided — sidebar is empty (product controls nav externally).</p></CardBody></Card>}
      />
    </AppShell>
  ),
};

export const LoadingState: StoryObj = {
  name: "AppShellSkeleton (loading state)",
  render: () => <AppShellSkeleton />,
};

export const SlowNav: StoryObj = {
  name: "Slow nav resolver (2s delay)",
  render: () => (
    <AppShell
      product={sellsukiBrandConfig}
      user={ADMIN_USER}
      navResolver={makeNavResolver(2000)}
      activeItemId="orders"
    >
      <FeaturePageScaffold
        layout="list"
        header={<PageHeader title="Orders" breadcrumbs={[{ label: "Orders" }]} primaryAction={{ label: "Create" }} />}
        content={<Card><CardBody><p className="text-sm text-muted-foreground">Sidebar shows SkeletonList while navResolver is loading (2s delay).</p></CardBody></Card>}
      />
    </AppShell>
  ),
};
