import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "./ds-search";
import { Package } from "lucide-react";

const meta: Meta<typeof SearchField> = {
  title: "Components/Search",
  component: SearchField,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outlined", "filled"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = { args: { placeholder: "Search..." } };

export const WithSuggestions: Story = {
  args: {
    placeholder: "Search products...",
    suggestions: [
      { id: "1", label: "Product A", description: "Electronics" },
      { id: "2", label: "Product B", description: "Clothing" },
      { id: "3", label: "Product C", description: "Food" },
    ],
    value: "Product",
  },
};

export const Loading: Story = { args: { loading: true, placeholder: "Searching..." } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <SearchField variant="default" placeholder="Default" />
      <SearchField variant="outlined" placeholder="Outlined" />
      <SearchField variant="filled" placeholder="Filled" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <SearchField size="sm" placeholder="Small" />
      <SearchField size="md" placeholder="Medium" />
      <SearchField size="lg" placeholder="Large" />
    </div>
  ),
};
