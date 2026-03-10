import type { Meta, StoryObj } from "@storybook/react";
import { DSButton, IconButton, ButtonGroup } from "./ds-button";
import { Plus, ArrowRight, Trash2, Settings } from "lucide-react";

const meta: Meta<typeof DSButton> = {
  title: "Components/Button",
  component: DSButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    active: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof DSButton>;

export const Primary: Story = { args: { children: "Button", variant: "primary", size: "md" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <DSButton variant="primary">Primary</DSButton>
      <DSButton variant="secondary">Secondary</DSButton>
      <DSButton variant="outline">Outline</DSButton>
      <DSButton variant="ghost">Ghost</DSButton>
      <DSButton variant="destructive">Destructive</DSButton>
      <DSButton variant="link">Link</DSButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <DSButton size="sm">Small</DSButton>
      <DSButton size="md">Medium</DSButton>
      <DSButton size="lg">Large</DSButton>
      <DSButton size="xl">Extra Large</DSButton>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <DSButton leftIcon={<Plus size={16} />}>Add Item</DSButton>
      <DSButton rightIcon={<ArrowRight size={16} />}>Next</DSButton>
      <DSButton variant="destructive" leftIcon={<Trash2 size={16} />}>Delete</DSButton>
    </div>
  ),
};

export const Loading: Story = { args: { loading: true, loadingText: "Saving..." } };

export const IconButtonExample: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <IconButton icon={<Plus size={16} />} aria-label="Add" />
      <IconButton icon={<Settings size={16} />} aria-label="Settings" variant="outline" />
      <IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" />
    </div>
  ),
};

export const ButtonGroupExample: Story = {
  render: () => (
    <ButtonGroup>
      <DSButton variant="outline">Left</DSButton>
      <DSButton variant="outline">Center</DSButton>
      <DSButton variant="outline">Right</DSButton>
    </ButtonGroup>
  ),
};
