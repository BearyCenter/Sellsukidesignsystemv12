import type { Meta, StoryObj } from "@storybook/react";
import { Statistic, StatCard } from "./ds-statistic";
import { DollarSign, Users, ShoppingCart } from "lucide-react";

const meta: Meta<typeof Statistic> = {
  title: "Components/Statistic",
  component: Statistic,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Statistic>;

export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: 45231,
    prefix: "$",
    trend: { value: 12.5, direction: "up" },
    trendLabel: "vs last month",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32 }}>
      <Statistic title="Small" value={1234} size="sm" />
      <Statistic title="Medium" value={5678} size="md" />
      <Statistic title="Large" value={9012} size="lg" />
    </div>
  ),
};

export const WithTrends: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32 }}>
      <Statistic title="Revenue" value="$12,345" trend={{ value: 8.2, direction: "up" }} trendLabel="vs last month" />
      <Statistic title="Refunds" value="$432" trend={{ value: 3.1, direction: "down" }} trendLabel="vs last month" />
      <Statistic title="Orders" value={156} trend={{ value: 0, direction: "neutral" }} trendLabel="no change" />
    </div>
  ),
};

export const StatCardExample: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 800 }}>
      <StatCard
        title="Revenue"
        value="$45,231"
        icon={<DollarSign size={20} />}
        trend={{ value: 12.5, direction: "up" }}
        trendLabel="vs last month"
      />
      <StatCard
        title="Customers"
        value={2350}
        icon={<Users size={20} />}
        trend={{ value: 5.2, direction: "up" }}
        trendLabel="vs last month"
      />
      <StatCard
        title="Orders"
        value={1280}
        icon={<ShoppingCart size={20} />}
        trend={{ value: 1.8, direction: "down" }}
        trendLabel="vs last month"
      />
    </div>
  ),
};
