import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel } from "./_showcase-factory";
import { Drawer } from "../../lib/components/ds-drawer";
import { DSButton } from "../../lib/components/ds-button";

export function DrawerShowcase() {
  const [openSide, setOpenSide] = useState<string | null>(null);
  const [openSize, setOpenSize] = useState<string | null>(null);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.drawer.title" descKey="page.drawer.desc" />

      <Section title="Placement" description="Slide from any edge of the viewport." code={`<SskDrawer side="right" open={open} onClose={onClose}>\n  Content here\n</SskDrawer>`}>
        <DemoBox>
          <div className="flex flex-wrap gap-3">
            {(["left", "right", "top", "bottom"] as const).map((s) => (
              <DSButton key={s} variant="outline" onClick={() => setOpenSide(s)}>
                Open {s}
              </DSButton>
            ))}
          </div>
          {(["left", "right", "top", "bottom"] as const).map((s) => (
            <Drawer key={s} open={openSide === s} onClose={() => setOpenSide(null)} title={`${s.charAt(0).toUpperCase() + s.slice(1)} Drawer`} side={s}>
              <div className="space-y-3">
                <p className="text-muted-foreground" style={fontLabel}>This drawer slides in from the {s}. Use drawers for detail views, forms, settings panels, and filter menus.</p>
                <div className="p-4 rounded-[var(--radius)] border border-border bg-muted/10">
                  <span className="text-foreground block" style={fontLabelBold}>Form Example</span>
                  <span className="text-muted-foreground" style={smallLabel}>Add form fields or any content here.</span>
                </div>
              </div>
            </Drawer>
          ))}
        </DemoBox>
      </Section>

      <Section title="Sizes" description="Control drawer width (horizontal) or height (vertical)." code={`<SskDrawer size="lg" side="right" />`}>
        <DemoBox>
          <div className="flex flex-wrap gap-3">
            {(["sm", "md", "lg"] as const).map((s) => (
              <DSButton key={s} variant="outline" onClick={() => setOpenSize(s)}>
                Size: {s}
              </DSButton>
            ))}
          </div>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Drawer key={s} open={openSize === s} onClose={() => setOpenSize(null)} title={`Size ${s.toUpperCase()}`} side="right" size={s}>
              <p className="text-muted-foreground" style={fontLabel}>This is a {s} drawer ({s === "sm" ? "288px" : s === "md" ? "384px" : "480px"} wide).</p>
            </Drawer>
          ))}
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "open", type: "boolean", def: "false", desc: "Open state" },
        { prop: "onClose", type: "() => void", def: "—", desc: "Close callback" },
        { prop: "title", type: "string", def: "—", desc: "Header title" },
        { prop: "side", type: '"left" | "right" | "top" | "bottom"', def: '"right"', desc: "Slide direction" },
        { prop: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Drawer size" },
        { prop: "children", type: "ReactNode", def: "—", desc: "Drawer content" },
      ]} />
    </div>
  );
}
