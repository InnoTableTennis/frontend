<script lang="ts">
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import { userToken } from '$lib/stores';
</script>

<header>
	<NavBar />
</header>

<main>
	{#if $userToken}
		<slot />
	{:else}
		<p class="details">Oops! That page doesn't exist or it is private</p>
	{/if}
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
