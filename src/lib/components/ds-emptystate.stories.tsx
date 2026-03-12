import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./ds-emptystate";
import { Inbox, Plus, Search } from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <Inbox size={24} />,
    title: "No items found",
    description: "There are no items to display at this time.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <Plus size={24} />,
    title: "No products yet",
    description: "Start by adding your first product to the catalog.",
    action: { label: "Add Product", onClick: () => {}, icon: <Plus size={14} /> },
    secondaryAction: { label: "Import", onClick: () => {} },
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: <Search size={24} />,
    title: "No results found",
    description: "Try adjusting your search or filter criteria.",
    size: "sm",
  },
};
