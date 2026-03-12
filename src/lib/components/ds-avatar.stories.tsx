import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./ds-avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    status: { control: "select", options: ["online", "offline", "busy", "away"] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { name: "John Doe", size: "md" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="AB" size="xs" />
      <Avatar name="CD" size="sm" />
      <Avatar name="EF" size="md" />
      <Avatar name="GH" size="lg" />
      <Avatar name="IJ" size="xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Online User" status="online" />
      <Avatar name="Offline User" status="offline" />
      <Avatar name="Busy User" status="busy" />
      <Avatar name="Away User" status="away" />
    </div>
  ),
};

export const GroupExample: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Charlie" />
      <Avatar name="Diana" />
      <Avatar name="Eve" />
    </AvatarGroup>
  ),
};
