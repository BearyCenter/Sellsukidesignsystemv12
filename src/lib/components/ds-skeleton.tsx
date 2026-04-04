import React from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type SkeletonVariant = "text" | "rectangular" | "circular" | "rounded";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: SkeletonVariant;
  animate?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Skeleton({
  width,
  height,
  variant = "rectangular",
  animate = true,
  className,
}: SkeletonProps) {
  const base = "bg-muted";
  const anim = animate ? "animate-pulse" : "";
  const radius =
    variant === "circular"
      ? "rounded-full"
      : variant === "rounded"
      ? "rounded-[var(--radius-md)]"
      : variant === "text"
      ? "rounded-[var(--radius-sm)]"
      : "rounded-[var(--radius-sm)]";

  return (
    <div
      className={`${base} ${anim} ${radius} ${className ?? ""}`}
      style={{
        width: width ?? "100%",
        height:
          height ??
          (variant === "text" ? "1em" : variant === "circular" ? 40 : 20),
      }}
    />
  );
}

/* ─── Composed: SkeletonCard ─────────────────────────────────────────────────── */

export function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-4 space-y-4 w-full max-w-sm">
      <Skeleton variant="rounded" height={160} />
      <div className="space-y-2">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="80%" height={14} />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={36} height={36} />
        <div className="flex-1 space-y-1.5">
          <Skeleton variant="text" width="40%" height={14} />
          <Skeleton variant="text" width="25%" height={12} />
        </div>
      </div>
    </div>
  );
}

/* ─── Composed: SkeletonTable ────────────────────────────────────────────────── */

export function SkeletonTable() {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex gap-4">
        {[120, 160, 100, 80].map((w, i) => (
          <Skeleton key={i} variant="text" width={w} height={14} />
        ))}
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="px-4 py-3 border-b border-border flex items-center gap-4"
        >
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={100 + row * 15} height={14} />
          <Skeleton
            variant="text"
            width={140}
            height={14}
            className="flex-1"
          />
          <Skeleton variant="rounded" width={60} height={22} />
          <Skeleton variant="text" width={80} height={14} />
        </div>
      ))}
    </div>
  );
}

/* ─── Composed: SkeletonList ─────────────────────────────────────────────────── */

export function SkeletonList({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3 w-full max-w-md">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] border border-border bg-card"
        >
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-1.5">
            <Skeleton
              variant="text"
              width={`${60 + i * 10}%`}
              height={14}
            />
            <Skeleton
              variant="text"
              width={`${40 + i * 5}%`}
              height={12}
            />
          </div>
          <Skeleton variant="rounded" width={50} height={24} />
        </div>
      ))}
    </div>
  );
}
