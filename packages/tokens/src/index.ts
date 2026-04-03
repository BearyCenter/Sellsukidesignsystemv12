/**
 * Sellsuki Design Tokens — JavaScript/TypeScript constants
 *
 * These values mirror the CSS custom properties in tokens.css.
 * Import this module for JS/TS-based styling (CSS-in-JS, inline styles, etc.)
 *
 * @example
 * import { colors, spacing, typography } from "@uxuissk/design-tokens";
 * style={{ color: colors.text.primary, fontFamily: typography.fontFamily.body }}
 */

/* ─── Colors ──────────────────────────────────────────────────────────────────── */

export const colors = {
  /* Brand — Sky */
  sky: {
    50: "#f0f9ff",
    100: "#d9f2ff",
    200: "#bce8ff",
    300: "#8edcff",
    400: "#58c6ff",
    500: "#32a9ff",
    600: "#1b8bf5",
    700: "#1473e1",
    800: "#175cb6",
    900: "#194f8f",
  },
  /* Neutral — Gray */
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  /* Danger — Rose */
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
  },
  /* Success — Emerald */
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  /* Warning — Amber */
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  /* Secondary Brand — Orange */
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },

  /* ── Semantic ── */
  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
    white: "#ffffff",
    disabled: "#9ca3af",
    placeholder: "#9ca3af",
    brand: "#32a9ff",
    danger: "#e11d48",
    warning: "#d97706",
    success: "#059669",
    link: "#1b8bf5",
  },
  background: {
    primary: "#ffffff",
    secondary: "#f3f4f6",
    surface: "#f9fafb",
    brand: "#f0f9ff",
    brandSolid: "#32a9ff",
    brandSolidHover: "#1b8bf5",
    danger: "#fff1f2",
    dangerSolid: "#e11d48",
    warning: "#fffbeb",
    warningSolid: "#d97706",
    success: "#ecfdf5",
    successSolid: "#059669",
  },
  border: {
    primary: "#e5e7eb",
    secondary: "#d1d5db",
    brand: "#8edcff",
    brandSolid: "#32a9ff",
    danger: "#fb7185",
    dangerSolid: "#e11d48",
    warning: "#fbbf24",
    success: "#34d399",
    successSolid: "#059669",
  },
} as const;

/* ─── Typography ──────────────────────────────────────────────────────────────── */

export const typography = {
  fontFamily: {
    body: "'DB HeaventRounded', 'Noto Sans Thai', sans-serif",
    button: "'DB HeaventRounded', 'Noto Sans Thai', sans-serif",
  },
  fontSize: {
    /** --text-caption — minimum font size in the system */
    caption: "14px",
    /** --text-label / --text-button */
    label: "18px",
    /** --text-p */
    p: "20px",
    /** --text-h4 */
    h4: "24px",
    /** --text-h3 */
    h3: "28px",
    /** --text-h2 */
    h2: "40px",
    /** --text-h1 */
    h1: "48px",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

/* ─── Spacing ─────────────────────────────────────────────────────────────────── */

export const spacing = {
  0: "0px",
  1: "1px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  16: "16px",
  20: "20px",
  24: "24px",
  32: "32px",
  40: "40px",
  44: "44px",
  48: "48px",
  56: "56px",
  64: "64px",
  72: "72px",
  80: "80px",
  96: "96px",
  /** Page padding (desktop) */
  pageDesktop: "24px",
  /** Page padding (mobile) */
  pageMobile: "16px",
  /** Gap between cards */
  cardGap: "16px",
  /** Gap between form fields */
  formGap: "16px",
  /** Gap between sections */
  sectionGap: "32px",
} as const;

/* ─── Border ──────────────────────────────────────────────────────────────────── */

export const border = {
  radius: {
    none: "0px",
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    full: "9999px",
  },
  width: {
    none: "0px",
    xs: "1px",
    sm: "2px",
    md: "4px",
  },
} as const;

/* ─── Shadow ──────────────────────────────────────────────────────────────────── */

export const shadow = {
  none: "none",
  sm: "0px 1px 2px 0px rgba(0,0,0,0.05)",
  md: "0px 4px 6px -1px rgba(0,0,0,0.07)",
} as const;

/* ─── Shell Layout ────────────────────────────────────────────────────────────── */

export const shell = {
  navHeight: "56px",
  sidebarWidth: "240px",
  sidebarCollapsed: "64px",
  contentPadding: "24px",
  contentPaddingSm: "16px",
} as const;

/* ─── Z-Index ─────────────────────────────────────────────────────────────────── */

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 50,
  sticky: 60,
  shellOverlay: 80,
  shellSidebar: 90,
  shellNav: 100,
  modal: 200,
  toast: 300,
  tooltip: 400,
} as const;

/* ─── Motion ──────────────────────────────────────────────────────────────────── */

export const motion = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    normal: "200ms",
    slow: "300ms",
    sidebar: "250ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

/* ─── Layout (legacy — use shell instead) ────────────────────────────────────── */

export const layout = {
  /** @deprecated use shell.navHeight */
  navbarHeight: "56px",
  /** @deprecated use shell.sidebarWidth */
  sidebarWidth: "240px",
  maxContentWidth: "1280px",
} as const;

/* ─── Button ──────────────────────────────────────────────────────────────────── */

export const button = {
  variants: ["primary", "secondary", "outline", "ghost", "destructive", "link"] as const,
  sizes: {
    sm: "32px",
    md: "36px",
    lg: "40px",
    xl: "44px",
  },
  defaultVariant: "primary" as const,
  defaultSize: "md" as const,
} as const;

/* ─── Convenience re-export ───────────────────────────────────────────────────── */

export const sellsukiTokens = {
  colors,
  typography,
  spacing,
  border,
  shadow,
  shell,
  zIndex,
  motion,
  layout,
  button,
} as const;

export default sellsukiTokens;
