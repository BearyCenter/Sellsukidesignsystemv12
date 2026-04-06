import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DateRangePickerSize = "sm" | "md" | "lg";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export type DateRangePreset = "today" | "yesterday" | "last7" | "last30" | "thisMonth" | "lastMonth" | "custom";

export interface DateRangePresetOption {
  label: string;
  value: DateRangePreset;
  range: () => DateRange;
}

export interface DateRangePickerProps {
  /** Current range */
  value?: DateRange;
  /** Change handler */
  onChange?: (range: DateRange, preset?: DateRangePreset) => void;
  /** Available presets (default: today, last7, last30, custom) */
  presets?: DateRangePreset[];
  /** Placeholder text */
  placeholder?: string;
  /** Component size */
  size?: DateRangePickerSize;
  /** Min selectable date */
  minDate?: Date;
  /** Max selectable date */
  maxDate?: Date;
  /** Show clear button */
  clearable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

// ─── Presets ─────────────────────────────────────────────────────────────────

function startOfDay(d: Date) {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function endOfDay(d: Date) {
  const r = new Date(d);
  r.setHours(23, 59, 59, 999);
  return r;
}

const ALL_PRESETS: DateRangePresetOption[] = [
  {
    label: "Today",
    value: "today",
    range: () => {
      const today = new Date();
      return { from: startOfDay(today), to: endOfDay(today) };
    },
  },
  {
    label: "Yesterday",
    value: "yesterday",
    range: () => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return { from: startOfDay(d), to: endOfDay(d) };
    },
  },
  {
    label: "Last 7 days",
    value: "last7",
    range: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 6);
      return { from: startOfDay(from), to: endOfDay(to) };
    },
  },
  {
    label: "Last 30 days",
    value: "last30",
    range: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 29);
      return { from: startOfDay(from), to: endOfDay(to) };
    },
  },
  {
    label: "This month",
    value: "thisMonth",
    range: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from: startOfDay(from), to: endOfDay(to) };
    },
  },
  {
    label: "Last month",
    value: "lastMonth",
    range: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = new Date(now.getFullYear(), now.getMonth(), 0);
      return { from: startOfDay(from), to: endOfDay(to) };
    },
  },
  {
    label: "Custom range",
    value: "custom",
    range: () => ({ from: null, to: null }),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function formatDate(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(start.getDate() - start.getDay());
  for (let i = 0; i < 42; i++) {
    days.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return days;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-p)",
};

const captionStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const btnLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

const sizeMap: Record<DateRangePickerSize, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-3.5",
  lg: "h-11 px-4",
};

// ─── Calendar Panel ───────────────────────────────────────────────────────────

function CalendarPanel({
  month,
  year,
  range,
  hovered,
  onHover,
  onSelect,
  onPrevMonth,
  onNextMonth,
  minDate,
  maxDate,
}: {
  month: number;
  year: number;
  range: DateRange;
  hovered: Date | null;
  onHover: (d: Date | null) => void;
  onSelect: (d: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  const days = getDaysInMonth(year, month);

  function isInRange(day: Date): boolean {
    const from = range.from;
    const to = range.to ?? hovered;
    if (!from || !to) return false;
    const [start, end] = from <= to ? [from, to] : [to, from];
    return day > start && day < end;
  }

  function isDisabled(day: Date): boolean {
    if (minDate && day < startOfDay(minDate)) return true;
    if (maxDate && day > endOfDay(maxDate)) return true;
    return false;
  }

  return (
    <div className="select-none flex-1 min-w-0">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onPrevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-muted/40 text-muted-foreground cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-foreground" style={btnLabelStyle}>
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-muted/40 text-muted-foreground cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="h-8 flex items-center justify-center text-muted-foreground" style={captionStyle}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const isCurrentMonth = day.getMonth() === month;
          const isFrom = range.from ? isSameDay(day, range.from) : false;
          const isTo = range.to ? isSameDay(day, range.to) : (hovered && range.from ? isSameDay(day, hovered) : false);
          const inRange = isInRange(day);
          const disabled = isDisabled(day);

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onMouseEnter={() => !disabled && onHover(day)}
              onMouseLeave={() => onHover(null)}
              onClick={() => !disabled && onSelect(day)}
              className={[
                "h-8 w-full flex items-center justify-center text-center transition-colors",
                disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer",
                !isCurrentMonth ? "text-muted-foreground/40" : "",
                isFrom || isTo
                  ? "bg-primary text-primary-foreground rounded-[var(--radius-md)] font-semibold"
                  : inRange
                  ? "bg-primary/10 text-primary"
                  : !disabled
                  ? "hover:bg-muted/40 rounded-[var(--radius-md)]"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={captionStyle}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

export function DateRangePicker({
  value,
  onChange,
  presets = ["today", "last7", "last30", "custom"],
  placeholder = "Select date range",
  size = "md",
  minDate,
  maxDate,
  clearable = true,
  disabled = false,
  className = "",
}: DateRangePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [internalRange, setInternalRange] = useState<DateRange>({ from: null, to: null });
  const [hovered, setHovered] = useState<Date | null>(null);
  const [activePreset, setActivePreset] = useState<DateRangePreset | undefined>(undefined);
  const [leftMonth, setLeftMonth] = useState(today.getMonth());
  const [leftYear, setLeftYear] = useState(today.getFullYear());
  const [selecting, setSelecting] = useState<"from" | "to">("from");
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const range = value ?? internalRange;

  // Sync right month = left month + 1
  const rightMonth = (leftMonth + 1) % 12;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Compute fixed position from trigger element (escapes overflow:hidden / overflow-y:auto containers)
  useEffect(() => {
    if (!open || !triggerRef.current) return;
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
  }, [open]);

  function handlePreset(preset: DateRangePresetOption) {
    if (preset.value === "custom") {
      setActivePreset("custom");
      return;
    }
    const r = preset.range();
    setInternalRange(r);
    onChange?.(r, preset.value);
    setActivePreset(preset.value);
    setOpen(false);
  }

  function handleSelect(day: Date) {
    if (selecting === "from") {
      setInternalRange({ from: startOfDay(day), to: null });
      setSelecting("to");
    } else {
      const from = internalRange.from!;
      const [f, t] = day >= from ? [from, endOfDay(day)] : [startOfDay(day), endOfDay(from)];
      const next: DateRange = { from: f, to: t };
      setInternalRange(next);
      onChange?.(next, "custom");
      setActivePreset("custom");
      setSelecting("from");
      setOpen(false);
    }
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    const empty: DateRange = { from: null, to: null };
    setInternalRange(empty);
    onChange?.(empty, undefined);
    setActivePreset(undefined);
  }

  const displayText =
    range.from && range.to
      ? `${formatDate(range.from)} – ${formatDate(range.to)}`
      : range.from
      ? `${formatDate(range.from)} – ...`
      : "";

  const availablePresets = ALL_PRESETS.filter((p) => presets.includes(p.value));

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={[
          "flex items-center gap-2 border border-border bg-card text-left rounded-[var(--radius-md)] transition-colors w-full min-w-[260px]",
          sizeMap[size],
          open ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
        style={labelStyle}
      >
        <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
        <span className={displayText ? "text-foreground flex-1" : "text-muted-foreground flex-1"}>
          {displayText || placeholder}
        </span>
        {clearable && range.from && (
          <span
            role="button"
            tabIndex={0}
            onClick={handleClear}
            onKeyDown={(e) => e.key === "Enter" && handleClear(e as unknown as React.MouseEvent)}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex-shrink-0"
          >
            <X size={12} />
          </span>
        )}
      </button>

      {/* Dropdown panel — portal to document.body to escape overflow:auto containers (AppShell main) */}
      {open && createPortal(
        <div
          className="fixed z-[9999] bg-card border border-border rounded-[var(--radius-md)] shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] flex overflow-y-auto"
          style={{ top: panelPos.top, left: panelPos.left, minWidth: "620px", maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Presets sidebar */}
          <div className="w-36 border-r border-border py-2 flex flex-col gap-0.5 flex-shrink-0">
            {availablePresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handlePreset(preset)}
                className={[
                  "w-full text-left px-3 py-1.5 rounded-none transition-colors",
                  activePreset === preset.value
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted/30",
                ].join(" ")}
                style={btnLabelStyle}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Dual calendars */}
          <div className="flex gap-4 p-4 flex-1 min-w-0">
            <CalendarPanel
              month={leftMonth}
              year={leftYear}
              range={range}
              hovered={hovered}
              onHover={setHovered}
              onSelect={handleSelect}
              onPrevMonth={() => {
                if (leftMonth === 0) { setLeftMonth(11); setLeftYear(leftYear - 1); }
                else setLeftMonth(leftMonth - 1);
              }}
              onNextMonth={() => {
                if (leftMonth === 11) { setLeftMonth(0); setLeftYear(leftYear + 1); }
                else setLeftMonth(leftMonth + 1);
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
            <div className="w-px bg-border" />
            <CalendarPanel
              month={rightMonth}
              year={rightYear}
              range={range}
              hovered={hovered}
              onHover={setHovered}
              onSelect={handleSelect}
              onPrevMonth={() => {
                if (leftMonth === 0) { setLeftMonth(11); setLeftYear(leftYear - 1); }
                else setLeftMonth(leftMonth - 1);
              }}
              onNextMonth={() => {
                if (leftMonth === 11) { setLeftMonth(0); setLeftYear(leftYear + 1); }
                else setLeftMonth(leftMonth + 1);
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>
      , document.body)}
    </div>
  );
}

DateRangePicker.displayName = "DateRangePicker";
