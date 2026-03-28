import React from "react";
import { ChevronRight, Bell, Search, User, Menu, Settings, LogOut, HelpCircle } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { DSButton } from "../../lib/components/ds-button";
import { CodeBlock } from "../components/code-block";
import SSKIcon from "../../imports/Icon";

export function TopNavbarShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.topnavbar.title" descKey="page.topnavbar.desc" />

      <Section title="Standard Navbar" description="72px topbar with brand, breadcrumbs, search, notifications, and user menu.">
        <DemoBox className="!p-0 overflow-hidden">
          <div className="h-[72px] bg-card border-b border-border flex items-center px-5 gap-4">
            {/* Mobile menu */}
            <button className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-muted/30 transition-colors cursor-pointer"><Menu size={16} /></button>
            {/* Brand */}
            <div className="w-8 h-8 rounded-[var(--radius-sm)] overflow-hidden flex-shrink-0"><SSKIcon /></div>
            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1.5 text-muted-foreground" style={btnStyle}>
              <span className="hover:text-foreground cursor-pointer">Home</span>
              <ChevronRight size={12} />
              <span className="hover:text-foreground cursor-pointer">Products</span>
              <ChevronRight size={12} />
              <span className="text-foreground">SKU-001</span>
            </nav>
            {/* Spacer */}
            <div className="flex-1" />
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-3 h-8 rounded-[var(--radius)] border border-border bg-muted/20 text-muted-foreground w-56 cursor-pointer hover:border-primary/40 transition-colors">
              <Search size={14} />
              <span style={btnStyle}>Search... (Ctrl+K)</span>
            </div>
            {/* Notifications */}
            <button className="relative w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer" style={btnStyle}>AS</div>
          </div>
        </DemoBox>
      </Section>

      <Section title="Minimal Variant" description="Simplified navbar for focused workflows.">
        <DemoBox className="!p-0 overflow-hidden">
          <div className="h-[56px] bg-card border-b border-border flex items-center px-5 gap-3">
            <span className="text-foreground" style={fontLabelBold}>New Product</span>
            <div className="flex-1" />
            <DSButton variant="outline" size="sm">Cancel</DSButton>
            <DSButton size="sm">Save</DSButton>
          </div>
        </DemoBox>
      </Section>

      <Section title="Wrapper Code" description="Create the React wrapper using @uxuissk/design-system.">
        <CodeBlock code={`import { TopNavbar } from "@uxuissk/design-system";

// Usage
<TopNavbar
  brand={{ logo: "/logo.svg", name: "Sellsuki" }}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "SKU-001" },
  ]}
  actions={<NotificationBell />}
  user={{ name: "Anan S.", avatar: "/avatar.jpg" }}
/>`} title="TopNavbar Wrapper" />
      </Section>

      <APITable rows={[
        { prop: "brand", type: "{ logo?: string; name: string }", def: "—", desc: "Brand logo and name" },
        { prop: "breadcrumbs", type: "{ label: string; href?: string }[]", def: "—", desc: "Breadcrumb items" },
        { prop: "actions", type: "ReactNode", def: "—", desc: "Right-side action area" },
        { prop: "user", type: "{ name: string; avatar?: string }", def: "—", desc: "User avatar" },
        { prop: "height", type: "string", def: "72px", desc: "Navbar height" },
        { prop: "showSearch", type: "boolean", def: "false", desc: "Show search bar" },
      ]} />
    </div>
  );
}