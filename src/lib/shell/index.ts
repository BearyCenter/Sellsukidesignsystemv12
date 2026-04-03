/**
 * Sellsuki Design System — Shell Layer
 *
 * Re-exports all AppShell context, hooks, and utilities from a single entry point.
 *
 * @example
 * import { AppShellProvider, useAppShell, useBreadcrumbs } from "@uxuissk/design-system";
 */

export {
  AppShellProvider,
  useAppShell,
  useAppShellFull,
  useBreadcrumbs,
  useNavResolver,
  AppShellErrorBoundary,
} from "./AppShellContext";

export type {
  AppShellProviderProps,
  AppShellFullContextValue,
  NavState,
} from "./AppShellContext";

export {
  FeaturePageScaffold,
  ScaffoldSection,
  ScaffoldKPIRow,
} from "./FeaturePageScaffold";

export type {
  FeaturePageScaffoldProps,
  FeaturePageLayout,
  ScaffoldSectionProps,
} from "./FeaturePageScaffold";

export { AppShell, AppShellSkeleton } from "./AppShell";
export type { AppShellProps } from "./AppShell";
