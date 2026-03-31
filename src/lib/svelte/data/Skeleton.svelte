<script lang="ts">
	export let width: string | undefined = undefined;
	export let height: string = '16px';
	export let variant: 'text' | 'circular' | 'rectangular' = 'text';
	export let animate: boolean = true;
</script>

<span
	class="dss-skeleton variant-{variant}"
	class:animate
	style="width: {width || (variant === 'circular' ? height : '100%')}; height: {height};"
/>

<style>
	.dss-skeleton {
		display: inline-block;
		background: var(--border, #e5e7eb);
	}

	.variant-text {
		border-radius: var(--radius-xs, 4px);
	}
	.variant-circular {
		border-radius: 50%;
	}
	.variant-rectangular {
		border-radius: var(--radius-sm, 6px);
	}

	.animate {
		animation: dss-skeleton-pulse 1.5s ease-in-out infinite;
	}

	@keyframes dss-skeleton-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}
</style>
