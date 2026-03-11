import React from "react";
import { Inbox, Search, FileText, ShieldAlert, WifiOff, FolderOpen, Plus, Upload, ArrowRight } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── EmptyState Component ─────────────────────────────────────────────────── */

function EmptyState({
  icon, title, description, action, secondaryAction, size = "md",
}: {
  icon?: React.ReactNode; title: string; description?: string;
  action?: { label: string; onClick: () => void; icon?: React.ReactNode };
  secondaryAction?: { label: string; onClick: () => void };
  size?: "sm" | "md" | "lg";
}) {
  const iconSize = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const pad = size === "sm" ? "py-6 px-4" : size === "lg" ? "py-14 px-8" : "py-10 px-6";

  return (
    <div className={`flex flex-col items-center text-center ${pad}`}>
      {icon && (
        <div className={`${iconSize} rounded-full bg-muted flex items-center justify-center mb-4`}>
          <span className="text-muted-foreground">{icon}</span>
        </div>
      )}
      <h4 className="text-foreground">{title}</h4>
      {description && <p className="text-muted-foreground mt-1.5 max-w-sm" style={fontLabel}>{description}</p>}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-5">
          {action && (
            <button onClick={action.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
              style={btnStyle}>
              {action.icon}{action.label}
            </button>
          )}
          {secondaryAction && (
            <button onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-accent transition-colors cursor-pointer"
              style={btnStyle}>
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function EmptyStateShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.emptystate.title" descKey="page.emptystate.desc" />

      <Section title="Basic" description="Simple empty state with icon, title, and description." code={`<SskEmptyState icon={<Inbox />} title="No messages" description="You're all caught up!" />`}>
        <DemoBox>
          <EmptyState icon={<Inbox size={24} />} title="No messages" description="Your inbox is empty. New messages will appear here." />
        </DemoBox>
      </Section>

      <Section title="With Actions" description="Primary and secondary CTA buttons." code={`<SskEmptyState ... action={{ label: "Create", onClick: fn }} secondaryAction={{ label: "Learn more", onClick: fn }} />`}>
        <DemoBox>
          <EmptyState icon={<FolderOpen size={24} />} title="No projects yet"
            description="Create your first project to get started with the design system."
            action={{ label: "Create Project", onClick: () => {}, icon: <Plus size={14} /> }}
            secondaryAction={{ label: "Learn More", onClick: () => {} }} />
        </DemoBox>
      </Section>

      <Section title="Use Cases" description="Common empty state scenarios.">
        <DemoBox>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[var(--radius-lg)] border border-border bg-card">
              <EmptyState icon={<Search size={22} />} title="No results found" description='Try adjusting your search terms or filters.'
                size="sm" action={{ label: "Clear Filters", onClick: () => {} }} />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border bg-card">
              <EmptyState icon={<ShieldAlert size={22} />} title="Access Denied" description="You don't have permission to view this resource."
                size="sm" secondaryAction={{ label: "Request Access", onClick: () => {} }} />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border bg-card">
              <EmptyState icon={<WifiOff size={22} />} title="Connection Lost" description="Please check your internet and try again."
                size="sm" action={{ label: "Retry", onClick: () => {} }} />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-border bg-card">
              <EmptyState icon={<Upload size={22} />} title="Upload Files" description="Drag files here or click to browse."
                size="sm" action={{ label: "Browse", onClick: () => {}, icon: <Upload size={14} /> }} />
            </div>
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts.">
        <DemoBox>
          <div className="grid md:grid-cols-3 gap-4">
            <DemoCard label="Small">
              <div className="rounded-[var(--radius-lg)] border border-border bg-card">
                <EmptyState icon={<FileText size={18} />} title="No documents" size="sm" />
              </div>
            </DemoCard>
            <DemoCard label="Medium">
              <div className="rounded-[var(--radius-lg)] border border-border bg-card">
                <EmptyState icon={<FileText size={22} />} title="No documents" description="Upload your first document." size="md" />
              </div>
            </DemoCard>
            <DemoCard label="Large">
              <div className="rounded-[var(--radius-lg)] border border-border bg-card">
                <EmptyState icon={<FileText size={28} />} title="No documents" description="Upload your first document to get started." size="lg" />
              </div>
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "icon", type: "ReactNode", def: "—", desc: "Icon in the circle" },
        { prop: "title", type: "string", def: "—", desc: "Main heading text" },
        { prop: "description", type: "string", def: "—", desc: "Supporting description" },
        { prop: "action", type: "{ label, onClick, icon? }", def: "—", desc: "Primary CTA button" },
        { prop: "secondaryAction", type: "{ label, onClick }", def: "—", desc: "Secondary CTA button" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Overall size" },
      ]} />
    </div>
  );
}
