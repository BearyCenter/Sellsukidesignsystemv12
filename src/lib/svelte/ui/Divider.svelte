<script lang="ts">
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let size: 'xs' | 'sm' | 'md' = 'sm';
</script>

<div class="dss-divider {orientation} size-{size}" role="separator"></div>

<style>
	.dss-divider {
		flex-shrink: 0;
		background: var(--border, #e5e7eb);
	}

	.horizontal {
		width: 100%;
	}
	.horizontal.size-xs { height: 1px; }
	.horizontal.size-sm { height: 1px; margin: 4px 0; }
	.horizontal.size-md { height: 2px; margin: 8px 0; }

	.vertical {
		height: 100%;
	}
	.vertical.size-xs { width: 1px; }
	.vertical.size-sm { width: 1px; margin: 0 4px; }
	.vertical.size-md { width: 2px; margin: 0 8px; }
</style>
