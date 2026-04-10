import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { LineChart, AreaChart, BarChart, DonutChart, MiniSparkline } from "../../lib/components/ds-chart";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

const revenueData = MONTHS.map((label, i) => ({
  label,
  value: 120000 + Math.round(Math.sin(i * 0.6) * 40000 + i * 8000),
}));

const orderData = MONTHS.map((label, i) => ({
  label,
  value: 320 + Math.round(Math.cos(i * 0.5) * 80 + i * 15),
}));

const orderStatusData = [
  { label: "จัดส่งแล้ว", value: 4821, color: "var(--chart-1)" },
  { label: "กำลังดำเนินการ", value: 1243, color: "var(--chart-2)" },
  { label: "รอชำระเงิน", value: 682, color: "var(--chart-5)" },
  { label: "ยกเลิก", value: 318, color: "var(--destructive)" },
];

const categoryData = [
  { label: "เสื้อผ้า", value: 285000 },
  { label: "อิเล็กทรอนิกส์", value: 420000 },
  { label: "อาหาร", value: 178000 },
  { label: "บ้านและสวน", value: 213000 },
  { label: "กีฬา", value: 145000 },
];

const sparkValues = [42, 58, 51, 67, 72, 68, 81, 76, 89, 94, 87, 102];

// ─── Stat Row ─────────────────────────────────────────────────────────────────

function StatRow({ label, value, values, color }: { label: string; value: string; values: number[]; color: string }) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-[var(--radius-md)] border border-border bg-card"
      style={{ gap: 16 }}
    >
      <div>
        <div className="text-muted-foreground" style={fontLabel}>{label}</div>
        <div className="text-foreground font-bold" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h4)", fontWeight: "700" }}>{value}</div>
      </div>
      <MiniSparkline values={values} type="area" color={color} width={80} height={36} showValue />
    </div>
  );
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function ChartShowcase() {
  const [lineSmooth, setLineSmooth] = useState(true);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.chart.title" descKey="page.chart.desc" />

      <Section
        title="LineChart — รายได้รายเดือน"
        description="แสดงแนวโน้มรายได้รายเดือนของร้านค้า รองรับหลาย series และ tooltip interactive"
        code={`<LineChart
  series={[
    { name: "รายได้", data: revenueData },
    { name: "ออเดอร์ (×100)", data: orderData },
  ]}
  height={260}
  showGrid showXAxis showYAxis showLegend showTooltip
  smooth
/>`}
      >
        <DemoBox>
          <div className="flex items-center gap-3 mb-4">
            <span style={fontLabel}>Smooth curves</span>
            <button
              onClick={() => setLineSmooth((v) => !v)}
              className="px-3 py-1 rounded-full cursor-pointer"
              style={{
                background: lineSmooth ? "var(--primary)" : "var(--muted)",
                color: lineSmooth ? "#fff" : "var(--foreground)",
                fontFamily: "var(--font-label)",
                fontSize: "var(--text-label)",
              }}
            >
              {lineSmooth ? "ON" : "OFF"}
            </button>
          </div>
          <LineChart
            series={[
              { name: "รายได้ (฿)", data: revenueData },
              { name: "ออเดอร์", data: orderData },
            ]}
            height={260}
            showGrid
            showXAxis
            showYAxis
            showLegend
            showTooltip
            smooth={lineSmooth}
          />
        </DemoBox>
      </Section>

      <Section
        title="AreaChart — ปริมาณออเดอร์สะสม"
        description="พื้นที่ใต้เส้นกราฟแสดงปริมาณสะสม เหมาะกับ KPI trends"
        code={`<AreaChart
  series={[{ name: "ออเดอร์", data: orderData }]}
  height={200}
  fillOpacity={0.15}
  showGrid showXAxis showTooltip
/>`}
      >
        <DemoBox>
          <AreaChart
            series={[{ name: "ออเดอร์", data: orderData }]}
            height={200}
            fillOpacity={0.15}
            showGrid
            showXAxis
            showTooltip
            smooth
          />
        </DemoBox>
      </Section>

      <Section
        title="BarChart — รายได้แยกตามหมวดหมู่"
        description="Bar chart แนวตั้งแสดงรายได้แต่ละหมวดสินค้า รองรับ horizontal mode"
        code={`<BarChart
  series={[{ name: "รายได้", data: categoryData }]}
  height={220}
  radius={6}
  showGrid showXAxis showYAxis showTooltip
/>`}
      >
        <DemoBox className="space-y-6">
          <BarChart
            series={[{ name: "รายได้ (฿)", data: categoryData }]}
            height={220}
            radius={6}
            showGrid
            showXAxis
            showYAxis
            showTooltip
          />
          <BarChart
            series={[{ name: "รายได้ (฿)", data: categoryData }]}
            height={200}
            radius={4}
            horizontal
            showGrid
            showXAxis
            showYAxis
            showTooltip
          />
        </DemoBox>
      </Section>

      <Section
        title="DonutChart — สัดส่วนสถานะออเดอร์"
        description="แสดงสัดส่วนออเดอร์แยกตามสถานะ มีตัวเลขรวมตรงกลาง"
        code={`<DonutChart
  data={orderStatusData}
  size={200}
  innerRatio={0.6}
  centerLabel="ออเดอร์ทั้งหมด"
  centerValue="7,064"
  showLegend showTooltip
/>`}
      >
        <DemoBox className="flex flex-wrap gap-8 justify-center">
          <DonutChart
            data={orderStatusData}
            size={200}
            innerRatio={0.6}
            centerLabel="ออเดอร์ทั้งหมด"
            centerValue="7,064"
            showLegend
            showTooltip
          />
          <DonutChart
            data={orderStatusData}
            size={160}
            innerRatio={0}
            showLegend
            showTooltip
          />
        </DemoBox>
      </Section>

      <Section
        title="MiniSparkline — KPI Card Row"
        description="Sparkline ขนาดเล็กสำหรับใช้ใน stat card แสดงแนวโน้มแบบ inline"
        code={`<MiniSparkline values={[42,58,51,67,72,68,81,76,89,94,87,102]} type="area" showValue />`}
      >
        <DemoBox>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatRow label="รายได้รวม" value="฿284,000" values={sparkValues} color="var(--chart-1)" />
            <StatRow label="ออเดอร์ใหม่" value="1,243" values={sparkValues.map((v) => v * 0.8)} color="var(--chart-2)" />
            <StatRow label="สินค้าขายดี" value="482 ชิ้น" values={sparkValues.map((v) => v * 1.1)} color="var(--chart-4)" />
            <StatRow label="ลูกค้าใหม่" value="318 คน" values={sparkValues.map((v) => v * 0.6)} color="var(--chart-5)" />
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "series", type: "ChartSeries[]", def: "—", desc: "ข้อมูล series (name + data[])" },
        { prop: "height", type: "number", def: "240", desc: "ความสูงของกราฟ (px)" },
        { prop: "showGrid", type: "boolean", def: "false", desc: "แสดง grid lines" },
        { prop: "showXAxis / showYAxis", type: "boolean", def: "false", desc: "แสดงแกน X / Y" },
        { prop: "showLegend", type: "boolean", def: "false", desc: "แสดง legend" },
        { prop: "showTooltip", type: "boolean", def: "false", desc: "แสดง tooltip เมื่อ hover" },
        { prop: "smooth", type: "boolean", def: "false", desc: "LineChart: เส้นโค้ง catmull-rom" },
        { prop: "fillOpacity", type: "number", def: "0.2", desc: "AreaChart: ความโปร่งใสของ fill" },
        { prop: "horizontal", type: "boolean", def: "false", desc: "BarChart: แสดงแนวนอน" },
        { prop: "data", type: "{ label, value, color? }[]", def: "—", desc: "DonutChart: ข้อมูล segment" },
        { prop: "innerRatio", type: "number", def: "0.6", desc: "DonutChart: 0=pie, 0.6=donut" },
        { prop: "values", type: "number[]", def: "—", desc: "MiniSparkline: ค่าข้อมูล" },
        { prop: "type", type: "line | bar | area", def: "line", desc: "MiniSparkline: รูปแบบกราฟ" },
      ]} />
    </div>
  );
}
