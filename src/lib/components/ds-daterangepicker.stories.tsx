import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker } from "./ds-daterangepicker";
import type { DateRange } from "./ds-daterangepicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Data Entry/DateRangePicker",
  component: DateRangePicker,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ from: null, to: null });
    return (
      <div className="p-4 h-96">
        <DateRangePicker
          value={range}
          onChange={setRange}
          placeholder="Select date range"
        />
        {range.from && (
          <p className="mt-4 text-sm text-muted-foreground">
            From: {range.from.toLocaleDateString()} — To: {range.to?.toLocaleDateString() ?? "..."}
          </p>
        )}
      </div>
    );
  },
};

export const Last7Days: StoryObj = {
  render: () => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    const [range, setRange] = useState<DateRange>({ from, to });
    return (
      <div className="p-4 h-96">
        <DateRangePicker value={range} onChange={setRange} />
      </div>
    );
  },
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 h-96">
      <DateRangePicker size="sm" placeholder="Small" />
      <DateRangePicker size="md" placeholder="Medium (default)" />
      <DateRangePicker size="lg" placeholder="Large" />
    </div>
  ),
};
