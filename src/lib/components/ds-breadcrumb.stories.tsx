import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./ds-breadcrumb";
import { Home } from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    separator: { control: "select", options: ["chevron", "slash", "dot"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Laptops" },
];

export const Default: Story = {
  args: { items },
};

export const AllSeparators: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Breadcrumb items={items} separator="chevron" />
      <Breadcrumb items={items} separator="slash" />
      <Breadcrumb items={items} separator="dot" />
    </div>
  ),
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Category", href: "/cat" },
      { label: "Sub Category", href: "/cat/sub" },
      { label: "Products", href: "/products" },
      { label: "Detail" },
    ],
    maxItems: 3,
  },
};

export const WithIcon: Story = {
  args: {
    items: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};
