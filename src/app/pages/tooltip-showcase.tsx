import React from "react";
import { Info, HelpCircle } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, smallLabel } from "./_showcase-factory";
import { Tooltip } from "../../lib/components/ds-tooltip";
import { DSButton } from "../../lib/components/ds-button";

export function TooltipShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.tooltip.title" descKey="page.tooltip.desc" />

      <Section title="Basic Usage" description="Hover over an element to see the tooltip." code={`<SskTooltip content="More info">\n  <button>Hover me</button>\n</SskTooltip>`}>
        <DemoBox>
          <div className="flex gap-6 items-center justify-center py-8">
            <Tooltip content="This is helpful information">
              <DSButton>Hover me</DSButton>
            </Tooltip>
            <Tooltip content="Click for help">
              <span className="text-muted-foreground cursor-help"><HelpCircle size={20} /></span>
            </Tooltip>
          </div>
        </DemoBox>
      </Section>

      <Section title="Placement" description="Four placement options: top, bottom, left, right." code={`<SskTooltip placement="bottom" content="Below">\n  <button>Bottom</button>\n</SskTooltip>`}>
        <DemoBox>
          <div className="flex gap-6 items-center justify-center py-12">
            {(["top", "bottom", "left", "right"] as const).map((p) => (
              <Tooltip key={p} content={`Tooltip on ${p}`} placement={p}>
                <DSButton variant="outline">{p}</DSButton>
              </Tooltip>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="With Icons & Labels" description="Common pattern: info icon with tooltip." code={`<label>Email <SskTooltip content="We'll never share"><Info size={14} /></SskTooltip></label>`}>
        <DemoBox>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-foreground" style={fontLabel}>Email address</span>
              <Tooltip content="We will never share your email with third parties.">
                <Info size={14} className="text-muted-foreground cursor-help" />
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground" style={fontLabel}>API Key</span>
              <Tooltip content="Keep this secret. Regenerate if compromised." placement="right">
                <Info size={14} className="text-muted-foreground cursor-help" />
              </Tooltip>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "children", type: "ReactNode", def: "—", desc: "Trigger element" },
        { prop: "content", type: "string | ReactNode", def: "—", desc: "Tooltip content" },
        { prop: "placement", type: '"top" | "bottom" | "left" | "right"', def: '"top"', desc: "Tooltip position" },
        { prop: "delay", type: "number", def: "200", desc: "Show delay in ms" },
        { prop: "arrow", type: "boolean", def: "true", desc: "Show arrow indicator" },
      ]} />
    </div>
  );
}
