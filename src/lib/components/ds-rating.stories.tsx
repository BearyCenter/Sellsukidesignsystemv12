import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./ds-rating";
import { useState } from "react";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    icon: { control: "select", options: ["star", "heart", "thumb"] },
    max: { control: { type: "number", min: 1, max: 10 } },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState(3);
    return <Rating value={val} onChange={setVal} showValue />;
  },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Rating value={4} icon="star" label="Stars" readOnly />
      <Rating value={3} icon="heart" label="Hearts" readOnly />
      <Rating value={2} icon="thumb" label="Thumbs" readOnly />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Rating value={3} size="sm" showValue readOnly />
      <Rating value={3} size="md" showValue readOnly />
      <Rating value={3} size="lg" showValue readOnly />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
    showValue: true,
    label: "Average Rating",
  },
};
