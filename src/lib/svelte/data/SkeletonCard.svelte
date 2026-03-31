<script lang="ts">
	import Skeleton from './Skeleton.svelte';

	export let animate: boolean = true;
</script>

<div class="dss-skeleton-card">
	<Skeleton variant="rectangular" height="140px" {animate} />
	<div class="card-body">
		<Skeleton variant="text" width="70%" height="18px" {animate} />
		<Skeleton variant="text" width="100%" height="14px" {animate} />
		<Skeleton variant="text" width="85%" height="14px" {animate} />
		<div class="card-footer">
			<Skeleton variant="circular" width="28px" height="28px" {animate} />
			<Skeleton variant="text" width="100px" height="14px" {animate} />
		</div>
	</div>
</div>

<style>
	.dss-skeleton-card {
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		overflow: hidden;
		background: white;
	}
	.card-body {
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-4, 16px);
		padding: var(--dss-space-4, 16px);
	}
	.card-footer {
		display: flex;
		align-items: center;
		gap: var(--dss-space-4, 16px);
		margin-top: var(--dss-space-2, 8px);
	}
</style>
