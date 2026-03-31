<script lang="ts">
	/* CardHeader — title area with optional action slot */
</script>

<div class="dss-card-header">
	<div class="card-header-content">
		<slot />
	</div>
	<div class="card-header-action">
		<slot name="action" />
	</div>
</div>

<style>
	.dss-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--dss-space-12, 12px);
		padding: var(--dss-space-16, 16px);
		border-bottom: 1px solid var(--border, #e5e7eb);
	}

	.card-header-content {
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-4, 4px);
		min-width: 0;
		flex: 1;
	}

	.card-header-action {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		flex-shrink: 0;
	}
</style>
