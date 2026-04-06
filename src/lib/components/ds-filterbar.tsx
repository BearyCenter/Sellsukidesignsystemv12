import React, { useState, useCallback } from "react";
import { X, ChevronDown, Search, SlidersHorizontal } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type FilterValue = string | string[] | [Date | null, Date | null] | null;

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  /** Unique key for this filter */
  key: string;
  /** Display label for the filter button */
  label: string;
  /** single = one value at a time, multi = multiple values */
  type: "single" | "multi";
  /** Available options */
  options: FilterOption[];
}

export interface FilterBarValue {
  search?: string;
  filters: Record<string, FilterValue>;
}

export interface FilterBarProps {
  /** Filter definitions */
  filters?: FilterConfig[];
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Show search field */
  showSearch?: boolean;
  /** Controlled value */
  value?: FilterBarValue;
  /** Callback when any filter/search changes */
  onFilterChange?: (value: FilterBarValue) => void;
  /** Additional className */
  className?: string;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const smallStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: 400,
};

/* ─── FilterDropdown ─────────────────────────────────────────────────────────── */

interface FilterDropdownProps {
  config: FilterConfig;
  value: FilterValue;
  onChange: (key: string, value: FilterValue) => void;
}

function FilterDropdown({ config, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedValues: string[] = Array.isArray(value)
    ? (value as string[])
    : value
    ? [value as string]
    : [];

  const isActive = selectedValues.length > 0;

  const handleSelect = useCallback(
    (optVal: string) => {
      if (config.type === "single") {
        const next = selectedValues[0] === optVal ? null : optVal;
        onChange(config.key, next);
        setOpen(false);
      } else {
        const next = selectedValues.includes(optVal)
          ? selectedValues.filter((v) => v !== optVal)
          : [...selectedValues, optVal];
        onChange(config.key, next.length ? next : null);
      }
    },
    [config, selectedValues, onChange]
  );

  const activeLabel =
    selectedValues.length === 1
      ? config.options.find((o) => o.value === selectedValues[0])?.label
      : selectedValues.length > 1
      ? `${config.label} (${selectedValues.length})`
      : config.label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border transition-colors cursor-pointer select-none ${
          isActive
            ? "bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]"
            : "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]"
        }`}
        style={labelStyle}
      >
        {activeLabel}
        {isActive && (
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--primary)] text-primary-foreground font-bold"
            style={{ fontSize: "var(--text-label)", lineHeight: 1 }}
          >
            {selectedValues.length}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute left-0 top-full mt-1 z-20 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-elevation-sm min-w-[160px] py-1 overflow-hidden">
            {config.options.map((opt) => {
              const selected = selectedValues.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors cursor-pointer ${
                    selected
                      ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }`}
                  style={smallStyle}
                >
                  {config.type === "multi" && (
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 rounded border flex-shrink-0 ${
                        selected
                          ? "bg-[var(--primary)] border-[var(--primary)] text-primary-foreground"
                          : "border-[var(--border)]"
                      }`}
                    >
                      {selected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── FilterBar ──────────────────────────────────────────────────────────────── */

export function FilterBar({
  filters = [],
  searchPlaceholder = "Search...",
  showSearch = true,
  value,
  onFilterChange,
  className = "",
}: FilterBarProps) {
  const [internalValue, setInternalValue] = useState<FilterBarValue>({
    search: "",
    filters: {},
  });

  const current = value ?? internalValue;

  const update = useCallback(
    (next: FilterBarValue) => {
      setInternalValue(next);
      onFilterChange?.(next);
    },
    [onFilterChange]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      update({ ...current, search: e.target.value });
    },
    [current, update]
  );

  const handleFilter = useCallback(
    (key: string, val: FilterValue) => {
      update({
        ...current,
        filters: { ...current.filters, [key]: val },
      });
    },
    [current, update]
  );

  const handleClearAll = useCallback(() => {
    update({ search: "", filters: {} });
  }, [update]);

  const activeFilterCount = Object.values(current.filters).filter(
    (v) => v !== null && (!Array.isArray(v) || v.length > 0)
  ).length;

  const hasAnyActive =
    activeFilterCount > 0 || (current.search && current.search.length > 0);

  return (
    <div
      className={`flex items-center gap-2 flex-wrap bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 ${className}`}
    >
      {/* Search */}
      {showSearch && (
        <div className="relative flex items-center">
          <Search
            size={14}
            className="absolute left-2.5 text-[var(--muted-foreground)] pointer-events-none"
          />
          <input
            type="text"
            value={current.search ?? ""}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
            className="h-8 pl-8 pr-3 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors min-w-[200px]"
            style={smallStyle}
          />
        </div>
      )}

      {/* Divider */}
      {showSearch && filters.length > 0 && (
        <div className="w-px h-5 bg-[var(--border)] flex-shrink-0" />
      )}

      {/* Filter icon */}
      {filters.length > 0 && (
        <SlidersHorizontal
          size={14}
          className="text-[var(--muted-foreground)] flex-shrink-0"
        />
      )}

      {/* Filter dropdowns */}
      {filters.map((f) => (
        <FilterDropdown
          key={f.key}
          config={f}
          value={current.filters[f.key] ?? null}
          onChange={handleFilter}
        />
      ))}

      {/* Active count badge */}
      {activeFilterCount > 0 && (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
          style={smallStyle}
        >
          {activeFilterCount} active
        </span>
      )}

      {/* Clear all */}
      {hasAnyActive && (
        <button
          type="button"
          onClick={handleClearAll}
          className="inline-flex items-center gap-1 h-7 px-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer ml-auto"
          style={smallStyle}
        >
          <X size={12} />
          Clear all
        </button>
      )}
    </div>
  );
}
