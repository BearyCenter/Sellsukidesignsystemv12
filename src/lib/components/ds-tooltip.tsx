import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Tooltip content */
  content: string;
  /** Tooltip position */
  placement?: TooltipPlacement;
  /** Additional class name for the wrapper */
  className?: string;
}

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export function Tooltip({
  children,
  content,
  placement = "top",
  className = "",
}: TooltipProps) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const updateCoords = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const gap = 8;
    let top = 0;
    let left = 0;

    if (placement === "right") {
      top = rect.top + rect.height / 2;
      left = rect.right + gap;
    } else if (placement === "left") {
      top = rect.top + rect.height / 2;
      left = rect.left - gap;
    } else if (placement === "bottom") {
      top = rect.bottom + gap;
      left = rect.left + rect.width / 2;
    } else {
      // top (default)
      top = rect.top - gap;
      left = rect.left + rect.width / 2;
    }

    setCoords({ top, left });
  };

  const handleMouseEnter = () => {
    updateCoords();
    setShow(true);
  };

  const handleMouseLeave = () => setShow(false);

  // Recalculate on scroll/resize
  useEffect(() => {
    if (!show) return;
    const onScroll = () => updateCoords();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [show]);

  // Portal transform style by placement
  const transformStyle: React.CSSProperties = (() => {
    if (placement === "right") return { transform: "translateY(-50%)" };
    if (placement === "left") return { transform: "translate(-100%, -50%)" };
    if (placement === "bottom") return { transform: "translateX(-50%)" };
    return { transform: "translate(-50%, -100%)" }; // top
  })();

  const tooltipEl = show ? (
    <div
      style={{
        position: "fixed",
        top: coords.top,
        left: coords.left,
        zIndex: 9999,
        pointerEvents: "none",
        ...transformStyle,
      }}
    >
      <div
        className="px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-foreground text-background whitespace-nowrap shadow-elevation-sm"
        style={smallLabel}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={wrapperRef}
        className={`relative inline-flex ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </div>
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(tooltipEl, document.body)}
    </>
  );
}

Tooltip.displayName = "Tooltip";
