import React, { useState } from "react";
import { PageHeader, Section, DemoBox, APITable, fontLabel } from "./_showcase-factory";
import { ImageGallery, ThumbnailCell, type GalleryImage } from "../../lib/components/ds-imagegallery";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCT_IMAGES: GalleryImage[] = [
  { id: "1", src: "https://picsum.photos/seed/prod1/400/300", alt: "เสื้อยืด Premium", name: "tshirt-black-front.jpg", size: "245 KB" },
  { id: "2", src: "https://picsum.photos/seed/prod2/400/300", alt: "เสื้อยืดด้านหลัง", name: "tshirt-black-back.jpg", size: "198 KB" },
  { id: "3", src: "https://picsum.photos/seed/prod3/400/300", alt: "รายละเอียดผ้า", name: "tshirt-detail.jpg", size: "312 KB" },
  { id: "4", src: "https://picsum.photos/seed/prod4/400/300", alt: "สีขาว", name: "tshirt-white.jpg", size: "221 KB" },
  { id: "5", src: "https://picsum.photos/seed/prod5/400/300", alt: "สีน้ำเงิน", name: "tshirt-blue.jpg", size: "276 KB" },
  { id: "6", src: "https://picsum.photos/seed/prod6/400/300", alt: "โลโก้ร้าน", name: "brand-logo.jpg", size: "88 KB" },
];

const BANNER_IMAGES: GalleryImage[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 10),
  src: `https://picsum.photos/seed/banner${i + 1}/400/300`,
  alt: `แบนเนอร์ ${i + 1}`,
  name: `banner-0${i + 1}.jpg`,
  size: `${180 + i * 30} KB`,
}));

// ─── Thumbnail demo row ────────────────────────────────────────────────────────

const ORDERS = [
  { id: "#ORD-001", product: "เสื้อยืด Premium", src: "https://picsum.photos/seed/prod1/80/80", qty: 2, total: "฿598" },
  { id: "#ORD-002", product: "กางเกงยีนส์", src: "https://picsum.photos/seed/prod7/80/80", qty: 1, total: "฿890" },
  { id: "#ORD-003", product: "รองเท้าผ้าใบ", src: "https://picsum.photos/seed/prod8/80/80", qty: 3, total: "฿2,370" },
  { id: "#ORD-004", product: "กระเป๋าเป้", src: "https://picsum.photos/seed/prod9/80/80", qty: 1, total: "฿1,290" },
];

// ─── Showcase ─────────────────────────────────────────────────────────────────

export function ImageGalleryShowcase() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "3"]);
  const [images, setImages] = useState<GalleryImage[]>(PRODUCT_IMAGES);

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.imagegallery.title" descKey="page.imagegallery.desc" />

      <Section
        title="Product Gallery — Grid View with Selection"
        description="แกลเลอรีสินค้า 4 คอลัมน์ เลือกได้หลายรูป พร้อม lightbox เมื่อคลิก"
        code={`<ImageGallery
  images={productImages}
  columns={4}
  selectable
  selectedIds={selectedIds}
  onSelectChange={setSelectedIds}
  lightbox
  onDelete={handleDelete}
  defaultLayout="grid"
/>`}
      >
        <DemoBox>
          <ImageGallery
            images={images}
            columns={4}
            selectable
            selectedIds={selectedIds}
            onSelectChange={setSelectedIds}
            lightbox
            onDelete={handleDelete}
            defaultLayout="grid"
          />
          <div className="mt-3 text-muted-foreground" style={fontLabel}>
            เลือกแล้ว {selectedIds.length} รูป จาก {images.length} รูปทั้งหมด
          </div>
        </DemoBox>
      </Section>

      <Section
        title="Banner Gallery — 6 Columns, List Toggle"
        description="แกลเลอรีแบนเนอร์ — เลือกได้สูงสุด 3 รูป รองรับสลับ grid/list view"
        code={`<ImageGallery
  images={bannerImages}
  columns={6}
  selectable
  maxSelect={3}
  lightbox
  defaultLayout="grid"
/>`}
      >
        <DemoBox>
          <ImageGallery
            images={BANNER_IMAGES}
            columns={6}
            selectable
            maxSelect={3}
            lightbox
            defaultLayout="grid"
          />
        </DemoBox>
      </Section>

      <Section
        title="ThumbnailCell — ใน Order Table"
        description="ThumbnailCell แสดงรูปภาพสินค้าขนาดเล็กในตาราง รองรับ xs, sm, md"
        code={`<ThumbnailCell src={src} alt={alt} size="sm" />
<ThumbnailCell src={src} alt={alt} size="md" rounded="full" />`}
      >
        <DemoBox className="!p-0 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/20 border-b border-border">
                {["เลขออเดอร์", "รูป xs", "รูป sm", "รูป md", "สินค้า", "จำนวน", "ยอดรวม"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 text-muted-foreground" style={fontLabel}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-2 text-primary" style={fontLabel}>{o.id}</td>
                  <td className="px-4 py-2">
                    <ThumbnailCell src={o.src} alt={o.product} size="xs" />
                  </td>
                  <td className="px-4 py-2">
                    <ThumbnailCell src={o.src} alt={o.product} size="sm" />
                  </td>
                  <td className="px-4 py-2">
                    <ThumbnailCell src={o.src} alt={o.product} size="md" />
                  </td>
                  <td className="px-4 py-2 text-foreground" style={fontLabel}>{o.product}</td>
                  <td className="px-4 py-2 text-center text-muted-foreground" style={fontLabel}>{o.qty}</td>
                  <td className="px-4 py-2 text-right font-semibold" style={fontLabel}>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DemoBox>
      </Section>

      <Section
        title="ThumbnailCell Variants"
        description="รองรับ rounded, fallback เมื่อรูปโหลดไม่ได้"
        code={`<ThumbnailCell src={src} size="lg" />
<ThumbnailCell src={src} size="lg" rounded="full" />
<ThumbnailCell src="broken" size="lg" alt="fallback" />`}
      >
        <DemoBox className="flex flex-wrap gap-6 items-end">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <ThumbnailCell src="https://picsum.photos/seed/prod1/120/120" alt="สินค้า" size={size} />
              <span className="text-muted-foreground" style={fontLabel}>{size}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <ThumbnailCell src="https://picsum.photos/seed/prod2/120/120" alt="avatar" size="md" rounded="full" />
            <span className="text-muted-foreground" style={fontLabel}>rounded</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ThumbnailCell src="/broken-image.jpg" alt="ไม่มีรูป" size="md" />
            <span className="text-muted-foreground" style={fontLabel}>fallback</span>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "images", type: "GalleryImage[]", def: "—", desc: "รายการรูปภาพ { id, src, alt, name, size }" },
        { prop: "columns", type: "2|3|4|5|6", def: "4", desc: "จำนวน column ของ grid" },
        { prop: "selectable", type: "boolean", def: "false", desc: "เปิดให้เลือกรูป" },
        { prop: "selectedIds", type: "string[]", def: "[]", desc: "รูปที่เลือกอยู่" },
        { prop: "onSelectChange", type: "(ids) => void", def: "—", desc: "callback เมื่อเลือกเปลี่ยน" },
        { prop: "maxSelect", type: "number", def: "—", desc: "จำนวนรูปที่เลือกได้สูงสุด" },
        { prop: "lightbox", type: "boolean", def: "false", desc: "เปิด lightbox เมื่อคลิก" },
        { prop: "onDelete", type: "(id) => void", def: "—", desc: "handler ลบรูป" },
        { prop: "defaultLayout", type: "grid | list", def: "grid", desc: "layout เริ่มต้น" },
        { prop: "src (ThumbnailCell)", type: "string", def: "—", desc: "URL ของรูปภาพ" },
        { prop: "size (ThumbnailCell)", type: "xs|sm|md|lg", def: "sm", desc: "ขนาด thumbnail" },
        { prop: "rounded (ThumbnailCell)", type: "md | full", def: "md", desc: "รูปทรงมุม" },
      ]} />
    </div>
  );
}
