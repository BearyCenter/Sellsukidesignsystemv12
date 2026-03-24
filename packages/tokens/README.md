# @uxuissk/design-tokens

Sellsuki Design System — shared design tokens as CSS custom properties and JS/TS constants.

## Install

```bash
npm install @uxuissk/design-tokens
```

## Usage

### CSS Custom Properties

```css
@import "@uxuissk/design-tokens/css";
```

Then use in any framework:

```css
.my-button {
  background: var(--Base_Color--Sky--500);
  color: var(--Colors--Text--text-white);
  border-radius: var(--Border-radius--radius-md);
}
```

### JavaScript/TypeScript

```ts
import { colors, typography, spacing } from "@uxuissk/design-tokens";

// Use in CSS-in-JS, inline styles, etc.
const style = {
  color: colors.text.primary,       // "#1f2937"
  fontFamily: typography.fontFamily.body, // "'DB HeaventRounded', ..."
  padding: spacing.pageDesktop,      // "24px"
};
```

## Token Categories

| Category | CSS Prefix | JS Export |
|----------|-----------|-----------|
| Colors (primitive) | `--Base_Color--*` | `colors.sky`, `colors.gray`, etc. |
| Colors (semantic) | `--Colors--*` | `colors.text`, `colors.background`, etc. |
| Typography | `--font-*` | `typography.*` |
| Spacing | `--Space--*`, `--Spacing--*` | `spacing.*` |
| Border | `--Border-radius--*` | `border.*` |
| Shadow | `--elevation-*` | `shadow.*` |
| Layout | — | `layout.*` |

## Related

- **React**: `@uxuissk/design-system`
- **Svelte**: `@uxuissk/design-system-svelte`
- **Storybook**: https://sellsukidesignsystemv12.vercel.app
