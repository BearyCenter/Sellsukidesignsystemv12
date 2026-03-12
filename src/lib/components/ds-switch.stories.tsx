import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./ds-switch";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["primary", "success", "warning", "destructive"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} label="Enable notifications" />;
  },
};

export const AllSizes: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Switch checked={a} onChange={setA} size="sm" label="Small" />
        <Switch checked={b} onChange={setB} size="md" label="Medium" />
        <Switch checked={c} onChange={setC} size="lg" label="Large" />
      </div>
    );
  },
};

export const AllColors: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    const [d, setD] = useState(true);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Switch checked={a} onChange={setA} color="primary" label="Primary" />
        <Switch checked={b} onChange={setB} color="success" label="Success" />
        <Switch checked={c} onChange={setC} color="warning" label="Warning" />
        <Switch checked={d} onChange={setD} color="destructive" label="Destructive" />
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        checked={checked}
        onChange={setChecked}
        label="Marketing emails"
        description="Receive emails about new products and promotions."
      />
    );
  },
};
