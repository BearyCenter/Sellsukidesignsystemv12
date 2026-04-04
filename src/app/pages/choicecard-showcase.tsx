import React, { useState } from "react";
import { Truck, Zap, Package, Store, Crown, Sparkles, Building2 } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { ChoiceCard, ChoiceCardGroup } from "../../lib/components/ds-choicecard";
import { RadioCard } from "../../lib/components/ds-radiocard";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SHIPPING_OPTIONS = [
  {
    value: "standard",
    title: "จัดส่งมาตรฐาน",
    description: "2–5 วันทำการ • ฟรีเมื่อซื้อครบ ฿500",
    icon: <Truck size={20} />,
  },
  {
    value: "express",
    title: "จัดส่งด่วน",
    description: "ภายใน 24 ชั่วโมง • ฿60",
    icon: <Zap size={20} />,
    badge: "เร็ว",
  },
  {
    value: "pickup",
    title: "รับที่ร้าน",
    description: "รับได้ทันที • ฟรี",
    icon: <Store size={20} />,
  },
];

const PLAN_OPTIONS = [
  {
    value: "starter",
    title: "Starter",
    description: "สินค้าสูงสุด 100 รายการ • 1 ร้านค้า",
    icon: <Package size={24} />,
    badge: "ฟรี",
  },
  {
    value: "pro",
    title: "Pro",
    description: "สินค้าไม่จำกัด • 3 ร้านค้า • รายงานขั้นสูง",
    icon: <Sparkles size={24} />,
    badge: "ยอดนิยม",
  },
  {
    value: "enterprise",
    title: "Enterprise",
    description: "ทุกอย่างใน Pro • API Access • SLA 99.9%",
    icon: <Building2 size={24} />,
    badge: "แนะนำ",
  },
];

const WAREHOUSE_OPTIONS = [
  {
    value: "bkk",
    title: "กรุงเทพฯ",
    description: "คลังสินค้าหลัก • ส่งได้ทุกจังหวัด",
    icon: <Crown size={20} />,
  },
  {
    value: "cnx",
    title: "เชียงใหม่",
    description: "คลังสาขาเหนือ",
    icon: <Building2 size={20} />,
  },
  {
    value: "hdy",
    title: "หาดใหญ่",
    description: "คลังสาขาใต้",
    icon: <Store size={20} />,
    disabled: true,
  },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function ChoiceCardShowcase() {
  const [shipping, setShipping] = useState("standard");
  const [plan, setPlan] = useState("pro");
  const [warehouse, setWarehouse] = useState("");
  const [single, setSingle] = useState("");

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.choicecard.title" descKey="page.choicecard.desc" />

      <Section
        title="ChoiceCardGroup — เลือกวิธีจัดส่ง"
        description="ใช้ ChoiceCardGroup เพื่อสร้าง radio group แบบ card สำหรับตัวเลือกที่ต้องการเน้น"
        code={`<ChoiceCardGroup value={shipping} onChange={setShipping} layout="horizontal">
  <ChoiceCard value="standard" title="จัดส่งมาตรฐาน" description="2–5 วันทำการ"
    icon={<Truck size={20} />} showCheck />
  <ChoiceCard value="express" title="จัดส่งด่วน" description="ภายใน 24h • ฿60"
    icon={<Zap size={20} />} badge="เร็ว" showCheck />
</ChoiceCardGroup>`}
      >
        <DemoBox className="space-y-4">
          <ChoiceCardGroup
            value={shipping}
            onChange={setShipping}
            layout="horizontal"
          >
            {SHIPPING_OPTIONS.map((opt) => (
              <ChoiceCard
                key={opt.value}
                value={opt.value}
                title={opt.title}
                description={opt.description}
                icon={opt.icon}
                badge={opt.badge}
                showCheck
              />
            ))}
          </ChoiceCardGroup>
          <div className="text-muted-foreground" style={fontLabel}>
            เลือก: <strong>{SHIPPING_OPTIONS.find((o) => o.value === shipping)?.title}</strong>
          </div>
        </DemoBox>
      </Section>

      <Section
        title="RadioCard — เลือกแผนการใช้งาน"
        description="RadioCard เหมาะกับการเลือก pricing plan หรือ tier ที่มีรายละเอียดมาก"
        code={`<RadioCard
  options={planOptions}
  value={plan}
  onChange={setPlan}
  columns={3}
  size="md"
/>`}
      >
        <DemoBox className="space-y-4">
          <RadioCard
            options={PLAN_OPTIONS}
            value={plan}
            onChange={setPlan}
            columns={3}
            size="md"
            name="plan"
          />
          <div className="text-muted-foreground" style={fontLabel}>
            เลือก: <strong>{PLAN_OPTIONS.find((o) => o.value === plan)?.title}</strong>
          </div>
        </DemoBox>
      </Section>

      <Section
        title="Vertical Layout + Disabled Card"
        description="ChoiceCardGroup แบบ vertical — เหมาะกับตัวเลือกที่มีคำอธิบายยาว"
        code={`<ChoiceCardGroup value={warehouse} onChange={setWarehouse} layout="vertical">
  <ChoiceCard value="bkk" title="กรุงเทพฯ" showCheck />
  <ChoiceCard value="hdy" title="หาดใหญ่" disabled />
</ChoiceCardGroup>`}
      >
        <DemoBox>
          <div className="max-w-sm">
            <ChoiceCardGroup
              value={warehouse}
              onChange={setWarehouse}
              layout="vertical"
            >
              {WAREHOUSE_OPTIONS.map((opt) => (
                <ChoiceCard
                  key={opt.value}
                  value={opt.value}
                  title={opt.title}
                  description={opt.description}
                  icon={opt.icon}
                  disabled={opt.disabled}
                  showCheck
                />
              ))}
            </ChoiceCardGroup>
          </div>
        </DemoBox>
      </Section>

      <Section
        title="ChoiceCard Sizes"
        description="รองรับ 3 ขนาด: sm, md, lg"
        code={`<ChoiceCard size="sm" value="a" title="Small" selected />
<ChoiceCard size="md" value="b" title="Medium" selected />
<ChoiceCard size="lg" value="c" title="Large" selected />`}
      >
        <DemoBox className="space-y-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <ChoiceCard
              key={size}
              value={size}
              title={`ขนาด ${size}`}
              description="ตัวอย่าง ChoiceCard"
              icon={<Package size={size === "sm" ? 16 : size === "md" ? 20 : 24} />}
              size={size}
              selected={single === size}
              showCheck
              onClick={(v) => setSingle(v)}
            />
          ))}
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value (ChoiceCardGroup)", type: "string", def: "—", desc: "ค่าที่เลือกอยู่" },
        { prop: "onChange (ChoiceCardGroup)", type: "(value) => void", def: "—", desc: "callback เมื่อเลือก" },
        { prop: "layout", type: "horizontal | vertical", def: "horizontal", desc: "ทิศทางการจัดเรียง" },
        { prop: "value (ChoiceCard)", type: "string", def: "—", desc: "ค่าของ card นี้" },
        { prop: "title", type: "string", def: "—", desc: "หัวข้อหลัก" },
        { prop: "description", type: "string", def: "—", desc: "คำอธิบายเพิ่มเติม" },
        { prop: "icon", type: "ReactNode", def: "—", desc: "ไอคอนหรือรูปภาพ" },
        { prop: "badge", type: "string", def: "—", desc: "ป้ายมุมบนขวา" },
        { prop: "showCheck", type: "boolean", def: "false", desc: "แสดง checkmark เมื่อเลือก" },
        { prop: "disabled", type: "boolean", def: "false", desc: "ปิดการเลือก" },
        { prop: "size", type: "sm | md | lg", def: "md", desc: "ขนาดของ card" },
        { prop: "options (RadioCard)", type: "RadioCardOption[]", def: "—", desc: "รายการตัวเลือก" },
        { prop: "columns (RadioCard)", type: "1|2|3|4", def: "2", desc: "จำนวน column ของ grid" },
      ]} />
    </div>
  );
}
