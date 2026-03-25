import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./ds-pageheader";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    sticky: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Order Management",
    subtitle: "Manage and track all customer orders",
  },
};

export const WithBreadcrumb: Story = {
  args: {
    title: "Create Campaign",
    subtitle: "Set up a new marketing campaign",
    breadcrumb: (
      <nav style={{ fontSize: 13, color: "#6b7280", fontFamily: "var(--font-label)" }}>
        <span>Dashboard</span>
        <span style={{ margin: "0 6px" }}>/</span>
        <span>Marketing</span>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "#1f2937", fontWeight: 500 }}>Create Campaign</span>
      </nav>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: "Products",
    subtitle: "Manage your product catalog",
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <button
          style={{
            height: 36, padding: "0 16px", borderRadius: 8,
            border: "1px solid #e5e7eb", background: "#fff",
            fontFamily: "var(--font-button)", fontSize: 14, fontWeight: 600,
            cursor: "pointer", color: "#1f2937",
          }}
        >
          Export
        </button>
        <button
          style={{
            height: 36, padding: "0 16px", borderRadius: 8,
            border: "none", background: "#32a9ff",
            fontFamily: "var(--font-button)", fontSize: 14, fontWeight: 600,
            cursor: "pointer", color: "#fff",
          }}
        >
          + Add Product
        </button>
      </div>
    ),
  },
};

export const WithTabs: Story = {
  args: {
    title: "Orders",
    actions: (
      <button
        style={{
          height: 36, padding: "0 16px", borderRadius: 8,
          border: "none", background: "#32a9ff",
          fontFamily: "var(--font-button)", fontSize: 14, fontWeight: 600,
          cursor: "pointer", color: "#fff",
        }}
      >
        Export
      </button>
    ),
    tabs: (
      <div style={{ display: "flex", gap: 0, borderBottom: "none" }}>
        {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((t, i) => (
          <button
            key={t}
            style={{
              padding: "8px 16px", border: "none", background: "none",
              fontFamily: "var(--font-button)", fontSize: 14, cursor: "pointer",
              borderBottom: i === 0 ? "2px solid #32a9ff" : "2px solid transparent",
              color: i === 0 ? "#32a9ff" : "#6b7280", fontWeight: i === 0 ? 600 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>
    ),
  },
};

export const FullFeature: Story = {
  args: {
    title: "Campaign Management",
    subtitle: "Create and manage marketing campaigns",
    sticky: false,
    breadcrumb: (
      <nav style={{ fontSize: 13, color: "#6b7280", fontFamily: "var(--font-button)" }}>
        <span>Dashboard</span>
        <span style={{ margin: "0 6px" }}>/</span>
        <span style={{ color: "#1f2937" }}>Campaign</span>
      </nav>
    ),
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ height: 36, padding: "0 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontFamily: "var(--font-button)", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#1f2937" }}>
          Import
        </button>
        <button style={{ height: 36, padding: "0 16px", borderRadius: 8, border: "none", background: "#32a9ff", fontFamily: "var(--font-button)", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#fff" }}>
          + New Campaign
        </button>
      </div>
    ),
    tabs: (
      <div style={{ display: "flex" }}>
        {["All Campaigns", "Active", "Scheduled", "Completed"].map((t, i) => (
          <button key={t} style={{ padding: "8px 16px", border: "none", background: "none", fontFamily: "var(--font-button)", fontSize: 14, cursor: "pointer", borderBottom: i === 0 ? "2px solid #32a9ff" : "2px solid transparent", color: i === 0 ? "#32a9ff" : "#6b7280", fontWeight: i === 0 ? 600 : 400 }}>
            {t}
          </button>
        ))}
      </div>
    ),
  },
};
