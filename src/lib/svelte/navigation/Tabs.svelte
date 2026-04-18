<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let tabs: { id: string; label: string; icon?: string; disabled?: boolean; badge?: string }[] = [];
	export let variant: 'default' | 'outlined' | 'filled' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let activeTab: string | undefined = undefined;
	export let fullWidth: boolean = false;

	const dispatch = createEventDispatcher<{ change: string }>();

	$: if (!activeTab && tabs.length > 0) {
		activeTab = tabs[0].id;
	}

	function handleTabClick(tab: { id: string; disabled?: boolean }) {
		if (tab.disabled) return;
		activeTab = tab.id;
		dispatch('change', tab.id);
	}
</script>

<div class="dss-tabs variant-{variant} size-{size}" class:full-width={fullWidth}>
	<div class="tabs-list" role="tablist">
		{#each tabs as tab (tab.id)}
			<button
				class="tab-item"
				class:active={activeTab === tab.id}
				class:disabled={tab.disabled}
				role="tab"
				aria-selected={activeTab === tab.id}
				aria-disabled={tab.disabled || false}
				tabindex={tab.disabled ? -1 : 0}
				on:click={() => handleTabClick(tab)}
			>
				{#if tab.icon}
					<span class="tab-icon">{tab.icon}</span>
				{/if}
				<span class="tab-label">{tab.label}</span>
				{#if tab.badge}
					<span class="tab-badge">{tab.badge}</span>
				{/if}
			</button>
		{/each}
	</div>
	<div class="tabs-content">
		<slot />
	</div>
</div>

<style>
	.dss-tabs {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.tabs-list {
		display: flex;
		align-items: center;
		gap: 0;
		border-bottom: 1px solid var(--border, #e5e7eb);
	}

	.full-width .tabs-list {
		width: 100%;
	}

	.full-width .tab-item {
		flex: 1;
		justify-content: center;
	}

	.tab-item {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-4, 4px);
		padding: var(--dss-space-8, 8px) var(--dss-space-16, 16px);
		background: none;
		border: none;
		cursor: pointer;
		color: var(--muted-foreground, #6b7280);
		font-weight: 500;
		white-space: nowrap;
		position: relative;
		transition: color 0.15s ease, background 0.15s ease;
	}

	.tab-item:hover:not(.disabled) {
		color: var(--ssk-colors-text-700, #374151);
	}

	.tab-item.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Default variant — bottom border indicator */
	.variant-default .tab-item.active {
		color: var(--primary, #32a9ff);
	}

	.variant-default .tab-item.active::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--primary, #32a9ff);
		border-radius: 1px 1px 0 0;
	}

	/* Outlined variant — bordered tabs */
	.variant-outlined .tabs-list {
		border-bottom: 1px solid var(--border, #e5e7eb);
	}

	.variant-outlined .tab-item {
		border: 1px solid transparent;
		border-bottom: none;
		border-radius: var(--radius-sm, 4px) var(--radius-sm, 4px) 0 0;
		margin-bottom: -1px;
	}

	.variant-outlined .tab-item.active {
		color: var(--primary, #32a9ff);
		border-color: var(--border, #e5e7eb);
		background: var(--dss-bg-primary, #ffffff);
	}

	/* Filled variant — background on active */
	.variant-filled .tabs-list {
		border-bottom: none;
		background: var(--muted, #f3f4f6);
		border-radius: var(--radius-md, 8px);
		padding: 3px;
		gap: 2px;
	}

	.variant-filled .tab-item {
		border-radius: var(--radius-sm, 4px);
	}

	.variant-filled .tab-item.active {
		background: var(--dss-bg-primary, #ffffff);
		color: var(--foreground, #111827);
		box-shadow: var(--dss-shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
	}

	/* Tab badge */
	.tab-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0 6px;
		min-width: 18px;
		height: 18px;
		border-radius: var(--radius-full, 9999px);
		background: var(--border, #e5e7eb);
		color: var(--ssk-colors-text-700, #374151);
		font-size: var(--text-2xs);
		font-weight: 600;
	}

	.tab-item.active .tab-badge {
		background: var(--ssk-colors-primary-50, #eff8ff);
		color: var(--primary, #32a9ff);
	}

	.tab-icon {
		display: inline-flex;
		align-items: center;
	}

	/* Sizes */
	.size-sm .tab-item {
		padding: var(--dss-space-4, 4px) var(--dss-space-12, 12px);
		font-size: var(--text-caption, 18px);
	}
	.size-md .tab-item {
		padding: var(--dss-space-8, 8px) var(--dss-space-16, 16px);
		font-size: var(--text-sm, 13px);
	}
	.size-lg .tab-item {
		padding: var(--dss-space-12, 12px) var(--dss-space-20, 20px);
		font-size: var(--text-p, 14px);
	}

	.tabs-content {
		padding-top: var(--dss-space-16, 16px);
	}
</style>
