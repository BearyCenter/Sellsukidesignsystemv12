import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./ds-card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    hover: { control: "boolean" },
    elevation: { control: "select", options: ["none", "sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>Card Title</CardHeader>
      <CardBody>This is the card body content.</CardBody>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(["none", "sm", "md", "lg"] as const).map((e) => (
        <Card key={e} elevation={e}>
          <CardBody>Elevation: {e}</CardBody>
        </Card>
      ))}
    </div>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hover>
      <CardBody>Hover over this card to see the effect.</CardBody>
    </Card>
  ),
};

export const WithHeaderAction: Story = {
  render: () => (
    <Card>
      <CardHeader action={<button style={{ color: "var(--primary)" }}>Edit</button>}>
        Settings
      </CardHeader>
      <CardBody>Card content with a header action button.</CardBody>
    </Card>
  ),
};
