import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./ds-stepper";
import { useState } from "react";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { title: "Account", description: "Create your account" },
  { title: "Profile", description: "Set up your profile" },
  { title: "Review", description: "Review and submit" },
];

export const Default: Story = {
  args: {
    steps,
    current: 1,
  },
};

export const Vertical: Story = {
  args: {
    steps,
    current: 1,
    orientation: "vertical",
  },
};

export const Interactive: Story = {
  render: () => {
    const [current, setCurrent] = useState(0);
    return (
      <div style={{ maxWidth: 600 }}>
        <Stepper steps={steps} current={current} onStepClick={setCurrent} />
        <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
          <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
            Back
          </button>
          <button onClick={() => setCurrent(Math.min(steps.length - 1, current + 1))} disabled={current === steps.length - 1}>
            Next
          </button>
        </div>
      </div>
    );
  },
};
