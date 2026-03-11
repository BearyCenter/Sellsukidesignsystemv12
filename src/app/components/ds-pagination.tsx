import React, { useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "default" | "outlined" | "filled" | "minimal";

export interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show on each side of current */
  siblingCount?: number;
  /** Show first/last page jump buttons */
  showFirstLast?: boolean;
  /** Show previous/next buttons */
  showPrevNext?: boolean;
  /** Show page size selector */
  showPageSize?: boolean;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Current page size */
  pageSize?: number;
  /** Callback when page size changes */
  onPageSizeChange?: (size: number) => void;
  /** Total number of items (for info display) */
  totalItems?: number;
  /** Visual size */
  size?: PaginationSize;
  /** Visual variant */
  variant?: PaginationVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Show "Page X of Y" text */
  showPageInfo?: boolean;
  /** Show total items info */
  showItemsInfo?: boolean;
  /** Custom previous label */
  prevLabel?: React.ReactNode;
  /** Custom next label */
  nextLabel?: React.ReactNode;
}

// ─── Size Config ──────────────────────────────────────────────────────────────

const sizeConfig: Record<
  PaginationSize,
  { btn: string; icon: number; text: React.CSSProperties; gap: string }
> = {
  sm: {
    btn: "min-w-[28px] h-7 px-1.5",
    icon: 14,
    text: {
      fontFamily: "var(--font-button)",
      fontSize: "var(--text-button)",
      fontWeight: "var(--weight-button)",
    },
    gap: "gap-1",
  },
  md: {
    btn: "min-w-[34px] h-9 px-2",
    icon: 16,
    text: {
      fontFamily: "var(--font-button)",
      fontSize: "var(--text-button)",
      fontWeight: "var(--weight-button)",
    },
    gap: "gap-1.5",
  },
  lg: {
    btn: "min-w-[42px] h-11 px-3",
    icon: 18,
    text: {
      fontFamily: "var(--font-button)",
      fontSize: "var(--text-label)",
      fontWeight: "var(--weight-button)",
    },
    gap: "gap-2",
  },
};

// ─── Variant Config ───────────────────────────────────────────────────────────

const variantConfig: Record<
  PaginationVariant,
  { base: string; active: string; hover: string }
> = {
  default: {
    base: "bg-transparent text-foreground border border-transparent",
    active: "bg-primary text-primary-foreground border-primary shadow-elevation-sm",
    hover: "hover:bg-muted",
  },
  outlined: {
    base: "bg-transparent text-foreground border border-border",
    active: "bg-primary text-primary-foreground border-primary shadow-elevation-sm",
    hover: "hover:bg-muted hover:border-muted",
  },
  filled: {
    base: "bg-muted/50 text-foreground border border-transparent",
    active: "bg-primary text-primary-foreground border-primary shadow-elevation-sm",
    hover: "hover:bg-muted",
  },
  minimal: {
    base: "bg-transparent text-foreground border border-transparent",
    active: "bg-accent text-accent-foreground border-accent",
    hover: "hover:text-primary",
  },
};

// ─── Range helper ─────────────────────────────────────────────────────────────

function usePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "dots-left" | "dots-right")[] {
  return useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 dots
    if (totalNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots-right" as const, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "dots-left" as const, ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "dots-left" as const, ...middleRange, "dots-right" as const, totalPages];
  }, [currentPage, totalPages, siblingCount]);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  showPrevNext = true,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize = 10,
  onPageSizeChange,
  totalItems,
  size = "md",
  variant = "default",
  disabled = false,
  showPageInfo = false,
  showItemsInfo = false,
  prevLabel,
  nextLabel,
}: PaginationProps) {
  const range = usePaginationRange(currentPage, totalPages, siblingCount);
  const cfg = sizeConfig[size];
  const vars = variantConfig[variant];

  const goTo = useCallback(
    (page: number) => {
      if (!disabled && page >= 1 && page <= totalPages) onPageChange(page);
    },
    [disabled, totalPages, onPageChange]
  );

  const btnCls = (isActive: boolean, isDisabled: boolean) =>
    `inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all cursor-pointer select-none
     ${cfg.btn}
     ${isDisabled ? "opacity-40 pointer-events-none cursor-default" : ""}
     ${isActive ? vars.active : `${vars.base} ${!isDisabled ? vars.hover : ""}`}`;

  // Items info calculation
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-label)",
    fontSize: "var(--text-label)",
    fontWeight: "var(--weight-label)",
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Left: items info / page size */}
      <div className="flex items-center gap-4">
        {showItemsInfo && totalItems !== undefined && (
          <span className="text-muted-foreground" style={labelStyle}>
            {startItem}–{endItem} of {totalItems}
          </span>
        )}

        {showPageSize && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground" style={labelStyle}>
              Rows per page:
            </span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              disabled={disabled}
              className="bg-input-background text-foreground border border-border rounded-[var(--radius-md)] px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring/30"
              style={{
                fontFamily: "var(--font-button)",
                fontSize: "var(--text-button)",
                fontWeight: "var(--weight-button)",
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Center: pagination buttons */}
      <nav
        className={`flex items-center ${cfg.gap}`}
        aria-label="Pagination"
        role="navigation"
      >
        {/* First */}
        {showFirstLast && (
          <button
            onClick={() => goTo(1)}
            disabled={disabled || currentPage <= 1}
            className={btnCls(false, disabled || currentPage <= 1)}
            style={cfg.text}
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeft size={cfg.icon} />
          </button>
        )}

        {/* Previous */}
        {showPrevNext && (
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={disabled || currentPage <= 1}
            className={btnCls(false, disabled || currentPage <= 1)}
            style={cfg.text}
            aria-label="Previous page"
          >
            {prevLabel ?? <ChevronLeft size={cfg.icon} />}
          </button>
        )}

        {/* Page numbers */}
        {range.map((item, idx) => {
          if (item === "dots-left" || item === "dots-right") {
            return (
              <span
                key={item}
                className={`inline-flex items-center justify-center text-muted-foreground ${cfg.btn}`}
                style={cfg.text}
              >
                <MoreHorizontal size={cfg.icon} />
              </span>
            );
          }
          return (
            <button
              key={item}
              onClick={() => goTo(item)}
              disabled={disabled}
              className={btnCls(item === currentPage, disabled)}
              style={cfg.text}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </button>
          );
        })}

        {/* Next */}
        {showPrevNext && (
          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={disabled || currentPage >= totalPages}
            className={btnCls(false, disabled || currentPage >= totalPages)}
            style={cfg.text}
            aria-label="Next page"
          >
            {nextLabel ?? <ChevronRight size={cfg.icon} />}
          </button>
        )}

        {/* Last */}
        {showFirstLast && (
          <button
            onClick={() => goTo(totalPages)}
            disabled={disabled || currentPage >= totalPages}
            className={btnCls(false, disabled || currentPage >= totalPages)}
            style={cfg.text}
            aria-label="Last page"
            title="Last page"
          >
            <ChevronsRight size={cfg.icon} />
          </button>
        )}
      </nav>

      {/* Right: page info */}
      {showPageInfo && (
        <span className="text-muted-foreground" style={labelStyle}>
          Page {currentPage} of {totalPages}
        </span>
      )}
    </div>
  );
}