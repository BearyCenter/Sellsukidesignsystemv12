import React, { useState } from "react";
import { Settings, HelpCircle, Info, Bell, X, ChevronDown } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";
import { Popover } from "../../lib/components/ds-popover";
import { DSButton } from "../../lib/components/ds-button";
import { DSTextarea } from "../../lib/components/ds-input";
import { FormLabel } from "../../lib/components/ds-form";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function PopoverShowcase() {
  const [controlled, setControlled] = useState(false);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.popover.title" descKey="page.popover.desc" />

      <Section title="Basic" description="Click-triggered floating content panel." code={`<SskPopover trigger={<button>Open</button>}>\n  <p>Content here</p>\n</SskPopover>`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <Popover trigger={
              <DSButton><Info size={14} /> Click me</DSButton>
            }>
              <p className="text-foreground" style={fontLabel}>This is popover content. It can contain any elements.</p>
            </Popover>
          </div>
        </DemoBox>
      </Section>

      <Section title="With Title" description="Popover with header bar and close button." code={`<SskPopover title="Settings" trigger={...}>...</SskPopover>`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <Popover title="Notification Settings" trigger={
              <DSButton variant="outline"><Bell size={14} /> Preferences</DSButton>
            }>
              <div className="space-y-3 w-56">
                {["Email alerts", "Push notifications", "SMS alerts"].map((item, i) => (
                  <label key={i} className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground" style={fontLabel}>{item}</span>
                    <span className={`w-8 h-4.5 rounded-full relative flex-shrink-0 transition-colors ${i < 2 ? "bg-primary" : "bg-muted"}`}>
                      <span className="rounded-full bg-white shadow-sm absolute"
                        style={{ width: 14, height: 14, top: "50%", transform: `translateY(-50%) translateX(${i < 2 ? 14 : 2}px)`, left: 0 }} />
                    </span>
                  </label>
                ))}
              </div>
            </Popover>
          </div>
        </DemoBox>
      </Section>

      <Section title="Placement" description="Four placement positions.">
        <DemoBox>
          <div className="flex flex-wrap items-center justify-center gap-4 py-12">
            {(["top", "bottom", "left", "right"] as const).map(p => (
              <Popover key={p} placement={p} trigger={
                <DSButton variant="outline" size="sm">{p}</DSButton>
              }>
                <p className="text-foreground whitespace-nowrap" style={smallLabel}>Placed {p}</p>
              </Popover>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Rich Content" description="Form elements inside a popover.">
        <DemoBox>
          <div className="flex justify-center py-4">
            <Popover title="Quick Feedback" trigger={
              <DSButton variant="outline"><HelpCircle size={14} /> Feedback</DSButton>
            }>
              <div className="space-y-3 w-64">
                <div>
                  <FormLabel>Rating</FormLabel>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <DSButton key={n} variant="outline" size="sm" className="w-8 px-0">{n}</DSButton>
                    ))}
                  </div>
                </div>
                <div>
                  <FormLabel>Comment</FormLabel>
                  <DSTextarea rows={2} className="mt-1" placeholder="Your feedback…" />
                </div>
                <DSButton className="w-full">Submit</DSButton>
              </div>
            </Popover>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "trigger", type: "ReactNode", def: "—", desc: "Element that triggers the popover" },
        { prop: "children", type: "ReactNode", def: "—", desc: "Popover content" },
        { prop: "title", type: "string", def: "—", desc: "Header title with close button" },
        { prop: "placement", type: '"top"|"bottom"|"left"|"right"', def: '"bottom"', desc: "Position relative to trigger" },
        { prop: "open", type: "boolean", def: "—", desc: "Controlled open state" },
        { prop: "onOpenChange", type: "(v: boolean) => void", def: "—", desc: "Open state change handler" },
      ]} />
    </div>
  );
}
