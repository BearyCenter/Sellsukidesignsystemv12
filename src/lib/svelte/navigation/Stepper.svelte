<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let steps: { label: string; description?: string }[] = [];
	export let current: number = 0;
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';

	const dispatch = createEventDispatcher();

	function handleStepClick(index: number) {
		dispatch('stepClick', index);
	}

	function handleKeydown(e: KeyboardEvent, index: number) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleStepClick(index);
		}
	}
</script>

<div class="dss-stepper orientation-{orientation}" role="list">
	{#each steps as step, i}
		<div class="dss-stepper-item" class:completed={i < current} class:active={i === current} class:upcoming={i > current} role="listitem">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="dss-stepper-indicator"
				on:click={() => handleStepClick(i)}
				on:keydown={(e) => handleKeydown(e, i)}
				tabindex="0"
				role="button"
				aria-label="Step {i + 1}: {step.label}"
			>
				<span class="dss-stepper-circle">
					{#if i < current}
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M3 7l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{:else}
						{i + 1}
					{/if}
				</span>
			</div>
			{#if i < steps.length - 1}
				<div class="dss-stepper-connector" class:filled={i < current} />
			{/if}
			<div class="dss-stepper-content">
				<span class="dss-stepper-label">{step.label}</span>
				{#if step.description}
					<span class="dss-stepper-description">{step.description}</span>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.dss-stepper {
		display: flex;
	}

	/* Horizontal */
	.orientation-horizontal {
		flex-direction: row;
		align-items: flex-start;
	}
	.orientation-horizontal .dss-stepper-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		position: relative;
	}
	.orientation-horizontal .dss-stepper-connector {
		position: absolute;
		top: 16px;
		left: calc(50% + 18px);
		right: calc(-50% + 18px);
		height: 2px;
		background: var(--border, #e5e7eb);
	}
	.orientation-horizontal .dss-stepper-connector.filled {
		background: var(--primary, #32a9ff);
	}
	.orientation-horizontal .dss-stepper-content {
		margin-top: var(--dss-space-8, 8px);
		text-align: center;
	}

	/* Vertical */
	.orientation-vertical {
		flex-direction: column;
	}
	.orientation-vertical .dss-stepper-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		position: relative;
		padding-bottom: var(--dss-space-24, 24px);
	}
	.orientation-vertical .dss-stepper-item:last-child {
		padding-bottom: 0;
	}
	.orientation-vertical .dss-stepper-connector {
		position: absolute;
		top: 36px;
		left: 15px;
		width: 2px;
		bottom: 0;
		background: var(--border, #e5e7eb);
	}
	.orientation-vertical .dss-stepper-connector.filled {
		background: var(--primary, #32a9ff);
	}
	.orientation-vertical .dss-stepper-content {
		margin-left: var(--dss-space-12, 12px);
		padding-top: 4px;
	}

	.dss-stepper-indicator {
		cursor: pointer;
		outline: none;
	}
	.dss-stepper-indicator:focus-visible .dss-stepper-circle {
		box-shadow: 0 0 0 3px var(--ssk-colors-primary-50, #eff8ff);
	}

	.dss-stepper-circle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full, 9999px);
		font-size: var(--text-sm, 13px);
		font-weight: 600;
		transition: background 0.2s, border-color 0.2s, color 0.2s;
		flex-shrink: 0;
	}

	/* States */
	.completed .dss-stepper-circle {
		background: var(--primary, #32a9ff);
		color: white;
		border: 2px solid var(--primary, #32a9ff);
	}
	.active .dss-stepper-circle {
		background: white;
		color: var(--primary, #32a9ff);
		border: 2px solid var(--primary, #32a9ff);
	}
	.upcoming .dss-stepper-circle {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-text-400, #9ca3af);
		border: 2px solid var(--border, #e5e7eb);
	}

	.dss-stepper-content {
		display: flex;
		flex-direction: column;
	}

	.dss-stepper-label {
		font-size: var(--text-sm, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
	}
	.active .dss-stepper-label {
		color: var(--ssk-colors-primary-700, #0b6bcb);
	}
	.upcoming .dss-stepper-label {
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.dss-stepper-description {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
		margin-top: 2px;
	}
</style>
