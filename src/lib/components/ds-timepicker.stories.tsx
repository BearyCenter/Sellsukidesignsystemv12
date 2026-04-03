import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker, DateTimePicker } from "./ds-timepicker";
import type { TimeValue } from "./ds-timepicker";

const meta: Meta<typeof TimePicker> = {
  title: "Data Entry/TimePicker",
  component: TimePicker,
  parameters: { layout: "padded" },
};
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 30 });
    return (
      <div className="p-4 h-64">
        <TimePicker value={time} onChange={setTime} />
        <p className="mt-4 text-sm text-muted-foreground">
          Selected: {time.hours.toString().padStart(2, "0")}:{time.minutes.toString().padStart(2, "0")}
        </p>
      </div>
    );
  },
};

export const Format12h: StoryObj = {
  render: () => (
    <div className="p-4 h-64">
      <TimePicker format="12h" />
    </div>
  ),
};

export const WithSeconds: StoryObj = {
  render: () => (
    <div className="p-4 h-64">
      <TimePicker showSeconds />
    </div>
  ),
};

export const DateTimeCombined: StoryObj = {
  name: "DateTimePicker",
  render: () => {
    const [date, setDate] = useState(new Date());
    return (
      <div className="p-4 h-96">
        <DateTimePicker value={date} onChange={setDate} />
        <p className="mt-4 text-sm text-muted-foreground">
          Selected: {date.toLocaleString()}
        </p>
      </div>
    );
  },
};
