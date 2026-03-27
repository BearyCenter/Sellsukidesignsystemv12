import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";
import { Rating } from "../../lib/components/ds-rating";

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

export function RatingShowcase() {
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(4);
  const [v3, setV3] = useState(2);
  const [v4, setV4] = useState(0);
  const [v5, setV5] = useState(3);
  const [v6, setV6] = useState(4);
  const [v7, setV7] = useState(5);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.rating.title" descKey="page.rating.desc" />

      <Section title="Basic" description="Interactive star rating." code={`<SskRating value={value} onChange={setValue} />`}>
        <DemoBox>
          <div className="space-y-4">
            <Rating value={v1} onChange={setV1} />
            <Rating value={v2} onChange={setV2} showValue />
          </div>
        </DemoBox>
      </Section>

      <Section title="Icons" description="Star, heart, and thumbs up variants.">
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Stars"><Rating value={v1} onChange={setV1} icon="star" showValue /></DemoCard>
            <DemoCard label="Hearts"><Rating value={v3} onChange={setV3} icon="heart" showValue /></DemoCard>
            <DemoCard label="Thumbs"><Rating value={v4} onChange={setV4} icon="thumb" max={3} showValue /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts.">
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Small"><Rating value={v5} onChange={setV5} size="sm" /></DemoCard>
            <DemoCard label="Medium"><Rating value={v6} onChange={setV6} size="md" /></DemoCard>
            <DemoCard label="Large"><Rating value={v7} onChange={setV7} size="lg" /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Read Only & Disabled" description="Non-interactive display modes.">
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Read Only"><Rating value={4} readOnly showValue /></DemoCard>
            <DemoCard label="Disabled"><Rating value={2} disabled /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Custom Max" description="Configurable number of icons." code={`<SskRating max={10} />`}>
        <DemoBox>
          <div className="space-y-4">
            <DemoCard label="Max 10">
              {(() => { const [v, setV] = useState(7); return <Rating value={v} onChange={setV} max={10} size="sm" showValue />; })()}
            </DemoCard>
            <DemoCard label="Max 3">
              {(() => { const [v, setV] = useState(2); return <Rating value={v} onChange={setV} max={3} icon="heart" showValue />; })()}
            </DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="With Label" description="Rating with inline label.">
        <DemoBox>
          {(() => { const [v, setV] = useState(4); return <Rating value={v} onChange={setV} label="Your rating:" showValue />; })()}
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "number", def: "0", desc: "Current rating value" },
        { prop: "onChange", type: "(v: number) => void", def: "—", desc: "Value change handler" },
        { prop: "max", type: "number", def: "5", desc: "Maximum rating value" },
        { prop: "size", type: '"sm"|"md"|"lg"', def: '"md"', desc: "Icon size" },
        { prop: "icon", type: '"star"|"heart"|"thumb"', def: '"star"', desc: "Icon type" },
        { prop: "showValue", type: "boolean", def: "false", desc: "Show numeric value" },
        { prop: "label", type: "string", def: "—", desc: "Inline label text" },
        { prop: "readOnly", type: "boolean", def: "false", desc: "Display-only mode" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable interaction" },
      ]} />
    </div>
  );
}
