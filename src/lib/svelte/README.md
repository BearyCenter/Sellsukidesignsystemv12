# Sellsuki Design System — Svelte Components

Svelte port of the Sellsuki Design System components, matching the React version's API and design tokens.

## Structure

```
src/lib/svelte/
├── ui/              # Basic UI primitives
│   ├── Avatar.svelte
│   ├── Badge.svelte
│   ├── Button.svelte
│   ├── Divider.svelte
│   ├── Heading.svelte
│   ├── Icon.svelte
│   ├── Logo.svelte
│   ├── Spinner.svelte
│   └── Text.svelte
├── layout/          # Page structure
│   ├── TopNavbar.svelte
│   ├── Sidebar.svelte
│   ├── SidebarHeader.svelte
│   ├── SidebarList.svelte
│   ├── SidebarGroup.svelte
│   └── SidebarItem.svelte
├── overlay/         # Modals, dropdowns, toasts
│   ├── Modal.svelte
│   ├── Dropdown.svelte
│   ├── DropdownOption.svelte
│   └── ToastContainer.svelte
├── styles/
│   └── tokens.css   # DSS design tokens (colors, spacing, typography)
└── index.ts         # Barrel export
```

## Component Mapping (Svelte ↔ React)

| Svelte | React Equivalent | Status |
|--------|-----------------|--------|
| Button | DSButton | ✅ Implemented |
| Avatar | Avatar | ✅ Implemented |
| Badge | Badge | ✅ Implemented |
| Heading | — (new) | ✅ Implemented |
| Text | — (new) | ✅ Implemented |
| Icon | — (uses lucide-svelte) | ✅ Implemented |
| Logo | — (new) | ✅ Implemented |
| Spinner | Spinner | ✅ Implemented |
| Divider | Divider | ✅ Implemented |
| TopNavbar | TopNavbar | ✅ Implemented |
| Sidebar* | Sidebar | ✅ Implemented |
| Modal | Modal | ✅ Implemented |
| Dropdown | Dropdown | ✅ Implemented |
| ToastContainer | Alert (toast) | ✅ Implemented |

## Usage

```svelte
<script>
  import { Button, Badge, Avatar } from '$lib/svelte';
  import { Modal } from '$lib/svelte/overlay/Modal.svelte';
</script>

<Button variant="primary" size="md" on:click={handleClick}>
  Save Changes
</Button>

<Badge variant="success" size="sm">Active</Badge>

<Avatar src={user.avatar} name={user.name} size="md" />
```

## Design Tokens

Import `styles/tokens.css` to get all DSS CSS custom properties:

```css
@import './styles/tokens.css';
```

Available tokens: `--ssk-colors-*`, `--dss-radius-*`, `--dss-space-*`

> ⚠️ **Token Usage Policy**
>
> All components **must** use CSS variable tokens — never hardcode hex values.
>
> | Category | Token | Value |
> |---|---|---|
> | Primary | `var(--primary)` | Sky-500 #32a9ff |
> | Success | `var(--success)` | Emerald-600 #059669 |
> | Warning | `var(--warning)` | Amber-600 #d97706 |
> | Danger | `var(--danger)` | Rose-600 #e11d48 |
> | Text | `var(--foreground)` | Gray-800 #1f2937 |
> | Muted text | `var(--muted-foreground)` | Gray-500 #6b7280 |
> | Border | `var(--border)` | Gray-200 #e5e7eb |
> | Font | `var(--font-label)` | DB HeaventRounded |
> | H1 | `var(--text-h1)` | 48px |
> | H2 | `var(--text-h2)` | 40px |
> | H3 | `var(--text-h3)` | 28px |
> | H4 | `var(--text-h4)` | 24px |
> | Body | `var(--text-p)` | 20px |
> | Label | `var(--text-label)` | 18px |
> | Button | `var(--text-button)` | 18px |
>
> ❌ **Do NOT** hardcode: `color: #059669` → ✅ Use: `color: var(--success)`
> ❌ **Do NOT** hardcode: `font-family: 'Inter'` → ✅ Use: `font-family: var(--font-label)`
> ❌ **Do NOT** hardcode: `font-size: 14px` → ✅ Use: `font-size: var(--text-label)`

## Contributing

1. Each component should match the React version's props and behavior
2. Use DSS design tokens (not hardcoded values)
3. Follow Svelte conventions (events via `on:`, slots, reactive `$:`)
4. Add component to `index.ts` barrel export

## TODO

- [ ] DSInput (text input with validation)
- [ ] DSCheckbox / DSRadio
- [ ] Switch
- [ ] DatePicker
- [ ] SearchField
- [ ] DSTable
- [ ] Tabs
- [ ] Pagination
- [ ] Breadcrumb
- [ ] EmptyState
- [ ] Skeleton
- [ ] Card
- [ ] Tooltip / Popover
- [ ] Drawer
- [ ] Stepper
