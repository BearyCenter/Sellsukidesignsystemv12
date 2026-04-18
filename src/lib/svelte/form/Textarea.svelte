<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string = '';
	export let label: string = '';
	export let placeholder: string = '';
	export let helperText: string = '';
	export let errorMessage: string = '';
	export let successMessage: string = '';
	export let inputSize: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'outlined' | 'filled' | 'ghost' = 'default';
	export let state: 'default' | 'error' | 'success' | 'warning' = 'default';
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let fullWidth: boolean = false;
	export let showCharCount: boolean = false;
	export let maxLength: number | undefined = undefined;
	export let rows: number = 3;
	export let resize: 'none' | 'vertical' | 'both' = 'vertical';

	const dispatch = createEventDispatcher<{
		input: Event;
		change: Event;
		focus: FocusEvent;
		blur: FocusEvent;
	}>();

	$: computedState = errorMessage ? 'error' : successMessage ? 'success' : state;
	$: message = errorMessage || successMessage || helperText;
	$: charCount = value?.length ?? 0;
</script>

<div class="dss-textarea-wrapper" class:full-width={fullWidth}>
	{#if label}
		<label class="dss-textarea-label">
			{label}
			{#if required}
				<span class="required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div
		class="dss-textarea size-{inputSize} variant-{variant} state-{computedState}"
		class:disabled
	>
		<textarea
			bind:value
			{placeholder}
			{disabled}
			{required}
			{rows}
			maxlength={maxLength}
			style="resize: {resize};"
			aria-invalid={computedState === 'error'}
			aria-describedby={message ? 'textarea-message' : undefined}
			on:input={(e) => dispatch('input', e)}
			on:change={(e) => dispatch('change', e)}
			on:focus={(e) => dispatch('focus', e)}
			on:blur={(e) => dispatch('blur', e)}
		/>
	</div>

	<div class="dss-textarea-footer">
		{#if message}
			<p class="dss-textarea-message state-{computedState}" id="textarea-message">{message}</p>
		{:else}
			<span />
		{/if}

		{#if showCharCount}
			<span class="char-count" class:at-limit={maxLength != null && charCount >= maxLength}>
				{charCount}{#if maxLength != null}/{maxLength}{/if}
			</span>
		{/if}
	</div>
</div>

<style>
	.dss-textarea-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--dss-space-1, 4px);
		font-family: var(--font-label);
	}
	.full-width { width: 100%; }

	/* Label */
	.dss-textarea-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.required-mark {
		color: var(--ssk-colors-danger-500, #ef4444);
		margin-left: 2px;
	}

	/* Container */
	.dss-textarea {
		display: flex;
		border-radius: var(--radius-md, 8px);
		transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
		overflow: hidden;
	}

	/* Sizes */
	.size-sm textarea { font-size: var(--text-input-sm); padding: 6px var(--dss-space-4, 12px); }
	.size-md textarea { font-size: var(--text-input-md); padding: 8px var(--dss-space-4, 12px); }
	.size-lg textarea { font-size: var(--text-input-lg); padding: 10px var(--dss-space-4, 12px); }

	/* Variants */
	.variant-default {
		background: white;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-default:focus-within:not(.disabled) {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.variant-outlined {
		background: transparent;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-outlined:focus-within:not(.disabled) {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.variant-filled {
		background: var(--muted, #f3f4f6);
		border: 1px solid transparent;
	}
	.variant-filled:focus-within:not(.disabled) {
		background: white;
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.variant-ghost {
		background: transparent;
		border: 1px solid transparent;
	}
	.variant-ghost:focus-within:not(.disabled) {
		border-color: var(--primary, #32a9ff);
	}

	/* States */
	.state-error:not(.disabled) {
		border-color: var(--ssk-colors-danger-500, #ef4444);
	}
	.state-error:focus-within:not(.disabled) {
		border-color: var(--ssk-colors-danger-500, #ef4444);
		box-shadow: 0 0 0 2px var(--ssk-colors-danger-50, #fef2f2);
	}

	.state-success:not(.disabled) {
		border-color: var(--ssk-colors-success-500, #10b981);
	}
	.state-success:focus-within:not(.disabled) {
		border-color: var(--ssk-colors-success-500, #10b981);
		box-shadow: 0 0 0 2px var(--ssk-colors-success-50, #ecfdf5);
	}

	.state-warning:not(.disabled) {
		border-color: var(--ssk-colors-warning-500, #f59e0b);
	}
	.state-warning:focus-within:not(.disabled) {
		border-color: var(--ssk-colors-warning-500, #f59e0b);
		box-shadow: 0 0 0 2px var(--ssk-colors-warning-50, #fffbeb);
	}

	/* Disabled */
	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: var(--dss-bg-disabled, #f9fafb);
	}
	.disabled textarea {
		cursor: not-allowed;
	}

	/* Textarea element */
	.dss-textarea textarea {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		color: var(--foreground, #111827);
		font-family: inherit;
		line-height: 1.5;
		width: 100%;
		min-width: 0;
	}
	.dss-textarea textarea::placeholder {
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	/* Footer */
	.dss-textarea-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--dss-space-4, 12px);
	}

	.dss-textarea-message {
		margin: 0;
		font-size: var(--text-caption, 18px);
		line-height: 1.4;
		color: var(--muted-foreground, #6b7280);
	}
	.dss-textarea-message.state-error {
		color: var(--ssk-colors-danger-500, #ef4444);
	}
	.dss-textarea-message.state-success {
		color: var(--ssk-colors-success-500, #10b981);
	}
	.dss-textarea-message.state-warning {
		color: var(--ssk-colors-warning-500, #f59e0b);
	}

	.char-count {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
		flex-shrink: 0;
	}
	.char-count.at-limit {
		color: var(--ssk-colors-danger-500, #ef4444);
	}
</style>
