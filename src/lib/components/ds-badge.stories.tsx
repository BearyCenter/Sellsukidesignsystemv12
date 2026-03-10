import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./ds-badge";
import { Star } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "outline", "destructive", "success", "warning"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    dot: { control: "boolean" },
    removable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Badge" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge dot variant="success">Active</Badge>
      <Badge dot variant="destructive">Offline</Badge>
      <Badge dot variant="warning">Pending</Badge>
    </div>
  ),
};

export const Removable: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge removable onRemove={() => {}}>Tag 1</Badge>
      <Badge removable onRemove={() => {}} variant="secondary">Tag 2</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => <Badge icon={<Star size={12} />} variant="warning">Featured</Badge>,
};
