import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonList } from "./ds-skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["text", "rectangular", "circular", "rounded"] },
    animate: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
    variant: "rectangular",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
      <Skeleton variant="text" width="80%" height={16} />
      <Skeleton variant="rectangular" width="100%" height={40} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rounded" width="100%" height={40} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => <SkeletonCard />,
};

export const TableSkeleton: Story = {
  render: () => <SkeletonTable />,
};

export const ListSkeleton: Story = {
  render: () => <SkeletonList />,
};
