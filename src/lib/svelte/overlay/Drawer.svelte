<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open: boolean = false;
	export let title: string | undefined = undefined;
	export let side: 'left' | 'right' | 'top' | 'bottom' = 'right';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher<{ close: void }>();

	const sizeMap: Record<string, string> = {
		sm: '320px',
		md: '480px',
		lg: '640px'
	};

	function handleClose() {
		open = false;
		dispatch('close');
	}

	function handleBackdropClick() {
		handleClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}

	$: panelStyle = (() => {
		if (side === 'left' || side === 'right') {
			return `width: ${sizeMap[size]}; max-width: 100vw;`;
		}
		return `height: ${sizeMap[size]}; max-height: 100vh;`;
	})();
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div class="dss-drawer-backdrop" on:click={handleBackdropClick} on:keypress role="presentation">
		<div
			class="dss-drawer side-{side}"
			style={panelStyle}
			on:click|stopPropagation
			on:keypress
			role="dialog"
			aria-modal="true"
		>
			{#if title}
				<div class="drawer-header">
					<h3 class="drawer-title">{title}</h3>
					<button class="drawer-close" on:click={handleClose} type="button" aria-label="Close">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
							<path d="M5 5l10 10M15 5l-10 10" />
						</svg>
					</button>
				</div>
			{:else}
				<button class="drawer-close drawer-close-float" on:click={handleClose} type="button" aria-label="Close">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<path d="M5 5l10 10M15 5l-10 10" />
					</svg>
				</button>
			{/if}

			<div class="drawer-body">
				<slot />
			</div>

			<slot name="footer">
				<!-- optional footer slot -->
			</slot>
		</div>
	</div>
{/if}

<style>
	.dss-drawer-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 100;
		animation: dss-fade-in 0.15s;
		font-family: var(--font-label);
	}

	.dss-drawer {
		position: fixed;
		background: white;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Side positions */
	.side-right {
		top: 0;
		right: 0;
		bottom: 0;
		animation: dss-slide-right 0.25s ease-out;
	}
	.side-left {
		top: 0;
		left: 0;
		bottom: 0;
		animation: dss-slide-left 0.25s ease-out;
	}
	.side-top {
		top: 0;
		left: 0;
		right: 0;
		animation: dss-slide-top 0.25s ease-out;
	}
	.side-bottom {
		bottom: 0;
		left: 0;
		right: 0;
		animation: dss-slide-bottom 0.25s ease-out;
	}

	/* Header */
	.drawer-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--dss-space-16, 16px) var(--dss-space-20, 20px);
		border-bottom: 1px solid var(--muted, #f3f4f6);
		flex-shrink: 0;
	}

	.drawer-title {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--foreground, #111827);
		line-height: 1.4;
	}

	.drawer-close {
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--dss-space-4, 4px);
		color: var(--ssk-colors-text-400, #9ca3af);
		border-radius: var(--radius-sm, 4px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s;
	}
	.drawer-close:hover {
		color: var(--ssk-colors-text-700, #374151);
	}

	.drawer-close-float {
		position: absolute;
		top: var(--dss-space-12, 12px);
		right: var(--dss-space-12, 12px);
		z-index: 1;
	}

	/* Body */
	.drawer-body {
		flex: 1;
		overflow-y: auto;
		padding: var(--dss-space-20, 20px);
	}

	/* Animations */
	@keyframes dss-fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes dss-slide-right {
		from { transform: translateX(100%); }
		to { transform: translateX(0); }
	}

	@keyframes dss-slide-left {
		from { transform: translateX(-100%); }
		to { transform: translateX(0); }
	}

	@keyframes dss-slide-top {
		from { transform: translateY(-100%); }
		to { transform: translateY(0); }
	}

	@keyframes dss-slide-bottom {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}
</style>
