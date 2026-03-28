import React from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel } from "./_showcase-factory";
import { Spinner } from "../../lib/components/ds-spinner";
import { DSButton } from "../../lib/components/ds-button";

export function SpinnerShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.spinner.title" descKey="page.spinner.desc" />

      <Section title="Sizes" description="Four sizes for inline, button, card, and full-page loading." code={`<SskSpinner size="sm" />\n<SskSpinner size="md" />\n<SskSpinner size="lg" />\n<SskSpinner size="xl" />`}>
        <DemoBox>
          <div className="flex items-center gap-8">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <DemoCard key={s} label={s}><Spinner size={s} /></DemoCard>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Colors" description="Use brand or semantic colors." code={`<SskSpinner color="var(--primary)" />\n<SskSpinner color="var(--destructive)" />`}>
        <DemoBox>
          <div className="flex items-center gap-8">
            <DemoCard label="Primary"><Spinner color="var(--primary)" /></DemoCard>
            <DemoCard label="Success"><Spinner color="var(--chart-2)" /></DemoCard>
            <DemoCard label="Warning"><Spinner color="var(--chart-5)" /></DemoCard>
            <DemoCard label="Destructive"><Spinner color="var(--destructive)" /></DemoCard>
            <DemoCard label="Muted"><Spinner color="var(--muted-foreground)" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Inline with Text" description="Spinner next to text or inside buttons." code={`<button><SskSpinner size="sm" /> Loading...</button>`}>
        <DemoBox>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-foreground" style={fontLabel}>Loading data...</span>
            </div>
            <DSButton disabled className="opacity-80 inline-flex items-center gap-2">
              <Spinner size="sm" color="currentColor" />
              Processing...
            </DSButton>
          </div>
        </DemoBox>
      </Section>

      <Section title="Overlay" description="Full-card loading overlay pattern." code={`<div className="relative">\n  <CardContent />\n  <SskSpinner overlay />\n</div>`}>
        <DemoBox>
          <div className="relative h-40 rounded-[var(--radius)] border border-border bg-card overflow-hidden">
            <div className="p-4 text-muted-foreground" style={fontLabel}>Card content underneath...</div>
            <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Spinner size="lg" />
                <span className="text-muted-foreground" style={fontLabel}>Loading...</span>
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "size", type: '"sm" | "md" | "lg" | "xl"', def: '"md"', desc: "Spinner size" },
        { prop: "color", type: "string", def: "var(--primary)", desc: "Spinner color (CSS value)" },
        { prop: "overlay", type: "boolean", def: "false", desc: "Full overlay mode" },
      ]} />
    </div>
  );
}
