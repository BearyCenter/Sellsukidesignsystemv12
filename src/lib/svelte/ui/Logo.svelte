<script lang="ts">
	export let srcLogo: string = '';
	export let altLogo: string = '';
	export let srcLogoName: string = '';
	export let altLogoName: string = '';
	export let fullLogo: boolean = false;
</script>

<div class="dss-logo">
	{#if srcLogo}
		<img src={srcLogo} alt={altLogo} class="logo-icon" />
	{/if}
	{#if fullLogo && srcLogoName}
		<img src={srcLogoName} alt={altLogoName} class="logo-name" />
	{/if}
</div>

<style>
	.dss-logo {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.logo-icon {
		height: 32px;
		width: auto;
	}

	.logo-name {
		height: 20px;
		width: auto;
	}
</style>
