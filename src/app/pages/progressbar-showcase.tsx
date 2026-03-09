import React, { useState, useEffect } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, btnStyle, smallLabel } from "./_showcase-factory";

function ProgressBar({ value, max = 100, size = "md", color, label, showValue, indeterminate }: { value?: number; max?: number; size?: "sm" | "md" | "lg"; color?: string; label?: string; showValue?: boolean; indeterminate?: boolean }) {
  const sizes = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-foreground" style={fontLabel}>{label}</span>}
          {showValue && !indeterminate && <span className="text-muted-foreground" style={smallLabel}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full ${sizes[size]} rounded-full bg-muted overflow-hidden`}>
        {indeterminate ? (
          <div className="h-full w-1/3 rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]" style={{ backgroundColor: color ?? "var(--primary)" }} />
        ) : (
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color ?? "var(--primary)" }} />
        )}
      </div>
      <style>{`@keyframes indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
    </div>
  );
}

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
