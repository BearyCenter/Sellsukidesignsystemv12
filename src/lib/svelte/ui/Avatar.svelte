<script lang="ts">
	export let src: string = '';
	export let alt: string = '';
	export let name: string = '';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let shape: 'circle' | 'square' = 'circle';
	export let boxsize: string = '';

	const sizeMap: Record<string, string> = {
		xs: '24px',
		sm: '32px',
		md: '40px',
		lg: '48px',
		xl: '64px'
	};

	$: computedSize = boxsize || sizeMap[size] || '40px';
	$: initials = name
		? name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: '';
</script>

<div
	class="dss-avatar shape-{shape}"
	style:width={computedSize}
	style:height={computedSize}
	on:click
	on:keypress
	role={$$restProps.role || undefined}
	tabindex={$$restProps.tabindex || undefined}
>
	{#if src}
		<img {src} alt={alt || name} class="avatar-img" />
	{:else if initials}
		<span class="avatar-initials">{initials}</span>
	{:else}
		<span class="avatar-fallback">?</span>
	{/if}
</div>

<style>
	.dss-avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: var(--border, #e5e7eb);
		flex-shrink: 0;
	}

	.shape-circle { border-radius: 50%; }
	.shape-square { border-radius: var(--radius-md, 8px); }

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-initials,
	.avatar-fallback {
		font-size: 0.45em;
		font-weight: 600;
		color: var(--ssk-colors-neutral-600, #4b5563);
		user-select: none;
	}
</style>
