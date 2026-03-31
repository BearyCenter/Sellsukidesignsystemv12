<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick(e: MouseEvent) {
		dispatch('click', e);
	}
</script>

<div
	class="dss-dropdown-option"
	role="menuitem"
	tabindex={$$restProps.tabindex ?? 0}
	on:click={handleClick}
	on:click
	on:keypress
>
	<span class="option-prefix"><slot name="prefix" /></span>
	<span class="option-content"><slot /></span>
</div>

<style>
	.dss-dropdown-option {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		cursor: pointer;
		transition: background 0.1s;
		font-size: var(--text-input-md);
		color: var(--foreground, #111827);
	}

	.dss-dropdown-option:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	.option-prefix {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
	}

	.option-prefix:empty { display: none; }

	.option-content {
		flex: 1;
		min-width: 0;
	}
</style>
