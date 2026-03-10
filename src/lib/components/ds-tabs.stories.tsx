import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./ds-tabs";
import type { TabItem } from "./ds-tabs";
import { Home, Settings, User } from "lucide-react";

const sampleTabs: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "settings", label: "Settings", badge: 3 },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "bordered", "pills", "underline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = { args: { tabs: sampleTabs } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div><p style={{ marginBottom: 8, fontWeight: 600 }}>Default</p><Tabs tabs={sampleTabs} variant="default" /></div>
      <div><p style={{ marginBottom: 8, fontWeight: 600 }}>Bordered</p><Tabs tabs={sampleTabs} variant="bordered" /></div>
      <div><p style={{ marginBottom: 8, fontWeight: 600 }}>Pills</p><Tabs tabs={sampleTabs} variant="pills" /></div>
      <div><p style={{ marginBottom: 8, fontWeight: 600 }}>Underline</p><Tabs tabs={sampleTabs} variant="underline" /></div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Tabs tabs={sampleTabs} size="sm" />
      <Tabs tabs={sampleTabs} size="md" />
      <Tabs tabs={sampleTabs} size="lg" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs tabs={[
      { id: "home", label: "Home", icon: <Home size={16} /> },
      { id: "profile", label: "Profile", icon: <User size={16} /> },
      { id: "settings", label: "Settings", icon: <Settings size={16} />, badge: 2 },
    ]} />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs tabs={[
      { id: "active", label: "Active" },
      { id: "disabled", label: "Disabled", disabled: true },
      { id: "another", label: "Another" },
    ]} />
  ),
};

export const FullWidth: Story = { args: { tabs: sampleTabs, fullWidth: true } };

export const WithContent: Story = {
  render: () => (
    <Tabs tabs={[
      { id: "tab1", label: "Overview", content: <div style={{ padding: 16 }}>Overview content here.</div> },
      { id: "tab2", label: "Details", content: <div style={{ padding: 16 }}>Details content here.</div> },
      { id: "tab3", label: "Settings", content: <div style={{ padding: 16 }}>Settings content here.</div> },
    ]} />
  ),
};
