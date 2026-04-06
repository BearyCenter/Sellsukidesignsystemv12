import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerVariant = "default" | "outlined" | "filled" | "ghost";
export type DatePickerState = "default" | "error" | "success";
export type DatePickerMode = "single" | "range";

export interface DatePickerProps {
  /** Selected date (single mode) */
  value?: Date | null;
  /** Selected range (range mode) */
  rangeValue?: { start: Date | null; end: Date | null };
  /** Callback on date change (single) */
  onChange?: (date: Date | null) => void;
  /** Callback on range change */
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  /** Single or range mode */
  mode?: DatePickerMode;
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Visual size */
  size?: DatePickerSize;
  /** Visual variant */
  variant?: DatePickerVariant;
  /** Validation state */
  state?: DatePickerState;
  /** Disabled state */
  disabled?: boolean;
  /** Required field */
  required?: boolean;
  /** Allow clearing the value */
  clearable?: boolean;
  /** Show time picker */
  showTime?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Disabled specific dates */
  disabledDates?: Date[];
  /** Date format for display */
  format?: string;
  /** Show today button */
  showToday?: boolean;
  /** Custom footer element */
  footer?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const d = date.getTime();
  return d > start.getTime() && d < end.getTime();
}

function isDateDisabled(
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[]
): boolean {
  if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
  if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  return false;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
}

function formatDate(date: Date | null, showTime?: boolean): string {
  if (!date) return "";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  let str = `${dd}/${mm}/${yyyy}`;
  if (showTime) {
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    str += ` ${hh}:${min}`;
  }
  return str;
}

// ─── Size Config ──────────────────────────────────────────────────────────────

const sizeConfig: Record<
  DatePickerSize,
  { trigger: string; text: React.CSSProperties; icon: number; cell: string }
> = {
  sm: {
    trigger: "h-8 px-2.5",
    text: {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-label)",
    },
    icon: 14,
    cell: "w-7 h-7",
  },
  md: {
    trigger: "h-10 px-3",
    text: {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-label)",
    },
    icon: 16,
    cell: "w-9 h-9",
  },
  lg: {
    trigger: "h-12 px-4",
    text: {
      fontFamily: "var(--font-label)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-label)",
    },
    icon: 18,
    cell: "w-10 h-10",
  },
};

// ─── Variant Config ───────────────────────────────────────────────────────────

const variantStyles: Record<DatePickerVariant, string> = {
  default: "bg-input-background border border-border",
  outlined: "bg-transparent border-2 border-border",
  filled: "bg-muted/30 border border-transparent",
  ghost: "bg-transparent border border-transparent",
};

const stateRing: Record<DatePickerState, string> = {
  default: "focus-within:ring-2 focus-within:ring-ring/30 focus-within:border-primary",
  error: "ring-2 ring-destructive/30 border-destructive",
  success: "ring-2 ring-chart-2/30 border-chart-2",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function DatePicker({
  value = null,
  rangeValue,
  onChange,
  onRangeChange,
  mode = "single",
  label,
  placeholder,
  helperText,
  errorMessage,
  successMessage,
  size = "md",
  variant = "default",
  state = "default",
  disabled = false,
  required = false,
  clearable = false,
  showTime = false,
  minDate,
  maxDate,
  disabledDates,
  showToday = true,
  footer,
  fullWidth = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => value ?? new Date());
  const [view, setView] = useState<"days" | "months" | "years">("days");
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [hours, setHours] = useState(() => (value ? value.getHours() : 0));
  const [minutes, setMinutes] = useState(() => (value ? value.getMinutes() : 0));
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  const cfg = sizeConfig[size];

  // Calculate portal panel position relative to trigger (escapes overflow/transform containers)
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const updatePos = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const panelWidth = mode === "range" ? 560 : 300;
      const estimatedHeight = showTime ? 390 : 360;
      // Flip left if panel would overflow right edge
      const left =
        rect.left + panelWidth > window.innerWidth
          ? Math.max(8, window.innerWidth - panelWidth - 8)
          : rect.left;
      // Flip up if panel would overflow bottom edge
      const top =
        rect.bottom + 6 + estimatedHeight > window.innerHeight
          ? rect.top - estimatedHeight - 2
          : rect.bottom + 6;
      setPanelPos({ top, left });
    };
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, mode, showTime]);

  // Close on outside click — check both trigger wrapper and portal panel
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const inContainer = containerRef.current?.contains(target) ?? false;
      const inPanel = panelRef.current?.contains(target) ?? false;
      if (!inContainer && !inPanel) {
        setOpen(false);
        setView("days");
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Calendar days
  const calendarDays = useMemo(
    () => getCalendarDays(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const today = useMemo(() => new Date(), []);

  // Navigate
  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const prevYear = () => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
  const nextYear = () => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));

  // Select day
  const selectDay = useCallback(
    (day: Date) => {
      if (isDateDisabled(day, minDate, maxDate, disabledDates)) return;

      if (mode === "single") {
        let selected = new Date(day);
        if (showTime) {
          selected.setHours(hours, minutes);
        }
        onChange?.(selected);
        if (!showTime) {
          setOpen(false);
          setView("days");
        }
      } else {
        // Range mode
        const start = rangeValue?.start;
        const end = rangeValue?.end;
        if (!start || (start && end)) {
          onRangeChange?.({ start: day, end: null });
        } else {
          if (day < start) {
            onRangeChange?.({ start: day, end: start });
          } else {
            onRangeChange?.({ start, end: day });
          }
          setOpen(false);
          setView("days");
        }
      }
    },
    [mode, onChange, onRangeChange, rangeValue, minDate, maxDate, disabledDates, showTime, hours, minutes]
  );

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "single") onChange?.(null);
    else onRangeChange?.({ start: null, end: null });
  };

  const goToToday = () => {
    const now = new Date();
    setViewDate(now);
    if (mode === "single") {
      const selected = new Date(now);
      if (showTime) selected.setHours(hours, minutes);
      onChange?.(selected);
      if (!showTime) {
        setOpen(false);
        setView("days");
      }
    }
  };

  // Apply time
  const handleTimeApply = () => {
    if (value) {
      const updated = new Date(value);
      updated.setHours(hours, minutes);
      onChange?.(updated);
    }
    setOpen(false);
    setView("days");
  };

  // Display value
  const displayValue = useMemo(() => {
    if (mode === "single") return formatDate(value, showTime);
    if (rangeValue?.start && rangeValue?.end)
      return `${formatDate(rangeValue.start)} – ${formatDate(rangeValue.end)}`;
    if (rangeValue?.start) return `${formatDate(rangeValue.start)} – ...`;
    return "";
  }, [mode, value, rangeValue, showTime]);

  const hasValue = mode === "single" ? !!value : !!(rangeValue?.start || rangeValue?.end);

  // State-specific styles
  const stateIcon =
    state === "error" ? (
      <AlertCircle size={cfg.icon} className="text-destructive flex-shrink-0" />
    ) : state === "success" ? (
      <CheckCircle2 size={cfg.icon} className="text-chart-2 flex-shrink-0" />
    ) : null;

  const helperMsg =
    state === "error" ? errorMessage : state === "success" ? successMessage : helperText;
  const helperColor =
    state === "error" ? "text-destructive" : state === "success" ? "text-chart-2" : "text-muted-foreground";

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-label)",
    fontWeight: "var(--weight-label)",
  };

  const captionStyle: React.CSSProperties = {
    fontFamily: "var(--font-button)",
    fontSize: "var(--text-button)",
    fontWeight: "var(--weight-button)",
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily: "var(--font-button)",
    fontSize: "var(--text-button)",
    fontWeight: "var(--weight-button)",
  };

  // Year grid for year picker
  const yearGridStart = Math.floor(viewDate.getFullYear() / 12) * 12;

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="block text-foreground mb-1.5" style={labelStyle}>
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center gap-2 rounded-[var(--radius-md)] transition-all cursor-pointer
          ${cfg.trigger}
          ${variantStyles[variant]}
          ${stateRing[state]}
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50"}
        `}
        style={cfg.text}
      >
        <CalendarIcon size={cfg.icon} className="text-muted-foreground flex-shrink-0" />
        <span className={`flex-1 text-left truncate ${hasValue ? "text-foreground" : "text-muted-foreground"}`}>
          {hasValue ? displayValue : placeholder || (mode === "range" ? "Select date range…" : "Select date…")}
        </span>
        {stateIcon}
        {clearable && hasValue && !disabled && (
          <span
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={cfg.icon - 2} />
          </span>
        )}
      </button>

      {/* Helper text */}
      {helperMsg && (
        <p className={`mt-1.5 ${helperColor}`} style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}>
          {helperMsg}
        </p>
      )}

      {/* Dropdown calendar — rendered via portal to escape Modal overflow/transform stacking contexts */}
      {open && panelPos && createPortal(
        <div
          ref={panelRef}
          className="bg-popover border border-border rounded-[var(--radius-md)] shadow-elevation-sm overflow-hidden"
          style={{
            position: "fixed",
            zIndex: 9999,
            top: panelPos.top,
            left: panelPos.left,
            minWidth: mode === "range" ? "560px" : "300px",
          }}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-1">
              <button onClick={prevYear} className="p-1 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Previous year">
                <ChevronsLeft size={16} />
              </button>
              <button onClick={prevMonth} className="p-1 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Previous month">
                <ChevronLeft size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setView(view === "months" ? "days" : "months")}
                className="px-2 py-1 rounded-[var(--radius-sm)] hover:bg-muted text-foreground transition-colors cursor-pointer"
                style={buttonStyle}
              >
                {MONTHS[viewDate.getMonth()]}
              </button>
              <button
                onClick={() => setView(view === "years" ? "days" : "years")}
                className="px-2 py-1 rounded-[var(--radius-sm)] hover:bg-muted text-foreground transition-colors cursor-pointer"
                style={buttonStyle}
              >
                {viewDate.getFullYear()}
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button onClick={nextMonth} className="p-1 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Next month">
                <ChevronRight size={16} />
              </button>
              <button onClick={nextYear} className="p-1 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Next year">
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>

          {/* Day View */}
          {view === "days" && (
            <div className={`p-3 ${mode === "range" ? "flex gap-3" : ""}`}>
              {/* Render 1 or 2 month grids */}
              {(mode === "range" ? [0, 1] : [0]).map((offset) => {
                const monthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
                const days = getCalendarDays(monthDate.getFullYear(), monthDate.getMonth());
                return (
                  <div key={offset} className="flex-1">
                    {offset > 0 && (
                      <div className="text-center mb-2 text-foreground" style={buttonStyle}>
                        {MONTHS[monthDate.getMonth()]} {monthDate.getFullYear()}
                      </div>
                    )}
                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 mb-1">
                      {WEEKDAYS.map((wd) => (
                        <div
                          key={`${offset}-${wd}`}
                          className="text-center text-muted-foreground py-1"
                          style={captionStyle}
                        >
                          {wd}
                        </div>
                      ))}
                    </div>
                    {/* Day grid */}
                    <div className="grid grid-cols-7">
                      {days.map((day, i) => {
                        if (!day) return <div key={`empty-${offset}-${i}`} />;

                        const isDisabled = isDateDisabled(day, minDate, maxDate, disabledDates);
                        const isToday = isSameDay(day, today);
                        const isSelected =
                          mode === "single"
                            ? value && isSameDay(day, value)
                            : (rangeValue?.start && isSameDay(day, rangeValue.start)) ||
                              (rangeValue?.end && isSameDay(day, rangeValue.end));
                        const inRange =
                          mode === "range" &&
                          (isInRange(day, rangeValue?.start ?? null, rangeValue?.end ?? null) ||
                            (rangeValue?.start &&
                              !rangeValue?.end &&
                              hoverDate &&
                              isInRange(
                                day,
                                rangeValue.start,
                                hoverDate > rangeValue.start ? hoverDate : null
                              )));

                        return (
                          <button
                            key={`${offset}-${day.getTime()}`}
                            onClick={() => selectDay(day)}
                            onMouseEnter={() => mode === "range" && setHoverDate(day)}
                            disabled={isDisabled}
                            className={`
                              ${cfg.cell} flex items-center justify-center rounded-[var(--radius-sm)] transition-all cursor-pointer
                              ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-muted"}
                              ${isSelected ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                              ${inRange && !isSelected ? "bg-accent text-accent-foreground" : ""}
                              ${isToday && !isSelected ? "border border-primary text-primary" : ""}
                            `}
                            style={buttonStyle}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Month Picker View */}
          {view === "months" && (
            <div className="p-3 grid grid-cols-3 gap-2">
              {MONTHS.map((m, idx) => (
                <button
                  key={m}
                  onClick={() => {
                    setViewDate(new Date(viewDate.getFullYear(), idx, 1));
                    setView("days");
                  }}
                  className={`
                    py-2.5 rounded-[var(--radius-md)] transition-all cursor-pointer
                    ${viewDate.getMonth() === idx ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}
                  `}
                  style={buttonStyle}
                >
                  {m.substring(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* Year Picker View */}
          {view === "years" && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setViewDate(new Date(viewDate.getFullYear() - 12, viewDate.getMonth(), 1))}
                  className="p-1 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-foreground" style={buttonStyle}>
                  {yearGridStart} – {yearGridStart + 11}
                </span>
                <button
                  onClick={() => setViewDate(new Date(viewDate.getFullYear() + 12, viewDate.getMonth(), 1))}
                  className="p-1 rounded-[var(--radius-sm)] hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }, (_, i) => yearGridStart + i).map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setViewDate(new Date(yr, viewDate.getMonth(), 1));
                      setView("months");
                    }}
                    className={`
                      py-2.5 rounded-[var(--radius-md)] transition-all cursor-pointer
                      ${viewDate.getFullYear() === yr ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}
                      ${yr === today.getFullYear() && viewDate.getFullYear() !== yr ? "border border-primary text-primary" : ""}
                    `}
                    style={buttonStyle}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Time Picker (only in single mode) */}
          {showTime && mode === "single" && view === "days" && (
            <div className="px-4 py-3 border-t border-border flex items-center gap-3">
              <Clock size={14} className="text-muted-foreground" />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={23}
                  value={String(hours).padStart(2, "0")}
                  onChange={(e) => setHours(Math.max(0, Math.min(23, Number(e.target.value))))}
                  className="w-10 text-center bg-input-background border border-border rounded-[var(--radius-sm)] py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
                  style={buttonStyle}
                />
                <span className="text-muted-foreground" style={buttonStyle}>:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={String(minutes).padStart(2, "0")}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                  className="w-10 text-center bg-input-background border border-border rounded-[var(--radius-sm)] py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
                  style={buttonStyle}
                />
              </div>
              <button
                onClick={handleTimeApply}
                className="ml-auto px-3 py-1 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
                style={buttonStyle}
              >
                Apply
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-border bg-card flex items-center justify-between">
            {showToday ? (
              <button
                onClick={goToToday}
                className="text-primary hover:underline cursor-pointer"
                style={buttonStyle}
              >
                Today
              </button>
            ) : (
              <span />
            )}
            {footer ?? (
              <button
                onClick={() => { setOpen(false); setView("days"); }}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                style={buttonStyle}
              >
                Close
              </button>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}