<script lang="ts">
	export let expanded: boolean = true;
</script>

<div class="dss-sidebar-header">
	{#if expanded}
		<slot />
	{:else}
		<slot name="mini" />
	{/if}
</div>

<style>
	.dss-sidebar-header {
		padding: 12px;
		border-bottom: 1px solid var(--border, #e5e7eb);
	}
</style>
