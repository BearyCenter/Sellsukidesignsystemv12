// ── Styles (imported so Vite extracts CSS to dist/styles.css) ────────────────
import "./styles.css";

// ── Button ───────────────────────────────────────────────────────────────────
export {
  DSButton,
  DSButton as Button,
  IconButton,
  ButtonGroup,
} from "./components/ds-button";
export type { DSButtonProps, DSButtonProps as ButtonProps, IconButtonProps, ButtonSize, ButtonVariant } from "./components/ds-button";

// ── Input ────────────────────────────────────────────────────────────────────
export { DSInput, DSInput as Input, DSTextarea, DSTextarea as Textarea } from "./components/ds-input";
export type { DSInputProps, DSInputProps as InputProps, DSTextareaProps, DSTextareaProps as TextareaProps, InputSize, InputVariant, InputState } from "./components/ds-input";

// ── Alert & Toast ────────────────────────────────────────────────────────────
export { Alert, ToastContainer, toast } from "./components/ds-alert";
export type { AlertVariant } from "./components/ds-alert";

// ── Badge ────────────────────────────────────────────────────────────────────
export { Badge } from "./components/ds-badge";
export type { BadgeVariant, BadgeSize } from "./components/ds-badge";

// ── Checkbox ─────────────────────────────────────────────────────────────────
export { DSCheckbox, DSCheckbox as Checkbox, CheckboxGroup } from "./components/ds-checkbox";
export type { CheckboxSize } from "./components/ds-checkbox";

// ── Radio ────────────────────────────────────────────────────────────────────
export { DSRadio, DSRadio as Radio, RadioGroup } from "./components/ds-radio";
export type { RadioSize } from "./components/ds-radio";

// ── DatePicker ───────────────────────────────────────────────────────────────
export { DatePicker } from "./components/ds-datepicker";
export type { DatePickerProps, DatePickerSize, DatePickerVariant, DatePickerState, DatePickerMode } from "./components/ds-datepicker";

// ── Modal ────────────────────────────────────────────────────────────────────
export { Modal, ConfirmDialog } from "./components/ds-modal";
export type { ModalSize } from "./components/ds-modal";

// ── Pagination ───────────────────────────────────────────────────────────────
export { Pagination } from "./components/ds-pagination";
export type { PaginationProps, PaginationSize, PaginationVariant } from "./components/ds-pagination";

// ── Search ───────────────────────────────────────────────────────────────────
export { SearchField } from "./components/ds-search";
export type { SearchSize, SearchVariant } from "./components/ds-search";

// ── Table ────────────────────────────────────────────────────────────────────
export { DSTable, DSTable as Table } from "./components/ds-table";
export type { TableColumn, TableSize } from "./components/ds-table";

// ── Tabs ─────────────────────────────────────────────────────────────────────
export { Tabs } from "./components/ds-tabs";
export type { TabItem, TabVariant, TabSize } from "./components/ds-tabs";

// ── Accordion ────────────────────────────────────────────────────────────────
export { Accordion, AccordionItem } from "./components/ds-accordion";
export type { AccordionProps, AccordionItemProps, AccordionType } from "./components/ds-accordion";

// ── Avatar ───────────────────────────────────────────────────────────────────
export { Avatar, AvatarGroup } from "./components/ds-avatar";
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarStatus } from "./components/ds-avatar";

// ── Breadcrumb ───────────────────────────────────────────────────────────────
export { Breadcrumb } from "./components/ds-breadcrumb";
export type { BreadcrumbProps, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbSize } from "./components/ds-breadcrumb";

// ── Card ─────────────────────────────────────────────────────────────────────
export { Card, CardHeader, CardBody, CardFooter } from "./components/ds-card";
export type { CardProps, CardHeaderProps } from "./components/ds-card";

// ── ColorPicker ──────────────────────────────────────────────────────────────
export { ColorPicker } from "./components/ds-colorpicker";
export type { ColorPickerProps, ColorPickerSize } from "./components/ds-colorpicker";

// ── Divider ──────────────────────────────────────────────────────────────────
export { Divider } from "./components/ds-divider";
export type { DividerProps, DividerSpacing, DividerOrientation } from "./components/ds-divider";

// ── Drawer ───────────────────────────────────────────────────────────────────
export { Drawer } from "./components/ds-drawer";
export type { DrawerProps, DrawerSide, DrawerSize } from "./components/ds-drawer";

// ── Dropdown / Select ────────────────────────────────────────────────────────
export { Dropdown } from "./components/ds-dropdown";
export type { DropdownProps, DropdownOption, DropdownSize, DropdownVariant, DropdownState } from "./components/ds-dropdown";

// ── EmptyState ───────────────────────────────────────────────────────────────
export { EmptyState } from "./components/ds-emptystate";
export type { EmptyStateProps, EmptyStateAction, EmptyStateSize } from "./components/ds-emptystate";

// ── FileUpload ───────────────────────────────────────────────────────────────
export { FileUpload } from "./components/ds-fileupload";
export type { FileUploadProps, UploadedFile, FileUploadVariant } from "./components/ds-fileupload";

// ── ImagePreview ─────────────────────────────────────────────────────────────
export { ImagePreview } from "./components/ds-imagepreview";
export type { ImagePreviewProps, ImagePreviewItem } from "./components/ds-imagepreview";

// ── Menu ─────────────────────────────────────────────────────────────────────
export { Menu } from "./components/ds-menu";
export type { MenuProps, MenuItem } from "./components/ds-menu";

// ── Notification ─────────────────────────────────────────────────────────────
export { Notification, NotificationCenter } from "./components/ds-notification";
export type { NotificationProps, NotificationCenterProps, NotificationCenterItem, NotificationType } from "./components/ds-notification";

// ── Popover ──────────────────────────────────────────────────────────────────
export { Popover } from "./components/ds-popover";
export type { PopoverProps, PopoverPlacement } from "./components/ds-popover";

// ── ProgressBar ──────────────────────────────────────────────────────────────
export { ProgressBar } from "./components/ds-progressbar";
export type { ProgressBarProps, ProgressBarSize } from "./components/ds-progressbar";

// ── Rating ───────────────────────────────────────────────────────────────────
export { Rating } from "./components/ds-rating";
export type { RatingProps, RatingSize, RatingIcon } from "./components/ds-rating";

// ── Sidebar ──────────────────────────────────────────────────────────────────
export { Sidebar } from "./components/ds-sidebar";
export type { SidebarProps, SidebarItem, SidebarGroup, SidebarBrand } from "./components/ds-sidebar";
export { SidebarAccountSwitcher } from "./components/ds-sidebar-account";
export type { SidebarAccountSwitcherProps, SidebarAccountItem } from "./components/ds-sidebar-account";

// ── Skeleton ─────────────────────────────────────────────────────────────────
export { Skeleton, SkeletonCard, SkeletonTable, SkeletonList } from "./components/ds-skeleton";
export type { SkeletonProps, SkeletonVariant } from "./components/ds-skeleton";

// ── Spinner ──────────────────────────────────────────────────────────────────
export { Spinner } from "./components/ds-spinner";
export type { SpinnerProps, SpinnerSize } from "./components/ds-spinner";

// ── Statistic ────────────────────────────────────────────────────────────────
export { Statistic, StatCard } from "./components/ds-statistic";
export type { StatisticProps, StatCardProps, StatisticTrend, StatisticSize } from "./components/ds-statistic";

// ── Stepper ──────────────────────────────────────────────────────────────────
export { Stepper } from "./components/ds-stepper";
export type { StepperProps, StepDefinition } from "./components/ds-stepper";

// ── Switch ───────────────────────────────────────────────────────────────────
export { Switch } from "./components/ds-switch";
export type { SwitchProps, SwitchSize, SwitchColor } from "./components/ds-switch";

// ── Tag ──────────────────────────────────────────────────────────────────────
export { Tag } from "./components/ds-tag";
export type { TagProps, TagColor, TagSize } from "./components/ds-tag";

// ── TagInput ─────────────────────────────────────────────────────────────────
export { TagInput } from "./components/ds-taginput";
export type { TagInputProps, TagInputVariant } from "./components/ds-taginput";

// ── Timeline ─────────────────────────────────────────────────────────────────
export { Timeline } from "./components/ds-timeline";
export type { TimelineProps, TimelineItem, TimelineVariant, TimelineSize, TimelineItemStatus } from "./components/ds-timeline";

// ── Tooltip ──────────────────────────────────────────────────────────────────
export { Tooltip } from "./components/ds-tooltip";
export type { TooltipProps, TooltipPlacement } from "./components/ds-tooltip";

// ── TopNavbar ────────────────────────────────────────────────────────────────
export { TopNavbar } from "./components/ds-topnavbar";
export type { TopNavbarProps, TopNavbarBrand, TopNavbarUser } from "./components/ds-topnavbar";

// ── TransferList ─────────────────────────────────────────────────────────────
export { TransferList } from "./components/ds-transferlist";
export type { TransferListProps, TransferItem } from "./components/ds-transferlist";

// ── Tree ─────────────────────────────────────────────────────────────────────
export { Tree } from "./components/ds-tree";
export type { TreeProps, TreeNode } from "./components/ds-tree";

// ── FormField ───────────────────────────────────────────────────────────────
export { FormField, FormLabel, FormError, FormHelperText, FormSuccess, useFormField } from "./components/ds-form";
export type { FormFieldProps, FormLabelProps, FormErrorProps, FormHelperTextProps, FormSuccessProps, FormFieldLayout } from "./components/ds-form";

// ── NumberInput ─────────────────────────────────────────────────────────────
export { NumberInput } from "./components/ds-numberinput";
export type { NumberInputProps, NumberInputSize } from "./components/ds-numberinput";

// ── OTPInput ────────────────────────────────────────────────────────────────
export { OTPInput } from "./components/ds-otpinput";
export type { OTPInputProps, OTPInputSize } from "./components/ds-otpinput";

// ── PageHeader ───────────────────────────────────────────────────────────────
export { PageHeader } from "./components/ds-pageheader";
export type { PageHeaderProps } from "./components/ds-pageheader";

// ── FilterBar ────────────────────────────────────────────────────────────────
export { FilterBar } from "./components/ds-filterbar";
export type { FilterBarProps, FilterBarValue, FilterConfig, FilterOption, FilterValue } from "./components/ds-filterbar";

// ── AdvancedDataTable ────────────────────────────────────────────────────────
export { AdvancedDataTable } from "./components/ds-advanced-table";
export type { AdvancedDataTableProps, AdvancedColumn, PaginationMeta, BulkAction, SortOrder, AdvancedTableSize } from "./components/ds-advanced-table";
