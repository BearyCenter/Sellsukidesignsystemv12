import React from "react";
import { Home, Settings, Users } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { Breadcrumb, BreadcrumbItem } from "../../lib/components/ds-breadcrumb";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

const basic: BreadcrumbItem[] = [
  { label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Widget Pro" },
];

const withIcons: BreadcrumbItem[] = [
  { label: "Home", href: "/", icon: <Home size={14} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={14} /> },
  { label: "Team", href: "/settings/team", icon: <Users size={14} /> },
  { label: "Permissions" },
];

const long: BreadcrumbItem[] = [
  { label: "Home", href: "/" }, { label: "Documents", href: "/docs" },
  { label: "Projects", href: "/docs/projects" }, { label: "2024", href: "/docs/projects/2024" },
  { label: "Q4 Reports", href: "/docs/projects/2024/q4" }, { label: "Final Review" },
];

export function BreadcrumbShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.breadcrumb.title" descKey="page.breadcrumb.desc" />

      <Section title="Basic" description="Simple breadcrumb navigation trail." code={`<SskBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />`}>
        <DemoBox><Breadcrumb items={basic} /></DemoBox>
      </Section>

      <Section title="With Icons" description="Icons alongside labels for visual clarity." code={`<SskBreadcrumb items={[{ label: "Home", icon: <Home /> }, ...]} />`}>
        <DemoBox><Breadcrumb items={withIcons} /></DemoBox>
      </Section>

      <Section title="Separators" description="Three separator styles.">
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Chevron"><Breadcrumb items={basic} separator="chevron" /></DemoCard>
            <DemoCard label="Slash"><Breadcrumb items={basic} separator="slash" /></DemoCard>
            <DemoCard label="Dot"><Breadcrumb items={basic} separator="dot" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Collapsed" description="Long paths collapse middle items with an ellipsis." code={`<SskBreadcrumb items={longPath} maxItems={3} />`}>
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Full Path"><Breadcrumb items={long} /></DemoCard>
            <DemoCard label="Collapsed (maxItems=3)"><Breadcrumb items={long} maxItems={3} /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different UI densities.">
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Small"><Breadcrumb items={basic} size="sm" /></DemoCard>
            <DemoCard label="Medium"><Breadcrumb items={basic} size="md" /></DemoCard>
            <DemoCard label="Large"><Breadcrumb items={basic} size="lg" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "items", type: "BreadcrumbItem[]", def: "[]", desc: "Array of { label, href?, icon? }" },
        { prop: "separator", type: '"chevron"|"slash"|"dot"', def: '"chevron"', desc: "Separator between items" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Text size" },
        { prop: "maxItems", type: "number", def: "—", desc: "Max visible items before collapsing" },
      ]} />
    </div>
  );
}
