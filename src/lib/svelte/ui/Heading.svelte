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
		color: var(--ssk-colors-text-900, #111827);
		line-height: 1.3;
	}

	/* DSS spec: h1=60, h2=52, h3=28, h4=24 — scaled for app UI */
	.h1 { font-size: 36px; font-weight: 400; }
	.h2 { font-size: 28px; font-weight: 400; }
	.h3 { font-size: 22px; font-weight: 700; }
	.h4 { font-size: 20px; font-weight: 500; }
	.h5 { font-size: 18px; font-weight: 500; }
	.h6 { font-size: 16px; font-weight: 500; }
</style>
