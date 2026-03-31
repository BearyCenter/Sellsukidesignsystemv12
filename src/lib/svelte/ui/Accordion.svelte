<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: 'single' | 'multiple' = 'single';
	export let items: { id: string; title: string; content: string; icon?: string }[] = [];
	export let defaultOpen: string | string[] | undefined = undefined;
	export let value: string | string[] | null = null;

	const dispatch = createEventDispatcher();

	let openItems: Set<string> = new Set();

	// Initialize from defaultOpen
	if (defaultOpen) {
		if (Array.isArray(defaultOpen)) {
			openItems = new Set(defaultOpen);
		} else {
			openItems = new Set([defaultOpen]);
		}
	}

	// Sync from value prop
	$: if (value !== null) {
		if (Array.isArray(value)) {
			openItems = new Set(value);
		} else {
			openItems = new Set([value]);
		}
	}

	function toggle(id: string) {
		if (type === 'single') {
			if (openItems.has(id)) {
				openItems = new Set();
			} else {
				openItems = new Set([id]);
			}
		} else {
			const next = new Set(openItems);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			openItems = next;
		}

		const emitValue = type === 'single'
			? (openItems.size > 0 ? [...openItems][0] : null)
			: [...openItems];
		dispatch('change', emitValue);
	}
</script>

<div class="dss-accordion">
	{#each items as item (item.id)}
		<div class="dss-accordion-item" class:open={openItems.has(item.id)}>
			<button
				class="dss-accordion-trigger"
				on:click={() => toggle(item.id)}
				aria-expanded={openItems.has(item.id)}
			>
				{#if item.icon}
					<span class="dss-accordion-icon">{item.icon}</span>
				{/if}
				<span class="dss-accordion-title">{item.title}</span>
				<svg
					class="dss-accordion-chevron"
					class:rotated={openItems.has(item.id)}
					width="16" height="16" viewBox="0 0 16 16" fill="none"
				>
					<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
			{#if openItems.has(item.id)}
				<div class="dss-accordion-content">
					{item.content}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.dss-accordion {
		width: 100%;
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-md, 8px);
		overflow: hidden;
	}

	.dss-accordion-item {
		border-bottom: 1px solid var(--border, #e5e7eb);
	}
	.dss-accordion-item:last-child {
		border-bottom: none;
	}

	.dss-accordion-trigger {
		display: flex;
		align-items: center;
		width: 100%;
		padding: var(--dss-space-12, 12px) var(--dss-space-16, 16px);
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: var(--text-p, 14px);
		font-weight: 500;
		color: var(--foreground, #111827);
		text-align: left;
		gap: var(--dss-space-8, 8px);
		transition: background 0.15s;
	}
	.dss-accordion-trigger:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	.dss-accordion-icon {
		flex-shrink: 0;
	}

	.dss-accordion-title {
		flex: 1;
	}

	.dss-accordion-chevron {
		flex-shrink: 0;
		color: var(--ssk-colors-text-400, #9ca3af);
		transition: transform 0.2s ease;
	}
	.dss-accordion-chevron.rotated {
		transform: rotate(180deg);
	}

	.dss-accordion-content {
		padding: 0 var(--dss-space-16, 16px) var(--dss-space-16, 16px);
		font-size: var(--text-p, 14px);
		color: var(--muted-foreground, #6b7280);
		line-height: 1.5;
	}
</style>
