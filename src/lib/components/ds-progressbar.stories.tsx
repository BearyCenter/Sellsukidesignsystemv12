import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ds-progressbar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
    showValue: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 60,
    label: "Progress",
    showValue: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <ProgressBar value={40} size="sm" label="Small" showValue />
      <ProgressBar value={60} size="md" label="Medium" showValue />
      <ProgressBar value={80} size="lg" label="Large" showValue />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: "Loading...",
  },
};

export const CustomColor: Story = {
  args: {
    value: 75,
    color: "#22c55e",
    label: "Upload Progress",
    showValue: true,
  },
};
