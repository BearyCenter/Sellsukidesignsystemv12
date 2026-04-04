import React, { useState } from "react";
import { Home, Package, BarChart3, Settings, Users, CreditCard, HelpCircle } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold } from "./_showcase-factory";
import { CodeBlock } from "../components/code-block";
import { Sidebar } from "../../lib/components/ds-sidebar";

export function SidebarShowcase() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const groups = [
    { label: "Main", items: [
      { id: "dashboard", label: "Dashboard", icon: <Home size={16} /> },
      { id: "products", label: "Products", icon: <Package size={16} />, badge: "12" },
      { id: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
      { id: "customers", label: "Customers", icon: <Users size={16} /> },
    ]},
    { label: "Settings", items: [
      { id: "billing", label: "Billing", icon: <CreditCard size={16} /> },
      { id: "settings", label: "Settings", icon: <Settings size={16} /> },
      { id: "help", label: "Help & Support", icon: <HelpCircle size={16} /> },
    ]},
  ];

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.sidebarcomp.title" descKey="page.sidebarcomp.desc" />

      <Section title="Standard Sidebar" description="256px navigation sidebar with groups, collapsible group headers, active states, and badge counts.">
        <DemoBox className="p-0 overflow-hidden">
          <div className="flex rounded-[var(--radius-md)] overflow-hidden h-[420px]">
            <Sidebar
              brand={{ name: "Sellsuki Store" }}
              groups={groups}
              activeItem={activeItem}
              onNavigate={(item) => setActiveItem(item.id)}
              collapsed={collapsed}
              onCollapsedChange={setCollapsed}
              showCollapseToggle
            />
            {/* Content area */}
            <div className="flex-1 bg-background p-6">
              <span className="text-foreground block" style={fontLabelBold}>Content Area</span>
              <span className="text-muted-foreground" style={fontLabel}>Active: {activeItem}</span>
            </div>
          </div>
        </DemoBox>
      </Section>

      <Section title="Wrapper Code" description="Create the React wrapper using @uxuissk/design-system.">
        <CodeBlock code={`import { Sidebar } from "@uxuissk/design-system";

// Usage
<Sidebar
  brand={{ name: "Sellsuki", logo: "/logo.svg" }}
  groups={[
    { label: "Main", items: [
      { id: "dashboard", label: "Dashboard", icon: "home" },
      { id: "products", label: "Products", icon: "package", badge: 12 },
    ]},
  ]}
  activeItem="dashboard"
  onNavigate={(item) => router.push(item.id)}
/>`} title="Sidebar Wrapper" />
      </Section>

      <APITable rows={[
        { prop: "brand", type: "{ name: string; logo?: string }", def: "—", desc: "Brand card in header" },
        { prop: "groups", type: "SidebarGroup[]", def: "—", desc: "Navigation groups" },
        { prop: "activeItem", type: "string", def: "—", desc: "Active item ID" },
        { prop: "collapsed", type: "boolean", def: "false", desc: "Collapse to icon-only mode" },
        { prop: "onNavigate", type: "(item: SidebarItem) => void", def: "—", desc: "Navigation callback" },
        { prop: "width", type: "string", def: "256px", desc: "Sidebar width" },
      ]} />
    </div>
  );
}