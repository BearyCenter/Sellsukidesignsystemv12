import React from "react";
import { Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StepDefinition {
  /** Step title */
  title: string;
  /** Optional step description */
  description?: string;
  /** Disable click navigation to this step */
  disabled?: boolean;
}

export interface StepperProps {
  /** Step definitions */
  steps: StepDefinition[];
  /** Current active step (0-based) */
  current: number;
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Step click handler (for navigating to completed steps) */
  onStepClick?: (index: number) => void;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

// ─── Stepper ─────────────────────────────────────────────────────────────────

export function Stepper({
  steps,
  current,
  orientation = "horizontal",
  onStepClick,
  className = "",
}: StepperProps) {
  if (orientation === "vertical") {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          const isDisabled = step.disabled;
          return (
            <div
              key={i}
              className={`flex gap-3 ${isDisabled ? "opacity-50" : ""}`}
              onClick={() => !isDisabled && onStepClick?.(i)}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isDisabled ? "cursor-not-allowed" : onStepClick ? "cursor-pointer" : ""
                  } ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={btnStyle}
                >
                  {done ? <Check size={14} /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-px flex-1 min-h-[24px] my-1 ${
                      done ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
              <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                <span
                  className={`block ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                  style={active ? fontLabelBold : fontLabel}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-muted-foreground block" style={smallLabel}>
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={i}
            className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""} ${step.disabled ? "opacity-50" : ""}`}
          >
            <div
              className="flex flex-col items-center gap-1"
              onClick={() => !step.disabled && onStepClick?.(i)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  step.disabled ? "cursor-not-allowed" : onStepClick ? "cursor-pointer" : ""
                } ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                style={btnStyle}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-center ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
                style={active ? fontLabelBold : smallLabel}
              >
                {step.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 mt-[-20px] ${
                  done ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

Stepper.displayName = "Stepper";
