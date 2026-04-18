<script lang="ts">
	export let name: string;
	export let label: string | undefined = undefined;
	export let required: boolean = false;
	export let error: string | undefined = undefined;
	export let successMessage: string | undefined = undefined;
	export let helperText: string | undefined = undefined;
	export let layout: 'vertical' | 'horizontal' = 'vertical';
	export let labelWidth: string = '160px';
</script>

<div
	class="dss-form-field layout-{layout}"
	style={layout === 'horizontal' ? `--label-width: ${labelWidth}` : undefined}
>
	{#if label}
		<label class="dss-form-field-label" for={name}>
			{label}
			{#if required}
				<span class="required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div class="dss-form-field-content">
		<slot />

		{#if error}
			<p class="dss-form-field-message state-error">{error}</p>
		{:else if successMessage}
			<p class="dss-form-field-message state-success">{successMessage}</p>
		{:else if helperText}
			<p class="dss-form-field-message state-helper">{helperText}</p>
		{/if}
	</div>
</div>

<style>
	.dss-form-field {
		display: flex;
		font-family: var(--font-label);
	}

	/* Vertical layout */
	.layout-vertical {
		flex-direction: column;
		gap: var(--dss-space-2, 6px);
	}

	/* Horizontal layout */
	.layout-horizontal {
		flex-direction: row;
		align-items: flex-start;
		gap: var(--dss-space-4, 12px);
	}
	.layout-horizontal > .dss-form-field-label {
		width: var(--label-width, 160px);
		flex-shrink: 0;
		padding-top: var(--dss-space-2, 6px);
	}
	.layout-horizontal > .dss-form-field-content {
		flex: 1;
		min-width: 0;
	}

	/* Label */
	.dss-form-field-label {
		font-size: var(--text-label, 12px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.required-mark {
		color: var(--ssk-colors-danger-500, #ef4444);
		margin-left: 2px;
	}

	/* Content */
	.dss-form-field-content {
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-2, 6px);
	}

	/* Messages */
	.dss-form-field-message {
		margin: 0;
		font-size: var(--text-caption, 18px);
		line-height: 1.4;
	}
	.state-error {
		color: var(--ssk-colors-danger-500, #ef4444);
	}
	.state-success {
		color: var(--ssk-colors-success-500, #10b981);
	}
	.state-helper {
		color: var(--muted-foreground, #6b7280);
	}
</style>
