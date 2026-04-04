import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle, X, Bell, BellOff, ExternalLink } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationProps {
  type?: NotificationType;
  title: string;
  message?: string;
  closable?: boolean;
  onClose?: () => void;
  action?: { label: string; onClick: () => void };
  avatar?: string;
  time?: string;
  read?: boolean;
}

export interface NotificationCenterItem {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  time: string;
  read: boolean;
}

export interface NotificationCenterProps {
  items: NotificationCenterItem[];
  /** Called when a single notification is marked as read */
  onMarkRead?: (id: string) => void;
  /** Called when "Mark all read" is clicked */
  onMarkAllRead?: () => void;
  /** Called when a notification is dismissed/removed */
  onDismiss?: (id: string) => void;
  /** Called when all notifications are cleared */
  onClearAll?: () => void;
}

/* ─── Style helpers ──────────────────────────────────────────────────────────── */

const fontLabel: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

const fontLabelBold: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-button)",
};

const smallLabel: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-label)",
};

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-button)",
  fontSize: "var(--text-button)",
  fontWeight: "var(--weight-button)",
};

/* ─── Notification Component ─────────────────────────────────────────────────── */

export function Notification({
  type = "info",
  title,
  message,
  closable = true,
  onClose,
  action,
  avatar,
  time,
  read,
}: NotificationProps) {
  const icons: Record<string, React.ReactNode> = {
    info: <Info size={16} className="text-primary" />,
    success: <CheckCircle2 size={16} className="text-chart-2" />,
    warning: <AlertTriangle size={16} className="text-chart-5" />,
    error: <XCircle size={16} className="text-destructive" />,
  };
  const border: Record<string, string> = {
    info: "border-l-primary",
    success: "border-l-chart-2",
    warning: "border-l-chart-5",
    error: "border-l-destructive",
  };

  return (
    <div
      className={`flex gap-3 px-4 py-3 rounded-[var(--radius-md)] border border-border bg-card border-l-[3px] ${border[type]} ${
        read === false ? "bg-primary/5" : ""
      }`}
    >
      {avatar ? (
        <div
          className="w-8 h-8 rounded-full bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={fontLabelBold}
        >
          <span className="text-primary">
            {avatar.slice(0, 2).toUpperCase()}
          </span>
        </div>
      ) : (
        <span className="flex-shrink-0 mt-0.5">{icons[type]}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className="text-foreground" style={fontLabelBold}>
            {title}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            {time && (
              <span className="text-muted-foreground" style={smallLabel}>
                {time}
              </span>
            )}
            {read === false && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
            {closable && onClose && (
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        {message && (
          <p className="text-muted-foreground mt-0.5" style={fontLabel}>
            {message}
          </p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-1 text-primary mt-2 hover:underline cursor-pointer"
            style={btnStyle}
          >
            {action.label} <ExternalLink size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── NotificationCenter Component ───────────────────────────────────────────── */

export function NotificationCenter({
  items,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onClearAll,
}: NotificationCenterProps) {
  const [internalItems, setInternalItems] = useState(items);

  // Use items prop directly when callbacks are provided (controlled), otherwise internal state
  const isControlled = onMarkRead !== undefined || onMarkAllRead !== undefined;
  const notifications = isControlled ? items : internalItems;
  const unread = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    if (onMarkAllRead) {
      onMarkAllRead();
    }
    if (!isControlled) {
      setInternalItems((n) => n.map((i) => ({ ...i, read: true })));
    }
  };

  const handleDismiss = (id: string) => {
    if (onDismiss) {
      onDismiss(id);
    }
    if (!isControlled) {
      setInternalItems((n) => n.filter((i) => i.id !== id));
    }
  };

  const handleMarkRead = (id: string) => {
    if (onMarkRead) {
      onMarkRead(id);
    }
    if (!isControlled) {
      setInternalItems((n) =>
        n.map((i) => (i.id === id ? { ...i, read: true } : i))
      );
    }
  };

  return (
    <div className="max-w-md rounded-[var(--radius-md)] border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-foreground" />
          <span className="text-foreground" style={fontLabelBold}>
            Notifications
          </span>
          {unread > 0 && (
            <span
              className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground"
              style={btnStyle}
            >
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-primary cursor-pointer"
              style={btnStyle}
            >
              Mark all read
            </button>
          )}
          {notifications.length > 0 && onClearAll && (
            <button
              onClick={onClearAll}
              className="text-muted-foreground hover:text-destructive cursor-pointer"
              style={btnStyle}
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-3 py-2 ${!n.read ? "bg-primary/5" : ""}`}
            onClick={() => !n.read && handleMarkRead(n.id)}
          >
            <Notification
              type={n.type}
              title={n.title}
              message={n.message}
              time={n.time}
              read={n.read}
              closable={!!onDismiss}
              onClose={() => handleDismiss(n.id)}
            />
          </div>
        ))}
      </div>
      {notifications.length === 0 && (
        <div className="py-10 text-center text-muted-foreground">
          <BellOff size={24} className="mx-auto mb-2 opacity-40" />
          <span style={fontLabel}>No notifications</span>
        </div>
      )}
    </div>
  );
}
