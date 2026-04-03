import type { Meta, StoryObj } from "@storybook/react";
import { LineChart, AreaChart, BarChart, DonutChart, MiniSparkline } from "./ds-chart";

// ─── Shared Data ──────────────────────────────────────────────────────────────

const monthlyData = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 3800 },
  { label: "Mar", value: 5100 },
  { label: "Apr", value: 4700 },
  { label: "May", value: 6300 },
  { label: "Jun", value: 5900 },
  { label: "Jul", value: 7200 },
];

const multiSeries = [
  { name: "Revenue", data: monthlyData },
  {
    name: "Orders",
    data: monthlyData.map((d) => ({ label: d.label, value: Math.round(d.value * 0.6) })),
  },
];

// ─── LineChart ────────────────────────────────────────────────────────────────

const lineMeta: Meta<typeof LineChart> = {
  title: "Charts/LineChart",
  component: LineChart,
  parameters: { layout: "padded" },
};
export default lineMeta;

export const SingleSeries: StoryObj<typeof LineChart> = {
  render: () => (
    <div className="w-full max-w-2xl">
      <LineChart series={[{ name: "Revenue", data: monthlyData }]} />
    </div>
  ),
};

export const MultiSeries: StoryObj<typeof LineChart> = {
  render: () => (
    <div className="w-full max-w-2xl">
      <LineChart series={multiSeries} smooth />
    </div>
  ),
};

export const AreaChartStory: StoryObj<typeof AreaChart> = {
  name: "AreaChart",
  render: () => (
    <div className="w-full max-w-2xl">
      <AreaChart series={multiSeries} smooth fillOpacity={0.2} />
    </div>
  ),
};

export const BarChartStory: StoryObj<typeof BarChart> = {
  name: "BarChart",
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChart series={multiSeries} />
    </div>
  ),
};

export const BarChartStacked: StoryObj<typeof BarChart> = {
  name: "BarChart — Stacked",
  render: () => (
    <div className="w-full max-w-2xl">
      <BarChart series={multiSeries} stacked />
    </div>
  ),
};

export const DonutChartStory: StoryObj<typeof DonutChart> = {
  name: "DonutChart",
  render: () => (
    <DonutChart
      centerLabel="Total"
      centerValue="฿27K"
      data={[
        { label: "Patona", value: 12000 },
        { label: "Sukispace", value: 8000 },
        { label: "Shipmunk", value: 4500 },
        { label: "Akita", value: 2500 },
      ]}
    />
  ),
};

export const SparklineStory: StoryObj<typeof MiniSparkline> = {
  name: "MiniSparkline",
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-6">
        <MiniSparkline values={[40, 55, 48, 62, 58, 74, 71]} type="line" showValue />
        <MiniSparkline values={[40, 55, 48, 62, 58, 74, 71]} type="area" showValue />
        <MiniSparkline values={[40, 55, 48, 62, 58, 74, 71]} type="bar" showValue />
      </div>
      <div className="flex items-center gap-6">
        <MiniSparkline values={[74, 71, 62, 55, 40, 38, 30]} type="line" showValue trend="down" />
        <MiniSparkline values={[50, 50, 50, 50, 50]} type="line" showValue trend="neutral" />
      </div>
    </div>
  ),
};
