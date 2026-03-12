import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./ds-menu";
import { useState, useRef } from "react";
import { Copy, Trash2, Edit, Share } from "lucide-react";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} onClick={() => setOpen(!open)}>
          Open Menu
        </button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          triggerRef={ref}
          items={[
            { text: "Edit", icon: <Edit size={14} />, onClick: () => setOpen(false) },
            { text: "Copy", icon: <Copy size={14} />, shortcut: "Ctrl+C", onClick: () => setOpen(false) },
            { text: "Share", icon: <Share size={14} />, onClick: () => setOpen(false) },
            { divider: true },
            { text: "Delete", icon: <Trash2 size={14} />, destructive: true, onClick: () => setOpen(false) },
          ]}
        />
      </>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} onClick={() => setOpen(!open)}>
          Open Menu
        </button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          triggerRef={ref}
          items={[
            { label: "Actions" },
            { text: "Edit", onClick: () => setOpen(false) },
            { text: "Duplicate", onClick: () => setOpen(false) },
            { divider: true },
            { label: "Danger Zone" },
            { text: "Delete", destructive: true, onClick: () => setOpen(false) },
          ]}
        />
      </>
    );
  },
};

export const WithSubmenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <>
        <button ref={ref} onClick={() => setOpen(!open)}>
          Open Menu
        </button>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          triggerRef={ref}
          items={[
            { text: "New File", onClick: () => setOpen(false) },
            {
              text: "Export As",
              children: [
                { text: "PDF", onClick: () => setOpen(false) },
                { text: "PNG", onClick: () => setOpen(false) },
                { text: "SVG", onClick: () => setOpen(false) },
              ],
            },
            { divider: true },
            { text: "Settings", onClick: () => setOpen(false) },
          ]}
        />
      </>
    );
  },
};
