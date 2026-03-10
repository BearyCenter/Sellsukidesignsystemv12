import type { Preview } from "@storybook/react";
import "../src/lib/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F9FAFB" },
        { name: "dark", value: "#111827" },
        { name: "white", value: "#FFFFFF" },
      ],
    },
    layout: "padded",
  },
};

export default preview;
