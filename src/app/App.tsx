import { useState } from "react";
import { Tooltip } from "../lib/components/ds-tooltip";
import {
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  History,
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
  Tags,
  UserCircle,
  MessageSquare,
  Loader2,
  BarChart3,
  ChevronsUpDown,
  CreditCard,
  PanelLeftClose,
  PanelLeftOpen,
  GripVertical,
  SeparatorHorizontal,
  Navigation,
  Eye,
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
  SquareMousePointer,
  Type,
  PenTool,
  CalendarDays,
  ListOrdered,
  MousePointerClick,
  LayoutGrid,
  Tag,
  Star,
  Server,
  Activity,
} from "lucide-react";
import SSKIcon from "../imports/Icon";
import { I18nProvider, useI18n } from "./i18n";
import { HeaderSearch, type SearchableItem } from "./components/header-search";

// ─── Page Imports ─────────────────────────────────────────────────────────────

import { GettingStartedPage } from "./pages/getting-started";
import { DesignTokensPage } from "./pages/design-tokens";
import { ChangelogPage, latestChangelog } from "./pages/changelog";
import { ComponentPreviewPage } from "./pages/component-preview";

import { DropdownShowcase } from "./pages/dropdown-showcase";
import { ActionShowcase } from "./pages/action-showcase";
import { ButtonShowcase } from "./pages/button-showcase";
import { InputShowcase } from "./pages/input-showcase";
import { PaginationShowcase } from "./pages/pagination-showcase";
import { DatePickerShowcase } from "./pages/datepicker-showcase";
import { EditorShowcase } from "./pages/editor-showcase";

import { TabShowcase } from "./pages/tab-showcase";
import { TableShowcase } from "./pages/table-showcase";
import { ModalShowcase } from "./pages/modal-showcase";
import { BadgeShowcase } from "./pages/badge-showcase";
import { AlertShowcase } from "./pages/alert-showcase";
import { SearchShowcase } from "./pages/search-showcase";
import { CheckboxShowcase } from "./pages/checkbox-showcase";
import { RadioShowcase } from "./pages/radio-showcase";
import { InputTagShowcase } from "./pages/inputtag-showcase";
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
import { FileUploadShowcase } from "./pages/fileupload-showcase";
import { SkeletonShowcase } from "./pages/skeleton-showcase";
import { EmptyStateShowcase } from "./pages/emptystate-showcase";
import { BreadcrumbShowcase } from "./pages/breadcrumb-showcase";
import { SwitchShowcase } from "./pages/switch-showcase";
import { PopoverShowcase } from "./pages/popover-showcase";
import { TimelineShowcase } from "./pages/timeline-showcase";
import { NotificationShowcase } from "./pages/notification-showcase";
import { StatisticShowcase } from "./pages/statistic-showcase";
import { TreeShowcase } from "./pages/tree-showcase";
import { TransferListShowcase } from "./pages/transferlist-showcase";
import { RatingShowcase } from "./pages/rating-showcase";
import { ColorPickerShowcase } from "./pages/colorpicker-showcase";
import { ImagePreviewShowcase } from "./pages/imagepreview-showcase";
import { MCPServerShowcase } from "./pages/mcp-server-showcase";
import { VibeCodeDemo } from "./pages/vibecode-demo";
import { MCPTrackerPage } from "./pages/mcp-tracker";
import { SidebarAccountShowcase } from "./pages/sidebar-account-showcase";
import { NumberInputShowcase } from "./pages/numberinput-showcase";
import { OTPInputShowcase } from "./pages/otpinput-showcase";
import { PageHeaderShowcase } from "./pages/pageheader-showcase";
import { FilterBarShowcase } from "./pages/filterbar-showcase";
import { FormShowcase } from "./pages/form-showcase";
import { AdvancedTableShowcase } from "./pages/advanced-table-showcase";

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
  | "topnavbar"
  | "preview"
  | "fileupload"
  | "skeleton"
  | "emptystate"
  | "breadcrumb"
  | "switch"
  | "popover"
  | "timeline"
  | "notification"
  | "statistic"
  | "tree"
  | "transferlist"
  | "rating"
  | "colorpicker"
  | "imagepreview"
  | "mcpserver"
  | "vibecode"
  | "mcp-tracker"
  | "sidebar-account"
  | "numberinput"
  | "otpinput"
  | "pageheader"
  | "filterbar"
  | "form"
  | "advancedtable";

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
        { id: "preview", label: t("sidebar.preview"), icon: <Eye size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.foundation"),
      items: [
        { id: "tokens", label: t("sidebar.tokens"), icon: <SwatchBook size={16} /> },
        { id: "changelog", label: t("sidebar.changelog"), icon: <History size={16} />, badge: `v${latestChangelog.version}` },
        { id: "mcpserver", label: t("sidebar.mcpserver"), icon: <Server size={16} />, badge: "New" },
        { id: "vibecode", label: "Vibe Code Demo", icon: <MousePointerClick size={16} />, badge: "Demo" },
        { id: "mcp-tracker", label: "MCP Tracker", icon: <Activity size={16} />, badge: "Live" },
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
        { id: "switch", label: t("sidebar.switch"), icon: <Power size={16} /> },
        { id: "dropdown", label: t("sidebar.dropdown"), icon: <ChevronDown size={16} /> },
        { id: "datepicker", label: t("sidebar.datepicker"), icon: <CalendarDays size={16} /> },
        { id: "fileupload", label: t("sidebar.fileupload"), icon: <UploadIcon size={16} /> },
        { id: "rating", label: t("sidebar.rating"), icon: <Star size={16} /> },
        { id: "colorpicker", label: t("sidebar.colorpicker"), icon: <Palette size={16} /> },
        { id: "numberinput", label: t("sidebar.numberinput"), icon: <ChevronsUpDown size={16} /> },
        { id: "otpinput", label: t("sidebar.otpinput"), icon: <SquareMousePointer size={16} /> },
        { id: "form", label: t("sidebar.form"), icon: <Type size={16} /> },
        { id: "filterbar", label: t("sidebar.filterbar"), icon: <SearchIcon size={16} /> },
        { id: "editor", label: t("sidebar.editor"), icon: <PenTool size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.data"),
      items: [
        { id: "table", label: t("sidebar.table"), icon: <Table2 size={16} /> },
        { id: "advancedtable", label: t("sidebar.advancedtable"), icon: <LayoutGrid size={16} />, badge: "New" },
        { id: "badge", label: t("sidebar.badge"), icon: <BadgeCheck size={16} /> },
        { id: "tag", label: t("sidebar.tag"), icon: <Tag size={16} /> },
        { id: "avatar", label: t("sidebar.avatar"), icon: <UserCircle size={16} /> },
        { id: "pagination", label: t("sidebar.pagination"), icon: <ListOrdered size={16} /> },
        { id: "statistic", label: t("sidebar.statistic"), icon: <TrendingUp size={16} /> },
        { id: "skeleton", label: t("sidebar.skeleton"), icon: <Bone size={16} /> },
        { id: "emptystate", label: t("sidebar.emptystate"), icon: <Inbox size={16} /> },
        { id: "timeline", label: t("sidebar.timeline"), icon: <GitPullRequest size={16} /> },
        { id: "imagepreview", label: t("sidebar.imagepreview"), icon: <Image size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.feedback"),
      items: [
        { id: "modal", label: t("sidebar.modal"), icon: <LayoutGrid size={16} /> },
        { id: "alert", label: t("sidebar.alert"), icon: <BellRing size={16} /> },
        { id: "notification", label: t("sidebar.notification"), icon: <BellDot size={16} /> },
        { id: "tooltip", label: t("sidebar.tooltip"), icon: <MessageSquare size={16} /> },
        { id: "popover", label: t("sidebar.popover"), icon: <Pointer size={16} /> },
        { id: "spinner", label: t("sidebar.spinner"), icon: <Loader2 size={16} /> },
        { id: "progressbar", label: t("sidebar.progressbar"), icon: <BarChart3 size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.navigation"),
      items: [
        { id: "tabs", label: t("sidebar.tabs"), icon: <PanelTop size={16} /> },
        { id: "breadcrumb", label: t("sidebar.breadcrumb"), icon: <ChevronRight size={16} /> },
        { id: "action", label: t("sidebar.action"), icon: <MousePointerClick size={16} /> },
        { id: "menu", label: t("sidebar.menu"), icon: <GripVertical size={16} /> },
        { id: "sidebarcomp", label: t("sidebar.sidebarcomp"), icon: <PanelLeftClose size={16} /> },
        { id: "sidebar-account", label: t("sidebar.sidebar-account"), icon: <PanelLeftOpen size={16} /> },
        { id: "topnavbar", label: t("sidebar.topnavbar"), icon: <Navigation size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.layout"),
      items: [
        { id: "card", label: t("sidebar.card"), icon: <CreditCard size={16} /> },
        { id: "pageheader", label: t("sidebar.pageheader"), icon: <PanelTop size={16} /> },
        { id: "accordion", label: t("sidebar.accordion"), icon: <ChevronsUpDown size={16} /> },
        { id: "drawer", label: t("sidebar.drawer"), icon: <PanelLeftClose size={16} /> },
        { id: "divider", label: t("sidebar.divider"), icon: <SeparatorHorizontal size={16} /> },
        { id: "stepper", label: t("sidebar.stepper"), icon: <ListOrdered size={16} /> },
      ],
    },
    {
      label: t("sidebar.group.advanced"),
      items: [
        { id: "tree", label: t("sidebar.tree"), icon: <FolderTree size={16} /> },
        { id: "transferlist", label: t("sidebar.transferlist"), icon: <ArrowRightLeft size={16} /> },
      ],
    },
  ];
}

// ─── Page Map ─────────────────────────────────────────────────────────────────

const PAGE_MAP: Record<PageId, React.ComponentType> = {
  "getting-started": GettingStartedPage,
  tokens: DesignTokensPage,
  changelog: ChangelogPage,
  preview: ComponentPreviewPage,
  dropdown: DropdownShowcase,
  action: ActionShowcase,
  button: ButtonShowcase,
  input: InputShowcase,
  pagination: PaginationShowcase,
  datepicker: DatePickerShowcase,
  editor: EditorShowcase,
  tabs: TabShowcase,
  table: TableShowcase,
  modal: ModalShowcase,
  badge: BadgeShowcase,
  alert: AlertShowcase,
  search: SearchShowcase,
  checkbox: CheckboxShowcase,
  radio: RadioShowcase,
  inputtag: InputTagShowcase,
  tag: TagShowcase,
  avatar: AvatarShowcase,
  tooltip: TooltipShowcase,
  spinner: SpinnerShowcase,
  progressbar: ProgressBarShowcase,
  accordion: AccordionShowcase,
  card: CardShowcase,
  drawer: DrawerShowcase,
  divider: DividerShowcase,
  stepper: StepperShowcase,
  menu: MenuShowcase,
  sidebarcomp: SidebarShowcase,
  topnavbar: TopNavbarShowcase,
  fileupload: FileUploadShowcase,
  skeleton: SkeletonShowcase,
  emptystate: EmptyStateShowcase,
  breadcrumb: BreadcrumbShowcase,
  switch: SwitchShowcase,
  popover: PopoverShowcase,
  timeline: TimelineShowcase,
  notification: NotificationShowcase,
  statistic: StatisticShowcase,
  tree: TreeShowcase,
  transferlist: TransferListShowcase,
  rating: RatingShowcase,
  colorpicker: ColorPickerShowcase,
  imagepreview: ImagePreviewShowcase,
  mcpserver: MCPServerShowcase,
  vibecode: VibeCodeDemo,
  "mcp-tracker": MCPTrackerPage,
  "sidebar-account": SidebarAccountShowcase,
  numberinput: NumberInputShowcase,
  otpinput: OTPInputShowcase,
  pageheader: PageHeaderShowcase,
  filterbar: FilterBarShowcase,
  form: FormShowcase,
  advancedtable: AdvancedTableShowcase,
};

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  // Build searchable items from sidebar groups
  const searchItems: SearchableItem[] = sidebarGroups.flatMap((group) =>
    group.items.map((item) => ({
      id: item.id,
      label: item.label,
      group: group.label,
      icon: item.icon,
    })),
  );

  const handleSearchSelect = (id: string) => {
    setActivePage(id as PageId);
    setSidebarOpen(false);
  };

  // Resolve active page info for header breadcrumb
  const activeGroup = sidebarGroups.find((g) => g.items.some((i) => i.id === activePage));
  const activeItem = activeGroup?.items.find((i) => i.id === activePage);

  // Resolve the active page component
  const ActivePageComponent = PAGE_MAP[activePage];

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
        className={`fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col transition-all duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:sticky lg:top-0 lg:z-30`}
        style={{ width: sidebarCollapsed ? "64px" : "256px", borderRight: "1px solid var(--sidebar-border)" }}
      >
        {/* Logo */}
        <div className={`${sidebarCollapsed ? "px-2" : "px-4"} border-b border-sidebar-border flex items-center`} style={{ height: "56px" }}>
          <div className="flex items-center justify-between w-full">
            <div className={`flex items-center ${sidebarCollapsed ? "justify-center w-full" : "gap-2.5"}`}>
              <div className="w-8 h-8 flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden">
                <SSKIcon />
              </div>
              {!sidebarCollapsed && (
                <span
                  className="text-sidebar-foreground truncate"
                  style={{ fontFamily: "var(--font-h4)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-h4)", letterSpacing: "-0.01em" }}
                >
                  Sellsuki 2.0
                </span>
              )}
            </div>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto py-3 ${sidebarCollapsed ? "px-1.5" : "px-3"}`}>
          {sidebarGroups.map((group) => (
            <div key={group.label} className="mb-4">
              {!sidebarCollapsed && (
                <span
                  className="px-2 mb-2 block text-muted-foreground"
                  style={{ fontFamily: "var(--font-label)", fontSize: "16px", fontWeight: "var(--weight-label)" }}
                >
                  {group.label}
                </span>
              )}
              {sidebarCollapsed && (
                <div className="h-px bg-sidebar-border mx-1 mb-2 mt-1" />
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activePage === item.id;
                  const btn = (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-2.5"} ${sidebarCollapsed ? "px-0 py-2" : "px-3 py-2"} rounded-[var(--radius-md)] transition-all cursor-pointer
                        ${isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }
                      `}
                      style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: isActive ? "var(--weight-button)" : "var(--weight-label)" }}
                    >
                      <span className={`flex-shrink-0 ${isActive ? "text-sidebar-primary" : "text-muted-foreground"}`}>
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className="ml-auto px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-primary text-primary-foreground"
                          style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-badge)", fontWeight: "var(--weight-button)", lineHeight: "1" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                  return sidebarCollapsed ? (
                    <div key={item.id} className="w-full flex">
                      <Tooltip content={item.label} placement="right" className="flex-1">
                        {btn}
                      </Tooltip>
                    </div>
                  ) : btn;
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer — clean, no collapse button */}
        <div className={`${sidebarCollapsed ? "px-1.5" : "px-3"} py-3 border-t border-sidebar-border`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between px-1">
              <span
                className="text-muted-foreground truncate"
                style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-badge)", fontWeight: "var(--weight-button)" }}
              >
                v{latestChangelog.version} &middot; {latestChangelog.date}
              </span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={toggleLang}
                  className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                  aria-label={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
                  title={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
                >
                  <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-badge)", fontWeight: "var(--weight-button)" }}>
                    {t("app.switchLang")}
                  </span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                  aria-label={darkMode ? t("app.lightMode") : t("app.darkMode")}
                  title={darkMode ? t("app.lightMode") : t("app.darkMode")}
                >
                  {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={toggleLang}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                title={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
              >
                <span style={{ fontFamily: "var(--font-label)", fontSize: "11px", fontWeight: "var(--weight-button)" }}>
                  {t("app.switchLang")}
                </span>
              </button>
              <button
                onClick={toggleDarkMode}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
                title={darkMode ? t("app.lightMode") : t("app.darkMode")}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Main Content ────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col app-content-area">
        {/* Desktop Top Bar — burger toggle + breadcrumb + search + actions */}
        <header className="hidden lg:flex items-center sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border" style={{ height: "56px" }}>
          <div className="px-4 flex items-center gap-3 w-full">
            {/* Burger icon — toggle sidebar collapse */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-accent transition-colors cursor-pointer flex-shrink-0"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu size={18} />
            </button>

            {/* Page title breadcrumb */}
            <div className="flex items-center gap-2 min-w-0">
              {activeItem?.icon && (
                <span className="text-primary flex-shrink-0">{activeItem.icon}</span>
              )}
              <nav className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>
                {activeGroup && (
                  <>
                    <span className="text-muted-foreground">{activeGroup.label}</span>
                    <ChevronRight size={12} className="text-muted-foreground flex-shrink-0" />
                  </>
                )}
                <span className="text-foreground font-semibold truncate">{activeItem?.label || "Getting Started"}</span>
              </nav>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search */}
            <div className="w-64">
              <HeaderSearch
                items={searchItems}
                onSelect={handleSearchSelect}
                placeholder={t("header.search.placeholder")}
                shortcutLabel={t("header.search.shortcut")}
                noResultsText={t("header.search.noResults")}
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-px h-5 bg-border mx-1" />
              <button
                onClick={toggleLang}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                aria-label={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
                title={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
              >
                <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>
                  {t("app.switchLang")}
                </span>
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <button
                onClick={toggleDarkMode}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                aria-label={darkMode ? t("app.lightMode") : t("app.darkMode")}
                title={darkMode ? t("app.lightMode") : t("app.darkMode")}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Header — full width with page title */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border shadow-elevation-sm">
          <div className="px-4 flex items-center gap-3" style={{ height: "56px" }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <Menu size={16} />
            </button>
            <div className="w-8 h-8 flex-shrink-0 rounded-[var(--radius-sm)] overflow-hidden">
              <SSKIcon />
            </div>
            {/* Page title on mobile */}
            <span
              className="text-foreground font-semibold truncate flex-1"
              style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}
            >
              {activeItem?.label || "Getting Started"}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={toggleLang}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
                aria-label={lang === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"}
              >
                <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>
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
          </div>
        </header>

        <main key={activePage} className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 page-enter">
          <ActivePageComponent />
        </main>
      </div>
    </div>
  );
}