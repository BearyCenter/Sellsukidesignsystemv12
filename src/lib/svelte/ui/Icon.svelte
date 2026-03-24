<script lang="ts">
	import * as icons from 'lucide-svelte';
	import { iconMap } from './icon-map';

	export let name: string = '';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let spin: boolean = false;
	export let cursor: string = '';

	const sizeMap: Record<string, number> = {
		xs: 12,
		sm: 16,
		md: 20,
		lg: 24,
		xl: 32
	};

	$: iconName = iconMap[name] || name;
	$: IconComponent = (icons as Record<string, any>)[iconName] || null;
	$: pixelSize = sizeMap[size] || 20;
</script>

{#if IconComponent}
	<span
		class="dss-icon"
		class:spin
		style:cursor
		style:display="inline-flex"
		style:align-items="center"
		style:justify-content="center"
		style:width="{pixelSize}px"
		style:height="{pixelSize}px"
		on:click
		on:keypress
		role={$$restProps.role || undefined}
		tabindex={$$restProps.tabindex || undefined}
	>
		<svelte:component this={IconComponent} size={pixelSize} />
	</span>
{/if}

<style>
	.dss-icon {
		display: inline-flex;
		flex-shrink: 0;
	}

	.spin {
		animation: dss-spin 1s linear infinite;
	}

	@keyframes dss-spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
