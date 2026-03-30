import React, { useState } from "react";
import { Package, Edit, Trash2 } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { AdvancedDataTable, type AdvancedColumn, type PaginationMeta, type SortOrder } from "../../lib/components/ds-advanced-table";
import { Badge } from "../../lib/components/ds-badge";
import { DSButton } from "../../lib/components/ds-button";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "pending";
}

const ALL_PRODUCTS: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${String(i + 1).padStart(3, "0")}`,
  category: ["Electronics", "Clothing", "Food", "Home"][i % 4],
  price: Math.round((50 + i * 23.7) * 100) / 100,
  stock: Math.max(0, 100 - i * 3),
  status: (["active", "inactive", "pending"] as const)[i % 3],
}));

const STATUS_VARIANT: Record<Product["status"], "success" | "secondary" | "warning"> = {
  active: "success",
  inactive: "secondary",
  pending: "warning",
};

const COLUMNS: AdvancedColumn<Product>[] = [
  { key: "id", header: "ID", width: 60, sortable: true, frozen: true },
  {
    key: "name", header: "Product", sortable: true,
    render: (v) => (
      <div className="flex items-center gap-2">
        <Package size={14} className="text-muted-foreground flex-shrink-0" />
        <span style={fontLabel}>{v}</span>
      </div>
    ),
  },
  { key: "category", header: "Category", sortable: true },
  {
    key: "price", header: "Price", sortable: true, align: "right",
    render: (v) => <span>฿{(v as number).toLocaleString()}</span>,
  },
  {
    key: "stock", header: "Stock", sortable: true, align: "center",
    render: (v) => (
      <span style={{ color: (v as number) === 0 ? "var(--destructive)" : (v as number) < 20 ? "var(--chart-5)" : "var(--foreground)" }}>
        {v as number}
      </span>
    ),
  },
  {
    key: "status", header: "Status", align: "center",
    render: (v) => <Badge variant={STATUS_VARIANT[v as Product["status"]]}>{v as string}</Badge>,
  },
  {
    key: "actions", header: "", width: 80, hideable: false,
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <DSButton variant="ghost" size="sm" className="w-7 h-7 p-0" aria-label="Edit"><Edit size={14} /></DSButton>
        <DSButton variant="ghost" size="sm" className="w-7 h-7 p-0 text-destructive" aria-label="Delete"><Trash2 size={14} /></DSButton>
      </div>
    ),
  },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function AdvancedTableShowcase() {
  // Server-side pagination simulation
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Selection
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const handlePageChange = (p: number, ps: number) => { setPage(p); setPageSize(ps); };
  const handleSortChange = (col: string, order: SortOrder) => { setSortBy(col); setSortOrder(order); setPage(1); };

  // Simulate sorted & paged data
  const sorted = [...ALL_PRODUCTS].sort((a, b) => {
    const av = a[sortBy as keyof Product] as any;
    const bv = b[sortBy as keyof Product] as any;
    return sortOrder === "asc" ? (av < bv ? -1 : 1) : av > bv ? -1 : 1;
  });
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);
  const pagination: PaginationMeta = { page, pageSize, totalCount: ALL_PRODUCTS.length };

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.advancedtable.title" descKey="page.advancedtable.desc" />

      <Section title="Server-side Pagination + Sort" description="50-row dataset with server-side pagination, multi-column sort, bulk actions, frozen ID column, and column toggle." code={`<AdvancedDataTable
  columns={columns}
  data={pageData}
  rowKey="id"
  pagination={{ page, pageSize, totalCount: 50 }}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onPageChange={handlePageChange}
  onSortChange={handleSortChange}
  selectable
  bulkActions={[...]}
  showColumnToggle
/>`}>
        <DemoBox className="!p-0 overflow-hidden">
          <AdvancedDataTable
            columns={COLUMNS}
            data={pageData}
            rowKey="id"
            pagination={pagination}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={(sel) => setSelectedRows(sel)}
            bulkActions={[
              {
                label: "Export Selected",
                onClick: (keys) => alert(`Exporting ${keys.length} items`),
              },
              {
                label: "Delete Selected",
                variant: "destructive",
                onClick: (keys) => alert(`Deleting ${keys.length} items`),
              },
            ]}
            showColumnToggle
            stickyHeader
          />
        </DemoBox>
      </Section>

      <Section title="Loading State" description="Skeleton rows during data fetch." code={`<AdvancedDataTable columns={columns} data={[]} loading loadingRows={5} />`}>
        <DemoBox className="!p-0 overflow-hidden">
          <AdvancedDataTable
            columns={COLUMNS.slice(0, 5)}
            data={[]}
            rowKey="id"
            loading
            loadingRows={4}
          />
        </DemoBox>
      </Section>

      <Section title="Empty & Error States" description="Built-in feedback for empty data and errors." code={`<AdvancedDataTable data={[]} emptyMessage="No products found" />
<AdvancedDataTable data={[]} error="Failed to load products." />`}>
        <DemoBox>
          <div className="space-y-4">
            <AdvancedDataTable
              columns={COLUMNS.slice(0, 4)}
              data={[]}
              rowKey="id"
              emptyMessage="No products found"
              emptyDescription="Try adjusting your filters or adding new products."
            />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "columns", type: "AdvancedColumn[]", def: "—", desc: "Column definitions" },
        { prop: "data", type: "T[]", def: "—", desc: "Row data array" },
        { prop: "rowKey", type: "string", def: '"id"', desc: "Unique row identifier field" },
        { prop: "pagination", type: "PaginationMeta", def: "—", desc: "Server pagination metadata" },
        { prop: "sortBy / sortOrder", type: "string / SortOrder", def: "—", desc: "Controlled sort state" },
        { prop: "onPageChange", type: "(page, pageSize) => void", def: "—", desc: "Page change callback" },
        { prop: "onSortChange", type: "(col, order) => void", def: "—", desc: "Sort change callback" },
        { prop: "selectable", type: "boolean", def: "false", desc: "Enable row checkboxes" },
        { prop: "bulkActions", type: "BulkAction[]", def: "—", desc: "Actions in bulk action bar" },
        { prop: "showColumnToggle", type: "boolean", def: "false", desc: "Show column visibility toggle" },
        { prop: "loading", type: "boolean", def: "false", desc: "Show skeleton loading rows" },
        { prop: "error", type: "string", def: "—", desc: "Error message state" },
        { prop: "stickyHeader", type: "boolean", def: "false", desc: "Freeze column headers" },
      ]} />
    </div>
  );
}
