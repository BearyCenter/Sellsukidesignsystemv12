import React, { useState, useRef } from "react";
import { Copy, Check, Pipette } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle, mono } from "./_showcase-factory";

/* ─── ColorPicker Component ────────────────────────────────────────────────── */

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#991b1b", "#9a3412", "#854d0e", "#166534", "#155e75", "#1e40af", "#5b21b6", "#9d174d",
  "#fca5a5", "#fdba74", "#fde047", "#86efac", "#67e8f9", "#93c5fd", "#c4b5fd", "#f9a8d4",
];

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function ColorPicker({
  value, onChange, label, presets, showInput = true, showFormats, size = "md",
}: {
  value: string; onChange: (v: string) => void; label?: string; presets?: string[];
  showInput?: boolean; showFormats?: boolean; size?: "sm" | "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const swatchSize = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6";
  const displayPresets = presets || PRESETS;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  return (
    <div className="space-y-3">
      {label && <label className="block text-foreground" style={fontLabelBold}>{label}</label>}

      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-[var(--radius-md)] border border-border cursor-pointer overflow-hidden"
            style={{ backgroundColor: value }} onClick={() => inputRef.current?.click()}>
          </div>
          <input ref={inputRef} type="color" value={value} onChange={e => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        </div>

        {showInput && (
          <div className="flex items-center gap-1.5">
            <input value={value} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value) || e.target.value === "#") onChange(e.target.value); }}
              className="w-24 px-2.5 py-1.5 rounded-[var(--radius-md)] border border-border bg-background text-foreground outline-none focus:border-primary"
              style={mono} maxLength={7} />
            <button onClick={() => copy(value)}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
              {copied ? <Check size={14} className="text-chart-2" /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>

      {displayPresets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {displayPresets.map(c => (
            <button key={c} onClick={() => onChange(c)}
              className={`${swatchSize} rounded-[var(--radius-sm)] border-2 transition-transform hover:scale-110 cursor-pointer
                ${value === c ? "border-foreground ring-1 ring-foreground/20" : "border-transparent"}`}
              style={{ backgroundColor: c }} title={c} />
          ))}
        </div>
      )}

      {showFormats && (
        <div className="space-y-1">
          {[
            { label: "HEX", val: value.toUpperCase() },
            { label: "RGB", val: hexToRgb(value) },
            { label: "HSL", val: hexToHsl(value) },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-2">
              <span className="w-8 text-muted-foreground" style={smallLabel}>{f.label}</span>
              <code className="text-foreground" style={mono}>{f.val}</code>
              <button onClick={() => copy(f.val)} className="text-muted-foreground hover:text-foreground cursor-pointer"><Copy size={12} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
