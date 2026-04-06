import React from "react";
import { ChevronRight, Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ChoiceCardSize = "sm" | "md" | "lg";
export type ChoiceCardLayout = "horizontal" | "vertical";

export interface ChoiceCardProps {
  /** Unique value for this card */
  value: string;
  /** Card title */
  title: string;
  /** Subtitle / description */
  description?: string;
  /** Leading icon or image */
  icon?: React.ReactNode;
  /** Badge label (top-right) */
  badge?: string;
  /** Whether this card is selected */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show arrow indicator (horizontal layout only) */
  showArrow?: boolean;
  /** Show checkmark instead of arrow on selection */
  showCheck?: boolean;
  /** Card size */
  size?: ChoiceCardSize;
  /** Layout direction */
  layout?: ChoiceCardLayout;
  /** Click handler */
  onClick?: (value: string) => void;
  /** Additional class name */
  className?: string;
}

export interface ChoiceCardGroupProps {
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Layout of the group */
  layout?: ChoiceCardLayout;
  /** Size applied to all cards */
  size?: ChoiceCardSize;
  /** Cards */
  children: React.ReactNode;
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
  fontSize: "var(--text-caption)",
  fontWeight: "var(--weight-button)",
};

const sizeMap: Record<ChoiceCardSize, string> = {
  sm: "p-3 gap-2.5 rounded-[var(--radius-md)]",
  md: "p-4 gap-3 rounded-[var(--radius-md)]",
  lg: "p-5 gap-4 rounded-[var(--radius-md)]",
};

const iconSizeMap: Record<ChoiceCardSize, string> = {
  sm: "w-8 h-8 rounded-[var(--radius-sm)]",
  md: "w-10 h-10 rounded-[var(--radius-md)]",
  lg: "w-12 h-12 rounded-[var(--radius-md)] text-lg",
};

// ─── ChoiceCard ───────────────────────────────────────────────────────────────

export function ChoiceCard({
  value,
  title,
  description,
  icon,
  badge,
  selected = false,
  disabled = false,
  showArrow = true,
  showCheck = false,
  size = "md",
  layout = "horizontal",
  onClick,
  className = "",
}: ChoiceCardProps) {
  const isVertical = layout === "vertical";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick?.(value)}
      className={[
        "w-full text-left border transition-all duration-150",
        sizeMap[size],
        isVertical ? "flex flex-col items-center text-center" : "flex items-center",
        selected
          ? "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
          : "border-border bg-card hover:border-primary/40 hover:bg-muted/20",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={selected}
    >
      {/* Icon */}
      {icon && (
        <div
          className={[
            iconSizeMap[size],
            "flex items-center justify-center flex-shrink-0",
            selected
              ? "bg-primary/10 text-primary"
              : "bg-muted/40 text-muted-foreground",
          ].join(" ")}
        >
          {icon}
        </div>
      )}

      {/* Text content */}
      <div className={`flex-1 min-w-0 ${isVertical ? "mt-2" : ""}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={selected ? "text-foreground" : "text-foreground"}
            style={labelStyle}
          >
            {title}
          </span>
          {badge && (
            <span
              className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
              style={badgeStyle}
            >
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p
            className={`text-muted-foreground mt-0.5 ${isVertical ? "line-clamp-2" : "truncate"}`}
            style={descStyle}
          >
            {description}
          </p>
        )}
      </div>

      {/* Right indicator */}
      {!isVertical && (
        <div className="flex-shrink-0 ml-auto pl-2">
          {showCheck && selected ? (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Check size={12} />
            </span>
          ) : showArrow ? (
            <ChevronRight
              size={16}
              className={selected ? "text-primary" : "text-muted-foreground"}
            />
          ) : null}
        </div>
      )}

      {/* Vertical selected indicator */}
      {isVertical && selected && (
        <div className="mt-2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Check size={12} />
        </div>
      )}
    </button>
  );
}

ChoiceCard.displayName = "ChoiceCard";

// ─── ChoiceCardGroup ──────────────────────────────────────────────────────────

export function ChoiceCardGroup({
  value,
  onChange,
  layout = "horizontal",
  size = "md",
  children,
  className = "",
}: ChoiceCardGroupProps) {
  return (
    <div
      className={[
        "grid gap-3",
        layout === "vertical"
          ? "grid-cols-2 sm:grid-cols-3"
          : "grid-cols-1",
        className,
      ].join(" ")}
      role="group"
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<ChoiceCardProps>, {
          selected: value === (child.props as ChoiceCardProps).value,
          onClick: (v: string) => onChange?.(v),
          layout,
          size,
        });
      })}
    </div>
  );
}

ChoiceCardGroup.displayName = "ChoiceCardGroup";
