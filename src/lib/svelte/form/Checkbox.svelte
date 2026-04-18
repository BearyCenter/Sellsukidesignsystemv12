<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let checked: boolean = false;
	export let indeterminate: boolean = false;
	export let label: string = '';
	export let description: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let error: string = '';

	const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();

	const sizeMap = { sm: 16, md: 18, lg: 20 };
	$: boxSize = sizeMap[size];

	function handleChange() {
		if (disabled) return;
		checked = !checked;
		indeterminate = false;
		dispatch('change', { checked });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			handleChange();
		}
	}
</script>

<label
	class="dss-checkbox size-{size}"
	class:disabled
	class:has-error={!!error}
>
	<span
		class="checkbox-box"
		class:checked
		class:indeterminate
		role="checkbox"
		aria-checked={indeterminate ? 'mixed' : checked}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		style="width: {boxSize}px; height: {boxSize}px;"
		on:click={handleChange}
		on:keydown={handleKeydown}
	>
		{#if checked}
			<svg viewBox="0 0 16 16" fill="none" width={boxSize - 4} height={boxSize - 4}>
				<path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		{:else if indeterminate}
			<svg viewBox="0 0 16 16" fill="none" width={boxSize - 4} height={boxSize - 4}>
				<path d="M4 8H12" stroke="white" stroke-width="2" stroke-linecap="round" />
			</svg>
		{/if}
	</span>

	{#if label || description}
		<span class="checkbox-content">
			{#if label}
				<span class="checkbox-label">{label}</span>
			{/if}
			{#if description}
				<span class="checkbox-description">{description}</span>
			{/if}
		</span>
	{/if}

	<input
		type="checkbox"
		bind:checked
		{disabled}
		{indeterminate}
		class="sr-only"
		tabindex="-1"
		aria-hidden="true"
	/>
</label>

{#if error}
	<p class="dss-checkbox-error">{error}</p>
{/if}

<style>
	.dss-checkbox {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--dss-space-2, 8px);
		cursor: pointer;
		font-family: var(--font-label);
		user-select: none;
	}
	.dss-checkbox.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* Box */
	.checkbox-box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-xs, 4px);
		background: white;
		flex-shrink: 0;
		transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
		margin-top: 1px;
	}
	.checkbox-box:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
		border-color: var(--primary, #32a9ff);
	}

	.dss-checkbox:not(.disabled):hover .checkbox-box:not(.checked):not(.indeterminate) {
		border-color: var(--ssk-colors-primary-400, #60bfff);
	}

	.checkbox-box.checked,
	.checkbox-box.indeterminate {
		background: var(--primary, #32a9ff);
		border-color: var(--primary, #32a9ff);
	}
	.dss-checkbox:not(.disabled):hover .checkbox-box.checked,
	.dss-checkbox:not(.disabled):hover .checkbox-box.indeterminate {
		background: var(--ssk-colors-primary-600, #1b8bf5);
		border-color: var(--ssk-colors-primary-600, #1b8bf5);
	}

	.has-error .checkbox-box {
		border-color: var(--ssk-colors-danger-500, #ef4444);
	}

	/* Content */
	.checkbox-content {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.checkbox-label {
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.size-sm .checkbox-label { font-size: var(--text-input-sm); }
	.size-md .checkbox-label { font-size: var(--text-input-md); }
	.size-lg .checkbox-label { font-size: var(--text-input-lg); }

	.checkbox-description {
		font-size: var(--text-caption, 18px);
		color: var(--muted-foreground, #6b7280);
		line-height: 1.4;
	}

	/* Error */
	.dss-checkbox-error {
		margin: var(--dss-space-1, 4px) 0 0;
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-danger-500, #ef4444);
		font-family: var(--font-label);
	}
</style>
