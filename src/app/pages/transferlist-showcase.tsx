import React from "react";
import { PageHeader, Section, DemoBox, APITable } from "./_showcase-factory";
import { TransferList, type TransferItem } from "../../lib/components/ds-transferlist";

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
