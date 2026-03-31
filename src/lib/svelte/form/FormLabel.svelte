<script lang="ts">
	export let htmlFor: string | undefined = undefined;
	export let required: boolean = false;
</script>

<label class="dss-form-label" for={htmlFor}>
	<slot />
	{#if required}
		<span class="required-mark" aria-hidden="true">*</span>
	{/if}
</label>

<style>
	.dss-form-label {
		font-size: var(--text-label, 12px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
		line-height: 1.4;
	}
	.required-mark {
		color: var(--ssk-colors-danger-500, #ef4444);
		margin-left: 2px;
	}
</style>
