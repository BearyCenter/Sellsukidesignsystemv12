import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RichTextEditor } from "./ds-richtexteditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Data Entry/RichTextEditor",
  component: RichTextEditor,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [html, setHtml] = useState("<p>Type your content here…</p>");
    return (
      <div className="max-w-2xl space-y-4">
        <RichTextEditor value={html} onChange={setHtml} placeholder="Start writing..." />
        <details>
          <summary className="text-sm text-muted-foreground cursor-pointer">View HTML output</summary>
          <pre className="mt-2 p-3 bg-muted/20 rounded text-xs overflow-auto">{html}</pre>
        </details>
      </div>
    );
  },
};

export const Minimal: StoryObj = {
  render: () => (
    <div className="max-w-2xl">
      <RichTextEditor
        toolbar={["format", "list"]}
        minHeight={120}
        placeholder="Short note…"
      />
    </div>
  ),
};

export const ReadOnly: StoryObj = {
  render: () => (
    <div className="max-w-2xl">
      <RichTextEditor
        value="<p>This is <strong>read-only</strong> content that cannot be edited.</p>"
        readOnly
      />
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div className="max-w-2xl">
      <RichTextEditor
        value="<p>Disabled editor</p>"
        disabled
      />
    </div>
  ),
};
