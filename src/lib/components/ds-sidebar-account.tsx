import React, { useState, useRef, useEffect } from "react";
import { ChevronUp, Check } from "lucide-react";


// ─── Types ────────────────────────────────────────────────────────────────────

export interface SidebarAccountItem {
  id: string;
  /** Display name (company / branch / provider) */
  name: string;
  /** Handle or sub-label e.g. "@phoenix" */
  handle?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Fallback initials when no avatarUrl */
  avatarFallback?: string;
}

export interface SidebarAccountSwitcherProps {
  // ─── Current active context ──────────────────────────────────────────────
  company?: SidebarAccountItem;
  branch?: SidebarAccountItem;
  provider?: SidebarAccountItem;
  // ─── Lists to switch to ──────────────────────────────────────────────────
  companies?: SidebarAccountItem[];
  branches?: SidebarAccountItem[];
  providers?: SidebarAccountItem[];
  // ─── Callbacks ───────────────────────────────────────────────────────────
  onCompanyChange?: (item: SidebarAccountItem) => void;
  onBranchChange?: (item: SidebarAccountItem) => void;
  onProviderChange?: (item: SidebarAccountItem) => void;
  /** Collapsed icon-only mode */
  collapsed?: boolean;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const nameStyle: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-p)",
  fontWeight: "var(--weight-button)",
  lineHeight: "1",
};

const subStyle: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-p)",
  fontWeight: "var(--weight-p)",
  lineHeight: "1",
};

const handleStyle: React.CSSProperties = {
  fontFamily: "var(--font-p)",
  fontSize: "var(--text-p)",
  fontWeight: "var(--weight-p)",
  lineHeight: "1",
};

const tabStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function AvatarCircle({ item, size = 40 }: { item: SidebarAccountItem; size?: number }) {
  const s = size + "px";
  const fs = size >= 40 ? "var(--text-label)" : "var(--text-caption)";
  if (item.avatarUrl) {
    return (
      <img
        src={item.avatarUrl}
        alt={item.name}
        style={{ width: s, height: s, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
    );
  }
  const fallback = item.avatarFallback || item.name.charAt(0).toUpperCase();
  return (
    <div
      style={{
        width: s, height: s, borderRadius: "50%", flexShrink: 0,
        background: "var(--Base_Color--Sky--100, #e0f2fe)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-label)", fontSize: fs, fontWeight: "var(--weight-button)",
        color: "var(--Base_Color--Sky--600, #1b8bf5)",
      }}
    >
      {fallback}
    </div>
  );
}

type TabKey = "company" | "branch" | "provider";

// ─── Component ────────────────────────────────────────────────────────────────

export function SidebarAccountSwitcher({
  company,
  branch,
  provider,
  companies = [],
  branches = [],
  providers = [],
  onCompanyChange,
  onBranchChange,
  onProviderChange,
  collapsed = false,
}: SidebarAccountSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const currentItem = company;
  const currentSub = branch?.name ?? provider?.name;

  const handleSelect = (item: SidebarAccountItem) => {
    onCompanyChange?.(item);
    setOpen(false);
  };

  // ─── Collapsed mode ─────────────────────────────────────────────────────
  if (collapsed) {
    return (
      <button
        onClick={() => setOpen(!open)}
        title={currentItem?.name ?? "Switch account"}
        style={{
          width: 40, height: 40, borderRadius: "50%", border: "none",
          background: "rgba(240,249,255,1)", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {currentItem ? <AvatarCircle item={currentItem} size={36} /> : (
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-label)", fontSize: "var(--text-caption)", fontWeight: "var(--weight-button)" }}>S</div>
        )}
      </button>
    );
  }

  // ─── Expanded mode ──────────────────────────────────────────────────────
  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "rgba(240,249,255,1)",
          border: "1px solid rgba(217,242,255,1)",
          borderRadius: "8px",
          padding: "8px 16px 8px 8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          textAlign: "left",
          minHeight: "56px",
        }}
      >
        {/* Avatar */}
        {currentItem ? (
          <AvatarCircle item={currentItem} size={40} />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)", flexShrink: 0 }}>S</div>
        )}

        {/* Title block */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ ...nameStyle, color: "var(--foreground, #1f2937)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
            {currentItem?.name ?? "Select Company"}
          </span>
          {currentSub && (
            <span style={{ ...subStyle, color: "var(--Base_Color--Sky--500, #32a9ff)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
              {currentSub}
            </span>
          )}
        </div>

        {/* Chevron */}
        <ChevronUp
          size={16}
          color="rgba(50,169,255,1)"
          style={{
            flexShrink: 0,
            transition: "transform 0.2s ease",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "var(--background, #fff)",
            border: "1px solid var(--border, #e5e7eb)",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Items — flat company list */}
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {companies.map((item) => {
              const isActive = company?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    background: isActive ? "rgba(240,249,255,0.6)" : "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                    minHeight: "48px",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--accent, #f3f4f6)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = isActive ? "rgba(240,249,255,0.6)" : "none"; }}
                >
                  <AvatarCircle item={item} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...nameStyle, color: "var(--foreground, #1f2937)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </div>
                    {item.handle && (
                      <div style={{ ...handleStyle, color: "var(--muted-foreground, #6b7280)", marginTop: "2px" }}>
                        {item.handle}
                      </div>
                    )}
                  </div>
                  {isActive && <Check size={16} color="var(--Base_Color--Sky--500, #32a9ff)" style={{ flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

SidebarAccountSwitcher.displayName = "SidebarAccountSwitcher";
