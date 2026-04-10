import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { RichTextEditor } from "../../lib/components/ds-richtexteditor";

// ─── Initial Content ───────────────────────────────────────────────────────────

const INITIAL_HTML = `<h2>นโยบายการคืนสินค้า</h2>
<p>ลูกค้าสามารถคืนสินค้าได้ภายใน <strong>7 วัน</strong> นับจากวันที่ได้รับสินค้า โดยมีเงื่อนไขดังนี้:</p>
<ul>
  <li>สินค้าต้องอยู่ในสภาพสมบูรณ์ ไม่มีร่องรอยการใช้งาน</li>
  <li>มีบรรจุภัณฑ์ต้นฉบับครบถ้วน</li>
  <li>มีใบเสร็จรับเงินหรือหลักฐานการสั่งซื้อ</li>
</ul>
<p>หากพบปัญหาด้านคุณภาพสินค้า กรุณาติดต่อทีมงาน <strong>ภายใน 48 ชั่วโมง</strong> หลังได้รับสินค้า</p>`;

const PRODUCT_DESC = `<p>เสื้อยืดคอกลม <strong>Premium Cotton</strong> ผ้า 100% Cotton น้ำหนัก 180g/m²</p>
<p>คุณสมบัติ:</p>
<ul>
  <li>ผ้านุ่ม สวมใส่สบาย ระบายอากาศดี</li>
  <li>ทนต่อการซัก ไม่หดตัวหลังซัก</li>
  <li>มีให้เลือก 8 สี และ 5 ขนาด</li>
</ul>`;

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function RichTextEditorShowcase() {
  const [html, setHtml] = useState(INITIAL_HTML);
  const [productHtml, setProductHtml] = useState(PRODUCT_DESC);
  const [charCount, setCharCount] = useState(0);

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.richtexteditor.title" descKey="page.richtexteditor.desc" />

      <Section
        title="Basic Usage — แก้ไขนโยบายร้านค้า"
        description="Rich text editor พร้อม toolbar ครบชุด รองรับ bold, italic, list, heading, link และอื่นๆ"
        code={`const [html, setHtml] = useState("<p>เนื้อหา...</p>");

<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="พิมพ์เนื้อหาที่นี่..."
  minHeight={200}
  toolbar={["history","format","list","align","block","link"]}
  fullscreen
/>`}
      >
        <DemoBox>
          <RichTextEditor
            value={html}
            onChange={setHtml}
            placeholder="พิมพ์เนื้อหาที่นี่..."
            minHeight={200}
            toolbar={["history", "format", "list", "align", "block", "link"]}
            fullscreen
          />
          <div className="mt-3 text-muted-foreground" style={fontLabel}>
            HTML output: {html.length} characters
          </div>
        </DemoBox>
      </Section>

      <Section
        title="Product Description — Toolbar บางส่วน"
        description="จำกัด toolbar ให้แสดงเฉพาะที่จำเป็นสำหรับคำอธิบายสินค้า"
        code={`<RichTextEditor
  value={productHtml}
  onChange={setProductHtml}
  toolbar={["format","list"]}
  minHeight={160}
  maxLength={1000}
  placeholder="คำอธิบายสินค้า..."
/>`}
      >
        <DemoBox>
          <RichTextEditor
            value={productHtml}
            onChange={(v) => { setProductHtml(v); setCharCount(v.replace(/<[^>]*>/g, "").length); }}
            toolbar={["format", "list"]}
            minHeight={160}
            placeholder="คำอธิบายสินค้า..."
          />
          <div className="mt-2 text-muted-foreground" style={fontLabel}>
            ตัวอักษร (ไม่นับ HTML): ~{charCount} ตัวอักษร
          </div>
        </DemoBox>
      </Section>

      <Section
        title="Read-Only Mode"
        description="readOnly แสดงเนื้อหาโดยไม่สามารถแก้ไขได้ เหมาะกับหน้า preview หรือ detail"
        code={`<RichTextEditor value={html} readOnly />`}
      >
        <DemoBox>
          <RichTextEditor
            value={INITIAL_HTML}
            readOnly
            minHeight={120}
          />
        </DemoBox>
      </Section>

      <Section
        title="Disabled State"
        description="disabled ปิดทั้ง toolbar และ content area"
        code={`<RichTextEditor value={html} disabled />`}
      >
        <DemoBox>
          <RichTextEditor
            value="<p>เนื้อหานี้ถูกปิดการแก้ไข</p>"
            disabled
            minHeight={80}
          />
        </DemoBox>
      </Section>

      <Section
        title="Sizes"
        description="รองรับ 3 ขนาด: sm, md (default), lg — ส่งผลต่อขนาด toolbar icon และ font"
        code={`<RichTextEditor size="sm" toolbar={["format"]} minHeight={80} />
<RichTextEditor size="md" toolbar={["format"]} minHeight={80} />
<RichTextEditor size="lg" toolbar={["format"]} minHeight={80} />`}
      >
        <DemoBox className="space-y-4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size}>
              <div className="text-muted-foreground mb-1" style={fontLabel}>size="{size}"</div>
              <RichTextEditor
                size={size}
                toolbar={["format", "list"]}
                minHeight={80}
                placeholder={`Rich text editor ขนาด ${size}`}
              />
            </div>
          ))}
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "value", type: "string", def: '""', desc: "HTML string ปัจจุบัน" },
        { prop: "onChange", type: "(html: string) => void", def: "—", desc: "callback เมื่อเนื้อหาเปลี่ยน" },
        { prop: "placeholder", type: "string", def: '""', desc: "ข้อความ placeholder" },
        { prop: "minHeight", type: "number", def: "160", desc: "ความสูงขั้นต่ำ (px)" },
        { prop: "maxHeight", type: "number", def: "—", desc: "ความสูงสูงสุด (scroll เกินนี้)" },
        { prop: "toolbar", type: "ToolbarGroup[]", def: "all groups", desc: "format | list | align | link | block | history" },
        { prop: "fullscreen", type: "boolean", def: "false", desc: "แสดงปุ่มขยายเต็มจอ" },
        { prop: "readOnly", type: "boolean", def: "false", desc: "แสดงอย่างเดียว ไม่แก้ไขได้" },
        { prop: "disabled", type: "boolean", def: "false", desc: "ปิดการใช้งาน" },
        { prop: "size", type: "sm | md | lg", def: "md", desc: "ขนาด component" },
      ]} />
    </div>
  );
}
