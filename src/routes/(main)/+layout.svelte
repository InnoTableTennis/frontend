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
	header {
		height: 4em;
		background-color: transparent;
	}
</style>
