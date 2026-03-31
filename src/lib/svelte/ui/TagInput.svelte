<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let tags: string[] = [];
	export let placeholder: string = 'Add tag...';
	export let disabled: boolean = false;
	export let maxTags: number | undefined = undefined;
	export let variant: 'default' | 'outlined' = 'default';

	const dispatch = createEventDispatcher();

	let inputValue = '';
	let inputEl: HTMLInputElement;

	function addTag(text: string) {
		const trimmed = text.trim();
		if (!trimmed) return;
		if (tags.includes(trimmed)) return;
		if (maxTags !== undefined && tags.length >= maxTags) return;
		tags = [...tags, trimmed];
		dispatch('change', tags);
	}

	function removeTag(index: number) {
		tags = tags.filter((_, i) => i !== index);
		dispatch('change', tags);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			const parts = inputValue.split(',');
			for (const part of parts) {
				addTag(part);
			}
			inputValue = '';
		} else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			removeTag(tags.length - 1);
		}
	}

	function handleInput() {
		if (inputValue.includes(',')) {
			const parts = inputValue.split(',');
			for (let i = 0; i < parts.length - 1; i++) {
				addTag(parts[i]);
			}
			inputValue = parts[parts.length - 1];
		}
	}

	function focusInput() {
		inputEl?.focus();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="dss-tag-input variant-{variant}"
	class:disabled
	on:click={focusInput}
>
	{#each tags as tag, i}
		<span class="dss-tag-input-tag">
			<span class="dss-tag-input-tag-label">{tag}</span>
			{#if !disabled}
				<button
					class="dss-tag-input-tag-close"
					on:click|stopPropagation={() => removeTag(i)}
					aria-label="Remove {tag}"
				>
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
						<path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				</button>
			{/if}
		</span>
	{/each}
	<input
		bind:this={inputEl}
		bind:value={inputValue}
		class="dss-tag-input-field"
		{placeholder}
		{disabled}
		on:keydown={handleKeydown}
		on:input={handleInput}
	/>
</div>

<style>
	.dss-tag-input {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--dss-space-4, 4px);
		padding: var(--dss-space-4, 4px) var(--dss-space-8, 8px);
		min-height: 38px;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		cursor: text;
		transition: border-color 0.15s;
	}
	.dss-tag-input:focus-within {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-50, #eff8ff);
	}
	.dss-tag-input.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	.variant-outlined {
		background: transparent;
	}
	.variant-default {
		background: white;
	}

	.dss-tag-input-tag {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		background: var(--ssk-colors-primary-50, #eff8ff);
		color: var(--ssk-colors-primary-700, #0b6bcb);
		border-radius: var(--radius-sm, 4px);
		padding: 2px 6px;
		font-size: var(--text-xs);
		font-weight: 500;
		line-height: 1;
		height: 24px;
	}

	.dss-tag-input-tag-label {
		white-space: nowrap;
	}

	.dss-tag-input-tag-close {
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
	}
	.dss-tag-input-tag-close:hover {
		opacity: 1;
	}

	.dss-tag-input-field {
		flex: 1;
		min-width: 60px;
		border: none;
		outline: none;
		font-size: var(--text-p, 14px);
		color: var(--foreground, #111827);
		background: transparent;
		padding: 4px 0;
	}
	.dss-tag-input-field::placeholder {
		color: var(--ssk-colors-text-400, #9ca3af);
	}
</style>
