<script lang="ts">
	/* CardFooter — bottom section with flex row layout */
</script>

<div class="dss-card-footer">
	<slot />
</div>

<style>
	.dss-card-footer {
		display: flex;
		align-items: center;
		gap: var(--dss-space-12, 12px);
		padding: var(--dss-space-16, 16px);
		border-top: 1px solid var(--border, #e5e7eb);
	}
</style>
