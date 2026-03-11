import React, { useState, useRef } from "react";
import { Upload, X, FileText, Image, Film, File, CheckCircle2 } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── FileUpload Component ─────────────────────────────────────────────────── */

interface UploadedFile { id: string; name: string; size: number; type: string; progress: number; status: "uploading" | "done" | "error"; }

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <Image size={16} className="text-chart-2" />;
  if (type.startsWith("video/")) return <Film size={16} className="text-chart-5" />;
  if (type.includes("pdf") || type.includes("document")) return <FileText size={16} className="text-destructive" />;
  return <File size={16} className="text-muted-foreground" />;
}

function FileUpload({
  accept, maxSize, multiple, disabled, variant = "dropzone", label, description,
}: {
  accept?: string; maxSize?: number; multiple?: boolean; disabled?: boolean;
  variant?: "dropzone" | "button" | "avatar"; label?: string; description?: string;
}) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map(f => ({
      id: Math.random().toString(36).slice(2), name: f.name, size: f.size, type: f.type,
      progress: 0, status: "uploading" as const,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    // Simulate upload
    newFiles.forEach(f => {
      let prog = 0;
      const iv = setInterval(() => {
        prog += Math.random() * 30 + 10;
        if (prog >= 100) { prog = 100; clearInterval(iv); }
        setFiles(prev => prev.map(p => p.id === f.id ? { ...p, progress: Math.min(prog, 100), status: prog >= 100 ? "done" : "uploading" } : p));
      }, 300);
    });
  };

  const remove = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  if (variant === "button") {
    return (
      <div className="space-y-3">
        {label && <label className="block text-foreground" style={fontLabelBold}>{label}</label>}
        <button onClick={() => inputRef.current?.click()} disabled={disabled}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border bg-background text-foreground hover:bg-accent transition-colors cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : ""}`}
          style={btnStyle}>
          <Upload size={14} /> Choose File{multiple ? "s" : ""}
        </button>
        <input ref={inputRef} type="file" className="hidden" accept={accept} multiple={multiple} onChange={e => addFiles(e.target.files)} />
        {files.length > 0 && <FileList files={files} onRemove={remove} />}
      </div>
    );
  }

  if (variant === "avatar") {
    return (
      <div className="space-y-2">
        {label && <label className="block text-foreground" style={fontLabelBold}>{label}</label>}
        <div onClick={() => !disabled && inputRef.current?.click()}
          className={`w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors
            ${disabled ? "opacity-50 pointer-events-none" : ""} ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
          {files.length > 0 && files[files.length - 1].status === "done"
            ? <CheckCircle2 size={24} className="text-chart-2" />
            : <Upload size={20} className="text-muted-foreground" />}
        </div>
        <input ref={inputRef} type="file" className="hidden" accept={accept || "image/*"} onChange={e => addFiles(e.target.files)} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {label && <label className="block text-foreground" style={fontLabelBold}>{label}</label>}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2 px-6 py-10 rounded-[var(--radius-lg)] border-2 border-dashed transition-all cursor-pointer
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-accent/30"}`}
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload size={20} className="text-primary" />
        </div>
        <div className="text-center">
          <p className="text-foreground" style={fontLabelBold}>
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-muted-foreground" style={smallLabel}>
            {description || (accept ? `Accepted: ${accept}` : "Any file type")}
            {maxSize && ` · Max ${formatBytes(maxSize)}`}
          </p>
        </div>
      </div>
      <input ref={inputRef} type="file" className="hidden" accept={accept} multiple={multiple} onChange={e => addFiles(e.target.files)} />
      {files.length > 0 && <FileList files={files} onRemove={remove} />}
    </div>
  );
}

function FileList({ files, onRemove }: { files: UploadedFile[]; onRemove: (id: string) => void }) {
  return (
    <div className="space-y-2">
      {files.map(f => (
        <div key={f.id} className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] border border-border bg-card">
          {getFileIcon(f.type)}
          <div className="flex-1 min-w-0">
            <p className="text-foreground truncate" style={fontLabel}>{f.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground" style={smallLabel}>{formatBytes(f.size)}</span>
              {f.status === "uploading" && (
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${f.progress}%` }} />
                </div>
              )}
              {f.status === "done" && <CheckCircle2 size={12} className="text-chart-2" />}
            </div>
          </div>
          <button onClick={() => onRemove(f.id)} className="text-muted-foreground hover:text-destructive cursor-pointer"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}

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
