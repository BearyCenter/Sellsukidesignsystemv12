<script lang="ts">
	export let label: string = '';
	export let direction: 'horizontal' | 'vertical' = 'vertical';
</script>

<fieldset class="dss-checkbox-group" role="group" aria-label={label || undefined}>
	{#if label}
		<legend class="dss-checkbox-group-label">{label}</legend>
	{/if}

	<div class="dss-checkbox-group-items direction-{direction}">
		<slot />
	</div>
</fieldset>

<style>
	.dss-checkbox-group {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-2, 8px);
		font-family: var(--font-label);
	}

	.dss-checkbox-group-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		padding: 0;
		line-height: 1.4;
	}

	.dss-checkbox-group-items {
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
</style>
