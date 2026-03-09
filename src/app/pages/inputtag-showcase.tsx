import React, { useState } from "react";
import { X } from "lucide-react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel, btnStyle } from "./_showcase-factory";

function TagInput({ tags, onChange, placeholder, disabled, maxTags, variant = "default" }: { tags: string[]; onChange: (t: string[]) => void; placeholder?: string; disabled?: boolean; maxTags?: number; variant?: "default" | "outline" | "filled" }) {
  const [input, setInput] = useState("");
  const borderCls = variant === "filled" ? "bg-muted/30 border-transparent" : variant === "outline" ? "bg-transparent border-border" : "bg-card border-border";
  const add = () => {
    const v = input.trim();
    if (!v || tags.includes(v) || (maxTags && tags.length >= maxTags)) return;
    onChange([...tags, v]);
    setInput("");
  };
  return (
    <div className={`flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-[var(--radius)] border ${borderCls} transition-colors focus-within:border-primary ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-sm)] bg-primary/10 text-primary" style={btnStyle}>
          {t}
          <button className="hover:text-destructive cursor-pointer" onClick={() => onChange(tags.filter((x) => x !== t))}><X size={12} /></button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } if (e.key === "Backspace" && !input && tags.length) onChange(tags.slice(0, -1)); }}
        placeholder={!tags.length ? placeholder : ""}
        className="flex-1 min-w-[80px] bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        style={fontLabel}
        disabled={disabled}
      />
    </div>
  );
}

export function InputTagShowcase() {
  const [tags1, setTags1] = useState(["React", "TypeScript"]);
  const [tags2, setTags2] = useState(["Frontend", "Backend"]);
  const [tags3, setTags3] = useState(["Tag 1", "Tag 2", "Tag 3"]);
  const [tags4, setTags4] = useState<string[]>([]);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.inputtag.title" descKey="page.inputtag.desc" />

      <Section title="Basic Usage" description="Type and press Enter to add tags. Click X or Backspace to remove." code={`<SskInputTag value={tags} onChange={setTags} placeholder="Add tags..." />`}>
        <DemoBox>
          <div className="max-w-md"><TagInput tags={tags1} onChange={setTags1} placeholder="Add skills..." /></div>
        </DemoBox>
      </Section>

      <Section title="Variants" description="Three visual variants consistent with other form components." code={`<SskInputTag variant="default" />\n<SskInputTag variant="outline" />\n<SskInputTag variant="filled" />`}>
        <DemoBox>
          <div className="space-y-4 max-w-md">
            <DemoCard label="Default"><TagInput tags={tags2} onChange={setTags2} placeholder="Default variant..." /></DemoCard>
            <DemoCard label="Outline"><TagInput tags={["Outline"]} onChange={() => {}} variant="outline" placeholder="Outline..." /></DemoCard>
            <DemoCard label="Filled"><TagInput tags={["Filled"]} onChange={() => {}} variant="filled" placeholder="Filled..." /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Max Tags" description="Limit the number of tags that can be added." code={`<SskInputTag maxTags={5} />`}>
        <DemoBox>
          <div className="max-w-md">
            <TagInput tags={tags3} onChange={setTags3} maxTags={5} placeholder="Max 5 tags..." />
            <span className="text-muted-foreground mt-1 block" style={fontLabel}>{tags3.length}/5 tags</span>
          </div>
        </DemoBox>
      </Section>

      <Section title="Disabled" description="Non-interactive disabled state." code={`<SskInputTag disabled />`}>
        <DemoBox>
          <div className="max-w-md"><TagInput tags={["Locked", "Tags"]} onChange={() => {}} disabled placeholder="Disabled..." /></div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "string[]", def: "[]", desc: "Array of tag values" },
        { prop: "onChange", type: "(tags: string[]) => void", def: "—", desc: "Callback when tags change" },
        { prop: "placeholder", type: "string", def: "—", desc: "Input placeholder text" },
        { prop: "maxTags", type: "number", def: "—", desc: "Maximum number of tags" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable input" },
        { prop: "variant", type: '"default" | "outline" | "filled"', def: '"default"', desc: "Visual variant" },
      ]} />
    </div>
  );
}
