<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Table from './Table.svelte';
	import Pagination from './Pagination.svelte';

	type Column = {
		key: string;
		header: string;
		width?: string;
		align?: 'left' | 'center' | 'right';
		render?: (value: any, row: Record<string, any>) => string;
		sortable?: boolean;
	};

	type PaginationConfig = {
		page: number;
		pageSize: number;
		totalCount: number;
	};

	type BulkAction = {
		label: string;
		variant?: string;
		onClick: (selectedRows: Record<string, any>[]) => void;
	};

	export let columns: Column[] = [];
	export let data: Record<string, any>[] = [];
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let striped: boolean = false;
	export let hoverable: boolean = true;
	export let bordered: boolean = false;
	export let selectable: boolean = false;
	export let loading: boolean = false;
	export let emptyMessage: string = 'No data';
	export let stickyHeader: boolean = false;
	export let pagination: PaginationConfig | undefined = undefined;
	export let sortBy: string | undefined = undefined;
	export let sortOrder: 'asc' | 'desc' | undefined = undefined;
	export let bulkActions: BulkAction[] = [];
	export let expandedRowRender: boolean = false;
	export let showColumnToggle: boolean = false;
	export let error: string | undefined = undefined;
	export let emptyDescription: string | undefined = undefined;
	export let loadingRows: number = 5;

	const dispatch = createEventDispatcher<{
		pageChange: { page: number };
		sortChange: { sortBy: string; sortOrder: 'asc' | 'desc' };
		selectionChange: { selectedRows: Record<string, any>[] };
		rowClick: { row: Record<string, any>; index: number };
	}>();

	let selectedRows: Record<string, any>[] = [];
	let expandedIndex: number | null = null;
	let hiddenColumns: Set<string> = new Set();
	let showColumnMenu = false;

	$: visibleColumns = columns.filter((c) => !hiddenColumns.has(c.key));
	$: totalPages = pagination ? Math.ceil(pagination.totalCount / pagination.pageSize) : 1;
	$: hasSelection = selectedRows.length > 0;

	function handleSort(col: Column) {
		if (!col.sortable) return;
		const newOrder = sortBy === col.key && sortOrder === 'asc' ? 'desc' : 'asc';
		dispatch('sortChange', { sortBy: col.key, sortOrder: newOrder });
	}

	function handleSelectionChange(e: CustomEvent<{ selectedRows: Record<string, any>[] }>) {
		selectedRows = e.detail.selectedRows;
		dispatch('selectionChange', e.detail);
	}

	function handleRowClick(e: CustomEvent<{ row: Record<string, any>; index: number }>) {
		if (expandedRowRender) {
			expandedIndex = expandedIndex === e.detail.index ? null : e.detail.index;
		}
		dispatch('rowClick', e.detail);
	}

	function handlePageChange(e: CustomEvent<{ page: number }>) {
		dispatch('pageChange', e.detail);
	}

	function toggleColumn(key: string) {
		if (hiddenColumns.has(key)) {
			hiddenColumns.delete(key);
		} else {
			hiddenColumns.add(key);
		}
		hiddenColumns = new Set(hiddenColumns);
	}
</script>

<div class="dss-advanced-table" class:bordered>
	<!-- Toolbar -->
	{#if showColumnToggle || (hasSelection && bulkActions.length > 0)}
		<div class="table-toolbar">
			{#if hasSelection && bulkActions.length > 0}
				<div class="bulk-bar">
					<span class="bulk-count">{selectedRows.length} selected</span>
					{#each bulkActions as action}
						<button
							class="bulk-btn variant-{action.variant || 'default'}"
							on:click={() => action.onClick(selectedRows)}
						>
							{action.label}
						</button>
					{/each}
				</div>
			{/if}

			{#if showColumnToggle}
				<div class="column-toggle">
					<button
						class="toggle-btn"
						on:click={() => (showColumnMenu = !showColumnMenu)}
						aria-label="Toggle columns"
					>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</button>
					{#if showColumnMenu}
						<div class="column-menu">
							{#each columns as col}
								<label class="column-option">
									<input
										type="checkbox"
										checked={!hiddenColumns.has(col.key)}
										on:change={() => toggleColumn(col.key)}
									/>
									{col.header}
								</label>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Error state -->
	{#if error}
		<div class="table-error">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/>
				<path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
			<span>{error}</span>
		</div>
	{:else}
		<!-- Table with sortable headers -->
		<div class="dss-table-wrapper" class:sticky-header={stickyHeader}>
			<table class="dss-table size-{size}">
				<thead>
					<tr>
						{#if selectable}
							<th class="checkbox-col">
								<input
									type="checkbox"
									checked={data.length > 0 && selectedRows.length === data.length}
									on:change
									aria-label="Select all"
								/>
							</th>
						{/if}
						{#each visibleColumns as col}
							<th
								style={col.width ? `width: ${col.width}` : ''}
								class="align-{col.align || 'left'}"
								class:sortable={col.sortable}
								on:click={() => handleSort(col)}
							>
								<span class="th-content">
									{col.header}
									{#if col.sortable}
										<span class="sort-icon" class:active={sortBy === col.key}>
											{#if sortBy === col.key && sortOrder === 'asc'}
												<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
													<path d="M7 3v8M4 6l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
											{:else if sortBy === col.key && sortOrder === 'desc'}
												<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
													<path d="M7 11V3M4 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
											{:else}
												<svg width="14" height="14" viewBox="0 0 14 14" fill="none" opacity="0.3">
													<path d="M4 5.5l3-3 3 3M4 8.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
											{/if}
										</span>
									{/if}
								</span>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#if loading}
						{#each Array(loadingRows) as _, i}
							<tr class="skeleton-row">
								{#if selectable}
									<td class="checkbox-col">
										<span class="skeleton-bone" style="width: 16px; height: 16px;" />
									</td>
								{/if}
								{#each visibleColumns as col}
									<td>
										<span class="skeleton-bone" style="width: {60 + (i * 11) % 30}%;" />
									</td>
								{/each}
							</tr>
						{/each}
					{:else if data.length === 0}
						<tr>
							<td class="empty-cell" colspan={visibleColumns.length + (selectable ? 1 : 0)}>
								<div class="empty-content">
									<span class="empty-title">{emptyMessage}</span>
									{#if emptyDescription}
										<span class="empty-desc">{emptyDescription}</span>
									{/if}
								</div>
							</td>
						</tr>
					{:else}
						{#each data as row, index}
							<tr
								class:striped={striped && index % 2 === 1}
								class:hoverable
								class:selected={selectedRows.includes(row)}
								on:click={() => handleRowClick(new CustomEvent('rowClick', { detail: { row, index } }))}
							>
								{#if selectable}
									<td class="checkbox-col" on:click|stopPropagation>
										<input
											type="checkbox"
											checked={selectedRows.includes(row)}
											on:change
											aria-label="Select row {index + 1}"
										/>
									</td>
								{/if}
								{#each visibleColumns as col}
									<td class="align-{col.align || 'left'}">
										{#if col.render}
											{@html col.render(row[col.key], row)}
										{:else}
											{row[col.key] ?? ''}
										{/if}
									</td>
								{/each}
							</tr>
							{#if expandedRowRender && expandedIndex === index}
								<tr class="expanded-row">
									<td colspan={visibleColumns.length + (selectable ? 1 : 0)}>
										<slot name="expandedRow" {row} {index} />
									</td>
								</tr>
							{/if}
						{/each}
					{/if}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		{#if pagination}
			<div class="table-footer">
				<Pagination
					currentPage={pagination.page}
					{totalPages}
					totalItems={pagination.totalCount}
					pageSize={pagination.pageSize}
					{size}
					showItemsInfo
					showPageSize
					on:pageChange={handlePageChange}
					on:pageSizeChange
				/>
			</div>
		{/if}
	{/if}
</div>

<style>
	.dss-advanced-table {
		width: 100%;
		background: white;
		border-radius: var(--radius-md, 8px);
		overflow: hidden;
		font-family: var(--font-label);
	}
	.dss-advanced-table.bordered {
		border: 1px solid var(--border, #e5e7eb);
	}

	/* Toolbar */
	.table-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--dss-space-4, 16px);
		border-bottom: 1px solid var(--muted, #f3f4f6);
	}

	/* Bulk actions */
	.bulk-bar {
		display: flex;
		align-items: center;
		gap: var(--dss-space-4, 16px);
	}
	.bulk-count {
		font-size: var(--text-sm, 13px);
		color: var(--muted-foreground, #6b7280);
		font-weight: 500;
	}
	.bulk-btn {
		padding: var(--dss-space-2, 8px) var(--dss-space-4, 16px);
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-sm, 6px);
		background: white;
		font-size: var(--text-sm, 13px);
		color: var(--ssk-colors-text-700, #374151);
		cursor: pointer;
		font-family: var(--font-label);
		transition: background 0.15s;
	}
	.bulk-btn:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}
	.bulk-btn.variant-destructive {
		color: var(--danger);
		border-color: var(--danger-border);
	}
	.bulk-btn.variant-primary {
		background: var(--primary, #32a9ff);
		color: white;
		border-color: var(--primary, #32a9ff);
	}

	/* Column toggle */
	.column-toggle {
		position: relative;
		margin-left: auto;
	}
	.toggle-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-sm, 6px);
		background: white;
		cursor: pointer;
		color: var(--muted-foreground, #6b7280);
		transition: background 0.15s;
	}
	.toggle-btn:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}
	.column-menu {
		position: absolute;
		right: 0;
		top: 100%;
		margin-top: var(--dss-space-2, 8px);
		background: white;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		box-shadow: var(--dss-shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
		padding: var(--dss-space-2, 8px);
		z-index: 10;
		min-width: 160px;
	}
	.column-option {
		display: flex;
		align-items: center;
		gap: var(--dss-space-2, 8px);
		padding: var(--dss-space-2, 8px);
		font-size: var(--text-sm, 13px);
		color: var(--ssk-colors-text-700, #374151);
		cursor: pointer;
		border-radius: var(--radius-xs, 4px);
	}
	.column-option:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	/* Table wrapper */
	.dss-table-wrapper {
		overflow-x: auto;
	}
	.dss-table {
		width: 100%;
		border-collapse: collapse;
	}

	/* Header */
	thead th {
		background: var(--ssk-colors-neutral-50, #f9fafb);
		color: var(--muted-foreground, #6b7280);
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		border-bottom: 1px solid var(--border, #e5e7eb);
	}
	th.sortable {
		cursor: pointer;
		user-select: none;
	}
	th.sortable:hover {
		background: var(--muted, #f3f4f6);
	}
	.sticky-header thead th {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.th-content {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-2, 8px);
	}
	.sort-icon {
		display: inline-flex;
		color: var(--ssk-colors-text-400, #9ca3af);
	}
	.sort-icon.active {
		color: var(--primary, #32a9ff);
	}

	/* Sizes */
	.size-sm th, .size-sm td {
		padding: var(--dss-space-2, 8px) var(--dss-space-4, 16px);
		font-size: var(--text-caption, 18px);
		height: 36px;
	}
	.size-md th, .size-md td {
		padding: var(--dss-space-4, 16px) var(--dss-space-4, 16px);
		font-size: var(--text-sm, 13px);
		height: 44px;
	}
	.size-lg th, .size-lg td {
		padding: var(--dss-space-6, 24px) var(--dss-space-4, 16px);
		font-size: var(--text-p, 14px);
		height: 52px;
	}

	/* Body */
	tbody td {
		color: var(--ssk-colors-text-700, #374151);
		border-bottom: 1px solid var(--muted, #f3f4f6);
	}
	.align-left { text-align: left; }
	.align-center { text-align: center; }
	.align-right { text-align: right; }

	tr.striped td { background: var(--ssk-colors-neutral-50, #f9fafb); }
	tr.hoverable:hover td { background: var(--ssk-colors-primary-50, #eff6ff); cursor: pointer; }
	tr.selected td { background: var(--ssk-colors-primary-50, #eff6ff); }

	/* Checkbox column */
	.checkbox-col {
		width: 44px;
		text-align: center;
	}
	.checkbox-col input[type="checkbox"] {
		width: 16px;
		height: 16px;
		accent-color: var(--primary, #32a9ff);
		cursor: pointer;
	}

	/* Empty */
	.empty-cell { text-align: center; padding: var(--dss-space-24, 96px) var(--dss-space-4, 16px); }
	.empty-content { display: flex; flex-direction: column; align-items: center; gap: var(--dss-space-2, 8px); }
	.empty-title { color: var(--muted-foreground, #6b7280); font-size: var(--text-p, 14px); font-weight: 500; }
	.empty-desc { color: var(--ssk-colors-text-400, #9ca3af); font-size: var(--text-sm, 13px); }

	/* Expanded row */
	.expanded-row td {
		background: var(--ssk-colors-neutral-50, #f9fafb);
		padding: var(--dss-space-4, 16px);
	}

	/* Skeleton */
	.skeleton-row td { padding: var(--dss-space-4, 16px); }
	.skeleton-bone {
		display: inline-block;
		height: 14px;
		border-radius: var(--radius-xs, 4px);
		background: var(--border, #e5e7eb);
		animation: dss-adv-table-pulse 1.5s ease-in-out infinite;
	}

	@keyframes dss-adv-table-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	/* Error */
	.table-error {
		display: flex;
		align-items: center;
		gap: var(--dss-space-4, 16px);
		padding: var(--dss-space-4, 16px);
		color: var(--danger);
		font-size: var(--text-sm, 13px);
		background: var(--danger-muted);
		border-bottom: 1px solid var(--danger-border);
	}

	/* Footer / Pagination */
	.table-footer {
		display: flex;
		justify-content: flex-end;
		padding: var(--dss-space-4, 16px);
		border-top: 1px solid var(--border, #e5e7eb);
	}
</style>
