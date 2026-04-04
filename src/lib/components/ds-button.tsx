import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";

export interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  active?: boolean;
}

// ─── Size Config ──────────────────────────────────────────────────────────────

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 gap-1.5",       // 32px
  md: "h-9 px-4 gap-2",         // 36px
  lg: "h-10 px-5 gap-2",        // 40px
  xl: "h-11 px-6 gap-2.5",      // 44px
};

const sizeTextStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" },
  md: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" },
  lg: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" },
  xl: { fontFamily: "var(--font-label)", fontSize: "var(--text-label)", fontWeight: "var(--weight-button)" },
};

const sizeIconMap: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

// ─── Variant Config ───────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border border-primary hover:bg-primary/90 active:bg-primary/80 shadow-elevation-sm",
  secondary:
    "bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/90 active:bg-secondary/80 shadow-elevation-sm",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-muted active:bg-muted/80",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-muted active:bg-muted/80",
  destructive:
    "bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/90 active:bg-destructive/80 shadow-elevation-sm",
  link:
    "bg-transparent text-primary border border-transparent underline-offset-4 hover:underline px-0 h-auto",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      active = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-150
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : ""}
          ${active ? "ring-2 ring-ring/30" : ""}
          ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer active:scale-[0.98]"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
          ${className}
        `}
        style={sizeTextStyles[size]}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={sizeIconMap[size]} className="animate-spin flex-shrink-0" />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children && <span className="inline-flex items-center gap-2">{children}</span>}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

DSButton.displayName = "DSButton";

// ─── Icon Button ──────────────────────────────────────────────────────────────

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon: React.ReactNode;
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      loading = false,
      icon,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const sizeMap: Record<ButtonSize, string> = {
      sm: "w-8 h-8",       // 32px
      md: "w-9 h-9",       // 36px
      lg: "w-10 h-10",     // 40px
      xl: "w-11 h-11",     // 44px
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-150
          ${sizeMap[size]}
          ${variantStyles[variant]}
          ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer active:scale-[0.98]"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <Loader2 size={sizeIconMap[size]} className="animate-spin" />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

// ─── Button Group ─────────────────────────────────────────────────────────────

export function ButtonGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex [&>button]:rounded-none [&>button:first-child]:rounded-l-[var(--radius-md)] [&>button:last-child]:rounded-r-[var(--radius-md)] [&>button:not(:last-child)]:border-r-0 ${className}`}
    >
      {children}
    </div>
  );
}