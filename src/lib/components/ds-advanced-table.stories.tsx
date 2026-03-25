import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Trash2, Download, Mail, Eye } from "lucide-react";
import { AdvancedDataTable } from "./ds-advanced-table";
import type { AdvancedColumn, PaginationMeta, BulkAction } from "./ds-advanced-table";

/* ─── Mock data ──────────────────────────────────────────────────────────────── */

interface Company {
  id: number;
  name: string;
  plan: string;
  status: "active" | "inactive" | "pending";
  users: number;
  revenue: number;
  createdAt: string;
}

const MOCK_COMPANIES: Company[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Company ${String.fromCharCode(65 + i)}`,
  plan: ["Free", "Starter", "Pro", "Enterprise"][i % 4],
  status: (["active", "inactive", "pending"] as const)[i % 3],
  users: Math.floor(Math.random() * 200) + 5,
  revenue: Math.floor(Math.random() * 100000) + 1000,
  createdAt: `2026-0${(i % 9) + 1}-${String(i + 1).padStart(2, "0")}`,
}));

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  workspace: string;
  lastLogin: string;
  status: "active" | "inactive";
}

const MOCK_USERS: User[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: ["Alice Johnson", "Bob Smith", "Carol White", "David Lee", "Eva Martinez", "Frank Brown", "Grace Kim", "Henry Wu"][i],
  email: `user${i + 1}@sellsuki.com`,
  role: ["Admin", "Manager", "Staff", "Viewer"][i % 4],
  workspace: `WS-${String(i + 1).padStart(3, "0")}`,
  lastLogin: `2026-03-${String(20 - i).padStart(2, "0")}`,
  status: i % 3 === 2 ? "inactive" : "active",
}));

/* ─── Status badge ───────────────────────────────────────────────────────────── */

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "#d1fae5", text: "#065f46", label: "Active" },
  inactive: { bg: "#f3f4f6", text: "#6b7280", label: "Inactive" },
  pending: { bg: "#fef3c7", text: "#92400e", label: "Pending" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.inactive;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 9999,
        background: s.bg,
        color: s.text,
        fontFamily: "var(--font-button)",
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

/* ─── Stories ────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof AdvancedDataTable> = {
  title: "Components/AdvancedDataTable",
  component: AdvancedDataTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof AdvancedDataTable>;

/* Basic */
export const Default: Story = {
  render: () => (
    <AdvancedDataTable
      rowKey="id"
      columns={[
        { key: "id", header: "ID", width: 60 },
        { key: "name", header: "Company Name", sortable: true },
        { key: "plan", header: "Plan", width: 100 },
        {
          key: "status",
          header: "Status",
          width: 100,
          render: (v) => <StatusBadge status={v} />,
        },
        { key: "users", header: "Users", align: "right", sortable: true, width: 80 },
        {
          key: "revenue",
          header: "Revenue",
          align: "right",
          sortable: true,
          render: (v) => `฿${v.toLocaleString()}`,
        },
      ]}
      data={MOCK_COMPANIES.slice(0, 6)}
    />
  ),
};

/* Loading skeleton */
export const Loading: Story = {
  render: () => (
    <AdvancedDataTable
      rowKey="id"
      columns={[
        { key: "name", header: "Company Name" },
        { key: "plan", header: "Plan", width: 100 },
        { key: "status", header: "Status", width: 100 },
        { key: "users", header: "Users", align: "right", width: 80 },
      ]}
      data={[]}
      loading
      loadingRows={6}
    />
  ),
};

/* Empty state */
export const Empty: Story = {
  render: () => (
    <AdvancedDataTable
      rowKey="id"
      columns={[
        { key: "name", header: "Company Name" },
        { key: "plan", header: "Plan" },
        { key: "status", header: "Status" },
      ]}
      data={[]}
      emptyMessage="No companies found"
      emptyDescription="Try adjusting your search or filter criteria"
    />
  ),
};

/* Error state */
export const ErrorState: Story = {
  render: () => (
    <AdvancedDataTable
      rowKey="id"
      columns={[
        { key: "name", header: "Company Name" },
        { key: "plan", header: "Plan" },
      ]}
      data={[]}
      error="Failed to load data. Please check your connection and try again."
    />
  ),
};

/* Server-side pagination + sort */
export const ServerSidePagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState<string | undefined>();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const sorted = [...MOCK_COMPANIES].sort((a, b) => {
      if (!sortBy) return 0;
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sortOrder === "asc" ? cmp : -cmp;
    });
    const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

    return (
      <AdvancedDataTable
        rowKey="id"
        columns={[
          { key: "id", header: "ID", width: 60 },
          { key: "name", header: "Company", sortable: true },
          { key: "plan", header: "Plan", width: 110 },
          { key: "status", header: "Status", width: 100, render: (v) => <StatusBadge status={v} /> },
          { key: "users", header: "Users", align: "right", sortable: true, width: 80 },
          { key: "revenue", header: "Revenue", align: "right", sortable: true, render: (v) => `฿${v.toLocaleString()}` },
        ]}
        data={paged}
        pagination={{ page, pageSize, totalCount: MOCK_COMPANIES.length }}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onPageChange={(p, ps) => { setPage(p); setPageSize(ps); }}
        onSortChange={(key, dir) => { setSortBy(key); setSortOrder(dir); setPage(1); }}
      />
    );
  },
};

/* Selection + bulk actions */
export const SelectionAndBulkActions: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const bulkActions: BulkAction[] = [
      { label: "Email", icon: <Mail size={13} />, onClick: (keys) => alert(`Email: ${keys.join(", ")}`) },
      { label: "Export", icon: <Download size={13} />, onClick: (keys) => alert(`Export: ${keys.join(", ")}`) },
      { label: "Delete", icon: <Trash2 size={13} />, variant: "destructive", onClick: (keys) => alert(`Delete: ${keys.join(", ")}`) },
    ];

    return (
      <AdvancedDataTable
        rowKey="id"
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role", width: 100 },
          { key: "status", header: "Status", width: 100, render: (v) => <StatusBadge status={v} /> },
          { key: "lastLogin", header: "Last Login", width: 120 },
        ]}
        data={MOCK_USERS}
        selectable
        selectedRows={selected}
        onSelectionChange={(s) => setSelected(s)}
        bulkActions={bulkActions}
      />
    );
  },
};

/* Expandable rows */
export const ExpandableRows: Story = {
  render: () => (
    <AdvancedDataTable
      rowKey="id"
      columns={[
        { key: "name", header: "Company" },
        { key: "plan", header: "Plan", width: 110 },
        { key: "status", header: "Status", width: 100, render: (v) => <StatusBadge status={v} /> },
        { key: "users", header: "Users", align: "right", width: 80 },
      ]}
      data={MOCK_COMPANIES.slice(0, 5)}
      expandedRowRender={(row) => (
        <div style={{ fontFamily: "var(--font-button)", fontSize: 13, color: "#6b7280" }}>
          <strong style={{ color: "#1f2937" }}>Details for {row.name}</strong>
          <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <div><span style={{ display: "block", fontWeight: 600, color: "#1f2937" }}>Revenue</span>฿{row.revenue.toLocaleString()}</div>
            <div><span style={{ display: "block", fontWeight: 600, color: "#1f2937" }}>Created</span>{row.createdAt}</div>
            <div><span style={{ display: "block", fontWeight: 600, color: "#1f2937" }}>Workspace</span>WS-{String(row.id).padStart(3, "0")}</div>
          </div>
        </div>
      )}
    />
  ),
};

/* Frozen columns + column toggle */
export const FrozenColumnsAndToggle: Story = {
  render: () => {
    const columns: AdvancedColumn<Company>[] = [
      { key: "id", header: "ID", width: 60, frozen: true, hideable: false },
      { key: "name", header: "Company Name", width: 180, frozen: true },
      { key: "plan", header: "Plan", width: 110 },
      { key: "status", header: "Status", width: 120, render: (v) => <StatusBadge status={v} /> },
      { key: "users", header: "Users", align: "right", width: 100 },
      { key: "revenue", header: "Revenue", align: "right", width: 140, render: (v) => `฿${v.toLocaleString()}` },
      { key: "createdAt", header: "Created At", width: 130, defaultHidden: true },
    ];
    return (
      <AdvancedDataTable
        rowKey="id"
        columns={columns}
        data={MOCK_COMPANIES.slice(0, 8)}
        showColumnToggle
      />
    );
  },
};

/* Full CCS admin example */
export const CCSAdminPanel: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const sorted = [...MOCK_COMPANIES].sort((a, b) => {
      const av = (a as any)[sortBy];
      const bv = (b as any)[sortBy];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sortOrder === "asc" ? cmp : -cmp;
    });
    const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

    const bulkActions: BulkAction[] = [
      { label: "View", icon: <Eye size={13} />, onClick: (k) => alert(`View: ${k.join(",")}`) },
      { label: "Export", icon: <Download size={13} />, onClick: (k) => alert(`Export: ${k.join(",")}`) },
      { label: "Delete", icon: <Trash2 size={13} />, variant: "destructive", onClick: (k) => alert(`Delete: ${k.join(",")}`) },
    ];

    return (
      <AdvancedDataTable
        rowKey="id"
        columns={[
          { key: "id", header: "ID", width: 60, frozen: true, hideable: false, sortable: true },
          { key: "name", header: "Company", width: 180, frozen: true, sortable: true },
          { key: "plan", header: "Plan", width: 110 },
          { key: "status", header: "Status", width: 120, render: (v) => <StatusBadge status={v} /> },
          { key: "users", header: "Users", align: "right", width: 90, sortable: true },
          { key: "revenue", header: "Revenue", align: "right", sortable: true, render: (v) => `฿${v.toLocaleString()}` },
          { key: "createdAt", header: "Created", width: 120, defaultHidden: true },
        ]}
        data={paged}
        pagination={{ page, pageSize, totalCount: MOCK_COMPANIES.length }}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onPageChange={(p, ps) => { setPage(p); setPageSize(ps); }}
        onSortChange={(key, dir) => { setSortBy(key); setSortOrder(dir); setPage(1); }}
        selectable
        selectedRows={selected}
        onSelectionChange={(s) => setSelected(s)}
        bulkActions={bulkActions}
        showColumnToggle
        expandedRowRender={(row) => (
          <div style={{ fontFamily: "var(--font-button)", fontSize: 13, color: "#6b7280" }}>
            <strong style={{ color: "#1f2937" }}>{row.name}</strong> — Revenue: ฿{row.revenue.toLocaleString()} · Created: {row.createdAt}
          </div>
        )}
        stickyHeader
      />
    );
  },
};
