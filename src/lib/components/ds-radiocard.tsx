import React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioCardSize = "sm" | "md" | "lg";
export type RadioCardLayout = "grid" | "list";

export interface RadioCardOption {
  /** Unique value */
  value: string;
  /** Card title */
  title: string;
  /** Description text */
  description?: string;
  /** Icon, logo, or image */
  icon?: React.ReactNode;
  /** Badge label */
  badge?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface RadioCardProps {
  /** Options to render */
  options: RadioCardOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Grid columns */
  columns?: 1 | 2 | 3 | 4;
  /** Layout */
  layout?: RadioCardLayout;
  /** Card size */
  size?: RadioCardSize;
  /** Name for the radio group (for form semantics) */
  name?: string;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const descStyle: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-p)",
};

const badgeStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const sizePadding: Record<RadioCardSize, string> = {
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

const iconSize: Record<RadioCardSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const colsMap: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

// ─── RadioCard ────────────────────────────────────────────────────────────────

export function RadioCard({
  options,
  value,
  onChange,
  columns = 2,
  layout = "grid",
  size = "md",
  name,
  className = "",
}: RadioCardProps) {
  const gridName = name ?? `radio-card-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div
      className={[
        layout === "grid" ? `grid gap-3 ${colsMap[columns]}` : "flex flex-col gap-2",
        className,
      ].join(" ")}
      role="radiogroup"
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const isDisabled = opt.disabled ?? false;

        return (
          <label
            key={opt.value}
            className={[
              "relative flex items-start gap-3 border rounded-[var(--radius-md)] cursor-pointer transition-all duration-150",
              sizePadding[size],
              isSelected
                ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                : "border-border bg-card hover:border-primary/40 hover:bg-muted/10",
              isDisabled ? "opacity-50 cursor-not-allowed" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Hidden native radio */}
            <input
              type="radio"
              name={gridName}
              value={opt.value}
              checked={isSelected}
              disabled={isDisabled}
              onChange={() => !isDisabled && onChange?.(opt.value)}
              className="sr-only"
            />

            {/* Custom radio indicator */}
            <div
              className={[
                "flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                isSelected
                  ? "border-primary bg-primary"
                  : "border-border bg-transparent",
              ].join(" ")}
            >
              {isSelected && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
              )}
            </div>

            {/* Icon */}
            {opt.icon && (
              <div
                className={[
                  iconSize[size],
                  "flex-shrink-0 flex items-center justify-center rounded-[var(--radius-md)]",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "bg-muted/40 text-muted-foreground",
                ].join(" ")}
              >
                {opt.icon}
              </div>
            )}

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-foreground"
                  style={labelStyle}
                >
                  {opt.title}
                </span>
                {opt.badge && (
                  <span
                    className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
                    style={badgeStyle}
                  >
                    {opt.badge}
                  </span>
                )}
              </div>
              {opt.description && (
                <p
                  className="text-muted-foreground mt-0.5"
                  style={descStyle}
                >
                  {opt.description}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}

RadioCard.displayName = "RadioCard";
