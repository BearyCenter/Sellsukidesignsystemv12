<script lang="ts">
	/* TopNavbar — horizontal header bar with left/right slots */
</script>

<nav class="dss-top-navbar">
	<div class="navbar-left">
		<slot name="left" />
	</div>
	<div class="navbar-right">
		<slot name="right" />
	</div>
</nav>

<style>
	.dss-top-navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		height: 56px;
		background: white;
		border-bottom: 1px solid var(--border, #e5e7eb);
		box-sizing: border-box;
	}

	.navbar-left,
	.navbar-right {
		display: flex;
		align-items: center;
		gap: 12px;
	}
</style>
