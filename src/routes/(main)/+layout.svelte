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
	}
	header {
		height: 4em;
		background-color: transparent;
	}
</style>
