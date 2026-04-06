import React, { useState } from "react";
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  Layers,
  Globe,
  Package,
  Plus,
  User,
  Star,
  Tags,
  Moon,
  Paintbrush,
  SwatchBook,
  BarChart3,
  CreditCard,
  Navigation,
  PanelTop,
  Table2,
  LayoutGrid,
  BadgeCheck,
  BellRing,
  SearchIcon,
  CheckSquare,
  CircleDot,
  CheckCircle2,
  Tag,
  MousePointerClick,
  SquareMousePointer,
  Type,
  PenTool,
  CalendarDays,
  ListOrdered,
  Upload as UploadIcon,
  Bone,
  Inbox,
  ArrowRightLeft,
  Palette,
  Image,
  FolderTree,
  TrendingUp,
  Power,
  Pointer,
  GitPullRequest,
  BellDot,
} from "lucide-react";
import { useI18n } from "../i18n";
import { fontBody, fontLabel, btnStyle, smallLabel } from "./_showcase-factory";

// ─── Changelog Data Types ─────────────────────────────────────────────────────

interface ChangelogFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

type ChangelogTag = "new" | "improved" | "fixed" | "breaking" | "preview";

interface ChangelogVersion {
  version: string;
  date: string;
  summary: string;
  tags?: ChangelogTag[];
  features: ChangelogFeature[];
}

// ─── Full Changelog Data — Single Source of Truth ─────────────────────────────

export const changelogVersions: ChangelogVersion[] = [
  {
    version: "1.5.0",
    date: "April 4, 2026",
    summary: "Radius standardization across all 60+ components, DSButton SVG+text stacking fix, DateRangePicker UX improvements, 8 new showcase pages, and vibe accuracy improvements in ai-rules.md.",
    tags: ["new", "fixed", "improved"],
    features: [
      { icon: <Paintbrush size={16} />, title: "Radius Standardization (--radius-md everywhere)", description: "Replaced all --radius-lg (16px) usages with --radius-md (6px) across 47 files — inputs, dropdowns, calendars, panels, and popovers now consistently use the 6px system radius. Token semantic hierarchy preserved." },
      { icon: <MousePointerClick size={16} />, title: "DSButton SVG + Text Fix", description: "Fixed icon+text stacking vertically inside buttons due to Tailwind preflight setting SVG to display:block. Children span now wraps with inline-flex items-center gap-2, ensuring icon and text align in one row automatically." },
      { icon: <CalendarDays size={16} />, title: "DateRangePicker UX Improvements", description: "Fixed dropdown z-index overlap with code blocks (z-50), corrected calendar cells not filling available width (flex-1 min-w-0), increased day cell height to h-8 for better touch targets, and standardized radius." },
      { icon: <LayoutGrid size={16} />, title: "8 New Showcase Pages", description: "Added showcase pages for AppShell, Charts, ChoiceCard, DateRangePicker, ImageGallery, RepeatableFieldList, RichTextEditor, and TimePicker — covering the full Stage 5.5+6 component set." },
      { icon: <Star size={16} />, title: "Vibe Accuracy: ai-rules.md Update", description: "Corrected sandbox patterns from rounded-lg (8px Tailwind default) to rounded-[6px] (exact 6px). Added icon+text button guidance for both Full mode and Sandbox mode to prevent SVG stacking in vibe-generated code." },
      { icon: <TrendingUp size={16} />, title: "MCP Tracker: Feature Report + Date Column", description: "Added Feature Report button that copies a formatted stats summary to clipboard. Recent Requests table now shows full date + time (DD Mon · HH:MM:SS) in the Date / Time column." },
    ],
  },
  {
    version: "1.4.0",
    date: "March 10, 2026",
    summary: "15 new component showcases, ⌘K command palette search, Advanced sidebar group, Storybook URL migration, and massive form/data/feedback coverage expansion.",
    tags: ["new", "improved"],
    features: [
      { icon: <Search size={16} />, title: "Command Palette Search (⌘K)", description: "New HeaderSearch component — keyboard-driven command palette with ⌘K/Ctrl+K shortcut, grouped filterable dropdown of all sidebar components, arrow-key navigation, and full i18n support (EN/TH)." },
      { icon: <ChevronDown size={16} />, title: "Select → Dropdown Migration", description: "Consolidated legacy Select component into Dropdown. All single/multi-select use cases now unified: inline search, grouped options, creatable entries, async search, tag limits, avatar support, custom footer/empty states, and rich validation feedback." },
      { icon: <UploadIcon size={16} />, title: "File Upload Component", description: "Drag & drop file upload with dropzone, button, and avatar variants. Simulated progress indicator, file list with type icons, and format validation." },
      { icon: <Bone size={16} />, title: "Skeleton Component", description: "Content placeholder with pulse animation — text, rectangular, rounded, circular variants. Composed card, table, and list skeleton patterns." },
      { icon: <Inbox size={16} />, title: "Empty State Component", description: "Empty view placeholder with icon, title, description, primary/secondary CTAs. Common patterns for search, errors, access denied, and first-use." },
      { icon: <ChevronRight size={16} />, title: "Breadcrumb Component", description: "Navigation trail with chevron/slash/dot separators, icon support, collapsible long paths (maxItems), and three sizes." },
      { icon: <Power size={16} />, title: "Toggle → Switch Migration", description: "Consolidated legacy Toggle component into Switch. All binary state controls now unified: 4 semantic colors (primary/success/warning/destructive), 3 sizes, label/description support, disabled states, and settings card layout." },
      { icon: <Pointer size={16} />, title: "Popover Component", description: "Click-triggered floating panel with 4 placement positions, optional header with close button, and rich content (forms, ratings)." },
      { icon: <GitPullRequest size={16} />, title: "Timeline Component", description: "Vertical timeline with status indicators (completed/current/pending/error), icons, default/alternate/compact variants, and rich content slots." },
      { icon: <BellDot size={16} />, title: "Notification Component", description: "Inline notifications with 4 severity types, closable, action CTAs, avatar initials, timestamps, read/unread states, and notification center pattern." },
      { icon: <TrendingUp size={16} />, title: "Statistic Component", description: "Numeric display with trend indicators (up/down/neutral), prefix/suffix, stat cards for dashboards, 3 sizes, and loading skeleton." },
      { icon: <FolderTree size={16} />, title: "Tree Component", description: "Hierarchical tree view with expand/collapse, auto file/folder icons, connecting lines, and checkbox selection mode." },
      { icon: <ArrowRightLeft size={16} />, title: "Transfer List Component", description: "Dual-list transfer with move/move-all controls, checkbox selection, inline search filter, and disabled items." },
      { icon: <Star size={16} />, title: "Rating Component", description: "Interactive rating with star/heart/thumb icons, 3 sizes, custom max, read-only/disabled modes, and inline label." },
      { icon: <Palette size={16} />, title: "Color Picker Component", description: "Color selection with native picker, 24-color preset swatches, hex input, HEX/RGB/HSL format display, and copy-to-clipboard." },
      { icon: <Image size={16} />, title: "Image Preview Component", description: "Thumbnail gallery with fullscreen lightbox viewer — zoom in/out (50%–300%), rotate 90°, prev/next navigation, and bottom thumbnail strip." },
      { icon: <Layers size={16} />, title: "New Advanced Sidebar Group", description: "Added 'Advanced' category in sidebar navigation housing Tree and Transfer List components. All 15 new entries have 'New' badges." },
      { icon: <Globe size={16} />, title: "Storybook URL Migration", description: "Migrated all Storybook links from legacy Chromatic URL to sellsukidesignsystemv12.vercel.app — Getting Started hero button and Resources section updated." },
    ],
  },
  {
    version: "1.3.0",
    date: "March 6, 2026",
    summary: "Figma Design System token integration, 16 new component showcase pages, dark mode color refinement, and multi-brand semantic token architecture.",
    tags: ["new", "improved"],
    features: [
      { icon: <SwatchBook size={16} />, title: "Design Token Overhaul", description: "Imported full Figma Variables export — Base_Color primitives (Sky, Gray, Rose, Emerald, Amber, Orange), 22-step spacing scale, 11-step border-radius scale, border widths, and multi-brand semantic layers (Sellsuki, Patona, Akita, Oc2plus)." },
      { icon: <Paintbrush size={16} />, title: "Semantic Token Bridge", description: "New bridge layer in theme.css maps 100+ DS semantic tokens (Colors--Text, Colors--Background, Colors--Stroke, Colors--Button, Colors--Icon) to Tailwind-compatible CSS variables." },
      { icon: <Tags size={16} />, title: "16 New Components", description: "InputTag, Toggle, Tag, Avatar, Tooltip, Spinner, ProgressBar, Accordion, Card, Drawer, Divider, Stepper, Menu, Sidebar, TopNavbar — all with interactive demos, code samples, and API tables." },
      { icon: <BarChart3 size={16} />, title: "Sidebar Reorganization", description: "Components reorganized into 5 logical groups: Form, Data Display, Feedback, Navigation, and Layout." },
      { icon: <CreditCard size={16} />, title: "Dark Mode Refined", description: "Dark mode palette updated to use proper Gray scale (Gray-700 borders, Gray-800 surfaces, Gray-100 text) from the Figma DS export instead of custom neutral values." },
      { icon: <Navigation size={16} />, title: "Multi-Brand Architecture", description: "Theme.css now supports the Sellsuki 3-tier token architecture (Primitive → Semantic → Component) with brand-switchable semantic layers for Sellsuki, Patona, Akita, Oc2plus." },
    ],
  },
  {
    version: "1.2.0",
    date: "March 5, 2026",
    summary: "Dark mode, 8 new components + Design Tokens page + Getting Started docs — massive expansion of the SSK Design System.",
    tags: ["new"],
    features: [
      { icon: <Moon size={16} />, title: "Dark Mode", description: "Full dark theme with toggle in sidebar & mobile header, localStorage persistence, prefers-color-scheme detection." },
      { icon: <BookOpen size={16} />, title: "Getting Started", description: "Sellsuki DSS setup guide — @uxuissk/design-system install, ThemeProvider, design tokens, 30+ component inventory." },
      { icon: <PanelTop size={16} />, title: "Tabs", description: "4 variants (default, bordered, pills, underline), 3 sizes, icons, badges, disabled, full-width." },
      { icon: <Table2 size={16} />, title: "Table", description: "Sortable, selectable, striped, bordered, hoverable, loading/empty states, 3 sizes." },
      { icon: <LayoutGrid size={16} />, title: "Modal", description: "5 sizes, form modals, confirm/destructive dialogs, scrollable, keyboard handling." },
      { icon: <BadgeCheck size={16} />, title: "Badge", description: "6 variants, 3 sizes, dot indicators, icons, removable tags." },
      { icon: <BellRing size={16} />, title: "Alerts & Toast", description: "4 variants, dismissible, actions, toast notifications with auto-dismiss." },
      { icon: <SearchIcon size={16} />, title: "Search Field", description: "3 variants, 3 sizes, autocomplete suggestions, debounced, loading." },
      { icon: <CheckSquare size={16} />, title: "Checkbox", description: "Checked/indeterminate/unchecked, 3 sizes, groups, select-all pattern, validation." },
      { icon: <CircleDot size={16} />, title: "Radio", description: "Groups with vertical/horizontal layout, descriptions, card-style, error state." },
    ],
  },
  {
    version: "1.1.0",
    date: "March 1, 2026",
    summary: "Dropdown component — 6 new features added by the Sellsuki Design System team.",
    tags: ["new", "improved"],
    features: [
      { icon: <CheckCircle2 size={16} />, title: "Select All / Deselect All", description: "Toggle all visible options at once in multi-select mode." },
      { icon: <Tag size={16} />, title: "Tag Limit (+N more)", description: "Configurable tagLimit prop for compact trigger display." },
      { icon: <Plus size={16} />, title: "Creatable Options", description: "Create new options on the fly via onCreateOption callback." },
      { icon: <Search size={16} />, title: "Async Search", description: "Debounced onSearch with searchLoading for server-side filtering." },
      { icon: <User size={16} />, title: "Avatar Support", description: "Options with avatar image URLs for people pickers." },
      { icon: <Layers size={16} />, title: "Custom Footer & Empty State", description: "Inject custom footer actions and branded empty states." },
    ],
  },
  {
    version: "1.0.0",
    date: "February 10, 2026",
    summary: "Initial release of the SSK Design System — 7 foundational components shipped.",
    tags: ["new"],
    features: [
      { icon: <ChevronDown size={16} />, title: "Dropdown", description: "Single/multi-select, search, grouped options, variants, sizes, and states." },
      { icon: <MousePointerClick size={16} />, title: "Action Dropdown", description: "Context menus with icons, descriptions, dividers, and destructive actions." },
      { icon: <SquareMousePointer size={16} />, title: "Button", description: "6 variants, 4 sizes, icon buttons, button groups, loading states, and full accessibility." },
      { icon: <Type size={16} />, title: "Input", description: "Text inputs and textareas with validation states, prefixes/suffixes, clearable, and password toggle." },
      { icon: <ListOrdered size={16} />, title: "Pagination", description: "4 variants, 3 sizes, smart ellipsis, page size selector, item range display." },
      { icon: <CalendarDays size={16} />, title: "Date Picker", description: "Single/range selection, month/year views, time picker, min/max constraints, validation." },
      { icon: <PenTool size={16} />, title: "Text Editor", description: "Rich text editor with toolbar, character/word count, min/max length, and read-only mode." },
    ],
  },
];

// Convenience reference
export const latestChangelog = changelogVersions[0];

// ─── Tag Styles ───────────────────────────────────────────────────────────────

const changelogTagStyles: Record<ChangelogTag, { bg: string; text: string }> = {
  new: { bg: "bg-chart-2/15", text: "text-chart-2" },
  improved: { bg: "bg-primary/15", text: "text-primary" },
  fixed: { bg: "bg-chart-5/15", text: "text-chart-5" },
  breaking: { bg: "bg-destructive/15", text: "text-destructive" },
  preview: { bg: "bg-[#f0f9ff]", text: "text-[#0369a1]" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ChangelogPage() {
  const { t } = useI18n();

  const tagLabels: Record<ChangelogTag, string> = {
    new: t("changelog.tagNew"),
    improved: t("changelog.tagImproved"),
    fixed: t("changelog.tagFixed"),
    breaking: t("changelog.tagBreaking"),
    preview: "Preview",
  };

  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    changelogVersions.forEach((v, i) => { initial[v.version] = i === 0; });
    return initial;
  });

  const toggleVersion = (version: string) => {
    setExpandedVersions((prev) => ({ ...prev, [version]: !prev[version] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    changelogVersions.forEach((v) => { all[v.version] = true; });
    setExpandedVersions(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    changelogVersions.forEach((v) => { all[v.version] = false; });
    setExpandedVersions(all);
  };


  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <BookOpen size={14} /><span>{t("breadcrumb.changelog")}</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.changelog.title")}</h2>
            <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
              {t("page.changelog.desc")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              style={btnStyle}
            >
              {t("changelog.expandAll")}
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              style={btnStyle}
            >
              {t("changelog.collapseAll")}
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border hidden sm:block" />

        <div className="space-y-6">
          {changelogVersions.map((release, idx) => {
            const isLatest = idx === 0;
            const isExpanded = expandedVersions[release.version] ?? false;

            return (
              <div key={release.version} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-[12px] top-[22px] hidden sm:block">
                  <div
                    className={`w-[15px] h-[15px] rounded-full border-2 ${
                      isLatest
                        ? "bg-primary border-primary shadow-[0_0_0_4px_rgba(50,169,255,0.15)]"
                        : "bg-card border-border"
                    }`}
                  />
                </div>

                {/* Card */}
                <div className="sm:ml-12 rounded-[var(--radius-md)] border border-border bg-card overflow-hidden shadow-elevation-sm">
                  {/* Header */}
                  <button
                    onClick={() => toggleVersion(release.version)}
                    className="w-full px-6 py-5 flex items-start gap-4 cursor-pointer hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`px-3 py-1.5 rounded-[var(--radius)] ${
                          isLatest ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                        style={btnStyle}
                      >
                        v{release.version}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className="text-foreground" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>
                          {isLatest ? t("changelog.latestRelease") : release.version === "1.0.0" ? t("changelog.initialRelease") : `${t("changelog.version")} ${release.version}`}
                        </span>
                        {isLatest && (
                          <span
                            className="px-2 py-0.5 rounded-[var(--radius-sm)] bg-chart-2/15 text-chart-2"
                            style={{ ...btnStyle, lineHeight: "1" }}
                          >
                            {t("changelog.latest")}
                          </span>
                        )}
                        {release.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-[var(--radius-sm)] ${changelogTagStyles[tag].bg} ${changelogTagStyles[tag].text}`}
                            style={{ ...btnStyle, lineHeight: "1" }}
                          >
                            {tagLabels[tag]}
                          </span>
                        ))}
                      </div>
                      <span className="text-muted-foreground block" style={smallLabel}>
                        {release.date} &middot; {release.features.length} {release.features.length === 1 ? t("changelog.change") : t("changelog.changes")}
                      </span>
                      <span className="text-muted-foreground block mt-1" style={fontLabel}>
                        {release.summary}
                      </span>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {release.features.map((feature) => (
                          <div
                            key={feature.title}
                            className="flex gap-3 p-3.5 rounded-[var(--radius)] bg-background border border-border/50 hover:border-primary/30 transition-colors"
                          >
                            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-accent flex items-center justify-center flex-shrink-0 text-primary">
                              {feature.icon}
                            </div>
                            <div className="min-w-0">
                              <span
                                className="text-foreground block"
                                style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}
                              >
                                {feature.title}
                              </span>
                              <span className="text-muted-foreground block mt-0.5" style={smallLabel}>
                                {feature.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer summary */}
      <div className="rounded-[var(--radius)] border border-border bg-muted/20 px-6 py-4 flex items-center gap-3">
        <Package size={18} className="text-muted-foreground flex-shrink-0" />
        <span className="text-muted-foreground" style={fontLabel}>
          {changelogVersions.length} {t("changelog.releases")} &middot; {t("changelog.startedAt")} v1.0.0 {t("changelog.on")} {changelogVersions[changelogVersions.length - 1].date} &middot; {t("changelog.latest")} v{latestChangelog.version}
        </span>
      </div>
    </div>
  );
}
