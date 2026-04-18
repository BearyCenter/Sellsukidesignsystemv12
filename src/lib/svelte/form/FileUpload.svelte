<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let accept: string = '';
	export let maxSize: number | undefined = undefined;
	export let multiple: boolean = false;
	export let disabled: boolean = false;
	export let variant: 'dropzone' | 'button' | 'avatar' = 'dropzone';
	export let label: string = '';
	export let description: string = '';

	const dispatch = createEventDispatcher<{
		change: File[];
		remove: string;
	}>();

	let fileInputEl: HTMLInputElement;
	let isDragging = false;
	let files: { id: string; file: File; preview?: string }[] = [];

	function generateId(): string {
		return Math.random().toString(36).substring(2, 10);
	}

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	function processFiles(incoming: FileList | null) {
		if (!incoming) return;
		const newFiles: { id: string; file: File; preview?: string }[] = [];
		for (let i = 0; i < incoming.length; i++) {
			const file = incoming[i];
			if (maxSize && file.size > maxSize) continue;
			const entry: { id: string; file: File; preview?: string } = { id: generateId(), file };
			if (file.type.startsWith('image/')) {
				entry.preview = URL.createObjectURL(file);
			}
			newFiles.push(entry);
		}
		if (multiple) {
			files = [...files, ...newFiles];
		} else {
			files = newFiles.slice(0, 1);
		}
		dispatch('change', files.map((f) => f.file));
	}

	function handleInputChange(e: Event) {
		const input = e.target as HTMLInputElement;
		processFiles(input.files);
		input.value = '';
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		if (disabled) return;
		processFiles(e.dataTransfer?.files ?? null);
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (!disabled) isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function removeFile(id: string) {
		const entry = files.find((f) => f.id === id);
		if (entry?.preview) URL.revokeObjectURL(entry.preview);
		files = files.filter((f) => f.id !== id);
		dispatch('remove', id);
		dispatch('change', files.map((f) => f.file));
	}

	function openPicker() {
		if (!disabled) fileInputEl?.click();
	}
</script>

<div class="dss-fileupload" class:disabled>
	{#if label}
		<span class="dss-fileupload-label">{label}</span>
	{/if}

	<input
		bind:this={fileInputEl}
		type="file"
		{accept}
		{multiple}
		class="hidden-input"
		on:change={handleInputChange}
		{disabled}
	/>

	{#if variant === 'dropzone'}
		<div
			class="dss-fileupload-dropzone"
			class:dragging={isDragging}
			role="button"
			tabindex="0"
			on:click={openPicker}
			on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') openPicker(); }}
			on:drop={handleDrop}
			on:dragover={handleDragOver}
			on:dragleave={handleDragLeave}
		>
			<svg class="upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
			</svg>
			<span class="dropzone-text">Drag & drop files here, or <span class="link-text">browse</span></span>
			{#if description}
				<span class="dropzone-desc">{description}</span>
			{/if}
		</div>
	{:else if variant === 'button'}
		<button type="button" class="dss-fileupload-btn" on:click={openPicker} {disabled}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
			</svg>
			Upload file{multiple ? 's' : ''}
		</button>
		{#if description}
			<span class="btn-desc">{description}</span>
		{/if}
	{:else if variant === 'avatar'}
		<button
			type="button"
			class="dss-fileupload-avatar"
			on:click={openPicker}
			{disabled}
		>
			{#if files.length > 0 && files[0].preview}
				<img src={files[0].preview} alt="Avatar preview" class="avatar-preview" />
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
				</svg>
			{/if}
			<span class="avatar-overlay">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
				</svg>
			</span>
		</button>
	{/if}

	{#if files.length > 0 && variant !== 'avatar'}
		<ul class="dss-fileupload-list">
			{#each files as entry (entry.id)}
				<li class="file-item">
					{#if entry.preview}
						<img src={entry.preview} alt={entry.file.name} class="file-thumb" />
					{:else}
						<svg class="file-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
						</svg>
					{/if}
					<div class="file-info">
						<span class="file-name">{entry.file.name}</span>
						<span class="file-size">{formatSize(entry.file.size)}</span>
					</div>
					<button
						type="button"
						class="file-remove"
						aria-label="Remove file"
						on:click={() => removeFile(entry.id)}
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
							<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.dss-fileupload {
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-8, 8px);
		font-family: var(--font-label);
	}
	.disabled { opacity: 0.5; pointer-events: none; }

	.hidden-input {
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;
	}

	.dss-fileupload-label {
		font-size: var(--text-label, 13px);
		font-weight: 500;
		color: var(--ssk-colors-text-700, #374151);
	}

	/* Dropzone */
	.dss-fileupload-dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--dss-space-8, 8px);
		padding: var(--dss-space-24, 24px);
		border: 2px dashed var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-lg, 12px);
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		background: var(--ssk-colors-neutral-50, #f9fafb);
	}
	.dss-fileupload-dropzone:hover,
	.dss-fileupload-dropzone.dragging {
		border-color: var(--ssk-colors-primary-400, #60a5fa);
		background: var(--ssk-colors-primary-50, #eff6ff);
	}

	.upload-icon {
		color: var(--ssk-colors-text-400, #9ca3af);
	}
	.dropzone-text {
		font-size: var(--text-p, 14px);
		color: var(--muted-foreground, #6b7280);
	}
	.link-text {
		color: var(--primary, #32a9ff);
		font-weight: 500;
	}
	.dropzone-desc {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	/* Button variant */
	.dss-fileupload-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		padding: 8px 16px;
		background: white;
		border: 1px solid var(--ssk-colors-neutral-300, #d1d5db);
		border-radius: var(--radius-md, 8px);
		font-size: var(--text-p, 14px);
		color: var(--ssk-colors-text-700, #374151);
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s, border-color 0.15s;
	}
	.dss-fileupload-btn:hover {
		background: var(--ssk-colors-neutral-50, #f9fafb);
		border-color: var(--ssk-colors-neutral-400, #9ca3af);
	}
	.btn-desc {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
	}

	/* Avatar variant */
	.dss-fileupload-avatar {
		position: relative;
		width: 80px;
		height: 80px;
		border-radius: var(--radius-full, 9999px);
		border: 2px dashed var(--ssk-colors-neutral-300, #d1d5db);
		background: var(--ssk-colors-neutral-50, #f9fafb);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		overflow: hidden;
		transition: border-color 0.15s;
		padding: 0;
	}
	.dss-fileupload-avatar:hover {
		border-color: var(--ssk-colors-primary-400, #60a5fa);
	}
	.dss-fileupload-avatar svg {
		color: var(--ssk-colors-text-400, #9ca3af);
	}
	.avatar-preview {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.avatar-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: opacity 0.15s;
		color: white;
	}
	.dss-fileupload-avatar:hover .avatar-overlay {
		opacity: 1;
	}

	/* File list */
	.dss-fileupload-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--dss-space-4, 4px);
	}
	.file-item {
		display: flex;
		align-items: center;
		gap: var(--dss-space-8, 8px);
		padding: var(--dss-space-8, 8px);
		background: var(--ssk-colors-neutral-50, #f9fafb);
		border-radius: var(--radius-md, 8px);
		border: 1px solid var(--border, #e5e7eb);
	}
	.file-thumb {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-sm, 4px);
		object-fit: cover;
		flex-shrink: 0;
	}
	.file-icon {
		flex-shrink: 0;
		color: var(--ssk-colors-text-400, #9ca3af);
	}
	.file-info {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}
	.file-name {
		font-size: var(--text-sm, 13px);
		color: var(--ssk-colors-text-700, #374151);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.file-size {
		font-size: var(--text-caption, 18px);
		color: var(--ssk-colors-text-400, #9ca3af);
	}
	.file-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--ssk-colors-text-400, #9ca3af);
		padding: 4px;
		border-radius: var(--radius-sm, 4px);
		flex-shrink: 0;
		transition: color 0.15s, background 0.15s;
	}
	.file-remove:hover {
		color: var(--ssk-colors-danger-500, #ef4444);
		background: var(--ssk-colors-danger-50, #fef2f2);
	}
</style>
