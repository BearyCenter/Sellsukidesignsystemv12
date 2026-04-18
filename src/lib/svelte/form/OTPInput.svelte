<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';

	export let length: number = 6;
	export let value: string = '';
	export let disabled: boolean = false;
	export let error: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let label: string = '';
	export let masked: boolean = false;

	const dispatch = createEventDispatcher<{
		change: string;
		complete: string;
	}>();

	let inputs: HTMLInputElement[] = [];
	let digits: string[] = [];

	$: {
		digits = Array.from({ length }, (_, i) => value[i] || '');
	}

	function focusInput(index: number) {
		tick().then(() => {
			if (inputs[index]) inputs[index].focus();
		});
	}

	function updateValue() {
		value = digits.join('');
		dispatch('change', value);
		if (value.length === length && !value.includes('')) {
			dispatch('complete', value);
		}
	}

	function handleInput(index: number, e: Event) {
		const input = e.target as HTMLInputElement;
		const char = input.value.replace(/\D/g, '').slice(-1);
		digits[index] = char;
		digits = [...digits];
		updateValue();
		if (char && index < length - 1) {
			focusInput(index + 1);
		}
	}

	function handleKeydown(index: number, e: KeyboardEvent) {
		if (e.key === 'Backspace') {
			e.preventDefault();
			if (digits[index]) {
				digits[index] = '';
				digits = [...digits];
				updateValue();
			} else if (index > 0) {
				digits[index - 1] = '';
				digits = [...digits];
				updateValue();
				focusInput(index - 1);
			}
		} else if (e.key === 'ArrowLeft' && index > 0) {
			focusInput(index - 1);
		} else if (e.key === 'ArrowRight' && index < length - 1) {
			focusInput(index + 1);
		}
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, length);
		for (let i = 0; i < length; i++) {
			digits[i] = pasted[i] || '';
		}
		digits = [...digits];
		updateValue();
		const nextEmpty = digits.findIndex((d) => !d);
		focusInput(nextEmpty >= 0 ? nextEmpty : length - 1);
	}

	function handleFocus(e: FocusEvent) {
		(e.target as HTMLInputElement).select();
	}
</script>

<div class="dss-otp" class:disabled>
	{#if label}
		<span class="dss-otp-label">{label}</span>
	{/if}

	<div class="dss-otp-inputs" on:paste={handlePaste}>
		{#each Array(length) as _, i}
			<input
				bind:this={inputs[i]}
				type={masked ? 'password' : 'text'}
				inputmode="numeric"
				maxlength="1"
				class="dss-otp-digit size-{size}"
				class:has-value={!!digits[i]}
				class:error={!!error}
				value={digits[i]}
				{disabled}
				autocomplete="one-time-code"
				on:input={(e) => handleInput(i, e)}
				on:keydown={(e) => handleKeydown(i, e)}
				on:focus={handleFocus}
			/>
		{/each}
	</div>

	{#if error}
		<p class="dss-otp-error">{error}</p>
	{/if}
</div>

<style>
	.dss-otp {
		display: inline-flex;
		flex-direction: column;
		gap: var(--dss-space-8, 8px);
		font-family: var(--font-label);
	}
	.disabled { opacity: 0.5; pointer-events: none; }

	.dss-otp-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
	}

	.dss-otp-inputs {
		display: flex;
		gap: var(--dss-space-8, 8px);
	}

	.dss-otp-digit {
		text-align: center;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		background: white;
		color: var(--foreground, #111827);
		font-weight: 600;
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		caret-color: var(--primary, #32a9ff);
	}

	.size-sm { width: 36px; height: 36px; font-size: var(--text-sm); }
	.size-md { width: 44px; height: 44px; font-size: var(--text-p); }
	.size-lg { width: 52px; height: 52px; font-size: var(--text-h4); }

	.dss-otp-digit:focus {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.dss-otp-digit.has-value {
		border-color: var(--ssk-colors-neutral-400, #9ca3af);
	}

	.dss-otp-digit.error {
		border-color: var(--ssk-colors-danger-500, #ef4444);
	}
	.dss-otp-digit.error:focus {
		border-color: var(--ssk-colors-danger-500, #ef4444);
		box-shadow: 0 0 0 2px var(--ssk-colors-danger-50, #fef2f2);
	}

	.dss-otp-error {
		margin: 0;
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-danger-500, #ef4444);
		line-height: 1.4;
	}
</style>
