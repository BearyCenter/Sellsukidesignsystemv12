import React, { createContext, useContext } from "react";
import { AlertCircle } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface FormFieldProps {
  /** Field name — used for htmlFor on label */
  name: string;
  /** Label text */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper/description text below the field */
  helperText?: string;
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
  helperText,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <FormFieldContext.Provider value={{ name, error }}>
      <div className={`${className}`}>
        {label && (
          <FormLabel htmlFor={name} required={required}>
            {label}
          </FormLabel>
        )}
        {children}
        {error ? (
          <FormError message={error} />
        ) : helperText ? (
          <FormHelperText>{helperText}</FormHelperText>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
}
