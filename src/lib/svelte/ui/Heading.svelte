<script lang="ts">
	export let level: 1 | 2 | 3 | 4 | 5 | 6 = 2;
</script>

{#if level === 1}
	<h1 class="dss-heading h1"><slot /></h1>
{:else if level === 2}
	<h2 class="dss-heading h2"><slot /></h2>
{:else if level === 3}
	<h3 class="dss-heading h3"><slot /></h3>
{:else if level === 4}
	<h4 class="dss-heading h4"><slot /></h4>
{:else if level === 5}
	<h5 class="dss-heading h5"><slot /></h5>
{:else}
	<h6 class="dss-heading h6"><slot /></h6>
{/if}

<style>
	.dss-heading {
		margin: 0;
		color: var(--foreground, #111827);
		line-height: 1.3;
	}

	/* DSS spec: h1=60, h2=52, h3=28, h4=24 — scaled for app UI */
	/* stylelint-disable-next-line declaration-property-value-disallowed-list -- [DESIGN EXCEPTION] App-scale H1: DS spec is 48px but Svelte app uses 36px for layout density */
	.h1 { font-size: var(--text-h1-app); font-weight: 400; }
	.h2 { font-size: var(--text-h3); font-weight: 400; }
	/* stylelint-disable-next-line declaration-property-value-disallowed-list -- [DESIGN EXCEPTION] App-scale H3: DS spec is 28px but Svelte app uses 22px */
	.h3 { font-size: var(--text-h3-app); font-weight: 700; }
	.h4 { font-size: var(--text-p); font-weight: 500; }
	.h5 { font-size: var(--text-label); font-weight: 500; }
	.h6 { font-size: var(--text-sm); font-weight: 500; }
</style>
