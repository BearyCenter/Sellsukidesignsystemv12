<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	export let title: string | undefined = undefined;
	export let open: boolean = false;

	const dispatch = createEventDispatcher<{ openChange: { open: boolean } }>();

	function toggle() {
		open = !open;
		dispatch('openChange', { open });
	}

	function close() {
		if (!open) return;
		open = false;
		dispatch('openChange', { open });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			close();
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.dss-popover-wrapper')) {
			close();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} on:click={handleClickOutside} />

<div class="dss-popover-wrapper">
	<div class="dss-popover-trigger" on:click|stopPropagation={toggle} on:keypress role="button" tabindex="0">
		<slot name="trigger" />
	</div>
	{#if open}
		<div class="dss-popover placement-{placement}" on:click|stopPropagation on:keypress role="dialog">
			{#if title}
				<div class="popover-header">{title}</div>
			{/if}
			<div class="popover-content">
				<slot />
			</div>
		</div>
	{/if}
</div>

<style>
	.dss-popover-wrapper {
		position: relative;
		display: inline-flex;
	}

	.dss-popover-trigger {
		display: inline-flex;
		cursor: pointer;
	}

	.dss-popover {
		position: absolute;
		z-index: 200;
		background: white;
		border-radius: var(--radius-lg, 12px);
		box-shadow: var(--dss-shadow-sm, 0 4px 12px rgba(0, 0, 0, 0.12));
		min-width: 200px;
		animation: dss-popover-in 0.15s ease-out;
		font-family: var(--font-label);
	}

	.placement-bottom {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.placement-top {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.placement-left {
		right: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.placement-right {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.popover-header {
		padding: var(--dss-space-12, 12px) var(--dss-space-16, 16px);
		font-size: var(--text-input-md);
		font-weight: 600;
		color: var(--foreground, #111827);
		border-bottom: 1px solid var(--muted, #f3f4f6);
	}

	.popover-content {
		padding: var(--dss-space-12, 12px) var(--dss-space-16, 16px);
	}

	@keyframes dss-popover-in {
		from { opacity: 0; transform: translateX(-50%) translateY(4px); }
		to { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	.placement-top + .dss-popover,
	:global(.placement-top) {
		/* override animation for top */
	}

	@keyframes dss-popover-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
