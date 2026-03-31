<script lang="ts">
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal';
	export let color: 'default' | 'neutral' | 'primary' | 'secondary' | 'muted' = 'default';
</script>

<span class="dss-text size-{size} weight-{weight} color-{color}">
	<slot />
</span>

<style>
	.dss-text {
		display: inline;
		line-height: 1.5;
	}

	/* DSS: button=14, label=18, caption=20, body=24 — mapped to size props */
	.size-xs { font-size: 12px; }
	.size-sm { font-size: 14px; }
	.size-md { font-size: 16px; }
	.size-lg { font-size: 18px; }
	.size-xl { font-size: 20px; }

	/* Weights */
	.weight-normal { font-weight: 400; }
	.weight-medium { font-weight: 500; }
	.weight-semibold { font-weight: 600; }
	.weight-bold { font-weight: 700; }

	/* Colors */
	.color-default { color: var(--foreground, #111827); }
	.color-neutral { color: var(--ssk-colors-neutral-500, #6b7280); }
	.color-primary { color: var(--primary, #FF8D00); }
	.color-secondary { color: var(--ssk-colors-secondary-500, #FF0006); }
	.color-muted { color: var(--ssk-colors-neutral-400, #9ca3af); }
</style>
