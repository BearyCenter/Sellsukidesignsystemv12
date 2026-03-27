import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MenuItem {
  /** Display text */
  text?: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Keyboard shortcut label */
  shortcut?: string;
  /** Click handler */
  onClick?: () => void;
  /** Render as a divider line */
  divider?: boolean;
  /** Render as a group label */
  label?: string;
  /** Destructive (red) styling */
  destructive?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Nested sub-menu items */
  children?: MenuItem[];
}

export interface MenuProps {
  /** Menu item definitions */
  items: MenuItem[];
  /** Whether the menu is open */
  open: boolean;
  /** Close callback */
  onClose: () => void;
  /** Ref to the trigger element for positioning */
  triggerRef: React.RefObject<HTMLElement | null>;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const shortcutStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

// ─── SubMenu ─────────────────────────────────────────────────────────────────

function SubMenu({ items, parentRect }: { items: MenuItem[]; parentRect: DOMRect }) {
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
      top = window.innerHeight - rect.height - 8;
    }
    setPos({ top, left });
  }, [parentRect]);

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[9999] min-w-[200px] rounded-[var(--radius)] border border-border bg-popover shadow-elevation-sm py-1"
      style={{ top: pos.top, left: pos.left }}
    >
      {items.map((item, i) => (
        <MenuItemRow key={i} item={item} />
      ))}
    </div>,
    document.body
  );
}

// ─── MenuItemRow ─────────────────────────────────────────────────────────────

function MenuItemRow({ item }: { item: MenuItem }) {
  const [subOpen, setSubOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (item.divider) return <div className="my-1 border-t border-border" />;

  if (item.label) {
    return (
      <div className="px-3 py-1.5 text-muted-foreground" style={labelStyle}>
        {item.label}
      </div>
    );
  }

  const hasChildren = item.children && item.children.length > 0;

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (hasChildren) setSubOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setSubOpen(false), 150);
  };

  return (
    <div ref={rowRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => { if (!hasChildren) item.onClick?.(); }}
        disabled={item.disabled}
        className={`w-full flex items-center text-left rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
          item.destructive
            ? "text-destructive hover:bg-destructive/10"
            : item.disabled
            ? "text-muted-foreground opacity-50 cursor-not-allowed"
            : "text-popover-foreground hover:bg-[var(--Colors--Background--bg-primary_hover)]"
        }`}
        style={{ padding: "var(--Spacing--Spacing-md) var(--Spacing--Spacing-2xl)", gap: "var(--Spacing--Spacing-lg)", ...fontLabel }}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="flex-1">{item.text}</span>
        {item.shortcut && (
          <span className="text-muted-foreground ml-4" style={shortcutStyle}>
            {item.shortcut}
          </span>
        )}
        {hasChildren && <ChevronRight size={14} className="text-muted-foreground" />}
      </button>
      {hasChildren && subOpen && rowRef.current && (
        <SubMenu items={item.children!} parentRect={rowRef.current.getBoundingClientRect()} />
      )}
    </div>
  );
}

// ─── Menu ────────────────────────────────────────────────────────────────────

export function Menu({ items, open, onClose, triggerRef, className = "" }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    let top = rect.bottom + 4;
    let left = rect.left;
    requestAnimationFrame(() => {
      if (!menuRef.current) return;
      const menuRect = menuRef.current.getBoundingClientRect();
      if (left + menuRect.width > window.innerWidth - 8) left = rect.right - menuRect.width;
      if (top + menuRect.height > window.innerHeight - 8) top = rect.top - menuRect.height - 4;
      setPos({ top, left });
    });
    setPos({ top, left });
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={menuRef}
      className={`fixed z-[9999] min-w-[200px] rounded-[var(--radius)] border border-border bg-popover shadow-elevation-sm py-1 animate-[fadeIn_0.15s_ease] ${className}`}
      style={{ top: pos.top, left: pos.left }}
    >
      {items.map((item, i) => (
        <MenuItemRow key={i} item={item} />
      ))}
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>,
    document.body
  );
}

Menu.displayName = "Menu";
