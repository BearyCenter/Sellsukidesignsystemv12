import { Layers, ChevronRight } from "lucide-react";
import { TextEditor } from "../components/text-editor";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";

export function EditorShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.editor.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.editor.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.editor.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants for different form contexts."
        code={`import { TextEditor } from "./components/text-editor";

<TextEditor variant="default" label="Description" placeholder="Default…" />
<TextEditor variant="outlined" label="Description" placeholder="Outlined…" />
<TextEditor variant="filled" label="Description" placeholder="Filled…" />
<TextEditor variant="minimal" label="Description" placeholder="Minimal…" />`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Default"><TextEditor variant="default" label="Description" placeholder="Default variant editor…" helperText="Standard bordered editor" /></DemoCard>
          <DemoCard label="Outlined"><TextEditor variant="outlined" label="Description" placeholder="Outlined variant editor…" helperText="Thicker border for emphasis" /></DemoCard>
          <DemoCard label="Filled"><TextEditor variant="filled" label="Description" placeholder="Filled variant editor…" helperText="Filled background style" /></DemoCard>
          <DemoCard label="Minimal"><TextEditor variant="minimal" label="Description" placeholder="Minimal variant editor…" helperText="Bottom border only" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for compact to spacious editing."
        code={`<TextEditor size="sm" label="Note" placeholder="Compact…" minHeight={80} />
<TextEditor size="md" label="Content" placeholder="Standard…" />
<TextEditor size="lg" label="Article" placeholder="Spacious…" minHeight={160} />`}
      >
        <div className="space-y-6">
          <DemoCard label="Small"><TextEditor size="sm" label="Note" placeholder="Compact editor…" minHeight={80} /></DemoCard>
          <DemoCard label="Medium"><TextEditor size="md" label="Content" placeholder="Standard editor…" /></DemoCard>
          <DemoCard label="Large"><TextEditor size="lg" label="Article" placeholder="Spacious editor…" minHeight={160} /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Visual feedback for all validation states."
        code={`// Error
<TextEditor label="Description" state="error" errorMessage="Required" required />

// Success
<TextEditor label="Description" state="success" successMessage="Content is valid" />

// Warning
<TextEditor label="Description" state="warning" helperText="May contain issues" />`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Default"><TextEditor label="Description" placeholder="Type your description…" helperText="Provide a brief description" /></DemoCard>
          <DemoCard label="Error"><TextEditor label="Description" state="error" errorMessage="Description is required" required placeholder="This field has an error…" /></DemoCard>
          <DemoCard label="Success"><TextEditor label="Description" state="success" successMessage="Content meets all requirements" defaultValue="<p>Valid description that meets the minimum character requirement.</p>" /></DemoCard>
          <DemoCard label="Warning"><TextEditor label="Description" state="warning" helperText="Content may contain formatting issues" placeholder="Warning state…" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Disabled & Read-Only"
        description="Non-interactive states for locked content."
        code={`<TextEditor label="Locked" disabled defaultValue="<p>This editor is <strong>disabled</strong>.</p>" />

<TextEditor
  label="Published"
  readOnly
  defaultValue="<p>This content is <strong>read-only</strong>.</p>"
/>`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Disabled"><TextEditor label="Locked" disabled defaultValue="<p>This editor is <strong>disabled</strong>.</p>" helperText="This field is locked" /></DemoCard>
          <DemoCard label="Read-Only"><TextEditor label="Published" readOnly defaultValue="<p>This content is <strong>read-only</strong>.</p><ul><li>Text selection works</li><li>Copy to clipboard works</li></ul>" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Character Limit"
        description="Enforce maximum content length with visual counter."
        code={`<TextEditor
  label="Bio"
  placeholder="Write a short bio…"
  maxLength={280}
  showCharCount
  showWordCount
  required
/>`}
      >
        <div className="max-w-2xl"><TextEditor label="Bio" placeholder="Write a short bio…" maxLength={280} showCharCount showWordCount helperText="Max 280 characters" required /></div>
      </Section>

      <Section
        title="Full-featured Editor"
        description="All features enabled."
        code={`<TextEditor
  label="Article Content"
  placeholder="Write your article here…"
  size="lg"
  minHeight={200}
  maxLength={5000}
  showCharCount
  showWordCount
  fullscreenEnabled
  required
  helperText="Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline"
/>`}
      >
        <div className="max-w-3xl">
          <TextEditor label="Article Content" placeholder="Write your article here…" size="lg" minHeight={200} maxLength={5000} showCharCount showWordCount fullscreenEnabled required helperText="Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline" />
        </div>
      </Section>
    </div>
  );
}
