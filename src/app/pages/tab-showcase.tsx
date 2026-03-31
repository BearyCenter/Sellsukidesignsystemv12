import React from "react";
import { Layers, ChevronRight, Home, Settings, User, Bell, Mail, Star } from "lucide-react";
import { Tabs, type TabItem } from "../../lib/components/ds-tabs";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { useI18n } from "../i18n";

const basicTabs: TabItem[] = [
  { id: "overview", label: "Overview", content: <div className="p-4 rounded-[var(--radius)] bg-muted/20 border border-border" style={fontLabel}><span className="text-foreground">Overview content goes here.</span></div> },
  { id: "analytics", label: "Analytics", content: <div className="p-4 rounded-[var(--radius)] bg-muted/20 border border-border" style={fontLabel}><span className="text-foreground">Analytics dashboard content.</span></div> },
  { id: "reports", label: "Reports", content: <div className="p-4 rounded-[var(--radius)] bg-muted/20 border border-border" style={fontLabel}><span className="text-foreground">Reports content area.</span></div> },
  { id: "settings", label: "Settings", content: <div className="p-4 rounded-[var(--radius)] bg-muted/20 border border-border" style={fontLabel}><span className="text-foreground">Settings panel content.</span></div> },
];

const iconTabs: TabItem[] = [
  { id: "home", label: "Home", icon: <Home size={14} /> },
  { id: "profile", label: "Profile", icon: <User size={14} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={14} />, badge: 5 },
  { id: "messages", label: "Messages", icon: <Mail size={14} />, badge: 12 },
  { id: "favorites", label: "Favorites", icon: <Star size={14} /> },
];

const disabledTabs: TabItem[] = [
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "locked", label: "Locked", disabled: true },
  { id: "archived", label: "Archived", disabled: true },
];

export function TabShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.tabs.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.tabs.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.tabs.desc")}
        </p>
      </div>

      <Section title="Variants" description="Four visual styles for different UI contexts." code={`<Tabs tabs={tabs} variant="default" />
<Tabs tabs={tabs} variant="bordered" />
<Tabs tabs={tabs} variant="pills" />
<Tabs tabs={tabs} variant="underline" />`}>
        <div className="space-y-8">
          <DemoCard label="Default (Underline Indicator)">
            <Tabs tabs={basicTabs} variant="default" />
          </DemoCard>
          <DemoCard label="Bordered (Segmented)">
            <Tabs tabs={basicTabs} variant="bordered" />
          </DemoCard>
          <DemoCard label="Pills">
            <Tabs tabs={basicTabs} variant="pills" />
          </DemoCard>
          <DemoCard label="Underline">
            <Tabs tabs={basicTabs} variant="underline" />
          </DemoCard>
        </div>
      </Section>

      <Section title="Sizes" description="Three sizes for different density requirements." code={`<Tabs tabs={tabs} size="sm" />
<Tabs tabs={tabs} size="md" />
<Tabs tabs={tabs} size="lg" />`}>
        <div className="space-y-6">
          <DemoCard label="Small"><Tabs tabs={basicTabs} variant="pills" size="sm" /></DemoCard>
          <DemoCard label="Medium"><Tabs tabs={basicTabs} variant="pills" size="md" /></DemoCard>
          <DemoCard label="Large"><Tabs tabs={basicTabs} variant="pills" size="lg" /></DemoCard>
        </div>
      </Section>

      <Section title="With Icons & Badges" description="Tabs with leading icons and notification counts." code={`<Tabs tabs={[
  { id: "home", label: "Home", icon: <Home size={14} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={14} />, badge: 5 },
]} />`}>
        <div className="space-y-6">
          <DemoCard label="Default with Icons">
            <Tabs tabs={iconTabs} variant="default" />
          </DemoCard>
          <DemoCard label="Pills with Icons">
            <Tabs tabs={iconTabs} variant="pills" />
          </DemoCard>
        </div>
      </Section>

      <Section title="Disabled Tabs" description="Individual tabs can be disabled." code={`<Tabs tabs={[
  { id: "active", label: "Active" },
  { id: "locked", label: "Locked", disabled: true },
]} />`}>
        <div className="space-y-6">
          <DemoCard label="Default"><Tabs tabs={disabledTabs} variant="default" /></DemoCard>
          <DemoCard label="Pills"><Tabs tabs={disabledTabs} variant="pills" /></DemoCard>
        </div>
      </Section>

      <Section title="Full Width" description="Tabs that stretch to fill the container." code={`<Tabs tabs={tabs} fullWidth />`}>
        <Tabs tabs={basicTabs} variant="bordered" fullWidth />
      </Section>
    </div>
  );
}