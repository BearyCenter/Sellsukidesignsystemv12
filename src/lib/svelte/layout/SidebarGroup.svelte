<script lang="ts">
	export let label: string = '';
	export let key: string = '';
	export let expanded: boolean = true;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class="dss-sidebar-group" data-key={key}>
	<button class="group-header" on:click={toggle} type="button">
		<span class="group-label">{label}</span>
		<span class="group-chevron" class:expanded>
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
				<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</span>
	</button>

	{#if expanded}
		<div class="group-items">
			<slot />
		</div>
	{/if}
</div>

<style>
	.dss-sidebar-group {
		margin-bottom: 4px;
	}

	.group-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 8px 12px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--text-2xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--ssk-colors-neutral-400, #9ca3af);
		font-family: inherit;
	}

	.group-header:hover {
		color: var(--ssk-colors-neutral-600, #4b5563);
	}

	.group-chevron {
		display: inline-flex;
		transition: transform 0.2s;
		transform: rotate(-90deg);
	}

	.group-chevron.expanded {
		transform: rotate(0deg);
	}

	.group-items {
		padding: 0 4px 4px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
