import type { Meta, StoryObj } from "@storybook/react";
import { DSCheckbox, CheckboxGroup } from "./ds-checkbox";

const meta: Meta<typeof DSCheckbox> = {
  title: "Components/Checkbox",
  component: DSCheckbox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof DSCheckbox>;

export const Default: Story = { args: { label: "Accept terms and conditions" } };
export const Checked: Story = { args: { label: "Checked", checked: true } };
export const Indeterminate: Story = { args: { label: "Indeterminate", indeterminate: true } };
export const WithDescription: Story = { args: { label: "Marketing emails", description: "Receive updates about new features" } };
export const Disabled: Story = { args: { label: "Disabled", disabled: true } };
export const WithError: Story = { args: { label: "Required field", error: "This field is required" } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "start" }}>
      <DSCheckbox size="sm" label="Small" />
      <DSCheckbox size="md" label="Medium" />
      <DSCheckbox size="lg" label="Large" />
    </div>
  ),
};

export const GroupVertical: Story = {
  render: () => (
    <CheckboxGroup label="Select options" direction="vertical">
      <DSCheckbox label="Option A" />
      <DSCheckbox label="Option B" />
      <DSCheckbox label="Option C" />
    </CheckboxGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup label="Select options" direction="horizontal">
      <DSCheckbox label="Option A" />
      <DSCheckbox label="Option B" />
      <DSCheckbox label="Option C" />
    </CheckboxGroup>
  ),
};
