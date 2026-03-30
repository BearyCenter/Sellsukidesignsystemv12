import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: NumberInputSize;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const fontInput: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

const sizeMap: Record<NumberInputSize, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

const btnSizeMap: Record<NumberInputSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function NumberInput({
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  size = "md",
  label,
  placeholder,
  error,
  className = "",
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;

  const update = (next: number) => {
    const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, next));
    if (onChange) onChange(clamped);
    if (value === undefined) setInternalValue(clamped);
  };

  const canDecrement = min === undefined || current - step >= min;
  const canIncrement = max === undefined || current + step <= max;

  return (
    <div className={className}>
      {label && (
        <label className="block text-foreground mb-1.5" style={fontLabel}>
          {label}
        </label>
      )}
      <div
        className={`inline-flex items-center rounded-[var(--radius-md)] border ${
          error ? "border-destructive" : "border-border"
        } bg-background overflow-hidden ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        <button
          type="button"
          onClick={() => update(current - step)}
          disabled={disabled || !canDecrement}
          className="flex items-center justify-center px-2.5 border-r border-border text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors cursor-pointer"
          style={{ height: "100%" }}
        >
          <Minus size={btnSizeMap[size]} />
        </button>
        <input
          type="number"
          value={current}
          placeholder={placeholder}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) update(v);
          }}
          disabled={disabled}
          className={`w-20 text-center bg-transparent outline-none text-foreground ${sizeMap[size]} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
          style={fontInput}
        />
        <button
          type="button"
          onClick={() => update(current + step)}
          disabled={disabled || !canIncrement}
          className="flex items-center justify-center px-2.5 border-l border-border text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors cursor-pointer"
          style={{ height: "100%" }}
        >
          <Plus size={btnSizeMap[size]} />
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-destructive" style={smallLabel}>
          {error}
        </p>
      )}
    </div>
  );
}
