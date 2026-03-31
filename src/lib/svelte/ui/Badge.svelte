<script lang="ts">
	export let variant: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<span class="dss-badge variant-{variant} size-{size}">
	<slot />
</span>

<style>
	.dss-badge {
		display: inline-flex;
		align-items: center;
		border-radius: var(--radius-full, 9999px);
		font-weight: 500;
		white-space: nowrap;
	}

	/* Sizes */
	.size-sm { padding: 1px 6px; font-size: var(--text-2xs); }
	.size-md { padding: 2px 8px; font-size: var(--text-xs); }
	.size-lg { padding: 3px 10px; font-size: var(--text-input-sm); }

	/* Variants */
	.variant-default {
		background: var(--primary, #32a9ff);
		color: white;
	}
	.variant-secondary {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-neutral-700, #374151);
	}
	.variant-outline {
		background: transparent;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		color: var(--ssk-colors-neutral-700, #374151);
	}
	.variant-destructive {
		background: var(--ssk-colors-secondary-500, #FF0006);
		color: white;
	}
	.variant-success {
		background: #10b981;
		color: white;
	}
	.variant-warning {
		background: #f59e0b;
		color: white;
	}
</style>
