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
		max-width: 1440px;
		align-items: center;
		margin: 0 auto;
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
