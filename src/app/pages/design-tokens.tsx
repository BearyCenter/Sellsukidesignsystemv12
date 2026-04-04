import React, { useState, useEffect, useRef } from "react";
import { Layers, ChevronRight, Paintbrush, Type, Box, Palette, Sun, Moon, Copy, Check } from "lucide-react";
import { Tabs } from "../../lib/components/ds-tabs";
import { CodeBlock } from "../components/code-block";
import { useI18n } from "../i18n";
import { fontBody, fontLabel, btnStyle, smallLabel } from "./_showcase-factory";

// Copy helper
function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = (text: string, key: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch { /* ignore */ }
  };
  return { copiedKey, copy };
}

function TokenSwatch({ name, variable, value, preview, type }: { name: string; variable: string; value: string; preview?: React.ReactNode; type?: string }) {
  const { copiedKey, copy } = useCopy();
  const isCopied = copiedKey === variable;
  // For size/font/weight tokens: read actual computed CSS value so display always matches reality
  const displayValue = React.useMemo(() => {
    if ((type === "size" || type === "font" || type === "weight") && typeof window !== "undefined") {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
      return computed || value;
    }
    return value;
  }, [variable, value, type]);
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-[var(--radius)] border border-border hover:bg-muted/30 transition-colors group cursor-pointer"
      onClick={() => copy(`var(${variable})`, variable)}
    >
      {preview}
      <div className="flex-1 min-w-0">
        <span className="text-foreground block truncate" style={{ ...fontLabel, fontWeight: "var(--weight-button)" }}>{name}</span>
        <span className="text-muted-foreground block truncate" style={smallLabel}>{variable}</span>
      </div>
      <span className="text-muted-foreground truncate max-w-[120px] hidden sm:block" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>{displayValue}</span>
      <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        {isCopied ? <Check size={14} className="text-chart-2" /> : <Copy size={14} />}
      </span>
    </div>
  );
}

function ColorSwatch({ variable }: { variable: string }) {
  return (
    <div className="w-9 h-9 rounded-[var(--radius-sm)] border border-border flex-shrink-0 shadow-elevation-sm" style={{ backgroundColor: `var(${variable})` }} />
  );
}

// ─── Token data ──────────────────────────────────────────────────────────────

interface TokenCategory {
  title: string;
  description: string;
  tokens: { name: string; variable: string; value: string; type: "color" | "size" | "radius" | "shadow" | "font" | "weight" }[];
}

const primitiveTokens: TokenCategory[] = [
  {
    title: "Base Colors — Sky (Brand Primary)",
    description: "The SSK brand primary palette. Sky-500 is the core brand color used throughout the system.",
    tokens: [
      { name: "Sky 50", variable: "--Base_Color--Sky--50", value: "rgba(240, 249, 255, 1)", type: "color" },
      { name: "Sky 100", variable: "--Base_Color--Sky--100", value: "rgba(217, 242, 255, 1)", type: "color" },
      { name: "Sky 200", variable: "--Base_Color--Sky--200", value: "rgba(188, 232, 255, 1)", type: "color" },
      { name: "Sky 300", variable: "--Base_Color--Sky--300", value: "rgba(142, 220, 255, 1)", type: "color" },
      { name: "Sky 400", variable: "--Base_Color--Sky--400", value: "rgba(88, 198, 255, 1)", type: "color" },
      { name: "Sky 500", variable: "--Base_Color--Sky--500", value: "rgba(50, 169, 255, 1)", type: "color" },
      { name: "Sky 600", variable: "--Base_Color--Sky--600", value: "rgba(27, 139, 245, 1)", type: "color" },
      { name: "Sky 700", variable: "--Base_Color--Sky--700", value: "rgba(20, 115, 225, 1)", type: "color" },
      { name: "Sky 800", variable: "--Base_Color--Sky--800", value: "rgba(23, 92, 182, 1)", type: "color" },
      { name: "Sky 900", variable: "--Base_Color--Sky--900", value: "rgba(25, 79, 143, 1)", type: "color" },
    ],
  },
  {
    title: "Base Colors — Gray (Neutral)",
    description: "Neutral grays for backgrounds, text, borders, and disabled states.",
    tokens: [
      { name: "Gray 50", variable: "--Base_Color--Gray--50", value: "rgba(249, 250, 251, 1)", type: "color" },
      { name: "Gray 100", variable: "--Base_Color--Gray--100", value: "rgba(243, 244, 246, 1)", type: "color" },
      { name: "Gray 200", variable: "--Base_Color--Gray--200", value: "rgba(229, 231, 235, 1)", type: "color" },
      { name: "Gray 300", variable: "--Base_Color--Gray--300", value: "rgba(209, 213, 219, 1)", type: "color" },
      { name: "Gray 400", variable: "--Base_Color--Gray--400", value: "rgba(156, 163, 175, 1)", type: "color" },
      { name: "Gray 500", variable: "--Base_Color--Gray--500", value: "rgba(107, 114, 128, 1)", type: "color" },
      { name: "Gray 600", variable: "--Base_Color--Gray--600", value: "rgba(75, 85, 99, 1)", type: "color" },
      { name: "Gray 700", variable: "--Base_Color--Gray--700", value: "rgba(55, 65, 81, 1)", type: "color" },
      { name: "Gray 800", variable: "--Base_Color--Gray--800", value: "rgba(31, 41, 55, 1)", type: "color" },
      { name: "Gray 900", variable: "--Base_Color--Gray--900", value: "rgba(17, 24, 39, 1)", type: "color" },
    ],
  },
  {
    title: "Base Colors — Rose (Danger)",
    description: "Used for destructive actions, error states, and danger feedback.",
    tokens: [
      { name: "Rose 50", variable: "--Base_Color--Rose--50", value: "rgba(255, 241, 242, 1)", type: "color" },
      { name: "Rose 300", variable: "--Base_Color--Rose--300", value: "rgba(253, 164, 175, 1)", type: "color" },
      { name: "Rose 500", variable: "--Base_Color--Rose--500", value: "rgba(244, 63, 94, 1)", type: "color" },
      { name: "Rose 600", variable: "--Base_Color--Rose--600", value: "rgba(225, 29, 72, 1)", type: "color" },
      { name: "Rose 700", variable: "--Base_Color--Rose--700", value: "rgba(190, 18, 60, 1)", type: "color" },
    ],
  },
  {
    title: "Base Colors — Emerald (Success) & Amber (Warning)",
    description: "Feedback palette for success and warning states.",
    tokens: [
      { name: "Emerald 50", variable: "--Base_Color--Emerald--50", value: "rgba(236, 253, 245, 1)", type: "color" },
      { name: "Emerald 500", variable: "--Base_Color--Emerald--500", value: "rgba(16, 185, 129, 1)", type: "color" },
      { name: "Emerald 600", variable: "--Base_Color--Emerald--600", value: "rgba(5, 150, 105, 1)", type: "color" },
      { name: "Amber 50", variable: "--Base_Color--Amber--50", value: "rgba(255, 251, 235, 1)", type: "color" },
      { name: "Amber 400", variable: "--Base_Color--Amber--400", value: "rgba(251, 191, 36, 1)", type: "color" },
      { name: "Amber 500", variable: "--Base_Color--Amber--500", value: "rgba(245, 158, 11, 1)", type: "color" },
      { name: "Amber 600", variable: "--Base_Color--Amber--600", value: "rgba(217, 119, 6, 1)", type: "color" },
      { name: "Orange 500", variable: "--Base_Color--Orange--500", value: "rgba(249, 115, 22, 1)", type: "color" },
    ],
  },
  {
    title: "Primitive — Spacing Scale",
    description: "The 22-step spacing scale from 0px to 128px. Used by all Spacing--* semantic tokens.",
    tokens: [
      { name: "space-0", variable: "--Space--space-0", value: "0px", type: "size" },
      { name: "space-1", variable: "--Space--space-1", value: "1px", type: "size" },
      { name: "space-2", variable: "--Space--space-2", value: "2px", type: "size" },
      { name: "space-4", variable: "--Space--space-4", value: "4px", type: "size" },
      { name: "space-6", variable: "--Space--space-6", value: "6px", type: "size" },
      { name: "space-8", variable: "--Space--space-8", value: "8px", type: "size" },
      { name: "space-12", variable: "--Space--space-12", value: "12px", type: "size" },
      { name: "space-16", variable: "--Space--space-16", value: "16px", type: "size" },
      { name: "space-24", variable: "--Space--space-24", value: "24px", type: "size" },
      { name: "space-32", variable: "--Space--space-32", value: "32px", type: "size" },
      { name: "space-48", variable: "--Space--space-48", value: "48px", type: "size" },
      { name: "space-64", variable: "--Space--space-64", value: "64px", type: "size" },
      { name: "space-96", variable: "--Space--space-96", value: "96px", type: "size" },
      { name: "space-128", variable: "--Space--space-128", value: "128px", type: "size" },
    ],
  },
  {
    title: "Primitive — Typography",
    description: "Font families, sizes, and weights. DB HeaventRounded for all text — headings, body, labels, buttons.",
    tokens: [
      { name: "Font Heading", variable: "--font-h1", value: "'DB HeaventRounded'", type: "font" },
      { name: "Font Body", variable: "--font-p", value: "'DB HeaventRounded'", type: "font" },
      { name: "Font Label", variable: "--font-label", value: "'DB HeaventRounded'", type: "font" },
      { name: "Font Button", variable: "--font-button", value: "'DB HeaventRounded'", type: "font" },
      { name: "Size H1", variable: "--text-h1", value: "48px", type: "size" },
      { name: "Size H2", variable: "--text-h2", value: "40px", type: "size" },
      { name: "Size H3", variable: "--text-h3", value: "28px", type: "size" },
      { name: "Size H4", variable: "--text-h4", value: "24px", type: "size" },
      { name: "Size Body", variable: "--text-p", value: "20px", type: "size" },
      { name: "Size Label", variable: "--text-label", value: "18px", type: "size" },
      { name: "Size Caption", variable: "--text-caption", value: "14px", type: "size" },
      { name: "Size Button", variable: "--text-button", value: "18px", type: "size" },
      { name: "Weight Normal", variable: "--weight-p", value: "400", type: "weight" },
      { name: "Weight Medium", variable: "--weight-h4", value: "500", type: "weight" },
      { name: "Weight Semibold", variable: "--weight-button", value: "600", type: "weight" },
      { name: "Weight Bold", variable: "--weight-h3", value: "700", type: "weight" },
    ],
  },
];

const semanticTokens: TokenCategory[] = [
  {
    title: "Text Colors",
    description: "Semantic text color tokens mapped from Base_Color primitives.",
    tokens: [
      { name: "Text Primary", variable: "--Colors--Text--text-primary", value: "Gray-800", type: "color" },
      { name: "Text Primary Hover", variable: "--Colors--Text--text-primary-hover", value: "Gray-900", type: "color" },
      { name: "Text Secondary", variable: "--Colors--Text--text-secondary", value: "Gray-500", type: "color" },
      { name: "Text Disabled", variable: "--Colors--Text--text-disabled", value: "Gray-400", type: "color" },
      { name: "Text Placeholder", variable: "--Colors--Text--text-placeholder", value: "Gray-400", type: "color" },
      { name: "Text Brand", variable: "--Colors--Text--text-brand-primary", value: "Sky-500", type: "color" },
      { name: "Text Brand Hover", variable: "--Colors--Text--text-brand-hover", value: "Sky-600", type: "color" },
      { name: "Text White", variable: "--Colors--Text--text-white", value: "White-50", type: "color" },
      { name: "Text Danger", variable: "--Colors--Text--text-danger-primary", value: "Rose-600", type: "color" },
      { name: "Text Warning", variable: "--Colors--Text--text-warning-primary", value: "Amber-600", type: "color" },
      { name: "Text Success", variable: "--Colors--Text--text-success-primary", value: "Emerald-600", type: "color" },
      { name: "Text Info", variable: "--Colors--Text--text-info", value: "Sky-500", type: "color" },
      { name: "Text Link", variable: "--Colors--Text--Link", value: "Sky-600", type: "color" },
    ],
  },
  {
    title: "Background Colors",
    description: "Surface and background tokens for cards, overlays, feedback states, and brand areas.",
    tokens: [
      { name: "BG Primary", variable: "--Colors--Background--bg-primary", value: "White-50", type: "color" },
      { name: "BG Primary Hover", variable: "--Colors--Background--bg-primary_hover", value: "Gray-50", type: "color" },
      { name: "BG Secondary", variable: "--Colors--Background--bg-secondary", value: "Gray-100", type: "color" },
      { name: "BG Quaternary", variable: "--Colors--Background--bg-quaternary", value: "Gray-50", type: "color" },
      { name: "BG Active", variable: "--Colors--Background--bg-active", value: "Gray-100", type: "color" },
      { name: "BG Disabled", variable: "--Colors--Background--bg-disabled", value: "Gray-200", type: "color" },
      { name: "BG Brand Primary", variable: "--Colors--Background--bg-brand-primary", value: "Sky-50", type: "color" },
      { name: "BG Brand Solid", variable: "--Colors--Background--bg-brand-solid", value: "Sky-500", type: "color" },
      { name: "BG Brand Solid Hover", variable: "--Colors--Background--bg-brand-solid-hover", value: "Sky-600", type: "color" },
      { name: "BG Error", variable: "--Colors--Background--bg-error-primary", value: "Rose-50", type: "color" },
      { name: "BG Danger Solid", variable: "--Colors--Background--bg-danger-solid", value: "Rose-600", type: "color" },
      { name: "BG Warning", variable: "--Colors--Background--bg-warning-primary", value: "Amber-50", type: "color" },
      { name: "BG Success", variable: "--Colors--Background--bg-success-primary", value: "Emerald-50", type: "color" },
      { name: "BG Info", variable: "--Colors--Background--bg-info-primary", value: "Sky-50", type: "color" },
    ],
  },
  {
    title: "Stroke / Border Colors",
    description: "Border and stroke tokens for inputs, cards, feedback outlines, and dividers.",
    tokens: [
      { name: "Stroke Primary", variable: "--Colors--Stroke--stroke-primary", value: "Gray-200", type: "color" },
      { name: "Stroke Secondary", variable: "--Colors--Stroke--stroke-secondary", value: "Gray-300", type: "color" },
      { name: "Stroke Disabled", variable: "--Colors--Stroke--stroke-disabled", value: "Gray-300", type: "color" },
      { name: "Stroke Brand", variable: "--Colors--Stroke--stroke-brand", value: "Sky-300", type: "color" },
      { name: "Stroke Brand Solid", variable: "--Colors--Stroke--stroke-brand-solid", value: "Sky-500", type: "color" },
      { name: "Stroke Danger", variable: "--Colors--Stroke--stroke-danger", value: "Rose-400", type: "color" },
      { name: "Stroke Danger Solid", variable: "--Colors--Stroke--stroke-danger-solid", value: "Rose-600", type: "color" },
      { name: "Stroke Warning", variable: "--Colors--Stroke--stroke-warning", value: "Amber-400", type: "color" },
      { name: "Stroke Success", variable: "--Colors--Stroke--stroke-success", value: "Emerald-400", type: "color" },
      { name: "Stroke Info", variable: "--Colors--Stroke--stroke-info", value: "Sky-300", type: "color" },
      { name: "Stroke Gray Lighter", variable: "--Colors--Stroke--stroke-gray-lighter", value: "Gray-100", type: "color" },
    ],
  },
  {
    title: "Icon / Foreground Colors",
    description: "Tokens for icon and foreground element colors across all states.",
    tokens: [
      { name: "Icon Primary", variable: "--Colors--Icon--icon-primary", value: "Gray-500", type: "color" },
      { name: "Icon Disabled", variable: "--Colors--Icon--icon-disabled", value: "Gray-400", type: "color" },
      { name: "Icon Brand", variable: "--Colors--Icon--icon-brand", value: "Sky-500", type: "color" },
      { name: "Icon Info", variable: "--Colors--Icon--icon-info", value: "Sky-500", type: "color" },
      { name: "Icon Error", variable: "--Colors--Icon--icon-error", value: "Rose-600", type: "color" },
      { name: "Icon Success", variable: "--Colors--Icon--icon-success", value: "Emerald-600", type: "color" },
      { name: "Icon Warning", variable: "--Colors--Icon--icon-warning", value: "Amber-600", type: "color" },
      { name: "Icon White", variable: "--Colors--Icon--icon-white", value: "White-50", type: "color" },
      { name: "Icon Dark", variable: "--Colors--Icon--icon-dark", value: "Gray-900", type: "color" },
    ],
  },
  {
    title: "Button Variant Tokens",
    description: "Per-variant fg, bg, and border tokens for Solid, Outline, Ghost, and Danger button styles.",
    tokens: [
      { name: "Solid FG", variable: "--Colors--Button--Solid--button-solid-fg", value: "White-50", type: "color" },
      { name: "Solid BG", variable: "--Colors--Button--Solid--button-solid-bg", value: "Sky-500", type: "color" },
      { name: "Solid BG Hover", variable: "--Colors--Button--Solid--button-solid-bg_hover", value: "Sky-600", type: "color" },
      { name: "Outline FG", variable: "--Colors--Button--Outline--button-outline-fg", value: "Sky-500", type: "color" },
      { name: "Outline Border", variable: "--Colors--Button--Outline--button-outline-border", value: "Sky-500", type: "color" },
      { name: "Ghost FG", variable: "--Colors--Button--Ghost--button-Ghost-fg", value: "Sky-500", type: "color" },
      { name: "Solid Light FG", variable: "--Colors--Button--Solid_Light--button-solid_light-fg", value: "Gray-800", type: "color" },
      { name: "Solid Light Border", variable: "--Colors--Button--Solid_Light--button-solid_light-border", value: "Gray-200", type: "color" },
      { name: "Danger FG", variable: "--Colors--Button--Solid_Danger--button-solid_danger-fg", value: "White-50", type: "color" },
      { name: "Danger BG", variable: "--Colors--Button--Solid_Danger--button-solid_danger-bg", value: "Rose-600", type: "color" },
    ],
  },
  {
    title: "Spacing Aliases",
    description: "Semantic spacing scale from none (0px) to 15xl (128px), aliased from Space primitives.",
    tokens: [
      { name: "Spacing none", variable: "--Spacing--Spacing-none", value: "0px", type: "size" },
      { name: "Spacing xs", variable: "--Spacing--Spacing-xs", value: "2px", type: "size" },
      { name: "Spacing sm", variable: "--Spacing--Spacing-sm", value: "4px", type: "size" },
      { name: "Spacing md", variable: "--Spacing--Spacing-md", value: "6px", type: "size" },
      { name: "Spacing lg", variable: "--Spacing--Spacing-lg", value: "8px", type: "size" },
      { name: "Spacing xl", variable: "--Spacing--Spacing-xl", value: "10px", type: "size" },
      { name: "Spacing 2xl", variable: "--Spacing--Spacing-2xl", value: "12px", type: "size" },
      { name: "Spacing 3xl", variable: "--Spacing--Spacing-3xl", value: "16px", type: "size" },
      { name: "Spacing 5xl", variable: "--Spacing--Spacing-5xl", value: "24px", type: "size" },
      { name: "Spacing 6xl", variable: "--Spacing--Spacing-6xl", value: "32px", type: "size" },
      { name: "Spacing 9xl", variable: "--Spacing--Spacing-9xl", value: "48px", type: "size" },
      { name: "Spacing 15xl", variable: "--Spacing--Spacing-15xl", value: "128px", type: "size" },
    ],
  },
  {
    title: "Border Radius Aliases",
    description: "Semantic border-radius scale from none to full, aliased from Space primitives.",
    tokens: [
      { name: "Radius none", variable: "--Border-radius--radius-none", value: "0px", type: "radius" },
      { name: "Radius xxs", variable: "--Border-radius--radius-xxs", value: "2px", type: "radius" },
      { name: "Radius xs", variable: "--Border-radius--radius-xs", value: "4px", type: "radius" },
      { name: "Radius sm", variable: "--Border-radius--radius-sm", value: "6px", type: "radius" },
      { name: "Radius md", variable: "--Border-radius--radius-md", value: "8px", type: "radius" },
      { name: "Radius lg", variable: "--Border-radius--radius-lg", value: "12px", type: "radius" },
      { name: "Radius xl", variable: "--Border-radius--radius-xl", value: "16px", type: "radius" },
      { name: "Radius 2xl", variable: "--Border-radius--radius-2xl", value: "20px", type: "radius" },
      { name: "Radius 3xl", variable: "--Border-radius--radius-3xl", value: "24px", type: "radius" },
      { name: "Radius 4xl", variable: "--Border-radius--radius-4xl", value: "32px", type: "radius" },
      { name: "Radius full", variable: "--Border-radius--radius-full", value: "9999px", type: "radius" },
    ],
  },
  {
    title: "Border Width",
    description: "Border thickness tokens from none (0) to sm (4px).",
    tokens: [
      { name: "Border none", variable: "--Border_Width--border-none", value: "0px", type: "size" },
      { name: "Border xxs", variable: "--Border_Width--border-xxs", value: "1px", type: "size" },
      { name: "Border xs", variable: "--Border_Width--border-xs", value: "2px", type: "size" },
      { name: "Border sm", variable: "--Border_Width--border-sm", value: "4px", type: "size" },
    ],
  },
];

const componentTokenExamples = [
  {
    component: "Button",
    tokens: [
      { prop: "Background", token: "var(--primary)", fallback: "bg-primary" },
      { prop: "Text", token: "var(--primary-foreground)", fallback: "text-primary-foreground" },
      { prop: "Border Radius", token: "var(--radius-md)", fallback: "rounded-[var(--radius-md)]" },
      { prop: "Font", token: "var(--font-button)", fallback: "font-family: var(--font-button)" },
      { prop: "Font Size", token: "var(--text-button)", fallback: "font-size: var(--text-button)" },
      { prop: "Font Weight", token: "var(--weight-button)", fallback: "font-weight: var(--weight-button)" },
    ],
  },
  {
    component: "Input",
    tokens: [
      { prop: "Background", token: "var(--input-background)", fallback: "bg-input-background" },
      { prop: "Border", token: "var(--border)", fallback: "border-border" },
      { prop: "Focus Ring", token: "var(--ring)", fallback: "ring-ring" },
      { prop: "Text", token: "var(--foreground)", fallback: "text-foreground" },
      { prop: "Placeholder", token: "var(--muted-foreground)", fallback: "text-muted-foreground" },
      { prop: "Border Radius", token: "var(--radius-md)", fallback: "rounded-[var(--radius-md)]" },
    ],
  },
  {
    component: "Card",
    tokens: [
      { prop: "Background", token: "var(--card)", fallback: "bg-card" },
      { prop: "Text", token: "var(--card-foreground)", fallback: "text-card-foreground" },
      { prop: "Border", token: "var(--border)", fallback: "border-border" },
      { prop: "Border Radius", token: "var(--radius-md)", fallback: "rounded-[var(--radius-md)]" },
      { prop: "Shadow", token: "var(--elevation-sm)", fallback: "shadow-elevation-sm" },
    ],
  },
  {
    component: "Alert",
    tokens: [
      { prop: "Info BG", token: "var(--primary) @ 5%", fallback: "bg-primary/5" },
      { prop: "Success BG", token: "var(--chart-2) @ 5%", fallback: "bg-chart-2/5" },
      { prop: "Warning BG", token: "var(--chart-5) @ 5%", fallback: "bg-chart-5/5" },
      { prop: "Error BG", token: "var(--destructive) @ 5%", fallback: "bg-destructive/5" },
    ],
  },
];

function TokenGrid({ category }: { category: TokenCategory }) {
  return (
    <div className="space-y-3">
      <div>
        <span className="text-foreground block" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>
          {category.title}
        </span>
        <span className="text-muted-foreground block mt-0.5" style={smallLabel}>{category.description}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {category.tokens.map((token) => (
          <TokenSwatch
            key={token.variable + token.name}
            name={token.name}
            variable={token.variable}
            value={token.value}
            type={token.type}
            preview={
              token.type === "color" ? (
                <ColorSwatch variable={token.variable} />
              ) : token.type === "radius" ? (
                <div className="w-9 h-9 border-2 border-primary bg-primary/10 flex-shrink-0" style={{ borderRadius: `var(${token.variable})` }} />
              ) : token.type === "shadow" ? (
                <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-card flex-shrink-0" style={{ boxShadow: `var(${token.variable})` }} />
              ) : token.type === "font" ? (
                <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <Type size={16} className="text-primary" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <Box size={16} className="text-muted-foreground" />
                </div>
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export function DesignTokensPage() {
  const { t } = useI18n();
  const tabs = [
    {
      id: "primitive",
      label: t("tokens.primitive"),
      icon: <Palette size={14} />,
      content: (
        <div className="space-y-10">
          <div className="p-4 rounded-[var(--radius)] bg-accent/50 border border-primary/20">
            <span className="text-foreground block" style={{ ...fontLabel, fontWeight: "var(--weight-button)" }}>{t("tokens.primitive")}</span>
            <span className="text-muted-foreground block mt-0.5" style={smallLabel}>
              {t("tokens.primitiveDesc")}
            </span>
          </div>
          {primitiveTokens.map((cat) => <TokenGrid key={cat.title} category={cat} />)}
        </div>
      ),
    },
    {
      id: "semantic",
      label: t("tokens.semantic"),
      icon: <Paintbrush size={14} />,
      content: (
        <div className="space-y-10">
          <div className="p-4 rounded-[var(--radius)] bg-accent/50 border border-primary/20">
            <span className="text-foreground block" style={{ ...fontLabel, fontWeight: "var(--weight-button)" }}>{t("tokens.semantic")}</span>
            <span className="text-muted-foreground block mt-0.5" style={smallLabel}>
              {t("tokens.semanticDesc")}
            </span>
          </div>
          {semanticTokens.map((cat) => <TokenGrid key={cat.title} category={cat} />)}
        </div>
      ),
    },
    {
      id: "component",
      label: t("tokens.component"),
      icon: <Box size={14} />,
      content: (
        <div className="space-y-10">
          <div className="p-4 rounded-[var(--radius)] bg-accent/50 border border-primary/20">
            <span className="text-foreground block" style={{ ...fontLabel, fontWeight: "var(--weight-button)" }}>{t("tokens.component")}</span>
            <span className="text-muted-foreground block mt-0.5" style={smallLabel}>
              {t("tokens.componentDesc")}
            </span>
          </div>
          <div className="space-y-8">
            {componentTokenExamples.map((comp) => (
              <div key={comp.component} className="rounded-[var(--radius-md)] border border-border overflow-hidden">
                <div className="px-5 py-3 bg-muted/30 border-b border-border">
                  <span className="text-foreground" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>{comp.component}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/10">
                        <th className="text-left px-5 py-2.5 text-muted-foreground" style={btnStyle}>Property</th>
                        <th className="text-left px-5 py-2.5 text-muted-foreground" style={btnStyle}>Token</th>
                        <th className="text-left px-5 py-2.5 text-muted-foreground" style={btnStyle}>Tailwind Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comp.tokens.map((t, i) => (
                        <tr key={t.prop} className={`border-b border-border last:border-b-0 ${i % 2 === 1 ? "bg-muted/5" : ""}`}>
                          <td className="px-5 py-2.5 text-foreground" style={fontLabel}>{t.prop}</td>
                          <td className="px-5 py-2.5">
                            <code className="px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-muted/50 text-primary" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>{t.token}</code>
                          </td>
                          <td className="px-5 py-2.5">
                            <code className="px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-muted/50 text-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>{t.fallback}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Paintbrush size={14} /><span>{t("breadcrumb.foundation")}</span><ChevronRight size={12} /><span>{t("page.tokens.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.tokens.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.tokens.desc")}
        </p>
      </div>

      {/* Token Architecture Diagram */}
      <div className="p-6 rounded-[var(--radius-md)] border border-border bg-card">
        <span className="text-foreground block mb-4" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>
          {t("tokens.architecture")}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { level: "Primitive", desc: "Raw values: colors, sizes, weights", example: "--primary: rgba(50,169,255,1)", color: "bg-chart-5/10 border-chart-5/30 text-chart-5" },
            { level: "Semantic", desc: "Purpose-driven: background, foreground, destructive", example: "--background: var(--gray-50)", color: "bg-primary/10 border-primary/30 text-primary" },
            { level: "Component", desc: "Per-component: button-bg, input-border, card-shadow", example: "Button BG → var(--primary)", color: "bg-chart-2/10 border-chart-2/30 text-chart-2" },
          ].map((tier, i) => (
            <div key={tier.level} className={`p-4 rounded-[var(--radius)] border ${tier.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-current/10 flex items-center justify-center flex-shrink-0" style={btnStyle}>{i + 1}</span>
                <span style={{ ...fontLabel, fontWeight: "var(--weight-button)" }}>{tier.level}</span>
              </div>
              <span className="text-foreground block" style={smallLabel}>{tier.desc}</span>
              <code className="block mt-2 px-2 py-1 rounded-[var(--radius-sm)] bg-card/80 text-muted-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>{tier.example}</code>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-muted-foreground" style={smallLabel}>Primitive → Semantic → Component</span>
        </div>
      </div>

      {/* Typography Preview */}
      <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/20">
          <span className="text-foreground" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>
            {t("tokens.typographyScale")}
          </span>
        </div>
        <div className="px-6 py-5 space-y-4">
          {(() => {
            const rows = [
              { tag: "H1", font: "--font-h1", size: "--text-h1", weight: "--weight-h1", sample: "Display Heading" },
              { tag: "H2", font: "--font-h2", size: "--text-h2", weight: "--weight-h2", sample: "Page Title" },
              { tag: "H3", font: "--font-h3", size: "--text-h3", weight: "--weight-h3", sample: "Section Title" },
              { tag: "H4", font: "--font-h4", size: "--text-h4", weight: "--weight-h4", sample: "Card Heading" },
              { tag: "Body", font: "--font-p", size: "--text-p", weight: "--weight-p", sample: "Body text for content and paragraphs" },
              { tag: "Label", font: "--font-label", size: "--text-label", weight: "--weight-label", sample: "Form labels, helper text" },
              { tag: "Caption", font: "--font-caption", size: "--text-caption", weight: "--weight-caption", sample: "Breadcrumbs, navigation" },
              { tag: "Button", font: "--font-button", size: "--text-button", weight: "--weight-button", sample: "Button Label Text" },
            ];
            const cs = typeof window !== "undefined" ? getComputedStyle(document.documentElement) : null;
            return rows.map((row) => {
              const computedPx = cs ? cs.getPropertyValue(row.size).trim() : "";
              return (
                <div key={row.tag} className="flex items-baseline gap-4 py-2 border-b border-border/50 last:border-b-0">
                  <span className="w-16 flex-shrink-0 text-muted-foreground" style={btnStyle}>{row.tag}</span>
                  <span
                    className="flex-1 text-foreground truncate"
                    style={{ fontFamily: `var(${row.font})`, fontSize: `var(${row.size})`, fontWeight: `var(${row.weight})` as any }}
                  >
                    {row.sample}
                  </span>
                  <span className="flex-shrink-0 hidden md:flex items-center gap-2">
                    <span className="text-primary font-medium" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>{computedPx}</span>
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>{row.size.replace("--", "")}</span>
                  </span>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Tabbed Token Explorer */}
      <Tabs tabs={tabs} variant="bordered" />

      {/* Usage Guide */}
      <div className="space-y-4">
        <h4 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700", lineHeight: "1.3" }}>{t("tokens.usageGuide")}</h4>
        <p className="text-muted-foreground" style={fontLabel}>
          {t("tokens.usageGuideDesc")} <code className="px-1 py-0.5 rounded-[var(--radius-sm)] bg-muted/50 text-primary" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>/src/styles/theme.css</code> {t("tokens.noCodeChanges")}
        </p>
        <CodeBlock code={`/* Example: Change the primary color across all components */
:root {
  --primary: rgba(124, 58, 237, 1);       /* Purple instead of Blue */
  --primary-foreground: rgba(255, 255, 255, 1);
  --ring: rgba(124, 58, 237, 1);
  --accent: rgba(245, 243, 255, 1);        /* Light purple accent */
  --accent-foreground: rgba(124, 58, 237, 1);
}

/* Example: Switch to a different font */
:root {
  --font-h1: 'Noto Sans Thai', sans-serif;
  --font-p: 'Noto Sans Thai', sans-serif;
  --font-label: 'Noto Sans Thai', sans-serif;
  --font-button: 'Inter', sans-serif;      /* Keep Inter for buttons */
}`} />
      </div>
    </div>
  );
}