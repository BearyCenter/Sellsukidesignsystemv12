<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' = 'ghost';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let ariaLabel: string;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const sizeMap: Record<string, string> = {
		sm: '32px',
		md: '36px',
		lg: '40px',
		xl: '44px'
	};

	$: dimension = sizeMap[size] || '36px';
</script>

<button
	class="dss-icon-btn variant-{variant} size-{size}"
	style:width={dimension}
	style:height={dimension}
	{type}
	{disabled}
	aria-label={ariaLabel}
	aria-busy={loading}
	on:click
	on:keypress
>
	{#if loading}
		<svg class="dss-icon-btn-spinner" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="28" stroke-dashoffset="8" stroke-linecap="round" />
		</svg>
	{:else}
		<slot />
	{/if}
</button>

<style>
	.dss-icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		border-radius: var(--radius-sm, 6px);
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		flex-shrink: 0;
		padding: 0;
		font-family: inherit;
	}

	.dss-icon-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Primary */
	.variant-primary {
		background: var(--primary, #32a9ff);
		color: white;
		border-color: var(--primary, #32a9ff);
	}
	.variant-primary:hover:not(:disabled) {
		background: var(--ssk-colors-primary-600, #1b8bf5);
		border-color: var(--ssk-colors-primary-600, #1b8bf5);
	}

	/* Secondary */
	.variant-secondary {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-text-700, #374151);
		border-color: var(--border, #e5e7eb);
	}
	.variant-secondary:hover:not(:disabled) {
		background: var(--border, #e5e7eb);
	}

	/* Outline */
	.variant-outline {
		background: transparent;
		color: var(--ssk-colors-text-700, #374151);
		border-color: var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-outline:hover:not(:disabled) {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	/* Ghost */
	.variant-ghost {
		background: transparent;
		color: var(--ssk-colors-text-700, #374151);
	}
	.variant-ghost:hover:not(:disabled) {
		background: var(--muted, #f3f4f6);
	}

	/* Destructive */
	.variant-destructive {
		background: #ef4444;
		color: white;
		border-color: #ef4444;
	}
	.variant-destructive:hover:not(:disabled) {
		background: #dc2626;
		border-color: #dc2626;
	}

	.dss-icon-btn:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px white, 0 0 0 4px var(--primary, #32a9ff);
	}

	@keyframes dss-icon-spin {
		to { transform: rotate(360deg); }
	}

	.dss-icon-btn-spinner {
		animation: dss-icon-spin 0.8s linear infinite;
	}
</style>
