<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let items: { label: string; href?: string; icon?: string }[] = [];
	export let separator: 'chevron' | 'slash' | 'dot' = 'chevron';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let maxItems: number | undefined = undefined;

	const dispatch = createEventDispatcher<{ navigate: { label: string; href?: string; icon?: string } }>();

	$: visibleItems = (() => {
		if (!maxItems || items.length <= maxItems) return items;
		const head = items.slice(0, 1);
		const tail = items.slice(-(maxItems - 2));
		return [...head, { label: '\u2026' }, ...tail];
	})();

	function handleClick(item: { label: string; href?: string; icon?: string }, index: number) {
		if (index < visibleItems.length - 1 && item.href) {
			dispatch('navigate', item);
		}
	}
</script>

<nav class="dss-breadcrumb size-{size}" aria-label="Breadcrumb">
	<ol class="breadcrumb-list">
		{#each visibleItems as item, i}
			<li class="breadcrumb-item">
				{#if i < visibleItems.length - 1 && item.label !== '\u2026'}
					<a
						href={item.href || '#'}
						class="breadcrumb-link"
						on:click|preventDefault={() => handleClick(item, i)}
					>
						{#if item.icon}
							<span class="breadcrumb-icon">{item.icon}</span>
						{/if}
						{item.label}
					</a>
				{:else if item.label === '\u2026'}
					<span class="breadcrumb-ellipsis">&hellip;</span>
				{:else}
					<span class="breadcrumb-current" aria-current="page">
						{#if item.icon}
							<span class="breadcrumb-icon">{item.icon}</span>
						{/if}
						{item.label}
					</span>
				{/if}
			</li>
			{#if i < visibleItems.length - 1}
				<li class="breadcrumb-separator" aria-hidden="true">
					{#if separator === 'chevron'}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{:else if separator === 'slash'}
						<span>/</span>
					{:else}
						<span>&middot;</span>
					{/if}
				</li>
			{/if}
		{/each}
	</ol>
</nav>

<style>
	.dss-breadcrumb {
		display: flex;
		align-items: center;
	}

	.breadcrumb-list {
		display: flex;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: var(--dss-space-4, 4px);
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
	}

	.breadcrumb-link {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-4, 4px);
		color: var(--muted-foreground, #6b7280);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.breadcrumb-link:hover {
		color: var(--primary, #32a9ff);
		text-decoration: underline;
	}

	.breadcrumb-current {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-4, 4px);
		color: var(--foreground, #111827);
		font-weight: 500;
	}

	.breadcrumb-ellipsis {
		color: var(--ssk-colors-text-400, #9ca3af);
		padding: 0 var(--dss-space-4, 4px);
	}

	.breadcrumb-separator {
		display: flex;
		align-items: center;
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	.breadcrumb-icon {
		display: inline-flex;
		align-items: center;
	}

	/* Sizes */
	.size-sm { font-size: var(--text-caption, 18px); }
	.size-md { font-size: var(--text-sm, 13px); }
	.size-lg { font-size: var(--text-p, 14px); }

	.size-sm .breadcrumb-separator svg { width: 12px; height: 12px; }
	.size-md .breadcrumb-separator svg { width: 16px; height: 16px; }
	.size-lg .breadcrumb-separator svg { width: 18px; height: 18px; }
</style>
