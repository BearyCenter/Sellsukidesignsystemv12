import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./ds-timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "alternate", "compact"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

const items = [
  { title: "Order placed", description: "Your order has been confirmed.", time: "10:00 AM", status: "completed" as const },
  { title: "Payment received", description: "Payment processed successfully.", time: "10:15 AM", status: "completed" as const },
  { title: "Shipping", description: "Package is being prepared.", time: "11:00 AM", status: "current" as const },
  { title: "Delivered", description: "Estimated delivery tomorrow.", status: "pending" as const },
];

export const Default: Story = {
  args: { items },
};

export const Alternate: Story = {
  args: { items, variant: "alternate" },
};

export const Compact: Story = {
  args: { items, variant: "compact" },
};

export const WithError: Story = {
  args: {
    items: [
      { title: "Started", status: "completed" as const, time: "9:00 AM" },
      { title: "Processing", status: "completed" as const, time: "9:30 AM" },
      { title: "Failed", description: "An error occurred during processing.", status: "error" as const, time: "10:00 AM" },
    ],
  },
};
