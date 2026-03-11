import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X, Bell, BellOff, ExternalLink } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── Notification Component ───────────────────────────────────────────────── */

function Notification({
  type = "info", title, message, closable = true, onClose, action, avatar, time, read,
}: {
  type?: "info" | "success" | "warning" | "error"; title: string; message?: string;
  closable?: boolean; onClose?: () => void; action?: { label: string; onClick: () => void };
  avatar?: string; time?: string; read?: boolean;
}) {
  const icons: Record<string, React.ReactNode> = {
    info: <Info size={16} className="text-primary" />,
    success: <CheckCircle2 size={16} className="text-chart-2" />,
    warning: <AlertTriangle size={16} className="text-chart-5" />,
    error: <XCircle size={16} className="text-destructive" />,
  };
  const border: Record<string, string> = {
    info: "border-l-primary", success: "border-l-chart-2", warning: "border-l-chart-5", error: "border-l-destructive",
  };

  return (
    <div className={`flex gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-border bg-card border-l-[3px] ${border[type]} ${read === false ? "bg-primary/5" : ""}`}>
      {avatar ? (
        <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden" style={fontLabelBold}>
          <span className="text-primary">{avatar.slice(0, 2).toUpperCase()}</span>
        </div>
      ) : (
        <span className="flex-shrink-0 mt-0.5">{icons[type]}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className="text-foreground" style={fontLabelBold}>{title}</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {time && <span className="text-muted-foreground" style={smallLabel}>{time}</span>}
            {read === false && <span className="w-2 h-2 rounded-full bg-primary" />}
            {closable && onClose && (
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer"><X size={14} /></button>
            )}
          </div>
        </div>
        {message && <p className="text-muted-foreground mt-0.5" style={fontLabel}>{message}</p>}
        {action && (
          <button onClick={action.onClick} className="inline-flex items-center gap-1 text-primary mt-2 hover:underline cursor-pointer" style={btnStyle}>
            {action.label} <ExternalLink size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

function NotificationCenter({ items }: { items: { id: string; type: "info" | "success" | "warning" | "error"; title: string; message?: string; time: string; read: boolean }[] }) {
  const [notifications, setNotifications] = useState(items);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-md rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-foreground" />
          <span className="text-foreground" style={fontLabelBold}>Notifications</span>
          {unread > 0 && <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>{unread}</span>}
        </div>
        {unread > 0 && (
          <button onClick={() => setNotifications(n => n.map(i => ({ ...i, read: true })))}
            className="text-primary cursor-pointer" style={btnStyle}>Mark all read</button>
        )}
      </div>
      <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
        {notifications.map(n => (
          <div key={n.id} className={`px-3 py-2 ${!n.read ? "bg-primary/5" : ""}`}>
            <Notification type={n.type} title={n.title} message={n.message} time={n.time} read={n.read} closable={false} />
          </div>
        ))}
      </div>
      {notifications.length === 0 && (
        <div className="py-10 text-center text-muted-foreground">
          <BellOff size={24} className="mx-auto mb-2 opacity-40" />
          <span style={fontLabel}>No notifications</span>
        </div>
      )}
    </div>
  );
}

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
