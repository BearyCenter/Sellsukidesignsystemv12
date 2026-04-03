import React, { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RepeatableFieldRow {
  /** Internal unique ID */
  id: string;
  /** Row data values keyed by field name */
  values: Record<string, unknown>;
}

export interface RepeatableFieldColumn {
  /** Column key matching values[key] */
  key: string;
  /** Column header label */
  label: string;
  /** Render function — receive current value + onChange */
  render: (
    value: unknown,
    onChange: (val: unknown) => void,
    rowIndex: number
  ) => React.ReactNode;
  /** Column width (CSS, e.g. "200px", "1fr") */
  width?: string;
}

export interface RepeatableFieldListProps {
  /** Column definitions */
  columns: RepeatableFieldColumn[];
  /** Current rows */
  value?: RepeatableFieldRow[];
  /** Change handler */
  onChange?: (rows: RepeatableFieldRow[]) => void;
  /** Default values for a new row */
  defaultRow?: Record<string, unknown>;
  /** Minimum number of rows (shows disabled remove when at min) */
  minRows?: number;
  /** Maximum number of rows (hides add button when at max) */
  maxRows?: number;
  /** Add button label */
  addLabel?: string;
  /** Whether rows can be reordered */
  sortable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function createRow(defaults: Record<string, unknown> = {}): RepeatableFieldRow {
  return { id: genId(), values: { ...defaults } };
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

// ─── RepeatableFieldList ──────────────────────────────────────────────────────

export function RepeatableFieldList({
  columns,
  value,
  onChange,
  defaultRow = {},
  minRows = 0,
  maxRows,
  addLabel = "Add row",
  sortable = false,
  disabled = false,
  className = "",
}: RepeatableFieldListProps) {
  // Uncontrolled fallback
  const [internalRows, setInternalRows] = useState<RepeatableFieldRow[]>(() =>
    value ?? []
  );

  const rows = value ?? internalRows;

  const update = (next: RepeatableFieldRow[]) => {
    setInternalRows(next);
    onChange?.(next);
  };

  const addRow = () => {
    if (maxRows !== undefined && rows.length >= maxRows) return;
    update([...rows, createRow(defaultRow)]);
  };

  const removeRow = (id: string) => {
    if (rows.length <= minRows) return;
    update(rows.filter((r) => r.id !== id));
  };

  const updateCell = (id: string, key: string, val: unknown) => {
    update(
      rows.map((r) =>
        r.id === id ? { ...r, values: { ...r.values, [key]: val } } : r
      )
    );
  };

  const moveRow = (fromIdx: number, toIdx: number) => {
    const next = [...rows];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    update(next);
  };

  const atMin = rows.length <= minRows;
  const atMax = maxRows !== undefined && rows.length >= maxRows;

  // Drag state (simple, not using dnd library)
  const dragIdx = React.useRef<number | null>(null);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header */}
      <div
        className={[
          "flex items-center gap-2 px-3 text-muted-foreground",
          sortable ? "pl-9" : "",
        ].join(" ")}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            style={{ width: col.width ?? "1fr", flex: col.width ? "none" : "1" }}
            className="min-w-0"
          >
            <span style={labelStyle}>{col.label}</span>
          </div>
        ))}
        {/* Remove column header spacer */}
        <div className="w-8 flex-shrink-0" />
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {rows.map((row, rowIdx) => (
          <div
            key={row.id}
            className={[
              "flex items-center gap-2 p-2 rounded-[var(--radius-md)] border border-border bg-card transition-colors",
              disabled ? "opacity-60" : "",
            ].join(" ")}
            draggable={sortable && !disabled}
            onDragStart={() => { dragIdx.current = rowIdx; }}
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={() => {
              if (dragIdx.current !== null && dragIdx.current !== rowIdx) {
                moveRow(dragIdx.current, rowIdx);
                dragIdx.current = null;
              }
            }}
          >
            {/* Drag handle */}
            {sortable && (
              <div className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground flex-shrink-0">
                <GripVertical size={14} />
              </div>
            )}

            {/* Cells */}
            {columns.map((col) => (
              <div
                key={col.key}
                style={{ width: col.width ?? "1fr", flex: col.width ? "none" : "1" }}
                className="min-w-0"
              >
                {col.render(
                  row.values[col.key],
                  (val) => updateCell(row.id, col.key, val),
                  rowIdx
                )}
              </div>
            ))}

            {/* Remove button */}
            <button
              type="button"
              disabled={disabled || atMin}
              onClick={() => removeRow(row.id)}
              className={[
                "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] transition-colors",
                disabled || atMin
                  ? "text-muted-foreground/30 cursor-not-allowed"
                  : "text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer",
              ].join(" ")}
              aria-label="Remove row"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div className="text-center py-6 text-muted-foreground rounded-[var(--radius-md)] border border-dashed border-border">
          <span style={btnStyle}>No rows yet. Click "{addLabel}" to begin.</span>
        </div>
      )}

      {/* Add button */}
      {!atMax && (
        <button
          type="button"
          disabled={disabled}
          onClick={addRow}
          className={[
            "flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-colors",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          ].join(" ")}
          style={btnStyle}
        >
          <Plus size={14} />
          {addLabel}
        </button>
      )}
    </div>
  );
}

RepeatableFieldList.displayName = "RepeatableFieldList";
