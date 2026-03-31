<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number = 0;
	export let max: number = 5;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let readOnly: boolean = false;
	export let icon: 'star' | 'heart' | 'thumb' = 'star';
	export let showValue: boolean = false;
	export let label: string = '';

	const dispatch = createEventDispatcher<{
		change: number;
	}>();

	let hoverValue: number = 0;

	$: isInteractive = !disabled && !readOnly;
	$: displayValue = hoverValue || value;

	function handleClick(index: number) {
		if (!isInteractive) return;
		value = index;
		dispatch('change', index);
	}

	function handleMouseEnter(index: number) {
		if (!isInteractive) return;
		hoverValue = index;
	}

	function handleMouseLeave() {
		hoverValue = 0;
	}

	function handleKeydown(e: KeyboardEvent, index: number) {
		if (!isInteractive) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick(index);
		}
	}
</script>

<div class="dss-rating-wrapper" class:disabled>
	{#if label}
		<span class="dss-rating-label">{label}</span>
	{/if}

	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="dss-rating size-{size}"
		class:readonly={readOnly}
		on:mouseleave={handleMouseLeave}
		role={isInteractive ? 'radiogroup' : 'img'}
		aria-label="Rating: {value} out of {max}"
	>
		{#each Array(max) as _, i}
			{@const starIndex = i + 1}
			{@const filled = starIndex <= displayValue}
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<span
				class="dss-rating-icon"
				class:filled
				class:interactive={isInteractive}
				on:click={() => handleClick(starIndex)}
				on:mouseenter={() => handleMouseEnter(starIndex)}
				on:keydown={(e) => handleKeydown(e, starIndex)}
				tabindex={isInteractive ? 0 : -1}
				role="radio"
				aria-checked={starIndex <= value}
				aria-label="Rate {starIndex} of {max}"
			>
				{#if icon === 'star'}
					<svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
					</svg>
				{:else if icon === 'heart'}
					<svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
					</svg>
				{:else if icon === 'thumb'}
					<svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
					</svg>
				{/if}
			</span>
		{/each}

		{#if showValue}
			<span class="dss-rating-value">{value}</span>
		{/if}
	</div>
</div>

<style>
	.dss-rating-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--dss-space-4, 4px);
		font-family: var(--font-label);
	}
	.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.dss-rating-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
	}

	.dss-rating {
		display: inline-flex;
		align-items: center;
		gap: 2px;
	}

	.dss-rating-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--ssk-colors-neutral-300, #d1d5db);
		transition: transform 0.15s, color 0.15s;
		outline: none;
		cursor: default;
	}
	.dss-rating-icon.interactive {
		cursor: pointer;
	}
	.dss-rating-icon.interactive:hover {
		transform: scale(1.15);
	}
	.dss-rating-icon:focus-visible {
		outline: 2px solid var(--primary, #32a9ff);
		outline-offset: 2px;
		border-radius: 2px;
	}
	.dss-rating-icon.filled {
		color: var(--primary, #32a9ff);
	}

	.dss-rating-icon svg {
		display: block;
	}

	/* Sizes */
	.size-sm .dss-rating-icon svg { width: 16px; height: 16px; }
	.size-md .dss-rating-icon svg { width: 22px; height: 22px; }
	.size-lg .dss-rating-icon svg { width: 28px; height: 28px; }

	.dss-rating-value {
		font-size: var(--text-sm, 13px);
		font-weight: 600;
		color: var(--ssk-colors-text-700, #374151);
		margin-left: var(--dss-space-4, 4px);
	}
</style>
