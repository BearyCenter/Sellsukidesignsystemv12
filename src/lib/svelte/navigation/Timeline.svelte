<script lang="ts">
	export let items: {
		title: string;
		description?: string;
		time?: string;
		icon?: string;
		color?: string;
	}[] = [];
	export let variant: 'default' | 'compact' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="dss-timeline variant-{variant} size-{size}">
	{#each items as item, i}
		<div class="dss-timeline-item">
			<div class="dss-timeline-indicator">
				<span
					class="dss-timeline-dot"
					style={item.color ? `background: ${item.color}; border-color: ${item.color}` : ''}
				>
					{#if item.icon}
						<span class="dss-timeline-icon">{item.icon}</span>
					{/if}
				</span>
				{#if i < items.length - 1}
					<div class="dss-timeline-line" />
				{/if}
			</div>
			<div class="dss-timeline-content">
				<div class="dss-timeline-header">
					<span class="dss-timeline-title">{item.title}</span>
					{#if item.time}
						<span class="dss-timeline-time">{item.time}</span>
					{/if}
				</div>
				{#if item.description}
					<p class="dss-timeline-description">{item.description}</p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.dss-timeline {
		display: flex;
		flex-direction: column;
	}

	.dss-timeline-item {
		display: flex;
		position: relative;
	}

	.dss-timeline-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.dss-timeline-dot {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full, 9999px);
		background: var(--primary, #32a9ff);
		border: 2px solid var(--primary, #32a9ff);
		flex-shrink: 0;
	}

	.dss-timeline-icon {
		font-size: var(--text-3xs);
		line-height: 1;
		color: white;
	}

	.dss-timeline-line {
		width: 2px;
		flex: 1;
		background: var(--border, #e5e7eb);
		min-height: 20px;
	}

	.dss-timeline-content {
		flex: 1;
		min-width: 0;
	}

	.dss-timeline-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--dss-space-8, 8px);
	}

	.dss-timeline-title {
		font-weight: 500;
		color: var(--foreground, #111827);
	}

	.dss-timeline-time {
		color: var(--ssk-colors-text-400, #9ca3af);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.dss-timeline-description {
		color: var(--muted-foreground, #6b7280);
		margin: var(--dss-space-4, 4px) 0 0;
		line-height: 1.5;
	}

	/* Sizes */
	.size-sm .dss-timeline-dot { width: 10px; height: 10px; }
	.size-sm .dss-timeline-content { padding: 0 0 var(--dss-space-16, 16px) var(--dss-space-12, 12px); }
	.size-sm .dss-timeline-title { font-size: var(--text-sm, 13px); }
	.size-sm .dss-timeline-time { font-size: var(--text-caption, 18px); }
	.size-sm .dss-timeline-description { font-size: var(--text-caption, 18px); }

	.size-md .dss-timeline-dot { width: 12px; height: 12px; }
	.size-md .dss-timeline-content { padding: 0 0 var(--dss-space-24, 24px) var(--dss-space-16, 16px); }
	.size-md .dss-timeline-title { font-size: var(--text-p, 14px); }
	.size-md .dss-timeline-time { font-size: var(--text-sm, 13px); }
	.size-md .dss-timeline-description { font-size: var(--text-sm, 13px); }

	.size-lg .dss-timeline-dot { width: 16px; height: 16px; }
	.size-lg .dss-timeline-content { padding: 0 0 32px var(--dss-space-24, 24px); }
	.size-lg .dss-timeline-title { font-size: var(--text-input-lg); }
	.size-lg .dss-timeline-time { font-size: var(--text-p, 14px); }
	.size-lg .dss-timeline-description { font-size: var(--text-p, 14px); }

	/* Compact variant */
	.variant-compact .dss-timeline-content {
		padding-bottom: var(--dss-space-12, 12px);
	}
	.variant-compact .dss-timeline-description {
		display: none;
	}

	/* Last item no padding */
	.dss-timeline-item:last-child .dss-timeline-content {
		padding-bottom: 0;
	}
</style>
