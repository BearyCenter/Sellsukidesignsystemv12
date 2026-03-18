import type { Meta, StoryObj } from "@storybook/react";
import { OTPInput } from "./ds-otpinput";

const meta: Meta<typeof OTPInput> = {
  title: "Components/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: { label: "Enter verification code" },
};

export const FourDigits: Story = {
  args: { label: "PIN Code", length: 4 },
};

export const Masked: Story = {
  args: { label: "Secure OTP", length: 6, masked: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <OTPInput label="Small" size="sm" length={4} />
      <OTPInput label="Medium" size="md" length={4} />
      <OTPInput label="Large" size="lg" length={4} />
    </div>
  ),
};

export const WithError: Story = {
  args: { label: "Verification Code", error: "Invalid code, please try again", length: 6 },
};
