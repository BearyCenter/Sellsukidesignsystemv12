import React, { useState, createContext, useContext } from "react";

export type RadioSize = "sm" | "md" | "lg";

// Context for RadioGroup
interface RadioGroupContextValue {
  value: string;
  onChange: (v: string) => void;
  size: RadioSize;
  disabled: boolean;
  name: string;
}
const RadioGroupCtx = createContext<RadioGroupContextValue | null>(null);

interface RadioProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: RadioSize;
  className?: string;
}

const sizeConfig: Record<RadioSize, { outer: string; inner: string; labelStyle: React.CSSProperties; descStyle: React.CSSProperties }> = {
  sm: {
    outer: "w-4 h-4",
    inner: "w-1.5 h-1.5",
    labelStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
  },
  md: {
    outer: "w-5 h-5",
    inner: "w-2 h-2",
    labelStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
  },
  lg: {
    outer: "w-6 h-6",
    inner: "w-2.5 h-2.5",
    labelStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
  },
};

export function DSRadio({ value, label, description, disabled: localDisabled, size: localSize, className = "" }: RadioProps) {
  const ctx = useContext(RadioGroupCtx);
  const isSelected = ctx ? ctx.value === value : false;
  const isDisabled = localDisabled ?? ctx?.disabled ?? false;
  const sz = localSize ?? ctx?.size ?? "md";
  const s = sizeConfig[sz];

  const handleSelect = () => {
    if (isDisabled) return;
    ctx?.onChange(value);
  };

  return (
    <div className={`inline-flex items-start gap-2.5 ${isDisabled ? "opacity-50" : ""} ${className}`}>
      <button
        role="radio"
        aria-checked={isSelected}
        disabled={isDisabled}
        onClick={handleSelect}
        className={`${s.outer} flex-shrink-0 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer mt-0.5
          ${isSelected ? "border-primary" : "border-border hover:border-primary/50"}
          ${isDisabled ? "!cursor-not-allowed" : ""}
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none`}
      >
        {isSelected && <span className={`${s.inner} rounded-full bg-primary transition-transform scale-100`} />}
      </button>
      {(label || description) && (
        <div className="min-w-0">
          {label && (
            <span
              className={`text-foreground block cursor-pointer ${isDisabled ? "!cursor-not-allowed" : ""}`}
              style={s.labelStyle}
              onClick={handleSelect}
            >
              {label}
            </span>
          )}
          {description && <span className="text-muted-foreground block" style={s.descStyle}>{description}</span>}
        </div>
      )}
    </div>
  );
}

// Group
interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  size?: RadioSize;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
  error?: string;
  className?: string;
}

export function RadioGroup({
  name,
  value: controlled,
  defaultValue = "",
  onChange,
  label,
  size = "md",
  disabled = false,
  direction = "vertical",
  children,
  error,
  className = "",
}: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const val = controlled ?? internal;

  const handleChange = (v: string) => {
    if (controlled === undefined) setInternal(v);
    onChange?.(v);
  };

  return (
    <RadioGroupCtx.Provider value={{ value: val, onChange: handleChange, size, disabled, name }}>
      <fieldset className={className} role="radiogroup">
        {label && (
          <legend className="text-foreground mb-2 block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>
            {label}
          </legend>
        )}
        <div className={`flex ${direction === "vertical" ? "flex-col gap-3" : "flex-wrap gap-4"}`}>
          {children}
        </div>
        {error && (
          <span className="text-destructive block mt-1.5" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}>
            {error}
          </span>
        )}
      </fieldset>
    </RadioGroupCtx.Provider>
  );
}