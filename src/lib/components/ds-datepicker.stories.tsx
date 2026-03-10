import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./ds-datepicker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "select", options: ["single", "range"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outlined", "filled", "ghost"] },
    state: { control: "select", options: ["default", "error", "success"] },
    clearable: { control: "boolean" },
    showTime: { control: "boolean" },
    showToday: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = { args: { label: "Select date", placeholder: "Pick a date..." } };

export const WithLabel: Story = { args: { label: "Start Date", required: true, clearable: true } };

export const RangeMode: Story = {
  args: { mode: "range", label: "Date Range", placeholder: "Select range..." },
};

export const WithTime: Story = { args: { label: "Date & Time", showTime: true } };

export const WithError: Story = {
  args: { label: "Due Date", state: "error" as const, errorMessage: "Date is required" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
      <DatePicker size="sm" label="Small" />
      <DatePicker size="md" label="Medium" />
      <DatePicker size="lg" label="Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
      <DatePicker variant="default" label="Default" />
      <DatePicker variant="outlined" label="Outlined" />
      <DatePicker variant="filled" label="Filled" />
      <DatePicker variant="ghost" label="Ghost" />
    </div>
  ),
};
