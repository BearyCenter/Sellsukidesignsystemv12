import React from "react";
import { CheckCircle2, Circle, Clock, AlertTriangle, Package, Truck, MapPin, GitCommit, GitBranch, Rocket } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── Timeline Component ───────────────────────────────────────────────────── */

interface TimelineItem {
  title: string; description?: string; time?: string; icon?: React.ReactNode;
  status?: "completed" | "current" | "pending" | "error"; children?: React.ReactNode;
}

function Timeline({ items, variant = "default", size = "md" }: {
  items: TimelineItem[]; variant?: "default" | "alternate" | "compact"; size?: "sm" | "md" | "lg";
}) {
  const dotSize = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-10 h-10" : "w-8 h-8";
  const iconSz = size === "sm" ? 12 : size === "lg" ? 18 : 14;

  const statusColor = (s?: string) =>
    s === "completed" ? "bg-chart-2 text-white" :
    s === "current" ? "bg-primary text-primary-foreground" :
    s === "error" ? "bg-destructive text-white" :
    "bg-muted text-muted-foreground";

  if (variant === "compact") {
    return (
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`${dotSize} rounded-full flex items-center justify-center flex-shrink-0 ${statusColor(item.status)}`}>
                {item.icon || (item.status === "completed" ? <CheckCircle2 size={iconSz} /> : <Circle size={iconSz} />)}
              </div>
              {i < items.length - 1 && <div className="w-0.5 flex-1 min-h-4 bg-border" />}
            </div>
            <div className="pb-4 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-foreground" style={fontLabelBold}>{item.title}</span>
                {item.time && <span className="text-muted-foreground" style={smallLabel}>{item.time}</span>}
              </div>
              {item.description && <p className="text-muted-foreground mt-0.5" style={smallLabel}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {items.map((item, i) => {
        const isAlt = variant === "alternate" && i % 2 === 1;
        return (
          <div key={i} className={`flex gap-4 pb-8 last:pb-0 ${isAlt ? "flex-row-reverse" : ""}`}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`${dotSize} rounded-full flex items-center justify-center ${statusColor(item.status)}`}>
                {item.icon || (item.status === "completed" ? <CheckCircle2 size={iconSz} /> : <Circle size={iconSz} />)}
              </div>
              {i < items.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
            </div>
            <div className={`flex-1 min-w-0 ${isAlt ? "text-right" : ""}`}>
              <div className={`flex items-center gap-2 ${isAlt ? "justify-end" : ""}`}>
                <span className="text-foreground" style={fontLabelBold}>{item.title}</span>
                {item.time && <span className="text-muted-foreground" style={smallLabel}>{item.time}</span>}
              </div>
              {item.description && <p className="text-muted-foreground mt-0.5" style={fontLabel}>{item.description}</p>}
              {item.children && <div className="mt-2">{item.children}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
