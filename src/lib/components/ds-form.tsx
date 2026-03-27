import React, { createContext, useContext } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type FormFieldLayout = "vertical" | "horizontal";

export interface FormFieldProps {
  /** Field name — used for htmlFor on label */
  name: string;
  /** Label text */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Success message to display (overrides helperText when present) */
  successMessage?: string;
  /** Helper/description text below the field */
  helperText?: string;
  /** Layout direction: vertical (default) or horizontal (label left, input right) */
  layout?: FormFieldLayout;
  /** Label width when layout="horizontal" (default: "160px") */
  labelWidth?: string;
  /** Field content (input, select, etc.) */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface FormErrorProps {
  message?: string;
  className?: string;
}

export interface FormHelperTextProps {
  children: React.ReactNode;
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

/* ─── Context ────────────────────────────────────────────────────────────────── */

interface FormFieldContextValue {
  name: string;
  error?: string;
}

const FormFieldContext = createContext<FormFieldContextValue>({ name: "" });

export function useFormField() {
  return useContext(FormFieldContext);
}

/* ─── FormLabel ──────────────────────────────────────────────────────────────── */

export function FormLabel({
  htmlFor,
  required,
  children,
  className = "",
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-foreground mb-1.5 ${className}`}
      style={fontLabel}
    >
      {children}
      {required && (
        <span className="text-destructive ml-0.5">*</span>
      )}
    </label>
  );
}

/* ─── FormError ──────────────────────────────────────────────────────────────── */

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-1 mt-1.5 text-destructive ${className}`}
      style={smallLabel}
      role="alert"
    >
      <AlertCircle size={12} className="flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/* ─── FormSuccessMessage ─────────────────────────────────────────────────────── */

export interface FormSuccessProps {
  message?: string;
  className?: string;
}

export function FormSuccess({ message, className = "" }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-1 mt-1.5 text-chart-2 ${className}`}
      style={smallLabel}
      role="status"
    >
      <CheckCircle2 size={12} className="flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/* ─── FormHelperText ─────────────────────────────────────────────────────────── */

export function FormHelperText({ children, className = "" }: FormHelperTextProps) {
  return (
    <p
      className={`mt-1.5 text-muted-foreground ${className}`}
      style={smallLabel}
    >
      {children}
    </p>
  );
}

/* ─── FormField ──────────────────────────────────────────────────────────────── */

export function FormField({
  name,
  label,
  required,
  error,
  successMessage,
  helperText,
  layout = "vertical",
  labelWidth = "160px",
  children,
  className = "",
}: FormFieldProps) {
  const isHorizontal = layout === "horizontal";

  const feedback = error ? (
    <FormError message={error} />
  ) : successMessage ? (
    <FormSuccess message={successMessage} />
  ) : helperText ? (
    <FormHelperText>{helperText}</FormHelperText>
  ) : null;

  return (
    <FormFieldContext.Provider value={{ name, error }}>
      {isHorizontal ? (
        <div className={`flex items-start gap-4 ${className}`}>
          {label && (
            <div style={{ width: labelWidth, flexShrink: 0, paddingTop: "6px" }}>
              <FormLabel htmlFor={name} required={required}>
                {label}
              </FormLabel>
            </div>
          )}
          <div className="flex-1 min-w-0">
            {children}
            {feedback}
          </div>
        </div>
      ) : (
        <div className={`${className}`}>
          {label && (
            <FormLabel htmlFor={name} required={required}>
              {label}
            </FormLabel>
          )}
          {children}
          {feedback}
        </div>
      )}
    </FormFieldContext.Provider>
  );
}
