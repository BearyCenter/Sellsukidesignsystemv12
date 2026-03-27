import React from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, btnStyle, smallLabel } from "./_showcase-factory";
import { Divider } from "../../lib/components/ds-divider";

export function DividerShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.divider.title" descKey="page.divider.desc" />

      <Section title="Horizontal" description="Standard horizontal separator." code={`<SskDivider />\n<SskDivider dashed />`}>
        <DemoBox>
          <div className="max-w-lg">
            <span className="text-foreground block" style={fontLabel}>Section above</span>
            <Divider />
            <span className="text-foreground block" style={fontLabel}>Section below</span>
            <Divider dashed />
            <span className="text-foreground block" style={fontLabel}>Dashed variant</span>
          </div>
        </DemoBox>
      </Section>

      <Section title="With Label" description="Centered text label within the divider." code={`<SskDivider label="OR" />`}>
        <DemoBox>
          <div className="max-w-lg">
            <button className="w-full px-4 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle}>Sign in with Email</button>
            <Divider label="OR" />
            <button className="w-full px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer" style={btnStyle}>Continue with Google</button>
            <Divider label="Don't have an account?" />
            <button className="w-full px-4 py-2 rounded-[var(--radius)] border border-border text-primary hover:bg-accent/30 cursor-pointer" style={btnStyle}>Register</button>
          </div>
        </DemoBox>
      </Section>

      <Section title="Spacing" description="Control vertical spacing with spacing prop." code={`<SskDivider spacing="lg" />`}>
        <DemoBox>
          <div className="max-w-lg">
            <DemoCard label="Small spacing">
              <div className="p-3 rounded-[var(--radius)] border border-border">
                <span className="text-muted-foreground" style={smallLabel}>Above</span>
                <Divider spacing="sm" />
                <span className="text-muted-foreground" style={smallLabel}>Below</span>
              </div>
            </DemoCard>
            <div className="mt-4" />
            <DemoCard label="Large spacing">
              <div className="p-3 rounded-[var(--radius)] border border-border">
                <span className="text-muted-foreground" style={smallLabel}>Above</span>
                <Divider spacing="lg" />
                <span className="text-muted-foreground" style={smallLabel}>Below</span>
              </div>
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Vertical" description="Vertical divider between inline elements." code={`<SskDivider orientation="vertical" />`}>
        <DemoBox>
          <div className="flex items-center h-8">
            <span className="text-foreground" style={fontLabel}>Home</span>
            <Divider orientation="vertical" />
            <span className="text-foreground" style={fontLabel}>Products</span>
            <Divider orientation="vertical" />
            <span className="text-foreground" style={fontLabel}>Settings</span>
            <Divider orientation="vertical" />
            <span className="text-muted-foreground" style={fontLabel}>Logout</span>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "orientation", type: '"horizontal" | "vertical"', def: '"horizontal"', desc: "Divider direction" },
        { prop: "label", type: "string", def: "—", desc: "Center label text" },
        { prop: "dashed", type: "boolean", def: "false", desc: "Dashed line style" },
        { prop: "spacing", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Vertical margin" },
      ]} />
    </div>
  );
}
