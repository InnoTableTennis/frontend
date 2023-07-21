<script lang="ts">
	import NavBar from '$lib/components/navigation/NavBar.svelte';
</script>

<header>
	<NavBar />
</header>

<main>
	<slot />
</main>

<style>
	main {
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 2em;
	}
	header {
		height: 4em;
		background-color: transparent;
	}
	@media (max-width: 800px) {
		main {
			padding: 0 1em;
		}
	}
</style>
