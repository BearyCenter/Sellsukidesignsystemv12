import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./ds-pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outlined", "filled", "minimal"] },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const WithPageSize: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} showPageSize pageSize={size} onPageSizeChange={setSize} />;
  },
};

export const WithItemsInfo: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} showItemsInfo totalItems={100} pageSize={10} showPageInfo />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} variant="default" />
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} variant="outlined" />
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} variant="filled" />
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} variant="minimal" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} size="sm" />
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} size="md" />
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} size="lg" />
    </div>
  ),
};

export const ShowFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} showFirstLast />;
  },
};
