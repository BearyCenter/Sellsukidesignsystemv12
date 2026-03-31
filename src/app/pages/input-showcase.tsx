import {
  Layers,
  ChevronRight,
  Search,
  Mail,
  Phone,
  Globe,
  Lock,
} from "lucide-react";
import { DSInput, DSTextarea } from "../../lib/components/ds-input";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";

export function InputShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.input.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.input.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.input.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants for different form contexts."
        code={`import { DSInput } from "./components/ds-input";

<DSInput variant="default" placeholder="Default variant" label="Name" />
<DSInput variant="outlined" placeholder="Outlined variant" label="Name" />
<DSInput variant="filled" placeholder="Filled variant" label="Name" />
<DSInput variant="ghost" placeholder="Ghost variant" label="Name" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DSInput variant="default" placeholder="Default variant" label="Name" /></DemoCard>
          <DemoCard label="Outlined"><DSInput variant="outlined" placeholder="Outlined variant" label="Name" /></DemoCard>
          <DemoCard label="Filled"><DSInput variant="filled" placeholder="Filled variant" label="Name" /></DemoCard>
          <DemoCard label="Ghost"><DSInput variant="ghost" placeholder="Ghost variant" label="Name" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for different density."
        code={`<DSInput size="sm" placeholder="Small" label="Name" />
<DSInput size="md" placeholder="Medium" label="Name" />
<DSInput size="lg" placeholder="Large" label="Name" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DemoCard label="Small"><DSInput size="sm" placeholder="Small input" label="Name" /></DemoCard>
          <DemoCard label="Medium"><DSInput size="md" placeholder="Medium input" label="Name" /></DemoCard>
          <DemoCard label="Large"><DSInput size="lg" placeholder="Large input" label="Name" /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Validation and feedback states."
        code={`// Error
<DSInput label="Email" state="error" errorMessage="Invalid email address" required />

// Success
<DSInput label="Email" state="success" successMessage="Email verified" defaultValue="john@co.com" />

// Disabled
<DSInput label="Email" disabled defaultValue="locked@example.com" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DSInput label="Email" placeholder="you@example.com" helperText="We'll never share your email" /></DemoCard>
          <DemoCard label="Error"><DSInput label="Email" placeholder="you@example.com" state="error" errorMessage="Invalid email address" required /></DemoCard>
          <DemoCard label="Success"><DSInput label="Email" defaultValue="john@company.com" state="success" successMessage="Email verified" /></DemoCard>
          <DemoCard label="Disabled"><DSInput label="Email" defaultValue="locked@example.com" disabled helperText="Contact admin to change" /></DemoCard>
        </div>
      </Section>

      <Section
        title="With Icons"
        description="Left and right icon slots for visual context."
        code={`<DSInput label="Search" placeholder="Search…" leftIcon={<Search size={16} />} clearable />
<DSInput label="Email" placeholder="you@example.com" leftIcon={<Mail size={16} />} />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DSInput label="Search" placeholder="Search anything…" leftIcon={<Search size={16} />} clearable />
          <DSInput label="Email" placeholder="you@example.com" leftIcon={<Mail size={16} />} />
          <DSInput label="Phone" placeholder="+1 (555) 000-0000" leftIcon={<Phone size={16} />} />
          <DSInput label="Website" placeholder="https://example.com" leftIcon={<Globe size={16} />} clearable />
        </div>
      </Section>

      <Section
        title="Prefix & Suffix"
        description="Static text labels inside the input."
        code={`<DSInput label="Price" placeholder="0.00" prefix="$" suffix="USD" />
<DSInput label="Domain" placeholder="yoursite" prefix="https://" suffix=".com" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DSInput label="Price" placeholder="0.00" prefix="$" suffix="USD" />
          <DSInput label="Domain" placeholder="yoursite" prefix="https://" suffix=".com" />
          <DSInput label="Weight" placeholder="0" suffix="kg" />
          <DSInput label="Discount" placeholder="0" suffix="%" />
        </div>
      </Section>

      <Section
        title="Password"
        description="Password input with visibility toggle."
        code={`<DSInput
  label="Password"
  type="password"
  placeholder="Enter your password"
  showPasswordToggle
  leftIcon={<Lock size={16} />}
  helperText="Must be at least 8 characters"
/>`}
      >
        <div className="max-w-sm">
          <DSInput label="Password" type="password" placeholder="Enter your password" showPasswordToggle leftIcon={<Lock size={16} />} helperText="Must be at least 8 characters" />
        </div>
      </Section>

      <Section
        title="Clearable"
        description="One-click clear button when input has a value."
        code={`<DSInput label="Search" placeholder="Type to search…" clearable leftIcon={<Search size={16} />} />`}
      >
        <div className="max-w-sm">
          <DSInput label="Search" placeholder="Type to search…" clearable leftIcon={<Search size={16} />} helperText="Click the X to clear" />
        </div>
      </Section>

      <Section
        title="Loading"
        description="Spinner indicator for async validation."
        code={`<DSInput label="Username" placeholder="Check availability…" loading />`}
      >
        <div className="max-w-sm">
          <DSInput label="Username" placeholder="Check availability…" loading helperText="Checking username availability" />
        </div>
      </Section>

      <Section
        title="Textarea"
        description="Multi-line text input with all the same states."
        code={`import { DSTextarea } from "./components/ds-input";

<DSTextarea label="Description" placeholder="Write a description…" helperText="Describe the item" />

// With character count
<DSTextarea label="Bio" placeholder="Tell us about yourself…" showCharCount maxLength={200} />`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Default"><DSTextarea label="Description" placeholder="Write a description…" helperText="Describe the item in detail" /></DemoCard>
          <DemoCard label="With Character Count"><DSTextarea label="Bio" placeholder="Tell us about yourself…" showCharCount maxLength={200} helperText="Keep it concise" /></DemoCard>
          <DemoCard label="Error"><DSTextarea label="Notes" placeholder="Add notes…" state="error" errorMessage="This field is required" required /></DemoCard>
          <DemoCard label="Disabled"><DSTextarea label="Comments" defaultValue="This textarea is disabled and cannot be edited." disabled /></DemoCard>
        </div>
      </Section>

      <Section
        title="Textarea Variants"
        description="Same four variants as the text input."
        code={`<DSTextarea variant="default" label="Default" placeholder="Default variant…" />
<DSTextarea variant="outlined" label="Outlined" placeholder="Outlined variant…" />
<DSTextarea variant="filled" label="Filled" placeholder="Filled variant…" />
<DSTextarea variant="ghost" label="Ghost" placeholder="Ghost variant…" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DemoCard label="Default"><DSTextarea variant="default" label="Default" placeholder="Default variant…" /></DemoCard>
          <DemoCard label="Outlined"><DSTextarea variant="outlined" label="Outlined" placeholder="Outlined variant…" /></DemoCard>
          <DemoCard label="Filled"><DSTextarea variant="filled" label="Filled" placeholder="Filled variant…" /></DemoCard>
          <DemoCard label="Ghost"><DSTextarea variant="ghost" label="Ghost" placeholder="Ghost variant…" /></DemoCard>
        </div>
      </Section>
    </div>
  );
}
