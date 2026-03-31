<script lang="ts">
	export let max: number = 4;

	let wrapperEl: HTMLDivElement;

	$: totalChildren = wrapperEl?.children?.length ?? 0;
	$: overflow = Math.max(0, totalChildren - max);

	function updateVisibility() {
		if (!wrapperEl) return;
		const children = Array.from(wrapperEl.children) as HTMLElement[];
		totalChildren = children.length;
		children.forEach((child, i) => {
			if (child.classList.contains('dss-avatar-group-overflow')) return;
			child.style.display = i < max ? '' : 'none';
			child.style.zIndex = String(children.length - i);
		});
	}

	// Re-run on DOM changes
	$: if (wrapperEl && max) {
		requestAnimationFrame(updateVisibility);
	}
</script>

<div class="dss-avatar-group" bind:this={wrapperEl} on:introstart={updateVisibility}>
	<slot />
	{#if overflow > 0}
		<div class="dss-avatar-group-overflow" style:z-index="0">
			<span class="overflow-text">+{overflow}</span>
		</div>
	{/if}
</div>

<style>
	.dss-avatar-group {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.dss-avatar-group > :global(*) {
		margin-left: -8px;
		border: 2px solid white;
		border-radius: 50%;
		box-sizing: content-box;
	}

	.dss-avatar-group > :global(*:first-child) {
		margin-left: 0;
	}

	.dss-avatar-group-overflow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--border, #e5e7eb);
		margin-left: -8px;
		border: 2px solid white;
		box-sizing: content-box;
		flex-shrink: 0;
	}

	.overflow-text {
		font-size: var(--text-sm, 13px);
		font-weight: 600;
		color: var(--ssk-colors-text-700, #374151);
		user-select: none;
	}
</style>
