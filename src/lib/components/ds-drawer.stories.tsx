import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./ds-drawer";
import { useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    side: { control: "select", options: ["left", "right", "top", "bottom"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Drawer Title">
          <p>Drawer content goes here.</p>
        </Drawer>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Left Drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Left Drawer" side="left">
          <p>This drawer slides in from the left.</p>
        </Drawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open Drawer with Footer</button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Settings"
          footer={
            <>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)}>Save</button>
            </>
          }
        >
          <p>Edit your settings here.</p>
        </Drawer>
      </>
    );
  },
};
