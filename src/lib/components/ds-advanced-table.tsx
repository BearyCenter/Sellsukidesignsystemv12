import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Columns3,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import { DSCheckbox } from "./ds-checkbox";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type AdvancedTableSize = "sm" | "md" | "lg";
export type SortOrder = "asc" | "desc";

export interface AdvancedColumn<T = Record<string, any>> {
  /** Unique column key — matches field name in data row */
  key: string;
  /** Column header label */
  header: string;
  /** Enable server-side sort click */
  sortable?: boolean;
  /** Fixed pixel or CSS width */
  width?: number | string;
  /** Minimum width in px (default 80) */
  minWidth?: number;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Stick to left edge (frozen column) */
  frozen?: boolean;
  /** Allow hiding via column toggle. Default true */
  hideable?: boolean;
  /** Start hidden */
  defaultHidden?: boolean;
  /** Custom cell renderer */
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  onClick: (selectedKeys: Array<string | number>) => void;
}

export interface AdvancedDataTableProps<T = Record<string, any>> {
  /** Column definitions */
  columns: AdvancedColumn<T>[];
  /** Row data */
  data: T[];
  /** Field to use as unique row key (default: "id") */
  rowKey?: string;

  /* ── Server-side ── */
  /** Server pagination metadata */
  pagination?: PaginationMeta;
  /** Currently sorted column key */
  sortBy?: string;
  /** Current sort direction */
  sortOrder?: SortOrder;
  /** Called when user changes page or page size */
  onPageChange?: (page: number, pageSize: number) => void;
  /** Called when user clicks a sortable column */
  onSortChange?: (sortBy: string, sortOrder: SortOrder) => void;

  /* ── Selection ── */
  /** Enable row checkboxes */
  selectable?: boolean;
  /** Controlled selection (set of rowKey values) */
  selectedRows?: Set<string | number>;
  /** Called when selection changes */
  onSelectionChange?: (selected: Set<string | number>, rows: T[]) => void;

  /* ── Bulk Actions ── */
  /** Actions shown in bulk action bar when rows are selected */
  bulkActions?: BulkAction[];

  /* ── Row behaviour ── */
  /** Called when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Render function for expanded row content */
  expandedRowRender?: (row: T) => React.ReactNode;

  /* ── States ── */
  /** Show skeleton loading rows */
  loading?: boolean;
  /** Number of skeleton rows to show while loading */
  loadingRows?: number;
  /** Error message — renders error state instead of table body */
  error?: string;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Custom empty state description */
  emptyDescription?: string;

  /* ── Column management ── */
  /** Show column visibility toggle button */
  showColumnToggle?: boolean;

  /* ── Display ── */
  size?: AdvancedTableSize;
  stickyHeader?: boolean;
  className?: string;
}

/* ─── Style constants ────────────────────────────────────────────────────────── */

const btnFont: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const cellFont: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const captionFont: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: 400,
};

const cellPad: Record<AdvancedTableSize, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-4",
};

/* ─── Skeleton row ───────────────────────────────────────────────────────────── */

function SkeletonCell({ width }: { width?: string }) {
  return (
    <div
      className="h-4 rounded bg-muted animate-pulse"
      style={{ width: width ?? "80%" }}
    />
  );
}

/* ─── Column Toggle Dropdown ─────────────────────────────────────────────────── */

interface ColumnToggleProps {
  columns: AdvancedColumn<Record<string, any>>[];
  hidden: Set<string>;
  onToggle: (key: string) => void;
}

function ColumnToggle({ columns, hidden, onToggle }: ColumnToggleProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const hideableColumns = columns.filter((c) => c.hideable !== false);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
        style={captionFont}
      >
        <Columns3 size={14} />
        Columns
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-30 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-elevation-sm w-44 py-1">
          {hideableColumns.map((col) => {
            const isVisible = !hidden.has(col.key);
            return (
              <button
                key={col.key}
                type="button"
                onClick={() => onToggle(col.key)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors cursor-pointer"
                style={captionFont}
              >
                <span>{col.header}</span>
                {isVisible && <Check size={13} className="text-[var(--primary)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Bulk Action Bar ────────────────────────────────────────────────────────── */

interface BulkBarProps {
  count: number;
  actions: BulkAction[];
  selectedKeys: Array<string | number>;
  onClear: () => void;
}

function BulkBar({ count, actions, selectedKeys, onClear }: BulkBarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--primary)]/8 border-b border-[var(--primary)]/20">
      <span
        className="text-[var(--primary)] flex-shrink-0"
        style={btnFont}
      >
        {count} selected
      </span>
      <div className="flex items-center gap-2 flex-1 flex-wrap">
        {actions.map((action, i) => (
          <button
            key={i}
            type="button"
            onClick={() => action.onClick(selectedKeys)}
            className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-md border transition-colors cursor-pointer ${
              action.variant === "destructive"
                ? "border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10"
                : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10"
            }`}
            style={{ ...captionFont, fontWeight: 500 }}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer p-1 rounded"
        title="Clear selection"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ─── Pagination Bar ─────────────────────────────────────────────────────────── */

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

interface PaginationBarProps {
  meta: PaginationMeta;
  onPageChange: (page: number, pageSize: number) => void;
}

function PaginationBar({ meta, onPageChange }: PaginationBarProps) {
  const { page, pageSize, totalCount } = meta;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  const pages = useMemo(() => {
    const p: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) p.push(i);
    } else {
      p.push(1);
      if (page > 3) p.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) p.push(i);
      if (page < totalPages - 2) p.push("...");
      p.push(totalPages);
    }
    return p;
  }, [page, totalPages]);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] flex-wrap gap-3">
      {/* Showing text + page size */}
      <div className="flex items-center gap-3">
        <span className="text-[var(--muted-foreground)] whitespace-nowrap" style={captionFont}>
          {from}–{to} of {totalCount.toLocaleString()}
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageChange(1, Number(e.target.value))}
          className="h-7 px-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] cursor-pointer"
          style={captionFont}
        >
          {PAGE_SIZE_OPTIONS.map((s) => (
            <option key={s} value={s}>{s} / page</option>
          ))}
        </select>
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        <PagBtn
          disabled={page === 1}
          onClick={() => onPageChange(page - 1, pageSize)}
          label="‹ Prev"
        />
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-[var(--muted-foreground)]" style={captionFont}>…</span>
          ) : (
            <PagBtn
              key={p}
              active={p === page}
              onClick={() => onPageChange(p as number, pageSize)}
              label={String(p)}
            />
          )
        )}
        <PagBtn
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1, pageSize)}
          label="Next ›"
        />
      </div>
    </div>
  );
}

function PagBtn({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[28px] h-7 px-2 rounded-md border transition-colors cursor-pointer ${
        active
          ? "bg-[var(--primary)] border-[var(--primary)] text-primary-foreground"
          : disabled
          ? "border-transparent text-[var(--muted-foreground)] cursor-not-allowed"
          : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
      }`}
      style={{ ...captionFont, fontWeight: active ? 600 : 400 }}
    >
      {label}
    </button>
  );
}

/* ─── AdvancedDataTable ──────────────────────────────────────────────────────── */

export function AdvancedDataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey = "id",
  pagination,
  sortBy,
  sortOrder,
  onPageChange,
  onSortChange,
  selectable = false,
  selectedRows: controlledSelected,
  onSelectionChange,
  bulkActions = [],
  onRowClick,
  expandedRowRender,
  loading = false,
  loadingRows = 5,
  error,
  emptyMessage = "No data found",
  emptyDescription,
  showColumnToggle = false,
  size = "md",
  stickyHeader = false,
  className = "",
}: AdvancedDataTableProps<T>) {
  /* ── Hidden columns ─────────────────── */
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(
    new Set(columns.filter((c) => c.defaultHidden).map((c) => c.key))
  );
  const toggleCol = useCallback((key: string) => {
    setHiddenCols((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const visibleCols = useMemo(
    () => columns.filter((c) => !hiddenCols.has(c.key)),
    [columns, hiddenCols]
  );

  /* ── Selection ──────────────────────── */
  const [internalSelected, setInternalSelected] = useState<Set<string | number>>(new Set());
  const selected = controlledSelected ?? internalSelected;

  const setSelected = useCallback(
    (next: Set<string | number>) => {
      if (!controlledSelected) setInternalSelected(next);
      const selectedRows = data.filter((row) => next.has(row[rowKey]));
      onSelectionChange?.(next, selectedRows);
    },
    [controlledSelected, data, rowKey, onSelectionChange]
  );

  const allKeys = useMemo(() => data.map((row) => row[rowKey] as string | number), [data, rowKey]);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.has(k));
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = useCallback(() => {
    setSelected(allSelected ? new Set() : new Set(allKeys));
  }, [allSelected, allKeys, setSelected]);

  const toggleRow = useCallback(
    (key: string | number) => {
      const next = new Set(selected);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelected(next);
    },
    [selected, setSelected]
  );

  /* ── Expanded rows ──────────────────── */
  const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set());
  const toggleExpanded = useCallback((key: string | number) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  /* ── Sort handler ───────────────────── */
  const handleSort = useCallback(
    (key: string) => {
      if (!onSortChange) return;
      if (sortBy === key) {
        onSortChange(key, sortOrder === "asc" ? "desc" : "asc");
      } else {
        onSortChange(key, "asc");
      }
    },
    [sortBy, sortOrder, onSortChange]
  );

  /* ── Frozen column left offsets ─────── */
  const frozenOffsets = useMemo(() => {
    const offsets: Record<string, number> = {};
    let left = 0;
    // account for checkbox col width
    if (selectable) left += 48;
    if (expandedRowRender) left += 40;
    for (const col of visibleCols) {
      if (col.frozen) {
        offsets[col.key] = left;
        const w = typeof col.width === "number" ? col.width : parseInt(col.width ?? "120");
        left += isNaN(w) ? 120 : w;
      }
    }
    return offsets;
  }, [visibleCols, selectable, expandedRowRender]);

  /* ── Column count (for colSpan) ─────── */
  const colCount =
    visibleCols.length +
    (selectable ? 1 : 0) +
    (expandedRowRender ? 1 : 0);

  /* ── Helpers ────────────────────────── */
  const frozenHeaderClass = "sticky z-[2] bg-inherit";

  return (
    <div className={`rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden ${className}`}>
      {/* ── Toolbar ─────────────────────── */}
      {showColumnToggle && (
        <div className="flex items-center justify-end gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--background)]">
          <ColumnToggle columns={columns as AdvancedColumn<Record<string, any>>[]} hidden={hiddenCols} onToggle={toggleCol} />
        </div>
      )}

      {/* ── Bulk action bar ─────────────── */}
      {selectable && selected.size > 0 && bulkActions.length > 0 && (
        <BulkBar
          count={selected.size}
          actions={bulkActions}
          selectedKeys={Array.from(selected)}
          onClear={() => setSelected(new Set())}
        />
      )}

      {/* ── Table ───────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: "100%" }}>
          {/* ── Header ──────────────────── */}
          <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
            <tr className="border-b border-border" style={{ backgroundColor: "color-mix(in srgb, var(--muted) 30%, var(--background) 70%)" }}>
              {/* Expand col */}
              {expandedRowRender && (
                <th className={`${cellPad[size]} w-10`} />
              )}
              {/* Checkbox col */}
              {selectable && (
                <th className={`${cellPad[size]} w-12`}>
                  <DSCheckbox
                    size="sm"
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {visibleCols.map((col) => {
                const isFrozen = col.frozen && col.key in frozenOffsets;
                const isSorted = sortBy === col.key;
                return (
                  <th
                    key={col.key}
                    className={`${cellPad[size]} text-${col.align ?? "left"} text-[var(--foreground)] whitespace-nowrap select-none ${
                      col.sortable && onSortChange ? "cursor-pointer hover:text-[var(--primary)]" : ""
                    } ${isFrozen ? frozenHeaderClass : ""}`}
                    style={{
                      ...btnFont,
                      width: col.width,
                      minWidth: col.minWidth ?? 80,
                      ...(isFrozen ? { left: frozenOffsets[col.key], boxShadow: "2px 0 4px rgba(0,0,0,0.04)" } : {}),
                    }}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {col.sortable && onSortChange && (
                        <span className={isSorted ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]/60"}>
                          {isSorted ? (
                            sortOrder === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                          ) : (
                            <ChevronsUpDown size={12} />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* ── Body ────────────────────── */}
          <tbody>
            {/* Error state */}
            {error && (
              <tr>
                <td colSpan={colCount} className={`${cellPad[size]} text-center`}>
                  <div className="flex flex-col items-center gap-2 py-10">
                    <AlertCircle size={32} className="text-[var(--destructive)] opacity-60" />
                    <span className="text-[var(--destructive)]" style={cellFont}>{error}</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Skeleton loading */}
            {!error && loading &&
              Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={`skel-${i}`} className="border-b border-[var(--border)] last:border-b-0">
                  {expandedRowRender && <td className={`${cellPad[size]} w-10`} />}
                  {selectable && (
                    <td className={`${cellPad[size]} w-12`}>
                      <div className="w-4 h-4 rounded bg-muted animate-pulse" />
                    </td>
                  )}
                  {visibleCols.map((col) => (
                    <td key={col.key} className={`${cellPad[size]}`}>
                      <SkeletonCell width={col.align === "right" ? "60%" : col.align === "center" ? "50%" : "75%"} />
                    </td>
                  ))}
                </tr>
              ))
            }

            {/* Empty state */}
            {!error && !loading && data.length === 0 && (
              <tr>
                <td colSpan={colCount} className={`${cellPad[size]} text-center`}>
                  <div className="flex flex-col items-center gap-2 py-12">
                    <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)]">
                      <ChevronsUpDown size={20} />
                    </div>
                    <span className="text-[var(--foreground)]" style={cellFont}>{emptyMessage}</span>
                    {emptyDescription && (
                      <span className="text-[var(--muted-foreground)]" style={captionFont}>{emptyDescription}</span>
                    )}
                  </div>
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!error && !loading &&
              data.map((row, idx) => {
                const key = row[rowKey] as string | number;
                const isSelected = selected.has(key);
                const isExpanded = expandedKeys.has(key);
                const isClickable = !!onRowClick || !!expandedRowRender;

                return (
                  <React.Fragment key={key ?? idx}>
                    <tr
                      className={`group/row border-b border-[var(--border)] last:border-b-0 transition-colors ${
                        isSelected
                          ? "bg-primary/5"
                          : "bg-[var(--card)] hover:bg-[var(--row-hover-bg)]"
                      } ${isClickable ? "cursor-pointer" : ""}`}
                      onClick={() => {
                        onRowClick?.(row);
                        if (expandedRowRender) toggleExpanded(key);
                      }}
                    >
                      {/* Expand toggle */}
                      {expandedRowRender && (
                        <td
                          className={`${cellPad[size]} w-10 text-center`}
                          onClick={(e) => { e.stopPropagation(); toggleExpanded(key); }}
                        >
                          <ChevronRight
                            size={14}
                            className={`text-[var(--muted-foreground)] transition-transform mx-auto ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </td>
                      )}

                      {/* Checkbox */}
                      {selectable && (
                        <td
                          className={`${cellPad[size]} w-12`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DSCheckbox
                            size="sm"
                            checked={isSelected}
                            onChange={() => toggleRow(key)}
                          />
                        </td>
                      )}

                      {/* Cells */}
                      {visibleCols.map((col) => {
                        const isFrozen = col.frozen && col.key in frozenOffsets;
                        const frozenCellClass = isFrozen
                          ? isSelected
                            ? "sticky z-[1] bg-primary/5"
                            : "sticky z-[1] bg-[var(--card)] group-hover/row:bg-[var(--row-hover-bg)] transition-colors"
                          : "";
                        return (
                          <td
                            key={col.key}
                            className={`${cellPad[size]} text-${col.align ?? "left"} text-[var(--foreground)] ${frozenCellClass}`}
                            style={{
                              ...cellFont,
                              ...(isFrozen
                                ? { left: frozenOffsets[col.key], boxShadow: "2px 0 4px rgba(0,0,0,0.04)" }
                                : {}),
                            }}
                          >
                            {col.render ? col.render(row[col.key], row, idx) : row[col.key]}
                          </td>
                        );
                      })}
                    </tr>

                    {/* Expanded content */}
                    {expandedRowRender && isExpanded && (
                      <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                        <td colSpan={colCount} className="px-6 py-4">
                          {expandedRowRender(row)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            }
          </tbody>
        </table>
      </div>

      {/* ── Pagination ──────────────────── */}
      {pagination && onPageChange && !loading && !error && (
        <PaginationBar meta={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
