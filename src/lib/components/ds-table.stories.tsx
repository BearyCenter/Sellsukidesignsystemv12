import type { Meta, StoryObj } from "@storybook/react";
import { DSTable } from "./ds-table";
import type { TableColumn } from "./ds-table";

interface Product { id: number; name: string; price: number; status: string; category: string }

const sampleData: Product[] = [
  { id: 1, name: "Product A", price: 100, status: "Active", category: "Electronics" },
  { id: 2, name: "Product B", price: 250, status: "Draft", category: "Clothing" },
  { id: 3, name: "Product C", price: 75, status: "Active", category: "Food" },
  { id: 4, name: "Product D", price: 320, status: "Inactive", category: "Electronics" },
  { id: 5, name: "Product E", price: 150, status: "Active", category: "Clothing" },
];

const columns: TableColumn<Product>[] = [
  { key: "id", header: "ID", width: "60px", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "price", header: "Price", sortable: true, align: "right", render: (v) => `$${v}` },
  { key: "status", header: "Status" },
  { key: "category", header: "Category" },
];

const meta: Meta<typeof DSTable> = {
  title: "Components/Table",
  component: DSTable,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    striped: { control: "boolean" },
    hoverable: { control: "boolean" },
    bordered: { control: "boolean" },
    selectable: { control: "boolean" },
    loading: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof DSTable>;

export const Default: Story = { args: { columns, data: sampleData } };
export const Striped: Story = { args: { columns, data: sampleData, striped: true } };
export const Selectable: Story = { args: { columns, data: sampleData, selectable: true } };
export const Sortable: Story = { args: { columns, data: sampleData } };
export const Loading: Story = { args: { columns, data: [], loading: true } };
export const Empty: Story = { args: { columns, data: [], emptyMessage: "No products found" } };
export const Bordered: Story = { args: { columns, data: sampleData, bordered: true } };
