import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface ImagePreviewItem {
  src: string;
  alt: string;
  thumbnail?: string;
}

export interface ImagePreviewProps {
  images: ImagePreviewItem[];
  initialIndex?: number;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function ImagePreview({ images, initialIndex = 0 }: ImagePreviewProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const current = images[idx];
  const prev = () => {
    setIdx((i) => (i - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  };
  const next = () => {
    setIdx((i) => (i + 1) % images.length);
    setZoom(1);
    setRotation(0);
  };
  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const rotate = () => setRotation((r) => (r + 90) % 360);

  return (
    <div>
      {/* Thumbnails */}
      <div className="flex flex-wrap gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setIdx(i);
              setOpen(true);
              setZoom(1);
              setRotation(0);
            }}
            className={`rounded-[var(--radius-md)] overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80
              ${idx === i && open ? "border-primary" : "border-border"}`}
          >
            <div className="w-20 h-20 bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={img.thumbnail || img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${current.alt}`}
          className="fixed inset-0 z-[60] bg-foreground/80 flex flex-col"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-foreground/20">
            <span className="text-primary-foreground" style={fontLabel}>
              {current.alt} ({idx + 1}/{images.length})
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={zoomOut}
                aria-label="Zoom out"
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-primary-foreground/70 px-2" style={btnStyle} aria-live="polite" aria-label={`Zoom level ${Math.round(zoom * 100)}%`}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomIn}
                aria-label="Zoom in"
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={rotate}
                aria-label="Rotate clockwise"
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
              >
                <RotateCw size={16} />
              </button>
              <div className="w-px h-5 bg-primary-foreground/20 mx-1" />
              <button
                onClick={() => {
                  setOpen(false);
                  setZoom(1);
                  setRotation(0);
                }}
                aria-label="Close preview"
                className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div
            className="flex-1 flex items-center justify-center relative overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpen(false);
                setZoom(1);
                setRotation(0);
              }
            }}
          >
            {images.length > 1 && (
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-4 w-10 h-10 rounded-full bg-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-foreground/50 cursor-pointer z-10"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <img
              src={current.src}
              alt={current.alt}
              className="max-w-[90%] max-h-[80vh] object-contain transition-transform"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
            {images.length > 1 && (
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-4 w-10 h-10 rounded-full bg-foreground/30 text-primary-foreground flex items-center justify-center hover:bg-foreground/50 cursor-pointer z-10"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Bottom thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 py-3 bg-foreground/20">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIdx(i);
                    setZoom(1);
                    setRotation(0);
                  }}
                  className={`w-12 h-12 rounded-[var(--radius-sm)] overflow-hidden border-2 cursor-pointer transition-all
                    ${i === idx ? "border-primary-foreground" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img
                    src={img.thumbnail || img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
