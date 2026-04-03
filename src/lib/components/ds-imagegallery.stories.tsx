import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ImageGallery, ThumbnailCell } from "./ds-imagegallery";

const SAMPLE_IMAGES = [
  { id: "1", src: "https://picsum.photos/seed/a/400/300", alt: "Image 1", name: "product-hero.jpg", size: "128 KB" },
  { id: "2", src: "https://picsum.photos/seed/b/400/300", alt: "Image 2", name: "banner-summer.jpg", size: "256 KB" },
  { id: "3", src: "https://picsum.photos/seed/c/400/300", alt: "Image 3", name: "thumbnail-01.jpg", size: "64 KB" },
  { id: "4", src: "https://picsum.photos/seed/d/400/300", alt: "Image 4", name: "category-food.jpg", size: "192 KB" },
  { id: "5", src: "https://picsum.photos/seed/e/400/300", alt: "Image 5", name: "product-side.jpg", size: "80 KB" },
  { id: "6", src: "https://picsum.photos/seed/f/400/300", alt: "Image 6", name: "lifestyle-01.jpg", size: "320 KB" },
];

const meta: Meta<typeof ImageGallery> = {
  title: "Data Display/ImageGallery",
  component: ImageGallery,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="max-w-2xl">
      <ImageGallery images={SAMPLE_IMAGES} columns={3} />
    </div>
  ),
};

export const Selectable: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["1", "3"]);
    return (
      <div className="max-w-2xl space-y-2">
        <ImageGallery
          images={SAMPLE_IMAGES}
          selectable
          selectedIds={selected}
          onSelectChange={setSelected}
          columns={3}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {selected.join(", ") || "none"}
        </p>
      </div>
    );
  },
};

export const WithDelete: StoryObj = {
  render: () => {
    const [images, setImages] = useState(SAMPLE_IMAGES);
    return (
      <div className="max-w-2xl">
        <ImageGallery
          images={images}
          columns={3}
          onDelete={(id) => setImages((prev) => prev.filter((img) => img.id !== id))}
        />
      </div>
    );
  },
};

export const ThumbnailCellStory: StoryObj = {
  name: "ThumbnailCell (table use)",
  render: () => (
    <div className="space-y-3 p-4 max-w-sm">
      <ThumbnailCell
        src="https://picsum.photos/seed/a/80/80"
        caption="iPhone 15 Pro"
        subCaption="SKU: IP15P-128-BLK"
        size="md"
      />
      <ThumbnailCell
        src="https://picsum.photos/seed/b/80/80"
        caption="AirPods Pro"
        subCaption="SKU: APP-2ND-WHT"
        size="sm"
      />
      <ThumbnailCell
        src="https://picsum.photos/seed/c/40/40"
        caption="MacBook Air M3"
        size="xs"
      />
    </div>
  ),
};
