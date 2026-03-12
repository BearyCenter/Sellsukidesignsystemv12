import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./ds-dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outlined", "filled", "ghost"] },
    searchable: { control: "boolean" },
    clearable: { control: "boolean" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

export const Default: Story = {
  args: {
    options,
    placeholder: "Select a framework",
  },
};

export const Searchable: Story = {
  args: {
    options,
    placeholder: "Search frameworks...",
    searchable: true,
    clearable: true,
  },
};

export const Multiple: Story = {
  args: {
    options,
    placeholder: "Select frameworks",
    multiple: true,
    showSelectAll: true,
  },
};

export const WithLabel: Story = {
  args: {
    options,
    label: "Framework",
    helperText: "Choose your preferred framework",
    required: true,
    placeholder: "Select...",
  },
};
