import React, { useState, useRef, useEffect } from "react";
import { Clock, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TimePickerSize = "sm" | "md" | "lg";
export type TimePickerFormat = "12h" | "24h";

export interface TimeValue {
  hours: number;    // 0–23
  minutes: number;  // 0–59
  seconds?: number; // 0–59 (optional)
}

export interface TimePickerProps {
  /** Current time value */
  value?: TimeValue;
  /** Change handler */
  onChange?: (time: TimeValue) => void;
  /** 12-hour or 24-hour format */
  format?: TimePickerFormat;
  /** Show seconds column */
  showSeconds?: boolean;
  /** Minute step (default: 1) */
  minuteStep?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Component size */
  size?: TimePickerSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

export interface DateTimePickerProps {
  /** Combined date+time value */
  value?: Date;
  /** Change handler */
  onChange?: (date: Date) => void;
  /** Time format */
  format?: TimePickerFormat;
  /** Show seconds */
  showSeconds?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Component size */
  size?: TimePickerSize;
  /** Min date */
  minDate?: Date;
  /** Max date */
  maxDate?: Date;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatTime(v: TimeValue, fmt: TimePickerFormat, showSeconds: boolean): string {
  if (fmt === "12h") {
    const h12 = v.hours % 12 || 12;
    const ampm = v.hours < 12 ? "AM" : "PM";
    return showSeconds
      ? `${pad2(h12)}:${pad2(v.minutes)}:${pad2(v.seconds ?? 0)} ${ampm}`
      : `${pad2(h12)}:${pad2(v.minutes)} ${ampm}`;
  }
  return showSeconds
    ? `${pad2(v.hours)}:${pad2(v.minutes)}:${pad2(v.seconds ?? 0)}`
    : `${pad2(v.hours)}:${pad2(v.minutes)}`;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-p)",
};

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
  fontVariantNumeric: "tabular-nums",
};

const sizeMap: Record<TimePickerSize, string> = {
  sm: "h-8 px-3",
  md: "h-10 px-3.5",
  lg: "h-11 px-4",
};

// ─── Scroll Column ────────────────────────────────────────────────────────────

function ScrollColumn({
  options,
  value,
  onChange,
  label,
}: {
  options: number[];
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const selected = options.indexOf(value);

  return (
    <div className="flex flex-col items-center gap-1 w-12">
      <button
        type="button"
        onClick={() => {
          const prev = options[(selected - 1 + options.length) % options.length];
          onChange(prev);
        }}
        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ChevronUp size={14} />
      </button>

      <div className="text-foreground w-full text-center px-1 py-1 rounded-[var(--radius-md)] bg-muted/20" style={monoStyle}>
        {pad2(value)}
      </div>

      <button
        type="button"
        onClick={() => {
          const next = options[(selected + 1) % options.length];
          onChange(next);
        }}
        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ChevronDown size={14} />
      </button>

      <span className="text-muted-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)" }}>
        {label}
      </span>
    </div>
  );
}

// ─── TimePicker ───────────────────────────────────────────────────────────────

export function TimePicker({
  value,
  onChange,
  format = "24h",
  showSeconds = false,
  minuteStep = 1,
  placeholder = "Select time",
  size = "md",
  disabled = false,
  className = "",
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<TimeValue>({ hours: 0, minutes: 0, seconds: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const time = value ?? internal;

  const hourOptions =
    format === "12h"
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  );
  const secondOptions = Array.from({ length: 60 }, (_, i) => i);
  const ampmOptions: ("AM" | "PM")[] = ["AM", "PM"];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function update(partial: Partial<TimeValue>) {
    const next = { ...time, ...partial };
    setInternal(next);
    onChange?.(next);
  }

  const displayText = formatTime(time, format, showSeconds);
  const hasValue = value !== undefined || internal.hours !== 0 || internal.minutes !== 0;

  // 12h mode: display hour in 1-12 range
  const displayHour = format === "12h" ? (time.hours % 12 || 12) : time.hours;
  const isAM = time.hours < 12;

  function setHour12(h: number, am: boolean) {
    let h24 = h % 12;
    if (!am) h24 += 12;
    update({ hours: h24 });
  }

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={[
          "flex items-center gap-2 border border-border bg-card rounded-[var(--radius-md)] transition-colors min-w-[120px]",
          sizeMap[size],
          open ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
        style={labelStyle}
      >
        <Clock size={14} className="text-muted-foreground flex-shrink-0" />
        <span className={hasValue ? "text-foreground" : "text-muted-foreground"}>
          {hasValue ? displayText : placeholder}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-1 z-50 bg-card border border-border rounded-[var(--radius-md)] shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] p-4">
          <div className="flex items-start gap-2">
            {/* Hours */}
            {format === "12h" ? (
              <ScrollColumn
                options={hourOptions}
                value={displayHour}
                onChange={(h) => setHour12(h, isAM)}
                label="Hour"
              />
            ) : (
              <ScrollColumn
                options={hourOptions}
                value={time.hours}
                onChange={(h) => update({ hours: h })}
                label="Hour"
              />
            )}

            <div className="text-muted-foreground text-lg mt-3" style={monoStyle}>:</div>

            {/* Minutes */}
            <ScrollColumn
              options={minuteOptions}
              value={time.minutes}
              onChange={(m) => update({ minutes: m })}
              label="Min"
            />

            {/* Seconds */}
            {showSeconds && (
              <>
                <div className="text-muted-foreground text-lg mt-3" style={monoStyle}>:</div>
                <ScrollColumn
                  options={secondOptions}
                  value={time.seconds ?? 0}
                  onChange={(s) => update({ seconds: s })}
                  label="Sec"
                />
              </>
            )}

            {/* AM/PM */}
            {format === "12h" && (
              <div className="flex flex-col gap-1 ml-1">
                <div className="h-5" />
                {ampmOptions.map((ap) => (
                  <button
                    key={ap}
                    type="button"
                    onClick={() => setHour12(displayHour, ap === "AM")}
                    className={[
                      "px-2 py-1 rounded-[var(--radius-md)] transition-colors",
                      (ap === "AM") === isAM
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted/30 cursor-pointer",
                    ].join(" ")}
                    style={monoStyle}
                  >
                    {ap}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

TimePicker.displayName = "TimePicker";

// ─── DateTimePicker ───────────────────────────────────────────────────────────

export function DateTimePicker({
  value,
  onChange,
  format = "24h",
  showSeconds = false,
  placeholder = "Select date & time",
  size = "md",
  minDate,
  maxDate,
  disabled = false,
  className = "",
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<Date>(value ?? new Date());
  const ref = useRef<HTMLDivElement>(null);

  const date = value ?? internal;

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(date.getMonth());
  const [viewYear, setViewYear] = useState(date.getFullYear());

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function updateDate(d: Date) {
    setInternal(d);
    onChange?.(d);
  }

  function selectDay(day: Date) {
    const next = new Date(day);
    next.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), 0);
    updateDate(next);
  }

  function selectTime(t: TimeValue) {
    const next = new Date(date);
    next.setHours(t.hours, t.minutes, t.seconds ?? 0, 0);
    updateDate(next);
  }

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DAYS_HEADER = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  function getDaysGrid() {
    const days: Date[] = [];
    const first = new Date(viewYear, viewMonth, 1);
    const start = new Date(first);
    start.setDate(start.getDate() - start.getDay());
    for (let i = 0; i < 42; i++) {
      days.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return days;
  }

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

  const displayText = `${date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} ${formatTime(
    { hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() },
    format,
    showSeconds
  )}`;

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={[
          "flex items-center gap-2 border border-border bg-card rounded-[var(--radius-md)] transition-colors min-w-[200px]",
          sizeMap[size],
          open ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
        style={labelStyle}
      >
        <Clock size={14} className="text-muted-foreground flex-shrink-0" />
        <span className="text-foreground">{displayText}</span>
      </button>

      {open && (
        <div className="absolute top-full mt-1 z-50 bg-card border border-border rounded-[var(--radius-md)] shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] p-4 flex gap-6">
          {/* Calendar side */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => {
                  if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
                  else setViewMonth(viewMonth - 1);
                }}
                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-muted/40 text-muted-foreground cursor-pointer"
              >
                <ChevronLeft size={14} />
              </button>
              <span style={btnLabelStyle}>{MONTHS[viewMonth]} {viewYear}</span>
              <button
                type="button"
                onClick={() => {
                  if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
                  else setViewMonth(viewMonth + 1);
                }}
                className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-muted/40 text-muted-foreground cursor-pointer"
              >
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
              {DAYS_HEADER.map((d) => (
                <div key={d} className="text-center text-muted-foreground" style={captionStyle}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5">
              {getDaysGrid().map((day, i) => {
                const isCurrentMonth = day.getMonth() === viewMonth;
                const isSelected = value
                  ? day.toDateString() === value.toDateString()
                  : day.toDateString() === internal.toDateString();
                const isToday = day.toDateString() === today.toDateString();
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectDay(day)}
                    className={[
                      "h-7 w-full text-center transition-colors rounded-[var(--radius-md)] cursor-pointer",
                      !isCurrentMonth ? "text-muted-foreground/40" : "",
                      isSelected ? "bg-primary text-primary-foreground font-semibold" :
                        isToday ? "border border-primary text-primary" :
                        "hover:bg-muted/40",
                    ].filter(Boolean).join(" ")}
                    style={captionStyle}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-border" />

          {/* Time side */}
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground" style={captionStyle}>Time</span>
            <TimePicker
              value={{ hours: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds() }}
              onChange={selectTime}
              format={format}
              showSeconds={showSeconds}
              size="sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

DateTimePicker.displayName = "DateTimePicker";
