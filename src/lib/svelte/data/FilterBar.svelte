<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let filters: {
		key: string;
		label: string;
		type: 'single' | 'multi';
		options: { label: string; value: string }[];
	}[] = [];
	export let searchPlaceholder: string = 'Search...';
	export let showSearch: boolean = true;
	export let value: { search?: string; filters: Record<string, string | string[]> } | undefined = undefined;

	const dispatch = createEventDispatcher();

	let search = value?.search ?? '';
	let filterValues: Record<string, string | string[]> = value?.filters ?? {};
	let openDropdown: string | null = null;

	function emitChange() {
		const result = { search, filters: filterValues };
		value = result;
		dispatch('filterChange', result);
	}

	function handleSearchInput() {
		emitChange();
	}

	function toggleDropdown(key: string) {
		openDropdown = openDropdown === key ? null : key;
	}

	function selectOption(filterKey: string, optionValue: string, type: 'single' | 'multi') {
		if (type === 'single') {
			if (filterValues[filterKey] === optionValue) {
				delete filterValues[filterKey];
				filterValues = { ...filterValues };
			} else {
				filterValues = { ...filterValues, [filterKey]: optionValue };
			}
			openDropdown = null;
		} else {
			const current = (filterValues[filterKey] as string[]) || [];
			const index = current.indexOf(optionValue);
			if (index >= 0) {
				const next = current.filter((v) => v !== optionValue);
				if (next.length === 0) {
					delete filterValues[filterKey];
					filterValues = { ...filterValues };
				} else {
					filterValues = { ...filterValues, [filterKey]: next };
				}
			} else {
				filterValues = { ...filterValues, [filterKey]: [...current, optionValue] };
			}
		}
		emitChange();
	}

	function isSelected(filterKey: string, optionValue: string, type: 'single' | 'multi'): boolean {
		if (type === 'single') return filterValues[filterKey] === optionValue;
		return ((filterValues[filterKey] as string[]) || []).includes(optionValue);
	}

	function getActiveCount(filterKey: string, type: 'single' | 'multi'): number {
		if (type === 'single') return filterValues[filterKey] ? 1 : 0;
		return ((filterValues[filterKey] as string[]) || []).length;
	}

	function clearFilter(filterKey: string) {
		delete filterValues[filterKey];
		filterValues = { ...filterValues };
		emitChange();
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.dss-filter-dropdown-wrapper')) {
			openDropdown = null;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dss-filter-bar">
	{#if showSearch}
		<div class="dss-filter-bar-search">
			<svg class="dss-filter-bar-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M7 12A5 5 0 107 2a5 5 0 000 10zM13 13l-3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
			<input
				type="text"
				class="dss-filter-bar-search-input"
				placeholder={searchPlaceholder}
				bind:value={search}
				on:input={handleSearchInput}
			/>
		</div>
	{/if}

	{#each filters as filter}
		{@const count = getActiveCount(filter.key, filter.type)}
		<div class="dss-filter-dropdown-wrapper">
			<button
				class="dss-filter-btn"
				class:active={count > 0}
				on:click|stopPropagation={() => toggleDropdown(filter.key)}
			>
				{filter.label}
				{#if count > 0}
					<span class="dss-filter-badge">{count}</span>
				{/if}
				<svg class="dss-filter-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
					<path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
			{#if openDropdown === filter.key}
				<div class="dss-filter-dropdown" on:click|stopPropagation>
					{#each filter.options as option}
						<button
							class="dss-filter-option"
							class:selected={isSelected(filter.key, option.value, filter.type)}
							on:click={() => selectOption(filter.key, option.value, filter.type)}
						>
							{#if filter.type === 'multi'}
								<span class="dss-filter-checkbox" class:checked={isSelected(filter.key, option.value, filter.type)}>
									{#if isSelected(filter.key, option.value, filter.type)}
										<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
											<path d="M2 5l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									{/if}
								</span>
							{/if}
							{option.label}
						</button>
					{/each}
					{#if count > 0}
						<div class="dss-filter-dropdown-footer">
							<button class="dss-filter-clear" on:click={() => clearFilter(filter.key)}>Clear</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.dss-filter-bar {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		flex-wrap: wrap;
	}

	.dss-filter-bar-search {
		position: relative;
		display: flex;
		align-items: center;
	}
	.dss-filter-bar-search-icon {
		position: absolute;
		left: 10px;
		color: var(--ssk-colors-text-400, #9ca3af);
		pointer-events: none;
	}
	.dss-filter-bar-search-input {
		height: 36px;
		padding: 0 12px 0 32px;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		font-size: var(--text-p, 14px);
		color: var(--foreground, #111827);
		outline: none;
		min-width: 200px;
		transition: border-color 0.15s;
	}
	.dss-filter-bar-search-input:focus {
		border-color: var(--primary, #32a9ff);
		box-shadow: 0 0 0 2px var(--ssk-colors-primary-50, #eff8ff);
	}
	.dss-filter-bar-search-input::placeholder {
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.dss-filter-dropdown-wrapper {
		position: relative;
	}

	.dss-filter-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-4, 4px);
		height: 36px;
		padding: 0 12px;
		background: white;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		font-size: var(--text-p, 14px);
		color: var(--ssk-colors-text-700, #374151);
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		white-space: nowrap;
	}
	.dss-filter-btn:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}
	.dss-filter-btn.active {
		border-color: var(--primary, #32a9ff);
		color: var(--ssk-colors-primary-700, #0b6bcb);
		background: var(--ssk-colors-primary-50, #eff8ff);
	}

	.dss-filter-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		background: var(--primary, #32a9ff);
		color: white;
		border-radius: var(--radius-full, 9999px);
		font-size: var(--text-2xs);
		font-weight: 600;
		line-height: 1;
	}

	.dss-filter-chevron {
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.dss-filter-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		min-width: 180px;
		background: white;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		z-index: 50;
		padding: var(--dss-space-4, 4px);
	}

	.dss-filter-option {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		width: 100%;
		padding: var(--dss-space-8, 8px) var(--dss-space-8, 8px);
		border: none;
		background: transparent;
		font-size: var(--text-p, 14px);
		color: var(--ssk-colors-text-700, #374151);
		cursor: pointer;
		border-radius: var(--radius-sm, 4px);
		text-align: left;
		transition: background 0.1s;
	}
	.dss-filter-option:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}
	.dss-filter-option.selected {
		color: var(--ssk-colors-primary-700, #0b6bcb);
		font-weight: 500;
	}

	.dss-filter-checkbox {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		border: 1.5px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: 3px;
		flex-shrink: 0;
		transition: background 0.1s, border-color 0.1s;
	}
	.dss-filter-checkbox.checked {
		background: var(--primary, #32a9ff);
		border-color: var(--primary, #32a9ff);
	}

	.dss-filter-dropdown-footer {
		border-top: 1px solid var(--muted, #f3f4f6);
		margin-top: var(--dss-space-4, 4px);
		padding-top: var(--dss-space-4, 4px);
	}
	.dss-filter-clear {
		width: 100%;
		padding: var(--dss-space-8, 8px);
		border: none;
		background: transparent;
		font-size: var(--text-sm, 13px);
		color: var(--ssk-colors-text-400, #9ca3af);
		cursor: pointer;
		text-align: center;
		border-radius: var(--radius-sm, 4px);
	}
	.dss-filter-clear:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
		color: var(--muted-foreground, #6b7280);
	}
</style>
