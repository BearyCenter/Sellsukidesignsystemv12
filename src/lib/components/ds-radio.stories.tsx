import type { Meta, StoryObj } from "@storybook/react";
import { DSRadio, RadioGroup } from "./ds-radio";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    direction: { control: "select", options: ["horizontal", "vertical"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup name="demo" defaultValue="a" label="Choose one">
      <DSRadio value="a" label="Option A" />
      <DSRadio value="b" label="Option B" />
      <DSRadio value="c" label="Option C" />
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="starter">
      <DSRadio value="starter" label="Starter" description="Best for small teams" />
      <DSRadio value="pro" label="Pro" description="For growing businesses" />
      <DSRadio value="enterprise" label="Enterprise" description="Custom solutions" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup name="disabled" defaultValue="a" disabled>
      <DSRadio value="a" label="Option A" />
      <DSRadio value="b" label="Option B" />
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32 }}>
      <RadioGroup name="sm" size="sm" defaultValue="a" label="Small">
        <DSRadio value="a" label="A" />
        <DSRadio value="b" label="B" />
      </RadioGroup>
      <RadioGroup name="md" size="md" defaultValue="a" label="Medium">
        <DSRadio value="a" label="A" />
        <DSRadio value="b" label="B" />
      </RadioGroup>
      <RadioGroup name="lg" size="lg" defaultValue="a" label="Large">
        <DSRadio value="a" label="A" />
        <DSRadio value="b" label="B" />
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup name="horizontal" direction="horizontal" defaultValue="a" label="Direction">
      <DSRadio value="a" label="Option A" />
      <DSRadio value="b" label="Option B" />
      <DSRadio value="c" label="Option C" />
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup name="error" error="Please select an option" label="Required">
      <DSRadio value="a" label="Option A" />
      <DSRadio value="b" label="Option B" />
    </RadioGroup>
  ),
};
