import React from "react";
import { X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DrawerSide = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  footer?: React.ReactNode;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

// ─── Drawer ──────────────────────────────────────────────────────────────────

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  size = "md",
  footer,
  className = "",
}: DrawerProps) {
  if (!open) return null;

  const widths = { sm: "w-72", md: "w-96", lg: "w-[480px]" };
  const heights = { sm: "h-48", md: "h-72", lg: "h-96" };
  const sideClasses: Record<DrawerSide, string> = {
    right: `top-0 right-0 h-full ${widths[size]} animate-[slideRight_0.2s_ease]`,
    left: `top-0 left-0 h-full ${widths[size]} animate-[slideLeft_0.2s_ease]`,
    top: `top-0 left-0 w-full ${heights[size]} animate-[slideTop_0.2s_ease]`,
    bottom: `bottom-0 left-0 w-full ${heights[size]} animate-[slideBottom_0.2s_ease]`,
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/20" onClick={onClose} />
      <div
        className={`absolute bg-card border border-border shadow-elevation-sm flex flex-col ${sideClasses[side]} ${className}`}
      >
        {title && (
          <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
            <span className="text-foreground" style={fontLabelBold}>
              {title}
            </span>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && (
          <div className="px-5 py-3 border-t border-border flex items-center gap-2 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideTop { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes slideBottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}

Drawer.displayName = "Drawer";
