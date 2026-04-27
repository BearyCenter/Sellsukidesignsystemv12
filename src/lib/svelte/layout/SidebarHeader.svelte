<script lang="ts">
	export let expanded: boolean = true;
</script>

<div class="dss-sidebar-header" class:expanded>
	<div class="dss-sidebar-header-full">
		<slot />
	</div>
	<div class="dss-sidebar-header-mini">
		<slot name="mini" />
	</div>
</div>

<style>
	.dss-sidebar-header {
		padding: 12px;
		border-bottom: 1px solid var(--border, #e5e7eb);
		overflow: hidden;
	}
	.dss-sidebar-header-full  { display: none; }
	.dss-sidebar-header-mini  { display: block; }
	.dss-sidebar-header.expanded .dss-sidebar-header-full { display: block; }
	.dss-sidebar-header.expanded .dss-sidebar-header-mini { display: none; }
</style>
