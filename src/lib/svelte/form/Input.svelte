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
	export let clearable: boolean = false;
	export let loading: boolean = false;
	export let fullWidth: boolean = false;
	export let type: string = 'text';
	export let prefix: string = '';
	export let suffix: string = '';

	const dispatch = createEventDispatcher<{
		input: Event;
		change: Event;
		focus: FocusEvent;
		blur: FocusEvent;
		clear: void;
	}>();

	let inputEl: HTMLInputElement;

	$: computedState = errorMessage ? 'error' : successMessage ? 'success' : state;
	$: message = errorMessage || successMessage || helperText;

	function handleInput(e: Event) {
		value = (e.target as HTMLInputElement).value;
		dispatch('input', e);
	}

	function handleClear() {
		value = '';
		dispatch('clear');
		inputEl?.focus();
	}
</script>

<div class="dss-input-wrapper" class:full-width={fullWidth}>
	{#if label}
		<label class="dss-input-label">
			{label}
			{#if required}
				<span class="required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<div
		class="dss-input size-{inputSize} variant-{variant} state-{computedState}"
		class:disabled
		class:has-prefix={prefix || $$slots.leftIcon}
		class:has-suffix={suffix || $$slots.rightIcon || clearable || loading}
	>
		{#if $$slots.leftIcon}
			<span class="input-icon left" aria-hidden="true">
				<slot name="leftIcon" />
			</span>
		{/if}

		{#if prefix}
			<span class="input-affix prefix" aria-hidden="true">{prefix}</span>
		{/if}

		<input
			bind:this={inputEl}
			value={value}
			{type}
			{placeholder}
			{disabled}
			{required}
			aria-invalid={computedState === 'error'}
			aria-describedby={message ? 'input-message' : undefined}
			on:input={handleInput}
			on:change={(e) => dispatch('change', e)}
			on:focus={(e) => dispatch('focus', e)}
			on:blur={(e) => dispatch('blur', e)}
		/>

		{#if suffix}
			<span class="input-affix suffix" aria-hidden="true">{suffix}</span>
		{/if}

		{#if loading}
			<span class="input-icon right" aria-hidden="true">
				<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3" />
					<path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
				</svg>
			</span>
		{:else if clearable && value && !disabled}
			<button
				class="input-clear"
				type="button"
				tabindex="-1"
				aria-label="Clear input"
				on:click={handleClear}
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{:else if $$slots.rightIcon}
			<span class="input-icon right" aria-hidden="true">
				<slot name="rightIcon" />
			</span>
		{/if}
	</div>

	{#if message}
		<p class="dss-input-message state-{computedState}" id="input-message">{message}</p>
	{/if}
</div>

<style>
	.dss-input-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--dss-space-1, 4px);
		font-family: var(--font-label);
	}
	.full-width { width: 100%; }

	/* Label */
	.dss-input-label {
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
	.dss-input {
		display: flex;
		align-items: center;
		border-radius: var(--radius-md, 8px);
		transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
		overflow: hidden;
	}

	/* Sizes */
	.size-sm { height: 32px; font-size: var(--text-input-sm); }
	.size-md { height: 36px; font-size: var(--text-input-md); }
	.size-lg { height: 40px; font-size: var(--text-input-lg); }

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
	.disabled input {
		cursor: not-allowed;
	}

	/* Input element */
	.dss-input input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		color: var(--foreground, #111827);
		font-size: inherit;
		font-family: inherit;
		padding: 0 var(--dss-space-4, 12px);
		height: 100%;
		width: 100%;
		min-width: 0;
	}
	.dss-input input::placeholder {
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.has-prefix input { padding-left: var(--dss-space-1, 4px); }
	.has-suffix input { padding-right: var(--dss-space-1, 4px); }

	/* Icons & affixes */
	.input-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--ssk-colors-text-400, #9ca3af);
		flex-shrink: 0;
	}
	.input-icon.left { padding-left: var(--dss-space-4, 12px); }
	.input-icon.right { padding-right: var(--dss-space-4, 12px); }

	.input-affix {
		display: flex;
		align-items: center;
		color: var(--muted-foreground, #6b7280);
		font-size: inherit;
		flex-shrink: 0;
		user-select: none;
	}
	.prefix { padding-left: var(--dss-space-4, 12px); }
	.suffix { padding-right: var(--dss-space-4, 12px); }

	/* Clear button */
	.input-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--ssk-colors-text-400, #9ca3af);
		padding: 0 var(--dss-space-4, 12px);
		height: 100%;
		flex-shrink: 0;
		transition: color 0.15s;
	}
	.input-clear:hover {
		color: var(--ssk-colors-text-700, #374151);
	}

	/* Spinner */
	.spinner {
		animation: dss-input-spin 0.8s linear infinite;
	}
	@keyframes dss-input-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* Message */
	.dss-input-message {
		margin: 0;
		font-size: var(--text-caption, 18px);
		line-height: 1.4;
		color: var(--muted-foreground, #6b7280);
	}
	.dss-input-message.state-error {
		color: var(--ssk-colors-danger-500, #ef4444);
	}
	.dss-input-message.state-success {
		color: var(--ssk-colors-success-500, #10b981);
	}
	.dss-input-message.state-warning {
		color: var(--ssk-colors-warning-500, #f59e0b);
	}
</style>
