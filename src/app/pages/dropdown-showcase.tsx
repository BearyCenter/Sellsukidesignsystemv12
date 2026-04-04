import { useState } from "react";
import {
  Layers,
  ChevronRight,
  User,
  Settings,
  Database,
  Shield,
  Zap,
  Info,
} from "lucide-react";
import { Dropdown, type DropdownOption } from "../../lib/components/ds-dropdown";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";

// ─── Sample Data ──────────────────────────────────────────────────────────────

const basicOptions: DropdownOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

const iconOptions: DropdownOption[] = [
  { value: "user", label: "User Management", icon: <User size={14} />, description: "Manage user accounts and permissions" },
  { value: "settings", label: "System Settings", icon: <Settings size={14} />, description: "Configure system parameters" },
  { value: "database", label: "Database", icon: <Database size={14} />, description: "Database connections and queries" },
  { value: "security", label: "Security", icon: <Shield size={14} />, description: "Security policies and audit logs" },
  { value: "performance", label: "Performance", icon: <Zap size={14} />, description: "Monitoring and optimization" },
];

const groupedOptions: DropdownOption[] = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue.js", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "django", label: "Django", group: "Backend" },
  { value: "rails", label: "Ruby on Rails", group: "Backend" },
  { value: "postgres", label: "PostgreSQL", group: "Database" },
  { value: "mongo", label: "MongoDB", group: "Database" },
  { value: "redis", label: "Redis", group: "Database", disabled: true },
];

const disabledOptions: DropdownOption[] = [
  { value: "active", label: "Active Plan" },
  { value: "pro", label: "Pro Plan" },
  { value: "enterprise", label: "Enterprise (Contact Sales)", disabled: true },
  { value: "legacy", label: "Legacy Plan (Deprecated)", disabled: true },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function DropdownShowcase() {
  const { t } = useI18n();
  const [val2, setVal2] = useState<string | string[]>([]);

  return (
    <div className="space-y-14">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.dropdown.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.dropdown.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.dropdown.desc")}
        </p>
      </div>

      {/* Migration Note */}
      <div className="rounded-[var(--radius-md)] border border-primary/30 bg-accent/50 px-5 py-4 flex gap-3">
        <div className="w-8 h-8 rounded-[var(--radius)] bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Info size={16} className="text-primary" />
        </div>
        <div>
          <span className="text-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)", marginBottom: 4 }}>
            Component Consolidation
          </span>
          <span className="text-muted-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}>
            The legacy <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>Select</code> component has been merged into <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>Dropdown</code>. Use <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>&lt;Dropdown&gt;</code> for all selection use cases. Full details in Changelog v1.4.0.
          </span>
        </div>
      </div>

      {/* Variants */}
      <Section
        title="Variants"
        description="Four visual variants to match different UI contexts."
        code={`import { Dropdown } from "./components/dropdown";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

<Dropdown options={options} variant="default" placeholder="Default variant" />
<Dropdown options={options} variant="outlined" placeholder="Outlined variant" />
<Dropdown options={options} variant="filled" placeholder="Filled variant" />
<Dropdown options={options} variant="ghost" placeholder="Ghost variant" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><Dropdown options={basicOptions} variant="default" placeholder="Default variant" /></DemoCard>
          <DemoCard label="Outlined"><Dropdown options={basicOptions} variant="outlined" placeholder="Outlined variant" /></DemoCard>
          <DemoCard label="Filled"><Dropdown options={basicOptions} variant="filled" placeholder="Filled variant" /></DemoCard>
          <DemoCard label="Ghost"><Dropdown options={basicOptions} variant="ghost" placeholder="Ghost variant" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for different density requirements."
        code={`<Dropdown options={options} size="sm" placeholder="Small" />
<Dropdown options={options} size="md" placeholder="Medium" />
<Dropdown options={options} size="lg" placeholder="Large" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DemoCard label="Small"><Dropdown options={basicOptions} size="sm" placeholder="Small dropdown" /></DemoCard>
          <DemoCard label="Medium"><Dropdown options={basicOptions} size="md" placeholder="Medium dropdown" /></DemoCard>
          <DemoCard label="Large"><Dropdown options={basicOptions} size="lg" placeholder="Large dropdown" /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Visual feedback for all interaction states."
        code={`<Dropdown options={options} label="Framework" state="error" errorMessage="This field is required" required />
<Dropdown options={options} label="Framework" state="success" successMessage="Valid selection" defaultValue="react" />
<Dropdown options={options} label="Framework" disabled defaultValue="react" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><Dropdown options={basicOptions} label="Framework" helperText="Choose your preferred framework" /></DemoCard>
          <DemoCard label="Error"><Dropdown options={basicOptions} label="Framework" state="error" errorMessage="This field is required" required /></DemoCard>
          <DemoCard label="Success"><Dropdown options={basicOptions} label="Framework" state="success" successMessage="Valid selection" defaultValue="react" /></DemoCard>
          <DemoCard label="Disabled"><Dropdown options={basicOptions} label="Framework" disabled defaultValue="react" helperText="This field is locked" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Loading State"
        description="Async data fetching indicator."
        code={`<Dropdown options={[]} loading label="Data Source" placeholder="Loading options…" />`}
      >
        <div className="max-w-sm"><Dropdown options={[]} loading label="Data Source" placeholder="Loading options…" helperText="Fetching available data sources" /></div>
      </Section>

      <Section
        title="Searchable"
        description="Built-in search to filter large option lists."
        code={`<Dropdown options={options} searchable clearable label="Module" placeholder="Search modules…" />`}
      >
        <div className="max-w-sm"><Dropdown options={iconOptions} searchable clearable label="Module" placeholder="Search modules…" helperText="Type to filter available modules" /></div>
      </Section>

      <Section
        title="Multi-select"
        description="Select multiple values with chip display and max selection limit."
        code={`const [value, setValue] = useState([]);

<Dropdown
  options={options}
  multiple searchable clearable
  maxSelections={3}
  label="Tech Stack"
  placeholder="Select up to 3 frameworks"
  value={value}
  onChange={setValue}
/>`}
      >
        <div className="max-w-md"><Dropdown options={basicOptions} multiple searchable clearable maxSelections={3} label="Tech Stack" placeholder="Select up to 3 frameworks" helperText="Choose the frameworks for your project" value={val2} onChange={setVal2} /></div>
      </Section>

      <Section
        title="Grouped Options"
        description="Organize options into semantic groups with headers."
        code={`const options = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "postgres", label: "PostgreSQL", group: "Database" },
];

<Dropdown options={options} grouped searchable clearable label="Technology" />`}
      >
        <div className="max-w-sm"><Dropdown options={groupedOptions} grouped searchable clearable label="Technology" placeholder="Select technology…" /></div>
      </Section>

      <Section
        title="Rich Options"
        description="Options with icons and secondary descriptions."
        code={`const options = [
  { value: "user", label: "User Management", icon: <User size={14} />, description: "Manage user accounts" },
];

<Dropdown options={options} clearable label="Module" />`}
      >
        <div className="max-w-sm"><Dropdown options={iconOptions} clearable label="Module" placeholder="Choose a module" /></div>
      </Section>

      <Section
        title="Disabled Options"
        description="Individual options can be disabled within the list."
        code={`const options = [
  { value: "active", label: "Active Plan" },
  { value: "enterprise", label: "Enterprise (Contact Sales)", disabled: true },
];

<Dropdown options={options} label="Plan" placeholder="Select a plan" />`}
      >
        <div className="max-w-sm"><Dropdown options={disabledOptions} label="Subscription Plan" placeholder="Select a plan" helperText="Some plans are unavailable" /></div>
      </Section>
    </div>
  );
}
