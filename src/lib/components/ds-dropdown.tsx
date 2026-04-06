import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Check,
  Search,
  X,
  Loader2,
  AlertCircle,
  Plus,
  Inbox,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  avatar?: string;
  description?: string;
  group?: string;
}

export type DropdownSize = "sm" | "md" | "lg";
export type DropdownVariant = "default" | "outlined" | "filled" | "ghost";
export type DropdownState = "default" | "error" | "success" | "warning";

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  size?: DropdownSize;
  variant?: DropdownVariant;
  state?: DropdownState;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  maxSelections?: number;
  grouped?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  showSelectAll?: boolean;
  tagLimit?: number;
  creatable?: boolean;
  onCreateOption?: (label: string) => void;
  createLabel?: string;
  emptyState?: React.ReactNode;
  footer?: React.ReactNode;
  onSearch?: (query: string) => void;
  searchDebounce?: number;
  searchLoading?: boolean;
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
}

/* ─── Size Config ────────────────────────────────────────────────────────────── */

const sizeConfig: Record<
  DropdownSize,
  {
    trigger: string;
    option: string;
    optionStyle: React.CSSProperties;
    textStyle: React.CSSProperties;
    descStyle: React.CSSProperties;
    icon: number;
    avatarSize: number;
  }
> = {
  sm: {
    trigger: "h-9 px-[var(--Spacing--Spacing-xl)] gap-[var(--Spacing--Spacing-sm)]",
    option: "rounded-[var(--radius-sm)]",
    optionStyle: { padding: "var(--Spacing--Spacing-sm) var(--Spacing--Spacing-xl)" },
    textStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
    icon: 14,
    avatarSize: 20,
  },
  md: {
    trigger: "h-11 px-[var(--Spacing--Spacing-2xl)] gap-[var(--Spacing--Spacing-lg)]",
    option: "rounded-[var(--radius-sm)]",
    optionStyle: { padding: "var(--Spacing--Spacing-md) var(--Spacing--Spacing-2xl)" },
    textStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    icon: 16,
    avatarSize: 24,
  },
  lg: {
    trigger: "h-13 px-[var(--Spacing--Spacing-3xl)] gap-[var(--Spacing--Spacing-xl)]",
    option: "rounded-[var(--radius-sm)]",
    optionStyle: { padding: "var(--Spacing--Spacing-lg) var(--Spacing--Spacing-3xl)" },
    textStyle: { fontFamily: "var(--font-p)", fontSize: "var(--text-p)", fontWeight: "var(--weight-p)" },
    descStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    icon: 18,
    avatarSize: 28,
  },
};

const variantStyles: Record<DropdownVariant, { base: string; hover: string; focus: string }> = {
  default: {
    base: "border border-border bg-input-background",
    hover: "hover:border-foreground/30",
    focus: "ring-2 ring-ring/20 border-ring",
  },
  outlined: {
    base: "border-2 border-border bg-transparent",
    hover: "hover:border-foreground/40",
    focus: "ring-2 ring-ring/20 border-ring",
  },
  filled: {
    base: "border border-transparent bg-muted",
    hover: "hover:bg-muted/80",
    focus: "ring-2 ring-ring/20 border-ring bg-input-background",
  },
  ghost: {
    base: "border border-transparent bg-transparent",
    hover: "hover:bg-muted/50",
    focus: "ring-2 ring-ring/20 bg-input-background",
  },
};

const stateStyles: Record<DropdownState, string> = {
  default: "",
  error: "!border-destructive ring-destructive/20",
  success: "!border-chart-2 ring-chart-2/20",
  warning: "!border-chart-5 ring-chart-5/20",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select an option\u2026",
      label,
      helperText,
      errorMessage,
      successMessage,
      size = "md",
      variant = "default",
      state = "default",
      disabled = false,
      loading = false,
      searchable = false,
      clearable = false,
      multiple = false,
      maxSelections,
      grouped = false,
      required = false,
      id,
      className = "",
      showSelectAll = false,
      tagLimit,
      creatable = false,
      onCreateOption,
      createLabel = 'Create "{query}"',
      emptyState,
      footer,
      onSearch,
      searchDebounce = 300,
      searchLoading = false,
      renderOption: customRenderOption,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue ?? (multiple ? [] : "")
    );

    const value = controlledValue ?? internalValue;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

    const sc = sizeConfig[size];
    const vs = variantStyles[variant];

    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;
      const updatePos = () => {
        const rect = triggerRef.current!.getBoundingClientRect();
        setPanelPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
      };
      updatePos();
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("resize", updatePos);
      };
    }, [isOpen]);

    const handleSearchChange = useCallback(
      (query: string) => {
        setSearch(query);
        if (onSearch) {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            onSearch(query);
          }, searchDebounce);
        }
      },
      [onSearch, searchDebounce]
    );

    useEffect(() => {
      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    }, []);

    const filteredOptions = useMemo(() => {
      if (!search || onSearch) return options;
      return options.filter(
        (o) =>
          o.label.toLowerCase().includes(search.toLowerCase()) ||
          o.description?.toLowerCase().includes(search.toLowerCase())
      );
    }, [options, search, onSearch]);

    const groupedOptions = useMemo(() => {
      if (!grouped) return null;
      const groups: Record<string, DropdownOption[]> = {};
      filteredOptions.forEach((o) => {
        const g = o.group || "Other";
        if (!groups[g]) groups[g] = [];
        groups[g].push(o);
      });
      return groups;
    }, [filteredOptions, grouped]);

    const selectedLabels = useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return value
          .map((v) => options.find((o) => o.value === v)?.label)
          .filter(Boolean) as string[];
      }
      return options.find((o) => o.value === value)?.label
        ? [options.find((o) => o.value === value)!.label]
        : [];
    }, [value, options, multiple]);

    const isSelected = useCallback(
      (optValue: string) => {
        if (multiple && Array.isArray(value)) return value.includes(optValue);
        return value === optValue;
      },
      [value, multiple]
    );

    const handleSelect = useCallback(
      (optValue: string) => {
        if (multiple) {
          const arr = Array.isArray(value) ? [...value] : [];
          const idx = arr.indexOf(optValue);
          if (idx > -1) {
            arr.splice(idx, 1);
          } else {
            if (maxSelections && arr.length >= maxSelections) return;
            arr.push(optValue);
          }
          setInternalValue(arr);
          onChange?.(arr);
        } else {
          setInternalValue(optValue);
          onChange?.(optValue);
          setIsOpen(false);
        }
        setSearch("");
      },
      [value, multiple, maxSelections, onChange]
    );

    const allSelectableValues = useMemo(
      () => filteredOptions.filter((o) => !o.disabled).map((o) => o.value),
      [filteredOptions]
    );

    const allSelected = useMemo(() => {
      if (!multiple || !Array.isArray(value)) return false;
      return allSelectableValues.length > 0 && allSelectableValues.every((v) => value.includes(v));
    }, [multiple, value, allSelectableValues]);

    const someSelected = useMemo(() => {
      if (!multiple || !Array.isArray(value)) return false;
      return allSelectableValues.some((v) => value.includes(v)) && !allSelected;
    }, [multiple, value, allSelectableValues, allSelected]);

    const handleSelectAll = useCallback(() => {
      if (!multiple) return;
      if (allSelected) {
        const arr = Array.isArray(value) ? value.filter((v) => !allSelectableValues.includes(v)) : [];
        setInternalValue(arr);
        onChange?.(arr);
      } else {
        const arr = Array.isArray(value) ? [...value] : [];
        for (const v of allSelectableValues) {
          if (!arr.includes(v)) {
            if (maxSelections && arr.length >= maxSelections) break;
            arr.push(v);
          }
        }
        setInternalValue(arr);
        onChange?.(arr);
      }
    }, [multiple, allSelected, value, allSelectableValues, maxSelections, onChange]);

    const handleCreate = useCallback(() => {
      if (!search.trim()) return;
      onCreateOption?.(search.trim());
      setSearch("");
    }, [search, onCreateOption]);

    const showCreateOption = useMemo(() => {
      if (!creatable || !search.trim()) return false;
      return !options.some((o) => o.label.toLowerCase() === search.toLowerCase());
    }, [creatable, search, options]);

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const empty = multiple ? [] : "";
        setInternalValue(empty);
        onChange?.(empty);
      },
      [multiple, onChange]
    );

    const flatOptions = grouped
      ? Object.values(groupedOptions || {}).flat()
      : filteredOptions;

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || loading) return;
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            } else {
              setHighlightedIndex((i) =>
                i < flatOptions.length - 1 ? i + 1 : 0
              );
            }
            break;
          case "ArrowUp":
            e.preventDefault();
            setHighlightedIndex((i) =>
              i > 0 ? i - 1 : flatOptions.length - 1
            );
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            if (isOpen && highlightedIndex >= 0) {
              const opt = flatOptions[highlightedIndex];
              if (opt && !opt.disabled) handleSelect(opt.value);
            } else {
              setIsOpen(true);
            }
            break;
          case "Escape":
            setIsOpen(false);
            triggerRef.current?.focus();
            break;
        }
      },
      [disabled, loading, isOpen, highlightedIndex, flatOptions, handleSelect]
    );

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          listRef.current &&
          !listRef.current.contains(target)
        ) {
          setIsOpen(false);
          setSearch("");
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
      if (isOpen && searchable) {
        setTimeout(() => searchRef.current?.focus(), 50);
      }
      if (isOpen) setHighlightedIndex(-1);
    }, [isOpen, searchable]);

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : !!value;

    const computedState = errorMessage ? "error" : state;

    const renderTags = () => {
      const labels = selectedLabels;
      const limit = tagLimit && tagLimit > 0 ? tagLimit : labels.length;
      const visible = labels.slice(0, limit);
      const remaining = labels.length - visible.length;

      return (
        <span className="flex flex-wrap gap-1">
          {visible.map((l) => (
            <span
              key={l}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--Colors--Background--bg-brand-secondary)] text-[var(--Colors--Text--text-brand-primary)]"
              style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
            >
              {l}
              <X
                size={10}
                className="cursor-pointer hover:text-destructive transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const opt = options.find((o) => o.label === l);
                  if (opt) handleSelect(opt.value);
                }}
              />
            </span>
          ))}
          {remaining > 0 && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] bg-muted text-muted-foreground"
              style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
            >
              +{remaining} more
            </span>
          )}
        </span>
      );
    };

    const renderOptionNode = (opt: DropdownOption, idx: number) => {
      const selected = isSelected(opt.value);

      if (customRenderOption) {
        return (
          <button
            key={opt.value}
            type="button"
            role="option"
            aria-selected={selected}
            disabled={opt.disabled}
            className={`w-full ${sc.option} transition-colors cursor-pointer
              ${selected ? "bg-[var(--Colors--Background--bg-brand-secondary)]" : ""}
              ${highlightedIndex === idx && !selected ? "bg-[var(--Colors--Background--bg-primary_hover)]" : ""}
              ${opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[var(--Colors--Background--bg-primary_hover)]"}
            `}
            style={sc.optionStyle}
            onClick={() => !opt.disabled && handleSelect(opt.value)}
            onMouseEnter={() => setHighlightedIndex(idx)}
          >
            {customRenderOption(opt, selected)}
          </button>
        );
      }

      return (
        <button
          key={opt.value}
          type="button"
          role="option"
          aria-selected={selected}
          disabled={opt.disabled}
          className={`w-full flex items-center gap-[var(--Spacing--Spacing-lg)] ${sc.option} transition-colors cursor-pointer
            ${selected ? "bg-[var(--Colors--Background--bg-brand-secondary)] text-[var(--Colors--Text--text-brand-primary)]" : ""}
            ${highlightedIndex === idx && !selected ? "bg-[var(--Colors--Background--bg-primary_hover)]" : ""}
            ${opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[var(--Colors--Background--bg-primary_hover)]"}
          `}
          style={{ ...sc.optionStyle, ...sc.textStyle }}
          onClick={() => !opt.disabled && handleSelect(opt.value)}
          onMouseEnter={() => setHighlightedIndex(idx)}
        >
          {multiple && (
            <span
              className={`flex-shrink-0 w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center transition-colors
                ${selected ? "bg-primary border-primary" : "border-border"}
              `}
            >
              {selected && <Check size={10} className="text-primary-foreground" />}
            </span>
          )}
          {opt.avatar && (
            <img
              src={opt.avatar}
              alt=""
              className="flex-shrink-0 rounded-full object-cover"
              style={{ width: sc.avatarSize, height: sc.avatarSize }}
            />
          )}
          {opt.icon && <span className="flex-shrink-0">{opt.icon}</span>}
          <span className="flex-1 text-left">
            <span className="block">{opt.label}</span>
            {opt.description && (
              <span
                className="block text-muted-foreground"
                style={{ marginTop: "var(--Spacing--Spacing-xxs)", ...sc.descStyle }}
              >
                {opt.description}
              </span>
            )}
          </span>
          {!multiple && selected && (
            <Check size={sc.icon} className="text-primary flex-shrink-0" />
          )}
        </button>
      );
    };

    let globalIdx = 0;

    return (
      <div ref={ref} className={`relative w-full ${className}`} id={id}>
        {label && (
          <label
            className="block mb-1.5 text-foreground"
            style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
          >
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={disabled || loading}
          onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`w-full flex items-center rounded-[var(--radius-md)] transition-all duration-150 ${sc.trigger}
            ${vs.base}
            ${!disabled && !loading ? vs.hover : ""}
            ${isOpen ? vs.focus : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${loading ? "opacity-70 cursor-wait" : ""}
            ${stateStyles[computedState]}
          `}
          style={sc.textStyle}
        >
          {loading ? <Loader2 size={sc.icon} className="animate-spin text-muted-foreground" /> : null}

          <span className={`flex-1 text-left min-w-0 ${multiple ? "" : "truncate"} ${!hasValue ? "text-muted-foreground" : "text-foreground"}`}>
            {hasValue ? (multiple ? renderTags() : selectedLabels[0]) : placeholder}
          </span>

          {clearable && hasValue && !disabled && (
            <X
              size={sc.icon}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              onClick={handleClear}
            />
          )}

          <ChevronDown
            size={sc.icon}
            className={`flex-shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen &&
          createPortal(
            <div
              ref={listRef}
              role="listbox"
              className="fixed z-[9999] bg-popover border border-border rounded-[var(--radius)] shadow-elevation-sm overflow-hidden"
              style={{ top: panelPos.top, left: panelPos.left, width: panelPos.width || "auto" }}
            >
              {searchable && (
                <div className="p-2 border-b border-border">
                  <div className="relative">
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      ref={searchRef}
                      type="text"
                      value={search}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search\u2026"
                      className="w-full pl-8 pr-3 py-1.5 bg-background border border-border rounded-[var(--radius-sm)] outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring/20 transition-colors"
                      style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              )}

              {multiple && showSelectAll && filteredOptions.length > 0 && (
                <button
                  type="button"
                  className={`w-full flex items-center gap-[var(--Spacing--Spacing-lg)] ${sc.option} border-b border-border transition-colors hover:bg-[var(--Colors--Background--bg-primary_hover)] cursor-pointer`}
                  style={{ ...sc.optionStyle, ...sc.textStyle }}
                  onClick={handleSelectAll}
                >
                  <span
                    className={`flex-shrink-0 w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center transition-colors
                      ${allSelected ? "bg-primary border-primary" : someSelected ? "bg-primary/50 border-primary" : "border-border"}
                    `}
                  >
                    {allSelected && <Check size={10} className="text-primary-foreground" />}
                    {someSelected && !allSelected && <span className="w-2 h-0.5 bg-primary-foreground rounded-full" />}
                  </span>
                  <span className="text-foreground">{allSelected ? "Deselect All" : "Select All"}</span>
                  <span
                    className="ml-auto text-muted-foreground"
                    style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}
                  >
                    {Array.isArray(value) ? value.length : 0}/{filteredOptions.filter((o) => !o.disabled).length}
                  </span>
                </button>
              )}

              <div className="max-h-60 overflow-y-auto p-1">
                {searchLoading ? (
                  <div className="flex items-center justify-center py-6 gap-2 text-muted-foreground">
                    <Loader2 size={16} className="animate-spin" />
                    <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>Searching\u2026</span>
                  </div>
                ) : filteredOptions.length === 0 && !showCreateOption ? (
                  emptyState ? (
                    <div className="py-4 px-3">{emptyState}</div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground flex flex-col items-center gap-2">
                      <Inbox size={24} className="opacity-40" />
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>No options found</span>
                    </div>
                  )
                ) : grouped && groupedOptions ? (
                  Object.entries(groupedOptions).map(([group, opts]) => (
                    <div key={group}>
                      <div
                        className="px-3 py-1.5 text-muted-foreground"
                        style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
                      >
                        {group}
                      </div>
                      {opts.map((opt) => {
                        const node = renderOptionNode(opt, globalIdx);
                        globalIdx++;
                        return node;
                      })}
                    </div>
                  ))
                ) : (
                  filteredOptions.map((opt, i) => renderOptionNode(opt, i))
                )}

                {showCreateOption && (
                  <button
                    type="button"
                    className={`w-full flex items-center gap-[var(--Spacing--Spacing-lg)] ${sc.option} text-primary transition-colors hover:bg-[var(--Colors--Background--bg-primary_hover)] cursor-pointer`}
                    style={{ ...sc.optionStyle, ...sc.textStyle }}
                    onClick={handleCreate}
                  >
                    <Plus size={sc.icon} className="flex-shrink-0" />
                    <span>{createLabel.replace("{query}", search.trim())}</span>
                  </button>
                )}
              </div>

              {(footer || (multiple && maxSelections)) && (
                <div className="border-t border-border">
                  {multiple && maxSelections && (
                    <div
                      className="px-3 py-2 text-muted-foreground"
                      style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
                    >
                      {Array.isArray(value) ? value.length : 0} / {maxSelections} selected
                    </div>
                  )}
                  {footer && <div className="px-3 py-2">{footer}</div>}
                </div>
              )}
            </div>,
            document.body
          )}

        {(helperText || errorMessage || successMessage) && (
          <div className="mt-1.5 flex items-center gap-1">
            {computedState === "error" && <AlertCircle size={12} className="text-destructive flex-shrink-0" />}
            <span
              className={`${
                computedState === "error"
                  ? "text-destructive"
                  : computedState === "success"
                  ? "text-chart-2"
                  : "text-muted-foreground"
              }`}
              style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" }}
            >
              {errorMessage || successMessage || helperText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
