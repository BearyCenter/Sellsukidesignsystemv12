import React from "react";
import { FileText, FileCode, Image } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable } from "./_showcase-factory";
import { Tree, type TreeNode } from "../../lib/components/ds-tree";

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
