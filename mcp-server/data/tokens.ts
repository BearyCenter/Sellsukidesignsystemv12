export const colorPalette = {
  brand: {
    name: "Sky (Brand Primary)",
    colors: [
      { token: "--Base_Color--Sky--50", hex: "#f0f9ff", usage: "Brand background light" },
      { token: "--Base_Color--Sky--100", hex: "#d9f2ff", usage: "Brand background secondary" },
      { token: "--Base_Color--Sky--200", hex: "#bce8ff", usage: "Hover light, undo button" },
      { token: "--Base_Color--Sky--300", hex: "#8edcff", usage: "Disabled button solid" },
      { token: "--Base_Color--Sky--400", hex: "#58c6ff", usage: "Brand foreground secondary" },
      { token: "--Base_Color--Sky--500", hex: "#32a9ff", usage: "PRIMARY — button solid, link, brand" },
      { token: "--Base_Color--Sky--600", hex: "#1b8bf5", usage: "Primary hover, ring, link text" },
      { token: "--Base_Color--Sky--700", hex: "#1473e1", usage: "Code function color" },
      { token: "--Base_Color--Sky--800", hex: "#175cb6", usage: "—" },
      { token: "--Base_Color--Sky--900", hex: "#194f8f", usage: "—" },
    ],
  },
  neutral: {
    name: "Gray (Neutral)",
    colors: [
      { token: "--Base_Color--Gray--50", hex: "#f9fafb", usage: "Quaternary bg, disabled soft" },
      { token: "--Base_Color--Gray--100", hex: "#f3f4f6", usage: "Active bg, secondary bg" },
      { token: "--Base_Color--Gray--200", hex: "#e5e7eb", usage: "Stroke primary, disabled bg" },
      { token: "--Base_Color--Gray--300", hex: "#d1d5db", usage: "Stroke secondary, disabled stroke" },
      { token: "--Base_Color--Gray--400", hex: "#9ca3af", usage: "Placeholder, disabled fg, icon" },
      { token: "--Base_Color--Gray--500", hex: "#6b7280", usage: "Text secondary, fg secondary" },
      { token: "--Base_Color--Gray--600", hex: "#4b5563", usage: "Text secondary hover" },
      { token: "--Base_Color--Gray--700", hex: "#374151", usage: "—" },
      { token: "--Base_Color--Gray--800", hex: "#1f2937", usage: "TEXT PRIMARY, fg primary" },
      { token: "--Base_Color--Gray--900", hex: "#111827", usage: "Solid bg, icon dark" },
    ],
  },
  success: {
    name: "Emerald (Success)",
    colors: [
      { token: "--Base_Color--Emerald--50", hex: "#ecfdf5", usage: "Success bg" },
      { token: "--Base_Color--Emerald--100", hex: "#d1fae5", usage: "Success stroke lighter" },
      { token: "--Base_Color--Emerald--400", hex: "#34d399", usage: "Success stroke" },
      { token: "--Base_Color--Emerald--500", hex: "#10b981", usage: "Success fg secondary" },
      { token: "--Base_Color--Emerald--600", hex: "#059669", usage: "SUCCESS SOLID — text, icon" },
    ],
  },
  warning: {
    name: "Amber (Warning)",
    colors: [
      { token: "--Base_Color--Amber--50", hex: "#fffbeb", usage: "Warning bg" },
      { token: "--Base_Color--Amber--100", hex: "#fef3c7", usage: "Warning stroke lighter" },
      { token: "--Base_Color--Amber--400", hex: "#fbbf24", usage: "Warning button, stroke" },
      { token: "--Base_Color--Amber--500", hex: "#f59e0b", usage: "Warning fg secondary" },
      { token: "--Base_Color--Amber--600", hex: "#d97706", usage: "WARNING SOLID — text, icon" },
    ],
  },
  danger: {
    name: "Rose (Danger/Error)",
    colors: [
      { token: "--Base_Color--Rose--50", hex: "#fff1f2", usage: "Error bg" },
      { token: "--Base_Color--Rose--100", hex: "#ffe4e6", usage: "Danger stroke lighter" },
      { token: "--Base_Color--Rose--400", hex: "#fb7185", usage: "Danger stroke" },
      { token: "--Base_Color--Rose--500", hex: "#f43f5e", usage: "Danger fg secondary" },
      { token: "--Base_Color--Rose--600", hex: "#e11d48", usage: "DESTRUCTIVE — danger solid, text" },
      { token: "--Base_Color--Rose--700", hex: "#be123c", usage: "Danger hover" },
    ],
  },
  secondary: {
    name: "Orange (Secondary Brand)",
    colors: [
      { token: "--Base_Color--Orange--500", hex: "#f97316", usage: "Brand secondary accent" },
    ],
  },
};

export const typography = {
  families: [
    { usage: "ALL text (headings, body, label, button, badge, nav, table)", font: "DB HeaventRounded, sans-serif", notes: "Thai-first, rounded — NEVER use Inter" },
  ],
  scale: [
    { token: "--text-h1", size: "48px", weight: "400 (normal)", usage: "Page titles, hero" },
    { token: "--text-h2", size: "40px", weight: "400 (normal)", usage: "Section headers" },
    { token: "--text-h3", size: "28px", weight: "400 (normal)", usage: "Card titles, subsections" },
    { token: "--text-h4", size: "24px", weight: "500 (medium)", usage: "Small headings" },
    { token: "--text-p", size: "20px", weight: "400 (normal)", usage: "Body text, sidebar menu items" },
    { token: "--text-label", size: "18px", weight: "400 (normal)", usage: "Form labels, sidebar group headers, tabs-sm" },
    { token: "--text-button", size: "18px", weight: "600 (semibold)", usage: "Buttons, badges, tabs-md" },
    { token: "--text-caption", size: "14px", weight: "400 (normal)", usage: "Helper text, timestamps, tab badges" },
  ],
};

export const spacing = {
  base: [
    { token: "--space-0", value: "0px" },
    { token: "--space-1", value: "1px" },
    { token: "--space-2", value: "2px" },
    { token: "--space-4", value: "4px" },
    { token: "--space-6", value: "6px" },
    { token: "--space-8", value: "8px" },
    { token: "--space-10", value: "10px" },
    { token: "--space-12", value: "12px" },
    { token: "--space-16", value: "16px" },
    { token: "--space-20", value: "20px" },
    { token: "--space-24", value: "24px" },
    { token: "--space-32", value: "32px" },
    { token: "--space-40", value: "40px" },
    { token: "--space-48", value: "48px" },
    { token: "--space-64", value: "64px" },
    { token: "--space-80", value: "80px" },
    { token: "--space-96", value: "96px" },
    { token: "--space-128", value: "128px" },
  ],
  semantic: {
    "Page padding (desktop)": "24px (Spacing-5xl)",
    "Page padding (mobile)": "16px (Spacing-3xl)",
    "Card gap": "16px",
    "Form field gap": "16px (Spacing-3xl)",
    "Section gap": "32px (Spacing-6xl)",
  },
};

export const borderRadius = [
  { token: "radius-none", value: "0px" },
  { token: "radius-xxs", value: "2px" },
  { token: "radius-xs", value: "4px" },
  { token: "radius-sm", value: "6px" },
  { token: "radius-md", value: "8px (DEFAULT)" },
  { token: "radius-lg", value: "12px" },
  { token: "radius-xl", value: "16px" },
  { token: "radius-2xl", value: "20px" },
  { token: "radius-3xl", value: "24px" },
  { token: "radius-4xl", value: "32px" },
  { token: "radius-full", value: "9999px (pill)" },
];

export const semanticColors = {
  backgrounds: [
    { token: "bg-primary", resolves: "White--50", hex: "#ffffff" },
    { token: "bg-primary_hover", resolves: "Gray--50", hex: "#f9fafb" },
    { token: "bg-secondary", resolves: "Gray--100", hex: "#f3f4f6" },
    { token: "bg-disabled", resolves: "Gray--200", hex: "#e5e7eb" },
    { token: "bg-brand-primary", resolves: "Sky--50", hex: "#f0f9ff" },
    { token: "bg-brand-solid", resolves: "Sky--500", hex: "#32a9ff" },
    { token: "bg-brand-solid-hover", resolves: "Sky--600", hex: "#1b8bf5" },
    { token: "bg-danger-solid", resolves: "Rose--600", hex: "#e11d48" },
    { token: "bg-success-solid", resolves: "Emerald--600", hex: "#059669" },
    { token: "bg-warning-solid", resolves: "Amber--600", hex: "#d97706" },
  ],
  text: [
    { token: "text-primary", resolves: "Gray--800", hex: "#1f2937" },
    { token: "text-secondary", resolves: "Gray--500", hex: "#6b7280" },
    { token: "text-placeholder", resolves: "Gray--400", hex: "#9ca3af" },
    { token: "text-disabled", resolves: "Gray--400", hex: "#9ca3af" },
    { token: "text-brand-primary", resolves: "Sky--500", hex: "#32a9ff" },
    { token: "text-brand-hover", resolves: "Sky--600", hex: "#1b8bf5" },
    { token: "text-white", resolves: "White--50", hex: "#ffffff" },
    { token: "Link", resolves: "Sky--600", hex: "#1b8bf5" },
  ],
  strokes: [
    { token: "stroke-primary", resolves: "Gray--200", hex: "#e5e7eb" },
    { token: "stroke-secondary", resolves: "Gray--300", hex: "#d1d5db" },
    { token: "stroke-brand-solid", resolves: "Sky--500", hex: "#32a9ff" },
    { token: "stroke-danger-solid", resolves: "Rose--600", hex: "#e11d48" },
    { token: "stroke-success-solid", resolves: "Emerald--600", hex: "#059669" },
  ],
};

export const elevation = {
  sm: "0px 1px 2px 0px #0000000d",
  note: "Sellsuki uses MINIMAL shadow — only elevation-sm exists. Prefer borders over shadows.",
};

export const darkMode = {
  description: "Full dark mode via .dark class. Brand color (Sky-500) stays consistent across modes.",
  mappings: [
    { token: "--background", light: "#f9fafb", dark: "#1e1e1e" },
    { token: "--foreground", light: "#1f2937", dark: "#ededed" },
    { token: "--card", light: "#ffffff", dark: "#2b2b2b" },
    { token: "--border", light: "#e5e7eb", dark: "#3a3a3a" },
    { token: "--primary", light: "#32a9ff", dark: "#32a9ff" },
    { token: "--muted", light: "#e5e7eb", dark: "#3a3a3a" },
  ],
};
