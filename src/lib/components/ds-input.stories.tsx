import type { Meta, StoryObj } from "@storybook/react";
import { DSInput, DSTextarea } from "./ds-input";
import { Mail, Search } from "lucide-react";

const meta: Meta<typeof DSInput> = {
  title: "Components/Input",
  component: DSInput,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "outlined", "filled", "ghost"] },
    state: { control: "select", options: ["default", "error", "success", "warning"] },
  },
};
export default meta;
type Story = StoryObj<typeof DSInput>;

export const Default: Story = { args: { placeholder: "Enter text..." } };
export const WithLabel: Story = { args: { label: "Email", placeholder: "you@example.com", required: true } };
export const Clearable: Story = { args: { label: "Search", placeholder: "Type to search...", clearable: true, defaultValue: "Hello" } };
export const PasswordToggle: Story = { args: { label: "Password", type: "password", showPasswordToggle: true, placeholder: "Enter password" } };
export const WithError: Story = { args: { label: "Email", errorMessage: "Invalid email address", defaultValue: "invalid" } };
export const WithSuccess: Story = { args: { label: "Username", successMessage: "Username is available!", state: "success" as const, defaultValue: "sellsuki" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <DSInput variant="default" label="Default" placeholder="Default variant" />
      <DSInput variant="outlined" label="Outlined" placeholder="Outlined variant" />
      <DSInput variant="filled" label="Filled" placeholder="Filled variant" />
      <DSInput variant="ghost" label="Ghost" placeholder="Ghost variant" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <DSInput leftIcon={<Mail size={16} />} placeholder="Email address" />
      <DSInput leftIcon={<Search size={16} />} placeholder="Search..." clearable />
    </div>
  ),
};

export const TextareaDefault: Story = {
  render: () => <DSTextarea label="Description" placeholder="Write something..." helperText="Max 500 characters" />,
};

export const TextareaWithCharCount: Story = {
  render: () => <DSTextarea label="Bio" placeholder="Tell us about yourself..." showCharCount maxLength={200} />,
};
