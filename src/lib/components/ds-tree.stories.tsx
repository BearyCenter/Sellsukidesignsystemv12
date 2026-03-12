import type { Meta, StoryObj } from "@storybook/react";
import { Tree } from "./ds-tree";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  argTypes: {
    selectable: { control: "boolean" },
    showLines: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Tree>;

const treeData = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "Button.tsx" },
          { id: "input", label: "Input.tsx" },
          { id: "modal", label: "Modal.tsx" },
        ],
      },
      {
        id: "utils",
        label: "utils",
        children: [
          { id: "helpers", label: "helpers.ts" },
          { id: "constants", label: "constants.ts" },
        ],
      },
      { id: "app", label: "App.tsx" },
      { id: "index", label: "index.ts" },
    ],
  },
  { id: "package", label: "package.json" },
  { id: "readme", label: "README.md" },
];

export const Default: Story = {
  args: {
    data: treeData,
    defaultExpanded: ["src"],
  },
};

export const WithLines: Story = {
  args: {
    data: treeData,
    defaultExpanded: ["src", "components"],
    showLines: true,
  },
};

export const Selectable: Story = {
  args: {
    data: treeData,
    defaultExpanded: ["src", "components"],
    selectable: true,
  },
};
