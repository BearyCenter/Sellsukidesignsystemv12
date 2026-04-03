import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ColorPickerSize = "sm" | "md" | "lg";

export interface ColorPickerProps {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  presets?: string[];
  showInput?: boolean;
  showFormats?: boolean;
  size?: ColorPickerSize;
  disabled?: boolean;
}

/* ─── Default Presets ────────────────────────────────────────────────────────── */

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#0ea5e9", "#e11d48",
  "#991b1b", "#9a3412", "#854d0e", "#166534", "#155e75", "#1e40af", "#0369a1", "#9f1239",
  "#fca5a5", "#fdba74", "#fde047", "#86efac", "#67e8f9", "#93c5fd", "#bae6fd", "#fecdd3",
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

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

const mono: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function ColorPicker({
  value,
  onChange,
  label,
  presets,
  showInput = true,
  showFormats,
  size = "md",
  disabled = false,
}: ColorPickerProps) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const swatchSize =
    size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6";
  const displayPresets = presets || DEFAULT_PRESETS;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className={`space-y-3 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {label && (
        <label className="block text-foreground" style={fontLabelBold}>
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-10 h-10 rounded-[var(--radius-md)] border border-border cursor-pointer overflow-hidden"
            style={{ backgroundColor: value }}
            onClick={() => inputRef.current?.click()}
          />
          <input
            ref={inputRef}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>

        {showInput && (
          <div className="flex items-center gap-1.5">
            <input
              value={value}
              onChange={(e) => {
                if (
                  /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) ||
                  e.target.value === "#"
                )
                  onChange(e.target.value);
              }}
              className="w-24 px-2.5 py-1.5 rounded-[var(--radius-md)] border border-border bg-background text-foreground outline-none focus:border-primary"
              style={mono}
              maxLength={7}
            />
            <button
              onClick={() => copy(value)}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              {copied ? (
                <Check size={14} className="text-chart-2" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        )}
      </div>

      {displayPresets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {displayPresets.map((c) => (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={`${swatchSize} rounded-[var(--radius-sm)] border-2 transition-transform hover:scale-110 cursor-pointer
                ${value === c ? "border-foreground ring-1 ring-foreground/20" : "border-transparent"}`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      )}

      {showFormats && (
        <div className="space-y-1">
          {[
            { label: "HEX", val: value.toUpperCase() },
            { label: "RGB", val: hexToRgb(value) },
            { label: "HSL", val: hexToHsl(value) },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2">
              <span className="w-8 text-muted-foreground" style={smallLabel}>
                {f.label}
              </span>
              <code className="text-foreground" style={mono}>
                {f.val}
              </code>
              <button
                onClick={() => copy(f.val)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Copy size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
