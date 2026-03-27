import React from "react";
import { Upload, X, FileText, Image, Film, File, CheckCircle2 } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { FileUpload } from "../../lib/components/ds-fileupload";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function FileUploadShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.fileupload.title" descKey="page.fileupload.desc" />

      <Section title="Dropzone" description="Drag & drop area with file list and progress." code={`<SskFileUpload variant="dropzone" multiple label="Upload files" />`}>
        <DemoBox><FileUpload variant="dropzone" multiple label="Attachments" description="PNG, JPG, PDF up to 10MB" /></DemoBox>
      </Section>

      <Section title="Button Variant" description="Simple button trigger." code={`<SskFileUpload variant="button" />`}>
        <DemoBox><FileUpload variant="button" multiple label="Documents" accept=".pdf,.doc,.docx" /></DemoBox>
      </Section>

      <Section title="Avatar Upload" description="Circular upload zone for profile pictures." code={`<SskFileUpload variant="avatar" />`}>
        <DemoBox><FileUpload variant="avatar" label="Profile Photo" accept="image/*" /></DemoBox>
      </Section>

      <Section title="Disabled" description="Non-interactive state.">
        <DemoBox><FileUpload variant="dropzone" disabled label="Disabled Upload" /></DemoBox>
      </Section>

      <APITable rows={[
        { prop: "variant", type: '"dropzone"|"button"|"avatar"', def: '"dropzone"', desc: "Upload UI variant" },
        { prop: "accept", type: "string", def: "—", desc: "Accepted file types (MIME)" },
        { prop: "maxSize", type: "number", def: "—", desc: "Max file size in bytes" },
        { prop: "multiple", type: "boolean", def: "false", desc: "Allow multiple files" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable interaction" },
        { prop: "label", type: "string", def: "—", desc: "Label text above" },
        { prop: "description", type: "string", def: "—", desc: "Descriptive text in dropzone" },
      ]} />
    </div>
  );
}
