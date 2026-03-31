import { useState } from "react";
import {
  Layers,
  ChevronRight,
  Plus,
  ArrowRight,
  Save,
  Trash2,
  Download,
  Send,
  Heart,
  Bell,
  Upload,
  Share2,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Mail,
  Globe,
} from "lucide-react";
import { DSButton, IconButton, ButtonGroup } from "../../lib/components/ds-button";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";

export function ButtonShowcase() {
  const { t } = useI18n();
  const [loading1, setLoading1] = useState(false);
  const simulateLoad = () => { setLoading1(true); setTimeout(() => setLoading1(false), 2000); };

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.button.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.button.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.button.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Six variants for different semantic and visual purposes."
        code={`import { DSButton } from "./components/ds-button";

<DSButton variant="primary">Primary</DSButton>
<DSButton variant="secondary">Secondary</DSButton>
<DSButton variant="outline">Outline</DSButton>
<DSButton variant="ghost">Ghost</DSButton>
<DSButton variant="destructive">Destructive</DSButton>
<DSButton variant="link">Link Button</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton variant="primary">Primary</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="outline">Outline</DSButton>
          <DSButton variant="ghost">Ghost</DSButton>
          <DSButton variant="destructive">Destructive</DSButton>
          <DSButton variant="link">Link Button</DSButton>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Four sizes from compact to prominent."
        code={`<DSButton size="sm">Small</DSButton>
<DSButton size="md">Medium</DSButton>
<DSButton size="lg">Large</DSButton>
<DSButton size="xl">Extra Large</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton size="sm">Small</DSButton>
          <DSButton size="md">Medium</DSButton>
          <DSButton size="lg">Large</DSButton>
          <DSButton size="xl">Extra Large</DSButton>
        </div>
      </Section>

      <Section
        title="With Icons"
        description="Icons can be placed on the left, right, or both sides."
        code={`<DSButton leftIcon={<Plus size={16} />}>Create New</DSButton>
<DSButton variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</DSButton>
<DSButton variant="destructive" leftIcon={<Trash2 size={16} />}>Delete</DSButton>
<DSButton variant="primary" leftIcon={<Send size={16} />} rightIcon={<ArrowRight size={16} />}>
  Send & Next
</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton leftIcon={<Plus size={16} />}>Create New</DSButton>
          <DSButton variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</DSButton>
          <DSButton variant="secondary" leftIcon={<Save size={16} />}>Save Draft</DSButton>
          <DSButton variant="destructive" leftIcon={<Trash2 size={16} />}>Delete</DSButton>
          <DSButton variant="ghost" leftIcon={<Download size={16} />}>Download</DSButton>
          <DSButton variant="primary" leftIcon={<Send size={16} />} rightIcon={<ArrowRight size={16} />}>Send & Next</DSButton>
        </div>
      </Section>

      <Section
        title="Icon Buttons"
        description="Compact square buttons with only an icon."
        code={`import { IconButton } from "./components/ds-button";

<IconButton icon={<Heart size={16} />} aria-label="Like" variant="ghost" />
<IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="outline" />
<IconButton icon={<Plus size={16} />} aria-label="Add" variant="primary" />
<IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <IconButton icon={<Heart size={16} />} aria-label="Like" variant="ghost" />
          <IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="outline" />
          <IconButton icon={<Settings size={16} />} aria-label="Settings" variant="ghost" />
          <IconButton icon={<Plus size={16} />} aria-label="Add" variant="primary" />
          <IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" />
          <IconButton icon={<Share2 size={16} />} aria-label="Share" variant="secondary" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <IconButton icon={<Plus size={12} />} aria-label="Add" variant="outline" size="sm" />
          <IconButton icon={<Plus size={16} />} aria-label="Add" variant="outline" size="md" />
          <IconButton icon={<Plus size={18} />} aria-label="Add" variant="outline" size="lg" />
          <IconButton icon={<Plus size={20} />} aria-label="Add" variant="outline" size="xl" />
        </div>
      </Section>

      <Section
        title="Loading State"
        description="Shows a spinner and optionally replaces the label."
        code={`<DSButton loading>Loading</DSButton>
<DSButton loading loadingText="Saving…" variant="secondary" />

// Interactive loading
const [loading, setLoading] = useState(false);
<DSButton
  onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
  loading={loading}
  leftIcon={<Upload size={16} />}
>
  Upload File
</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton loading>Loading</DSButton>
          <DSButton loading loadingText="Saving…" variant="secondary" />
          <DSButton loading variant="outline" />
          <DSButton onClick={simulateLoad} loading={loading1} leftIcon={<Upload size={16} />}>
            {loading1 ? "Uploading…" : "Upload File"}
          </DSButton>
        </div>
      </Section>

      <Section
        title="Disabled"
        description="Non-interactive state for all variants."
        code={`<DSButton disabled>Primary</DSButton>
<DSButton disabled variant="secondary">Secondary</DSButton>
<DSButton disabled variant="outline">Outline</DSButton>
<DSButton disabled variant="destructive">Destructive</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton disabled>Primary</DSButton>
          <DSButton disabled variant="secondary">Secondary</DSButton>
          <DSButton disabled variant="outline">Outline</DSButton>
          <DSButton disabled variant="ghost">Ghost</DSButton>
          <DSButton disabled variant="destructive">Destructive</DSButton>
          <DSButton disabled variant="link">Link</DSButton>
        </div>
      </Section>

      <Section
        title="Full Width"
        description="Button stretches to fill its container."
        code={`<DSButton fullWidth leftIcon={<Mail size={16} />}>Sign in with Email</DSButton>
<DSButton fullWidth variant="outline" leftIcon={<Globe size={16} />}>Continue with Google</DSButton>`}
      >
        <div className="max-w-md space-y-3">
          <DSButton fullWidth leftIcon={<Mail size={16} />}>Sign in with Email</DSButton>
          <DSButton fullWidth variant="outline" leftIcon={<Globe size={16} />}>Continue with Google</DSButton>
        </div>
      </Section>

      <Section
        title="Button Group"
        description="Group related actions together with connected borders."
        code={`import { ButtonGroup } from "./components/ds-button";

<ButtonGroup>
  <DSButton variant="outline">Left</DSButton>
  <DSButton variant="outline">Center</DSButton>
  <DSButton variant="outline">Right</DSButton>
</ButtonGroup>

<ButtonGroup>
  <DSButton variant="primary">Save</DSButton>
  <DSButton variant="primary" leftIcon={<ChevronRight size={14} />} />
</ButtonGroup>`}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonGroup>
            <DSButton variant="outline">Left</DSButton>
            <DSButton variant="outline">Center</DSButton>
            <DSButton variant="outline">Right</DSButton>
          </ButtonGroup>
          <ButtonGroup>
            <DSButton variant="outline" leftIcon={<AlignLeft size={14} />}>{""}</DSButton>
            <DSButton variant="outline" leftIcon={<AlignCenter size={14} />}>{""}</DSButton>
            <DSButton variant="outline" leftIcon={<AlignRight size={14} />}>{""}</DSButton>
          </ButtonGroup>
          <ButtonGroup>
            <DSButton variant="primary">Save</DSButton>
            <DSButton variant="primary" leftIcon={<ChevronRight size={14} />}>{""}</DSButton>
          </ButtonGroup>
        </div>
      </Section>
    </div>
  );
}
