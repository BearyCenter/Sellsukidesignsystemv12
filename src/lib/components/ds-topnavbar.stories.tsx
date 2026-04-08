import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TopNavbar } from "./ds-topnavbar";
import { Sidebar } from "./ds-sidebar";
import { Home, Package, ShoppingCart, Users, Settings } from "lucide-react";
import SellsukiFull from "../../imports/SellsukiFull";

const sellsukiBrand = { name: "Sellsuki", logoFull: <SellsukiFull height={40} /> };

const meta: Meta<typeof TopNavbar> = {
  title: "Components/TopNavbar",
  component: TopNavbar,
  tags: ["autodocs"],
  argTypes: {
    showSearch: { control: "boolean" },
    notificationCount: { control: "number" },
    height: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof TopNavbar>;

export const Default: Story = {
  args: {
    brand: sellsukiBrand,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Products" },
    ],
    user: { name: "John Doe" },
    showSearch: true,
    onNotificationClick: () => {},
    notificationCount: 3,
  },
};

export const Minimal: Story = {
  args: {
    brand: { name: "App" },
    user: { name: "Admin" },
  },
};

export const WithSidebarToggle: Story = {
  args: {
    brand: sellsukiBrand,
    breadcrumbs: [{ label: "Dashboard" }, { label: "Orders" }],
    user: { name: "Watcharapong C." },
    showSearch: true,
    notificationCount: 5,
    onNotificationClick: () => {},
    onSidebarToggle: () => alert("Sidebar toggled"),
  },
};

/** Full interactive layout — TopNavbar burger controls Sidebar collapse */
export const WithCollapsibleSidebar: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("dashboard");
    const groups = [
      {
        label: "Main",
        items: [
          { id: "dashboard", label: "Dashboard", icon: <Home size={16} /> },
          { id: "orders",    label: "Orders",    icon: <ShoppingCart size={16} />, badge: "12" },
          { id: "products",  label: "Products",  icon: <Package size={16} /> },
          { id: "customers", label: "Customers", icon: <Users size={16} /> },
          { id: "settings",  label: "Settings",  icon: <Settings size={16} /> },
        ],
      },
    ];
    return (
      <div style={{ border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden", height: 480 }}>
        <TopNavbar
          brand={{ name: "Sellsuki" }}
          breadcrumbs={[{ label: "Dashboard" }]}
          user={{ name: "John Doe" }}
          showSearch
          notificationCount={3}
          onNotificationClick={() => {}}
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
          <main style={{ flex: 1, padding: 24, background: "var(--background)", fontFamily: "var(--font-body)" }}>
            <p style={{ color: "var(--muted-foreground)", fontSize: 14 }}>
              Click the <strong>☰ burger</strong> in the navbar to collapse/expand the sidebar.
            </p>
          </main>
        </div>
      </div>
    );
  },
};
