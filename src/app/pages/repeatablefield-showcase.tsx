import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { RepeatableFieldList, type RepeatableFieldRow, type RepeatableFieldColumn } from "../../lib/components/ds-repeatablefield";
import { DSInput } from "../../lib/components/ds-input";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Product Variant Columns ───────────────────────────────────────────────────

const VARIANT_COLUMNS: RepeatableFieldColumn[] = [
  {
    key: "size",
    label: "ขนาด",
    width: "100px",
    render: (value, onChange) => (
      <DSInput
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="S, M, L, XL"
        size="sm"
      />
    ),
  },
  {
    key: "color",
    label: "สี",
    width: "120px",
    render: (value, onChange) => (
      <DSInput
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ดำ, ขาว, แดง"
        size="sm"
      />
    ),
  },
  {
    key: "price",
    label: "ราคา (฿)",
    width: "120px",
    render: (value, onChange) => (
      <DSInput
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        type="number"
        size="sm"
      />
    ),
  },
  {
    key: "stock",
    label: "สต็อก",
    width: "100px",
    render: (value, onChange) => (
      <DSInput
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        type="number"
        size="sm"
      />
    ),
  },
  {
    key: "sku",
    label: "SKU",
    render: (value, onChange) => (
      <DSInput
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="PROD-001-S-BLK"
        size="sm"
      />
    ),
  },
];

const INITIAL_VARIANTS: RepeatableFieldRow[] = [
  { id: genId(), values: { size: "S", color: "ดำ", price: "299", stock: "50", sku: "TSHIRT-S-BLK" } },
  { id: genId(), values: { size: "M", color: "ดำ", price: "299", stock: "80", sku: "TSHIRT-M-BLK" } },
  { id: genId(), values: { size: "L", color: "ขาว", price: "319", stock: "30", sku: "TSHIRT-L-WHT" } },
];

// ─── Address Columns ──────────────────────────────────────────────────────────

const ADDRESS_COLUMNS: RepeatableFieldColumn[] = [
  {
    key: "name",
    label: "ชื่อผู้รับ",
    render: (value, onChange) => (
      <DSInput value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder="ชื่อ-นามสกุล" size="sm" />
    ),
  },
  {
    key: "phone",
    label: "เบอร์โทร",
    width: "140px",
    render: (value, onChange) => (
      <DSInput value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder="08x-xxx-xxxx" size="sm" />
    ),
  },
  {
    key: "address",
    label: "ที่อยู่",
    render: (value, onChange) => (
      <DSInput value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder="บ้านเลขที่ ถนน ตำบล" size="sm" />
    ),
  },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function RepeatableFieldShowcase() {
  const [variants, setVariants] = useState<RepeatableFieldRow[]>(INITIAL_VARIANTS);
  const [addresses, setAddresses] = useState<RepeatableFieldRow[]>([
    { id: genId(), values: { name: "สมชาย ใจดี", phone: "081-234-5678", address: "123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110" } },
  ]);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.repeatablefield.title" descKey="page.repeatablefield.desc" />

      <Section
        title="Product Variants — ขนาด / สี / ราคา / สต็อก"
        description="Repeatable field สำหรับเพิ่ม/ลบ/เรียงลำดับ variant สินค้า พร้อม drag handle"
        code={`<RepeatableFieldList
  columns={variantColumns}
  value={variants}
  onChange={setVariants}
  defaultRow={{ size: "", color: "", price: "0", stock: "0", sku: "" }}
  addLabel="เพิ่ม variant"
  sortable
  minRows={1}
  maxRows={20}
/>`}
      >
        <DemoBox className="!p-4">
          <RepeatableFieldList
            columns={VARIANT_COLUMNS}
            value={variants}
            onChange={setVariants}
            defaultRow={{ size: "", color: "", price: "0", stock: "0", sku: "" }}
            addLabel="เพิ่ม variant"
            sortable
            minRows={1}
            maxRows={20}
          />
          <div className="mt-3 text-muted-foreground" style={fontLabel}>
            {variants.length} variant • รวมสต็อก:{" "}
            <strong>
              {variants.reduce((sum, r) => sum + (parseInt(String(r.values.stock || 0), 10) || 0), 0)} ชิ้น
            </strong>
          </div>
        </DemoBox>
      </Section>

      <Section
        title="Address List — ที่อยู่จัดส่งหลายรายการ"
        description="รายการที่อยู่ที่เพิ่มได้ไม่เกิน 5 รายการ"
        code={`<RepeatableFieldList
  columns={addressColumns}
  value={addresses}
  onChange={setAddresses}
  defaultRow={{ name: "", phone: "", address: "" }}
  addLabel="เพิ่มที่อยู่"
  maxRows={5}
/>`}
      >
        <DemoBox className="!p-4">
          <RepeatableFieldList
            columns={ADDRESS_COLUMNS}
            value={addresses}
            onChange={setAddresses}
            defaultRow={{ name: "", phone: "", address: "" }}
            addLabel="เพิ่มที่อยู่"
            maxRows={5}
          />
        </DemoBox>
      </Section>

      <Section
        title="Disabled State"
        description="ปิดการแก้ไขทั้งหมด — แสดงผลแบบ read-only"
        code={`<RepeatableFieldList columns={columns} value={rows} disabled />`}
      >
        <DemoBox className="!p-4">
          <RepeatableFieldList
            columns={VARIANT_COLUMNS.slice(0, 3)}
            value={INITIAL_VARIANTS.slice(0, 2)}
            disabled
          />
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "columns", type: "RepeatableFieldColumn[]", def: "—", desc: "นิยาม column (key, label, render, width)" },
        { prop: "value", type: "RepeatableFieldRow[]", def: "—", desc: "รายการ row ปัจจุบัน" },
        { prop: "onChange", type: "(rows) => void", def: "—", desc: "callback เมื่อ row เปลี่ยน" },
        { prop: "defaultRow", type: "Record<string, unknown>", def: "{}", desc: "ค่าเริ่มต้นของ row ใหม่" },
        { prop: "minRows", type: "number", def: "0", desc: "จำนวน row ขั้นต่ำ" },
        { prop: "maxRows", type: "number", def: "—", desc: "จำนวน row สูงสุด" },
        { prop: "addLabel", type: "string", def: '"+ Add row"', desc: "ข้อความปุ่มเพิ่ม" },
        { prop: "sortable", type: "boolean", def: "false", desc: "ลาก-วาง เพื่อเรียงลำดับ" },
        { prop: "disabled", type: "boolean", def: "false", desc: "ปิดการแก้ไขทั้งหมด" },
      ]} />
    </div>
  );
}
