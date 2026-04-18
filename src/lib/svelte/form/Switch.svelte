<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let checked: boolean = false;
	export let label: string = '';
	export let description: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let color: string = 'primary';

	const dispatch = createEventDispatcher<{ change: { checked: boolean } }>();

	const trackWidthMap = { sm: 28, md: 36, lg: 44 };
	const trackHeightMap = { sm: 16, md: 20, lg: 24 };
	const thumbSizeMap = { sm: 12, md: 16, lg: 20 };

	$: trackWidth = trackWidthMap[size];
	$: trackHeight = trackHeightMap[size];
	$: thumbSize = thumbSizeMap[size];
	$: thumbOffset = trackWidth - thumbSize - 4; /* 2px padding each side */

	function handleToggle() {
		if (disabled) return;
		checked = !checked;
		dispatch('change', { checked });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			handleToggle();
		}
	}
</script>

<label
	class="dss-switch size-{size}"
	class:disabled
>
	<span
		class="switch-track"
		class:checked
		role="switch"
		aria-checked={checked}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		style="
			width: {trackWidth}px;
			height: {trackHeight}px;
			{checked ? `background: var(--ssk-colors-${color}-500, var(--primary, #32a9ff));` : ''}
		"
		on:click={handleToggle}
		on:keydown={handleKeydown}
	>
		<span
			class="switch-thumb"
			style="
				width: {thumbSize}px;
				height: {thumbSize}px;
				transform: translateX({checked ? thumbOffset : 0}px);
			"
		/>
	</span>

	{#if label || description}
		<span class="switch-content">
			{#if label}
				<span class="switch-label">{label}</span>
			{/if}
			{#if description}
				<span class="switch-description">{description}</span>
			{/if}
		</span>
	{/if}

	<input
		type="checkbox"
		bind:checked
		{disabled}
		class="sr-only"
		tabindex="-1"
		aria-hidden="true"
	/>
</label>

<style>
	.dss-switch {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--dss-space-2, 8px);
		cursor: pointer;
		font-family: var(--font-label);
		user-select: none;
	}
	.dss-switch.disabled {
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

	/* Track */
	.switch-track {
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		background: var(--ssk-colors-neutral-300, #d1d5db);
		padding: 2px;
		flex-shrink: 0;
		transition: background 0.2s;
		margin-top: 1px;
	}
	.switch-track:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.dss-switch:not(.disabled):hover .switch-track:not(.checked) {
		background: var(--ssk-colors-neutral-400, #9ca3af);
	}

	/* Thumb */
	.switch-thumb {
		border-radius: 50%;
		background: white;
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
	}

	/* Content */
	.switch-content {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.switch-label {
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.size-sm .switch-label { font-size: var(--text-input-sm); }
	.size-md .switch-label { font-size: var(--text-input-md); }
	.size-lg .switch-label { font-size: var(--text-input-lg); }

	.switch-description {
		font-size: var(--text-caption, 18px);
		color: var(--muted-foreground, #6b7280);
		line-height: 1.4;
	}
</style>
