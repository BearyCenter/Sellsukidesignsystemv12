import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";

export type SearchSize = "sm" | "md" | "lg";
export type SearchVariant = "default" | "outlined" | "filled";

interface SearchSuggestion {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  size?: SearchSize;
  variant?: SearchVariant;
  loading?: boolean;
  suggestions?: SearchSuggestion[];
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  clearable?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  debounce?: number;
  className?: string;
}

const sizeMap: Record<SearchSize, { input: string; icon: number; style: React.CSSProperties }> = {
  sm: { input: "h-8 px-8", icon: 14, style: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" } },
  md: { input: "h-10 px-9", icon: 16, style: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" } },
  lg: { input: "h-12 px-10", icon: 18, style: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" } },
};

const variantMap: Record<SearchVariant, string> = {
  default: "bg-card border border-border focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
  outlined: "bg-transparent border-2 border-border focus-within:border-primary",
  filled: "bg-muted/50 border border-transparent focus-within:border-ring focus-within:bg-card",
};

export function SearchField({
  value: controlled,
  onChange,
  onSearch,
  placeholder = "Search...",
  size = "md",
  variant = "default",
  loading = false,
  suggestions = [],
  onSuggestionSelect,
  clearable = true,
  disabled = false,
  autoFocus = false,
  debounce = 0,
  className = "",
}: SearchFieldProps) {
  const [internal, setInternal] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const val = controlled ?? internal;
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const s = sizeMap[size];

  const setValue = useCallback((v: string) => {
    if (controlled === undefined) setInternal(v);
    onChange?.(v);
    if (debounce > 0) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onSearch?.(v), debounce);
    }
  }, [controlled, onChange, onSearch, debounce]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (highlightIdx >= 0 && suggestions[highlightIdx]) {
        onSuggestionSelect?.(suggestions[highlightIdx]);
        setShowSuggestions(false);
      } else {
        onSearch?.(val);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && val.length > 0);
    setHighlightIdx(-1);
  }, [suggestions, val]);

  const labelStyle: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" };
  const smallLabelStyle: React.CSSProperties = { fontFamily: "var(--font-label)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`relative rounded-[var(--radius-md)] transition-all ${variantMap[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
        {/* Search icon */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Search size={s.icon} />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={val}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && val.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`w-full ${s.input} rounded-[var(--radius-md)] bg-transparent outline-none text-foreground placeholder:text-muted-foreground`}
          style={s.style}
        />

        {/* Right side: loading/clear */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {loading && <Loader2 size={s.icon} className="animate-spin text-muted-foreground" />}
          {clearable && val && !loading && (
            <button
              onClick={() => { setValue(""); inputRef.current?.focus(); }}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={s.icon} />
            </button>
          )}
        </span>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-[var(--radius-md)] shadow-elevation-sm z-50 overflow-hidden max-h-64 overflow-y-auto" style={{ padding: "var(--Spacing--Spacing-sm)" }}>
          {suggestions.map((sug, idx) => (
            <button
              key={sug.id}
              onClick={() => { onSuggestionSelect?.(sug); setShowSuggestions(false); }}
              className={`w-full text-left flex items-center rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
                idx === highlightIdx ? "bg-[var(--Colors--Background--bg-brand-secondary)]" : "hover:bg-[var(--Colors--Background--bg-primary_hover)]"
              }`}
              style={{ padding: "var(--Spacing--Spacing-md) var(--Spacing--Spacing-2xl)", gap: "var(--Spacing--Spacing-lg)" }}
            >
              {sug.icon && <span className="text-muted-foreground flex-shrink-0">{sug.icon}</span>}
              <div className="min-w-0 flex-1">
                <span className="text-foreground block truncate" style={labelStyle}>{sug.label}</span>
                {sug.description && <span className="text-muted-foreground block truncate" style={{ marginTop: "var(--Spacing--Spacing-xxs)", ...smallLabelStyle }}>{sug.description}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}