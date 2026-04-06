import React, { useState, useRef, useEffect } from "react";

export type TabVariant = "default" | "bordered" | "pills" | "underline";
export type TabSize = "sm" | "md" | "lg";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
  disabled?: boolean;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  variant?: TabVariant;
  size?: TabSize;
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles: Record<TabSize, React.CSSProperties> = {
  sm: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)", padding: "6px 12px" },
  md: { fontFamily: "var(--font-label)", fontSize: "var(--text-p)",    fontWeight: "var(--weight-p)",     padding: "8px 16px" },
  lg: { fontFamily: "var(--font-label)", fontSize: "var(--text-h4)",   fontWeight: "var(--weight-p)",     padding: "10px 20px" },
};

export function Tabs({ tabs = [], variant = "default", size = "md", defaultTab, activeTab: controlled, onChange, fullWidth = false, className = "" }: TabsProps) {
  const [internalActive, setInternalActive] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const active = controlled ?? internalActive;
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const handleChange = (id: string) => {
    if (!controlled) setInternalActive(id);
    onChange?.(id);
  };

  useEffect(() => {
    if (variant !== "underline" && variant !== "default") return;
    const container = tabsRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`[data-tab-id="${active}"]`) as HTMLElement;
    if (activeEl) {
      setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [active, variant]);

  const activeContent = tabs.find((t) => t.id === active)?.content;

  const containerClass = (() => {
    switch (variant) {
      case "bordered": return "border border-border rounded-[var(--radius)] bg-muted/30 p-1 gap-1";
      case "pills": return "gap-1.5";
      case "underline": return "border-b border-border relative";
      default: return "border-b border-border relative";
    }
  })();

  const getTabClass = (isActive: boolean, disabled: boolean) => {
    const base = "relative flex items-center gap-1.5 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap";
    if (disabled) return `${base} opacity-40 !cursor-not-allowed`;
    switch (variant) {
      case "bordered":
        return `${base} rounded-[var(--radius-sm)] ${isActive ? "bg-card text-foreground shadow-elevation-sm" : "text-muted-foreground hover:text-foreground hover:bg-card/50"}`;
      case "pills":
        return `${base} rounded-[var(--radius)] ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`;
      case "underline":
        return `${base} ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`;
      default:
        return `${base} ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`;
    }
  };

  return (
    <div className={className}>
      <div ref={tabsRef} className={`flex ${fullWidth ? "" : "inline-flex"} ${containerClass}`} role="tablist">
        {(variant === "default" || variant === "underline") && (
          <div
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-200 rounded-full"
            style={{ left: indicator.left, width: indicator.width }}
          />
        )}
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              className={`${getTabClass(isActive, !!tab.disabled)} ${fullWidth ? "flex-1 justify-center" : ""}`}
              style={sizeStyles[size]}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`ml-1 rounded-full min-w-[18px] text-center inline-flex items-center justify-center ${
                    isActive && variant === "pills" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-caption)", lineHeight: "1", padding: "1px 6px" }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {activeContent && (
        <div className="pt-4" role="tabpanel">
          {activeContent}
        </div>
      )}
    </div>
  );
}