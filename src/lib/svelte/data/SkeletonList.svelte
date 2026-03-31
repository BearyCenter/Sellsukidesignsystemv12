<script lang="ts">
	import Skeleton from './Skeleton.svelte';

	export let rows: number = 5;
	export let animate: boolean = true;
	export let showAvatar: boolean = true;
</script>

<div class="dss-skeleton-list">
	{#each Array(rows) as _, i}
		<div class="list-item">
			{#if showAvatar}
				<Skeleton variant="circular" width="36px" height="36px" {animate} />
			{/if}
			<div class="list-content">
				<Skeleton variant="text" width="{55 + (i * 13) % 35}%" height="14px" {animate} />
				<Skeleton variant="text" width="{40 + (i * 7) % 25}%" height="12px" {animate} />
			</div>
		</div>
	{/each}
</div>

<style>
	.dss-skeleton-list {
		display: flex;
		flex-direction: column;
	}
	.list-item {
		display: flex;
		align-items: center;
		gap: var(--dss-space-4, 16px);
		padding: var(--dss-space-4, 16px) 0;
		border-bottom: 1px solid var(--muted, #f3f4f6);
	}
	.list-item:last-child {
		border-bottom: none;
	}
	.list-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-2, 8px);
	}
</style>
