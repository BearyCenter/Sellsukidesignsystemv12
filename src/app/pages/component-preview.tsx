import React, { useState, useMemo, useCallback } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  Layers,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useI18n } from "../i18n";
import { CodeBlock } from "../components/code-block";
import { fontBody, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

// ─── Prop Control Types ───────────────────────────────────────────────────────

type PropControlType = "string" | "boolean" | "select" | "number";

interface PropControl {
  name: string;
  type: PropControlType;
  defaultValue: string | boolean | number;
  options?: string[];
  description?: string;
  min?: number;
  max?: number;
  step?: number;
}

// ─── Component Registry ───────────────────────────────────────────────────────

interface ComponentRegistryEntry {
  id: string;
  name: string;
  importPath: string;
  importName: string;
  props: PropControl[];
  defaultChildren?: string;
  /** Render-function that produces the live preview given current prop values */
  renderPreview: (props: Record<string, unknown>) => React.ReactNode;
}

/* We use a lazy builder so lucide icons are resolved at render time */
function buildRegistry(): ComponentRegistryEntry[] {
  return [
    {
      id: "button",
      name: "DSButton",
      importPath: "./components/ds-button",
      importName: "DSButton",
      defaultChildren: "Click me",
      props: [
        { name: "variant", type: "select", defaultValue: "primary", options: ["primary", "secondary", "outline", "ghost", "destructive", "link"], description: "Visual style variant" },
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg", "xl"], description: "Button size" },
        { name: "disabled", type: "boolean", defaultValue: false, description: "Disable interaction" },
        { name: "loading", type: "boolean", defaultValue: false, description: "Show loading spinner" },
        { name: "fullWidth", type: "boolean", defaultValue: false, description: "Stretch to container width" },
        { name: "children", type: "string", defaultValue: "Click me", description: "Button label text" },
      ],
      renderPreview: (p) => (
        <button
          className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] transition-all cursor-pointer
            ${p.fullWidth ? "w-full" : ""}
            ${p.size === "sm" ? "px-3 py-1.5" : p.size === "lg" ? "px-6 py-3" : p.size === "xl" ? "px-8 py-4" : "px-4 py-2"}
            ${p.variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary/90" :
              p.variant === "secondary" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" :
              p.variant === "outline" ? "border border-border bg-transparent text-foreground hover:bg-accent" :
              p.variant === "ghost" ? "text-foreground hover:bg-accent" :
              p.variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" :
              "text-primary underline-offset-4 hover:underline"}
            ${p.disabled ? "opacity-50 pointer-events-none" : ""}
          `}
          style={btnStyle}
          disabled={p.disabled as boolean}
        >
          {p.loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {String(p.children || "Click me")}
        </button>
      ),
    },
    {
      id: "badge",
      name: "Badge",
      importPath: "./components/ds-badge",
      importName: "Badge",
      defaultChildren: "Badge",
      props: [
        { name: "variant", type: "select", defaultValue: "default", options: ["default", "secondary", "success", "warning", "destructive", "outline"], description: "Color variant" },
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Badge size" },
        { name: "dot", type: "boolean", defaultValue: false, description: "Show dot indicator" },
        { name: "children", type: "string", defaultValue: "Badge", description: "Badge text" },
      ],
      renderPreview: (p) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-[var(--radius-full)]
            ${p.size === "sm" ? "px-2 py-0.5" : p.size === "lg" ? "px-4 py-1.5" : "px-3 py-1"}
            ${p.variant === "default" ? "bg-primary text-primary-foreground" :
              p.variant === "secondary" ? "bg-secondary text-secondary-foreground" :
              p.variant === "success" ? "bg-chart-2/15 text-chart-2" :
              p.variant === "warning" ? "bg-chart-5/15 text-chart-5" :
              p.variant === "destructive" ? "bg-destructive/15 text-destructive" :
              "border border-border text-foreground"}
          `}
          style={{ ...btnStyle, fontSize: p.size === "sm" ? "var(--text-button)" : "var(--text-button)" }}
        >
          {p.dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
          {String(p.children || "Badge")}
        </span>
      ),
    },
    {
      id: "input",
      name: "DSInput",
      importPath: "./components/ds-input",
      importName: "DSInput",
      props: [
        { name: "variant", type: "select", defaultValue: "default", options: ["default", "outlined", "filled", "ghost"], description: "Visual variant" },
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Input size" },
        { name: "label", type: "string", defaultValue: "Label", description: "Input label" },
        { name: "placeholder", type: "string", defaultValue: "Type something...", description: "Placeholder text" },
        { name: "disabled", type: "boolean", defaultValue: false, description: "Disable the input" },
        { name: "required", type: "boolean", defaultValue: false, description: "Mark as required" },
        { name: "state", type: "select", defaultValue: "default", options: ["default", "error", "success"], description: "Validation state" },
      ],
      renderPreview: (p) => (
        <div className="w-full max-w-xs space-y-1.5">
          {p.label && (
            <label className="block text-foreground" style={fontLabelBold}>
              {String(p.label)}{p.required && <span className="text-destructive ml-0.5">*</span>}
            </label>
          )}
          <input
            className={`w-full rounded-[var(--radius-md)] transition-all outline-none
              ${p.size === "sm" ? "px-2.5 py-1.5" : p.size === "lg" ? "px-4 py-3" : "px-3 py-2"}
              ${p.variant === "filled" ? "bg-muted border-transparent" :
                p.variant === "ghost" ? "bg-transparent border-b border-border rounded-none" :
                p.variant === "outlined" ? "bg-transparent border-2 border-border" :
                "bg-background border border-border"}
              ${p.state === "error" ? "border-destructive" : p.state === "success" ? "border-chart-2" : ""}
              ${p.disabled ? "opacity-50 pointer-events-none" : ""}
              text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30
            `}
            style={fontLabel}
            placeholder={String(p.placeholder || "")}
            disabled={p.disabled as boolean}
          />
        </div>
      ),
    },
    {
      id: "switch",
      name: "Switch",
      importPath: "./pages/switch-showcase",
      importName: "Switch",
      props: [
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Switch size" },
        { name: "color", type: "select", defaultValue: "primary", options: ["primary", "success", "warning", "destructive"], description: "Active color" },
        { name: "disabled", type: "boolean", defaultValue: false, description: "Disable switch" },
        { name: "label", type: "string", defaultValue: "Enable feature", description: "Switch label" },
      ],
      renderPreview: (p) => {
        const sizeMap = { sm: "w-8 h-5", md: "w-10 h-6", lg: "w-12 h-7" };
        const dotMap = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
        return (
          <SwitchPreview
            size={String(p.size || "md") as "sm" | "md" | "lg"}
            color={String(p.color || "primary")}
            disabled={p.disabled as boolean}
            label={String(p.label || "")}
            sizeMap={sizeMap}
            dotMap={dotMap}
          />
        );
      },
    },
    {
      id: "tag",
      name: "Tag",
      importPath: "./pages/tag-showcase",
      importName: "Tag",
      defaultChildren: "Tag",
      props: [
        { name: "variant", type: "select", defaultValue: "default", options: ["default", "primary", "success", "warning", "danger", "outline"], description: "Color variant" },
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Tag size" },
        { name: "closable", type: "boolean", defaultValue: false, description: "Show close button" },
        { name: "children", type: "string", defaultValue: "Tag label", description: "Tag text" },
      ],
      renderPreview: (p) => (
        <span
          className={`inline-flex items-center gap-1 rounded-[var(--radius)]
            ${p.size === "sm" ? "px-2 py-0.5" : p.size === "lg" ? "px-3.5 py-1.5" : "px-2.5 py-1"}
            ${p.variant === "primary" ? "bg-primary/15 text-primary" :
              p.variant === "success" ? "bg-chart-2/15 text-chart-2" :
              p.variant === "warning" ? "bg-chart-5/15 text-chart-5" :
              p.variant === "danger" ? "bg-destructive/15 text-destructive" :
              p.variant === "outline" ? "border border-border text-foreground" :
              "bg-muted text-foreground"}
          `}
          style={btnStyle}
        >
          {String(p.children || "Tag label")}
          {p.closable && (
            <span className="ml-0.5 cursor-pointer opacity-60 hover:opacity-100">&times;</span>
          )}
        </span>
      ),
    },
    {
      id: "spinner",
      name: "Spinner",
      importPath: "./pages/spinner-showcase",
      importName: "Spinner",
      props: [
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg", "xl"], description: "Spinner size" },
        { name: "color", type: "select", defaultValue: "primary", options: ["primary", "secondary", "destructive", "muted"], description: "Spinner color" },
      ],
      renderPreview: (p) => {
        const sizeVal = p.size === "sm" ? "16" : p.size === "lg" ? "32" : p.size === "xl" ? "48" : "24";
        const colorClass = p.color === "secondary" ? "text-secondary-foreground" :
          p.color === "destructive" ? "text-destructive" :
          p.color === "muted" ? "text-muted-foreground" : "text-primary";
        return (
          <svg className={`animate-spin ${colorClass}`} width={sizeVal} height={sizeVal} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        );
      },
    },
    {
      id: "avatar",
      name: "Avatar",
      importPath: "./pages/avatar-showcase",
      importName: "Avatar",
      props: [
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg", "xl"], description: "Avatar size" },
        { name: "initials", type: "string", defaultValue: "JD", description: "Fallback initials" },
        { name: "shape", type: "select", defaultValue: "circle", options: ["circle", "square"], description: "Avatar shape" },
        { name: "status", type: "select", defaultValue: "none", options: ["none", "online", "offline", "busy", "away"], description: "Status indicator" },
      ],
      renderPreview: (p) => {
        const sizeMap: Record<string, string> = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12", xl: "w-16 h-16" };
        const textSize: Record<string, string> = { sm: "var(--text-caption)", md: "var(--text-button)", lg: "var(--text-label)", xl: "var(--text-p)" };
        const statusColors: Record<string, string> = { online: "bg-chart-2", offline: "bg-muted-foreground", busy: "bg-destructive", away: "bg-chart-5" };
        const statusSize: Record<string, string> = { sm: "w-2 h-2", md: "w-2.5 h-2.5", lg: "w-3 h-3", xl: "w-3.5 h-3.5" };
        return (
          <div className="relative inline-flex">
            <div
              className={`${sizeMap[String(p.size || "md")]} ${p.shape === "square" ? "rounded-[var(--radius-md)]" : "rounded-full"} bg-primary/15 text-primary flex items-center justify-center`}
              style={{ fontFamily: "var(--font-button)", fontSize: textSize[String(p.size || "md")], fontWeight: "var(--weight-button)" }}
            >
              {String(p.initials || "JD")}
            </div>
            {p.status && p.status !== "none" && (
              <span className={`absolute bottom-0 right-0 ${statusSize[String(p.size || "md")]} ${statusColors[String(p.status)] || ""} rounded-full border-2 border-card`} />
            )}
          </div>
        );
      },
    },
    {
      id: "progressbar",
      name: "ProgressBar",
      importPath: "./pages/progressbar-showcase",
      importName: "ProgressBar",
      props: [
        { name: "value", type: "number", defaultValue: 65, min: 0, max: 100, step: 5, description: "Progress percentage" },
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Bar height" },
        { name: "color", type: "select", defaultValue: "primary", options: ["primary", "success", "warning", "destructive"], description: "Bar color" },
        { name: "showLabel", type: "boolean", defaultValue: true, description: "Show percentage label" },
        { name: "striped", type: "boolean", defaultValue: false, description: "Striped pattern" },
      ],
      renderPreview: (p) => {
        const heightMap: Record<string, string> = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
        const colorMap: Record<string, string> = { primary: "bg-primary", success: "bg-chart-2", warning: "bg-chart-5", destructive: "bg-destructive" };
        const val = Number(p.value || 65);
        return (
          <div className="w-full max-w-xs space-y-1.5">
            {p.showLabel && (
              <div className="flex justify-between">
                <span className="text-foreground" style={fontLabel}>Progress</span>
                <span className="text-muted-foreground" style={smallLabel}>{val}%</span>
              </div>
            )}
            <div className={`w-full ${heightMap[String(p.size || "md")]} rounded-[var(--radius-full)] bg-muted overflow-hidden`}>
              <div
                className={`h-full ${colorMap[String(p.color || "primary")]} rounded-[var(--radius-full)] transition-all duration-300 ${p.striped ? "bg-[length:16px_16px] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)]" : ""}`}
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: "checkbox",
      name: "Checkbox",
      importPath: "./components/ds-checkbox",
      importName: "Checkbox",
      props: [
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Checkbox size" },
        { name: "label", type: "string", defaultValue: "Accept terms and conditions", description: "Checkbox label" },
        { name: "disabled", type: "boolean", defaultValue: false, description: "Disable checkbox" },
        { name: "indeterminate", type: "boolean", defaultValue: false, description: "Indeterminate state" },
      ],
      renderPreview: (p) => {
        return (
          <CheckboxPreview
            size={String(p.size || "md") as "sm" | "md" | "lg"}
            label={String(p.label || "Accept terms")}
            disabled={p.disabled as boolean}
            indeterminate={p.indeterminate as boolean}
          />
        );
      },
    },
    {
      id: "radio",
      name: "Radio",
      importPath: "./components/ds-radio",
      importName: "RadioGroup",
      props: [
        { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"], description: "Radio size" },
        { name: "layout", type: "select", defaultValue: "vertical", options: ["vertical", "horizontal"], description: "Layout direction" },
        { name: "disabled", type: "boolean", defaultValue: false, description: "Disable group" },
      ],
      renderPreview: (p) => {
        return (
          <RadioPreview
            size={String(p.size || "md") as "sm" | "md" | "lg"}
            layout={String(p.layout || "vertical") as "vertical" | "horizontal"}
            disabled={p.disabled as boolean}
          />
        );
      },
    },
    {
      id: "alert",
      name: "Alert",
      importPath: "./components/ds-alert",
      importName: "Alert",
      props: [
        { name: "variant", type: "select", defaultValue: "info", options: ["info", "success", "warning", "error"], description: "Alert severity" },
        { name: "title", type: "string", defaultValue: "Heads up!", description: "Alert title" },
        { name: "description", type: "string", defaultValue: "This is an alert message.", description: "Alert body text" },
        { name: "closable", type: "boolean", defaultValue: true, description: "Show close button" },
      ],
      renderPreview: (p) => {
        const variantStyles: Record<string, { bg: string; border: string; icon: string }> = {
          info: { bg: "bg-primary/10", border: "border-primary/30", icon: "text-primary" },
          success: { bg: "bg-chart-2/10", border: "border-chart-2/30", icon: "text-chart-2" },
          warning: { bg: "bg-chart-5/10", border: "border-chart-5/30", icon: "text-chart-5" },
          error: { bg: "bg-destructive/10", border: "border-destructive/30", icon: "text-destructive" },
        };
        const v = String(p.variant || "info");
        const s = variantStyles[v] || variantStyles.info;
        return (
          <div className={`w-full max-w-sm rounded-[var(--radius-md)] border ${s.border} ${s.bg} px-4 py-3`}>
            <div className="flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 flex-shrink-0 ${s.icon}`}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="flex-1 min-w-0">
                {p.title && <div className="text-foreground" style={fontLabelBold}>{String(p.title)}</div>}
                {p.description && <div className="text-muted-foreground mt-0.5" style={smallLabel}>{String(p.description)}</div>}
              </div>
              {p.closable && (
                <button className="flex-shrink-0 text-muted-foreground hover:text-foreground cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              )}
            </div>
          </div>
        );
      },
    },
    {
      id: "tooltip",
      name: "Tooltip",
      importPath: "./pages/tooltip-showcase",
      importName: "Tooltip",
      props: [
        { name: "content", type: "string", defaultValue: "This is a tooltip", description: "Tooltip text" },
        { name: "placement", type: "select", defaultValue: "top", options: ["top", "bottom", "left", "right"], description: "Tooltip position" },
      ],
      renderPreview: (p) => {
        const placement = String(p.placement || "top");
        const positionMap: Record<string, { tooltip: string; arrow: string }> = {
          top: { tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 border-t-foreground/90 border-x-transparent border-b-transparent border-4" },
          bottom: { tooltip: "top-full left-1/2 -translate-x-1/2 mt-2", arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-foreground/90 border-x-transparent border-t-transparent border-4" },
          left: { tooltip: "right-full top-1/2 -translate-y-1/2 mr-2", arrow: "left-full top-1/2 -translate-y-1/2 border-l-foreground/90 border-y-transparent border-r-transparent border-4" },
          right: { tooltip: "left-full top-1/2 -translate-y-1/2 ml-2", arrow: "right-full top-1/2 -translate-y-1/2 border-r-foreground/90 border-y-transparent border-l-transparent border-4" },
        };
        const pos = positionMap[placement] || positionMap.top;
        return (
          <div className="relative inline-flex">
            <div className={`absolute ${pos.tooltip} px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-foreground/90 text-background whitespace-nowrap z-10`} style={smallLabel}>
              {String(p.content || "Tooltip")}
              <div className={`absolute ${pos.arrow} w-0 h-0`} />
            </div>
            <button className="px-4 py-2 rounded-[var(--radius-md)] border border-border bg-card text-foreground cursor-pointer" style={btnStyle}>
              Hover me
            </button>
          </div>
        );
      },
    },
  ];
}

// ─── Switch Preview (stateful sub-component) ──────────────────────────────────

function SwitchPreview({ size, color, disabled, label, sizeMap, dotMap }: {
  size: "sm" | "md" | "lg";
  color: string;
  disabled: boolean;
  label: string;
  sizeMap: Record<string, string>;
  dotMap: Record<string, string>;
}) {
  const [on, setOn] = useState(false);
  const translateOn = { sm: 14, md: 18, lg: 22 };
  const colorMap: Record<string, string> = { primary: "bg-primary", success: "bg-chart-2", warning: "bg-chart-5", destructive: "bg-destructive" };
  return (
    <div className="flex items-center gap-3">
      <button
        className={`relative inline-flex items-center flex-shrink-0 rounded-[var(--radius-full)] transition-colors cursor-pointer
          ${sizeMap[size]}
          ${on ? (colorMap[color] || "bg-primary") : "bg-muted"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
        onClick={() => !disabled && setOn(!on)}
        role="switch"
        aria-checked={on}
      >
        <span
          className={`absolute rounded-full bg-white shadow-sm transition-transform ${dotMap[size]}`}
          style={{
            top: "50%",
            transform: `translateY(-50%) translateX(${on ? translateOn[size] : 2}px)`,
            left: 0,
          }}
        />
      </button>
      {label && <span className="text-foreground" style={fontLabel}>{label}</span>}
    </div>
  );
}

// ─── Checkbox Preview (stateful sub-component) ────────────────────────────────

function CheckboxPreview({ size, label, disabled, indeterminate }: {
  size: "sm" | "md" | "lg";
  label: string;
  disabled: boolean;
  indeterminate: boolean;
}) {
  const [checked, setChecked] = useState(false);
  const sizeMap: Record<string, string> = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  const iconSize: Record<string, number> = { sm: 10, md: 12, lg: 14 };
  const isChecked = indeterminate || checked;
  return (
    <div className={`flex items-center gap-2.5 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <button
        className={`${sizeMap[size]} rounded-[var(--radius-xs)] border-2 flex items-center justify-center transition-all cursor-pointer
          ${isChecked ? "bg-primary border-primary" : "bg-card border-border hover:border-primary/50"}`}
        onClick={() => !disabled && setChecked(!checked)}
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
      >
        {indeterminate ? (
          <svg width={iconSize[size]} height={iconSize[size]} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><line x1="6" y1="12" x2="18" y2="12" /></svg>
        ) : checked ? (
          <svg width={iconSize[size]} height={iconSize[size]} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        ) : null}
      </button>
      {label && <span className="text-foreground" style={fontLabel}>{label}</span>}
    </div>
  );
}

// ─── Radio Preview (stateful sub-component) ───────────────────────────────────

function RadioPreview({ size, layout, disabled }: {
  size: "sm" | "md" | "lg";
  layout: "vertical" | "horizontal";
  disabled: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const sizeMap: Record<string, string> = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  const dotSize: Record<string, string> = { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" };
  const options = ["Option A", "Option B", "Option C"];
  return (
    <div className={`flex ${layout === "horizontal" ? "flex-row gap-6" : "flex-col gap-3"} ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {options.map((opt, i) => (
        <div key={opt} className="flex items-center gap-2.5">
          <button
            className={`${sizeMap[size]} rounded-full border-2 flex items-center justify-center transition-all cursor-pointer
              ${selected === i ? "border-primary" : "border-border hover:border-primary/50"}`}
            onClick={() => !disabled && setSelected(i)}
            role="radio"
            aria-checked={selected === i}
          >
            {selected === i && <span className={`${dotSize[size]} rounded-full bg-primary`} />}
          </button>
          <span className="text-foreground" style={fontLabel}>{opt}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Viewport Definitions ─────────────────────────────────────────────────────

type Viewport = "desktop" | "tablet" | "mobile";

const viewportConfig: Record<Viewport, { width: string; icon: React.ReactNode; label: string }> = {
  desktop: { width: "100%", icon: <Monitor size={14} />, label: "Desktop" },
  tablet: { width: "768px", icon: <Tablet size={14} />, label: "Tablet" },
  mobile: { width: "375px", icon: <Smartphone size={14} />, label: "Mobile" },
};

// ─── JSX Code Generator ──────────────────────────────────────────────────────

function generateJSX(entry: ComponentRegistryEntry, values: Record<string, unknown>): string {
  const lines: string[] = [];
  const propStrings: string[] = [];

  for (const prop of entry.props) {
    if (prop.name === "children") continue;
    const val = values[prop.name];
    if (val === prop.defaultValue) continue;
    if (typeof val === "boolean" && val) {
      propStrings.push(prop.name);
    } else if (typeof val === "boolean" && !val) {
      continue;
    } else if (typeof val === "number") {
      propStrings.push(`${prop.name}={${val}}`);
    } else {
      propStrings.push(`${prop.name}="${val}"`);
    }
  }

  const childVal = values.children ?? entry.defaultChildren;
  const propsStr = propStrings.length > 0 ? " " + propStrings.join(" ") : "";

  if (childVal) {
    lines.push(`<${entry.name}${propsStr}>`);
    lines.push(`  ${childVal}`);
    lines.push(`</${entry.name}>`);
  } else {
    lines.push(`<${entry.name}${propsStr} />`);
  }

  return `import { ${entry.importName} } from "${entry.importPath}";\n\n${lines.join("\n")}`;
}

// ─── Prop Control Renderers ───────────────────────────────────────────────────

function StringControl({ name, value, onChange }: { name: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="block text-muted-foreground" style={smallLabel}>{name}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 rounded-[var(--radius-md)] border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
        style={fontLabel}
      />
    </div>
  );
}

function BooleanControl({ name, value, onChange }: { name: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-muted-foreground" style={smallLabel}>{name}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-[var(--radius-full)] transition-colors cursor-pointer
          ${value ? "bg-primary" : "bg-muted"}
        `}
        role="switch"
        aria-checked={value}
      >
        <span
          className="absolute w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
          style={{
            top: "50%",
            transform: `translateY(-50%) translateX(${value ? 18 : 2}px)`,
            left: 0,
          }}
        />
      </button>
    </div>
  );
}

function SelectControl({ name, value, options, onChange }: { name: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-muted-foreground" style={smallLabel}>{name}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1 rounded-[var(--radius)] transition-all cursor-pointer
              ${value === opt
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"}
            `}
            style={btnStyle}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberControl({ name, value, onChange, min = 0, max = 100, step = 1 }: {
  name: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-muted-foreground" style={smallLabel}>{name}</label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border border-border text-foreground hover:bg-muted cursor-pointer transition-colors"
        >
          -
        </button>
        <span className="w-10 text-center text-foreground" style={fontLabel}>{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] border border-border text-foreground hover:bg-muted cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ComponentPreviewPage() {
  const { t } = useI18n();
  const registry = useMemo(() => buildRegistry(), []);
  const [selectedId, setSelectedId] = useState(registry[0].id);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const entry = useMemo(() => registry.find((r) => r.id === selectedId)!, [registry, selectedId]);

  // Build initial values from defaults
  const [propValues, setPropValues] = useState<Record<string, Record<string, unknown>>>(() => {
    const map: Record<string, Record<string, unknown>> = {};
    for (const comp of registry) {
      const defaults: Record<string, unknown> = {};
      for (const p of comp.props) {
        defaults[p.name] = p.defaultValue;
      }
      map[comp.id] = defaults;
    }
    return map;
  });

  const currentValues = propValues[selectedId] ?? {};

  const updateProp = useCallback(
    (name: string, value: unknown) => {
      setPropValues((prev) => ({
        ...prev,
        [selectedId]: { ...(prev[selectedId] ?? {}), [name]: value },
      }));
    },
    [selectedId],
  );

  const resetProps = useCallback(() => {
    const defaults: Record<string, unknown> = {};
    for (const p of entry.props) {
      defaults[p.name] = p.defaultValue;
    }
    setPropValues((prev) => ({ ...prev, [selectedId]: defaults }));
  }, [entry, selectedId]);

  const jsxCode = useMemo(() => generateJSX(entry, currentValues), [entry, currentValues]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(jsxCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [jsxCode]);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} />
          <span>{t("breadcrumb.docs")}</span>
          <ChevronRight size={12} />
          <span>{t("page.preview.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.preview.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.preview.desc")}
        </p>
      </div>

      {/* Component Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-muted-foreground" style={fontLabelBold}>
          {t("preview.component")}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {registry.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`px-3 py-1.5 rounded-[var(--radius-md)] transition-all cursor-pointer
                ${selectedId === comp.id
                  ? "bg-primary text-primary-foreground shadow-elevation-sm"
                  : "bg-muted text-foreground hover:bg-muted/80"}
              `}
              style={btnStyle}
            >
              {comp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Preview + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* ─── Preview Panel ─── */}
        <div className="space-y-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border border-border rounded-t-[var(--radius-md)] border-b-0">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-primary" />
              <span className="text-foreground" style={fontLabelBold}>
                {t("preview.livePreview")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {(Object.keys(viewportConfig) as Viewport[]).map((vp) => (
                <button
                  key={vp}
                  onClick={() => setViewport(vp)}
                  className={`p-1.5 rounded-[var(--radius-sm)] transition-colors cursor-pointer
                    ${viewport === vp
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"}
                  `}
                  title={viewportConfig[vp].label}
                >
                  {viewportConfig[vp].icon}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Area */}
          <div className="border border-border bg-background rounded-b-[var(--radius-md)] overflow-hidden">
            <div
              className="mx-auto transition-all duration-300 flex items-center justify-center p-10 min-h-[200px]"
              style={{
                maxWidth: viewportConfig[viewport].width,
                background: "repeating-conic-gradient(var(--muted) 0% 25%, transparent 0% 50%) 0 0 / 16px 16px",
              }}
            >
              <div className="bg-background rounded-[var(--radius-md)] p-8 shadow-elevation-sm border border-border/50 w-full flex items-center justify-center">
                {entry.renderPreview(currentValues)}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Controls Panel ─── */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden h-fit lg:sticky lg:top-6">
          {/* Controls Header */}
          <div className="px-4 py-3 bg-muted/30 border-b border-border flex items-center justify-between">
            <span className="text-foreground" style={fontLabelBold}>
              {t("preview.props")}
            </span>
            <button
              onClick={resetProps}
              className="flex items-center gap-1 px-2 py-1 rounded-[var(--radius-sm)] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title={t("preview.reset")}
            >
              <RotateCcw size={12} />
              <span style={btnStyle}>
                {t("preview.reset")}
              </span>
            </button>
          </div>

          {/* Controls List */}
          <div className="p-4 space-y-4">
            {entry.props.map((prop) => (
              <div key={prop.name}>
                {prop.type === "string" && (
                  <StringControl
                    name={prop.name}
                    value={String(currentValues[prop.name] ?? prop.defaultValue)}
                    onChange={(v) => updateProp(prop.name, v)}
                  />
                )}
                {prop.type === "boolean" && (
                  <BooleanControl
                    name={prop.name}
                    value={Boolean(currentValues[prop.name] ?? prop.defaultValue)}
                    onChange={(v) => updateProp(prop.name, v)}
                  />
                )}
                {prop.type === "select" && prop.options && (
                  <SelectControl
                    name={prop.name}
                    value={String(currentValues[prop.name] ?? prop.defaultValue)}
                    options={prop.options}
                    onChange={(v) => updateProp(prop.name, v)}
                  />
                )}
                {prop.type === "number" && (
                  <NumberControl
                    name={prop.name}
                    value={Number(currentValues[prop.name] ?? prop.defaultValue)}
                    onChange={(v) => updateProp(prop.name, v)}
                    min={prop.min}
                    max={prop.max}
                    step={prop.step}
                  />
                )}
                {prop.description && (
                  <p className="text-muted-foreground mt-0.5" style={smallLabel}>
                    {prop.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Generated Code ─── */}
      <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
        <div
          className="w-full px-4 py-3 bg-muted/30 border-b border-border flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setShowCode(!showCode)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowCode(!showCode); } }}
        >
          <div className="flex items-center gap-2">
            <span className="text-foreground" style={fontLabelBold}>
              {t("preview.generatedCode")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title={t("common.copyCode")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); handleCopy(); } }}
            >
              {copied ? <Check size={12} className="text-chart-2" /> : <Copy size={12} />}
              <span style={btnStyle}>
                {copied ? t("common.copied") : t("common.copyCode")}
              </span>
            </span>
            <ChevronDown
              size={16}
              className={`text-muted-foreground transition-transform ${showCode ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        {showCode && (
          <div className="p-4">
            <CodeBlock code={jsxCode} />
          </div>
        )}
      </div>
    </div>
  );
}