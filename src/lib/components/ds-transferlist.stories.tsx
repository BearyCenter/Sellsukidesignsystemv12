import type { Meta, StoryObj } from "@storybook/react";
import { TransferList } from "./ds-transferlist";

const meta: Meta<typeof TransferList> = {
  title: "Components/TransferList",
  component: TransferList,
  tags: ["autodocs"],
  argTypes: {
    searchable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof TransferList>;

const items = [
  { id: "1", label: "JavaScript" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "Python" },
  { id: "4", label: "Go" },
  { id: "5", label: "Rust" },
  { id: "6", label: "Java" },
  { id: "7", label: "C#" },
];

export const Default: Story = {
  args: {
    items,
    sourceTitle: "Available",
    targetTitle: "Selected",
  },
};

export const WithSearch: Story = {
  args: {
    items,
    searchable: true,
    sourceTitle: "All Languages",
    targetTitle: "My Languages",
  },
};

export const PreSelected: Story = {
  args: {
    items,
    defaultTarget: ["1", "2"],
    sourceTitle: "Available",
    targetTitle: "Selected",
  },
};
