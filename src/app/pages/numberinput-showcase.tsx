import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel } from "./_showcase-factory";
import { NumberInput } from "../../lib/components/ds-numberinput";

export function NumberInputShowcase() {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(99);
  const [temp, setTemp] = useState(20);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.numberinput.title" descKey="page.numberinput.desc" />

      <Section title="Sizes" description="Three sizes to match form density." code={`<NumberInput size="sm" label="Small" defaultValue={0} />
<NumberInput size="md" label="Medium" defaultValue={0} />
<NumberInput size="lg" label="Large" defaultValue={0} />`}>
        <DemoBox>
          <div className="flex flex-wrap items-start gap-6">
            <DemoCard label="Small"><NumberInput size="sm" label="Quantity" defaultValue={1} min={0} /></DemoCard>
            <DemoCard label="Medium"><NumberInput size="md" label="Quantity" defaultValue={1} min={0} /></DemoCard>
            <DemoCard label="Large"><NumberInput size="lg" label="Quantity" defaultValue={1} min={0} /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Min / Max / Step" description="Constrain value range and control increment amount." code={`<NumberInput min={0} max={100} step={5} label="Discount %" />`}>
        <DemoBox>
          <div className="flex flex-wrap items-start gap-6">
            <DemoCard label="Min 0, Max 999">
              <NumberInput label="Quantity" value={qty} onChange={setQty} min={0} max={999} />
              <span className="text-muted-foreground mt-1 block" style={fontLabel}>Value: {qty}</span>
            </DemoCard>
            <DemoCard label="Step 0.5">
              <NumberInput label="Rating" value={temp} onChange={setTemp} min={0} max={5} step={0.5} />
            </DemoCard>
            <DemoCard label="Step 100">
              <NumberInput label="Price (฿)" value={price} onChange={setPrice} min={0} max={100000} step={100} />
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="States" description="Error and disabled states." code={`<NumberInput error="Quantity must be at least 1" />
<NumberInput disabled defaultValue={5} />`}>
        <DemoBox>
          <div className="flex flex-wrap items-start gap-6">
            <DemoCard label="Error">
              <NumberInput label="Stock" defaultValue={0} min={1} error="Minimum stock is 1" />
            </DemoCard>
            <DemoCard label="Disabled">
              <NumberInput label="Reserved" defaultValue={10} disabled />
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "number", def: "—", desc: "Controlled value" },
        { prop: "defaultValue", type: "number", def: "0", desc: "Initial uncontrolled value" },
        { prop: "onChange", type: "(value: number) => void", def: "—", desc: "Value change callback" },
        { prop: "min", type: "number", def: "—", desc: "Minimum allowed value" },
        { prop: "max", type: "number", def: "—", desc: "Maximum allowed value" },
        { prop: "step", type: "number", def: "1", desc: "Increment / decrement step" },
        { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Input size" },
        { prop: "label", type: "string", def: "—", desc: "Field label" },
        { prop: "error", type: "string", def: "—", desc: "Validation error message" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable the input" },
      ]} />
    </div>
  );
}
