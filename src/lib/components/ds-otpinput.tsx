import React, { useState, useRef, useCallback } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type OTPInputSize = "sm" | "md" | "lg";

export interface OTPInputProps {
  /** Number of OTP digits */
  length?: number;
  /** Controlled value */
  value?: string;
  /** Called when the OTP value changes */
  onChange?: (value: string) => void;
  /** Called when all digits are filled */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  size?: OTPInputSize;
  label?: string;
  /** Mask input (show dots instead of digits) */
  masked?: boolean;
  className?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

const sizeStyles: Record<OTPInputSize, string> = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled,
  error,
  size = "md",
  label,
  masked,
  className = "",
}: OTPInputProps) {
  const [internalValue, setInternalValue] = useState(() => "".padEnd(length, ""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const current = value ?? internalValue;
  const digits = current.padEnd(length, "").split("").slice(0, length);

  const updateValue = useCallback(
    (newValue: string) => {
      if (onChange) onChange(newValue);
      if (value === undefined) setInternalValue(newValue);
      if (newValue.replace(/ /g, "").length === length && onComplete) {
        onComplete(newValue);
      }
    },
    [onChange, onComplete, value, length]
  );

  const handleInput = (index: number, char: string) => {
    if (!/^\d$/.test(char)) return;
    const arr = digits.slice();
    arr[index] = char;
    const newVal = arr.join("");
    updateValue(newVal);
    // Move to next
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const arr = digits.slice();
      if (arr[index] !== " " && arr[index] !== "") {
        arr[index] = " ";
        updateValue(arr.join(""));
      } else if (index > 0) {
        arr[index - 1] = " ";
        updateValue(arr.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      updateValue(pasted.padEnd(length, " "));
      const focusIdx = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIdx]?.focus();
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-foreground mb-2" style={fontLabel}>
          {label}
        </label>
      )}
      <div className="flex gap-2" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type={masked ? "password" : "text"}
            inputMode="numeric"
            maxLength={1}
            value={digit === " " ? "" : digit}
            disabled={disabled}
            onChange={(e) => {
              const val = e.target.value;
              if (val) handleInput(i, val[val.length - 1]);
            }}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            className={`${sizeStyles[size]} text-center rounded-[var(--radius-md)] border outline-none transition-all
              ${error ? "border-destructive focus:ring-2 focus:ring-destructive/30" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"}
              ${disabled ? "opacity-50 pointer-events-none bg-muted" : "bg-background"}
              text-foreground`}
            style={{ fontFamily: "var(--font-button)", fontWeight: "var(--weight-button)" }}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-destructive" style={smallLabel}>
          {error}
        </p>
      )}
    </div>
  );
}
