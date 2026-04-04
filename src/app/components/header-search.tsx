import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";

// ─── Shared Styles (from CSS variables) ───────────────────────────────────────

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-badge)",
  fontWeight: "var(--weight-label)",
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SearchableItem {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
}

interface HeaderSearchProps {
  items: SearchableItem[];
  onSelect: (id: string) => void;
  placeholder?: string;
  shortcutLabel?: string;
  noResultsText?: string;
  /** Compact mode for mobile */
  compact?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeaderSearch({
  items,
  onSelect,
  placeholder = "Search components...",
  shortcutLabel = "⌘K",
  noResultsText = "No results found",
  compact = false,
}: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter items
  const filtered = query.trim()
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.group.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  // Group filtered results
  const grouped = filtered.reduce<Record<string, SearchableItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  // Flat list for keyboard navigation
  const flatFiltered = Object.values(grouped).flat();

  // Reset active index when query changes
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIdx]);

  // Global keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      setOpen(false);
      setQuery("");
    },
    [onSelect],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % flatFiltered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + flatFiltered.length) % flatFiltered.length);
    } else if (e.key === "Enter" && flatFiltered[activeIdx]) {
      e.preventDefault();
      handleSelect(flatFiltered[activeIdx].id);
    }
  };

  // ─── Trigger (inline search bar) ──────────────────────────────────────────

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={`flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-background/60 text-muted-foreground hover:border-primary/40 hover:bg-background transition-all cursor-pointer
          ${compact ? "px-2 py-1 w-full" : "px-2.5 py-1 min-w-[240px]"}
        `}
        style={smallLabel}
      >
        <Search size={14} className="flex-shrink-0 text-muted-foreground" />
        <span className="flex-1 text-left truncate" style={smallLabel}>
          {placeholder}
        </span>
        {!compact && (
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground border border-border/50"
            style={{ fontFamily: "var(--font-caption)", fontSize: "var(--text-caption)", fontWeight: "500", letterSpacing: "0" }}
          >
            {shortcutLabel}
          </kbd>
        )}
      </button>
    );
  }

  // ─── Open state (dropdown palette) ────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative z-50">
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-foreground/10 backdrop-blur-[1px] lg:bg-transparent lg:backdrop-blur-none" onClick={() => { setOpen(false); setQuery(""); }} />

      {/* Search panel */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-lg bg-card border border-border rounded-[var(--radius-md)] shadow-lg overflow-hidden
          ${compact ? "top-16" : "top-20 lg:top-14"}
        `}
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)" }}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            style={fontLabel}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground border border-border/50 cursor-pointer"
            style={{ fontFamily: "var(--font-caption)", fontSize: "var(--text-caption)", fontWeight: "500" }}
            onClick={() => { setOpen(false); setQuery(""); }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto py-2">
          {flatFiltered.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground" style={smallLabel}>
              <Search size={20} className="mx-auto mb-2 opacity-40" />
              {noResultsText}
            </div>
          ) : (
            Object.entries(grouped).map(([group, groupItems]) => (
              <div key={group}>
                <div
                  className="px-4 py-1.5 text-muted-foreground"
                  style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
                >
                  {group}
                </div>
                {groupItems.map((item) => {
                  const idx = flatFiltered.indexOf(item);
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      data-idx={idx}
                      onClick={() => handleSelect(item.id)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2 transition-colors cursor-pointer
                        ${isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/50"}
                      `}
                      style={fontLabel}
                    >
                      <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                        {item.icon}
                      </span>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {isActive && (
                        <CornerDownLeft size={12} className="text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground">
            <ArrowUp size={10} />
            <ArrowDown size={10} />
            <span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}>
              navigate
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <CornerDownLeft size={10} />
            <span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}>
              select
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span
              className="px-1 rounded-[var(--radius-sm)] border border-border/50 bg-muted"
              style={{ fontFamily: "var(--font-caption)", fontSize: "var(--text-caption)", fontWeight: "500" }}
            >
              esc
            </span>
            <span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}>
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}