import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { DateRangePicker, type DateRange } from "../../lib/components/ds-daterangepicker";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return d.toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function DateRangePickerShowcase() {
  const [range1, setRange1] = useState<DateRange>({ from: null, to: null });
  const [range2, setRange2] = useState<DateRange>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 31),
  });
  const [range3, setRange3] = useState<DateRange>({ from: null, to: null });

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.daterangepicker.title" descKey="page.daterangepicker.desc" />

      <Section
        title="Basic Usage"
        description="เลือกช่วงวันที่พร้อม preset shortcuts เช่น Today, Last 7 days, Last 30 days"
        code={`const [range, setRange] = useState<DateRange>({ from: null, to: null });

<DateRangePicker
  value={range}
  onChange={(r) => setRange(r)}
  placeholder="เลือกช่วงวันที่"
  clearable
/>`}
      >
        <DemoBox className="space-y-4">
          <DateRangePicker
            value={range1}
            onChange={(r) => setRange1(r)}
            placeholder="เลือกช่วงวันที่"
            clearable
          />
          {(range1.from || range1.to) && (
            <div
              className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border text-muted-foreground"
              style={fontLabel}
            >
              ช่วงที่เลือก: <strong>{formatDate(range1.from)}</strong> — <strong>{formatDate(range1.to)}</strong>
            </div>
          )}
        </DemoBox>
      </Section>

      <Section
        title="Controlled State with Presets"
        description="ค่าเริ่มต้นแบบ controlled state — สามารถกำหนด presets ที่แสดงได้"
        code={`<DateRangePicker
  value={{ from: new Date(2025,0,1), to: new Date(2025,0,31) }}
  onChange={(r, preset) => console.log(r, preset)}
  presets={["today","last7","last30","thisMonth","lastMonth"]}
  size="lg"
  clearable
/>`}
      >
        <DemoBox className="space-y-4">
          <DateRangePicker
            value={range2}
            onChange={(r) => setRange2(r)}
            presets={["today", "last7", "last30", "thisMonth", "lastMonth"]}
            size="lg"
            clearable
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border" style={fontLabel}>
              <span className="text-muted-foreground">จาก: </span>
              <strong>{formatDate(range2.from)}</strong>
            </div>
            <div className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border" style={fontLabel}>
              <span className="text-muted-foreground">ถึง: </span>
              <strong>{formatDate(range2.to)}</strong>
            </div>
          </div>
        </DemoBox>
      </Section>

      <Section
        title="Sizes"
        description="รองรับ 3 ขนาด: sm, md (default), lg"
        code={`<DateRangePicker size="sm" placeholder="Small" />
<DateRangePicker size="md" placeholder="Medium (default)" />
<DateRangePicker size="lg" placeholder="Large" />`}
      >
        <DemoBox className="space-y-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-muted-foreground w-8" style={fontLabel}>{size}</span>
              <DateRangePicker
                size={size}
                placeholder={`ขนาด ${size}`}
                value={range3}
                onChange={setRange3}
              />
            </div>
          ))}
        </DemoBox>
      </Section>

      <Section
        title="Disabled State"
        description="ใช้ disabled เพื่อปิดการใช้งาน"
        code={`<DateRangePicker
  value={{ from: new Date(), to: new Date() }}
  disabled
/>`}
      >
        <DemoBox>
          <DateRangePicker
            value={{ from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) }}
            disabled
          />
        </DemoBox>
      </Section>

      <Section
        title="Min / Max Date"
        description="จำกัดช่วงวันที่ที่เลือกได้ เช่น ไม่เกินวันนี้"
        code={`<DateRangePicker
  maxDate={new Date()}
  placeholder="เลือกได้เฉพาะวันที่ผ่านมา"
  clearable
/>`}
      >
        <DemoBox>
          <DateRangePicker
            maxDate={new Date()}
            placeholder="เลือกได้เฉพาะวันที่ผ่านมา"
            clearable
          />
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "DateRange", def: "—", desc: "ค่า from/to ปัจจุบัน" },
        { prop: "onChange", type: "(range, preset?) => void", def: "—", desc: "callback เมื่อเลือกช่วงวันที่" },
        { prop: "presets", type: "DateRangePreset[]", def: "today,last7,last30", desc: "รายการ preset ที่แสดง" },
        { prop: "placeholder", type: "string", def: '"Select date range"', desc: "ข้อความ placeholder" },
        { prop: "size", type: "sm | md | lg", def: "md", desc: "ขนาดของ component" },
        { prop: "minDate", type: "Date", def: "—", desc: "วันที่เริ่มต้นที่เลือกได้" },
        { prop: "maxDate", type: "Date", def: "—", desc: "วันที่สิ้นสุดที่เลือกได้" },
        { prop: "clearable", type: "boolean", def: "false", desc: "แสดงปุ่มล้างค่า" },
        { prop: "disabled", type: "boolean", def: "false", desc: "ปิดการใช้งาน" },
      ]} />
    </div>
  );
}
