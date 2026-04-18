<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let items: NotificationItem[] = [];

	interface NotificationItem {
		id: string;
		type: 'info' | 'success' | 'warning' | 'error';
		title: string;
		message?: string;
		time: string;
		read: boolean;
	}

	const dispatch = createEventDispatcher();

	$: unreadCount = items.filter((i) => !i.read).length;

	const typeColors: Record<string, string> = {
		info: 'var(--primary, #3b82f6)',
		success: '#10b981',
		warning: '#f59e0b',
		error: 'var(--danger)'
	};

	function markRead(id: string) {
		dispatch('markRead', id);
	}

	function markAllRead() {
		dispatch('markAllRead');
	}

	function dismiss(id: string) {
		dispatch('dismiss', id);
	}

	function clearAll() {
		dispatch('clearAll');
	}
</script>

<div class="dss-notification-center">
	<div class="nc-header">
		<div class="nc-title">
			<span>Notifications</span>
			{#if unreadCount > 0}
				<span class="nc-badge">{unreadCount}</span>
			{/if}
		</div>
		<div class="nc-actions">
			{#if unreadCount > 0}
				<button class="nc-link" on:click={markAllRead} type="button">Mark all read</button>
			{/if}
			{#if items.length > 0}
				<button class="nc-link nc-link-danger" on:click={clearAll} type="button">Clear all</button>
			{/if}
		</div>
	</div>

	<div class="nc-list">
		{#if items.length === 0}
			<div class="nc-empty">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<span>No notifications</span>
			</div>
		{:else}
			{#each items as item (item.id)}
				<div
					class="nc-item"
					class:unread={!item.read}
					on:click={() => markRead(item.id)}
					on:keypress={() => markRead(item.id)}
					role="button"
					tabindex={0}
				>
					<div class="nc-dot" style:background={!item.read ? typeColors[item.type] : 'transparent'}></div>
					<div class="nc-content">
						<div class="nc-item-title">{item.title}</div>
						{#if item.message}
							<div class="nc-item-message">{item.message}</div>
						{/if}
						<div class="nc-item-time">{item.time}</div>
					</div>
					<button
						class="nc-dismiss"
						on:click|stopPropagation={() => dismiss(item.id)}
						type="button"
						aria-label="Dismiss"
					>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</button>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.dss-notification-center {
		width: 100%;
		max-width: 400px;
		background: var(--dss-bg-primary, #ffffff);
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-lg, 12px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.nc-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--dss-space-16, 16px);
		border-bottom: 1px solid var(--border, #e5e7eb);
	}

	.nc-title {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		font-size: var(--text-p, 14px);
		font-weight: 600;
		color: var(--foreground, #111827);
	}

	.nc-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 20px;
		height: 20px;
		padding: 0 6px;
		border-radius: var(--radius-full, 9999px);
		background: var(--primary, #32a9ff);
		color: white;
		font-size: var(--text-2xs);
		font-weight: 600;
	}

	.nc-actions {
		display: flex;
		gap: var(--dss-space-12, 12px);
	}

	.nc-link {
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--text-caption, 18px);
		color: var(--primary, #32a9ff);
		font-family: inherit;
		padding: 0;
	}
	.nc-link:hover {
		text-decoration: underline;
	}
	.nc-link-danger {
		color: var(--danger);
	}

	.nc-list {
		max-height: 400px;
		overflow-y: auto;
	}

	.nc-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		padding: var(--dss-space-32, 32px);
		color: var(--ssk-colors-text-400, #9ca3af);
		font-size: var(--text-sm, 13px);
	}

	.nc-item {
		display: flex;
		align-items: flex-start;
		gap: var(--dss-space-12, 12px);
		padding: var(--dss-space-12, 12px) var(--dss-space-16, 16px);
		cursor: pointer;
		transition: background 0.1s;
	}

	.nc-item:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}

	.nc-item.unread {
		background: var(--ssk-colors-primary-50, #f0f9ff);
	}
	.nc-item.unread:hover {
		background: var(--ssk-colors-primary-100, #d9f2ff);
	}

	.nc-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
		margin-top: 6px;
	}

	.nc-content {
		flex: 1;
		min-width: 0;
	}

	.nc-item-title {
		font-size: var(--text-p, 14px);
		font-weight: 500;
		color: var(--foreground, #111827);
	}

	.nc-item-message {
		font-size: var(--text-sm, 13px);
		color: var(--muted-foreground, #6b7280);
		margin-top: 2px;
	}

	.nc-item-time {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
		margin-top: 4px;
	}

	.nc-dismiss {
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		border-radius: var(--radius-sm, 6px);
		color: var(--ssk-colors-text-400, #9ca3af);
		flex-shrink: 0;
		opacity: 0;
		transition: opacity 0.1s;
	}

	.nc-item:hover .nc-dismiss {
		opacity: 1;
	}

	.nc-dismiss:hover {
		background: var(--border, #e5e7eb);
		color: var(--ssk-colors-text-700, #374151);
	}
</style>
