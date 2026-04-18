<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let name: string;
	export let value: string = '';
	export let label: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let direction: 'horizontal' | 'vertical' = 'vertical';
	export let error: string = '';

	const dispatch = createEventDispatcher<{ change: string }>();

	const groupValue = writable(value);

	$: groupValue.set(value);

	setContext('radioGroup', {
		name,
		groupValue,
		disabled,
		size,
		select(val: string) {
			value = val;
			groupValue.set(val);
			dispatch('change', val);
		}
	});
</script>

<fieldset
	class="dss-radio-group"
	role="radiogroup"
	aria-label={label || undefined}
	aria-invalid={!!error || undefined}
>
	{#if label}
		<legend class="dss-radio-group-label">{label}</legend>
	{/if}

	<div class="dss-radio-group-items direction-{direction}">
		<slot />
	</div>

	{#if error}
		<p class="dss-radio-group-error">{error}</p>
	{/if}
</fieldset>

<style>
	.dss-radio-group {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-2, 8px);
		font-family: var(--font-label);
	}

	.dss-radio-group-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		padding: 0;
		line-height: 1.4;
	}

	.dss-radio-group-items {
		display: flex;
	}
	.direction-vertical {
		flex-direction: column;
		gap: var(--dss-space-4, 12px);
	}
	.direction-horizontal {
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--dss-space-6, 16px);
	}

	.dss-radio-group-error {
		margin: 0;
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-danger-500, #ef4444);
		line-height: 1.4;
	}
</style>
