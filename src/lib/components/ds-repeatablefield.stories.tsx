import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RepeatableFieldList } from "./ds-repeatablefield";
import type { RepeatableFieldRow, RepeatableFieldColumn } from "./ds-repeatablefield";

const meta: Meta<typeof RepeatableFieldList> = {
  title: "Data Entry/RepeatableFieldList",
  component: RepeatableFieldList,
  parameters: { layout: "padded" },
};
export default meta;

const COLUMNS: RepeatableFieldColumn[] = [
  {
    key: "name",
    label: "Product name",
    render: (value, onChange) => (
      <input
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. iPhone 15"
        className="w-full h-9 px-3 rounded-[var(--radius-md)] border border-border bg-card text-foreground outline-none focus:border-primary text-sm"
      />
    ),
  },
  {
    key: "qty",
    label: "Qty",
    width: "80px",
    render: (value, onChange) => (
      <input
        type="number"
        value={String(value ?? 1)}
        onChange={(e) => onChange(Number(e.target.value))}
        min={1}
        className="w-full h-9 px-3 rounded-[var(--radius-md)] border border-border bg-card text-foreground outline-none focus:border-primary text-sm"
      />
    ),
  },
  {
    key: "price",
    label: "Price (฿)",
    width: "120px",
    render: (value, onChange) => (
      <input
        type="number"
        value={String(value ?? 0)}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        className="w-full h-9 px-3 rounded-[var(--radius-md)] border border-border bg-card text-foreground outline-none focus:border-primary text-sm"
      />
    ),
  },
];

export const Default: StoryObj = {
  render: () => {
    const [rows, setRows] = useState<RepeatableFieldRow[]>([
      { id: "1", values: { name: "Product A", qty: 2, price: 299 } },
      { id: "2", values: { name: "Product B", qty: 1, price: 599 } },
    ]);
    return (
      <div className="max-w-2xl">
        <RepeatableFieldList
          columns={COLUMNS}
          value={rows}
          onChange={setRows}
          addLabel="Add product"
          defaultRow={{ name: "", qty: 1, price: 0 }}
        />
      </div>
    );
  },
};

export const Empty: StoryObj = {
  render: () => (
    <div className="max-w-2xl">
      <RepeatableFieldList columns={COLUMNS} addLabel="Add line item" />
    </div>
  ),
};

export const Sortable: StoryObj = {
  render: () => {
    const [rows, setRows] = useState<RepeatableFieldRow[]>([
      { id: "a", values: { name: "First item", qty: 1, price: 100 } },
      { id: "b", values: { name: "Second item", qty: 2, price: 200 } },
      { id: "c", values: { name: "Third item", qty: 3, price: 300 } },
    ]);
    return (
      <div className="max-w-2xl">
        <RepeatableFieldList columns={COLUMNS} value={rows} onChange={setRows} sortable addLabel="Add row" />
      </div>
    );
  },
};
