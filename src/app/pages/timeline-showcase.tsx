import React from "react";
import { AlertTriangle, Package, Truck, MapPin, GitCommit, GitBranch, Rocket, CheckCircle2 } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { Timeline, TimelineItem } from "../../lib/components/ds-timeline";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

const orderTimeline: TimelineItem[] = [
  { title: "Order Placed", description: "Order #12345 was placed successfully.", time: "Mar 1, 10:00 AM", status: "completed", icon: <Package size={14} /> },
  { title: "Processing", description: "Your order is being prepared.", time: "Mar 1, 2:30 PM", status: "completed", icon: <CheckCircle2 size={14} /> },
  { title: "Shipped", description: "Package picked up by carrier.", time: "Mar 2, 9:00 AM", status: "current", icon: <Truck size={14} /> },
  { title: "Delivered", description: "Estimated delivery by Mar 5.", status: "pending", icon: <MapPin size={14} /> },
];

const devTimeline: TimelineItem[] = [
  { title: "Project Kickoff", time: "Jan 15", status: "completed", icon: <Rocket size={14} />, description: "Requirements gathered and team assembled." },
  { title: "Design Phase", time: "Feb 1", status: "completed", icon: <GitBranch size={14} />, description: "UI/UX designs approved by stakeholders." },
  { title: "Development", time: "Mar 1", status: "current", icon: <GitCommit size={14} />, description: "Core features in progress." },
  { title: "QA Testing", time: "Apr 1", status: "pending", icon: <AlertTriangle size={14} />, description: "Comprehensive testing phase." },
  { title: "Launch", time: "May 1", status: "pending", icon: <Rocket size={14} />, description: "Production deployment." },
];

export function TimelineShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.timeline.title" descKey="page.timeline.desc" />

      <Section title="Default" description="Vertical timeline with status indicators." code={`<SskTimeline items={items} />`}>
        <DemoBox><div className="max-w-lg"><Timeline items={orderTimeline} /></div></DemoBox>
      </Section>

      <Section title="Alternate" description="Items alternate sides for visual balance." code={`<SskTimeline variant="alternate" items={items} />`}>
        <DemoBox><div className="max-w-lg mx-auto"><Timeline items={devTimeline} variant="alternate" /></div></DemoBox>
      </Section>

      <Section title="Compact" description="Minimal variant for activity feeds.">
        <DemoBox><div className="max-w-md"><Timeline items={orderTimeline} variant="compact" size="sm" /></div></DemoBox>
      </Section>

      <Section title="With Children Content" description="Rich content inside timeline items.">
        <DemoBox>
          <div className="max-w-lg">
            <Timeline items={[
              { title: "Code Review", time: "2h ago", status: "completed", icon: <GitCommit size={14} />, description: "Reviewed by 3 team members.",
                children: <div className="inline-flex gap-1">{["Alice", "Bob", "Carol"].map(n => <span key={n} className="px-2 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={smallLabel}>{n}</span>)}</div> },
              { title: "Deploy to Staging", time: "1h ago", status: "current", icon: <Rocket size={14} />, description: "Running CI/CD pipeline.",
                children: <div className="h-1.5 w-48 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: "65%" }} /></div> },
              { title: "Production Release", status: "pending", icon: <Package size={14} />, description: "Scheduled for tomorrow." },
            ]} />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "items", type: "TimelineItem[]", def: "[]", desc: "Array of timeline events" },
        { prop: "variant", type: '"default"|"alternate"|"compact"', def: '"default"', desc: "Layout variant" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Dot and icon size" },
        { prop: "items[].title", type: "string", def: "—", desc: "Event title" },
        { prop: "items[].status", type: '"completed"|"current"|"pending"|"error"', def: '"pending"', desc: "Status indicator" },
        { prop: "items[].icon", type: "ReactNode", def: "—", desc: "Custom dot icon" },
        { prop: "items[].children", type: "ReactNode", def: "—", desc: "Extra content below description" },
      ]} />
    </div>
  );
}
