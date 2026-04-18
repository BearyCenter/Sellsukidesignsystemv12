<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type Column = {
		key: string;
		header: string;
		width?: string;
		align?: 'left' | 'center' | 'right';
		render?: (value: any, row: Record<string, any>) => string;
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

	const dispatch = createEventDispatcher<{
		rowClick: { row: Record<string, any>; index: number };
		selectionChange: { selectedRows: Record<string, any>[] };
	}>();

	let selectedIndices: Set<number> = new Set();

	$: allSelected = data.length > 0 && selectedIndices.size === data.length;
	$: someSelected = selectedIndices.size > 0 && selectedIndices.size < data.length;

	function handleRowClick(row: Record<string, any>, index: number) {
		dispatch('rowClick', { row, index });
	}

	function toggleRow(index: number) {
		if (selectedIndices.has(index)) {
			selectedIndices.delete(index);
		} else {
			selectedIndices.add(index);
		}
		selectedIndices = new Set(selectedIndices);
		dispatch('selectionChange', {
			selectedRows: data.filter((_, i) => selectedIndices.has(i))
		});
	}

	function toggleAll() {
		if (allSelected) {
			selectedIndices = new Set();
		} else {
			selectedIndices = new Set(data.map((_, i) => i));
		}
		dispatch('selectionChange', {
			selectedRows: data.filter((_, i) => selectedIndices.has(i))
		});
	}

	const skeletonRows = Array(5).fill(null);
</script>

<div
	class="dss-table-wrapper"
	class:bordered
	class:sticky-header={stickyHeader}
>
	<table class="dss-table size-{size}">
		<thead>
			<tr>
				{#if selectable}
					<th class="checkbox-col">
						<input
							type="checkbox"
							checked={allSelected}
							indeterminate={someSelected}
							on:change={toggleAll}
							aria-label="Select all rows"
						/>
					</th>
				{/if}
				{#each columns as col}
					<th
						style={col.width ? `width: ${col.width}` : ''}
						class="align-{col.align || 'left'}"
					>
						{col.header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if loading}
				{#each skeletonRows as _, i}
					<tr class="skeleton-row">
						{#if selectable}
							<td class="checkbox-col">
								<span class="skeleton-bone" style="width: 16px; height: 16px;" />
							</td>
						{/if}
						{#each columns as col}
							<td>
								<span class="skeleton-bone" style="width: {60 + (i * 7) % 30}%;" />
							</td>
						{/each}
					</tr>
				{/each}
			{:else if data.length === 0}
				<tr>
					<td
						class="empty-cell"
						colspan={columns.length + (selectable ? 1 : 0)}
					>
						{emptyMessage}
					</td>
				</tr>
			{:else}
				{#each data as row, index}
					<tr
						class:striped={striped && index % 2 === 1}
						class:hoverable
						class:selected={selectedIndices.has(index)}
						on:click={() => handleRowClick(row, index)}
					>
						{#if selectable}
							<td class="checkbox-col" on:click|stopPropagation>
								<input
									type="checkbox"
									checked={selectedIndices.has(index)}
									on:change={() => toggleRow(index)}
									aria-label="Select row {index + 1}"
								/>
							</td>
						{/if}
						{#each columns as col}
							<td class="align-{col.align || 'left'}">
								{#if col.render}
									{@html col.render(row[col.key], row)}
								{:else}
									{row[col.key] ?? ''}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.dss-table-wrapper {
		width: 100%;
		overflow-x: auto;
		border-radius: var(--radius-md, 8px);
		background: white;
	}
	.dss-table-wrapper.bordered {
		border: 1px solid var(--border, #e5e7eb);
	}

	.dss-table {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--font-label);
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

	.sticky-header thead th {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	/* Size variants */
	.size-sm th,
	.size-sm td {
		padding: var(--dss-space-2, 8px) var(--dss-space-4, 16px);
		font-size: var(--text-caption, 18px);
		height: 36px;
	}
	.size-md th,
	.size-md td {
		padding: var(--dss-space-4, 16px) var(--dss-space-4, 16px);
		font-size: var(--text-sm, 13px);
		height: 44px;
	}
	.size-lg th,
	.size-lg td {
		padding: var(--dss-space-6, 24px) var(--dss-space-4, 16px);
		font-size: var(--text-p, 14px);
		height: 52px;
	}

	/* Body */
	tbody td {
		color: var(--ssk-colors-text-700, #374151);
		border-bottom: 1px solid var(--muted, #f3f4f6);
	}

	/* Alignment */
	.align-left { text-align: left; }
	.align-center { text-align: center; }
	.align-right { text-align: right; }

	/* Striped */
	tr.striped td {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	/* Hoverable */
	tr.hoverable:hover td {
		background: var(--ssk-colors-primary-50, #eff6ff);
		cursor: pointer;
	}

	/* Selected */
	tr.selected td {
		background: var(--ssk-colors-primary-50, #eff6ff);
	}

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
	.empty-cell {
		text-align: center;
		padding: var(--dss-space-24, 96px) var(--dss-space-4, 16px);
		color: var(--ssk-colors-text-400, #9ca3af);
		font-size: var(--text-p, 14px);
	}

	/* Skeleton */
	.skeleton-row td {
		padding: var(--dss-space-4, 16px);
	}
	.skeleton-bone {
		display: inline-block;
		height: 14px;
		border-radius: var(--radius-xs, 4px);
		background: var(--border, #e5e7eb);
		animation: dss-table-pulse 1.5s ease-in-out infinite;
	}

	@keyframes dss-table-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}
</style>
