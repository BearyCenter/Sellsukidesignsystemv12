import React, { useState } from "react";
import { X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TagInputVariant = "default" | "outline" | "filled";

export interface TagInputProps {
  /** Array of tag values */
  tags: string[];
  /** Callback when tags change */
  onChange: (tags: string[]) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Disable input */
  disabled?: boolean;
  /** Maximum number of tags */
  maxTags?: number;
  /** Visual variant */
  variant?: TagInputVariant;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const variantClasses: Record<TagInputVariant, string> = {
  default: "bg-card border-border",
  outline: "bg-transparent border-border",
  filled: "bg-muted/30 border-transparent",
};

// ─── TagInput ────────────────────────────────────────────────────────────────

export function TagInput({
  tags,
  onChange,
  placeholder,
  disabled,
  maxTags,
  variant = "default",
  className = "",
}: TagInputProps) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (!v || tags.includes(v) || (maxTags && tags.length >= maxTags)) return;
    onChange([...tags, v]);
    setInput("");
  };

  const remove = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-[var(--radius)] border ${variantClasses[variant]} transition-colors focus-within:border-primary ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
    >
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm)] bg-primary/10 text-primary"
          style={btnStyle}
        >
          {t}
          <button
            className="hover:text-destructive cursor-pointer"
            onClick={() => remove(t)}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
          if (e.key === "Backspace" && !input && tags.length) {
            onChange(tags.slice(0, -1));
          }
        }}
        placeholder={!tags.length ? placeholder : ""}
        className="flex-1 min-w-[80px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        style={fontLabel}
        disabled={disabled}
      />
    </div>
  );
}

TagInput.displayName = "TagInput";
