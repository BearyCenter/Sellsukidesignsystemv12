import React, { useState } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { DSCheckbox, CheckboxGroup } from "../../lib/components/ds-checkbox";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { useI18n } from "../i18n";

export function CheckboxShowcase() {
  const { t } = useI18n();
  const [features, setFeatures] = useState<Record<string, boolean>>({
    notifications: true,
    darkMode: false,
    analytics: true,
    newsletter: false,
  });

  const allChecked = Object.values(features).every(Boolean);
  const someChecked = Object.values(features).some(Boolean) && !allChecked;

  const toggleAll = (checked: boolean) => {
    const next = { ...features };
    for (const key of Object.keys(next)) next[key] = checked;
    setFeatures(next);
  };

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.checkbox.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.checkbox.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.checkbox.desc")}
        </p>
      </div>

      <Section title="Basic States" description="Unchecked, checked, and indeterminate." code={`<DSCheckbox label="Unchecked" />
<DSCheckbox label="Checked" defaultChecked />
<DSCheckbox label="Indeterminate" indeterminate />`}>
        <div className="flex flex-wrap gap-6">
          <DSCheckbox label="Unchecked" />
          <DSCheckbox label="Checked" defaultChecked />
          <DSCheckbox label="Indeterminate" indeterminate />
        </div>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts." code={`<DSCheckbox size="sm" label="Small" />
<DSCheckbox size="md" label="Medium" />
<DSCheckbox size="lg" label="Large" />`}>
        <div className="flex flex-wrap gap-6">
          <DSCheckbox size="sm" label="Small checkbox" defaultChecked />
          <DSCheckbox size="md" label="Medium checkbox" defaultChecked />
          <DSCheckbox size="lg" label="Large checkbox" defaultChecked />
        </div>
      </Section>

      <Section title="With Description" description="Label and helper text for context." code={`<DSCheckbox
  label="Marketing Emails"
  description="Receive updates about new features and promotions."
/>`}>
        <div className="space-y-4 max-w-md">
          <DSCheckbox label="Marketing Emails" description="Receive updates about new features and promotions." defaultChecked />
          <DSCheckbox label="Security Alerts" description="Get notified about suspicious account activity." defaultChecked />
          <DSCheckbox label="Product Updates" description="Stay informed about new releases and improvements." />
        </div>
      </Section>

      <Section title="Disabled" description="Non-interactive state." code={`<DSCheckbox label="Disabled unchecked" disabled />
<DSCheckbox label="Disabled checked" disabled defaultChecked />`}>
        <div className="flex flex-wrap gap-6">
          <DSCheckbox label="Disabled unchecked" disabled />
          <DSCheckbox label="Disabled checked" disabled defaultChecked />
        </div>
      </Section>

      <Section title="Error State" description="Validation error display." code={`<DSCheckbox label="Terms" error="You must accept the terms" />`}>
        <DSCheckbox label="I agree to the Terms of Service and Privacy Policy" error="You must accept the terms to continue." />
      </Section>

      <Section title="Checkbox Group" description="Group with vertical/horizontal layout." code={`<CheckboxGroup label="Features" direction="vertical">
  <DSCheckbox label="Option A" />
  <DSCheckbox label="Option B" />
</CheckboxGroup>`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <DemoCard label="Vertical Group">
            <CheckboxGroup label="Notification Preferences" direction="vertical">
              <DSCheckbox label="Email notifications" defaultChecked />
              <DSCheckbox label="Push notifications" />
              <DSCheckbox label="SMS notifications" />
              <DSCheckbox label="In-app notifications" defaultChecked />
            </CheckboxGroup>
          </DemoCard>
          <DemoCard label="Horizontal Group">
            <CheckboxGroup label="Themes" direction="horizontal">
              <DSCheckbox label="Light" defaultChecked />
              <DSCheckbox label="Dark" />
              <DSCheckbox label="System" />
            </CheckboxGroup>
          </DemoCard>
        </div>
      </Section>

      <Section title="Select All / Indeterminate" description="Parent checkbox with indeterminate state for partial selection." code={`<DSCheckbox
  label="Select All"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={toggleAll}
/>`}>
        <div className="max-w-sm p-4 rounded-[var(--radius)] bg-card border border-border space-y-3">
          <DSCheckbox
            label="Select All Features"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          <div className="ml-6 space-y-2 border-l-2 border-border pl-4">
            <DSCheckbox
              label="Push Notifications"
              checked={features.notifications}
              onChange={(c) => setFeatures((p) => ({ ...p, notifications: c }))}
            />
            <DSCheckbox
              label="Dark Mode"
              checked={features.darkMode}
              onChange={(c) => setFeatures((p) => ({ ...p, darkMode: c }))}
            />
            <DSCheckbox
              label="Analytics"
              checked={features.analytics}
              onChange={(c) => setFeatures((p) => ({ ...p, analytics: c }))}
            />
            <DSCheckbox
              label="Newsletter"
              checked={features.newsletter}
              onChange={(c) => setFeatures((p) => ({ ...p, newsletter: c }))}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}