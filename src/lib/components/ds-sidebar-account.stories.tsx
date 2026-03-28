import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidebarAccountSwitcher } from "./ds-sidebar-account";
import type { SidebarAccountItem } from "./ds-sidebar-account";

const COMPANIES: SidebarAccountItem[] = [
  { id: "1", name: "Sellsuki Company", handle: "@sellsuki", avatarFallback: "S" },
  { id: "2", name: "Baby & Mom", handle: "@babymom", avatarFallback: "B" },
  { id: "3", name: "Multy's Shop", handle: "@multy", avatarFallback: "M" },
];

const BRANCHES: SidebarAccountItem[] = [
  { id: "b1", name: "สาขา รัชดาภิเษก" },
  { id: "b2", name: "สาขา สีลม" },
];

const meta: Meta<typeof SidebarAccountSwitcher> = {
  title: "Components/SidebarAccountSwitcher",
  component: SidebarAccountSwitcher,
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
  },
};
export default meta;
type Story = StoryObj<typeof SidebarAccountSwitcher>;

export const Default: Story = {
  render: () => {
    const [company, setCompany] = useState(COMPANIES[0]);
    return (
      <div style={{ width: 280 }}>
        <SidebarAccountSwitcher
          company={company}
          branch={BRANCHES[0]}
          companies={COMPANIES}
          onCompanyChange={setCompany}
        />
      </div>
    );
  },
};

export const CompanyOnly: Story = {
  render: () => {
    const [company, setCompany] = useState(COMPANIES[0]);
    return (
      <div style={{ width: 280 }}>
        <SidebarAccountSwitcher
          company={company}
          companies={COMPANIES}
          onCompanyChange={setCompany}
        />
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SidebarAccountSwitcher company={COMPANIES[0]} companies={COMPANIES} collapsed />
      <SidebarAccountSwitcher company={COMPANIES[1]} companies={COMPANIES} collapsed />
      <SidebarAccountSwitcher company={COMPANIES[2]} companies={COMPANIES} collapsed />
    </div>
  ),
};

export const NoAccount: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <SidebarAccountSwitcher companies={COMPANIES} />
    </div>
  ),
};

export const InSidebarContext: Story = {
  render: () => {
    const [company, setCompany] = useState(COMPANIES[0]);
    return (
      <div
        style={{
          width: 280,
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: 12, borderBottom: "1px solid var(--border)" }}>
          <SidebarAccountSwitcher
            company={company}
            branch={BRANCHES[0]}
            companies={COMPANIES}
            onCompanyChange={setCompany}
          />
        </div>
        <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {["Products", "Orders", "Customers"].map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-label)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
