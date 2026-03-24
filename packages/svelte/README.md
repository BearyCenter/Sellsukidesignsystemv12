# @uxuissk/design-system-svelte

Sellsuki Design System — Svelte component library.

> **Status**: Scaffold ready. Components will be added from PR #7 (feat/svelte-components).

## Structure

```
src/
  ui/       — Button, Avatar, Badge, Heading, Text, Icon, Logo, Spinner, Divider
  layout/   — TopNavbar, Sidebar + Header/List/Group/Item
  overlay/  — Modal, Dropdown, DropdownOption, ToastContainer
```

## Shared Tokens

Both React and Svelte packages share the same design tokens:

```ts
import { colors, typography, spacing } from "@uxuissk/design-tokens";
```

Or import CSS directly:

```css
@import "@uxuissk/design-tokens/css";
```

## Related

- **React**: `@uxuissk/design-system`
- **Tokens**: `@uxuissk/design-tokens`
- **Storybook**: https://sellsukidesignsystemv12.vercel.app
