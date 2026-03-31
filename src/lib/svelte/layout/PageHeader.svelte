<script lang="ts">
	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let sticky: boolean = false;
</script>

<header class="dss-page-header" class:sticky>
	<slot name="breadcrumb" />

	<div class="header-main">
		<div class="header-title-group">
			<h1 class="header-title">{title}</h1>
			{#if subtitle}
				<p class="header-subtitle">{subtitle}</p>
			{/if}
		</div>
		<div class="header-actions">
			<slot name="actions" />
		</div>
	</div>

	<slot name="tabs" />
</header>

<style>
	.dss-page-header {
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-8, 8px);
		padding: var(--dss-space-16, 16px) var(--dss-space-24, 24px);
		background: var(--dss-bg-primary, #ffffff);
		border-bottom: 1px solid var(--border, #e5e7eb);
	}

	.dss-page-header.sticky {
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.header-main {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--dss-space-16, 16px);
	}

	.header-title-group {
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-4, 4px);
		min-width: 0;
	}

	.header-title {
		margin: 0;
		font-size: var(--text-h2, 20px);
		font-weight: 600;
		color: var(--foreground, #111827);
		line-height: 1.3;
	}

	.header-subtitle {
		margin: 0;
		font-size: var(--text-p, 14px);
		color: var(--muted-foreground, #6b7280);
		line-height: 1.4;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		flex-shrink: 0;
	}
</style>
