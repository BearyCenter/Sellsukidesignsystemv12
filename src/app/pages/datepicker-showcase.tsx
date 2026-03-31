import { useState } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { DatePicker } from "../../lib/components/ds-datepicker";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";
import { DSButton } from "../../lib/components/ds-button";

export function DatePickerShowcase() {
  const { t } = useI18n();
  const [date1, setDate1] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [date3, setDate3] = useState<Date | null>(new Date());
  const [date4, setDate4] = useState<Date | null>(null);
  const [date5, setDate5] = useState<Date | null>(null);
  const [range1, setRange1] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [date6, setDate6] = useState<Date | null>(null);
  const [date7, setDate7] = useState<Date | null>(null);

  const disabledDates = [
    new Date(2026, 2, 10),
    new Date(2026, 2, 15),
    new Date(2026, 2, 20),
  ];

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.datepicker.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.datepicker.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.datepicker.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants consistent with other form components."
        code={`import { DatePicker } from "./components/ds-datepicker";

<DatePicker variant="default" label="Default" placeholder="Pick a date…" />
<DatePicker variant="outlined" label="Outlined" placeholder="Pick a date…" />
<DatePicker variant="filled" label="Filled" placeholder="Pick a date…" />
<DatePicker variant="ghost" label="Ghost" placeholder="Pick a date…" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DatePicker variant="default" label="Default" value={date1} onChange={setDate1} clearable /></DemoCard>
          <DemoCard label="Outlined"><DatePicker variant="outlined" label="Outlined" value={date1} onChange={setDate1} clearable /></DemoCard>
          <DemoCard label="Filled"><DatePicker variant="filled" label="Filled" value={date1} onChange={setDate1} clearable /></DemoCard>
          <DemoCard label="Ghost"><DatePicker variant="ghost" label="Ghost" value={date1} onChange={setDate1} clearable /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes to match different form densities."
        code={`<DatePicker size="sm" label="Small" />
<DatePicker size="md" label="Medium" />
<DatePicker size="lg" label="Large" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DemoCard label="Small"><DatePicker size="sm" label="Small" value={date2} onChange={setDate2} clearable /></DemoCard>
          <DemoCard label="Medium"><DatePicker size="md" label="Medium" value={date2} onChange={setDate2} clearable /></DemoCard>
          <DemoCard label="Large"><DatePicker size="lg" label="Large" value={date2} onChange={setDate2} clearable /></DemoCard>
        </div>
      </Section>

      <Section
        title="States"
        description="Validation states with error and success messages."
        code={`<DatePicker label="Due Date" state="error" errorMessage="Due date is required" required />
<DatePicker label="Start Date" state="success" successMessage="Date confirmed" value={today} />
<DatePicker label="Archive Date" disabled value={today} helperText="Locked" />`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DemoCard label="Default"><DatePicker label="Due Date" value={date4} onChange={setDate4} clearable helperText="Select a due date" /></DemoCard>
          <DemoCard label="Error"><DatePicker label="Due Date" state="error" errorMessage="Due date is required" required value={null} onChange={() => {}} /></DemoCard>
          <DemoCard label="Success"><DatePicker label="Start Date" state="success" successMessage="Date confirmed" value={date3} onChange={setDate3} /></DemoCard>
          <DemoCard label="Disabled"><DatePicker label="Archive Date" disabled value={date3} helperText="This field is locked" /></DemoCard>
        </div>
      </Section>

      <Section
        title="With Time Picker"
        description="Enable time selection for datetime fields."
        code={`<DatePicker
  label="Event Start"
  showTime
  clearable
  value={date}
  onChange={setDate}
  helperText="Select date and time"
/>`}
      >
        <div className="max-w-sm">
          <DatePicker label="Event Start" showTime clearable value={date5} onChange={setDate5} helperText="Select date and time" />
        </div>
      </Section>

      <Section
        title="Date Range"
        description="Select a start and end date for range-based filters and reports."
        code={`const [range, setRange] = useState({ start: null, end: null });

<DatePicker
  mode="range"
  label="Report Period"
  clearable
  rangeValue={range}
  onRangeChange={setRange}
/>`}
      >
        <div className="max-w-md">
          <DatePicker mode="range" label="Report Period" clearable rangeValue={range1} onRangeChange={setRange1} helperText="Click to select start, then end date" />
        </div>
      </Section>

      <Section
        title="Min / Max & Disabled Dates"
        description="Restrict selectable dates with min/max boundaries and specific disabled dates."
        code={`const disabledDates = [new Date(2026, 2, 10), new Date(2026, 2, 15)];

<DatePicker
  label="Appointment"
  minDate={new Date()}
  maxDate={new Date(2026, 11, 31)}
  disabledDates={disabledDates}
  clearable
/>`}
      >
        <div className="max-w-sm">
          <DatePicker label="Appointment" minDate={new Date()} maxDate={new Date(2026, 11, 31)} disabledDates={disabledDates} clearable value={date6} onChange={setDate6} helperText="Mar 10, 15, 20 are disabled. Past dates unavailable." />
        </div>
      </Section>

      <Section
        title="Custom Footer"
        description="Inject custom footer actions like quick presets."
        code={`<DatePicker
  label="Due Date"
  clearable
  footer={
    <div className="flex gap-2">
      <button onClick={() => setDate(addDays(7))}>+7 days</button>
      <button onClick={() => setDate(addDays(30))}>+30 days</button>
    </div>
  }
/>`}
      >
        <div className="max-w-sm">
          <DatePicker
            label="Due Date"
            clearable
            value={date7}
            onChange={setDate7}
            footer={
              <div className="flex gap-2">
                <DSButton variant="secondary" size="sm" onClick={() => { const d = new Date(); d.setDate(d.getDate() + 7); setDate7(d); }}>
                  +7 days
                </DSButton>
                <DSButton variant="secondary" size="sm" onClick={() => { const d = new Date(); d.setDate(d.getDate() + 30); setDate7(d); }}>
                  +30 days
                </DSButton>
              </div>
            }
          />
        </div>
      </Section>
    </div>
  );
}
