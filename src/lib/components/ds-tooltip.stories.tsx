import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./ds-tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 60, display: "flex", justifyContent: "center" }}>
      <Tooltip content="This is a tooltip">
        <button>Hover me</button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ padding: 80, display: "flex", gap: 32, justifyContent: "center" }}>
      <Tooltip content="Top tooltip" placement="top">
        <button>Top</button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <button>Bottom</button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <button>Left</button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <button>Right</button>
      </Tooltip>
    </div>
  ),
};
