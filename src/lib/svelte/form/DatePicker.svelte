<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	export let value: Date | null = null;
	export let rangeValue: { start: Date | null; end: Date | null } = { start: null, end: null };
	export let mode: 'single' | 'range' = 'single';
	export let label: string = '';
	export let placeholder: string = '';
	export let helperText: string = '';
	export let errorMessage: string = '';
	export let successMessage: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'outlined' | 'filled' = 'default';
	export let state: 'default' | 'error' | 'success' = 'default';
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let clearable: boolean = true;
	export let showTime: boolean = false;
	export let minDate: Date | undefined = undefined;
	export let maxDate: Date | undefined = undefined;
	export let showToday: boolean = true;
	export let fullWidth: boolean = false;

	const dispatch = createEventDispatcher<{
		change: Date | null;
		rangeChange: { start: Date | null; end: Date | null };
	}>();

	let open = false;
	let wrapperEl: HTMLDivElement;
	let viewYear: number;
	let viewMonth: number;
	let hours = 0;
	let minutes = 0;
	let rangeSelecting: 'start' | 'end' = 'start';

	const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	$: computedState = errorMessage ? 'error' : successMessage ? 'success' : state;
	$: message = errorMessage || successMessage || helperText;
	$: today = new Date();
	$: {
		const ref = mode === 'single' && value ? value : today;
		if (viewYear === undefined) viewYear = ref.getFullYear();
		if (viewMonth === undefined) viewMonth = ref.getMonth();
	}

	$: daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
	$: firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
	$: calendarDays = buildCalendarDays(viewYear, viewMonth, daysInMonth, firstDayOfWeek);

	$: displayValue = formatDisplay(mode, value, rangeValue, showTime);

	function buildCalendarDays(_y: number, _m: number, dim: number, fdow: number): (number | null)[] {
		const days: (number | null)[] = [];
		for (let i = 0; i < fdow; i++) days.push(null);
		for (let d = 1; d <= dim; d++) days.push(d);
		return days;
	}

	function formatDisplay(_mode: string, _val: Date | null, _range: { start: Date | null; end: Date | null }, _showTime: boolean): string {
		if (_mode === 'single' && _val) {
			const s = formatDate(_val);
			return _showTime ? `${s} ${pad(_val.getHours())}:${pad(_val.getMinutes())}` : s;
		}
		if (_mode === 'range') {
			const s = _range.start ? formatDate(_range.start) : '';
			const e = _range.end ? formatDate(_range.end) : '';
			if (s && e) return `${s} - ${e}`;
			if (s) return `${s} - ...`;
			return '';
		}
		return '';
	}

	function formatDate(d: Date): string {
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
	}

	function pad(n: number): string {
		return n < 10 ? `0${n}` : `${n}`;
	}

	function isSameDay(a: Date, b: Date): boolean {
		return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
	}

	function isToday(day: number): boolean {
		return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;
	}

	function isSelected(day: number): boolean {
		if (mode === 'single' && value) {
			return value.getFullYear() === viewYear && value.getMonth() === viewMonth && value.getDate() === day;
		}
		if (mode === 'range') {
			const d = new Date(viewYear, viewMonth, day);
			if (rangeValue.start && isSameDay(d, rangeValue.start)) return true;
			if (rangeValue.end && isSameDay(d, rangeValue.end)) return true;
		}
		return false;
	}

	function isInRange(day: number): boolean {
		if (mode !== 'range' || !rangeValue.start || !rangeValue.end) return false;
		const d = new Date(viewYear, viewMonth, day);
		return d > rangeValue.start && d < rangeValue.end;
	}

	function isDayDisabled(day: number): boolean {
		const d = new Date(viewYear, viewMonth, day);
		if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
		if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
		return false;
	}

	function selectDay(day: number | null) {
		if (day === null || isDayDisabled(day)) return;
		if (mode === 'single') {
			const d = new Date(viewYear, viewMonth, day, hours, minutes);
			value = d;
			dispatch('change', d);
			if (!showTime) open = false;
		} else {
			if (rangeSelecting === 'start') {
				rangeValue = { start: new Date(viewYear, viewMonth, day), end: null };
				rangeSelecting = 'end';
			} else {
				const endDate = new Date(viewYear, viewMonth, day);
				if (rangeValue.start && endDate < rangeValue.start) {
					rangeValue = { start: endDate, end: rangeValue.start };
				} else {
					rangeValue = { ...rangeValue, end: endDate };
				}
				rangeSelecting = 'start';
				dispatch('rangeChange', rangeValue);
				open = false;
			}
		}
	}

	function prevMonth() {
		if (viewMonth === 0) { viewMonth = 11; viewYear--; }
		else viewMonth--;
	}

	function nextMonth() {
		if (viewMonth === 11) { viewMonth = 0; viewYear++; }
		else viewMonth++;
	}

	function goToday() {
		viewYear = today.getFullYear();
		viewMonth = today.getMonth();
	}

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		if (mode === 'single') {
			value = null;
			dispatch('change', null);
		} else {
			rangeValue = { start: null, end: null };
			rangeSelecting = 'start';
			dispatch('rangeChange', rangeValue);
		}
	}

	function handleTimeChange() {
		if (value) {
			value = new Date(value.getFullYear(), value.getMonth(), value.getDate(), hours, minutes);
			dispatch('change', value);
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (open && wrapperEl && !wrapperEl.contains(e.target as Node)) {
			open = false;
		}
	}

	onMount(() => {
		document.addEventListener('mousedown', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('mousedown', handleClickOutside);
	});
</script>

<div class="dss-datepicker-wrapper" class:full-width={fullWidth} bind:this={wrapperEl}>
	{#if label}
		<label class="dss-datepicker-label">
			{label}
			{#if required}
				<span class="required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
	{/if}

	<button
		type="button"
		class="dss-datepicker-input size-{size} variant-{variant} state-{computedState}"
		class:disabled
		class:open
		{disabled}
		on:click={() => { if (!disabled) open = !open; }}
	>
		<svg class="calendar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
		</svg>
		<span class="display-value" class:placeholder={!displayValue}>
			{displayValue || placeholder || (mode === 'range' ? 'Select date range' : 'Select date')}
		</span>
		{#if clearable && displayValue && !disabled}
			<button type="button" class="clear-btn" tabindex="-1" aria-label="Clear" on:click={handleClear}>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
					<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{/if}
	</button>

	{#if open}
		<div class="dss-datepicker-dropdown">
			<div class="calendar-header">
				<button type="button" class="nav-btn" on:click={prevMonth} aria-label="Previous month">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
				</button>
				<span class="month-year">{MONTHS[viewMonth]} {viewYear}</span>
				<button type="button" class="nav-btn" on:click={nextMonth} aria-label="Next month">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
				</button>
			</div>

			<div class="calendar-grid">
				{#each DAYS as dayName}
					<span class="day-name">{dayName}</span>
				{/each}
				{#each calendarDays as day}
					{#if day === null}
						<span class="day-cell empty"></span>
					{:else}
						<button
							type="button"
							class="day-cell"
							class:today={isToday(day)}
							class:selected={isSelected(day)}
							class:in-range={isInRange(day)}
							class:disabled={isDayDisabled(day)}
							disabled={isDayDisabled(day)}
							on:click={() => selectDay(day)}
						>
							{day}
						</button>
					{/if}
				{/each}
			</div>

			{#if showTime && mode === 'single'}
				<div class="time-row">
					<input type="number" class="time-input" min="0" max="23" bind:value={hours} on:change={handleTimeChange} />
					<span class="time-sep">:</span>
					<input type="number" class="time-input" min="0" max="59" bind:value={minutes} on:change={handleTimeChange} />
				</div>
			{/if}

			{#if showToday}
				<div class="calendar-footer">
					<button type="button" class="today-btn" on:click={goToday}>Today</button>
				</div>
			{/if}
		</div>
	{/if}

	{#if message}
		<p class="dss-datepicker-message state-{computedState}">{message}</p>
	{/if}
</div>

<style>
	.dss-datepicker-wrapper {
		display: inline-flex;
		flex-direction: column;
		gap: var(--dss-space-4, 4px);
		font-family: var(--font-label);
		position: relative;
	}
	.full-width { width: 100%; }

	.dss-datepicker-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.required-mark {
		color: var(--ssk-colors-danger-500, #ef4444);
		margin-left: 2px;
	}

	.dss-datepicker-input {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		border-radius: var(--radius-md, 8px);
		cursor: pointer;
		transition: border-color 0.15s, box-shadow 0.15s;
		padding: 0 var(--dss-space-12, 12px);
		width: 100%;
		text-align: left;
		font-family: inherit;
		background: none;
	}

	.size-sm { height: 32px; font-size: var(--text-input-sm); }
	.size-md { height: 36px; font-size: var(--text-input-md); }
	.size-lg { height: 40px; font-size: var(--text-input-lg); }

	.variant-default {
		background: white;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-default.open, .variant-default:focus {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}
	.variant-outlined {
		background: transparent;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
	}
	.variant-outlined.open, .variant-outlined:focus {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}
	.variant-filled {
		background: var(--muted, #f3f4f6);
		border: 1px solid transparent;
	}
	.variant-filled.open, .variant-filled:focus {
		background: white;
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-100, #dbeafe);
	}

	.state-error { border-color: var(--ssk-colors-danger-500, #ef4444) !important; }
	.state-error.open { box-shadow: 0 0 0 2px var(--ssk-colors-danger-50, #fef2f2) !important; }
	.state-success { border-color: var(--ssk-colors-success-500, #10b981) !important; }
	.state-success.open { box-shadow: 0 0 0 2px var(--ssk-colors-success-50, #ecfdf5) !important; }

	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.calendar-icon {
		flex-shrink: 0;
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.display-value {
		flex: 1;
		color: var(--foreground, #111827);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.display-value.placeholder {
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--ssk-colors-text-400, #9ca3af);
		padding: 2px;
		border-radius: var(--radius-sm, 4px);
		transition: color 0.15s;
	}
	.clear-btn:hover {
		color: var(--ssk-colors-text-700, #374151);
	}

	/* Dropdown */
	.dss-datepicker-dropdown {
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
		min-width: 280px;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--dss-space-8, 8px);
	}
	.month-year {
		font-size: var(--text-p, 14px);
		font-weight: 600;
		color: var(--foreground, #111827);
	}
	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--muted-foreground, #6b7280);
		padding: 4px;
		border-radius: var(--radius-sm, 4px);
		transition: background 0.15s, color 0.15s;
	}
	.nav-btn:hover {
		background: var(--muted, #f3f4f6);
		color: var(--foreground, #111827);
	}

	.calendar-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
		text-align: center;
	}
	.day-name {
		font-size: var(--text-2xs);
		font-weight: 600;
		color: var(--ssk-colors-text-400, #9ca3af);
		padding: 4px 0;
		text-transform: uppercase;
	}
	.day-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: var(--radius-md, 8px);
		font-size: var(--text-input-sm);
		color: var(--ssk-colors-text-700, #374151);
		background: none;
		border: none;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
		margin: 0 auto;
	}
	.day-cell.empty {
		cursor: default;
	}
	.day-cell:not(.empty):not(.disabled):hover {
		background: var(--muted, #f3f4f6);
	}
	.day-cell.today {
		font-weight: 700;
		color: var(--primary, #32a9ff);
	}
	.day-cell.selected {
		background: var(--primary, #32a9ff) !important;
		color: white !important;
		font-weight: 600;
	}
	.day-cell.in-range {
		background: var(--ssk-colors-primary-50, #eff6ff);
		color: var(--ssk-colors-primary-700, #1d4ed8);
		border-radius: 0;
	}
	.day-cell.disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	/* Time */
	.time-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		margin-top: var(--dss-space-8, 8px);
		padding-top: var(--dss-space-8, 8px);
		border-top: 1px solid var(--border, #e5e7eb);
	}
	.time-input {
		width: 48px;
		height: 32px;
		text-align: center;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-sm, 4px);
		font-size: var(--text-input-md);
		font-family: inherit;
		color: var(--foreground, #111827);
		outline: none;
	}
	.time-input:focus {
		border-color: var(--primary, #32a9ff);
	}
	.time-sep {
		font-weight: 600;
		color: var(--muted-foreground, #6b7280);
	}

	/* Footer */
	.calendar-footer {
		margin-top: var(--dss-space-8, 8px);
		padding-top: var(--dss-space-8, 8px);
		border-top: 1px solid var(--border, #e5e7eb);
		text-align: center;
	}
	.today-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--primary, #32a9ff);
		font-size: var(--text-sm, 13px);
		font-weight: 500;
		padding: 4px 12px;
		border-radius: var(--radius-sm, 4px);
		transition: background 0.15s;
	}
	.today-btn:hover {
		background: var(--ssk-colors-primary-50, #eff6ff);
	}

	/* Message */
	.dss-datepicker-message {
		margin: 0;
		font-size: var(--text-caption, 18px);
		line-height: 1.4;
		color: var(--muted-foreground, #6b7280);
	}
	.dss-datepicker-message.state-error { color: var(--ssk-colors-danger-500, #ef4444); }
	.dss-datepicker-message.state-success { color: var(--ssk-colors-success-500, #10b981); }
</style>
