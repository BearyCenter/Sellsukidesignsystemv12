import React, { useState, useRef } from "react";
import { Copy, Edit3, Trash2, Download, Share2, Archive, Star, MoreHorizontal, Settings, User, LogOut, ChevronRight, Keyboard, FileText, FolderPlus, Mail, MessageSquare, Globe } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, smallLabel } from "./_showcase-factory";
import { Menu, MenuItem } from "../../lib/components/ds-menu";
import { DSButton } from "../../lib/components/ds-button";

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
            <DSButton ref={ref1} variant="outline" onClick={() => setOpen1(!open1)}>
              <MoreHorizontal size={16} /> Actions
            </DSButton>
            <Menu items={basicItems} open={open1} onClose={() => setOpen1(false)} triggerRef={ref1} />
          </div>
        </DemoBox>
      </Section>

      <Section title="Nested Sub-menus" description="Menu items can have children that open as nested sub-menus on hover. Supports unlimited nesting depth." code={`<SskMenu items={[\n  { text: "New", children: [\n    { text: "Document" },\n    { text: "Spreadsheet" },\n  ]},\n  { text: "Share", children: [\n    { text: "Email" },\n    { text: "Public Link", children: [\n      { text: "Copy Link" },\n      { text: "Generate QR Code" },\n    ]},\n  ]},\n]} />`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <DSButton ref={ref4} variant="outline" onClick={() => setOpen4(!open4)}>
              <MoreHorizontal size={16} /> Nested Menu
            </DSButton>
            <Menu items={nestedItems} open={open4} onClose={() => setOpen4(false)} triggerRef={ref4} />
          </div>
        </DemoBox>
      </Section>

      <Section title="Grouped Menu" description="Menu with labeled groups and dividers." code={`<SskMenu items={groupedItems} />`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <DSButton ref={ref2} variant="outline" onClick={() => setOpen2(!open2)}>
              <User size={16} /> Account Menu
            </DSButton>
            <Menu items={groupedItems} open={open2} onClose={() => setOpen2(false)} triggerRef={ref2} />
          </div>
        </DemoBox>
      </Section>

      <Section title="States" description="Disabled and destructive menu items." code={`<SskMenu items={[{ text: "Disabled", disabled: true }]} />`}>
        <DemoBox>
          <div className="flex justify-center py-4">
            <DSButton ref={ref3} variant="outline" onClick={() => setOpen3(!open3)}>
              <Settings size={16} /> States Demo
            </DSButton>
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