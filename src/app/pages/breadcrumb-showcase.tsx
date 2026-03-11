import React from "react";
import { Home, ChevronRight, Slash, Dot, MoreHorizontal, FileText, Settings, Users, FolderOpen } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── Breadcrumb Component ─────────────────────────────────────────────────── */

interface BreadcrumbItem { label: string; href?: string; icon?: React.ReactNode; }

function Breadcrumb({
  items, separator = "chevron", size = "md", maxItems, collapsed,
}: {
  items: BreadcrumbItem[]; separator?: "chevron" | "slash" | "dot";
  size?: "sm" | "md" | "lg"; maxItems?: number; collapsed?: boolean;
}) {
  const sep = separator === "slash" ? <Slash size={12} className="text-muted-foreground" />
    : separator === "dot" ? <Dot size={16} className="text-muted-foreground" />
    : <ChevronRight size={12} className="text-muted-foreground" />;

  const pad = size === "sm" ? "gap-1" : size === "lg" ? "gap-2.5" : "gap-1.5";
  const textStyle: React.CSSProperties = size === "sm"
    ? { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }
    : size === "lg"
    ? { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }
    : fontLabel;

  let displayItems = items;
  if (maxItems && items.length > maxItems) {
    const first = items.slice(0, 1);
    const last = items.slice(-(maxItems - 1));
    displayItems = [...first, { label: "…" }, ...last];
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex items-center flex-wrap ${pad}`}>
        {displayItems.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="mx-0.5">{sep}</span>}
            {item.label === "…" ? (
              <span className="w-6 h-6 flex items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-accent cursor-pointer">
                <MoreHorizontal size={14} />
              </span>
            ) : i === displayItems.length - 1 ? (
              <span className="inline-flex items-center gap-1.5 text-foreground" style={{ ...textStyle, fontWeight: "var(--weight-button)" }}>
                {item.icon}{item.label}
              </span>
            ) : (
              <a href={item.href || "#"} onClick={e => e.preventDefault()}
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                style={textStyle}>
                {item.icon}{item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

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
