import React, { useState } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { DSRadio, RadioGroup } from "../../lib/components/ds-radio";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { useI18n } from "../i18n";

export function RadioShowcase() {
  const { t } = useI18n();
  const [plan, setPlan] = useState("pro");

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.radio.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.radio.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.radio.desc")}
        </p>
      </div>

      <Section title="Basic Group" description="Simple vertical radio group." code={`<RadioGroup name="color" label="Favorite Color" defaultValue="blue">
  <DSRadio value="red" label="Red" />
  <DSRadio value="blue" label="Blue" />
  <DSRadio value="green" label="Green" />
</RadioGroup>`}>
        <RadioGroup name="color" label="Favorite Color" defaultValue="blue">
          <DSRadio value="red" label="Red" />
          <DSRadio value="blue" label="Blue" />
          <DSRadio value="green" label="Green" />
          <DSRadio value="yellow" label="Yellow" />
        </RadioGroup>
      </Section>

      <Section title="Sizes" description="Three sizes for different density requirements." code={`<RadioGroup size="sm" ...>
<RadioGroup size="md" ...>
<RadioGroup size="lg" ...>`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <DemoCard label="Small">
            <RadioGroup name="sz-sm" size="sm" defaultValue="a">
              <DSRadio value="a" label="Option A" />
              <DSRadio value="b" label="Option B" />
              <DSRadio value="c" label="Option C" />
            </RadioGroup>
          </DemoCard>
          <DemoCard label="Medium">
            <RadioGroup name="sz-md" size="md" defaultValue="a">
              <DSRadio value="a" label="Option A" />
              <DSRadio value="b" label="Option B" />
              <DSRadio value="c" label="Option C" />
            </RadioGroup>
          </DemoCard>
          <DemoCard label="Large">
            <RadioGroup name="sz-lg" size="lg" defaultValue="a">
              <DSRadio value="a" label="Option A" />
              <DSRadio value="b" label="Option B" />
              <DSRadio value="c" label="Option C" />
            </RadioGroup>
          </DemoCard>
        </div>
      </Section>

      <Section title="With Descriptions" description="Radio options with secondary text for additional context." code={`<RadioGroup name="plan" label="Pricing Plan">
  <DSRadio value="free" label="Free" description="Up to 3 projects" />
  <DSRadio value="pro" label="Pro" description="Unlimited projects" />
</RadioGroup>`}>
        <div className="max-w-md">
          <RadioGroup name="plan" label="Select a Plan" value={plan} onChange={setPlan}>
            <DSRadio value="free" label="Free" description="Up to 3 projects, 1 team member, community support." />
            <DSRadio value="pro" label="Pro — $19/mo" description="Unlimited projects, 10 team members, priority support." />
            <DSRadio value="enterprise" label="Enterprise — Custom" description="Custom limits, SSO, dedicated account manager." />
          </RadioGroup>
        </div>
      </Section>

      <Section title="Horizontal Layout" description="Inline radio buttons for compact layouts." code={`<RadioGroup direction="horizontal" ...>`}>
        <RadioGroup name="layout" label="Display Mode" direction="horizontal" defaultValue="grid">
          <DSRadio value="list" label="List" />
          <DSRadio value="grid" label="Grid" />
          <DSRadio value="board" label="Board" />
          <DSRadio value="timeline" label="Timeline" />
        </RadioGroup>
      </Section>

      <Section title="Disabled" description="Non-interactive radio options." code={`<DSRadio value="locked" label="Locked" disabled />`}>
        <RadioGroup name="disabled" label="Access Level" defaultValue="read" disabled>
          <DSRadio value="read" label="Read Only" />
          <DSRadio value="write" label="Read & Write" />
          <DSRadio value="admin" label="Admin" />
        </RadioGroup>
      </Section>

      <Section title="Partially Disabled" description="Mix of enabled and disabled options." code={`<RadioGroup name="tier">
  <DSRadio value="basic" label="Basic" />
  <DSRadio value="premium" label="Premium (Coming Soon)" disabled />
</RadioGroup>`}>
        <RadioGroup name="tier" label="Subscription Tier" defaultValue="basic">
          <DSRadio value="basic" label="Basic" description="Available now" />
          <DSRadio value="standard" label="Standard" description="Available now" />
          <DSRadio value="premium" label="Premium" description="Coming soon" disabled />
        </RadioGroup>
      </Section>

      <Section title="Error State" description="Validation error on the group." code={`<RadioGroup error="Please select an option" ...>`}>
        <RadioGroup name="required" label="Preferred Contact Method" error="Please select a contact method to proceed.">
          <DSRadio value="email" label="Email" />
          <DSRadio value="phone" label="Phone" />
          <DSRadio value="chat" label="Live Chat" />
        </RadioGroup>
      </Section>

      <Section title="Card-style Selection" description="Radio options styled as selectable cards." code={`// Using radio with custom card wrappers`}>
        <RadioGroup name="cardPlan" value={plan} onChange={setPlan}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: "free", title: "Free", price: "$0", desc: "3 projects, 1 member" },
              { value: "pro", title: "Pro", price: "$19/mo", desc: "Unlimited projects, 10 members" },
              { value: "enterprise", title: "Enterprise", price: "Custom", desc: "Unlimited everything + SSO" },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`p-4 rounded-[var(--radius)] border-2 cursor-pointer transition-all ${
                  plan === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
                onClick={() => setPlan(opt.value)}
              >
                <div className="flex items-start gap-3">
                  <DSRadio value={opt.value} />
                  <div>
                    <span className="text-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>
                      {opt.title}
                    </span>
                    <span className="text-primary block" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>
                      {opt.price}
                    </span>
                    <span className="text-muted-foreground block mt-1" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>
                      {opt.desc}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </RadioGroup>
      </Section>
    </div>
  );
}