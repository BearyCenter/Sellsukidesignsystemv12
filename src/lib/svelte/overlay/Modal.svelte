<script lang="ts">
	export let open: boolean = false;

	function handleBackdropClick() {
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			open = false;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div class="dss-modal-backdrop" on:click={handleBackdropClick} on:keypress role="presentation">
		<div class="dss-modal" on:click|stopPropagation on:keypress role="dialog" aria-modal="true">
			<slot />
		</div>
	</div>
{/if}

<style>
	.dss-modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		animation: dss-fade-in 0.15s;
	}

	.dss-modal {
		background: white;
		border-radius: var(--radius-lg, 12px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
		max-width: 90vw;
		max-height: 90vh;
		overflow-y: auto;
		animation: dss-scale-in 0.15s;
	}

	@keyframes dss-fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes dss-scale-in {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
