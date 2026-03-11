import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Copy, Edit3, Trash2, Download, Share2, Archive, Star, MoreHorizontal, Settings, User, LogOut, ChevronRight, Keyboard, FileText, FolderPlus, Mail, MessageSquare, Globe } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, btnStyle, smallLabel } from "./_showcase-factory";

interface MenuItem {
  text?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  divider?: boolean;
  label?: string;
  destructive?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}

/* ─── Sub-menu (recursive, portal-based) ──────────────────────────────────── */

function SubMenu({ items, parentRect }: { items: MenuItem[]; parentRect: DOMRect }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: parentRect.top, left: parentRect.right + 4 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    let top = parentRect.top;
    let left = parentRect.right + 4;
    // Flip left if overflows right edge
    if (left + rect.width > window.innerWidth - 8) {
      left = parentRect.left - rect.width - 4;
    }
    // Clamp top if overflows bottom
    if (top + rect.height > window.innerHeight - 8) {
      top = window.innerHeight - rect.height - 8;
    }
    setPos({ top, left });
  }, [parentRect]);

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[9999] min-w-[200px] rounded-[var(--radius)] border border-border bg-popover shadow-md py-1"
      style={{ top: pos.top, left: pos.left }}
    >
      {items.map((item, i) => (
        <MenuItemRow key={i} item={item} />
      ))}
    </div>,
    document.body
  );
}

/* ─── Individual menu item (handles hover for sub-menus) ──────────────────── */

function MenuItemRow({ item }: { item: MenuItem }) {
  const [subOpen, setSubOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (item.divider) return <div className="my-1 border-t border-border" />;
  if (item.label) {
    return (
      <div
        className="px-3 py-1.5 text-muted-foreground uppercase tracking-wider"
        style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}
      >
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
          <span
            className="text-muted-foreground ml-4"
            style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-label)" }}
          >
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

/* ─── Main Menu (portal-based, fixed position) ────────────────────────────── */

function Menu({ items, open, onClose, triggerRef }: { items: MenuItem[]; open: boolean; onClose: () => void; triggerRef: React.RefObject<HTMLElement | null> }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    let top = rect.bottom + 4;
    let left = rect.left;
    // Defer to measure panel size and adjust
    requestAnimationFrame(() => {
      if (!menuRef.current) return;
      const menuRect = menuRef.current.getBoundingClientRect();
      if (left + menuRect.width > window.innerWidth - 8) left = rect.right - menuRect.width;
      if (top + menuRect.height > window.innerHeight - 8) top = rect.top - menuRect.height - 4;
      setPos({ top, left });
    });
    setPos({ top, left });
  }, [open, triggerRef]);

  // Close on outside click
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
      className="fixed z-[9999] min-w-[200px] rounded-[var(--radius)] border border-border bg-popover shadow-md py-1 animate-[fadeIn_0.15s_ease]"
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

/* ─── Showcase ────────────────────────────────────────────────────────────── */

export function MenuShowcase() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  const ref3 = useRef<HTMLButtonElement>(null);
  const ref4 = useRef<HTMLButtonElement>(null);

  const basicItems: MenuItem[] = [
    { text: "Copy", icon: <Copy size={14} />, shortcut: "Ctrl+C" },
    { text: "Edit", icon: <Edit3 size={14} />, shortcut: "Ctrl+E" },
    { text: "Download", icon: <Download size={14} />, shortcut: "Ctrl+D" },
    { divider: true },
    { text: "Share", icon: <Share2 size={14} /> },
    { text: "Archive", icon: <Archive size={14} /> },
    { divider: true },
    { text: "Delete", icon: <Trash2 size={14} />, destructive: true, shortcut: "Del" },
  ];

  const groupedItems: MenuItem[] = [
    { label: "Account" },
    { text: "Profile", icon: <User size={14} /> },
    { text: "Settings", icon: <Settings size={14} /> },
    { text: "Keyboard shortcuts", icon: <Keyboard size={14} /> },
    { divider: true },
    { label: "Actions" },
    { text: "Favorite", icon: <Star size={14} /> },
    { text: "Archive", icon: <Archive size={14} /> },
    { divider: true },
    { text: "Log out", icon: <LogOut size={14} />, destructive: true },
  ];

  const stateItems: MenuItem[] = [
    { text: "Available action", icon: <Star size={14} /> },
    { text: "Disabled action", icon: <Archive size={14} />, disabled: true },
    { divider: true },
    { text: "Destructive action", icon: <Trash2 size={14} />, destructive: true },
  ];

  const nestedItems: MenuItem[] = [
    { text: "New", icon: <FolderPlus size={14} />, children: [
      { text: "Document", icon: <FileText size={14} /> },
      { text: "Spreadsheet", icon: <FileText size={14} /> },
      { text: "Presentation", icon: <FileText size={14} /> },
    ]},
    { text: "Share", icon: <Share2 size={14} />, children: [
      { text: "Email", icon: <Mail size={14} /> },
      { text: "Message", icon: <MessageSquare size={14} /> },
      { text: "Public Link", icon: <Globe size={14} />, children: [
        { text: "Copy Link" },
        { text: "Generate QR Code" },
        { text: "Embed Code" },
      ]},
    ]},
    { divider: true },
    { text: "Download", icon: <Download size={14} />, shortcut: "Ctrl+D" },
    { text: "Settings", icon: <Settings size={14} /> },
    { divider: true },
    { text: "Delete", icon: <Trash2 size={14} />, destructive: true },
  ];

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.menu.title" descKey="page.menu.desc" />

      <Section title="Basic Menu" description="Context menu with icons, shortcuts, dividers, and destructive action." code={`<SskMenu items={items}>\n  <button>Open Menu</button>\n</SskMenu>`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <button ref={ref1} onClick={() => setOpen1(!open1)} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer inline-flex items-center gap-2" style={btnStyle}>
              <MoreHorizontal size={16} /> Actions
            </button>
            <Menu items={basicItems} open={open1} onClose={() => setOpen1(false)} triggerRef={ref1} />
          </div>
        </DemoBox>
      </Section>

      <Section title="Nested Sub-menus" description="Menu items can have children that open as nested sub-menus on hover. Supports unlimited nesting depth." code={`<SskMenu items={[\n  { text: "New", children: [\n    { text: "Document" },\n    { text: "Spreadsheet" },\n  ]},\n  { text: "Share", children: [\n    { text: "Email" },\n    { text: "Public Link", children: [\n      { text: "Copy Link" },\n      { text: "Generate QR Code" },\n    ]},\n  ]},\n]} />`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <button ref={ref4} onClick={() => setOpen4(!open4)} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer inline-flex items-center gap-2" style={btnStyle}>
              <MoreHorizontal size={16} /> Nested Menu
            </button>
            <Menu items={nestedItems} open={open4} onClose={() => setOpen4(false)} triggerRef={ref4} />
          </div>
        </DemoBox>
      </Section>

      <Section title="Grouped Menu" description="Menu with labeled groups and dividers." code={`<SskMenu items={groupedItems} />`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <button ref={ref2} onClick={() => setOpen2(!open2)} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer inline-flex items-center gap-2" style={btnStyle}>
              <User size={16} /> Account Menu
            </button>
            <Menu items={groupedItems} open={open2} onClose={() => setOpen2(false)} triggerRef={ref2} />
          </div>
        </DemoBox>
      </Section>

      <Section title="States" description="Disabled and destructive menu items." code={`<SskMenu items={[{ text: "Disabled", disabled: true }]} />`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <button ref={ref3} onClick={() => setOpen3(!open3)} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer inline-flex items-center gap-2" style={btnStyle}>
              <Settings size={16} /> States Demo
            </button>
            <Menu items={stateItems} open={open3} onClose={() => setOpen3(false)} triggerRef={ref3} />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "items", type: "MenuItem[]", def: "—", desc: "Menu item definitions" },
        { prop: "items[].children", type: "MenuItem[]", def: "—", desc: "Nested sub-menu items (unlimited depth)" },
        { prop: "trigger", type: "ReactNode", def: "—", desc: "Trigger element" },
        { prop: "placement", type: '"bottom-start" | "bottom-end"', def: '"bottom-start"', desc: "Menu position" },
        { prop: "onSelect", type: "(item: MenuItem) => void", def: "—", desc: "Item select callback" },
      ]} />
    </div>
  );
}