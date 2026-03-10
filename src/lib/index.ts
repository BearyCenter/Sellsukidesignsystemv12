// ── Styles (imported so Vite extracts CSS to dist/styles.css) ────────────────
import "./styles.css";

// ── Button ───────────────────────────────────────────────────────────────────
export {
  DSButton,
  IconButton,
  ButtonGroup,
} from "./components/ds-button";
export type { DSButtonProps, IconButtonProps, ButtonSize, ButtonVariant } from "./components/ds-button";

// ── Input ────────────────────────────────────────────────────────────────────
export { DSInput, DSTextarea } from "./components/ds-input";
export type { DSInputProps, DSTextareaProps, InputSize, InputVariant, InputState } from "./components/ds-input";

// ── Alert & Toast ────────────────────────────────────────────────────────────
export { Alert, ToastContainer, toast } from "./components/ds-alert";
export type { AlertVariant } from "./components/ds-alert";

// ── Badge ────────────────────────────────────────────────────────────────────
export { Badge } from "./components/ds-badge";
export type { BadgeVariant, BadgeSize } from "./components/ds-badge";

// ── Checkbox ─────────────────────────────────────────────────────────────────
export { DSCheckbox, CheckboxGroup } from "./components/ds-checkbox";
export type { CheckboxSize } from "./components/ds-checkbox";

// ── Radio ────────────────────────────────────────────────────────────────────
export { DSRadio, RadioGroup } from "./components/ds-radio";
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
export { DSTable } from "./components/ds-table";
export type { TableColumn, TableSize } from "./components/ds-table";

// ── Tabs ─────────────────────────────────────────────────────────────────────
export { Tabs } from "./components/ds-tabs";
export type { TabItem, TabVariant, TabSize } from "./components/ds-tabs";
