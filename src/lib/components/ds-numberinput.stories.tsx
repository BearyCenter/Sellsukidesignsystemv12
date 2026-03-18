import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./ds-numberinput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: { defaultValue: 1, min: 0, max: 100 },
};

export const WithLabel: Story = {
  args: { label: "Quantity", defaultValue: 1, min: 1, max: 99 },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <NumberInput label="Small" size="sm" defaultValue={5} />
      <NumberInput label="Medium" size="md" defaultValue={10} />
      <NumberInput label="Large" size="lg" defaultValue={15} />
    </div>
  ),
};

export const WithStep: Story = {
  args: { label: "Price", defaultValue: 0, step: 0.5, min: 0, max: 100 },
};

export const WithError: Story = {
  args: { label: "Amount", defaultValue: 0, error: "Amount must be greater than 0" },
};
