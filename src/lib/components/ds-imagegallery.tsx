import React, { useState, useCallback } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Grid, List, Upload, Trash2, Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ImageGalleryLayout = "grid" | "list";
export type ImageGalleryColumns = 2 | 3 | 4 | 5 | 6;

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  name?: string;
  size?: string;
  /** Extra metadata */
  meta?: Record<string, string>;
}

export interface ImageGalleryProps {
  /** Images to display */
  images: GalleryImage[];
  /** Allow selecting images */
  selectable?: boolean;
  /** Currently selected image IDs */
  selectedIds?: string[];
  /** Selection change handler */
  onSelectChange?: (ids: string[]) => void;
  /** Max selectable images (default: unlimited) */
  maxSelect?: number;
  /** Show lightbox on click */
  lightbox?: boolean;
  /** Allow upload (calls onUpload) */
  uploadable?: boolean;
  /** Upload handler */
  onUpload?: (files: FileList) => void;
  /** Delete handler */
  onDelete?: (id: string) => void;
  /** Default layout */
  defaultLayout?: ImageGalleryLayout;
  /** Grid columns */
  columns?: ImageGalleryColumns;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const captionStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-p)",
};

const colsMap: Record<ImageGalleryColumns, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIdx,
  onClose,
}: {
  images: GalleryImage[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const img = images[idx];

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  // Keyboard nav
  React.useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // eslint-disable-line

  return (
    <div
      className="fixed inset-0 z-[var(--z-modal)] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
      >
        <X size={16} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Image */}
      <div className="max-w-4xl max-h-[80vh] px-16" onClick={(e) => e.stopPropagation()}>
        <img
          src={img.src}
          alt={img.alt ?? img.name}
          className="max-w-full max-h-[70vh] object-contain rounded-[var(--radius-md)]"
        />
        {img.name && (
          <p className="text-center text-white/70 mt-3" style={captionStyle}>
            {img.name} {img.size ? `· ${img.size}` : ""}
          </p>
        )}
        {images.length > 1 && (
          <p className="text-center text-white/40 mt-1" style={captionStyle}>
            {idx + 1} / {images.length}
          </p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

// ─── ThumbnailCell ────────────────────────────────────────────────────────────

export interface ThumbnailCellProps {
  /** Image source */
  src: string;
  /** Alt text */
  alt?: string;
  /** Caption below image */
  caption?: string;
  /** Sub-caption (muted) */
  subCaption?: string;
  /** Thumbnail size */
  size?: "xs" | "sm" | "md";
  /** Click handler */
  onClick?: () => void;
  /** Additional class name */
  className?: string;
}

export function ThumbnailCell({
  src,
  alt = "",
  caption,
  subCaption,
  size = "sm",
  onClick,
  className = "",
}: ThumbnailCellProps) {
  const sizeMap = { xs: "w-8 h-8", sm: "w-10 h-10", md: "w-14 h-14" };

  return (
    <div
      className={`flex items-center gap-2.5 ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      <div className={`${sizeMap[size]} flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden bg-muted/20 border border-border`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      {(caption || subCaption) && (
        <div className="min-w-0">
          {caption && (
            <div className="truncate text-foreground" style={labelStyle}>{caption}</div>
          )}
          {subCaption && (
            <div className="truncate text-muted-foreground" style={captionStyle}>{subCaption}</div>
          )}
        </div>
      )}
    </div>
  );
}

ThumbnailCell.displayName = "ThumbnailCell";

// ─── ImageGallery ─────────────────────────────────────────────────────────────

export function ImageGallery({
  images,
  selectable = false,
  selectedIds = [],
  onSelectChange,
  maxSelect,
  lightbox = true,
  uploadable = false,
  onUpload,
  onDelete,
  defaultLayout = "grid",
  columns = 4,
  disabled = false,
  className = "",
}: ImageGalleryProps) {
  const [layout, setLayout] = useState<ImageGalleryLayout>(defaultLayout);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  function toggleSelect(id: string) {
    if (disabled) return;
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      onSelectChange?.(selectedIds.filter((x) => x !== id));
    } else {
      if (maxSelect && selectedIds.length >= maxSelect) return;
      onSelectChange?.([...selectedIds, id]);
    }
  }

  function handleImageClick(idx: number, id: string) {
    if (selectable) {
      toggleSelect(id);
    } else if (lightbox) {
      setLightboxIdx(idx);
    }
  }

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onUpload?.(e.target.files);
      e.target.value = "";
    }
  }, [onUpload]);

  if (images.length === 0 && !uploadable) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border border-dashed border-border rounded-[var(--radius-md)]">
        <span style={labelStyle}>No images yet</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground" style={captionStyle}>
          {images.length} image{images.length !== 1 ? "s" : ""}
          {selectable && selectedIds.length > 0 && ` · ${selectedIds.length} selected`}
        </span>
        <div className="flex items-center gap-1">
          {uploadable && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                disabled={disabled}
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-md)] border border-border bg-card hover:bg-muted/20 text-foreground transition-colors cursor-pointer"
                style={captionStyle}
              >
                <Upload size={12} />
                Upload
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={`w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] transition-colors ${layout === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/30"}`}
          >
            <Grid size={14} />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={`w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] transition-colors ${layout === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/30"}`}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Grid layout */}
      {layout === "grid" && (
        <div className={`grid gap-2 ${colsMap[columns]}`}>
          {images.map((img, idx) => {
            const isSelected = selectedIds.includes(img.id);
            return (
              <div
                key={img.id}
                className={[
                  "relative group rounded-[var(--radius-md)] overflow-hidden border transition-all cursor-pointer",
                  isSelected ? "border-primary shadow-[0_0_0_2px_var(--primary)]" : "border-border hover:border-primary/40",
                ].join(" ")}
                onClick={() => handleImageClick(idx, img.id)}
              >
                <div className="aspect-square">
                  <img
                    src={img.src}
                    alt={img.alt ?? img.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  {!selectable && lightbox && (
                    <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                {/* Selection checkmark */}
                {selectable && (
                  <div className={[
                    "absolute top-1.5 left-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "bg-primary border-primary"
                      : "bg-white/80 border-white",
                  ].join(" ")}>
                    {isSelected && <Check size={10} className="text-primary-foreground" />}
                  </div>
                )}

                {/* Delete button */}
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(img.id); }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive cursor-pointer"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* List layout */}
      {layout === "list" && (
        <div className="space-y-1.5">
          {images.map((img, idx) => {
            const isSelected = selectedIds.includes(img.id);
            return (
              <div
                key={img.id}
                className={[
                  "flex items-center gap-3 p-2.5 rounded-[var(--radius-md)] border transition-all cursor-pointer",
                  isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/10",
                ].join(" ")}
                onClick={() => handleImageClick(idx, img.id)}
              >
                <ThumbnailCell src={img.src} alt={img.alt} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="truncate text-foreground" style={labelStyle}>{img.name ?? img.alt ?? `Image ${idx + 1}`}</div>
                  {img.size && <div className="text-muted-foreground" style={captionStyle}>{img.size}</div>}
                </div>
                {selectable && isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-primary-foreground" />
                  </div>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(img.id); }}
                    className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          startIdx={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </div>
  );
}

ImageGallery.displayName = "ImageGallery";
