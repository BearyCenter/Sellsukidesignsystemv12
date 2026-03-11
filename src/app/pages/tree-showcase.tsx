import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, FileCode, Image, File } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";

/* ─── Tree Component ───────────────────────────────────────────────────────── */

interface TreeNode { id: string; label: string; icon?: React.ReactNode; children?: TreeNode[]; disabled?: boolean; }

function TreeItem({
  node, level, expanded, selected, onToggle, onSelect, selectable, showLines,
}: {
  node: TreeNode; level: number; expanded: Set<string>; selected: Set<string>;
  onToggle: (id: string) => void; onSelect: (id: string) => void; selectable?: boolean; showLines?: boolean;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);

  const defaultIcon = hasChildren
    ? (isExpanded ? <FolderOpen size={14} className="text-chart-5" /> : <Folder size={14} className="text-chart-5" />)
    : <File size={14} className="text-muted-foreground" />;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-1 px-2 rounded-[var(--radius-sm)] transition-colors
          ${node.disabled ? "opacity-40 pointer-events-none" : "cursor-pointer hover:bg-accent"}
          ${isSelected ? "bg-primary/10 text-primary" : "text-foreground"}`}
        style={{ paddingLeft: `${level * 20 + 8}px`, ...fontLabel }}
        onClick={() => { if (hasChildren) onToggle(node.id); if (selectable) onSelect(node.id); }}
      >
        {hasChildren ? (
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        ) : (
          <span className="w-4" />
        )}
        {selectable && (
          <span className={`w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-primary border-primary" : "border-border"}`}>
            {isSelected && <span className="w-2 h-2 rounded-[1px] bg-primary-foreground" />}
          </span>
        )}
        <span className="flex-shrink-0">{node.icon || defaultIcon}</span>
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className={showLines ? "border-l border-border ml-[22px]" : ""}>
          {node.children!.map(child => (
            <TreeItem key={child.id} node={child} level={level + 1} expanded={expanded} selected={selected}
              onToggle={onToggle} onSelect={onSelect} selectable={selectable} showLines={showLines} />
          ))}
        </div>
      )}
    </div>
  );
}

function Tree({ data, selectable, showLines, defaultExpanded }: {
  data: TreeNode[]; selectable?: boolean; showLines?: boolean; defaultExpanded?: string[];
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded || []));
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => setExpanded(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const select = (id: string) => setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card py-1">
      {data.map(node => (
        <TreeItem key={node.id} node={node} level={0} expanded={expanded} selected={selected}
          onToggle={toggle} onSelect={select} selectable={selectable} showLines={showLines} />
      ))}
    </div>
  );
}

/* ─── Sample Data ──────────────────────────────────────────────────────────── */

const fileTree: TreeNode[] = [
  { id: "src", label: "src", children: [
    { id: "app", label: "app", children: [
      { id: "app.tsx", label: "App.tsx", icon: <FileCode size={14} className="text-primary" /> },
      { id: "i18n.tsx", label: "i18n.tsx", icon: <FileCode size={14} className="text-primary" /> },
      { id: "components", label: "components", children: [
        { id: "button.tsx", label: "button.tsx", icon: <FileCode size={14} className="text-primary" /> },
        { id: "input.tsx", label: "input.tsx", icon: <FileCode size={14} className="text-primary" /> },
      ]},
      { id: "pages", label: "pages", children: [
        { id: "home.tsx", label: "home.tsx", icon: <FileCode size={14} className="text-primary" /> },
        { id: "about.tsx", label: "about.tsx", icon: <FileCode size={14} className="text-primary" /> },
      ]},
    ]},
    { id: "styles", label: "styles", children: [
      { id: "theme.css", label: "theme.css", icon: <FileText size={14} className="text-chart-5" /> },
      { id: "global.css", label: "global.css", icon: <FileText size={14} className="text-chart-5" /> },
    ]},
    { id: "assets", label: "assets", children: [
      { id: "logo.png", label: "logo.png", icon: <Image size={14} className="text-chart-2" /> },
    ]},
  ]},
  { id: "package", label: "package.json", icon: <FileText size={14} className="text-chart-2" /> },
  { id: "readme", label: "README.md", icon: <FileText size={14} className="text-muted-foreground" /> },
];

export function TreeShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.tree.title" descKey="page.tree.desc" />

      <Section title="Basic" description="Expandable file/folder tree." code={`<SskTree data={treeData} />`}>
        <DemoBox><div className="max-w-sm"><Tree data={fileTree} defaultExpanded={["src", "app"]} /></div></DemoBox>
      </Section>

      <Section title="With Lines" description="Connecting lines for visual hierarchy." code={`<SskTree showLines data={treeData} />`}>
        <DemoBox><div className="max-w-sm"><Tree data={fileTree} showLines defaultExpanded={["src", "app", "components"]} /></div></DemoBox>
      </Section>

      <Section title="Selectable" description="Checkbox selection for tree nodes." code={`<SskTree selectable data={treeData} />`}>
        <DemoBox><div className="max-w-sm"><Tree data={fileTree} selectable defaultExpanded={["src", "app"]} /></div></DemoBox>
      </Section>

      <APITable rows={[
        { prop: "data", type: "TreeNode[]", def: "[]", desc: "Tree data structure" },
        { prop: "selectable", type: "boolean", def: "false", desc: "Enable checkbox selection" },
        { prop: "showLines", type: "boolean", def: "false", desc: "Show connecting lines" },
        { prop: "defaultExpanded", type: "string[]", def: "[]", desc: "Initially expanded node IDs" },
        { prop: "TreeNode.id", type: "string", def: "—", desc: "Unique node identifier" },
        { prop: "TreeNode.label", type: "string", def: "—", desc: "Display label" },
        { prop: "TreeNode.icon", type: "ReactNode", def: "auto", desc: "Custom icon (defaults to folder/file)" },
        { prop: "TreeNode.children", type: "TreeNode[]", def: "—", desc: "Child nodes" },
      ]} />
    </div>
  );
}
