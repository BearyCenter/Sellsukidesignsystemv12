<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let value: string = '';
	export let placeholder: string = 'Search...';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'outlined' | 'filled' = 'default';
	export let loading: boolean = false;
	export let clearable: boolean = true;
	export let disabled: boolean = false;
	export let autoFocus: boolean = false;
	export let debounce: number = 300;

	const dispatch = createEventDispatcher<{
		input: string;
		search: string;
		clear: void;
	}>();

	let inputEl: HTMLInputElement;
	let debounceTimer: ReturnType<typeof setTimeout>;

	onMount(() => {
		if (autoFocus && inputEl) {
			inputEl.focus();
		}
	});

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;

		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			dispatch('input', value);
			dispatch('search', value);
		}, debounce);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			clearTimeout(debounceTimer);
			dispatch('search', value);
		}
	}

	function handleClear() {
		value = '';
		clearTimeout(debounceTimer);
		dispatch('clear');
		dispatch('input', '');
		dispatch('search', '');
		inputEl?.focus();
	}
</script>

<div
	class="dss-search-field size-{size} variant-{variant}"
	class:disabled
>
	<span class="search-icon" aria-hidden="true">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
	</span>

	<input
		bind:this={inputEl}
		type="search"
		{value}
		{placeholder}
		{disabled}
		aria-label={placeholder}
		on:input={handleInput}
		on:keydown={handleKeydown}
	/>

	{#if loading}
		<span class="trailing-icon" aria-hidden="true">
			<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3" />
				<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
			</svg>
		</span>
	{:else if clearable && value && !disabled}
		<button
			class="clear-btn"
			type="button"
			tabindex="-1"
			aria-label="Clear search"
			on:click={handleClear}
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.dss-search-field {
		display: flex;
		align-items: center;
		border-radius: var(--radius-md, 8px);
		transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
		overflow: hidden;
		font-family: var(--font-label);
	}

	/* Sizes */
	.size-sm { height: 32px; font-size: var(--text-input-sm); }
	.size-md { height: 36px; font-size: var(--text-input-md); }
	.size-lg { height: 40px; font-size: var(--text-input-lg); }

	/* Variants */
	.variant-default {
		background: white;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-default:focus-within:not(.disabled) {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.variant-outlined {
		background: transparent;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-outlined:focus-within:not(.disabled) {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.variant-filled {
		background: var(--muted, #f3f4f6);
		border: 1px solid transparent;
	}
	.variant-filled:focus-within:not(.disabled) {
		background: white;
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	/* Disabled */
	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: var(--dss-bg-disabled, #f9fafb);
	}
	.disabled input {
		cursor: not-allowed;
	}

	/* Search icon */
	.search-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--ssk-colors-text-400, #9ca3af);
		flex-shrink: 0;
		padding-left: var(--dss-space-4, 12px);
	}

	/* Input */
	.dss-search-field input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		color: var(--foreground, #111827);
		font-size: inherit;
		font-family: inherit;
		padding: 0 var(--dss-space-4, 12px);
		padding-left: var(--dss-space-2, 6px);
		height: 100%;
		width: 100%;
		min-width: 0;
	}
	.dss-search-field input::placeholder {
		color: var(--ssk-colors-text-400, #9ca3af);
	}
	/* Hide native search clear button */
	.dss-search-field input[type='search']::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}

	/* Trailing icon */
	.trailing-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--ssk-colors-text-400, #9ca3af);
		flex-shrink: 0;
		padding-right: var(--dss-space-4, 12px);
	}

	/* Clear button */
	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--ssk-colors-text-400, #9ca3af);
		padding: 0 var(--dss-space-4, 12px);
		height: 100%;
		flex-shrink: 0;
		transition: color 0.15s;
	}
	.clear-btn:hover {
		color: var(--ssk-colors-text-700, #374151);
	}

	/* Spinner */
	.spinner {
		animation: dss-search-spin 0.8s linear infinite;
	}
	@keyframes dss-search-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
