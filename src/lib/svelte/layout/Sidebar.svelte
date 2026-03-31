<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let expanded: boolean = true;
	export let expandedGroups: string[] = [];

	const dispatch = createEventDispatcher();

	function handleExpandedGroupsChanged(key: string, isExpanded: boolean) {
		dispatch('expanded-groups-changed', { key, expanded: isExpanded });
	}

	// Expose for child groups to call
	export { handleExpandedGroupsChanged };
</script>

<aside class="dss-sidebar" class:collapsed={!expanded}>
	<div class="sidebar-header">
		<slot name="header" />
	</div>
	<div class="sidebar-body">
		<slot />
	</div>
	<div class="sidebar-footer">
		<slot name="footer" />
	</div>
</aside>

<style>
	.dss-sidebar {
		display: flex;
		flex-direction: column;
		width: 260px;
		height: 100%;
		background: white;
		border-right: 1px solid var(--border, #e5e7eb);
		transition: width 0.2s;
		overflow: hidden;
		box-sizing: border-box;
	}

	.dss-sidebar.collapsed {
		width: 64px;
	}

	.sidebar-header {
		flex-shrink: 0;
	}

	.sidebar-body {
		flex: 1;
		overflow-y: auto;
	}

	.sidebar-footer {
		flex-shrink: 0;
		padding: 8px;
		border-top: 1px solid var(--border, #e5e7eb);
	}

	.sidebar-footer:empty {
		display: none;
	}
</style>
