<script lang="ts">
	// Wrapper that connects child buttons visually
</script>

<div class="dss-button-group" role="group">
	<slot />
</div>

<style>
	.dss-button-group {
		display: inline-flex;
	}

	.dss-button-group > :global(.dss-btn) {
		border-radius: 0;
		margin-left: -1px;
	}

	.dss-button-group > :global(.dss-btn:first-child) {
		border-radius: var(--radius-sm, 6px) 0 0 var(--radius-sm, 6px);
		margin-left: 0;
	}

	.dss-button-group > :global(.dss-btn:last-child) {
		border-radius: 0 var(--radius-sm, 6px) var(--radius-sm, 6px) 0;
	}

	.dss-button-group > :global(.dss-btn:only-child) {
		border-radius: var(--radius-sm, 6px);
	}

	.dss-button-group > :global(.dss-btn:hover),
	.dss-button-group > :global(.dss-btn:focus) {
		z-index: 1;
	}
</style>
