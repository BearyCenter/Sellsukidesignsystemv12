<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' = 'primary';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let fullWidth: boolean = false;
	export let title: string = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
	class="dss-btn variant-{variant} size-{size}"
	class:full-width={fullWidth}
	{disabled}
	{title}
	{type}
	on:click
	on:keypress
>
	{#if loading}
		<span class="spinner" />
	{/if}
	<slot name="prefix" />
	<slot />
	<slot name="suffix" />
</button>

<style>
	.dss-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		border: none;
		border-radius: var(--radius-md, 8px);
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		white-space: nowrap;
		font-family: var(--font-label);
	}

	.dss-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.full-width { width: 100%; }

	/* Sizes */
	.size-sm { padding: 6px 12px; font-size: var(--text-input-sm); height: 32px; }
	.size-md { padding: 8px 16px; font-size: var(--text-input-md); height: 36px; }
	.size-lg { padding: 10px 20px; font-size: var(--text-input-lg); height: 40px; }
	.size-xl { padding: 12px 24px; font-size: var(--text-sm); height: 44px; }

	/* Primary — Sky-500 */
	.variant-primary {
		background: var(--primary, #32a9ff);
		color: white;
		border: 1px solid var(--primary, #32a9ff);
	}
	.variant-primary:hover:not(:disabled) {
		background: var(--ssk-colors-primary-600, #1b8bf5);
		border-color: var(--ssk-colors-primary-600, #1b8bf5);
	}

	/* Secondary */
	.variant-secondary {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-neutral-700, #374151);
		border: 1px solid var(--muted, #f3f4f6);
	}
	.variant-secondary:hover:not(:disabled) {
		background: var(--border, #e5e7eb);
	}

	/* Outline */
	.variant-outline {
		background: transparent;
		color: var(--ssk-colors-neutral-700, #374151);
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-outline:hover:not(:disabled) {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	/* Ghost */
	.variant-ghost {
		background: transparent;
		color: var(--ssk-colors-neutral-700, #374151);
		border: 1px solid transparent;
	}
	.variant-ghost:hover:not(:disabled) {
		background: var(--muted, #f3f4f6);
	}

	/* Destructive */
	.variant-destructive {
		background: var(--ssk-colors-secondary-500, #FF0006);
		color: white;
		border: 1px solid var(--ssk-colors-secondary-500, #FF0006);
	}
	.variant-destructive:hover:not(:disabled) {
		background: var(--ssk-colors-secondary-600, #D90005);
	}

	/* Link */
	.variant-link {
		background: transparent;
		color: var(--primary, #32a9ff);
		border: none;
		padding: 0;
		height: auto;
		text-decoration: underline;
	}
	.variant-link:hover:not(:disabled) {
		color: var(--ssk-colors-primary-600, #1b8bf5);
	}

	/* Loading spinner */
	.spinner {
		width: 14px;
		height: 14px;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 50%;
		animation: dss-btn-spin 0.6s linear infinite;
	}

	@keyframes dss-btn-spin {
		to { transform: rotate(360deg); }
	}
</style>
