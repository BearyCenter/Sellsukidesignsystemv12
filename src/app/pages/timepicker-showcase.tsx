import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { TimePicker, DateTimePicker, type TimeValue } from "../../lib/components/ds-timepicker";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatTimeValue(v: TimeValue | undefined, fmt: "12h" | "24h", secs: boolean): string {
  if (!v) return "—";
  if (fmt === "12h") {
    const h12 = v.hours % 12 || 12;
    const ampm = v.hours < 12 ? "AM" : "PM";
    return secs
      ? `${pad2(h12)}:${pad2(v.minutes)}:${pad2(v.seconds ?? 0)} ${ampm}`
      : `${pad2(h12)}:${pad2(v.minutes)} ${ampm}`;
  }
  return secs
    ? `${pad2(v.hours)}:${pad2(v.minutes)}:${pad2(v.seconds ?? 0)}`
    : `${pad2(v.hours)}:${pad2(v.minutes)}`;
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function TimePickerShowcase() {
  const [time12, setTime12] = useState<TimeValue | undefined>({ hours: 9, minutes: 30 });
  const [time24, setTime24] = useState<TimeValue | undefined>({ hours: 14, minutes: 0 });
  const [timeSecs, setTimeSecs] = useState<TimeValue | undefined>({ hours: 8, minutes: 30, seconds: 0 });
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date(2025, 3, 4, 10, 30));
  const [step15, setStep15] = useState<TimeValue | undefined>({ hours: 12, minutes: 0 });

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.timepicker.title" descKey="page.timepicker.desc" />

      <Section
        title="12-Hour Format"
        description="รูปแบบ 12 ชั่วโมง พร้อม AM/PM selector"
        code={`const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 30 });

<TimePicker
  value={time}
  onChange={setTime}
  format="12h"
  placeholder="เลือกเวลา"
/>`}
      >
        <DemoBox className="space-y-4">
          <TimePicker
            value={time12}
            onChange={setTime12}
            format="12h"
            placeholder="เลือกเวลา"
          />
          {time12 && (
            <div className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border text-muted-foreground" style={fontLabel}>
              ค่าที่เลือก: <strong>{formatTimeValue(time12, "12h", false)}</strong>
              {" "}({time12.hours}h {time12.minutes}m)
            </div>
          )}
        </DemoBox>
      </Section>

      <Section
        title="24-Hour Format"
        description="รูปแบบ 24 ชั่วโมง เหมาะกับระบบหลังบ้านและการตั้งเวลาส่งของ"
        code={`<TimePicker
  value={time}
  onChange={setTime}
  format="24h"
  placeholder="กรอกเวลา (24h)"
/>`}
      >
        <DemoBox className="space-y-4">
          <TimePicker
            value={time24}
            onChange={setTime24}
            format="24h"
            placeholder="กรอกเวลา (24h)"
          />
          {time24 && (
            <div className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border text-muted-foreground" style={fontLabel}>
              ค่าที่เลือก: <strong>{formatTimeValue(time24, "24h", false)}</strong>
            </div>
          )}
        </DemoBox>
      </Section>

      <Section
        title="With Seconds"
        description="แสดงช่อง seconds สำหรับการบันทึกเวลาที่ต้องการความละเอียดสูง"
        code={`<TimePicker
  value={time}
  onChange={setTime}
  format="24h"
  showSeconds
/>`}
      >
        <DemoBox className="space-y-4">
          <TimePicker
            value={timeSecs}
            onChange={setTimeSecs}
            format="24h"
            showSeconds
            placeholder="เลือกเวลา (พร้อมวินาที)"
          />
          {timeSecs && (
            <div className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border text-muted-foreground" style={fontLabel}>
              ค่าที่เลือก: <strong>{formatTimeValue(timeSecs, "24h", true)}</strong>
            </div>
          )}
        </DemoBox>
      </Section>

      <Section
        title="Minute Step"
        description="ตั้ง minuteStep=15 เพื่อให้เลือกได้ทุก 15 นาที เหมาะกับการนัดหมาย"
        code={`<TimePicker
  value={time}
  onChange={setTime}
  format="12h"
  minuteStep={15}
  placeholder="เลือก (ทุก 15 นาที)"
/>`}
      >
        <DemoBox>
          <TimePicker
            value={step15}
            onChange={setStep15}
            format="12h"
            minuteStep={15}
            placeholder="เลือก (ทุก 15 นาที)"
          />
        </DemoBox>
      </Section>

      <Section
        title="DateTimePicker — วันและเวลาพร้อมกัน"
        description="รวม date picker + time picker ในตัวเดียว เหมาะกับการตั้งเวลาแฟลชเซล"
        code={`const [dateTime, setDateTime] = useState<Date>(new Date());

<DateTimePicker
  value={dateTime}
  onChange={setDateTime}
  format="24h"
  placeholder="เลือกวันและเวลา"
/>`}
      >
        <DemoBox className="space-y-4">
          <DateTimePicker
            value={dateTime}
            onChange={setDateTime}
            format="24h"
            placeholder="เลือกวันและเวลา"
          />
          {dateTime && (
            <div className="px-3 py-2 rounded-[var(--radius-md)] bg-muted/40 border border-border text-muted-foreground" style={fontLabel}>
              ค่าที่เลือก: <strong>{dateTime.toLocaleString("th-TH")}</strong>
            </div>
          )}
        </DemoBox>
      </Section>

      <Section
        title="Sizes & Disabled"
        description="รองรับขนาด sm / md / lg และ disabled state"
        code={`<TimePicker size="sm" />
<TimePicker size="md" />
<TimePicker size="lg" />
<TimePicker disabled value={{ hours: 9, minutes: 0 }} />`}
      >
        <DemoBox className="space-y-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-muted-foreground w-8" style={fontLabel}>{size}</span>
              <TimePicker size={size} format="24h" placeholder={`ขนาด ${size}`} />
            </div>
          ))}
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground w-8" style={fontLabel}>off</span>
            <TimePicker disabled value={{ hours: 9, minutes: 0 }} format="24h" />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "TimeValue", def: "—", desc: "{ hours, minutes, seconds? }" },
        { prop: "onChange", type: "(time: TimeValue) => void", def: "—", desc: "callback เมื่อเลือกเวลา" },
        { prop: "format", type: "12h | 24h", def: "24h", desc: "รูปแบบเวลา" },
        { prop: "showSeconds", type: "boolean", def: "false", desc: "แสดงช่อง seconds" },
        { prop: "minuteStep", type: "number", def: "1", desc: "ช่วงห่างของนาที (เช่น 15)" },
        { prop: "size", type: "sm | md | lg", def: "md", desc: "ขนาด component" },
        { prop: "disabled", type: "boolean", def: "false", desc: "ปิดการใช้งาน" },
        { prop: "placeholder", type: "string", def: '"Select time"', desc: "ข้อความ placeholder" },
      ]} />
    </div>
  );
}
