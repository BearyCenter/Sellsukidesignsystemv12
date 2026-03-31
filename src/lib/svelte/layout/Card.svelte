<script lang="ts">
	export let hover: boolean = false;
	export let elevation: 'none' | 'sm' | 'md' | 'lg' = 'sm';
</script>

<div class="dss-card elevation-{elevation}" class:hoverable={hover}>
	<slot />
</div>

<style>
	.dss-card {
		background: var(--dss-bg-primary, #ffffff);
		border: 1px solid var(--border, #e5e7eb);
		border-radius: var(--radius-lg, 12px);
		overflow: hidden;
		transition: box-shadow 0.2s ease;
	}

	/* Elevation */
	.elevation-none { box-shadow: none; }
	.elevation-sm { box-shadow: var(--dss-shadow-sm, 0 1px 2px rgba(0,0,0,0.05)); }
	.elevation-md { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); }
	.elevation-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }

	/* Hover */
	.hoverable {
		cursor: pointer;
	}
	.hoverable:hover {
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
	}
	.hoverable.elevation-sm:hover {
		box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
	}
	.hoverable.elevation-md:hover {
		box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
	}
	.hoverable.elevation-lg:hover {
		box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
	}
</style>
