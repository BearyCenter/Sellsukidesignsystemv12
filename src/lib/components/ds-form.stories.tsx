import type { Meta, StoryObj } from "@storybook/react";
import { FormField, FormLabel, FormError, FormHelperText } from "./ds-form";
import { DSInput, DSTextarea } from "./ds-input";
import { Dropdown } from "./ds-dropdown";
import { DSCheckbox } from "./ds-checkbox";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <FormField name="email" label="Email" required>
        <DSInput placeholder="you@example.com" />
      </FormField>
      <FormField name="name" label="Full Name" helperText="As it appears on your ID">
        <DSInput placeholder="John Doe" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <FormField name="email" label="Email" required error="Email is required">
        <DSInput state="error" placeholder="you@example.com" />
      </FormField>
      <FormField name="password" label="Password" required error="Password must be at least 8 characters">
        <DSInput type="password" state="error" placeholder="••••••••" />
      </FormField>
    </div>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <div className="max-w-md space-y-5 p-6 rounded-[var(--radius-md)] border border-border bg-card">
      <h3 className="text-foreground text-lg" style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}>
        Create Account
      </h3>
      <FormField name="name" label="Full Name" required>
        <DSInput placeholder="John Doe" />
      </FormField>
      <FormField name="email" label="Email" required helperText="We'll never share your email">
        <DSInput type="email" placeholder="you@example.com" />
      </FormField>
      <FormField name="bio" label="Bio">
        <DSTextarea placeholder="Tell us about yourself..." />
      </FormField>
      <FormField name="terms" label="">
        <DSCheckbox label="I agree to the terms and conditions" />
      </FormField>
    </div>
  ),
};
