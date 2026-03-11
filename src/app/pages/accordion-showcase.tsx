import React, { useState } from "react";
import { ChevronDown, Settings, Shield, Zap, CreditCard } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";

function AccordionItem({ title, children, open, onToggle, icon }: { title: string; children: React.ReactNode; open: boolean; onToggle: () => void; icon?: React.ReactNode }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/20 transition-colors cursor-pointer">
        {icon && <span className="text-primary flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-foreground" style={fontLabelBold}>{title}</span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 text-muted-foreground" style={fontLabel}>{children}</div>
      </div>
    </div>
  );
}

export function AccordionShowcase() {
  const [single, setSingle] = useState<string | null>("item-1");
  const [multi, setMulti] = useState<Set<string>>(new Set(["m-1"]));

  const toggleSingle = (id: string) => setSingle((prev) => prev === id ? null : id);
  const toggleMulti = (id: string) => setMulti((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.accordion.title" descKey="page.accordion.desc" />

      <Section title="Single Expand" description="Only one panel open at a time." code={`<SskAccordion type="single">\n  <SskAccordionItem title="Section 1">Content</SskAccordionItem>\n</SskAccordion>`}>
        <DemoBox>
          <div className="rounded-[var(--radius)] border border-border overflow-hidden max-w-lg">
            <AccordionItem title="What is Sellsuki Design System?" open={single === "item-1"} onToggle={() => toggleSingle("item-1")}>
              Sellsuki Design System (SSK DSS) is a comprehensive set of Web Components built with Lit, wrapped for React via @uxuissk/design-system. It provides consistent UI patterns across all Sellsuki products.
            </AccordionItem>
            <AccordionItem title="How do I install it?" open={single === "item-2"} onToggle={() => toggleSingle("item-2")}>
              Run <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted/50 text-primary">npm install @uxuissk/design-system</code> and wrap your app with SskThemeProvider.
            </AccordionItem>
            <AccordionItem title="Can I customize the theme?" open={single === "item-3"} onToggle={() => toggleSingle("item-3")}>
              Yes! All components use CSS custom properties. Update the variables in your theme.css to restyle the entire system without changing any component code.
            </AccordionItem>
          </div>
        </DemoBox>
      </Section>

      <Section title="Multi Expand" description="Multiple panels can be open simultaneously." code={`<SskAccordion type="multiple">\n  <SskAccordionItem>...</SskAccordionItem>\n</SskAccordion>`}>
        <DemoBox>
          <div className="rounded-[var(--radius)] border border-border overflow-hidden max-w-lg">
            <AccordionItem title="General Settings" icon={<Settings size={16} />} open={multi.has("m-1")} onToggle={() => toggleMulti("m-1")}>
              Configure application name, language, timezone, and default currency for your Sellsuki store.
            </AccordionItem>
            <AccordionItem title="Security" icon={<Shield size={16} />} open={multi.has("m-2")} onToggle={() => toggleMulti("m-2")}>
              Two-factor authentication, session management, API key rotation, and IP whitelisting options.
            </AccordionItem>
            <AccordionItem title="Performance" icon={<Zap size={16} />} open={multi.has("m-3")} onToggle={() => toggleMulti("m-3")}>
              CDN configuration, image optimization, lazy loading settings, and cache TTL management.
            </AccordionItem>
            <AccordionItem title="Billing" icon={<CreditCard size={16} />} open={multi.has("m-4")} onToggle={() => toggleMulti("m-4")}>
              Payment methods, invoice history, subscription plan details, and usage analytics.
            </AccordionItem>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "type", type: '"single" | "multiple"', def: '"single"', desc: "Expand behavior" },
        { prop: "defaultOpen", type: "string | string[]", def: "—", desc: "Initially open item(s)" },
        { prop: "children", type: "AccordionItem[]", def: "—", desc: "Accordion items" },
        { prop: "title", type: "string", def: "—", desc: "Item header text" },
        { prop: "icon", type: "ReactNode", def: "—", desc: "Leading icon" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable item" },
      ]} />
    </div>
  );
}