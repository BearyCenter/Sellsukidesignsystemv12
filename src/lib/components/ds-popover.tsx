import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: PopoverPlacement;
  title?: string;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function Popover({
  trigger,
  children,
  placement = "bottom",
  title,
  open: controlled,
  onOpenChange,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlled !== undefined ? controlled : internalOpen;
  const setOpen = (v: boolean) => {
    onOpenChange?.(v);
    if (controlled === undefined) setInternalOpen(v);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [isOpen]);

  const posMap: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 ${posMap[placement]} w-max max-w-xs`}
        >
          <div className="rounded-[var(--radius-md)] border border-border bg-card shadow-elevation-sm overflow-hidden">
            {title && (
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
                <span className="text-foreground" style={fontLabelBold}>
                  {title}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            <div className="px-4 py-3">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
