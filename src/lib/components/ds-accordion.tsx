import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  /** Header text */
  title: string;
  /** Content to display when expanded */
  children: React.ReactNode;
  /** Whether this item is open */
  open: boolean;
  /** Toggle callback */
  onToggle: () => void;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Disable interaction for this item */
  disabled?: boolean;
}

export type AccordionType = "single" | "multiple";

export interface AccordionProps {
  /** Expand behavior */
  type?: AccordionType;
  /** Item definitions */
  items: { id: string; title: string; content: React.ReactNode; icon?: React.ReactNode; disabled?: boolean }[];
  /** Initially open item(s) */
  defaultOpen?: string | string[];
  /** Controlled open state (for single: string | null, for multiple: string[]) */
  value?: string | null | string[];
  /** Change callback */
  onChange?: (value: string | null | string[]) => void;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

// ─── AccordionItem ───────────────────────────────────────────────────────────

export function AccordionItem({ title, children, open, onToggle, icon, disabled = false }: AccordionItemProps) {
  return (
    <div className={`border-b border-border last:border-b-0 ${disabled ? "opacity-50" : ""}`}>
      <button
        onClick={disabled ? undefined : onToggle}
        disabled={disabled}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${disabled ? "cursor-not-allowed" : "hover:bg-muted/20 cursor-pointer"}`}
      >
        {icon && <span className="text-primary flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-foreground" style={fontLabelBold}>{title}</span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 pb-4 text-muted-foreground" style={fontLabel}>{children}</div>
      </div>
    </div>
  );
}

// ─── Accordion (managed) ─────────────────────────────────────────────────────

export function Accordion({
  type = "single",
  items,
  defaultOpen,
  value,
  onChange,
  className = "",
}: AccordionProps) {
  // Internal state for uncontrolled usage
  const [internalSingle, setInternalSingle] = useState<string | null>(
    typeof defaultOpen === "string" ? defaultOpen : null
  );
  const [internalMultiple, setInternalMultiple] = useState<Set<string>>(
    Array.isArray(defaultOpen) ? new Set(defaultOpen) : new Set()
  );

  const isControlled = value !== undefined;

  const isOpen = (id: string): boolean => {
    if (isControlled) {
      if (type === "single") return value === id;
      return Array.isArray(value) && value.includes(id);
    }
    if (type === "single") return internalSingle === id;
    return internalMultiple.has(id);
  };

  const toggle = (id: string) => {
    if (type === "single") {
      const next = (isControlled ? value === id : internalSingle === id) ? null : id;
      if (!isControlled) setInternalSingle(next);
      onChange?.(next);
    } else {
      if (isControlled) {
        const arr = Array.isArray(value) ? value : [];
        const next = arr.includes(id) ? arr.filter((v) => v !== id) : [...arr, id];
        onChange?.(next);
      } else {
        setInternalMultiple((prev) => {
          const n = new Set(prev);
          n.has(id) ? n.delete(id) : n.add(id);
          return n;
        });
      }
    }
  };

  return (
    <div className={`rounded-[var(--radius)] border border-border overflow-hidden ${className}`}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          open={isOpen(item.id)}
          onToggle={() => toggle(item.id)}
          icon={item.icon}
          disabled={item.disabled}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
