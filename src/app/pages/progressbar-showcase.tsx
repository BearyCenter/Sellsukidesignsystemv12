import React, { useState, useEffect } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, btnStyle, smallLabel } from "./_showcase-factory";
import { ProgressBar } from "../../lib/components/ds-progressbar";

export function ProgressBarShowcase() {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setAnimated((p) => p >= 100 ? 0 : p + 2), 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.progressbar.title" descKey="page.progressbar.desc" />

      <Section title="Basic Usage" description="Determinate progress bar with percentage." code={`<SskProgressBar value={75} showValue />`}>
        <DemoBox>
          <div className="space-y-6 max-w-lg">
            <ProgressBar value={25} label="Upload Progress" showValue />
            <ProgressBar value={60} label="Processing" showValue />
            <ProgressBar value={90} label="Almost Done" showValue />
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three height options." code={`<SskProgressBar size="sm" value={50} />`}>
        <DemoBox>
          <div className="space-y-6 max-w-lg">
            <DemoCard label="Small"><ProgressBar value={60} size="sm" /></DemoCard>
            <DemoCard label="Medium"><ProgressBar value={60} size="md" /></DemoCard>
            <DemoCard label="Large"><ProgressBar value={60} size="lg" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Colors" description="Semantic colors for different states." code={`<SskProgressBar color="var(--chart-2)" value={100} />`}>
        <DemoBox>
          <div className="space-y-4 max-w-lg">
            <ProgressBar value={100} color="var(--chart-2)" label="Complete" showValue />
            <ProgressBar value={65} color="var(--chart-5)" label="Warning" showValue />
            <ProgressBar value={30} color="var(--destructive)" label="Critical" showValue />
          </div>
        </DemoBox>
      </Section>

      <Section title="Animated" description="Live animated progress." code={`<SskProgressBar value={progress} animated />`}>
        <DemoBox>
          <div className="max-w-lg">
            <ProgressBar value={animated} label="Downloading..." showValue />
          </div>
        </DemoBox>
      </Section>

      <Section title="Indeterminate" description="Unknown duration loading state." code={`<SskProgressBar indeterminate />`}>
        <DemoBox>
          <div className="max-w-lg">
            <ProgressBar indeterminate label="Loading..." />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "number", def: "0", desc: "Current value" },
        { prop: "max", type: "number", def: "100", desc: "Maximum value" },
        { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Bar height" },
        { prop: "color", type: "string", def: "var(--primary)", desc: "Bar color" },
        { prop: "label", type: "string", def: "—", desc: "Label above bar" },
        { prop: "showValue", type: "boolean", def: "false", desc: "Show percentage" },
        { prop: "indeterminate", type: "boolean", def: "false", desc: "Indeterminate mode" },
      ]} />
    </div>
  );
}
