import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react";
import { PageHeader, Section, DemoBox, APITable, fontLabel, fontLabelBold, smallLabel, btnStyle } from "./_showcase-factory";

/* ─── ImagePreview Component ───────────────────────────────────────────────── */

function ImagePreview({
  images, initialIndex = 0,
}: {
  images: { src: string; alt: string; thumbnail?: string }[];
  initialIndex?: number;
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const current = images[idx];
  const prev = () => { setIdx(i => (i - 1 + images.length) % images.length); setZoom(1); setRotation(0); };
  const next = () => { setIdx(i => (i + 1) % images.length); setZoom(1); setRotation(0); };
  const zoomIn = () => setZoom(z => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom(z => Math.max(z - 0.25, 0.5));
  const rotate = () => setRotation(r => (r + 90) % 360);

  return (
    <div>
      {/* Thumbnails */}
      <div className="flex flex-wrap gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => { setIdx(i); setOpen(true); setZoom(1); setRotation(0); }}
            className={`rounded-[var(--radius-md)] overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80
              ${idx === i && open ? "border-primary" : "border-border"}`}>
            <div className="w-20 h-20 bg-muted flex items-center justify-center overflow-hidden">
              <img src={img.thumbnail || img.src} alt={img.alt}
                className="w-full h-full object-cover" loading="lazy" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-foreground/80 flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-foreground/20">
            <span className="text-white" style={fontLabel}>{current.alt} ({idx + 1}/{images.length})</span>
            <div className="flex items-center gap-1">
              <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"><ZoomOut size={16} /></button>
              <span className="text-white/70 px-2" style={btnStyle}>{Math.round(zoom * 100)}%</span>
              <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"><ZoomIn size={16} /></button>
              <button onClick={rotate} className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"><RotateCw size={16} /></button>
              <div className="w-px h-5 bg-white/20 mx-1" />
              <button onClick={() => { setOpen(false); setZoom(1); setRotation(0); }}
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"><X size={16} /></button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden"
            onClick={e => { if (e.target === e.currentTarget) { setOpen(false); setZoom(1); setRotation(0); } }}>
            {images.length > 1 && (
              <button onClick={prev} className="absolute left-4 w-10 h-10 rounded-full bg-foreground/30 text-white flex items-center justify-center hover:bg-foreground/50 cursor-pointer z-10">
                <ChevronLeft size={20} />
              </button>
            )}
            <img src={current.src} alt={current.alt}
              className="max-w-[90%] max-h-[80vh] object-contain transition-transform"
              style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }} />
            {images.length > 1 && (
              <button onClick={next} className="absolute right-4 w-10 h-10 rounded-full bg-foreground/30 text-white flex items-center justify-center hover:bg-foreground/50 cursor-pointer z-10">
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Bottom thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 py-3 bg-foreground/20">
              {images.map((img, i) => (
                <button key={i} onClick={() => { setIdx(i); setZoom(1); setRotation(0); }}
                  className={`w-12 h-12 rounded-[var(--radius-sm)] overflow-hidden border-2 cursor-pointer transition-all
                    ${i === idx ? "border-white" : "border-transparent opacity-50 hover:opacity-80"}`}>
                  <img src={img.thumbnail || img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Showcase ─────────────────────────────────────────────────────────────── */

const sampleImages = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", alt: "Mountain landscape", thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", alt: "Forest path", thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", alt: "Green forest", thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", alt: "Beach sunset", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200" },
];

export function ImagePreviewShowcase() {
  return (
    <div className="space-y-14">
      <PageHeader titleKey="page.imagepreview.title" descKey="page.imagepreview.desc" />

      <Section title="Gallery" description="Click any thumbnail to open the lightbox viewer." code={`<SskImagePreview images={[{ src: "...", alt: "..." }]} />`}>
        <DemoBox><ImagePreview images={sampleImages} /></DemoBox>
      </Section>

      <Section title="Single Image" description="Single image with zoom and rotate." code={`<SskImagePreview images={[{ src: "...", alt: "Photo" }]} />`}>
        <DemoBox><ImagePreview images={[sampleImages[0]]} /></DemoBox>
      </Section>

      <Section title="Features" description="Built-in lightbox tools.">
        <DemoBox>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <ZoomIn size={14} />, label: "Zoom In (up to 300%)" },
                { icon: <ZoomOut size={14} />, label: "Zoom Out (down to 50%)" },
                { icon: <RotateCw size={14} />, label: "Rotate 90°" },
                { icon: <ChevronLeft size={14} />, label: "Previous / Next" },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] bg-muted">
                  <span className="text-primary">{f.icon}</span>
                  <span className="text-foreground" style={smallLabel}>{f.label}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground" style={smallLabel}>Click outside the image or press the X button to close the lightbox.</p>
          </div>
        </DemoBox>
      </Section>

      <APITable rows={[
        { prop: "images", type: "{ src, alt, thumbnail? }[]", def: "[]", desc: "Array of image objects" },
        { prop: "initialIndex", type: "number", def: "0", desc: "Starting image index" },
        { prop: "images[].src", type: "string", def: "—", desc: "Full-size image URL" },
        { prop: "images[].alt", type: "string", def: "—", desc: "Alt text for accessibility" },
        { prop: "images[].thumbnail", type: "string", def: "src", desc: "Thumbnail URL (falls back to src)" },
      ]} />
    </div>
  );
}
