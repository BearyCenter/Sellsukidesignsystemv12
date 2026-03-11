import React, { useState } from "react";
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── TransferList Component ───────────────────────────────────────────────── */

interface TransferItem { id: string; label: string; disabled?: boolean; }

function TransferList({
  sourceTitle = "Available", targetTitle = "Selected", items, defaultTarget = [], searchable,
}: {
  sourceTitle?: string; targetTitle?: string; items: TransferItem[];
  defaultTarget?: string[]; searchable?: boolean;
}) {
  const [target, setTarget] = useState<Set<string>>(new Set(defaultTarget));
  const [sourceSelected, setSourceSelected] = useState<Set<string>>(new Set());
  const [targetSelected, setTargetSelected] = useState<Set<string>>(new Set());
  const [sourceSearch, setSourceSearch] = useState("");
  const [targetSearch, setTargetSearch] = useState("");

  const source = items.filter(i => !target.has(i.id));
  const targetItems = items.filter(i => target.has(i.id));

  const filteredSource = sourceSearch ? source.filter(i => i.label.toLowerCase().includes(sourceSearch.toLowerCase())) : source;
  const filteredTarget = targetSearch ? targetItems.filter(i => i.label.toLowerCase().includes(targetSearch.toLowerCase())) : targetItems;

  const moveRight = () => {
    setTarget(prev => { const n = new Set(prev); sourceSelected.forEach(id => n.add(id)); return n; });
    setSourceSelected(new Set());
  };
  const moveLeft = () => {
    setTarget(prev => { const n = new Set(prev); targetSelected.forEach(id => n.delete(id)); return n; });
    setTargetSelected(new Set());
  };
  const moveAllRight = () => { setTarget(new Set(items.filter(i => !i.disabled).map(i => i.id))); setSourceSelected(new Set()); };
  const moveAllLeft = () => { setTarget(new Set()); setTargetSelected(new Set()); };

  const toggleSelect = (id: string, set: Set<string>, setter: (s: Set<string>) => void) => {
    const n = new Set(set); if (n.has(id)) n.delete(id); else n.add(id); setter(n);
  };

  const ListBox = ({ title, items: listItems, selected, onToggle, search, onSearch }: {
    title: string; items: TransferItem[]; selected: Set<string>;
    onToggle: (id: string) => void; search: string; onSearch: (v: string) => void;
  }) => (
    <div className="flex-1 min-w-[180px] rounded-[var(--radius-lg)] border border-border bg-card overflow-hidden">
      <div className="px-3 py-2.5 border-b border-border bg-muted/30 flex items-center justify-between">
        <span className="text-foreground" style={fontLabelBold}>{title}</span>
        <span className="text-muted-foreground" style={smallLabel}>{listItems.length} items</span>
      </div>
      {searchable && (
        <div className="px-3 py-2 border-b border-border flex items-center gap-2">
          <Search size={12} className="text-muted-foreground" />
          <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search…"
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" style={smallLabel} />
        </div>
      )}
      <div className="max-h-[240px] overflow-y-auto py-1">
        {listItems.length === 0 && <div className="px-3 py-6 text-center text-muted-foreground" style={smallLabel}>No items</div>}
        {listItems.map(item => (
          <button key={item.id} onClick={() => !item.disabled && onToggle(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-1.5 transition-colors cursor-pointer
              ${selected.has(item.id) ? "bg-primary/10" : "hover:bg-accent"}
              ${item.disabled ? "opacity-40 pointer-events-none" : ""}`}
            style={fontLabel}>
            <span className={`w-4 h-4 rounded-[var(--radius-sm)] border flex items-center justify-center flex-shrink-0
              ${selected.has(item.id) ? "bg-primary border-primary" : "border-border"}`}>
              {selected.has(item.id) && <span className="w-2 h-2 rounded-[1px] bg-primary-foreground" />}
            </span>
            <span className="text-foreground truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex items-stretch gap-3 flex-wrap">
      <ListBox title={sourceTitle} items={filteredSource} selected={sourceSelected}
        onToggle={id => toggleSelect(id, sourceSelected, setSourceSelected)}
        search={sourceSearch} onSearch={setSourceSearch} />

      <div className="flex flex-col items-center justify-center gap-1.5 py-4">
        <button onClick={moveAllRight} disabled={source.length === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer">
          <ChevronsRight size={14} />
        </button>
        <button onClick={moveRight} disabled={sourceSelected.size === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer">
          <ChevronRight size={14} />
        </button>
        <button onClick={moveLeft} disabled={targetSelected.size === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer">
          <ChevronLeft size={14} />
        </button>
        <button onClick={moveAllLeft} disabled={targetItems.length === 0}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors cursor-pointer">
          <ChevronsLeft size={14} />
        </button>
      </div>

      <ListBox title={targetTitle} items={filteredTarget} selected={targetSelected}
        onToggle={id => toggleSelect(id, targetSelected, setTargetSelected)}
        search={targetSearch} onSearch={setTargetSearch} />
    </div>
  );
}

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

const permissions: TransferItem[] = [
  { id: "read", label: "Read" }, { id: "write", label: "Write" }, { id: "delete", label: "Delete" },
  { id: "admin", label: "Admin" }, { id: "export", label: "Export" }, { id: "import", label: "Import" },
  { id: "audit", label: "Audit Log" }, { id: "settings", label: "Settings" }, { id: "billing", label: "Billing", disabled: true },
];

const users: TransferItem[] = [
  { id: "alice", label: "Alice Johnson" }, { id: "bob", label: "Bob Smith" }, { id: "carol", label: "Carol Williams" },
  { id: "david", label: "David Brown" }, { id: "eve", label: "Eve Davis" }, { id: "frank", label: "Frank Miller" },
  { id: "grace", label: "Grace Wilson" }, { id: "henry", label: "Henry Moore" },
];

export function TransferListShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.transferlist.title" descKey="page.transferlist.desc" />

      <Section title="Basic" description="Move items between two lists." code={`<SskTransferList items={items} sourceTitle="Available" targetTitle="Assigned" />`}>
        <DemoBox><TransferList items={permissions} defaultTarget={["read", "write"]} /></DemoBox>
      </Section>

      <Section title="Searchable" description="Filter items with inline search." code={`<SskTransferList searchable items={items} />`}>
        <DemoBox><TransferList items={users} searchable sourceTitle="All Users" targetTitle="Team Members" defaultTarget={["alice", "bob"]} /></DemoBox>
      </Section>

      <APITable rows={[
        { prop: "items", type: "TransferItem[]", def: "[]", desc: "Array of { id, label, disabled? }" },
        { prop: "sourceTitle", type: "string", def: '"Available"', desc: "Left list header" },
        { prop: "targetTitle", type: "string", def: '"Selected"', desc: "Right list header" },
        { prop: "defaultTarget", type: "string[]", def: "[]", desc: "Initially selected item IDs" },
        { prop: "searchable", type: "boolean", def: "false", desc: "Enable search in lists" },
      ]} />
    </div>
  );
}
