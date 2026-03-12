import type { Meta, StoryObj } from "@storybook/react";
import { Notification, NotificationCenter } from "./ds-notification";

const meta: Meta<typeof Notification> = {
  title: "Components/Notification",
  component: Notification,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["info", "success", "warning", "error"] },
    closable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    type: "info",
    title: "New update available",
    message: "A new version of the application is ready to install.",
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Notification type="info" title="Information" message="This is an informational notification." />
      <Notification type="success" title="Success" message="Your changes have been saved." />
      <Notification type="warning" title="Warning" message="Your subscription is about to expire." />
      <Notification type="error" title="Error" message="Failed to process your request." />
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    type: "success",
    title: "Order shipped",
    message: "Your order #1234 has been shipped.",
    action: { label: "Track Order", onClick: () => {} },
    time: "2m ago",
  },
};

export const CenterExample: Story = {
  render: () => (
    <NotificationCenter
      items={[
        { id: "1", type: "info", title: "Welcome", message: "Thanks for joining!", time: "1h ago", read: false },
        { id: "2", type: "success", title: "Payment received", message: "Invoice #42 paid.", time: "3h ago", read: false },
        { id: "3", type: "warning", title: "Low stock", message: "Product A is running low.", time: "1d ago", read: true },
      ]}
    />
  ),
};
