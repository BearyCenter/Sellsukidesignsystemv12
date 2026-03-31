<script lang="ts">
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeMap = { sm: 16, md: 24, lg: 32 };
	$: px = sizeMap[size];
</script>

<svg
	class="dss-spinner"
	width={px}
	height={px}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="3" />
	<path
		d="M12 2a10 10 0 0 1 10 10"
		stroke="currentColor"
		stroke-width="3"
		stroke-linecap="round"
	/>
</svg>

<style>
	.dss-spinner {
		animation: dss-spin 0.8s linear infinite;
		display: inline-block;
		vertical-align: middle;
	}

	@keyframes dss-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
