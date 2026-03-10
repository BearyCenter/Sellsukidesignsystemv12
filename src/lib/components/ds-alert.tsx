import React, { useState, useCallback, useRef } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const alertStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  info: { bg: "bg-primary/5", border: "border-primary/30", text: "text-primary", icon: <Info size={18} /> },
  success: { bg: "bg-chart-2/5", border: "border-chart-2/30", text: "text-chart-2", icon: <CheckCircle2 size={18} /> },
  warning: { bg: "bg-chart-5/5", border: "border-chart-5/30", text: "text-chart-5", icon: <AlertTriangle size={18} /> },
  error: { bg: "bg-destructive/5", border: "border-destructive/30", text: "text-destructive", icon: <XCircle size={18} /> },
};

export function Alert({ variant = "info", title, children, dismissible = false, onDismiss, action, icon, className = "" }: AlertProps) {
  const [visible, setVisible] = useState(true);
  const s = alertStyles[variant];

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div className={`flex gap-3 p-4 rounded-[var(--radius)] border ${s.bg} ${s.border} ${className}`} role="alert">
      <span className={`flex-shrink-0 mt-0.5 ${s.text}`}>{icon ?? s.icon}</span>
      <div className="flex-1 min-w-0">
        {title && (
          <span className={`block ${s.text}`} style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" }}>
            {title}
          </span>
        )}
        <span className="text-foreground block" style={{ fontFamily: "var(--font-label)", fontSize: "calc(var(--text-label) * 0.9)", fontWeight: "var(--weight-label)" }}>
          {children}
        </span>
        {action && <div className="mt-2">{action}</div>}
      </div>
      {dismissible && (
        <button onClick={handleDismiss} className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" aria-label="Dismiss">
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// ─── Toast System ────────────────────────────────────────────────────────────

interface ToastData {
  id: string;
  variant: AlertVariant;
  title?: string;
  message: string;
  duration?: number;
}

let toastListeners: ((toasts: ToastData[]) => void)[] = [];
let toastQueue: ToastData[] = [];

function emitToasts() {
  toastListeners.forEach((fn) => fn([...toastQueue]));
}

export const toast = {
  show: (opts: Omit<ToastData, "id">) => {
    const t: ToastData = { ...opts, id: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}` };
    toastQueue = [...toastQueue, t];
    emitToasts();
    setTimeout(() => { toast.dismiss(t.id); }, opts.duration ?? 4000);
  },
  info: (message: string, title?: string) => toast.show({ variant: "info", message, title }),
  success: (message: string, title?: string) => toast.show({ variant: "success", message, title }),
  warning: (message: string, title?: string) => toast.show({ variant: "warning", message, title }),
  error: (message: string, title?: string) => toast.show({ variant: "error", message, title }),
  dismiss: (id: string) => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    emitToasts();
  },
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const ref = useRef(false);

  if (!ref.current) {
    ref.current = true;
    toastListeners.push(setToasts);
  }

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto animate-in slide-in-from-right fade-in duration-300">
          <Alert variant={t.variant} title={t.title} dismissible onDismiss={() => toast.dismiss(t.id)}>
            {t.message}
          </Alert>
        </div>
      ))}
    </div>
  );
}
