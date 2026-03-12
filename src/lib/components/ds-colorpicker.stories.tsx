import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ds-colorpicker";
import { useState } from "react";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    showInput: { control: "boolean" },
    showFormats: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");
    return <ColorPicker value={color} onChange={setColor} label="Pick a color" />;
  },
};

export const WithFormats: Story = {
  render: () => {
    const [color, setColor] = useState("#ef4444");
    return <ColorPicker value={color} onChange={setColor} label="Color with formats" showFormats />;
  },
};

export const CustomPresets: Story = {
  render: () => {
    const [color, setColor] = useState("#22c55e");
    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        label="Brand Colors"
        presets={["#1e40af", "#3b82f6", "#60a5fa", "#22c55e", "#f97316", "#ef4444"]}
      />
    );
  },
};
