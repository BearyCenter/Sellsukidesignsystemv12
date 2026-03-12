import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./ds-fileupload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["dropzone", "button", "avatar"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: "Upload Files",
    description: "PNG, JPG, PDF up to 10MB",
    accept: "image/*,.pdf",
    multiple: true,
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: "button",
    label: "Attachments",
    multiple: true,
  },
};

export const AvatarVariant: Story = {
  args: {
    variant: "avatar",
    label: "Profile Photo",
    accept: "image/*",
  },
};
