import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── Skeleton Component ───────────────────────────────────────────────────── */

function Skeleton({ width, height, variant = "rectangular", animate = true, className }: {
  width?: string | number; height?: string | number; variant?: "text" | "rectangular" | "circular" | "rounded";
  animate?: boolean; className?: string;
}) {
  const base = "bg-muted";
  const anim = animate ? "animate-pulse" : "";
  const radius = variant === "circular" ? "rounded-full"
    : variant === "rounded" ? "rounded-[var(--radius-md)]"
    : variant === "text" ? "rounded-[var(--radius-sm)]"
    : "rounded-[var(--radius-sm)]";

  return (
    <div
      className={`${base} ${anim} ${radius} ${className ?? ""}`}
      style={{
        width: width ?? "100%",
        height: height ?? (variant === "text" ? "1em" : variant === "circular" ? 40 : 20),
      }}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-card p-4 space-y-4 w-full max-w-sm">
      <Skeleton variant="rounded" height={160} />
      <div className="space-y-2">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="80%" height={14} />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={36} height={36} />
        <div className="flex-1 space-y-1.5">
          <Skeleton variant="text" width="40%" height={14} />
          <Skeleton variant="text" width="25%" height={12} />
        </div>
      </div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex gap-4">
        {[120, 160, 100, 80].map((w, i) => <Skeleton key={i} variant="text" width={w} height={14} />)}
      </div>
      {[0, 1, 2, 3].map(row => (
        <div key={row} className="px-4 py-3 border-b border-border flex items-center gap-4">
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={100 + row * 15} height={14} />
          <Skeleton variant="text" width={140} height={14} className="flex-1" />
          <Skeleton variant="rounded" width={60} height={22} />
          <Skeleton variant="text" width={80} height={14} />
        </div>
      ))}
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3 w-full max-w-md">
      {[0, 1, 2].map(i => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] border border-border bg-card">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-1.5">
            <Skeleton variant="text" width={`${60 + i * 10}%`} height={14} />
            <Skeleton variant="text" width={`${40 + i * 5}%`} height={12} />
          </div>
          <Skeleton variant="rounded" width={50} height={24} />
        </div>
      ))}
    </div>
  );
}

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function SkeletonShowcase() {
  const [animated, setAnimated] = useState(true);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.skeleton.title" descKey="page.skeleton.desc" />

      <Section title="Variants" description="Four shape variants: text, rectangular, rounded, and circular." code={`<SskSkeleton variant="text" width="200px" />\n<SskSkeleton variant="rectangular" height={100} />\n<SskSkeleton variant="circular" width={40} height={40} />`}>
        <DemoBox>
          <div className="flex flex-wrap gap-8">
            <DemoCard label="Text"><div className="space-y-2 w-48"><Skeleton variant="text" /><Skeleton variant="text" width="80%" /><Skeleton variant="text" width="60%" /></div></DemoCard>
            <DemoCard label="Rectangular"><Skeleton variant="rectangular" width={180} height={80} /></DemoCard>
            <DemoCard label="Rounded"><Skeleton variant="rounded" width={180} height={80} /></DemoCard>
            <DemoCard label="Circular"><Skeleton variant="circular" width={56} height={56} /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Card Skeleton" description="Composed skeleton matching card layout.">
        <DemoBox><SkeletonCard /></DemoBox>
      </Section>

      <Section title="Table Skeleton" description="Loading placeholder for data tables.">
        <DemoBox><SkeletonTable /></DemoBox>
      </Section>

      <Section title="List Skeleton" description="Loading placeholder for list items.">
        <DemoBox><SkeletonList /></DemoBox>
      </Section>

      <Section title="Animation Control" description="Toggle pulse animation.">
        <DemoBox>
          <div className="space-y-4">
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <button role="switch" aria-checked={animated} onClick={() => setAnimated(!animated)}
                className={`w-11 h-6 rounded-full relative flex-shrink-0 transition-colors cursor-pointer ${animated ? "bg-primary" : "bg-muted"}`}>
                <span className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 left-0.5 transition-transform ${animated ? "translate-x-5" : ""}`} />
              </button>
              <span className="text-foreground" style={fontLabel}>Animated</span>
            </label>
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width={48} height={48} animate={animated} />
              <div className="space-y-2 flex-1 max-w-xs">
                <Skeleton variant="text" width="70%" animate={animated} />
                <Skeleton variant="text" width="40%" animate={animated} />
              </div>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "variant", type: '"text"|"rectangular"|"rounded"|"circular"', def: '"rectangular"', desc: "Shape variant" },
        { prop: "width", type: "string | number", def: '"100%"', desc: "Element width" },
        { prop: "height", type: "string | number", def: "auto", desc: "Element height" },
        { prop: "animate", type: "boolean", def: "true", desc: "Enable pulse animation" },
        { prop: "className", type: "string", def: "—", desc: "Additional CSS classes" },
      ]} />
    </div>
  );
}
