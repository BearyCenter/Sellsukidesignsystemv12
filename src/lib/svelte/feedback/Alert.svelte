<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant: 'info' | 'success' | 'warning' | 'error' = 'info';
	export let title: string | undefined = undefined;
	export let dismissible: boolean = false;

	const dispatch = createEventDispatcher<{ dismiss: void }>();

	let visible = true;

	function handleDismiss() {
		visible = false;
		dispatch('dismiss');
	}

	const variantIcons: Record<string, string> = {
		info: '\u2139\uFE0F',
		success: '\u2705',
		warning: '\u26A0\uFE0F',
		error: '\u274C'
	};
</script>

{#if visible}
	<div class="dss-alert variant-{variant}" role="alert">
		<div class="alert-icon">
			<slot name="icon">
				<span class="alert-icon-default">{variantIcons[variant]}</span>
			</slot>
		</div>
		<div class="alert-body">
			{#if title}
				<div class="alert-title">{title}</div>
			{/if}
			<div class="alert-message">
				<slot />
			</div>
			<slot name="action" />
		</div>
		{#if dismissible}
			<button class="alert-close" on:click={handleDismiss} type="button" aria-label="Dismiss">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<path d="M4 4l8 8M12 4l-8 8" />
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	.dss-alert {
		display: flex;
		align-items: flex-start;
		gap: var(--dss-space-12, 12px);
		padding: var(--dss-space-12, 12px) var(--dss-space-16, 16px);
		border-radius: var(--radius-md, 8px);
		border-left: 4px solid;
		width: 100%;
		box-sizing: border-box;
		font-family: var(--font-label);
		animation: dss-alert-in 0.2s ease-out;
	}

	/* Info */
	.variant-info {
		background: #eff6ff;
		border-left-color: var(--primary, #3b82f6);
		color: var(--primary, #3b82f6);
	}
	.variant-info .alert-title { color: var(--primary, #3b82f6); }
	.variant-info .alert-message { color: var(--ssk-colors-text-700, #374151); }

	/* Success */
	.variant-success {
		background: var(--success-muted);
		border-left-color: var(--success-border);
		color: var(--success);
	}
	.variant-success .alert-title { color: var(--success); }
	.variant-success .alert-message { color: var(--foreground); }

	/* Warning */
	.variant-warning {
		background: var(--warning-muted);
		border-left-color: var(--warning-border);
		color: var(--warning);
	}
	.variant-warning .alert-title { color: var(--warning); }
	.variant-warning .alert-message { color: var(--foreground); }

	/* Error */
	.variant-error {
		background: var(--danger-muted);
		border-left-color: var(--danger-border);
		color: var(--danger);
	}
	.variant-error .alert-title { color: var(--danger); }
	.variant-error .alert-message { color: var(--foreground); }

	.alert-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		margin-top: 1px;
	}

	.alert-icon-default {
		font-size: var(--text-label, 18px);
		line-height: 1;
	}

	.alert-body {
		flex: 1;
		min-width: 0;
	}

	.alert-title {
		font-size: var(--text-label, 18px);
		font-weight: 600;
		line-height: 1.4;
		margin-bottom: var(--dss-space-4, 4px);
	}

	.alert-message {
		font-size: var(--text-label, 18px);
		line-height: 1.5;
	}

	.alert-close {
		flex-shrink: 0;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--dss-space-4, 4px);
		color: inherit;
		opacity: 0.5;
		border-radius: var(--radius-sm, 4px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.15s;
	}

	.alert-close:hover {
		opacity: 1;
	}

	@keyframes dss-alert-in {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
