import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "./ds-filterbar";

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Food & Beverage", value: "food" },
  { label: "Home & Garden", value: "home" },
];

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
  { label: "Viewer", value: "viewer" },
];

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    showSearch: { control: "boolean" },
    searchPlaceholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

export const SearchOnly: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search products...",
    filters: [],
  },
};

export const FiltersOnly: Story = {
  args: {
    showSearch: false,
    filters: [
      { key: "status", label: "Status", type: "single", options: STATUS_OPTIONS },
      { key: "category", label: "Category", type: "multi", options: CATEGORY_OPTIONS },
    ],
  },
};

export const SearchWithFilters: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search orders...",
    filters: [
      { key: "status", label: "Status", type: "single", options: STATUS_OPTIONS },
      { key: "category", label: "Category", type: "multi", options: CATEGORY_OPTIONS },
    ],
  },
};

export const AdminPanel: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search users by name or email...",
    filters: [
      { key: "role", label: "Role", type: "multi", options: ROLE_OPTIONS },
      { key: "status", label: "Status", type: "single", options: STATUS_OPTIONS },
    ],
  },
};

export const ManyFilters: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search...",
    filters: [
      { key: "status", label: "Status", type: "single", options: STATUS_OPTIONS },
      { key: "category", label: "Category", type: "multi", options: CATEGORY_OPTIONS },
      { key: "role", label: "Role", type: "multi", options: ROLE_OPTIONS },
    ],
  },
};
