import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Link, Unlink, Heading2,
  Quote, Code, Undo, Redo, Maximize2, Minimize2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type RichTextEditorSize = "sm" | "md" | "lg";

export interface RichTextEditorToolbarItem {
  group: "format" | "list" | "align" | "link" | "block" | "history";
  items: string[];
}

export interface RichTextEditorProps {
  /** HTML content value */
  value?: string;
  /** Change handler (receives HTML string) */
  onChange?: (html: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Min height (px) */
  minHeight?: number;
  /** Max height (px, scroll beyond) */
  maxHeight?: number;
  /** Toolbar groups to show */
  toolbar?: ("format" | "list" | "align" | "link" | "block" | "history")[];
  /** Allow fullscreen toggle */
  fullscreen?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Component size */
  size?: RichTextEditorSize;
  /** Additional class name */
  className?: string;
}

// ─── Toolbar config ───────────────────────────────────────────────────────────

const TOOLBAR_GROUPS = {
  history: [
    { cmd: "undo", icon: Undo, title: "Undo" },
    { cmd: "redo", icon: Redo, title: "Redo" },
  ],
  format: [
    { cmd: "bold", icon: Bold, title: "Bold" },
    { cmd: "italic", icon: Italic, title: "Italic" },
    { cmd: "underline", icon: Underline, title: "Underline" },
    { cmd: "strikethrough", icon: Strikethrough, title: "Strikethrough" },
  ],
  list: [
    { cmd: "insertUnorderedList", icon: List, title: "Bullet list" },
    { cmd: "insertOrderedList", icon: ListOrdered, title: "Numbered list" },
  ],
  align: [
    { cmd: "justifyLeft", icon: AlignLeft, title: "Align left" },
    { cmd: "justifyCenter", icon: AlignCenter, title: "Align center" },
    { cmd: "justifyRight", icon: AlignRight, title: "Align right" },
  ],
  block: [
    { cmd: "formatBlock-h2", icon: Heading2, title: "Heading 2" },
    { cmd: "formatBlock-blockquote", icon: Quote, title: "Blockquote" },
    { cmd: "formatBlock-pre", icon: Code, title: "Code block" },
  ],
  link: [
    { cmd: "createLink", icon: Link, title: "Insert link" },
    { cmd: "unlink", icon: Unlink, title: "Remove link" },
  ],
} as const;

// ─── Styles ──────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-p)",
};

const contentStyle: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-p)",
  fontWeight: "var(--weight-p)",
  lineHeight: "1.6",
  color: "var(--foreground)",
};

// ─── RichTextEditor ───────────────────────────────────────────────────────────

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing…",
  minHeight = 160,
  maxHeight = 480,
  toolbar = ["history", "format", "list", "align", "link", "block"],
  fullscreen: allowFullscreen = true,
  disabled = false,
  readOnly = false,
  size = "md",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set());
  const [isEmpty, setIsEmpty] = useState(!value);

  // Sync external value on first mount only
  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
      setIsEmpty(false);
    }
  }, []); // eslint-disable-line

  const updateActive = useCallback(() => {
    const cmds = new Set<string>();
    ["bold", "italic", "underline", "strikethrough",
      "insertUnorderedList", "insertOrderedList",
      "justifyLeft", "justifyCenter", "justifyRight"].forEach((cmd) => {
      try {
        if (document.queryCommandState(cmd)) cmds.add(cmd);
      } catch {
        // ignore
      }
    });
    setActiveCommands(cmds);
  }, []);

  function exec(cmd: string) {
    if (disabled || readOnly) return;
    editorRef.current?.focus();

    if (cmd.startsWith("formatBlock-")) {
      const tag = cmd.replace("formatBlock-", "");
      document.execCommand("formatBlock", false, tag);
    } else if (cmd === "createLink") {
      const url = window.prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
    } else {
      document.execCommand(cmd, false);
    }
    updateActive();
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }

  function handleInput() {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText.trim();
      setIsEmpty(!text);
      onChange?.(html);
      updateActive();
    }
  }

  const sizeMinHeight: Record<RichTextEditorSize, number> = { sm: 120, md: 160, lg: 240 };
  const effectiveMinH = minHeight ?? sizeMinHeight[size];

  const wrapperCls = [
    "border border-border rounded-[var(--radius-md)] bg-card overflow-hidden transition-all",
    isFullscreen ? "fixed inset-4 z-[var(--z-modal)] flex flex-col shadow-[0_8px_48px_rgba(0,0,0,0.2)]" : "relative",
    disabled ? "opacity-60" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperCls}>
      {/* Toolbar */}
      {!readOnly && (
        <div className="flex items-center gap-0.5 flex-wrap px-2 py-1.5 border-b border-border bg-muted/10">
          {toolbar.map((groupKey, gi) => {
            const group = TOOLBAR_GROUPS[groupKey];
            return (
              <React.Fragment key={groupKey}>
                {gi > 0 && <div className="w-px h-5 bg-border mx-1" />}
                {group.map((btn) => {
                  const Icon = btn.icon;
                  const isActive = activeCommands.has(btn.cmd);
                  return (
                    <button
                      key={btn.cmd}
                      type="button"
                      title={btn.title}
                      disabled={disabled}
                      onMouseDown={(e) => { e.preventDefault(); exec(btn.cmd); }}
                      className={[
                        "w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                        disabled ? "cursor-not-allowed" : "cursor-pointer",
                      ].join(" ")}
                    >
                      <Icon size={13} />
                    </button>
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* Fullscreen toggle */}
          {allowFullscreen && (
            <>
              <div className="ml-auto w-px h-5 bg-border mx-1" />
              <button
                type="button"
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>
            </>
          )}
        </div>
      )}

      {/* Content editable area */}
      <div className="relative flex-1">
        {/* Placeholder */}
        {isEmpty && (
          <div
            className="absolute top-0 left-0 pointer-events-none p-4 text-muted-foreground"
            style={labelStyle}
          >
            {placeholder}
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateActive}
          onMouseUp={updateActive}
          className={[
            "outline-none p-4 overflow-y-auto",
            "prose-p:my-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3",
            "[&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
            "[&_pre]:bg-muted/30 [&_pre]:rounded [&_pre]:p-2 [&_pre]:text-sm",
            "[&_a]:text-primary [&_a]:underline",
            "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
            isFullscreen ? "flex-1" : "",
          ].filter(Boolean).join(" ")}
          style={{
            ...contentStyle,
            minHeight: isFullscreen ? undefined : effectiveMinH,
            maxHeight: isFullscreen ? undefined : maxHeight,
          }}
          data-placeholder={placeholder}
        />
      </div>
    </div>
  );
}

RichTextEditor.displayName = "RichTextEditor";
