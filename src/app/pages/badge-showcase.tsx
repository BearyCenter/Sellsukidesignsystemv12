import React, { useState } from "react";
import { Layers, ChevronRight, Star, Zap, Bell, Check, AlertTriangle, Clock, Shield, User } from "lucide-react";
import { Badge, type BadgeVariant, type BadgeSize } from "../../lib/components/ds-badge";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { DSButton } from "../../lib/components/ds-button";
import { useI18n } from "../i18n";

const variants: BadgeVariant[] = ["default", "secondary", "outline", "destructive", "success", "warning"];

export function BadgeShowcase() {
  const { t } = useI18n();
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "Figma", "Node.js"]);

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.badge.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.badge.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.badge.desc")}
        </p>
      </div>

      <Section title="Variants" description="Six visual styles for different semantic meanings." code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="outline">Custom</Badge>`}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts." code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}>
        <div className="space-y-4">
          {(["sm", "md", "lg"] as BadgeSize[]).map((size) => (
            <DemoCard key={size} label={size.toUpperCase()}>
              {variants.map((v) => (
                <Badge key={v} variant={v} size={size}>{v}</Badge>
              ))}
            </DemoCard>
          ))}
        </div>
      </Section>

      <Section title="With Dot" description="Status dot indicator for active/inactive states." code={`<Badge variant="success" dot>Active</Badge>`}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="destructive" dot>Offline</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="default" dot>Online</Badge>
          <Badge variant="secondary" dot>Away</Badge>
        </div>
      </Section>

      <Section title="With Icons" description="Leading icons for additional context." code={`<Badge variant="default" icon={<Star size={12} />}>Featured</Badge>`}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" icon={<Star size={12} />}>Featured</Badge>
          <Badge variant="success" icon={<Check size={12} />}>Verified</Badge>
          <Badge variant="warning" icon={<AlertTriangle size={12} />}>Caution</Badge>
          <Badge variant="destructive" icon={<Zap size={12} />}>Critical</Badge>
          <Badge variant="outline" icon={<Shield size={12} />}>Secure</Badge>
          <Badge variant="secondary" icon={<Clock size={12} />}>Scheduled</Badge>
        </div>
      </Section>

      <Section title="Removable Tags" description="Dismissible badges for tag input patterns." code={`<Badge variant="outline" removable onRemove={() => {}}>React</Badge>`}>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" size="md" removable onRemove={() => setTags((t) => t.filter((x) => x !== tag))}>
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <span className="text-muted-foreground" style={fontLabel}>All tags removed. <DSButton variant="link" onClick={() => setTags(["React", "TypeScript", "Tailwind", "Figma", "Node.js"])}>Reset</DSButton></span>
          )}
        </div>
      </Section>

      <Section title="Composition" description="Badges combined with text and other elements." code={`<div className="flex items-center gap-2">
  <span>Component Name</span>
  <Badge variant="success" size="sm">Stable</Badge>
</div>`}>
        <div className="space-y-3 p-4 rounded-[var(--radius)] bg-card border border-border">
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>Dropdown</span>
            <Badge variant="success" size="sm">Stable</Badge>
            <Badge variant="default" size="sm">v1.1.0</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>Date Picker</span>
            <Badge variant="warning" size="sm">Beta</Badge>
            <Badge variant="outline" size="sm">v1.0.0</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>Rich Editor</span>
            <Badge variant="destructive" size="sm">Experimental</Badge>
          </div>
        </div>
      </Section>
    </div>
  );
}