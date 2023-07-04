<script>
	import { theme, toggleTheme } from '$lib/stores';
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'dark'}
		<p>Theme: Dark</p>
	{:else}
		<p>Theme: Light</p>
	{/if}
</button>

<style>
	button {
		width: 7rem;
		height: 2rem;
		border-radius: 2rem;
		background-color: var(--main-color);
		border: none;
		cursor: pointer;
	}
</style>
