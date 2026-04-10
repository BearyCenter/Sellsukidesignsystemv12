import { useState, useRef, useCallback } from "react";
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
  Clock,
  Layers,
  ArrowLeft,
} from "lucide-react";
import SSKIcon from "../imports/Icon";
import SellsukiIcon from "../imports/SellsukiIcon";
import SellsukiFull from "../imports/SellsukiFull";
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
import { ChartShowcase } from "./pages/chart-showcase";
import { DateRangePickerShowcase } from "./pages/daterangepicker-showcase";
import { TimePickerShowcase } from "./pages/timepicker-showcase";
import { ChoiceCardShowcase } from "./pages/choicecard-showcase";
import { RepeatableFieldShowcase } from "./pages/repeatablefield-showcase";
import { RichTextEditorShowcase } from "./pages/richtexteditor-showcase";
import { ImageGalleryShowcase } from "./pages/imagegallery-showcase";
import { AppShellShowcase } from "./pages/appshell-showcase";
import { Ds21RoadmapPage } from "./pages/ds21-roadmap";
import { EntryPage, type DsMode } from "./pages/entry-page";

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
  | "advancedtable"
  | "chart"
  | "daterangepicker"
  | "timepicker"
  | "choicecard"
  | "repeatablefield"
  | "richtexteditor"
  | "imagegallery"
  | "appshell"
  | "ds21-roadmap";

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
        { id: "daterangepicker", label: "Date Range Picker", icon: <CalendarDays size={16} />, badge: "New" },
        { id: "timepicker", label: "Time Picker", icon: <Clock size={16} />, badge: "New" },
        { id: "choicecard", label: "Choice Card", icon: <LayoutGrid size={16} />, badge: "New" },
        { id: "repeatablefield", label: "Repeatable Field", icon: <ListOrdered size={16} />, badge: "New" },
        { id: "richtexteditor", label: "Rich Text Editor", icon: <PenTool size={16} />, badge: "New" },
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
        { id: "chart", label: "Charts", icon: <BarChart3 size={16} />, badge: "New" },
        { id: "imagegallery", label: "Image Gallery", icon: <Image size={16} />, badge: "New" },
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
    {
      label: "Shell",
      items: [
        { id: "appshell", label: "AppShell", icon: <Layers size={16} />, badge: "New" },
      ],
    },
  ];
}

function buildSidebarGroups21(t: (key: string) => string): SidebarGroup[] {
  const base = buildSidebarGroups(t);
  // Inject DS 2.1 Roadmap page at top of foundation group
  return [
    {
      label: "DS 2.1",
      items: [
        { id: "ds21-roadmap", label: "Upgrade Roadmap", icon: <Layers size={16} />, badge: "Plan" },
      ],
    },
    ...base,
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
  chart: ChartShowcase,
  daterangepicker: DateRangePickerShowcase,
  timepicker: TimePickerShowcase,
  choicecard: ChoiceCardShowcase,
  repeatablefield: RepeatableFieldShowcase,
  richtexteditor: RichTextEditorShowcase,
  imagegallery: ImageGalleryShowcase,
  appshell: AppShellShowcase,
  "ds21-roadmap": Ds21RoadmapPage,
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [dsMode, setDsMode] = useState<DsMode | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ssk-ds-mode");
      if (saved === "2.0" || saved === "2.1") return saved;
    }
    return null;
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ssk-dark-mode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const handleSelectMode = (mode: DsMode) => {
    localStorage.setItem("ssk-ds-mode", mode);
    setDsMode(mode);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("ssk-dark-mode", String(next));
      return next;
    });
  };

  if (!dsMode) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <EntryPage
          onSelectMode={handleSelectMode}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    );
  }

  return (
    <I18nProvider>
      <AppInner
        dsMode={dsMode}
        onExitMode={() => {
          localStorage.removeItem("ssk-ds-mode");
          setDsMode(null);
        }}
        externalDarkMode={darkMode}
        externalToggleDarkMode={toggleDarkMode}
      />
    </I18nProvider>
  );
}

interface AppInnerProps {
  dsMode: DsMode;
  onExitMode: () => void;
  externalDarkMode: boolean;
  externalToggleDarkMode: () => void;
}

function AppInner({ dsMode, onExitMode, externalDarkMode, externalToggleDarkMode }: AppInnerProps) {
  const { t, lang, toggleLang } = useI18n();
  const defaultPage: PageId = dsMode === "2.1" ? "ds21-roadmap" : "getting-started";
  const [activePage, setActivePage] = useState<PageId>(defaultPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const isResizing = useRef(false);
  const darkMode = externalDarkMode;
  const toggleDarkMode = externalToggleDarkMode;

  const startResize = useCallback((e: React.MouseEvent) => {
    if (sidebarCollapsed) return;
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      const newW = Math.min(320, Math.max(200, ev.clientX));
      setSidebarWidth(newW);
    };
    const onMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [sidebarCollapsed]);
  const sidebarGroups = dsMode === "2.1" ? buildSidebarGroups21(t) : buildSidebarGroups(t);

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
    <div className={`h-screen overflow-hidden bg-background flex ${darkMode ? "dark" : ""}`}>
      {/* ─── Mobile overlay ──────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─────────────────────────────────── */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col flex-shrink-0 transition-all duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 lg:z-30`}
        style={{ width: sidebarCollapsed ? "64px" : `${sidebarWidth}px`, borderRight: "1px solid var(--sidebar-border)" }}
      >
        {/* Logo */}
        <div className={`${sidebarCollapsed ? "px-2" : "px-4"} border-b border-sidebar-border flex items-center`} style={{ height: "56px" }}>
          <div className="flex items-center justify-between w-full">
            <div className={`flex items-center ${sidebarCollapsed ? "justify-center w-full" : "gap-2.5"}`}>
              {sidebarCollapsed ? (
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <SellsukiIcon size={40} />
                </div>
              ) : (
                <div className="flex items-center gap-1.5" style={{ height: "40px" }}>
                  <SellsukiFull height={40} />
                  <span
                    className="px-1.5 rounded-[var(--radius-sm)] flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-button)", fontSize: "18px", fontWeight: 700, lineHeight: "20px",
                      background: dsMode === "2.1" ? "rgba(236, 94, 42, 0.13)" : "rgba(50, 169, 255, 0.13)",
                      color: dsMode === "2.1" ? "#EC5E2A" : "var(--primary)",
                    }}
                  >
                    {dsMode}
                  </span>
                </div>
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
                  style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
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
                      style={{ fontFamily: "var(--font-p)", fontSize: "var(--text-p)", fontWeight: isActive ? "var(--weight-button)" : "var(--weight-p)" }}
                    >
                      <span className={`flex-shrink-0 ${isActive ? "text-sidebar-primary" : "text-muted-foreground"}`}>
                        {item.icon}
                      </span>
                      {!sidebarCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className="ml-auto px-1.5 py-0.5 rounded-[var(--radius-sm)]"
                          style={{
                            fontFamily: "var(--font-button)", fontSize: "var(--text-badge)", fontWeight: "var(--weight-button)", lineHeight: "1",
                            background: "rgba(50, 169, 255, 0.13)",
                            color: "var(--primary)",
                          }}
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
          {/* Back to entry selector */}
          {!sidebarCollapsed && (
            <button
              onClick={onExitMode}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-md)] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer mb-2"
              style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}
              title="กลับไปเลือก version"
            >
              <ArrowLeft size={14} className="flex-shrink-0" />
              <span className="truncate">เปลี่ยน version</span>
              <span
                className="ml-auto px-1.5 py-0.5 rounded-[var(--radius-sm)] flex-shrink-0"
                style={{
                  fontFamily: "var(--font-button)", fontSize: "var(--text-badge)", fontWeight: 700, lineHeight: 1,
                  background: dsMode === "2.1" ? "rgba(236,94,42,0.13)" : "rgba(50,169,255,0.13)",
                  color: dsMode === "2.1" ? "#EC5E2A" : "var(--primary)",
                }}
              >
                {dsMode}
              </span>
            </button>
          )}
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
                <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-button)" }}>
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

        {/* ── Resize handle — drag right edge to resize (min 200 / max 320) ── */}
        {!sidebarCollapsed && (
          <div
            onMouseDown={startResize}
            className="hidden lg:flex absolute top-0 right-0 h-full items-center justify-center group"
            style={{ width: "8px", cursor: "col-resize", zIndex: 40 }}
            title="Drag to resize sidebar"
          >
            <div
              className="h-12 rounded-full transition-all duration-150 group-hover:opacity-100 opacity-0"
              style={{ width: "3px", background: "var(--primary)", borderRadius: "99px" }}
            />
          </div>
        )}
      </aside>

      {/* ─── Main Content ────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden app-content-area">
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
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <SellsukiIcon size={40} />
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

        <main key={activePage} className="flex-1 overflow-y-auto max-w-[1440px] mx-auto w-full px-6 py-8 page-enter">
          <ActivePageComponent />
        </main>
      </div>
    </div>
  );
}