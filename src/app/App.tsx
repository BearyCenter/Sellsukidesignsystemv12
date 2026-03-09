import { useState } from "react";
import {
  Globe,
  User,
  Settings,
  Database,
  Shield,
  Zap,
  Layers,
  ChevronRight,
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Edit3,
  Download,
  Share2,
  Archive,
  Star,
  MoreHorizontal,
  Mail,
  Lock,
  Search,
  Phone,
  ArrowRight,
  Plus,
  Save,
  Send,
  Heart,
  Bell,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Tag,
  CheckCircle2,
  Clock,
  GitBranch,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  FileText,
  MousePointerClick,
  SquareMousePointer,
  Type,
  PenTool,
  CalendarDays,
  ListOrdered,
  History,
  Package,
  Rocket,
  Code2,
  Paintbrush,
  LayoutGrid,
  Wrench,
  BookOpen,
  Table2,
  PanelTop,
  BadgeCheck,
  BellRing,
  SearchIcon,
  CheckSquare,
  CircleDot,
  SwatchBook,
  Sun,
  Moon,
  ToggleLeft,
  Tags,
  UserCircle,
  MessageSquare,
  Loader2,
  BarChart3,
  ChevronsUpDown,
  CreditCard,
  PanelLeftClose,
  GripVertical,
  SeparatorHorizontal,
  Navigation,
} from "lucide-react";
import { Dropdown, type DropdownOption } from "./components/dropdown";
import { TextEditor } from "./components/text-editor";
import { ActionDropdown, type ActionEntry } from "./components/action-dropdown";
import { DSButton, IconButton, ButtonGroup } from "./components/ds-button";
import { DSInput, DSTextarea } from "./components/ds-input";
import { CodeBlock } from "./components/code-block";
import { Pagination } from "./components/ds-pagination";
import { DatePicker } from "./components/ds-datepicker";
import SSKIcon from "../imports/Icon";
import { TabShowcase } from "./pages/tab-showcase";
import { TableShowcase } from "./pages/table-showcase";
import { ModalShowcase } from "./pages/modal-showcase";
import { BadgeShowcase } from "./pages/badge-showcase";
import { AlertShowcase } from "./pages/alert-showcase";
import { SearchShowcase } from "./pages/search-showcase";
import { CheckboxShowcase } from "./pages/checkbox-showcase";
import { RadioShowcase } from "./pages/radio-showcase";
import { DesignTokensPage } from "./pages/design-tokens";
import { GettingStartedPage } from "./pages/getting-started";
import { I18nProvider, useI18n } from "./i18n";
import { InputTagShowcase } from "./pages/inputtag-showcase";
import { ToggleShowcase } from "./pages/toggle-showcase";
import { TagShowcase } from "./pages/tag-showcase";
import { AvatarShowcase } from "./pages/avatar-showcase";
import { TooltipShowcase } from "./pages/tooltip-showcase";
import { SpinnerShowcase } from "./pages/spinner-showcase";
import { ProgressBarShowcase } from "./pages/progressbar-showcase";
import { AccordionShowcase } from "./pages/accordion-showcase";
import { CardShowcase } from "./pages/card-showcase";
import { DrawerShowcase } from "./pages/drawer-showcase";
import { DividerShowcase } from "./pages/divider-showcase";
import { StepperShowcase } from "./pages/stepper-showcase";
import { MenuShowcase } from "./pages/menu-showcase";
import { SidebarShowcase } from "./pages/sidebar-showcase";
import { TopNavbarShowcase } from "./pages/topnavbar-showcase";

// ─── Sample Data ──────────────────────────────────────────────────────────────

const basicOptions: DropdownOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
];

const iconOptions: DropdownOption[] = [
  { value: "user", label: "User Management", icon: <User size={14} />, description: "Manage user accounts and permissions" },
  { value: "settings", label: "System Settings", icon: <Settings size={14} />, description: "Configure system parameters" },
  { value: "database", label: "Database", icon: <Database size={14} />, description: "Database connections and queries" },
  { value: "security", label: "Security", icon: <Shield size={14} />, description: "Security policies and audit logs" },
  { value: "performance", label: "Performance", icon: <Zap size={14} />, description: "Monitoring and optimization" },
];

const groupedOptions: DropdownOption[] = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "vue", label: "Vue.js", group: "Frontend" },
  { value: "angular", label: "Angular", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "django", label: "Django", group: "Backend" },
  { value: "rails", label: "Ruby on Rails", group: "Backend" },
  { value: "postgres", label: "PostgreSQL", group: "Database" },
  { value: "mongo", label: "MongoDB", group: "Database" },
  { value: "redis", label: "Redis", group: "Database", disabled: true },
];

const disabledOptions: DropdownOption[] = [
  { value: "active", label: "Active Plan" },
  { value: "pro", label: "Pro Plan" },
  { value: "enterprise", label: "Enterprise (Contact Sales)", disabled: true },
  { value: "legacy", label: "Legacy Plan (Deprecated)", disabled: true },
];

const basicActions: ActionEntry[] = [
  { id: "edit", label: "Edit", icon: <Edit3 size={15} />, shortcut: "⌘E", onClick: () => {} },
  { id: "copy", label: "Copy", icon: <Copy size={15} />, shortcut: "⌘C", onClick: () => {} },
  { id: "cut", label: "Cut", icon: <Scissors size={15} />, shortcut: "⌘X", onClick: () => {} },
  { id: "paste", label: "Paste", icon: <Clipboard size={15} />, shortcut: "⌘V", onClick: () => {} },
  { type: "divider" },
  { id: "delete", label: "Delete", icon: <Trash2 size={15} />, destructive: true, shortcut: "⌫", onClick: () => {} },
];

const groupedActions: ActionEntry[] = [
  { type: "group", label: "File", items: [
    { id: "download", label: "Download", icon: <Download size={15} />, onClick: () => {} },
    { id: "share", label: "Share", icon: <Share2 size={15} />, onClick: () => {} },
    { id: "archive", label: "Archive", icon: <Archive size={15} />, onClick: () => {} },
  ]},
  { type: "group", label: "Organize", items: [
    { id: "star", label: "Add to Favorites", icon: <Star size={15} />, onClick: () => {} },
    { id: "move", label: "Move to…", icon: <ArrowRight size={15} />, disabled: true, onClick: () => {} },
  ]},
  { type: "divider" },
  { id: "delete-all", label: "Delete All", icon: <Trash2 size={15} />, destructive: true, onClick: () => {} },
];

const nestedActions: ActionEntry[] = [
  { id: "new", label: "New", icon: <Plus size={15} />, children: [
    { id: "new-file", label: "File", onClick: () => {} },
    { id: "new-folder", label: "Folder", onClick: () => {} },
    { id: "new-project", label: "Project", onClick: () => {} },
  ]},
  { id: "share", label: "Share with…", icon: <Share2 size={15} />, children: [
    { id: "share-team", label: "Team", onClick: () => {} },
    { id: "share-org", label: "Organization", onClick: () => {} },
    { id: "share-public", label: "Public Link", description: "Anyone with the link can view", onClick: () => {} },
  ]},
  { type: "divider" },
  { id: "settings", label: "Settings", icon: <Settings size={15} />, onClick: () => {} },
];

const activeActions: ActionEntry[] = [
  { id: "list", label: "List View", active: true, onClick: () => {} },
  { id: "grid", label: "Grid View", onClick: () => {} },
  { id: "board", label: "Board View", onClick: () => {} },
  { type: "divider" },
  { id: "compact", label: "Compact Mode", active: true, onClick: () => {} },
];

const avatarOptions: DropdownOption[] = [
  { value: "alice", label: "Alice Johnson", avatar: "https://i.pravatar.cc/150?u=alice", description: "Product Manager" },
  { value: "bob", label: "Bob Smith", avatar: "https://i.pravatar.cc/150?u=bob", description: "Senior Engineer" },
  { value: "carol", label: "Carol Davis", avatar: "https://i.pravatar.cc/150?u=carol", description: "UX Designer" },
  { value: "dan", label: "Dan Wilson", avatar: "https://i.pravatar.cc/150?u=dan", description: "QA Lead" },
  { value: "eve", label: "Eve Martinez", avatar: "https://i.pravatar.cc/150?u=eve", description: "DevOps Engineer" },
  { value: "frank", label: "Frank Lee", avatar: "https://i.pravatar.cc/150?u=frank", description: "Data Analyst" },
];

const manyOptions: DropdownOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: `tag-${i + 1}`,
  label: `Tag ${i + 1}`,
  group: i < 7 ? "Popular" : i < 14 ? "Recent" : "Other",
}));

// ─── Shared Typography Styles ─────────────────────────────────────────────────

const fontLabel: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" };

// ─── Section / DemoCard ───────────────────────────────────────────────────────

function Section({ title, description, children, code }: { title: string; description?: string; children: React.ReactNode; code?: string }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-foreground">{title}</h4>
        {description && <p className="text-muted-foreground mt-0.5" style={fontLabel}>{description}</p>}
      </div>
      {children}
      {code && <CodeBlock code={code} />}
    </div>
  );
}

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <span
        className="uppercase tracking-wider text-muted-foreground block"
        style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.75)", fontWeight: "var(--weight-label)" }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

// ─── Changelog Data Types ─────────────────────────────────────────────────────

interface ChangelogFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

type ChangelogTag = "new" | "improved" | "fixed" | "breaking";

interface ChangelogVersion {
  version: string;
  date: string;
  summary: string;
  tags?: ChangelogTag[];
  features: ChangelogFeature[];
}

// Full changelog — single source of truth
const changelogVersions: ChangelogVersion[] = [
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
      { icon: <BookOpen size={16} />, title: "Getting Started", description: "Sellsuki DSS setup guide — sellsuki-components install, createComponent pattern, ThemeProvider, design tokens, 30+ component inventory." },
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

// Convenience reference to the latest version
const latestChangelog = changelogVersions[0];

// ─── Sidebar Navigation Types ─────────────────────────────────────────────────

type PageId =
  | "getting-started"
  | "dropdown"
  | "action"
  | "button"
  | "input"
  | "pagination"
  | "datepicker"
  | "editor"
  | "tabs"
  | "table"
  | "modal"
  | "badge"
  | "alert"
  | "search"
  | "checkbox"
  | "radio"
  | "tokens"
  | "changelog"
  | "inputtag"
  | "toggle"
  | "tag"
  | "avatar"
  | "tooltip"
  | "spinner"
  | "progressbar"
  | "accordion"
  | "card"
  | "drawer"
  | "divider"
  | "stepper"
  | "menu"
  | "sidebarcomp"
  | "topnavbar";

interface SidebarItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

function buildSidebarGroups(t: (key: string) => string): SidebarGroup[] {
  return [
    {
      label: t("sidebar.group.getting-started"),
      items: [
        { id: "getting-started", label: t("sidebar.getting-started"), icon: <BookOpen size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.foundation"),
      items: [
        { id: "tokens", label: t("sidebar.tokens"), icon: <SwatchBook size={16} /> },
        { id: "changelog", label: t("sidebar.changelog"), icon: <History size={16} />, badge: `v${latestChangelog.version}` },
      ],
    },
    {
      label: t("sidebar.group.form"),
      items: [
        { id: "button", label: t("sidebar.button"), icon: <SquareMousePointer size={16} /> },
        { id: "input", label: t("sidebar.input"), icon: <Type size={16} /> },
        { id: "inputtag", label: t("sidebar.inputtag"), icon: <Tags size={16} /> },
        { id: "search", label: t("sidebar.search"), icon: <SearchIcon size={16} /> },
        { id: "checkbox", label: t("sidebar.checkbox"), icon: <CheckSquare size={16} /> },
        { id: "radio", label: t("sidebar.radio"), icon: <CircleDot size={16} /> },
        { id: "toggle", label: t("sidebar.toggle"), icon: <ToggleLeft size={16} /> },
        { id: "dropdown", label: t("sidebar.dropdown"), icon: <ChevronDown size={16} /> },
        { id: "datepicker", label: t("sidebar.datepicker"), icon: <CalendarDays size={16} /> },
        { id: "editor", label: t("sidebar.editor"), icon: <PenTool size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.data"),
      items: [
        { id: "table", label: t("sidebar.table"), icon: <Table2 size={16} /> },
        { id: "badge", label: t("sidebar.badge"), icon: <BadgeCheck size={16} /> },
        { id: "tag", label: t("sidebar.tag"), icon: <Tag size={16} /> },
        { id: "avatar", label: t("sidebar.avatar"), icon: <UserCircle size={16} /> },
        { id: "pagination", label: t("sidebar.pagination"), icon: <ListOrdered size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.feedback"),
      items: [
        { id: "modal", label: t("sidebar.modal"), icon: <LayoutGrid size={16} /> },
        { id: "alert", label: t("sidebar.alert"), icon: <BellRing size={16} /> },
        { id: "tooltip", label: t("sidebar.tooltip"), icon: <MessageSquare size={16} /> },
        { id: "spinner", label: t("sidebar.spinner"), icon: <Loader2 size={16} /> },
        { id: "progressbar", label: t("sidebar.progressbar"), icon: <BarChart3 size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.navigation"),
      items: [
        { id: "tabs", label: t("sidebar.tabs"), icon: <PanelTop size={16} /> },
        { id: "action", label: t("sidebar.action"), icon: <MousePointerClick size={16} /> },
        { id: "menu", label: t("sidebar.menu"), icon: <GripVertical size={16} /> },
        { id: "sidebarcomp", label: t("sidebar.sidebarcomp"), icon: <PanelLeftClose size={16} /> },
        { id: "topnavbar", label: t("sidebar.topnavbar"), icon: <Navigation size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.layout"),
      items: [
        { id: "card", label: t("sidebar.card"), icon: <CreditCard size={16} /> },
        { id: "accordion", label: t("sidebar.accordion"), icon: <ChevronsUpDown size={16} /> },
        { id: "drawer", label: t("sidebar.drawer"), icon: <PanelLeftClose size={16} /> },
        { id: "divider", label: t("sidebar.divider"), icon: <SeparatorHorizontal size={16} /> },
        { id: "stepper", label: t("sidebar.stepper"), icon: <ListOrdered size={16} /> },
      ],
    },
  ];
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <I18nProvider>
      <AppInner />
    </I18nProvider>
  );
}

function AppInner() {
  const { t, lang, toggleLang } = useI18n();
  const [activePage, setActivePage] = useState<PageId>("getting-started");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarGroups = buildSidebarGroups(t);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ssk-dark-mode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("ssk-dark-mode", String(next));
      return next;
    });
  };

  return (
    <div className={`min-h-screen bg-background flex ${darkMode ? "dark" : ""}`}>
      {/* ─── Mobile overlay ──────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:sticky lg:top-0 lg:z-30`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-sidebar-border flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden">
            <SSKIcon />
          </div>
          <div className="min-w-0">
            <span
              className="text-sidebar-foreground block truncate"
              style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}
            >
              Sellsuki v1.2
            </span>
            <span
              className="text-muted-foreground block truncate"
              style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.8)", fontWeight: "var(--weight-label)" }}
            >
              {t("app.designSystem")}
            </span>
          </div>
          <button
            className="lg:hidden ml-auto text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {sidebarGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <span
                className="px-2 mb-2 block text-muted-foreground uppercase tracking-wider"
                style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.7)", fontWeight: "var(--weight-button)" }}
              >
                {group.label}
              </span>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] transition-all cursor-pointer
                        ${isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }
                      `}
                      style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: isActive ? "var(--weight-button)" : "var(--weight-label)" }}
                    >
                      <span className={isActive ? "text-sidebar-primary" : "text-muted-foreground"}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className="ml-auto px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-primary text-primary-foreground"
                          style={{ fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.78)", fontWeight: "var(--weight-button)", lineHeight: "1" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-3 border-t border-sidebar-border flex items-center justify-between gap-2">
          <span
            className="text-muted-foreground truncate"
            style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.8)", fontWeight: "var(--weight-label)" }}
          >
            v{latestChangelog.version} &middot; {latestChangelog.date}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={toggleLang}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
              aria-label={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
              title={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
            >
              <span style={{ fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.78)", fontWeight: "var(--weight-button)" }}>
                {t("app.switchLang")}
              </span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
              aria-label={darkMode ? t("app.lightMode") : t("app.darkMode")}
              title={darkMode ? t("app.lightMode") : t("app.darkMode")}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border shadow-elevation-sm">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-foreground cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div className="w-7 h-7 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden">
              <SSKIcon />
            </div>
            <span
              className="text-foreground flex-1"
              style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}
            >
              {t("app.mobileTitle")}
            </span>
            <button
              onClick={toggleLang}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
            >
              <span style={{ fontFamily: "var(--font-button)", fontSize: "calc(var(--text-button) * 0.78)", fontWeight: "var(--weight-button)" }}>
                {t("app.switchLang")}
              </span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label={darkMode ? t("app.lightMode") : t("app.darkMode")}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-10">
          {activePage === "getting-started" && <GettingStartedPage />}
          {activePage === "tokens" && <DesignTokensPage />}
          {activePage === "dropdown" && <DropdownPage />}
          {activePage === "action" && <ActionShowcase />}
          {activePage === "button" && <ButtonShowcase />}
          {activePage === "input" && <InputShowcase />}
          {activePage === "search" && <SearchShowcase />}
          {activePage === "checkbox" && <CheckboxShowcase />}
          {activePage === "radio" && <RadioShowcase />}
          {activePage === "tabs" && <TabShowcase />}
          {activePage === "table" && <TableShowcase />}
          {activePage === "badge" && <BadgeShowcase />}
          {activePage === "modal" && <ModalShowcase />}
          {activePage === "alert" && <AlertShowcase />}
          {activePage === "pagination" && <PaginationShowcase />}
          {activePage === "datepicker" && <DatePickerShowcase />}
          {activePage === "editor" && <EditorShowcase />}
          {activePage === "inputtag" && <InputTagShowcase />}
          {activePage === "toggle" && <ToggleShowcase />}
          {activePage === "tag" && <TagShowcase />}
          {activePage === "avatar" && <AvatarShowcase />}
          {activePage === "tooltip" && <TooltipShowcase />}
          {activePage === "spinner" && <SpinnerShowcase />}
          {activePage === "progressbar" && <ProgressBarShowcase />}
          {activePage === "accordion" && <AccordionShowcase />}
          {activePage === "card" && <CardShowcase />}
          {activePage === "drawer" && <DrawerShowcase />}
          {activePage === "divider" && <DividerShowcase />}
          {activePage === "stepper" && <StepperShowcase />}
          {activePage === "menu" && <MenuShowcase />}
          {activePage === "sidebarcomp" && <SidebarShowcase />}
          {activePage === "topnavbar" && <TopNavbarShowcase />}
          {activePage === "changelog" && <ChangelogPage />}
        </main>
      </div>
    </div>
  );
}

// ─── Dropdown Page (Changelog + Component Docs Combined) ──────────────────────

function DropdownPage() {
  const { t } = useI18n();
  const [val2, setVal2] = useState<string | string[]>([]);
  const [selectAllVal, setSelectAllVal] = useState<string | string[]>([]);
  const [tagLimitVal, setTagLimitVal] = useState<string | string[]>(["tag-1", "tag-2", "tag-3", "tag-4", "tag-5"]);
  const [creatableOptions, setCreatableOptions] = useState<DropdownOption[]>([
    { value: "bug", label: "Bug", icon: <AlertTriangle size={14} className="text-destructive" /> },
    { value: "feature", label: "Feature", icon: <Sparkles size={14} className="text-primary" /> },
    { value: "improvement", label: "Improvement", icon: <CheckCircle2 size={14} className="text-chart-2" /> },
    { value: "task", label: "Task", icon: <Clock size={14} className="text-chart-5" /> },
  ]);
  const [creatableVal, setCreatableVal] = useState<string | string[]>("");
  const [asyncSearch, setAsyncSearch] = useState("");
  const [asyncOptions, setAsyncOptions] = useState<DropdownOption[]>([]);
  const [asyncLoading, setAsyncLoading] = useState(false);
  const [changelogExpanded, setChangelogExpanded] = useState(true);

  const handleAsyncSearch = (query: string) => {
    setAsyncSearch(query);
    if (!query.trim()) { setAsyncOptions([]); setAsyncLoading(false); return; }
    setAsyncLoading(true);
    setTimeout(() => {
      setAsyncOptions([
        { value: "repo-1", label: `sellsuki/${query}-api`, icon: <GitBranch size={14} />, description: "TypeScript · Updated 2h ago" },
        { value: "repo-2", label: `sellsuki/${query}-web`, icon: <GitBranch size={14} />, description: "React · Updated 5h ago" },
        { value: "repo-3", label: `sellsuki/${query}-mobile`, icon: <GitBranch size={14} />, description: "Flutter · Updated 1d ago" },
      ]);
      setAsyncLoading(false);
    }, 800);
  };

  // v1.1.0 feature demos — mapped from latestChangelog.features
  const featureDemos: { demo: React.ReactNode; code: string }[] = [
    {
      demo: (
        <div className="max-w-md">
          <Dropdown options={basicOptions} multiple searchable clearable showSelectAll placeholder="Select frameworks..." helperText="Try selecting all, then deselecting" value={selectAllVal} onChange={setSelectAllVal} />
        </div>
      ),
      code: `<Dropdown options={options} multiple searchable clearable showSelectAll placeholder="Select frameworks..." />`,
    },
    {
      demo: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DemoCard label="tagLimit={2}">
            <Dropdown options={manyOptions} multiple searchable clearable showSelectAll tagLimit={2} placeholder="Select tags..." value={tagLimitVal} onChange={setTagLimitVal} />
          </DemoCard>
          <DemoCard label="tagLimit={4}">
            <Dropdown options={manyOptions} multiple searchable clearable tagLimit={4} placeholder="Select tags..." value={tagLimitVal} onChange={setTagLimitVal} />
          </DemoCard>
        </div>
      ),
      code: `<Dropdown options={manyOptions} multiple searchable clearable showSelectAll tagLimit={2} placeholder="Select tags..." />`,
    },
    {
      demo: (
        <div className="max-w-sm">
          <Dropdown
            options={creatableOptions} searchable clearable creatable
            placeholder='Search or create...'
            helperText='Try typing "Documentation" and press Create'
            value={creatableVal} onChange={setCreatableVal}
            onCreateOption={(label) => {
              const newOpt: DropdownOption = { value: label.toLowerCase().replace(/\s+/g, "-"), label, icon: <Tag size={14} className="text-muted-foreground" /> };
              setCreatableOptions((prev) => [...prev, newOpt]);
              setCreatableVal(newOpt.value);
            }}
          />
        </div>
      ),
      code: `<Dropdown options={options} searchable clearable creatable placeholder="Search or create..."
  onCreateOption={(label) => { /* add to list */ }} />`,
    },
    {
      demo: (
        <div className="max-w-md">
          <Dropdown
            options={asyncOptions} searchable clearable
            placeholder="Search repositories..."
            helperText="Type a keyword (simulated 800ms delay)"
            onSearch={handleAsyncSearch} searchDebounce={300} searchLoading={asyncLoading}
            emptyState={!asyncSearch ? (
              <div className="text-center text-muted-foreground py-2 flex flex-col items-center gap-1">
                <Search size={20} className="opacity-40" />
                <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>Type to search repositories</span>
              </div>
            ) : undefined}
          />
        </div>
      ),
      code: `<Dropdown options={options} searchable clearable placeholder="Search repositories..."
  onSearch={handleSearch} searchDebounce={300} searchLoading={loading} />`,
    },
    {
      demo: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DemoCard label="Single Select">
            <Dropdown options={avatarOptions} searchable clearable placeholder="Choose assignee..." />
          </DemoCard>
          <DemoCard label="Multi-select">
            <Dropdown options={avatarOptions} multiple searchable clearable showSelectAll tagLimit={3} placeholder="Add reviewers..." />
          </DemoCard>
        </div>
      ),
      code: `<Dropdown options={teamOptions} multiple searchable clearable showSelectAll tagLimit={3} placeholder="Add reviewers..." />`,
    },
    {
      demo: (
        <div className="max-w-sm">
          <Dropdown
            options={groupedOptions} grouped searchable clearable
            placeholder="Select technologies..."
            footer={
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>Can't find what you need?</span>
                <button className="text-primary cursor-pointer hover:underline" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }} onClick={() => alert("Request submitted!")}>Request New</button>
              </div>
            }
          />
        </div>
      ),
      code: `<Dropdown options={options} grouped searchable clearable placeholder="Select technologies..."
  footer={<div>...</div>} />`,
    },
  ];

  return (
    <div className="space-y-14">
      {/* ─── Page Header ─── */}
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.dropdown.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.dropdown.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.dropdown.desc")}
        </p>
      </div>

      {/* ─── Changelog Banner (latest version only) ─── */}
      <div className="rounded-[var(--radius-lg)] border border-primary/30 bg-accent/50 overflow-hidden">
        <button
          onClick={() => setChangelogExpanded(!changelogExpanded)}
          className="w-full px-6 py-4 flex items-center gap-3 cursor-pointer hover:bg-accent/30 transition-colors"
        >
          <div className="w-8 h-8 rounded-[var(--radius)] bg-primary flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-primary-foreground" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <span className="text-foreground block" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>
              What's New in v{latestChangelog.version}
            </span>
            <span className="text-muted-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}>
              {latestChangelog.date} &middot; {latestChangelog.summary}
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform flex-shrink-0 ${changelogExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {changelogExpanded && (
          <div className="border-t border-primary/20">
            {/* Feature summary grid */}
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestChangelog.features.map((f) => (
                <div key={f.title} className="flex gap-3 p-3 rounded-[var(--radius)] bg-card/80 border border-border/50">
                  <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-accent flex items-center justify-center flex-shrink-0 text-primary">
                    {f.icon}
                  </div>
                  <div>
                    <span className="text-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>
                      {f.title}
                    </span>
                    <span className="text-muted-foreground block mt-0.5" style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.85)", fontWeight: "var(--weight-label)" }}>
                      {f.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive demos for each new feature */}
            <div className="border-t border-primary/20 px-6 py-5 space-y-6">
              <span
                className="uppercase tracking-wider text-muted-foreground block"
                style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.7)", fontWeight: "var(--weight-button)" }}
              >
                Interactive Demos — v{latestChangelog.version} Features
              </span>
              {latestChangelog.features.map((f, idx) => (
                <div key={f.title} className="rounded-[var(--radius)] border border-border bg-card">
                  <div className="px-5 py-3 border-b border-border flex items-center gap-2.5">
                    <span className="text-primary">{f.icon}</span>
                    <span className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>
                      {f.title}
                    </span>
                  </div>
                  <div className="px-5 py-4 bg-background/50">
                    {featureDemos[idx]?.demo}
                  </div>
                  <div className="px-5 py-3 border-t border-border">
                    <CodeBlock code={featureDemos[idx]?.code ?? ""} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Component Documentation ─── */}
      <Section
        title="Variants"
        description="Four visual variants to match different UI contexts."
        code={`import { Dropdown } from "./components/dropdown";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

<Dropdown options={options} variant="default" placeholder="Default variant" />
<Dropdown options={options} variant="outlined" placeholder="Outlined variant" />
<Dropdown options={options} variant="filled" placeholder="Filled variant" />
<Dropdown options={options} variant="ghost" placeholder="Ghost variant" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><Dropdown options={basicOptions} variant="default" placeholder="Default variant" /></DemoCard>
          <DemoCard label="Outlined"><Dropdown options={basicOptions} variant="outlined" placeholder="Outlined variant" /></DemoCard>
          <DemoCard label="Filled"><Dropdown options={basicOptions} variant="filled" placeholder="Filled variant" /></DemoCard>
          <DemoCard label="Ghost"><Dropdown options={basicOptions} variant="ghost" placeholder="Ghost variant" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for different density requirements."
        code={`<Dropdown options={options} size="sm" placeholder="Small" />
<Dropdown options={options} size="md" placeholder="Medium" />
<Dropdown options={options} size="lg" placeholder="Large" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DemoCard label="Small"><Dropdown options={basicOptions} size="sm" placeholder="Small dropdown" /></DemoCard>
          <DemoCard label="Medium"><Dropdown options={basicOptions} size="md" placeholder="Medium dropdown" /></DemoCard>
          <DemoCard label="Large"><Dropdown options={basicOptions} size="lg" placeholder="Large dropdown" /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Visual feedback for all interaction states."
        code={`<Dropdown options={options} label="Framework" state="error" errorMessage="This field is required" required />
<Dropdown options={options} label="Framework" state="success" successMessage="Valid selection" defaultValue="react" />
<Dropdown options={options} label="Framework" disabled defaultValue="react" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><Dropdown options={basicOptions} label="Framework" helperText="Choose your preferred framework" /></DemoCard>
          <DemoCard label="Error"><Dropdown options={basicOptions} label="Framework" state="error" errorMessage="This field is required" required /></DemoCard>
          <DemoCard label="Success"><Dropdown options={basicOptions} label="Framework" state="success" successMessage="Valid selection" defaultValue="react" /></DemoCard>
          <DemoCard label="Disabled"><Dropdown options={basicOptions} label="Framework" disabled defaultValue="react" helperText="This field is locked" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Loading State"
        description="Async data fetching indicator."
        code={`<Dropdown options={[]} loading label="Data Source" placeholder="Loading options…" />`}
      >
        <div className="max-w-sm"><Dropdown options={[]} loading label="Data Source" placeholder="Loading options…" helperText="Fetching available data sources" /></div>
      </Section>

      <Section
        title="Searchable"
        description="Built-in search to filter large option lists."
        code={`<Dropdown options={options} searchable clearable label="Module" placeholder="Search modules…" />`}
      >
        <div className="max-w-sm"><Dropdown options={iconOptions} searchable clearable label="Module" placeholder="Search modules…" helperText="Type to filter available modules" /></div>
      </Section>

      <Section
        title="Multi-select"
        description="Select multiple values with chip display and max selection limit."
        code={`const [value, setValue] = useState([]);

<Dropdown
  options={options}
  multiple searchable clearable
  maxSelections={3}
  label="Tech Stack"
  placeholder="Select up to 3 frameworks"
  value={value}
  onChange={setValue}
/>`}
      >
        <div className="max-w-md"><Dropdown options={basicOptions} multiple searchable clearable maxSelections={3} label="Tech Stack" placeholder="Select up to 3 frameworks" helperText="Choose the frameworks for your project" value={val2} onChange={setVal2} /></div>
      </Section>

      <Section
        title="Grouped Options"
        description="Organize options into semantic groups with headers."
        code={`const options = [
  { value: "react", label: "React", group: "Frontend" },
  { value: "node", label: "Node.js", group: "Backend" },
  { value: "postgres", label: "PostgreSQL", group: "Database" },
];

<Dropdown options={options} grouped searchable clearable label="Technology" />`}
      >
        <div className="max-w-sm"><Dropdown options={groupedOptions} grouped searchable clearable label="Technology" placeholder="Select technology…" /></div>
      </Section>

      <Section
        title="Rich Options"
        description="Options with icons and secondary descriptions."
        code={`const options = [
  { value: "user", label: "User Management", icon: <User size={14} />, description: "Manage user accounts" },
];

<Dropdown options={options} clearable label="Module" />`}
      >
        <div className="max-w-sm"><Dropdown options={iconOptions} clearable label="Module" placeholder="Choose a module" /></div>
      </Section>

      <Section
        title="Disabled Options"
        description="Individual options can be disabled within the list."
        code={`const options = [
  { value: "active", label: "Active Plan" },
  { value: "enterprise", label: "Enterprise (Contact Sales)", disabled: true },
];

<Dropdown options={options} label="Plan" placeholder="Select a plan" />`}
      >
        <div className="max-w-sm"><Dropdown options={disabledOptions} label="Subscription Plan" placeholder="Select a plan" helperText="Some plans are unavailable" /></div>
      </Section>
    </div>
  );
}

// ─── Action Dropdown Showcase ─────────────────────────────────────────────────

function ActionShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.action.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.action.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.action.desc")}
        </p>
      </div>

      <Section
        title="Basic Actions"
        description="Simple action list with icons, shortcuts, and a destructive action."
        code={`import { ActionDropdown } from "./components/action-dropdown";

const actions = [
  { id: "edit", label: "Edit", icon: <Edit3 size={15} />, shortcut: "⌘E", onClick: () => {} },
  { id: "copy", label: "Copy", icon: <Copy size={15} />, shortcut: "⌘C", onClick: () => {} },
  { type: "divider" },
  { id: "delete", label: "Delete", icon: <Trash2 size={15} />, destructive: true, onClick: () => {} },
];

<ActionDropdown items={actions} label="Edit Actions" />`}
      >
        <div className="flex flex-wrap gap-4">
          <ActionDropdown items={basicActions} label="Edit Actions" />
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes to fit different UI density."
        code={`<ActionDropdown items={actions} label="Small" size="sm" />
<ActionDropdown items={actions} label="Medium" size="md" />
<ActionDropdown items={actions} label="Large" size="lg" />`}
      >
        <div className="flex flex-wrap items-start gap-4">
          <DemoCard label="Small"><ActionDropdown items={basicActions} label="Small" size="sm" /></DemoCard>
          <DemoCard label="Medium"><ActionDropdown items={basicActions} label="Medium" size="md" /></DemoCard>
          <DemoCard label="Large"><ActionDropdown items={basicActions} label="Large" size="lg" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Grouped Actions"
        description="Organize actions into semantic groups with labels."
        code={`const actions = [
  { type: "group", label: "File", items: [
    { id: "download", label: "Download", icon: <Download size={15} />, onClick: () => {} },
    { id: "share", label: "Share", icon: <Share2 size={15} />, onClick: () => {} },
  ]},
  { type: "divider" },
  { id: "delete", label: "Delete All", destructive: true, onClick: () => {} },
];

<ActionDropdown items={actions} label="File Actions" />`}
      >
        <ActionDropdown items={groupedActions} label="File Actions" />
      </Section>

      <Section
        title="Nested Sub-menus"
        description="Action items can expand into sub-menus on hover."
        code={`const actions = [
  { id: "new", label: "New", icon: <Plus size={15} />, children: [
    { id: "new-file", label: "File", onClick: () => {} },
    { id: "new-folder", label: "Folder", onClick: () => {} },
  ]},
  { id: "share", label: "Share with…", icon: <Share2 size={15} />, children: [
    { id: "share-team", label: "Team", onClick: () => {} },
    { id: "share-public", label: "Public Link", onClick: () => {} },
  ]},
];

<ActionDropdown items={actions} label="More Options" />`}
      >
        <ActionDropdown items={nestedActions} label="More Options" />
      </Section>

      <Section
        title="Active / Check State"
        description="Indicate currently selected or active options with a check mark."
        code={`const actions = [
  { id: "list", label: "List View", active: true, onClick: () => {} },
  { id: "grid", label: "Grid View", onClick: () => {} },
];

<ActionDropdown items={actions} label="View Options" />`}
      >
        <ActionDropdown items={activeActions} label="View Options" />
      </Section>

      <Section
        title="Alignment"
        description="Panel can align left or right to the trigger."
        code={`<ActionDropdown items={actions} label="Align Left" align="left" />
<ActionDropdown items={actions} label="Align Right" align="right" />`}
      >
        <div className="flex gap-4">
          <ActionDropdown items={basicActions} label="Align Left" align="left" />
          <ActionDropdown items={basicActions} label="Align Right" align="right" />
        </div>
      </Section>

      <Section
        title="Custom Trigger"
        description="Use any element as the dropdown trigger."
        code={`<ActionDropdown
  items={actions}
  trigger={
    <IconButton icon={<MoreHorizontal size={16} />} aria-label="More" variant="outline" />
  }
/>

<ActionDropdown
  items={actions}
  trigger={
    <DSButton variant="primary" rightIcon={<ChevronRight size={14} />}>
      File Menu
    </DSButton>
  }
/>`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ActionDropdown items={basicActions} trigger={<IconButton icon={<MoreHorizontal size={16} />} aria-label="More options" variant="outline" />} />
          <ActionDropdown items={groupedActions} trigger={<DSButton variant="primary" rightIcon={<ChevronRight size={14} />}>File Menu</DSButton>} />
          <ActionDropdown items={activeActions} trigger={<DSButton variant="outline" size="sm" leftIcon={<Settings size={14} />}>Settings</DSButton>} />
        </div>
      </Section>

      <Section
        title="States"
        description="Disabled and loading states."
        code={`<ActionDropdown items={actions} label="Disabled" disabled />
<ActionDropdown items={actions} label="Loading" loading />`}
      >
        <div className="flex flex-wrap gap-4">
          <DemoCard label="Disabled"><ActionDropdown items={basicActions} label="Disabled" disabled /></DemoCard>
          <DemoCard label="Loading"><ActionDropdown items={basicActions} label="Loading" loading /></DemoCard>
        </div>
      </Section>
    </div>
  );
}

// ─── Button Showcase ──────────────────────────────────────────────────────────

function ButtonShowcase() {
  const { t } = useI18n();
  const [loading1, setLoading1] = useState(false);
  const simulateLoad = () => { setLoading1(true); setTimeout(() => setLoading1(false), 2000); };

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.button.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.button.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.button.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Six variants for different semantic and visual purposes."
        code={`import { DSButton } from "./components/ds-button";

<DSButton variant="primary">Primary</DSButton>
<DSButton variant="secondary">Secondary</DSButton>
<DSButton variant="outline">Outline</DSButton>
<DSButton variant="ghost">Ghost</DSButton>
<DSButton variant="destructive">Destructive</DSButton>
<DSButton variant="link">Link Button</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton variant="primary">Primary</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="outline">Outline</DSButton>
          <DSButton variant="ghost">Ghost</DSButton>
          <DSButton variant="destructive">Destructive</DSButton>
          <DSButton variant="link">Link Button</DSButton>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Four sizes from compact to prominent."
        code={`<DSButton size="sm">Small</DSButton>
<DSButton size="md">Medium</DSButton>
<DSButton size="lg">Large</DSButton>
<DSButton size="xl">Extra Large</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton size="sm">Small</DSButton>
          <DSButton size="md">Medium</DSButton>
          <DSButton size="lg">Large</DSButton>
          <DSButton size="xl">Extra Large</DSButton>
        </div>
      </Section>

      <Section
        title="With Icons"
        description="Icons can be placed on the left, right, or both sides."
        code={`<DSButton leftIcon={<Plus size={16} />}>Create New</DSButton>
<DSButton variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</DSButton>
<DSButton variant="destructive" leftIcon={<Trash2 size={16} />}>Delete</DSButton>
<DSButton variant="primary" leftIcon={<Send size={16} />} rightIcon={<ArrowRight size={16} />}>
  Send & Next
</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton leftIcon={<Plus size={16} />}>Create New</DSButton>
          <DSButton variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</DSButton>
          <DSButton variant="secondary" leftIcon={<Save size={16} />}>Save Draft</DSButton>
          <DSButton variant="destructive" leftIcon={<Trash2 size={16} />}>Delete</DSButton>
          <DSButton variant="ghost" leftIcon={<Download size={16} />}>Download</DSButton>
          <DSButton variant="primary" leftIcon={<Send size={16} />} rightIcon={<ArrowRight size={16} />}>Send & Next</DSButton>
        </div>
      </Section>

      <Section
        title="Icon Buttons"
        description="Compact square buttons with only an icon."
        code={`import { IconButton } from "./components/ds-button";

<IconButton icon={<Heart size={16} />} aria-label="Like" variant="ghost" />
<IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="outline" />
<IconButton icon={<Plus size={16} />} aria-label="Add" variant="primary" />
<IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" />`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <IconButton icon={<Heart size={16} />} aria-label="Like" variant="ghost" />
          <IconButton icon={<Bell size={16} />} aria-label="Notifications" variant="outline" />
          <IconButton icon={<Settings size={16} />} aria-label="Settings" variant="ghost" />
          <IconButton icon={<Plus size={16} />} aria-label="Add" variant="primary" />
          <IconButton icon={<Trash2 size={16} />} aria-label="Delete" variant="destructive" />
          <IconButton icon={<Share2 size={16} />} aria-label="Share" variant="secondary" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <IconButton icon={<Plus size={12} />} aria-label="Add" variant="outline" size="sm" />
          <IconButton icon={<Plus size={16} />} aria-label="Add" variant="outline" size="md" />
          <IconButton icon={<Plus size={18} />} aria-label="Add" variant="outline" size="lg" />
          <IconButton icon={<Plus size={20} />} aria-label="Add" variant="outline" size="xl" />
        </div>
      </Section>

      <Section
        title="Loading State"
        description="Shows a spinner and optionally replaces the label."
        code={`<DSButton loading>Loading</DSButton>
<DSButton loading loadingText="Saving…" variant="secondary" />

// Interactive loading
const [loading, setLoading] = useState(false);
<DSButton
  onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
  loading={loading}
  leftIcon={<Upload size={16} />}
>
  Upload File
</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton loading>Loading</DSButton>
          <DSButton loading loadingText="Saving…" variant="secondary" />
          <DSButton loading variant="outline" />
          <DSButton onClick={simulateLoad} loading={loading1} leftIcon={<Upload size={16} />}>
            {loading1 ? "Uploading…" : "Upload File"}
          </DSButton>
        </div>
      </Section>

      <Section
        title="Disabled"
        description="Non-interactive state for all variants."
        code={`<DSButton disabled>Primary</DSButton>
<DSButton disabled variant="secondary">Secondary</DSButton>
<DSButton disabled variant="outline">Outline</DSButton>
<DSButton disabled variant="destructive">Destructive</DSButton>`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <DSButton disabled>Primary</DSButton>
          <DSButton disabled variant="secondary">Secondary</DSButton>
          <DSButton disabled variant="outline">Outline</DSButton>
          <DSButton disabled variant="ghost">Ghost</DSButton>
          <DSButton disabled variant="destructive">Destructive</DSButton>
          <DSButton disabled variant="link">Link</DSButton>
        </div>
      </Section>

      <Section
        title="Full Width"
        description="Button stretches to fill its container."
        code={`<DSButton fullWidth leftIcon={<Mail size={16} />}>Sign in with Email</DSButton>
<DSButton fullWidth variant="outline" leftIcon={<Globe size={16} />}>Continue with Google</DSButton>`}
      >
        <div className="max-w-md space-y-3">
          <DSButton fullWidth leftIcon={<Mail size={16} />}>Sign in with Email</DSButton>
          <DSButton fullWidth variant="outline" leftIcon={<Globe size={16} />}>Continue with Google</DSButton>
        </div>
      </Section>

      <Section
        title="Button Group"
        description="Group related actions together with connected borders."
        code={`import { ButtonGroup } from "./components/ds-button";

<ButtonGroup>
  <DSButton variant="outline">Left</DSButton>
  <DSButton variant="outline">Center</DSButton>
  <DSButton variant="outline">Right</DSButton>
</ButtonGroup>

<ButtonGroup>
  <DSButton variant="primary">Save</DSButton>
  <DSButton variant="primary" leftIcon={<ChevronRight size={14} />} />
</ButtonGroup>`}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonGroup>
            <DSButton variant="outline">Left</DSButton>
            <DSButton variant="outline">Center</DSButton>
            <DSButton variant="outline">Right</DSButton>
          </ButtonGroup>
          <ButtonGroup>
            <DSButton variant="outline" leftIcon={<AlignLeft size={14} />}>{""}</DSButton>
            <DSButton variant="outline" leftIcon={<AlignCenter size={14} />}>{""}</DSButton>
            <DSButton variant="outline" leftIcon={<AlignRight size={14} />}>{""}</DSButton>
          </ButtonGroup>
          <ButtonGroup>
            <DSButton variant="primary">Save</DSButton>
            <DSButton variant="primary" leftIcon={<ChevronRight size={14} />}>{""}</DSButton>
          </ButtonGroup>
        </div>
      </Section>
    </div>
  );
}

// ─── Input Showcase ───────────────────────────────────────────────────────────

function InputShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.input.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.input.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.input.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants for different form contexts."
        code={`import { DSInput } from "./components/ds-input";

<DSInput variant="default" placeholder="Default variant" label="Name" />
<DSInput variant="outlined" placeholder="Outlined variant" label="Name" />
<DSInput variant="filled" placeholder="Filled variant" label="Name" />
<DSInput variant="ghost" placeholder="Ghost variant" label="Name" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DSInput variant="default" placeholder="Default variant" label="Name" /></DemoCard>
          <DemoCard label="Outlined"><DSInput variant="outlined" placeholder="Outlined variant" label="Name" /></DemoCard>
          <DemoCard label="Filled"><DSInput variant="filled" placeholder="Filled variant" label="Name" /></DemoCard>
          <DemoCard label="Ghost"><DSInput variant="ghost" placeholder="Ghost variant" label="Name" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for different density."
        code={`<DSInput inputSize="sm" placeholder="Small" label="Name" />
<DSInput inputSize="md" placeholder="Medium" label="Name" />
<DSInput inputSize="lg" placeholder="Large" label="Name" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DemoCard label="Small"><DSInput inputSize="sm" placeholder="Small input" label="Name" /></DemoCard>
          <DemoCard label="Medium"><DSInput inputSize="md" placeholder="Medium input" label="Name" /></DemoCard>
          <DemoCard label="Large"><DSInput inputSize="lg" placeholder="Large input" label="Name" /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Validation and feedback states."
        code={`// Error
<DSInput label="Email" state="error" errorMessage="Invalid email address" required />

// Success
<DSInput label="Email" state="success" successMessage="Email verified" defaultValue="john@co.com" />

// Disabled
<DSInput label="Email" disabled defaultValue="locked@example.com" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DSInput label="Email" placeholder="you@example.com" helperText="We'll never share your email" /></DemoCard>
          <DemoCard label="Error"><DSInput label="Email" placeholder="you@example.com" state="error" errorMessage="Invalid email address" required /></DemoCard>
          <DemoCard label="Success"><DSInput label="Email" defaultValue="john@company.com" state="success" successMessage="Email verified" /></DemoCard>
          <DemoCard label="Disabled"><DSInput label="Email" defaultValue="locked@example.com" disabled helperText="Contact admin to change" /></DemoCard>
        </div>
      </Section>

      <Section
        title="With Icons"
        description="Left and right icon slots for visual context."
        code={`<DSInput label="Search" placeholder="Search…" leftIcon={<Search size={16} />} clearable />
<DSInput label="Email" placeholder="you@example.com" leftIcon={<Mail size={16} />} />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DSInput label="Search" placeholder="Search anything…" leftIcon={<Search size={16} />} clearable />
          <DSInput label="Email" placeholder="you@example.com" leftIcon={<Mail size={16} />} />
          <DSInput label="Phone" placeholder="+1 (555) 000-0000" leftIcon={<Phone size={16} />} />
          <DSInput label="Website" placeholder="https://example.com" leftIcon={<Globe size={16} />} clearable />
        </div>
      </Section>

      <Section
        title="Prefix & Suffix"
        description="Static text labels inside the input."
        code={`<DSInput label="Price" placeholder="0.00" prefix="$" suffix="USD" />
<DSInput label="Domain" placeholder="yoursite" prefix="https://" suffix=".com" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DSInput label="Price" placeholder="0.00" prefix="$" suffix="USD" />
          <DSInput label="Domain" placeholder="yoursite" prefix="https://" suffix=".com" />
          <DSInput label="Weight" placeholder="0" suffix="kg" />
          <DSInput label="Discount" placeholder="0" suffix="%" />
        </div>
      </Section>

      <Section
        title="Password"
        description="Password input with visibility toggle."
        code={`<DSInput
  label="Password"
  type="password"
  placeholder="Enter your password"
  showPasswordToggle
  leftIcon={<Lock size={16} />}
  helperText="Must be at least 8 characters"
/>`}
      >
        <div className="max-w-sm">
          <DSInput label="Password" type="password" placeholder="Enter your password" showPasswordToggle leftIcon={<Lock size={16} />} helperText="Must be at least 8 characters" />
        </div>
      </Section>

      <Section
        title="Clearable"
        description="One-click clear button when input has a value."
        code={`<DSInput label="Search" placeholder="Type to search…" clearable leftIcon={<Search size={16} />} />`}
      >
        <div className="max-w-sm">
          <DSInput label="Search" placeholder="Type to search…" clearable leftIcon={<Search size={16} />} helperText="Click the X to clear" />
        </div>
      </Section>

      <Section
        title="Loading"
        description="Spinner indicator for async validation."
        code={`<DSInput label="Username" placeholder="Check availability…" loading />`}
      >
        <div className="max-w-sm">
          <DSInput label="Username" placeholder="Check availability…" loading helperText="Checking username availability" />
        </div>
      </Section>

      <Section
        title="Textarea"
        description="Multi-line text input with all the same states."
        code={`import { DSTextarea } from "./components/ds-input";

<DSTextarea label="Description" placeholder="Write a description…" helperText="Describe the item" />

// With character count
<DSTextarea label="Bio" placeholder="Tell us about yourself…" showCharCount maxLength={200} />`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Default"><DSTextarea label="Description" placeholder="Write a description…" helperText="Describe the item in detail" /></DemoCard>
          <DemoCard label="With Character Count"><DSTextarea label="Bio" placeholder="Tell us about yourself…" showCharCount maxLength={200} helperText="Keep it concise" /></DemoCard>
          <DemoCard label="Error"><DSTextarea label="Notes" placeholder="Add notes…" state="error" errorMessage="This field is required" required /></DemoCard>
          <DemoCard label="Disabled"><DSTextarea label="Comments" defaultValue="This textarea is disabled and cannot be edited." disabled /></DemoCard>
        </div>
      </Section>

      <Section
        title="Textarea Variants"
        description="Same four variants as the text input."
        code={`<DSTextarea variant="default" label="Default" placeholder="Default variant…" />
<DSTextarea variant="outlined" label="Outlined" placeholder="Outlined variant…" />
<DSTextarea variant="filled" label="Filled" placeholder="Filled variant…" />
<DSTextarea variant="ghost" label="Ghost" placeholder="Ghost variant…" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DemoCard label="Default"><DSTextarea variant="default" label="Default" placeholder="Default variant…" /></DemoCard>
          <DemoCard label="Outlined"><DSTextarea variant="outlined" label="Outlined" placeholder="Outlined variant…" /></DemoCard>
          <DemoCard label="Filled"><DSTextarea variant="filled" label="Filled" placeholder="Filled variant…" /></DemoCard>
          <DemoCard label="Ghost"><DSTextarea variant="ghost" label="Ghost" placeholder="Ghost variant…" /></DemoCard>
        </div>
      </Section>
    </div>
  );
}

// ─── Editor Showcase ──────────────────────────────────────────────────────────

// ─── Pagination Showcase ──────────────────────────────────────────────────────

function PaginationShowcase() {
  const { t } = useI18n();
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);
  const [pageSize3, setPageSize3] = useState(20);
  const [page4, setPage4] = useState(3);
  const [page5, setPage5] = useState(1);
  const [page6, setPage6] = useState(7);

  const totalItems3 = 487;
  const totalPages3 = Math.ceil(totalItems3 / pageSize3);

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.pagination.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.pagination.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.pagination.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants to match different table and list contexts."
        code={`import { Pagination } from "./components/ds-pagination";

<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="default" />
<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="outlined" />
<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="filled" />
<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="minimal" />`}
      >
        <div className="space-y-6">
          <DemoCard label="Default">
            <Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="default" />
          </DemoCard>
          <DemoCard label="Outlined">
            <Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="outlined" />
          </DemoCard>
          <DemoCard label="Filled">
            <Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="filled" />
          </DemoCard>
          <DemoCard label="Minimal">
            <Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="minimal" />
          </DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for different density layouts — tables, lists, and mobile views."
        code={`<Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="sm" />
<Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="md" />
<Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="lg" />`}
      >
        <div className="space-y-6">
          <DemoCard label="Small"><Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} size="sm" /></DemoCard>
          <DemoCard label="Medium"><Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} size="md" /></DemoCard>
          <DemoCard label="Large"><Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} size="lg" /></DemoCard>
        </div>
      </Section>

      <Section
        title="With Page Size Selector & Item Info"
        description="Full enterprise table pagination with rows-per-page, item range, and page info."
        code={`const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(20);
const totalItems = 487;
const totalPages = Math.ceil(totalItems / pageSize);

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  showPageSize
  pageSizeOptions={[10, 20, 50, 100]}
  pageSize={pageSize}
  onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
  showItemsInfo
  totalItems={totalItems}
  showPageInfo
  showFirstLast
/>`}
      >
        <Pagination
          currentPage={page3}
          totalPages={totalPages3}
          onPageChange={setPage3}
          showPageSize
          pageSizeOptions={[10, 20, 50, 100]}
          pageSize={pageSize3}
          onPageSizeChange={(size) => { setPageSize3(size); setPage3(1); }}
          showItemsInfo
          totalItems={totalItems3}
          showPageInfo
          showFirstLast
        />
      </Section>

      <Section
        title="First / Last Jump Buttons"
        description="Quick navigation to the first and last page for large datasets."
        code={`<Pagination
  currentPage={page}
  totalPages={50}
  onPageChange={setPage}
  showFirstLast
  siblingCount={2}
/>`}
      >
        <Pagination
          currentPage={page4}
          totalPages={50}
          onPageChange={setPage4}
          showFirstLast
          siblingCount={2}
        />
      </Section>

      <Section
        title="States"
        description="Disabled state and various page counts."
        code={`// Disabled
<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} disabled />

// Few pages (no dots)
<Pagination currentPage={page} totalPages={5} onPageChange={setPage} />

// Many pages
<Pagination currentPage={page} totalPages={100} onPageChange={setPage} showFirstLast />`}
      >
        <div className="space-y-6">
          <DemoCard label="Disabled"><Pagination currentPage={3} totalPages={10} onPageChange={() => {}} disabled /></DemoCard>
          <DemoCard label="Few Pages (no ellipsis)"><Pagination currentPage={page5} totalPages={5} onPageChange={setPage5} /></DemoCard>
          <DemoCard label="Many Pages"><Pagination currentPage={page6} totalPages={100} onPageChange={setPage6} showFirstLast /></DemoCard>
        </div>
      </Section>

      <Section
        title="Custom Labels"
        description="Replace arrow icons with text labels for accessibility."
        code={`<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  prevLabel="← Previous"
  nextLabel="Next →"
  showPageInfo
/>`}
      >
        <Pagination
          currentPage={page1}
          totalPages={20}
          onPageChange={setPage1}
          prevLabel={<span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>← Prev</span>}
          nextLabel={<span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>Next →</span>}
          showPageInfo
        />
      </Section>
    </div>
  );
}

// ─── Date Picker Showcase ────────────────────────────────────────────────────

function DatePickerShowcase() {
  const { t } = useI18n();
  const [date1, setDate1] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [date3, setDate3] = useState<Date | null>(new Date());
  const [date4, setDate4] = useState<Date | null>(null);
  const [date5, setDate5] = useState<Date | null>(null);
  const [range1, setRange1] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [date6, setDate6] = useState<Date | null>(null);
  const [date7, setDate7] = useState<Date | null>(null);

  const disabledDates = [
    new Date(2026, 2, 10),
    new Date(2026, 2, 15),
    new Date(2026, 2, 20),
  ];

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.datepicker.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.datepicker.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.datepicker.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants consistent with other form components."
        code={`import { DatePicker } from "./components/ds-datepicker";

<DatePicker variant="default" label="Default" placeholder="Pick a date…" />
<DatePicker variant="outlined" label="Outlined" placeholder="Pick a date…" />
<DatePicker variant="filled" label="Filled" placeholder="Pick a date…" />
<DatePicker variant="ghost" label="Ghost" placeholder="Pick a date…" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DatePicker variant="default" label="Default" value={date1} onChange={setDate1} clearable /></DemoCard>
          <DemoCard label="Outlined"><DatePicker variant="outlined" label="Outlined" value={date1} onChange={setDate1} clearable /></DemoCard>
          <DemoCard label="Filled"><DatePicker variant="filled" label="Filled" value={date1} onChange={setDate1} clearable /></DemoCard>
          <DemoCard label="Ghost"><DatePicker variant="ghost" label="Ghost" value={date1} onChange={setDate1} clearable /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes to match different form densities."
        code={`<DatePicker size="sm" label="Small" />
<DatePicker size="md" label="Medium" />
<DatePicker size="lg" label="Large" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DemoCard label="Small"><DatePicker size="sm" label="Small" value={date2} onChange={setDate2} clearable /></DemoCard>
          <DemoCard label="Medium"><DatePicker size="md" label="Medium" value={date2} onChange={setDate2} clearable /></DemoCard>
          <DemoCard label="Large"><DatePicker size="lg" label="Large" value={date2} onChange={setDate2} clearable /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Validation states with error and success messages."
        code={`<DatePicker label="Due Date" state="error" errorMessage="Due date is required" required />
<DatePicker label="Start Date" state="success" successMessage="Date confirmed" value={today} />
<DatePicker label="Archive Date" disabled value={today} helperText="Locked" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DatePicker label="Due Date" value={date4} onChange={setDate4} clearable helperText="Select a due date" /></DemoCard>
          <DemoCard label="Error"><DatePicker label="Due Date" state="error" errorMessage="Due date is required" required value={null} onChange={() => {}} /></DemoCard>
          <DemoCard label="Success"><DatePicker label="Start Date" state="success" successMessage="Date confirmed" value={date3} onChange={setDate3} /></DemoCard>
          <DemoCard label="Disabled"><DatePicker label="Archive Date" disabled value={date3} helperText="This field is locked" /></DemoCard>
        </div>
      </Section>

      <Section
        title="With Time Picker"
        description="Enable time selection for datetime fields."
        code={`<DatePicker
  label="Event Start"
  showTime
  clearable
  value={date}
  onChange={setDate}
  helperText="Select date and time"
/>`}
      >
        <div className="max-w-sm">
          <DatePicker
            label="Event Start"
            showTime
            clearable
            value={date5}
            onChange={setDate5}
            helperText="Select date and time"
          />
        </div>
      </Section>

      <Section
        title="Date Range"
        description="Select a start and end date for range-based filters and reports."
        code={`const [range, setRange] = useState({ start: null, end: null });

<DatePicker
  mode="range"
  label="Report Period"
  clearable
  rangeValue={range}
  onRangeChange={setRange}
/>`}
      >
        <div className="max-w-md">
          <DatePicker
            mode="range"
            label="Report Period"
            clearable
            rangeValue={range1}
            onRangeChange={setRange1}
            helperText="Click to select start, then end date"
          />
        </div>
      </Section>

      <Section
        title="Min / Max & Disabled Dates"
        description="Restrict selectable dates with min/max boundaries and specific disabled dates."
        code={`const disabledDates = [new Date(2026, 2, 10), new Date(2026, 2, 15)];

<DatePicker
  label="Appointment"
  minDate={new Date()}
  maxDate={new Date(2026, 11, 31)}
  disabledDates={disabledDates}
  clearable
/>`}
      >
        <div className="max-w-sm">
          <DatePicker
            label="Appointment"
            minDate={new Date()}
            maxDate={new Date(2026, 11, 31)}
            disabledDates={disabledDates}
            clearable
            value={date6}
            onChange={setDate6}
            helperText="Mar 10, 15, 20 are disabled. Past dates unavailable."
          />
        </div>
      </Section>

      <Section
        title="Custom Footer"
        description="Inject custom footer actions like quick presets."
        code={`<DatePicker
  label="Due Date"
  clearable
  footer={
    <div className="flex gap-2">
      <button onClick={() => setDate(addDays(7))}>+7 days</button>
      <button onClick={() => setDate(addDays(30))}>+30 days</button>
    </div>
  }
/>`}
      >
        <div className="max-w-sm">
          <DatePicker
            label="Due Date"
            clearable
            value={date7}
            onChange={setDate7}
            footer={
              <div className="flex gap-2">
                <button
                  onClick={() => { const d = new Date(); d.setDate(d.getDate() + 7); setDate7(d); }}
                  className="px-2 py-1 rounded-[var(--radius-sm)] bg-accent text-accent-foreground hover:bg-accent/80 transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
                >
                  +7 days
                </button>
                <button
                  onClick={() => { const d = new Date(); d.setDate(d.getDate() + 30); setDate7(d); }}
                  className="px-2 py-1 rounded-[var(--radius-sm)] bg-accent text-accent-foreground hover:bg-accent/80 transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
                >
                  +30 days
                </button>
              </div>
            }
          />
        </div>
      </Section>
    </div>
  );
}

// ─── Changelog Page ───────────────────────────────────────────────────────────

const changelogTagStyles: Record<ChangelogTag, { bg: string; text: string; label: string }> = {
  new: { bg: "bg-chart-2/15", text: "text-chart-2", label: "New" },
  improved: { bg: "bg-primary/15", text: "text-primary", label: "Improved" },
  fixed: { bg: "bg-chart-5/15", text: "text-chart-5", label: "Fixed" },
  breaking: { bg: "bg-destructive/15", text: "text-destructive", label: "Breaking" },
};

function ChangelogPage() {
  const { t } = useI18n();
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

  const tagBtnStyle: React.CSSProperties = {
    fontFamily: "var(--font-button)",
    fontSize: "var(--text-button)",
    fontWeight: "var(--weight-button)",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-label)",
    fontWeight: "var(--weight-label)",
  };

  const smallLabelStyle: React.CSSProperties = {
    fontFamily: "var(--font-label)",
    fontSize: "calc(var(--text-label) * 0.85)",
    fontWeight: "var(--weight-label)",
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
            <h1 className="text-foreground">{t("page.changelog.title")}</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl" style={labelStyle}>
              {t("page.changelog.desc")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              style={tagBtnStyle}
            >
              {t("changelog.expandAll")}
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              style={tagBtnStyle}
            >
              {t("changelog.collapseAll")}
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
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
                <div className="sm:ml-12 rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden shadow-elevation-sm">
                  {/* Header */}
                  <button
                    onClick={() => toggleVersion(release.version)}
                    className="w-full px-6 py-5 flex items-start gap-4 cursor-pointer hover:bg-muted/30 transition-colors text-left"
                  >
                    {/* Version badge */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`px-3 py-1.5 rounded-[var(--radius)] ${
                          isLatest ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                        style={tagBtnStyle}
                      >
                        v{release.version}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span className="text-foreground" style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-h4)", fontWeight: "var(--weight-h4)" }}>
                          {isLatest ? "Latest Release" : release.version === "1.0.0" ? "Initial Release" : `Version ${release.version}`}
                        </span>
                        {isLatest && (
                          <span
                            className="px-2 py-0.5 rounded-[var(--radius-sm)] bg-chart-2/15 text-chart-2"
                            style={{ ...tagBtnStyle, fontSize: "calc(var(--text-button) * 0.78)", lineHeight: "1" }}
                          >
                            Latest
                          </span>
                        )}
                        {release.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-[var(--radius-sm)] ${changelogTagStyles[tag].bg} ${changelogTagStyles[tag].text}`}
                            style={{ ...tagBtnStyle, fontSize: "calc(var(--text-button) * 0.78)", lineHeight: "1" }}
                          >
                            {changelogTagStyles[tag].label}
                          </span>
                        ))}
                      </div>
                      <span className="text-muted-foreground block" style={smallLabelStyle}>
                        {release.date} &middot; {release.features.length} {release.features.length === 1 ? "change" : "changes"}
                      </span>
                      <span className="text-muted-foreground block mt-1" style={labelStyle}>
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
                              <span className="text-muted-foreground block mt-0.5" style={smallLabelStyle}>
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
        <span className="text-muted-foreground" style={labelStyle}>
          {changelogVersions.length} releases &middot; Started at v1.0.0 on {changelogVersions[changelogVersions.length - 1].date} &middot; Latest v{latestChangelog.version}
        </span>
      </div>
    </div>
  );
}

// ─── Text Editor Showcase ─────────────────────────────────────────────────────

function EditorShowcase() {
  const { t } = useI18n();
  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.editor.title")}</span>
        </div>
        <h1 className="text-foreground">{t("page.editor.title")}</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          {t("page.editor.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants for different form contexts."
        code={`import { TextEditor } from "./components/text-editor";

<TextEditor variant="default" label="Description" placeholder="Default…" />
<TextEditor variant="outlined" label="Description" placeholder="Outlined…" />
<TextEditor variant="filled" label="Description" placeholder="Filled…" />
<TextEditor variant="minimal" label="Description" placeholder="Minimal…" />`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Default"><TextEditor variant="default" label="Description" placeholder="Default variant editor…" helperText="Standard bordered editor" /></DemoCard>
          <DemoCard label="Outlined"><TextEditor variant="outlined" label="Description" placeholder="Outlined variant editor…" helperText="Thicker border for emphasis" /></DemoCard>
          <DemoCard label="Filled"><TextEditor variant="filled" label="Description" placeholder="Filled variant editor…" helperText="Filled background style" /></DemoCard>
          <DemoCard label="Minimal"><TextEditor variant="minimal" label="Description" placeholder="Minimal variant editor…" helperText="Bottom border only" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for compact to spacious editing."
        code={`<TextEditor size="sm" label="Note" placeholder="Compact…" minHeight={80} />
<TextEditor size="md" label="Content" placeholder="Standard…" />
<TextEditor size="lg" label="Article" placeholder="Spacious…" minHeight={160} />`}
      >
        <div className="space-y-6">
          <DemoCard label="Small"><TextEditor size="sm" label="Note" placeholder="Compact editor…" minHeight={80} /></DemoCard>
          <DemoCard label="Medium"><TextEditor size="md" label="Content" placeholder="Standard editor…" /></DemoCard>
          <DemoCard label="Large"><TextEditor size="lg" label="Article" placeholder="Spacious editor…" minHeight={160} /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Visual feedback for all validation states."
        code={`// Error
<TextEditor label="Description" state="error" errorMessage="Required" required />

// Success
<TextEditor label="Description" state="success" successMessage="Content is valid" />

// Warning
<TextEditor label="Description" state="warning" helperText="May contain issues" />`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Default"><TextEditor label="Description" placeholder="Type your description…" helperText="Provide a brief description" /></DemoCard>
          <DemoCard label="Error"><TextEditor label="Description" state="error" errorMessage="Description is required" required placeholder="This field has an error…" /></DemoCard>
          <DemoCard label="Success"><TextEditor label="Description" state="success" successMessage="Content meets all requirements" defaultValue="<p>Valid description that meets the minimum character requirement.</p>" /></DemoCard>
          <DemoCard label="Warning"><TextEditor label="Description" state="warning" helperText="Content may contain formatting issues" placeholder="Warning state…" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Disabled & Read-Only"
        description="Non-interactive states for locked content."
        code={`<TextEditor label="Locked" disabled defaultValue="<p>This editor is <strong>disabled</strong>.</p>" />

<TextEditor
  label="Published"
  readOnly
  defaultValue="<p>This content is <strong>read-only</strong>.</p>"
/>`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoCard label="Disabled"><TextEditor label="Locked" disabled defaultValue="<p>This editor is <strong>disabled</strong>.</p>" helperText="This field is locked" /></DemoCard>
          <DemoCard label="Read-Only"><TextEditor label="Published" readOnly defaultValue="<p>This content is <strong>read-only</strong>.</p><ul><li>Text selection works</li><li>Copy to clipboard works</li></ul>" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Character Limit"
        description="Enforce maximum content length with visual counter."
        code={`<TextEditor
  label="Bio"
  placeholder="Write a short bio…"
  maxLength={280}
  showCharCount
  showWordCount
  required
/>`}
      >
        <div className="max-w-2xl"><TextEditor label="Bio" placeholder="Write a short bio…" maxLength={280} showCharCount showWordCount helperText="Max 280 characters" required /></div>
      </Section>

      <Section
        title="Full-featured Editor"
        description="All features enabled."
        code={`<TextEditor
  label="Article Content"
  placeholder="Write your article here…"
  size="lg"
  minHeight={200}
  maxLength={5000}
  showCharCount
  showWordCount
  fullscreenEnabled
  required
  helperText="Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline"
/>`}
      >
        <div className="max-w-3xl">
          <TextEditor label="Article Content" placeholder="Write your article here…" size="lg" minHeight={200} maxLength={5000} showCharCount showWordCount fullscreenEnabled required helperText="Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline" />
        </div>
      </Section>
    </div>
  );
}
