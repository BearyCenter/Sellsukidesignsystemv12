import React from "react";
import { Star, Zap, Shield, Bell, Tag as TagIcon } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, btnStyle } from "./_showcase-factory";
import { Tag } from "../../lib/components/ds-tag";

export function TagShowcase() {
  const [tags, setTags] = React.useState(["React", "TypeScript", "Tailwind", "Lit", "Figma"]);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.tag.title" descKey="page.tag.desc" />

      <Section title="Color Variants" description="Six semantic color variants for different categories." code={`<SskTag color="primary">Primary</SskTag>\n<SskTag color="success">Active</SskTag>`}>
        <DemoBox>
          <div className="flex flex-wrap gap-2">
            {(["default", "primary", "success", "warning", "destructive", "info"] as const).map((c) => (
              <Tag key={c} color={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Tag>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts." code={`<SskTag size="sm">Small</SskTag>`}>
        <DemoBox>
          <div className="flex items-center gap-3">
            <Tag size="sm">Small</Tag>
            <Tag size="md">Medium</Tag>
            <Tag size="lg">Large</Tag>
          </div>
        </DemoBox>
      </Section>

      <Section title="With Icons" description="Tags can include leading icons for visual context." code={`<SskTag icon={<Star />} color="warning">Featured</SskTag>`}>
        <DemoBox>
          <div className="flex flex-wrap gap-2">
            <Tag color="warning" icon={<Star size={12} />}>Featured</Tag>
            <Tag color="primary" icon={<Zap size={12} />}>Fast</Tag>
            <Tag color="success" icon={<Shield size={12} />}>Secure</Tag>
            <Tag color="info" icon={<Bell size={12} />}>New</Tag>
            <Tag color="destructive" icon={<TagIcon size={12} />}>Deprecated</Tag>
          </div>
        </DemoBox>
      </Section>

      <Section title="Closable Tags" description="Removable tags with close button." code={`<SskTag closable onClose={() => remove(tag)}>React</SskTag>`}>
        <DemoBox>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t} color="primary" closable onClose={() => setTags((prev) => prev.filter((x) => x !== t))}>{t}</Tag>
            ))}
            {!tags.length && <span className="text-muted-foreground" style={btnStyle}>All tags removed — refresh to reset</span>}
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "children", type: "ReactNode", def: "—", desc: "Tag content" },
        { prop: "color", type: '"default" | "primary" | "success" | "warning" | "destructive" | "info"', def: '"default"', desc: "Color variant" },
        { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Tag size" },
        { prop: "icon", type: "ReactNode", def: "—", desc: "Leading icon element" },
        { prop: "closable", type: "boolean", def: "false", desc: "Show close button" },
        { prop: "onClose", type: "() => void", def: "—", desc: "Close callback" },
      ]} />
    </div>
  );
}