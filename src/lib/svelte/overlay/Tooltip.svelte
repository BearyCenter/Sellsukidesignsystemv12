<script lang="ts">
	export let content: string;
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'top';

	let visible = false;

	function show() { visible = true; }
	function hide() { visible = false; }
</script>

<div
	class="dss-tooltip-wrapper"
	on:mouseenter={show}
	on:mouseleave={hide}
	on:focusin={show}
	on:focusout={hide}
>
	<slot />
	{#if visible}
		<div class="dss-tooltip placement-{placement}" role="tooltip">
			{content}
		</div>
	{/if}
</div>

<style>
	.dss-tooltip-wrapper {
		position: relative;
		display: inline-flex;
	}

	.dss-tooltip {
		position: absolute;
		z-index: 1000;
		background: var(--ssk-colors-neutral-800, #1f2937);
		color: white;
		font-size: var(--text-xs);
		line-height: 1.4;
		padding: var(--dss-space-4, 4px) var(--dss-space-8, 8px);
		border-radius: var(--radius-sm, 4px);
		white-space: nowrap;
		pointer-events: none;
		animation: dss-tooltip-fade 0.15s ease-out;
		font-family: var(--font-label);
	}

	/* Arrow via ::after */
	.dss-tooltip::after {
		content: '';
		position: absolute;
		border: 5px solid transparent;
	}

	/* Placement: top */
	.placement-top {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}
	.placement-top::after {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-top-color: var(--ssk-colors-neutral-800, #1f2937);
	}

	/* Placement: bottom */
	.placement-bottom {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}
	.placement-bottom::after {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-color: var(--ssk-colors-neutral-800, #1f2937);
	}

	/* Placement: left */
	.placement-left {
		right: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}
	.placement-left::after {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-left-color: var(--ssk-colors-neutral-800, #1f2937);
	}

	/* Placement: right */
	.placement-right {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}
	.placement-right::after {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-right-color: var(--ssk-colors-neutral-800, #1f2937);
	}

	@keyframes dss-tooltip-fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
