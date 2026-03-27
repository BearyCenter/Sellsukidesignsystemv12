import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  active?: boolean;
  description?: string;
  onClick?: () => void;
  children?: ActionItem[];
}

export interface ActionDivider {
  type: "divider";
}

export interface ActionGroup {
  type: "group";
  label: string;
  items: (ActionItem | ActionDivider)[];
}

export type ActionEntry = ActionItem | ActionDivider | ActionGroup;

export type ActionDropdownSize = "sm" | "md" | "lg";
export type ActionDropdownAlign = "left" | "right";

export interface ActionDropdownProps {
  items: ActionEntry[];
  trigger?: React.ReactNode;
  label?: string;
  size?: ActionDropdownSize;
  align?: ActionDropdownAlign;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sizeConfig: Record<
  ActionDropdownSize,
  {
    item: string;
    itemStyle: React.CSSProperties;
    textStyle: React.CSSProperties;
    descStyle: React.CSSProperties;
    shortcutStyle: React.CSSProperties;
    icon: number;
    panelWidth: string;
  }
> = {
  sm: {
    item: "gap-[var(--Spacing--Spacing-lg)] rounded-[var(--radius-sm)]",
    itemStyle: { padding: "var(--Spacing--Spacing-sm) var(--Spacing--Spacing-xl)" },
    textStyle: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-label)" },
    descStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
    shortcutStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" },
    icon: 14,
    panelWidth: "min-w-[180px]",
  },
  md: {
    item: "gap-[var(--Spacing--Spacing-lg)] rounded-[var(--radius-sm)]",
    itemStyle: { padding: "var(--Spacing--Spacing-md) var(--Spacing--Spacing-2xl)" },
    textStyle: { fontFamily: "var(--font-caption)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-caption)" },
    descStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" },
    shortcutStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" },
    icon: 16,
    panelWidth: "min-w-[220px]",
  },
  lg: {
    item: "gap-[var(--Spacing--Spacing-2xl)] rounded-[var(--radius-sm)]",
    itemStyle: { padding: "var(--Spacing--Spacing-lg) var(--Spacing--Spacing-3xl)" },
    textStyle: { fontFamily: "var(--font-p)", fontSize: "var(--text-p)", fontWeight: "var(--weight-p)" },
    descStyle: { fontFamily: "var(--font-caption)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-caption)" },
    shortcutStyle: { fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" },
    icon: 18,
    panelWidth: "min-w-[260px]",
  },
};

function isDivider(entry: ActionEntry): entry is ActionDivider {
  return "type" in entry && entry.type === "divider";
}

function isGroup(entry: ActionEntry): entry is ActionGroup {
  return "type" in entry && entry.type === "group";
}

// ─── Portal Sub-menu ──────────────────────────────────────────────────────────

function PortalSubMenu({
  items,
  parentRect,
  sc,
  onClose,
}: {
  items: (ActionItem | ActionDivider)[];
  parentRect: DOMRect;
  sc: (typeof sizeConfig)["md"];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: parentRect.top, left: parentRect.right + 4 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    let top = parentRect.top;
    let left = parentRect.right + 4;
    if (left + rect.width > window.innerWidth - 8) {
      left = parentRect.left - rect.width - 4;
    }
    if (top + rect.height > window.innerHeight - 8) {
      top = Math.max(8, window.innerHeight - rect.height - 8);
    }
    setPos({ top, left });
  }, [parentRect]);

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[9999] bg-popover border border-border rounded-[var(--radius)] shadow-elevation-sm py-1"
      style={{ top: pos.top, left: pos.left, minWidth: 180 }}
    >
      <div className="p-1">
        {items.map((child, i) =>
          isDivider(child) ? (
            <div key={`d-${i}`} className="my-1 h-px bg-border mx-2" />
          ) : (
            <ActionMenuItem
              key={(child as ActionItem).id}
              item={child as ActionItem}
              sc={sc}
              onClose={onClose}
            />
          )
        )}
      </div>
    </div>,
    document.body
  );
}

// ─── Sub-menu item with hover submenu ─────────────────────────────────────────

function ActionMenuItemWithSub({
  item,
  sc,
  onClose,
}: {
  item: ActionItem;
  sc: (typeof sizeConfig)["md"];
  onClose: () => void;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setSubOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setSubOpen(false), 150);
  };

  return (
    <div
      ref={rowRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        disabled={item.disabled}
        className={`w-full flex items-center ${sc.item} transition-colors cursor-pointer
          ${item.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[var(--Colors--Background--bg-primary_hover)]"}
          ${item.destructive ? "text-destructive hover:bg-destructive/10" : "text-popover-foreground"}
        `}
        style={{ ...sc.itemStyle, ...sc.textStyle }}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronRight size={sc.icon - 2} className="text-muted-foreground flex-shrink-0" />
      </button>
      {subOpen && item.children && rowRef.current && (
        <PortalSubMenu
          items={item.children as (ActionItem | ActionDivider)[]}
          parentRect={rowRef.current.getBoundingClientRect()}
          sc={sc}
          onClose={onClose}
        />
      )}
    </div>
  );
}

// ─── Single menu item ─────────────────────────────────────────────────────────

function ActionMenuItem({
  item,
  sc,
  onClose,
}: {
  item: ActionItem;
  sc: (typeof sizeConfig)["md"];
  onClose: () => void;
}) {
  if (item.children && item.children.length > 0) {
    return <ActionMenuItemWithSub item={item} sc={sc} onClose={onClose} />;
  }

  return (
    <button
      type="button"
      disabled={item.disabled}
      onClick={() => {
        if (!item.disabled) {
          item.onClick?.();
          onClose();
        }
      }}
      className={`w-full flex items-center ${sc.item} transition-colors cursor-pointer
        ${item.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[var(--Colors--Background--bg-primary_hover)]"}
        ${item.active ? "bg-[var(--Colors--Background--bg-brand-secondary)] text-[var(--Colors--Text--text-brand-primary)]" : ""}
        ${item.destructive ? "text-destructive hover:bg-destructive/10" : "text-popover-foreground"}
      `}
      style={{ ...sc.itemStyle, ...sc.textStyle }}
    >
      {item.icon && <span className="flex-shrink-0 w-5 flex items-center justify-center">{item.icon}</span>}
      <span className="flex-1 text-left">
        <span className="block">{item.label}</span>
        {item.description && (
          <span className="block text-muted-foreground" style={sc.descStyle}>{item.description}</span>
        )}
      </span>
      {item.active && !item.shortcut && (
        <Check size={sc.icon - 2} className="text-primary flex-shrink-0" />
      )}
      {item.shortcut && (
        <span className="text-muted-foreground ml-auto pl-4" style={sc.shortcutStyle}>
          {item.shortcut}
        </span>
      )}
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ActionDropdown = forwardRef<HTMLDivElement, ActionDropdownProps>(
  (
    {
      items,
      trigger,
      label = "Actions",
      size = "md",
      align = "left",
      disabled = false,
      loading = false,
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const sc = sizeConfig[size];

    // Calculate panel position when opened
    useEffect(() => {
      if (!isOpen) return;
      const anchor = triggerRef.current ?? wrapperRef.current;
      if (!anchor) return;
      const updatePos = () => {
        const rect = anchor.getBoundingClientRect();
        setPanelPos({ top: rect.bottom + 6, left: rect.left, width: rect.width });
      };
      updatePos();
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
      return () => {
        window.removeEventListener("scroll", updatePos, true);
        window.removeEventListener("resize", updatePos);
      };
    }, [isOpen]);

    // Click outside
    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (wrapperRef.current?.contains(target)) return;
        if (panelRef.current?.contains(target)) return;
        setIsOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    // Keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled || loading) return;
        if (e.key === "Escape") {
          setIsOpen(false);
          triggerRef.current?.focus();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
        }
      },
      [disabled, loading, isOpen]
    );

    const close = useCallback(() => setIsOpen(false), []);

    const renderEntry = (entry: ActionEntry, index: number) => {
      if (isDivider(entry)) {
        return <div key={`div-${index}`} className="my-1 h-px bg-border mx-2" />;
      }
      if (isGroup(entry)) {
        return (
          <div key={`grp-${index}`}>
            <div
              className="px-3 py-1.5 text-muted-foreground"
              style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
            >
              {entry.label}
            </div>
            {entry.items.map((sub, si) => renderEntry(sub, index * 100 + si))}
          </div>
        );
      }
      return <ActionMenuItem key={entry.id} item={entry} sc={sc} onClose={close} />;
    };

    // Compute portal panel style
    const panelStyle: React.CSSProperties = {
      top: panelPos.top,
      left: align === "right" ? undefined : panelPos.left,
      right: align === "right" ? (window.innerWidth - panelPos.left - panelPos.width) : undefined,
    };

    return (
      <div ref={(node) => {
        (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }} className={`relative inline-block ${className}`}>
        {/* Trigger */}
        {trigger ? (
          <div
            onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className={disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          >
            {trigger}
          </div>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled || loading}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border bg-card text-foreground transition-all duration-150 shadow-elevation-sm
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50 active:scale-[0.98]"}
              ${loading ? "opacity-70 cursor-wait" : ""}
              ${isOpen ? "ring-2 ring-ring/20 border-ring" : ""}
            `}
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            <span>{label}</span>
            <ChevronDown
              size={14}
              className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {/* Panel — portaled to body with fixed positioning */}
        {isOpen && createPortal(
          <div
            ref={panelRef}
            className={`fixed z-[9999] ${sc.panelWidth} bg-popover border border-border rounded-[var(--radius)] shadow-elevation-sm overflow-visible`}
            style={panelStyle}
          >
            <div className="p-1 max-h-80 overflow-y-auto">
              {items.map((entry, i) => renderEntry(entry, i))}
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }
);

ActionDropdown.displayName = "ActionDropdown";