import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "./ds-taginput";
import { useState } from "react";

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "filled"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript"]);
    return <TagInput tags={tags} onChange={setTags} placeholder="Add a tag..." />;
  },
};

export const WithMaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState(["Tag 1", "Tag 2"]);
    return <TagInput tags={tags} onChange={setTags} maxTags={5} placeholder="Max 5 tags..." />;
  },
};

export const AllVariants: Story = {
  render: () => {
    const [a, setA] = useState(["Default"]);
    const [b, setB] = useState(["Outline"]);
    const [c, setC] = useState(["Filled"]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
        <TagInput tags={a} onChange={setA} variant="default" placeholder="Default variant" />
        <TagInput tags={b} onChange={setB} variant="outline" placeholder="Outline variant" />
        <TagInput tags={c} onChange={setC} variant="filled" placeholder="Filled variant" />
      </div>
    );
  },
};
