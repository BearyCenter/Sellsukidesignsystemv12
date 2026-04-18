<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let label: string = '';
	export let description: string = '';
	export let disabled: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let name: string = '';
	export let checked: boolean = false;

	const dispatch = createEventDispatcher<{ change: { value: string } }>();

	const sizeMap = { sm: 16, md: 18, lg: 20 };
	$: circleSize = sizeMap[size];
	$: dotSize = Math.round(circleSize * 0.45);

	function handleChange() {
		if (disabled) return;
		checked = true;
		dispatch('change', { value });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			handleChange();
		}
	}
</script>

<label
	class="dss-radio size-{size}"
	class:disabled
>
	<span
		class="radio-circle"
		class:checked
		role="radio"
		aria-checked={checked}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		style="width: {circleSize}px; height: {circleSize}px;"
		on:click={handleChange}
		on:keydown={handleKeydown}
	>
		{#if checked}
			<span class="radio-dot" style="width: {dotSize}px; height: {dotSize}px;" />
		{/if}
	</span>

	{#if label || description}
		<span class="radio-content">
			{#if label}
				<span class="radio-label">{label}</span>
			{/if}
			{#if description}
				<span class="radio-description">{description}</span>
			{/if}
		</span>
	{/if}

	<input
		type="radio"
		{name}
		{value}
		checked={checked}
		{disabled}
		class="sr-only"
		tabindex="-1"
		aria-hidden="true"
	/>
</label>

<style>
	.dss-radio {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--dss-space-2, 8px);
		cursor: pointer;
		font-family: var(--font-label);
		user-select: none;
	}
	.dss-radio.disabled {
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

	/* Circle */
	.radio-circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: 50%;
		background: white;
		flex-shrink: 0;
		transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
		margin-top: 1px;
	}
	.radio-circle:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
		border-color: var(--primary, #32a9ff);
	}

	.dss-radio:not(.disabled):hover .radio-circle:not(.checked) {
		border-color: var(--ssk-colors-primary-400, #60bfff);
	}

	.radio-circle.checked {
		border-color: var(--primary, #32a9ff);
	}
	.dss-radio:not(.disabled):hover .radio-circle.checked {
		border-color: var(--ssk-colors-primary-600, #1b8bf5);
	}

	/* Dot */
	.radio-dot {
		border-radius: 50%;
		background: var(--primary, #32a9ff);
		transition: transform 0.15s;
	}
	.dss-radio:not(.disabled):hover .radio-dot {
		background: var(--ssk-colors-primary-600, #1b8bf5);
	}

	/* Content */
	.radio-content {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.radio-label {
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.size-sm .radio-label { font-size: var(--text-input-sm); }
	.size-md .radio-label { font-size: var(--text-input-md); }
	.size-lg .radio-label { font-size: var(--text-input-lg); }

	.radio-description {
		font-size: var(--text-caption, 18px);
		color: var(--muted-foreground, #6b7280);
		line-height: 1.4;
	}
</style>
