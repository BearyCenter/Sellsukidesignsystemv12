import React, { useState } from "react";
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TransferItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TransferListProps {
  sourceTitle?: string;
  targetTitle?: string;
  items: TransferItem[];
  defaultTarget?: string[];
  searchable?: boolean;
  /** Controlled: IDs of items in the target list */
  value?: string[];
  /** Called when target list changes */
  onChange?: (targetIds: string[]) => void;
  /** Show loading skeleton overlay */
  loading?: boolean;
  /** Show error message instead of content */
  error?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

/* ─── Sub-component: ListBox ─────────────────────────────────────────────────── */

function ListBox({
  title,
  items,
  selected,
  onToggle,
  search,
  onSearch,
  searchable,
}: {
  title: string;
  items: TransferItem[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  search: string;
  onSearch: (v: string) => void;
  searchable?: boolean;
}) {
  return (
    <div className="flex-1 min-w-[180px] rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
      <div className="px-3 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
        <span className="text-foreground" style={fontLabelBold}>
          {title}
        </span>
        <span className="text-muted-foreground" style={smallLabel}>
          {items.length} items
        </span>
      </div>
      {searchable && (
        <div className="px-3 py-2 border-b border-border flex items-center gap-2">
          <Search size={12} className="text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search\u2026"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            style={smallLabel}
          />
        </div>
      )}
      <div className="max-h-[240px] overflow-y-auto py-1">
        {items.length === 0 && (
          <div
            className="px-3 py-6 text-center text-muted-foreground"
            style={smallLabel}
          >
            No items
          </div>
        )}
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && onToggle(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 transition-colors cursor-pointer
              ${selected.has(item.id) ? "bg-primary/10" : "hover:bg-accent"}
              ${item.disabled ? "opacity-40 pointer-events-none" : ""}`}
            style={fontLabel}
          >
            <span
              className={`w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center flex-shrink-0
              ${selected.has(item.id) ? "bg-primary border-primary" : "border-border"}`}
            >
              {selected.has(item.id) && (
                <span className="w-2 h-2 rounded-[1px] bg-primary-foreground" />
              )}
            </span>
            <span className="text-foreground truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function TransferList({
  sourceTitle = "Available",
  targetTitle = "Selected",
  items,
  defaultTarget = [],
  searchable,
  value,
  onChange,
  loading = false,
  error,
}: TransferListProps) {
  const [internalTarget, setInternalTarget] = useState<Set<string>>(
    new Set(defaultTarget)
  );

  // Support controlled (value) and uncontrolled modes
  const target = value !== undefined ? new Set(value) : internalTarget;
  const updateTarget = (next: Set<string>) => {
    if (onChange) {
      onChange(Array.from(next));
    }
    if (value === undefined) {
      setInternalTarget(next);
    }
  };
  const [sourceSelected, setSourceSelected] = useState<Set<string>>(
    new Set()
  );
  const [targetSelected, setTargetSelected] = useState<Set<string>>(
    new Set()
  );
  const [sourceSearch, setSourceSearch] = useState("");
  const [targetSearch, setTargetSearch] = useState("");

  const source = items.filter((i) => !target.has(i.id));
  const targetItems = items.filter((i) => target.has(i.id));

  const filteredSource = sourceSearch
    ? source.filter((i) =>
        i.label.toLowerCase().includes(sourceSearch.toLowerCase())
      )
    : source;
  const filteredTarget = targetSearch
    ? targetItems.filter((i) =>
        i.label.toLowerCase().includes(targetSearch.toLowerCase())
      )
    : targetItems;

  const moveRight = () => {
    const n = new Set(target);
    sourceSelected.forEach((id) => n.add(id));
    updateTarget(n);
    setSourceSelected(new Set());
  };
  const moveLeft = () => {
    const n = new Set(target);
    targetSelected.forEach((id) => n.delete(id));
    updateTarget(n);
    setTargetSelected(new Set());
  };
  const moveAllRight = () => {
    updateTarget(new Set(items.filter((i) => !i.disabled).map((i) => i.id)));
    setSourceSelected(new Set());
  };
  const moveAllLeft = () => {
    updateTarget(new Set());
    setTargetSelected(new Set());
  };

  const toggleSelect = (
    id: string,
    set: Set<string>,
    setter: (s: Set<string>) => void
  ) => {
    const n = new Set(set);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    setter(n);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-[var(--radius-md)] border border-border bg-card px-6 py-10 text-center">
        <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", color: "var(--destructive)" }}>{error}</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-stretch gap-3 flex-wrap opacity-60 pointer-events-none">
        {[sourceTitle, targetTitle].map((title) => (
          <div key={title} className="flex-1 min-w-[180px] rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
            <div className="px-3 py-2.5 border-b border-border bg-muted/30">
              <span style={fontLabelBold}>{title}</span>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 rounded bg-muted/50 animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-stretch gap-3 flex-wrap">
      <ListBox
        title={sourceTitle}
        items={filteredSource}
        selected={sourceSelected}
        onToggle={(id) =>
          toggleSelect(id, sourceSelected, setSourceSelected)
        }
        search={sourceSearch}
        onSearch={setSourceSearch}
        searchable={searchable}
      />

      <div className="flex flex-col items-center justify-center gap-1.5 py-4">
        <button
          onClick={moveAllRight}
          disabled={source.length === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer"
        >
          <ChevronsRight size={14} />
        </button>
        <button
          onClick={moveRight}
          disabled={sourceSelected.size === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
        <button
          onClick={moveLeft}
          disabled={targetSelected.size === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={moveAllLeft}
          disabled={targetItems.length === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer"
        >
          <ChevronsLeft size={14} />
        </button>
      </div>

      <ListBox
        title={targetTitle}
        items={filteredTarget}
        selected={targetSelected}
        onToggle={(id) =>
          toggleSelect(id, targetSelected, setTargetSelected)
        }
        search={targetSearch}
        onSearch={setTargetSearch}
        searchable={searchable}
      />
    </div>
  );
}
