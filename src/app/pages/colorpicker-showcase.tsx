import React, { useState } from "react";
import { Copy, Check, Pipette } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle, mono } from "./_showcase-factory";
import { ColorPicker } from "../../lib/components/ds-colorpicker";

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#991b1b", "#9a3412", "#854d0e", "#166534", "#155e75", "#1e40af", "#5b21b6", "#9d174d",
  "#fca5a5", "#fdba74", "#fde047", "#86efac", "#67e8f9", "#93c5fd", "#c4b5fd", "#f9a8d4",
];

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function ColorPickerShowcase() {
  const [c1, setC1] = useState("#3b82f6");
  const [c2, setC2] = useState("#22c55e");
  const [c3, setC3] = useState("#8b5cf6");
  const [c4, setC4] = useState("#ef4444");

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.colorpicker.title" descKey="page.colorpicker.desc" />

      <Section title="Basic" description="Color swatch with native picker and preset palette." code={`<SskColorPicker value={color} onChange={setColor} />`}>
        <DemoBox><ColorPicker value={c1} onChange={setC1} label="Brand Color" /></DemoBox>
      </Section>

      <Section title="With Formats" description="Display HEX, RGB, and HSL values with copy." code={`<SskColorPicker showFormats />`}>
        <DemoBox><ColorPicker value={c2} onChange={setC2} label="Pick a Color" showFormats /></DemoBox>
      </Section>

      <Section title="Custom Presets" description="Custom palette presets.">
        <DemoBox>
          <ColorPicker value={c3} onChange={setC3} label="Theme Color"
            presets={["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8", "#cbd5e1", "#e2e8f0", "#f1f5f9"]} />
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Swatch preset sizes.">
        <DemoBox>
          <div className="space-y-6">
            <DemoCard label="Small"><ColorPicker value={c4} onChange={setC4} size="sm" presets={PRESETS.slice(0, 8)} /></DemoCard>
            <DemoCard label="Medium"><ColorPicker value={c4} onChange={setC4} size="md" presets={PRESETS.slice(0, 8)} /></DemoCard>
            <DemoCard label="Large"><ColorPicker value={c4} onChange={setC4} size="lg" presets={PRESETS.slice(0, 8)} /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Usage Example" description="Applying selected color to a preview.">
        <DemoBox>
          <div className="flex items-start gap-8">
            <ColorPicker value={c1} onChange={setC1} presets={PRESETS.slice(0, 8)} />
            <div className="space-y-3">
              <div className="w-48 h-12 rounded-[var(--radius-md)] flex items-center justify-center text-white" style={{ backgroundColor: c1, ...btnStyle }}>Button Preview</div>
              <div className="w-48 h-12 rounded-[var(--radius-md)] border-2 flex items-center justify-center" style={{ borderColor: c1, color: c1, ...btnStyle }}>Outline Button</div>
              <div className="w-48 px-3 py-2 rounded-[var(--radius-md)] flex items-center gap-2" style={{ backgroundColor: c1 + "15", color: c1, ...fontLabel }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c1 }} />Badge Preview
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "string", def: "—", desc: "Current hex color value" },
        { prop: "onChange", type: "(v: string) => void", def: "—", desc: "Color change handler" },
        { prop: "label", type: "string", def: "—", desc: "Label text" },
        { prop: "presets", type: "string[]", def: "24 colors", desc: "Preset color swatches" },
        { prop: "showInput", type: "boolean", def: "true", desc: "Show hex input field" },
        { prop: "showFormats", type: "boolean", def: "false", desc: "Show HEX/RGB/HSL values" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Preset swatch size" },
      ]} />
    </div>
  );
}
