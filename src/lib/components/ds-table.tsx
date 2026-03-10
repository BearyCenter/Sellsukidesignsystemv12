import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export type TableSize = "sm" | "md" | "lg";

export interface TableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  size?: TableSize;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selected: Set<number>) => void;
  loading?: boolean;
  emptyMessage?: string;
  stickyHeader?: boolean;
  className?: string;
}

const cellPadding: Record<TableSize, string> = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-4",
};

export function DSTable<T extends Record<string, any>>({
  columns,
  data,
  size = "md",
  striped = false,
  hoverable = true,
  bordered = false,
  selectable = false,
  selectedRows: controlledSelected,
  onSelectionChange,
  loading = false,
  emptyMessage = "No data available",
  stickyHeader = false,
  className = "",
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [internalSelected, setInternalSelected] = useState<Set<number>>(new Set());
  const selected = controlledSelected ?? internalSelected;

  const setSelected = (s: Set<number>) => {
    if (!controlledSelected) setInternalSelected(s);
    onSelectionChange?.(s);
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = typeof aVal === "string" ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const allSelected = data.length > 0 && selected.size === data.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(data.map((_, i) => i)));
  };

  const toggleRow = (idx: number) => {
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
  };

  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" };
  const headerStyle: React.CSSProperties = { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" };

  return (
    <div className={`rounded-[var(--radius-lg)] border border-border overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
            <tr className="bg-muted/50 border-b border-border">
              {selectable && (
                <th className={`${cellPadding[size]} w-12`}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded-[var(--radius-sm)] border-border accent-primary cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${cellPadding[size]} text-${col.align ?? "left"} text-muted-foreground ${col.sortable ? "cursor-pointer select-none hover:text-foreground transition-colors" : ""} ${bordered ? "border-x border-border first:border-l-0 last:border-r-0" : ""}`}
                  style={{ ...headerStyle, width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="text-muted-foreground/60">
                        {sortKey === col.key ? (
                          sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : (
                          <ChevronsUpDown size={12} />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className={`${cellPadding[size]} text-center text-muted-foreground`}>
                  <div className="flex items-center justify-center gap-2 py-8">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span style={labelStyle}>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className={`${cellPadding[size]} text-center text-muted-foreground py-12`}>
                  <span style={labelStyle}>{emptyMessage}</span>
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => {
                const isSelected = selected.has(idx);
                return (
                  <tr
                    key={idx}
                    className={`border-b border-border last:border-b-0 transition-colors ${
                      isSelected ? "bg-primary/5" : striped && idx % 2 === 1 ? "bg-muted/20" : "bg-card"
                    } ${hoverable ? "hover:bg-[var(--Colors--Background--bg-primary_hover)]" : ""}`}
                  >
                    {selectable && (
                      <td className={`${cellPadding[size]} w-12`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(idx)}
                          className="w-4 h-4 rounded-[var(--radius-sm)] border-border accent-primary cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`${cellPadding[size]} text-${col.align ?? "left"} text-foreground ${bordered ? "border-x border-border first:border-l-0 last:border-r-0" : ""}`}
                        style={labelStyle}
                      >
                        {col.render ? col.render(row[col.key], row, idx) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}