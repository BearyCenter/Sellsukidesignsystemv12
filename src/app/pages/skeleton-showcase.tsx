import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel } from "./_showcase-factory";
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonList } from "../../lib/components/ds-skeleton";
import { Switch } from "../../lib/components/ds-switch";

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
            <Switch checked={animated} onChange={setAnimated} label="Animated" />
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
