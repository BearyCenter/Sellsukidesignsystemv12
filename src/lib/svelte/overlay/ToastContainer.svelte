<script lang="ts">
	import { toasts } from '$lib/stores/toast';
	import Icon from '../ui/Icon.svelte';

	const variantIcons: Record<string, string> = {
		info: 'Info',
		success: 'CheckCircle2',
		warning: 'AlertTriangle',
		error: 'XCircle'
	};
</script>

<div class="dss-toast-container">
	{#each $toasts as toast (toast.id)}
		<div class="toast variant-{toast.variant}">
			<Icon name={variantIcons[toast.variant]} size="sm" />
			<span class="toast-message">{toast.message}</span>
			<button class="toast-close" on:click={() => toasts.remove(toast.id)} type="button">
				<Icon name="X" size="xs" />
			</button>
		</div>
	{/each}
</div>

<style>
	.dss-toast-container {
		position: fixed;
		top: 16px;
		right: 16px;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 400px;
	}

	.toast {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		border-radius: var(--radius-md, 8px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		font-size: var(--text-input-md);
		animation: dss-toast-in 0.2s ease-out;
	}

	.variant-info { background: #eff6ff; color: #1e40af; }
	.variant-success { background: #f0fdf4; color: #166534; }
	.variant-warning { background: #fffbeb; color: #92400e; }
	.variant-error { background: #fef2f2; color: #991b1b; }

	.toast-message { flex: 1; }

	.toast-close {
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px;
		color: inherit;
		opacity: 0.6;
	}

	.toast-close:hover { opacity: 1; }

	@keyframes dss-toast-in {
		from { opacity: 0; transform: translateX(20px); }
		to { opacity: 1; transform: translateX(0); }
	}
</style>
