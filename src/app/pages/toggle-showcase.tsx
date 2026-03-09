import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";

function Toggle({ checked, onChange, label, description, size = "md", disabled }: { checked: boolean; onChange: (v: boolean) => void; label?: string; description?: string; size?: "sm" | "md" | "lg"; disabled?: boolean }) {
  const sizes = { sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" }, md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" }, lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" } };
  const s = sizes[size];
  return (
    <label className={`inline-flex items-start gap-3 ${disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={`${s.track} rounded-full relative flex-shrink-0 transition-colors cursor-pointer ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`${s.thumb} rounded-full bg-white shadow-sm absolute top-0.5 left-0.5 transition-transform ${checked ? s.translate : ""}`} />
      </button>
      {(label || description) && (
        <div>
          {label && <span className="text-foreground block" style={fontLabel}>{label}</span>}
          {description && <span className="text-muted-foreground block" style={smallLabel}>{description}</span>}
        </div>
      )}
    </label>
  );
}

export function ToggleShowcase() {
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(true);
  const [v3, setV3] = useState(true);
  const [v4, setV4] = useState(false);
  const [v5, setV5] = useState(false);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.toggle.title" descKey="page.toggle.desc" />

      <Section title="Basic Usage" description="Simple on/off switch with label." code={`<SskToggle checked={value} onChange={setValue} label="Enable notifications" />`}>
        <DemoBox>
          <div className="space-y-4">
            <Toggle checked={v1} onChange={setV1} label="Enable notifications" />
            <Toggle checked={v2} onChange={setV2} label="Dark mode" description="Switch between light and dark themes" />
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different UI densities." code={`<SskToggle size="sm" />\n<SskToggle size="md" />\n<SskToggle size="lg" />`}>
        <DemoBox>
          <div className="flex items-start gap-8">
            <DemoCard label="Small"><Toggle checked={v3} onChange={setV3} size="sm" label="Small" /></DemoCard>
            <DemoCard label="Medium"><Toggle checked={v4} onChange={setV4} size="md" label="Medium" /></DemoCard>
            <DemoCard label="Large"><Toggle checked={v5} onChange={setV5} size="lg" label="Large" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Disabled" description="Non-interactive disabled state." code={`<SskToggle disabled />`}>
        <DemoBox>
          <div className="flex gap-8">
            <Toggle checked={false} onChange={() => {}} disabled label="Off (disabled)" />
            <Toggle checked={true} onChange={() => {}} disabled label="On (disabled)" />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "checked", type: "boolean", def: "false", desc: "Toggle state" },
        { prop: "onChange", type: "(checked: boolean) => void", def: "—", desc: "Change handler" },
        { prop: "label", type: "string", def: "—", desc: "Label text" },
        { prop: "description", type: "string", def: "—", desc: "Helper description text" },
        { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Toggle size" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable toggle" },
      ]} />
    </div>
  );
}
