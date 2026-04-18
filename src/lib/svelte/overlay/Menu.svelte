<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	export let items: MenuItem[] = [];
	export let open: boolean = false;

	const dispatch = createEventDispatcher();

	interface MenuItem {
		text?: string;
		icon?: string;
		shortcut?: string;
		onClick?: () => void;
		divider?: boolean;
		label?: string;
		destructive?: boolean;
		disabled?: boolean;
		children?: MenuItem[];
	}

	let menuEl: HTMLDivElement;
	let activeSubmenu: number | null = null;

	function handleSelect(item: MenuItem) {
		if (item.disabled) return;
		if (item.onClick) item.onClick();
		dispatch('select', item);
		open = false;
		dispatch('close');
	}

	function handleClickOutside(e: MouseEvent) {
		if (open && menuEl && !menuEl.contains(e.target as Node)) {
			open = false;
			dispatch('close');
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			dispatch('close');
		}
	}

	onMount(() => {
		window.addEventListener('click', handleClickOutside, true);
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutside, true);
		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="dss-menu-wrapper" bind:this={menuEl}>
	<div class="dss-menu-trigger" on:click={() => { open = !open; }} on:keypress={() => { open = !open; }} role="button" tabindex={0}>
		<slot name="trigger" />
	</div>

	{#if open}
		<div class="dss-menu" role="menu">
			{#each items as item, i}
				{#if item.divider}
					<div class="menu-divider" role="separator"></div>
				{:else if item.label}
					<div class="menu-label">{item.label}</div>
				{:else}
					<button
						class="menu-item"
						class:destructive={item.destructive}
						class:disabled={item.disabled}
						class:has-children={item.children && item.children.length > 0}
						role="menuitem"
						tabindex={item.disabled ? -1 : 0}
						disabled={item.disabled}
						on:click={() => handleSelect(item)}
						on:mouseenter={() => { activeSubmenu = item.children ? i : null; }}
						on:mouseleave={() => { if (activeSubmenu === i) activeSubmenu = null; }}
					>
						<span class="menu-item-text">{item.text || ''}</span>
						{#if item.shortcut}
							<span class="menu-item-shortcut">{item.shortcut}</span>
						{/if}
						{#if item.children && item.children.length > 0}
							<svg class="submenu-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
								<path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>

							{#if activeSubmenu === i}
								<div class="dss-menu dss-submenu" role="menu">
									{#each item.children as child}
										{#if child.divider}
											<div class="menu-divider" role="separator"></div>
										{:else}
											<button
												class="menu-item"
												class:destructive={child.destructive}
												class:disabled={child.disabled}
												role="menuitem"
												disabled={child.disabled}
												on:click|stopPropagation={() => handleSelect(child)}
											>
												<span class="menu-item-text">{child.text || ''}</span>
												{#if child.shortcut}
													<span class="menu-item-shortcut">{child.shortcut}</span>
												{/if}
											</button>
										{/if}
									{/each}
								</div>
							{/if}
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.dss-menu-wrapper {
		position: relative;
		display: inline-flex;
	}

	.dss-menu-trigger {
		cursor: pointer;
	}

	.dss-menu {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 50;
		min-width: 180px;
		padding: var(--dss-space-4, 4px);
		background: var(--dss-bg-primary, #ffffff);
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		animation: dss-menu-in 0.15s ease;
	}

	.dss-submenu {
		position: absolute;
		top: -4px;
		left: 100%;
		margin-left: 4px;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		width: 100%;
		padding: var(--dss-space-8, 8px) var(--dss-space-12, 12px);
		border: none;
		border-radius: var(--radius-sm, 6px);
		background: none;
		cursor: pointer;
		font-size: var(--text-p, 14px);
		color: var(--ssk-colors-text-700, #374151);
		text-align: left;
		font-family: inherit;
		position: relative;
		transition: background 0.1s;
	}

	.menu-item:hover:not(:disabled) {
		background: var(--muted, #f3f4f6);
	}

	.menu-item.destructive {
		color: #ef4444;
	}
	.menu-item.destructive:hover:not(:disabled) {
		background: #fef2f2;
	}

	.menu-item:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.menu-item-text {
		flex: 1;
	}

	.menu-item-shortcut {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.submenu-arrow {
		flex-shrink: 0;
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.menu-divider {
		height: 1px;
		background: var(--border, #e5e7eb);
		margin: var(--dss-space-4, 4px) 0;
	}

	.menu-label {
		padding: var(--dss-space-8, 8px) var(--dss-space-12, 12px) var(--dss-space-4, 4px);
		font-size: var(--text-caption, 18px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	@keyframes dss-menu-in {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
