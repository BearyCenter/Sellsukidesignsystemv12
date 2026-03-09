import React, { useState } from "react";
import { Home, Package, BarChart3, Settings, Users, CreditCard, HelpCircle, ChevronDown, Bell } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { CodeBlock } from "../components/code-block";

export function SidebarShowcase() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const groups = [
    { label: "MAIN", items: [
      { id: "dashboard", label: "Dashboard", icon: <Home size={16} /> },
      { id: "products", label: "Products", icon: <Package size={16} />, badge: "12" },
      { id: "analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
      { id: "customers", label: "Customers", icon: <Users size={16} /> },
    ]},
    { label: "SETTINGS", items: [
      { id: "billing", label: "Billing", icon: <CreditCard size={16} /> },
      { id: "settings", label: "Settings", icon: <Settings size={16} /> },
      { id: "help", label: "Help & Support", icon: <HelpCircle size={16} /> },
    ]},
  ];

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.sidebarcomp.title" descKey="page.sidebarcomp.desc" />

      <Section title="Standard Sidebar" description="256px navigation sidebar with groups, active states, and badge counts.">
        <DemoBox>
          <div className="flex rounded-[var(--radius-lg)] border border-border overflow-hidden h-[420px]">
            {/* Sidebar mock */}
            <div className={`bg-sidebar border-r border-sidebar-border flex flex-col flex-shrink-0 transition-all ${collapsed ? "w-16" : "w-64"}`}>
              {/* Brand */}
              <div className="px-4 py-4 border-b border-sidebar-border flex items-center gap-2">
                <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0" style={btnStyle}>S</div>
                {!collapsed && <span className="text-sidebar-foreground truncate" style={fontLabelBold}>Sellsuki Store</span>}
              </div>
              {/* Nav */}
              <nav className="flex-1 overflow-y-auto py-3 px-2">
                {groups.map((g) => (
                  <div key={g.label} className="mb-4">
                    {!collapsed && <span className="px-2 mb-1.5 block text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.65)", fontWeight: "var(--weight-button)" }}>{g.label}</span>}
                    <div className="space-y-0.5">
                      {g.items.map((item) => {
                        const active = activeItem === item.id;
                        return (
                          <button key={item.id} onClick={() => setActiveItem(item.id)} className={`w-full flex items-center gap-2 px-2 py-2 rounded-[var(--radius-md)] transition-colors cursor-pointer ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`} style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>
                            <span className={active ? "text-sidebar-primary" : "text-muted-foreground"}>{item.icon}</span>
                            {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                            {!collapsed && (item as any).badge && <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground" style={{ ...btnStyle, fontSize: "calc(var(--text-button) * 0.72)", lineHeight: "1" }}>{(item as any).badge}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
              {/* Footer */}
              <div className="px-3 py-3 border-t border-sidebar-border">
                <button onClick={() => setCollapsed(!collapsed)} className="w-full px-2 py-1.5 rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 cursor-pointer text-left" style={smallLabel}>
                  {collapsed ? ">" : "Collapse"}
                </button>
              </div>
            </div>
            {/* Content area */}
            <div className="flex-1 bg-background p-6">
              <span className="text-foreground block" style={fontLabelBold}>Content Area</span>
              <span className="text-muted-foreground" style={fontLabel}>Active: {activeItem}</span>
            </div>
          </div>
        </DemoBox>
      </Section>

      <Section title="Wrapper Code" description="Create the React wrapper for the Lit component.">
        <CodeBlock code={`import { Sidebar } from "sellsuki-components";
import { createComponent } from "@lit-labs/react";
import React from "react";

const SskSidebar = createComponent({
  tagName: Sidebar.registeredName,
  elementClass: Sidebar,
  react: React,
  events: { onNavigate: "navigate" },
});

// Usage
<SskSidebar
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