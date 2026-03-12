import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./ds-spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: "md" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    size: "lg",
    color: "#ef4444",
  },
};
