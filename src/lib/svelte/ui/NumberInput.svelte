<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number | undefined = undefined;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number = 1;
	export let disabled: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let error: string | undefined = undefined;

	const dispatch = createEventDispatcher();

	function clamp(val: number): number {
		if (min !== undefined && val < min) return min;
		if (max !== undefined && val > max) return max;
		return val;
	}

	function update(newValue: number) {
		const clamped = clamp(newValue);
		value = clamped;
		dispatch('change', clamped);
	}

	function decrement() {
		if (disabled) return;
		update((value ?? 0) - step);
	}

	function increment() {
		if (disabled) return;
		update((value ?? 0) + step);
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const parsed = parseFloat(target.value);
		if (!isNaN(parsed)) {
			update(parsed);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			increment();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			decrement();
		}
	}
</script>

{#if label}
	<label class="dss-number-input-label">{label}</label>
{/if}
<div class="dss-number-input size-{size}" class:disabled class:has-error={!!error}>
	<button
		class="dss-number-btn decrement"
		on:click={decrement}
		{disabled}
		tabindex="-1"
		aria-label="Decrease"
	>
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
			<path d="M2.5 6h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
		</svg>
	</button>
	<input
		type="text"
		class="dss-number-field"
		value={value ?? ''}
		{placeholder}
		{disabled}
		on:input={handleInput}
		on:keydown={handleKeydown}
	/>
	<button
		class="dss-number-btn increment"
		on:click={increment}
		{disabled}
		tabindex="-1"
		aria-label="Increase"
	>
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
			<path d="M6 2.5v7M2.5 6h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
		</svg>
	</button>
</div>
{#if error}
	<span class="dss-number-input-error">{error}</span>
{/if}

<style>
	.dss-number-input-label {
		display: block;
		font-size: var(--text-sm, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		margin-bottom: var(--dss-space-4, 4px);
	}

	.dss-number-input {
		display: inline-flex;
		align-items: center;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		overflow: hidden;
		transition: border-color 0.15s;
	}
	.dss-number-input:focus-within {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-50, #eff8ff);
	}
	.dss-number-input.has-error {
		border-color: #ef4444;
	}
	.dss-number-input.has-error:focus-within {
		box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
	}
	.dss-number-input.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.dss-number-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: var(--ssk-colors-neutral-50, #f9fafb);
		color: var(--muted-foreground, #6b7280);
		cursor: pointer;
		flex-shrink: 0;
		transition: background 0.15s;
	}
	.dss-number-btn:hover:not(:disabled) {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-text-700, #374151);
	}
	.dss-number-btn:disabled {
		cursor: not-allowed;
	}

	.dss-number-field {
		border: none;
		outline: none;
		text-align: center;
		font-size: var(--text-p, 14px);
		color: var(--foreground, #111827);
		background: transparent;
		min-width: 0;
	}

	/* Sizes */
	.size-sm .dss-number-btn { width: 28px; height: 28px; }
	.size-sm .dss-number-field { height: 28px; width: 48px; font-size: var(--text-input-sm); }

	.size-md .dss-number-btn { width: 36px; height: 36px; }
	.size-md .dss-number-field { height: 36px; width: 60px; font-size: var(--text-input-md); }

	.size-lg .dss-number-btn { width: 44px; height: 44px; }
	.size-lg .dss-number-field { height: 44px; width: 72px; font-size: var(--text-input-lg); }

	.dss-number-input-error {
		display: block;
		font-size: var(--text-caption, 18px);
		color: #ef4444;
		margin-top: var(--dss-space-4, 4px);
	}
</style>
