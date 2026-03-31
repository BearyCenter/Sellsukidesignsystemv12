<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let color: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let closable: boolean = false;

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}
</script>

<span class="dss-tag color-{color} size-{size}">
	<slot name="icon" />
	<span class="dss-tag-label">
		<slot />
	</span>
	{#if closable}
		<button class="dss-tag-close" on:click={handleClose} aria-label="Remove">
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
				<path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
		</button>
	{/if}
</span>

<style>
	.dss-tag {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-4, 4px);
		border-radius: var(--radius-full, 9999px);
		font-weight: 500;
		white-space: nowrap;
		line-height: 1;
	}

	/* Sizes */
	.size-sm { padding: 2px 8px; font-size: var(--text-2xs); height: 20px; }
	.size-md { padding: 3px 10px; font-size: var(--text-xs); height: 24px; }
	.size-lg { padding: 4px 12px; font-size: var(--text-input-sm); height: 28px; }

	/* Colors */
	.color-default {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-text-700, #374151);
	}
	.color-primary {
		background: var(--ssk-colors-primary-50, #eff8ff);
		color: var(--ssk-colors-primary-700, #0b6bcb);
	}
	.color-success {
		background: #ecfdf5;
		color: #065f46;
	}
	.color-warning {
		background: #fffbeb;
		color: #92400e;
	}
	.color-danger {
		background: #fef2f2;
		color: #991b1b;
	}

	.dss-tag-label {
		display: inline-flex;
		align-items: center;
	}

	.dss-tag-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		color: inherit;
		opacity: 0.6;
		border-radius: var(--radius-full, 9999px);
		transition: opacity 0.15s;
		flex-shrink: 0;
	}
	.dss-tag-close:hover {
		opacity: 1;
	}
</style>
