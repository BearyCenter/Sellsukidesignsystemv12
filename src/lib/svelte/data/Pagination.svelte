<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let siblingCount: number = 1;
	export let showFirstLast: boolean = true;
	export let showPrevNext: boolean = true;
	export let showPageSize: boolean = false;
	export let pageSizeOptions: number[] = [10, 20, 50];
	export let pageSize: number = 10;
	export let totalItems: number | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let variant: 'default' | 'outlined' | 'filled' | 'minimal' = 'default';
	export let disabled: boolean = false;
	export let showPageInfo: boolean = false;
	export let showItemsInfo: boolean = false;

	const dispatch = createEventDispatcher<{
		pageChange: { page: number };
		pageSizeChange: { pageSize: number };
	}>();

	function range(start: number, end: number): number[] {
		const result: number[] = [];
		for (let i = start; i <= end; i++) result.push(i);
		return result;
	}

	$: pages = (() => {
		const totalPageNumbers = siblingCount * 2 + 3;
		if (totalPages <= totalPageNumbers + 2) {
			return range(1, totalPages);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

		const showLeftEllipsis = leftSiblingIndex > 2;
		const showRightEllipsis = rightSiblingIndex < totalPages - 1;

		if (!showLeftEllipsis && showRightEllipsis) {
			const leftRange = range(1, 3 + 2 * siblingCount);
			return [...leftRange, -1, totalPages];
		}

		if (showLeftEllipsis && !showRightEllipsis) {
			const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
			return [1, -1, ...rightRange];
		}

		const middleRange = range(leftSiblingIndex, rightSiblingIndex);
		return [1, -1, ...middleRange, -2, totalPages];
	})();

	function goToPage(page: number) {
		if (disabled || page < 1 || page > totalPages || page === currentPage) return;
		dispatch('pageChange', { page });
	}

	function handlePageSizeChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const newSize = parseInt(target.value, 10);
		dispatch('pageSizeChange', { pageSize: newSize });
	}

	$: startItem = totalItems !== undefined ? (currentPage - 1) * pageSize + 1 : 0;
	$: endItem = totalItems !== undefined ? Math.min(currentPage * pageSize, totalItems) : 0;
</script>

<nav class="dss-pagination size-{size} variant-{variant}" class:disabled aria-label="Pagination">
	{#if showPageSize}
		<div class="page-size">
			<span class="page-size-label">Rows per page:</span>
			<select value={pageSize} on:change={handlePageSizeChange} {disabled}>
				{#each pageSizeOptions as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
		</div>
	{/if}

	{#if showItemsInfo && totalItems !== undefined}
		<span class="items-info">{startItem}-{endItem} of {totalItems}</span>
	{/if}

	<div class="page-buttons">
		{#if showFirstLast}
			<button
				class="page-btn"
				disabled={disabled || currentPage === 1}
				on:click={() => goToPage(1)}
				aria-label="First page"
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M11 12L7 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M7 12L3 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		{/if}

		{#if showPrevNext}
			<button
				class="page-btn"
				disabled={disabled || currentPage === 1}
				on:click={() => goToPage(currentPage - 1)}
				aria-label="Previous page"
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		{/if}

		{#each pages as page, i}
			{#if page < 0}
				<span class="ellipsis">...</span>
			{:else}
				<button
					class="page-btn"
					class:active={page === currentPage}
					disabled={disabled}
					on:click={() => goToPage(page)}
					aria-label="Page {page}"
					aria-current={page === currentPage ? 'page' : undefined}
				>
					{page}
				</button>
			{/if}
		{/each}

		{#if showPrevNext}
			<button
				class="page-btn"
				disabled={disabled || currentPage === totalPages}
				on:click={() => goToPage(currentPage + 1)}
				aria-label="Next page"
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		{/if}

		{#if showFirstLast}
			<button
				class="page-btn"
				disabled={disabled || currentPage === totalPages}
				on:click={() => goToPage(totalPages)}
				aria-label="Last page"
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M5 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		{/if}
	</div>

	{#if showPageInfo}
		<span class="page-info">Page {currentPage} of {totalPages}</span>
	{/if}
</nav>

<style>
	.dss-pagination {
		display: flex;
		align-items: center;
		gap: var(--dss-space-4, 16px);
		font-family: var(--font-label);
	}
	.dss-pagination.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.page-buttons {
		display: flex;
		align-items: center;
		gap: var(--dss-space-2, 8px);
	}

	/* Button base */
	.page-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: none;
		cursor: pointer;
		color: var(--muted-foreground, #6b7280);
		font-family: var(--font-label);
		font-weight: 500;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		border-radius: var(--radius-sm, 6px);
	}
	.page-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.page-btn:not(:disabled):hover {
		background: var(--muted, #f3f4f6);
		color: var(--ssk-colors-text-700, #374151);
	}

	/* Active */
	.page-btn.active {
		background: var(--primary, #32a9ff);
		color: white;
	}
	.page-btn.active:hover {
		background: var(--ssk-colors-primary-600, #1b8bf5);
		color: white;
	}

	/* Variant: outlined */
	.variant-outlined .page-btn {
		border: 1px solid var(--border, #e5e7eb);
	}
	.variant-outlined .page-btn.active {
		border-color: var(--primary, #32a9ff);
	}

	/* Variant: filled */
	.variant-filled .page-btn {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}
	.variant-filled .page-btn.active {
		background: var(--primary, #32a9ff);
	}

	/* Variant: minimal */
	.variant-minimal .page-btn.active {
		background: none;
		color: var(--primary, #32a9ff);
		font-weight: 700;
	}

	/* Sizes */
	.size-sm .page-btn {
		min-width: 28px;
		height: 28px;
		font-size: var(--text-caption, 18px);
	}
	.size-md .page-btn {
		min-width: 32px;
		height: 32px;
		font-size: var(--text-sm, 13px);
	}
	.size-lg .page-btn {
		min-width: 40px;
		height: 40px;
		font-size: var(--text-p, 14px);
	}

	.ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 28px;
		color: var(--ssk-colors-text-400, #9ca3af);
		font-size: var(--text-sm, 13px);
		user-select: none;
	}

	/* Page size selector */
	.page-size {
		display: flex;
		align-items: center;
		gap: var(--dss-space-2, 8px);
	}
	.page-size-label {
		font-size: var(--text-sm, 13px);
		color: var(--muted-foreground, #6b7280);
		white-space: nowrap;
	}
	.page-size select {
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-sm, 6px);
		padding: var(--dss-space-2, 8px) var(--dss-space-4, 16px);
		font-size: var(--text-sm, 13px);
		color: var(--ssk-colors-text-700, #374151);
		background: white;
		cursor: pointer;
		font-family: var(--font-label);
	}

	/* Info text */
	.items-info,
	.page-info {
		font-size: var(--text-sm, 13px);
		color: var(--muted-foreground, #6b7280);
		white-space: nowrap;
	}
</style>
