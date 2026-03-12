import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./ds-sidebar";
import { useState } from "react";
import { Home, Package, ShoppingCart, Settings, Users } from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

const groups = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Dashboard", icon: <Home size={16} /> },
      { id: "products", label: "Products", icon: <Package size={16} />, badge: "12" },
      { id: "orders", label: "Orders", icon: <ShoppingCart size={16} />, badge: "3" },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "customers", label: "Customers", icon: <Users size={16} /> },
      { id: "settings", label: "Settings", icon: <Settings size={16} /> },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ height: 500 }}>
      <Sidebar
        brand={{ name: "Sellsuki" }}
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
        brand={{ name: "Sellsuki" }}
        groups={groups}
        activeItem="home"
        collapsed
      />
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState("home");
    return (
      <div style={{ height: 500 }}>
        <Sidebar
          brand={{ name: "Sellsuki" }}
          groups={groups}
          activeItem={active}
          onNavigate={(item) => setActive(item.id)}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>
    );
  },
};
