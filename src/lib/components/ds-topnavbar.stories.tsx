import type { Meta, StoryObj } from "@storybook/react";
import { TopNavbar } from "./ds-topnavbar";

const meta: Meta<typeof TopNavbar> = {
  title: "Components/TopNavbar",
  component: TopNavbar,
  tags: ["autodocs"],
  argTypes: {
    showSearch: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof TopNavbar>;

export const Default: Story = {
  args: {
    brand: { name: "Sellsuki" },
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

export const WithMobileMenu: Story = {
  args: {
    brand: { name: "Sellsuki" },
    breadcrumbs: [
      { label: "Dashboard", href: "/" },
      { label: "Orders" },
    ],
    user: { name: "Jane Smith" },
    showSearch: true,
    onMobileMenuClick: () => {},
    onNotificationClick: () => {},
    notificationCount: 5,
  },
};
