import React, { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Download,
  FolderTree,
  Package,
  Paintbrush,
  Terminal,
  Copy,
  Check,
  Layers,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Palette,
  Type,
  Box,
  Code2,
  FileText,
  Settings,
  ExternalLink,
  Info,
  AlertTriangle,
  Blocks,
  Puzzle,
  Globe,
} from "lucide-react";
import { CodeBlock } from "../components/code-block";
import { useI18n } from "../i18n";
import { fontLabel, fontBody, fontLabelBold, smallLabel, btnStyle, mono } from "./_showcase-factory";

// ─── Style Constants ──────────────────────────────────────────────────────────

const captionStyle: React.CSSProperties = {
  fontFamily: "var(--font-caption)",
  fontSize: "var(--text-caption)",
  fontWeight: "var(--weight-caption)",
};

// ─── Inline Code ──────────────────────────────────────────────────────────────

function InlineCode({ children }: { children: string }) {
  return (
    <code
      className="px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-muted/50 text-primary"
      style={mono}
    >
      {children}
    </code>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({
  id,
  title,
  icon,
  children,
}: {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-primary flex-shrink-0">{icon}</span>}
        <h4 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700", lineHeight: "1.3" }}>{title}</h4>
      </div>
      {children}
    </section>
  );
}

// ─── Step Component ───────────────────────────────────────────────────────────

function Step({
  number,
  title,
  children,
  isLast,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0"
          style={btnStyle}
        >
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-2" />}
      </div>
      <div className={`${isLast ? "" : "pb-8"} min-w-0 flex-1`}>
        <span className="text-foreground block mb-2" style={fontLabelBold}>
          {title}
        </span>
        {children}
      </div>
    </div>
  );
}

// ─── Callout ──────────────────────────────────────────────────────────────────

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      border: "border-primary/30",
      bg: "bg-accent/40",
      icon: <Info size={16} className="text-primary" />,
      defaultTitle: "Note",
    },
    warning: {
      border: "border-chart-5/30",
      bg: "bg-chart-5/10",
      icon: <AlertTriangle size={16} className="text-chart-5" />,
      defaultTitle: "Warning",
    },
    tip: {
      border: "border-chart-2/30",
      bg: "bg-chart-2/10",
      icon: <Zap size={16} className="text-chart-2" />,
      defaultTitle: "Tip",
    },
  };
  const s = styles[type];
  return (
    <div className={`p-4 rounded-[var(--radius)] border ${s.border} ${s.bg}`}>
      <div className="flex items-center gap-2 mb-1.5">
        {s.icon}
        <span className="text-foreground" style={fontLabelBold}>
          {title || s.defaultTitle}
        </span>
      </div>
      <div className="text-muted-foreground" style={smallLabel}>
        {children}
      </div>
    </div>
  );
}

// ─── Component Inventory ──────────────────────────────────────────────────────

interface ComponentInfo {
  name: string;
  litTag: string;
  reactWrapper: string;
  description: string;
  category: "Form" | "Data" | "Feedback" | "Navigation" | "Layout";
}

const componentList: ComponentInfo[] = [
  { name: "Button", litTag: "ssk-button", reactWrapper: "SskButton", description: "Solid / Outline / Ghost — 24px text, 10px radius, no box-shadow", category: "Form" },
  { name: "Input", litTag: "ssk-input", reactWrapper: "SskInput", description: "Text, password, search. Sizes, validation states, prefix/suffix", category: "Form" },
  { name: "Checkbox", litTag: "ssk-checkbox", reactWrapper: "SskCheckbox", description: "Checked / indeterminate / unchecked, groups, select-all pattern", category: "Form" },
  { name: "Radio", litTag: "ssk-radio", reactWrapper: "SskRadio", description: "Groups with vertical/horizontal layout, card-style variant", category: "Form" },
  { name: "Dropdown", litTag: "ssk-dropdown", reactWrapper: "SskDropdown", description: "Single/multi-select, search, grouped, avatars, creatable options", category: "Form" },
  { name: "InputTag", litTag: "ssk-input-tag", reactWrapper: "SskInputTag", description: "Tag-based input for multi-value fields", category: "Form" },
  { name: "Textarea", litTag: "ssk-textarea", reactWrapper: "SskTextarea", description: "Multi-line text with character count, auto-resize", category: "Form" },
  { name: "DatePicker", litTag: "ssk-datepicker", reactWrapper: "SskDatePicker", description: "Single/range selection, month/year views, time picker", category: "Form" },
  { name: "Toggle", litTag: "ssk-toggle", reactWrapper: "SskToggle", description: "On/off switch with label and description", category: "Form" },
  { name: "Table", litTag: "ssk-table", reactWrapper: "SskTable", description: "Sortable, selectable, expandable rows, striped, bordered", category: "Data" },
  { name: "DynamicTable", litTag: "ssk-dynamic-table", reactWrapper: "SskDynamicTable", description: "Data grid with dynamic columns, inline editing", category: "Data" },
  { name: "Pagination", litTag: "ssk-pagination", reactWrapper: "SskPagination", description: "Page navigation with size selector and item range display", category: "Data" },
  { name: "Badge", litTag: "ssk-badge", reactWrapper: "SskBadge", description: "Status indicators, dot variants, removable tags", category: "Data" },
  { name: "Tag", litTag: "ssk-tag", reactWrapper: "SskTag", description: "Categorization labels with color variants and close action", category: "Data" },
  { name: "Avatar", litTag: "ssk-avatar", reactWrapper: "SskAvatar", description: "User avatars with image, initials, size variants, group stacking", category: "Data" },
  { name: "Modal", litTag: "ssk-modal", reactWrapper: "SskModal", description: "Dialog overlays with slot-based content, confirm/destructive", category: "Feedback" },
  { name: "Alert", litTag: "ssk-alert", reactWrapper: "SskAlert", description: "Inline alerts: info, success, warning, error variants", category: "Feedback" },
  { name: "Toast", litTag: "ssk-toast", reactWrapper: "SskToast", description: "Notifications with auto-dismiss, position, and stacking", category: "Feedback" },
  { name: "Spinner", litTag: "ssk-spinner", reactWrapper: "SskSpinner", description: "Loading indicators with size and color variants", category: "Feedback" },
  { name: "ProgressBar", litTag: "ssk-progress-bar", reactWrapper: "SskProgressBar", description: "Determinate/indeterminate progress indicators", category: "Feedback" },
  { name: "Tooltip", litTag: "ssk-tooltip", reactWrapper: "SskTooltip", description: "Contextual information on hover/focus", category: "Feedback" },
  { name: "Sidebar", litTag: "ssk-sidebar", reactWrapper: "SskSidebar", description: "256px nav sidebar with groups, active states, brand card", category: "Navigation" },
  { name: "TopNavbar", litTag: "ssk-top-navbar", reactWrapper: "SskTopNavbar", description: "72px topbar with breadcrumbs, actions, user menu", category: "Navigation" },
  { name: "Tabs / TabHeader", litTag: "ssk-tabs", reactWrapper: "SskTabs", description: "Tabbed navigation, bordered/pills/underline variants", category: "Navigation" },
  { name: "Menu", litTag: "ssk-menu", reactWrapper: "SskMenu", description: "Context menus with icons, dividers, nested groups", category: "Navigation" },
  { name: "Accordion", litTag: "ssk-accordion", reactWrapper: "SskAccordion", description: "Collapsible sections with smooth expand/collapse animation", category: "Layout" },
  { name: "Card", litTag: "ssk-card", reactWrapper: "SskCard", description: "Content container with header, body, footer slots", category: "Layout" },
  { name: "Drawer", litTag: "ssk-drawer", reactWrapper: "SskDrawer", description: "Slide-out panel from left/right with overlay", category: "Layout" },
  { name: "Divider", litTag: "ssk-divider", reactWrapper: "SskDivider", description: "Horizontal/vertical separator line with optional label", category: "Layout" },
  { name: "Stepper", litTag: "ssk-stepper", reactWrapper: "SskStepper", description: "Multi-step wizard with progress indicator", category: "Layout" },
];

const categoryColors: Record<string, string> = {
  Form: "bg-primary/10 text-primary border-primary/20",
  Data: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Feedback: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  Navigation: "bg-accent text-accent-foreground border-primary/20",
  Layout: "bg-muted/50 text-foreground border-border",
};

// ─── Typography Tokens for reference ──────────────────────────────────────────

const typographyTokens = [
  { token: "H1", css: "--text-h1", size: "48px", usage: "Page titles, hero" },
  { token: "H2", css: "--text-h2", size: "40px", usage: "Section headers" },
  { token: "H3", css: "--text-h3", size: "28px", usage: "Card titles, subsections" },
  { token: "H4", css: "--text-h4", size: "24px", usage: "Small headings" },
  { token: "Body / P", css: "--text-p", size: "20px", usage: "Body text, paragraphs" },
  { token: "Label", css: "--text-label", size: "18px", usage: "Form labels, UI labels, helper text" },
  { token: "Button / Badge", css: "--text-button", size: "18px", usage: "Buttons, badges, tabs, small labels" },
  { token: "Caption", css: "--text-caption", size: "14px", usage: "Helper text, timestamps, captions" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function GettingStartedPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"npm" | "yarn" | "pnpm">("npm");

  const installCmds = {
    npm: "npm install @uxuissk/design-system",
    yarn: "yarn add @uxuissk/design-system",
    pnpm: "pnpm add @uxuissk/design-system",
  };

  const iconInstallCmds = {
    npm: "npm install @heroicons/react",
    yarn: "yarn add @heroicons/react",
    pnpm: "pnpm add @heroicons/react",
  };

  return (
    <div className="space-y-14">
      {/* ═══ Hero ═══ */}
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-3 caption">
            <BookOpen size={14} />
            <span>{t("breadcrumb.docs")}</span>
            <ChevronRight size={12} />
            <span>{t("page.gettingStarted.title")}</span>
          </div>
          <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.gettingStarted.title")}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl" style={fontBody}>
            {t("page.gettingStarted.desc")}
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-6 mt-5">
            {[
              { value: "48", label: "Components" },
              { value: "0.7", label: "Version" },
              { value: "React", label: "Framework" },
              { value: "CSS", label: "Tokens" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="text-primary" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700" }}>{s.value}</span>
                <span className="text-muted-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {[
            {
              icon: <Download size={18} />,
              label: "Installation",
              desc: "ติดตั้งใน 5 นาที",
              href: "#installation",
            },
            {
              icon: <Blocks size={18} />,
              label: "React Wrapper",
              desc: "createComponent pattern",
              href: "#react-wrapper",
            },
            {
              icon: <Palette size={18} />,
              label: "Design Tokens",
              desc: "Colors, typography, spacing",
              href: "#tokens",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-[var(--radius)] border border-border bg-card hover:border-primary/50 hover:bg-accent/30 transition-all group"
              style={{ boxShadow: "0 1px 3px rgba(50,169,255,0.04)", transition: "all 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 16px rgba(50,169,255,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 3px rgba(50,169,255,0.04)"; }}
            >
              <span className="w-10 h-10 rounded-[var(--radius-md)] bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                {link.icon}
              </span>
              <div className="min-w-0">
                <span className="text-foreground block" style={fontLabelBold}>
                  {link.label}
                </span>
                <span className="text-muted-foreground block" style={smallLabel}>
                  {link.desc}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Storybook link */}
        <a
          href="https://sellsukidesignsystemv12.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-primary/30 bg-accent/30 text-primary hover:bg-accent/60 transition-colors"
          style={fontLabelBold}
        >
          <Globe size={16} />
          <span>Storybook (Chromatic)</span>
          <ExternalLink size={14} className="opacity-60" />
        </a>
      </div>

      {/* ═══ Prerequisites ═══ */}
      <Section id="prerequisites" title="Prerequisites" icon={<Shield size={20} />}>
        <div className="p-4 rounded-[var(--radius)] border border-border bg-card space-y-3">
          <span className="text-foreground block" style={fontLabelBold}>
            ก่อนเริ่มติดตั้ง ตรวจสอบว่ามี:
          </span>
          <ul className="space-y-2">
            {[
              { label: "Node.js", detail: "v18.0 ขึ้นไป" },
              { label: "React", detail: "v18.3+" },
              { label: "Package Manager", detail: "npm, yarn, หรือ pnpm" },
              { label: "@uxuissk/design-system", detail: "Design System library (รวม React wrappers ในตัว)" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2" style={fontLabel}>
                <CheckCircle2 size={16} className="text-chart-2 flex-shrink-0" />
                <span className="text-foreground">
                  <span style={fontLabelBold}>{item.label}</span>{" "}
                  <span className="text-muted-foreground">— {item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ═══ Installation ═══ */}
      <Section id="installation" title="Installation" icon={<Terminal size={20} />}>
        <div className="space-y-2">
          <Step number={1} title="ติดตั้ง @uxuissk/design-system">
            <span className="text-muted-foreground block mb-3" style={fontLabel}>
              ติดตั้ง Design System library:
            </span>

            {/* Package manager tabs */}
            <div className="flex gap-1 mb-3">
              {(["npm", "yarn", "pnpm"] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setActiveTab(pm)}
                  className={`px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
                    activeTab === pm
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                  style={btnStyle}
                >
                  {pm}
                </button>
              ))}
            </div>
            <CodeBlock code={installCmds[activeTab]} title="Terminal" />
          </Step>

          <Step number={2} title="ติดตั้ง Icons (Heroicons)">
            <span className="text-muted-foreground block mb-3" style={fontLabel}>
              Sellsuki DSS ใช้ <strong className="text-foreground">@heroicons/react</strong> (MIT License, by Tailwind Labs)
              เป็น icon set หลัก:
            </span>
            <CodeBlock code={iconInstallCmds[activeTab]} title="Terminal" />

            <div className="mt-3 rounded-[var(--radius)] border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 bg-muted/30 border-b border-border">
                <span className="text-foreground" style={fontLabelBold}>
                  ขนาด Icon ที่แนะนำ
                </span>
              </div>
              <div className="divide-y divide-border">
                {[
                  { path: "@heroicons/react/24/outline", size: "24px", usage: "Page header icons" },
                  { path: "@heroicons/react/24/solid", size: "24px", usage: "Filled variant" },
                  { path: "@heroicons/react/20/solid", size: "20px", usage: "Sidebar nav icons" },
                  { path: "@heroicons/react/16/solid", size: "16px", usage: "Inside buttons, table actions" },
                ].map((row) => (
                  <div key={row.path} className="flex items-center gap-4 px-4 py-2.5">
                    <code className="text-primary flex-1 min-w-0 truncate" style={mono}>{row.path}</code>
                    <span className="text-foreground flex-shrink-0 w-12 text-center" style={btnStyle}>{row.size}</span>
                    <span className="text-muted-foreground flex-shrink-0 w-40 hidden sm:block" style={smallLabel}>{row.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </Step>

          <Step number={3} title="Import component style">
            <span className="text-muted-foreground block mb-3" style={fontLabel}>
              ถ้า component มี CSS styles ให้ import เพิ่ม:
            </span>
            <CodeBlock
              code={`// main.tsx หรือ App.tsx
import "@uxuissk/design-system/dist/style.css";`}
              title="Style Import"
            />
          </Step>

          <Step number={4} title="ตั้งค่า ThemeProvider (จำเป็น)" isLast>
            <span className="text-muted-foreground block mb-3" style={fontLabel}>
              <strong className="text-foreground">ต้องครอบ</strong> ทุก component ด้วย{" "}
              <InlineCode>{"SskThemeProvider"}</InlineCode> เสมอ — ถ้าไม่มีอาจแสดงผลผิดพลาด:
            </span>
            <CodeBlock
              code={`// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SskThemeProvider } from "@uxuissk/design-system";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SskThemeProvider lang="th">
    <App />
  </SskThemeProvider>
);`}
              title="main.tsx"
            />
            <Callout type="warning" title="สำคัญ: ThemeProvider ต้องมีเสมอ">
              หากไม่ครอบ <InlineCode>{"SskThemeProvider"}</InlineCode> component อาจไม่ได้รับ design tokens
              ที่ถูกต้อง ทำให้สี, font, และ spacing ผิดเพี้ยน
            </Callout>
          </Step>
        </div>
      </Section>

      {/* ═══ React Wrapper Pattern ═══ */}
      <Section id="react-wrapper" title="React Wrapper Pattern (Core)" icon={<Blocks size={20} />}>
        <span className="text-muted-foreground block mb-4" style={fontLabel}>
          <InlineCode>@uxuissk/design-system</InlineCode> เป็น <strong className="text-foreground">Web Components (Lit)</strong>{" "}
          พร้อม React wrappers ในตัว — import component ได้โดยตรงจาก package
        </span>

        <div className="space-y-6">
          {/* Basic wrapper */}
          <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
              <Puzzle size={16} className="text-primary" />
              <span className="text-foreground" style={fontLabelBold}>
                สร้าง React Wrapper
              </span>
            </div>
            <div className="px-5 py-4">
              <CodeBlock
                code={`// components/SskButton.tsx
import { SskButton } from "@uxuissk/design-system";

// ใช้งานได้ทันที — ไม่ต้อง createComponent
export default SskButton;`}
                title="Button Import"
              />
            </div>
          </div>

          {/* Usage example */}
          <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
              <Code2 size={16} className="text-primary" />
              <span className="text-foreground" style={fontLabelBold}>
                ใช้งานใน Component
              </span>
            </div>
            <div className="px-5 py-4">
              <CodeBlock
                code={`// pages/MyPage.tsx
import SskButton from "../components/SskButton";
import SskInput from "../components/SskInput";

function MyPage() {
  return (
    <div>
      <SskButton variant="solid" label="Save Changes" />
      <SskButton variant="outline" label="Cancel" />
      <SskButton variant="ghost" label="Reset" />

      <SskInput
        placeholder="Search products..."
        size="md"
      />
    </div>
  );
}`}
                title="Usage"
              />
            </div>
          </div>

          {/* Pattern rules */}
          <Callout type="info" title="Pattern สำคัญ">
            <ul className="space-y-1.5 mt-1">
              <li>• <code style={mono}>tagName</code> — ใช้ <code style={mono}>ComponentClass.registeredName</code> เสมอ</li>
              <li>• <code style={mono}>events</code> — map event ที่ component emit จริง (ดูจาก Storybook EVENTS PROPS)</li>
              <li>• ห้ามใช้ HTML tag ตรงๆ เช่น <code style={mono}>&lt;ssk-button&gt;</code> ใน React — ต้อง wrap เสมอ</li>
              <li>• Props เป็น camelCase เช่น <code style={mono}>backgroundColor</code> ไม่ใช่ <code style={mono}>background-color</code></li>
              <li>• Modal ใช้ <code style={mono}>slot="footer"</code> attribute สำหรับ content</li>
            </ul>
          </Callout>
        </div>
      </Section>

      {/* ═══ Button Component (Detailed Example) ═══ */}
      <Section id="button-example" title="Component Example: Button" icon={<Box size={20} />}>
        <span className="text-muted-foreground block mb-4" style={fontLabel}>
          ตัวอย่าง Button — component ที่ใช้บ่อยที่สุด แสดง DSS style spec ครบทุก variant:
        </span>

        {/* Button DSS Spec */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden mb-6">
          <div className="px-5 py-3 bg-muted/30 border-b border-border">
            <span className="text-foreground" style={fontLabelBold}>Button DSS Style Spec</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Property</th>
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { prop: "Font", value: "Text1 (24px), Medium weight — DB HeaventRounded" },
                  { prop: "Border Radius", value: "10px" },
                  { prop: "Padding", value: "8px 20px" },
                  { prop: "Box Shadow", value: "None (ตาม DSS spec)" },
                  { prop: "Solid variant", value: "bg #32A9FF, text white" },
                  { prop: "Outline variant", value: "bg white, border 1.5px #32A9FF, text #32A9FF" },
                  { prop: "Ghost variant", value: "bg transparent, text #32A9FF" },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="px-4 py-2 text-foreground" style={fontLabelBold}>{row.prop}</td>
                    <td className="px-4 py-2 text-muted-foreground" style={smallLabel}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Props table */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 bg-muted/30 border-b border-border">
            <span className="text-foreground" style={fontLabelBold}>Button Props</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Prop</th>
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Type</th>
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Default</th>
                  <th className="text-left px-4 py-2 text-muted-foreground hidden md:table-cell" style={btnStyle}>Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { prop: "variant", type: '"solid" | "outline" | "ghost"', def: '"solid"', desc: "รูปแบบของปุ่ม" },
                  { prop: "label", type: "string", def: "—", desc: "ข้อความในปุ่ม" },
                  { prop: "fbDisabled", type: "boolean", def: "false", desc: "ปิดการใช้งาน" },
                  { prop: "size", type: "string", def: "—", desc: "ขนาด component" },
                  { prop: "themeColor", type: "string", def: "—", desc: "สีธีม" },
                ].map((row) => (
                  <tr key={row.prop}>
                    <td className="px-4 py-2">
                      <code className="text-primary" style={mono}>{row.prop}</code>
                    </td>
                    <td className="px-4 py-2">
                      <code className="text-foreground" style={mono}>{row.type}</code>
                    </td>
                    <td className="px-4 py-2">
                      <code className="text-muted-foreground" style={mono}>{row.def}</code>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground hidden md:table-cell" style={smallLabel}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ═══ Design Tokens ═══ */}
      <Section id="tokens" title="Design Tokens" icon={<Palette size={20} />}>
        <span className="text-muted-foreground block mb-4" style={fontLabel}>
          ทุก component ใช้ CSS custom properties เป็น single source of truth — เปลี่ยนสไตล์ทั้งระบบแค่แก้ CSS variables
        </span>

        {/* Brand Colors */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden mb-6">
          <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
            <Palette size={16} className="text-primary" />
            <span className="text-foreground" style={fontLabelBold}>Brand Colors</span>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Brand Primary", css: "--brand-primary", hex: "#32A9FF", color: "bg-primary" },
              { name: "Brand Hover", css: "--brand-primary-hover", hex: "#0EA5E9", color: "bg-[#0EA5E9]" },
              { name: "Brand BG", css: "--brand-primary-bg", hex: "#F0F9FF", color: "bg-accent" },
              { name: "Brand Border", css: "--brand-primary-border", hex: "#D9F2FF", color: "bg-[#D9F2FF]" },
              { name: "Brand Light", css: "--brand-primary-light", hex: "#BAE6FD", color: "bg-[#BAE6FD]" },
              { name: "Error / Red", css: "--red", hex: "#EF4444", color: "bg-destructive" },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-border">
                <div className={`w-10 h-10 rounded-[var(--radius-sm)] ${c.color} flex-shrink-0 border border-border/20`} />
                <div className="min-w-0">
                  <span className="text-foreground block truncate" style={fontLabelBold}>{c.name}</span>
                  <code className="text-muted-foreground block truncate" style={mono}>
                    {c.css}: {c.hex}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gray Scale */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden mb-6">
          <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
            <Layers size={16} className="text-muted-foreground" />
            <span className="text-foreground" style={fontLabelBold}>Gray Scale (Tailwind Gray)</span>
          </div>
          <div className="p-5">
            <div className="flex rounded-[var(--radius)] overflow-hidden border border-border">
              {[
                { label: "50", hex: "#F9FAFB" },
                { label: "100", hex: "#F3F4F6" },
                { label: "200", hex: "#E5E7EB" },
                { label: "300", hex: "#D1D5DB" },
                { label: "400", hex: "#9CA3AF" },
                { label: "500", hex: "#6B7280" },
                { label: "600", hex: "#4B5563" },
                { label: "700", hex: "#374151" },
                { label: "800", hex: "#1F2937" },
                { label: "900", hex: "#111827" },
              ].map((g) => (
                <div key={g.label} className="flex-1 flex flex-col items-center">
                  <div className="w-full h-10" style={{ backgroundColor: g.hex }} />
                  <span className="py-1 text-muted-foreground" style={mono}>{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden mb-6">
          <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
            <Type size={16} className="text-primary" />
            <span className="text-foreground" style={fontLabelBold}>Typography — DB HeaventRounded</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Token</th>
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>CSS Variable</th>
                  <th className="text-center px-4 py-2 text-muted-foreground" style={btnStyle}>Size</th>
                  <th className="text-left px-4 py-2 text-muted-foreground hidden md:table-cell" style={btnStyle}>Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {typographyTokens.map((t) => (
                  <tr key={t.token} className="hover:bg-muted/10">
                    <td className="px-4 py-2 text-foreground" style={fontLabelBold}>{t.token}</td>
                    <td className="px-4 py-2">
                      <code className="text-primary" style={mono}>{t.css}</code>
                    </td>
                    <td className="px-4 py-2 text-center text-foreground" style={btnStyle}>{t.size}</td>
                    <td className="px-4 py-2 text-muted-foreground hidden md:table-cell" style={smallLabel}>{t.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-border bg-muted/10">
            <span className="text-muted-foreground" style={smallLabel}>
              <strong className="text-foreground">Font Weights:</strong>{" "}
              Bold (700, <code style={mono}>--fw-bold</code>), Medium (500, <code style={mono}>--fw-med</code>),
              Regular (400, <code style={mono}>--fw-regular</code>)
            </span>
          </div>
        </div>

        {/* Layout Constants */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden mb-6">
          <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
            <Settings size={16} className="text-primary" />
            <span className="text-foreground" style={fontLabelBold}>Layout Constants</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Token</th>
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>CSS Variable</th>
                  <th className="text-left px-4 py-2 text-muted-foreground" style={btnStyle}>Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { token: "Sidebar Width", css: "--sidebar-width", value: "256px" },
                  { token: "Topbar Height", css: "--topbar-height", value: "72px" },
                  { token: "Border Radius SM", css: "--border-radius-sm", value: "8px" },
                  { token: "Border Radius MD", css: "--border-radius-md", value: "12px" },
                  { token: "Border Radius LG", css: "--border-radius-lg", value: "16px" },
                  { token: "Shadow SM", css: "--shadow-sm", value: "0 1px 2px rgba(0,0,0,.05)" },
                  { token: "Shadow", css: "--shadow", value: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)" },
                  { token: "Shadow MD", css: "--shadow-md", value: "0 4px 16px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.06)" },
                ].map((row) => (
                  <tr key={row.token}>
                    <td className="px-4 py-2 text-foreground" style={fontLabelBold}>{row.token}</td>
                    <td className="px-4 py-2"><code className="text-primary" style={mono}>{row.css}</code></td>
                    <td className="px-4 py-2"><code className="text-muted-foreground" style={mono}>{row.value}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Elevation diagram */}
        <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
          <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center gap-2">
            <Layers size={16} className="text-primary" />
            <span className="text-foreground" style={fontLabelBold}>Elevation (Shadows)</span>
          </div>
          <div className="p-5 flex flex-wrap gap-6 justify-center">
            {[
              { label: "shadow-sm", shadow: "0 1px 2px rgba(0,0,0,.05)" },
              { label: "shadow", shadow: "0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)" },
              { label: "shadow-md", shadow: "0 4px 16px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.06)" },
            ].map((s) => (
              <div
                key={s.label}
                className="w-28 h-20 rounded-[var(--radius-md)] bg-card border border-border flex items-center justify-center"
                style={{ boxShadow: s.shadow }}
              >
                <code className="text-muted-foreground" style={mono}>{s.label}</code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ Page Layout ═══ */}
      <Section id="layout" title="Page Layout Structure" icon={<FolderTree size={20} />}>
        <span className="text-muted-foreground block mb-4" style={fontLabel}>
          โครงสร้าง layout มาตรฐานของ Sellsuki — Topbar 72px + Sidebar 256px + Content Area (gray-100 bg):
        </span>
        <CodeBlock
          code={`┌──────────────────────────────────────────────────┐
│ Topbar (72px, white bg, border-bottom)           │
├────────┬─────────────────────────────────────────┤
│        │                                         │
│ Sidebar│  Content Area (#F3F4F6 bg)              │
│ (256px)│                                         │
│ white  │  ┌─────────────────────────────────┐    │
│ bg     │  │ Table Card (white bg, 8px rad)  │    │
│        │  │ ┌───────────────────────────────┐│    │
│        │  │ │ Header: Title + Add Button    ││    │
│        │  │ ├───────────────────────────────┤│    │
│        │  │ │ Column Headers (gray-50 bg)   ││    │
│        │  │ ├───────────────────────────────┤│    │
│        │  │ │ Table Rows                    ││    │
│        │  │ │  ├─ Parent Row (expandable)   ││    │
│        │  │ │  └─ Child Rows (indented)     ││    │
│        │  │ └───────────────────────────────┘│    │
│        │  └─────────────────────────────────┘    │
│        │  Pagination                             │
└────────┴─────────────────────────────────────────┘`}
          title="Layout Diagram"
        />

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-[var(--radius)] border border-border bg-card">
            <span className="text-foreground block mb-1" style={fontLabelBold}>Sidebar</span>
            <ul className="space-y-1 text-muted-foreground" style={smallLabel}>
              <li>• 256px width, white bg, border-right</li>
              <li>• Company card: #F0F9FF bg, #D9F2FF border</li>
              <li>• Nav items: 14px, gray-500 / active: #32A9FF + #F0F9FF bg</li>
              <li>• Group labels: 12px, bold, gray-400, uppercase</li>
            </ul>
          </div>
          <div className="p-4 rounded-[var(--radius)] border border-border bg-card">
            <span className="text-foreground block mb-1" style={fontLabelBold}>Content Area</span>
            <ul className="space-y-1 text-muted-foreground" style={smallLabel}>
              <li>• Background: #F3F4F6 (gray-100)</li>
              <li>• Cards: white bg, 8px radius</li>
              <li>• Table headers: gray-50 bg</li>
              <li>• Topbar: 72px, white bg, border-bottom</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══ Component Inventory ═══ */}
      <Section id="components" title="Component Inventory" icon={<Package size={20} />}>
        <span className="text-muted-foreground block mb-4" style={fontLabel}>
          <strong className="text-foreground">{componentList.length}+ components</strong> ใน{" "}
          <InlineCode>@uxuissk/design-system</InlineCode> — ทุกตัวเป็น Web Components (Lit) พร้อม React wrapper pattern
        </span>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Form", "Data", "Feedback", "Navigation", "Layout"].map((cat) => {
            const count = componentList.filter((c) => c.category === cat).length;
            return (
              <span
                key={cat}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${categoryColors[cat]}`}
                style={btnStyle}
              >
                {cat} <span className="opacity-60">({count})</span>
              </span>
            );
          })}
        </div>

        <div className="rounded-[var(--radius-md)] border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-4 py-2.5 text-muted-foreground" style={btnStyle}>Component</th>
                  <th className="text-left px-4 py-2.5 text-muted-foreground" style={btnStyle}>Lit Tag</th>
                  <th className="text-left px-4 py-2.5 text-muted-foreground hidden lg:table-cell" style={btnStyle}>React Wrapper</th>
                  <th className="text-left px-4 py-2.5 text-muted-foreground hidden md:table-cell" style={btnStyle}>Description</th>
                  <th className="text-center px-4 py-2.5 text-muted-foreground" style={btnStyle}>Category</th>
                </tr>
              </thead>
              <tbody>
                {componentList.map((c, i) => (
                  <tr
                    key={c.name}
                    className={`border-b border-border last:border-b-0 ${
                      i % 2 === 1 ? "bg-muted/10" : "bg-card"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-foreground" style={fontLabelBold}>{c.name}</td>
                    <td className="px-4 py-2.5">
                      <code className="text-primary" style={mono}>{c.litTag}</code>
                    </td>
                    <td className="px-4 py-2.5 hidden lg:table-cell">
                      <code className="text-foreground" style={mono}>{c.reactWrapper}</code>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell" style={smallLabel}>{c.description}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full border ${categoryColors[c.category]}`}
                        style={btnStyle}
                      >
                        {c.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ═══ Quick Start Template ═══ */}
      <Section id="quick-start" title="Quick Start Template" icon={<Zap size={20} />}>
        <span className="text-muted-foreground block mb-4" style={fontLabel}>
          Copy-paste template สำหรับเริ่มต้น project ใหม่:
        </span>

        <CodeBlock
          code={`// main.tsx — Entry Point
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SskThemeProvider } from "@uxuissk/design-system";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SskThemeProvider lang="th">
    <App />
  </SskThemeProvider>
);`}
          title="Quick Start — main.tsx"
        />

        <div className="mt-4" />

        <CodeBlock
          code={`// components/index.ts — Re-export all components
import {
  SskButton,
  SskInput,
  SskModal,
  SskTable,
  SskPagination,
  SskBadge,
  SskCheckbox,
  SskRadio,
  SskDropdown,
  SskAlert,
  SskToast,
  SskTabs,
  SskSidebar,
  SskTopNavbar,
  SskAvatar,
  SskTooltip,
  SskSpinner,
} from "@uxuissk/design-system";

// Re-export for convenience
export {
  SskButton,
  SskInput,
  SskModal,
  SskTable,
  SskPagination,
  SskBadge,
  SskCheckbox,
  SskRadio,
  SskDropdown,
  SskAlert,
  SskToast,
  SskTabs,
  SskSidebar,
  SskTopNavbar,
  SskAvatar,
  SskTooltip,
  SskSpinner,
};`}
          title="Quick Start — components/index.ts"
        />
      </Section>

      {/* ═══ Gotchas / สิ่งที่ต้องระวัง ═══ */}
      <Section id="gotchas" title="สิ่งที่ต้องระวัง" icon={<AlertTriangle size={20} />}>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              num: 1,
              title: "Import ได้โดยตรงจาก @uxuissk/design-system",
              desc: "ไม่ต้อง createComponent แล้ว — import SskButton, SskInput ฯลฯ จาก @uxuissk/design-system ได้เลย",
            },
            {
              num: 2,
              title: "ThemeProvider ต้องครอบ",
              desc: "หากไม่มี SskThemeProvider ครอบ components อาจแสดงผลผิดพลาด — สี, font, spacing จะไม่ถูกต้อง",
            },
            {
              num: 3,
              title: "Brand color คือ #32A9FF",
              desc: "ไม่ใช่ #0EA5E9 — สีนั้นใช้สำหรับ hover state เท่านั้น ตรวจสอบให้ดีว่าใช้ --brand-primary ไม่ใช่ --brand-primary-hover",
            },
            {
              num: 4,
              title: "NO box-shadow on buttons",
              desc: "ตาม DSS spec — buttons ไม่มี box-shadow ทุก variant (solid, outline, ghost)",
            },
            {
              num: 5,
              title: "Content area bg: #F3F4F6 (gray-100)",
              desc: "ไม่ใช่ gray-50 (#F9FAFB) — ใช้ --bg-page สำหรับ main content background",
            },
            {
              num: 6,
              title: "Typography ใช้ DB HeaventRounded",
              desc: "Fallback เป็น Sarabun → sans-serif ตาม spec ทุก text ต้องใช้ font family นี้ ห้ามใช้ system font",
            },
            {
              num: 7,
              title: "Events mapping ต้องตรง",
              desc: "event name ใน events object ต้องตรงกับ DOM event ที่ component emit จริง — ดูจาก EVENTS PROPS ใน Storybook",
            },
            {
              num: 8,
              title: "Modal ใช้ slot attribute",
              desc: 'Modal content ใช้ slot="footer" สำหรับ footer — ไม่ใช่ children ปกติ',
            },
            {
              num: 9,
              title: "Sidebar 256px, Topbar 72px",
              desc: "ค่าคงที่ตาม design spec — อย่าเปลี่ยนโดยไม่ผ่าน design review",
            },
            {
              num: 10,
              title: "Props เป็น camelCase",
              desc: "เช่น backgroundColor ไม่ใช่ background-color — เป็น convention ของ Lit + React wrapper",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex gap-3 p-4 rounded-[var(--radius)] border border-border bg-card hover:border-chart-5/30 transition-colors"
            >
              <span
                className="w-7 h-7 rounded-full bg-chart-5/15 text-chart-5 flex items-center justify-center flex-shrink-0"
                style={btnStyle}
              >
                {item.num}
              </span>
              <div className="min-w-0">
                <span className="text-foreground block" style={fontLabelBold}>{item.title}</span>
                <span className="text-muted-foreground block mt-0.5" style={smallLabel}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ Best Practices ═══ */}
      <Section id="best-practices" title="Best Practices" icon={<CheckCircle2 size={20} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "ใช้ CSS Variables เสมอ",
              desc: "ห้าม hardcode colors หรือ sizes — ใช้ var(--brand-primary), var(--border-radius-md) เพื่อให้ restyle ได้จาก CSS เดียว",
              icon: <Palette size={18} />,
            },
            {
              title: "ใช้ DB HeaventRounded",
              desc: "ทุก text ต้องใช้ DB HeaventRounded ตาม spec — fallback Sarabun → sans-serif อย่าใช้ system font",
              icon: <Type size={18} />,
            },
            {
              title: "Compose, ไม่ Fork",
              desc: "Wrap DSS components ไม่ใช่ copy แล้วแก้ — ทำให้ update painless และ consistent",
              icon: <Layers size={18} />,
            },
            {
              title: "ใช้ Semantic Tokens",
              desc: "ใช้ --brand-primary ไม่ใช่ raw hex, --red ไม่ใช่ #EF4444 — ทำให้ theming/accessibility consistent",
              icon: <Shield size={18} />,
            },
            {
              title: "ทดสอบกับ ThemeProvider",
              desc: "ทดสอบทุก component ภายใต้ SskThemeProvider เสมอ — behavior อาจต่างกันถ้าไม่มี",
              icon: <Zap size={18} />,
            },
            {
              title: "ดู Storybook ก่อน",
              desc: "ตรวจสอบ props, events, และ variants ที่มีอยู่ใน Storybook ก่อนเขียนใช้ — ลด trial-and-error",
              icon: <BookOpen size={18} />,
            },
          ].map((bp) => (
            <div key={bp.title} className="p-4 rounded-[var(--radius)] border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary">{bp.icon}</span>
                <span className="text-foreground" style={fontLabelBold}>{bp.title}</span>
              </div>
              <span className="text-muted-foreground" style={smallLabel}>{bp.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ Resources ═══ */}
      <Section id="resources" title="Resources" icon={<ExternalLink size={20} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "Storybook (Chromatic)",
              desc: "Interactive component demos, props reference, events API",
              url: "https://sellsukidesignsystemv12.vercel.app/",
            },
            {
              title: "Heroicons",
              desc: "@heroicons/react — MIT Licensed icon set",
              url: "https://heroicons.com",
            },
            {
              title: "Lit Documentation",
              desc: "Web Components framework used by @uxuissk/design-system",
              url: "https://lit.dev",
            },
            {
              title: "@uxuissk/design-system",
              desc: "Sellsuki Design System package on npm",
              url: "https://www.npmjs.com/package/@uxuissk/design-system",
            },
          ].map((res) => (
            <a
              key={res.title}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 rounded-[var(--radius)] border border-border bg-card hover:border-primary/40 hover:bg-accent/20 transition-all group"
            >
              <ExternalLink size={16} className="text-primary flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
              <div className="min-w-0">
                <span className="text-foreground block" style={fontLabelBold}>{res.title}</span>
                <span className="text-muted-foreground block mt-0.5" style={smallLabel}>{res.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}