import React, { useState, forwardRef, useCallback } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "outlined" | "filled" | "ghost";
export type InputState = "default" | "error" | "success" | "warning";

export interface DSInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  /** Show character count below input (requires maxLength) */
  showCount?: boolean;
  onClear?: () => void;
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface DSTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, ""> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  size?: InputSize;
  variant?: InputVariant;
  state?: InputState;
  showCharCount?: boolean;
  maxLength?: number;
  required?: boolean;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const inputSizeConfig: Record<
  InputSize,
  {
    wrapper: string;
    textStyle: React.CSSProperties;
    icon: number;
  }
> = {
  sm: {
    wrapper: "h-9 px-2.5 gap-1.5",
    textStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    icon: 14,
  },
  md: {
    wrapper: "h-11 px-3 gap-2",
    textStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    icon: 16,
  },
  lg: {
    wrapper: "h-13 px-4 gap-2.5",
    textStyle: { fontFamily: "var(--font-p)", fontSize: "var(--text-p)", fontWeight: "var(--weight-p)" },
    icon: 18,
  },
};

const inputVariantStyles: Record<InputVariant, { base: string; hover: string; focus: string }> = {
  default: {
    base: "border border-border bg-input-background",
    hover: "hover:border-foreground/30",
    focus: "ring-2 ring-ring/20 border-ring",
  },
  outlined: {
    base: "border-2 border-border bg-transparent",
    hover: "hover:border-foreground/40",
    focus: "ring-2 ring-ring/20 border-ring",
  },
  filled: {
    base: "border border-transparent bg-muted",
    hover: "hover:bg-muted/80",
    focus: "ring-2 ring-ring/20 border-ring bg-input-background",
  },
  ghost: {
    base: "border border-transparent bg-transparent",
    hover: "hover:bg-muted/50",
    focus: "ring-2 ring-ring/20 bg-input-background",
  },
};

const inputStateStyles: Record<InputState, string> = {
  default: "",
  error: "!border-destructive ring-destructive/20",
  success: "!border-chart-2 ring-chart-2/20",
  warning: "!border-chart-5 ring-chart-5/20",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

// ─── Input Component ──────────────────────────────────────────────────────────

export const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      size = "md",
      variant = "default",
      state = "default",
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      clearable = false,
      showPasswordToggle = false,
      loading = false,
      fullWidth = true,
      required = false,
      showCount = false,
      onClear,
      disabled,
      type: typeProp = "text",
      value,
      defaultValue,
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const currentValue = value !== undefined ? value : internalValue;
    const charCount = String(currentValue).length;
    const maxLen = props.maxLength;

    const sc = inputSizeConfig[size];
    const vs = inputVariantStyles[variant];
    const computedState = errorMessage ? "error" : state;
    const isPassword = typeProp === "password";
    const resolvedType = isPassword && showPw ? "text" : typeProp;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange]
    );

    const handleClear = useCallback(() => {
      setInternalValue("");
      onClear?.();
    }, [onClear]);

    const hasValue = String(currentValue).length > 0;

    return (
      <div className={`${fullWidth ? "w-full" : "inline-flex flex-col"} ${className}`}>
        {/* Label */}
        {label && (
          <label className="block mb-1.5 text-foreground">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div
          className={`flex items-center rounded-[var(--radius-md)] transition-all duration-150
            ${sc.wrapper}
            ${vs.base}
            ${!disabled ? vs.hover : ""}
            ${isFocused && !disabled ? vs.focus : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${inputStateStyles[computedState]}
          `}
        >
          {leftIcon && <span className="flex-shrink-0 text-muted-foreground">{leftIcon}</span>}
          {prefix && (
            <span className="flex-shrink-0 text-muted-foreground" style={labelStyle}>
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            type={resolvedType}
            disabled={disabled || loading}
            value={currentValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed"
            style={sc.textStyle}
            {...props}
          />

          {suffix && (
            <span className="flex-shrink-0 text-muted-foreground" style={labelStyle}>
              {suffix}
            </span>
          )}
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-0.5"
            >
              <X size={sc.icon - 2} />
            </button>
          )}
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-0.5"
            >
              {showPw ? <EyeOff size={sc.icon} /> : <Eye size={sc.icon} />}
            </button>
          )}
          {rightIcon && !isPassword && <span className="flex-shrink-0 text-muted-foreground">{rightIcon}</span>}
          {loading && (
            <span className="flex-shrink-0">
              <span className="block w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
            </span>
          )}
        </div>

        {/* Character count */}
        {showCount && maxLen && (
          <div className="flex justify-end mt-1" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", color: charCount >= maxLen ? "var(--destructive)" : "var(--muted-foreground)" }}>
            {charCount} / {maxLen}
          </div>
        )}

        {/* Helper / Error */}
        {(helperText || errorMessage || successMessage) && (
          <div className="mt-1.5 flex items-center gap-1">
            {computedState === "error" && <AlertCircle size={12} className="text-destructive flex-shrink-0" />}
            {computedState === "success" && <CheckCircle2 size={12} className="text-chart-2 flex-shrink-0" />}
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

DSInput.displayName = "DSInput";

// ─── Textarea Component ───────────────────────────────────────────────────────

export const DSTextarea = forwardRef<HTMLTextAreaElement, DSTextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      size = "md",
      variant = "default",
      state = "default",
      showCharCount = false,
      maxLength,
      required = false,
      disabled,
      value,
      defaultValue,
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(String(defaultValue ?? "").length);
    const sc = inputSizeConfig[size];
    const vs = inputVariantStyles[variant];
    const computedState = errorMessage ? "error" : state;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block mb-1.5 text-foreground">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        <div
          className={`transition-all duration-150 overflow-hidden rounded-[var(--radius-md)]
            ${vs.base}
            ${!disabled ? vs.hover : ""}
            ${isFocused && !disabled ? vs.focus : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${inputStateStyles[computedState]}
          `}
        >
          <textarea
            ref={ref}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full min-h-[100px] px-3 py-2.5 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground resize-y disabled:cursor-not-allowed"
            style={sc.textStyle}
            {...props}
          />
          {showCharCount && (
            <div
              className="flex justify-end px-3 py-1.5 border-t border-border text-muted-foreground bg-muted/20"
              style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
            >
              {charCount}{maxLength ? ` / ${maxLength}` : ""} chars
            </div>
          )}
        </div>

        {(helperText || errorMessage || successMessage) && (
          <div className="mt-1.5 flex items-center gap-1">
            {computedState === "error" && <AlertCircle size={12} className="text-destructive flex-shrink-0" />}
            {computedState === "success" && <CheckCircle2 size={12} className="text-chart-2 flex-shrink-0" />}
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

DSTextarea.displayName = "DSTextarea";