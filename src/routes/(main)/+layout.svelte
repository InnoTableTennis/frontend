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
