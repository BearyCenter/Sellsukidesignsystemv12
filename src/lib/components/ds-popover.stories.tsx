import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./ds-popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 80, display: "flex", justifyContent: "center" }}>
      <Popover trigger={<button>Click me</button>} title="Popover Title">
        <p>This is the popover content.</p>
      </Popover>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ padding: 120, display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Popover key={p} trigger={<button>{p}</button>} placement={p} title={`${p} popover`}>
          <p>Placed on {p}</p>
        </Popover>
      ))}
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <div style={{ padding: 80, display: "flex", justifyContent: "center" }}>
      <Popover trigger={<button>Info</button>}>
        <p>Simple popover without a title bar.</p>
      </Popover>
    </div>
  ),
};
