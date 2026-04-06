import React, { useState, useRef, useEffect } from "react";
import { Check, Minus } from "lucide-react";

export type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: CheckboxSize;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
}

const sizeConfig: Record<CheckboxSize, { box: string; icon: number; labelStyle: React.CSSProperties; descStyle: React.CSSProperties }> = {
  sm: {
    box: "w-4 h-4",
    icon: 10,
    labelStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
  },
  md: {
    box: "w-5 h-5",
    icon: 12,
    labelStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
  },
  lg: {
    box: "w-6 h-6",
    icon: 14,
    labelStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
  },
};

export function DSCheckbox({
  checked: controlledChecked,
  indeterminate = false,
  defaultChecked = false,
  onChange,
  label,
  description,
  size = "md",
  disabled = false,
  error,
  className = "",
  id: propId,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked ?? internalChecked;
  const s = sizeConfig[size];
  const uid = propId ?? `cb-${React.useId()}`;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  };

  const isActive = isChecked || indeterminate;

  return (
    <div className={`inline-flex items-start gap-2.5 ${disabled ? "opacity-50" : ""} ${className}`}>
      <button
        id={uid}
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={`${s.box} flex-shrink-0 rounded-[var(--radius-sm)] border-2 transition-all flex items-center justify-center cursor-pointer mt-0.5
          ${isActive
            ? "bg-primary border-primary text-primary-foreground"
            : error
              ? "border-destructive bg-card"
              : "border-border bg-card hover:border-primary/50"
          }
          ${disabled ? "!cursor-not-allowed" : ""}
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none`}
      >
        {indeterminate ? <Minus size={s.icon} strokeWidth={3} /> : isChecked ? <Check size={s.icon} strokeWidth={3} /> : null}
      </button>
      {(label || description) && (
        <div className="min-w-0">
          {label && (
            <label
              htmlFor={uid}
              className={`text-foreground block cursor-pointer ${disabled ? "!cursor-not-allowed" : ""}`}
              style={s.labelStyle}
              onClick={handleToggle}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-muted-foreground block" style={s.descStyle}>{description}</span>
          )}
          {error && (
            <span className="text-destructive block mt-0.5" style={s.descStyle}>{error}</span>
          )}
        </div>
      )}
    </div>
  );
}

// Group
interface CheckboxGroupProps {
  label?: string;
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function CheckboxGroup({ label, children, direction = "vertical", className = "" }: CheckboxGroupProps) {
  return (
    <fieldset className={`${className}`}>
      {label && (
        <legend className="text-foreground mb-2 block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>
          {label}
        </legend>
      )}
      <div className={`flex ${direction === "vertical" ? "flex-col gap-3" : "flex-wrap gap-4"}`}>
        {children}
      </div>
    </fieldset>
  );
}