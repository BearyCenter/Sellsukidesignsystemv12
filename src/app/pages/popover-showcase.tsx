import React, { useState, useRef, useEffect } from "react";
import { Settings, HelpCircle, Info, Bell, X, ChevronDown } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── Popover Component ────────────────────────────────────────────────────── */

function Popover({
  trigger, children, placement = "bottom", title, open: controlled, onOpenChange,
}: {
  trigger: React.ReactNode; children: React.ReactNode; placement?: "top" | "bottom" | "left" | "right";
  title?: string; open?: boolean; onOpenChange?: (v: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlled !== undefined ? controlled : internalOpen;
  const setOpen = (v: boolean) => { onOpenChange?.(v); if (controlled === undefined) setInternalOpen(v); };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [isOpen]);

  const posMap: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!isOpen)} className="cursor-pointer">{trigger}</div>
      {isOpen && (
        <div className={`absolute z-50 ${posMap[placement]} w-max max-w-xs`}>
          <div className="rounded-[var(--radius-lg)] border border-border bg-card shadow-lg overflow-hidden">
            {title && (
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                <span className="text-foreground" style={fontLabelBold}>{title}</span>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground cursor-pointer"><X size={14} /></button>
              </div>
            )}
            <div className="px-4 py-3">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function PopoverShowcase() {
  const [controlled, setControlled] = useState(false);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.popover.title" descKey="page.popover.desc" />

      <Section title="Basic" description="Click-triggered floating content panel." code={`<SskPopover trigger={<button>Open</button>}>\n  <p>Content here</p>\n</SskPopover>`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <Popover trigger={
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle}>
                <Info size={14} /> Click me
              </button>
            }>
              <p className="text-foreground" style={fontLabel}>This is popover content. It can contain any elements.</p>
            </Popover>
          </div>
        </DemoBox>
      </Section>

      <Section title="With Title" description="Popover with header bar and close button." code={`<SskPopover title="Settings" trigger={...}>...</SskPopover>`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <Popover title="Notification Settings" trigger={
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-accent cursor-pointer" style={btnStyle}>
                <Bell size={14} /> Preferences
              </button>
            }>
              <div className="space-y-3 w-56">
                {["Email alerts", "Push notifications", "SMS alerts"].map((item, i) => (
                  <label key={i} className="flex items-center justify-between cursor-pointer">
                    <span className="text-foreground" style={fontLabel}>{item}</span>
                    <span className={`w-8 h-4.5 rounded-full relative flex-shrink-0 transition-colors ${i < 2 ? "bg-primary" : "bg-muted"}`}>
                      <span className="rounded-full bg-white shadow-sm absolute"
                        style={{ width: 14, height: 14, top: "50%", transform: `translateY(-50%) translateX(${i < 2 ? 14 : 2}px)`, left: 0 }} />
                    </span>
                  </label>
                ))}
              </div>
            </Popover>
          </div>
        </DemoBox>
      </Section>

      <Section title="Placement" description="Four placement positions.">
        <DemoBox>
          <div className="flex flex-wrap items-center justify-center gap-4 py-12">
            {(["top", "bottom", "left", "right"] as const).map(p => (
              <Popover key={p} placement={p} trigger={
                <button className="px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-accent cursor-pointer" style={btnStyle}>{p}</button>
              }>
                <p className="text-foreground whitespace-nowrap" style={smallLabel}>Placed {p}</p>
              </Popover>
            ))}
          </div>
        </DemoBox>
      </Section>

      <Section title="Rich Content" description="Form elements inside a popover.">
        <DemoBox>
          <div className="flex justify-center py-4">
            <Popover title="Quick Feedback" trigger={
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-accent cursor-pointer" style={btnStyle}>
                <HelpCircle size={14} /> Feedback
              </button>
            }>
              <div className="space-y-3 w-64">
                <div>
                  <label className="block text-foreground mb-1" style={fontLabelBold}>Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} className="w-8 h-8 rounded-[var(--radius-sm)] border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer" style={btnStyle}>{n}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-foreground mb-1" style={fontLabelBold}>Comment</label>
                  <textarea rows={2} className="w-full px-3 py-2 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" style={fontLabel} placeholder="Your feedback…" />
                </div>
                <button className="w-full px-3 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle}>Submit</button>
              </div>
            </Popover>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "trigger", type: "ReactNode", def: "—", desc: "Element that triggers the popover" },
        { prop: "children", type: "ReactNode", def: "—", desc: "Popover content" },
        { prop: "title", type: "string", def: "—", desc: "Header title with close button" },
        { prop: "placement", type: '"top"|"bottom"|"left"|"right"', def: '"bottom"', desc: "Position relative to trigger" },
        { prop: "open", type: "boolean", def: "—", desc: "Controlled open state" },
        { prop: "onOpenChange", type: "(v: boolean) => void", def: "—", desc: "Open state change handler" },
      ]} />
    </div>
  );
}
