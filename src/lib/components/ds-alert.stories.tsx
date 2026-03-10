import type { Meta, StoryObj } from "@storybook/react";
import { Alert, ToastContainer, toast } from "./ds-alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
    dismissible: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = { args: { variant: "info", title: "Information", children: "This is an informational message." } };
export const Success: Story = { args: { variant: "success", title: "Success", children: "Operation completed successfully." } };
export const Warning: Story = { args: { variant: "warning", title: "Warning", children: "Please review your changes." } };
export const Error: Story = { args: { variant: "error", title: "Error", children: "Something went wrong." } };
export const Dismissible: Story = { args: { variant: "info", title: "Dismissible", children: "Click X to dismiss.", dismissible: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert variant="info" title="Info">Informational message.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Review your changes.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
    </div>
  ),
};

export const ToastDemo: Story = {
  render: () => (
    <div>
      <ToastContainer />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => toast.info("Info toast")} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" }}>Info</button>
        <button onClick={() => toast.success("Saved!")} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" }}>Success</button>
        <button onClick={() => toast.warning("Check input")} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" }}>Warning</button>
        <button onClick={() => toast.error("Failed")} style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer" }}>Error</button>
      </div>
    </div>
  ),
};
