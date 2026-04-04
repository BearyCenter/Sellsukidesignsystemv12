import React, { useState } from "react";
import { Info } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";
import { Switch } from "../../lib/components/ds-switch";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function SwitchShowcase() {
  const [v1, setV1] = useState(false);
  const [v2, setV2] = useState(true);
  const [v3, setV3] = useState(true);
  const [v4, setV4] = useState(false);
  const [v5, setV5] = useState(true);
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(true);
  const [c4, setC4] = useState(true);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.switch.title" descKey="page.switch.desc" />

      {/* Migration Note */}
      <div className="rounded-[var(--radius-md)] border border-primary/30 bg-accent/50 px-5 py-4 flex gap-3">
        <div className="w-8 h-8 rounded-[var(--radius)] bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Info size={16} className="text-primary" />
        </div>
        <div>
          <span className="text-foreground block" style={{ ...fontLabelBold, marginBottom: 4 }}>
            Component Consolidation
          </span>
          <span className="text-muted-foreground block" style={smallLabel}>
            The legacy <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>Toggle</code> component has been merged into <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>Switch</code>. Use <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>&lt;SskSwitch&gt;</code> for all binary state controls. Full details in Changelog v1.4.0.
          </span>
        </div>
      </div>

      <Section title="Basic Usage" description="On/off switch with label and description." code={`<SskSwitch checked={value} onChange={setValue} label="Enable" />`}>
        <DemoBox>
          <div className="space-y-4">
            <Switch checked={v1} onChange={setV1} label="Email notifications" />
            <Switch checked={v2} onChange={setV2} label="Auto-save" description="Automatically save changes every 30 seconds" />
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts.">
        <DemoBox>
          <div className="flex items-start gap-8">
            <DemoCard label="Small"><Switch checked={v3} onChange={setV3} size="sm" label="Small" /></DemoCard>
            <DemoCard label="Medium"><Switch checked={v4} onChange={setV4} size="md" label="Medium" /></DemoCard>
            <DemoCard label="Large"><Switch checked={v5} onChange={setV5} size="lg" label="Large" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Colors" description="Semantic color options for different contexts.">
        <DemoBox>
          <div className="flex flex-wrap gap-8">
            <DemoCard label="Primary"><Switch checked={c1} onChange={setC1} color="primary" label="Primary" /></DemoCard>
            <DemoCard label="Success"><Switch checked={c2} onChange={setC2} color="success" label="Success" /></DemoCard>
            <DemoCard label="Warning"><Switch checked={c3} onChange={setC3} color="warning" label="Warning" /></DemoCard>
            <DemoCard label="Destructive"><Switch checked={c4} onChange={setC4} color="destructive" label="Danger" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Disabled" description="Non-interactive disabled states.">
        <DemoBox>
          <div className="flex gap-8">
            <Switch checked={false} onChange={() => {}} disabled label="Off (disabled)" />
            <Switch checked={true} onChange={() => {}} disabled label="On (disabled)" />
          </div>
        </DemoBox>
      </Section>

      <Section title="Settings Card" description="Common pattern: switches in a settings list.">
        <DemoBox>
          <div className="max-w-md rounded-[var(--radius-md)] border border-border bg-card divide-y divide-border">
            {[
              { label: "Push Notifications", desc: "Receive push notifications on your device", key: "push", defaultOn: true },
              { label: "Email Digest", desc: "Weekly summary of your activity", key: "email", defaultOn: true },
              { label: "Marketing", desc: "Receive marketing and promotional emails", key: "marketing", defaultOn: false },
            ].map((item) => (
              <SettingsRow key={item.key} label={item.label} desc={item.desc} defaultOn={item.defaultOn} />
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Migration from Toggle" description="If you were using the old Toggle component, simply replace the import and component name. The API is identical with additional color support.">
        <DemoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 px-4 py-3">
              <span className="text-destructive block mb-2" style={{ ...fontLabelBold }}>Before (deprecated)</span>
              <code className="block text-foreground bg-muted rounded-[var(--radius-sm)] px-3 py-2" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>
                {`import { Toggle } from "…"`}<br />
                {`<Toggle checked={v} onChange={setV} />`}
              </code>
            </div>
            <div className="rounded-[var(--radius)] border border-chart-2/30 bg-chart-2/5 px-4 py-3">
              <span className="text-chart-2 block mb-2" style={{ ...fontLabelBold }}>After (recommended)</span>
              <code className="block text-foreground bg-muted rounded-[var(--radius-sm)] px-3 py-2" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>
                {`import { Switch } from "…"`}<br />
                {`<Switch checked={v} onChange={setV} />`}
              </code>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "checked", type: "boolean", def: "false", desc: "Switch state" },
        { prop: "onChange", type: "(v: boolean) => void", def: "—", desc: "Change handler" },
        { prop: "label", type: "string", def: "—", desc: "Label text" },
        { prop: "description", type: "string", def: "—", desc: "Helper text" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Switch size" },
        { prop: "color", type: '"primary"|"success"|"warning"|"destructive"', def: '"primary"', desc: "Active color" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable interaction" },
      ]} />
    </div>
  );
}

/* ─── Helper: Settings Row (avoids useState inside map) ─── */

function SettingsRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <span className="text-foreground block" style={fontLabel}>{label}</span>
        <span className="text-muted-foreground block" style={smallLabel}>{desc}</span>
      </div>
      <Switch checked={on} onChange={setOn} size="sm" />
    </div>
  );
}
