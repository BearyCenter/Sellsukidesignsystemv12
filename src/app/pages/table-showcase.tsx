import React, { useState } from "react";
import { Layers, ChevronRight, Circle } from "lucide-react";
import { DSTable, type TableColumn } from "../../lib/components/ds-table";
import { Badge } from "../../lib/components/ds-badge";
import { Section, fontBody, fontLabel } from "./_showcase-factory";
import { useI18n } from "../i18n";

const sampleData = [
  { id: 1, name: "Somsak Jaidee", email: "somsak@sellsuki.co.th", role: "Admin", status: "Active", joined: "Jan 15, 2026" },
  { id: 2, name: "Nattaya Wong", email: "nattaya@sellsuki.co.th", role: "Editor", status: "Active", joined: "Feb 03, 2026" },
  { id: 3, name: "Pichaya Siri", email: "pichaya@sellsuki.co.th", role: "Viewer", status: "Inactive", joined: "Nov 22, 2025" },
  { id: 4, name: "Krit Tanaka", email: "krit@sellsuki.co.th", role: "Admin", status: "Active", joined: "Dec 01, 2025" },
  { id: 5, name: "Arisa Phan", email: "arisa@sellsuki.co.th", role: "Editor", status: "Pending", joined: "Mar 01, 2026" },
];

const statusVariant: Record<string, "success" | "destructive" | "warning"> = {
  Active: "success",
  Inactive: "destructive",
  Pending: "warning",
};

const columns: TableColumn[] = [
  { key: "id", header: "ID", sortable: true, width: "60px", align: "center" },
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true, render: (v: string) => <Badge variant="outline" size="sm">{v}</Badge> },
  {
    key: "status", header: "Status", sortable: true,
    render: (v: string) => <Badge variant={statusVariant[v] ?? "secondary"} size="sm" dot>{v}</Badge>,
  },
  { key: "joined", header: "Joined", sortable: true },
];

export function TableShowcase() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<Set<number>>(new Set());

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.table.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.table.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.table.desc")}
        </p>
      </div>

      <Section title="Basic Table" description="Default table with sortable columns." code={`<DSTable columns={columns} data={data} />`}>
        <DSTable columns={columns} data={sampleData} />
      </Section>

      <Section title="Striped" description="Alternating row backgrounds for readability." code={`<DSTable columns={columns} data={data} striped />`}>
        <DSTable columns={columns} data={sampleData} striped />
      </Section>

      <Section title="Bordered" description="Full cell borders for dense data." code={`<DSTable columns={columns} data={data} bordered striped />`}>
        <DSTable columns={columns} data={sampleData} bordered striped />
      </Section>

      <Section title="Selectable" description="Row selection with header select-all and indeterminate state." code={`<DSTable columns={columns} data={data} selectable selectedRows={selected} onSelectionChange={setSelected} />`}>
        <div>
          {selected.size > 0 && (
            <div className="mb-3 px-4 py-2 rounded-[var(--radius)] bg-primary/5 border border-primary/20 flex items-center gap-2">
              <span className="text-primary" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>
                {selected.size} row{selected.size > 1 ? "s" : ""} selected
              </span>
            </div>
          )}
          <DSTable columns={columns} data={sampleData} selectable hoverable selectedRows={selected} onSelectionChange={setSelected} />
        </div>
      </Section>

      <Section title="Sizes" description="Three density options." code={`<DSTable columns={columns} data={data} size="sm" />`}>
        <div className="space-y-6">
          <div>
            <span className="text-muted-foreground block mb-2" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>Small</span>
            <DSTable columns={columns} data={sampleData.slice(0, 3)} size="sm" />
          </div>
          <div>
            <span className="text-muted-foreground block mb-2" style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)" }}>Large</span>
            <DSTable columns={columns} data={sampleData.slice(0, 3)} size="lg" />
          </div>
        </div>
      </Section>

      <Section title="Loading State" description="Spinner shown while data is being fetched." code={`<DSTable columns={columns} data={[]} loading />`}>
        <DSTable columns={columns} data={[]} loading />
      </Section>

      <Section title="Empty State" description="Message when no data is available." code={`<DSTable columns={columns} data={[]} emptyMessage="No users found" />`}>
        <DSTable columns={columns} data={[]} emptyMessage="No users match your search criteria." />
      </Section>
    </div>
  );
}