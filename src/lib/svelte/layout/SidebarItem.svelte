<script lang="ts">
	export let actived: boolean = false;
	export let key: string = '';
</script>

<div class="dss-sidebar-item" class:actived data-key={key}>
	<span class="item-prefix"><slot name="prefix" /></span>
	<span class="item-label"><slot /></span>
</div>

<style>
	.dss-sidebar-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		border-radius: var(--radius-sm, 6px);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
		font-size: var(--text-input-md);
		color: var(--ssk-colors-neutral-700, #374151);
	}

	.dss-sidebar-item:hover {
		background: var(--muted, #f3f4f6);
	}

	.dss-sidebar-item.actived {
		background: var(--ssk-colors-primary-50, #f0f9ff);
		color: var(--ssk-colors-primary-600, #1b8bf5);
		font-weight: 500;
	}

	.item-prefix {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
	}

	.item-prefix:empty { display: none; }

	.item-label {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
