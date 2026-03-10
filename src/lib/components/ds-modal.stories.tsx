import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ConfirmDialog } from "./ds-modal";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", background: "#32A9FF", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Open Modal</button>
        <Modal open={open} onClose={() => setOpen(false)} title="Modal Title" description="This is a modal description.">
          <p>Modal content goes here.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", background: "#32A9FF", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Open Modal</button>
        <Modal open={open} onClose={() => setOpen(false)} title="Confirm Action" footer={
          <>
            <button onClick={() => setOpen(false)} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
            <button onClick={() => setOpen(false)} style={{ padding: "8px 16px", background: "#32A9FF", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Save</button>
          </>
        }>
          <p>Are you sure you want to save these changes?</p>
        </Modal>
      </>
    );
  },
};

export const ConfirmDialogDefault: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", background: "#32A9FF", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Confirm</button>
        <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => alert("Confirmed!")} />
      </>
    );
  },
};

export const ConfirmDialogDestructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ padding: "8px 16px", background: "#E11D48", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>Delete</button>
        <ConfirmDialog open={open} onClose={() => setOpen(false)} onConfirm={() => alert("Deleted!")} title="Delete Item" description="This action cannot be undone." variant="destructive" confirmLabel="Delete" />
      </>
    );
  },
};
