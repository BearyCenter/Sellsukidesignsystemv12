<script lang="ts">
	export let value: number = 0;
	export let max: number = 100;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let color: string | undefined = undefined;
	export let label: string | undefined = undefined;
	export let showValue: boolean = false;
	export let indeterminate: boolean = false;

	$: percentage = Math.min(100, Math.max(0, (value / max) * 100));

	$: fillColor = (() => {
		if (!color || color === 'primary') return 'var(--primary, #32a9ff)';
		if (color === 'success') return '#10b981';
		if (color === 'warning') return '#f59e0b';
		if (color === 'danger') return '#ef4444';
		return color;
	})();
</script>

<div class="dss-progress-bar size-{size}">
	{#if label || showValue}
		<div class="dss-progress-bar-header">
			{#if label}
				<span class="dss-progress-bar-label">{label}</span>
			{/if}
			{#if showValue && !indeterminate}
				<span class="dss-progress-bar-value">{Math.round(percentage)}%</span>
			{/if}
		</div>
	{/if}
	<div class="dss-progress-bar-track" role="progressbar" aria-valuenow={indeterminate ? undefined : value} aria-valuemin={0} aria-valuemax={max}>
		<div
			class="dss-progress-bar-fill"
			class:indeterminate
			style={indeterminate ? `background: ${fillColor}` : `width: ${percentage}%; background: ${fillColor}`}
		/>
	</div>
</div>

<style>
	.dss-progress-bar {
		width: 100%;
	}

	.dss-progress-bar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--dss-space-4, 4px);
	}

	.dss-progress-bar-label {
		font-size: var(--text-sm, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
	}

	.dss-progress-bar-value {
		font-size: var(--text-caption, 18px);
		color: var(--muted-foreground, #6b7280);
	}

	.dss-progress-bar-track {
		width: 100%;
		background: var(--muted, #f3f4f6);
		border-radius: var(--radius-full, 9999px);
		overflow: hidden;
	}

	.dss-progress-bar-fill {
		height: 100%;
		border-radius: var(--radius-full, 9999px);
		transition: width 0.3s ease;
	}

	.dss-progress-bar-fill.indeterminate {
		width: 40%;
		animation: dss-progress-slide 1.5s ease-in-out infinite;
	}

	/* Sizes */
	.size-sm .dss-progress-bar-track { height: 4px; }
	.size-sm .dss-progress-bar-fill { height: 4px; }

	.size-md .dss-progress-bar-track { height: 8px; }
	.size-md .dss-progress-bar-fill { height: 8px; }

	.size-lg .dss-progress-bar-track { height: 12px; }
	.size-lg .dss-progress-bar-fill { height: 12px; }

	@keyframes dss-progress-slide {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(350%); }
	}
</style>
