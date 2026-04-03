import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FeaturePageScaffold, ScaffoldSection, ScaffoldKPIRow } from "./FeaturePageScaffold";
import { PageHeader } from "../components/ds-pageheader";
import { FilterBar } from "../components/ds-filterbar";
import { DSButton } from "../components/ds-button";
import { Card, CardHeader, CardBody } from "../components/ds-card";
import { StatCard } from "../components/ds-statistic";
import { Stepper } from "../components/ds-stepper";
import { DSInput } from "../components/ds-input";
import { DSTextarea } from "../components/ds-input";
import { Switch } from "../components/ds-switch";
import { Divider } from "../components/ds-divider";
import { Badge } from "../components/ds-badge";
import { BarChart, LineChart, DonutChart, AreaChart } from "../components/ds-chart";
import { DateRangePicker } from "../components/ds-daterangepicker";
import { ThumbnailCell } from "../components/ds-imagegallery";
import { Plus, Download, Upload, ShoppingCart, Package, TrendingUp, Users, AlertCircle } from "lucide-react";

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const MONTHLY = [
  { label: "Jan", value: 42000 }, { label: "Feb", value: 38500 },
  { label: "Mar", value: 51200 }, { label: "Apr", value: 47800 },
  { label: "May", value: 63100 }, { label: "Jun", value: 58900 },
  { label: "Jul", value: 72400 },
];

const FilterBarDemo = () => (
  <FilterBar
    filters={[
      { key: "status", label: "Status", type: "select", options: [
        { label: "All", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
      ]},
      { key: "date", label: "Date", type: "select", options: [
        { label: "Today", value: "today" },
        { label: "Last 7 days", value: "7d" },
        { label: "Last 30 days", value: "30d" },
      ]},
    ]}
    value={{}}
    onChange={() => {}}
    searchPlaceholder="Search orders..."
  />
);

const MockTable = () => (
  <Card>
    <CardBody className="p-0">
      <div className="divide-y divide-border">
        {["#1234", "#1235", "#1236", "#1237", "#1238"].map((id, i) => (
          <div key={id} className="flex items-center gap-4 px-4 py-3">
            <ThumbnailCell
              src={`https://picsum.photos/seed/${i}/40/40`}
              caption={`Order ${id}`}
              subCaption={`${["Pending","Processing","Shipped","Delivered","Cancelled"][i]} · ฿${(1200 + i * 350).toLocaleString()}`}
              size="sm"
            />
            <div className="ml-auto flex items-center gap-2">
              <Badge variant={["warning","primary","secondary","success","destructive"][i] as any}>
                {["Pending","Processing","Shipped","Delivered","Cancelled"][i]}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FeaturePageScaffold> = {
  title: "Shell/FeaturePageScaffold",
  component: FeaturePageScaffold,
  parameters: { layout: "fullscreen" },
};
export default meta;

// ──────────────────────────────────────────────────────────────────────────────
// Layout: list
// ──────────────────────────────────────────────────────────────────────────────

export const ListPage: StoryObj = {
  name: "list — Orders page",
  render: () => (
    <FeaturePageScaffold
      layout="list"
      header={
        <PageHeader
          title="Orders"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Orders" }]}
          primaryAction={{ label: "Create order", icon: <Plus size={16} /> }}
          secondaryActions={[
            { label: "Export", icon: <Download size={16} />, variant: "outline" },
            { label: "Import", icon: <Upload size={16} />, variant: "outline" },
          ]}
        />
      }
      stats={
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total orders" value="1,284" trend={{ value: 12, direction: "up" }} icon={<ShoppingCart size={20} />} />
          <StatCard title="Pending" value="48" trend={{ value: 3, direction: "up" }} icon={<Package size={20} />} />
          <StatCard title="Revenue" value="฿284,500" trend={{ value: 8, direction: "up" }} icon={<TrendingUp size={20} />} />
          <StatCard title="Customers" value="892" trend={{ value: 2, direction: "down" }} icon={<Users size={20} />} />
        </div>
      }
      filters={<FilterBarDemo />}
      content={<MockTable />}
      footer={
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 1–20 of 1,284 orders</span>
          <div className="flex gap-2">
            <DSButton variant="outline" size="sm">← Previous</DSButton>
            <DSButton variant="outline" size="sm">Next →</DSButton>
          </div>
        </div>
      }
    />
  ),
};

// ──────────────────────────────────────────────────────────────────────────────
// Layout: detail
// ──────────────────────────────────────────────────────────────────────────────

export const DetailPage: StoryObj = {
  name: "detail — Order detail",
  render: () => (
    <FeaturePageScaffold
      layout="detail"
      header={
        <PageHeader
          title="Order #1234"
          breadcrumbs={[{ label: "Orders", href: "/orders" }, { label: "#1234" }]}
          primaryAction={{ label: "Print receipt" }}
          secondaryActions={[{ label: "Cancel order", variant: "destructive" }]}
        />
      }
      main={
        <div className="space-y-4">
          <Card>
            <CardHeader>Items</CardHeader>
            <CardBody>
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <ThumbnailCell src={`https://picsum.photos/seed/${i+10}/40/40`} caption={`Product ${i}`} subCaption={`฿${i * 299}`} size="sm" />
                  <span className="ml-auto text-sm text-muted-foreground">× {i}</span>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Shipping address</CardHeader>
            <CardBody>
              <p className="text-sm text-foreground">456 Sukhumvit Road, Watthana, Bangkok 10110</p>
            </CardBody>
          </Card>
        </div>
      }
      aside={
        <div className="space-y-4">
          <Card>
            <CardHeader>Order summary</CardHeader>
            <CardBody>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>฿897</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>฿50</span></div>
                <Divider spacing="sm" />
                <div className="flex justify-between font-semibold"><span>Total</span><span>฿947</span></div>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Customer</CardHeader>
            <CardBody>
              <p className="text-sm font-medium">Somchai Jaidee</p>
              <p className="text-xs text-muted-foreground">somchai@example.com</p>
              <p className="text-xs text-muted-foreground">+66 81 234 5678</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Status</CardHeader>
            <CardBody>
              <Badge variant="warning">Pending payment</Badge>
            </CardBody>
          </Card>
        </div>
      }
    />
  ),
};

// ──────────────────────────────────────────────────────────────────────────────
// Layout: settings
// ──────────────────────────────────────────────────────────────────────────────

export const SettingsPage: StoryObj = {
  name: "settings — Store settings",
  render: () => (
    <FeaturePageScaffold
      layout="settings"
      header={<PageHeader title="Store Settings" breadcrumbs={[{ label: "Settings" }]} />}
      sections={
        <div className="space-y-10">
          <ScaffoldSection title="General" description="Basic information about your store.">
            <div className="space-y-4 max-w-md">
              <DSInput label="Store name" defaultValue="My Awesome Store" />
              <DSInput label="Store URL" defaultValue="mystore.sellsuki.com" prefix="https://" />
              <DSTextarea label="Store description" showCharCount maxLength={200} />
            </div>
          </ScaffoldSection>

          <Divider />

          <ScaffoldSection title="Notifications" description="Choose which notifications you receive." action={<DSButton variant="ghost" size="sm">Reset to defaults</DSButton>}>
            <div className="space-y-3">
              {["New order", "Order shipped", "Low stock alert", "Customer review"].map((label) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{label}</span>
                  <Switch defaultChecked={label !== "Customer review"} />
                </div>
              ))}
            </div>
          </ScaffoldSection>

          <Divider />

          <ScaffoldSection title="Danger zone" description="Irreversible actions for your store." action={
            <DSButton variant="destructive" size="sm">Delete store</DSButton>
          }>
            <div className="flex items-start gap-2 p-3 rounded-[var(--radius-md)] border border-destructive/20 bg-destructive/5 text-sm text-destructive">
              <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              Deleting your store is permanent and cannot be undone.
            </div>
          </ScaffoldSection>
        </div>
      }
    />
  ),
};

// ──────────────────────────────────────────────────────────────────────────────
// Layout: wizard
// ──────────────────────────────────────────────────────────────────────────────

export const WizardPage: StoryObj = {
  name: "wizard — Add product",
  render: () => (
    <FeaturePageScaffold
      layout="wizard"
      header={<PageHeader title="Add Product" breadcrumbs={[{ label: "Products", href: "/products" }, { label: "New" }]} />}
      stepper={
        <Stepper
          currentStep={1}
          steps={[
            { id: "info", label: "Basic info" },
            { id: "variants", label: "Variants" },
            { id: "pricing", label: "Pricing" },
            { id: "shipping", label: "Shipping" },
            { id: "review", label: "Review" },
          ]}
        />
      }
      form={
        <Card className="max-w-2xl">
          <CardHeader>Basic Information</CardHeader>
          <CardBody>
            <div className="space-y-4">
              <DSInput label="Product name" placeholder="e.g. iPhone 15 Pro 256GB" required />
              <DSInput label="SKU" placeholder="e.g. IP15P-256-TIT" />
              <DSTextarea label="Description" showCharCount maxLength={500} placeholder="Describe your product…" />
              <DSInput label="Category" placeholder="Select category" />
            </div>
          </CardBody>
        </Card>
      }
      actions={
        <>
          <DSButton variant="ghost">Cancel</DSButton>
          <DSButton variant="outline">Save draft</DSButton>
          <DSButton variant="primary">Next: Variants →</DSButton>
        </>
      }
    />
  ),
};

// ──────────────────────────────────────────────────────────────────────────────
// Layout: dashboard
// ──────────────────────────────────────────────────────────────────────────────

export const DashboardPage: StoryObj = {
  name: "dashboard — Analytics overview",
  render: () => (
    <FeaturePageScaffold
      layout="dashboard"
      header={<PageHeader title="Dashboard" breadcrumbs={[{ label: "Dashboard" }]} />}
      kpis={
        <ScaffoldKPIRow>
          <StatCard title="Total Revenue" value="฿284,500" trend={{ value: 12, direction: "up" }} trendLabel="vs last month" />
          <StatCard title="Orders" value="1,284" trend={{ value: 8, direction: "up" }} />
          <StatCard title="Customers" value="892" trend={{ value: 3, direction: "down" }} />
          <StatCard title="Avg. Order Value" value="฿2,218" trend={{ value: 5, direction: "up" }} />
        </ScaffoldKPIRow>
      }
      primaryChart={
        <Card>
          <CardHeader>Revenue trend</CardHeader>
          <CardBody>
            <AreaChart series={[{ name: "Revenue (฿)", data: MONTHLY }]} height={220} smooth />
          </CardBody>
        </Card>
      }
      secondaryCharts={
        <>
          <Card>
            <CardHeader>Orders by status</CardHeader>
            <CardBody>
              <DonutChart
                data={[
                  { label: "Delivered", value: 820 },
                  { label: "Processing", value: 280 },
                  { label: "Pending", value: 48 },
                  { label: "Cancelled", value: 136 },
                ]}
                centerLabel="Total"
                size={160}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Top channels</CardHeader>
            <CardBody>
              <BarChart
                series={[{ name: "Orders", data: [
                  { label: "Shopee", value: 420 },
                  { label: "Lazada", value: 310 },
                  { label: "Line", value: 195 },
                  { label: "Direct", value: 359 },
                ]}]}
                height={180}
              />
            </CardBody>
          </Card>
        </>
      }
      content={<MockTable />}
    />
  ),
};

// ──────────────────────────────────────────────────────────────────────────────
// Layout: form
// ──────────────────────────────────────────────────────────────────────────────

export const FormPage: StoryObj = {
  name: "form — Edit product",
  render: () => (
    <FeaturePageScaffold
      layout="form"
      header={
        <PageHeader
          title="Edit Product"
          breadcrumbs={[{ label: "Products", href: "/products" }, { label: "iPhone 15 Pro", href: "/products/1" }, { label: "Edit" }]}
        />
      }
      form={
        <div className="space-y-6">
          <Card>
            <CardHeader>Basic info</CardHeader>
            <CardBody>
              <div className="space-y-4">
                <DSInput label="Product name" defaultValue="iPhone 15 Pro 256GB" required />
                <DSInput label="SKU" defaultValue="IP15P-256-TIT" />
                <DSTextarea label="Description" showCharCount maxLength={500} defaultValue="The latest iPhone with titanium design and 48MP camera." />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Pricing</CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <DSInput label="Price (฿)" defaultValue="43900" />
                <DSInput label="Compare at price (฿)" defaultValue="45900" />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Inventory</CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <DSInput label="Stock quantity" defaultValue="48" />
                <DSInput label="Low stock threshold" defaultValue="5" />
              </div>
            </CardBody>
          </Card>
        </div>
      }
      actions={
        <>
          <DSButton variant="ghost">Discard changes</DSButton>
          <DSButton variant="primary">Save changes</DSButton>
        </>
      }
    />
  ),
};

// ──────────────────────────────────────────────────────────────────────────────
// Layout: report
// ──────────────────────────────────────────────────────────────────────────────

export const ReportPage: StoryObj = {
  name: "report — Sales report",
  render: () => (
    <FeaturePageScaffold
      layout="report"
      header={
        <PageHeader
          title="Sales Report"
          breadcrumbs={[{ label: "Analytics" }, { label: "Sales" }]}
          primaryAction={{ label: "Export CSV", icon: <Download size={16} />, variant: "outline" }}
        />
      }
      stats={
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value="฿284,500" trend={{ value: 12, direction: "up" }} />
          <StatCard title="Orders" value="1,284" trend={{ value: 8, direction: "up" }} />
          <StatCard title="Avg. Order" value="฿2,218" trend={{ value: 5, direction: "up" }} />
          <StatCard title="Refunds" value="฿12,400" trend={{ value: 2, direction: "down" }} />
        </div>
      }
      dateRange={<DateRangePicker presets={["today","last7","last30","thisMonth","custom"]} />}
      charts={
        <Card>
          <CardHeader>Revenue over time</CardHeader>
          <CardBody>
            <LineChart
              series={[
                { name: "Revenue", data: MONTHLY },
                { name: "Prev period", data: MONTHLY.map(d => ({ ...d, value: Math.round(d.value * 0.88) })) },
              ]}
              height={240}
              smooth
            />
          </CardBody>
        </Card>
      }
      secondaryCharts={
        <>
          <Card>
            <CardHeader>Revenue by channel</CardHeader>
            <CardBody>
              <BarChart series={[{ name: "Revenue", data: [
                { label: "Shopee", value: 82000 },
                { label: "Lazada", value: 61000 },
                { label: "Direct", value: 95000 },
                { label: "Line", value: 46500 },
              ]}]} height={180} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Top products</CardHeader>
            <CardBody>
              {["iPhone 15 Pro","AirPods Pro 2","MacBook Air M3"].map((p, i) => (
                <div key={p} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
                  <span className="text-foreground">{p}</span>
                  <span className="text-muted-foreground">฿{[(124700),(38200),(87600)][i].toLocaleString()}</span>
                </div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Customer segments</CardHeader>
            <CardBody>
              <DonutChart
                data={[
                  { label: "New", value: 340 },
                  { label: "Returning", value: 552 },
                ]}
                innerRatio={0.65}
                centerLabel="Customers"
                size={160}
              />
            </CardBody>
          </Card>
        </>
      }
      table={<MockTable />}
      footer={
        <div className="flex items-center justify-end gap-2">
          <DSButton variant="outline" size="sm">← Previous</DSButton>
          <DSButton variant="outline" size="sm">Next →</DSButton>
        </div>
      }
    />
  ),
};
