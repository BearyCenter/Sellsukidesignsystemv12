/**
 * Sellsuki Design System — AppShell Context
 *
 * Stage 3 of GOAL-DS-90-PERCENT.md
 *
 * Provides shell state (sidebar, breadcrumbs, user, product) to any
 * descendant component via useAppShell(). No UI — pure context.
 *
 * Usage:
 * ```tsx
 * // In your app root:
 * <AppShellProvider user={currentUser} product={sellsukiBrandConfig}>
 *   <TopNavbar ... />
 *   <Sidebar ... />
 *   <main>...</main>
 * </AppShellProvider>
 *
 * // In any feature page:
 * const { setBreadcrumbs, sidebarOpen } = useAppShell();
 * ```
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";

import type {
  AppShellContextValue,
  BreadcrumbEntry,
  ShellUser,
  ProductBrandConfig,
  NavResolver,
  ShellSidebarGroup,
} from "../types/shell";

/* ─── Context ────────────────────────────────────────────────────────────────── */

const AppShellContext = createContext<AppShellContextValue | null>(null);
AppShellContext.displayName = "AppShellContext";

/* ─── Provider Props ─────────────────────────────────────────────────────────── */

export interface AppShellProviderProps {
  /** The authenticated user for the session */
  user?: ShellUser | null;
  /** The product brand config — drives theme token override and brand identity */
  product?: ProductBrandConfig | null;
  /**
   * Async nav resolver — called once on mount (and when user changes).
   * Return permission-filtered SidebarGroups.
   * If omitted the nav state is empty (product drives its own nav externally).
   */
  navResolver?: NavResolver;
  /**
   * Override sidebar open state from outside (controlled mode).
   * Pair with onSidebarChange for fully controlled behavior.
   */
  sidebarOpen?: boolean;
  /** Sidebar change callback (controlled mode) */
  onSidebarChange?: (open: boolean) => void;
  /** Initial sidebar open state (uncontrolled, default: true on desktop) */
  defaultSidebarOpen?: boolean;
  /** Children */
  children: React.ReactNode;
}

/* ─── Nav Resolver State ──────────────────────────────────────────────────────── */

export interface NavState {
  groups: ShellSidebarGroup[];
  loading: boolean;
  error: string | null;
}

/* ─── Extended Context (includes nav state) ──────────────────────────────────── */

export interface AppShellFullContextValue extends AppShellContextValue {
  /** Navigation groups resolved from navResolver */
  navGroups: ShellSidebarGroup[];
  /** Whether nav is loading (async navResolver in flight) */
  navLoading: boolean;
  /** Nav load error — display fallback nav when set */
  navError: string | null;
  /** Manually refresh nav (re-call navResolver) */
  refreshNav: () => void;
}

const AppShellFullContext = createContext<AppShellFullContextValue | null>(null);
AppShellFullContext.displayName = "AppShellFullContext";

/* ─── AppShellProvider ────────────────────────────────────────────────────────── */

export function AppShellProvider({
  user = null,
  product = null,
  navResolver,
  sidebarOpen: controlledOpen,
  onSidebarChange,
  defaultSidebarOpen = true,
  children,
}: AppShellProviderProps) {
  // Sidebar state — supports controlled + uncontrolled
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultSidebarOpen);
  const effectiveSidebarOpen = isControlled ? controlledOpen! : internalOpen;

  const setSidebarOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) setInternalOpen(open);
      onSidebarChange?.(open);
    },
    [isControlled, onSidebarChange]
  );

  // Breadcrumbs state
  const [breadcrumbs, setBreadcrumbsState] = useState<BreadcrumbEntry[]>([]);
  const setBreadcrumbs = useCallback((items: BreadcrumbEntry[]) => {
    setBreadcrumbsState(items);
  }, []);

  // Nav resolver state
  const [navState, setNavState] = useState<NavState>({
    groups: [],
    loading: false,
    error: null,
  });
  const resolveCountRef = useRef(0);

  const refreshNav = useCallback(async () => {
    if (!navResolver || !user) {
      setNavState({ groups: [], loading: false, error: null });
      return;
    }

    const thisCount = ++resolveCountRef.current;
    setNavState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const groups = await navResolver(user);
      // Ignore stale resolves (user changed mid-flight)
      if (thisCount !== resolveCountRef.current) return;
      setNavState({ groups, loading: false, error: null });
    } catch (err) {
      if (thisCount !== resolveCountRef.current) return;
      setNavState({
        groups: [],
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load navigation",
      });
    }
  }, [navResolver, user]);

  // Resolve nav on mount + when user/navResolver changes
  useEffect(() => {
    refreshNav();
  }, [refreshNav]);

  // Apply product theme data attribute to document root
  useEffect(() => {
    if (!product?.product) return;
    const prev = document.documentElement.getAttribute("data-product");
    document.documentElement.setAttribute("data-product", product.product);
    return () => {
      if (prev) document.documentElement.setAttribute("data-product", prev);
      else document.documentElement.removeAttribute("data-product");
    };
  }, [product?.product]);

  // Memoize context value — prevents unnecessary re-renders for stable values
  const fullValue = useMemo<AppShellFullContextValue>(
    () => ({
      sidebarOpen: effectiveSidebarOpen,
      setSidebarOpen,
      user,
      product,
      breadcrumbs,
      setBreadcrumbs,
      navGroups: navState.groups,
      navLoading: navState.loading,
      navError: navState.error,
      refreshNav,
    }),
    [
      effectiveSidebarOpen,
      setSidebarOpen,
      user,
      product,
      breadcrumbs,
      setBreadcrumbs,
      navState.groups,
      navState.loading,
      navState.error,
      refreshNav,
    ]
  );

  return (
    <AppShellFullContext.Provider value={fullValue}>
      <AppShellContext.Provider value={fullValue}>
        {children}
      </AppShellContext.Provider>
    </AppShellFullContext.Provider>
  );
}

AppShellProvider.displayName = "AppShellProvider";

/* ─── useAppShell ─────────────────────────────────────────────────────────────── */

/**
 * Access shell state from any descendant component.
 *
 * @throws Error if called outside of AppShellProvider
 *
 * @example
 * function OrderDetailPage() {
 *   const { setBreadcrumbs, user, sidebarOpen } = useAppShell();
 *
 *   useEffect(() => {
 *     setBreadcrumbs([
 *       { label: "Orders", href: "/orders" },
 *       { label: "Order #12345" },
 *     ]);
 *   }, []);
 *
 *   return <div>...</div>;
 * }
 */
export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error(
      "[useAppShell] must be used inside <AppShellProvider>. " +
        "Wrap your app root with <AppShellProvider user={...} product={...}>."
    );
  }
  return ctx;
}

/**
 * Extended hook that also exposes nav state.
 * Use this in the Sidebar/TopNavbar wrappers that need nav groups.
 *
 * @throws Error if called outside of AppShellProvider
 */
export function useAppShellFull(): AppShellFullContextValue {
  const ctx = useContext(AppShellFullContext);
  if (!ctx) {
    throw new Error(
      "[useAppShellFull] must be used inside <AppShellProvider>."
    );
  }
  return ctx;
}

/* ─── useBreadcrumbs ─────────────────────────────────────────────────────────── */

/**
 * Convenience hook for setting breadcrumbs from a feature page.
 * Handles the useEffect pattern automatically.
 *
 * @example
 * function ProductDetailPage({ productId }: { productId: string }) {
 *   useBreadcrumbs([
 *     { label: "Products", href: "/products" },
 *     { label: product.name },
 *   ]);
 *   return <div>...</div>;
 * }
 */
export function useBreadcrumbs(items: BreadcrumbEntry[]) {
  const { setBreadcrumbs } = useAppShell();
  // Stable reference via JSON key (items are plain objects, safe to serialize)
  const key = JSON.stringify(items);

  useEffect(() => {
    setBreadcrumbs(items);
    return () => setBreadcrumbs([]); // clear on unmount
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
}

/* ─── useNavResolver ─────────────────────────────────────────────────────────── */

/**
 * Standalone hook for products that manage nav outside of AppShellProvider.
 * Returns nav groups, loading state, error, and a refresh function.
 *
 * @example
 * function AppSidebar() {
 *   const { groups, loading, error, refresh } = useNavResolver(navResolver, currentUser);
 *   if (loading) return <SkeletonList />;
 *   return <Sidebar groups={mapGroupsForSidebar(groups)} />;
 * }
 */
export function useNavResolver(
  resolver: NavResolver | undefined,
  user: ShellUser | null
): NavState & { refresh: () => void } {
  const [state, setState] = useState<NavState>({
    groups: [],
    loading: false,
    error: null,
  });
  const countRef = useRef(0);

  const refresh = useCallback(async () => {
    if (!resolver || !user) {
      setState({ groups: [], loading: false, error: null });
      return;
    }

    const thisCount = ++countRef.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const groups = await resolver(user);
      if (thisCount !== countRef.current) return;
      setState({ groups, loading: false, error: null });
    } catch (err) {
      if (thisCount !== countRef.current) return;
      setState({
        groups: [],
        loading: false,
        error: err instanceof Error ? err.message : "Navigation load failed",
      });
    }
  }, [resolver, user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
}

/* ─── AppShellErrorBoundary ────────────────────────────────────────────────────── */

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface AppShellErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Error boundary for AppShell content.
 * Prevents a feature page crash from taking down the entire shell.
 *
 * @example
 * <AppShellProvider ...>
 *   <AppShellErrorBoundary fallback={<ErrorPage />}>
 *     <FeaturePage />
 *   </AppShellErrorBoundary>
 * </AppShellProvider>
 */
export class AppShellErrorBoundary extends React.Component<
  AppShellErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: AppShellErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[AppShellErrorBoundary] Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          className="flex flex-col items-center justify-center min-h-[200px] gap-3 p-6 text-center"
          role="alert"
        >
          <div
            className="text-destructive"
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--text-label)",
              fontWeight: "var(--weight-button)",
            }}
          >
            Something went wrong in this section.
          </div>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-1.5 rounded-[var(--radius-md)] border border-border text-muted-foreground hover:bg-muted/20 transition-colors text-sm cursor-pointer"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
