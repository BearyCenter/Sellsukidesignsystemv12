import React, { useState } from "react";
import { Star, Heart, ThumbsUp } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type RatingSize = "sm" | "md" | "lg";
export type RatingIcon = "star" | "heart" | "thumb";

export interface RatingProps {
  value?: number;
  onChange?: (v: number) => void;
  max?: number;
  size?: RatingSize;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: RatingIcon;
  showValue?: boolean;
  label?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

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

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Rating({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  disabled,
  readOnly,
  icon = "star",
  showValue,
  label,
}: RatingProps) {
  const [hover, setHover] = useState(0);
  const iconSize = size === "sm" ? 16 : size === "lg" ? 28 : 20;
  const gap = size === "sm" ? "gap-0.5" : size === "lg" ? "gap-1.5" : "gap-1";

  const IconComp = icon === "heart" ? Heart : icon === "thumb" ? ThumbsUp : Star;
  const activeColor = icon === "heart" ? "text-destructive" : "text-chart-5";

  const items = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div
      className={`inline-flex items-center ${gap} ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {label && (
        <span className="text-foreground mr-2" style={fontLabel}>
          {label}
        </span>
      )}
      {items.map((n) => {
        const filled = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            className={`transition-transform ${
              readOnly || disabled
                ? ""
                : "cursor-pointer hover:scale-110"
            } ${filled ? activeColor : "text-muted-foreground/40"}`}
            onMouseEnter={() => !readOnly && !disabled && setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() =>
              !readOnly && !disabled && onChange?.(n === value ? 0 : n)
            }
            disabled={disabled || readOnly}
          >
            <IconComp
              size={iconSize}
              fill={filled ? "currentColor" : "none"}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="text-foreground ml-1" style={fontLabelBold}>
          {value}/{max}
        </span>
      )}
    </div>
  );
}
