import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sidebar } from "./ds-sidebar";
import { TopNavbar } from "./ds-topnavbar";
import { Home, Package, ShoppingCart, Settings, Users, BarChart3 } from "lucide-react";
import SellsukiFull from "../../imports/SellsukiFull";

const sellsukiBrand = { name: "Sellsuki", logoFull: <SellsukiFull height={40} /> };

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
    showCollapseToggle: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const groups = [
  {
    label: "Main",
    items: [
      { id: "home",      label: "Dashboard", icon: <Home size={16} /> },
      { id: "products",  label: "Products",  icon: <Package size={16} />, badge: "12" },
      { id: "orders",    label: "Orders",    icon: <ShoppingCart size={16} />, badge: "3" },
      { id: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "customers", label: "Customers", icon: <Users size={16} /> },
      { id: "settings",  label: "Settings",  icon: <Settings size={16} /> },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ height: 500 }}>
      <Sidebar
        brand={sellsukiBrand}
        groups={groups}
        activeItem="home"
        onNavigate={() => {}}
      />
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div style={{ height: 500 }}>
      <Sidebar
        brand={sellsukiBrand}
        groups={groups}
        activeItem="home"
        collapsed
      />
    </div>
  ),
};

/** Self-contained: collapse toggle in sidebar footer */
export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("home");
    return (
      <div style={{ height: 500 }}>
        <Sidebar
          brand={sellsukiBrand}
          groups={groups}
          activeItem={active}
          onNavigate={(item) => setActive(item.id)}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          showCollapseToggle
        />
      </div>
    );
  },
};

/** Recommended pattern: TopNavbar burger controls Sidebar — hide sidebar footer toggle */
export const ControlledFromNavbar: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("home");
    return (
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", height: 480 }}>
        <TopNavbar
          brand={sellsukiBrand}
          breadcrumbs={[{ label: "Dashboard" }]}
          user={{ name: "John Doe" }}
          onSidebarToggle={() => setCollapsed((c) => !c)}
        />
        <div style={{ display: "flex", height: "calc(100% - 72px)" }}>
          <Sidebar
            groups={groups}
            activeItem={active}
            onNavigate={(item) => setActive(item.id)}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            showCollapseToggle={false}
          />
          <main style={{ flex: 1, padding: 24, background: "var(--background)", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted-foreground)" }}>
            Burger ☰ in navbar toggles sidebar. Hover icons when collapsed to see DS Tooltip.
          </main>
        </div>
      </div>
    );
  },
};
