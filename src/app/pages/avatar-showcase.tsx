import React from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, btnStyle } from "./_showcase-factory";

const colors = ["bg-primary", "bg-chart-2", "bg-chart-5", "bg-destructive", "bg-secondary"];

function Avatar({ src, name, size = "md", status }: { src?: string; name?: string; size?: "xs" | "sm" | "md" | "lg" | "xl"; status?: "online" | "offline" | "busy" | "away" }) {
  const sizeMap = {
    xs: { box: "w-6 h-6", font: { fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.7)", fontWeight: "var(--weight-button)" } as React.CSSProperties },
    sm: { box: "w-8 h-8", font: { fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.78)", fontWeight: "var(--weight-button)" } as React.CSSProperties },
    md: { box: "w-10 h-10", font: { fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.92)", fontWeight: "var(--weight-button)" } as React.CSSProperties },
    lg: { box: "w-14 h-14", font: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" } as React.CSSProperties },
    xl: { box: "w-20 h-20", font: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" } as React.CSSProperties },
  };
  const s = sizeMap[size];
  const statusSizes = { xs: "w-2 h-2", sm: "w-2.5 h-2.5", md: "w-3 h-3", lg: "w-3.5 h-3.5", xl: "w-4 h-4" };
  const statusColors = { online: "bg-chart-2", offline: "bg-secondary", busy: "bg-destructive", away: "bg-chart-5" };
  const initials = name ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const bgColor = name ? colors[name.length % colors.length] : "bg-muted";

  return (
    <div className="relative inline-flex">
      {src ? (
        <img src={src} alt={name || "avatar"} className={`${s.box} rounded-full object-cover border-2 border-card`} />
      ) : (
        <div className={`${s.box} rounded-full ${bgColor} text-white flex items-center justify-center border-2 border-card`} style={s.font}>{initials}</div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-card`} />
      )}
    </div>
  );
}

function AvatarGroup({ children, max }: { children: React.ReactNode; max?: number }) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const extra = max && items.length > max ? items.length - max : 0;
  return (
    <div className="flex -space-x-2">
      {visible.map((child, i) => <div key={i} className="relative" style={{ zIndex: visible.length - i }}>{child}</div>)}
      {extra > 0 && (
        <div className="relative w-10 h-10 rounded-full bg-muted text-foreground flex items-center justify-center border-2 border-card" style={{ ...btnStyle, zIndex: 0 }}>+{extra}</div>
      )}
    </div>
  );
}

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