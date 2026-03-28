import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { FormField, FormLabel, FormError, FormHelperText } from "../../lib/components/ds-form";
import { DSInput, DSTextarea } from "../../lib/components/ds-input";
import { DSButton } from "../../lib/components/ds-button";

export function FormShowcase() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameError = submitted && !name ? "Name is required" : undefined;
  const emailError = submitted && !email ? "Email is required" : submitted && !email.includes("@") ? "Invalid email address" : undefined;

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.form.title" descKey="page.form.desc" />

      <Section title="FormField" description="Wraps any input with label, helper text, and error message in a consistent layout." code={`<FormField name="email" label="Email" required error={error} helperText="We'll never share your email.">
  <DSInput type="email" placeholder="you@example.com" />
</FormField>`}>
        <DemoBox>
          <div className="max-w-md space-y-4">
            <FormField name="name" label="Full Name" required helperText="Your legal name as it appears on your ID.">
              <DSInput placeholder="Somsak Jaidee" />
            </FormField>
            <FormField name="email" label="Email Address" required helperText="Used for login and notifications.">
              <DSInput type="email" placeholder="somsak@sellsuki.co.th" />
            </FormField>
            <FormField name="bio" label="Bio" helperText="Optional. Up to 200 characters.">
              <DSTextarea placeholder="Tell us about yourself..." rows={3} />
            </FormField>
          </div>
        </DemoBox>
      </Section>

      <Section title="Validation States" description="Error and success messages from FormField." code={`<FormField name="email" label="Email" error="Invalid email address.">
  <DSInput value={email} state="error" />
</FormField>
<FormField name="phone" label="Phone" successMessage="Number verified.">
  <DSInput value="+66 81 234 5678" state="success" />
</FormField>`}>
        <DemoBox>
          <div className="max-w-md space-y-4">
            <FormField name="email-err" label="Email" required error="Please enter a valid email address.">
              <DSInput type="email" defaultValue="invalid-email" state="error" />
            </FormField>
            <FormField name="phone-ok" label="Phone Number" successMessage="Phone number verified.">
              <DSInput defaultValue="+66 81 234 5678" state="success" />
            </FormField>
          </div>
        </DemoBox>
      </Section>

      <Section title="Horizontal Layout" description="Label on the left side for dense forms." code={`<FormField name="name" label="Name" layout="horizontal" labelWidth="120px">
  <DSInput />
</FormField>`}>
        <DemoBox>
          <div className="max-w-lg space-y-3">
            <FormField name="h-name" label="Full Name" layout="horizontal" labelWidth="140px" required>
              <DSInput placeholder="Somsak Jaidee" />
            </FormField>
            <FormField name="h-email" label="Email" layout="horizontal" labelWidth="140px" helperText="Login email">
              <DSInput type="email" placeholder="somsak@sellsuki.co.th" />
            </FormField>
            <FormField name="h-status" label="Store Status" layout="horizontal" labelWidth="140px">
              <DSInput defaultValue="Active" />
            </FormField>
          </div>
        </DemoBox>
      </Section>

      <Section title="Primitive Components" description="Use FormLabel, FormError, FormHelperText directly for custom layouts." code={`<FormLabel htmlFor="custom" required>Custom Label</FormLabel>
<DSInput id="custom" />
<FormError message="Required field" />
<FormHelperText>Hint text below</FormHelperText>`}>
        <DemoBox>
          <div className="max-w-md space-y-2">
            <FormLabel htmlFor="custom-field" required>Custom Field Label</FormLabel>
            <DSInput id="custom-field" placeholder="Enter value..." />
            <FormError message="This field is required." />
            <FormHelperText>You can also combine these primitives freely in custom layouts.</FormHelperText>
          </div>
        </DemoBox>
      </Section>

      <Section title="Live Validation" description="Error messages shown on submit." code={`const [submitted, setSubmitted] = useState(false);
const error = submitted && !name ? "Name is required" : undefined;

<FormField name="name" label="Name" error={error}>
  <DSInput value={name} onChange={e => setName(e.target.value)} />
</FormField>`}>
        <DemoBox>
          <div className="max-w-md space-y-4">
            <FormField name="lv-name" label="Full Name" required error={nameError}>
              <DSInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                state={nameError ? "error" : undefined}
              />
            </FormField>
            <FormField name="lv-email" label="Email" required error={emailError}>
              <DSInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                state={emailError ? "error" : undefined}
              />
            </FormField>
            <FormField name="lv-note" label="Note" helperText="Optional">
              <DSTextarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Additional notes..." />
            </FormField>
            <div className="flex gap-2">
              <DSButton onClick={() => setSubmitted(true)}>Submit</DSButton>
              <DSButton variant="outline" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setNote(""); }}>Reset</DSButton>
            </div>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "name", type: "string", def: "—", desc: "Field name (for htmlFor on label)" },
        { prop: "label", type: "string", def: "—", desc: "Label text" },
        { prop: "required", type: "boolean", def: "false", desc: "Adds asterisk to label" },
        { prop: "error", type: "string", def: "—", desc: "Error message (red text + icon)" },
        { prop: "successMessage", type: "string", def: "—", desc: "Success message (green text + icon)" },
        { prop: "helperText", type: "string", def: "—", desc: "Helper/description text" },
        { prop: "layout", type: '"vertical" | "horizontal"', def: '"vertical"', desc: "Field layout direction" },
        { prop: "labelWidth", type: "string", def: '"160px"', desc: "Label width in horizontal layout" },
        { prop: "children", type: "ReactNode", def: "—", desc: "Input component" },
      ]} />
    </div>
  );
}
