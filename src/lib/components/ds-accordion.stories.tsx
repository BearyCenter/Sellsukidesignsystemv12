import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./ds-accordion";
import { Settings, User, Bell } from "lucide-react";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["single", "multiple"] },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = [
  { id: "1", title: "What is Sellsuki?", content: "Sellsuki is a comprehensive e-commerce management platform." },
  { id: "2", title: "How do I get started?", content: "Sign up for an account and follow the onboarding guide." },
  { id: "3", title: "What payment methods are supported?", content: "We support credit cards, bank transfers, and various e-wallets." },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    type: "single",
  },
};

export const Multiple: Story = {
  args: {
    items: sampleItems,
    type: "multiple",
    defaultOpen: ["1", "2"],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: "1", title: "Account Settings", content: "Manage your account preferences.", icon: <Settings size={16} /> },
      { id: "2", title: "Profile", content: "Update your profile information.", icon: <User size={16} /> },
      { id: "3", title: "Notifications", content: "Configure notification preferences.", icon: <Bell size={16} /> },
    ],
    type: "single",
    defaultOpen: "1",
  },
};
