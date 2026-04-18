<script lang="ts">
	export let title: string;
	export let description: string | undefined = undefined;
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="dss-empty-state size-{size}">
	<div class="empty-icon">
		<slot name="icon">
			<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
				<rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
				<path d="M18 22h12M21 28h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</slot>
	</div>

	<h3 class="empty-title">{title}</h3>

	{#if description}
		<p class="empty-description">{description}</p>
	{/if}

	<div class="empty-action">
		<slot name="action" />
	</div>

	<div class="empty-secondary">
		<slot name="secondaryAction" />
	</div>
</div>

<style>
	.dss-empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		font-family: var(--font-label);
	}

	/* Sizes */
	.size-sm {
		padding: var(--dss-space-8, 32px) var(--dss-space-4, 16px);
		gap: var(--dss-space-2, 8px);
	}
	.size-md {
		padding: var(--dss-space-16, 64px) var(--dss-space-8, 32px);
		gap: var(--dss-space-4, 16px);
	}
	.size-lg {
		padding: var(--dss-space-24, 96px) var(--dss-space-12, 48px);
		gap: var(--dss-space-6, 24px);
	}

	/* Icon */
	.empty-icon {
		color: var(--ssk-colors-neutral-300, #d1d5db);
		margin-bottom: var(--dss-space-2, 8px);
	}
	.size-sm .empty-icon { transform: scale(0.75); }
	.size-lg .empty-icon { transform: scale(1.25); }

	/* Title */
	.empty-title {
		margin: 0;
		font-weight: 600;
		color: var(--ssk-colors-text-700, #374151);
	}
	.size-sm .empty-title { font-size: var(--text-sm, 13px); }
	.size-md .empty-title { font-size: var(--text-p, 14px); }
	.size-lg .empty-title { font-size: var(--text-sm); }

	/* Description */
	.empty-description {
		margin: 0;
		color: var(--ssk-colors-text-400, #9ca3af);
		max-width: 320px;
		line-height: 1.5;
	}
	.size-sm .empty-description { font-size: var(--text-caption, 18px); }
	.size-md .empty-description { font-size: var(--text-sm, 13px); }
	.size-lg .empty-description { font-size: var(--text-p, 14px); }

	/* Actions */
	.empty-action {
		margin-top: var(--dss-space-4, 16px);
	}
	.empty-action:empty {
		display: none;
	}

	.empty-secondary {
		margin-top: var(--dss-space-2, 8px);
	}
	.empty-secondary:empty {
		display: none;
	}
</style>
