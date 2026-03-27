import React from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel } from "./_showcase-factory";
import { Avatar, AvatarGroup } from "../../lib/components/ds-avatar";

export function AvatarShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.avatar.title" descKey="page.avatar.desc" />

      <Section title="Sizes" description="Five sizes for different UI contexts." code={`<SskAvatar name="John Doe" size="md" />`}>
        <DemoBox>
          <div className="flex items-end gap-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <DemoCard key={s} label={s}><Avatar name="Sellsuki Team" size={s} /></DemoCard>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Initials" description="Fallback to initials when no image is provided." code={`<SskAvatar name="Jane Doe" />`}>
        <DemoBox>
          <div className="flex gap-3">
            <Avatar name="Anan Suwan" size="lg" />
            <Avatar name="Bua Kaew" size="lg" />
            <Avatar name="Chai Pruk" size="lg" />
            <Avatar name="Dao Rung" size="lg" />
            <Avatar name="Fah Sai" size="lg" />
          </div>
        </DemoBox>
      </Section>

      <Section title="Status Indicators" description="Show online, offline, busy, or away status." code={`<SskAvatar name="John" status="online" />`}>
        <DemoBox>
          <div className="flex gap-4">
            {(["online", "offline", "busy", "away"] as const).map((s) => (
              <DemoCard key={s} label={s}><Avatar name={s.charAt(0).toUpperCase() + s.slice(1)} size="lg" status={s} /></DemoCard>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Avatar Group" description="Stack avatars with overlap and overflow counter." code={`<AvatarGroup max={4}>{users.map(u => <SskAvatar ... />)}</AvatarGroup>`}>
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="max={4}">
              <AvatarGroup max={4}>
                <Avatar name="Alice Kim" />
                <Avatar name="Bob Chen" />
                <Avatar name="Carol Wu" />
                <Avatar name="Dan Lee" />
                <Avatar name="Eve Tan" />
                <Avatar name="Fay Lin" />
              </AvatarGroup>
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "src", type: "string", def: "—", desc: "Image URL" },
        { prop: "name", type: "string", def: "—", desc: "Full name (for initials fallback)" },
        { prop: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', def: '"md"', desc: "Avatar size" },
        { prop: "status", type: '"online" | "offline" | "busy" | "away"', def: "—", desc: "Status indicator" },
      ]} />
    </div>
  );
}