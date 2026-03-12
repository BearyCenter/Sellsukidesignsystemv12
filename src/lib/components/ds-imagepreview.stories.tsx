import type { Meta, StoryObj } from "@storybook/react";
import { ImagePreview } from "./ds-imagepreview";

const meta: Meta<typeof ImagePreview> = {
  title: "Components/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ImagePreview>;

const sampleImages = [
  { src: "https://picsum.photos/seed/a/800/600", alt: "Mountain landscape" },
  { src: "https://picsum.photos/seed/b/800/600", alt: "Ocean sunset" },
  { src: "https://picsum.photos/seed/c/800/600", alt: "Forest path" },
];

export const Default: Story = {
  args: {
    images: sampleImages,
  },
};

export const SingleImage: Story = {
  args: {
    images: [{ src: "https://picsum.photos/seed/d/800/600", alt: "Single photo" }],
  },
};

export const ManyImages: Story = {
  args: {
    images: [
      { src: "https://picsum.photos/seed/1/800/600", alt: "Photo 1" },
      { src: "https://picsum.photos/seed/2/800/600", alt: "Photo 2" },
      { src: "https://picsum.photos/seed/3/800/600", alt: "Photo 3" },
      { src: "https://picsum.photos/seed/4/800/600", alt: "Photo 4" },
      { src: "https://picsum.photos/seed/5/800/600", alt: "Photo 5" },
    ],
  },
};
