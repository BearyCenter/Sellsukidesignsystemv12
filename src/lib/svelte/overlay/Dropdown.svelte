<script lang="ts">
	export let themeColor: 'primary' | 'neutral' = 'primary';
	export let optionsWidth: string = '200px';
	export let width: 'auto' | 'full' = 'auto';

	let open = false;
	let dropdownEl: HTMLDivElement;

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function handleClickOutside(e: MouseEvent) {
		if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
			close();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div
	class="dss-dropdown"
	class:full-width={width === 'full'}
	bind:this={dropdownEl}
>
	<div class="dropdown-trigger" on:click={toggle} on:keypress={toggle} role="button" tabindex="0">
		<slot name="selected" />
	</div>

	{#if open}
		<div
			class="dropdown-menu theme-{themeColor}"
			style:width={optionsWidth === 'auto' ? 'auto' : optionsWidth}
			style:min-width={width === 'full' ? '100%' : undefined}
			role="menu"
			tabindex="-1"
			on:click={close}
			on:keypress
		>
			<slot />
		</div>
	{/if}
</div>

<style>
	.dss-dropdown {
		position: relative;
		display: inline-block;
	}

	.full-width {
		display: block;
		width: 100%;
	}

	.dropdown-trigger {
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		background: white;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		z-index: 50;
		padding: 4px 0;
		overflow: hidden;
	}

</style>
