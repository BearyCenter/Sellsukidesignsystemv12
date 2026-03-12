import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./ds-tag";
import { Star } from "lucide-react";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "select", options: ["default", "primary", "success", "warning", "destructive", "info"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    closable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { children: "Tag" },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag color="default">Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="destructive">Destructive</Tag>
      <Tag color="info">Info</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

export const Closable: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Tag closable onClose={() => {}} color="primary">React</Tag>
      <Tag closable onClose={() => {}} color="success">Vue</Tag>
      <Tag closable onClose={() => {}} color="warning">Angular</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tag icon={<Star size={12} />} color="warning">Featured</Tag>
  ),
};
