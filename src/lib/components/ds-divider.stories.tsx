import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./ds-divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    spacing: { control: "select", options: ["sm", "md", "lg"] },
    dashed: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: { label: "OR" },
};

export const Dashed: Story = {
  args: { dashed: true },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 40, gap: 8 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
