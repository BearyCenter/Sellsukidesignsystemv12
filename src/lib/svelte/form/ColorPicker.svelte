<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	export let value: string = '#000000';
	export let label: string = '';
	export let presets: string[] = [
		'#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
		'#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
		'#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#ffffff'
	];
	export let showInput: boolean = true;
	export let showFormats: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const dispatch = createEventDispatcher<{
		change: string;
	}>();

	let open = false;
	let wrapperEl: HTMLDivElement;
	let inputValue: string = value;

	$: inputValue = value;

	function selectColor(color: string) {
		value = color;
		inputValue = color;
		dispatch('change', color);
	}

	function handleInputChange() {
		const hex = inputValue.trim();
		if (/^#[0-9a-fA-F]{6}$/.test(hex) || /^#[0-9a-fA-F]{3}$/.test(hex)) {
			value = hex;
			dispatch('change', hex);
		}
	}

	function handleInputKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleInputChange();
	}

	function hexToRgb(hex: string): string {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!result) return '';
		return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
	}

	function handleClickOutside(e: MouseEvent) {
		if (open && wrapperEl && !wrapperEl.contains(e.target as Node)) {
			open = false;
		}
	}

	onMount(() => document.addEventListener('mousedown', handleClickOutside));
	onDestroy(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<div class="dss-colorpicker" bind:this={wrapperEl}>
	{#if label}
		<span class="dss-colorpicker-label">{label}</span>
	{/if}

	<button
		type="button"
		class="dss-colorpicker-trigger size-{size}"
		on:click={() => (open = !open)}
	>
		<span class="color-swatch" style="background: {value}"></span>
		{#if showInput}
			<span class="color-value">{value}</span>
		{/if}
		<svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</button>

	{#if open}
		<div class="dss-colorpicker-dropdown">
			{#if presets.length > 0}
				<div class="preset-grid">
					{#each presets as color}
						<button
							type="button"
							class="preset-swatch"
							class:selected={value === color}
							style="background: {color}"
							title={color}
							on:click={() => selectColor(color)}
						>
							{#if value === color}
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isLightColor(color) ? '#374151' : 'white'} stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="20 6 9 17 4 12" />
								</svg>
							{/if}
						</button>
					{/each}
				</div>
			{/if}

			{#if showInput}
				<div class="input-row">
					<span class="input-swatch" style="background: {value}"></span>
					<input
						type="text"
						class="hex-input"
						bind:value={inputValue}
						on:blur={handleInputChange}
						on:keydown={handleInputKeydown}
						placeholder="#000000"
						maxlength="7"
					/>
				</div>
			{/if}

			{#if showFormats}
				<div class="formats">
					<span class="format-label">HEX: {value}</span>
					<span class="format-label">RGB: {hexToRgb(value)}</span>
				</div>
			{/if}
		</div>
	{/if}
</div>

<script context="module" lang="ts">
	function isLightColor(hex: string): boolean {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!result) return false;
		const r = parseInt(result[1], 16);
		const g = parseInt(result[2], 16);
		const b = parseInt(result[3], 16);
		return (r * 299 + g * 587 + b * 114) / 1000 > 186;
	}
</script>

<style>
	.dss-colorpicker {
		display: inline-flex;
		flex-direction: column;
		gap: var(--dss-space-4, 4px);
		font-family: var(--font-label);
		position: relative;
	}

	.dss-colorpicker-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
	}

	.dss-colorpicker-trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		background: white;
		cursor: pointer;
		font-family: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;
		padding: 0 var(--dss-space-12, 12px);
	}
	.dss-colorpicker-trigger:focus {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
		outline: none;
	}

	.size-sm { height: 32px; font-size: var(--text-input-sm); }
	.size-md { height: 36px; font-size: var(--text-input-md); }
	.size-lg { height: 40px; font-size: var(--text-input-lg); }

	.color-swatch {
		width: 20px;
		height: 20px;
		border-radius: var(--radius-sm, 4px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
	}

	.color-value {
		color: var(--ssk-colors-text-700, #374151);
		font-family: monospace;
		font-size: inherit;
	}

	.chevron {
		color: var(--ssk-colors-text-400, #9ca3af);
		flex-shrink: 0;
	}

	/* Dropdown */
	.dss-colorpicker-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 4px;
		z-index: 50;
		background: white;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-lg, 12px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
		padding: var(--dss-space-12, 12px);
		min-width: 220px;
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-12, 12px);
	}

	.preset-grid {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 6px;
	}

	.preset-swatch {
		width: 24px;
		height: 24px;
		border-radius: var(--radius-sm, 4px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.1s, box-shadow 0.1s;
	}
	.preset-swatch:hover {
		transform: scale(1.15);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	}
	.preset-swatch.selected {
		box-shadow: 0 0 0 2px white, 0 0 0 4px var(--primary, #32a9ff);
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
	}
	.input-swatch {
		width: 28px;
		height: 28px;
		border-radius: var(--radius-sm, 4px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
	}
	.hex-input {
		flex: 1;
		height: 32px;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-sm, 4px);
		padding: 0 8px;
		font-size: var(--text-input-sm);
		font-family: monospace;
		color: var(--foreground, #111827);
		outline: none;
	}
	.hex-input:focus {
		border-color: var(--primary, #32a9ff);
	}

	.formats {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.format-label {
		font-size: var(--text-caption, 18px);
		color: var(--muted-foreground, #6b7280);
		font-family: monospace;
	}
</style>
