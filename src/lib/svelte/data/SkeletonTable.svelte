<script lang="ts">
	import Skeleton from './Skeleton.svelte';

	export let rows: number = 5;
	export let columns: number = 4;
	export let animate: boolean = true;
	export let showHeader: boolean = true;
</script>

<div class="dss-skeleton-table">
	{#if showHeader}
		<div class="table-header">
			{#each Array(columns) as _, c}
				<div class="table-cell">
					<Skeleton variant="text" width="{50 + (c * 17) % 40}%" height="12px" {animate} />
				</div>
			{/each}
		</div>
	{/if}
	{#each Array(rows) as _, r}
		<div class="table-row">
			{#each Array(columns) as _, c}
				<div class="table-cell">
					<Skeleton variant="text" width="{45 + ((r + c) * 13) % 40}%" height="14px" {animate} />
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.dss-skeleton-table {
		width: 100%;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		overflow: hidden;
	}
	.table-header {
		display: flex;
		background: var(--ssk-colors-neutral-50, #f9fafb);
		border-bottom: 1px solid var(--border, #e5e7eb);
	}
	.table-row {
		display: flex;
		border-bottom: 1px solid var(--muted, #f3f4f6);
	}
	.table-row:last-child {
		border-bottom: none;
	}
	.table-cell {
		flex: 1;
		padding: var(--dss-space-4, 16px);
	}
</style>
