<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	export let images: { src: string; alt: string; thumbnail?: string }[] = [];
	export let initialIndex: number = 0;

	const dispatch = createEventDispatcher();

	let lightboxOpen = false;
	let currentIndex = initialIndex;

	$: currentImage = images[currentIndex] || null;
	$: counter = `${currentIndex + 1} / ${images.length}`;

	function openLightbox(index: number) {
		currentIndex = index;
		lightboxOpen = true;
	}

	function closeLightbox() {
		lightboxOpen = false;
	}

	function prevImage() {
		currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
	}

	function nextImage() {
		currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
	}

	function handleBackdropClick(e: MouseEvent) {
		if ((e.target as HTMLElement).classList.contains('dss-lightbox')) {
			closeLightbox();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		else if (e.key === 'ArrowLeft') prevImage();
		else if (e.key === 'ArrowRight') nextImage();
	}

	onMount(() => document.addEventListener('keydown', handleKeydown));
	onDestroy(() => document.removeEventListener('keydown', handleKeydown));
</script>

<div class="dss-imagepreview">
	<div class="thumbnail-grid">
		{#each images as image, i}
			<button
				type="button"
				class="thumbnail"
				on:click={() => openLightbox(i)}
			>
				<img src={image.thumbnail || image.src} alt={image.alt} loading="lazy" />
			</button>
		{/each}
	</div>

	{#if lightboxOpen && currentImage}
		<div class="dss-lightbox" on:click={handleBackdropClick} role="dialog" aria-modal="true">
			<div class="lightbox-content">
				<button type="button" class="lightbox-close" on:click={closeLightbox} aria-label="Close">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>

				{#if images.length > 1}
					<button type="button" class="lightbox-nav prev" on:click={prevImage} aria-label="Previous">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="15 18 9 12 15 6" />
						</svg>
					</button>
				{/if}

				<img src={currentImage.src} alt={currentImage.alt} class="lightbox-image" />

				{#if images.length > 1}
					<button type="button" class="lightbox-nav next" on:click={nextImage} aria-label="Next">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</button>
				{/if}

				{#if images.length > 1}
					<span class="lightbox-counter">{counter}</span>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.dss-imagepreview {
		font-family: var(--font-label);
	}

	.thumbnail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		gap: var(--dss-space-8, 8px);
	}

	.thumbnail {
		aspect-ratio: 1;
		border: 2px solid transparent;
		border-radius: var(--radius-md, 8px);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		background: var(--muted, #f3f4f6);
		transition: border-color 0.15s, transform 0.15s;
	}
	.thumbnail:hover {
		border-color: var(--primary, #32a9ff);
		transform: scale(1.03);
	}
	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Lightbox */
	.dss-lightbox {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.85);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lightbox-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 48px;
	}

	.lightbox-image {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: var(--radius-md, 8px);
		user-select: none;
	}

	.lightbox-close {
		position: absolute;
		top: 16px;
		right: 16px;
		background: rgba(255, 255, 255, 0.15);
		border: none;
		color: white;
		cursor: pointer;
		padding: 8px;
		border-radius: var(--radius-full, 9999px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s;
		z-index: 1;
	}
	.lightbox-close:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.15);
		border: none;
		color: white;
		cursor: pointer;
		padding: 12px;
		border-radius: var(--radius-full, 9999px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s;
		z-index: 1;
	}
	.lightbox-nav:hover {
		background: rgba(255, 255, 255, 0.25);
	}
	.lightbox-nav.prev { left: 16px; }
	.lightbox-nav.next { right: 16px; }

	.lightbox-counter {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		font-size: var(--text-sm, 13px);
		background: rgba(0, 0, 0, 0.5);
		padding: 4px 12px;
		border-radius: var(--radius-full, 9999px);
		user-select: none;
	}
</style>
