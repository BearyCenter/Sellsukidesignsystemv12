import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
} from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Undo2,
  Redo2,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Maximize2,
  Minimize2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type EditorSize = "sm" | "md" | "lg";
export type EditorVariant = "default" | "outlined" | "filled" | "minimal";
export type EditorState = "default" | "error" | "success" | "warning";

export interface TextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (html: string, text: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  size?: EditorSize;
  variant?: EditorVariant;
  state?: EditorState;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minHeight?: number;
  maxHeight?: number;
  showToolbar?: boolean;
  showCharCount?: boolean;
  showWordCount?: boolean;
  required?: boolean;
  fullscreenEnabled?: boolean;
  id?: string;
  className?: string;
}

// ─── Toolbar Button ──────────────────────────────────────────────────────────

interface ToolbarBtnProps {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolbarBtn: React.FC<ToolbarBtnProps> = ({
  icon,
  title,
  active,
  disabled,
  onClick,
}) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={`p-1.5 rounded-[var(--radius-sm)] transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    } ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {icon}
  </button>
);

const Divider = () => (
  <div className="w-px h-5 bg-border mx-1 self-center" />
);

// ─── Size Config ──────────────────────────────────────────────────────────────

const editorSizeConfig: Record<
  EditorSize,
  {
    toolbar: string;
    content: string;
    contentStyle: React.CSSProperties;
    icon: number;
  }
> = {
  sm: {
    toolbar: "px-2 py-1 gap-0.5",
    content: "px-3 py-2",
    contentStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    icon: 14,
  },
  md: {
    toolbar: "px-3 py-1.5 gap-1",
    content: "px-4 py-3",
    contentStyle: { fontFamily: "var(--font-caption)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-caption)" },
    icon: 15,
  },
  lg: {
    toolbar: "px-4 py-2 gap-1",
    content: "px-5 py-4",
    contentStyle: { fontFamily: "var(--font-p)", fontSize: "var(--text-p)", fontWeight: "var(--weight-p)" },
    icon: 16,
  },
};

const editorVariantStyles: Record<EditorVariant, { base: string; focus: string }> = {
  default: {
    base: "border border-border bg-input-background rounded-[var(--radius)]",
    focus: "ring-2 ring-ring/20 border-ring",
  },
  outlined: {
    base: "border-2 border-border bg-transparent rounded-[var(--radius)]",
    focus: "ring-2 ring-ring/20 border-ring",
  },
  filled: {
    base: "border border-transparent bg-muted rounded-[var(--radius)]",
    focus: "ring-2 ring-ring/20 border-ring bg-input-background",
  },
  minimal: {
    base: "border-b border-border bg-transparent rounded-none",
    focus: "border-ring",
  },
};

const editorStateStyles: Record<EditorState, string> = {
  default: "",
  error: "!border-destructive ring-destructive/20",
  success: "!border-chart-2 ring-chart-2/20",
  warning: "!border-chart-5 ring-chart-5/20",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const TextEditor = forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      placeholder = "Start typing…",
      label,
      helperText,
      errorMessage,
      successMessage,
      size = "md",
      variant = "default",
      state = "default",
      disabled = false,
      readOnly = false,
      maxLength,
      minHeight = 120,
      maxHeight = 400,
      showToolbar = true,
      showCharCount = true,
      showWordCount = true,
      required = false,
      fullscreenEnabled = false,
      id,
      className = "",
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);

    const sc = editorSizeConfig[size];
    const vs = editorVariantStyles[variant];
    const computedState = errorMessage ? "error" : state;

    // Initialize
    useEffect(() => {
      if (editorRef.current && defaultValue && !editorRef.current.innerHTML) {
        editorRef.current.innerHTML = defaultValue;
        updateCounts();
      }
    }, []);

    // Controlled value
    useEffect(() => {
      if (value !== undefined && editorRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        updateCounts();
      }
    }, [value]);

    const updateCounts = useCallback(() => {
      if (!editorRef.current) return;
      const text = editorRef.current.innerText || "";
      setCharCount(text.replace(/\n/g, "").length);
      const words = text.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    }, []);

    const updateActiveFormats = useCallback(() => {
      const formats = new Set<string>();
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("strikeThrough")) formats.add("strikethrough");
      if (document.queryCommandState("justifyLeft")) formats.add("alignLeft");
      if (document.queryCommandState("justifyCenter")) formats.add("alignCenter");
      if (document.queryCommandState("justifyRight")) formats.add("alignRight");
      if (document.queryCommandState("justifyFull")) formats.add("alignJustify");
      if (document.queryCommandState("insertUnorderedList")) formats.add("bulletList");
      if (document.queryCommandState("insertOrderedList")) formats.add("orderedList");
      setActiveFormats(formats);
    }, []);

    const execCommand = useCallback(
      (command: string, val?: string) => {
        if (disabled || readOnly) return;
        editorRef.current?.focus();
        document.execCommand(command, false, val);
        updateActiveFormats();
        handleInput();
      },
      [disabled, readOnly]
    );

    const handleInput = useCallback(() => {
      if (!editorRef.current) return;
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText || "";

      if (maxLength && text.replace(/\n/g, "").length > maxLength) {
        return;
      }

      updateCounts();
      onChange?.(html, text);
    }, [maxLength, onChange, updateCounts]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      updateActiveFormats();
    }, [updateActiveFormats]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleKeyUp = useCallback(() => {
      updateActiveFormats();
    }, [updateActiveFormats]);

    const insertLink = useCallback(() => {
      const url = prompt("Enter URL:");
      if (url) execCommand("createLink", url);
    }, [execCommand]);

    const formatBlock = useCallback(
      (tag: string) => {
        execCommand("formatBlock", tag);
      },
      [execCommand]
    );

    const isToolbarDisabled = disabled || readOnly;

    const labelStyle: React.CSSProperties = {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-label)",
    };

    const footerStyle: React.CSSProperties = {
      fontFamily: "var(--font-button)",
      fontSize: "var(--text-button)",
      fontWeight: "var(--weight-button)",
    };

    return (
      <div
        ref={ref}
        className={`relative w-full ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-background p-6 flex flex-col"
            : ""
        } ${className}`}
        id={id}
      >
        {/* Label */}
        {label && (
          <label className="block mb-1.5 text-foreground">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        {/* Editor Container */}
        <div
          className={`transition-all duration-150 overflow-hidden flex flex-col
            ${vs.base}
            ${isFocused && !disabled ? vs.focus : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${editorStateStyles[computedState]}
            ${isFullscreen ? "flex-1" : ""}
          `}
        >
          {/* Toolbar */}
          {showToolbar && (
            <div
              className={`flex flex-wrap items-center border-b border-border ${sc.toolbar} bg-muted/30`}
            >
              <ToolbarBtn icon={<Bold size={sc.icon} />} title="Bold (Ctrl+B)" active={activeFormats.has("bold")} disabled={isToolbarDisabled} onClick={() => execCommand("bold")} />
              <ToolbarBtn icon={<Italic size={sc.icon} />} title="Italic (Ctrl+I)" active={activeFormats.has("italic")} disabled={isToolbarDisabled} onClick={() => execCommand("italic")} />
              <ToolbarBtn icon={<Underline size={sc.icon} />} title="Underline (Ctrl+U)" active={activeFormats.has("underline")} disabled={isToolbarDisabled} onClick={() => execCommand("underline")} />
              <ToolbarBtn icon={<Strikethrough size={sc.icon} />} title="Strikethrough" active={activeFormats.has("strikethrough")} disabled={isToolbarDisabled} onClick={() => execCommand("strikeThrough")} />

              <Divider />

              <ToolbarBtn icon={<Heading1 size={sc.icon} />} title="Heading 1" disabled={isToolbarDisabled} onClick={() => formatBlock("h1")} />
              <ToolbarBtn icon={<Heading2 size={sc.icon} />} title="Heading 2" disabled={isToolbarDisabled} onClick={() => formatBlock("h2")} />
              <ToolbarBtn icon={<Heading3 size={sc.icon} />} title="Heading 3" disabled={isToolbarDisabled} onClick={() => formatBlock("h3")} />
              <ToolbarBtn icon={<Type size={sc.icon} />} title="Paragraph" disabled={isToolbarDisabled} onClick={() => formatBlock("p")} />

              <Divider />

              <ToolbarBtn icon={<AlignLeft size={sc.icon} />} title="Align Left" active={activeFormats.has("alignLeft")} disabled={isToolbarDisabled} onClick={() => execCommand("justifyLeft")} />
              <ToolbarBtn icon={<AlignCenter size={sc.icon} />} title="Align Center" active={activeFormats.has("alignCenter")} disabled={isToolbarDisabled} onClick={() => execCommand("justifyCenter")} />
              <ToolbarBtn icon={<AlignRight size={sc.icon} />} title="Align Right" active={activeFormats.has("alignRight")} disabled={isToolbarDisabled} onClick={() => execCommand("justifyRight")} />
              <ToolbarBtn icon={<AlignJustify size={sc.icon} />} title="Justify" active={activeFormats.has("alignJustify")} disabled={isToolbarDisabled} onClick={() => execCommand("justifyFull")} />

              <Divider />

              <ToolbarBtn icon={<List size={sc.icon} />} title="Bullet List" active={activeFormats.has("bulletList")} disabled={isToolbarDisabled} onClick={() => execCommand("insertUnorderedList")} />
              <ToolbarBtn icon={<ListOrdered size={sc.icon} />} title="Ordered List" active={activeFormats.has("orderedList")} disabled={isToolbarDisabled} onClick={() => execCommand("insertOrderedList")} />

              <Divider />

              <ToolbarBtn icon={<Quote size={sc.icon} />} title="Blockquote" disabled={isToolbarDisabled} onClick={() => formatBlock("blockquote")} />
              <ToolbarBtn icon={<Code size={sc.icon} />} title="Code" disabled={isToolbarDisabled} onClick={() => formatBlock("pre")} />
              <ToolbarBtn icon={<Link size={sc.icon} />} title="Insert Link" disabled={isToolbarDisabled} onClick={insertLink} />
              <ToolbarBtn icon={<Minus size={sc.icon} />} title="Horizontal Rule" disabled={isToolbarDisabled} onClick={() => execCommand("insertHorizontalRule")} />

              <Divider />

              <ToolbarBtn icon={<Undo2 size={sc.icon} />} title="Undo (Ctrl+Z)" disabled={isToolbarDisabled} onClick={() => execCommand("undo")} />
              <ToolbarBtn icon={<Redo2 size={sc.icon} />} title="Redo (Ctrl+Y)" disabled={isToolbarDisabled} onClick={() => execCommand("redo")} />

              {fullscreenEnabled && (
                <>
                  <Divider />
                  <ToolbarBtn
                    icon={isFullscreen ? <Minimize2 size={sc.icon} /> : <Maximize2 size={sc.icon} />}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    disabled={disabled}
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  />
                </>
              )}
            </div>
          )}

          {/* Content Editable */}
          <div
            ref={editorRef}
            contentEditable={!disabled && !readOnly}
            suppressContentEditableWarning
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            onMouseUp={updateActiveFormats}
            data-placeholder={placeholder}
            className={`${sc.content} outline-none overflow-y-auto flex-1
              [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground [&:empty]:before:pointer-events-none
              ${disabled ? "pointer-events-none" : ""}
              ${readOnly ? "cursor-default" : ""}
              [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-2
              [&_pre]:bg-muted [&_pre]:rounded-[var(--radius-sm)] [&_pre]:p-3 [&_pre]:font-mono [&_pre]:my-2
              [&_a]:text-primary [&_a]:underline
              [&_hr]:my-3 [&_hr]:border-border
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1
            `}
            style={{
              ...sc.contentStyle,
              minHeight: isFullscreen ? undefined : minHeight,
              maxHeight: isFullscreen ? undefined : maxHeight,
            }}
          />

          {/* Footer */}
          {(showCharCount || showWordCount) && (
            <div
              className="flex items-center justify-between px-3 py-1.5 border-t border-border text-muted-foreground bg-muted/20"
              style={footerStyle}
            >
              <div className="flex gap-3">
                {showWordCount && <span>{wordCount} words</span>}
                {showCharCount && (
                  <span>
                    {charCount}
                    {maxLength ? ` / ${maxLength}` : ""} chars
                  </span>
                )}
              </div>
              {readOnly && (
                <span
                  className="px-2 py-0.5 bg-muted rounded-[var(--radius-sm)]"
                  style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
                >
                  Read Only
                </span>
              )}
            </div>
          )}
        </div>

        {/* Helper / Error */}
        {(helperText || errorMessage || successMessage) && (
          <div className="mt-1.5 flex items-center gap-1">
            {computedState === "error" && (
              <AlertCircle size={12} className="text-destructive flex-shrink-0" />
            )}
            {computedState === "success" && (
              <CheckCircle2 size={12} className="text-chart-2 flex-shrink-0" />
            )}
            <span
              className={`${
                computedState === "error"
                  ? "text-destructive"
                  : computedState === "success"
                  ? "text-chart-2"
                  : "text-muted-foreground"
              }`}
              style={labelStyle}
            >
              {errorMessage || successMessage || helperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";