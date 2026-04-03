import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  selectable?: boolean;
  showLines?: boolean;
  defaultExpanded?: string[];
  /** Controlled: expanded node IDs */
  expandedItems?: string[];
  /** Called when expanded state changes */
  onExpandChange?: (expandedIds: string[]) => void;
  /** Controlled: selected node IDs */
  selectedItems?: string[];
  /** Called when selection changes */
  onSelect?: (selectedIds: string[]) => void;
  /** Show loading skeleton */
  loading?: boolean;
  /** Show error message */
  error?: string;
  /** Message shown when data is empty */
  emptyMessage?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

/* ─── Sub-component: TreeItem ────────────────────────────────────────────────── */

function TreeItem({
  node,
  level,
  expanded,
  selected,
  onToggle,
  onSelect,
  selectable,
  showLines,
}: {
  node: TreeNode;
  level: number;
  expanded: Set<string>;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  selectable?: boolean;
  showLines?: boolean;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);

  const defaultIcon = hasChildren
    ? isExpanded
      ? <FolderOpen size={14} className="text-chart-5" />
      : <Folder size={14} className="text-chart-5" />
    : <File size={14} className="text-muted-foreground" />;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-1 px-2 rounded-[var(--radius-sm)] transition-colors
          ${node.disabled ? "opacity-40 pointer-events-none" : "cursor-pointer hover:bg-accent"}
          ${isSelected ? "bg-primary/10 text-primary" : "text-foreground"}`}
        style={{ paddingLeft: `${level * 20 + 8}px`, ...fontLabel }}
        onClick={() => {
          if (hasChildren) onToggle(node.id);
          if (selectable) onSelect(node.id);
        }}
      >
        {hasChildren ? (
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        ) : (
          <span className="w-4" />
        )}
        {selectable && (
          <span
            className={`w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center flex-shrink-0 ${
              isSelected ? "bg-primary border-primary" : "border-border"
            }`}
          >
            {isSelected && (
              <span className="w-2 h-2 rounded-[1px] bg-primary-foreground" />
            )}
          </span>
        )}
        <span className="flex-shrink-0">{node.icon || defaultIcon}</span>
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className={showLines ? "border-l border-border ml-[22px]" : ""}>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
              selectable={selectable}
              showLines={showLines}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Tree({
  data,
  selectable,
  showLines,
  defaultExpanded,
  expandedItems,
  onExpandChange,
  selectedItems,
  onSelect,
  loading = false,
  error,
  emptyMessage = "No items",
}: TreeProps) {
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    new Set(defaultExpanded || [])
  );
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());

  // Support controlled and uncontrolled modes
  const expanded = expandedItems !== undefined ? new Set(expandedItems) : internalExpanded;
  const selected = selectedItems !== undefined ? new Set(selectedItems) : internalSelected;

  const toggle = (id: string) => {
    const n = new Set(expanded);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    if (onExpandChange) {
      onExpandChange(Array.from(n));
    }
    if (expandedItems === undefined) {
      setInternalExpanded(n);
    }
  };
  const select = (id: string) => {
    const n = new Set(selected);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    if (onSelect) {
      onSelect(Array.from(n));
    }
    if (selectedItems === undefined) {
      setInternalSelected(n);
    }
  };

  if (error) {
    return (
      <div className="rounded-[var(--radius-md)] border border-border bg-card px-4 py-8 text-center">
        <span style={{ ...fontLabel, color: "var(--destructive)" }}>{error}</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-[var(--radius-md)] border border-border bg-card py-2 px-3 flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-7 rounded bg-muted/50 animate-pulse" style={{ width: `${60 + (i % 3) * 15}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card py-1">
      {data.length === 0 ? (
        <div className="px-4 py-8 text-center text-muted-foreground" style={fontLabel}>
          {emptyMessage}
        </div>
      ) : (
        data.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            expanded={expanded}
            selected={selected}
            onToggle={toggle}
            onSelect={select}
            selectable={selectable}
            showLines={showLines}
          />
        ))
      )}
    </div>
  );
}
