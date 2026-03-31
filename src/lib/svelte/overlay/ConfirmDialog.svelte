<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open: boolean = false;
	export let title: string = 'Confirm';
	export let description: string | undefined = undefined;
	export let confirmLabel: string = 'Confirm';
	export let cancelLabel: string = 'Cancel';
	export let variant: 'default' | 'destructive' = 'default';

	const dispatch = createEventDispatcher<{ confirm: void; close: void }>();

	function handleConfirm() {
		dispatch('confirm');
		open = false;
	}

	function handleClose() {
		dispatch('close');
		open = false;
	}

	function handleBackdropClick() {
		handleClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div class="dss-confirm-backdrop" on:click={handleBackdropClick} on:keypress role="presentation">
		<div
			class="dss-confirm-dialog"
			on:click|stopPropagation
			on:keypress
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="confirm-title"
		>
			<div class="confirm-header">
				<h3 class="confirm-title" id="confirm-title">{title}</h3>
			</div>
			{#if description}
				<div class="confirm-body">
					<p class="confirm-description">{description}</p>
				</div>
			{/if}
			<div class="confirm-footer">
				<button class="confirm-btn btn-cancel" on:click={handleClose} type="button">
					{cancelLabel}
				</button>
				<button
					class="confirm-btn btn-confirm variant-{variant}"
					on:click={handleConfirm}
					type="button"
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.dss-confirm-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		animation: dss-fade-in 0.15s;
		font-family: var(--font-label);
	}

	.dss-confirm-dialog {
		background: white;
		border-radius: var(--radius-lg, 12px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
		width: 100%;
		max-width: 420px;
		animation: dss-scale-in 0.15s;
	}

	.confirm-header {
		padding: var(--dss-space-20, 20px) var(--dss-space-24, 24px) 0;
	}

	.confirm-title {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--foreground, #111827);
		line-height: 1.4;
	}

	.confirm-body {
		padding: var(--dss-space-8, 8px) var(--dss-space-24, 24px) 0;
	}

	.confirm-description {
		margin: 0;
		font-size: var(--text-input-md);
		color: var(--muted-foreground, #6b7280);
		line-height: 1.5;
	}

	.confirm-footer {
		display: flex;
		justify-content: flex-end;
		gap: var(--dss-space-8, 8px);
		padding: var(--dss-space-20, 20px) var(--dss-space-24, 24px);
	}

	.confirm-btn {
		padding: var(--dss-space-8, 8px) var(--dss-space-16, 16px);
		border-radius: var(--radius-md, 8px);
		font-size: var(--text-input-md);
		font-weight: 500;
		cursor: pointer;
		border: none;
		transition: background 0.15s, opacity 0.15s;
		line-height: 1.4;
	}

	.btn-cancel {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-text-700, #374151);
	}
	.btn-cancel:hover {
		background: var(--border, #e5e7eb);
	}

	.btn-confirm.variant-default {
		background: var(--primary, #3b82f6);
		color: white;
	}
	.btn-confirm.variant-default:hover {
		background: var(--ssk-colors-primary-600, #2563eb);
	}

	.btn-confirm.variant-destructive {
		background: var(--danger);
		color: var(--danger-foreground);
	}
	.btn-confirm.variant-destructive:hover {
		background: var(--danger-hover);
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
