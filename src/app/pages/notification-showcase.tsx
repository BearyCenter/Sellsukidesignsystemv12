import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable } from "./_showcase-factory";
import { Notification, NotificationCenter } from "../../lib/components/ds-notification";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function NotificationShowcase() {
  const [show, setShow] = useState<Record<string, boolean>>({ n1: true, n2: true, n3: true, n4: true });

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.notification.title" descKey="page.notification.desc" />

      <Section title="Types" description="Four semantic notification types." code={`<SskNotification type="success" title="Saved" message="Your changes have been saved." />`}>
        <DemoBox>
          <div className="space-y-3 max-w-lg">
            {show.n1 && <Notification type="info" title="System Update" message="A new version is available. Please refresh." closable onClose={() => setShow(s => ({ ...s, n1: false }))} />}
            {show.n2 && <Notification type="success" title="Saved Successfully" message="Your profile changes have been saved." closable onClose={() => setShow(s => ({ ...s, n2: false }))} />}
            {show.n3 && <Notification type="warning" title="Storage Almost Full" message="You're using 90% of your storage quota." closable onClose={() => setShow(s => ({ ...s, n3: false }))} />}
            {show.n4 && <Notification type="error" title="Upload Failed" message="File exceeds the maximum size limit of 10MB." closable onClose={() => setShow(s => ({ ...s, n4: false }))} />}
          </div>
        </DemoBox>
      </Section>

      <Section title="With Actions" description="Actionable notification with CTA link.">
        <DemoBox>
          <div className="max-w-lg">
            <Notification type="info" title="New Feature Available"
              message="Try the new dashboard analytics with real-time data."
              action={{ label: "Try Now", onClick: () => {} }} closable={false} />
          </div>
        </DemoBox>
      </Section>

      <Section title="With Avatar" description="User-driven notifications with avatar initials.">
        <DemoBox>
          <div className="space-y-3 max-w-lg">
            <Notification type="info" title="John commented on your PR" message='"Looks great! Just one small suggestion on line 42."' avatar="JD" time="5m ago" read={false} closable={false} />
            <Notification type="success" title="Sarah approved your request" message="Budget approval for Q2 marketing campaign." avatar="SA" time="1h ago" read closable={false} />
          </div>
        </DemoBox>
      </Section>

      <Section title="Notification Center" description="Composed notification list with read/unread states.">
        <DemoBox>
          <NotificationCenter items={[
            { id: "1", type: "info", title: "New team member joined", message: "Alice joined the Design team.", time: "2m ago", read: false },
            { id: "2", type: "success", title: "Deployment successful", message: "v2.4.1 deployed to production.", time: "15m ago", read: false },
            { id: "3", type: "warning", title: "API rate limit", message: "You've used 80% of your API quota.", time: "1h ago", read: true },
            { id: "4", type: "error", title: "Build failed", message: "CI pipeline failed on main branch.", time: "3h ago", read: true },
          ]} />
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "type", type: '"info"|"success"|"warning"|"error"', def: '"info"', desc: "Notification severity" },
        { prop: "title", type: "string", def: "—", desc: "Notification heading" },
        { prop: "message", type: "string", def: "—", desc: "Body text" },
        { prop: "closable", type: "boolean", def: "true", desc: "Show close button" },
        { prop: "onClose", type: "() => void", def: "—", desc: "Close handler" },
        { prop: "action", type: "{ label, onClick }", def: "—", desc: "CTA action button" },
        { prop: "avatar", type: "string", def: "—", desc: "Avatar initials (e.g. 'JD')" },
        { prop: "time", type: "string", def: "—", desc: "Timestamp display" },
        { prop: "read", type: "boolean", def: "—", desc: "Read/unread indicator" },
      ]} />
    </div>
  );
}
