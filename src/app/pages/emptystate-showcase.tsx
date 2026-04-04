import React from "react";
import { Inbox, Search, FileText, ShieldAlert, WifiOff, FolderOpen, Plus, Upload, ArrowRight } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable } from "./_showcase-factory";
import { EmptyState } from "../../lib/components/ds-emptystate";

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
            <div className="rounded-[var(--radius-md)] border border-border bg-card">
              <EmptyState icon={<Search size={22} />} title="No results found" description='Try adjusting your search terms or filters.'
                size="sm" action={{ label: "Clear Filters", onClick: () => {} }} />
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-card">
              <EmptyState icon={<ShieldAlert size={22} />} title="Access Denied" description="You don't have permission to view this resource."
                size="sm" secondaryAction={{ label: "Request Access", onClick: () => {} }} />
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-card">
              <EmptyState icon={<WifiOff size={22} />} title="Connection Lost" description="Please check your internet and try again."
                size="sm" action={{ label: "Retry", onClick: () => {} }} />
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-card">
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
              <div className="rounded-[var(--radius-md)] border border-border bg-card">
                <EmptyState icon={<FileText size={18} />} title="No documents" size="sm" />
              </div>
            </DemoCard>
            <DemoCard label="Medium">
              <div className="rounded-[var(--radius-md)] border border-border bg-card">
                <EmptyState icon={<FileText size={22} />} title="No documents" description="Upload your first document." size="md" />
              </div>
            </DemoCard>
            <DemoCard label="Large">
              <div className="rounded-[var(--radius-md)] border border-border bg-card">
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
