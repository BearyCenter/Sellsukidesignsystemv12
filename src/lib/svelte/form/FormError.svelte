<script lang="ts">
	export let message: string | undefined = undefined;
</script>

{#if message}
	<p class="dss-form-error">{message}</p>
{/if}

<style>
	.dss-form-error {
		margin: 0;
		font-size: var(--text-caption, 18px);
		line-height: 1.4;
		color: var(--ssk-colors-danger-500, #ef4444);
	}
</style>
