import React, { useState } from "react";
import { X } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

function Drawer({ open, onClose, title, children, side = "right", size = "md" }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; side?: "left" | "right" | "top" | "bottom"; size?: "sm" | "md" | "lg" }) {
  if (!open) return null;
  const widths = { sm: "w-72", md: "w-96", lg: "w-[480px]" };
  const heights = { sm: "h-48", md: "h-72", lg: "h-96" };
  const sideClasses = {
    right: `top-0 right-0 h-full ${widths[size]} animate-[slideRight_0.2s_ease]`,
    left: `top-0 left-0 h-full ${widths[size]} animate-[slideLeft_0.2s_ease]`,
    top: `top-0 left-0 w-full ${heights[size]} animate-[slideTop_0.2s_ease]`,
    bottom: `bottom-0 left-0 w-full ${heights[size]} animate-[slideBottom_0.2s_ease]`,
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />
      <div className={`absolute bg-card border border-border shadow-lg flex flex-col ${sideClasses[side]}`}>
        <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <span className="text-foreground" style={fontLabelBold}>{title}</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        <div className="px-5 py-3 border-t border-border flex items-center gap-2 flex-shrink-0">
          <button className="px-4 py-2 rounded-[var(--radius)] bg-primary text-primary-foreground cursor-pointer" style={btnStyle} onClick={onClose}>Save</button>
          <button className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer" style={btnStyle} onClick={onClose}>Cancel</button>
        </div>
      </div>
      <style>{`
        @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideTop { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes slideBottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}

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
              <button key={s} onClick={() => setOpenSide(s)} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer" style={btnStyle}>
                Open {s}
              </button>
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
              <button key={s} onClick={() => setOpenSize(s)} className="px-4 py-2 rounded-[var(--radius)] border border-border text-foreground hover:bg-muted/30 cursor-pointer" style={btnStyle}>
                Size: {s}
              </button>
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
