import React, { useState } from "react";
import { PageHeader, Section, DemoBox, DemoCard, APITable, fontLabel } from "./_showcase-factory";
import { TagInput } from "../../lib/components/ds-taginput";

export function InputTagShowcase() {
  const [tags1, setTags1] = useState(["React", "TypeScript"]);
  const [tags2, setTags2] = useState(["Frontend", "Backend"]);
  const [tags3, setTags3] = useState(["Tag 1", "Tag 2", "Tag 3"]);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.inputtag.title" descKey="page.inputtag.desc" />

      <Section title="Basic Usage" description="Type and press Enter to add tags. Click X or Backspace to remove." code={`<TagInput tags={tags} onChange={setTags} placeholder="Add tags..." />`}>
        <DemoBox>
          <div className="max-w-md"><TagInput tags={tags1} onChange={setTags1} placeholder="Add skills..." /></div>
        </DemoBox>
      </Section>

      <Section title="Variants" description="Three visual variants consistent with other form components." code={`<TagInput variant="default" />\n<TagInput variant="outline" />\n<TagInput variant="filled" />`}>
        <DemoBox>
          <div className="space-y-4 max-w-md">
            <DemoCard label="Default"><TagInput tags={tags2} onChange={setTags2} placeholder="Default variant..." /></DemoCard>
            <DemoCard label="Outline"><TagInput tags={["Outline"]} onChange={() => {}} variant="outline" placeholder="Outline..." /></DemoCard>
            <DemoCard label="Filled"><TagInput tags={["Filled"]} onChange={() => {}} variant="filled" placeholder="Filled..." /></DemoCard>
          </div>
        </DemoBox>
      </Section>

      <Section title="Max Tags" description="Limit the number of tags that can be added." code={`<TagInput maxTags={5} />`}>
        <DemoBox>
          <div className="max-w-md">
            <TagInput tags={tags3} onChange={setTags3} maxTags={5} placeholder="Max 5 tags..." />
            <span className="text-muted-foreground mt-1 block" style={fontLabel}>{tags3.length}/5 tags</span>
          </div>
        </DemoBox>
      </Section>

      <Section title="Disabled" description="Non-interactive disabled state." code={`<TagInput disabled />`}>
        <DemoBox>
          <div className="max-w-md"><TagInput tags={["Locked", "Tags"]} onChange={() => {}} disabled placeholder="Disabled..." /></div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "tags", type: "string[]", def: "[]", desc: "Array of tag values" },
        { prop: "onChange", type: "(tags: string[]) => void", def: "—", desc: "Callback when tags change" },
        { prop: "placeholder", type: "string", def: "—", desc: "Input placeholder text" },
        { prop: "maxTags", type: "number", def: "—", desc: "Maximum number of tags" },
        { prop: "disabled", type: "boolean", def: "false", desc: "Disable input" },
        { prop: "variant", type: '"default" | "outline" | "filled"', def: '"default"', desc: "Visual variant" },
      ]} />
    </div>
  );
}
